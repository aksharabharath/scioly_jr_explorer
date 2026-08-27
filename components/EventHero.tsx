import { EventIcon } from "@/components/EventIcon";
import { MasteryBadge } from "@/components/MasteryBadge";
import { streakLabel } from "@/lib/gamification";
import type { ExplorerProfile, ScienceEvent } from "@/lib/types";

type EventHeroProps = {
  event: ScienceEvent;
  explorer: ExplorerProfile;
  overview: string;
};

export function EventHero({ event, explorer, overview }: EventHeroProps) {
  const streak = streakLabel(explorer.streakDays);

  return (
    <section className="rounded-3xl border border-stone-200/80 bg-surface p-5 shadow-[0_8px_30px_rgba(28,45,41,0.05)] sm:p-7">
      <div className="flex items-start gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-800">
          <EventIcon id={event.icon} className="h-7 w-7" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
            Science Olympiad event
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {event.name}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-stone-600">
            {overview}
          </p>
        </div>
      </div>

      <dl className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-parchment/80 px-4 py-3">
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
            Explorer Level
          </dt>
          <dd className="mt-1 font-display text-xl font-semibold text-ink">
            {explorer.explorerLevel}
          </dd>
          <p className="mt-1 font-mono text-sm tabular-nums text-stone-600">
            {explorer.currentXp} XP
          </p>
          {streak ? (
            <p className="mt-1 text-sm font-medium text-ink">🔥 {streak}</p>
          ) : null}
          <p className="mt-1 text-xs text-stone-500">Your overall journey</p>
        </div>
        <div className="rounded-2xl bg-parchment/80 px-4 py-3">
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
            Event Level
          </dt>
          <dd className="mt-1 font-display text-xl font-semibold text-ink">
            {event.eventLevel}
          </dd>
          <p className="mt-1 text-xs text-stone-500">Progress in {event.name}</p>
        </div>
        <div className="rounded-2xl bg-parchment/80 px-4 py-3">
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
            Event mastery
          </dt>
          <dd className="mt-2">
            <MasteryBadge status={event.topicMastery} />
          </dd>
          <p className="mt-2 text-xs text-stone-500">Academic understanding</p>
        </div>
      </dl>
    </section>
  );
}
