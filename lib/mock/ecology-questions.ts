/**
 * Ecology 2027 MVP question bank — eco-q1–eco-q40.
 *
 * Text-only items after Phase 5 QA. Facts are limited to T1-RULES closed names and
 * inspected quotations in docs/events/ecology/EVIDENCE_MATRIX_2027.md.
 *
 * Registered in curriculum.ts. The catalog event is unlocked for shared practice.
 */
import { optionalSecondHintFields } from "@/lib/practice";
import { optionalQuestionHelpFields } from "@/lib/question-help";
import type {
  DifficultyLevel,
  PromptTermRef,
  Question,
  QuestionVerificationStatus,
} from "@/lib/types";

export const ECOLOGY_EVENT_ID = "ecology";

export const ECOLOGY_TOPIC_IDS = [
  "organization-and-energy",
  "communities-and-succession",
  "populations-and-evolution",
  "terrestrial-ecosystems",
  "human-impact",
] as const;

export type EcologyTopicId = (typeof ECOLOGY_TOPIC_IDS)[number];

export type EcologyCognitiveDemand =
  | "recall"
  | "recognition"
  | "distinction"
  | "application"
  | "multi-step";

export type EcologySourceType =
  | "rules-derived"
  | "openstax"
  | "epa"
  | "noaa"
  | "nws"
  | "iucn"
  | "nisic"
  | "eia";

export type EcologyQuestion = Question & {
  topicId: EcologyTopicId;
  cognitiveDemand: EcologyCognitiveDemand;
  sourceType: EcologySourceType;
  sourceNote: string;
  evidenceIds: string[];
  verificationStatus: QuestionVerificationStatus;
  imageRequired: false;
};

const EVENT_ID = ECOLOGY_EVENT_ID;

