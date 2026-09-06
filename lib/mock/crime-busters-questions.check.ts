/**
 * Structural checks for the Crime Busters 2027 bank (cb-q1–cb-q44).
 * Run: npx tsx lib/mock/crime-busters-questions.check.ts
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  CRIME_BUSTERS_EVENT_ID,
  CRIME_BUSTERS_TOPIC_IDS,
  MOCK_CRIME_BUSTERS_QUESTIONS,
  type CrimeBustersCognitiveDemand,
  type CrimeBustersSourceType,
} from "@/lib/mock/crime-busters-questions";
import { optionalSecondHintIsValid } from "@/lib/practice";

const failures: string[] = [];

function check(name: string, ok: boolean) {
  if (!ok) {
    failures.push(name);
  }
}

const allowedTopics = new Set<string>(CRIME_BUSTERS_TOPIC_IDS);
const allowedDemand = new Set<CrimeBustersCognitiveDemand>([
  "recall",
  "recognition",
  "distinction",
  "application",
  "multi-step",
]);
const allowedSources = new Set<CrimeBustersSourceType>([
  "rules-derived",
  "nist",
  "fbi-handbook",
  "openstax",
  "doj-hair",
  "rhs-soil",
  "pubchem",
  "libretexts",
  "commons",
]);
const questions = MOCK_CRIME_BUSTERS_QUESTIONS;

check("bank has 44 questions", questions.length === 44);

const ids = questions.map((question) => question.id);
check("question IDs are unique", new Set(ids).size === ids.length);
check(
  "IDs are cb-q1 through cb-q44 with no gaps",
  ids.join(",") ===
    Array.from({ length: 44 }, (_, index) => `cb-q${index + 1}`).join(","),
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
    `${question.id} uses event crime-busters`,
    question.eventId === CRIME_BUSTERS_EVENT_ID,
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
  if (question.imageRequired) {
    check(
      `${question.id} has imageBrief`,
      question.imageBrief.trim().length > 0,
    );
    check(
      `${question.id} has a public crime-busters JPEG path`,
      question.imageSrc.startsWith("/crime-busters/") &&
        question.imageSrc.endsWith(".jpg"),
    );
    check(
      `${question.id} image file exists`,
      existsSync(join(process.cwd(), "public", question.imageSrc.slice(1))),
    );
    check(
      `${question.id} has image alt text`,
      question.imageAlt.trim().length > 0,
    );
    const leak = /loop|whorl|arch|tented|ulnar|radial|central pocket/i;
    check(
      `${question.id} image alt does not name the pattern family`,
      !leak.test(question.imageAlt),
    );
    check(
      `${question.id} image credit does not name the pattern family`,
      !leak.test(question.imageCredit ?? ""),
    );
  } else {
    check(`${question.id} is text-only`, question.imageRequired === false);
  }
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
      /^(E-CB-\d+|V-[PHFSWLG]\d+|V-W\d+|RS\d+|IM\d+(?:-[A-Z0-9]+)?)$/.test(
        evidenceId,
      ),
    );
  }

  const correctText =
    question.choices
      .find((choice) => choice.id === question.correctChoiceId)
      ?.text.toLowerCase() ?? "";
  check(
    `${question.id} does not key Central Pocket as a whorl family`,
    !(
      correctText.includes("central pocket") &&
      correctText.includes("whorl") &&
      !correctText.includes("loop")
    ),
  );

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

for (const topicId of CRIME_BUSTERS_TOPIC_IDS) {
  check(`${topicId} has at least one question`, (byTopic[topicId] ?? 0) >= 1);
}

check(
  "no items remain draft",
  questions.every((question) => question.verificationStatus !== "draft"),
);
const imageItems = questions.filter((question) => question.imageRequired);
check("text MVP remains q1–q40", questions.slice(0, 40).every((question) => question.imageRequired === false));
check("IM4 image slice is q41–q44", imageItems.length === 4 && imageItems.every((question) => {
  const number = Number(question.id.replace("cb-q", ""));
  return number >= 41 && number <= 44;
}));
check("safety topic is at most 3 items", (byTopic.safety ?? 0) <= 3);
check(
  "no q45+ items",
  questions.every((question) => {
    const number = Number(question.id.replace("cb-q", ""));
    return number >= 1 && number <= 44;
  }),
);

if (failures.length > 0) {
  throw new Error(
    `Crime Busters MVP bank checks failed:\n- ${failures.join("\n- ")}`,
  );
}

console.log(
  [
    "Crime Busters MVP bank checks passed.",
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
    `imageRequired=${imageItems.length}`,
  ].join(" "),
);
