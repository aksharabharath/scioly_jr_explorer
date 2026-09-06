import type { BaseCampTopicRef } from "@/lib/base-camp";
import Link from "next/link";

type EventHubTrickyTopicsProps = {
  eventId: string;
  topics: BaseCampTopicRef[];
};

export function EventHubTrickyTopics({
  eventId,
  topics,
}: EventHubTrickyTopicsProps) {
  return (
    <section aria-labelledby="event-tricky-heading">
      <h2
        id="event-tricky-heading"
        className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl"
      >
        Tricky topics
      </h2>
      {topics.length === 0 ? (
        <div className="mt-3 max-w-xl">
          <p className="text-sm font-medium text-ink">
            Your tricky topics will appear here
          </p>
          <p className="mt-1 text-sm leading-relaxed text-stone-600">
            Keep exploring this field site. We&apos;ll help you find areas you
            can improve.
          </p>
        </div>
      ) : (
        <>
          <p className="mt-1 text-sm text-stone-600">
            Practice these next to get stronger.
          </p>
          <ul className="mt-4 space-y-3">
            {topics.map((topic) => (
              <li
                key={topic.topicId}
                className="flex flex-col gap-3 rounded-2xl border border-stone-200/70 bg-surface/80 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-display text-lg font-semibold text-ink">
                    {topic.name}
                  </p>
                  <p className="mt-0.5 text-sm text-stone-600">
                    This topic could use some more practice.
                  </p>
                </div>
                <Link
                  href={`/events/${eventId}/practice?mode=weak&topic=${topic.topicId}`}
                  className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-teal-dark px-5 py-2 text-sm font-semibold text-parchment hover:bg-teal"
                >
                  Practice this topic
                </Link>
              </li>
            ))}
          </ul>
          {topics.length > 1 ? (
            <p className="mt-3">
              <Link
                href={`/events/${eventId}/practice?mode=weak`}
                className="text-sm font-medium text-teal-dark underline-offset-4 hover:underline"
              >
                Practice all tricky topics
              </Link>
            </p>
          ) : null}
        </>
      )}
    </section>
  );
}
