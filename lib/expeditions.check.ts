/**
 * Expedition derivation checks.
 * Run: npx tsx lib/expeditions.check.ts
 */
import { localCalendarDate } from "@/lib/gamification";
import {
  completedSessionCount,
  completedSessionCountForEvent,
  expeditionLogEntries,
  hasCompletedExpeditionOnLocalDate,
  questionsPracticedOnLocalDate,
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
check("journal XP includes attempt XP plus session bonus", log[0]?.derivedXp === 10 * 10 + 20);

if (failures.length > 0) {
  throw new Error(`Expedition checks failed:\n- ${failures.join("\n- ")}`);
}

console.log("Expedition checks passed.");
