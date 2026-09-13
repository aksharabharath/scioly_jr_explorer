/**
 * Real MVP badge checks. Unlocks come from persisted attempt-shaped input.
 * Run: npx tsx lib/badges.check.ts
 */
import {
  BADGE_DEFINITIONS,
  badgeIdsForSelectedEvents,
  definitionsForIds,
  formatBadgeProgress,
  getBadgeProgress,
  getEarnedBadgeIds,
  getNewlyEarnedBadges,
  type BadgeId,
  type BadgeProgressAttempt,
} from "@/lib/badges";
import { PRACTICE_SET_SIZE } from "@/lib/learning/adaptive";
import type { Question } from "@/lib/types";

const failures: string[] = [];

function check(name: string, ok: boolean) {
  if (!ok) {
    failures.push(name);
  }
}

function question(id: string, eventId: string, topicId: string): Question {
  return {
    id,
    eventId,
    topicId,
    prompt: id,
    choices: [
      { id: "a", text: "A" },
      { id: "b", text: "B" },
      { id: "c", text: "C" },
      { id: "d", text: "D" },
    ],
    correctChoiceId: "a",
    explanation: "Because.",
    hint: "Think again.",
    difficulty: 1,
  };
}

function attempt(
  questionId: string,
  options: Partial<BadgeProgressAttempt> = {},
): BadgeProgressAttempt {
  return {
    questionId,
    isCorrect: true,
    hintUsed: false,
    sessionId: "session-a",
    answeredAt: "2026-08-24T12:00:00.000Z",
    ...options,
  };
}

function earned(attempts: BadgeProgressAttempt[]): BadgeId[] {
  return getEarnedBadgeIds({ attempts, questions });
}

function completedSession(
  questionId: string,
  sessionId: string,
  correct = true,
): BadgeProgressAttempt[] {
  return Array.from({ length: PRACTICE_SET_SIZE }, () =>
    attempt(questionId, { sessionId, isCorrect: correct }),
  );
}

const questions = [
  question("ento-q1", "entomology", "taxonomy"),
  question("ento-q2", "entomology", "taxonomy"),
  question("eco-q1", "ecology", "habitats"),
  question("astro-q1", "astronomy", "planets"),
  question("wq-q1", "water-quality", "macros"),
  question("ap-q1", "anatomy-physiology", "skin"),
  question("cb-q1", "crime-busters", "fingerprints"),
  question("code-q1", "codebusters", "ciphers"),
];

check("there are 16 preset badges", BADGE_DEFINITIONS.length === 16);
check(
  "preset ids are stable",
  BADGE_DEFINITIONS.map((badge) => badge.id).join(",") ===
    "first-try,first-discovery,three-event-explorer,junior-scientist,tricky-topic-tamer,practice-regular,water-watcher,entomologist,body-explorer,ecosystem-explorer,crime-scene-rookie,codebusters-explorer,consistent-explorer,dedicated-explorer,perfect-expedition,science-starter",
);
check(
  "selected events show only their event badges",
  badgeIdsForSelectedEvents(["entomology", "ecology", "water-quality"]).join(
    ",",
  ) ===
    "first-discovery,three-event-explorer,junior-scientist,water-watcher,entomologist,ecosystem-explorer,consistent-explorer,perfect-expedition,science-starter,practice-regular",
);
check(
  "Codebusters has a definition but is hidden when unselected",
  !badgeIdsForSelectedEvents(["entomology"]).includes("codebusters-explorer") &&
    BADGE_DEFINITIONS.some((badge) => badge.id === "codebusters-explorer"),
);

const none = earned([]);
check("new student with 0 attempts: all badges locked", none.length === 0);

const first = earned([attempt("ento-q1")]);
check("first saved answer unlocks First Try", first.includes("first-try"));
check(
  "one answer leaves First Discovery locked",
  !first.includes("first-discovery"),
);

const nineInSession = Array.from({ length: 9 }, () =>
  attempt("ento-q1", { sessionId: "short-set" }),
);
check(
  "nine answers in one session is not First Discovery",
  !earned(nineInSession).includes("first-discovery"),
);

