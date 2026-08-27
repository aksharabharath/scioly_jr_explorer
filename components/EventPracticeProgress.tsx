import type { EventProgress } from "@/lib/progress";

type EventPracticeProgressProps = {
  eventName: string;
  progress: EventProgress;
};

export function EventPracticeProgress({
  eventName,
  progress,
}: EventPracticeProgressProps) {
  if (progress.totalQuestions === 0) {
    return (
      <section
        aria-labelledby="event-progress-heading"
        className="mt-8 rounded-3xl border border-stone-200/80 bg-surface p-5 sm:p-6"
      >
        <h2
          id="event-progress-heading"
          className="font-display text-2xl font-semibold tracking-tight text-ink"
        >
          Your Progress
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          You haven&apos;t practiced this event yet.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          Start a 10-question practice set to begin tracking your progress.
        </p>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="event-progress-heading"
      className="mt-8 rounded-3xl border border-stone-200/80 bg-surface p-5 sm:p-6"
    >
      <h2
        id="event-progress-heading"
        className="font-display text-2xl font-semibold tracking-tight text-ink"
      >
        Your {eventName} Progress
      </h2>
      <dl className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-parchment/80 px-4 py-3">
          <dt className="text-sm text-stone-500">Questions tried</dt>
          <dd className="mt-1 font-display text-2xl font-semibold text-ink">
            {progress.totalQuestions}
          </dd>
        </div>
        <div className="rounded-2xl bg-parchment/80 px-4 py-3">
          <dt className="text-sm text-stone-500">Accuracy</dt>
          <dd className="mt-1 font-display text-2xl font-semibold text-ink">
            {progress.accuracyPercent ?? 0}%
          </dd>
        </div>
        <div className="rounded-2xl bg-parchment/80 px-4 py-3">
          <dt className="text-sm text-stone-500">Correct</dt>
          <dd className="mt-1 font-display text-2xl font-semibold text-ink">
            {progress.totalCorrect} / {progress.totalQuestions}
          </dd>
        </div>
      </dl>
    </section>
  );
}
