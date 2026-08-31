/**
 * Recent achievements checks.
 * Run: npx tsx lib/recent-achievements.check.ts
 */
import { recentAchievements } from "@/lib/recent-achievements";
import { localCalendarDate } from "@/lib/gamification";
import { PRACTICE_SET_SIZE } from "@/lib/learning/adaptive";
import type { BadgeProgressAttempt } from "@/lib/badges";
import type { Question } from "@/lib/types";

const failures: string[] = [];

function check(name: string, ok: boolean) {
  if (!ok) {
    failures.push(name);
  }
}

function question(id: string, eventId: string): Question {
  return {
    id,
    eventId,
    topicId: "t",
    prompt: id,
    choices: [
      { id: "a", text: "A" },
      { id: "b", text: "B" },
      { id: "c", text: "C" },
      { id: "d", text: "D" },
    ],
    correctChoiceId: "a",
    explanation: ".",
    hint: ".",
    difficulty: 1,
  };
}

function attempt(
  questionId: string,
  sessionId: string,
): BadgeProgressAttempt {
  const noon = new Date();
  noon.setHours(12, 0, 0, 0);
  return {
    questionId,
    isCorrect: true,
    hintUsed: false,
    sessionId,
    answeredAt: noon.toISOString(),
  };
}

const questions = [question("wq-q1", "water-quality")];
const full: BadgeProgressAttempt[] = Array.from(
  { length: PRACTICE_SET_SIZE },
  () => attempt("wq-q1", "s1"),
);
const today = localCalendarDate();

const empty = recentAchievements({
  attempts: [],
  questions,
  streakDays: 0,
  practiceDate: today,
});
check("no attempts: empty list", empty.length === 0);

const firstExpedition = recentAchievements({
  attempts: full,
  questions,
  streakDays: 1,
  practiceDate: today,
});
check(
  "first expedition lists First Try and First Expedition",
  firstExpedition.some((item) => item.id === "badge-first-try") &&
    firstExpedition.some((item) => item.id === "badge-first-discovery"),
);
check(
  "first expedition lists daily mission",
  firstExpedition.some((item) => item.id === "daily-mission"),
);

const highGoal = recentAchievements({
  attempts: full,
  questions,
  streakDays: 1,
  practiceDate: today,
  dailyPracticeGoal: 20,
});
check(
  "daily mission stays incomplete when today's answers are below the goal",
  !highGoal.some((item) => item.id === "daily-mission"),
);

const streakDay = recentAchievements({
  attempts: full,
  questions,
  streakDays: 3,
  practiceDate: today,
});
check(
  "3-day streak with practice today is listed",
  streakDay.some((item) => item.id === "streak-3"),
);

const staleStreak = recentAchievements({
  attempts: full,
  questions,
  streakDays: 3,
  practiceDate: "1999-01-01",
});
check(
  "streak milestone is omitted without practice on that date",
  !staleStreak.some((item) => item.id === "streak-3"),
);

if (failures.length > 0) {
  throw new Error(`Recent achievements checks failed:\n- ${failures.join("\n- ")}`);
}

console.log("Recent achievements checks passed.");
