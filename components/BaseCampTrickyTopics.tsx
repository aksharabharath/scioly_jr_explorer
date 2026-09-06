import type { BaseCampTopicRef } from "@/lib/base-camp";
import Link from "next/link";

type BaseCampTrickyTopicsProps = {
  topics: BaseCampTopicRef[];
};

export function BaseCampTrickyTopics({ topics }: BaseCampTrickyTopicsProps) {
  return (
    <section aria-labelledby="tricky-heading">
      <h2
        id="tricky-heading"
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
            Keep exploring and practicing. We&apos;ll help you find areas you
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
                    {topic.eventName}. This topic could use some more practice.
                  </p>
                </div>
                <Link
                  href={`/events/${topic.eventId}/practice?mode=weak&topic=${topic.topicId}`}
                  className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-teal-dark px-5 py-2 text-sm font-semibold text-parchment hover:bg-teal"
                >
                  Practice this topic
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
