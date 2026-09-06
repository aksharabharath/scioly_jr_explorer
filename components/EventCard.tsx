import { EventIcon } from "@/components/EventIcon";
import { fieldSiteSubtitle, fieldSiteTint } from "@/lib/field-sites";
import { eventDashboardCta, isPlayablePracticeEvent } from "@/lib/mock/events";
import type { ScienceEvent } from "@/lib/types";
import Link from "next/link";

type EventCardProps = {
  event: ScienceEvent;
  href?: string;
  cta?: string;
  /** Short activity line, e.g. unique questions and expeditions. */
  progressLine?: string;
  /** When false, omit the bottom CTA (display-only marketing cards). */
  showCta?: boolean;
};

export function EventCard({
  event,
  href,
  cta,
  progressLine,
  showCta = true,
}: EventCardProps) {
  const tint = fieldSiteTint(event.id);
  const site = fieldSiteSubtitle(event.id);
  const locked = !event.unlocked;
  const playable = isPlayablePracticeEvent(event);
  const label = cta ?? eventDashboardCta(event);

  const card = (
    <article
      className={`flex h-full flex-col rounded-3xl border journal-panel p-4 ${
        locked ? "border-dashed border-stone-300" : ""
      } ${!locked && playable ? tint.wash : ""}`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${tint.wrap} ${tint.icon}`}
        >
          {locked ? (
            <LockIcon />
          ) : (
            <EventIcon id={event.icon} className="h-6 w-6" />
          )}
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
            {event.name}
            {locked ? <span className="sr-only"> (coming later)</span> : null}
          </h3>
          {site && !locked ? (
            <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
              {site}
            </p>
          ) : null}
          <p className="mt-1.5 text-sm leading-relaxed text-stone-600">
            {event.shortDescription}
          </p>
          {progressLine && !locked && playable ? (
            <p className="mt-2 text-sm font-medium text-ink">{progressLine}</p>
          ) : null}
        </div>
      </div>

      {showCta ? (
        locked || !playable ? (
          <p className="mt-5 rounded-2xl bg-stone-100 px-3 py-2 text-sm font-medium text-stone-600">
            Coming later
          </p>
        ) : (
          <p className="mt-auto pt-4 text-sm font-semibold text-teal-dark">
            {label}
          </p>
        )
      ) : null}
    </article>
  );

  if (!href || locked || !playable) {
    return card;
  }

  return (
    <Link
      href={href}
      className="block h-full rounded-3xl outline-offset-4 transition hover:-translate-y-0.5"
    >
      {card}
    </Link>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 text-stone-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden="true"
    >
      <rect x="6" y="11" width="12" height="9" rx="2" />
      <path d="M8.5 11V8.5a3.5 3.5 0 0 1 7 0V11" strokeLinecap="round" />
    </svg>
  );
}
