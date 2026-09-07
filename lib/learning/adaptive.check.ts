/**
 * Independent checks for Adaptive Practice v1.
 * Run: npx tsx lib/learning/adaptive.check.ts
 */
import {
  MOCK_ASTRONOMY_QUESTIONS as bank,
} from "@/lib/mock/astronomy";
import {
  CORRECTS_TO_CLEAR_WEAK_TOPIC,
  PRACTICE_SET_SIZE,
  WEAK_TOPIC_ATTEMPT_WINDOW,
  isTopicWeak,
  selectNextQuestion,
  targetDifficulty,
  targetDifficultyForSession,
  toLearningAttempts,
  parsePracticeTopicId,
  topicLearningState,
  topicRevisitScore,
  topicsGroupedByLearningState,
  topicsNeedingRevisit,
  type LearningAttempt,
} from "@/lib/learning/adaptive";
import { summarizePractice } from "@/lib/practice";
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
  lastWasRevisitEvidence: boolean,
): Question {
  const question = selectNextQuestion({
    bank,
    history,
    askedQuestionIds: asked,
    sessionTopicSequence: sessionTopics,
    lastWasRevisitEvidence,
  });
  if (!question) {
    throw new Error("Expected a next question");
  }
  return question;
}

function playSet(
  startingHistory: LearningAttempt[],
  answers: Array<{ isCorrect: boolean; hintUsed?: boolean }>,
): { questions: Question[]; history: LearningAttempt[] } {
  const questions: Question[] = [];
  let history = [...startingHistory];
  const asked: string[] = [];
  const sessionTopics: string[] = [];
  let lastWasRevisitEvidence = false;

  for (const answer of answers) {
    const question = next(history, asked, sessionTopics, lastWasRevisitEvidence);
    questions.push(question);
    asked.push(question.id);
    sessionTopics.push(question.topicId);
    const record = attempt(
      question.id,
      answer.isCorrect,
      answer.hintUsed ?? false,
    );
    history = [...history, record];
    lastWasRevisitEvidence = !record.isCorrect || record.hintUsed;
  }

  return { questions, history };
}

const failures: string[] = [];

function check(name: string, ok: boolean) {
  if (!ok) {
    failures.push(name);
  }
}

const missed = attempt("astro-q1", false);
check(
  "a wrong answer marks that topic weak",
  isTopicWeak([missed], "sun-and-stars") &&
    topicRevisitScore([missed], "sun-and-stars") === CORRECTS_TO_CLEAR_WEAK_TOPIC,
);
check(
  "an unused topic is not weak",
  !isTopicWeak([missed], "the-moon") &&
    topicRevisitScore([], "sun-and-stars") === 0,
);

const afterWrong = next([missed], [missed.questionId], [missed.topicId], true);
check(
  "the exact missed question is not selected next",
  afterWrong.id !== missed.questionId,
);
check(
  "the next question after a miss is a different topic",
  afterWrong.topicId !== missed.topicId,
);

const q2 = afterWrong;
const q3 = next(
  [missed, attempt(q2.id, true)],
  [missed.questionId, q2.id],
  [missed.topicId, q2.topicId],
  false,
);
const q4 = next(
  [missed, attempt(q2.id, true), attempt(q3.id, true)],
  [missed.questionId, q2.id, q3.id],
  [missed.topicId, q2.topicId, q3.topicId],
  false,
);
check(
  "a flagged topic is not used for the immediately following two questions",
  q3.topicId !== missed.topicId && q2.topicId !== missed.topicId,
);
check(
  "the struggled topic returns after two intervening questions",
  q4.topicId === missed.topicId,
);
check(
  "the returned question is a different item from the same topic",
  q4.id !== missed.questionId,
);

const laterSessionHistory = [
  missed,
  attempt(q2.id, true),
  attempt(q3.id, true),
  attempt(q4.id, true),
];
const laterSessionFirst = next(laterSessionHistory, [], [], false);
check(
  "a later session still prioritizes the recently struggled topic",
  laterSessionFirst.topicId === "sun-and-stars",
);
check(
  "the later-session question is not the exact missed item",
  laterSessionFirst.id !== missed.questionId,
);

