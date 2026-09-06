import { ProgressBar } from "@/components/ProgressBar";
import { TodayGoalLine } from "@/components/TodayGoalLine";
import type { ExpeditionAttempt } from "@/lib/expeditions";
import { explorerRankLabel } from "@/lib/explorer-ranks";
import {
  MAX_EXPLORER_LEVEL,
  calculateXpProgress,
  streakLabel,
  xpBarPercent,
} from "@/lib/gamification";
import type { DailyPracticeGoal } from "@/lib/student-preferences";
import type { ExplorerProfile } from "@/lib/types";

type BaseCampExplorerProgressProps = {
  explorer: ExplorerProfile;
  uniqueQuestions: number;
  badgeCount: number;
  attempts: ExpeditionAttempt[];
  dailyPracticeGoal: DailyPracticeGoal;
};

export function BaseCampExplorerProgress({
  explorer,
  uniqueQuestions,
  badgeCount,
  attempts,
  dailyPracticeGoal,
}: BaseCampExplorerProgressProps) {
  const progress = calculateXpProgress(explorer.currentXp);
  const percent = xpBarPercent(progress);
  const atMaxLevel = progress.nextLevelThreshold == null;
  const streak = streakLabel(explorer.streakDays);
  const rank = explorerRankLabel(progress.level);

  return (
    <section
      aria-labelledby="explorer-progress-heading"
      className="border-t border-stone-200/80 pt-6"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
        {rank}
      </p>
      <h2
        id="explorer-progress-heading"
        className="mt-1 font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl"
      >
        Explorer progress
      </h2>
      <p className="mt-1 text-sm text-stone-600">
        Rewards for practicing. They do not mean you have mastered a topic.
      </p>

      <p className="mt-4 font-display text-lg font-semibold text-ink">
        Explorer Level {progress.level}
      </p>

      <div className="mt-3 max-w-md">
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
                {progress.totalXp} / {progress.nextLevelThreshold} XP
              </span>
            </div>
            <ProgressBar
              value={percent}
              label={`XP toward Explorer Level ${progress.level + 1}`}
              fillClassName="bg-gold-dark"
            />
          </>
        )}
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-stone-600">
        <li>{streak ?? "No streak yet"}</li>
        <li>
          {badgeCount === 1 ? "1 badge" : `${badgeCount} badges`}
        </li>
        <li>
          {uniqueQuestions === 1
            ? "1 question explored"
            : `${uniqueQuestions} questions explored`}
        </li>
      </ul>

      <div className="mt-3">
        <TodayGoalLine
          attempts={attempts}
          dailyPracticeGoal={dailyPracticeGoal}
        />
      </div>
    </section>
  );
}
