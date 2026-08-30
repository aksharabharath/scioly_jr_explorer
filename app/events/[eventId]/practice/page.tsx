import { PracticeQuiz } from "@/components/PracticeQuiz";
import {
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
} from "@/lib/practice-attempts";
import { requireSelectedEvent } from "@/lib/student-events";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    return { title: "Practice · Jr. Explorer" };
  }
  const mode = parsePracticeMode((await searchParams).mode);
  if (mode === "weak") {
    return { title: `Tricky Topics · ${data.event.name} · Jr. Explorer` };
  }
  return { title: `Practice · ${data.event.name} · Jr. Explorer` };
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
  const mode = parsePracticeMode((await searchParams).mode);
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
  const weakFallback = mode === "weak" && !hasWeakTopics(priorAttempts);

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <p className="text-sm">
          <Link
            href={`/events/${data.event.id}`}
            className="font-medium text-teal underline-offset-4 hover:underline"
          >
            ← {data.event.name}
          </Link>
        </p>
        <p className="mt-6 text-sm font-semibold text-teal">
          {mode === "weak" ? "Practice Tricky Topics" : "Practice"}
        </p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink">
          {data.event.name}
        </h1>
        <p className="mt-2 text-sm text-stone-600">
          {mode === "weak"
            ? "These questions focus on topics you have found tricky."
            : "One question at a time. Check your thinking, then keep going."}
        </p>
        {weakFallback ? (
          <p className="mt-3 rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-950">
            No weak points yet — keep practicing and we&apos;ll learn what to
            revisit. This session uses regular adaptive practice instead.
          </p>
        ) : null}
        <div className="mt-6">
          <PracticeQuiz
            eventId={data.event.id}
            eventName={data.event.name}
            questions={data.questions}
            priorAttempts={priorAttempts}
            priorBadgeAttempts={priorBadgeAttempts}
            allQuestions={allQuestions}
            initialAttemptCount={attemptCount}
            initialXp={gamification.xp}
            initialStreakDays={gamification.streakDays}
            mode={mode}
          />
        </div>
      </div>
    </main>
  );
}
