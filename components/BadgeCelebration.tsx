"use client";

import type { BadgeDefinition } from "@/lib/badges";
import { useEffect, useId, useRef } from "react";

type BadgeCelebrationProps = {
  eventName: string;
  badges: BadgeDefinition[];
  onClose: () => void;
};

export function BadgeCelebration({
  eventName,
  badges,
  onClose,
}: BadgeCelebrationProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const many = badges.length > 1;

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

  if (badges.length === 0) {
    return null;
  }

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
        className="badge-pop w-full max-w-md rounded-3xl border border-stone-200/80 bg-surface p-6 shadow-[0_16px_40px_rgba(28,45,41,0.18)]"
        onClick={(event) => event.stopPropagation()}
      >
        <h2
          id={titleId}
          className="font-display text-2xl font-semibold tracking-tight text-ink"
        >
          {many ? "New badges unlocked!" : "Nice work, Explorer!"}
        </h2>
        <p className="mt-2 text-sm text-stone-600">
          You finished your {eventName} practice set.
        </p>
        <p className="mt-4 text-sm font-semibold text-teal">
          {many ? "New badges" : "New badge"}
        </p>
        <ul className="mt-5 space-y-3">
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
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-teal-dark px-5 py-2.5 text-sm font-semibold text-parchment hover:bg-teal"
        >
          Awesome!
        </button>
      </div>
    </div>
  );
}
