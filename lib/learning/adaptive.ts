import type { DifficultyLevel, Question } from "@/lib/types";

/**
 * Adaptive Practice v1 — topic-first spaced revisit.
 *
 * History from Supabase (plus this session) is scored per TOPIC, not as a
 * single mastery percent. Then a question is chosen from the chosen topic.
 *
 * Signals:
 * - Recent wrong → strong revisit. Newer attempts weigh more than older ones.
 * - Hint used → moderate revisit (including persisted hint_used from Supabase).
 * - Independent correct → reduces priority, but one success does not wipe a
 *   recent mistake.
 * - Exact recently-seen question IDs are avoided when another item exists.
 * - Consecutive questions prefer a different topic (rotation / spacing).
 */

export const PRACTICE_SET_SIZE = 10;
export const RECENT_ATTEMPT_WINDOW = 12;
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

/**
 * Recency-weighted topic score. Position 1 is the oldest attempt on this
 * topic in the window; newer attempts count more.
 *
 * Wrong: +3 * recency. Hint: +2 * recency. Independent correct: -1 * recency.
 */
export function topicRevisitScore(
  history: LearningAttempt[],
  topicId: string,
): number {
  const window = history.slice(-RECENT_ATTEMPT_WINDOW);
  const topicAttempts = window.filter((attempt) => attempt.topicId === topicId);
  if (topicAttempts.length === 0) {
    return 0;
  }

  let score = 0;
  for (let index = 0; index < topicAttempts.length; index += 1) {
    const recency = index + 1;
    const attempt = topicAttempts[index];
    if (!attempt.isCorrect) {
      score += 3 * recency;
    } else if (attempt.hintUsed) {
      score += 2 * recency;
    } else {
      score -= 1 * recency;
    }
  }

  return score;
}

export function topicsNeedingRevisit(history: LearningAttempt[]): string[] {
  const topicIds = [...new Set(history.map((attempt) => attempt.topicId))];
  return topicIds
    .filter((topicId) => topicRevisitScore(history, topicId) > 0)
    .sort((a, b) => {
      const scoreDiff =
        topicRevisitScore(history, b) - topicRevisitScore(history, a);
      return scoreDiff !== 0 ? scoreDiff : a.localeCompare(b);
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
  if (topicRevisitScore(history, topicId) <= 0) {
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