const afterOneRecovery = topicRevisitScore(laterSessionHistory, "sun-and-stars");
check(
  "one later correct lowers remaining recovery but does not clear a miss",
  isTopicWeak(laterSessionHistory, "sun-and-stars") &&
    afterOneRecovery === CORRECTS_TO_CLEAR_WEAK_TOPIC - 1,
);

const twoRecoveries: LearningAttempt[] = [
  missed,
  attempt("astro-q10", true),
  attempt("astro-q11", true),
];
check(
  "two later corrects still leave the topic weak",
  isTopicWeak(twoRecoveries, "sun-and-stars") &&
    topicRevisitScore(twoRecoveries, "sun-and-stars") === 1,
);

const threeRecoveries: LearningAttempt[] = [
  ...twoRecoveries,
  attempt("astro-q12", true),
];
check(
  "three later corrects on that topic mark it strong",
  !isTopicWeak(threeRecoveries, "sun-and-stars") &&
    topicRevisitScore(threeRecoveries, "sun-and-stars") === 0,
);

const hintedRecoveries: LearningAttempt[] = [
  missed,
  attempt("astro-q10", true, true),
  attempt("astro-q11", true, true),
  attempt("astro-q12", true, true),
];
check(
  "hinted corrects still count toward clearing a weak topic",
  !isTopicWeak(hintedRecoveries, "sun-and-stars"),
);

const resetAfterProgress: LearningAttempt[] = [
  missed,
  attempt("astro-q10", true),
  attempt("astro-q11", true),
  attempt("astro-q12", false),
];
check(
  "a new miss resets recovery on that topic",
  isTopicWeak(resetAfterProgress, "sun-and-stars") &&
    topicRevisitScore(resetAfterProgress, "sun-and-stars") ===
      CORRECTS_TO_CLEAR_WEAK_TOPIC,
);

const repeatedMisses: LearningAttempt[] = [
  missed,
  attempt("astro-q10", false),
];
check(
  "repeated mistakes keep the topic weak",
  isTopicWeak(repeatedMisses, "sun-and-stars"),
);

const agedOutMiss: LearningAttempt[] = [
  missed,
  ...Array.from({ length: WEAK_TOPIC_ATTEMPT_WINDOW }, () =>
    attempt("astro-q3", true),
  ),
];
check(
  "a miss older than the 40-attempt window is no longer weak",
  !isTopicWeak(agedOutMiss, "sun-and-stars"),
);

const staleMissThenRecoveries: LearningAttempt[] = [
  missed,
  attempt("astro-q3", true),
  attempt("astro-q5", true),
  attempt("astro-q8", true),
  attempt("astro-q10", true),
  attempt("astro-q11", true),
  attempt("astro-q12", true),
  attempt("astro-q17", true),
];
check(
  "old mistakes do not permanently dominate after later independent success",
  topicRevisitScore(staleMissThenRecoveries, "sun-and-stars") <= 0,
);
check(
  "a recovered topic is not kept on the due list",
  !topicsNeedingRevisit(staleMissThenRecoveries).includes("sun-and-stars"),
);

const eightAfterMiss = playSet([], [
  { isCorrect: false },
  { isCorrect: true },
  { isCorrect: true },
  { isCorrect: true },
  { isCorrect: true },
  { isCorrect: true },
  { isCorrect: true },
  { isCorrect: true },
  { isCorrect: true },
  { isCorrect: true },
]);
const eightIds = eightAfterMiss.questions.map((question) => question.id);
const eightTopics = eightAfterMiss.questions.map((question) => question.topicId);
check(
  "practice set contains 10 questions",
  eightAfterMiss.questions.length === PRACTICE_SET_SIZE && PRACTICE_SET_SIZE === 10,
);
check("all question IDs in a 10-question set are unique", new Set(eightIds).size === 10);
check(
  "a weak topic can return later in the same session",
  eightTopics[3] === eightTopics[0],
);
check(
  "the exact previous question is not repeated",
  eightIds[3] !== eightIds[0] && new Set(eightIds).size === eightIds.length,
);
check(
  "at least two intervening questions occur before a revisit",
  eightTopics[1] !== eightTopics[0] && eightTopics[2] !== eightTopics[0],
);
check(
  "the revisit question is different but belongs to the same topic",
  eightTopics[3] === eightTopics[0] && eightIds[3] !== eightIds[0],
);

