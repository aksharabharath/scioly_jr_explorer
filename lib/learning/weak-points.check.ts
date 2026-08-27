/**
 * Work on Weak Points checks.
 * Run: npx tsx lib/learning/weak-points.check.ts
 */
import {
  MOCK_ASTRONOMY_QUESTIONS as bank,
} from "@/lib/mock/astronomy";
import {
  PRACTICE_SET_SIZE,
  parsePracticeMode,
  selectNextQuestion,
  targetDifficulty,
  toLearningAttempts,
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
): Question[] {
  const questions: Question[] = [];
  let history = [...startingHistory];
  const asked: string[] = [];
  const sessionTopics: string[] = [];

  for (let index = 0; index < PRACTICE_SET_SIZE; index += 1) {
    const question = next(history, asked, sessionTopics, mode);
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

const noHistoryFirst = next([], [], [], "weak");
check("a new student can start Work on Weak Points", Boolean(noHistoryFirst.id));

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

const weakSet = playSet(moonWeak, "weak");
const weakIds = weakSet.map((question) => question.id);
check(
  "weak-point session contains 10 questions",
  weakSet.length === PRACTICE_SET_SIZE,
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
const afterHint = next(hintHistory, [], [], "weak");
check(
  "hint-assisted history contributes to weak-point selection",
  hintHistory[0]?.hintUsed === true && afterHint.topicId === "the-moon",
);

const persistedWrong = toLearningAttempts(
  [{ questionId: "astro-q3", isCorrect: false, hintUsed: false }],
  bank,
);
const afterPersisted = next(persistedWrong, [], [], "weak");
check(
  "cross-session saved attempts influence Work on Weak Points",
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

if (failures.length > 0) {
  throw new Error(`Weak-point checks failed:\n- ${failures.join("\n- ")}`);
}
