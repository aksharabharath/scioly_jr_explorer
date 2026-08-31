"use client";

import type { BadgeDefinition } from "@/lib/badges";
import type { StreakMilestone } from "@/lib/gamification";
import { useEffect, useId, useRef } from "react";

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

type ExpeditionRewardsOverlayProps = {
  eventName: string;
  sessionXp: number;
  leveledUpTo: number | null;
  streakMilestone: StreakMilestone | null;
  dailyMissionComplete: boolean;
  badges: BadgeDefinition[];
  onClose: () => void;
};

export function ExpeditionRewardsOverlay({
  eventName,
  sessionXp,
  leveledUpTo,
  streakMilestone,
  dailyMissionComplete,
  badges,
  onClose,
}: ExpeditionRewardsOverlayProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const showLevel = leveledUpTo != null;
  const hasExtras =
    showLevel ||
    streakMilestone != null ||
    dailyMissionComplete ||
    badges.length > 0;

  useEffect(() => {
    if (!hasExtras) {
      return;
    }
    const root = dialogRef.current;
    const previous = document.activeElement;
    closeRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !root) {
        return;
      }
      const nodes = [
        ...root.querySelectorAll<HTMLElement>(FOCUSABLE),
      ].filter((node) => !node.hasAttribute("disabled"));
      if (nodes.length === 0) {
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (previous instanceof HTMLElement) {
        previous.focus();
      }
    };
  }, [onClose, hasExtras]);

  if (!hasExtras) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 sm:items-center"
      role="presentation"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="badge-pop w-full max-w-md rounded-3xl border border-gold-dark/25 bg-surface p-6 shadow-[0_16px_40px_rgba(28,45,41,0.18)]"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="text-sm font-semibold text-teal">Field expedition</p>
        <h2
          id={titleId}
          className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink"
        >
          {showLevel
            ? "You reached a new Explorer Level"
            : `Expedition complete — ${eventName}`}
        </h2>
        {showLevel ? (
          <p className="level-burst mt-3 font-display text-4xl font-semibold text-ink">
            ⭐ Explorer Level {leveledUpTo}
          </p>
        ) : null}
        {sessionXp > 0 ? (
          <p className="mt-3 font-display text-2xl font-semibold tabular-nums text-ink">
            +{sessionXp} XP
          </p>
        ) : null}
        {streakMilestone != null ? (
          <p className="mt-3 text-sm font-medium text-ink">
            🔥 {streakMilestone}-day streak milestone
          </p>
        ) : null}
        {dailyMissionComplete ? (
          <p className="mt-3 text-sm font-medium text-ink">
            Daily expedition complete — you reached today&apos;s practice goal.
          </p>
        ) : null}
        {badges.length > 0 ? (
          <>
            <p className="mt-4 text-sm font-semibold text-teal">
              {badges.length > 1 ? "New discoveries" : "New discovery"}
            </p>
            <ul className="mt-3 space-y-3">
              {badges.map((badge) => (
                <li
                  key={badge.id}
                  className="flex items-start gap-3 rounded-2xl bg-gold/15 px-4 py-3"
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gold/30 text-xl"
                    aria-hidden="true"
                  >
                    {badge.emoji}
                  </span>
                  <span>
                    <span className="block font-display text-lg font-semibold text-ink">
                      {badge.name}
                    </span>
                    <span className="mt-0.5 block text-sm text-stone-600">
                      {badge.description}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : null}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-teal-dark px-5 py-2.5 text-sm font-semibold text-parchment hover:bg-teal"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
