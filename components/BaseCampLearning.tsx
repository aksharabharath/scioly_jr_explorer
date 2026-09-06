import type { BaseCampTopicRef } from "@/lib/base-camp";

type BaseCampLearningProps = {
  needsPractice: BaseCampTopicRef[];
  improving: BaseCampTopicRef[];
  strong: BaseCampTopicRef[];
};

export function BaseCampLearning({
  needsPractice,
  improving,
  strong,
}: BaseCampLearningProps) {
  const hasAny =
    needsPractice.length > 0 || improving.length > 0 || strong.length > 0;

  return (
    <section aria-labelledby="learning-heading">
      <h2
        id="learning-heading"
        className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl"
      >
        Your learning
      </h2>
      <p className="mt-1 text-sm text-stone-600">
        How topics are going, from recent practice — not XP or Explorer Level.
      </p>

      {!hasAny ? (
        <p className="mt-4 text-sm leading-relaxed text-stone-600">
          Practice a few questions and we&apos;ll show which topics need
          practice, which are improving, and which are strong.
        </p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <LearningColumn
            title="Needs practice"
            topics={needsPractice}
            empty="Nothing here yet."
          />
          <LearningColumn
            title="Improving"
            topics={improving}
            empty="Nothing here yet."
          />
          <LearningColumn
            title="Strong"
            topics={strong}
            empty="Nothing here yet."
          />
        </div>
      )}
    </section>
  );
}

function LearningColumn({
  title,
  topics,
  empty,
}: {
  title: string;
  topics: BaseCampTopicRef[];
  empty: string;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      {topics.length === 0 ? (
        <p className="mt-2 text-sm text-stone-500">{empty}</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {topics.map((topic) => (
            <li key={topic.topicId} className="text-sm text-ink">
              <span className="font-medium">{topic.name}</span>
              <span className="mt-0.5 block text-xs text-stone-500">
                {topic.eventName}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
