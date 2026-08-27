/**
 * Real MVP badges from persisted practice.
 *
 * Unlocks are computed from saved attempts. Nothing here uses mock Event
 * Level or fake mastery. Historical attempts still count after an event is
 * removed from the current selection.
 */
import { PRACTICE_SET_SIZE } from "@/lib/learning/adaptive";
import type { Question } from "@/lib/types";

export type BadgeId =
  | "first-try"
  | "first-discovery"
  | "event-explorer"
  | "tricky-topic-tamer"
  | "practice-regular"
  | "question-crusher"
  | "explorer";

export type BadgeDefinition = {
  id: BadgeId;
  name: string;
  /** Shown when earned. */
  description: string;
  /** Shown when locked. */
  requirement: string;
  emoji: string;
};

export type BadgeProgressAttempt = {
  questionId: string;
  isCorrect: boolean;
  hintUsed: boolean;
  sessionId: string | null;
  answeredAt: string | null;
};

export type BadgeInput = {
  attempts: BadgeProgressAttempt[];
  questions: Question[];
};

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  {
    id: "first-try",
    name: "First Try",
    description: "You answered your first practice question.",
    requirement: "Answer at least 1 practice question",
    emoji: "⭐",
  },
  {
    id: "first-discovery",
    name: "First Discovery",
    description: "You completed your first full practice session.",
    requirement: "Finish a full practice set",
    emoji: "🔎",
  },
  {
    id: "event-explorer",
    name: "Event Explorer",
    description: "You practiced 2 different events.",
    requirement: "Practice 2 different events",
    emoji: "🗺️",
  },
  {
    id: "tricky-topic-tamer",
    name: "Tricky Topic Tamer",
    description: "You missed a topic, then got it right later.",
    requirement: "Miss a topic, then get it right later",
    emoji: "💪",
  },
  {
    id: "practice-regular",
    name: "Practice Regular",
    description: "You finished 5 full practice sessions.",
    requirement: "Finish 5 full practice sets",
    emoji: "📅",
  },
  {
    id: "question-crusher",
    name: "Question Crusher",
    description: "You tried 50 practice questions.",
    requirement: "Answer 50 practice questions",
    emoji: "📚",
  },
  {
    id: "explorer",
    name: "Explorer",
    description: "You tried 100 practice questions.",
    requirement: "Answer 100 practice questions",
    emoji: "🧭",
  },
];

export function getBadgeDefinitions(): BadgeDefinition[] {
  return BADGE_DEFINITIONS;
}

function completedSessionCount(attempts: BadgeProgressAttempt[]): number {
  const counts = new Map<string, number>();
  for (const attempt of attempts) {
    if (!attempt.sessionId) {
      continue;
    }
    counts.set(attempt.sessionId, (counts.get(attempt.sessionId) ?? 0) + 1);
  }
  let complete = 0;
  for (const count of counts.values()) {
    if (count >= PRACTICE_SET_SIZE) {
      complete += 1;
    }
  }
  return complete;
}

function distinctEventCount(
  attempts: BadgeProgressAttempt[],
  questions: Question[],
): number {
  const byId = new Map(questions.map((question) => [question.id, question]));
  const eventIds = new Set<string>();
  for (const attempt of attempts) {
    const question = byId.get(attempt.questionId);
    if (question) {
      eventIds.add(question.eventId);
    }
  }
  return eventIds.size;
}

function tamedATrickyTopic(
  attempts: BadgeProgressAttempt[],
  questions: Question[],
): boolean {
  const byId = new Map(questions.map((question) => [question.id, question]));
  const firstMiss = new Map<string, number>();

  attempts.forEach((attempt, index) => {
    const question = byId.get(attempt.questionId);
    if (!question) {
      return;
    }
    if (!attempt.isCorrect && !firstMiss.has(question.topicId)) {
      firstMiss.set(question.topicId, index);
    }
  });

  for (const [topicId, missIndex] of firstMiss) {
    const laterWin = attempts.slice(missIndex + 1).some((attempt) => {
      const question = byId.get(attempt.questionId);
      return (
        question?.topicId === topicId &&
        attempt.isCorrect &&
        attempt.hintUsed !== true
      );
    });
    if (laterWin) {
      return true;
    }
  }

  return false;
}

export function getEarnedBadgeIds(input: BadgeInput): BadgeId[] {
  const { attempts, questions } = input;
  const earned: BadgeId[] = [];

  if (attempts.length >= 1) {
    earned.push("first-try");
  }
  if (completedSessionCount(attempts) >= 1) {
    earned.push("first-discovery");
  }
  if (distinctEventCount(attempts, questions) >= 2) {
    earned.push("event-explorer");
  }
  if (tamedATrickyTopic(attempts, questions)) {
    earned.push("tricky-topic-tamer");
  }
  if (completedSessionCount(attempts) >= 5) {
    earned.push("practice-regular");
  }
  if (attempts.length >= 50) {
    earned.push("question-crusher");
  }
  if (attempts.length >= 100) {
    earned.push("explorer");
  }

  return earned;
}

export function getNewlyEarnedBadges(
  before: readonly BadgeId[],
  after: readonly BadgeId[],
): BadgeId[] {
  const prior = new Set(before);
  return BADGE_DEFINITIONS.map((badge) => badge.id).filter(
    (id) => after.includes(id) && !prior.has(id),
  );
}

export function getNewlyEarnedBadgesFromAttempts(
  beforeAttempts: BadgeProgressAttempt[],
  afterAttempts: BadgeProgressAttempt[],
  questions: Question[],
): BadgeId[] {
  return getNewlyEarnedBadges(
    getEarnedBadgeIds({ attempts: beforeAttempts, questions }),
    getEarnedBadgeIds({ attempts: afterAttempts, questions }),
  );
}

export function toSessionBadgeAttempts(
  records: Array<{
    questionId: string;
    isCorrect: boolean;
    hintUsed: boolean;
  }>,
  sessionId: string,
): BadgeProgressAttempt[] {
  return records.map((record) => ({
    questionId: record.questionId,
    isCorrect: record.isCorrect,
    hintUsed: record.hintUsed,
    sessionId,
    answeredAt: null,
  }));
}

export function definitionsForIds(
  ids: readonly BadgeId[],
): BadgeDefinition[] {
  const wanted = new Set(ids);
  return BADGE_DEFINITIONS.filter((badge) => wanted.has(badge.id));
}
