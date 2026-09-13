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
import { PRACTICE_SET_SIZE } from "@/lib/learning/adaptive";
import type { Question } from "@/lib/types";

export type BadgeId =
  | "first-try"
  | "first-discovery"
  | "three-event-explorer"
  | "junior-scientist"
  | "tricky-topic-tamer"
  | "practice-regular"
  | "water-watcher"
  | "entomologist"
  | "body-explorer"
  | "ecosystem-explorer"
  | "crime-scene-rookie"
  | "codebusters-explorer"
  | "consistent-explorer"
  | "dedicated-explorer"
  | "perfect-expedition"
  | "science-starter";

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

export const BARE_BONES_BADGE_IDS = [
  "first-discovery",
  "three-event-explorer",
  "junior-scientist",
  "water-watcher",
  "entomologist",
  "body-explorer",
  "ecosystem-explorer",
  "crime-scene-rookie",
  "codebusters-explorer",
  "consistent-explorer",
  "perfect-expedition",
  "science-starter",
  "practice-regular",
] as const satisfies readonly BadgeId[];

export const EVENT_SET_BADGES: Array<{
  id: BadgeId;
  eventId: string;
  sets: number;
}> = [
  { id: "water-watcher", eventId: "water-quality", sets: 5 },
  { id: "entomologist", eventId: "entomology", sets: 5 },
  { id: "body-explorer", eventId: "anatomy-physiology", sets: 5 },
  { id: "ecosystem-explorer", eventId: "ecology", sets: 5 },
  { id: "crime-scene-rookie", eventId: "crime-busters", sets: 5 },
  { id: "codebusters-explorer", eventId: "codebusters", sets: 5 },
];

export const EVENT_BADGE_IDS = EVENT_SET_BADGES.map(
  (badge) => badge.id,
) as readonly BadgeId[];

export function badgeIdsForSelectedEvents(
  selectedEventIds: readonly string[],
): BadgeId[] {
  const selected = new Set(selectedEventIds);
  return BARE_BONES_BADGE_IDS.filter((id) => {
    const eventId = EVENT_SET_BADGES.find((badge) => badge.id === id)?.eventId;
    return !eventId || selected.has(eventId);
  });
}

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
    requirement: "Finish a full practice expedition",
    emoji: "🔎",
  },
  {
    id: "three-event-explorer",
    name: "Explorer",
    description: "You completed 3 expeditions total.",
    requirement: "Complete 3 expeditions",
    emoji: "🧭",
  },
  {
    id: "junior-scientist",
    name: "Junior Scientist",
    description: "You completed expeditions in 3 different events.",
    requirement: "Complete an expedition in 3 different events",
    emoji: "🧪",
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
    name: "Trailblazer",
    description: "You completed 10 expeditions total.",
    requirement: "Complete 10 expeditions",
    emoji: "📅",
  },
  {
    id: "water-watcher",
    name: "Water Quality Explorer",
    description: "You finished 5 Water Quality expeditions.",
    requirement: "Complete 5 Water Quality expeditions",
    emoji: "💧",
  },
  {
    id: "entomologist",
    name: "Entomology Explorer",
    description: "You finished 5 Entomology expeditions.",
    requirement: "Complete 5 Entomology expeditions",
    emoji: "🐛",
  },
  {
    id: "body-explorer",
    name: "Anatomy & Physiology Explorer",
    description: "You finished 5 Anatomy & Physiology expeditions.",
    requirement: "Complete 5 Anatomy & Physiology expeditions",
    emoji: "🫀",
  },
  {
    id: "ecosystem-explorer",
    name: "Ecology Explorer",
    description: "You finished 5 Ecology expeditions.",
    requirement: "Complete 5 Ecology expeditions",
    emoji: "🌱",
  },
  {
    id: "crime-scene-rookie",
    name: "Crime Busters Explorer",
    description: "You finished 5 Crime Busters expeditions.",
    requirement: "Complete 5 Crime Busters expeditions",
    emoji: "🔬",
  },
  {
    id: "codebusters-explorer",
    name: "Codebusters Explorer",
    description: "You finished 5 Codebusters expeditions.",
    requirement: "Complete 5 Codebusters expeditions",
    emoji: "🔐",
  },
  {
    id: "consistent-explorer",
    name: "On a Roll",
    description: "You practiced on 3 consecutive days.",
    requirement: "Practice on 3 consecutive days",
    emoji: "🔥",
  },
  {
    id: "dedicated-explorer",
    name: "Dedicated Explorer",
    description: "You reached a 30-day practice streak.",
    requirement: "Reach a 30-day streak",
    emoji: "🌟",
  },
  {
    id: "perfect-expedition",
    name: "Perfect Expedition",
    description: "You completed an expedition with every answer correct.",
    requirement: "Complete an expedition with every answer correct",
    emoji: "🏅",
  },
  {
    id: "science-starter",
    name: "Science Starter",
    description: "You answered 25 practice questions.",
    requirement: "Answer 25 practice questions",
    emoji: "🔭",
  },
];

export function getBadgeDefinitions(): BadgeDefinition[] {
  return BADGE_DEFINITIONS;
}

