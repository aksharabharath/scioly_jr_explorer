/**
 * Derived expedition stats from persisted practice_attempts.
 * Does not award XP. Session XP in the journal uses the same published
 * attempt/session rules as lib/gamification.ts.
 */
import {
  calculateAttemptXp,
  calculateSessionCompletionXp,
  GAMIFICATION_SESSION_SIZE,
  localCalendarDate,
} from "@/lib/gamification";
import { PRACTICE_SET_SIZE } from "@/lib/learning/adaptive";
import { isLivePracticeQuestion } from "@/lib/mock/curriculum";
import type { Question } from "@/lib/types";

export type ExpeditionAttempt = {
  questionId: string;
  isCorrect: boolean;
  hintUsed: boolean;
  sessionId: string | null;
  answeredAt: string | null;
};

export type ExpeditionLogEntry = {
  sessionId: string;
  eventId: string;
  eventName: string;
  questionsAnswered: number;
  correctAnswers: number;
  derivedXp: number;
  endedAt: string | null;
};

export const PLAYABLE_MAP_EVENT_IDS = [
  "entomology",
  "anatomy-physiology",
  "water-quality",
  "ecology",
  "crime-busters",
] as const;

export type PlayableMapEventId = (typeof PLAYABLE_MAP_EVENT_IDS)[number];

export function completedSessionCount(attempts: ExpeditionAttempt[]): number {
  return sessionCounts(attempts).filter((count) => count >= PRACTICE_SET_SIZE)
    .length;
}

export function completedSessionCountForEvent(
  eventId: string,
  attempts: ExpeditionAttempt[],
  questions: Question[],
): number {
  const byId = new Map(questions.map((question) => [question.id, question]));
  const counts = new Map<string, number>();
  for (const attempt of attempts) {
    if (!attempt.sessionId) {
      continue;
    }
    const question = byId.get(attempt.questionId);
    if (question?.eventId !== eventId) {
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

export function uniqueLiveQuestionsPracticed(
  attempts: ExpeditionAttempt[],
  questions: Question[],
): number {
  const byId = new Map(questions.map((question) => [question.id, question]));
  const ids = new Set<string>();
  for (const attempt of attempts) {
    const question = byId.get(attempt.questionId);
    if (question && isLivePracticeQuestion(question)) {
      ids.add(attempt.questionId);
    }
  }
  return ids.size;
}

export function uniqueQuestionsPracticed(
  eventId: string,
  attempts: ExpeditionAttempt[],
  questions: Question[],
): number {
  const byId = new Map(questions.map((question) => [question.id, question]));
  const ids = new Set<string>();
  for (const attempt of attempts) {
    const question = byId.get(attempt.questionId);
    if (
      question?.eventId === eventId &&
      isLivePracticeQuestion(question)
    ) {
      ids.add(attempt.questionId);
    }
  }
  return ids.size;
}

export function questionsPracticedOnLocalDate(
  attempts: ExpeditionAttempt[],
  practiceDate: string,
): number {
  let count = 0;
  for (const attempt of attempts) {
    if (localDateFromAnsweredAt(attempt.answeredAt) === practiceDate) {
      count += 1;
    }
  }
  return count;
}

export function hasCompletedExpeditionOnLocalDate(
  attempts: ExpeditionAttempt[],
  practiceDate: string,
): boolean {
  const completeIds = completeSessionIdSet(attempts);
  if (completeIds.size === 0) {
    return false;
  }
  for (const attempt of attempts) {
    if (!attempt.sessionId || !completeIds.has(attempt.sessionId)) {
      continue;
    }
    const local = localDateFromAnsweredAt(attempt.answeredAt);
    if (local === practiceDate) {
      return true;
    }
  }
  return false;
}

export function expeditionLogEntries(
  attempts: ExpeditionAttempt[],
  questions: Question[],
  eventNameById: Record<string, string>,
  limit = 8,
): ExpeditionLogEntry[] {
  const byId = new Map(questions.map((question) => [question.id, question]));
  const grouped = new Map<string, ExpeditionAttempt[]>();

  for (const attempt of attempts) {
    if (!attempt.sessionId) {
      continue;
    }
    const list = grouped.get(attempt.sessionId) ?? [];
    list.push(attempt);
    grouped.set(attempt.sessionId, list);
  }

  const entries: ExpeditionLogEntry[] = [];
  for (const [sessionId, rows] of grouped) {
    if (rows.length < PRACTICE_SET_SIZE) {
      continue;
    }
    const eventId = majorityEventId(rows, byId);
    if (!eventId) {
      continue;
    }
    let correctAnswers = 0;
    let derivedXp = 0;
    let endedAt: string | null = null;
    for (const row of rows) {
      if (row.isCorrect) {
        correctAnswers += 1;
      }
      derivedXp += calculateAttemptXp({
        isCorrect: row.isCorrect,
        hintUsed: row.hintUsed,
      });
      if (
        row.answeredAt &&
        (endedAt === null || row.answeredAt > endedAt)
      ) {
        endedAt = row.answeredAt;
      }
    }
    derivedXp += calculateSessionCompletionXp(
      rows.length,
      GAMIFICATION_SESSION_SIZE,
    );
    entries.push({
      sessionId,
      eventId,
      eventName: eventNameById[eventId] ?? eventId,
      questionsAnswered: rows.length,
      correctAnswers,
      derivedXp,
      endedAt,
    });
  }

  entries.sort((a, b) => {
    if (a.endedAt && b.endedAt) {
      return a.endedAt < b.endedAt ? 1 : a.endedAt > b.endedAt ? -1 : 0;
    }
    if (a.endedAt) {
      return -1;
    }
    if (b.endedAt) {
      return 1;
    }
    return 0;
  });

  return entries.slice(0, limit);
}

function sessionCounts(attempts: ExpeditionAttempt[]): number[] {
  const counts = new Map<string, number>();
  for (const attempt of attempts) {
    if (!attempt.sessionId) {
      continue;
    }
    counts.set(attempt.sessionId, (counts.get(attempt.sessionId) ?? 0) + 1);
  }
  return [...counts.values()];
}

function completeSessionIdSet(attempts: ExpeditionAttempt[]): Set<string> {
  const counts = new Map<string, number>();
  for (const attempt of attempts) {
    if (!attempt.sessionId) {
      continue;
    }
    counts.set(attempt.sessionId, (counts.get(attempt.sessionId) ?? 0) + 1);
  }
  const ids = new Set<string>();
  for (const [sessionId, count] of counts) {
    if (count >= PRACTICE_SET_SIZE) {
      ids.add(sessionId);
    }
  }
  return ids;
}

function majorityEventId(
  rows: ExpeditionAttempt[],
  byId: Map<string, Question>,
): string | null {
  const tallies = new Map<string, number>();
  for (const row of rows) {
    const eventId = byId.get(row.questionId)?.eventId;
    if (!eventId) {
      continue;
    }
    tallies.set(eventId, (tallies.get(eventId) ?? 0) + 1);
  }
  let best: string | null = null;
  let bestCount = 0;
  for (const [eventId, count] of tallies) {
    if (count > bestCount) {
      best = eventId;
      bestCount = count;
    }
  }
  return best;
}

function localDateFromAnsweredAt(answeredAt: string | null): string | null {
  if (!answeredAt) {
    return null;
  }
  const parsed = new Date(answeredAt);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }
  return localCalendarDate(parsed);
}