const uniqueTopics = new Set(eightTopics);
check(
  "a 10-question set rotates through more than one topic",
  uniqueTopics.size >= 3,
);
check(
  "a 10-question set is not ten items from the same topic",
  uniqueTopics.size > 1,
);

const eightRecords = eightAfterMiss.questions.map((question, index) => ({
  questionId: question.id,
  selectedChoiceId: "a",
  isCorrect: index !== 0,
  hintUsed: false,
}));
const eightSummary = summarizePractice(eightRecords);
check(
  "results calculate 10 questions answered",
  eightSummary.questionsAnswered === 10,
);
check("results calculate the correct count", eightSummary.correctAnswers === 9);
check(
  "results calculate accuracy from the 10 answers",
  eightSummary.accuracyPercent === Math.round((9 / 10) * 100),
);

const eightAfterHint = playSet([], [
  { isCorrect: true, hintUsed: true },
  { isCorrect: true },
  { isCorrect: true },
  { isCorrect: true },
  { isCorrect: true },
  { isCorrect: true },
  { isCorrect: true },
  { isCorrect: true },
  { isCorrect: true },
  { isCorrect: true },
]);
check(
  "a 10-question set still completes after an opening hint-correct",
  eightAfterHint.questions.length === PRACTICE_SET_SIZE &&
    new Set(eightAfterHint.questions.map((question) => question.id)).size ===
      PRACTICE_SET_SIZE,
);

const hintOnly = [attempt("astro-q1", true, true)];
check(
  "hint-correct without a miss does not mark the topic weak",
  !isTopicWeak(hintOnly, "sun-and-stars") &&
    topicRevisitScore(hintOnly, "sun-and-stars") === 0 &&
    topicsNeedingRevisit(hintOnly).length === 0,
);
const afterHint = next(hintOnly, ["astro-q1"], ["sun-and-stars"], true);
check(
  "hint-correct without a miss still rotates away from that topic next",
  afterHint.topicId !== "sun-and-stars",
);

const first = next([], [], [], false);
check("new student starts on an easy question", first.difficulty === 1);

function sessionAttempt(
  index: number,
  difficulty: 1 | 2 | 3,
  isCorrect: boolean,
): LearningAttempt {
  return {
    questionId: `session-${index}`,
    topicId: "session-topic",
    difficulty,
    isCorrect,
    hintUsed: false,
  };
}

function sessionTarget(
  history: LearningAttempt[],
  eventId = "ecology",
  expeditionNumber = 1,
): number {
  return targetDifficultyForSession({
    bank,
    history,
    askedQuestionIds: history.map((item) => item.questionId),
    sessionTopicSequence: history.map((item) => item.topicId),
    lastWasRevisitEvidence: false,
    eventId,
    expeditionNumber,
  });
}

