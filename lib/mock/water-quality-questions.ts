/**
 * Water Quality 2027 MVP question bank — wq-q1–wq-q40.
 *
 * Text-only. Content follows the official 2027 rules and established
 * freshwater ecology and water-quality science.
 */
import type {
  DifficultyLevel,
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
    hint: "Match the Class 1 heading printed on the 2027 table. Do not reuse a Class 4 or Class 5 title.",
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
    topicId: "water-monitoring",
    difficulty: 2,
    prompt:
      "A water-treatment plant lets heavy particles settle before water moves through a filter. Why is this sequence useful?",
    choiceTexts: [
      "Settling can remove some solids before filtration and later treatment steps.",
      "Settling turns every dissolved pollutant into oxygen.",
      "Settling makes untreated water safe without any more treatment.",
      "Settling adds nutrients so algae can clean the water.",
    ],
    correctChoiceId: "a",
    hint: "Think about what happens to particles that are heavy enough to sink before the water is filtered.",
    explanation:
      "Settling can remove some suspended solids before filtration and other treatment steps. It does not make water safe by itself or remove every dissolved substance.",
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027.md Freshwater Ecology scope: potable water treatment.",
    evidenceIds: ["RS18"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q3",
    topicId: "water-monitoring",
    difficulty: 2,
    prompt:
      "A wastewater plant treats water before releasing it to a river. Which goal best describes why treatment is needed?",
    choiceTexts: [
      "Reduce solids, harmful substances, and microbes so the release is less damaging.",
      "Add untreated waste so river organisms can get more food.",
      "Make the released water contain no dissolved substances at all.",
      "Change every organism in the wastewater into a macroinvertebrate.",
    ],
    correctChoiceId: "a",
    hint: "Think about which unwanted materials treatment should remove or reduce before water returns to the environment.",
    explanation:
      "Wastewater treatment reduces solids, harmful substances, and microbes before treated water is released. Treatment does not remove every dissolved substance or turn waste into organisms.",
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027.md Freshwater Ecology scope: wastewater treatment.",
    evidenceIds: ["RS18"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q4",
    topicId: "water-monitoring",
    difficulty: 2,
    prompt:
      "A pond has very little dissolved oxygen. Which result is most likely for many aquatic animals?",
    choiceTexts: [
      "They may become stressed because less oxygen is available for them to use.",
      "They may grow faster because low oxygen always increases growth.",
      "They may become pollution-sensitive organisms.",
      "They may make the pond's water less salty.",
    ],
    correctChoiceId: "a",
    hint: "Dissolved oxygen is the oxygen available to living aquatic organisms.",
    explanation:
      "Aquatic animals use dissolved oxygen, so very little dissolved oxygen can stress them or make survival difficult. It does not turn animals into plants or change the pond's salinity.",
    cognitiveDemand: "application",
    sourceType: "usgs-water-science-school",
    sourceNote:
      "USGS Water Science School dissolved-oxygen definition and aquatic-life implications; dissolved oxygen is also a 2027 monitoring parameter.",
    evidenceIds: ["V-U1", "V-W5"],
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
    topicId: "macroinvertebrates",
    difficulty: 2,
    prompt:
      "An adult aquatic insect has two pairs of wings, two or three tail filaments, and wings held upright. Which listed common name best matches it?",
    choiceTexts: [
      "Mayfly",
      "Caddisfly",
      "Stonefly",
      "Water Penny",
    ],
    correctChoiceId: "a",
    hint: "Mayflies are known for their delicate wings and tail filaments.",
    explanation:
      "Mayfly is the listed common name that matches an adult insect with two pairs of wings and tail filaments. Caddisflies, stoneflies, and water pennies have different adult features.",
    cognitiveDemand: "recognition",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027.md adult macroinvertebrate list; common-name identification uses Mayfly, Caddisfly, Stonefly, and Water Penny.",
    evidenceIds: ["V-M01", "V-M02", "V-M03", "V-M05"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q7",
    topicId: "macroinvertebrates",
    difficulty: 2,
    prompt:
      "Which general feeding habit best describes Tubifex in freshwater?",
    choiceTexts: [
      "It feeds on organic matter in sediment.",
      "It grazes algae from rocks.",
      "It hunts small aquatic animals.",
      "It filters tiny food particles from flowing water.",
    ],
    correctChoiceId: "a",
    hint: "Think about an organism that lives in or near soft bottom sediment.",
    explanation:
      "Tubifex are generally deposit feeders: they take in organic matter from bottom sediment. They are not photosynthetic plants or animals that hunt flying insects.",
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027.md Freshwater Macroinvertebrates scope: general ecology and feeding habits of listed organisms; Tubifex is listed.",
    evidenceIds: ["RS18", "V-M17"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q8",
    topicId: "indicator-classes",
    difficulty: 2,
    prompt:
      "A stream has many mayflies and stoneflies, but very few pollution-tolerant organisms. What does this most likely suggest?",
    choiceTexts: [
      "The stream likely has relatively good water quality.",
      "The stream likely has poor water quality because sensitive organisms need pollution.",
      "The stream has no living organisms besides the listed ones.",
      "The organisms prove that the stream has a particular temperature.",
    ],
    correctChoiceId: "a",
    hint: "Mayflies and stoneflies are pollution-sensitive listed organisms.",
    explanation:
      "Many pollution-sensitive organisms and few pollution-tolerant organisms are evidence consistent with relatively good water quality. The organisms do not prove the water is salt water or reveal its exact temperature.",
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027.md Freshwater Macroinvertebrates scope: indicator classes and pollution tolerance.",
    evidenceIds: ["RS18", "V-M01", "V-M03"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q9",
    topicId: "water-monitoring",
    difficulty: 2,
    prompt:
      "A frog population in a pond grows for several years. Then food and space become limited, and the population stays near the same size despite new births. What idea best explains this pattern?",
    choiceTexts: [
      "The pond's carrying capacity limits the population size.",
      "The frogs have stopped being part of the food web.",
      "The pond has become an aquatic nuisance plant.",
      "The frogs have changed into pollution-sensitive organisms.",
    ],
    correctChoiceId: "a",
    hint: "Look for the idea that food, space, and other resources set a limit on how large a population can remain.",
    explanation:
      "A carrying capacity is the population size an environment can support with its available resources. Limited food and space can keep a population near that level.",
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027.md Freshwater Ecology scope: population dynamics.",
    evidenceIds: ["RS18"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q10",
    topicId: "water-monitoring",
    difficulty: 1,
    prompt:
      "After rain falls, some water flows over land into a stream. Why is this part of the water cycle important to freshwater ecosystems?",
    choiceTexts: [
      "Runoff returns water to streams and can carry materials into the ecosystem.",
      "Runoff changes every freshwater organism into a land organism.",
      "Runoff stops evaporation from all lakes and rivers.",
      "Runoff makes every stream have the same temperature.",
    ],
    correctChoiceId: "a",
    hint: "Runoff is water moving over land toward a stream, lake, or other body of water.",
    explanation:
      "Runoff is part of the water cycle. It returns water to freshwater systems and can carry soil, nutrients, or other materials into them, affecting the ecosystem.",
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027.md Freshwater Ecology scope: water cycle and freshwater ecosystem relationships.",
    evidenceIds: ["RS18"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q11",
    topicId: "macroinvertebrates",
    difficulty: 2,
    prompt:
      "In a freshwater food web, algae are eaten by mayflies, and mayflies are eaten by fish. If mayflies become much less common, what is a likely short-term effect?",
    choiceTexts: [
      "Fish may have less food available.",
      "Algae will stop needing sunlight.",
      "The water will become saltier.",
      "All fish will become pollution-sensitive organisms.",
    ],
    correctChoiceId: "a",
    hint: "Follow the feeding relationship from algae to mayflies to fish.",
    explanation:
      "If mayflies become less common, fish that eat them may have less food available. This is a population and food-web effect; it does not change the water's salinity or the fish into another type of organism.",
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027.md Freshwater Ecology and Freshwater Macroinvertebrates scope: aquatic food webs and general ecology of listed organisms.",
    evidenceIds: ["RS18", "V-M01"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q12",
    topicId: "macroinvertebrates",
    difficulty: 2,
    prompt:
      "Which feeding role is common for many mayfly nymphs in freshwater?",
    choiceTexts: [
      "Scraping algae and collecting small organic particles",
      "Filtering tiny food particles from the water",
      "Hunting large fish as its main food",
      "Shredding fallen leaves as its main food",
    ],
    correctChoiceId: "a",
    hint: "Many mayfly nymphs feed on material growing on or settling over underwater surfaces.",
    explanation:
      "Many mayfly nymphs graze on algae and collect small organic particles. They are not plants, large-fish predators, or consumers of human-made materials.",
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027.md Freshwater Macroinvertebrates scope: general ecology and feeding habits of listed organisms; Mayfly is listed.",
    evidenceIds: ["RS18", "V-M01"],
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
      "Which habitat is most typical for many stoneflies?",
    choiceTexts: [
      "Cool, moving water with plenty of dissolved oxygen",
      "A dry desert with no surface water",
      "A salty ocean beach with no freshwater",
      "A warm puddle with no oxygen",
    ],
    correctChoiceId: "a",
    hint: "Stoneflies are commonly associated with clean, flowing freshwater.",
    explanation:
      "Many stoneflies are associated with cool, flowing freshwater that has plenty of dissolved oxygen. The other choices describe places that do not fit this general habitat.",
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027.md Freshwater Macroinvertebrates scope: general ecology and habitat of listed organisms; Stonefly is listed.",
    evidenceIds: ["RS18", "V-M03"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q15",
    topicId: "indicator-classes",
    difficulty: 2,
    prompt:
      "Site A has mayflies and stoneflies. Site B has mostly Tubifex and leeches. Which site most likely has better water quality?",
    choiceTexts: [
      "Site A, because mayflies and stoneflies are more pollution-sensitive indicators.",
      "Site A, because mayflies always make water colder.",
      "Site B, because Tubifex and leeches cannot live in freshwater.",
      "Site B, because pollution-sensitive organisms prefer more pollution.",
    ],
    correctChoiceId: "a",
    hint: "Compare the pollution-tolerance classes of the organisms found at each site.",
    explanation:
      "Site A most likely has better water quality because mayflies and stoneflies are listed as pollution-sensitive, while Tubifex and leeches are associated with more pollution-tolerant groups.",
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027.md adult macroinvertebrate table and indicator-class headings; comparison uses listed organisms.",
    evidenceIds: ["V-M01", "V-M03", "V-M14", "V-M17", "V-C1", "V-C3", "V-C4"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q16",
    topicId: "macroinvertebrates",
    difficulty: 2,
    prompt:
      "What is a common ecological role of Water Penny larvae in a stream?",
    choiceTexts: [
      "They scrape algae and other growth from rocks.",
      "They shred fallen leaves in the stream.",
      "They filter tiny food particles from the water.",
      "They prey on fish as their main food.",
    ],
    correctChoiceId: "a",
    hint: "Think about a small larva attached to hard surfaces in flowing water.",
    explanation:
      "Water Penny larvae commonly graze on algae and other growth on rocks. The other choices do not describe a freshwater macroinvertebrate feeding role.",
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027.md Freshwater Macroinvertebrates scope: general ecology and feeding habits of listed organisms; Water Penny is listed.",
    evidenceIds: ["RS18", "V-M05"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q17",
    topicId: "macroinvertebrates",
    difficulty: 2,
    prompt:
      "Which observation is an example of a community interaction involving a listed macroinvertebrate?",
    choiceTexts: [
      "A fish eats a mayfly nymph.",
      "A thermometer measures water temperature.",
      "A pH test measures how acidic or basic water is.",
      "Rainwater moves over land into a stream.",
    ],
    correctChoiceId: "a",
    hint: "A community interaction involves living organisms affecting one another.",
    explanation:
      "A fish eating a mayfly nymph is an interaction between living organisms in a freshwater community. The other choices describe monitoring or water-cycle processes rather than an interaction between organisms.",
    cognitiveDemand: "recognition",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027.md Freshwater Ecology and Freshwater Macroinvertebrates scope: community interactions and listed organisms.",
    evidenceIds: ["RS18", "V-M01"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q18",
    topicId: "nuisance-species",
    difficulty: 2,
    prompt:
      "Why can Zebra Mussels harm a freshwater ecosystem?",
    choiceTexts: [
      "They can filter large amounts of food from the water and compete with native organisms.",
      "They can increase water clarity without changing food availability.",
      "They can make native organisms grow faster by adding food.",
      "They can change only the water temperature and no other resource.",
    ],
    correctChoiceId: "a",
    hint: "Think about how a nuisance species can change available food and resources.",
    explanation:
      "Zebra Mussels can filter plankton and other food from the water and compete with native organisms, changing resource availability and food-web relationships.",
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027.md harmful species and Aquatic Nuisance Animals scope; Zebra Mussel is listed.",
    evidenceIds: ["RS18", "V-A1"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q19",
    topicId: "macroinvertebrates",
    difficulty: 1,
    prompt:
      "A small aquatic beetle larva clings to rocks and scrapes algae from their surfaces. Which listed common name best matches it?",
    choiceTexts: [
      "Water Penny",
      "Blackfly",
      "Stonefly",
      "Tubifex",
    ],
    correctChoiceId: "a",
    hint: "Look for the listed name associated with a small beetle that lives on stream rocks.",
    explanation:
      "Water Penny is the listed common name that best matches an aquatic beetle larva associated with scraping algae from rocks. Blackfly, stonefly, and Tubifex have different forms and feeding roles.",
    cognitiveDemand: "recognition",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027.md adult macroinvertebrate list; common-name identification uses Water Penny, Blackfly, Stonefly, and Tubifex.",
    evidenceIds: ["V-M05", "V-M12", "V-M03", "V-M17"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q20",
    topicId: "macroinvertebrates",
    difficulty: 2,
    prompt:
      "An adult aquatic insect is a small beetle with hardened wing covers and is found crawling on rocks in fast-flowing streams. Which listed common name best matches it?",
    choiceTexts: [
      "Riffle Beetle",
      "Mayfly",
      "Caddisfly",
      "Blackfly",
    ],
    correctChoiceId: "a",
    hint: "Use the beetle body covering and the flowing-stream habitat together, not just one feature.",
    explanation:
      "Riffle Beetle is the listed common name that best matches a small beetle associated with rocks in flowing water. Mayfly, caddisfly, and blackfly are different types of listed aquatic insects.",
    cognitiveDemand: "recognition",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027.md adult macroinvertebrate list and general ecology of listed organisms; Riffle Beetle is listed.",
    evidenceIds: ["RS18", "V-M06", "V-M01", "V-M02", "V-M12"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q21",
    topicId: "nuisance-species",
    difficulty: 2,
    prompt:
      "Eurasian Water Milfoil forms a dense mat near the surface of a lake. What is one likely ecological effect?",
    choiceTexts: [
      "It can block light and crowd out native aquatic plants.",
      "It can add unlimited dissolved oxygen to deep water.",
      "It can turn all freshwater into salt water.",
      "It can make every aquatic animal tolerate pollution.",
    ],
    correctChoiceId: "a",
    hint: "Think about what a thick floating plant mat can block and what resources nearby plants need.",
    explanation:
      "A dense Eurasian Water Milfoil mat can block light and use space and resources that native aquatic plants need. It does not add unlimited oxygen or change freshwater into salt water.",
    cognitiveDemand: "recognition",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027.md Aquatic Nuisance Plants scope; Eurasian Water Milfoil is listed.",
    evidenceIds: ["RS18", "V-P2"],
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
    hint: "Compare the Aquatic Nuisance Plants list with the Aquatic Nuisance Animals list.",
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
    difficulty: 2,
    prompt:
      "What is one possible ecological effect of Water Hyacinth spreading across the surface of a pond?",
    choiceTexts: [
      "A dense mat can block light and reduce space available for native plants.",
      "A dense mat can increase light for plants growing below it.",
      "A dense mat can make every native plant grow equally well.",
      "A dense mat changes the pond's water into seawater.",
    ],
    correctChoiceId: "a",
    hint: "Think about what a thick floating plant mat can block or cover.",
    explanation:
      "A dense Water Hyacinth mat can block sunlight and cover space that native plants use. Those changes can disrupt habitats and community relationships.",
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027.md harmful species and Aquatic Nuisance Plants scope; Water Hyacinth is listed.",
    evidenceIds: ["RS18", "V-P3"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q24",
    topicId: "nuisance-species",
    difficulty: 2,
    prompt:
      "Which statement correctly compares two listed aquatic nuisance species?",
    choiceTexts: [
      "Purple Loosestrife is a plant that can form dense stands, while Zebra Mussel is an animal that can compete for food.",
      "Purple Loosestrife is an animal that filters plankton, while Zebra Mussel is a plant.",
      "Both are monitoring parameters used to measure dissolved oxygen.",
      "Both are pollution-sensitive macroinvertebrates found only in clean streams.",
    ],
    correctChoiceId: "a",
    hint: "First identify whether each listed nuisance species is a plant or an animal.",
    explanation:
      "Purple Loosestrife is a listed nuisance plant that can form dense stands. Zebra Mussel is a listed nuisance animal that can compete with native organisms for food and other resources.",
    cognitiveDemand: "distinction",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027.md Aquatic Nuisance Plants and Aquatic Nuisance Animals scope; ecological comparison uses listed species.",
    evidenceIds: ["RS18", "V-P1", "V-A1"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q25",
    topicId: "nuisance-species",
    difficulty: 2,
    prompt:
      "Why can Asian Carp alter a freshwater community or food web?",
    choiceTexts: [
      "They can compete with native fish for food and change how energy moves through the food web.",
      "They are plants that compete with native fish by blocking sunlight.",
      "They make native fish produce their own food.",
      "They can affect only water temperature and not populations or food webs.",
    ],
    correctChoiceId: "a",
    hint: "Consider what could happen if a new animal uses food that native animals also need.",
    explanation:
      "Asian Carp can compete with native fish for shared food resources. That competition can change population sizes and food-web relationships.",
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027.md harmful species and Aquatic Nuisance Animals scope; Asian Carp is listed.",
    evidenceIds: ["RS18", "V-A4"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q26",
    topicId: "nuisance-species",
    difficulty: 2,
    prompt:
      "The 2027 rules print both Mosquito and Asian Tiger Mosquito. How are those two strings placed?",
    choiceTexts: [
      "Both are Class 5 - Air Breathing table names",
      "Both are Aquatic Nuisance Animals strings",
      "Mosquito is a Class 5 table name; Asian Tiger Mosquito is an Aquatic Nuisance Animals string",
      "Asian Tiger Mosquito is Class 5; Mosquito is an Aquatic Nuisance Plants name",
    ],
    correctChoiceId: "c",
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
    difficulty: 2,
    prompt:
      "A stream was measured after a storm:\n\nTime | Dissolved oxygen | Turbidity\nBefore rain | 8 mg/L | 3 NTU\nSoon after rain | 6 mg/L | 18 NTU\nTwo days later | 7 mg/L | 6 NTU\n\nWhich conclusion is best supported by the data?",
    choiceTexts: [
      "The storm temporarily made the water cloudier and lowered dissolved oxygen.",
      "The storm permanently removed all oxygen from the stream.",
      "The stream became salt water after the storm.",
      "Turbidity and dissolved oxygen always increase together.",
    ],
    correctChoiceId: "a",
    hint: "Compare both measurements before rain, soon after rain, and two days later.",
    explanation:
      "Soon after the storm, turbidity increased from 3 to 18 NTU while dissolved oxygen fell from 8 to 6 mg/L. Two days later, both values moved closer to their starting levels, supporting a temporary change.",
    cognitiveDemand: "multi-step",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027.md Water Monitoring and Analysis scope: interpreting sample data and relationships among parameters.",
    evidenceIds: ["RS18", "V-W4", "V-W5"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q28",
    topicId: "water-monitoring",
    difficulty: 2,
    prompt:
      "A water sample has a high BOD. What does that suggest, and why can it matter?",
    choiceTexts: [
      "Microorganisms may use a lot of oxygen while decomposing organic matter, leaving less for aquatic life.",
      "The water must contain no organisms that can decompose anything.",
      "The sample must have the highest possible dissolved oxygen.",
      "BOD measures how salty the water is.",
    ],
    correctChoiceId: "a",
    hint: "BOD describes oxygen used by microorganisms as they decompose organic matter.",
    explanation:
      "High BOD means microorganisms may consume a lot of oxygen while decomposing organic matter. That can leave less dissolved oxygen available for other aquatic organisms.",
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote:
      "USGS Water Science School BOD definition and aquatic-life implication; BOD is also a 2027 monitoring parameter.",
    evidenceIds: ["V-U7", "V-W8"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q29",
    topicId: "water-monitoring",
    difficulty: 2,
    prompt:
      "Why can a pH far outside the usual range for a freshwater ecosystem be a problem?",
    choiceTexts: [
      "It can stress aquatic organisms and change how some substances behave in the water.",
      "It guarantees that every organism will grow faster.",
      "It proves that the water contains no dissolved substances.",
      "It measures the number of macroinvertebrate species without any sample.",
    ],
    correctChoiceId: "a",
    hint: "pH describes how acidic or basic water is, and organisms have ranges they can tolerate.",
    explanation:
      "pH describes how acidic or basic water is. A value far outside the range that organisms tolerate can stress aquatic life and affect water chemistry.",
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027.md Water Monitoring and Analysis scope: pH and aquatic chemistry implications.",
    evidenceIds: ["RS18", "V-W2"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q30",
    topicId: "water-monitoring",
    difficulty: 2,
    prompt:
      "What can increased turbidity indicate or cause in a freshwater ecosystem?",
    choiceTexts: [
      "It can indicate suspended particles and reduce the light available to aquatic plants.",
      "It proves that the water has no sediment or particles.",
      "It always increases the amount of light reaching underwater plants.",
      "It identifies the exact species of every macroinvertebrate present.",
    ],
    correctChoiceId: "a",
    hint: "Turbidity is related to how much suspended material makes water look cloudy.",
    explanation:
      "Increased turbidity can result from suspended particles such as sediment. Cloudier water can reduce light reaching aquatic plants and may affect aquatic habitats.",
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027.md Water Monitoring and Analysis scope: turbidity, sedimentation pollution, and aquatic-ecology implications.",
    evidenceIds: ["RS18", "V-W4"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q31",
    topicId: "water-monitoring",
    difficulty: 2,
    prompt:
      "How can high levels of nitrates and phosphates affect a freshwater ecosystem?",
    choiceTexts: [
      "They can add nutrients that increase algal or plant growth and later reduce dissolved oxygen.",
      "They remove all nutrients and stop plant growth.",
      "They always make dissolved oxygen increase without limit.",
      "They turn macroinvertebrates into monitoring instruments.",
    ],
    correctChoiceId: "a",
    hint: "Nitrates and phosphates are nutrients; too much of a nutrient can change plant and algae growth.",
    explanation:
      "Nitrates and phosphates are nutrients. In excess, they can stimulate algal or aquatic-plant growth; decomposition and other processes can then reduce dissolved oxygen. The 2027 rules specifically list nitrates and phosphates as monitoring parameters.",
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027.md Water Monitoring and Analysis scope: nitrates, phosphates, nutrient cycling, and aquatic-ecology implications.",
    evidenceIds: ["RS18", "V-W3", "V-W7"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q32",
    topicId: "water-monitoring",
    difficulty: 2,
    prompt:
      "Two freshwater sites were tested. Site A had DO 8, BOD 2, turbidity 2, and nitrate 1. Site B had DO 3, BOD 7, turbidity 25, and nitrate 8. Which site appears healthier for many aquatic organisms?",
    choiceTexts: [
      "Site A, because it has more dissolved oxygen and lower BOD, turbidity, and nitrate.",
      "Site A, because higher turbidity always means cleaner water.",
      "Site B, because lower dissolved oxygen gives aquatic animals more energy.",
      "Site B, because higher BOD always means more oxygen is available.",
    ],
    correctChoiceId: "a",
    hint: "Compare all four values. More dissolved oxygen and less BOD, turbidity, and nitrate are the useful clues here.",
    explanation:
      "Site A appears healthier for many aquatic organisms in this comparison: it has more dissolved oxygen and lower BOD, turbidity, and nitrate. The values are supplied for comparison; no single cutoff is assumed.",
    cognitiveDemand: "multi-step",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027.md Water Monitoring and Analysis scope: analysis, relationships among parameters, and inference from sample data.",
    evidenceIds: ["RS18", "V-W3", "V-W4", "V-W5", "V-W7", "V-W8"],
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
    hint: "Use the USGS definition of oxygen dissolved in water. Do not pick a 2027 organism or class title.",
    explanation:
      "USGS: “Dissolved oxygen (DO) is a measure of how much oxygen is dissolved in the water - the amount of oxygen available to living aquatic organisms.” It is also a named 2027 monitoring parameter, but the definition comes from USGS, not from the rules table.",
    cognitiveDemand: "application",
    sourceType: "rules-derived",
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
    difficulty: 2,
    prompt:
      "A team wants to compare turbidity at two stream sites. Which procedure makes the comparison fairest?",
    choiceTexts: [
      "Collect equal-volume samples at comparable depths and times, then use the same test method.",
      "Collect one sample from the surface at one site and a bottom sample at the other using different tests.",
      "Choose whichever sample looks clearest and record only that result.",
      "Change the sample volume at each site until the readings match.",
    ],
    correctChoiceId: "a",
    hint: "A fair comparison keeps the sampling conditions and measurement method as similar as possible.",
    explanation:
      "Using comparable depths and times, equal sample volumes, and the same test method helps make differences in turbidity more likely to reflect the sites rather than the sampling procedure.",
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027.md Water Monitoring and Analysis scope: collecting and interpreting water-quality data.",
    evidenceIds: ["RS18"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q36",
    topicId: "water-monitoring",
    difficulty: 1,
    prompt:
      "Nitrates are a monitoring parameter. Nitrogen in the form of nitrate is which of the following?",
    choiceTexts: [
      "A Class 4 - Pollution Tolerant common name",
      "An Aquatic Nuisance Plant",
      "A measure of how much oxygen is dissolved in the water",
      "A nutrient needed for plant growth",
    ],
    correctChoiceId: "d",
    hint: "USGS describes nitrate as a form of nitrogen used as a plant nutrient. Do not use unsourced concentration limits.",
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
    difficulty: 2,
    prompt:
      "A water sample has 9 mg/L of dissolved oxygen before microorganisms decompose organic matter and 4 mg/L afterward. What is the oxygen demand shown by this change?",
    choiceTexts: [
      "5 mg/L",
      "13 mg/L",
      "4 mg/L",
      "9 mg/L",
    ],
    correctChoiceId: "a",
    hint: "Find the oxygen decrease by subtracting the later dissolved-oxygen value from the earlier value.",
    explanation:
      "The oxygen demand shown is 9 − 4 = 5 mg/L. Microorganisms used that amount of oxygen while decomposing organic matter, which is the idea behind biochemical oxygen demand.",
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027.md Water Monitoring and Analysis scope: biochemical oxygen demand and relationships among parameters.",
    evidenceIds: ["RS18", "V-W8"],
    verificationStatus: "verified",
  }),
  wq({
    id: "wq-q38",
    topicId: "water-monitoring",
    difficulty: 2,
    prompt:
      "What can too much phosphate in water do?",
    choiceTexts: [
      "Increase nutrient levels that can speed up eutrophication",
      "Replace salinity on the 2027 eight-parameter list",
      "Increase dissolved oxygen without limit",
      "Prove that every listed macroinvertebrate needs the same pH",
    ],
    correctChoiceId: "a",
    hint: "Phosphate is a nutrient, and too much nutrient input can cause excessive growth.",
    explanation:
      "Phosphate is a form of phosphorus nutrient. Too much phosphate can contribute to eutrophication, in which excess growth and decomposition can reduce dissolved oxygen. Phosphates are one of the 2027 monitoring parameters.",
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027.md Water Monitoring and Analysis scope: phosphates, nutrient cycling, and aquatic-ecology implications.",
    evidenceIds: ["RS18", "V-W3"],
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
    hint: "USGS defines saline water using dissolved salts. Do not use parts-per-million classification bands.",
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
    difficulty: 2,
    prompt:
      "What does biochemical oxygen demand (BOD) represent?",
    choiceTexts: [
      "The official 2027 title of Class 2 - Moderately Sensitive",
      "An Aquatic Nuisance Animals string",
      "How much oxygen is dissolved in the water available to living aquatic organisms",
      "The amount of oxygen consumed by bacteria and other microorganisms while they decompose organic matter under aerobic conditions at a specified temperature",
    ],
    correctChoiceId: "d",
    hint: "BOD is about oxygen used while microbes break down organic matter. That is not the same sentence USGS uses for dissolved oxygen.",
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
    difficulty: question.difficulty,
    imageRequired: question.imageRequired,
    verificationStatus: question.verificationStatus,
  };
}
