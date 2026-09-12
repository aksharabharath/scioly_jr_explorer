/**
 * Water Quality 2027 MVP question bank — wq-q1–wq-q40.
 *
 * Text-only. QA pass: list/USGS items may be verified. Facts are limited to
 * T1-RULES and inspected USGS quotes in
 * docs/events/water_quality/EVIDENCE_MATRIX_2027.md.
 */
import { optionalSecondHintFields } from "@/lib/practice";
import { optionalQuestionHelpFields } from "@/lib/question-help";
import type {
  DifficultyLevel,
  PromptTermRef,
  Question,
  QuestionVerificationStatus,
} from "@/lib/types";

export const WATER_QUALITY_EVENT_ID = "water-quality";

export const WATER_QUALITY_TOPIC_IDS = [
  "indicator-classes",
  "macroinvertebrates",
  "nuisance-species",
  "water-monitoring",
] as const;

export type WaterQualityTopicId = (typeof WATER_QUALITY_TOPIC_IDS)[number];

export type WaterQualityCognitiveDemand =
  | "recall"
  | "recognition"
  | "distinction"
  | "application"
  | "multi-step";

export type WaterQualitySourceType = "rules-derived" | "usgs-water-science-school";

export type WaterQualityQuestion = Question & {
  topicId: WaterQualityTopicId;
  cognitiveDemand: WaterQualityCognitiveDemand;
  sourceType: WaterQualitySourceType;
  sourceNote: string;
  evidenceIds: string[];
  verificationStatus: QuestionVerificationStatus;
  imageRequired: false;
};

const EVENT_ID = WATER_QUALITY_EVENT_ID;

function wq(input: {
  id: string;
  topicId: WaterQualityTopicId;
  difficulty: DifficultyLevel;
  prompt: string;
  choiceTexts: [string, string, string, string];
  correctChoiceId: "a" | "b" | "c" | "d";
  hint: string;
  hint2?: string;
  promptTerms?: PromptTermRef[];
  wordingHelp?: string;
  explanation: string;
  cognitiveDemand: WaterQualityCognitiveDemand;
  sourceType: WaterQualitySourceType;
  sourceNote: string;
  evidenceIds: string[];
  verificationStatus: QuestionVerificationStatus;
}): WaterQualityQuestion {
  return {
    id: input.id,
    eventId: EVENT_ID,
    topicId: input.topicId,
    prompt: input.prompt,
    difficulty: input.difficulty,
    choices: [
      { id: "a", text: input.choiceTexts[0] },
      { id: "b", text: input.choiceTexts[1] },
      { id: "c", text: input.choiceTexts[2] },
      { id: "d", text: input.choiceTexts[3] },
    ],
    correctChoiceId: input.correctChoiceId,
    hint: input.hint,
    ...optionalSecondHintFields(input.hint2),
    ...optionalQuestionHelpFields(input),
    explanation: input.explanation,
    cognitiveDemand: input.cognitiveDemand,
    sourceType: input.sourceType,
    sourceNote: input.sourceNote,
    evidenceIds: input.evidenceIds,
    verificationStatus: input.verificationStatus,
    imageRequired: false,
  };
}

