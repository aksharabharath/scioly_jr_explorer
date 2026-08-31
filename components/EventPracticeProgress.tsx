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
        className="journal-panel rounded-3xl p-4 sm:p-5"
      >
        <h2
          id="event-progress-heading"
          className="font-display text-xl font-semibold tracking-tight text-ink"
        >
          Ground covered
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          You haven&apos;t practiced this field site yet.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          Start a 10-question expedition to begin tracking what you&apos;ve
          explored.
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
      className="journal-panel rounded-3xl p-4 sm:p-5"
    >
      <h2
        id="event-progress-heading"
        className="font-display text-xl font-semibold tracking-tight text-ink"
      >
        Ground covered
      </h2>
      <p className="mt-1 text-sm text-stone-600">
        Question coverage, not a mastery grade.
      </p>
      <p className="mt-3 text-sm font-medium text-ink">
        {progress.uniqueQuestions} of {liveBankSize} explored
      </p>
      <div className="mt-2">
        <ProgressBar
          value={uniquePercent}
          label={`Unique ${eventName} questions tried`}
          fillClassName="bg-gold-dark"
        />
      </div>
      <p className="mt-2 text-sm text-stone-600">
        {expeditionsCompleted === 1
          ? "1 expedition completed"
          : `${expeditionsCompleted} expeditions completed`}
      </p>
    </section>
  );
}
