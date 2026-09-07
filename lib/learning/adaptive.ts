import type { DifficultyLevel, Question } from "@/lib/types";

/**
 * Adaptive Practice v1 — topic-first spaced revisit.
 *
 * History from Supabase (plus this session) is scored per TOPIC, not as a
 * single mastery percent. Then a question is chosen from the chosen topic.
 *
 * Weak / strong (Tricky Topics and “worth revisiting”):
 * - A miss marks that topic weak.
 * - 3 later correct answers on that topic (hinted or not) mark it strong.
 * - A new miss resets the recovery count.
 * - Hint-correct with no miss does not mark the topic weak.
 * - Membership uses the last 40 attempts (same cap as practice selection).
 *
 * Selection still spaces weak topics (~2 intervening questions), prefers a
 * different topic than the last item, and avoids recently seen question IDs.
 */

export const PRACTICE_SET_SIZE = 10;
/** Matches getMyRecentPracticeAttempts. */
export const WEAK_TOPIC_ATTEMPT_WINDOW = 40;
/** Correct answers after the latest miss before a topic is strong again. */
export const CORRECTS_TO_CLEAR_WEAK_TOPIC = 3;
export const INTERVENING_QUESTIONS_BEFORE_REVISIT = 2;

export type PracticeMode = "normal" | "weak";

export type LearningAttempt = {
  questionId: string;
  topicId: string;
  difficulty: DifficultyLevel;
  isCorrect: boolean;
  hintUsed: boolean;
};

export type SelectNextQuestionInput = {
  bank: Question[];
  history: LearningAttempt[];
  askedQuestionIds: string[];
  previouslyAnsweredQuestionIds?: string[];
  sessionTopicSequence: string[];
  lastWasRevisitEvidence: boolean;
  mode?: PracticeMode;
  eventId?: string;
  expeditionNumber?: number;
};

export function parsePracticeMode(
  value: string | string[] | undefined,
): PracticeMode {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "weak" ? "weak" : "normal";
}

/** Optional topic id for Tricky Topics practice (`?mode=weak&topic=`). */
export function parsePracticeTopicId(
  value: string | string[] | undefined,
): string | null {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(raw)) {
    return null;
  }
  return raw;
}

/** Student-facing learning labels from existing weak-topic recovery counts. */
export type TopicLearningState = "needs-practice" | "improving" | "strong";

export function hasWeakTopics(history: LearningAttempt[]): boolean {
  return topicsNeedingRevisit(history).length > 0;
}

/** Live (or other) bank items whose topic is currently weak. */
export function eligibleWeakQuestions(
  bank: Question[],
  history: LearningAttempt[],
): Question[] {
  const weakTopicIds = new Set(topicsNeedingRevisit(history));
  if (weakTopicIds.size === 0) {
    return [];
  }
  return bank.filter((question) => weakTopicIds.has(question.topicId));
}

/** Tricky Topics expeditions use at most 10 items, or fewer if the weak pool is smaller. */
export function weakPracticeSetSize(eligibleCount: number): number {
  if (eligibleCount <= 0) {
    return 0;
  }
  return Math.min(PRACTICE_SET_SIZE, eligibleCount);
}

export function attemptFromQuestion(
  question: Question,
  isCorrect: boolean,
  hintUsed: boolean,
): LearningAttempt {
  return {
    questionId: question.id,
    topicId: question.topicId,
    difficulty: question.difficulty,
    isCorrect,
    hintUsed,
  };
}

export function toLearningAttempts(
  stored: Array<{ questionId: string; isCorrect: boolean; hintUsed?: boolean }>,
  bank: Question[],
): LearningAttempt[] {
  const byId = new Map(bank.map((question) => [question.id, question]));
  const attempts: LearningAttempt[] = [];

  for (const row of stored) {
    const question = byId.get(row.questionId);
    if (!question) {
      continue;
    }
    attempts.push({
      questionId: question.id,
      topicId: question.topicId,
      difficulty: question.difficulty,
      isCorrect: row.isCorrect,
      hintUsed: row.hintUsed === true,
    });
  }

  return attempts;
}

export function isTopicWeak(
  history: LearningAttempt[],
  topicId: string,
): boolean {
  return remainingCorrectsToClear(history, topicId) > 0;
}

/**
 * How many more correct answers on this topic are needed after the latest
 * miss. 0 means the topic is strong (no unrecovered miss in the window).
 */
export function topicRevisitScore(
  history: LearningAttempt[],
  topicId: string,
): number {
  return remainingCorrectsToClear(history, topicId);
}