const fullSession = Array.from({ length: PRACTICE_SET_SIZE }, () =>
  attempt("ento-q1", { sessionId: "full-set" }),
);
const discovery = earned(fullSession);
check("a full saved set unlocks First Try", discovery.includes("first-try"));
check(
  "a full saved set unlocks First Discovery",
  discovery.includes("first-discovery"),
);

const twoEvents = earned([attempt("ento-q1"), attempt("astro-q1")]);
check(
  "two incomplete historical events do not unlock Junior Scientist",
  !twoEvents.includes("junior-scientist"),
);
check(
  "one incomplete event does not unlock Junior Scientist",
  !first.includes("junior-scientist"),
);

const tamed = earned([
  attempt("ento-q1", { isCorrect: false, hintUsed: false }),
  attempt("ento-q2", { isCorrect: true, hintUsed: false }),
]);
check(
  "later independent success on a missed topic unlocks Tricky Topic Tamer",
  tamed.includes("tricky-topic-tamer"),
);

const hintedRecovery = earned([
  attempt("ento-q1", { isCorrect: false }),
  attempt("ento-q2", { isCorrect: true, hintUsed: true }),
]);
check(
  "hinted recovery is not Tricky Topic Tamer",
  !hintedRecovery.includes("tricky-topic-tamer"),
);

const tenSessions = Array.from(
  { length: 10 * PRACTICE_SET_SIZE },
  (_, index) =>
    attempt("ento-q1", {
      sessionId: `set-${Math.floor(index / PRACTICE_SET_SIZE)}`,
    }),
);
check(
  "ten finished sets unlock Ten Expeditions",
  earned(tenSessions).includes("practice-regular"),
);

const firstSessionNew = getNewlyEarnedBadges([], discovery);
check(
  "first completed session newly earns First Try and First Discovery together",
  firstSessionNew.includes("first-try") &&
    firstSessionNew.includes("first-discovery") &&
    firstSessionNew.includes("perfect-expedition"),
);

const secondSession = Array.from({ length: PRACTICE_SET_SIZE }, () =>
  attempt("ento-q1", { sessionId: "second-set" }),
);
const afterSecond = earned([...fullSession, ...secondSession]);
check(
  "a repeated session with no new criteria earns no celebration badges",
  getNewlyEarnedBadges(discovery, afterSecond).length === 0,
);

const afterSecondEvent = earned([
  ...fullSession,
  ...secondSession,
  ...completedSession("astro-q1", "astro-set"),
]);
check(
  "a third completed expedition newly earns Explorer",
  getNewlyEarnedBadges(afterSecond, afterSecondEvent).includes(
    "three-event-explorer",
  ),
);

const multipleAtOnce = getNewlyEarnedBadges(
  [],
  earned([...fullSession, attempt("eco-q1")]),
);
check(
  "multiple unlocks from one session stay in one newly-earned list",
  multipleAtOnce.includes("first-try") &&
    multipleAtOnce.includes("first-discovery") &&
    !multipleAtOnce.includes("junior-scientist"),
);
check(
  "definitionsForIds keeps preset order",
  definitionsForIds(["three-event-explorer", "first-try"])
    .map((badge) => badge.id)
    .join(",") === "first-try,three-event-explorer",
);

const threeEvents = earned([
  ...completedSession("ento-q1", "ento-complete"),
  ...completedSession("eco-q1", "eco-complete"),
  ...completedSession("wq-q1", "wq-complete"),
]);
check(
  "three events unlock Explorer",
  threeEvents.includes("three-event-explorer") &&
    threeEvents.includes("junior-scientist"),
);
check(
  "two events do not unlock Explorer",
  !twoEvents.includes("three-event-explorer"),
);

const fiveWq = Array.from(
  { length: 5 * PRACTICE_SET_SIZE },
  (_, index) =>
    attempt("wq-q1", {
      sessionId: `wq-${Math.floor(index / PRACTICE_SET_SIZE)}`,
    }),
);
check(
  "five Water Quality sets unlock Water Watcher",
  earned(fiveWq).includes("water-watcher"),
);
check(
  "five Water Quality sets do not unlock Entomologist",
  !earned(fiveWq).includes("entomologist"),
);
const fiveCodebusters = Array.from(
  { length: 5 * PRACTICE_SET_SIZE },
  (_, index) =>
    attempt("code-q1", {
      sessionId: `cb-${Math.floor(index / PRACTICE_SET_SIZE)}`,
    }),
);
check(
  "five Codebusters sets unlock the defined Codebusters badge",
  earned(fiveCodebusters).includes("codebusters-explorer"),
);
check(
  "an incomplete imperfect expedition does not unlock Perfect Expedition",
  !earned(
    completedSession("ento-q1", "imperfect", false),
  ).includes("perfect-expedition"),
);
check(
  "25 answered questions unlock Science Starter",
  earned(
    Array.from({ length: 25 }, () => attempt("ento-q1", { sessionId: null })),
  ).includes("science-starter"),
);

