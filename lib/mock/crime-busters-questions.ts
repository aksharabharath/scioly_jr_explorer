/**
 * Crime Busters 2027 MVP question bank — cb-q1–cb-q40.
 *
 * Text-only. Phase 5 QA: items may be verified. Facts are limited to
 * T1-RULES and inspected quotes in
 * docs/events/crime_busters/EVIDENCE_MATRIX_2027.md.
 *
 * Registered in curriculum.ts. Unlocked for shared live practice.
 */
import type {
  DifficultyLevel,
  Question,
  QuestionVerificationStatus,
} from "@/lib/types";

export const CRIME_BUSTERS_EVENT_ID = "crime-busters";

export const CRIME_BUSTERS_TOPIC_IDS = [
  "fingerprints",
  "hair-fiber",
  "soil",
  "chemical",
  "safety",
] as const;

export type CrimeBustersTopicId = (typeof CRIME_BUSTERS_TOPIC_IDS)[number];

export type CrimeBustersCognitiveDemand =
  | "recall"
  | "recognition"
  | "distinction"
  | "application"
  | "multi-step";

export type CrimeBustersSourceType =
  | "rules-derived"
  | "nist"
  | "fbi-handbook"
  | "openstax"
  | "doj-hair"
  | "rhs-soil"
  | "pubchem"
  | "libretexts";

export type CrimeBustersQuestion = Question & {
  topicId: CrimeBustersTopicId;
  cognitiveDemand: CrimeBustersCognitiveDemand;
  sourceType: CrimeBustersSourceType;
  sourceNote: string;
  evidenceIds: string[];
  verificationStatus: QuestionVerificationStatus;
  imageRequired: false;
};

const EVENT_ID = CRIME_BUSTERS_EVENT_ID;

function cb(input: {
  id: string;
  topicId: CrimeBustersTopicId;
  difficulty: DifficultyLevel;
  prompt: string;
  choiceTexts: [string, string, string, string];
  correctChoiceId: "a" | "b" | "c" | "d";
  hint: string;
  explanation: string;
  cognitiveDemand: CrimeBustersCognitiveDemand;
  sourceType: CrimeBustersSourceType;
  sourceNote: string;
  evidenceIds: string[];
  verificationStatus: QuestionVerificationStatus;
}): CrimeBustersQuestion {
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
    explanation: input.explanation,
    cognitiveDemand: input.cognitiveDemand,
    sourceType: input.sourceType,
    sourceNote: input.sourceNote,
    evidenceIds: input.evidenceIds,
    verificationStatus: input.verificationStatus,
    imageRequired: false,
  };
}