check(
  "session starts easy and stays easy before demonstrated success",
  sessionTarget([]) === 1 &&
    sessionTarget([
      sessionAttempt(1, 1, true),
      sessionAttempt(2, 1, true),
      sessionAttempt(3, 1, true),
      sessionAttempt(4, 1, true),
    ]) === 1,
);
check(
  "five recent Easy successes unlock Medium",
  sessionTarget([
    sessionAttempt(1, 1, true),
    sessionAttempt(2, 1, true),
    sessionAttempt(3, 1, true),
    sessionAttempt(4, 1, true),
    sessionAttempt(5, 1, true),
  ]) === 2,
);
check(
  "one Medium success does not unlock Hard",
  sessionTarget([
    sessionAttempt(1, 1, true),
    sessionAttempt(2, 1, true),
    sessionAttempt(3, 1, true),
    sessionAttempt(4, 1, true),
    sessionAttempt(5, 1, true),
    sessionAttempt(6, 2, true),
  ]) === 2,
);
check(
  "two recent Medium failures step back to Easy",
  sessionTarget([
    sessionAttempt(1, 1, true),
    sessionAttempt(2, 1, true),
    sessionAttempt(3, 1, true),
    sessionAttempt(4, 1, true),
    sessionAttempt(5, 1, true),
    sessionAttempt(6, 2, false),
    sessionAttempt(7, 2, false),
  ]) === 1,
);
check(
  "four consecutive Medium successes unlock Hard",
  sessionTarget([
    sessionAttempt(1, 1, true),
    sessionAttempt(2, 1, true),
    sessionAttempt(3, 1, true),
    sessionAttempt(4, 1, true),
    sessionAttempt(5, 1, true),
    sessionAttempt(6, 2, true),
    sessionAttempt(7, 2, true),
    sessionAttempt(8, 2, true),
    sessionAttempt(9, 2, true),
  ]) === 3,
);
check(
  "A&P onboarding waits for six Easy successes",
  sessionTarget(
    [
      sessionAttempt(1, 1, true),
      sessionAttempt(2, 1, true),
      sessionAttempt(3, 1, true),
      sessionAttempt(4, 1, true),
      sessionAttempt(5, 1, true),
    ],
    "anatomy-physiology",
    1,
  ) === 1 &&
    sessionTarget(
      [
        sessionAttempt(1, 1, true),
        sessionAttempt(2, 1, true),
        sessionAttempt(3, 1, true),
        sessionAttempt(4, 1, true),
        sessionAttempt(5, 1, true),
        sessionAttempt(6, 1, true),
      ],
      "anatomy-physiology",
      2,
    ) === 2,
);

const selectionBank = Array.from({ length: 30 }, (_, index) => ({
  ...bank[0]!,
  id: `selection-${index}`,
  difficulty: (index < 10 ? 1 : index < 20 ? 2 : 3) as 1 | 2 | 3,
}));

const wrongEasyGuardrailBank = [
  { ...bank[0]!, id: "guard-easy", topicId: "topic-c", difficulty: 1 as const },
  { ...bank[0]!, id: "guard-medium", topicId: "topic-d", difficulty: 2 as const },
];
const nextAfterThreeEasyMisses = selectNextQuestion({
  bank: wrongEasyGuardrailBank,
  history: [
    sessionAttempt(1, 1, false),
    { ...sessionAttempt(2, 1, false), topicId: "topic-b" },
    { ...sessionAttempt(3, 1, false), topicId: "topic-c" },
  ],
  askedQuestionIds: ["guard-1", "guard-2", "guard-3"],
  sessionTopicSequence: ["topic-a", "topic-b", "topic-c"],
  lastWasRevisitEvidence: true,
  eventId: "ecology",
  expeditionNumber: 1,
});
check(
  "three Easy misses cannot cause a Medium question",
  nextAfterThreeEasyMisses?.difficulty === 1,
);

const mediumCeilingFallbackBank = [
  {
    ...bank[0]!,
    id: "fallback-seen-easy",
    difficulty: 1 as const,
  },
  {
    ...bank[0]!,
    id: "fallback-unseen-hard",
    difficulty: 3 as const,
  },
];
const mediumTargetFallback = selectNextQuestion({
  bank: mediumCeilingFallbackBank,
  history: [sessionAttempt(1, 2, true)],
  askedQuestionIds: ["session-1"],
  previouslyAnsweredQuestionIds: ["fallback-seen-easy"],
  sessionTopicSequence: ["session-topic"],
  lastWasRevisitEvidence: false,
  eventId: "ecology",
  expeditionNumber: 3,
});
check(
  "Medium target reuses eligible lower difficulty before unseen Hard",
  targetDifficultyForSession({
    bank: mediumCeilingFallbackBank,
    history: [sessionAttempt(1, 2, true)],
    askedQuestionIds: ["session-1"],
    sessionTopicSequence: ["session-topic"],
    lastWasRevisitEvidence: false,
    eventId: "ecology",
    expeditionNumber: 3,
  }) === 2 &&
    mediumTargetFallback !== null &&
    mediumTargetFallback.difficulty <= 2 &&
    mediumTargetFallback.id === "fallback-seen-easy",
);

