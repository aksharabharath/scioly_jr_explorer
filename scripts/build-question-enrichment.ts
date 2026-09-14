import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import {
  anatomyPhysiologyQuestionToPracticeQuestion,
  MOCK_ANATOMY_PHYSIOLOGY_QUESTIONS,
} from "@/lib/mock/anatomy-physiology-questions";
import {
  codebustersQuestionToPracticeQuestion,
  MOCK_CODEBUSTERS_QUESTIONS,
} from "@/lib/mock/codebusters-questions";
import {
  crimeBustersQuestionToPracticeQuestion,
  MOCK_CRIME_BUSTERS_QUESTIONS,
} from "@/lib/mock/crime-busters-questions";
import {
  ecologyQuestionToPracticeQuestion,
  MOCK_ECOLOGY_QUESTIONS,
} from "@/lib/mock/ecology-questions";
import {
  entomologyQuestionToPracticeQuestion,
  MOCK_ENTOMOLOGY_QUESTIONS,
} from "@/lib/mock/entomology-questions";
import {
  MOCK_WATER_QUALITY_QUESTIONS,
  waterQualityQuestionToPracticeQuestion,
} from "@/lib/mock/water-quality-questions";
import type { Question } from "@/lib/types";

type EnrichmentRecord = {
  id: string;
  eventId: string;
  prompt: string;
  choices: Question["choices"];
  correctChoiceId: string;
  correctAnswer: string;
  existingExplanation: string;
  trickyWords: TrickyWord[];
  kidExplanation: string | null;
  whyCorrect: string | null;
  whyWrongChoices: Record<string, string>;
  qualityFlags: string[];
  needsHumanReview: boolean;
  status: "pending" | "generated" | "failed";
  error?: string;
};

type TrickyWord = {
  term: string;
  kidDefinition: string;
  whereFound: "question" | "answer_choice" | "explanation";
  importance: "must_know" | "helpful";
};

const QUALITY_FLAGS = new Set([
  "hard_words_in_question",
  "hard_words_in_answer_choices",
  "hard_words_added_by_explanation",
  "thin_explanation_repeats_answer",
  "explanation_too_advanced",
  "teacher_note_visible",
  "correct_answer_may_need_review",
  "distractor_too_confusing",
  "needs_visual_helper",
]);

const banks: Question[] = [
  ...MOCK_ENTOMOLOGY_QUESTIONS.map(entomologyQuestionToPracticeQuestion),
  ...MOCK_ANATOMY_PHYSIOLOGY_QUESTIONS.map(
    anatomyPhysiologyQuestionToPracticeQuestion,
  ),
  ...MOCK_ECOLOGY_QUESTIONS.map(ecologyQuestionToPracticeQuestion),
  ...MOCK_WATER_QUALITY_QUESTIONS.map(waterQualityQuestionToPracticeQuestion),
  ...MOCK_CRIME_BUSTERS_QUESTIONS.map(crimeBustersQuestionToPracticeQuestion),
  ...MOCK_CODEBUSTERS_QUESTIONS.map(codebustersQuestionToPracticeQuestion),
];

