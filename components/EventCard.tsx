import { EventIcon } from "@/components/EventIcon";
import { eventDashboardCta, isPlayablePracticeEvent } from "@/lib/mock/events";
import type { EventAccent, ScienceEvent } from "@/lib/types";
import Link from "next/link";

const ACCENTS: Record<EventAccent, { wrap: string; icon: string }> = {
  amber: { wrap: "bg-amber-100", icon: "text-amber-800" },
  sky: { wrap: "bg-sky-100", icon: "text-sky-800" },
  rose: { wrap: "bg-rose-100", icon: "text-rose-800" },
  emerald: {
    wrap: "bg-emerald-100",
    icon: "text-emerald-800",
  },
  violet: {
    wrap: "bg-violet-100",
    icon: "text-violet-800",
  },
  indigo: {
    wrap: "bg-indigo-100",
    icon: "text-indigo-800",
  },
};

type EventCardProps = {
  event: ScienceEvent;
  href?: string;
  cta?: string;
};

export function EventCard({ event, href, cta }: EventCardProps) {
  const accent = ACCENTS[event.accent];
  const locked = !event.unlocked;
  const playable = isPlayablePracticeEvent(event);
  const label = cta ?? eventDashboardCta(event);

  const card = (
    <article
      className={`flex h-full flex-col rounded-3xl border bg-surface p-5 ${
        locked
          ? "border-dashed border-stone-300"
          : "border-stone-200/80"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${accent.wrap} ${accent.icon}`}
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
          <p className="mt-1 text-sm leading-relaxed text-stone-600">
            {event.shortDescription}
          </p>
        </div>
      </div>

      {locked || !playable ? (
        <p className="mt-5 rounded-2xl bg-stone-100 px-3 py-2 text-sm font-medium text-stone-600">
          🔒 Coming later
        </p>
      ) : (
        <p className="mt-auto pt-5 text-sm font-semibold text-teal-dark">
          {label}
        </p>
      )}
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
