/**
 * Home “recent achievements” from existing attempts and streak.
 * Derived only — no extra tables or XP.
 */
import {
  BADGE_DEFINITIONS,
  getNewlyEarnedBadgesFromAttempts,
  type BadgeProgressAttempt,
} from "@/lib/badges";
import {
  expeditionLogEntries,
  hasCompletedExpeditionOnLocalDate,
  questionsPracticedOnLocalDate,
} from "@/lib/expeditions";
import {
  DEFAULT_DAILY_PRACTICE_GOAL,
  isDailyMissionComplete,
  type DailyPracticeGoal,
} from "@/lib/student-preferences";
import { STREAK_MILESTONES } from "@/lib/gamification";
import type { Question } from "@/lib/types";

export type RecentAchievement = {
  id: string;
  title: string;
  detail: string;
};

export function recentAchievements(input: {
  attempts: BadgeProgressAttempt[];
  questions: Question[];
  streakDays: number;
  practiceDate: string;
  dailyPracticeGoal?: DailyPracticeGoal;
}): RecentAchievement[] {
  const { attempts, questions, streakDays, practiceDate } = input;
  const dailyPracticeGoal =
    input.dailyPracticeGoal ?? DEFAULT_DAILY_PRACTICE_GOAL;
  const items: RecentAchievement[] = [];
  const latest = expeditionLogEntries(attempts, questions, {}, 1)[0];

  if (latest) {
    const before = attempts.filter(
      (attempt) => attempt.sessionId !== latest.sessionId,
    );
    const newBadgeIds = getNewlyEarnedBadgesFromAttempts(
      before,
      attempts,
      questions,
      streakDays,
      streakDays,
    );
    for (const id of newBadgeIds) {
      const badge = BADGE_DEFINITIONS.find((definition) => definition.id === id);
      if (!badge) {
        continue;
      }
      items.push({
        id: `badge-${badge.id}`,
        title: badge.name,
        detail: badge.description,
      });
    }
  }

  const atMilestone = (STREAK_MILESTONES as readonly number[]).includes(
    streakDays,
  );
  if (
    atMilestone &&
    hasCompletedExpeditionOnLocalDate(attempts, practiceDate)
  ) {
    items.push({
      id: `streak-${streakDays}`,
      title: `${streakDays}-day streak`,
      detail: "You practiced today and hit a streak milestone.",
    });
  }

  if (
    isDailyMissionComplete(
      questionsPracticedOnLocalDate(attempts, practiceDate),
      dailyPracticeGoal,
    )
  ) {
    items.push({
      id: "daily-mission",
      title: "Daily expedition complete",
      detail: "You reached today's practice goal.",
    });
  }

  return items.slice(0, 5);
}