function argumentValue(name: string): string | undefined {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

const outputPath = argumentValue("--output") ?? "artifacts/question-enrichment.json";
const mode = argumentValue("--mode") ?? "mock";
const endpoint =
  process.env.JR_EXPLORER_LLM_ENDPOINT ??
  "https://api.openai.com/v1/chat/completions";
const apiKey = process.env.JR_EXPLORER_LLM_API_KEY;
const model = process.env.JR_EXPLORER_LLM_MODEL;

if (mode !== "mock" && mode !== "llm") {
  throw new Error(`Unsupported mode "${mode}". Use --mode mock or --mode llm.`);
}
if (mode === "llm" && (!apiKey || !model)) {
  throw new Error(
    "LLM mode requires JR_EXPLORER_LLM_API_KEY and JR_EXPLORER_LLM_MODEL.",
  );
}

const seenIds = new Set<string>();
for (const question of banks) {
  if (seenIds.has(question.id)) {
    throw new Error(`Duplicate canonical question ID: ${question.id}`);
  }
  seenIds.add(question.id);
}

function baseRecord(question: Question): EnrichmentRecord {
  const choice = question.choices.find(
    (item) => item.id === question.correctChoiceId,
  );
  return {
    id: question.id,
    eventId: question.eventId,
    prompt: question.prompt,
    choices: question.choices,
    correctChoiceId: question.correctChoiceId,
    correctAnswer: choice?.text ?? question.correctChoiceId,
    existingExplanation: question.explanation,
    trickyWords: [],
    kidExplanation: null,
    whyCorrect: null,
    whyWrongChoices: {},
    qualityFlags: [],
    needsHumanReview: true,
    status: "pending",
  };
}

function readExistingRecords(path: string): Map<string, EnrichmentRecord> {
  if (!existsSync(path)) {
    return new Map();
  }
  const parsed = JSON.parse(readFileSync(path, "utf8")) as {
    records?: EnrichmentRecord[];
  };
  const records = parsed.records ?? [];
  const knownIds = new Set(banks.map((question) => question.id));
  const byId = new Map<string, EnrichmentRecord>();
  for (const record of records) {
    const legacyId = (record as EnrichmentRecord & { questionId?: unknown })
      .questionId;
    const id =
      typeof record.id === "string"
        ? record.id
        : typeof legacyId === "string"
          ? legacyId
          : undefined;
    if (!id || !knownIds.has(id)) {
      throw new Error(`Existing artifact has unknown question ID: ${id}`);
    }
    if (byId.has(id)) {
      throw new Error(`Existing artifact has duplicate question ID: ${id}`);
    }
    byId.set(id, { ...record, id });
  }
  return byId;
}

function writeArtifact(path: string, records: EnrichmentRecord[]) {
  const ids = records.map((record) => record.id);
  if (new Set(ids).size !== banks.length || ids.some((id) => !seenIds.has(id))) {
    throw new Error("Artifact IDs do not exactly match the canonical question IDs.");
  }
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(
    path,
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        source: "lib/mock/*-questions.ts",
        mode,
        records,
      },
      null,
      2,
    )}\n`,
  );
}

function generationPrompt(question: EnrichmentRecord): string {
  return `Write an explanation package for a fourth-grade learner who is taking
the quiz independently. Inspect the question, every answer choice, the correct
answer, and the existing explanation before writing.

The student-facing kidExplanation must be 1-3 short, natural sentences (4 only
when genuinely needed). Teach the missing idea, explain why the correct answer
fits, define only important difficult words, and optionally contrast a plausible
wrong choice. Do not merely repeat the answer. Do not expose source notes,
uncertainty, editorial comments, or answer-key review. Never invent facts,
change the correct answer, or introduce harder terminology than necessary.

Return JSON only in this shape:
{
  "trickyWords": [
    {
      "term": "word",
      "kidDefinition": "Simple elementary definition.",
      "whereFound": "question",
      "importance": "must_know"
    }
  ],
  "kidExplanation": "Clean student-facing explanation.",
  "whyCorrect": "Short author-side reasoning.",
  "whyWrongChoices": {"choice-id": "Mismatch explanation for a plausible distractor."},
  "qualityFlags": [],
  "needsHumanReview": false
}

Only include genuinely important vocabulary in trickyWords. Use whereFound as
question, answer_choice, or explanation; use importance as must_know or helpful.
Only explain wrong choices that are plausible and conceptually related. Use only
these quality flags:
${[...QUALITY_FLAGS].join(", ")}

Question:
${question.prompt}

Answer choices:
${JSON.stringify(question.choices)}

Correct answer:
${question.correctAnswer}