export function topicsNeedingRevisit(history: LearningAttempt[]): string[] {
  const window = windowedHistory(history);
  const topicIds = [...new Set(window.map((attempt) => attempt.topicId))];
  return topicIds
    .filter((topicId) => isTopicWeak(window, topicId))
    .sort((a, b) => {
      const recencyDiff = lastMissIndex(window, b) - lastMissIndex(window, a);
      return recencyDiff !== 0 ? recencyDiff : a.localeCompare(b);
    });
}

/**
 * Maps existing revisit scores onto D-002 labels. Does not add new thresholds.
 * - Needs Practice: unrecovered miss (no later corrects yet)
 * - Improving: unrecovered miss with some later corrects
 * - Strong: miss in the window that was cleared (3 later corrects)
 * Returns null when there is not enough evidence (e.g. never missed).
 */
export function topicLearningState(
  history: LearningAttempt[],
  topicId: string,
): TopicLearningState | null {
  const remaining = remainingCorrectsToClear(history, topicId);
  if (remaining >= CORRECTS_TO_CLEAR_WEAK_TOPIC) {
    return "needs-practice";
  }
  if (remaining > 0) {
    return "improving";
  }
  const window = windowedHistory(history);
  if (lastMissIndex(window, topicId) === -1) {
    return null;
  }
  return "strong";
}

export function topicsGroupedByLearningState(history: LearningAttempt[]): {
  needsPractice: string[];
  improving: string[];
  strong: string[];
} {
  const window = windowedHistory(history);
  const topicIds = [...new Set(window.map((attempt) => attempt.topicId))];
  const needsPractice: string[] = [];
  const improving: string[] = [];
  const strong: string[] = [];

  for (const topicId of topicIds) {
    const state = topicLearningState(history, topicId);
    if (state === "needs-practice") {
      needsPractice.push(topicId);
    } else if (state === "improving") {
      improving.push(topicId);
    } else if (state === "strong") {
      strong.push(topicId);
    }
  }

  const recency = (topicId: string) => lastMissIndex(window, topicId);
  const byRecency = (a: string, b: string) => {
    const recencyDiff = recency(b) - recency(a);
    return recencyDiff !== 0 ? recencyDiff : a.localeCompare(b);
  };

  return {
    needsPractice: needsPractice.sort(byRecency),
    improving: improving.sort(byRecency),
    strong: strong.sort(byRecency),
  };
}

export function targetDifficulty(history: LearningAttempt[]): DifficultyLevel {
  if (history.length === 0) {
    return 1;
  }

  const current = history[history.length - 1].difficulty;
  const recent = history.slice(-4);
  const trailingIndependentCorrect = trailingCount(
    recent,
    (attempt) => attempt.isCorrect && !attempt.hintUsed,
  );
  const trailingWrong = trailingCount(recent, (attempt) => !attempt.isCorrect);

  if (trailingWrong >= 2) {
    return clampDifficulty(current - 1);
  }
  if (trailingIndependentCorrect >= 3) {
    return clampDifficulty(current + 1);
  }
  return current;
}

export function selectNextQuestion(
  input: SelectNextQuestionInput,
): Question | null {
  // lastWasRevisitEvidence is accepted from the UI; consecutive-topic
  // rotation and due-topic spacing are applied from history instead.
  void input.lastWasRevisitEvidence;

  const available = availableQuestions(input);
  if (available.length === 0) {
    return null;
  }

  const difficulty = targetDifficultyForSession(input);
  const boundedAvailable = available.filter(
    (question) => question.difficulty <= difficulty,
  );
  const boundedFallback = input.bank.filter(
    (question) =>
      !input.askedQuestionIds.includes(question.id) &&
      question.difficulty <= difficulty &&
      (input.mode !== "weak" ||
        topicsNeedingRevisit(
          historyBeforeThisSession(input.history, input.askedQuestionIds),
        ).includes(question.topicId)),
  );
  const progressionPool =
    boundedAvailable.length > 0
      ? boundedAvailable
      : boundedFallback.length > 0
        ? boundedFallback
        : difficulty === 3
          ? available
          : [];
  if (progressionPool.length === 0) {
    return null;
  }
  const lastTopicId = input.sessionTopicSequence.at(-1) ?? null;
  const rotated = rotateAwayFromLastTopic(progressionPool, lastTopicId);
  const pool = rotated.length > 0 ? rotated : progressionPool;
  const dueTopicId = pickDueTopic(
    input.history,
    pool,
    input.sessionTopicSequence,
  );

  const candidates = candidatesForPick(
    pool,
    dueTopicId,
    input.history,
    input.sessionTopicSequence,
  );
  const avoidQuestionIds = recentQuestionIds(
    input.history,
    input.askedQuestionIds,
  );

  return pickQuestion(
    candidates,
    difficulty,
    avoidQuestionIds,
    input.previouslyAnsweredQuestionIds ?? [],
  );
}

