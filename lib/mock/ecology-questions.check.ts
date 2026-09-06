/**
 * Structural checks for the Ecology 2027 MVP bank (eco-q1–eco-q40).
 * Run: npx tsx lib/mock/ecology-questions.check.ts
 *
 * Registered in curriculum.ts. Items are verified or needs-review.
 * Ecology is unlocked for the shared practice route.
 */
import {
  ECOLOGY_EVENT_ID,
  ECOLOGY_TOPIC_IDS,
  MOCK_ECOLOGY_QUESTIONS,
  type EcologyCognitiveDemand,
  type EcologySourceType,
} from "@/lib/mock/ecology-questions";
import { optionalSecondHintIsValid } from "@/lib/practice";
import { ECOLOGY_GLOSSARY } from "@/lib/mock/glossary/ecology";
import { annotatePrompt, questionHelpIssues } from "@/lib/question-help";

const failures: string[] = [];

function check(name: string, ok: boolean) {
  if (!ok) {
    failures.push(name);
  }
}

const allowedTopics = new Set<string>(ECOLOGY_TOPIC_IDS);
const allowedDemand = new Set<EcologyCognitiveDemand>([
  "recall",
  "recognition",
  "distinction",
  "application",
  "multi-step",
]);
const allowedSources = new Set<EcologySourceType>([
  "rules-derived",
  "openstax",
  "epa",
  "noaa",
  "nws",
  "iucn",
  "nisic",
  "eia",
]);
const questions = MOCK_ECOLOGY_QUESTIONS;

check("MVP bank has 40 questions", questions.length === 40);

const ids = questions.map((question) => question.id);
check("question IDs are unique", new Set(ids).size === ids.length);
check(
  "IDs are eco-q1 through eco-q40 with no gaps",
  ids.join(",") ===
    Array.from({ length: 40 }, (_, index) => `eco-q${index + 1}`).join(","),
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
    `${question.id} uses event ecology`,
    question.eventId === ECOLOGY_EVENT_ID,
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
  const helpIssues = questionHelpIssues(question, ECOLOGY_GLOSSARY);
  check(
    `${question.id} question help annotations are structurally valid`,
    helpIssues.length === 0,
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
  const haystack = [
    question.prompt,
    question.hint,
    question.explanation,
    ...question.choices.map((choice) => choice.text),
  ]
    .join("\n")
    .toLowerCase();
  check(
    `${question.id} does not use the 10% rule`,
    !haystack.includes("10% rule") && !haystack.includes("10 percent"),
  );
  check(
    `${question.id} does not use doubling time`,
    !haystack.includes("doubling time"),
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
      /^(V-ORG|V-ES|V-EN|V-INV-C|V-INV-M|V-SEL|V-ADP|V-SPE|V-LIM|V-LHS|V-GRO|V-F\d+|RS\d+)$/.test(
        evidenceId,
      ),
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

for (const topicId of ECOLOGY_TOPIC_IDS) {
  check(`${topicId} has at least one question`, (byTopic[topicId] ?? 0) >= 1);
}

check("difficulty 1 count is 16", byDifficulty[1] === 16);
check("difficulty 2 count is 16", byDifficulty[2] === 16);
check("difficulty 3 count is 8", byDifficulty[3] === 8);
check("correct choice a is used", correctLetter.a > 0);
check("correct choice b is used", correctLetter.b > 0);
check("correct choice c is used", correctLetter.c > 0);
check("correct choice d is used", correctLetter.d > 0);
check(
  "all items remain imageRequired false",
  questions.every((question) => question.imageRequired === false),
);
check(
  "no items remain draft",
  questions.every((question) => question.verificationStatus !== "draft"),
);
check(
  "no q41+ items",
  questions.every((question) => {
    const number = Number(question.id.replace("eco-q", ""));
    return number >= 1 && number <= 40;
  }),
);

const ecoQ21 = questions.find((question) => question.id === "eco-q21");
check(
  "eco-q21 has temperate and biome prompt terms",
  ecoQ21?.promptTerms?.map((ref) => ref.glossaryId).join(",") ===
    "temperate,biome",
);
check(
  "eco-q21 has wording-only help",
  ecoQ21?.wordingHelp ===
    "This question is asking what is most common in this type of environment.",
);
check(
  "eco-q21 prompt terms resolve in the prompt",
  Boolean(
    ecoQ21 &&
      annotatePrompt(
        ecoQ21.prompt,
        ecoQ21.promptTerms,
        ECOLOGY_GLOSSARY,
      ).filter((span) => span.type === "term").length === 2,
  ),
);
const pilotIds = questions
  .filter((question) => question.promptTerms || question.wordingHelp)
  .map((question) => question.id);
check(
  "ecology question-help pilot stays small",
  pilotIds.join(",") === "eco-q10,eco-q13,eco-q16,eco-q20,eco-q21",
);

if (failures.length > 0) {
  throw new Error(
    `Ecology MVP bank checks failed:\n- ${failures.join("\n- ")}`,
  );
}

console.log(
  [
    "Ecology MVP bank checks passed.",
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
