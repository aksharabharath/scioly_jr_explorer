/**
 * Question understanding help: matching and validation guardrails.
 * Run: npx tsx lib/question-help.check.ts
 */
import {
  annotatePrompt,
  findTermOccurrences,
  glossaryEntryIssues,
  questionHelpIssues,
} from "@/lib/question-help";
import type { GlossaryEntry, Question } from "@/lib/types";

const failures: string[] = [];

function check(name: string, ok: boolean) {
  if (!ok) {
    failures.push(name);
  }
}

const glossary: GlossaryEntry[] = [
  {
    id: "temperate",
    term: "temperate",
    definition:
      "A place or climate that is usually not extremely hot or extremely cold.",
  },
  {
    id: "biome",
    term: "biome",
    definition: "A large area with similar weather, plants, and animals.",
  },
  {
    id: "temperate-grassland",
    term: "temperate grassland",
    definition: "A large grassy area in a mild climate.",
  },
];

function sampleQuestion(
  overrides: Partial<Question> & Pick<Question, "prompt">,
): Question {
  return {
    id: "sample",
    eventId: "ecology",
    topicId: "terrestrial-ecosystems",
    choices: [
      { id: "a", text: "Trees" },
      { id: "b", text: "Grasses" },
      { id: "c", text: "Kelp" },
      { id: "d", text: "Ice" },
    ],
    correctChoiceId: "b",
    explanation: "Prairies are dominated by grasses.",
    hint: "Think of open plains.",
    difficulty: 1,
    ...overrides,
  };
}

const prairiePrompt =
  "Temperate grasslands in central North America are also known as prairies. What dominates that biome?";

const basicSpans = annotatePrompt(
  prairiePrompt,
  [{ glossaryId: "temperate" }, { glossaryId: "biome" }],
  glossary,
);
check(
  "basic term matching annotates temperate and biome",
  basicSpans.filter((span) => span.type === "term").map((span) =>
    span.type === "term" ? span.entry.id : "",
  ).join(",") === "temperate,biome" &&
    basicSpans.some(
      (span) => span.type === "term" && span.text === "Temperate",
    ),
);

const caseSpans = annotatePrompt(
  "A BIOME is large.",
  [{ glossaryId: "biome" }],
  glossary,
);
check(
  "matching is case-insensitive",
  caseSpans.some(
    (span) => span.type === "term" && span.text === "BIOME",
  ),
);

const punctHits = findTermOccurrences("What dominates that biome?", "biome");
check(
  "matching allows trailing punctuation",
  punctHits.length === 1 && punctHits[0].end === "What dominates that biome".length,
);

const grasslandPrompt = "Temperate grassland covers the plains.";
const multiSpans = annotatePrompt(
  grasslandPrompt,
  [{ glossaryId: "temperate-grassland" }],
  glossary,
);
check(
  "multi-word terms match",
  multiSpans.some(
    (span) =>
      span.type === "term" &&
      span.text.toLowerCase() === "temperate grassland",
  ),
);

const overlapSpans = annotatePrompt(
  grasslandPrompt,
  [
    { glossaryId: "temperate" },
    { glossaryId: "temperate-grassland" },
  ],
  glossary,
);
const overlapTerms = overlapSpans.filter((span) => span.type === "term");
check(
  "longer overlapping terms win",
  overlapTerms.length === 1 &&
    overlapTerms[0].type === "term" &&
    overlapTerms[0].entry.id === "temperate-grassland",
);

const repeatPrompt = "A biome next to another biome.";
const secondBiome = annotatePrompt(
  repeatPrompt,
  [{ glossaryId: "biome", occurrence: 1 }],
  glossary,
);
check(
  "occurrence selects a later repeated term",
  secondBiome.filter((span) => span.type === "term").length === 1 &&
    secondBiome[0].type === "text" &&
    secondBiome[1].type === "term" &&
    secondBiome[1].text === "biome",
);

const missingSpans = annotatePrompt(
  "No matching science word here.",
  [{ glossaryId: "biome" }],
  glossary,
);
check(
  "missing terms stay unannotated",
  missingSpans.length === 1 &&
    missingSpans[0].type === "text" &&
    missingSpans[0].text === "No matching science word here.",
);

const original = prairiePrompt;
annotatePrompt(original, [{ glossaryId: "biome" }], glossary);
check("matching does not mutate the prompt", original === prairiePrompt);

const validPilot = sampleQuestion({
  id: "eco-q21",
  prompt: prairiePrompt,
  promptTerms: [{ glossaryId: "temperate" }, { glossaryId: "biome" }],
  wordingHelp:
    "This question is asking what is most common in this type of environment.",
});
check(
  "valid wordingHelp and glossary refs pass",
  questionHelpIssues(validPilot, glossary).length === 0,
);

check(
  "missing glossary ID fails",
  questionHelpIssues(
    sampleQuestion({
      prompt: prairiePrompt,
      promptTerms: [{ glossaryId: "missing" }],
    }),
    glossary,
  ).some((issue) => issue.includes("missing glossary")),
);

check(
  "glossary term absent from prompt fails",
  questionHelpIssues(
    sampleQuestion({
      prompt: "What lives in a forest?",
      promptTerms: [{ glossaryId: "biome" }],
    }),
    glossary,
  ).some((issue) => issue.includes("is not in the prompt")),
);

check(
  "too many annotations fail",
  questionHelpIssues(
    sampleQuestion({
      prompt: "biome biome biome biome biome",
      promptTerms: [
        { glossaryId: "biome", occurrence: 0 },
        { glossaryId: "biome", occurrence: 1 },
        { glossaryId: "biome", occurrence: 2 },
        { glossaryId: "biome", occurrence: 3 },
        { glossaryId: "biome", occurrence: 4 },
      ],
    }),
    glossary,
  ).some((issue) => issue.includes("more than 4")),
);

check(
  "wordingHelp matching explanation fails",
  questionHelpIssues(
    sampleQuestion({
      prompt: prairiePrompt,
      wordingHelp: "Prairies are dominated by grasses.",
    }),
    glossary,
  ).some((issue) => issue.includes("matches explanation")),
);

check(
  "wordingHelp matching hint fails",
  questionHelpIssues(
    sampleQuestion({
      prompt: prairiePrompt,
      wordingHelp: "Think of open plains.",
    }),
    glossary,
  ).some((issue) => issue.includes("matches hint")),
);

check(
  "wordingHelp matching hint2 fails",
  questionHelpIssues(
    sampleQuestion({
      prompt: prairiePrompt,
      hint2: "Apply the idea to this prairie.",
      wordingHelp: "Apply the idea to this prairie.",
    }),
    glossary,
  ).some((issue) => issue.includes("matches hint2")),
);

check(
  "wordingHelp containing the correct answer fails",
  questionHelpIssues(
    sampleQuestion({
      prompt: prairiePrompt,
      wordingHelp: "This question is asking whether grasses dominate.",
    }),
    glossary,
  ).some((issue) => issue.includes("correct choice")),
);

check(
  "wordingHelp with leak phrase fails",
  questionHelpIssues(
    sampleQuestion({
      prompt: prairiePrompt,
      wordingHelp: "Students should choose the best environment match here.",
    }),
    glossary,
  ).some((issue) => issue.includes('"choose"')),
);

check(
  "a definition that only repeats the term fails",
  glossaryEntryIssues({
    id: "biome",
    term: "biome",
    definition: "Biome",
  }).some((issue) => issue.includes("repeats the term")),
);

if (failures.length > 0) {
  throw new Error(`Question help checks failed:\n- ${failures.join("\n- ")}`);
}

console.log("Question help checks passed.");
