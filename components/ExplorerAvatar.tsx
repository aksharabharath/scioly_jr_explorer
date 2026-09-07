"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "jr-explorer-avatar";

export const EXPLORER_AVATARS = [
  { id: "telescope", label: "Telescope", emoji: "🔭" },
  { id: "lab", label: "Lab", emoji: "🧪" },
  { id: "nature", label: "Nature", emoji: "🌿" },
  { id: "compass", label: "Compass", emoji: "🧭" },
  { id: "fossil", label: "Fossil", emoji: "🦴" },
  { id: "binoculars", label: "Binoculars", emoji: "🔎" },
  { id: "rock", label: "Rock", emoji: "🪨" },
  { id: "spark", label: "Spark", emoji: "✨" },
] as const;

type AvatarId = (typeof EXPLORER_AVATARS)[number]["id"];

function isAvatarId(value: string | null): value is AvatarId {
  return EXPLORER_AVATARS.some((avatar) => avatar.id === value);
}

function readAvatar(): AvatarId {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return isAvatarId(value) ? value : EXPLORER_AVATARS[0].id;
  } catch {
    return EXPLORER_AVATARS[0].id;
  }
}

function saveAvatar(id: AvatarId) {
  try {
    window.localStorage.setItem(STORAGE_KEY, id);
  } catch {
    // The UI still updates when browser storage is unavailable.
  }
}

export function ExplorerAvatar({
  className = "text-3xl",
}: {
  className?: string;
}) {
  const [selectedId, setSelectedId] = useState<AvatarId>(
    EXPLORER_AVATARS[0].id,
  );

  useEffect(() => {
    // Browser storage is the source of truth after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedId(readAvatar());
  }, []);

  const avatar =
    EXPLORER_AVATARS.find((item) => item.id === selectedId) ??
    EXPLORER_AVATARS[0];

  return (
    <span
      aria-label={`${avatar.label} Explorer avatar`}
      className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-teal/20 bg-teal/10 ${className}`}
      role="img"
    >
      {avatar.emoji}
    </span>
  );
}

export function ExplorerAvatarPicker() {
  const [selectedId, setSelectedId] = useState<AvatarId>(
    EXPLORER_AVATARS[0].id,
  );

  useEffect(() => {
    // Browser storage is the source of truth after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedId(readAvatar());
  }, []);

  function chooseAvatar(id: AvatarId) {
    setSelectedId(id);
    saveAvatar(id);
  }

  const selectedAvatar =
    EXPLORER_AVATARS.find((avatar) => avatar.id === selectedId) ??
    EXPLORER_AVATARS[0];

  return (
    <section aria-labelledby="explorer-avatar-heading">
      <div className="flex items-center gap-3">
        <span
          aria-label={`${selectedAvatar.label} Explorer avatar`}
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-teal/20 bg-teal/10 text-3xl"
          role="img"
        >
          {selectedAvatar.emoji}
        </span>
        <div>
          <h2
            id="explorer-avatar-heading"
            className="font-display text-lg font-semibold tracking-tight text-ink"
          >
            Your Explorer
          </h2>
          <p className="text-sm text-stone-600">
            Choose a field companion.
          </p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-8">
        {EXPLORER_AVATARS.map((avatar) => {
          const selected = avatar.id === selectedId;
          return (
            <button
              key={avatar.id}
              type="button"
              aria-label={`Choose ${avatar.label} avatar`}
              aria-pressed={selected}
              onClick={() => chooseAvatar(avatar.id)}
              className={`flex min-h-16 flex-col items-center justify-center rounded-xl border text-2xl outline-none transition-colors focus-visible:ring-2 focus-visible:ring-teal ${
                selected
                  ? "border-teal bg-teal/10 shadow-[inset_0_-2px_0_0_var(--teal)]"
                  : "border-stone-200 bg-parchment/50 hover:border-teal/50 hover:bg-teal/5"
              }`}
            >
              <span aria-hidden="true">{avatar.emoji}</span>
              <span className="mt-0.5 text-[0.6rem] font-medium text-stone-600">
                {avatar.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
