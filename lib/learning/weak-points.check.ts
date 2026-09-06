/**
 * Work on Weak Points checks.
 * Run: npx tsx lib/learning/weak-points.check.ts
 */
import {
  MOCK_ASTRONOMY_QUESTIONS as bank,
} from "@/lib/mock/astronomy";
import {
  PRACTICE_SET_SIZE,
  eligibleWeakQuestions,
  hasWeakTopics,
  parsePracticeMode,
  selectNextQuestion,
  targetDifficulty,
  toLearningAttempts,
  weakPracticeSetSize,
  type LearningAttempt,
  type PracticeMode,
} from "@/lib/learning/adaptive";
import type { Question } from "@/lib/types";

function attempt(
  questionId: string,
  isCorrect: boolean,
  hintUsed = false,
): LearningAttempt {
  const question = bank.find((item) => item.id === questionId);
  if (!question) {
    throw new Error(`Missing question ${questionId}`);
  }
  return {
    questionId: question.id,
    topicId: question.topicId,
    difficulty: question.difficulty,
    isCorrect,
    hintUsed,
  };
}

function next(
  history: LearningAttempt[],
  asked: string[],
  sessionTopics: string[],
  mode: PracticeMode,
): Question {
  const question = selectNextQuestion({
    bank,
    history,
    askedQuestionIds: asked,
    sessionTopicSequence: sessionTopics,
    lastWasRevisitEvidence: false,
    mode,
  });
  if (!question) {
    throw new Error("Expected a next question");
  }
  return question;
}

function playSet(
  startingHistory: LearningAttempt[],
  mode: PracticeMode,
  limit = PRACTICE_SET_SIZE,
): Question[] {
  const questions: Question[] = [];
  let history = [...startingHistory];
  const asked: string[] = [];
  const sessionTopics: string[] = [];

  for (let index = 0; index < limit; index += 1) {
    const question = selectNextQuestion({
      bank,
      history,
      askedQuestionIds: asked,
      sessionTopicSequence: sessionTopics,
      lastWasRevisitEvidence: false,
      mode,
    });
    if (!question) {
      break;
    }
    questions.push(question);
    asked.push(question.id);
    sessionTopics.push(question.topicId);
    history = [...history, attempt(question.id, true)];
  }

  return questions;
}

const failures: string[] = [];

function check(name: string, ok: boolean) {
  if (!ok) {
    failures.push(name);
  }
}

check("mode=weak is parsed", parsePracticeMode("weak") === "weak");
check("other query values are normal practice", parsePracticeMode("nope") === "normal");

check(
  "a new student has no tricky topics",
  !hasWeakTopics([]) &&
    selectNextQuestion({
      bank,
      history: [],
      askedQuestionIds: [],
      sessionTopicSequence: [],
      lastWasRevisitEvidence: false,
      mode: "weak",
    }) === null,
);
check("empty weak pool has session size 0", weakPracticeSetSize(0) === 0);
check("four eligible tricky items make a 4-question set", weakPracticeSetSize(4) === 4);
check("ten or more eligible items stay at 10", weakPracticeSetSize(12) === PRACTICE_SET_SIZE);

const moonWeak: LearningAttempt[] = [
  attempt("astro-q3", false),
  attempt("astro-q20", false),
  attempt("astro-q1", true),
  attempt("astro-q5", true),
  attempt("astro-q8", true),
];
const moonFirst = next(moonWeak, [], [], "weak");
check(
  "one weak topic is prioritized",
  moonFirst.topicId === "the-moon",
);
check(
  "the exact historical moon question is not reused first",
  moonFirst.id !== "astro-q3" && moonFirst.id !== "astro-q20",
);

const moonAndSunWeak: LearningAttempt[] = [
  attempt("astro-q3", false),
  attempt("astro-q20", false),
  attempt("astro-q1", false),
  attempt("astro-q10", true, true),
  attempt("astro-q5", true),
  attempt("astro-q8", true),
];
const mixedSet = playSet(moonAndSunWeak, "weak");
const mixedTopics = new Set(mixedSet.map((question) => question.topicId));
check(
  "multiple weak topics can both appear",
  mixedTopics.has("the-moon") && mixedTopics.has("sun-and-stars"),
);
check(
  "weak mode does not pull unrelated topics",
  [...mixedTopics].every(
    (topicId) => topicId === "the-moon" || topicId === "sun-and-stars",
  ),
);