function eco(input: {
  id: string;
  topicId: EcologyTopicId;
  difficulty: DifficultyLevel;
  prompt: string;
  choiceTexts: [string, string, string, string];
  correctChoiceId: "a" | "b" | "c" | "d";
  hint: string;
  hint2?: string;
  promptTerms?: PromptTermRef[];
  wordingHelp?: string;
  explanation: string;
  cognitiveDemand: EcologyCognitiveDemand;
  sourceType: EcologySourceType;
  sourceNote: string;
  evidenceIds: string[];
  verificationStatus: QuestionVerificationStatus;
}): EcologyQuestion {
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

export const MOCK_ECOLOGY_QUESTIONS: EcologyQuestion[] = [
  eco({
    id: "eco-q1",
    topicId: "organization-and-energy",
    difficulty: 1,
    prompt:
      "Levels of ecological organization are listed as Individual → Population → Community → Ecosystem → Biome → Biosphere. Which level comes immediately after Community?",
    choiceTexts: [
      "Population",
      "Individual",
      "Biosphere",
      "Ecosystem",
    ],
    correctChoiceId: "d",
    hint: "Use the printed arrow sequence. Skip levels that appear before Community and the last level in the list.",
    explanation:
      "The printed order is Individual → Population → Community → Ecosystem → Biome → Biosphere, so Ecosystem follows Community. Population and Individual come earlier; Biosphere is last.",
    cognitiveDemand: "recall",
    sourceType: "rules-derived",
    sourceNote: "RULES_2027.md organization sequence; EVIDENCE_MATRIX_2027.md V-ORG.",
    evidenceIds: ["V-ORG"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q2",
    topicId: "organization-and-energy",
    difficulty: 1,
    prompt:
      "Which description matches a population?",
    choiceTexts: [
      "All parts of Earth inhabited by life",
      "A large area of land with similar climate, plants, and animals",
      "A group of interbreeding organisms of the same species living in the same area at the same time",
      "The different species in an area and the interactions among them",
    ],
    correctChoiceId: "c",
    hint: "Look for one species sharing a place and time, not every species in an area and not the whole planet.",
    explanation:
      "A population is a group of interbreeding organisms that are members of the same species living in the same area at the same time. The other choices describe the biosphere, a biome, and a community.",
    cognitiveDemand: "recognition",
    sourceType: "openstax",
    sourceNote: "OpenStax Biology 2e §44.1; V-F6. Distractors from V-F7, V-F9, V-F10.",
    evidenceIds: ["V-F6", "V-F7", "V-F9", "V-F10"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q3",
    topicId: "organization-and-energy",
    difficulty: 2,
    prompt:
      "How does a biological community differ from a population?",
    choiceTexts: [
      "A community is one species in one area; a population includes every living and nonliving thing there",
      "A community is all of Earth inhabited by life; a population is a climate zone",
      "A community includes the different species in an area and their interactions; a population is one species in one area at one time",
      "A community is only the nonliving parts of an area; a population is only plants",
    ],
    correctChoiceId: "c",
    hint: "Ask whether more than one species is included, and whether nonliving things are part of the definition.",
    explanation:
      "A biological community consists of the different species within an area and the interactions among them. A population is one species living in the same area at the same time. An ecosystem, not a community, adds abiotic components.",
    cognitiveDemand: "distinction",
    sourceType: "openstax",
    sourceNote: "V-F6 and V-F7. Ecosystem contrast V-F8.",
    evidenceIds: ["V-F6", "V-F7", "V-F8"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q4",
    topicId: "organization-and-energy",
    difficulty: 2,
    prompt:
      "Which statement describes an ecosystem?",
    choiceTexts: [
      "It is only the members of one species that can interbreed in one place",
      "It is a name for Earth’s atmosphere above the clouds only",
      "It is a list of greenhouse gases that trap heat",
      "It includes the living organisms in an area and their interactions with nonliving parts of that area, such as air, water, and soil",
    ],
    correctChoiceId: "d",
    hint: "Look for both living (biotic) and nonliving (abiotic) parts.",
    explanation:
      "An ecosystem is composed of the biotic components in an area along with the abiotic components, including air, water, and soil. One interbreeding species is a population. Greenhouse gases are a climate topic, not the definition of an ecosystem.",
    cognitiveDemand: "application",
    sourceType: "openstax",
    sourceNote: "V-F8.",
    evidenceIds: ["V-F8"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q5",
    topicId: "organization-and-energy",
    difficulty: 1,
    prompt:
      "What do food webs illustrate?",
    choiceTexts: [
      "How alleles move across a species’ range",
      "How mountains create dry leeward climates",
      "How sulfur dioxide becomes acid rain",
      "How energy flows directionally through ecosystems",
    ],
    correctChoiceId: "d",
    hint: "Think about what is passed from one feeding level to the next, and in which direction.",
    explanation:
      "Food webs illustrate how energy flows directionally through ecosystems. Gene flow, rain shadows, and acid rain are different processes.",
    cognitiveDemand: "recall",
    sourceType: "openstax",
    sourceNote: "V-F12.",
    evidenceIds: ["V-F12"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q6",
    topicId: "organization-and-energy",
    difficulty: 3,
    prompt:
      "Which statement about ecological pyramids is accurate?",
    choiceTexts: [
      "Energy pyramids are often inverted because heat is created at every step",
      "Pyramids of numbers are always upright in every ecosystem",
      "Energy pyramids must stay upright because some energy is lost as heat at each transfer, so less energy is available at each higher trophic level",
      "Biomass pyramids can never be inverted",
    ],
    correctChoiceId: "c",
    hint: "Compare energy pyramids with pyramids of numbers or biomass. Which shape is required by energy loss as heat?",
    explanation:
      "Energy pyramids must always be upright because during energy transfer some energy is lost as heat, so less energy is available at each higher trophic level. Pyramids of numbers can be upright or inverted. Biomass pyramids can also be inverted in some ecosystems.",
    cognitiveDemand: "distinction",
    sourceType: "openstax",
    sourceNote: "V-F15, V-F16, V-F17. Does not use the 10% rule (SN1).",
    evidenceIds: ["V-F15", "V-F16", "V-F17"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q7",
    topicId: "organization-and-energy",
    difficulty: 1,
    prompt:
      "What is a biogeochemical cycle?",
    choiceTexts: [
      "The always-upright shape of an energy pyramid",
      "The maximum population size an environment can support",
      "The deflection of moving air to the right in the Northern Hemisphere",
      "The recycling of inorganic matter between living organisms and their environment",
    ],
    correctChoiceId: "d",
    hint: "The name combines biology with geology and chemistry. What is being recycled?",
    explanation:
      "A biogeochemical cycle is the recycling of inorganic matter between living organisms and their environment. The other choices describe energy pyramids, carrying capacity, and the Coriolis effect.",
    cognitiveDemand: "recall",
    sourceType: "openstax",
    sourceNote: "V-F18.",
    evidenceIds: ["V-F18"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q8",
    topicId: "communities-and-succession",
    difficulty: 1,
    prompt:
      "When does primary succession occur?",
    choiceTexts: [
      "When two species compete for all the same resources in one niche",
      "When a disturbance leaves remnants of the previous community",
      "When newly exposed or newly formed land is colonized by living things",
      "When a community stays unchanged until the next fire or storm",
    ],
    correctChoiceId: "c",
    hint: "Compare brand-new ground with a place that still has leftover community.",
    explanation:
      "In primary succession, newly exposed or newly formed land is colonized by living things. Secondary succession is when part of an ecosystem is disturbed and remnants of the previous community remain. Competitive exclusion and climax are different ideas.",
    cognitiveDemand: "recognition",
    sourceType: "openstax",
    sourceNote: "V-F19. Seral stages are not tested (SN5).",
    evidenceIds: ["V-F19"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q9",
    topicId: "communities-and-succession",
    difficulty: 2,
    prompt:
      "In a mutualism, what happens to the two species?",
    choiceTexts: [
      "One species benefits and the other is harmed",
      "One species benefits and the other is neither helped nor harmed",
      "Both species are harmed by sharing a niche",
      "Both species benefit from the interaction",
    ],
    correctChoiceId: "d",
    hint: "Compare mutualism with parasitism and commensalism.",
    explanation:
      "Mutualism is a symbiotic relationship in which two species benefit from their interaction. Parasitism benefits the parasite and harms the host. Commensalism benefits one species and neither helps nor harms the other.",
    cognitiveDemand: "distinction",
    sourceType: "openstax",
    sourceNote: "V-F24. Uses the broad OpenStax definition of symbiosis (HR9).",
    evidenceIds: ["V-F24"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q10",
    topicId: "communities-and-succession",
    difficulty: 3,
    prompt:
      "The competitive exclusion principle says that two species cannot coexist in a community if they are competing for all the same resources. What does that mean about their niches?",
    choiceTexts: [
      "Two species must always live in different biomes",
      "Two species cannot share a food web at any trophic level",
      "Two species cannot both be r-selected",
      "Two species cannot occupy the same niche in a habitat",
    ],
    correctChoiceId: "d",
    promptTerms: [{ glossaryId: "niche" }],
    wordingHelp:
      "This question is asking what the rule says about two species sharing a living space.",
    hint: "The principle is about the same niche and the same full set of resources, not about biomes or life-history labels.",
    explanation:
      "The competitive exclusion principle states that two species cannot occupy the same niche in a habitat: they cannot coexist if they compete for all the same resources. It does not require different biomes or forbid sharing a food web at different niches.",
    cognitiveDemand: "application",
    sourceType: "openstax",
    sourceNote: "V-F23.",
    evidenceIds: ["V-F23"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q11",
    topicId: "populations-and-evolution",
    difficulty: 1,
    prompt:
      "What is carrying capacity, often written as K?",
    choiceTexts: [
      "The number of trophic levels in a food web",
      "The fraction of energy lost as heat at one transfer",
      "The maximum population size that a particular environment can support",
      "The number of species in a community",
    ],
    correctChoiceId: "c",
    hint: "This quantity is an environmental limit on population size, not a count of species or food-web steps.",
    explanation:
      "Carrying capacity, or K, is the maximum population size that a particular environment can support. It is not a count of trophic levels or species.",
    cognitiveDemand: "recall",
    sourceType: "openstax",
    sourceNote: "V-F26. Overshoot and dieback are not tested (SN3).",
    evidenceIds: ["V-F26"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q12",
    topicId: "populations-and-evolution",
    difficulty: 3,
    prompt:
      "How does logistic growth differ from exponential growth in a limited environment?",
    choiceTexts: [
      "Logistic growth assumes unlimited resources and never levels off",
      "Logistic growth occurs only in deserts, and exponential growth occurs only in rainforests",
      "Exponential growth is possible only when resources are unlimited; with limited resources, growth slows and can plateau at carrying capacity",
      "Exponential growth is the same as a Type I survivorship curve",
    ],
    correctChoiceId: "c",
    hint: "Ask whether resources stay unlimited, and whether population size can level off.",
    explanation:
      "Exponential growth is possible only when infinite natural resources are available, which is not the case in the real world. With limited resources, growth can slow and plateau at carrying capacity (logistic growth). This item does not use a doubling-time formula.",
    cognitiveDemand: "distinction",
    sourceType: "openstax",
    sourceNote: "V-F27 qualitative only; no equations (SN24).",
    evidenceIds: ["V-F27"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q13",
    topicId: "populations-and-evolution",
    difficulty: 2,
    prompt:
      "Most density-dependent factors that regulate population growth are biological. Which set matches that description?",
    choiceTexts: [
      "Weather, earthquakes, and chemical pollution",
      "Coriolis deflection and rain shadows",
      "Predation, competition, accumulated waste, and disease",
      "Solar panel manufacturing and nuclear waste storage",
    ],
    correctChoiceId: "c",
    promptTerms: [{ glossaryId: "density-dependent" }],
    wordingHelp:
      "This question is asking which group of things matches that kind of population limit.",
    hint: "Density-dependent examples here are living interactions and their by-products, not weather.",
    explanation:
      "Most density-dependent factors are biotic and include predation, inter- and intraspecific competition, accumulation of waste, and diseases. Weather, natural disasters, and pollution are typically density-independent.",
    cognitiveDemand: "recognition",
    sourceType: "openstax",
    sourceNote: "V-F28. Contrast V-F29.",
    evidenceIds: ["V-F28", "V-F29"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q14",
    topicId: "populations-and-evolution",
    difficulty: 3,
    prompt:
      "A forest fire kills deer whether the deer population is dense or sparse. What kind of factor is the fire?",
    choiceTexts: [
      "A density-dependent factor, because fires only start when deer are crowded",
      "A biogeochemical cycle, because ash returns nutrients",
      "A climax community, because fire ends succession",
      "A density-independent factor, because it influences mortality regardless of population density",
    ],
    correctChoiceId: "d",
    hint: "Does the chance of dying in the fire depend on how many deer are present?",
    explanation:
      "Density-independent factors influence mortality regardless of density. OpenStax includes weather, natural disasters, and pollution in that set. A forest fire is a natural disaster, so it fits that class.",
    cognitiveDemand: "application",
    sourceType: "openstax",
    sourceNote: "V-F29.",
    evidenceIds: ["V-F29"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q15",
    topicId: "populations-and-evolution",
    difficulty: 2,
    prompt:
      "Which life-history pattern matches r-selected species?",
    choiceTexts: [
      "They live long, mature late, and give long-term parental care to few offspring",
      "They always occupy the same niche as a K-selected species",
      "They mature early, have short lifespans, and produce many offspring that receive no parental care",
      "They cannot live below carrying capacity",
    ],
    correctChoiceId: "c",
    hint: "Compare early maturity and many unattended offspring with long life and few, well-cared-for offspring.",
    explanation:
      "r-selected species mature early, have short lifespans, and produce many offspring that receive no parental care. K-selected species live long, mature late, and provide long-term parental care to few offspring.",
    cognitiveDemand: "distinction",
    sourceType: "openstax",
    sourceNote: "V-F32. Official names V-LHS. Does not treat r/K as outdated (HR10) in the keyed answer.",
    evidenceIds: ["V-F32", "V-LHS"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q16",
    topicId: "populations-and-evolution",
    difficulty: 1,
    prompt:
      "Stabilizing selection favors which phenotypes?",
    choiceTexts: [
      "Only the two most extreme phenotypes, while selecting against the average",
      "Only phenotypes at one end of the range of variation",
      "Only alleles that arrive by gene flow",
      "An average phenotype, while selecting against extreme variation",
    ],
    correctChoiceId: "d",
    promptTerms: [{ glossaryId: "phenotype" }],
    wordingHelp: "This question is asking which kind of trait is favored.",
    hint: "Which part of the trait range is favored, and what happens to the extremes?",
    explanation:
      "If natural selection favors an average phenotype, selecting against extreme variation, the population undergoes stabilizing selection. Directional selection favors one end of the range. Diversifying/disruptive selection is not used as a keyed definition here.",
    cognitiveDemand: "recall",
    sourceType: "openstax",
    sourceNote: "V-F34. Disruptive vs diversifying is not keyed (HR11).",
    evidenceIds: ["V-F34", "V-F35"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q17",
    topicId: "populations-and-evolution",
    difficulty: 3,
    prompt:
      "How does allopatric speciation differ from sympatric speciation?",
    choiceTexts: [
      "Allopatric speciation happens in the same location; sympatric speciation requires a new continent",
      "Allopatric speciation involves geographic separation of populations; sympatric speciation occurs while the parent species remains in one location",
      "Allopatric speciation is the same as genetic drift; sympatric speciation is the same as gene flow",
      "Allopatric speciation produces energy pyramids; sympatric speciation produces biomass pyramids",
    ],
    correctChoiceId: "b",
    hint: "The prefixes refer to “other homeland” versus “same homeland.”",
    explanation:
      "Allopatric speciation involves geographic separation of populations from a parent species and subsequent evolution. Sympatric speciation occurs within a parent species remaining in one location.",
    cognitiveDemand: "distinction",
    sourceType: "openstax",
    sourceNote: "V-F39; official names V-SPE.",
    evidenceIds: ["V-F39", "V-SPE"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q18",
    topicId: "populations-and-evolution",
    difficulty: 1,
    prompt:
      "What is gene flow?",
    choiceTexts: [
      "The movement of alleles across a species’ range as individuals move and mate",
      "A chance change in allele frequencies, including a founder effect",
      "Selection for an average phenotype",
      "Colonization of newly formed land",
    ],
    correctChoiceId: "a",
    hint: "Gene flow is about alleles traveling with individuals that move, not about random sampling alone.",
    explanation:
      "Gene flow is the movement of alleles across a species’ range, relatively free because individuals can move and then mate in a new location. Genetic drift is a chance change in allele frequencies.",
    cognitiveDemand: "recall",
    sourceType: "openstax",
    sourceNote: "V-F41. Contrast V-F42.",
    evidenceIds: ["V-F41", "V-F42"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q19",
    topicId: "terrestrial-ecosystems",
    difficulty: 1,
    prompt:
      "Because Earth rotates, moving air is deflected. In the Northern Hemisphere, that deflection is toward which side of the direction of motion?",
    choiceTexts: [
      "To the left",
      "Straight up, away from the surface",
      "To the right",
      "Only toward the equator, never sideways",
    ],
    correctChoiceId: "c",
    hint: "Northern and Southern Hemispheres deflect opposite ways.",
    explanation:
      "The Coriolis force causes moving objects, including air, to veer to the right in the Northern Hemisphere and to the left in the Southern Hemisphere. This item does not test Hadley-cell biome belts.",
    cognitiveDemand: "recall",
    sourceType: "nws",
    sourceNote: "V-F44. Mechanism of biome belts not tested (SN12).",
    evidenceIds: ["V-F44"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q20",
    topicId: "terrestrial-ecosystems",
    difficulty: 2,
    prompt:
      "Winds blow perpendicular to a mountain range. Where is precipitation enhanced, and where is it drastically reduced?",
    choiceTexts: [
      "Enhanced on the leeward side; reduced on the windward side",
      "Equal on both sides because of the Coriolis effect",
      "Enhanced on the windward side; drastically reduced on the leeward side",
      "Enhanced only at the equator, never on mountains",
    ],
    correctChoiceId: "c",
    promptTerms: [{ glossaryId: "precipitation" }],
    wordingHelp:
      "This question is asking where rain increases and where it drops a lot when wind hits mountains.",
    hint: "Windward faces the incoming wind; leeward is the other side of the range.",
    explanation:
      "In the rain shadow effect, winds normal to a mountain range result in enhanced precipitation on the windward side and drastically reduced precipitation on the leeward side.",
    cognitiveDemand: "application",
    sourceType: "nws",
    sourceNote: "V-F45.",
    evidenceIds: ["V-F45"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q21",
    topicId: "terrestrial-ecosystems",
    difficulty: 1,
    prompt:
      "Temperate grasslands in central North America are also known as prairies. What dominates that biome?",
    choiceTexts: [
      "Broadleaf evergreen trees that never lose leaves",
      "Grasses",
      "Giant kelp forests",
      "Lichens on polar ice only",
    ],
    correctChoiceId: "b",
    promptTerms: [{ glossaryId: "temperate" }, { glossaryId: "biome" }],
    wordingHelp:
      "This question is asking what is most common in this type of environment.",
    hint: "Think of open plains rather than closed-canopy forest or ocean.",
    explanation:
      "Temperate grasslands are found throughout central North America, where they are also known as prairies. Savannas and temperate grasslands are dominated by grasses.",
    cognitiveDemand: "recall",
    sourceType: "openstax",
    sourceNote: "V-F50. Does not treat savanna as a featured North American biome (HR1, HR3).",
    evidenceIds: ["V-F50"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q22",
    topicId: "terrestrial-ecosystems",
    difficulty: 2,
    prompt:
      "Which statement describes subtropical deserts?",
    choiceTexts: [
      "They are found only north of the Arctic Circle",
      "They have the same rainfall as tropical rainforests",
      "They are grasslands with scattered trees in Africa only",
      "They are very dry; in some years evaporation exceeds precipitation",
    ],
    correctChoiceId: "d",
    hint: "Deserts are defined here by dryness and water loss, not by polar location.",
    explanation:
      "Subtropical deserts are very dry; in some years evaporation exceeds precipitation. They are not Arctic, not rainforest-wet, and not grasslands with scattered trees.",
    cognitiveDemand: "recognition",
    sourceType: "openstax",
    sourceNote: "V-F51. Distractors are not additional official biome catalog entries.",
    evidenceIds: ["V-F51"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q23",
    topicId: "terrestrial-ecosystems",
    difficulty: 2,
    prompt:
      "How do many desert plants reduce water loss?",
    choiceTexts: [
      "They grow giant thin leaves that stay on the plant all year",
      "They have tiny leaves or no leaves at all",
      "They live only underwater in oases",
      "They rely on rain shadows to stay wet",
    ],
    correctChoiceId: "b",
    hint: "Less leaf surface means less water can evaporate from the plant.",
    explanation:
      "To reduce water loss, many desert plants have tiny leaves or no leaves at all. Ocotillo leaves, for example, appear only after rainfall and then are shed.",
    cognitiveDemand: "application",
    sourceType: "openstax",
    sourceNote: "V-F52. No extra adaptation catalog (SN11).",
    evidenceIds: ["V-F52"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q24",
    topicId: "terrestrial-ecosystems",
    difficulty: 1,
    prompt:
      "Where does Arctic tundra lie relative to boreal forest?",
    choiceTexts: [
      "South of tropical rainforests at the equator",
      "North of the subarctic boreal forest, in Arctic regions of the northern hemisphere",
      "Only on the leeward side of the Sierra Nevada",
      "Only in the deep ocean",
    ],
    correctChoiceId: "b",
    hint: "Use the north-of-boreal-forest location in the Arctic, not the equator or the ocean.",
    explanation:
      "The Arctic tundra lies north of the subarctic boreal forest and is located throughout the Arctic regions of the northern hemisphere. This item does not treat taiga and boreal forest as two different biomes.",
    cognitiveDemand: "recall",
    sourceType: "openstax",
    sourceNote: "V-F48. HR2: no taiga-versus-boreal distinction.",
    evidenceIds: ["V-F48"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q25",
    topicId: "terrestrial-ecosystems",
    difficulty: 1,
    prompt:
      "When ecologists measure biodiversity, what do they take into account?",
    choiceTexts: [
      "Only the height of the tallest trees",
      "Both the number of species and their relative abundance",
      "Only greenhouse-gas concentrations",
      "Only the carrying capacity of one population",
    ],
    correctChoiceId: "b",
    hint: "Diversity is not only a species count; how common each species is also matters.",
    explanation:
      "Biodiversity is a general term for the number of species present in the biosphere, taking into account both the number of species and their relative abundance to each other.",
    cognitiveDemand: "recall",
    sourceType: "openstax",
    sourceNote: "V-F53.",
    evidenceIds: ["V-F53"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q26",
    topicId: "terrestrial-ecosystems",
    difficulty: 2,
    prompt:
      "What is genetic diversity?",
    choiceTexts: [
      "The number of different ecosystems on the planet or in a geographic area",
      "Genetic variation that is the raw material for evolution and adaptation in a species",
      "The always-upright shape of an energy pyramid",
      "The IUCN category Data Deficient",
    ],
    correctChoiceId: "b",
    hint: "This is variation within a species that evolution can use, not a count of ecosystem types.",
    explanation:
      "Genetic diversity, or genetic variation, defines the raw material for evolution and adaptation in a species. Ecosystem diversity is the number of different ecosystems on the planet or within a given geographic area.",
    cognitiveDemand: "distinction",
    sourceType: "openstax",
    sourceNote: "V-F54 vs V-F55.",
    evidenceIds: ["V-F54", "V-F55"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q27",
    topicId: "terrestrial-ecosystems",
    difficulty: 1,
    prompt:
      "Which set is the four named ecosystem-service categories?",
    choiceTexts: [
      "Primary, Secondary, Climax, Seral",
      "Solar, Hydroelectric, Wind, Nuclear",
      "Directional, Stabilizing, Disruptive, Sexual",
      "Provisioning, Regulating, Supporting, Cultural",
    ],
    correctChoiceId: "d",
    hint: "Match the four service names, not succession types, energy types, or selection types.",
    explanation:
      "The four printed ecosystem-service names are Provisioning, Regulating, Supporting, and Cultural. This item does not map examples such as pollination onto those four headings.",
    cognitiveDemand: "recall",
    sourceType: "rules-derived",
    sourceNote: "V-ES. Mapping examples to categories is SN8 / HR12.",
    evidenceIds: ["V-ES"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q28",
    topicId: "human-impact",
    difficulty: 1,
    prompt:
      "What are greenhouse gases?",
    choiceTexts: [
      "Gases that trap heat in the atmosphere",
      "Gases that make ocean water more basic by removing hydrogen ions",
      "Only the noble gases in Earth’s core",
      "Particles of dry acid deposition that never include gases",
    ],
    correctChoiceId: "a",
    hint: "Think about what happens to heat in the air when these gases are present.",
    explanation:
      "Gases that trap heat in the atmosphere are called greenhouse gases. EPA’s main inventory gases include carbon dioxide, methane, nitrous oxide, and fluorinated gases. This item does not mix in OpenStax’s water-vapor list as a keyed catalog.",
    cognitiveDemand: "recall",
    sourceType: "epa",
    sourceNote: "V-F58. Does not key OpenStax’s longer list (HR13).",
    evidenceIds: ["V-F58"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q29",
    topicId: "human-impact",
    difficulty: 3,
    prompt:
      "When the ocean absorbs carbon dioxide from the atmosphere, which chemical change makes it harder for oysters and corals to build shells and skeletons?",
    choiceTexts: [
      "Hydrogen-ion concentration increases, and fewer carbonate ions remain available for calcifying organisms",
      "The ocean becomes more alkaline, so carbonate ions disappear for no chemical reason",
      "Nitrogen gas turns directly into acid rain over the sea",
      "Carrying capacity of the ocean falls to zero",
    ],
    correctChoiceId: "a",
    hint: "Follow carbon dioxide into seawater, then to hydrogen ions and carbonate.",
    explanation:
      "When CO2 is absorbed by seawater, reactions increase hydrogen-ion concentration. Excess hydrogen bonds with carbonate ions, leaving fewer carbonate ions for calcifying organisms to build shells and skeletons. This item stays qualitative and does not require a pH-unit change.",
    cognitiveDemand: "application",
    sourceType: "noaa",
    sourceNote: "V-F60 qualitative only.",
    evidenceIds: ["V-F60"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q30",
    topicId: "human-impact",
    difficulty: 2,
    prompt:
      "Which three are described as the greatest proximate threats to biodiversity?",
    choiceTexts: [
      "Habitat loss, overharvesting, and the introduction of exotic species",
      "Rain shadows, Coriolis deflection, and Type I survivorship",
      "Mutualism, commensalism, and parasitism",
      "Solar, wind, and geothermal energy",
    ],
    correctChoiceId: "a",
    hint: "These threats come from how people use land, harvest wild species, and move species to new places.",
    explanation:
      "The three greatest proximate threats to biodiversity are habitat loss, overharvesting, and the introduction of exotic species. Anthropogenic climate change is named as a fourth major cause predicted to grow, not as one of those three.",
    cognitiveDemand: "recall",
    sourceType: "openstax",
    sourceNote: "V-F61, V-F63.",
    evidenceIds: ["V-F61", "V-F63"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q31",
    topicId: "human-impact",
    difficulty: 1,
    prompt:
      "Which organisms are invasive species?",
    choiceTexts: [
      "Native keystone species that stay inside their historic range",
      "Nonnative organisms that, when introduced outside their native range, threaten the ecosystem balance of that habitat",
      "Any species listed as Least Concern on the IUCN Red List",
      "Only plants with tiny leaves in subtropical deserts",
    ],
    correctChoiceId: "b",
    hint: "Two parts matter: not native to the place, and a threat to that habitat’s balance.",
    explanation:
      "Invasive species are nonnative organisms that, when introduced to an area out of their native range, threaten the ecosystem balance of that habitat. No official invasive-species list is used here.",
    cognitiveDemand: "recognition",
    sourceType: "openstax",
    sourceNote: "V-F25. No invented species list (SN16).",
    evidenceIds: ["V-F25"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q32",
    topicId: "human-impact",
    difficulty: 2,
    prompt:
      "Biological control of invasive species is the intentional use of which living tools?",
    choiceTexts: [
      "Natural enemies (biocontrol agents) chosen to reduce the target population",
      "Pesticides, herbicides, fungicides, and insecticides only",
      "Mowing, hoeing, tilling, and barriers made with machines only",
      "Public-awareness signs with no living agents",
    ],
    correctChoiceId: "a",
    hint: "Match the control method to the kind of tool it uses: living agents, chemicals, machines, or human practices.",
    explanation:
      "Biological control is the intentional manipulation of natural enemies by humans to control pests or plants. Chemical control uses pesticides and similar products. Mechanical control uses tools or machines. Cultural control includes changing practices and human behavior. Physical/manual control is not treated as a fifth official method here.",
    cognitiveDemand: "distinction",
    sourceType: "nisic",
    sourceNote: "V-F62; official method names V-INV-M. HR14: physical/manual not keyed as official.",
    evidenceIds: ["V-F62", "V-INV-M"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q33",
    topicId: "human-impact",
    difficulty: 2,
    prompt:
      "Acid rain, a form of acid deposition, forms after which pollutants are emitted and react in the atmosphere?",
    choiceTexts: [
      "Sulfur dioxide (SO2) and nitrogen oxides (NOX), which form sulfuric and nitric acids",
      "Only water vapor, which becomes carbonic acid in every desert",
      "Only ozone from the IUCN Red List",
      "Only methane from biomass combustion",
    ],
    correctChoiceId: "a",
    hint: "The mineral acids in acid rain come from two common air pollutants, not from an IUCN category.",
    explanation:
      "Acid rain, or acid deposition, includes precipitation with acidic components such as sulfuric or nitric acid. Acid rain results when sulfur dioxide and nitrogen oxides are emitted, transported, and react with water, oxygen, and other chemicals.",
    cognitiveDemand: "recognition",
    sourceType: "epa",
    sourceNote: "V-F64.",
    evidenceIds: ["V-F64"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q34",
    topicId: "human-impact",
    difficulty: 2,
    prompt:
      "What is biomagnification?",
    choiceTexts: [
      "The increasing concentration of persistent, toxic substances in organisms at each trophic level, from primary producers to apex consumers",
      "The always-upright shape of a pyramid of numbers",
      "The colonization of new volcanic rock",
      "The deflection of winds to the left in the Northern Hemisphere",
    ],
    correctChoiceId: "a",
    hint: "Follow a persistent toxin from producers up to top predators.",
    explanation:
      "Biomagnification is the increasing concentration of persistent, toxic substances in organisms at each trophic level, from the primary producers to the apex consumers. Many such substances also bioaccumulate. A sharper bioaccumulation-only definition is not keyed.",
    cognitiveDemand: "recall",
    sourceType: "openstax",
    sourceNote: "V-F65. SN19 not used as a separate definition item.",
    evidenceIds: ["V-F65"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q35",
    topicId: "human-impact",
    difficulty: 3,
    prompt:
      "Nutrient runoff can cause eutrophication. What happens in that process?",
    choiceTexts: [
      "Excess growth of microorganisms depletes dissolved oxygen and kills ecosystem fauna",
      "The ocean absorbs CO2 and immediately becomes a desert",
      "Energy pyramids invert because heat is created",
      "Allopatric speciation begins on every farm",
    ],
    correctChoiceId: "a",
    hint: "Connect extra nutrients to microbial blooms, then to oxygen and animals.",
    explanation:
      "Eutrophication is a process whereby nutrient runoff causes excess growth of microorganisms, depleting dissolved oxygen levels and killing ecosystem fauna. Nitrogen and phosphorus are major limiting nutrients in most aquatic environments. Eutrophication stages are not tested as a numbered ladder.",
    cognitiveDemand: "application",
    sourceType: "openstax",
    sourceNote: "V-F66; supporting V-F67. No stage catalog (SN18).",
    evidenceIds: ["V-F66", "V-F67"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q36",
    topicId: "human-impact",
    difficulty: 2,
    prompt:
      "Which environmental concern is tied to nuclear power?",
    choiceTexts: [
      "Nuclear reactors release large amounts of carbon dioxide while they operate",
      "Radioactive waste can remain radioactive and dangerous to human health for thousands of years, and the United States has no permanent disposal facility for high-level nuclear waste",
      "Nuclear plants cannot use metal or concrete in construction",
      "Nuclear power is the same as biomass combustion",
    ],
    correctChoiceId: "b",
    hint: "Separate what happens while a reactor runs from what happens to used fuel afterward.",
    explanation:
      "Nuclear reactors do not produce air pollution or carbon dioxide while operating. A major environmental concern is radioactive waste that can remain dangerous for thousands of years. The United States does not have a permanent disposal facility for high-level nuclear waste.",
    cognitiveDemand: "distinction",
    sourceType: "eia",
    sourceNote: "V-F70.",
    evidenceIds: ["V-F70"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q37",
    topicId: "human-impact",
    difficulty: 1,
    prompt:
      "Do solar energy technologies produce air pollution or greenhouse gases while they operate?",
    choiceTexts: [
      "Yes; operating solar panels emit the same stack gases as coal plants",
      "No; they do not produce air pollution or greenhouse gases when operating, though making and disposing of the equipment still has environmental effects",
      "No, and manufacturing solar equipment has no environmental effects at all",
      "Yes; they emit sulfur dioxide in order to create acid rain",
    ],
    correctChoiceId: "b",
    hint: "Separate the operating plant from the factories that make panels.",
    explanation:
      "Solar energy technologies and power plants do not produce air pollution or greenhouse gases when operating. Producing and disposing of solar technologies still have environmental effects, including land clearing that can affect habitats.",
    cognitiveDemand: "recognition",
    sourceType: "eia",
    sourceNote: "V-F69.",
    evidenceIds: ["V-F69"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q38",
    topicId: "human-impact",
    difficulty: 2,
    prompt:
      "Which wildlife risk is described for wind turbines?",
    choiceTexts: [
      "Birds and bats can be injured or killed if they fly into turbine blades",
      "Wind turbines require river water for cooling, like many steam plants",
      "Wind turbines release nitrogen oxides that become acid rain while they spin",
      "Wind turbines always invert energy pyramids",
    ],
    correctChoiceId: "a",
    hint: "Think about flying animals and moving blades, not smokestack gases.",
    explanation:
      "Wind turbines do not release emissions that pollute air or water in normal operation and do not require water for cooling. Birds and bats are at risk of injury or death if they fly into turbine blades.",
    cognitiveDemand: "recognition",
    sourceType: "eia",
    sourceNote: "V-F72.",
    evidenceIds: ["V-F72"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q39",
    topicId: "human-impact",
    difficulty: 2,
    prompt:
      "Hydropower generators do not directly emit air pollutants. What environmental problem can a dam and reservoir still cause?",
    choiceTexts: [
      "They may obstruct fish migration and change water temperature, chemistry, flow, and silt loads",
      "They make energy pyramids invert in every river",
      "They are the same as nuclear high-level waste storage",
      "They always increase ocean carbonate ions",
    ],
    correctChoiceId: "a",
    hint: "Think about a river that is blocked and turned into a lake.",
    explanation:
      "Hydropower generators produce energy without directly emitting air pollutants, but dams and reservoirs can obstruct fish migration and change natural water temperatures, chemistry, river flow, and silt loads.",
    cognitiveDemand: "application",
    sourceType: "eia",
    sourceNote: "V-F73.",
    evidenceIds: ["V-F73"],
    verificationStatus: "verified",
  }),
  eco({
    id: "eco-q40",
    topicId: "human-impact",
    difficulty: 3,
    prompt:
      "On the IUCN Red List, which three categories are considered threatened with extinction?",
    choiceTexts: [
      "Least Concern, Data Deficient, and Not Evaluated",
      "Vulnerable, Endangered, and Critically Endangered",
      "Extinct, Extinct in the Wild, and Near Threatened",
      "Provisioning, Regulating, and Supporting",
    ],
    correctChoiceId: "b",
    hint: "Threatened status is the high-risk living categories, not Least Concern and not the four ecosystem-service names.",
    explanation:
      "Species are classified into nine Red List categories. Vulnerable, Endangered, and Critically Endangered species are considered to be threatened with extinction. Criteria A–E thresholds are not tested.",
    cognitiveDemand: "distinction",
    sourceType: "iucn",
    sourceNote: "V-F75. No criteria numbers (SN25).",
    evidenceIds: ["V-F75"],
    verificationStatus: "verified",
  }),
];

export function ecologyQuestionToPracticeQuestion(
  question: EcologyQuestion,
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
