import type { DifficultyLevel, PracticeFollowUp, PracticeSummary } from "@/lib/types";

export type AnswerRecord = {
  questionId: string;
  selectedChoiceId: string;
  isCorrect: boolean;
  hintUsed: boolean;
};

/** Display summary only — not XP, not mastery, not persistence. */
export function summarizePractice(records: AnswerRecord[]): PracticeSummary {
  const questionsAnswered = records.length;
  const correctAnswers = records.filter((record) => record.isCorrect).length;
  const accuracyPercent =
    questionsAnswered === 0
      ? 0
      : Math.round((correctAnswers / questionsAnswered) * 100);

  return { questionsAnswered, correctAnswers, accuracyPercent };
}

export const DIFFICULTY_LEVEL_LABEL: Record<DifficultyLevel, string> = {
  1: "Easy",
  2: "Medium",
  3: "Hard",
};

export function recommendNextStep(
  accuracyPercent: number,
  eventName = "this event",
): PracticeFollowUp {
  if (accuracyPercent === 100) {
    return {
      headline: "Beautiful work — you got every one.",
      detail: `Try this set again later to stay sharp, or head back to ${eventName} and pick a new topic. Your XP is safe either way.`,
    };
  }

  if (accuracyPercent >= 50) {
    return {
      headline: "You are building real understanding.",
      detail:
        "Read any explanations you missed, then try the set again. Mistakes never take XP away.",
    };
  }

  return {
    headline: "Every miss is a clue, not a penalty.",
    detail:
      "Look at the explanations, then give the questions another try. Practice is how explorers learn — XP stays with you.",
  };
}
