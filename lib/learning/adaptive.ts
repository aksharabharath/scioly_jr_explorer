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
  sessionTopicSequence: string[];
  lastWasRevisitEvidence: boolean;
  mode?: PracticeMode;
};

export function parsePracticeMode(
  value: string | string[] | undefined,
): PracticeMode {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "weak" ? "weak" : "normal";
}

export function hasWeakTopics(history: LearningAttempt[]): boolean {
  return topicsNeedingRevisit(history).length > 0;
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

  const lastTopicId = input.sessionTopicSequence.at(-1) ?? null;
  const rotated = rotateAwayFromLastTopic(available, lastTopicId);
  const pool = rotated.length > 0 ? rotated : available;
  const difficulty = targetDifficulty(input.history);
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

  return pickQuestion(candidates, difficulty, avoidQuestionIds);
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

function availableQuestions(input: SelectNextQuestionInput): Question[] {
  const unused = input.bank.filter(
    (question) => !input.askedQuestionIds.includes(question.id),
  );
  if (unused.length === 0 || (input.mode ?? "normal") !== "weak") {
    return unused;
  }

  const weakTopicIds = topicsNeedingRevisit(input.history);
  if (weakTopicIds.length === 0) {
    return unused;
  }

  const unusedWeak = unused.filter((question) =>
    weakTopicIds.includes(question.topicId),
  );
  if (unusedWeak.length === 0) {
    return unused;
  }

  const lastTopicId = input.sessionTopicSequence.at(-1) ?? null;
  if (!lastTopicId) {
    return unusedWeak;
  }

  const rotatedWeak = unusedWeak.filter(
    (question) => question.topicId !== lastTopicId,
  );
  if (rotatedWeak.length > 0) {
    return rotatedWeak;
  }

  const mixed = unused.filter((question) => question.topicId !== lastTopicId);
  return mixed.length > 0 ? mixed : unusedWeak;
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
    return a.id.localeCompare(b.id);
  });

  return ranked[0];
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
