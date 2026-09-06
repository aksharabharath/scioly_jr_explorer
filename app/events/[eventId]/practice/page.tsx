import { PracticeQuiz } from "@/components/PracticeQuiz";
import { TrickyTopicsEmpty } from "@/components/TrickyTopicsEmpty";
import {
  eligibleWeakQuestions,
  hasWeakTopics,
  parsePracticeMode,
  parsePracticeTopicId,
  toLearningAttempts,
} from "@/lib/learning/adaptive";
import { getAllQuestions, getPracticePageData } from "@/lib/mock/curriculum";
import { isStudentCatalogEventId } from "@/lib/mock/events";
import {
  getMyGamification,
  getMyPracticeAttemptCount,
  getMyPracticeAttempts,
  getMyRecentPracticeAttempts,
} from "@/lib/practice-attempts";
import { requireSelectedEvent } from "@/lib/student-events";
import { dailyPracticeGoalFromUser } from "@/lib/student-preferences";
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
  const data = await getPracticePageData(eventId);
  if (!data) {
    return { title: "Expedition · Jr. Explorer" };
  }
  const mode = parsePracticeMode((await searchParams).mode);
  if (mode === "weak") {
    return { title: `Tricky Topics · ${data.event.name} · Jr. Explorer` };
  }
  return { title: `Expedition · ${data.event.name} · Jr. Explorer` };
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
  const data = await getPracticePageData(eventId);

  if (!data) {
    notFound();
  }

  const [storedAttempts, priorBadgeAttempts, attemptCount, allQuestions, gamification] =
    await Promise.all([
      getMyRecentPracticeAttempts(),
      getMyPracticeAttempts(),
      getMyPracticeAttemptCount(),
      getAllQuestions(),
      getMyGamification(),
    ]);
  const eventQuestions = allQuestions.filter(
    (question) => question.eventId === data.event.id,
  );
  const priorAttempts = toLearningAttempts(storedAttempts, eventQuestions);
  const weakPool = eligibleWeakQuestions(data.questions, priorAttempts);
  const practiceQuestions =
    mode === "weak"
      ? topicId
        ? weakPool.filter((question) => question.topicId === topicId)
        : weakPool
      : data.questions;
  const noTrickyTopics = mode === "weak" && !hasWeakTopics(priorAttempts);
  const noTrickyQuestions = mode === "weak" && practiceQuestions.length === 0;

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-screen-xl px-4 py-3 sm:px-6">
        <ExplorerTrail
          crumbs={[
            { href: "/camp", label: "Base camp" },
            { href: `/events/${data.event.id}`, label: data.event.name },
            { label: mode === "weak" ? "Tricky topics" : "Expedition" },
          ]}
        />
        {noTrickyTopics || noTrickyQuestions ? (
          <div className="mt-4">
            <TrickyTopicsEmpty
              eventId={data.event.id}
              eventName={data.event.name}
              headingLevel="h1"
            />
          </div>
        ) : (
          <div className="mt-3">
            <PracticeQuiz
              eventId={data.event.id}
              eventName={data.event.name}
              questions={practiceQuestions}
              priorAttempts={priorAttempts}
              priorBadgeAttempts={priorBadgeAttempts}
              allQuestions={allQuestions}
              initialAttemptCount={attemptCount}
              initialXp={gamification.xp}
              initialStreakDays={gamification.streakDays}
              dailyPracticeGoal={dailyPracticeGoalFromUser(user)}
              mode={mode}
            />
          </div>
        )}
      </div>
    </main>
  );
}
