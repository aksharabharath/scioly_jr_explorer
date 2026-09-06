/**
 * Presentation ranking for the event home page.
 * Run: npx tsx lib/event-home-notes.check.ts
 */
import {
  eventHomeCallout,
  strongestTopicForEventHome,
  trickyTopicsForEventHome,
} from "@/lib/event-home-notes";
import type { LearningAttempt } from "@/lib/learning/adaptive";

function miss(topicId: string): LearningAttempt {
  return {
    questionId: `${topicId}-miss`,
    topicId,
    difficulty: 1,
    isCorrect: false,
    hintUsed: false,
  };
}

function hit(topicId: string): LearningAttempt {
  return {
    questionId: `${topicId}-hit`,
    topicId,
    difficulty: 1,
    isCorrect: true,
    hintUsed: false,
  };
}

function check(name: string, ok: boolean) {
  if (!ok) {
    throw new Error(name);
  }
}

const ranked = trickyTopicsForEventHome([
  ...Array.from({ length: 3 }, () => miss("populations")),
  ...Array.from({ length: 8 }, () => miss("terrestrial")),
  ...Array.from({ length: 7 }, () => miss("communities")),
  miss("other-a"),
  miss("other-b"),
]);

check("display at most 3 tricky topics", ranked.length === 3);
check(
  "highest miss count first",
  ranked[0] === "terrestrial" &&
    ranked[1] === "communities" &&
    ranked[2] === "populations",
);

check(
  "one correct is not a strongest topic",
  strongestTopicForEventHome([hit("water-chemistry")]) === null,
);

check(
  "three corrects can be a strongest topic",
  strongestTopicForEventHome([
    hit("water-chemistry"),
    hit("water-chemistry"),
    hit("water-chemistry"),
  ]) === "water-chemistry",
);

check(
  "three attempts with misses can still be a relative strongest topic",
  strongestTopicForEventHome([
    miss("ecology-topic"),
    miss("ecology-topic"),
    miss("ecology-topic"),
  ]) === "ecology-topic",
);

check(
  "higher recent accuracy ranks first",
  strongestTopicForEventHome([
    miss("needs-work"),
    miss("needs-work"),
    miss("needs-work"),
    hit("water-chemistry"),
    hit("water-chemistry"),
    miss("water-chemistry"),
  ]) === "water-chemistry",
);

check(
  "streak callout wins",
  eventHomeCallout({
    eventName: "Water Quality",
    streakDays: 3,
    expeditionsCompleted: 5,
    questionsAnswered: 40,
  }).title === "3-day expedition streak",
);

check(
  "early callout when little data",
  eventHomeCallout({
    eventName: "Ecology",
    streakDays: 0,
    expeditionsCompleted: 0,
    questionsAnswered: 0,
  }).title === "Ready to explore?",
);

console.log("event-home-notes.check.ts: ok");
