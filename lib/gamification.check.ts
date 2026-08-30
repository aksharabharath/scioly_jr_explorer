/**
 * Gamification v1 checks.
 * Run: npx tsx lib/gamification.check.ts
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  calculateAttemptXp,
  calculateLevelFromXp,
  calculateSessionCompletionXp,
  calculateStreak,
  calculateXpProgress,
  calculateXpToNextLevel,
  describeXpAward,
  explorerProfileFromGamification,
  formatXpGain,
  GAMIFICATION_SESSION_SIZE,
  isPlausiblePracticeDate,
  newlyReachedStreakMilestone,
  streakLabel,
  xpBarPercent,
  XP_CORRECT,
  XP_CORRECT_WITH_HINT,
  XP_INCORRECT,
  XP_SESSION_COMPLETION,
} from "@/lib/gamification";
import { PRACTICE_SET_SIZE } from "@/lib/learning/adaptive";

const failures: string[] = [];

function check(name: string, ok: boolean) {
  if (!ok) {
    failures.push(name);
  }
}

check(
  "correct without hint: 10 XP",
  calculateAttemptXp({ isCorrect: true, hintUsed: false }) === XP_CORRECT &&
    calculateAttemptXp({ isCorrect: true, hintUsed: false }) === 10,
);
check(
  "correct with hint: 6 XP",
  calculateAttemptXp({ isCorrect: true, hintUsed: true }) ===
    XP_CORRECT_WITH_HINT &&
    calculateAttemptXp({ isCorrect: true, hintUsed: true }) === 6,
);
check(
  "incorrect: 2 XP",
  calculateAttemptXp({ isCorrect: false, hintUsed: false }) === XP_INCORRECT &&
    calculateAttemptXp({ isCorrect: false, hintUsed: false }) === 2,
);
check(
  "incorrect with hint still 2 XP",
  calculateAttemptXp({ isCorrect: false, hintUsed: true }) === 2,
);
check(
  "hint + correct must not earn 10 XP",
  calculateAttemptXp({ isCorrect: true, hintUsed: true }) !== 10,
);

check("0 XP → Level 1", calculateLevelFromXp(0) === 1);
check("99 XP → Level 1", calculateLevelFromXp(99) === 1);
check("100 XP → Level 2", calculateLevelFromXp(100) === 2);
check("249 XP → Level 2", calculateLevelFromXp(249) === 2);
check("250 XP → Level 3", calculateLevelFromXp(250) === 3);
check("449 XP → Level 3", calculateLevelFromXp(449) === 3);
check("450 XP → Level 4", calculateLevelFromXp(450) === 4);
check("699 XP → Level 4", calculateLevelFromXp(699) === 4);
check("700 XP → Level 5", calculateLevelFromXp(700) === 5);
check("999 XP → Level 5", calculateLevelFromXp(999) === 5);
check("1000 XP → Level 6", calculateLevelFromXp(1000) === 6);
check("1349 XP → Level 6", calculateLevelFromXp(1349) === 6);
check("1350 XP → Level 7", calculateLevelFromXp(1350) === 7);
check("1749 XP → Level 7", calculateLevelFromXp(1749) === 7);
check("1750 XP → Level 8", calculateLevelFromXp(1750) === 8);
check("2199 XP → Level 8", calculateLevelFromXp(2199) === 8);
check("2200 XP → Level 9", calculateLevelFromXp(2200) === 9);
check("2699 XP → Level 9", calculateLevelFromXp(2699) === 9);
check("2700 XP → Level 10", calculateLevelFromXp(2700) === 10);
check("9999 XP → Level 10", calculateLevelFromXp(9999) === 10);

check("0 XP: 100 to next, threshold 100", (() => {
  const progress = calculateXpProgress(0);
  return (
    progress.nextLevelThreshold === 100 &&
    progress.xpToNextLevel === 100 &&
    calculateXpToNextLevel(0) === 100
  );
})());
check("99 XP: 1 to Level 2", calculateXpToNextLevel(99) === 1);
check("100 XP: 150 to Level 3 (threshold 250)", (() => {
  const progress = calculateXpProgress(100);
  return (
    progress.level === 2 &&
    progress.nextLevelThreshold === 250 &&
    progress.xpToNextLevel === 150
  );
})());
check("249 XP: 1 to Level 3", calculateXpToNextLevel(249) === 1);
check("250 XP: threshold 450", calculateXpProgress(250).nextLevelThreshold === 450);
check("2699 XP: 1 to Level 10", calculateXpToNextLevel(2699) === 1);

const max = calculateXpProgress(2700);
check("Level 10: no next-level threshold", max.nextLevelThreshold === null);
check("Level 10: no XP-to-next number", max.xpToNextLevel === null);
check(
  "Level 10: calculateXpToNextLevel is null",
  calculateXpToNextLevel(2700) === null,
);
check(
  "Level 10 stays 10 with more XP",
  calculateXpProgress(4000).level === 10 &&
    calculateXpProgress(4000).xpToNextLevel === null,
);

check(
  "0 XP bar is empty",
  xpBarPercent(calculateXpProgress(0)) === 0,
);
check(
  "50 / 100 XP bar is 50%",
  xpBarPercent(calculateXpProgress(50)) === 50,
);
check(
  "99 / 100 XP bar is 99%",
  xpBarPercent(calculateXpProgress(99)) === 99,
);
check(
  "Level 2 start (100 / 250) bar is 40%",
  xpBarPercent(calculateXpProgress(100)) === 40,
);
check(
  "Level 10 bar is full, not a fake next level",
  xpBarPercent(calculateXpProgress(2700)) === 100 &&
    xpBarPercent(calculateXpProgress(4000)) === 100 &&
    calculateXpProgress(2700).nextLevelThreshold === null,
);

check(
  "correct award copy uses server amount 10",
  (() => {
    const lines = describeXpAward({
      attemptXp: 10,
      sessionBonusXp: 0,
      isCorrect: true,
      hintUsed: false,
    });
    return (
      lines.length === 1 &&
      lines[0].amount === 10 &&
      lines[0].reason === "Correct answer" &&
      formatXpGain(10) === "+10 XP"
    );
  })(),
);
check(
  "incorrect award copy uses server amount 2",
  (() => {
    const lines = describeXpAward({
      attemptXp: 2,
      sessionBonusXp: 0,
      isCorrect: false,
      hintUsed: false,
    });
    return (
      lines.length === 1 &&
      lines[0].amount === 2 &&
      lines[0].reason === "You still earned XP for trying"
    );
  })(),
);
check(
  "hint-assisted award copy uses server amount 6",
  (() => {
    const lines = describeXpAward({
      attemptXp: 6,
      sessionBonusXp: 0,
      isCorrect: true,
      hintUsed: true,
    });
    return (
      lines.length === 1 &&
      lines[0].amount === 6 &&
      lines[0].reason === "Correct — hints still count"
    );
  })(),
);
check(
  "zero XP award is not displayed as a reward",
  describeXpAward({
    attemptXp: 0,
    sessionBonusXp: 0,
    isCorrect: true,
    hintUsed: false,
  }).length === 0,
);
check(
  "duplicate attempt (0 XP) plus no bonus shows nothing",
  describeXpAward({
    attemptXp: 0,
    sessionBonusXp: 0,
    isCorrect: false,
    hintUsed: true,
  }).length === 0,
);
check(
  "session bonus is a separate line from attempt XP",
  (() => {
    const lines = describeXpAward({
      attemptXp: 10,
      sessionBonusXp: 20,
      isCorrect: true,
      hintUsed: false,
    });
    return (
      lines.length === 2 &&
      lines[0].amount === 10 &&
      lines[1].amount === 20 &&
      lines[1].reason === "Practice set complete" &&
      formatXpGain(20) === "+20 XP"
    );
  })(),
);
check(
  "describeXpAward never uses a client-calculated amount",
  describeXpAward({
    attemptXp: 10,
    sessionBonusXp: 0,
    isCorrect: false,
    hintUsed: false,
  })[0]?.amount === 10,
);

check(
  "10-question session XP total: 8 independent correct + 1 hint + 1 miss + completion",
  8 * XP_CORRECT +
    XP_CORRECT_WITH_HINT +
    XP_INCORRECT +
    XP_SESSION_COMPLETION ===
    108,
);

check("no streak label at 0", streakLabel(0) === null);
check("streak label uses persisted days", streakLabel(4) === "4 day streak");
check(
  "crossing 3 days is a streak milestone",
  newlyReachedStreakMilestone(2, 3) === 3,
);
check(
  "staying at 7 days is not a new milestone",
  newlyReachedStreakMilestone(7, 7) === null,
);
check(
  "jumping from 6 to 8 still celebrates 7",
  newlyReachedStreakMilestone(6, 8) === 7,
);
check(
  "first practice day is not a listed milestone",
  newlyReachedStreakMilestone(0, 1) === null,
);

check(
  "results Explorer Level uses persisted total XP",
  calculateLevelFromXp(250) === 3 && calculateLevelFromXp(99) === 1,
);

check(
  "first practice day: 1 day streak",
  calculateStreak({
    lastPracticeDate: null,
    practiceDate: "2026-08-24",
    currentStreak: 0,
  }) === 1,
);
check(
  "same calendar day: streak unchanged",
  calculateStreak({
    lastPracticeDate: "2026-08-24",
    practiceDate: "2026-08-24",
    currentStreak: 3,
  }) === 3,
);
check(
  "consecutive calendar day: streak +1",
  calculateStreak({
    lastPracticeDate: "2026-08-24",
    practiceDate: "2026-08-25",
    currentStreak: 3,
  }) === 4,
);
check(
  "missed day: reset to 1",
  calculateStreak({
    lastPracticeDate: "2026-08-22",
    practiceDate: "2026-08-24",
    currentStreak: 5,
  }) === 1,
);
check(
  "month boundary consecutive day",
  calculateStreak({
    lastPracticeDate: "2026-08-31",
    practiceDate: "2026-09-01",
    currentStreak: 1,
  }) === 2,
);
check(
  "earlier client date does not rewind streak",
  calculateStreak({
    lastPracticeDate: "2026-08-24",
    practiceDate: "2026-08-23",
    currentStreak: 4,
  }) === 4,
);

check(
  "session size stays aligned with practice set size",
  GAMIFICATION_SESSION_SIZE === PRACTICE_SET_SIZE,
);
check(
  "10/10 session completion bonus applies",
  calculateSessionCompletionXp(10) === XP_SESSION_COMPLETION &&
    calculateSessionCompletionXp(GAMIFICATION_SESSION_SIZE) === 20,
);
check(
  "8/10 session completion bonus does not apply",
  calculateSessionCompletionXp(8) === 0,
);
check(
  "9/10 session completion bonus does not apply",
  calculateSessionCompletionXp(9) === 0,
);
check("0/10 no completion bonus", calculateSessionCompletionXp(0) === 0);

check(
  "local date matching UTC today is plausible",
  isPlausiblePracticeDate("2026-08-24", "2026-08-24"),
);
check(
  "local date one day off UTC is plausible",
  isPlausiblePracticeDate("2026-08-23", "2026-08-24") &&
    isPlausiblePracticeDate("2026-08-25", "2026-08-24"),
);
check(
  "local date two days off UTC is rejected",
  !isPlausiblePracticeDate("2026-08-22", "2026-08-24"),
);

const newbie = explorerProfileFromGamification("Alex", { xp: 0, streakDays: 0 });
check("new student profile: Level 1", newbie.explorerLevel === 1);
check("new student profile: 0 XP", newbie.currentXp === 0);
check("new student profile: next at 100", newbie.xpForNextLevel === 100);
check("new student profile: 0 streak", newbie.streakDays === 0);

const sessionSizeSql = readFileSync(
  join(
    process.cwd(),
    "supabase/migrations/20260824_practice_session_size_10.sql",
  ),
  "utf8",
);
check(
  "session-size migration uses 10 and closes the function body",
  /session_size constant integer := 10/.test(sessionSizeSql) &&
    /\nend;\n\$\$;/.test(sessionSizeSql),
);
check(
  "session-size migration does not use a composite att variable",
  !/\batt\s+public\.practice_attempts%rowtype/.test(sessionSizeSql) &&
    !/\binto\s+att\b/.test(sessionSizeSql) &&
    !/= att\./.test(sessionSizeSql),
);
check(
  "session bonus waits until saved count reaches session_size",
  /session_count >= session_size/.test(sessionSizeSql),
);
check(
  "session bonus is unique per session_id",
  /on conflict \(session_id\) do nothing/.test(sessionSizeSql),
);

if (failures.length > 0) {
  throw new Error(`Gamification checks failed:\n- ${failures.join("\n- ")}`);
}

console.log("Gamification checks passed.");