export const MOCK_WATER_QUALITY_QUESTIONS: WaterQualityQuestion[] = [
  wq({
    id: "wq-q1",
    topicId: "indicator-classes",
    difficulty: 1,
    prompt:
      "On the 2027 adult-macroinvertebrate table, what is the title of Class 1?",
    choiceTexts: [
      "Class 1 - Moderately Tolerant",
      "Class 1 - Pollution Sensitive",
      "Class 1 - Air Breathing",
      "Class 1 - Pollution Tolerant",
    ],
    correctChoiceId: "b",
    promptTerms: [{ glossaryId: "macroinvertebrate" }],
    hint: "Find the relevant table entry or heading in the official reference, then compare its wording with all four choices.",
    explanation:
      "The table heading is Class 1 - Pollution Sensitive. Moderately Tolerant is Class 3; Pollution Tolerant is Class 4; Air Breathing is Class 5.",
    cognitiveDemand: "recall",
    sourceType: "rules-derived",
    sourceNote: "RULES_2027.md table header; EVIDENCE_MATRIX_2027.md V-C1.",
    evidenceIds: ["V-C1"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q2",
    topicId: "indicator-classes",
    difficulty: 1,
    prompt:
      "On the 2027 table, what is the title of Class 5?",
    choiceTexts: [
      "Class 5 - Pollution Sensitive",
      "Class 5 - Moderately Sensitive",
      "Class 5 - Pollution Tolerant",
      "Class 5 - Air Breathing",
    ],
    correctChoiceId: "d",
    hint: "Use the official table to locate the relevant heading, then compare its printed wording with the choices.",
    explanation:
      "Class 5 is printed as Air Breathing. Pollution Sensitive is Class 1; Moderately Sensitive is Class 2; Pollution Tolerant is Class 4.",
    cognitiveDemand: "recognition",
    sourceType: "rules-derived",
    sourceNote: "RULES_2027.md table header; V-C5.",
    evidenceIds: ["V-C5"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q3",
    topicId: "indicator-classes",
    difficulty: 1,
    prompt:
      "On the 2027 indicator table, what is the title of Class 3?",
    choiceTexts: [
      "Class 3 - Moderately Tolerant",
      "Class 3 - Pollution Sensitive",
      "Class 3 - Air Breathing",
      "Class 3 - Moderately Sensitive",
    ],
    correctChoiceId: "a",
    hint: "Find the relevant table heading in the official reference, then compare that wording with all four choices.",
    explanation:
      "Class 3 - Moderately Tolerant is the official heading. Moderately Sensitive is Class 2; Pollution Sensitive is Class 1; Air Breathing is Class 5.",
    cognitiveDemand: "recall",
    sourceType: "rules-derived",
    sourceNote: "RULES_2027.md table header; V-C3.",
    evidenceIds: ["V-C3"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q4",
    topicId: "indicator-classes",
    difficulty: 2,
    prompt:
      "On the 2027 table, what is the title of Class 2?",
    choiceTexts: [
      "Class 2 - Pollution Sensitive",
      "Class 2 - Pollution Tolerant",
      "Class 2 - Moderately Sensitive",
      "Class 2 - Air Breathing",
    ],
    correctChoiceId: "c",
    hint: "Use the official table’s printed headings, then compare the relevant heading with every choice.",
    explanation:
      "Class 2 - Moderately Sensitive is official. Pollution Sensitive is Class 1; Pollution Tolerant is Class 4; Air Breathing is Class 5.",
    cognitiveDemand: "distinction",
    sourceType: "rules-derived",
    sourceNote: "RULES_2027.md table header; V-C2.",
    evidenceIds: ["V-C2"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q5",
    topicId: "indicator-classes",
    difficulty: 1,
    prompt:
      "On the 2027 list, which class includes Mayfly?",
    choiceTexts: [
      "Class 4 - Pollution Tolerant",
      "Class 1 - Pollution Sensitive",
      "Class 5 - Air Breathing",
      "Class 3 - Moderately Tolerant",
    ],
    correctChoiceId: "b",
    hint: "Find Mayfly on the adult-macroinvertebrate table and read the heading above it.",
    explanation:
      "Mayfly is a Class 1 - Pollution Sensitive name. It is not printed under Class 3, Class 4, or Class 5.",
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote: "RULES_2027.md table; V-M01, V-C1.",
    evidenceIds: ["V-M01", "V-C1"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q6",
    topicId: "indicator-classes",
    difficulty: 2,
    prompt:
      "Which of these 2027 listed names is not in Class 1 - Pollution Sensitive?",
    choiceTexts: [
      "Mayfly",
      "Caddisfly",
      "Stonefly",
      "Mosquito",
    ],
    correctChoiceId: "d",
    hint: "Find each name in the official table, then compare its listed classification with the class named in the question.",
    explanation:
      "Mayfly, Caddisfly, and Stonefly are Class 1. Mosquito is printed under Class 5 - Air Breathing.",
    cognitiveDemand: "distinction",
    sourceType: "rules-derived",
    sourceNote: "RULES_2027.md table; V-M01, V-M02, V-M03, V-M20.",
    evidenceIds: ["V-M01", "V-M02", "V-M03", "V-M20"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q7",
    topicId: "indicator-classes",
    difficulty: 2,
    prompt:
      "The 2027 table prints the common name Damsefly. Which class heading sits above that name?",
    choiceTexts: [
      "Class 2 - Moderately Sensitive",
      "Class 1 - Pollution Sensitive",
      "Class 5 - Air Breathing",
      "Class 4 - Pollution Tolerant",
    ],
    correctChoiceId: "a",
    hint: "Use the exact printed spelling. Find that name on the table and read its column heading.",
    explanation:
      "Damsefly is printed under Class 2 - Moderately Sensitive, with Aquatic Sowbug, Dragonfly, and Cranefly.",
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote: "RULES_2027.md table (official spelling Damsefly); V-M08, V-C2.",
    evidenceIds: ["V-M08", "V-C2"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q8",
    topicId: "indicator-classes",
    difficulty: 2,
    prompt:
      "On the 2027 table, which class includes Air Breathing Snail?",
    choiceTexts: [
      "Class 5 - Air Breathing",
      "Class 1 - Pollution Sensitive",
      "Class 4 - Pollution Tolerant",
      "Class 2 - Moderately Sensitive",
    ],
    correctChoiceId: "c",
    hint: "Locate the named organism in the official table, then compare its printed classification with the choices.",
    explanation:
      "Air Breathing Snail is a Class 4 - Pollution Tolerant name. Class 5 - Air Breathing is a different column (Whirligig Beetle, Mosquito, Giant Water Bug, Backswimmer, Water Boatman, Predacious Diving Beetle).",
    cognitiveDemand: "distinction",
    sourceType: "rules-derived",
    sourceNote: "RULES_2027.md table; V-M15, V-C4. Does not interpret air-breathing biology.",
    evidenceIds: ["V-M15", "V-C4"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q9",
    topicId: "indicator-classes",
    difficulty: 3,
    prompt:
      "Follow this key from the top. It uses only 2027 table class headings and names.\n\n1a. Listed under Class 1 - Pollution Sensitive → go to 2\n1b. Not listed under Class 1 → not keyed here\n2a. Listed name is Stonefly → Stonefly\n2b. Listed name is Mayfly → Mayfly\n\nThe specimen’s listed name is Stonefly. Which name do you reach?",
    choiceTexts: [
      "Mayfly",
      "Stonefly",
      "not keyed here",
      "Mosquito",
    ],
    correctChoiceId: "b",
    wordingHelp:
      "This question is asking which name you land on if you start at the top of the key and follow the specimen’s listed name.",
    hint: "Start at couplet 1 using the Class 1 column, then read couplet 2’s printed names.",
    explanation:
      "Stonefly is a Class 1 name, so 1a applies. Couplet 2a matches the printed name Stonefly. Mosquito is Class 5, so 1b would exclude it. Mayfly would require 2b.",
    cognitiveDemand: "multi-step",
    sourceType: "rules-derived",
    sourceNote: "Name-only key from V-M03, V-M01, V-C1; Mosquito V-M20 as a Class 5 contrast.",
    evidenceIds: ["V-M03", "V-M01", "V-C1", "V-M20"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q10",
    topicId: "indicator-classes",
    difficulty: 3,
    prompt:
      "The 2027 rules say the test will cover three named topics. Which set is that official trio?",
    choiceTexts: [
      "Freshwater Ecology; Freshwater Macroinvertebrates; Water Monitoring and Analysis",
      "Freshwater Ecology; Marine Ecology; Water Monitoring and Analysis",
      "Freshwater Macroinvertebrates; Entomology List; Water Monitoring and Analysis",
      "Potable water treatment; Waste water treatment; Harmful species",
    ],
    correctChoiceId: "a",
    hint: "Find the official topic headings in the rules, then compare the complete sets of words with the choices.",
    explanation:
      "The rules name Freshwater Ecology, Freshwater Macroinvertebrates, and Water Monitoring and Analysis as the three topics the test will cover. Marine Ecology and Entomology List are not those headings. Potable water treatment, waste water treatment, and harmful species are ecology “areas such as” example phrases, not the three topic titles.",
    cognitiveDemand: "distinction",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027.md three topic headings (RS2 notes headings are SOURCE-VERIFIED as strings). RS18 used only to show choice D is the open ecology example list, not the trio.",
    evidenceIds: ["RS2", "RS18"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q11",
    topicId: "macroinvertebrates",
    difficulty: 1,
    prompt:
      "On the 2027 table, which class includes Predacious Diving Beetle?",
    choiceTexts: [
      "Class 1 - Pollution Sensitive",
      "Class 2 - Moderately Sensitive",
      "Class 4 - Pollution Tolerant",
      "Class 5 - Air Breathing",
    ],
    correctChoiceId: "d",
    hint: "Use the official spelling Predacious. Find that name on the table and read its column heading.",
    explanation:
      "Predacious Diving Beetle is printed under Class 5 - Air Breathing.",
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote: "RULES_2027.md table; V-M24, V-C5.",
    evidenceIds: ["V-M24", "V-C5"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q12",
    topicId: "macroinvertebrates",
    difficulty: 2,
    prompt:
      "Which of these 2027 table names is in Class 2 - Moderately Sensitive?",
    choiceTexts: [
      "Dobsonfly",
      "Aquatic Sowbug",
      "Tubifex",
      "Whirligig Beetle",
    ],
    correctChoiceId: "b",
    hint: "Locate each printed name in the official table, then compare the classification shown beside it with the question.",
    explanation:
      "Aquatic Sowbug is Class 2. Dobsonfly is Class 1; Tubifex is Class 4; Whirligig Beetle is Class 5.",
    cognitiveDemand: "distinction",
    sourceType: "rules-derived",
    sourceNote: "V-M07 vs V-M04, V-M17, V-M19.",
    evidenceIds: ["V-M07", "V-M04", "V-M17", "V-M19"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q13",
    topicId: "macroinvertebrates",
    difficulty: 1,
    prompt:
      "On the 2027 table, which class includes Tubifex?",
    choiceTexts: [
      "Class 1 - Pollution Sensitive",
      "Class 3 - Moderately Tolerant",
      "Class 4 - Pollution Tolerant",
      "Class 5 - Air Breathing",
    ],
    correctChoiceId: "c",
    hint: "Find Tubifex on the table and read the heading above it.",
    explanation:
      "Tubifex is Class 4 - Pollution Tolerant.",
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote: "V-M17, V-C4.",
    evidenceIds: ["V-M17", "V-C4"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q14",
    topicId: "macroinvertebrates",
    difficulty: 2,
    prompt:
      "Which listed adult-macroinvertebrate name is in Class 5 - Air Breathing?",
    choiceTexts: [
      "Backswimmer",
      "Caddisfly",
      "Blood Midge",
      "Dragonfly",
    ],
    correctChoiceId: "a",
    hint: "Compare each name’s table column. Only one of these four sits under Class 5.",
    explanation:
      "Backswimmer is Class 5. Caddisfly is Class 1; Blood Midge is Class 4; Dragonfly is Class 2.",
    cognitiveDemand: "distinction",
    sourceType: "rules-derived",
    sourceNote: "V-M22 vs V-M02, V-M18, V-M09.",
    evidenceIds: ["V-M22", "V-M02", "V-M18", "V-M09"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q15",
    topicId: "macroinvertebrates",
    difficulty: 1,
    prompt:
      "On the 2027 table, which class includes Riffle Beetle?",
    choiceTexts: [
      "Class 5 - Air Breathing",
      "Class 1 - Pollution Sensitive",
      "Class 3 - Moderately Tolerant",
      "Class 2 - Moderately Sensitive",
    ],
    correctChoiceId: "b",
    hint: "Find Riffle Beetle on the table and read the heading above it.",
    explanation:
      "Riffle Beetle is Class 1 - Pollution Sensitive.",
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote: "V-M06, V-C1.",
    evidenceIds: ["V-M06", "V-C1"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q16",
    topicId: "macroinvertebrates",
    difficulty: 2,
    prompt:
      "On the 2027 table, which class includes Cranefly?",
    choiceTexts: [
      "Class 5 - Air Breathing",
      "Class 4 - Pollution Tolerant",
      "Class 1 - Pollution Sensitive",
      "Class 2 - Moderately Sensitive",
    ],
    correctChoiceId: "d",
    hint: "Find Cranefly on the table and read the heading above it.",
    explanation:
      "Cranefly is Class 2 - Moderately Sensitive, with Aquatic Sowbug, Damsefly, and Dragonfly.",
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote: "V-M10, V-C2.",
    evidenceIds: ["V-M10", "V-C2"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q17",
    topicId: "macroinvertebrates",
    difficulty: 2,
    prompt:
      "On the 2027 table, which class includes Leeches (plural, as printed)?",
    choiceTexts: [
      "Class 3 - Moderately Tolerant",
      "Class 1 - Pollution Sensitive",
      "Class 4 - Pollution Tolerant",
      "Class 5 - Air Breathing",
    ],
    correctChoiceId: "a",
    hint: "Find Leeches on the table and read the heading above that printed name.",
    explanation:
      "Leeches is a Class 3 - Moderately Tolerant name.",
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote: "V-M14, V-C3. Official plural spelling.",
    evidenceIds: ["V-M14", "V-C3"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q18",
    topicId: "macroinvertebrates",
    difficulty: 2,
    prompt:
      "Which printed string is the 2027 Class 4 name that uses a slash?",
    choiceTexts: [
      "Crayfish/Crawdads",
      "Mosquito",
      "Deer/Horse Fly",
      "Water Penny",
    ],
    correctChoiceId: "c",
    hint: "Find each slash-form string in the official references, then compare its list or table heading with the choices.",
    explanation:
      "Deer/Horse Fly is the Class 4 table cell. Crayfish/Crawdads is a nuisance-animal string, not a Class 4 table name. Mosquito is Class 5; Water Penny is Class 1.",
    cognitiveDemand: "distinction",
    sourceType: "rules-derived",
    sourceNote: "V-M16 vs V-A5, V-M20, V-M05. Does not split slash names into two taxa.",
    evidenceIds: ["V-M16", "V-A5", "V-M20", "V-M05"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q19",
    topicId: "macroinvertebrates",
    difficulty: 3,
    prompt:
      "Which name is in Class 3 - Moderately Tolerant on the 2027 table?",
    choiceTexts: [
      "Water Penny",
      "Blackfly",
      "Giant Water Bug",
      "Asian Carp",
    ],
    correctChoiceId: "b",
    hint: "Locate each printed name in the relevant official lists, then compare the headings shown with the named class.",
    explanation:
      "Blackfly is Class 3. Water Penny is Class 1; Giant Water Bug is Class 5; Asian Carp is an Aquatic Nuisance Animals string, not a Class 3 table cell.",
    cognitiveDemand: "distinction",
    sourceType: "rules-derived",
    sourceNote: "V-M12 vs V-M05, V-M21, V-A4.",
    evidenceIds: ["V-M12", "V-M05", "V-M21", "V-A4"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q20",
    topicId: "macroinvertebrates",
    difficulty: 3,
    prompt:
      "Follow this key from the top. It uses only the 2027 table.\n\n1a. Listed under Class 5 - Air Breathing → go to 2\n1b. Not listed under Class 5 → not keyed here\n2a. Listed name is Giant Water Bug → Giant Water Bug\n2b. Listed name is Water Boatman → Water Boatman\n\nThe specimen’s listed name is Giant Water Bug. Which name do you reach?",
    choiceTexts: [
      "not keyed here",
      "Water Boatman",
      "Dobsonfly",
      "Giant Water Bug",
    ],
    correctChoiceId: "d",
    wordingHelp:
      "This question is asking which name you land on if you start at the top of the key and follow the specimen’s listed name.",
    hint: "Check whether the name is in the Class 5 column, then match couplet 2.",
    explanation:
      "Giant Water Bug is Class 5, so 1a applies. Couplet 2a matches Giant Water Bug. Dobsonfly is Class 1, so 1b would exclude it. Water Boatman would require 2b.",
    cognitiveDemand: "multi-step",
    sourceType: "rules-derived",
    sourceNote: "V-M21, V-M23, V-C5; Dobsonfly V-M04.",
    evidenceIds: ["V-M21", "V-M23", "V-C5", "V-M04"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q21",
    topicId: "nuisance-species",
    difficulty: 1,
    prompt:
      "Which name is on the 2027 Aquatic Nuisance Plants list?",
    choiceTexts: [
      "Purple Loosestrife",
      "Zebra Mussel",
      "Mayfly",
      "Caddisfly",
    ],
    correctChoiceId: "a",
    hint: "Find each name on the official closed lists, then compare the list heading associated with it.",
    explanation:
      "Purple Loosestrife is an Aquatic Nuisance Plants name. Zebra Mussel is an Aquatic Nuisance Animals string. Mayfly and Caddisfly are adult-macroinvertebrate table names.",
    cognitiveDemand: "recognition",
    sourceType: "rules-derived",
    sourceNote: "V-P1 vs V-A1, V-M01, V-M02.",
    evidenceIds: ["V-P1", "V-A1", "V-M01", "V-M02"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q22",
    topicId: "nuisance-species",
    difficulty: 2,
    prompt:
      "Which of these 2027 official strings is an Aquatic Nuisance Plant, not an Aquatic Nuisance Animal?",
    choiceTexts: [
      "Zebra Mussel",
      "Spiny Water Flea",
      "Water Hyacinth",
      "Asian Carp",
    ],
    correctChoiceId: "c",
    hint: "Check each choice against the two official nuisance-species lists, then compare the list placement.",
    explanation:
      "Water Hyacinth is a nuisance plant. Zebra Mussel, Spiny Water Flea, and Asian Carp are nuisance-animal strings.",
    cognitiveDemand: "distinction",
    sourceType: "rules-derived",
    sourceNote: "V-P3 vs V-A1, V-A2, V-A4.",
    evidenceIds: ["V-P3", "V-A1", "V-A2", "V-A4"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q23",
    topicId: "nuisance-species",
    difficulty: 1,
    prompt:
      "Zebra Mussel appears on which 2027 closed list?",
    choiceTexts: [
      "Class 1 - Pollution Sensitive",
      "Aquatic Nuisance Animals",
      "Aquatic Nuisance Plants",
      "The eight monitoring-parameter names",
    ],
    correctChoiceId: "b",
    hint: "Find the named organism on the official closed lists, then compare the heading printed with it.",
    explanation:
      "Zebra Mussel is an Aquatic Nuisance Animals string. It is not a Class 1 table name, not a nuisance plant, and not a monitoring parameter.",
    cognitiveDemand: "recognition",
    sourceType: "rules-derived",
    sourceNote: "V-A1.",
    evidenceIds: ["V-A1"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q24",
    topicId: "nuisance-species",
    difficulty: 2,
    prompt:
      "Which official 2027 Aquatic Nuisance Animals string uses a slash?",
    choiceTexts: [
      "Deer/Horse Fly",
      "Eurasian Water Milfoil",
      "Asian Tiger Mosquito",
      "Crayfish/Crawdads",
    ],
    correctChoiceId: "d",
    hint: "Look for the slash-joined name exactly as printed, then read the heading of the list where you find it.",
    explanation:
      "Crayfish/Crawdads is the nuisance-animal string. Deer/Horse Fly is a Class 4 macro table name. Eurasian Water Milfoil is a nuisance plant. Asian Tiger Mosquito is a nuisance animal without a slash.",
    cognitiveDemand: "distinction",
    sourceType: "rules-derived",
    sourceNote: "V-A5 vs V-M16, V-P2, V-A3. Does not treat crayfish and crawdads as two taxa.",
    evidenceIds: ["V-A5", "V-M16", "V-P2", "V-A3"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q25",
    topicId: "nuisance-species",
    difficulty: 2,
    prompt:
      "Which name is not on the 2027 Aquatic Nuisance Plants list?",
    choiceTexts: [
      "Mayfly",
      "Purple Loosestrife",
      "Eurasian Water Milfoil",
      "Water Hyacinth",
    ],
    correctChoiceId: "a",
    hint: "The Aquatic Nuisance Plants list is a short closed list. Check each name against that list, not against the adult-macroinvertebrate table.",
    explanation:
      "The three nuisance plants are Purple Loosestrife, Eurasian Water Milfoil, and Water Hyacinth. Mayfly is a Class 1 table name.",
    cognitiveDemand: "distinction",
    sourceType: "rules-derived",
    sourceNote: "V-P1, V-P2, V-P3 vs V-M01.",
    evidenceIds: ["V-P1", "V-P2", "V-P3", "V-M01"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q26",
    topicId: "nuisance-species",
    difficulty: 3,
    prompt:
      "The 2027 rules print both Mosquito and Asian Tiger Mosquito. How are those two strings placed?",
    choiceTexts: [
      "Both are Class 5 - Air Breathing table names",
      "Both are Aquatic Nuisance Animals strings",
      "Mosquito is a Class 5 table name; Asian Tiger Mosquito is an Aquatic Nuisance Animals string",
      "Asian Tiger Mosquito is Class 5; Mosquito is an Aquatic Nuisance Plants name",
    ],
    correctChoiceId: "c",
    wordingHelp:
      "This question is asking how each of those two printed names is listed in the rules.",
    hint: "Compare the Class 5 column with the Aquatic Nuisance Animals sentence. Do not merge the two printed strings.",
    explanation:
      "Mosquito is printed under Class 5 - Air Breathing. Asian Tiger Mosquito is an Aquatic Nuisance Animals string. They are separate official strings; this item does not claim extra biology about either name.",
    cognitiveDemand: "distinction",
    sourceType: "rules-derived",
    sourceNote: "V-M20 vs V-A3.",
    evidenceIds: ["V-M20", "V-A3"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q27",
    topicId: "water-monitoring",
    difficulty: 1,
    prompt:
      "Which of these is one of the eight water-monitoring names listed in the 2027 rules?",
    choiceTexts: [
      "Mayfly",
      "salinity",
      "Purple Loosestrife",
      "Dobsonfly",
    ],
    correctChoiceId: "b",
    hint: "Use the eight-name Water Monitoring and Analysis list. Check which choice is printed there.",
    explanation:
      "salinity is a listed monitoring parameter. Mayfly and Dobsonfly are table names. Purple Loosestrife is a nuisance plant.",
    cognitiveDemand: "recognition",
    sourceType: "rules-derived",
    sourceNote: "V-W1 vs V-M01, V-P1, V-M04.",
    evidenceIds: ["V-W1", "V-M01", "V-P1", "V-M04"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q28",
    topicId: "water-monitoring",
    difficulty: 2,
    prompt:
      "Which name is included in the 2027 monitoring-parameter list?",
    choiceTexts: [
      "Class 1 - Pollution Sensitive",
      "Eurasian Water Milfoil",
      "Stonefly",
      "biochemical oxygen demand",
    ],
    correctChoiceId: "d",
    hint: "The eight names are the monitoring-parameter list, not class titles or organism lists.",
    explanation:
      "biochemical oxygen demand is one of the eight listed parameters. Class 1 is an indicator heading. Eurasian Water Milfoil is a nuisance plant. Stonefly is a Class 1 table name.",
    cognitiveDemand: "distinction",
    sourceType: "rules-derived",
    sourceNote: "V-W8 vs V-C1, V-P2, V-M03.",
    evidenceIds: ["V-W8", "V-C1", "V-P2", "V-M03"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q29",
    topicId: "water-monitoring",
    difficulty: 1,
    prompt:
      "pH appears in the 2027 Water Monitoring and Analysis section as which kind of listed item?",
    choiceTexts: [
      "One of the eight named parameters for collecting data",
      "A Class 3 - Moderately Tolerant organism",
      "An Aquatic Nuisance Plant",
      "An Aquatic Nuisance Animal",
    ],
    correctChoiceId: "a",
    hint: "Find pH in the 2027 Water Monitoring and Analysis section. Decide what kind of listed item it is.",
    explanation:
      "pH is one of the eight named monitoring parameters. It is not an organism or nuisance-list name. The 2027 rules and this MVP bank do not define pH further.",
    cognitiveDemand: "recall",
    sourceType: "rules-derived",
    sourceNote: "V-W2 name only; no pH chemistry (SN6).",
    evidenceIds: ["V-W2"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q30",
    topicId: "water-monitoring",
    difficulty: 2,
    prompt:
      "Which statement is true of turbidity in the 2027 rules?",
    choiceTexts: [
      "It is printed as a Class 5 - Air Breathing common name",
      "It is an Aquatic Nuisance Animals string",
      "It is one of the eight named monitoring parameters",
      "It is one of the three Aquatic Nuisance Plants",
    ],
    correctChoiceId: "c",
    promptTerms: [{ glossaryId: "turbidity" }],
    hint: "Find turbidity in the 2027 Water Monitoring and Analysis section. Decide what kind of listed name it is, and do not invent a definition.",
    explanation:
      "turbidity is a listed monitoring-parameter name. This item does not state what turbidity measures (that fact is not evidenced in the MVP matrix).",
    cognitiveDemand: "recognition",
    sourceType: "rules-derived",
    sourceNote: "V-W4 name only; no turbidity definition (SN7).",
    evidenceIds: ["V-W4"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q31",
    topicId: "water-monitoring",
    difficulty: 1,
    prompt:
      "phosphates appears in the 2027 monitoring list as which of the following?",
    choiceTexts: [
      "A Class 2 table common name",
      "One of the eight named parameters",
      "An Aquatic Nuisance Plant",
      "The official title of Class 4",
    ],
    correctChoiceId: "b",
    hint: "Use the word as it is printed in that section. Do not turn it into a phosphorus definition.",
    explanation:
      "phosphates is one of the eight named monitoring parameters. This MVP item does not equate phosphates with phosphorus or describe eutrophication.",
    cognitiveDemand: "recall",
    sourceType: "rules-derived",
    sourceNote: "V-W3 name only; HR7 / V-U5 not used here.",
    evidenceIds: ["V-W3"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q32",
    topicId: "water-monitoring",
    difficulty: 3,
    prompt:
      "Which name is not one of the eight 2027 monitoring parameters?",
    choiceTexts: [
      "dissolved oxygen",
      "temperature",
      "nitrates",
      "Mayfly",
    ],
    correctChoiceId: "d",
    hint: "Check each choice against the official monitoring-parameter list, then compare list membership.",
    explanation:
      "Mayfly is a Class 1 table name, not a monitoring parameter. Dissolved oxygen, temperature, and nitrates are on the eight-name list.",
    cognitiveDemand: "distinction",
    sourceType: "rules-derived",
    sourceNote: "V-W5, V-W6, V-W7 vs V-M01.",
    evidenceIds: ["V-W5", "V-W6", "V-W7", "V-M01"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q33",
    topicId: "water-monitoring",
    difficulty: 1,
    prompt:
      "What is dissolved oxygen (DO)?",
    choiceTexts: [
      "A measure of how much oxygen is dissolved in the water — the amount of oxygen available to living aquatic organisms",
      "The official 2027 title of Class 1 - Pollution Sensitive",
      "A listed Aquatic Nuisance Plant",
      "The printed common name for Tubifex",
    ],
    correctChoiceId: "a",
    hint: "Focus on the USGS definition, not on a 2027 list name.",
    explanation:
      "USGS: “Dissolved oxygen (DO) is a measure of how much oxygen is dissolved in the water - the amount of oxygen available to living aquatic organisms.” It is also a named 2027 monitoring parameter, but the definition comes from USGS, not from the rules table.",
    cognitiveDemand: "recall",
    sourceType: "usgs-water-science-school",
    sourceNote: "EVIDENCE_MATRIX_2027.md V-U1; T2-USGS-DO. Parameter name V-W5.",
    evidenceIds: ["V-U1", "V-W5"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q34",
    topicId: "water-monitoring",
    difficulty: 2,
    prompt:
      "Two samples of the same water body differ only in temperature. Which sample can hold more dissolved oxygen?",
    choiceTexts: [
      "The warmer sample",
      "Neither sample; temperature does not affect dissolved oxygen",
      "The colder sample",
      "Only a sample labeled Class 5 - Air Breathing",
    ],
    correctChoiceId: "c",
    promptTerms: [{ glossaryId: "dissolved-oxygen" }],
    hint: "USGS compares cold water and warm water. No graph or numeric cutoff is required.",
    explanation:
      "USGS: “Cold water can hold more dissolved oxygen than warm water.” Also: “Warm water holds less dissolved oxygen than cool water.” No milligram-per-liter threshold is used here.",
    cognitiveDemand: "application",
    sourceType: "usgs-water-science-school",
    sourceNote: "V-U2 (T2-USGS-DO and T2-USGS-TEMP).",
    evidenceIds: ["V-U2"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q35",
    topicId: "water-monitoring",
    difficulty: 1,
    prompt:
      "Why is water temperature important for rivers and lakes?",
    choiceTexts: [
      "It is the official 2027 title of Class 3",
      "It exerts a major influence on biological activity and growth and governs the kinds of organisms that can live in rivers and lakes",
      "It is listed as an Aquatic Nuisance Animal",
      "It is printed as the common name for Blood Midge",
    ],
    correctChoiceId: "b",
    hint: "The question asks why temperature matters. Use the USGS statement, not a 2027 class or list label.",
    explanation:
      "USGS: “Temperature exerts a major influence on biological activity and growth. Temperature governs the kinds of organisms that can live in rivers and lakes.” Temperature is also a named 2027 parameter; the biological statement is from USGS.",
    cognitiveDemand: "recall",
    sourceType: "usgs-water-science-school",
    sourceNote: "V-U3; parameter name V-W6.",
    evidenceIds: ["V-U3", "V-W6"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q36",
    topicId: "water-monitoring",
    difficulty: 2,
    prompt:
      "Nitrates are a monitoring parameter. Nitrogen in the form of nitrate is which of the following?",
    choiceTexts: [
      "A Class 4 - Pollution Tolerant common name",
      "An Aquatic Nuisance Plant",
      "A measure of how much oxygen is dissolved in the water",
      "A nutrient needed for plant growth",
    ],
    correctChoiceId: "d",
    hint: "Use the USGS description of nitrate and match the statement to what the source actually says.",
    explanation:
      "USGS: “Nitrogen, in the forms of nitrate, nitrite, or ammonium, is a nutrient needed for plant growth.” Dissolved oxygen is a different USGS definition (V-U1). This item does not use ppm or drinking-water cutoffs.",
    cognitiveDemand: "application",
    sourceType: "usgs-water-science-school",
    sourceNote: "V-U4; nitrates as a rules name V-W7.",
    evidenceIds: ["V-U4", "V-W7"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q37",
    topicId: "water-monitoring",
    difficulty: 3,
    prompt:
      "What can excess nitrogen cause in water?",
    choiceTexts: [
      "Overstimulation of growth of aquatic plants and algae",
      "The name Mayfly to move from Class 1 to Class 5 on the 2027 table",
      "Saline water to contain no dissolved salts",
      "Biochemical oxygen demand to become a nuisance plant",
    ],
    correctChoiceId: "a",
    hint: "Use the USGS effect of excess nitrogen. Discard choices that rewrite 2027 list membership.",
    explanation:
      "USGS: “Excess nitrogen can cause overstimulation of growth of aquatic plants and algae.” List membership and BOD’s identity as a parameter are not changed by nitrogen.",
    cognitiveDemand: "application",
    sourceType: "usgs-water-science-school",
    sourceNote: "V-U4.",
    evidenceIds: ["V-U4"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q38",
    topicId: "water-monitoring",
    difficulty: 3,
    prompt:
      "What can too much phosphorus in water do?",
    choiceTexts: [
      "Print Phosphorus as a Class 1 common name on the 2027 table",
      "Replace salinity on the 2027 eight-parameter list",
      "Speed up eutrophication, described there as a reduction in dissolved oxygen caused by an increase of mineral and organic nutrients",
      "Prove that the rules word phosphates means the same thing as phosphorus",
    ],
    correctChoiceId: "c",
    hint: "Use the USGS statement about too much phosphorus in water. Do not treat the rules word phosphates as proven identical to phosphorus.",
    explanation:
      "USGS: too much phosphorus “can speed up eutrophication (a reduction in dissolved oxygen in water bodies caused by an increase of mineral and organic nutrients).” The 2027 rules name phosphates, not phosphorus; this item does not equate those two words.",
    cognitiveDemand: "application",
    sourceType: "usgs-water-science-school",
    sourceNote: "V-U5 only. Does not resolve HR7.",
    evidenceIds: ["V-U5"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q39",
    topicId: "water-monitoring",
    difficulty: 1,
    prompt:
      "Salinity is a monitoring parameter. Water that is saline contains which of the following?",
    choiceTexts: [
      "Only Class 5 - Air Breathing organisms",
      "Significant amounts (concentrations) of dissolved salts, the most common being sodium chloride (NaCl)",
      "No dissolved salts at any concentration",
      "Purple Loosestrife as a required dissolved mineral",
    ],
    correctChoiceId: "b",
    hint: "Use the USGS wording for saline water. Do not use parts-per-million classification bands.",
    explanation:
      "USGS: “Water that is saline contains significant amounts (referred to as ‘concentrations’) of dissolved salts, the most common being … sodium chloride (NaCl).” Freshwater/ocean ppm bands from that page are not used in this MVP item.",
    cognitiveDemand: "recall",
    sourceType: "usgs-water-science-school",
    sourceNote: "V-U6; parameter name V-W1. No ppm bands.",
    evidenceIds: ["V-U6", "V-W1"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q40",
    topicId: "water-monitoring",
    difficulty: 1,
    prompt:
      "What does biochemical oxygen demand (BOD) represent?",
    choiceTexts: [
      "The official 2027 title of Class 2 - Moderately Sensitive",
      "An Aquatic Nuisance Animals string",
      "How much oxygen is dissolved in the water available to living aquatic organisms",
      "The amount of oxygen consumed by bacteria and other microorganisms while they decompose organic matter under aerobic conditions at a specified temperature",
    ],
    correctChoiceId: "d",
    hint: "Use the USGS BOD sentence. Compare it with the USGS dissolved-oxygen sentence; they are not the same claim.",
    explanation:
      "USGS: “Biochemical oxygen demand (BOD) represents the amount of oxygen consumed by bacteria and other microorganisms while they decompose organic matter under aerobic (oxygen is present) conditions at a specified temperature.” Dissolved oxygen’s definition is V-U1, a different claim. No 5-day/20 °C method details are tested.",
    cognitiveDemand: "distinction",
    sourceType: "usgs-water-science-school",
    sourceNote: "V-U7 vs V-U1; parameter name V-W8.",
    evidenceIds: ["V-U7", "V-U1", "V-W8"],
    verificationStatus: "verified",
  }),
];

export function waterQualityQuestionToPracticeQuestion(
  question: WaterQualityQuestion,
): Question {
  return {
    id: question.id,
    eventId: question.eventId,
    topicId: question.topicId,
    prompt: question.prompt,
    choices: question.choices,
    correctChoiceId: question.correctChoiceId,
    explanation: question.explanation,
    hint: question.hint,
    ...optionalSecondHintFields(question.hint2),
    ...optionalQuestionHelpFields(question),
    difficulty: question.difficulty,
    imageRequired: question.imageRequired,
    verificationStatus: question.verificationStatus,
  };
}
