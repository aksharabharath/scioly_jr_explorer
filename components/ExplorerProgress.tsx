import { ProgressBar } from "@/components/ProgressBar";
import {
  MAX_EXPLORER_LEVEL,
  calculateXpProgress,
  streakLabel,
  xpBarPercent,
} from "@/lib/gamification";
import type { ExplorerProfile } from "@/lib/types";

type ExplorerProgressProps = {
  explorer: ExplorerProfile;
};

export function ExplorerProgress({ explorer }: ExplorerProgressProps) {
  const progress = calculateXpProgress(explorer.currentXp);
  const percent = xpBarPercent(progress);
  const atMaxLevel = progress.nextLevelThreshold == null;
  const streak = streakLabel(explorer.streakDays);

  return (
    <section
      aria-labelledby="explorer-progress-heading"
      className="rounded-3xl border border-stone-200/80 bg-surface p-5 sm:p-6"
    >
      <h2
        id="explorer-progress-heading"
        className="font-display text-2xl font-semibold tracking-tight text-ink"
      >
        ⭐ Explorer Level {progress.level}
      </h2>
      <p className="mt-1 font-display text-xl font-semibold tabular-nums text-ink">
        {progress.totalXp} XP
      </p>

      <div className="mt-4">
        {atMaxLevel ? (
          <p className="text-sm text-stone-600">
            You reached Explorer Level {MAX_EXPLORER_LEVEL}.
          </p>
        ) : (
          <>
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <span className="text-sm text-stone-600">
                {progress.xpToNextLevel} XP to Level {progress.level + 1}
              </span>
              <span className="font-mono text-sm tabular-nums text-stone-500">
                {progress.totalXp} / {progress.nextLevelThreshold}
              </span>
            </div>
            <ProgressBar
              value={percent}
              label={`XP toward Explorer Level ${progress.level + 1}`}
              fillClassName="bg-gold"
            />
          </>
        )}
        {streak ? (
          <p className="mt-3 text-sm font-medium text-ink">{streak}</p>
        ) : (
          <p className="mt-3 text-sm text-stone-500">
            Practice today to start a streak.
          </p>
        )}
      </div>
    </section>
  );
}
