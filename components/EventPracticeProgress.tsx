type EventPracticeProgressProps = {
  questionsAnswered: number;
  topicsExplored: number;
  expeditionsCompleted: number;
};

export function EventPracticeProgress({
  questionsAnswered,
  topicsExplored,
  expeditionsCompleted,
}: EventPracticeProgressProps) {
  return (
    <section
      aria-labelledby="event-progress-heading"
      className="journal-panel h-full rounded-3xl p-3 sm:p-4"
    >
      <h2
        id="event-progress-heading"
        className="font-display text-lg font-semibold tracking-tight text-ink"
      >
        Your field notes
      </h2>
      <ul className="mt-2 space-y-1 text-sm">
        <li className="font-medium text-ink">
          {questionsAnswered === 1
            ? "1 question answered"
            : `${questionsAnswered} questions answered`}
        </li>
        <li className="text-stone-600">
          {topicsExplored === 1
            ? "1 topic explored"
            : `${topicsExplored} topics explored`}
        </li>
        <li className="text-stone-600">
          {expeditionsCompleted === 1
            ? "1 expedition"
            : `${expeditionsCompleted} expeditions`}
        </li>
      </ul>
    </section>
  );
}