export const MOCK_CRIME_BUSTERS_QUESTIONS: CrimeBustersQuestion[] = [
  cb({
    id: "cb-q1",
    topicId: "fingerprints",
    difficulty: 1,
    prompt:
      "The 2027 Crime Busters rules name three fundamental fingerprint pattern families. Which set is printed?",
    choiceTexts: [
      "Waves, spirals, and tents",
      "Loops, Whorls, and Arches",
      "Cores, deltas, and ridges",
      "Ulnar, Radial, and Accidental",
    ],
    correctChoiceId: "b",
    hint: "Use the three family headings in the Fingerprint Analysis section, not the subtype lists.",
    explanation:
      "The rules name Loops, Whorls, and Arches as the fundamental patterns. Ulnar and Radial are loop subtypes; Accidental is a whorl subtype.",
    cognitiveDemand: "recall",
    sourceType: "rules-derived",
    sourceNote: "RULES_2027.md Fingerprint Analysis; V-P1–V-P3.",
    evidenceIds: ["V-P1", "V-P2", "V-P3"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q2",
    topicId: "fingerprints",
    difficulty: 1,
    prompt:
      "Under Loops, which subtype names does the 2027 Crime Busters rules list?",
    choiceTexts: [
      "Ulnar, Radial, and Central Pocket",
      "Plain, Accidental, and Double Loop",
      "Plain and Tented",
      "Left slant and right slant only",
    ],
    correctChoiceId: "a",
    hint: "Read the parenthetical list printed beside Loops, not beside Whorls or Arches.",
    explanation:
      "The rules print Loops (Ulnar, Radial, Central Pocket). Plain, Accidental, and Double Loop are listed under Whorls. Plain and Tented are listed under Arches.",
    cognitiveDemand: "recall",
    sourceType: "rules-derived",
    sourceNote: "RULES_2027.md loop subtypes; V-P4–V-P6. Keep Central Pocket under Loops as printed (HR8).",
    evidenceIds: ["V-P4", "V-P5", "V-P6"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q3",
    topicId: "fingerprints",
    difficulty: 1,
    prompt:
      "Under Whorls, which subtype names does the 2027 Crime Busters rules list?",
    choiceTexts: [
      "Ulnar, Radial, and Central Pocket",
      "Plain and Tented",
      "Plain, Accidental, and Double Loop",
      "Core, delta, and ridge count",
    ],
    correctChoiceId: "c",
    hint: "Use the parenthetical list printed beside Whorls.",
    explanation:
      "The rules print Whorls (Plain, Accidental, Double Loop). Ulnar, Radial, and Central Pocket are listed under Loops.",
    cognitiveDemand: "recall",
    sourceType: "rules-derived",
    sourceNote: "RULES_2027.md whorl subtypes; V-P7–V-P9.",
    evidenceIds: ["V-P7", "V-P8", "V-P9"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q4",
    topicId: "fingerprints",
    difficulty: 1,
    prompt:
      "Under Arches, which subtype names does the 2027 Crime Busters rules list?",
    choiceTexts: [
      "Ulnar and Radial",
      "Accidental and Double Loop",
      "Central Pocket and Plain",
      "Plain and Tented",
    ],
    correctChoiceId: "d",
    hint: "Use the parenthetical list printed beside Arches.",
    explanation:
      "The rules print Arches (Plain, Tented). Ulnar and Radial are loop subtypes; Accidental and Double Loop are whorl subtypes.",
    cognitiveDemand: "recall",
    sourceType: "rules-derived",
    sourceNote: "RULES_2027.md arch subtypes; V-P10, V-P11.",
    evidenceIds: ["V-P10", "V-P11"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q5",
    topicId: "fingerprints",
    difficulty: 1,
    prompt:
      "NIST training groups fingerprint impressions into which three pattern types?",
    choiceTexts: [
      "Cores, deltas, and minutiae",
      "Arches, loops, and whorls",
      "Latent, patent, and plastic",
      "Radial, ulnar, and tented",
    ],
    correctChoiceId: "b",
    hint: "The inspected NIST page names three broad types, then subclasses inside each.",
    explanation:
      "NIST states that patterns are divided into three types: arches, loops, and whorls. That matches the three 2027 family names.",
    cognitiveDemand: "recognition",
    sourceType: "nist",
    sourceNote: "NIST Pattern Classification; E-CB-001.",
    evidenceIds: ["E-CB-001"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q6",
    topicId: "fingerprints",
    difficulty: 2,
    prompt:
      "In the FBI fingerprint handbook, loops that flow toward the little finger are called what?",
    choiceTexts: [
      "Ulnar loops",
      "Radial loops",
      "Plain arches",
      "Double loops",
    ],
    correctChoiceId: "a",
    hint: "The handbook ties each loop name to a forearm bone and a direction of ridge flow.",
    explanation:
      "The handbook says loops that flow in the direction of the ulna bone (toward the little finger) are ulnar loops. Radial loops flow toward the radius bone.",
    cognitiveDemand: "application",
    sourceType: "fbi-handbook",
    sourceNote: "FBI Science of Fingerprints; E-CB-004.",
    evidenceIds: ["E-CB-004"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q7",
    topicId: "fingerprints",
    difficulty: 2,
    prompt:
      "The terms radial and ulnar for fingerprint loops are derived from which bones?",
    choiceTexts: [
      "Tibia and fibula",
      "Radius and ulna of the forearm",
      "Carpals and metacarpals",
      "Clavicle and scapula",
    ],
    correctChoiceId: "b",
    hint: "The handbook derives the two loop names from bones, not from the lower leg or shoulder girdle.",
    explanation:
      "The handbook states that the terms radial and ulnar are derived from the radius and ulna bones of the forearm.",
    cognitiveDemand: "recall",
    sourceType: "fbi-handbook",
    sourceNote: "E-CB-004.",
    evidenceIds: ["E-CB-004"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q8",
    topicId: "fingerprints",
    difficulty: 2,
    prompt:
      "In NIST training, a loop is a ridge-flow pattern in which ridges enter one side, recurve, and then do what?",
    choiceTexts: [
      "Stop at the core without exiting",
      "Make a complete circuit with two deltas",
      "Pass out upon the same side the ridges entered",
      "Flow out the opposite side with a wave in the center",
    ],
    correctChoiceId: "c",
    hint: "Use the full NIST loop definition, including what happens after the ridges recurve.",
    explanation:
      "NIST defines a loop as ridges that enter upon one side, recurve, touch or pass an imaginary line between delta and core, and pass out upon the same side the ridges entered. Flowing out the other side with a wave describes a plain arch.",
    cognitiveDemand: "distinction",
    sourceType: "nist",
    sourceNote: "E-CB-002; contrast E-CB-005.",
    evidenceIds: ["E-CB-002", "E-CB-005"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q9",
    topicId: "fingerprints",
    difficulty: 2,
    prompt:
      "How does NIST describe a plain arch?",
    choiceTexts: [
      "Ridges enter one side, recurve, and exit the same side",
      "Two separate loop formations with two cores and two deltas",
      "At least two deltas with a recurve in front of each",
      "Ridges enter one side and flow out the other with a rise or wave in the center",
    ],
    correctChoiceId: "d",
    hint: "Use the NIST sentence for plain arches, not the sentences for loops or whorls.",
    explanation:
      "NIST: plain arches have ridges which enter on one side of the impression and flow out the other with a rise or wave in the center.",
    cognitiveDemand: "recognition",
    sourceType: "nist",
    sourceNote: "E-CB-005.",
    evidenceIds: ["E-CB-005"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q10",
    topicId: "fingerprints",
    difficulty: 3,
    prompt:
      "NIST notes that a tented arch may look similar to a loop except that it lacks one of which three loop requirements?",
    choiceTexts: [
      "Ink, paper, and pressure",
      "Recurve, delta, or ridge count",
      "Core, shoulder, and type line",
      "Ulnar flow, radial flow, or a pocket",
    ],
    correctChoiceId: "b",
    hint: "The inspected NIST sentence names three loop requirements, not printing conditions.",
    explanation:
      "NIST states that tented arches may be similar to a loop, except that they lack one of the three requirements (recurve, delta, or ridge count).",
    cognitiveDemand: "application",
    sourceType: "nist",
    sourceNote: "E-CB-006.",
    evidenceIds: ["E-CB-006"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q11",
    topicId: "fingerprints",
    difficulty: 3,
    prompt:
      "NIST describes a plain whorl as one or more ridges that make a complete circuit, with two deltas, and what relationship to an imaginary line between those deltas?",
    choiceTexts: [
      "The line never comes near the inner pattern",
      "At least one recurving ridge within the inner pattern area is cut or touched",
      "No recurving ridge in the inner pattern area is touched or cut",
      "The line must pass through both cores",
    ],
    correctChoiceId: "b",
    hint: "Use the NIST plain-whorl sentence about the imaginary line and the inner pattern area.",
    explanation:
      "NIST: a plain whorl has two deltas, between which, when an imaginary line is drawn, at least one recurving ridge within the inner pattern area is cut or touched. The ‘no inner recurve touched’ wording is NIST’s central-pocket-loop definition and is not used as a family-classification item here.",
    cognitiveDemand: "distinction",
    sourceType: "nist",
    sourceNote: "E-CB-008. Do not key Central Pocket as a whorl (HR8).",
    evidenceIds: ["E-CB-008"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q12",
    topicId: "fingerprints",
    difficulty: 2,
    prompt:
      "OpenStax states that fingerprints form in a growing fetus where cells of the stratum basale meet what?",
    choiceTexts: [
      "The hypodermis only",
      "The nails and hair follicles",
      "The papillae of the underlying dermal layer (papillary layer)",
      "The stratum corneum surface only",
    ],
    correctChoiceId: "c",
    hint: "Use the inspected OpenStax sentence about where the stratum basale meets the dermis.",
    explanation:
      "OpenStax: fingerprints form where the cells of the stratum basale meet the papillae of the underlying dermal layer (papillary layer). The same chapter says the two main skin layers are epidermis and dermis.",
    cognitiveDemand: "application",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P §5.1; E-CB-017, E-CB-016.",
    evidenceIds: ["E-CB-017", "E-CB-016"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q13",
    topicId: "hair-fiber",
    difficulty: 1,
    prompt:
      "Which five hair sources does the 2027 Crime Busters Hair/Fiber section name?",
    choiceTexts: [
      "Human, dog, cat, squirrel, and mouse",
      "Human, horse, cow, sheep, and goat",
      "Dog, cat, rabbit, deer, and fox",
      "Human, dog, cat, bird, and fish",
    ],
    correctChoiceId: "a",
    hint: "Use the five sources named in Hair/Fiber Analysis. Do not add unlisted animals.",
    explanation:
      "The rules name human, dog, cat, squirrel, and mouse hair. Other mammals are not on that closed list.",
    cognitiveDemand: "recall",
    sourceType: "rules-derived",
    sourceNote: "V-H1–V-H5. Image ID is deferred; this item is list literacy only.",
    evidenceIds: ["V-H1", "V-H2", "V-H3", "V-H4", "V-H5"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q14",
    topicId: "hair-fiber",
    difficulty: 1,
    prompt:
      "According to the inspected DOJ hair-examination document, the hair shaft is made of which three layers?",
    choiceTexts: [
      "Epidermis, dermis, and hypodermis",
      "Cuticle, cortex, and medulla",
      "Root, follicle, and papilla",
      "Scale, pigment, and keratin only",
    ],
    correctChoiceId: "b",
    hint: "The document compares the shaft to three layers from outside to center.",
    explanation:
      "The DOJ document states that the shaft is made of three layers called the cuticle, cortex, and medulla.",
    cognitiveDemand: "recall",
    sourceType: "doj-hair",
    sourceNote: "E-CB-019.",
    evidenceIds: ["E-CB-019"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q15",
    topicId: "hair-fiber",
    difficulty: 2,
    prompt:
      "In the DOJ comparison table, how is the human medulla typically described relative to shaft width?",
    choiceTexts: [
      "Always absent",
      "Always more than one-half the shaft width",
      "Less than one-third the width of the shaft, with an amorphous irregular appearance",
      "Exactly one-half the shaft width with a ladder pattern in every hair",
    ],
    correctChoiceId: "c",
    hint: "The table contrasts a human fraction of shaft width with a typical animal fraction.",
    explanation:
      "Table 1 describes the human medulla as less than one-third the width of the shaft with an amorphous irregular appearance. Animal hair is often greater than one-third with a defined structure. That does not identify dog versus cat versus squirrel versus mouse.",
    cognitiveDemand: "distinction",
    sourceType: "doj-hair",
    sourceNote: "E-CB-020.",
    evidenceIds: ["E-CB-020"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q16",
    topicId: "hair-fiber",
    difficulty: 3,
    prompt:
      "In the DOJ table, which cuticle description is given for human hair?",
    choiceTexts: [
      "Spinous scales that always look like flower petals",
      "A wide range of repeating crown-like patterns along the shaft",
      "Coronal scales only, never flattened",
      "Imbricate (no repeating pattern), flattened scales, relatively smooth along the shaft",
    ],
    correctChoiceId: "d",
    hint: "Use the human row of the DOJ cuticle column, not the animal row.",
    explanation:
      "Human cuticle: imbricate (no repeating pattern), flattened scales, similar along the length of the shaft and relatively smooth. Animal hair is described as having a wide range of scale patterns.",
    cognitiveDemand: "distinction",
    sourceType: "doj-hair",
    sourceNote: "E-CB-021.",
    evidenceIds: ["E-CB-021"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q17",
    topicId: "hair-fiber",
    difficulty: 1,
    prompt:
      "The 2027 rules say participants will be asked to distinguish which six named fibers?",
    choiceTexts: [
      "Wool, acrylic, spandex, hemp, jute, and acetate",
      "Cotton, linen, silk, nylon, rayon, and polyester",
      "Cotton, wool, silk, nylon, Kevlar, and fiberglass",
      "Linen, silk, wool, cashmere, mohair, and alpaca",
    ],
    correctChoiceId: "b",
    hint: "Use the six names printed under Hair/Fiber Analysis.",
    explanation:
      "The closed fiber-name list is cotton, linen, silk, nylon, rayon, and polyester.",
    cognitiveDemand: "recall",
    sourceType: "rules-derived",
    sourceNote: "V-F4–V-F9.",
    evidenceIds: ["V-F4", "V-F5", "V-F6", "V-F7", "V-F8", "V-F9"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q18",
    topicId: "hair-fiber",
    difficulty: 2,
    prompt:
      "Which three fiber-class words does the 2027 Crime Busters Hair/Fiber section print?",
    choiceTexts: [
      "Animal, vegetable, and synthetic",
      "Natural, manufactured, and mineral",
      "Plant, protein, and plastic",
      "Organic, inorganic, and blended",
    ],
    correctChoiceId: "a",
    hint: "Use the three class words in the rules sentence about microscopic images, not FTC labeling terms.",
    explanation:
      "The rules ask students to identify differences between animal, vegetable, and synthetic fibers. This item is list literacy only; it does not assign each named fiber to a class.",
    cognitiveDemand: "recall",
    sourceType: "rules-derived",
    sourceNote: "V-F1–V-F3. Class mapping of rayon/nylon/polyester is HR-FIB.",
    evidenceIds: ["V-F1", "V-F2", "V-F3"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q19",
    topicId: "hair-fiber",
    difficulty: 2,
    prompt:
      "Which name is not one of the six fibers the 2027 Crime Busters rules list for distinction?",
    choiceTexts: [
      "Rayon",
      "Polyester",
      "Acrylic",
      "Linen",
    ],
    correctChoiceId: "c",
    hint: "Compare each option with the printed six-name list.",
    explanation:
      "Cotton, linen, silk, nylon, rayon, and polyester are listed. Acrylic is not on that list.",
    cognitiveDemand: "distinction",
    sourceType: "rules-derived",
    sourceNote: "V-F4–V-F9.",
    evidenceIds: ["V-F4", "V-F5", "V-F6", "V-F7", "V-F8", "V-F9"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q20",
    topicId: "hair-fiber",
    difficulty: 3,
    prompt:
      "An inspected chemistry lab text states that cotton fibrils are almost entirely which carbohydrate?",
    choiceTexts: [
      "Sucrose",
      "Starch",
      "Glycogen",
      "Cellulose",
    ],
    correctChoiceId: "d",
    hint: "Use the inspected sentence about cotton fibrils, not the names of storage sugars.",
    explanation:
      "The LibreTexts page states that cotton fibrils and filter paper are almost entirely cellulose (about 95%), and that cellulose is a fibrous carbohydrate found in all plants. This does not assign every official fiber to animal, vegetable, or synthetic.",
    cognitiveDemand: "application",
    sourceType: "libretexts",
    sourceNote: "E-CB-024.",
    evidenceIds: ["E-CB-024"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q21",
    topicId: "soil",
    difficulty: 1,
    prompt:
      "Which six soil types does the 2027 Crime Busters rules list for identification from provided samples?",
    choiceTexts: [
      "Peaty, Loamy, Sandy, Clay, Chalky, and Silty",
      "Sand, silt, clay, gravel, loam, and bedrock",
      "Histosol, Mollisol, Alfisol, Aridisol, Spodosol, and Oxisol",
      "Topsoil, subsoil, parent material, peat, chalk, and humus",
    ],
    correctChoiceId: "a",
    hint: "Use the six adjectives printed under Soil Analysis.",
    explanation:
      "The closed list is Peaty, Loamy, Sandy, Clay, Chalky, and Silty. USDA taxonomy names and unofficial garden nicknames are not that list.",
    cognitiveDemand: "recall",
    sourceType: "rules-derived",
    sourceNote: "V-S1–V-S6.",
    evidenceIds: ["V-S1", "V-S2", "V-S3", "V-S4", "V-S5", "V-S6"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q22",
    topicId: "soil",
    difficulty: 1,
    prompt:
      "Which official 2027 soil-type name is the list adjective for the RHS “peat soils” type?",
    choiceTexts: [
      "Muck",
      "Peaty",
      "Humus",
      "Compost",
    ],
    correctChoiceId: "b",
    hint: "Match the exact adjective on the six-name list.",
    explanation:
      "The 2027 list prints Peaty. RHS describes peat soils as very high in organic matter and moisture. Muck, humus, and compost are not official list names.",
    cognitiveDemand: "recognition",
    sourceType: "rules-derived",
    sourceNote: "V-S1; RHS peat soils E-CB-030.",
    evidenceIds: ["V-S1", "E-CB-030"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q23",
    topicId: "soil",
    difficulty: 2,
    prompt:
      "The inspected RHS soil guide describes clay soils as which of the following?",
    choiceTexts: [
      "Light, dry, warm, and low in nutrients",
      "Very high in organic matter and seldom found in gardens",
      "Heavy, high in nutrients, wet and cold in winter and baked dry in summer",
      "Always acidic and unable to hold any water",
    ],
    correctChoiceId: "c",
    hint: "RHS contrasts clay with sandy soils on weight, wetness, and summer behavior.",
    explanation:
      "RHS: clay soils are heavy, high in nutrients, wet and cold in winter and baked dry in summer. Light, dry, and low in nutrients describes sandy soils on that page.",
    cognitiveDemand: "application",
    sourceType: "rhs-soil",
    sourceNote: "E-CB-026; contrast E-CB-027.",
    evidenceIds: ["E-CB-026"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q24",
    topicId: "soil",
    difficulty: 2,
    prompt:
      "According to the inspected RHS guide, sandy soils are typically which of these?",
    choiceTexts: [
      "Heavy and slow to drain",
      "Sticky when wet and easy to roll into a long sausage",
      "Very alkaline because they are made of lime",
      "Light, dry, warm, low in nutrients, and often acidic",
    ],
    correctChoiceId: "d",
    hint: "RHS calls sandy soils light soils and notes they often drain and warm quickly.",
    explanation:
      "RHS: sandy soils are light, dry, warm, low in nutrients and often acidic. Heavy, sticky, rollable soil is the clay description on that page.",
    cognitiveDemand: "application",
    sourceType: "rhs-soil",
    sourceNote: "E-CB-027.",
    evidenceIds: ["E-CB-027"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q25",
    topicId: "soil",
    difficulty: 2,
    prompt:
      "How does the inspected RHS guide describe peat soils?",
    choiceTexts: [
      "Very high in organic matter and moisture",
      "Made mostly of visible white chalk stones only",
      "A perfect equal mix of sand, silt, and clay with no organic matter",
      "Always the most alkaline garden soil",
    ],
    correctChoiceId: "a",
    hint: "RHS emphasizes organic matter and water-holding, not lime.",
    explanation:
      "RHS: peat soils are very high in organic matter and moisture. Alkaline, lime-rich language on that page belongs to chalky soils.",
    cognitiveDemand: "recognition",
    sourceType: "rhs-soil",
    sourceNote: "E-CB-030. Official list name is Peaty.",
    evidenceIds: ["E-CB-030", "V-S1"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q26",
    topicId: "soil",
    difficulty: 2,
    prompt:
      "The inspected RHS guide says chalky soils are very alkaline and also contain what?",
    choiceTexts: [
      "Only peat and leaf mould",
      "Calcium carbonate or lime",
      "No mineral particles at all",
      "Table salt as the main solid",
    ],
    correctChoiceId: "b",
    hint: "RHS links chalky soils with lime-rich chemistry, not with table salt.",
    explanation:
      "RHS: chalky soils also contain calcium carbonate or lime and are very alkaline. That soil-type name is not the same contest item as the powder Calcium carbonate (Chalk).",
    cognitiveDemand: "application",
    sourceType: "rhs-soil",
    sourceNote: "E-CB-031; HR4.",
    evidenceIds: ["E-CB-031", "V-S5"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q27",
    topicId: "soil",
    difficulty: 3,
    prompt:
      "On the 2027 Crime Busters lists, Chalky soil and Calcium carbonate (Chalk) powder should be treated how?",
    choiceTexts: [
      "As identical items that always share one answer",
      "As two names from two different official lists",
      "As USDA texture classes with published sand percentages",
      "As liquids identified only with pH strips",
    ],
    correctChoiceId: "b",
    hint: "Check which competition heading each printed name sits under.",
    explanation:
      "Chalky is a soil type. Calcium carbonate (Chalk) is a powder on the chemical list. The evidence matrix marks merging them as human review (HR4).",
    cognitiveDemand: "multi-step",
    sourceType: "rules-derived",
    sourceNote: "V-S5 vs V-W7; HR4.",
    evidenceIds: ["V-S5", "V-W7"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q28",
    topicId: "chemical",
    difficulty: 1,
    prompt:
      "PubChem identifies table salt / sodium chloride with which chemical formula?",
    choiceTexts: [
      "NaHCO3",
      "CaCO3",
      "C12H22O11",
      "NaCl",
    ],
    correctChoiceId: "d",
    hint: "Use the molecular formula on the inspected sodium chloride / table salt record.",
    explanation:
      "PubChem: sodium chloride is an ionic compound with the formula NaCl and is also called table salt. NaHCO3 is sodium bicarbonate; CaCO3 is calcium carbonate; C12H22O11 is sucrose.",
    cognitiveDemand: "recall",
    sourceType: "pubchem",
    sourceNote: "E-CB-034; V-W1.",
    evidenceIds: ["E-CB-034", "V-W1"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q29",
    topicId: "chemical",
    difficulty: 1,
    prompt:
      "PubChem lists table sugar as a synonym of sucrose. What formula does that record give?",
    choiceTexts: [
      "C12H22O11",
      "NaCl",
      "H2O2",
      "NaClO",
    ],
    correctChoiceId: "a",
    hint: "Use the molecular formula on the inspected sucrose record.",
    explanation:
      "PubChem CID 5988: sucrose has formula C12H22O11 and lists Table sugar among synonyms. This item treats contest “Sugar” as sucrose only when named as table sugar/sucrose.",
    cognitiveDemand: "recall",
    sourceType: "pubchem",
    sourceNote: "E-CB-035; HR-SUGAR.",
    evidenceIds: ["E-CB-035", "V-W2"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q30",
    topicId: "chemical",
    difficulty: 1,
    prompt:
      "What formula does PubChem give for sodium bicarbonate (baking soda)?",
    choiceTexts: [
      "NaCl",
      "NaHCO3",
      "CaCO3",
      "H2O",
    ],
    correctChoiceId: "b",
    hint: "Use the molecular formula on the inspected sodium bicarbonate record.",
    explanation:
      "PubChem CID 516892 uses molecular formula NaHCO3 for sodium bicarbonate.",
    cognitiveDemand: "recall",
    sourceType: "pubchem",
    sourceNote: "E-CB-036; V-W5.",
    evidenceIds: ["E-CB-036", "V-W5"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q31",
    topicId: "chemical",
    difficulty: 1,
    prompt:
      "What formula does PubChem give for calcium carbonate, which the 2027 powder list also names as Chalk?",
    choiceTexts: [
      "NaHCO3",
      "NaCl",
      "CaCO3",
      "C12H22O11",
    ],
    correctChoiceId: "c",
    hint: "Use the molecular formula on the inspected calcium carbonate record.",
    explanation:
      "PubChem: calcium carbonate has formula CaCO3 and is discussed as chalk. That powder name is separate from soil type Chalky.",
    cognitiveDemand: "recall",
    sourceType: "pubchem",
    sourceNote: "E-CB-037; V-W7.",
    evidenceIds: ["E-CB-037", "V-W7"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q32",
    topicId: "chemical",
    difficulty: 1,
    prompt:
      "What molecular formula does PubChem list for hydrogen peroxide?",
    choiceTexts: [
      "H2O",
      "CH3COOH",
      "NaClO",
      "H2O2",
    ],
    correctChoiceId: "d",
    hint: "The peroxide record is not the same formula as water.",
    explanation:
      "PubChem CID 784 lists H2O2. The 2027 liquid name includes the qualifier (3%), which is a rules string, not a PubChem bottle assay.",
    cognitiveDemand: "recall",
    sourceType: "pubchem",
    sourceNote: "E-CB-042; V-L3.",
    evidenceIds: ["E-CB-042", "V-L3"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q33",
    topicId: "chemical",
    difficulty: 2,
    prompt:
      "Which use of sodium bicarbonate is stated on the inspected PubChem identification-and-use text?",
    choiceTexts: [
      "Ingredient of baking powder and a source of carbon dioxide",
      "The only official Crime Busters chromatography solvent",
      "A substitute for iodine in starch tests",
      "The formula for liquid bleach",
    ],
    correctChoiceId: "a",
    hint: "Look for baking-powder and carbon-dioxide language, not contest reagents.",
    explanation:
      "PubChem: sodium bicarbonate is used as a source of carbon dioxide and as an ingredient of baking powder (among other uses). That is not a complete contest “uses of every powder” table.",
    cognitiveDemand: "recognition",
    sourceType: "pubchem",
    sourceNote: "E-CB-036.",
    evidenceIds: ["E-CB-036"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q34",
    topicId: "chemical",
    difficulty: 2,
    prompt:
      "Besides industrial filler uses, PubChem states that calcium carbonate is therapeutically used as which of the following?",
    choiceTexts: [
      "A bleach active ingredient",
      "An antacid",
      "Rubbing alcohol",
      "A pH-strip dye",
    ],
    correctChoiceId: "b",
    hint: "Use the therapeutic uses listed on the inspected calcium carbonate record.",
    explanation:
      "PubChem: calcium carbonate is therapeutically used as a food additive, a dietary supplement, an antacid, and a phosphate binder.",
    cognitiveDemand: "recognition",
    sourceType: "pubchem",
    sourceNote: "E-CB-038.",
    evidenceIds: ["E-CB-038"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q35",
    topicId: "chemical",
    difficulty: 2,
    prompt:
      "In the inspected iodine/KI starch procedure, a positive test for starch is which color change?",
    choiceTexts: [
      "The mixture stays yellow-brown and that means starch is present",
      "The mixture turns brick red after boiling with Benedict’s reagent",
      "A bluish black color",
      "Immediate fizzing of carbon dioxide gas",
    ],
    correctChoiceId: "c",
    hint: "The iodine test is a color change without boiling. Fizzing is a different reaction family.",
    explanation:
      "LibreTexts: a bluish black color is a positive test for starch; a yellowish-brown color (no color change) is negative. That does not uniquely identify flour versus cornstarch, which can both contain starch.",
    cognitiveDemand: "application",
    sourceType: "libretexts",
    sourceNote: "E-CB-041.",
    evidenceIds: ["E-CB-041"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q36",
    topicId: "chemical",
    difficulty: 2,
    prompt:
      "According to the inspected OpenStax chemistry remix, carbonates reacting with acids form a salt, water, and which gas?",
    choiceTexts: [
      "Oxygen",
      "Ammonia",
      "Chlorine",
      "Carbon dioxide",
    ],
    correctChoiceId: "d",
    hint: "Use the inspected carbonate-plus-acid products list.",
    explanation:
      "LibreTexts OpenStax remix: carbonates react with acids to form salts of the metal, gaseous carbon dioxide, and water. Example: CaCO3 + 2 HCl → CaCl2 + CO2 + H2O. Hydrogen carbonates also form CO2 with acids, so this test alone does not uniquely identify chalk versus baking soda.",
    cognitiveDemand: "application",
    sourceType: "libretexts",
    sourceNote: "E-CB-039, E-CB-040.",
    evidenceIds: ["E-CB-039", "E-CB-040"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q37",
    topicId: "chemical",
    difficulty: 3,
    prompt:
      "The 2027 rules say powder tests will strictly provide which three materials?",
    choiceTexts: [
      "Iodine, HCl, and distilled water",
      "Benedict’s reagent, limewater, and vinegar",
      "Universal indicator, silver nitrate, and flame tests",
      "Chromatography paper, acetone, and bleach",
    ],
    correctChoiceId: "a",
    hint: "Use the Event Parameters / Chemical Analysis reagent sentence, not a general chemistry lab kit.",
    explanation:
      "The rules state that strictly iodine, HCl, and distilled water will be provided to perform powder tests. Chromatography pen is supplied separately and is not this three-reagent list.",
    cognitiveDemand: "recall",
    sourceType: "rules-derived",
    sourceNote: "RULES_2027.md chemical tests; RS11.",
    evidenceIds: ["RS11"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q38",
    topicId: "chemical",
    difficulty: 3,
    prompt:
      "PubChem notes that isopropanol is sold in about 70% aqueous solution as which household product named in the 2027 liquid list?",
    choiceTexts: [
      "Lemon juice",
      "Rubbing alcohol",
      "Vinegar",
      "Liquid bleach",
    ],
    correctChoiceId: "b",
    hint: "Use the household-product wording on the inspected isopropanol record.",
    explanation:
      "PubChem: sold in 70% aqueous solution as rubbing alcohol. The rules print Rubbing alcohol (isopropyl). The bottle is still a mixture (HR6); this item only matches the named product.",
    cognitiveDemand: "application",
    sourceType: "pubchem",
    sourceNote: "E-CB-043; V-L2.",
    evidenceIds: ["E-CB-043", "V-L2"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q39",
    topicId: "chemical",
    difficulty: 3,
    prompt:
      "PubChem describes sodium hypochlorite as commonly found in which 2027-listed liquid?",
    choiceTexts: [
      "Water",
      "Hydrogen peroxide (3%)",
      "Liquid bleach",
      "Lemon juice",
    ],
    correctChoiceId: "c",
    hint: "Use the household-product wording on the inspected sodium hypochlorite record.",
    explanation:
      "PubChem: sodium hypochlorite is commonly found in household bleach (formula NaClO on that record). Liquid bleach is still a commercial mixture (HR6).",
    cognitiveDemand: "application",
    sourceType: "pubchem",
    sourceNote: "E-CB-045; V-L4.",
    evidenceIds: ["E-CB-045", "V-L4"],
    verificationStatus: "verified",
  }),
  cb({
    id: "cb-q40",
    topicId: "safety",
    difficulty: 1,
    prompt:
      "What do the 2027 Crime Busters rules say about the powders and liquids used for testing?",
    choiceTexts: [
      "Teams must taste each unknown to confirm identity",
      "Only liquids may be tasted; powders may not",
      "Unknowns may be consumed if pH is near 7",
      "Do not consume the powders/liquids used in this event for testing",
    ],
    correctChoiceId: "d",
    hint: "Read the printed NOTE under Chemical Analysis.",
    explanation:
      "The rules include a note: please do not consume the powders/liquids used in this event for testing.",
    cognitiveDemand: "recall",
    sourceType: "rules-derived",
    sourceNote: "V-G6.",
    evidenceIds: ["V-G6"],
    verificationStatus: "verified",
  }),
];

/** Map to the shared Question shape. Keeps verificationStatus for live-practice filtering. */
export function crimeBustersQuestionToPracticeQuestion(
  question: CrimeBustersQuestion,
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
    difficulty: question.difficulty,
    imageRequired: question.imageRequired,
    verificationStatus: question.verificationStatus,
  };
}
