/**
 * Student-facing preferences stored on the Auth user (user_metadata).
 * No extra Postgres table. Daily mission still awards no XP.
 */
import type { User } from "@supabase/supabase-js";

export const DAILY_PRACTICE_GOALS = [5, 10, 15, 20] as const;

export type DailyPracticeGoal = (typeof DAILY_PRACTICE_GOALS)[number];

/** Matches one 10-question expedition — the previous daily-mission default. */
export const DEFAULT_DAILY_PRACTICE_GOAL: DailyPracticeGoal = 10;

export function parseDailyPracticeGoal(value: unknown): DailyPracticeGoal {
  const n =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number(value)
        : Number.NaN;
  if ((DAILY_PRACTICE_GOALS as readonly number[]).includes(n)) {
    return n as DailyPracticeGoal;
  }
  return DEFAULT_DAILY_PRACTICE_GOAL;
}

export function dailyPracticeGoalFromUser(user: User): DailyPracticeGoal {
  return parseDailyPracticeGoal(user.user_metadata?.daily_practice_goal);
}

export function isDailyMissionComplete(
  questionsPracticedToday: number,
  goal: DailyPracticeGoal,
): boolean {
  return questionsPracticedToday >= goal;
}
