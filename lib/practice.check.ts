/**
 * Practice display helpers.
 * Run: npx tsx lib/practice.check.ts
 */
import {
  attemptUsedAHint,
  authoredSecondHint,
  missedAnswerContrast,
  optionalSecondHintFields,
  optionalSecondHintIsValid,
  summarizePractice,
} from "@/lib/practice";
import {
  calculateAttemptXp,
  calculateSessionCompletionXp,
  XP_CORRECT,
  XP_CORRECT_WITH_HINT,
  XP_INCORRECT,
  XP_SESSION_COMPLETION,
} from "@/lib/gamification";
import type { Question } from "@/lib/types";

const sample: Pick<Question, "choices" | "correctChoiceId"> = {
  correctChoiceId: "b",
  choices: [
    { id: "a", text: "Whorl" },
    { id: "b", text: "Loop" },
    { id: "c", text: "Arch" },
    { id: "d", text: "Accidental" },
  ],
};

const failures: string[] = [];

function check(name: string, ok: boolean) {
  if (!ok) {
    failures.push(name);
  }
}

check(
  "a miss names the chosen answer and the better match",
  missedAnswerContrast(sample, "a") ===
    "You chose A (Whorl). The better match is B (Loop).",
);
check(
  "a correct choice has no contrast line",
  missedAnswerContrast(sample, "b") === null,
);
check(
  "an unknown choice has no contrast line",
  missedAnswerContrast(sample, "z") === null,
);
check(
  "empty records stay at 0% accuracy",
  summarizePractice([]).accuracyPercent === 0,
);
check(
  "a missing or blank hint2 is not a second clue",
  authoredSecondHint({}) === null &&
    authoredSecondHint({ hint2: "   " }) === null,
);
check(
  "a trimmed hint2 is a second clue",
  authoredSecondHint({ hint2: "  Apply the idea here.  " }) ===
    "Apply the idea here.",
);
check(
  "optional hint2 fields omit blanks",
  optionalSecondHintFields(undefined).hint2 === undefined &&
    optionalSecondHintFields("  ").hint2 === undefined &&
    optionalSecondHintFields("Apply it here.").hint2 === "Apply it here.",
);
check(
  "omitted hint2 is valid; a copy of hint is not",
  optionalSecondHintIsValid({ hint: "Orient.", hint2: undefined }) &&
    !optionalSecondHintIsValid({ hint: "Orient.", hint2: "Orient." }),
);
check(
  "no clue then correct is independent XP",
  calculateAttemptXp({
    isCorrect: true,
    hintUsed: attemptUsedAHint(false, false),
  }) === XP_CORRECT,
);
check(
  "first clue then correct is hinted XP",
  calculateAttemptXp({
    isCorrect: true,
    hintUsed: attemptUsedAHint(true, false),
  }) === XP_CORRECT_WITH_HINT,
);
check(
  "both clues then correct is still one hinted XP",
  calculateAttemptXp({
    isCorrect: true,
    hintUsed: attemptUsedAHint(true, true),
  }) === XP_CORRECT_WITH_HINT &&
    calculateAttemptXp({
      isCorrect: true,
      hintUsed: attemptUsedAHint(true, true),
    }) !== XP_CORRECT,
);
check(
  "any clue then incorrect is miss XP",
  calculateAttemptXp({
    isCorrect: false,
    hintUsed: attemptUsedAHint(true, true),
  }) === XP_INCORRECT,
);
check(
  "a 10-question session still completes at +20",
  calculateSessionCompletionXp(10) === XP_SESSION_COMPLETION &&
    calculateSessionCompletionXp(9) === 0,
);

if (failures.length > 0) {
  throw new Error(`Practice checks failed:\n- ${failures.join("\n- ")}`);
}
