import { EventIcon } from "@/components/EventIcon";
import { ProgressBar } from "@/components/ProgressBar";
import {
  completedSessionCountForEvent,
  uniqueQuestionsPracticed,
} from "@/lib/expeditions";
import { isLivePracticeQuestion } from "@/lib/mock/curriculum";
import { isPlayablePracticeEvent } from "@/lib/mock/events";
import type { ExpeditionAttempt } from "@/lib/expeditions";
import type { Question, ScienceEvent } from "@/lib/types";
import Link from "next/link";

type ExplorerMapProps = {
  events: ScienceEvent[];
  attempts: ExpeditionAttempt[];
  questions: Question[];
};

export function ExplorerMap({
  events,
  attempts,
  questions,
}: ExplorerMapProps) {
  const liveCount = new Map<string, number>();
  for (const question of questions) {
    if (!isLivePracticeQuestion(question)) {
      continue;
    }
    liveCount.set(question.eventId, (liveCount.get(question.eventId) ?? 0) + 1);
  }
  const playable = events.filter(isPlayablePracticeEvent);

  return (
    <section aria-labelledby="explorer-map-heading">
      <h2
        id="explorer-map-heading"
        className="font-display text-2xl font-semibold tracking-tight text-ink"
      >
        Explorer Map
      </h2>
      <p className="mt-1 text-sm text-stone-600">
        Events you chose. This map shows practice activity, not a lock on
        content.
      </p>
      {playable.length === 0 ? (
        <p className="mt-4 text-sm text-stone-600">
          Add a playable event on My Events to see it here.
        </p>
      ) : (
        <ol className="mt-5 space-y-3">
          {playable.map((event, index) => {
            const unique = uniqueQuestionsPracticed(
              event.id,
              attempts,
              questions,
            );
            const expeditions = completedSessionCountForEvent(
              event.id,
              attempts,
              questions,
            );
            const bank = liveCount.get(event.id) ?? 0;
            const percent =
              bank === 0 ? 0 : Math.min(100, (unique / bank) * 100);
            const discovered = unique > 0;

            return (
              <li key={event.id}>
                <Link
                  href={`/events/${event.id}`}
                  className="block rounded-3xl border border-stone-200/80 bg-surface p-4 outline-offset-4 transition hover:-translate-y-0.5 sm:p-5"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-parchment text-teal-dark">
                      <EventIcon id={event.icon} className="h-6 w-6" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-stone-500">
                        Location {index + 1}
                      </p>
                      <h3 className="font-display text-lg font-semibold text-ink">
                        {event.name}
                      </h3>
                      <p className="mt-1 text-sm text-stone-600">
                        {discovered
                          ? `${unique} unique questions tried · ${expeditions} expeditions`
                          : "Not practiced yet"}
                      </p>
                      <div className="mt-3">
                        <ProgressBar
                          value={percent}
                          label={`Unique ${event.name} questions tried`}
                          fillClassName="bg-gold"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