export function friendlyRevisitNote(history: LearningAttempt[]): string | null {
  if (topicsNeedingRevisit(history).length === 0) {
    return null;
  }
  return "Some topics are worth revisiting next time.";
}

function windowedHistory(history: LearningAttempt[]): LearningAttempt[] {
  return history.slice(-WEAK_TOPIC_ATTEMPT_WINDOW);
}

function lastMissIndex(
  history: LearningAttempt[],
  topicId: string,
): number {
  for (let index = history.length - 1; index >= 0; index -= 1) {
    if (
      history[index].topicId === topicId &&
      !history[index].isCorrect
    ) {
      return index;
    }
  }
  return -1;
}

function remainingCorrectsToClear(
  history: LearningAttempt[],
  topicId: string,
): number {
  const window = windowedHistory(history);
  const missIndex = lastMissIndex(window, topicId);
  if (missIndex === -1) {
    return 0;
  }
  let laterCorrect = 0;
  for (let index = missIndex + 1; index < window.length; index += 1) {
    const attempt = window[index];
    if (attempt.topicId === topicId && attempt.isCorrect) {
      laterCorrect += 1;
    }
  }
  return Math.max(0, CORRECTS_TO_CLEAR_WEAK_TOPIC - laterCorrect);
}

/**
 * Weak-topic membership is frozen from history before this session.
 * `askedQuestionIds` may include the current unanswered question (not yet
 * in `history`). Only trailing answers that are actually in history count
 * as this session, so an extra unanswered ID cannot wipe the freeze window.
 */
function historyBeforeThisSession(
  history: LearningAttempt[],
  askedQuestionIds: string[],
): LearningAttempt[] {
  if (askedQuestionIds.length === 0) {
    return history;
  }
  const asked = new Set(askedQuestionIds);
  let sessionAnswers = 0;
  for (let index = history.length - 1; index >= 0; index -= 1) {
    if (!asked.has(history[index].questionId)) {
      break;
    }
    sessionAnswers += 1;
  }
  if (sessionAnswers === 0) {
    return history;
  }
  return history.slice(0, history.length - sessionAnswers);
}

function availableQuestions(input: SelectNextQuestionInput): Question[] {
  const unused = input.bank.filter(
    (question) => !input.askedQuestionIds.includes(question.id),
  );
  if (unused.length === 0) {
    return [];
  }

  if ((input.mode ?? "normal") === "weak") {
    const weakTopicIds = topicsNeedingRevisit(
      historyBeforeThisSession(input.history, input.askedQuestionIds),
    );
    if (weakTopicIds.length === 0) {
      return [];
    }
    const weakUnused = unused.filter((question) =>
      weakTopicIds.includes(question.topicId),
    );
    const previouslyAnswered = new Set(
      input.previouslyAnsweredQuestionIds ?? [],
    );
    const unseenWeak = weakUnused.filter(
      (question) => !previouslyAnswered.has(question.id),
    );
    const crossSessionPool =
      unseenWeak.length > 0 ? unseenWeak : weakUnused;
    if (crossSessionPool.length === 0) {
      return [];
    }
    const lastTopicId = input.sessionTopicSequence.at(-1) ?? null;
    if (!lastTopicId) {
      return crossSessionPool;
    }
    const rotatedWeak = crossSessionPool.filter(
      (question) => question.topicId !== lastTopicId,
    );
    return rotatedWeak.length > 0 ? rotatedWeak : crossSessionPool;
  }

  const previouslyAnswered = new Set(
    input.previouslyAnsweredQuestionIds ?? [],
  );
  const unseen = unused.filter((question) => !previouslyAnswered.has(question.id));
  const crossSessionPool = unseen.length > 0 ? unseen : unused;
  return crossSessionPool;
}

function recentQuestionIds(
  history: LearningAttempt[],
  askedQuestionIds: string[],
): Set<string> {
  const ids = new Set(askedQuestionIds);
  for (const attempt of history.slice(-PRACTICE_SET_SIZE)) {
    ids.add(attempt.questionId);
  }
  return ids;
}

function rotateAwayFromLastTopic(
  available: Question[],
  lastTopicId: string | null,
): Question[] {
  if (!lastTopicId) {
    return available;
  }
  const otherTopics = available.filter(
    (question) => question.topicId !== lastTopicId,
  );
  return otherTopics.length > 0 ? otherTopics : available;
}