const hardOnlyFallback = selectNextQuestion({
  bank: [
    {
      ...bank[0]!,
      id: "locked-hard-only",
      difficulty: 3 as const,
    },
  ],
  history: [sessionAttempt(1, 2, true)],
  askedQuestionIds: ["session-1"],
  sessionTopicSequence: ["session-topic"],
  lastWasRevisitEvidence: false,
  eventId: "ecology",
  expeditionNumber: 3,
});
check(
  "Hard is not selected before four Medium successes",
  hardOnlyFallback === null,
);

const unlockedHard = selectNextQuestion({
  bank: [
    {
      ...bank[0]!,
      id: "unlocked-hard",
      difficulty: 3 as const,
    },
  ],
  history: [
    sessionAttempt(1, 2, true),
    sessionAttempt(2, 2, true),
    sessionAttempt(3, 2, true),
    sessionAttempt(4, 2, true),
  ],
  askedQuestionIds: ["session-1", "session-2", "session-3", "session-4"],
  sessionTopicSequence: [
    "session-topic",
    "session-topic",
    "session-topic",
    "session-topic",
  ],
  lastWasRevisitEvidence: false,
  eventId: "ecology",
  expeditionNumber: 3,
});
check(
  "Hard remains selectable after four Medium successes",
  unlockedHard?.id === "unlocked-hard",
);

function selectSyntheticSession(previouslyAnsweredQuestionIds: string[]) {
  const ids: string[] = [];
  let history: LearningAttempt[] = [];
  for (let index = 0; index < PRACTICE_SET_SIZE; index += 1) {
    const question = selectNextQuestion({
      bank: selectionBank,
      history,
      askedQuestionIds: ids,
      previouslyAnsweredQuestionIds,
      sessionTopicSequence: history.map((item) => item.topicId),
      lastWasRevisitEvidence: false,
      eventId: "ecology",
      expeditionNumber: 1,
    });
    if (!question) {
      break;
    }
    ids.push(question.id);
    history = [
      ...history,
      {
        questionId: question.id,
        topicId: question.topicId,
        difficulty: question.difficulty,
        isCorrect: true,
        hintUsed: false,
      },
    ];
  }
  return ids;
}

const syntheticSessionOne = selectSyntheticSession([]);
const syntheticSessionTwo = selectSyntheticSession(syntheticSessionOne);
const syntheticSessionThree = selectSyntheticSession([
  ...syntheticSessionOne,
  ...syntheticSessionTwo,
]);
const syntheticSessionFour = selectSyntheticSession([
  ...syntheticSessionOne,
  ...syntheticSessionTwo,
  ...syntheticSessionThree,
]);
check(
  "Medium becomes selectable after five Easy successes",
  syntheticSessionOne.slice(5).some((id) =>
    id === "selection-10" || id === "selection-11",
  ),
);
check(
  "cross-session selection excludes prior IDs when unseen questions exist",
  syntheticSessionOne.length === PRACTICE_SET_SIZE &&
    syntheticSessionTwo.length === PRACTICE_SET_SIZE &&
    syntheticSessionOne.every((id) => !syntheticSessionTwo.includes(id)),
);
check(
  "cross-session fallback still fills a unique 10-question session",
  syntheticSessionFour.length === PRACTICE_SET_SIZE &&
    new Set(syntheticSessionFour).size === PRACTICE_SET_SIZE,
);

const threeEasyWins: LearningAttempt[] = [
  attempt("astro-q1", true),
  attempt("astro-q3", true),
  attempt("astro-q5", true),
];
check(
  "difficulty increases one step after a strong independent streak",
  targetDifficulty(threeEasyWins) === 2,
);

