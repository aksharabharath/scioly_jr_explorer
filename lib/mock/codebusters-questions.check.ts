/**
 * Structural checks for the initial Codebusters 2027 bank (cbus-q1–cbus-q40).
 * Run: npx tsx lib/mock/codebusters-questions.check.ts
 */
import {
  CODEBUSTERS_EVENT_ID,
  CODEBUSTERS_TOPIC_IDS,
  MOCK_CODEBUSTERS_QUESTIONS,
  type CodebustersCognitiveDemand,
} from "@/lib/mock/codebusters-questions";

const failures: string[] = [];

function check(name: string, ok: boolean) {
  if (!ok) {
    failures.push(name);
  }
}

const allowedTopics = new Set<string>(CODEBUSTERS_TOPIC_IDS);
const allowedDemand = new Set<CodebustersCognitiveDemand>([
  "recall",
  "recognition",
  "distinction",
  "application",
  "multi-step",
]);
const questions = MOCK_CODEBUSTERS_QUESTIONS;

check("bank has exactly 40 questions", questions.length === 40);

const ids = questions.map((question) => question.id);
check("question IDs are unique", new Set(ids).size === ids.length);
check(
  "IDs are cbus-q1 through cbus-q40 with no gaps",
  ids.join(",") ===
    Array.from({ length: 40 }, (_, index) => `cbus-q${index + 1}`).join(","),
);

const prompts = questions.map((question) => question.prompt.trim());
check("question prompts are unique", new Set(prompts).size === prompts.length);

const expectedAnswers: Record<string, string> = {
  "cbus-q3": "D",
  "cbus-q4": "PAT",
  "cbus-q7": "WARM",
  "cbus-q10": "K E Y K E Y K E",
  "cbus-q13": "ONQ",
  "cbus-q18": "MEET AT NOON",
  "cbus-q19": "YXW",
  "cbus-q23": "7",
  "cbus-q24": "5",
  "cbus-q26": "3",
  "cbus-q27": "4",
  "cbus-q29": "FDW",
  "cbus-q30": "CAT",
  "cbus-q31": "AB",
  "cbus-q35": "XLWV",
  "cbus-q36": "CODE",
  "cbus-q40": "5",
};

const byTopic: Record<string, number> = {};
const byDifficulty = { 1: 0, 2: 0, 3: 0 };
const byDemand: Record<string, number> = {};
const correctLetter: Record<string, number> = { a: 0, b: 0, c: 0, d: 0 };

for (const question of questions) {
  check(
    `${question.id} uses event codebusters`,
    question.eventId === CODEBUSTERS_EVENT_ID,
  );
  check(
    `${question.id} has a valid topicId`,
    allowedTopics.has(question.topicId),
  );
  check(`${question.id} has a non-empty prompt`, question.prompt.trim().length > 0);
  check(`${question.id} has a non-empty hint`, question.hint.trim().length > 0);
  check(
    `${question.id} has a non-empty explanation`,
    question.explanation.trim().length > 0,
  );
  check(`${question.id} has exactly 4 choices`, question.choices.length === 4);
  check(`${question.id} is text-only`, question.imageRequired === false);

  const choiceIds = question.choices.map((choice) => choice.id);
  check(
    `${question.id} uses choice IDs a–d`,
    choiceIds.join("") === "abcd",
  );
  check(
    `${question.id} has unique choice IDs`,
    new Set(choiceIds).size === 4,
  );
  check(
    `${question.id} has exactly one correct choice`,
    choiceIds.filter((id) => id === question.correctChoiceId).length === 1,
  );
  check(
    `${question.id} has unique choice text`,
    new Set(question.choices.map((choice) => choice.text.trim())).size === 4,
  );
  check(
    `${question.id} difficulty is 1, 2, or 3`,
    question.difficulty === 1 ||
      question.difficulty === 2 ||
      question.difficulty === 3,
  );
  check(
    `${question.id} has an allowed cognitiveDemand`,
    allowedDemand.has(question.cognitiveDemand),
  );
  check(
    `${question.id} uses the rules source`,
    question.sourceType === "rules-derived",
  );
  check(
    `${question.id} has a Codebusters rules evidence ID`,
    question.evidenceIds.length > 0 &&
      question.evidenceIds.every((id) => /^CB-RULES-/.test(id)),
  );
  check(
    `${question.id} is verified`,
    question.verificationStatus === "verified",
  );

  const correctText =
    question.choices.find((choice) => choice.id === question.correctChoiceId)
      ?.text ?? "";
  if (expectedAnswers[question.id]) {
    check(
      `${question.id} keeps its independently checked answer`,
      correctText.includes(expectedAnswers[question.id]),
    );
  }

  byTopic[question.topicId] = (byTopic[question.topicId] ?? 0) + 1;
  byDifficulty[question.difficulty] += 1;
  byDemand[question.cognitiveDemand] =
    (byDemand[question.cognitiveDemand] ?? 0) + 1;
  correctLetter[question.correctChoiceId] =
    (correctLetter[question.correctChoiceId] ?? 0) + 1;
}

for (const topicId of CODEBUSTERS_TOPIC_IDS) {
  check(`${topicId} has at least one question`, (byTopic[topicId] ?? 0) > 0);
}

if (failures.length > 0) {
  throw new Error(`Codebusters checks failed:\n- ${failures.join("\n- ")}`);
}

console.log(
  [
    "Codebusters checks passed.",
    `count=${questions.length}`,
    `difficulty={1:${byDifficulty[1]},2:${byDifficulty[2]},3:${byDifficulty[3]}}`,
    `demand={${Object.entries(byDemand)
      .map(([key, value]) => `${key}:${value}`)
      .join(",")}}`,
    `topics={${Object.entries(byTopic)
      .map(([key, value]) => `${key}:${value}`)
      .join(",")}}`,
    `correct={a:${correctLetter.a},b:${correctLetter.b},c:${correctLetter.c},d:${correctLetter.d}}`,
  ].join(" "),
);