function candidatesForPick(
  pool: Question[],
  dueTopicId: string | null,
  history: LearningAttempt[],
  sessionTopicSequence: string[],
): Question[] {
  if (dueTopicId) {
    const due = pool.filter((question) => question.topicId === dueTopicId);
    if (due.length > 0) {
      return due;
    }
  }

  const unblocked = pool.filter(
    (question) =>
      !isWaitingToRevisit(
        question.topicId,
        history,
        sessionTopicSequence,
      ),
  );
  return unblocked.length > 0 ? unblocked : pool;
}

function isWaitingToRevisit(
  topicId: string,
  history: LearningAttempt[],
  sessionTopicSequence: string[],
): boolean {
  if (!isTopicWeak(history, topicId)) {
    return false;
  }
  return (
    interveningSinceTopic(sessionTopicSequence, topicId) <
    INTERVENING_QUESTIONS_BEFORE_REVISIT
  );
}

function pickDueTopic(
  history: LearningAttempt[],
  pool: Question[],
  sessionTopicSequence: string[],
): string | null {
  const poolTopicIds = new Set(pool.map((question) => question.topicId));
  const due = topicsNeedingRevisit(history).filter((topicId) => {
    if (!poolTopicIds.has(topicId)) {
      return false;
    }
    return (
      interveningSinceTopic(sessionTopicSequence, topicId) >=
      INTERVENING_QUESTIONS_BEFORE_REVISIT
    );
  });

  return due[0] ?? null;
}

function interveningSinceTopic(
  sessionTopicSequence: string[],
  topicId: string,
): number {
  const lastIndex = sessionTopicSequence.lastIndexOf(topicId);
  if (lastIndex === -1) {
    return INTERVENING_QUESTIONS_BEFORE_REVISIT;
  }
  return sessionTopicSequence.length - lastIndex - 1;
}

function pickQuestion(
  candidates: Question[],
  difficulty: DifficultyLevel,
  avoidQuestionIds: Set<string>,
  previouslyAnsweredQuestionIds: string[],
): Question {
  const preferred = candidates.filter(
    (question) => !avoidQuestionIds.has(question.id),
  );
  const pool = preferred.length > 0 ? preferred : candidates;

  const ranked = [...pool].sort((a, b) => {
    const difficultyDelta =
      Math.abs(a.difficulty - difficulty) - Math.abs(b.difficulty - difficulty);
    if (difficultyDelta !== 0) {
      return difficultyDelta;
    }
    const aLastSeen = previouslyAnsweredQuestionIds.lastIndexOf(a.id);
    const bLastSeen = previouslyAnsweredQuestionIds.lastIndexOf(b.id);
    if (aLastSeen !== bLastSeen) {
      return aLastSeen - bLastSeen;
    }
    return a.id.localeCompare(b.id);
  });

  return ranked[0];
}

export function targetDifficultyForSession(
  input: SelectNextQuestionInput,
): DifficultyLevel {
  const sessionHistory = input.history.slice(-input.askedQuestionIds.length);
  if (sessionHistory.length === 0) {
    return 1;
  }

  const adaptiveTarget = targetDifficulty(sessionHistory);
  const easySuccesses = trailingCount(
    sessionHistory,
    (attempt) => attempt.difficulty === 1 && attempt.isCorrect,
  );
  const mediumSuccesses = trailingCount(
    sessionHistory,
    (attempt) => attempt.difficulty === 2 && attempt.isCorrect,
  );
  const mediumFailures = trailingCount(
    sessionHistory,
    (attempt) => attempt.difficulty === 2 && !attempt.isCorrect,
  );
  const hasMediumAttempt = sessionHistory.some(
    (attempt) => attempt.difficulty === 2,
  );
  const easySuccessesNeeded =
    input.eventId === "anatomy-physiology" &&
    (input.expeditionNumber ?? 1) <= 2
      ? 6
      : 5;

  if (mediumFailures >= 2) {
    return 1;
  }
  if (mediumSuccesses >= 4) {
    return 3;
  }
  if (easySuccesses >= easySuccessesNeeded || hasMediumAttempt) {
    return Math.min(adaptiveTarget, 2) as DifficultyLevel;
  }
  return 1;
}

function trailingCount(
  attempts: LearningAttempt[],
  match: (attempt: LearningAttempt) => boolean,
): number {
  let count = 0;
  for (let index = attempts.length - 1; index >= 0; index -= 1) {
    if (!match(attempts[index])) {
      break;
    }
    count += 1;
  }
  return count;
}

function clampDifficulty(value: number): DifficultyLevel {
  if (value <= 1) {
    return 1;
  }
  if (value >= 3) {
    return 3;
  }
  return 2;
}
