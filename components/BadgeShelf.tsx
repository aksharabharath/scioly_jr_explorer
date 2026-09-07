"use client";

import { BadgeCelebration } from "@/components/BadgeCelebration";
import {
  BADGE_DEFINITIONS,
  definitionsForIds,
  formatBadgeProgress,
  type BadgeDefinition,
  type BadgeId,
  type BadgeProgress,
} from "@/lib/badges";
import { useEffect, useState } from "react";

type BadgeShelfProps = {
  earnedIds: readonly BadgeId[];
  progress: readonly BadgeProgress[];
  newlyEarnedIds?: readonly BadgeId[];
  accountId?: string;
};

const GROUPS: Array<{ title: string; ids: readonly BadgeId[] }> = [
  {
    title: "Firsts",
    ids: ["first-try", "first-discovery"],
  },
  {
    title: "Field work",
    ids: [
      "event-explorer",
      "three-event-explorer",
      "tricky-topic-tamer",
      "practice-regular",
      "question-crusher",
      "curious-mind",
    ],
  },
  {
    title: "Field sites",
    ids: [
      "water-watcher",
      "entomologist",
      "body-explorer",
      "ecosystem-explorer",
      "crime-scene-rookie",
    ],
  },
  {
    title: "Returning",
    ids: ["consistent-explorer", "dedicated-explorer"],
  },
];

export function BadgeShelf({
  earnedIds,
  progress,
  newlyEarnedIds = [],
  accountId,
}: BadgeShelfProps) {
  const earned = new Set(earnedIds);
  const byId = new Map(progress.map((row) => [row.id, row]));
  const empty = earnedIds.length === 0;
  const [celebrationIds, setCelebrationIds] = useState<BadgeId[]>([]);

  useEffect(() => {
    if (newlyEarnedIds.length === 0) {
      return;
    }
    const key = accountId
      ? `jr-explorer-seen-badge-celebrations:${accountId}`
      : null;
    if (!key) {
      // No account ID means there is no safe persistence key.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCelebrationIds([...newlyEarnedIds]);
      return;
    }
    try {
      const seen = new Set<BadgeId>(
        JSON.parse(window.localStorage.getItem(key) ?? "[]"),
      );
      const unseen = newlyEarnedIds.filter((id) => !seen.has(id));
      if (unseen.length === 0) {
        return;
      }
      unseen.forEach((id) => seen.add(id));
      window.localStorage.setItem(key, JSON.stringify([...seen]));
      setCelebrationIds(unseen);
    } catch {
      setCelebrationIds([...newlyEarnedIds]);
    }
  }, [accountId, newlyEarnedIds]);
  const celebrationBadges = definitionsForIds(celebrationIds);

  return (
    <>
      {celebrationBadges.length > 0 ? (
        <BadgeCelebration
          eventName="recent"
          badges={celebrationBadges}
          onClose={() => setCelebrationIds([])}
        />
      ) : null}
      <section aria-labelledby="badges-heading">
      <h1
        id="badges-heading"
        className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
      >
        Your discoveries
      </h1>
      <p className="mt-1 text-sm text-stone-600">
        Bright tiles are badges you own. Muted tiles are goals — each one shows
        how close you are.
      </p>
      {empty ? (
        <p className="journal-panel mt-4 rounded-2xl px-4 py-3 text-sm text-stone-600">
          Your discovery shelf is waiting. Complete expeditions and you&apos;ll
          start filling it up.
        </p>
      ) : null}
      <div className="mt-5 space-y-6">
        {GROUPS.map((group) => (
          <div key={group.title}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
              {group.title}
            </h3>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {group.ids.map((id) => {
                const badge = BADGE_DEFINITIONS.find((item) => item.id === id);
                const row = byId.get(id);
                if (!badge || !row) {
                  return null;
                }
                return (
                  <li key={badge.id}>
                    <BadgeTile
                      badge={badge}
                      earned={earned.has(badge.id)}
                      progress={row}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      </section>
    </>
  );
}

function BadgeTile({
  badge,
  earned,
  progress,
}: {
  badge: BadgeDefinition;
  earned: boolean;
  progress: BadgeProgress;
}) {
  const progressLabel = formatBadgeProgress(progress);

  return (
    <article
      className={`flex h-full min-h-11 gap-3 rounded-2xl border px-3 py-2.5 ${
        earned
          ? "border-gold-dark/40 bg-gold/12 shadow-[0_4px_16px_rgba(28,45,41,0.06)]"
          : "border-dashed border-stone-300 bg-stone-50/70"
      }`}
      aria-label={
        earned
          ? `${badge.name}, earned. ${badge.description}`
          : `${badge.name}, not earned yet. ${progressLabel}`
      }
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ${
          earned
            ? "bg-gold/40"
            : "border border-dashed border-stone-300 bg-parchment/50 text-stone-400 grayscale"
        }`}
        aria-hidden="true"
      >
        {badge.emoji}
      </span>
      <div className="min-w-0">
        <p className="flex flex-wrap items-center gap-2">
          <span
            className={`font-display text-base font-semibold tracking-tight ${
              earned ? "text-ink" : "text-stone-500"
            }`}
          >
            {badge.name}
          </span>
          {earned ? (
            <span className="rounded-full bg-teal-dark px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-parchment">
              Earned
            </span>
          ) : null}
        </p>
        {earned ? (
          <p className="mt-1 text-sm leading-relaxed text-stone-600">
            {badge.description}
          </p>
        ) : (
          <p className="mt-1 text-sm leading-relaxed text-stone-500">
            {progressLabel}
          </p>
        )}
      </div>
    </article>
  );
}
