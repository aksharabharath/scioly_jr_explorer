import type { TopicLearningState } from "@/lib/learning/adaptive";
import type { Topic } from "@/lib/types";
import Link from "next/link";

type CatalogTopic = {
  topic: Topic;
  state: TopicLearningState | null;
  isTricky: boolean;
};

type EventHubTopicCatalogProps = {
  eventId: string;
  items: CatalogTopic[];
};

const STATE_LABEL: Record<TopicLearningState, string> = {
  "needs-practice": "Needs practice",
  improving: "Improving",
  strong: "Strong",
};

export function EventHubTopicCatalog({
  eventId,
  items,
}: EventHubTopicCatalogProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="event-topics-heading">
      <h2
        id="event-topics-heading"
        className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl"
      >
        Topics at this field site
      </h2>
      <p className="mt-1 text-sm text-stone-600">
        What you can explore and practice here — not a textbook.
      </p>
      <ul className="mt-4 space-y-4">
        {items.map(({ topic, state, isTricky }) => (
          <li
            key={topic.id}
            className="border-b border-stone-200/70 pb-4 last:border-b-0 last:pb-0"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div className="min-w-0">
                <p className="font-medium text-ink">{topic.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-stone-600">
                  {topic.shortDescription}
                </p>
                {state ? (
                  <p className="mt-1 text-xs font-medium text-stone-500">
                    {STATE_LABEL[state]}
                  </p>
                ) : null}
              </div>
              {isTricky ? (
                <Link
                  href={`/events/${eventId}/practice?mode=weak&topic=${topic.id}`}
                  className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-stone-200 px-4 py-2 text-sm font-semibold text-ink hover:bg-parchment"
                >
                  Practice this topic
                </Link>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
