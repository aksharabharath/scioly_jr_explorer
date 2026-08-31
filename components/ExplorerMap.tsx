import { EventIcon } from "@/components/EventIcon";
import { ProgressBar } from "@/components/ProgressBar";
import {
  completedSessionCountForEvent,
  uniqueQuestionsPracticed,
} from "@/lib/expeditions";
import { fieldSiteSubtitle, fieldSiteTint } from "@/lib/field-sites";
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
      <h1
        id="explorer-map-heading"
        className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
      >
        Map
      </h1>
      <p className="mt-1 text-sm text-stone-600">
        How much of your field sites have you explored? Pins open the site hub.
        This does not lock content.
      </p>
      {playable.length === 0 ? (
        <p className="mt-4 text-sm text-stone-600">
          Choose a field site on My Events to place it on this map.
        </p>
      ) : (
        <div className="journal-panel relative mt-4 overflow-hidden rounded-3xl p-3 sm:p-4">
          <MapPaper />
          <ol className="relative z-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
            {playable.map((event) => {
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
              const site = fieldSiteSubtitle(event.id);
              const tint = fieldSiteTint(event.id);

              return (
                <li key={event.id}>
                  <Link
                    href={`/events/${event.id}`}
                    className={`block min-h-11 rounded-2xl border border-stone-200/80 bg-surface/90 p-3 outline-offset-4 transition hover:-translate-y-0.5 ${
                      discovered ? "pin-explored" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${tint.wrap} ${tint.icon}`}
                      >
                        <span
                          className={`absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-surface ${
                            discovered ? tint.pin : "bg-stone-300"
                          }`}
                          aria-hidden="true"
                        />
                        <EventIcon id={event.icon} className="h-6 w-6" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
                          {discovered ? "Explored" : "Not explored yet"}
                        </p>
                        <h3 className="font-display text-lg font-semibold text-ink">
                          {event.name}
                        </h3>
                        {site ? (
                          <p className="text-sm text-stone-600">{site}</p>
                        ) : null}
                        <p className="mt-1 text-sm font-medium tabular-nums text-ink">
                          {discovered
                            ? `${unique} / ${bank} explored · ${expeditions} expeditions`
                            : `${bank} questions waiting`}
                        </p>
                        <div className="mt-3">
                          <ProgressBar
                            value={percent}
                            label={`Unique ${event.name} questions tried`}
                            fillClassName="bg-gold-dark"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </section>
  );
}

function MapPaper() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-teal-dark/15"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="journal-contours"
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M2 24c8-10 16-10 24 0s16 10 24 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#journal-contours)" />
      <path
        d="M12 18 L40 22 L40 8 Z"
        fill="currentColor"
        opacity="0.35"
        transform="translate(8,8)"
      />
      <circle
        cx="28"
        cy="28"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.45"
      />
      <path
        d="M18 72 C 120 40, 200 160, 280 90"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeDasharray="5 7"
        opacity="0.4"
      />
      <path
        d="M40 140 C 160 110, 220 180, 340 130"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeDasharray="4 8"
        opacity="0.3"
      />
    </svg>
  );
}
