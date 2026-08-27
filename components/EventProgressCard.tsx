import { ProgressBar } from "@/components/ProgressBar";
import type { EventProgress } from "@/lib/progress";

type EventProgressCardProps = {
  progress: EventProgress;
};

export function EventProgressCard({ progress }: EventProgressCardProps) {
  const empty = progress.totalQuestions === 0;
  const topicPercent =
    progress.topicsTotal === 0
      ? 0
      : (progress.topicsPracticed / progress.topicsTotal) * 100;

  return (
    <section
      aria-labelledby="event-progress-heading"
      className="mt-10 rounded-3xl border border-stone-200/80 bg-surface p-5 shadow-[0_8px_30px_rgba(28,45,41,0.05)] sm:p-6"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
        Practice activity
      </p>
      <h2
        id="event-progress-heading"
        className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink"
      >
        Your Progress
      </h2>
      <p className="mt-1 text-sm text-stone-600">
        Coverage of topics you have tried — not mastery.
      </p>

      {empty ? (
        <p className="mt-5 text-sm leading-relaxed text-stone-600">
          No practice yet. Start Practice to begin tracking your progress.
        </p>
      ) : (
        <>
          <dl className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-parchment/80 px-4 py-3">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                Questions answered
              </dt>
              <dd className="mt-1 font-display text-2xl font-semibold text-ink">
                {progress.totalQuestions}
              </dd>
            </div>
            <div className="rounded-2xl bg-parchment/80 px-4 py-3">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                Accuracy
              </dt>
              <dd className="mt-1 font-display text-2xl font-semibold text-ink">
                {progress.accuracyPercent ?? 0}%
              </dd>
            </div>
            <div className="rounded-2xl bg-parchment/80 px-4 py-3">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                Topics practiced
              </dt>
              <dd className="mt-1 font-display text-2xl font-semibold text-ink">
                {progress.topicsPracticed} of {progress.topicsTotal}
              </dd>
            </div>
          </dl>
          <div className="mt-5">
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <span className="text-sm font-medium text-ink">
                Topic coverage
              </span>
              <span className="font-mono text-sm tabular-nums text-stone-600">
                {progress.topicsPracticed} / {progress.topicsTotal}
              </span>
            </div>
            <ProgressBar
              value={topicPercent}
              label={`${progress.topicsPracticed} of ${progress.topicsTotal} topics practiced`}
            />
          </div>
        </>
      )}
    </section>
  );
}
