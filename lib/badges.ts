/**
 * Real MVP badges from persisted practice.
 *
 * Unlocks are computed from saved attempts (and streak days). Nothing here
 * uses mock Event Level or fake mastery. Historical attempts still count
 * after an event is removed from the current selection.
 */
import {
  completedSessionCount,
  completedSessionCountForEvent,
} from "@/lib/expeditions";
import type { Question } from "@/lib/types";

export type BadgeId =
  | "first-try"
  | "first-discovery"
  | "event-explorer"
  | "three-event-explorer"
  | "tricky-topic-tamer"
  | "practice-regular"
  | "question-crusher"
  | "curious-mind"
  | "water-watcher"
  | "entomologist"
  | "body-explorer"
  | "ecosystem-explorer"
  | "crime-scene-rookie"
  | "consistent-explorer"
  | "dedicated-explorer";

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
  streakDays?: number;
};

const EVENT_SET_BADGES: Array<{
  id: BadgeId;
  eventId: string;
  sets: number;
}> = [
  { id: "water-watcher", eventId: "water-quality", sets: 5 },
  { id: "entomologist", eventId: "entomology", sets: 5 },
  { id: "body-explorer", eventId: "anatomy-physiology", sets: 5 },
  { id: "ecosystem-explorer", eventId: "ecology", sets: 5 },
  { id: "crime-scene-rookie", eventId: "crime-busters", sets: 5 },
];

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
    name: "First Expedition",
    description: "You completed your first full practice expedition.",
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
    id: "three-event-explorer",
    name: "Explorer",
    description: "You practiced 3 different events.",
    requirement: "Practice 3 different events",
    emoji: "🧭",
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
    id: "curious-mind",
    name: "Curious Mind",
    description: "You tried 100 practice questions.",
    requirement: "Answer 100 practice questions",
    emoji: "🧠",
  },
  {
    id: "water-watcher",
    name: "Water Watcher",
    description: "You finished 5 Water Quality expeditions.",
    requirement: "Complete 5 Water Quality sets",
    emoji: "💧",
  },
  {
    id: "entomologist",
    name: "Entomologist",
    description: "You finished 5 Entomology expeditions.",
    requirement: "Complete 5 Entomology sets",
    emoji: "🐛",
  },
  {
    id: "body-explorer",
    name: "Body Explorer",
    description: "You finished 5 Anatomy & Physiology expeditions.",
    requirement: "Complete 5 Anatomy & Physiology sets",
    emoji: "🫀",
  },
  {
    id: "ecosystem-explorer",
    name: "Ecosystem Explorer",
    description: "You finished 5 Ecology expeditions.",
    requirement: "Complete 5 Ecology sets",
    emoji: "🌱",
  },
  {
    id: "crime-scene-rookie",
    name: "Crime Scene Rookie",
    description: "You finished 5 Crime Busters expeditions.",
    requirement: "Complete 5 Crime Busters sets",
    emoji: "🔬",
  },
  {
    id: "consistent-explorer",
    name: "Consistent Explorer",
    description: "You reached a 7-day practice streak.",
    requirement: "Reach a 7-day streak",
    emoji: "🔥",
  },
  {
    id: "dedicated-explorer",
    name: "Dedicated Explorer",
    description: "You reached a 30-day practice streak.",
    requirement: "Reach a 30-day streak",
    emoji: "🌟",
  },
];

export function getBadgeDefinitions(): BadgeDefinition[] {
  return BADGE_DEFINITIONS;
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
  const streakDays = Math.max(0, Math.floor(input.streakDays ?? 0));
  const earned: BadgeId[] = [];
  const finishedSets = completedSessionCount(attempts);
  const eventsTried = distinctEventCount(attempts, questions);

  if (attempts.length >= 1) {
    earned.push("first-try");
  }
  if (finishedSets >= 1) {
    earned.push("first-discovery");
  }
  if (eventsTried >= 2) {
    earned.push("event-explorer");
  }
  if (eventsTried >= 3) {
    earned.push("three-event-explorer");
  }
  if (tamedATrickyTopic(attempts, questions)) {
    earned.push("tricky-topic-tamer");
  }
  if (finishedSets >= 5) {
    earned.push("practice-regular");
  }
  if (attempts.length >= 50) {
    earned.push("question-crusher");
  }
  if (attempts.length >= 100) {
    earned.push("curious-mind");
  }
  for (const spec of EVENT_SET_BADGES) {
    if (
      completedSessionCountForEvent(spec.eventId, attempts, questions) >=
      spec.sets
    ) {
      earned.push(spec.id);
    }
  }
  if (streakDays >= 7) {
    earned.push("consistent-explorer");
  }
  if (streakDays >= 30) {
    earned.push("dedicated-explorer");
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
  streakDaysBefore = 0,
  streakDaysAfter = 0,
): BadgeId[] {
  return getNewlyEarnedBadges(
    getEarnedBadgeIds({
      attempts: beforeAttempts,
      questions,
      streakDays: streakDaysBefore,
    }),
    getEarnedBadgeIds({
      attempts: afterAttempts,
      questions,
      streakDays: streakDaysAfter,
    }),
  );
}

export function toSessionBadgeAttempts(
  records: Array<{
    questionId: string;
    isCorrect: boolean;
    hintUsed: boolean;
  }>,
  sessionId: string,
  answeredAt: string | null = null,
): BadgeProgressAttempt[] {
  return records.map((record) => ({
    questionId: record.questionId,
    isCorrect: record.isCorrect,
    hintUsed: record.hintUsed,
    sessionId,
    answeredAt,
  }));
}

export function definitionsForIds(
  ids: readonly BadgeId[],
): BadgeDefinition[] {
  const wanted = new Set(ids);
  return BADGE_DEFINITIONS.filter((badge) => wanted.has(badge.id));
}
