import { EventIcon } from "@/components/EventIcon";
import { formatXpGain } from "@/lib/gamification";
import type { ExpeditionLogEntry } from "@/lib/expeditions";
import type { EventIconId } from "@/lib/types";

const EVENT_ICONS: Record<string, EventIconId> = {
  entomology: "bug",
  "anatomy-physiology": "body",
  "water-quality": "water",
  ecology: "leaf",
  "crime-busters": "search",
};

type ExpeditionLogProps = {
  entries: ExpeditionLogEntry[];
};

export function ExpeditionLog({ entries }: ExpeditionLogProps) {
  return (
    <section aria-labelledby="expedition-log-heading">
      <h2
        id="expedition-log-heading"
        className="font-display text-2xl font-semibold tracking-tight text-ink"
      >
        Expedition log
      </h2>
      <p className="mt-1 text-sm text-stone-600">
        Recent completed 10-question sets. XP is from this set&apos;s published
        rules, not a second scoreboard.
      </p>
      {entries.length === 0 ? (
        <p className="mt-4 text-sm text-stone-600">
          Finish an expedition to write your first log entry.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {entries.map((entry) => (
            <li
              key={entry.sessionId}
              className="rounded-3xl border border-stone-200/80 bg-surface p-4 sm:p-5"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-parchment text-teal-dark">
                  <EventIcon
                    id={EVENT_ICONS[entry.eventId] ?? "star"}
                    className="h-6 w-6"
                  />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {entry.eventName}
                  </h3>
                  <p className="mt-1 text-sm text-stone-600">
                    {entry.questionsAnswered} questions · {entry.correctAnswers}{" "}
                    correct
                  </p>
                  <p className="mt-1 font-display text-xl font-semibold tabular-nums text-ink">
                    {formatXpGain(entry.derivedXp)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
