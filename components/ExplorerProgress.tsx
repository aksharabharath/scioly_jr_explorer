import { ProgressBar } from "@/components/ProgressBar";
import { explorerRankLabel } from "@/lib/explorer-ranks";
import {
  MAX_EXPLORER_LEVEL,
  calculateXpProgress,
  streakLabel,
  xpBarPercent,
} from "@/lib/gamification";
import type { ExplorerProfile } from "@/lib/types";

type ExplorerProgressProps = {
  explorer: ExplorerProfile;
  compact?: boolean;
};

export function ExplorerProgress({
  explorer,
  compact = false,
}: ExplorerProgressProps) {
  const progress = calculateXpProgress(explorer.currentXp);
  const percent = xpBarPercent(progress);
  const atMaxLevel = progress.nextLevelThreshold == null;
  const streak = streakLabel(explorer.streakDays);
  const rank = explorerRankLabel(progress.level);

  if (compact) {
    return (
      <section
        aria-labelledby="explorer-progress-heading"
        className="rounded-2xl border border-stone-200/70 bg-parchment/60 px-3 py-2.5"
      >
        <h2 id="explorer-progress-heading" className="sr-only">
          Explorer Level {progress.level}, {progress.totalXp} XP
          {streak ? `, ${streak}` : ""}
        </h2>
        <dl className="grid grid-cols-3 gap-2 text-center">
          <div>
            <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-stone-500">
              Level
            </dt>
            <dd className="mt-0.5 font-display text-base font-semibold tabular-nums text-ink">
              {progress.level}
            </dd>
          </div>
          <div>
            <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-stone-500">
              XP
            </dt>
            <dd className="mt-0.5 font-display text-base font-semibold tabular-nums text-ink">
              {progress.totalXp}
            </dd>
          </div>
          <div>
            <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-stone-500">
              Streak
            </dt>
            <dd className="mt-0.5 font-display text-base font-semibold tabular-nums text-ink">
              {explorer.streakDays > 0 ? explorer.streakDays : "—"}
            </dd>
          </div>
        </dl>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="explorer-progress-heading"
      className="journal-panel rounded-3xl p-4 sm:p-5"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
        {rank}
      </p>
      <h2
        id="explorer-progress-heading"
        className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink"
      >
        Explorer Level {progress.level}
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
              <span className="text-sm font-medium text-ink">
                {progress.xpToNextLevel} XP to Level {progress.level + 1}
              </span>
              <span className="font-mono text-sm tabular-nums text-stone-500">
                {progress.totalXp} / {progress.nextLevelThreshold}
              </span>
            </div>
            <ProgressBar
              value={percent}
              label={`XP toward Explorer Level ${progress.level + 1}`}
              fillClassName="bg-gold-dark"
            />
          </>
        )}
        {streak ? (
          <p className="mt-3 text-sm font-medium text-ink">{streak}</p>
        ) : (
          <p className="mt-3 text-sm text-stone-500">
            Practice today to start a streak. Missing a day does not take XP
            away.
          </p>
        )}
      </div>
    </section>
  );
}
