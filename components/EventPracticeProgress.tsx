import { ProgressBar } from "@/components/ProgressBar";
import type { EventProgress } from "@/lib/progress";

type EventPracticeProgressProps = {
  eventName: string;
  progress: EventProgress;
  expeditionsCompleted: number;
  liveBankSize: number;
};

export function EventPracticeProgress({
  eventName,
  progress,
  expeditionsCompleted,
  liveBankSize,
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

  const uniquePercent =
    liveBankSize === 0
      ? 0
      : Math.min(100, (progress.uniqueQuestions / liveBankSize) * 100);

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
      <p className="mt-2 text-sm text-stone-600">
        Practice activity, not a mastery grade.
      </p>
      <dl className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-parchment/80 px-4 py-3">
          <dt className="text-sm text-stone-500">Questions practiced</dt>
          <dd className="mt-1 font-display text-2xl font-semibold text-ink">
            {progress.totalQuestions}
          </dd>
        </div>
        <div className="rounded-2xl bg-parchment/80 px-4 py-3">
          <dt className="text-sm text-stone-500">Unique questions tried</dt>
          <dd className="mt-1 font-display text-2xl font-semibold text-ink">
            {progress.uniqueQuestions}
          </dd>
        </div>
        <div className="rounded-2xl bg-parchment/80 px-4 py-3">
          <dt className="text-sm text-stone-500">Expeditions completed</dt>
          <dd className="mt-1 font-display text-2xl font-semibold text-ink">
            {expeditionsCompleted}
          </dd>
        </div>
      </dl>
      <div className="mt-5">
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <span className="text-sm text-stone-600">Unique questions tried</span>
          <span className="font-mono text-sm tabular-nums text-stone-500">
            {progress.uniqueQuestions} / {liveBankSize}
          </span>
        </div>
        <ProgressBar
          value={uniquePercent}
          label={`Unique ${eventName} questions tried`}
          fillClassName="bg-gold"
        />
      </div>
    </section>
  );
}
