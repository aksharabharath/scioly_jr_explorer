/**
 * Structural checks for the Water Quality 2027 MVP bank (wq-q1–wq-q40).
 * Run: npx tsx lib/mock/water-quality-questions.check.ts
 */
import {
  MOCK_WATER_QUALITY_QUESTIONS,
  WATER_QUALITY_EVENT_ID,
  WATER_QUALITY_TOPIC_IDS,
  type WaterQualityCognitiveDemand,
  type WaterQualitySourceType,
} from "@/lib/mock/water-quality-questions";
import { optionalSecondHintIsValid } from "@/lib/practice";

const failures: string[] = [];

function check(name: string, ok: boolean) {
  if (!ok) {
    failures.push(name);
  }
}

const allowedTopics = new Set<string>(WATER_QUALITY_TOPIC_IDS);
const allowedDemand = new Set<WaterQualityCognitiveDemand>([
  "recall",
  "recognition",
  "distinction",
  "application",
  "multi-step",
]);
const allowedSources = new Set<WaterQualitySourceType>([
  "rules-derived",
  "usgs-water-science-school",
]);
const questions = MOCK_WATER_QUALITY_QUESTIONS;

check("MVP bank has 40 questions", questions.length === 40);

const ids = questions.map((question) => question.id);
check("question IDs are unique", new Set(ids).size === ids.length);
check(
  "IDs are wq-q1 through wq-q40 with no gaps",
  ids.join(",") ===
    Array.from({ length: 40 }, (_, index) => `wq-q${index + 1}`).join(","),
);

const prompts = questions.map((question) => question.prompt.trim());
check(
  "question prompts are unique",
  new Set(prompts).size === prompts.length,
);

const byTopic: Record<string, number> = {};
const byDifficulty = { 1: 0, 2: 0, 3: 0 };
const bySource: Record<string, number> = {};
const byDemand: Record<string, number> = {};
const byVerification: Record<string, number> = {};
const correctLetter: Record<string, number> = { a: 0, b: 0, c: 0, d: 0 };

for (const question of questions) {
  check(
    `${question.id} uses event water-quality`,
    question.eventId === WATER_QUALITY_EVENT_ID,
  );
  check(
    `${question.id} has a valid topicId`,
    allowedTopics.has(question.topicId),
  );
  check(`${question.id} has a non-empty prompt`, question.prompt.trim().length > 0);
  check(
    `${question.id} has a non-empty explanation`,
    question.explanation.trim().length > 0,
  );
  check(`${question.id} has a non-empty hint`, question.hint.trim().length > 0);
  check(
    `${question.id} optional hint2 differs from hint when present`,
    optionalSecondHintIsValid(question),
  );
  check(`${question.id} has exactly 4 choices`, question.choices.length === 4);
  check(`${question.id} is text-only`, question.imageRequired === false);
  check(
    `${question.id} has verificationStatus verified or needs-review`,
    question.verificationStatus === "verified" ||
      question.verificationStatus === "needs-review",
  );
  check(
    `${question.id} prompt has no IMAGE REQUIRED markup`,
    !question.prompt.includes("[IMAGE REQUIRED:"),
  );

  const choiceIds = question.choices.map((choice) => choice.id);
  check(
    `${question.id} has unique choice IDs`,
    new Set(choiceIds).size === 4,
  );
  check(`${question.id} uses choice IDs a–d`, choiceIds.join("") === "abcd");
  check(
    `${question.id} has exactly one correct choice`,
    choiceIds.filter((id) => id === question.correctChoiceId).length === 1,
  );
  check(
    `${question.id} difficulty is 1, 2, or 3`,
    question.difficulty === 1 ||
      question.difficulty === 2 ||
      question.difficulty === 3,
  );

  const choiceTexts = question.choices.map((choice) => choice.text.trim());
  check(
    `${question.id} choice texts are unique`,
    new Set(choiceTexts).size === 4,
  );
  for (const choice of question.choices) {
    check(
      `${question.id} choice ${choice.id} has text`,
      choice.text.trim().length > 0,
    );
  }

  check(
    `${question.id} has an allowed cognitiveDemand`,
    allowedDemand.has(question.cognitiveDemand),
  );
  check(
    `${question.id} has an allowed sourceType`,
    allowedSources.has(question.sourceType),
  );
  check(
    `${question.id} has a source note`,
    question.sourceNote.trim().length > 0,
  );
  check(
    `${question.id} cites at least one evidence id`,
    question.evidenceIds.length > 0,
  );
  for (const evidenceId of question.evidenceIds) {
    check(
      `${question.id} evidence id ${evidenceId} looks like a matrix row`,
      /^(V-[CMAWPUL]\d+|V-M\d+|RS\d+)$/.test(evidenceId),
    );
  }

  byTopic[question.topicId] = (byTopic[question.topicId] ?? 0) + 1;
  byDifficulty[question.difficulty] += 1;
  bySource[question.sourceType] = (bySource[question.sourceType] ?? 0) + 1;
  byDemand[question.cognitiveDemand] =
    (byDemand[question.cognitiveDemand] ?? 0) + 1;
  correctLetter[question.correctChoiceId] =
    (correctLetter[question.correctChoiceId] ?? 0) + 1;
  byVerification[question.verificationStatus] =
    (byVerification[question.verificationStatus] ?? 0) + 1;
}

for (const topicId of WATER_QUALITY_TOPIC_IDS) {
  check(`${topicId} has at least one question`, (byTopic[topicId] ?? 0) >= 1);
}

check(
  "no items remain draft",
  questions.every((question) => question.verificationStatus !== "draft"),
);
check(
  "all items remain imageRequired false",
  questions.every((question) => question.imageRequired === false),
);
check(
  "no q41+ items",
  questions.every((question) => {
    const number = Number(question.id.replace("wq-q", ""));
    return number >= 1 && number <= 40;
  }),
);

if (failures.length > 0) {
  throw new Error(
    `Water Quality MVP bank checks failed:\n- ${failures.join("\n- ")}`,
  );
}

console.log(
  [
    "Water Quality MVP bank checks passed.",
    `count=${questions.length}`,
    `difficulty={1:${byDifficulty[1]},2:${byDifficulty[2]},3:${byDifficulty[3]}}`,
    `demand={${Object.entries(byDemand)
      .map(([key, value]) => `${key}:${value}`)
      .join(",")}}`,
    `source={${Object.entries(bySource)
      .map(([key, value]) => `${key}:${value}`)
      .join(",")}}`,
    `topics={${Object.entries(byTopic)
      .map(([key, value]) => `${key}:${value}`)
      .join(",")}}`,
    `correct={a:${correctLetter.a},b:${correctLetter.b},c:${correctLetter.c},d:${correctLetter.d}}`,
    `verification={${Object.entries(byVerification)
      .map(([key, value]) => `${key}:${value}`)
      .join(",")}}`,
  ].join(" "),
);
