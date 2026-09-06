/**
 * Real MVP badge checks. Unlocks come from persisted attempt-shaped input.
 * Run: npx tsx lib/badges.check.ts
 */
import {
  BADGE_DEFINITIONS,
  definitionsForIds,
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

const questions = [
  question("ento-q1", "entomology", "taxonomy"),
  question("ento-q2", "entomology", "taxonomy"),
  question("eco-q1", "ecology", "habitats"),
  question("astro-q1", "astronomy", "planets"),
  question("wq-q1", "water-quality", "macros"),
  question("ap-q1", "anatomy-physiology", "skin"),
  question("cb-q1", "crime-busters", "fingerprints"),
];

check("there are 15 preset badges", BADGE_DEFINITIONS.length === 15);
check(
  "preset ids are stable",
  BADGE_DEFINITIONS.map((badge) => badge.id).join(",") ===
    "first-try,first-discovery,event-explorer,three-event-explorer,tricky-topic-tamer,practice-regular,question-crusher,curious-mind,water-watcher,entomologist,body-explorer,ecosystem-explorer,crime-scene-rookie,consistent-explorer,dedicated-explorer",
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
  "two historical events unlock Event Explorer, including Astronomy",
  twoEvents.includes("event-explorer"),
);
check(
  "one event does not unlock Event Explorer",
  !first.includes("event-explorer"),
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

const fiveSessions = Array.from(
  { length: 5 * PRACTICE_SET_SIZE },
  (_, index) =>
    attempt("ento-q1", {
      sessionId: `set-${Math.floor(index / PRACTICE_SET_SIZE)}`,
    }),
);
check(
  "five finished sets unlock Practice Regular",
  earned(fiveSessions).includes("practice-regular"),
);

const fiftyUngrouped = Array.from({ length: 50 }, () =>
  attempt("ento-q1", { sessionId: null }),
);
const crusher = earned(fiftyUngrouped);
check(
  "50 saved attempts unlock Question Crusher",
  crusher.includes("question-crusher"),
);
check(
  "50 ungrouped attempts do not unlock Practice Regular",
  !crusher.includes("practice-regular"),
);
check(
  "50 attempts is not Curious Mind yet",
  !crusher.includes("curious-mind"),
);

const hundred = Array.from({ length: 100 }, () =>
  attempt("ento-q1", { sessionId: null }),
);
check(
  "100 saved attempts unlock Curious Mind",
  earned(hundred).includes("curious-mind"),
);

const firstSessionNew = getNewlyEarnedBadges([], discovery);
check(
  "first completed session newly earns First Try and First Discovery together",
  firstSessionNew.join(",") === "first-try,first-discovery",
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
  attempt("astro-q1"),
]);
check(
  "practicing a second event newly earns Event Explorer",
  getNewlyEarnedBadges(afterSecond, afterSecondEvent).join(",") ===
    "event-explorer",
);

const beforeFifty = earned(Array.from({ length: 49 }, () => attempt("ento-q1")));
const afterFifty = earned(Array.from({ length: 50 }, () => attempt("ento-q1")));
check(
  "crossing 50 questions newly earns Question Crusher",
  getNewlyEarnedBadges(beforeFifty, afterFifty).includes("question-crusher"),
);

const multipleAtOnce = getNewlyEarnedBadges(
  [],
  earned([...fullSession, attempt("eco-q1")]),
);
check(
  "multiple unlocks from one session stay in one newly-earned list",
  multipleAtOnce.includes("first-try") &&
    multipleAtOnce.includes("first-discovery") &&
    multipleAtOnce.includes("event-explorer"),
);
check(
  "definitionsForIds keeps preset order",
  definitionsForIds(["event-explorer", "first-try"])
    .map((badge) => badge.id)
    .join(",") === "first-try,event-explorer",
);

const threeEvents = earned([
  attempt("ento-q1"),
  attempt("eco-q1"),
  attempt("wq-q1"),
]);
check(
  "three events unlock Explorer",
  threeEvents.includes("three-event-explorer") &&
    threeEvents.includes("event-explorer"),
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

check(
  "a 7-day streak unlocks Consistent Explorer",
  getEarnedBadgeIds({
    attempts: [attempt("ento-q1")],
    questions,
    streakDays: 7,
  }).includes("consistent-explorer"),
);
check(
  "a 6-day streak does not unlock Consistent Explorer",
  !getEarnedBadgeIds({
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
  "new student Curious Mind is 0 / 100 questions",
  emptyProgress.get("curious-mind")?.current === 0 &&
    emptyProgress.get("curious-mind")?.required === 100 &&
    emptyProgress.get("curious-mind")?.noun === "question",
);
check(
  "new student First Expedition is 0 / 1 expedition",
  emptyProgress.get("first-discovery")?.current === 0 &&
    emptyProgress.get("first-discovery")?.required === 1,
);

const fiftyProgress = progressFor(fiftyUngrouped);
check(
  "50 attempts show Question Crusher complete and capped",
  fiftyProgress.get("question-crusher")?.current === 50 &&
    fiftyProgress.get("question-crusher")?.required === 50,
);
check(
  "50 attempts show Curious Mind as 50 / 100",
  fiftyProgress.get("curious-mind")?.current === 50 &&
    fiftyProgress.get("curious-mind")?.required === 100,
);

const hundredProgress = progressFor(hundred);
check(
  "100 attempts cap Curious Mind at 100 / 100",
  hundredProgress.get("curious-mind")?.current === 100 &&
    hundredProgress.get("curious-mind")?.required === 100,
);
check(
  "100 attempts keep Question Crusher capped at 50",
  hundredProgress.get("question-crusher")?.current === 50,
);

const oneEventProgress = progressFor([attempt("ento-q1")]);
check(
  "one event is 1 / 2 toward Event Explorer",
  oneEventProgress.get("event-explorer")?.current === 1 &&
    oneEventProgress.get("event-explorer")?.required === 2,
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
  "a 6-day streak is 6 / 7 toward Consistent Explorer",
  sixDayProgress.get("consistent-explorer")?.current === 6 &&
    sixDayProgress.get("consistent-explorer")?.required === 7,
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

if (failures.length > 0) {
  throw new Error(`Badge checks failed:\n- ${failures.join("\n- ")}`);
}

console.log("Badge checks passed.");