const twoWrongsOnMedium: LearningAttempt[] = [
  attempt("astro-q2", false),
  attempt("astro-q4", false),
];
check(
  "difficulty decreases one step after repeated mistakes",
  targetDifficulty(twoWrongsOnMedium) === 1,
);

const priorSession = [attempt("astro-q1", false)];
const returning = next(priorSession, [], [], false);
check(
  "a prior persisted miss is chosen as a different question from that topic",
  returning.topicId === "sun-and-stars" && returning.id !== "astro-q1",
);

const independentCorrect = attempt("astro-q1", true, false);
const hintCorrect = attempt("astro-q1", true, true);
const wrongNoHint = attempt("astro-q1", false, false);
const wrongWithHint = attempt("astro-q1", false, true);

check(
  "correct + no hint is not a weak topic",
  !isTopicWeak([independentCorrect], "sun-and-stars") &&
    topicRevisitScore([independentCorrect], "sun-and-stars") === 0,
);
check(
  "correct + hint is not a weak topic",
  !isTopicWeak([hintCorrect], "sun-and-stars"),
);
check(
  "wrong + no hint is a weak topic",
  isTopicWeak([wrongNoHint], "sun-and-stars") &&
    topicRevisitScore([wrongNoHint], "sun-and-stars") ===
      CORRECTS_TO_CLEAR_WEAK_TOPIC,
);
check(
  "wrong + hint is still a miss",
  isTopicWeak([wrongWithHint], "sun-and-stars") &&
    topicRevisitScore([wrongWithHint], "sun-and-stars") ===
      topicRevisitScore([wrongNoHint], "sun-and-stars"),
);

const persistedHintHistory = toLearningAttempts(
  [{ questionId: "astro-q1", isCorrect: true, hintUsed: true }],
  bank,
);
check(
  "hint history from a previous session is still recorded",
  persistedHintHistory[0]?.hintUsed === true,
);
check(
  "a hint-only prior session does not force that topic next",
  !isTopicWeak(persistedHintHistory, "sun-and-stars"),
);

const legacyRow = toLearningAttempts(
  [{ questionId: "astro-q1", isCorrect: true }],
  bank,
);
check(
  "existing attempts without hint_used continue as hint_used = false",
  legacyRow[0]?.hintUsed === false &&
    !isTopicWeak(legacyRow, "sun-and-stars"),
);

check(
  "a miss with no later corrects is Needs Practice",
  topicLearningState(
    [attempt("astro-q1", false)],
    "sun-and-stars",
  ) === "needs-practice",
);
check(
  "a miss with some later corrects is Improving",
  topicLearningState(
    [
      attempt("astro-q1", false),
      attempt("astro-q1", true),
    ],
    "sun-and-stars",
  ) === "improving",
);
check(
  "three later corrects after a miss is Strong",
  topicLearningState(
    [
      attempt("astro-q1", false),
      attempt("astro-q1", true),
      attempt("astro-q1", true),
      attempt("astro-q1", true),
    ],
    "sun-and-stars",
  ) === "strong",
);
check(
  "corrects with no miss are not classified as Strong",
  topicLearningState([attempt("astro-q1", true)], "sun-and-stars") === null,
);
check(
  "grouped states keep Needs Practice separate from Improving",
  topicsGroupedByLearningState([
    attempt("astro-q1", false),
    attempt("astro-q3", false),
    attempt("astro-q3", true),
  ]).needsPractice.includes("sun-and-stars") &&
    topicsGroupedByLearningState([
      attempt("astro-q1", false),
      attempt("astro-q3", false),
      attempt("astro-q3", true),
    ]).improving.includes("the-moon"),
);
check(
  "practice topic ids reject empty and unsafe values",
  parsePracticeTopicId("seismic-waves") === "seismic-waves" &&
    parsePracticeTopicId("") === null &&
    parsePracticeTopicId("foo/bar") === null,
);

if (failures.length > 0) {
  throw new Error(`Adaptive checks failed:\n- ${failures.join("\n- ")}`);
}
