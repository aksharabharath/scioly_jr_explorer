import type { BaseCampTopicRef } from "@/lib/base-camp";

type EventHubLearningProps = {
  needsPractice: BaseCampTopicRef[];
  improving: BaseCampTopicRef[];
  strong: BaseCampTopicRef[];
};

export function EventHubLearning({
  needsPractice,
  improving,
  strong,
}: EventHubLearningProps) {
  const hasAny =
    needsPractice.length > 0 || improving.length > 0 || strong.length > 0;

  return (
    <section aria-labelledby="event-learning-heading">
      <h2
        id="event-learning-heading"
        className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl"
      >
        Learning in this field site
      </h2>
      <p className="mt-1 text-sm text-stone-600">
        From recent practice here — not XP or Explorer Level.
      </p>

      {!hasAny ? (
        <p className="mt-3 text-sm leading-relaxed text-stone-600">
          Practice a few questions and we&apos;ll show which topics need
          practice, which are improving, and which are strong.
        </p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <LearningColumn title="Needs practice" topics={needsPractice} />
          <LearningColumn title="Improving" topics={improving} />
          <LearningColumn title="Strong" topics={strong} />
        </div>
      )}
    </section>
  );
}

function LearningColumn({
  title,
  topics,
}: {
  title: string;
  topics: BaseCampTopicRef[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      {topics.length === 0 ? (
        <p className="mt-2 text-sm text-stone-500">Nothing here yet.</p>
      ) : (
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink">
          {topics.map((topic) => (
            <li key={topic.topicId}>{topic.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
