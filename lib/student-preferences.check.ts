/**
 * Run: npx tsx lib/student-preferences.check.ts
 */
import {
  DEFAULT_DAILY_PRACTICE_GOAL,
  isDailyMissionComplete,
  parseDailyPracticeGoal,
} from "@/lib/student-preferences";

const failures: string[] = [];

function check(name: string, ok: boolean) {
  if (!ok) {
    failures.push(name);
  }
}

check("default is 10", parseDailyPracticeGoal(undefined) === DEFAULT_DAILY_PRACTICE_GOAL);
check("accepts 5", parseDailyPracticeGoal(5) === 5);
check("accepts string 15", parseDailyPracticeGoal("15") === 15);
check("rejects 7", parseDailyPracticeGoal(7) === DEFAULT_DAILY_PRACTICE_GOAL);
check("mission complete at goal", isDailyMissionComplete(10, 10));
check("mission incomplete below goal", !isDailyMissionComplete(9, 10));

if (failures.length > 0) {
  throw new Error(`Student preference checks failed:\n- ${failures.join("\n- ")}`);
}

console.log("Student preference checks passed.");