const weakSet = playSet(moonWeak, "weak");
const weakIds = weakSet.map((question) => question.id);
check(
  "weak-point session contains 10 questions when the weak pool is large enough",
  weakSet.length === PRACTICE_SET_SIZE,
);
check(
  "a large weak pool stays on the weak topic",
  weakSet.every((question) => question.topicId === "the-moon"),
);
const moonOnly = bank.filter((question) => question.topicId === "the-moon");
const shortEligible = eligibleWeakQuestions(moonOnly.slice(0, 4), moonWeak);
check(
  "eligible weak questions come only from weak topics",
  shortEligible.length === 4 &&
    shortEligible.every((question) => question.topicId === "the-moon"),
);
const shortAsked: string[] = [];
const shortTopics: string[] = [];
const shortSet: Question[] = [];
let shortHistory = [...moonWeak];
for (let index = 0; index < PRACTICE_SET_SIZE; index += 1) {
  const question = selectNextQuestion({
    bank: moonOnly.slice(0, 4),
    history: shortHistory,
    askedQuestionIds: shortAsked,
    sessionTopicSequence: shortTopics,
    lastWasRevisitEvidence: false,
    mode: "weak",
  });
  if (!question) {
    break;
  }
  shortSet.push(question);
  shortAsked.push(question.id);
  shortTopics.push(question.topicId);
  shortHistory = [...shortHistory, attempt(question.id, true)];
}
check(
  "fewer than 10 eligible tricky questions ends the set early",
  shortSet.length === 4 && new Set(shortSet.map((question) => question.id)).size === 4,
);
check(
  "weak-point session IDs are unique",
  new Set(weakIds).size === PRACTICE_SET_SIZE,
);
check(
  "a weak topic produces different questions than the historical items",
  weakSet.some((question) => question.topicId === "the-moon") &&
    !weakIds.includes("astro-q3"),
);

const strongMoonSet = playSet(
  [attempt("astro-q3", true), attempt("astro-q5", true), attempt("astro-q8", true)],
  "normal",
);
const weakMoonSet = playSet(moonWeak, "weak");
check(
  "normal practice still runs a 10-question unique set",
  strongMoonSet.length === PRACTICE_SET_SIZE &&
    new Set(strongMoonSet.map((question) => question.id)).size ===
      PRACTICE_SET_SIZE,
);
check(
  "normal and weak modes can choose different openers from the same bank",
  strongMoonSet[0].id !== weakMoonSet[0].id ||
    strongMoonSet[0].topicId !== "the-moon" ||
    weakMoonSet[0].topicId === "the-moon",
);

const hintHistory = toLearningAttempts(
  [{ questionId: "astro-q3", isCorrect: true, hintUsed: true }],
  bank,
);
check(
  "hint-correct history without a miss is not a weak-point set",
  hintHistory[0]?.hintUsed === true && !hasWeakTopics(hintHistory),
);

const persistedWrong = toLearningAttempts(
  [{ questionId: "astro-q3", isCorrect: false, hintUsed: false }],
  bank,
);
const afterPersisted = next(persistedWrong, [], [], "weak");
check(
  "cross-session saved misses influence Work on Weak Points",
  afterPersisted.topicId === "the-moon" && afterPersisted.id !== "astro-q3",
);

check(
  "existing difficulty behavior remains intact",
  targetDifficulty([
    attempt("astro-q1", true),
    attempt("astro-q3", true),
    attempt("astro-q5", true),
  ]) === 2,
);

check(
  "three later corrects on the same topic clear it for a new weak set",
  (() => {
    const cleared: LearningAttempt[] = [
      attempt("astro-q3", false),
      attempt("astro-q4", true),
      attempt("astro-q20", true),
      attempt("astro-q21", true),
    ];
    return (
      !hasWeakTopics(cleared) &&
      selectNextQuestion({
        bank,
        history: cleared,
        askedQuestionIds: [],
        sessionTopicSequence: [],
        lastWasRevisitEvidence: false,
        mode: "weak",
      }) === null
    );
  })(),
);

check(
  "quiz-shaped askedIds still continue a tricky set after the first answer",
  (() => {
    const prior = [attempt("astro-q3", false)];
    const first = next(prior, [], [], "weak");
    const afterFirst = [...prior, attempt(first.id, true)];
    const second = selectNextQuestion({
      bank,
      history: afterFirst,
      askedQuestionIds: [first.id],
      sessionTopicSequence: [first.topicId],
      lastWasRevisitEvidence: false,
      mode: "weak",
    });
    return second != null && second.topicId === "the-moon";
  })(),
);

check(
  "an unanswered askedId does not freeze-away the weak topic",
  (() => {
    const prior = [attempt("astro-q3", false)];
    const first = next(prior, [], [], "weak");
    const extra = moonOnly.find(
      (question) => question.id !== first.id && question.id !== "astro-q3",
    );
    if (!extra) {
      return false;
    }
    const afterFirst = [...prior, attempt(first.id, true)];
    const second = selectNextQuestion({
      bank,
      history: afterFirst,
      askedQuestionIds: [first.id, extra.id],
      sessionTopicSequence: [first.topicId],
      lastWasRevisitEvidence: false,
      mode: "weak",
    });
    return (
      second != null &&
      second.topicId === "the-moon" &&
      second.id !== extra.id
    );
  })(),
);

if (failures.length > 0) {
  throw new Error(`Weak-point checks failed:\n- ${failures.join("\n- ")}`);
}
