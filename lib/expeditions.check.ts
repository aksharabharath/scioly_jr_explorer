/**
 * Expedition derivation checks.
 * Run: npx tsx lib/expeditions.check.ts
 */
import { localCalendarDate } from "@/lib/gamification";
import {
  completedSessionCount,
  completedSessionCountForEvent,
  expeditionLogEntries,
  groupExpeditionLogByLocalWeek,
  hasCompletedExpeditionOnLocalDate,
  questionsPracticedOnLocalDate,
  startOfLocalWeek,
  uniqueQuestionsPracticed,
  type ExpeditionAttempt,
} from "@/lib/expeditions";
import { PRACTICE_SET_SIZE } from "@/lib/learning/adaptive";
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
  options: Partial<ExpeditionAttempt> = {},
): ExpeditionAttempt {
  const noon = new Date();
  noon.setHours(12, 0, 0, 0);
  return {
    questionId,
    isCorrect: true,
    hintUsed: false,
    sessionId: "s1",
    answeredAt: noon.toISOString(),
    ...options,
  };
}

const questions = [
  question("wq-q1", "water-quality"),
  question("wq-q2", "water-quality"),
  question("ento-q1", "entomology"),
];

const shortSet = Array.from({ length: 9 }, () => attempt("wq-q1"));
check("nine answers is not a completed expedition", completedSessionCount(shortSet) === 0);

const full = Array.from({ length: PRACTICE_SET_SIZE }, (_, index) =>
  attempt(index === 0 ? "wq-q1" : "wq-q2", { sessionId: "full" }),
);
check("ten answers in one session is one expedition", completedSessionCount(full) === 1);
check(
  "Water Quality expedition counts for Water Quality",
  completedSessionCountForEvent("water-quality", full, questions) === 1,
);
check(
  "Water Quality expedition does not count for Entomology",
  completedSessionCountForEvent("entomology", full, questions) === 0,
);
check(
  "unique Water Quality questions in the set",
  uniqueQuestionsPracticed("water-quality", full, questions) === 2,
);

const heldOut: Question = {
  ...question("wq-held", "water-quality"),
  verificationStatus: "needs-review",
};
const heldAttempts = [
  ...full,
  attempt("wq-held", { sessionId: "held" }),
];
check(
  "held-out questions do not count toward unique live progress",
  uniqueQuestionsPracticed("water-quality", heldAttempts, [
    ...questions,
    heldOut,
  ]) === 2,
);

const today = localCalendarDate();
check(
  "completed expedition counts for today",
  hasCompletedExpeditionOnLocalDate(full, today),
);
check(
  "completed expedition does not count for an unrelated day",
  !hasCompletedExpeditionOnLocalDate(full, "1999-01-01"),
);
check(
  "questions practiced today matches the full set",
  questionsPracticedOnLocalDate(full, today) === PRACTICE_SET_SIZE,
);
check(
  "questions practiced on another day is zero",
  questionsPracticedOnLocalDate(full, "1999-01-01") === 0,
);

const log = expeditionLogEntries(full, questions, {
  "water-quality": "Water Quality",
});
check("journal includes the completed expedition", log.length === 1);
check("journal uses the event name", log[0]?.eventName === "Water Quality");
check(
  "journal XP includes streak attempt XP plus session bonus",
  log[0]?.derivedXp === 10 * 8 + 12 + 15 + 20,
);

check("week of Saturday Sep 5 2026 starts Monday Aug 31", startOfLocalWeek("2026-09-05") === "2026-08-31");
check("week of Sunday Aug 30 2026 starts Monday Aug 24", startOfLocalWeek("2026-08-30") === "2026-08-24");

function sessionOnLocalDay(
  sessionId: string,
  questionId: string,
  year: number,
  month: number,
  day: number,
): ExpeditionAttempt[] {
  const noon = new Date(year, month - 1, day, 12, 0, 0, 0);
  return Array.from({ length: PRACTICE_SET_SIZE }, () =>
    attempt(questionId, {
      sessionId,
      answeredAt: noon.toISOString(),
    }),
  );
}

const weekMix = [
  ...sessionOnLocalDay("sep5-wq", "wq-q1", 2026, 9, 5),
  ...sessionOnLocalDay("aug31-wq", "wq-q2", 2026, 8, 31),
  ...sessionOnLocalDay("aug30-ento", "ento-q1", 2026, 8, 30),
];
const weekLog = expeditionLogEntries(
  weekMix,
  questions,
  { "water-quality": "Water Quality", entomology: "Entomology" },
  Number.MAX_SAFE_INTEGER,
);
const weeks = groupExpeditionLogByLocalWeek(weekLog);
check("weekly journal has two local weeks", weeks.length === 2);
check("current-style week has two Water Quality expeditions", weeks[0]?.weekStart === "2026-08-31" && weeks[0]?.expeditionCount === 2 && weeks[0]?.fieldSiteCount === 1 && weeks[0]?.events[0]?.questionsAnswered === PRACTICE_SET_SIZE * 2);
check("older week groups Entomology", weeks[1]?.weekStart === "2026-08-24" && weeks[1]?.events[0]?.eventName === "Entomology" && weeks[1]?.events[0]?.expeditions === 1);

if (failures.length > 0) {
  throw new Error(`Expedition checks failed:\n- ${failures.join("\n- ")}`);
}

console.log("Expedition checks passed.");
