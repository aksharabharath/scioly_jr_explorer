import type { Question } from "@/lib/types";

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
