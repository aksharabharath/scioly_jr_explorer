import type { Question } from "@/lib/types";

export type ProgressAttempt = {
  questionId: string;
  isCorrect: boolean;
};

export type OverallProgress = {
  totalQuestions: number;
  totalCorrect: number;
  /** Null when there are no attempts — never a fake 100%. */
  accuracyPercent: number | null;
  eventsPracticed: number;
};

export type EventProgress = {
  eventId: string;
  totalQuestions: number;
  totalCorrect: number;
  accuracyPercent: number | null;
  topicsPracticed: number;
  topicsTotal: number;
};

function accuracyPercent(total: number, correct: number): number | null {
  if (total === 0) {
    return null;
  }
  return Math.round((correct / total) * 100);
}

function questionMap(questions: Question[]): Map<string, Question> {
  return new Map(questions.map((question) => [question.id, question]));
}

/** Real activity stats. Separate from mock Explorer XP and from mastery. */
export function calculateOverallProgress(
  attempts: ProgressAttempt[],
  questions: Question[],
): OverallProgress {
  const byId = questionMap(questions);
  const eventIds = new Set<string>();
  let totalCorrect = 0;

  for (const attempt of attempts) {
    if (attempt.isCorrect) {
      totalCorrect += 1;
    }
    const question = byId.get(attempt.questionId);
    if (question) {
      eventIds.add(question.eventId);
    }
  }

  return {
    totalQuestions: attempts.length,
    totalCorrect,
    accuracyPercent: accuracyPercent(attempts.length, totalCorrect),
    eventsPracticed: eventIds.size,
  };
}

export function calculateEventProgress(
  eventId: string,
  attempts: ProgressAttempt[],
  questions: Question[],
  topicsTotal: number,
): EventProgress {
  const byId = questionMap(questions);
  const topicIds = new Set<string>();
  let totalQuestions = 0;
  let totalCorrect = 0;

  for (const attempt of attempts) {
    const question = byId.get(attempt.questionId);
    if (!question || question.eventId !== eventId) {
      continue;
    }
    totalQuestions += 1;
    if (attempt.isCorrect) {
      totalCorrect += 1;
    }
    topicIds.add(question.topicId);
  }

  return {
    eventId,
    totalQuestions,
    totalCorrect,
    accuracyPercent: accuracyPercent(totalQuestions, totalCorrect),
    topicsPracticed: topicIds.size,
    topicsTotal,
  };
}
