"use client";

import { ProgressBar } from "@/components/ProgressBar";
import {
  BADGE_DEFINITIONS,
  type BadgeDefinition,
  type BadgeId,
  type BadgeProgress,
  type BadgeProgressNoun,
} from "@/lib/badges";
import { useEffect, useId, useRef, useState } from "react";

type BadgeShelfProps = {
  earnedIds: readonly BadgeId[];
  progress: readonly BadgeProgress[];
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

function pluralNoun(count: number, noun: BadgeProgressNoun): string {
  const labels: Record<BadgeProgressNoun, [string, string]> = {
    question: ["question", "questions"],
    expedition: ["expedition", "expeditions"],
    event: ["event", "events"],
    topic: ["topic", "topics"],
    day: ["day", "days"],
  };
  const [one, many] = labels[noun];
  return count === 1 ? one : many;
}

function progressLine(row: BadgeProgress): string {
  return `${row.current} / ${row.required} ${pluralNoun(row.required, row.noun)}`;
}

export function BadgeShelf({ earnedIds, progress }: BadgeShelfProps) {
  const earned = new Set(earnedIds);
  const byId = new Map(progress.map((row) => [row.id, row]));
  const empty = earnedIds.length === 0;
  const [openId, setOpenId] = useState<BadgeId | null>(null);
  const openBadge = BADGE_DEFINITIONS.find((badge) => badge.id === openId);
  const openProgress = openId ? byId.get(openId) : undefined;

  return (
    <section aria-labelledby="badges-heading">
      <h1
        id="badges-heading"
        className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
      >
        Your discoveries
      </h1>
      <p className="mt-1 text-sm text-stone-600">
        Bright tiles are badges you own. Muted tiles are goals you can still
        earn — tap one to see your progress.
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
                      onOpen={() => setOpenId(badge.id)}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      {openBadge && openProgress ? (
        <BadgeDetailDialog
          badge={openBadge}
          earned={earned.has(openBadge.id)}
          progress={openProgress}
          onClose={() => setOpenId(null)}
        />
      ) : null}
    </section>
  );
}

function BadgeTile({
  badge,
  earned,
  progress,
  onOpen,
}: {
  badge: BadgeDefinition;
  earned: boolean;
  progress: BadgeProgress;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`flex h-full min-h-11 w-full cursor-pointer gap-3 rounded-2xl border px-3 py-2.5 text-left transition ${
        earned
          ? "border-gold-dark/40 bg-gold/12 shadow-[0_4px_16px_rgba(28,45,41,0.06)] hover:bg-gold/18"
          : "border-dashed border-stone-300 bg-stone-50/70 hover:border-stone-400 hover:bg-parchment/70"
      }`}
      aria-label={
        earned
          ? `${badge.name}, earned. Open details.`
          : `${badge.name}, not earned yet, ${progressLine(progress)}. Open details.`
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
        <p
          className={`mt-1 text-sm leading-relaxed ${
            earned ? "text-stone-600" : "text-stone-500"
          }`}
        >
          {earned ? badge.description : badge.requirement}
        </p>
        {!earned ? (
          <p className="mt-1.5 text-xs font-medium text-stone-500">
            {progressLine(progress)}
          </p>
        ) : null}
      </div>
    </button>
  );
}

function BadgeDetailDialog({
  badge,
  earned,
  progress,
  onClose,
}: {
  badge: BadgeDefinition;
  earned: boolean;
  progress: BadgeProgress;
  onClose: () => void;
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const percent = Math.round((progress.current / progress.required) * 100);

  useEffect(() => {
    closeRef.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 sm:items-center"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`w-full max-w-md rounded-3xl border bg-surface p-6 shadow-[0_16px_40px_rgba(28,45,41,0.18)] ${
          earned ? "border-gold-dark/40" : "border-stone-200/80"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start gap-3">
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl ${
              earned
                ? "bg-gold/40"
                : "border border-dashed border-stone-300 bg-parchment/50 grayscale"
            }`}
            aria-hidden="true"
          >
            {badge.emoji}
          </span>
          <div className="min-w-0">
            <h2
              id={titleId}
              className="font-display text-2xl font-semibold tracking-tight text-ink"
            >
              {badge.name}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-stone-600">
              {badge.requirement}
            </p>
          </div>
        </div>

        {earned ? (
          <div className="mt-4 rounded-2xl border border-gold-dark/30 bg-gold/12 px-4 py-3">
            <p className="text-sm font-semibold text-teal-dark">✓ Earned</p>
            <p className="mt-1 text-sm leading-relaxed text-stone-700">
              {badge.description}
            </p>
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
              Your progress
            </p>
            <p className="mt-1 font-medium text-ink">{progressLine(progress)}</p>
            <div className="mt-2">
              <ProgressBar
                value={percent}
                label={`${badge.name} progress, ${progressLine(progress)}`}
                fillClassName="bg-teal"
              />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              Keep exploring to unlock this badge.
            </p>
          </div>
        )}

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="mt-5 min-h-11 w-full rounded-full bg-teal-dark px-5 py-2.5 text-sm font-semibold text-parchment hover:bg-teal"
        >
          Back to badges
        </button>
      </div>
    </div>
  );
}
