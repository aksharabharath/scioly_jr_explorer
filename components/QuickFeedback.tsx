"use client";

import { useState } from "react";

type QuickFeedbackProps = {
  label: string;
};

export function QuickFeedback({ label }: QuickFeedbackProps) {
  const [vote, setVote] = useState<"up" | "down" | null>(null);

  return (
    <div className="mt-3 flex items-center gap-2 text-xs text-stone-500">
      <span>{label}</span>
      <button
        type="button"
        aria-label={`${label}: helpful`}
        aria-pressed={vote === "up"}
        onClick={() => setVote("up")}
        className={`rounded-full px-2 py-1 transition ${
          vote === "up"
            ? "bg-teal/15 text-teal-dark"
            : "hover:bg-parchment hover:text-ink"
        }`}
      >
        👍
      </button>
      <button
        type="button"
        aria-label={`${label}: not helpful`}
        aria-pressed={vote === "down"}
        onClick={() => setVote("down")}
        className={`rounded-full px-2 py-1 transition ${
          vote === "down"
            ? "bg-rose-100 text-rose-900"
            : "hover:bg-parchment hover:text-ink"
        }`}
      >
        👎
      </button>
    </div>
  );
}
