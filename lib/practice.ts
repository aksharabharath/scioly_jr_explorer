import type {
  DifficultyLevel,
  PracticeFollowUp,
  PracticeSummary,
  Question,
} from "@/lib/types";

const SUBSCRIPT_DIGITS: Record<string, string> = {
  "₀": "0",
  "₁": "1",
  "₂": "2",
  "₃": "3",
  "₄": "4",
  "₅": "5",
  "₆": "6",
  "₇": "7",
  "₈": "8",
  "₉": "9",
};

export function normalizeAnswer(value: string): string {
  return value
    .normalize("NFKC")
    .replace(/[₀-₉]/g, (digit) => SUBSCRIPT_DIGITS[digit] ?? digit)
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleLowerCase();
}

function numericAnswer(value: string): number | null {
  const normalized = normalizeAnswer(value);
  if (!/^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(normalized)) {
    return null;
  }
  const number = Number(normalized);
  return Number.isFinite(number) ? number : null;
}

export function isQuestionAnswerCorrect(
  question: Pick<
    Question,
    "answerMode" | "acceptedAnswers" | "correctChoiceId"
  >,
  submittedAnswer: string,
): boolean {
  if (question.answerMode !== "open-ended") {
    return submittedAnswer === question.correctChoiceId;
  }

  const submitted = normalizeAnswer(submittedAnswer);
  if (!submitted) {
    return false;
  }
  const accepted = question.acceptedAnswers?.length
    ? question.acceptedAnswers
    : [question.correctChoiceId];
  const submittedNumber = numericAnswer(submitted);
  return accepted.some((answer) => {
    const normalized = normalizeAnswer(answer);
    if (normalized === submitted) {
      return true;
    }
    const acceptedNumber = numericAnswer(normalized);
    return (
      submittedNumber !== null &&
      acceptedNumber !== null &&
      submittedNumber === acceptedNumber
    );
  });
}

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

/**
 * After a miss: name the chosen answer and the better match so the student
 * can see what they mixed up before they read the explanation.
 */
export function missedAnswerContrast(
  question: Pick<Question, "choices" | "correctChoiceId">,
  selectedChoiceId: string,
): string | null {
  if (selectedChoiceId === question.correctChoiceId) {
    return null;
  }
  const selected = question.choices.find(
    (choice) => choice.id === selectedChoiceId,
  );
  const correct = question.choices.find(
    (choice) => choice.id === question.correctChoiceId,
  );
  if (!selected || !correct) {
    return null;
  }
  return `You chose ${selected.id.toUpperCase()} (${selected.text}). The better match is ${correct.id.toUpperCase()} (${correct.text}).`;
}

/** Non-empty Apply clue, or null when the question has only Orient. */
export function authoredSecondHint(
  question: Pick<Question, "hint2">,
): string | null {
  const text = question.hint2?.trim() ?? "";
  return text.length > 0 ? text : null;
}

/** Opening either clue marks the attempt hinted. Does not change XP math. */
export function attemptUsedAHint(
  firstClueOpen: boolean,
  secondClueOpen: boolean,
): boolean {
  return firstClueOpen || secondClueOpen;
}

/** Spread onto a Question / mapper result only when hint2 is authored. */
export function optionalSecondHintFields(
  hint2: string | undefined,
): Pick<Question, "hint2"> {
  const text = hint2?.trim() ?? "";
  return text.length > 0 ? { hint2: text } : {};
}

/** If hint2 is omitted, valid. If present, it must differ from hint. */
export function optionalSecondHintIsValid(
  question: Pick<Question, "hint" | "hint2">,
): boolean {
  const second = authoredSecondHint(question);
  if (second == null) {
    return true;
  }
  return second !== question.hint.trim();
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
      detail: `Try this expedition again later to stay sharp, or head back to ${eventName} and pick a new topic. Your XP is safe either way.`,
    };
  }

  if (accuracyPercent >= 50) {
    return {
      headline: "You are building real understanding.",
      detail:
        "Read any explanations you missed, then try the expedition again. Misses never take XP away.",
    };
  }

  return {
    headline: "Every miss is a clue, not a penalty.",
    detail:
      "Look at the explanations, then give the questions another try. Explorers learn by going again — XP stays with you.",
  };
}
