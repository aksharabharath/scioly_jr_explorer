/**
 * Gamification v1 — XP, Explorer Level, and daily streak.
 *
 * Science learning is the product. These rules reward practice, not speed.
 * Keep the numbers here so the UI never encodes "correct → +10".
 */
import type { ExplorerProfile } from "@/lib/types";

export const XP_CORRECT = 10;
export const XP_CORRECT_WITH_HINT = 6;
export const XP_INCORRECT = 2;
export const XP_SESSION_COMPLETION = 20;

/** Matches the current 10-question practice set. */
export const GAMIFICATION_SESSION_SIZE = 10;

/**
 * Minimum total XP required to stand on each Explorer Level.
 * Index is the level number. Level 10 has no further threshold.
 */
export const LEVEL_MIN_XP: readonly number[] = [
  0, // unused (levels are 1–10)
  0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700,
];

export const MAX_EXPLORER_LEVEL = 10;

const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/;
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export type AttemptXpInput = {
  isCorrect: boolean;
  hintUsed: boolean;
};

export type XpProgress = {
  level: number;
  totalXp: number;
  /** Total XP needed to reach the next level. Null at Level 10. */
  nextLevelThreshold: number | null;
  /** Remaining XP until the next level. Null at Level 10. */
  xpToNextLevel: number | null;
};

export type XpAwardLine = {
  /** Authoritative amount from the server/database, never client-computed. */
  amount: number;
  reason: string;
};

export type GamificationState = {
  xp: number;
  streakDays: number;
};

export function explorerProfileFromGamification(
  displayName: string,
  state: GamificationState,
): ExplorerProfile {
  const progress = calculateXpProgress(state.xp);
  return {
    displayName,
    explorerLevel: progress.level,
    currentXp: progress.totalXp,
    xpForNextLevel: progress.nextLevelThreshold,
    streakDays: state.streakDays,
  };
}

export const EMPTY_GAMIFICATION: GamificationState = {
  xp: 0,
  streakDays: 0,
};

export function calculateAttemptXp({
  isCorrect,
  hintUsed,
}: AttemptXpInput): number {
  if (isCorrect) {
    return hintUsed ? XP_CORRECT_WITH_HINT : XP_CORRECT;
  }
  return XP_INCORRECT;
}

export function calculateSessionCompletionXp(
  answeredCount: number,
  sessionSize: number = GAMIFICATION_SESSION_SIZE,
): number {
  return answeredCount >= sessionSize ? XP_SESSION_COMPLETION : 0;
}

export function calculateLevelFromXp(xp: number): number {
  const safe = Math.max(0, Math.floor(xp));
  for (let level = MAX_EXPLORER_LEVEL; level >= 1; level -= 1) {
    if (safe >= LEVEL_MIN_XP[level]) {
      return level;
    }
  }
  return 1;
}

export function calculateXpToNextLevel(xp: number): number | null {
  return calculateXpProgress(xp).xpToNextLevel;
}

export function calculateXpProgress(xp: number): XpProgress {
  const totalXp = Math.max(0, Math.floor(xp));
  const level = calculateLevelFromXp(totalXp);
  if (level >= MAX_EXPLORER_LEVEL) {
    return {
      level: MAX_EXPLORER_LEVEL,
      totalXp,
      nextLevelThreshold: null,
      xpToNextLevel: null,
    };
  }
  const nextLevelThreshold = LEVEL_MIN_XP[level + 1];
  return {
    level,
    totalXp,
    nextLevelThreshold,
    xpToNextLevel: nextLevelThreshold - totalXp,
  };
}

/**
 * Fill percent for the Explorer Level bar: current XP / next-level threshold.
 * Level 10 is full (100). Does not invent a Level 11 target.
 */
export function xpBarPercent(progress: XpProgress): number {
  if (progress.nextLevelThreshold == null) {
    return 100;
  }
  if (progress.nextLevelThreshold <= 0) {
    return 0;
  }
  return Math.min(
    100,
    Math.max(0, (progress.totalXp / progress.nextLevelThreshold) * 100),
  );
}

export function formatXpGain(amount: number): string {
  return `+${Math.max(0, Math.floor(amount))} XP`;
}

export const STREAK_MILESTONES = [3, 7, 14, 30] as const;

export type StreakMilestone = (typeof STREAK_MILESTONES)[number];

export function streakLabel(streakDays: number): string | null {
  const days = Math.max(0, Math.floor(streakDays));
  if (days <= 0) {
    return null;
  }
  return `${days} day streak`;
}