check(
  "a 7-day streak unlocks Consistent Explorer",
  getEarnedBadgeIds({
    attempts: [attempt("ento-q1")],
    questions,
    streakDays: 7,
  }).includes("consistent-explorer"),
);
check(
  "a 6-day streak unlocks On a Roll",
  getEarnedBadgeIds({
    attempts: [attempt("ento-q1")],
    questions,
    streakDays: 6,
  }).includes("consistent-explorer"),
);
check(
  "a 30-day streak unlocks Dedicated Explorer",
  getEarnedBadgeIds({
    attempts: [attempt("ento-q1")],
    questions,
    streakDays: 30,
  }).includes("dedicated-explorer"),
);

function progressFor(
  attempts: BadgeProgressAttempt[],
  streakDays = 0,
) {
  return new Map(
    getBadgeProgress({ attempts, questions, streakDays }).map((row) => [
      row.id,
      row,
    ]),
  );
}

const emptyProgress = progressFor([]);
check(
  "progress covers every preset badge",
  getBadgeProgress({ attempts: [], questions }).length ===
    BADGE_DEFINITIONS.length,
);
check(
  "new student First Expedition is 0 / 1 expedition",
  emptyProgress.get("first-discovery")?.current === 0 &&
    emptyProgress.get("first-discovery")?.required === 1,
);

const oneEventProgress = progressFor(fullSession);
check(
  "one completed expedition is 1 / 3 toward Explorer",
  oneEventProgress.get("three-event-explorer")?.current === 1 &&
    oneEventProgress.get("three-event-explorer")?.required === 3,
);

const fiveWqProgress = progressFor(fiveWq);
check(
  "five Water Quality expeditions show Water Watcher 5 / 5",
  fiveWqProgress.get("water-watcher")?.current === 5 &&
    fiveWqProgress.get("water-watcher")?.required === 5,
);
check(
  "five Water Quality expeditions leave Entomologist at 0 / 5",
  fiveWqProgress.get("entomologist")?.current === 0 &&
    fiveWqProgress.get("entomologist")?.required === 5,
);

const sixDayProgress = progressFor([attempt("ento-q1")], 6);
check(
  "a 6-day streak is capped at 3 / 3 toward On a Roll",
  sixDayProgress.get("consistent-explorer")?.current === 3 &&
    sixDayProgress.get("consistent-explorer")?.required === 3,
);
check(
  "a 6-day streak is 6 / 30 toward Dedicated Explorer",
  sixDayProgress.get("dedicated-explorer")?.current === 6 &&
    sixDayProgress.get("dedicated-explorer")?.required === 30,
);

const earnedFromFiveWq = new Set(earned(fiveWq));
check(
  "progress current matches earned state for Water Watcher",
  fiveWqProgress.get("water-watcher")?.current ===
    fiveWqProgress.get("water-watcher")?.required &&
    earnedFromFiveWq.has("water-watcher"),
);

check(
  "Explorer shelf copy uses expeditions",
  formatBadgeProgress({
    id: "three-event-explorer",
    current: 2,
    required: 3,
    noun: "expedition",
  }) === "2 / 3 expeditions",
);
check(
  "Ten Expeditions shelf copy uses expeditions",
  formatBadgeProgress({
    id: "practice-regular",
    current: 3,
    required: 10,
    noun: "expedition",
  }) === "3 / 10 expeditions",
);
check(
  "On a Roll shelf copy uses days",
  formatBadgeProgress({
    id: "consistent-explorer",
    current: 5,
    required: 3,
    noun: "day",
  }) === "5 / 3 days",
);

if (failures.length > 0) {
  throw new Error(`Badge checks failed:\n- ${failures.join("\n- ")}`);
}

console.log("Badge checks passed.");