Existing explanation:
${question.existingExplanation}`;
}

async function generateWithLlm(
  question: EnrichmentRecord,
): Promise<
  Pick<
    EnrichmentRecord,
    | "trickyWords"
    | "kidExplanation"
    | "whyCorrect"
    | "whyWrongChoices"
    | "qualityFlags"
    | "needsHumanReview"
  >
> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "You are a careful elementary science editor. Never expose source notes or invent facts.",
        },
        { role: "user", content: generationPrompt(question) },
      ],
    }),
  });
  if (!response.ok) {
    throw new Error(`LLM request failed with HTTP ${response.status}`);
  }
  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = payload.choices?.[0]?.message?.content?.trim();
  if (!content) {
    throw new Error("LLM response did not contain message content.");
  }
  const parsed = JSON.parse(content.replace(/^```json\s*|\s*```$/g, ""));
  const kidExplanation =
    typeof parsed.kidExplanation === "string"
      ? parsed.kidExplanation.trim()
      : "";
  if (!kidExplanation) {
    throw new Error("LLM response contained an empty kidExplanation.");
  }
  if (typeof parsed.whyCorrect !== "string" || !parsed.whyCorrect.trim()) {
    throw new Error("LLM response contained an empty whyCorrect.");
  }
  const trickyWords = Array.isArray(parsed.trickyWords)
    ? parsed.trickyWords.filter(
        (word: unknown): word is TrickyWord =>
          typeof word === "object" &&
          word !== null &&
          typeof (word as TrickyWord).term === "string" &&
          typeof (word as TrickyWord).kidDefinition === "string" &&
          ["question", "answer_choice", "explanation"].includes(
            (word as TrickyWord).whereFound,
          ) &&
          ["must_know", "helpful"].includes(
            (word as TrickyWord).importance,
          ),
      )
    : [];
  const whyWrongChoices =
    parsed.whyWrongChoices &&
    typeof parsed.whyWrongChoices === "object" &&
    !Array.isArray(parsed.whyWrongChoices)
      ? Object.entries(parsed.whyWrongChoices).reduce<Record<string, string>>(
          (result, [choiceId, explanation]) => {
            if (typeof explanation === "string" && explanation.trim()) {
              result[choiceId] = explanation.trim();
            }
            return result;
          },
          {},
        )
      : {};
  const qualityFlags = Array.isArray(parsed.qualityFlags)
    ? parsed.qualityFlags.filter(
        (flag: unknown): flag is string =>
          typeof flag === "string" && QUALITY_FLAGS.has(flag),
      )
    : [];
  return {
    trickyWords,
    kidExplanation,
    whyCorrect: parsed.whyCorrect.trim(),
    whyWrongChoices,
    qualityFlags,
    needsHumanReview:
      parsed.needsHumanReview === true ||
      qualityFlags.includes("correct_answer_may_need_review"),
  };
}

async function main() {
  const resolvedOutputPath = resolve(outputPath);
  const existing = readExistingRecords(resolvedOutputPath);
  const records = banks.map((question) => {
    const previous = existing.get(question.id);
    return previous?.kidExplanation
      ? { ...baseRecord(question), ...previous, status: "generated" as const }
      : baseRecord(question);
  });

  writeArtifact(resolvedOutputPath, records);
  if (mode === "mock") {
    console.log(
      `Mock mode wrote ${records.length} pending records; no explanations were generated.`,
    );
    return;
  }

  for (const [index, question] of banks.entries()) {
    const record = records[index];
    if (record.status === "generated" && record.kidExplanation) {
      continue;
    }
    try {
      Object.assign(record, await generateWithLlm(record), {
        status: "generated",
        error: undefined,
      });
    } catch (error) {
      Object.assign(record, {
        kidExplanation: null,
        qualityFlags: [],
        needsHumanReview: true,
        status: "failed",
        error: error instanceof Error ? error.message : String(error),
      });
    }
    writeArtifact(resolvedOutputPath, records);
    console.log(`Processed ${index + 1}/${banks.length}: ${record.id}`);
  }
}

void main();
