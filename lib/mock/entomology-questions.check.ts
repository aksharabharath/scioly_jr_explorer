/**
 * Structural checks for the Entomology 2027 question bank (q1–q60).
 * Validates schema and invariants. Does not require all items to be verified.
 * Run: npx tsx lib/mock/entomology-questions.check.ts
 */
import {
  ENTOMOLOGY_EVENT_ID,
  ENTOMOLOGY_TAXON_IDS,
  ENTOMOLOGY_TOPIC_IDS,
  MOCK_ENTOMOLOGY_QUESTIONS,
  type EntomologyCognitiveDemand,
  type EntomologyQuestion,
} from "@/lib/mock/entomology-questions";

const failures: string[] = [];

function check(name: string, ok: boolean) {
  if (!ok) {
    failures.push(name);
  }
}

const allowedTopics = new Set<string>(ENTOMOLOGY_TOPIC_IDS);
const allowedTaxa = new Set<string>(ENTOMOLOGY_TAXON_IDS);
const allowedDemand = new Set<EntomologyCognitiveDemand>([
  "recall",
  "recognition",
  "distinction",
  "application",
  "multi-step",
]);
const questions = MOCK_ENTOMOLOGY_QUESTIONS;

check("bank has exactly 60 questions", questions.length === 60);

const ids = questions.map((question) => question.id);
check("question IDs are unique", new Set(ids).size === ids.length);
check(
  "IDs are ento-q1 through ento-q60 with no gaps",
  ids.join(",") ===
    Array.from({ length: 60 }, (_, index) => `ento-q${index + 1}`).join(","),
);

const prompts = questions.map((question) => question.prompt.trim());
check(
  "question prompts are unique",
  new Set(prompts).size === prompts.length,
);

const byTopic: Record<string, number> = {};
const byDifficulty = { 1: 0, 2: 0, 3: 0 };
const bySource: Record<string, number> = {};
const byVerification: Record<string, number> = {};
const taxaUsed = new Set<string>();
let imageRequiredCount = 0;
const correctLetter: Record<string, number> = { a: 0, b: 0, c: 0, d: 0 };

for (const question of questions) {
  check(`${question.id} uses event entomology`, question.eventId === ENTOMOLOGY_EVENT_ID);
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
  check(`${question.id} has exactly 4 choices`, question.choices.length === 4);

  const choiceIds = question.choices.map((choice) => choice.id);
  check(
    `${question.id} has unique choice IDs`,
    new Set(choiceIds).size === 4,
  );
  check(
    `${question.id} uses choice IDs a–d`,
    choiceIds.join("") === "abcd",
  );
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

  for (const choice of question.choices) {
    check(
      `${question.id} choice ${choice.id} has text`,
      choice.text.trim().length > 0,
    );
  }

  check(
    `${question.id} has taxonomy tags`,
    question.taxonomyTags.length > 0,
  );
  for (const tag of question.taxonomyTags) {
    check(`${question.id} taxon ${tag} is on the 2027 list`, allowedTaxa.has(tag));
    taxaUsed.add(tag);
  }

  check(
    `${question.id} has an allowed cognitiveDemand`,
    allowedDemand.has(question.cognitiveDemand),
  );
  check(
    `${question.id} has sourceType`,
    question.sourceType === "sample-derived" ||
      question.sourceType === "rules-derived" ||
      question.sourceType === "generated",
  );
  check(
    `${question.id} has a source note`,
    question.sourceNote.trim().length > 0,
  );
  check(
    `${question.id} has verificationStatus`,
    question.verificationStatus === "draft" ||
      question.verificationStatus === "needs-review" ||
      question.verificationStatus === "verified",
  );

  if (question.imageRequired) {
    imageRequiredCount += 1;
    check(
      `${question.id} image-required item has imageBrief`,
      question.imageBrief.trim().length > 0,
    );
    check(
      `${question.id} prompt marks the missing image`,
      question.prompt.includes("[IMAGE REQUIRED:"),
    );
  }

  byTopic[question.topicId] = (byTopic[question.topicId] ?? 0) + 1;
  byDifficulty[question.difficulty] += 1;
  bySource[question.sourceType] = (bySource[question.sourceType] ?? 0) + 1;
  byVerification[question.verificationStatus] =
    (byVerification[question.verificationStatus] ?? 0) + 1;
  correctLetter[question.correctChoiceId] =
    (correctLetter[question.correctChoiceId] ?? 0) + 1;
}

for (const topicId of ENTOMOLOGY_TOPIC_IDS) {
  check(`${topicId} has at least one question`, (byTopic[topicId] ?? 0) >= 1);
}

check(
  "difficulty mix is 24/24/12",
  byDifficulty[1] === 24 && byDifficulty[2] === 24 && byDifficulty[3] === 12,
);

check(
  "image-required count stays 9 (Phase 1 added none)",
  imageRequiredCount === 9,
);

check(
  "no sample-derived copies",
  (bySource["sample-derived"] ?? 0) === 0,
);

const phase1 = questions.filter((question) => {
  const number = Number(question.id.replace("ento-q", ""));
  return number >= 31 && number <= 60;
});

check("Phase 1 added 30 questions", phase1.length === 30);
check(
  "Phase 1 questions are not image-required",
  phase1.every((question) => question.imageRequired !== true),
);
check(
  "Phase 1 questions have no IMAGE REQUIRED prompt prefix",
  phase1.every((question) => !question.prompt.includes("[IMAGE REQUIRED:")),
);
check(
  "Phase 1 questions have sourceType",
  phase1.every(
    (question) =>
      question.sourceType === "rules-derived" ||
      question.sourceType === "generated",
  ),
);
check(
  "Phase 1 questions have source notes",
  phase1.every((question) => question.sourceNote.trim().length > 0),
);

const phase1Topics = new Set(phase1.map((question) => question.topicId));
check(
  "Phase 1 does not add visual-id items",
  !phase1Topics.has("visual-id"),
);

function assertImageBrief(question: EntomologyQuestion): void {
  if (question.imageRequired) {
    check(
      `${question.id} imageBrief present (narrowed)`,
      typeof question.imageBrief === "string",
    );
  }
}

for (const question of questions) {
  assertImageBrief(question);
}

if (failures.length > 0) {
  throw new Error(`Entomology bank checks failed:\n- ${failures.join("\n- ")}`);
}

const topicSummary = ENTOMOLOGY_TOPIC_IDS.map(
  (topicId) => `${topicId}:${byTopic[topicId] ?? 0}`,
).join(", ");

const sourceSummary = Object.entries(bySource)
  .map(([key, count]) => `${key}:${count}`)
  .join(", ");
const verificationSummary = Object.entries(byVerification)
  .map(([key, count]) => `${key}:${count}`)
  .join(", ");

console.log("Entomology question checks passed.");
console.log(
  [
    `questions=${ids.length}`,
    `topics={${topicSummary}}`,
    `difficulty 1/2/3=${byDifficulty[1]}/${byDifficulty[2]}/${byDifficulty[3]}`,
    `sourceType={${sourceSummary}}`,
    `verificationStatus={${verificationSummary}}`,
    `imageRequired=${imageRequiredCount}`,
    `taxaCovered=${[...taxaUsed].sort().join(",")}`,
    `correct a/b/c/d=${correctLetter.a}/${correctLetter.b}/${correctLetter.c}/${correctLetter.d}`,
  ].join("\n"),
);
