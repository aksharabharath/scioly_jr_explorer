import { EventIcon } from "@/components/EventIcon";
import { formatXpGain } from "@/lib/gamification";
import type { ExpeditionLogEntry } from "@/lib/expeditions";
import { getKnownEvent } from "@/lib/mock/events";
import Link from "next/link";

type ExpeditionLogProps = {
  entries: ExpeditionLogEntry[];
};

function formatEndedAt(endedAt: string | null): string | null {
  if (!endedAt) {
    return null;
  }
  const date = new Date(endedAt);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ExpeditionLog({ entries }: ExpeditionLogProps) {
  return (
    <section aria-labelledby="expedition-log-heading">
      <h1
        id="expedition-log-heading"
        className="font-display text-2xl font-semibold tracking-tight text-ink"
      >
        Expedition log
      </h1>
      <p className="mt-1 text-sm text-stone-600">
        Finished 10-question expeditions. Open an entry to visit that field
        site.
      </p>
      {entries.length === 0 ? (
        <p className="mt-4 text-sm text-stone-600">
          Your field log is empty. Finish an expedition and it will be written
          here.
        </p>
      ) : (
        <ul className="mt-4 space-y-2">
          {entries.map((entry) => {
            const when = formatEndedAt(entry.endedAt);
            const icon = getKnownEvent(entry.eventId)?.icon ?? "star";
            return (
              <li key={entry.sessionId}>
                <Link
                  href={`/events/${entry.eventId}`}
                  className="journal-panel block rounded-2xl p-3 outline-offset-4 transition hover:-translate-y-0.5 sm:p-3.5"
                >
                  <div className="flex items-start gap-3 md:grid md:grid-cols-[8.5rem_minmax(0,1fr)_auto_auto] md:items-center md:gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-parchment text-teal-dark md:hidden">
                      <EventIcon id={icon} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 md:contents">
                      <p className="text-xs font-medium text-stone-500 md:text-sm">
                        {when ?? "—"}
                      </p>
                      <h2 className="font-display text-base font-semibold text-ink md:text-lg">
                        {entry.eventName}
                      </h2>
                      <p className="mt-1 text-sm font-medium text-ink md:mt-0 md:text-right">
                        {entry.correctAnswers}/{entry.questionsAnswered} correct
                      </p>
                      <p className="mt-1 text-sm tabular-nums text-stone-600 md:mt-0 md:text-right">
                        {formatXpGain(entry.derivedXp)}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
