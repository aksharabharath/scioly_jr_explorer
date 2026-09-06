type TrickyTopicRow = {
  id: string;
  name: string;
  recentMisses: number;
};

type EventTrickyTopicsProps = {
  topics: TrickyTopicRow[];
};

function topicNote(recentMisses: number): string {
  if (recentMisses >= 2) {
    return `${recentMisses} recent misses`;
  }
  return "Needs another look";
}

export function EventTrickyTopics({ topics }: EventTrickyTopicsProps) {
  return (
    <section
      aria-labelledby="tricky-topics-heading"
      className="journal-panel h-full rounded-3xl p-3 sm:p-4"
    >
      <h2
        id="tricky-topics-heading"
        className="font-display text-lg font-semibold tracking-tight text-ink"
      >
        Topics to revisit
      </h2>
      {topics.length === 0 ? (
        <>
          <p className="mt-2 text-sm font-medium text-ink">
            Nothing to revisit yet.
          </p>
          <p className="mt-1 text-sm leading-relaxed text-stone-600">
            Keep exploring this field site and we&apos;ll point out topics worth
            another look.
          </p>
        </>
      ) : (
        <>
          <p className="mt-1 text-sm text-stone-600">
            Topics that could use another look.
          </p>
          <ol className="mt-2 space-y-1.5">
            {topics.map((topic, index) => (
              <li key={topic.id}>
                <p className="font-display text-base font-semibold tracking-tight text-ink">
                  {index + 1}. {topic.name}
                </p>
                <p className="text-sm text-stone-600">
                  {topicNote(topic.recentMisses)}
                </p>
              </li>
            ))}
          </ol>
        </>
      )}
    </section>
  );
}