/** First listed milestone newly crossed from `before` to `after`. */
export function newlyReachedStreakMilestone(
  beforeDays: number,
  afterDays: number,
): StreakMilestone | null {
  const before = Math.max(0, Math.floor(beforeDays));
  const after = Math.max(0, Math.floor(afterDays));
  for (const milestone of STREAK_MILESTONES) {
    if (before < milestone && after >= milestone) {
      return milestone;
    }
  }
  return null;
}

/**
 * Student-facing XP copy. `attemptXp` and `sessionBonusXp` must be the
 * amounts returned by the server — do not pass client-calculated XP.
 * Zero awards produce no lines so the UI never shows a fake +0 reward.
 */
export function describeXpAward(input: {
  attemptXp: number;
  sessionBonusXp: number;
  isCorrect: boolean;
  hintUsed: boolean;
}): XpAwardLine[] {
  const attemptXp = Math.max(0, Math.floor(input.attemptXp));
  const sessionBonusXp = Math.max(0, Math.floor(input.sessionBonusXp));
  const lines: XpAwardLine[] = [];

  if (attemptXp > 0) {
    lines.push({
      amount: attemptXp,
      reason: attemptAwardReason(attemptXp, input.isCorrect, input.hintUsed),
    });
  }

  if (sessionBonusXp > 0) {
    lines.push({
      amount: sessionBonusXp,
      reason: "Practice set complete",
    });
  }

  return lines;
}

function attemptAwardReason(
  attemptXp: number,
  isCorrect: boolean,
  hintUsed: boolean,
): string {
  if (attemptXp === XP_CORRECT) {
    return "Correct answer";
  }
  if (attemptXp === XP_CORRECT_WITH_HINT) {
    return "Correct — hints still count";
  }
  if (attemptXp === XP_INCORRECT) {
    return "You still earned XP for trying";
  }
  if (isCorrect && hintUsed) {
    return "Correct — hints still count";
  }
  if (isCorrect) {
    return "Correct answer";
  }
  return "You still earned XP for trying";
}

/**
 * Daily streak from calendar dates only (YYYY-MM-DD), never timestamps.
 *
 * First practice day → 1
 * Same calendar day → unchanged
 * Next calendar day → +1
 * Missed a day → reset to 1
 */
export function calculateStreak(input: {
  lastPracticeDate: string | null;
  practiceDate: string;
  currentStreak: number;
}): number {
  const currentStreak = Math.max(0, Math.floor(input.currentStreak));
  if (!isDateOnly(input.practiceDate)) {
    return currentStreak;
  }
  if (!input.lastPracticeDate || !isDateOnly(input.lastPracticeDate)) {
    return 1;
  }
  const delta = calendarDayDelta(
    input.lastPracticeDate,
    input.practiceDate,
  );
  if (delta === 0) {
    return currentStreak === 0 ? 1 : currentStreak;
  }
  if (delta === 1) {
    return currentStreak + 1;
  }
  if (delta < 0) {
    return currentStreak === 0 ? 1 : currentStreak;
  }
  return 1;
}

export function isUuid(value: string): boolean {
  return UUID_RE.test(value);
}

export function isDateOnly(value: string): boolean {
  if (!DATE_ONLY.test(value)) {
    return false;
  }
  const utc = dateOnlyUtcMs(value);
  return utc !== null;
}

/** Student's local calendar date as YYYY-MM-DD. */
export function localCalendarDate(now: Date = new Date()): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function utcCalendarDate(now: Date = new Date()): string {
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Accept a client local date only when it is within one calendar day of UTC
 * today. That covers every timezone without letting a client pick an arbitrary
 * streak date.
 */
export function isPlausiblePracticeDate(
  value: string,
  utcToday: string = utcCalendarDate(),
): boolean {
  if (!isDateOnly(value) || !isDateOnly(utcToday)) {
    return false;
  }
  return Math.abs(calendarDayDelta(utcToday, value)) <= 1;
}

export function resolvePracticeDate(
  clientDate: string | undefined,
  utcToday: string = utcCalendarDate(),
): string {
  if (clientDate && isPlausiblePracticeDate(clientDate, utcToday)) {
    return clientDate;
  }
  return utcToday;
}

function dateOnlyUtcMs(value: string): number | null {
  const match = DATE_ONLY.exec(value);
  if (!match) {
    return null;
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const utc = Date.UTC(year, month - 1, day);
  const check = new Date(utc);
  if (
    check.getUTCFullYear() !== year ||
    check.getUTCMonth() !== month - 1 ||
    check.getUTCDate() !== day
  ) {
    return null;
  }
  return utc;
}

function calendarDayDelta(fromDate: string, toDate: string): number {
  const from = dateOnlyUtcMs(fromDate);
  const to = dateOnlyUtcMs(toDate);
  if (from === null || to === null) {
    return Number.NaN;
  }
  return (to - from) / 86_400_000;
}