function completedEventCount(
  attempts: BadgeProgressAttempt[],
  questions: Question[],
): number {
  const byId = new Map(questions.map((question) => [question.id, question]));
  const sessions = new Map<string, Set<string>>();
  for (const attempt of attempts) {
    if (!attempt.sessionId) {
      continue;
    }
    const eventId = byId.get(attempt.questionId)?.eventId;
    if (!eventId) {
      continue;
    }
    const events = sessions.get(attempt.sessionId) ?? new Set<string>();
    events.add(eventId);
    sessions.set(attempt.sessionId, events);
  }

  const completedEvents = new Set<string>();
  for (const [sessionId, events] of sessions) {
    const count = attempts.filter(
      (attempt) => attempt.sessionId === sessionId,
    ).length;
    if (count >= PRACTICE_SET_SIZE) {
      events.forEach((eventId) => completedEvents.add(eventId));
    }
  }
  return completedEvents.size;
}

function hasPerfectExpedition(attempts: BadgeProgressAttempt[]): boolean {
  const sessions = new Map<string, BadgeProgressAttempt[]>();
  for (const attempt of attempts) {
    if (!attempt.sessionId) {
      continue;
    }
    const rows = sessions.get(attempt.sessionId) ?? [];
    rows.push(attempt);
    sessions.set(attempt.sessionId, rows);
  }
  return [...sessions.values()].some(
    (rows) =>
      rows.length >= PRACTICE_SET_SIZE &&
      rows.every((attempt) => attempt.isCorrect),
  );
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

export type BadgeProgressNoun =
  | "question"
  | "expedition"
  | "event"
  | "topic"
  | "day";

export type BadgeProgress = {
  id: BadgeId;
  current: number;
  required: number;
  noun: BadgeProgressNoun;
};

function cappedProgress(
  id: BadgeId,
  current: number,
  required: number,
  noun: BadgeProgressNoun,
): BadgeProgress {
  const safeRequired = Math.max(1, required);
  const safeCurrent = Math.max(0, Math.min(current, safeRequired));
  return { id, current: safeCurrent, required: safeRequired, noun };
}

function pluralNoun(count: number, noun: BadgeProgressNoun): string {
  const labels: Record<BadgeProgressNoun, [string, string]> = {
    question: ["question", "questions"],
    expedition: ["expedition", "expeditions"],
    event: ["event", "events"],
    topic: ["topic", "topics"],
    day: ["day", "days"],
  };
  const [one, many] = labels[noun];
  return count === 1 ? one : many;
}

/**
 * Student-facing progress line from existing `getBadgeProgress()` values.
 * Does not recalculate progress.
 */
export function formatBadgeProgress(row: BadgeProgress): string {
  const amount = `${row.current} / ${row.required} ${pluralNoun(row.required, row.noun)}`;
  if (row.noun === "question") {
    return `${amount} answered`;
  }
  if (row.noun === "event") {
    return `${amount} explored`;
  }
  return amount;
}

/**
 * Display progress toward each badge. Thresholds match `getEarnedBadgeIds`.
 * Displayed current is capped at the requirement.
 */
export function getBadgeProgress(input: BadgeInput): BadgeProgress[] {
  const { attempts, questions } = input;
  const streakDays = Math.max(0, Math.floor(input.streakDays ?? 0));
  const finishedSets = completedSessionCount(attempts);
  const completedEvents = completedEventCount(attempts, questions);
  const tamedTopic = tamedATrickyTopic(attempts, questions) ? 1 : 0;

  const progress: BadgeProgress[] = [
    cappedProgress("first-try", attempts.length, 1, "question"),
    cappedProgress("first-discovery", finishedSets, 1, "expedition"),
    cappedProgress("three-event-explorer", finishedSets, 3, "expedition"),
    cappedProgress("junior-scientist", completedEvents, 3, "event"),
    cappedProgress("tricky-topic-tamer", tamedTopic, 1, "topic"),
    cappedProgress("practice-regular", finishedSets, 10, "expedition"),
  ];

  for (const spec of EVENT_SET_BADGES) {
    progress.push(
      cappedProgress(
        spec.id,
        completedSessionCountForEvent(spec.eventId, attempts, questions),
        spec.sets,
        "expedition",
      ),
    );
  }

  progress.push(
    cappedProgress("consistent-explorer", streakDays, 3, "day"),
    cappedProgress("dedicated-explorer", streakDays, 30, "day"),
    cappedProgress(
      "perfect-expedition",
      hasPerfectExpedition(attempts) ? 1 : 0,
      1,
      "expedition",
    ),
    cappedProgress("science-starter", attempts.length, 25, "question"),
  );

  return progress;
}

export function getEarnedBadgeIds(input: BadgeInput): BadgeId[] {
  const { attempts, questions } = input;
  const streakDays = Math.max(0, Math.floor(input.streakDays ?? 0));
  const earned: BadgeId[] = [];
  const finishedSets = completedSessionCount(attempts);
  const completedEvents = completedEventCount(attempts, questions);

  if (attempts.length >= 1) {
    earned.push("first-try");
  }
  if (finishedSets >= 1) {
    earned.push("first-discovery");
  }
  if (finishedSets >= 3) {
    earned.push("three-event-explorer");
  }
  if (completedEvents >= 3) {
    earned.push("junior-scientist");
  }
  if (tamedATrickyTopic(attempts, questions)) {
    earned.push("tricky-topic-tamer");
  }
  if (finishedSets >= 10) {
    earned.push("practice-regular");
  }
  for (const spec of EVENT_SET_BADGES) {
    if (
      completedSessionCountForEvent(spec.eventId, attempts, questions) >=
      spec.sets
    ) {
      earned.push(spec.id);
    }
  }
  if (streakDays >= 3) {
    earned.push("consistent-explorer");
  }
  if (streakDays >= 30) {
    earned.push("dedicated-explorer");
  }
  if (hasPerfectExpedition(attempts)) {
    earned.push("perfect-expedition");
  }
  if (attempts.length >= 25) {
    earned.push("science-starter");
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
