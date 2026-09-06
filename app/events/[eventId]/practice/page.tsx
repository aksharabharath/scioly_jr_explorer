import { PracticeQuiz } from "@/components/PracticeQuiz";
import {
  eligibleWeakQuestions,
  hasWeakTopics,
  parsePracticeMode,
  toLearningAttempts,
} from "@/lib/learning/adaptive";
import { getAllQuestions, getPracticePageData } from "@/lib/mock/curriculum";
import { isStudentCatalogEventId } from "@/lib/mock/events";
import {
  getMyGamification,
  getMyPracticeAttemptCount,
  getMyPracticeAttempts,
  getMyRecentPracticeAttempts,
  latestInProgressPracticeSessionForEvent,
} from "@/lib/practice-attempts";
import {
  calculateAttemptXp,
  calculateSessionCompletionXp,
} from "@/lib/gamification";
import { requireSelectedEvent } from "@/lib/student-events";
import { dailyPracticeGoalFromUser } from "@/lib/student-preferences";
import { requireUser } from "@/lib/auth/session";
import type { Metadata } from "next";
import { ExplorerTrail } from "@/components/ExplorerTrail";
import Link from "next/link";
import { notFound } from "next/navigation";

function sessionXpFromAttempts(
  attempts: Array<{ isCorrect: boolean; hintUsed: boolean }>,
): number {
  let unhintedCorrectStreak = 0;
  let xp = 0;
  for (const attempt of attempts) {
    if (attempt.isCorrect && !attempt.hintUsed) {
      unhintedCorrectStreak += 1;
    } else if (!attempt.isCorrect) {
      unhintedCorrectStreak = 0;
    }
    xp += calculateAttemptXp({
      isCorrect: attempt.isCorrect,
      hintUsed: attempt.hintUsed,
      unhintedCorrectStreak:
        attempt.isCorrect && !attempt.hintUsed
          ? unhintedCorrectStreak
          : undefined,
    });
  }
  return xp + calculateSessionCompletionXp(attempts.length);
}

type PracticeRouteProps = {
  params: Promise<{ eventId: string }>;
  searchParams: Promise<{ mode?: string | string[] }>;
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
  const mode = parsePracticeMode((await searchParams).mode);
  const data = await getPracticePageData(eventId);

  if (!data) {
    notFound();
  }

  const [
    storedAttempts,
    allStoredAttempts,
    attemptCount,
    allQuestions,
    gamification,
  ] = await Promise.all([
    getMyRecentPracticeAttempts(),
    getMyPracticeAttempts(),
    getMyPracticeAttemptCount(),
    getAllQuestions(),
    getMyGamification(),
  ]);
  const eventQuestions = allQuestions.filter(
    (question) => question.eventId === data.event.id,
  );
  const priorBadgeAttempts = allStoredAttempts;
  const priorAttempts = toLearningAttempts(storedAttempts, eventQuestions);
  const practiceQuestions =
    mode === "weak"
      ? eligibleWeakQuestions(data.questions, priorAttempts)
      : data.questions;
  const noTrickyTopics = mode === "weak" && !hasWeakTopics(priorAttempts);
  const noTrickyQuestions = mode === "weak" && practiceQuestions.length === 0;
  const resumeEntry = latestInProgressPracticeSessionForEvent(
    data.event.id,
    allStoredAttempts,
    eventQuestions,
  );
  const resumeSession = mode === "normal" && resumeEntry
    ? {
        sessionId: resumeEntry.sessionId,
        attempts: resumeEntry.attempts.map((attempt) => ({
          questionId: attempt.questionId,
          selectedChoiceId: attempt.selectedChoiceId,
          isCorrect: attempt.isCorrect,
          hintUsed: attempt.hintUsed,
        })),
        sessionXp: sessionXpFromAttempts(resumeEntry.attempts),
      }
    : undefined;

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-screen-xl px-4 py-3 sm:px-6">
        <ExplorerTrail
          crumbs={[
            { href: "/", label: "Base camp" },
            { href: `/events/${data.event.id}`, label: data.event.name },
            { label: mode === "weak" ? "Tricky topics" : "Expedition" },
          ]}
        />
        {noTrickyTopics || noTrickyQuestions ? (
          <section className="journal-panel mt-4 rounded-3xl p-5">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
              No tricky topics yet
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-stone-600">
              Keep exploring. We&apos;ll bring back anything that needs another
              look.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/events/${data.event.id}/practice`}
                className="rounded-full bg-teal-dark px-5 py-2.5 text-center text-sm font-semibold text-parchment hover:bg-teal"
              >
                Start an expedition
              </Link>
              <Link
                href={`/events/${data.event.id}`}
                className="rounded-full border border-stone-200 px-5 py-2.5 text-center text-sm font-semibold text-ink hover:bg-parchment"
              >
                Back to {data.event.name}
              </Link>
            </div>
          </section>
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
              resumeSession={resumeSession}
              dailyPracticeGoal={dailyPracticeGoalFromUser(user)}
              mode={mode}
            />
          </div>
        )}
      </div>
    </main>
  );
}
