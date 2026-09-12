/**
 * Structural checks for the Entomology 2027 question bank (q1–q60).
 * Validates schema and invariants. Does not require all items to be verified.
 * Run: npx tsx lib/mock/entomology-questions.check.ts
 */
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  ENTOMOLOGY_EVENT_ID,
  ENTOMOLOGY_TAXON_IDS,
  ENTOMOLOGY_TOPIC_IDS,
  MOCK_ENTOMOLOGY_QUESTIONS,
  entomologyQuestionToPracticeQuestion,
  type EntomologyCognitiveDemand,
  type EntomologyQuestion,
} from "@/lib/mock/entomology-questions";
import { entomologyImageCredit } from "@/lib/mock/entomology-image-credits";
import { optionalSecondHintIsValid } from "@/lib/practice";

const IMAGE_ALT_SPOILERS = [
  "formicidae",
  "swallowtail",
  "papilionidae",
  "backswimmer",
  "notonectidae",
  "weevil",
  "curculionidae",
  "springtail",
  "collembola",
  "dytiscidae",
  "hydrophilidae",
  "crane fly",
  "tipulidae",
  "culicidae",
  "mosquito",
  "cerci",
  "natatorial",
  "earwig",
  "dermaptera",
  "ixodidae",
  "tick",
  "cicada",
  "cicadidae",
  "ladybug",
  "ladybird",
  "lady-bird",
  "coccinellidae",
  "mantid",
  "mantis",
  "mantodea",
  "yellowjacket",
  "vespidae",
  "treehopper",
  "membracidae",
  "bombyliidae",
  "bee fly",
  "honeybee",
  "honey bee",
];

const IMAGE_COMPANION_PHOTOS: Record<string, string[]> = {
  "ento-q6.jpg": ["ento-q6-photo.jpg"],
  "ento-q7.jpg": ["ento-q7-photo.jpg"],
  "ento-q8.jpg": ["ento-q8-photo.jpg"],
  "ento-q9.jpg": ["ento-q9-photo.jpg"],
  "ento-q10.jpg": ["ento-q10a-photo.jpg", "ento-q10b-photo.jpg"],
  "ento-q12.jpg": ["ento-q12a-photo.jpg", "ento-q12b-photo.jpg"],
  "ento-q13.jpg": ["ento-q13a-photo.jpg", "ento-q13b-photo.jpg"],
  "ento-q17.jpg": ["ento-q17-photo.jpg"],
  "ento-q24.jpg": ["ento-q24-photo.jpg"],
  "ento-q3.jpg": ["ento-q3-photo.jpg"],
  "ento-q5.jpg": ["ento-q5-photo.jpg"],
  "ento-q33.jpg": ["ento-q33-photo.jpg"],
  "ento-q35.jpg": ["ento-q35-photo.jpg"],
  "ento-q38.jpg": ["ento-q38-photo.jpg"],
  "ento-q40.jpg": ["ento-q40a-photo.jpg", "ento-q5-photo.jpg"],
  "ento-q41.jpg": ["ento-q41-photo.jpg"],
  "ento-q44.jpg": ["ento-q44-photo.jpg"],
};

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
  check(
    `${question.id} optional hint2 differs from hint when present`,
    optionalSecondHintIsValid(question),
  );
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
      `${question.id} prompt marks that an image belongs with the item`,
      question.prompt.includes("[IMAGE REQUIRED:"),
    );
    check(
      `${question.id} has a public image path`,
      question.imageSrc.startsWith("/entomology/") &&
        (question.imageSrc.endsWith(".jpg") || question.imageSrc.endsWith(".jpeg")),
    );
    check(
      `${question.id} has image alt text`,
      question.imageAlt.trim().length > 0,
    );
    check(
      `${question.id} image file exists`,
      existsSync(join(process.cwd(), "public", question.imageSrc.slice(1))),
    );
    const altLower = question.imageAlt.toLowerCase();
    const spoiler = IMAGE_ALT_SPOILERS.find((word) => altLower.includes(word));
    check(
      `${question.id} image alt does not name the taxon or the answer`,
      spoiler === undefined,
    );
    const practice = entomologyQuestionToPracticeQuestion(question);
    const credit = entomologyImageCredit(question.imageSrc);
    const fileName = question.imageSrc.slice("/entomology/".length);
    const attributionNotRequired = new Set([
      "ento-q7.jpg",
      "ento-q9.jpg",
      "ento-q17.jpg",
    ]);
    if (attributionNotRequired.has(fileName)) {
      check(
        `${question.id} public-domain or CC0 photo has no required student credit`,
        credit === undefined && practice.imageCredit === undefined,
      );
    } else {
      check(
        `${question.id} CC BY / CC BY-SA photo has a student credit`,
        typeof credit === "string" &&
          credit.trim().length > 0 &&
          practice.imageCredit === credit,
      );
      const creditLower = (credit ?? "").toLowerCase();
      const creditSpoiler = IMAGE_ALT_SPOILERS.find((word) =>
        creditLower.includes(word),
      );
      check(
        `${question.id} image credit does not name the taxon or the answer`,
        creditSpoiler === undefined,
      );
    }
    for (const photo of IMAGE_COMPANION_PHOTOS[fileName] ?? []) {
      check(
        `${question.id} companion photo ${photo} exists`,
        existsSync(join(process.cwd(), "public/entomology", photo)),
      );
    }
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
  "image-required count is 17",
  imageRequiredCount === 17,
);

const entomologyPublicDir = join(process.cwd(), "public/entomology");
const quizJpegNames = readdirSync(entomologyPublicDir).filter(
  (name) => name.endsWith(".jpg") && !name.includes("photo"),
);
const referencedQuizJpegNames = questions
  .filter((question) => question.imageRequired)
  .map((question) => question.imageSrc.slice("/entomology/".length));
check(
  "every quiz JPEG in public/entomology is referenced by the bank",
  quizJpegNames.every((name) => referencedQuizJpegNames.includes(name)),
);
check(
  "every imageSrc quiz JPEG is present as a non-photo file",
  referencedQuizJpegNames.every((name) => quizJpegNames.includes(name)),
);

check(
  "no sample-derived copies",
  (bySource["sample-derived"] ?? 0) === 0,
);

const phase1 = questions.filter((question) => {
  const number = Number(question.id.replace("ento-q", ""));
  return number >= 31 && number <= 60;
});

const phase1ImageIds = new Set([
  "ento-q33",
  "ento-q35",
  "ento-q38",
  "ento-q40",
  "ento-q41",
  "ento-q44",
]);
check("Phase 1 added 30 questions", phase1.length === 30);
check(
  "Phase 1 image-required items are the photographed set",
  phase1.filter((question) => question.imageRequired === true).every((question) =>
    phase1ImageIds.has(question.id),
  ) &&
    [...phase1ImageIds].every((id) =>
      phase1.some((question) => question.id === id && question.imageRequired === true),
    ),
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

check(
  "Phase 1 visual-id items are photographed",
  phase1
    .filter((question) => question.topicId === "visual-id")
    .every((question) => question.imageRequired === true),
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

const promptTermIds = questions
  .filter((question) => question.promptTerms)
  .map((question) => question.id);
check(
  "entomology promptTerms stay on the approved vocabulary set",
  promptTermIds.join(",") === "",
);
const wordingHelpIds = questions
  .filter((question) => question.wordingHelp)
  .map((question) => question.id);
check(
  "entomology wordingHelp stays on the approved explain set",
  wordingHelpIds.join(",") ===
    "ento-q3,ento-q17,ento-q19,ento-q20,ento-q39,ento-q49",
);

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
