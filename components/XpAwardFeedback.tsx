import { describeXpAward, formatXpGain } from "@/lib/gamification";

type XpAwardFeedbackProps = {
  attemptXp: number;
  sessionBonusXp: number;
  isCorrect: boolean;
  hintUsed: boolean;
};

/**
 * Displays XP the server actually awarded. Pass RPC amounts, not client math.
 */
export function XpAwardFeedback({
  attemptXp,
  sessionBonusXp,
  isCorrect,
  hintUsed,
}: XpAwardFeedbackProps) {
  const lines = describeXpAward({
    attemptXp,
    sessionBonusXp,
    isCorrect,
    hintUsed,
  });

  if (lines.length === 0) {
    return null;
  }

  return (
    <div
      className="rounded-2xl border border-gold/40 bg-gold/15 px-4 py-3"
      aria-live="polite"
    >
      <ul className="space-y-1">
        {lines.map((line) => (
          <li
            key={`${line.amount}-${line.reason}`}
            className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5"
          >
            <span className="xp-float font-display text-2xl font-semibold tabular-nums text-ink">
              {formatXpGain(line.amount)}
            </span>
            <span className="text-sm font-medium text-stone-700">
              — {line.reason}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
