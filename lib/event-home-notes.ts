/**
 * Event-home presentation helpers.
 * Does not change adaptive thresholds, weak-topic membership, or persistence.
 */
import {
  topicsNeedingRevisit,
  type LearningAttempt,
} from "@/lib/learning/adaptive";

export const EVENT_HOME_TRICKY_TOPIC_LIMIT = 3;
export const EVENT_HOME_STRONGEST_TOPIC_LIMIT = 2;
export const STRONGEST_TOPIC_MIN_ATTEMPTS = 3;
export const MEANINGFUL_STREAK_DAYS = 3;
export const MEANINGFUL_EXPEDITION_MILESTONE = 3;
export const MEANINGFUL_QUESTIONS_ANSWERED = 10;

export function recentMissCountForTopic(
  history: LearningAttempt[],
  topicId: string,
): number {
  let misses = 0;
  for (const attempt of history) {
    if (attempt.topicId === topicId && !attempt.isCorrect) {
      misses += 1;
    }
  }
  return misses;
}

/**
 * Display ranking for currently tricky topics.
 * Membership stays `topicsNeedingRevisit`. Order is miss count, then the
 * adaptive recency order as a tiebreaker.
 */
export function trickyTopicsForEventHome(
  history: LearningAttempt[],
): string[] {
  const adaptiveOrder = topicsNeedingRevisit(history);
  const index = new Map(adaptiveOrder.map((topicId, i) => [topicId, i]));
  return [...adaptiveOrder]
    .sort((a, b) => {
      const missDiff =
        recentMissCountForTopic(history, b) -
        recentMissCountForTopic(history, a);
      if (missDiff !== 0) {
        return missDiff;
      }
      return (index.get(a) ?? 0) - (index.get(b) ?? 0);
    })
    .slice(0, EVENT_HOME_TRICKY_TOPIC_LIMIT);
}

function topicAttemptStats(
  history: LearningAttempt[],
  topicId: string,
): { attempts: number; correct: number; lastIndex: number } {
  let attempts = 0;
  let correct = 0;
  let lastIndex = -1;
  history.forEach((attempt, index) => {
    if (attempt.topicId !== topicId) {
      return;
    }
    attempts += 1;
    lastIndex = index;
    if (attempt.isCorrect) {
      correct += 1;
    }
  });
  return { attempts, correct, lastIndex };
}

/**
 * Relative strongest topics for the event home page.
 * Requires 3+ recent attempts. Ranked by accuracy, then correct count,
 * then recency. Currently tricky topics are still eligible.
 */
export function strongestTopicsForEventHome(
  history: LearningAttempt[],
): string[] {
  const topicIds = [...new Set(history.map((attempt) => attempt.topicId))];
  return topicIds
    .map((topicId) => ({ topicId, ...topicAttemptStats(history, topicId) }))
    .filter((row) => row.attempts >= STRONGEST_TOPIC_MIN_ATTEMPTS)
    .sort((a, b) => {
      const accuracyDiff = b.correct / b.attempts - a.correct / a.attempts;
      if (accuracyDiff !== 0) {
        return accuracyDiff;
      }
      if (b.correct !== a.correct) {
        return b.correct - a.correct;
      }
      return b.lastIndex - a.lastIndex;
    })
    .slice(0, EVENT_HOME_STRONGEST_TOPIC_LIMIT)
    .map((row) => row.topicId);
}

export function strongestTopicForEventHome(
  history: LearningAttempt[],
): string | null {
  return strongestTopicsForEventHome(history)[0] ?? null;
}

export type EventHomeCallout = {
  title: string;
  body: string;
};

export function eventHomeCallout(input: {
  eventName: string;
  streakDays: number;
  expeditionsCompleted: number;
  questionsAnswered: number;
}): EventHomeCallout {
  const { eventName, streakDays, expeditionsCompleted, questionsAnswered } =
    input;

  if (streakDays >= MEANINGFUL_STREAK_DAYS) {
    return {
      title: `${streakDays}-day expedition streak`,
      body: `Keep exploring ${eventName} tomorrow.`,
    };
  }
  if (expeditionsCompleted >= MEANINGFUL_EXPEDITION_MILESTONE) {
    return {
      title: "Field site explorer",
      body: `You've completed ${expeditionsCompleted} ${eventName} expeditions.`,
    };
  }
  if (questionsAnswered >= MEANINGFUL_QUESTIONS_ANSWERED) {
    return {
      title: "Nice work",
      body: `You've answered ${questionsAnswered} ${eventName} questions.`,
    };
  }
  return {
    title: "Ready to explore?",
    body: "Your first expedition will help fill your field notebook.",
  };
}
