/**
 * Structural checks for the Astronomy mock question bank.
 * Run: npx tsx lib/mock/astronomy-questions.check.ts
 */
import { MOCK_ASTRONOMY_QUESTIONS } from "@/lib/mock/astronomy-questions";
import { MOCK_ASTRONOMY_TOPICS } from "@/lib/mock/astronomy";

const failures: string[] = [];

function check(name: string, ok: boolean) {
  if (!ok) {
    failures.push(name);
  }
}

const topicIds = new Set(MOCK_ASTRONOMY_TOPICS.map((topic) => topic.id));
const ids = MOCK_ASTRONOMY_QUESTIONS.map((question) => question.id);
const uniqueIds = new Set(ids);

check("bank has 40–50 questions", ids.length >= 40 && ids.length <= 50);
check("question IDs are unique", uniqueIds.size === ids.length);

const byTopic: Record<string, number> = {};
const difficulty = { 1: 0, 2: 0, 3: 0 };
const correctLetter: Record<string, number> = { a: 0, b: 0, c: 0, d: 0 };
const difficultiesByTopic: Record<string, Set<number>> = {};

for (const question of MOCK_ASTRONOMY_QUESTIONS) {
  check(
    `${question.id} uses event astronomy`,
    question.eventId === "astronomy",
  );
  check(
    `${question.id} references a valid topic`,
    topicIds.has(question.topicId),
  );
  check(`${question.id} has 4 choices`, question.choices.length === 4);

  const choiceIds = question.choices.map((choice) => choice.id);
  check(
    `${question.id} has unique choice IDs`,
    new Set(choiceIds).size === choiceIds.length,
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
  check(`${question.id} has a prompt`, question.prompt.trim().length > 0);
  check(`${question.id} has a hint`, question.hint.trim().length > 0);
  check(
    `${question.id} has an explanation`,
    question.explanation.trim().length > 0,
  );

  byTopic[question.topicId] = (byTopic[question.topicId] ?? 0) + 1;
  difficulty[question.difficulty] += 1;
  correctLetter[question.correctChoiceId] =
    (correctLetter[question.correctChoiceId] ?? 0) + 1;
  difficultiesByTopic[question.topicId] ??= new Set();
  difficultiesByTopic[question.topicId].add(question.difficulty);
}

for (const topic of MOCK_ASTRONOMY_TOPICS) {
  const count = byTopic[topic.id] ?? 0;
  check(`${topic.id} has at least 8 questions`, count >= 8);
  check(
    `${topic.id} has more than one difficulty`,
    (difficultiesByTopic[topic.id]?.size ?? 0) >= 2,
  );
}

const letterCounts = Object.values(correctLetter);
const maxLetter = Math.max(...letterCounts);
const minLetter = Math.min(...letterCounts);
check(
  "correct answers are not piled on one letter",
  maxLetter - minLetter <= 8,
);

if (failures.length > 0) {
  throw new Error(`Question bank checks failed:\n- ${failures.join("\n- ")}`);
}

const topicSummary = MOCK_ASTRONOMY_TOPICS.map(
  (topic) => `${topic.id}:${byTopic[topic.id] ?? 0}`,
).join(", ");

console.log(
  [
    `questions=${ids.length}`,
    `topics=${topicSummary}`,
    `difficulty 1/2/3=${difficulty[1]}/${difficulty[2]}/${difficulty[3]}`,
    `correct a/b/c/d=${correctLetter.a}/${correctLetter.b}/${correctLetter.c}/${correctLetter.d}`,
  ].join(" | "),
);
