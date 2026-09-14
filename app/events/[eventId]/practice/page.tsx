import { PracticeQuiz } from "@/components/PracticeQuiz";
import { TrickyTopicsEmpty } from "@/components/TrickyTopicsEmpty";
import {
  hasWeakTopics,
  parsePracticeMode,
  parsePracticeTopicId,
  topicsNeedingRevisit,
  toLearningAttempts,
} from "@/lib/learning/adaptive";
import { completedSessionCountForEvent } from "@/lib/expeditions";
import { getEvent, isStudentCatalogEventId } from "@/lib/mock/events";
import {
  getMyGamification,
  getMyPracticeAttemptCount,
  getMyPracticeAttempts,
  getMyRecentPracticeAttempts,
} from "@/lib/practice-attempts";
import { requireSelectedEvent } from "@/lib/student-events";
import { dailyPracticeGoalFromUser } from "@/lib/student-preferences";
import {
  getQuestionReferences,
  createExpedition,
} from "@/lib/questions/server";
import { requireUser } from "@/lib/auth/session";
import type { Metadata } from "next";
import { ExplorerTrail } from "@/components/ExplorerTrail";
import { notFound } from "next/navigation";

type PracticeRouteProps = {
  params: Promise<{ eventId: string }>;
  searchParams: Promise<{ mode?: string | string[]; topic?: string | string[] }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: PracticeRouteProps): Promise<Metadata> {
  const { eventId } = await params;
  if (!isStudentCatalogEventId(eventId)) {
    notFound();
  }
  const event = await getEvent(eventId);
  if (!event || event.kind === "build" || !event.unlocked) {
    return { title: "Expedition · Jr. Explorer" };
  }
  const mode = parsePracticeMode((await searchParams).mode);
  if (mode === "weak") {
    return { title: `Tricky Topics · ${event.name} · Jr. Explorer` };
  }
  return { title: `Expedition · ${event.name} · Jr. Explorer` };
}

export default async function PracticePage({
  params,
  searchParams,
}: PracticeRouteProps) {
  const { eventId } = await params;
  if (!isStudentCatalogEventId(eventId)) {
    notFound();
  }
  await requireSelectedEvent(eventId);
  const user = await requireUser();
  const search = await searchParams;
  const mode = parsePracticeMode(search.mode);
  const topicId = parsePracticeTopicId(search.topic);
  const event = await getEvent(eventId);
  if (!event || event.kind === "build" || !event.unlocked) {
    notFound();
  }

  const [
    recentStoredAttempts,
    allStoredAttempts,
    attemptCount,
    questionReferences,
    gamification,
  ] = await Promise.all([
    getMyRecentPracticeAttempts(),
    getMyPracticeAttempts(),
    getMyPracticeAttemptCount(),
    getQuestionReferences(),
    getMyGamification(),
  ]);
  const eventQuestions = questionReferences.filter(
    (question) => question.eventId === event.id,
  );
  const priorBadgeAttempts = allStoredAttempts;
  const priorAttempts = toLearningAttempts(recentStoredAttempts, eventQuestions);
  const previouslyAnsweredQuestionIds = allStoredAttempts
    .filter((attempt) =>
      eventQuestions.some((question) => question.id === attempt.questionId),
    )
    .map((attempt) => attempt.questionId);
  const completedExpeditions = completedSessionCountForEvent(
    event.id,
    allStoredAttempts,
    questionReferences,
  );
  const weakTopicIds = topicsNeedingRevisit(priorAttempts);
  const selectedWeakTopicIds =
    topicId && weakTopicIds.includes(topicId) ? [topicId] : weakTopicIds;
  const noTrickyTopics =
    mode === "weak" && (!hasWeakTopics(priorAttempts) || selectedWeakTopicIds.length === 0);
  const expedition =
    noTrickyTopics
      ? null
      : await createExpedition({
    eventId: event.id,
          userId: user.id,
          topicIds:
            mode === "weak"
              ? selectedWeakTopicIds
              : null,
          history: priorAttempts,
        });

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-screen-xl px-4 py-3 sm:px-6">
        <ExplorerTrail
          crumbs={[
            { href: "/camp", label: "Base camp" },
            { href: `/events/${event.id}`, label: event.name },
            { label: mode === "weak" ? "Tricky topics" : "Expedition" },
          ]}
        />
        {noTrickyTopics || !expedition ? (
          <div className="mt-4">
            <TrickyTopicsEmpty
              eventId={event.id}
              eventName={event.name}
              headingLevel="h1"
            />
          </div>
        ) : (
          <div className="mt-3">
            <PracticeQuiz
              eventId={event.id}
              eventName={event.name}
              questions={expedition.questions}
              sessionId={expedition.sessionId}
              priorAttempts={priorAttempts}
              priorBadgeAttempts={priorBadgeAttempts}
              previouslyAnsweredQuestionIds={previouslyAnsweredQuestionIds}
              completedExpeditions={completedExpeditions}
              questionReferences={questionReferences}
              initialAttemptCount={attemptCount}
              initialXp={gamification.xp}
              initialStreakDays={gamification.streakDays}
              dailyPracticeGoal={dailyPracticeGoalFromUser(user)}
              mode={mode}
              practiceTopicId={topicId}
            />
          </div>
        )}
      </div>
    </main>
  );
}
