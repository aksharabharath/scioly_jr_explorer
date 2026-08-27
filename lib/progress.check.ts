/**
 * Progress calculation checks.
 * Run: npx tsx lib/progress.check.ts
 */
import { MOCK_ASTRONOMY_QUESTIONS as astronomy } from "@/lib/mock/astronomy";
import {
  calculateEventProgress,
  calculateOverallProgress,
} from "@/lib/progress";
import type { Question } from "@/lib/types";

const birdQuestion: Question = {
  ...astronomy[0],
  id: "birds-q1",
  eventId: "birds",
  topicId: "backyard-birds",
};

const questions = [...astronomy, birdQuestion];
const failures: string[] = [];

function check(name: string, ok: boolean) {
  if (!ok) {
    failures.push(name);
  }
}

const empty = calculateOverallProgress([], questions);
check("no attempts: 0 questions", empty.totalQuestions === 0);
check("no attempts: 0 correct", empty.totalCorrect === 0);
check("no attempts: accuracy is null, not 100%", empty.accuracyPercent === null);
check("no attempts: 0 events practiced", empty.eventsPracticed === 0);

const allCorrect = calculateOverallProgress(
  [
    { questionId: "astro-q1", isCorrect: true },
    { questionId: "astro-q3", isCorrect: true },
    { questionId: "astro-q5", isCorrect: true },
    { questionId: "astro-q8", isCorrect: true },
  ],
  questions,
);
check("all correct: 4 questions", allCorrect.totalQuestions === 4);
check("all correct: 4 correct", allCorrect.totalCorrect === 4);
check("all correct: 100% accuracy", allCorrect.accuracyPercent === 100);

const mixed = calculateOverallProgress(
  [
    { questionId: "astro-q1", isCorrect: true },
    { questionId: "astro-q2", isCorrect: true },
    { questionId: "astro-q3", isCorrect: true },
    { questionId: "astro-q4", isCorrect: true },
    { questionId: "astro-q5", isCorrect: true },
    { questionId: "astro-q6", isCorrect: true },
    { questionId: "astro-q7", isCorrect: false },
    { questionId: "astro-q8", isCorrect: false },
  ],
  questions,
);
check("mixed: 8 questions", mixed.totalQuestions === 8);
check("mixed: 6 correct", mixed.totalCorrect === 6);
check("mixed: 75% accuracy", mixed.accuracyPercent === 75);

const coverage = calculateEventProgress(
  "astronomy",
  [
    { questionId: "astro-q3", isCorrect: true },
    { questionId: "astro-q20", isCorrect: false },
    { questionId: "astro-q1", isCorrect: true },
  ],
  questions,
  4,
);
check("topic coverage: 3 attempts", coverage.totalQuestions === 3);
check("topic coverage: 2 of 4 topics", coverage.topicsPracticed === 2);
check("topic coverage total is 4", coverage.topicsTotal === 4);

const oneEvent = calculateOverallProgress(
  [
    { questionId: "astro-q1", isCorrect: true },
    { questionId: "astro-q3", isCorrect: false },
  ],
  questions,
);
check("only Astronomy attempts: 1 event practiced", oneEvent.eventsPracticed === 1);

const twoEvents = calculateOverallProgress(
  [
    { questionId: "astro-q1", isCorrect: true },
    { questionId: "birds-q1", isCorrect: true },
  ],
  questions,
);
check("Astronomy + Birds attempts: 2 events practiced", twoEvents.eventsPracticed === 2);

const astronomyOnly = calculateEventProgress(
  "astronomy",
  [
    { questionId: "astro-q1", isCorrect: true },
    { questionId: "birds-q1", isCorrect: true },
  ],
  questions,
  4,
);
check(
  "event progress ignores other events",
  astronomyOnly.totalQuestions === 1 && astronomyOnly.topicsPracticed === 1,
);

const duplicates = calculateOverallProgress(
  [
    { questionId: "astro-q1", isCorrect: true },
    { questionId: "astro-q1", isCorrect: false },
    { questionId: "astro-q1", isCorrect: true },
  ],
  questions,
);
check("duplicate questions each count", duplicates.totalQuestions === 3);
check("duplicate questions keep each correct flag", duplicates.totalCorrect === 2);

const hinted = calculateOverallProgress(
  [{ questionId: "astro-q1", isCorrect: true }],
  questions,
);
check(
  "hint-assisted correct still counts as answered and correct",
  hinted.totalQuestions === 1 &&
    hinted.totalCorrect === 1 &&
    hinted.accuracyPercent === 100,
);

const emptyEvent = calculateEventProgress("astronomy", [], questions, 4);
check("new student event: 0 questions", emptyEvent.totalQuestions === 0);
check("new student event: accuracy is null", emptyEvent.accuracyPercent === null);
check("new student event: 0 topics practiced", emptyEvent.topicsPracticed === 0);

if (failures.length > 0) {
  throw new Error(`Progress checks failed:\n- ${failures.join("\n- ")}`);
}
