import type { OverallProgress } from "@/lib/progress";

type OverallProgressCardProps = {
  progress: OverallProgress;
};

export function OverallProgressCard({ progress }: OverallProgressCardProps) {
  const empty = progress.totalQuestions === 0;

  return (
    <section
      aria-labelledby="practice-progress-heading"
      className="rounded-3xl border border-stone-200/80 bg-surface p-5 sm:p-6"
    >
      <h2
        id="practice-progress-heading"
        className="font-display text-2xl font-semibold tracking-tight text-ink"
      >
        Your Progress
      </h2>
      <p className="mt-1 text-sm text-stone-600">
        Every question you have tried, including repeats. This can include
        events that are not on your list right now.
      </p>

      {empty ? (
        <p className="mt-5 text-sm leading-relaxed text-stone-600">
          No questions yet. Pick an event and tap Practice.
        </p>
      ) : (
        <dl className="mt-5 grid gap-3 sm:grid-cols-3">
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
            <dt className="text-sm text-stone-500">Events tried</dt>
            <dd className="mt-1 font-display text-2xl font-semibold text-ink">
              {progress.eventsPracticed}
            </dd>
          </div>
        </dl>
      )}
    </section>
  );
}
