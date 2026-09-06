import { EventIcon } from "@/components/EventIcon";
import { fieldSiteSubtitle, fieldSiteTint } from "@/lib/field-sites";
import type { ScienceEvent } from "@/lib/types";

type LandingHeroNotebookProps = {
  events: ScienceEvent[];
};

export function LandingHeroNotebook({ events }: LandingHeroNotebookProps) {
  return (
    <div
      className="landing-settle journal-panel relative overflow-hidden rounded-3xl p-5 sm:p-6"
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(transparent, transparent 27px, color-mix(in srgb, var(--ink) 8%, transparent) 28px)",
        }}
      />
      <svg
        className="pointer-events-none absolute -right-6 -top-4 h-48 w-56 text-teal/15"
        viewBox="0 0 200 160"
        fill="none"
      >
        <path
          d="M20 90c20-28 40-28 58-8 18 20 38 18 56-6 16-22 38-24 52-8"
          stroke="currentColor"
          strokeWidth="1.25"
        />
        <path
          d="M12 118c24-22 46-18 64 4 20 24 44 20 62-4 16-22 36-20 50-2"
          stroke="currentColor"
          strokeWidth="1.25"
        />
        <path
          d="M36 48c14-16 32-14 44 2 14 18 30 16 44-4"
          stroke="currentColor"
          strokeWidth="1.25"
        />
      </svg>
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-teal">
            Field notebook
          </p>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal text-parchment">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
              <circle
                cx="12"
                cy="12"
                r="8.5"
                stroke="currentColor"
                strokeWidth="1.75"
              />
              <path
                d="M12 6.5v2M12 15.5v2M6.5 12h2M15.5 12h2"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
              <path d="M12 9.2 14.8 12 12 14.8 9.2 12z" fill="currentColor" />
            </svg>
          </span>
        </div>
        <p className="mt-4 font-display text-lg font-semibold tracking-tight text-ink">
          Today’s sites
        </p>
        <p className="mt-1 text-sm leading-relaxed text-stone-600">
          Five field sites, ready for a 10-question expedition.
        </p>
        <ul className="mt-5 grid grid-cols-2 gap-2">
          {events.map((event, index) => {
            const tint = fieldSiteTint(event.id);
            const site = fieldSiteSubtitle(event.id);
            return (
              <li
                key={event.id}
                className="landing-stamp flex items-center gap-2.5 rounded-2xl px-2.5 py-2"
                style={{ animationDelay: `${80 + index * 70}ms` }}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tint.wrap} ${tint.icon}`}
                >
                  <EventIcon id={event.icon} className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold leading-tight text-ink">
                    {event.name}
                  </span>
                  {site ? (
                    <span className="mt-0.5 block text-[0.65rem] font-medium uppercase leading-tight tracking-[0.08em] text-stone-500">
                      {site}
                    </span>
                  ) : null}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
