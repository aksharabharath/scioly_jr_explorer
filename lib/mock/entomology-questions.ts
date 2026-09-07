/**
 * Entomology 2027 question bank — q1–q60.
 *
 * Original Jr. Explorer items. Not copied from the supplied sample tests.
 * Not an official Science Olympiad packet. verificationStatus follows
 * docs/events/entomology/QUESTION_BANK_QA_2027.md against
 * RULES_2027_OFFICIAL.md / TAXON_LIST_2027.md.
 *
 * The scoped `EntomologyQuestion` type keeps author fields (taxonomy tags,
 * source notes, image briefs). `verificationStatus` is copied onto the generic
 * `Question` so live-practice filtering can see it; it is not shown to students.
 */
import { optionalSecondHintFields } from "@/lib/practice";
import type {
  DifficultyLevel,
  Question,
  QuestionVerificationStatus,
} from "@/lib/types";
import { entomologyImageCredit } from "@/lib/mock/entomology-image-credits";

export const ENTOMOLOGY_EVENT_ID = "entomology";

/** Practice topic IDs from docs/events/entomology/CONTENT_SPEC.md */
export const ENTOMOLOGY_TOPIC_IDS = [
  "taxonomy",
  "visual-id",
  "comparison",
  "dichotomous-keys",
  "external-anatomy",
  "internal-anatomy",
  "life-cycles",
  "ecology-habitat",
  "behavior-adaptations",
  "interactions",
  "human-impact",
  "climate",
] as const;

export type EntomologyTopicId = (typeof ENTOMOLOGY_TOPIC_IDS)[number];

export type EntomologyCognitiveDemand =
  | "recall"
  | "recognition"
  | "distinction"
  | "application"
  | "multi-step";

export type EntomologySourceType =
  | "sample-derived"
  | "rules-derived"
  | "generated";

export type EntomologyVerificationStatus = QuestionVerificationStatus;

/**
 * Scientific names (and class ranks) allowed as taxonomyTags.
 * Must match TAXON_LIST_2027.md.
 */
export const ENTOMOLOGY_TAXON_IDS = [
  "Entognatha",
  "Insecta",
  "Collembola",
  "Diplura",
  "Zygentoma",
  "Ephemeroptera",
  "Odonata",
  "Blattodea",
  "Mantodea",
  "Plecoptera",
  "Orthoptera",
  "Acrididae",
  "Tettigoniidae",
  "Gryllidae",
  "Hemiptera",
  "Reduviidae",
  "Corixidae",
  "Notonectidae",
  "Scutelleridae",
  "Pentatomidae",
  "Cicadidae",
  "Membracidae",
  "Aphididae",
  "Thysanoptera",
  "Megaloptera",
  "Coleoptera",
  "Dytiscidae",
  "Hydrophilidae",
  "Scarabaeidae",
  "Buprestidae",
  "Lampyridae",
  "Coccinellidae",
  "Tenebrionidae",
  "Curculionidae",
  "Zopheridae",
  "Siphonaptera",
  "Diptera",
  "Tipulidae",
  "Culicidae",
  "Bombyliidae",
  "Tephritidae",
  "Calliphoridae",
  "Trichoptera",
  "Lepidoptera",
  "Papilionidae",
  "Nymphalidae",
  "Saturniidae",
  "Hymenoptera",
  "Formicidae",
  "Cynipidae",
  "Vespidae",
  "Apidae",
  "Ixodidae",
] as const;

export type EntomologyTaxonId = (typeof ENTOMOLOGY_TAXON_IDS)[number];

type EntomologyBase = Question & {
  topicId: EntomologyTopicId;
  taxonomyTags: EntomologyTaxonId[];
  cognitiveDemand: EntomologyCognitiveDemand;
  sourceType: EntomologySourceType;
  sourceNote: string;
  verificationStatus: EntomologyVerificationStatus;
};

export type EntomologyQuestion =
  | (EntomologyBase & {
      imageRequired: true;
      imageBrief: string;
      imageSrc: string;
      imageAlt: string;
    })
  | (EntomologyBase & {
      imageRequired: false;
      imageBrief?: never;
    });

const EVENT_ID = ENTOMOLOGY_EVENT_ID;

function ento(
  input: {
    id: string;
    topicId: EntomologyTopicId;
    difficulty: DifficultyLevel;
    prompt: string;
    choiceTexts: [string, string, string, string];
    correctChoiceId: "a" | "b" | "c" | "d";
    hint: string;
    hint2?: string;
    explanation: string;
    taxonomyTags: EntomologyTaxonId[];
    cognitiveDemand: EntomologyCognitiveDemand;
    sourceType: EntomologySourceType;
    sourceNote: string;
    verificationStatus?: EntomologyVerificationStatus;
  } & (
    | { imageRequired: true; imageBrief: string; imageSrc: string; imageAlt: string }
    | { imageRequired?: false }
  ),
): EntomologyQuestion {
  const base = {
    id: input.id,
    eventId: EVENT_ID,
    topicId: input.topicId,
    prompt: input.prompt,
    difficulty: input.difficulty,
    choices: [
      { id: "a" as const, text: input.choiceTexts[0] },
      { id: "b" as const, text: input.choiceTexts[1] },
      { id: "c" as const, text: input.choiceTexts[2] },
      { id: "d" as const, text: input.choiceTexts[3] },
    ],
    correctChoiceId: input.correctChoiceId,
    hint: input.hint,
    ...optionalSecondHintFields(input.hint2),
    explanation: input.explanation,
    taxonomyTags: input.taxonomyTags,
    cognitiveDemand: input.cognitiveDemand,
    sourceType: input.sourceType,
    sourceNote: input.sourceNote,
    verificationStatus: input.verificationStatus ?? "draft",
  };

  if (input.imageRequired === true) {
    return {
      ...base,
      imageRequired: true,
      imageBrief: input.imageBrief,
      imageSrc: input.imageSrc,
      imageAlt: input.imageAlt,
    };
  }
  return { ...base, imageRequired: false };
}

export const MOCK_ENTOMOLOGY_QUESTIONS: EntomologyQuestion[] = [
  ento({
    id: "ento-q1",
    topicId: "taxonomy",
    difficulty: 1,
    prompt:
      "Which order includes both cockroaches and termites?",
    choiceTexts: [
      "Mantodea",
      "Blattodea",
      "Orthoptera",
      "Coleoptera",
    ],
    correctChoiceId: "b",
    hint: "Use the official taxonomy list to find each named common group, then compare the order printed beside it.",
    explanation:
      "The 2027 list gives Order Blattodea the common names cockroaches/termites. Mantodea is mantids; Orthoptera is printed as grasshoppers & crickets; Coleoptera is printed as beetles.",
    taxonomyTags: ["Blattodea"],
    cognitiveDemand: "recall",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027_OFFICIAL.md / TAXON_LIST_2027.md Order Blattodea — cockroaches/termites.",
    verificationStatus: "verified",
  }),
  ento({
    id: "ento-q2",
    topicId: "taxonomy",
    difficulty: 1,
    prompt:
      "What common names are listed for Subclass Collembola?",
    choiceTexts: [
      "diplurans",
      "silverfish, firebrats",
      "thrips",
      "springtails, snow fleas",
    ],
    correctChoiceId: "d",
    hint: "Find the named subclass in the official list, then compare its printed common names with the choices.",
    explanation:
      "The list prints Collembola as springtails, snow fleas. Diplurans are Order Diplura; silverfish and firebrats are Zygentoma; thrips are Thysanoptera.",
    taxonomyTags: ["Collembola", "Entognatha"],
    cognitiveDemand: "recall",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027_OFFICIAL.md / TAXON_LIST_2027.md Subclass Collembola — springtails, snow fleas.",
    verificationStatus: "verified",
  }),
  ento({
    id: "ento-q3",
    topicId: "visual-id",
    difficulty: 1,
    prompt:
      "[IMAGE REQUIRED: eight-legged arthropod with a fused body.] Look at the photo. How is this animal classified?",
    choiceTexts: [
      "As an insect order in Class Insecta",
      "As a beetle family in Coleoptera",
      "As a true-bug family in Hemiptera",
      "As a non-insect arthropod family",
    ],
    correctChoiceId: "d",
    hint: "Inspect the specimen’s overall form, then compare its observable classification clues with the listed groups.",
    explanation:
      "Ixodidae is listed under Non-Insect Arthropods with the common name hardback ticks. It is not an insect order or a beetle or true-bug family. Eight walking legs and a fused body are visible in the photo; those characters are not printed on the 2027 list.",
    taxonomyTags: ["Ixodidae"],
    cognitiveDemand: "recognition",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027_OFFICIAL.md / TAXON_LIST_2027.md Non-Insect Arthropods, Family Ixodidae — hardback ticks. Wikimedia Commons photo (see public/entomology/README.md).",
    verificationStatus: "verified",
    imageRequired: true,
    imageSrc: "/entomology/ento-q3.jpg",
    imageAlt:
      "Photograph of a small arthropod on dry grass with eight walking legs and a flattened, fused body.",
    imageBrief:
      "Hard tick in dorsal view: eight legs, fused body, no three insect tagmata. Not a beetle, true bug, or insect order.",
  }),
  ento({
    id: "ento-q4",
    topicId: "taxonomy",
    difficulty: 1,
    prompt: "Mayflies belong to which order?",
    choiceTexts: [
      "Odonata",
      "Plecoptera",
      "Ephemeroptera",
      "Trichoptera",
    ],
    correctChoiceId: "c",
    hint: "Locate the named common group in the official list, then compare the order printed beside it.",
    explanation:
      "Ephemeroptera is printed as mayflies. Odonata is dragon/damselflies; Plecoptera is stoneflies; Trichoptera is caddisflies.",
    taxonomyTags: ["Ephemeroptera"],
    cognitiveDemand: "recall",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027_OFFICIAL.md / TAXON_LIST_2027.md Order Ephemeroptera — mayflies.",
    verificationStatus: "verified",
  }),
  ento({
    id: "ento-q5",
    topicId: "visual-id",
    difficulty: 2,
    prompt:
      "[IMAGE REQUIRED: hairy flower-visiting insect with two pairs of wings.] Which family is this insect?",
    choiceTexts: [
      "Bombyliidae — bee flies",
      "Formicidae — ants",
      "Apidae — bees",
      "Vespidae — paper wasps, hornets, yellowjackets",
    ],
    correctChoiceId: "c",
    hint: "Inspect the specimen’s overall form, then compare its visible features with every listed family.",
    explanation:
      "Apidae is printed as bees under Hymenoptera. Bee flies (Bombyliidae) are a listed Diptera family. Ants are Formicidae; paper wasps, hornets, and yellowjackets are Vespidae.",
    taxonomyTags: ["Apidae", "Hymenoptera"],
    cognitiveDemand: "recognition",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027_OFFICIAL.md / TAXON_LIST_2027.md Family Apidae — bees. Wikimedia Commons photo (see public/entomology/README.md).",
    verificationStatus: "verified",
    imageRequired: true,
    imageSrc: "/entomology/ento-q5.jpg",
    imageAlt:
      "Photograph of a hairy insect with banded abdomen visiting purple flowers.",
    imageBrief:
      "Honey bee on flowers: hairy thorax, two pairs of wings, no long rigid bee-fly proboscis. Not an ant or a paper wasp.",
  }),
  ento({
    id: "ento-q6",
    topicId: "visual-id",
    difficulty: 1,
    prompt:
      "[IMAGE REQUIRED: worker ant in side view.] Which family is this insect?",
    choiceTexts: [
      "Vespidae — paper wasps, hornets, yellowjackets",
      "Formicidae — ants",
      "Cynipidae — gall wasps",
      "Apidae — bees",
    ],
    correctChoiceId: "b",
    hint: "Inspect the specimen and compare its visible structures with each listed family’s common name.",
    explanation:
      "Ants are family Formicidae in Hymenoptera. Wasps, gall wasps, and bees are other listed hymenopteran families with different body plans.",
    taxonomyTags: ["Formicidae", "Hymenoptera"],
    cognitiveDemand: "recognition",
    sourceType: "generated",
    sourceNote:
      "Official Formicidae common name. Wikimedia Commons specimen photo (see public/entomology/README.md). No taxon name on the image.",
    verificationStatus: "verified",
    imageRequired: true,
    imageSrc: "/entomology/ento-q6.jpg",
    imageAlt:
      "Side-view photograph of a pinned insect with a narrow waist between the middle and rear body sections.",
    imageBrief:
      "Clear side view of a worker ant: distinct head, thorax, petiole (narrow waist), and gaster; elbowed antennae; no wasp-like folded wings required. Not a bee (no pollen baskets / hairy bee shape) and not a paper wasp.",
  }),
  ento({
    id: "ento-q7",
    topicId: "visual-id",
    difficulty: 2,
    prompt:
      "[IMAGE REQUIRED: butterfly with tailed hindwings.] Look at the photo. Which family is this butterfly?",
    choiceTexts: [
      "Nymphalidae — brush-footed butterflies",
      "Saturniidae — Giant Silkworm moths",
      "Papilionidae — swallowtails",
      "No listed moth or butterfly family has hindwing tails",
    ],
    correctChoiceId: "c",
    hint: "Inspect the specimen’s visible structures, then compare them with each listed family name.",
    explanation:
      "Papilionidae (swallowtails) often have tail-like projections on the hindwings. Saturniidae are Giant Silkworm moths; Nymphalidae are brush-footed butterflies. Tails are a useful clue among the three listed lepidopteran families, not a proof for every swallowtail species.",
    taxonomyTags: ["Papilionidae", "Lepidoptera"],
    cognitiveDemand: "recognition",
    sourceType: "generated",
    sourceNote:
      "Official Papilionidae common name. Wikimedia Commons photo (see public/entomology/README.md); yellow circle marks hindwing projections only.",
    verificationStatus: "verified",
    imageRequired: true,
    imageSrc: "/entomology/ento-q7.jpg",
    imageAlt:
      "Photograph of a butterfly with its wings open. A yellow circle marks thin projections on the hindwings.",
    imageBrief:
      "Dorsal view of a swallowtail butterfly with obvious hindwing tails, clubbed antennae, and scaled wings. Do not use a saturniid moth (feathery antennae, no swallowtail tails) or a nymphalid without tails.",
  }),
  ento({
    id: "ento-q8",
    topicId: "visual-id",
    difficulty: 2,
    prompt:
      "[IMAGE REQUIRED: aquatic bug swimming upside down at the water surface.] Which listed family is this?",
    choiceTexts: [
      "Notonectidae — backswimmers",
      "Corixidae — water boatmen",
      "Dytiscidae — predaceous diving beetles",
      "Hydrophilidae — water scavenger",
    ],
    correctChoiceId: "a",
    hint: "Compare the specimen’s body form and appendages with the evidence represented by each listed family.",
    explanation:
      "Notonectidae is printed as backswimmers. Orientation in the photo is not a list fact. Corixidae is printed as water boatmen. Dytiscidae and Hydrophilidae (water scavenger) are Coleoptera families, not Hemiptera.",
    taxonomyTags: ["Notonectidae", "Hemiptera"],
    cognitiveDemand: "recognition",
    sourceType: "generated",
    sourceNote:
      "Official Notonectidae common name. Wikimedia Commons photo (see public/entomology/README.md). No taxon name on the image.",
    verificationStatus: "verified",
    imageRequired: true,
    imageSrc: "/entomology/ento-q8.jpg",
    imageAlt:
      "Photograph of an aquatic insect swimming just under the water surface with its belly toward the surface and long hind legs.",
    imageBrief:
      "Live or photo of a backswimmer at the surface, clearly oriented belly-up (keel/dorsum downward), long oar-like hind legs. Must not be a water boatman swimming right-side up or a beetle with elytra.",
  }),
  ento({
    id: "ento-q9",
    topicId: "visual-id",
    difficulty: 2,
    prompt:
      "[IMAGE REQUIRED: beetle with a distinct snout.] Which listed family is this?",
    choiceTexts: [
      "Tenebrionidae — darkling beetles",
      "Scarabaeidae — dung beetles",
      "Coccinellidae — lady-bird beetles (ladybugs)",
      "Curculionidae — weevils",
    ],
    correctChoiceId: "d",
    hint: "Inspect the specimen’s visible structures, then compare them with every listed family name.",
    explanation:
      "Curculionidae is printed as weevils. The snout diagnostic is not on the 2027 list. Tenebrionidae, Scarabaeidae, and Coccinellidae (lady-bird beetles(ladybugs)) are other listed beetle families.",
    taxonomyTags: ["Curculionidae", "Coleoptera"],
    cognitiveDemand: "recognition",
    sourceType: "generated",
    sourceNote:
      "Official Curculionidae common name. Wikimedia Commons photo (see public/entomology/README.md). No taxon name on the image.",
    verificationStatus: "verified",
    imageRequired: true,
    imageSrc: "/entomology/ento-q9.jpg",
    imageAlt:
      "Photograph of a beetle with a long snout on the front of the head.",
    imageBrief:
      "Dorsal or three-quarter view of an adult weevil with a clear rostrum (snout) and clubbed/elbowed antennae arising from the snout. Not a round ladybug, not a scarab, not a smooth darkling beetle without a snout.",
  }),
  ento({
    id: "ento-q10",
    topicId: "visual-id",
    difficulty: 3,
    prompt:
      "[IMAGE REQUIRED: tiny six-legged arthropod with a forked jumping organ under the abdomen, no wings.] What is the best identification?",
    choiceTexts: [
      "Order Zygentoma — silverfish, firebrats",
      "Subclass Collembola — springtails, snow fleas",
      "Order Diplura — diplurans",
      "Order Thysanoptera — thrips",
    ],
    correctChoiceId: "b",
    hint: "This taxon is listed under Entognatha, not as an insect order.",
    explanation:
      "Springtails (Collembola) are Class Entognatha. Many have a furcula used to jump. Silverfish are wingless insects (Zygentoma). Diplurans have paired tail filaments, not a ventral jumping fork. Thrips are slender insects in Thysanoptera, often with fringe wings as adults.",
    taxonomyTags: ["Collembola", "Entognatha"],
    cognitiveDemand: "distinction",
    sourceType: "generated",
    sourceNote:
      "Official Collembola listing. Wikimedia Commons photo (see public/entomology/README.md). No taxon name on the image.",
    verificationStatus: "verified",
    imageRequired: true,
    imageSrc: "/entomology/ento-q10.jpg",
    imageAlt:
      "Two photographs labeled A and B: a tiny wingless six-legged arthropod, and a close-up of a forked structure from under the abdomen.",
    imageBrief:
      "Close-up of a springtail showing six legs, no wings, and a visible furcula (forked jumping structure) folded under the abdomen. Not a silverfish (flat, tapered, terminal filaments) and not a dipluran (two long cerci).",
  }),
  ento({
    id: "ento-q11",
    topicId: "comparison",
    difficulty: 2,
    prompt:
      "Water boatmen (Corixidae) and backswimmers (Notonectidae) are both listed aquatic Hemiptera. Which statement best separates them?",
    choiceTexts: [
      "Only water boatmen have six legs; backswimmers have eight.",
      "Backswimmers typically swim on their backs; water boatmen typically swim dorsal-side up.",
      "Water boatmen are beetles; backswimmers are true bugs.",
      "Backswimmers belong to Coleoptera; water boatmen belong to Odonata.",
    ],
    correctChoiceId: "b",
    hint: "Inspect the specimen’s visible features, then compare them with the meanings of the candidate common names.",
    explanation:
      "Both families are Hemiptera (true bugs) with six legs. The usual field split is orientation: Notonectidae often swim ventral-side up; Corixidae usually keep the back upward. Neither is a beetle or a dragonfly.",
    taxonomyTags: ["Corixidae", "Notonectidae", "Hemiptera"],
    cognitiveDemand: "distinction",
    sourceType: "generated",
    sourceNote:
      "Same taxon pair as Sample Test 1 style, new stem. Orientation diagnostic: needs-review for production photos/wording.",
    verificationStatus: "needs-review",
  }),
  ento({
    id: "ento-q12",
    topicId: "comparison",
    difficulty: 3,
    prompt:
      "[IMAGE REQUIRED: two aquatic beetles labeled A and B.] Look at beetles A and B. Which statement matches what you see?",
    choiceTexts: [
      "A has clubbed antennae (Hydrophilidae); B has threadlike antennae (Dytiscidae)",
      "Both are Lampyridae because they glow underwater",
      "A has threadlike antennae (Dytiscidae); B has clubbed antennae (Hydrophilidae)",
      "Both are Curculionidae because they live in water",
    ],
    correctChoiceId: "c",
    hint: "Match each beetle to its official 2027 family common name. Antenna characters are not printed on the list.",
    explanation:
      "Dytiscidae is printed as predaceous diving beetles; Hydrophilidae is printed as water scavenger. Threadlike vs clubbed antennae and palps are not official-list facts. Lampyridae is fireflies; Curculionidae is weevils.",
    taxonomyTags: ["Dytiscidae", "Hydrophilidae", "Coleoptera"],
    cognitiveDemand: "distinction",
    sourceType: "generated",
    sourceNote:
      "Official Dytiscidae and Hydrophilidae common names. Wikimedia Commons photos (see public/entomology/README.md); A/B labels only.",
    verificationStatus: "verified",
    imageRequired: true,
    imageSrc: "/entomology/ento-q12.jpg",
    imageAlt:
      "Two photographs of aquatic beetles labeled A and B.",
    imageBrief:
      "Side-by-side adults: (1) dytiscid with visible filiform antennae and oar-like hind legs; (2) hydrophilid with short clubbed antennae and prominent palps, often a convex underside. Labels optional; diagnostics must be visible.",
  }),
  ento({
    id: "ento-q13",
    topicId: "comparison",
    difficulty: 3,
    prompt:
      "[IMAGE REQUIRED: two flies labeled A and B.] Look at flies A and B. Which choice correctly names them, including the mosquito family?",
    choiceTexts: [
      "A and B are crane flies (Tipulidae); mosquitoes (Culicidae) are not shown.",
      "A and B are both bee flies (Bombyliidae).",
      "One is a mosquito (Culicidae) and one is a crane fly (Tipulidae).",
      "A and B are both blow flies (Calliphoridae).",
    ],
    correctChoiceId: "c",
    hint: "Inspect both photos side by side, then compare their visible structures with each paired-family choice.",
    explanation:
      "Tipulidae are crane flies; Culicidae are mosquitoes. Adult crane flies do not have the scaled wings and piercing proboscis of mosquitoes. Bee flies and blow flies are other listed Diptera families with different shapes.",
    taxonomyTags: ["Tipulidae", "Culicidae", "Diptera"],
    cognitiveDemand: "distinction",
    sourceType: "generated",
    sourceNote:
      "Official Tipulidae and Culicidae common names. Wikimedia Commons photos (see public/entomology/README.md); A/B labels only, no mouthpart circles.",
    verificationStatus: "verified",
    imageRequired: true,
    imageSrc: "/entomology/ento-q13.jpg",
    imageAlt:
      "Two photographs of flies labeled A and B. No extra labels on the mouthparts.",
    imageBrief:
      "Two adult flies to scale: a crane fly (very long legs, no long piercing proboscis, often V-shaped wing marking) and a mosquito (proboscis, scaled wing veins, shorter legs relative to crane flies). Not bee flies or blow flies.",
  }),
  ento({
    id: "ento-q14",
    topicId: "external-anatomy",
    difficulty: 1,
    prompt:
      "An adult insect’s body is divided into which three main regions?",
    choiceTexts: [
      "Head, thorax, and abdomen",
      "Head, neck, and tail",
      "Cephalothorax and abdomen only",
      "Proboscis, elytra, and cerci",
    ],
    correctChoiceId: "a",
    hint: "Use the standard insect body plan, then compare each three-part set with that organization.",
    explanation:
      "Insects have three main body regions: head, thorax, and abdomen. Proboscis, elytra, and cerci are parts, not those three regions. Family Ixodidae is listed under Non-Insect Arthropods, so do not treat ticks as if they used this insect body plan.",
    taxonomyTags: ["Insecta", "Ixodidae"],
    cognitiveDemand: "recall",
    sourceType: "generated",
    sourceNote:
      "Insect tagmata are in CURRICULUM_2027.md as expected knowledge (inferred/sample), not an official structure checklist in RULES_2027.md.",
    verificationStatus: "needs-review",
  }),
  ento({
    id: "ento-q15",
    topicId: "external-anatomy",
    difficulty: 1,
    prompt: "What is one important job of an insect’s exoskeleton?",
    choiceTexts: [
      "It pumps blood the way a human heart does",
      "It lets the insect hear only ultrasonic bat calls",
      "It supports the body and gives muscles a place to attach",
      "It stores pollen in every insect family",
    ],
    correctChoiceId: "c",
    hint: "Compare the job assigned to the outer body covering in each choice.",
    explanation:
      "The exoskeleton (cuticle) supports the body, protects internal parts, and is the attachment surface for muscles. It is not a heart, and pollen baskets are not universal.",
    taxonomyTags: ["Insecta"],
    cognitiveDemand: "recall",
    sourceType: "generated",
    sourceNote:
      "Exoskeleton function is curriculum/sample-adjacent, not an official organ checklist in RULES_2027.md.",
    verificationStatus: "needs-review",
  }),
  ento({
    id: "ento-q16",
    topicId: "external-anatomy",
    difficulty: 1,
    prompt:
      "Where do an adult insect’s three pairs of walking legs attach?",
    choiceTexts: [
      "On the thorax",
      "On the abdomen",
      "On the head",
      "One pair on the head, thorax, and abdomen",
    ],
    correctChoiceId: "a",
    hint: "Use the standard three-region body plan, then compare each proposed leg location.",
    explanation:
      "Adult insects have three pairs of walking legs attached on the thorax. Those walking pairs are not described as attaching to the head or abdomen.",
    taxonomyTags: ["Insecta"],
    cognitiveDemand: "recall",
    sourceType: "generated",
    sourceNote:
      "Thoracic leg attachment is curriculum/sample-adjacent (CURRICULUM_2027.md), not a restated official checklist.",
    verificationStatus: "needs-review",
  }),
  ento({
    id: "ento-q17",
    topicId: "external-anatomy",
    difficulty: 2,
    prompt:
      "[IMAGE REQUIRED: labeled insect rear end.] When an insect has cerci, where are they?",
    choiceTexts: [
      "On the antennae",
      "On the tarsi of the front legs",
      "At the end of the abdomen",
      "Inside the compound eyes",
    ],
    correctChoiceId: "c",
    hint: "Inspect the circled structures and compare their body-region location with each listed term.",
    explanation:
      "Cerci arise at the posterior end of the abdomen. They are not parts of the antennae, tarsi, or eyes.",
    taxonomyTags: ["Insecta"],
    cognitiveDemand: "recognition",
    sourceType: "generated",
    sourceNote:
      "Cerci location is sample-adjacent. Wikimedia Commons photo (see public/entomology/README.md); yellow circle marks the rear pair only, without naming them.",
    verificationStatus: "verified",
    imageRequired: true,
    imageSrc: "/entomology/ento-q17.jpg",
    imageAlt:
      "Photograph of an insect. A yellow circle marks a pair of structures at the rear of the body.",
    imageBrief:
      "Simple side or dorsal diagram of an insect with the abdomen tip highlighted, showing a pair of cerci. Do not label antennae as cerci. Optional: a dipluran for contrast, clearly not required for the correct choice.",
  }),
  ento({
    id: "ento-q18",
    topicId: "dichotomous-keys",
    difficulty: 3,
    prompt:
      "Use this key.\n\n1a. Aquatic true bug that swims at the surface → go to 2\n1b. Not an aquatic true bug → stop; not in this key\n2a. Usually swims on its back → Notonectidae\n2b. Usually swims right-side up → Corixidae\n\nA water bug is swimming on its back. Which family does the key give?",
    choiceTexts: [
      "Corixidae",
      "Notonectidae",
      "Dytiscidae",
      "The key cannot finish; this animal is a beetle, not a true bug",
    ],
    correctChoiceId: "b",
    hint: "Follow couplet 1, then couplet 2 using swimming orientation.",
    explanation:
      "Couplet 1 keeps aquatic Hemiptera. Couplet 2a matches swimming on the back → Notonectidae. Dytiscidae are beetles (Coleoptera), so 1b would exclude them if you treated them as not aquatic true bugs. Beetles are not Hemiptera.",
    taxonomyTags: ["Notonectidae", "Corixidae", "Hemiptera"],
    cognitiveDemand: "multi-step",
    sourceType: "generated",
    sourceNote:
      "Keys are in official 2027 scope (description will / competition may). Original key. Orientation couplet is not on the official list.",
    verificationStatus: "needs-review",
  }),
  ento({
    id: "ento-q19",
    topicId: "dichotomous-keys",
    difficulty: 3,
    prompt:
      "Follow this key from the top.\n\n1a. Listed common name is short-horned grasshoppers → Acrididae\n1b. Any other grasshopper or cricket name → go to 2\n2a. Listed common name is katydids → Tettigoniidae\n2b. Listed common name is crickets/tree crickets → Gryllidae\n\nA specimen’s listed common name is short-horned grasshoppers. Which family do you reach?",
    choiceTexts: [
      "Tettigoniidae",
      "Gryllidae",
      "Acrididae",
      "Membracidae",
    ],
    correctChoiceId: "c",
    hint: "Start at the first couplet, test both branches against the official name, and follow the supported branch.",
    explanation:
      "Couplet 1a matches the official common name short-horned grasshoppers → Acrididae. Couplet 2 is only for the other listed Orthoptera families. Membracidae are treehoppers (Hemiptera), so they are not in this key.",
    taxonomyTags: ["Acrididae", "Tettigoniidae", "Gryllidae", "Orthoptera"],
    cognitiveDemand: "multi-step",
    sourceType: "rules-derived",
    sourceNote:
      "Original key using RULES_2027_OFFICIAL.md / TAXON_LIST_2027.md Orthoptera family official common names.",
    verificationStatus: "verified",
  }),
  ento({
    id: "ento-q20",
    topicId: "dichotomous-keys",
    difficulty: 3,
    prompt:
      "You are making a simple two-step key for these listed groups only: Dytiscidae, Hydrophilidae, Acrididae, and Gryllidae. What is the best first split?",
    choiceTexts: [
      "Water beetles versus grasshoppers or crickets",
      "Has six legs versus has eight legs",
      "Can glow versus cannot glow",
      "Is a tick versus is an insect",
    ],
    correctChoiceId: "a",
    hint: "For each proposed split, ask whether it separates all four groups using evidence available for those groups.",
    explanation:
      "Dytiscidae is printed as predaceous diving beetles; Hydrophilidae is printed as water scavenger. Acrididae is printed as short-horned grasshoppers; Gryllidae is printed as crickets/tree crickets. Grouping by those official-name clues splits the four taxa evenly. All four are insects; none are Ixodidae. Glow belongs to Lampyridae, which is not in this set.",
    taxonomyTags: ["Dytiscidae", "Hydrophilidae", "Acrididae", "Gryllidae"],
    cognitiveDemand: "multi-step",
    sourceType: "rules-derived",
    sourceNote:
      "First-couplet construction using RULES_2027_OFFICIAL.md / TAXON_LIST_2027.md official common-name strings only (Hydrophilidae = water scavenger).",
    verificationStatus: "verified",
  }),
  ento({
    id: "ento-q21",
    topicId: "ecology-habitat",
    difficulty: 1,
    prompt:
      "Where do Trichoptera (caddisflies) typically live as larvae?",
    choiceTexts: [
      "Only in dry desert sand dunes",
      "Inside the fur of mammals as obligate parasites",
      "In the open ocean as plankton only",
      "In freshwater habitats such as streams and ponds",
    ],
    correctChoiceId: "d",
    hint: "Use the larval habitat information for the named order, then compare it with each habitat choice.",
    explanation:
      "Caddisfly larvae are aquatic in freshwater. They are not listed as mammal parasites or as exclusively marine plankton.",
    taxonomyTags: ["Trichoptera"],
    cognitiveDemand: "recall",
    sourceType: "generated",
    sourceNote: "Caddisfly larval habitat is not stated on TAXON_LIST_2027.md or RULES_2027.md.",
    verificationStatus: "needs-review",
  }),
  ento({
    id: "ento-q22",
    topicId: "ecology-habitat",
    difficulty: 2,
    prompt:
      "Mayfly naiads (immature Ephemeroptera) are most likely to be collected from which habitat?",
    choiceTexts: [
      "Hot dry attic dust",
      "A freshwater stream or pond",
      "Open ocean surface slicks only",
      "Inside stored grain as the main pest",
    ],
    correctChoiceId: "b",
    hint: "Focus on the immature stage named in the stem, then compare the habitat requirements in each choice.",
    explanation:
      "This item treats mayfly immatures as aquatic in freshwater. That habitat is not printed on the 2027 taxon list.",
    taxonomyTags: ["Ephemeroptera"],
    cognitiveDemand: "application",
    sourceType: "generated",
    sourceNote:
      "Sample Test 1 included mayfly habitat; this stem is new. Freshwater naiad habitat is not in TAXON_LIST_2027.md.",
    verificationStatus: "needs-review",
  }),
  ento({
    id: "ento-q23",
    topicId: "life-cycles",
    difficulty: 1,
    prompt:
      "Which listed group has complete metamorphosis that includes a pupal stage?",
    choiceTexts: [
      "Lepidoptera (for example Papilionidae)",
      "Hemiptera (for example Aphididae)",
      "Orthoptera (for example Acrididae)",
      "Odonata (dragon/damselflies)",
    ],
    correctChoiceId: "a",
    hint: "Compare the developmental stages associated with each listed group, then match the complete life-cycle pattern.",
    explanation:
      "Lepidoptera are holometabolous: egg, larva, pupa, adult. Hemiptera, Orthoptera, and Odonata have incomplete development (naiad/nymph to adult) without a pupa.",
    taxonomyTags: ["Lepidoptera", "Papilionidae", "Hemiptera", "Orthoptera", "Odonata"],
    cognitiveDemand: "recall",
    sourceType: "generated",
    sourceNote:
      "Complete vs incomplete metamorphosis is sample-adjacent, not restated in RULES_2027.md or TAXON_LIST_2027.md.",
    verificationStatus: "needs-review",
  }),
  ento({
    id: "ento-q24",
    topicId: "behavior-adaptations",
    difficulty: 2,
    prompt:
      "[IMAGE REQUIRED: aquatic beetle hind legs flattened like oars.] The photo shows flattened hind legs used for swimming. Which choice names that kind of leg and a beetle family that has it?",
    choiceTexts: [
      "Fossorial legs in Acrididae",
      "Raptorial legs in Mantodea",
      "Natatorial legs in Dytiscidae",
      "Pollen-collecting legs in all Coleoptera",
    ],
    correctChoiceId: "c",
    hint: "Natatorial means adapted for swimming.",
    explanation:
      "Flattened, hair-fringed hind legs used to row through water are natatorial. Predaceous diving beetles (Dytiscidae) show this well. Fossorial legs dig; raptorial legs seize prey (mantids). Beetles do not all collect pollen.",
    taxonomyTags: ["Dytiscidae", "Coleoptera"],
    cognitiveDemand: "application",
    sourceType: "generated",
    sourceNote:
      "Natatorial legs on listed Dytiscidae. Wikimedia Commons photo (see public/entomology/README.md); yellow circle marks a flattened hind leg only.",
    verificationStatus: "verified",
    imageRequired: true,
    imageSrc: "/entomology/ento-q24.jpg",
    imageAlt:
      "Photograph of an aquatic beetle in water. A yellow circle marks a flattened hind leg.",
    imageBrief:
      "Close-up of a predaceous diving beetle showing widened, oar-like hind legs with swimming hairs. Not a mole-cricket digging leg (not on the list) and not a mantid raptorial foreleg.",
  }),
  ento({
    id: "ento-q25",
    topicId: "behavior-adaptations",
    difficulty: 2,
    prompt:
      "Many crickets (Gryllidae) make the familiar night chirp. How is that sound usually produced?",
    choiceTexts: [
      "By flashing light organs like fireflies",
      "By forcing air through lungs",
      "By chewing wood into powder",
      "By rubbing body parts together (stridulation)",
    ],
    correctChoiceId: "d",
    hint: "Katydids can make sound in a similar way; fireflies use light instead.",
    explanation:
      "This item treats cricket chirps as stridulation: rubbing body parts together. Lampyridae (fireflies) are listed separately. Insects are not described here as having mammal-like lungs. The exact structures used to stridulate are not on the 2027 list.",
    taxonomyTags: ["Gryllidae", "Orthoptera"],
    cognitiveDemand: "application",
    sourceType: "generated",
    sourceNote:
      "Stridulation is sample-adjacent (Sample Test 1). Mechanism details are not on TAXON_LIST_2027.md.",
    verificationStatus: "needs-review",
  }),
  ento({
    id: "ento-q26",
    topicId: "human-impact",
    difficulty: 2,
    prompt:
      "Why are mosquitoes (Culicidae) an important public-health family?",
    choiceTexts: [
      "They pollinate all U.S. food crops and never bite animals",
      "Some species can transmit pathogens that cause human and animal disease",
      "They are the only listed family that recycles dung nutrients",
      "They are non-insect hardback ticks",
    ],
    correctChoiceId: "b",
    hint: "Think of diseases spread by bites, not of bees or dung beetles.",
    explanation:
      "Culicidae is printed as mosquitoes. RULES_2027.md includes public health. This item treats some mosquito species as able to transmit pathogens; the list does not name a disease. Apidae (bees), Scarabaeidae (dung beetles), and Ixodidae (hardback ticks) are other listed names, not the mosquito family.",
    taxonomyTags: ["Culicidae", "Diptera"],
    cognitiveDemand: "application",
    sourceType: "generated",
    sourceNote:
      "Public-health domain from RULES_2027.md. Do not name a specific disease in the stem. Pathogen transmission is not printed on TAXON_LIST_2027.md.",
    verificationStatus: "needs-review",
  }),
  ento({
    id: "ento-q27",
    topicId: "human-impact",
    difficulty: 1,
    prompt:
      "Which listed family is most clearly tied to honey and to pollinating many flowering plants?",
    choiceTexts: [
      "Tenebrionidae — darkling beetles",
      "Siphonaptera — fleas",
      "Reduviidae — Assassin bugs",
      "Apidae — bees",
    ],
    correctChoiceId: "d",
    hint: "Use official common names. Do not pick fleas, assassin bugs, or darkling beetles.",
    explanation:
      "Apidae is printed as bees. RULES_2027.md lists food as an economic theme, but the list does not by itself prove honey production or pollination. Darkling beetles, fleas, and assassin bugs are other listed names, not the bee family.",
    taxonomyTags: ["Apidae", "Hymenoptera"],
    cognitiveDemand: "recall",
    sourceType: "generated",
    sourceNote:
      "Apidae = bees is TAXON_LIST_2027.md. Honey and pollination are not printed on the list; food is only a RULES_2027.md domain name.",
    verificationStatus: "needs-review",
  }),
  ento({
    id: "ento-q28",
    topicId: "interactions",
    difficulty: 2,
    prompt:
      "Gall wasps (Cynipidae) are listed because of their relationship with plants. What do they typically cause plants to grow?",
    choiceTexts: [
      "Mushrooms on the soil only",
      "Honey in a wax comb",
      "Galls — abnormal plant growths that house the developing wasp",
      "Silk cocoons identical to Saturniidae moths",
    ],
    correctChoiceId: "c",
    hint: "Use the plant response described in the reference, then compare each choice’s proposed outcome.",
    explanation:
      "Cynipidae is printed as gall wasps. RULES_2027.md includes relationships with plants. What a gall is, and silk cocoons in Saturniidae, are not printed on the taxon list.",
    taxonomyTags: ["Cynipidae", "Hymenoptera"],
    cognitiveDemand: "application",
    sourceType: "generated",
    sourceNote:
      "Official common name gall wasps plus RULES_2027.md plant relationships. Gall anatomy is not in TAXON_LIST_2027.md.",
    verificationStatus: "needs-review",
  }),
  ento({
    id: "ento-q29",
    topicId: "internal-anatomy",
    difficulty: 1,
    prompt:
      "How do insects typically get oxygen to their tissues?",
    choiceTexts: [
      "With a pair of lungs like mammals",
      "Only by absorbing oxygen through eight walking legs",
      "Only through a single gill on the head",
      "Through openings called spiracles that lead into tracheal tubes",
    ],
    correctChoiceId: "d",
    hint: "Look along the sides of the thorax and abdomen for tiny breathing holes.",
    explanation:
      "This item treats spiracles as openings into tracheal tubes. Mammalian lungs are not the insect system described here. A fuller organ list is not in RULES_2027.md.",
    taxonomyTags: ["Insecta"],
    cognitiveDemand: "recall",
    sourceType: "generated",
    sourceNote:
      "Internal anatomy is in RULES_2027.md with no organ checklist. Tracheal details are not on TAXON_LIST_2027.md.",
    verificationStatus: "needs-review",
  }),
  ento({
    id: "ento-q30",
    topicId: "climate",
    difficulty: 2,
    prompt:
      "Mayflies (Ephemeroptera) and stoneflies (Plecoptera) often need cool, well-oxygenated freshwater as young insects. If a stream becomes warmer and holds less oxygen, what is the most reasonable concern?",
    choiceTexts: [
      "Those aquatic naiads may decline because the habitat no longer matches what they need",
      "They will immediately become terrestrial beetles (Coleoptera)",
      "They will switch to complete metamorphosis with a pupa",
      "They will be reclassified as Ixodidae",
    ],
    correctChoiceId: "a",
    hint: "Climate-change impacts are an official 2027 topic. Think habitat, not a sudden change of order.",
    explanation:
      "RULES_2027.md includes climate-change impacts. This item treats warmer, lower-oxygen water as a habitat mismatch for listed mayflies and stoneflies. That oxygen mechanism is not printed on TAXON_LIST_2027.md. They are not Coleoptera or Ixodidae, and climate is not described as changing their metamorphosis type.",
    taxonomyTags: ["Ephemeroptera", "Plecoptera"],
    cognitiveDemand: "application",
    sourceType: "generated",
    sourceNote:
      "Climate-change impacts domain from RULES_2027.md. Mechanism (warm water / oxygen / sensitive naiads) is not printed on TAXON_LIST_2027.md.",
    verificationStatus: "needs-review",
  }),
  ento({
    id: "ento-q31",
    topicId: "taxonomy",
    difficulty: 1,
    prompt:
      "What common name is listed for family Scutelleridae?",
    choiceTexts: [
      "Stink bugs",
      "metallic shield bugs",
      "treehoppers",
      "cicadas",
    ],
    correctChoiceId: "b",
    hint: "Match the exact printed common-name string. Nearby true-bug families on the list use different strings.",
    explanation:
      "Scutelleridae is printed as metallic shield bugs. Stink bugs (official capitals) are Pentatomidae; treehoppers are Membracidae; cicadas are Cicadidae. The list strings are what students should record.",
    taxonomyTags: ["Scutelleridae", "Hemiptera"],
    cognitiveDemand: "recall",
    sourceType: "rules-derived",
    sourceNote: "TAXON_LIST_2027.md Family Scutelleridae common names.",
    verificationStatus: "verified",
  }),
  ento({
    id: "ento-q32",
    topicId: "taxonomy",
    difficulty: 1,
    prompt:
      "“Stink bugs” is the listed common name for which family?",
    choiceTexts: [
      "Scutelleridae",
      "Membracidae",
      "Pentatomidae",
      "Cicadidae",
    ],
    correctChoiceId: "c",
    hint: "Match the printed common name to the family — nearby Hemiptera names are different families.",
    explanation:
      "Pentatomidae is printed as Stink bugs. Scutelleridae is metallic shield bugs; Membracidae is treehoppers; Cicadidae is cicadas. Using the official string avoids mixing two listed true-bug families.",
    taxonomyTags: ["Pentatomidae", "Hemiptera"],
    cognitiveDemand: "recognition",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027_OFFICIAL.md / TAXON_LIST_2027.md Family Pentatomidae — Stink bugs.",
    verificationStatus: "verified",
  }),
  ento({
    id: "ento-q33",
    topicId: "visual-id",
    difficulty: 2,
    prompt:
      "[IMAGE REQUIRED: large insect with clear wings folded roof-like over the back.] Which family is this insect?",
    choiceTexts: [
      "Membracidae — treehoppers",
      "Cicadidae — cicadas",
      "Scutelleridae — metallic shield bugs",
      "Coccinellidae — lady-bird beetles (ladybugs)",
    ],
    correctChoiceId: "b",
    hint: "Match the specimen to a listed Hemiptera family common name. Do not pick a beetle family.",
    explanation:
      "Cicadidae is printed as cicadas under Hemiptera. Treehoppers are Membracidae; metallic shield bugs are Scutelleridae; lady-bird beetles(ladybugs) are Coccinellidae in Coleoptera.",
    taxonomyTags: ["Cicadidae", "Hemiptera"],
    cognitiveDemand: "recognition",
    sourceType: "rules-derived",
    sourceNote:
      "TAXON_LIST_2027.md Family Cicadidae. Wikimedia Commons photo (see public/entomology/README.md).",
    verificationStatus: "verified",
    imageRequired: true,
    imageSrc: "/entomology/ento-q33.jpg",
    imageAlt:
      "Photograph of a stout insect with large compound eyes and long clear wings folded over its back.",
    imageBrief:
      "Adult cicada: wide head, membranous wings past the abdomen. Not a treehopper, shield bug, or lady-bird beetle.",
  }),
  ento({
    id: "ento-q34",
    topicId: "taxonomy",
    difficulty: 1,
    prompt:
      "What common name is listed for Order Megaloptera?",
    choiceTexts: [
      "stoneflies",
      "dragon/damselflies",
      "caddisflies",
      "dobsonflies",
    ],
    correctChoiceId: "d",
    hint: "Several aquatic-looking order names are on the list; match this order’s printed string.",
    explanation:
      "Megaloptera is printed as dobsonflies. Stoneflies are Plecoptera; dragon/damselflies are Odonata; caddisflies are Trichoptera. Those nearby order names are easy to mix if you only remember “aquatic insect.”",
    taxonomyTags: ["Megaloptera"],
    cognitiveDemand: "recall",
    sourceType: "rules-derived",
    sourceNote: "TAXON_LIST_2027.md Order Megaloptera common names.",
    verificationStatus: "verified",
  }),
  ento({
    id: "ento-q35",
    topicId: "visual-id",
    difficulty: 2,
    prompt:
      "[IMAGE REQUIRED: round beetles with spotted wing covers.] Which family is this?",
    choiceTexts: [
      "Curculionidae — weevils",
      "Scarabaeidae — dung beetles",
      "Tenebrionidae — darkling beetles",
      "Coccinellidae — lady-bird beetles (ladybugs)",
    ],
    correctChoiceId: "d",
    hint: "Among listed beetle families, match the specimen to its official common name. Keep the official punctuation.",
    explanation:
      "Coccinellidae is printed as lady-bird beetles(ladybugs). Weevils are Curculionidae; dung beetles are Scarabaeidae; darkling beetles are Tenebrionidae. Spot pattern is not printed on the 2027 list.",
    taxonomyTags: ["Coccinellidae", "Coleoptera"],
    cognitiveDemand: "recognition",
    sourceType: "rules-derived",
    sourceNote:
      "TAXON_LIST_2027.md Family Coccinellidae — lady-bird beetles(ladybugs). Wikimedia Commons photo (see public/entomology/README.md). Buprestidae family-to-order remains in ento-q50.",
    verificationStatus: "verified",
    imageRequired: true,
    imageSrc: "/entomology/ento-q35.jpg",
    imageAlt:
      "Photograph of two round beetles with spotted wing covers on a green plant.",
    imageBrief:
      "Lady-bird beetles in dorsal view: round spotted elytra, no snout. Not weevils, dung beetles, or darkling beetles.",
  }),
  ento({
    id: "ento-q36",
    topicId: "taxonomy",
    difficulty: 1,
    prompt:
      "What common name is listed for Family Zopheridae?",
    choiceTexts: [
      "diabolical ironclad Beetles",
      "dung beetles",
      "darkling beetles",
      "weevils",
    ],
    correctChoiceId: "a",
    hint: "This Coleoptera family has a long, distinctive official common name on the list.",
    explanation:
      "Zopheridae is printed as diabolical ironclad Beetles. Dung beetles are Scarabaeidae; darkling beetles are Tenebrionidae; weevils are Curculionidae. All four are listed beetle families with different official strings.",
    taxonomyTags: ["Zopheridae", "Coleoptera"],
    cognitiveDemand: "recall",
    sourceType: "rules-derived",
    sourceNote: "TAXON_LIST_2027.md Family Zopheridae common names.",
    verificationStatus: "verified",
  }),
  ento({
    id: "ento-q37",
    topicId: "taxonomy",
    difficulty: 2,
    prompt:
      "A listed specimen is family Tephritidae (fruit flies, husk fly). Which order should be recorded?",
    choiceTexts: [
      "Hymenoptera",
      "Lepidoptera",
      "Diptera",
      "Hemiptera",
    ],
    correctChoiceId: "c",
    hint: "Find the parent order printed above Tephritidae on the 2027 list.",
    explanation:
      "Tephritidae is a family of Order Diptera (true flies). Hymenoptera is printed as bees/ants/wasps.; Lepidoptera as moths and butterflies; Hemiptera as true bugs. Family-to-order placement is a list skill.",
    taxonomyTags: ["Tephritidae", "Diptera"],
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote: "TAXON_LIST_2027.md Diptera → Tephritidae.",
    verificationStatus: "verified",
  }),
  ento({
    id: "ento-q38",
    topicId: "visual-id",
    difficulty: 1,
    prompt:
      "[IMAGE REQUIRED: insect with a triangular head and folded grasping front legs.] Which order is this?",
    choiceTexts: [
      "Zygentoma — silverfish, firebrats",
      "Blattodea — cockroaches/termites",
      "Orthoptera — grasshoppers & crickets",
      "Mantodea — mantids",
    ],
    correctChoiceId: "d",
    hint: "Match the specimen to the listed order’s official common name. Do not pick cockroaches or crickets.",
    explanation:
      "Mantodea is printed as mantids. Silverfish and firebrats are Zygentoma; cockroaches/termites are Blattodea; grasshoppers & crickets are Orthoptera. Folded grasping front legs are visible in the photo; that character is not printed on the 2027 list.",
    taxonomyTags: ["Mantodea"],
    cognitiveDemand: "recognition",
    sourceType: "rules-derived",
    sourceNote:
      "TAXON_LIST_2027.md Order Mantodea — mantids. Wikimedia Commons photo (see public/entomology/README.md).",
    verificationStatus: "verified",
    imageRequired: true,
    imageSrc: "/entomology/ento-q38.jpg",
    imageAlt:
      "Photograph of a green insect with a triangular head and folded, spiny front legs.",
    imageBrief:
      "Mantid: triangular head, raptorial forelegs folded. Not a cockroach, cricket, or silverfish.",
  }),
  ento({
    id: "ento-q39",
    topicId: "taxonomy",
    difficulty: 2,
    prompt:
      "Siphonaptera is listed as fleas. How is it grouped?",
    choiceTexts: [
      "As an insect order with no families listed",
      "As a family under Diptera",
      "As a non-insect arthropod family",
      "As a subclass under Entognatha",
    ],
    correctChoiceId: "a",
    hint: "Check whether the list prints families under this name, and whether it sits in Insecta.",
    explanation:
      "Siphonaptera is an insect order whose official common name is fleas, and the list prints no families under it. It is not a fly family, not Ixodidae, and not a subclass of Entognatha. Rank and “families listed: none” both come from the list.",
    taxonomyTags: ["Siphonaptera", "Insecta"],
    cognitiveDemand: "distinction",
    sourceType: "rules-derived",
    sourceNote:
      "TAXON_LIST_2027.md Order Siphonaptera (common names: fleas; families listed: none).",
    verificationStatus: "verified",
  }),
  ento({
    id: "ento-q40",
    topicId: "comparison",
    difficulty: 3,
    prompt:
      "[IMAGE REQUIRED: two flower-visiting insects labeled A and B.] Look at insects A and B. Which pairing is correct?",
    choiceTexts: [
      "A and B are both Apidae in Hymenoptera",
      "A = Bombyliidae in Diptera; B = Apidae in Hymenoptera",
      "A = Apidae in Hymenoptera; B = Bombyliidae in Diptera",
      "A and B are both Bombyliidae in Diptera",
    ],
    correctChoiceId: "b",
    hint: "Match each specimen to a listed family and its parent order. Similar everyday words can sit in different orders.",
    explanation:
      "Bombyliidae is printed as bee flies under Diptera. Apidae is printed as bees under Hymenoptera. Specimen A has one pair of wings and a long rigid mouthpart; specimen B has two pairs of wings. Those photo characters are not printed on the 2027 list.",
    taxonomyTags: ["Bombyliidae", "Apidae", "Diptera", "Hymenoptera"],
    cognitiveDemand: "distinction",
    sourceType: "rules-derived",
    sourceNote:
      "TAXON_LIST_2027.md Bombyliidae (bee flies) vs Apidae (bees). Wikimedia Commons photos (see public/entomology/README.md); A/B labels only.",
    verificationStatus: "verified",
    imageRequired: true,
    imageSrc: "/entomology/ento-q40.jpg",
    imageAlt:
      "Two photographs of flower-visiting insects labeled A and B. No extra labels on the mouthparts or wings.",
    imageBrief:
      "A: bee fly with one wing pair and long rigid proboscis. B: honey bee with two wing pairs. Do not print family names on the image.",
  }),
  ento({
    id: "ento-q41",
    topicId: "visual-id",
    difficulty: 1,
    prompt:
      "[IMAGE REQUIRED: yellow-and-black flying insect with a narrow waist.] Which family is this?",
    choiceTexts: [
      "Formicidae — ants",
      "Apidae — bees",
      "Vespidae — paper wasps, hornets, yellowjackets",
      "Cynipidae — gall wasps",
    ],
    correctChoiceId: "c",
    hint: "All four choices are listed Hymenoptera families; match the specimen to the official common-name string.",
    explanation:
      "Vespidae is printed as paper wasps, hornets, yellowjackets. Ants are Formicidae; bees are Apidae; gall wasps are Cynipidae. A narrow waist is visible in the photo; that character is not printed on the 2027 list.",
    taxonomyTags: ["Vespidae", "Hymenoptera"],
    cognitiveDemand: "recognition",
    sourceType: "rules-derived",
    sourceNote:
      "TAXON_LIST_2027.md Family Vespidae. Wikimedia Commons photo (see public/entomology/README.md).",
    verificationStatus: "verified",
    imageRequired: true,
    imageSrc: "/entomology/ento-q41.jpg",
    imageAlt:
      "Photograph of a yellow-and-black perched insect with a narrow waist and banded abdomen.",
    imageBrief:
      "Yellowjacket in flight: yellow and black bands, narrow waist. Not an ant, bee, or gall wasp.",
  }),
  ento({
    id: "ento-q42",
    topicId: "taxonomy",
    difficulty: 2,
    prompt:
      "Saturniidae (Giant Silkworm moths) belong to which order?",
    choiceTexts: [
      "Lepidoptera",
      "Diptera",
      "Hymenoptera",
      "Coleoptera",
    ],
    correctChoiceId: "a",
    hint: "Find the parent order printed above Saturniidae on the 2027 list.",
    explanation:
      "Saturniidae is a family of Lepidoptera (moths and butterflies). Diptera is printed as true flies; Hymenoptera as bees/ants/wasps.; Coleoptera as beetles. Keep the list’s capitalization of Giant Silkworm moths, and still place the family in Lepidoptera.",
    taxonomyTags: ["Saturniidae", "Lepidoptera"],
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote: "TAXON_LIST_2027.md Lepidoptera → Saturniidae.",
    verificationStatus: "verified",
  }),
  ento({
    id: "ento-q43",
    topicId: "taxonomy",
    difficulty: 3,
    prompt:
      "On the list, what ranks are Collembola and Diplura?",
    choiceTexts: [
      "Both are families in Class Insecta",
      "Both are insect orders in Class Insecta",
      "Collembola is an order; Diplura is a subclass",
      "Collembola is a subclass of Entognatha; Diplura is an order of Entognatha",
    ],
    correctChoiceId: "d",
    hint: "Neither name is a family. One is the list’s only subclass.",
    explanation:
      "Collembola is Subclass Collembola under Class Entognatha. Diplura is Order Diplura under the same class. They are not Insecta families or Insecta orders, and the subclass/order labels are not interchangeable.",
    taxonomyTags: ["Collembola", "Diplura", "Entognatha"],
    cognitiveDemand: "distinction",
    sourceType: "rules-derived",
    sourceNote:
      "TAXON_LIST_2027.md Class Entognatha: Subclass Collembola vs Order Diplura.",
    verificationStatus: "verified",
  }),
  ento({
    id: "ento-q44",
    topicId: "visual-id",
    difficulty: 2,
    prompt:
      "[IMAGE REQUIRED: small insect with a peaked shield over the back.] Which family is this?",
    choiceTexts: [
      "Acrididae — short-horned grasshoppers",
      "Cicadidae — cicadas",
      "Membracidae — treehoppers",
      "Pentatomidae — Stink bugs",
    ],
    correctChoiceId: "c",
    hint: "Match the specimen to a listed Hemiptera family common name. Do not pick a grasshopper family.",
    explanation:
      "Membracidae is printed as treehoppers under Hemiptera. Cicadas are Cicadidae; Stink bugs are Pentatomidae; short-horned grasshoppers are Acrididae in Orthoptera. A peaked dorsal shield is visible in the photo; that character is not printed on the 2027 list.",
    taxonomyTags: ["Membracidae", "Hemiptera"],
    cognitiveDemand: "recognition",
    sourceType: "rules-derived",
    sourceNote:
      "TAXON_LIST_2027.md Family Membracidae. Wikimedia Commons photo (see public/entomology/README.md).",
    verificationStatus: "verified",
    imageRequired: true,
    imageSrc: "/entomology/ento-q44.jpg",
    imageAlt:
      "Side photograph of a small green insect with a peaked shield-shaped back on a stem.",
    imageBrief:
      "Treehopper in side view: enlarged pronotum forming a peak. Not a cicada, stink bug, or short-horned grasshopper.",
  }),
  ento({
    id: "ento-q45",
    topicId: "dichotomous-keys",
    difficulty: 3,
    prompt:
      "Follow this key from the top.\n\n1a. Listed under Non-Insect Arthropods → Ixodidae\n1b. Listed in Class Insecta → go to 2\n2a. Listed common name is bees → Apidae\n2b. Listed common name is ants → Formicidae\n\nThe specimen is a hardback tick. Which family do you reach?",
    choiceTexts: [
      "Ixodidae",
      "Apidae",
      "Formicidae",
      "Collembola",
    ],
    correctChoiceId: "a",
    hint: "Start at couplet 1 using the list heading, not the insect families in couplet 2.",
    explanation:
      "Hardback ticks are Family Ixodidae under Non-Insect Arthropods, so 1a finishes the key. Couplet 2 is only for Insecta. Bees and ants are listed hymenopteran families; Collembola is Entognatha, not the tick family.",
    taxonomyTags: ["Ixodidae", "Apidae", "Formicidae"],
    cognitiveDemand: "multi-step",
    sourceType: "rules-derived",
    sourceNote:
      "Original key using TAXON_LIST_2027.md Non-Insect Arthropods vs Insecta and official Apidae/Formicidae names.",
    verificationStatus: "verified",
  }),
  ento({
    id: "ento-q46",
    topicId: "dichotomous-keys",
    difficulty: 3,
    prompt:
      "Follow this key from the top.\n\n1a. Family in Hemiptera (true bugs) → go to 2\n1b. Family in Coleoptera (beetles) → stop; not in this key\n2a. Listed common name is cicadas → Cicadidae\n2b. Listed common name is metallic shield bugs → Scutelleridae\n\nA specimen’s listed common name is metallic shield bugs. Which family do you reach?",
    choiceTexts: [
      "Cicadidae",
      "Pentatomidae",
      "Scutelleridae",
      "Coccinellidae",
    ],
    correctChoiceId: "c",
    hint: "Stay on the Hemiptera branch, then match the official common name in couplet 2.",
    explanation:
      "Couplet 1a keeps Hemiptera. Couplet 2b matches metallic shield bugs → Scutelleridae. Cicadidae is 2a. Pentatomidae (Stink bugs) is a listed hemipteran family not in this key. Coccinellidae is a beetle family, so 1b would exclude it.",
    taxonomyTags: ["Scutelleridae", "Cicadidae", "Hemiptera"],
    cognitiveDemand: "multi-step",
    sourceType: "rules-derived",
    sourceNote:
      "Original key using TAXON_LIST_2027.md Hemiptera vs Coleoptera and Scutelleridae/Cicadidae common names.",
    verificationStatus: "verified",
  }),
  ento({
    id: "ento-q47",
    topicId: "dichotomous-keys",
    difficulty: 3,
    prompt:
      "Follow this key from the top.\n\n1a. Listed common name is thrips → Thysanoptera\n1b. Not thrips → go to 2\n2a. Listed common name is dobsonflies → Megaloptera\n2b. Listed common name is caddisflies → Trichoptera\n\nA specimen’s listed common name is dobsonflies. Which order do you reach?",
    choiceTexts: [
      "Thysanoptera",
      "Megaloptera",
      "Trichoptera",
      "Siphonaptera",
    ],
    correctChoiceId: "b",
    hint: "Reject couplet 1a, then read couplet 2 using the printed common name.",
    explanation:
      "Dobsonflies are not thrips, so 1b leads to couplet 2. Couplet 2a matches dobsonflies → Megaloptera. Trichoptera is caddisflies; Siphonaptera is fleas and is not in this key. The splits use official common names only.",
    taxonomyTags: ["Megaloptera", "Thysanoptera", "Trichoptera"],
    cognitiveDemand: "multi-step",
    sourceType: "rules-derived",
    sourceNote:
      "Original key using TAXON_LIST_2027.md official common names for Thysanoptera, Megaloptera, and Trichoptera.",
    verificationStatus: "verified",
  }),
  ento({
    id: "ento-q48",
    topicId: "dichotomous-keys",
    difficulty: 2,
    prompt:
      "Follow this key from the top.\n\n1a. Family in Diptera (true flies) → go to 2\n1b. Family in Hymenoptera (bees, ants, wasps) → stop; not in this key\n2a. Listed common name is mosquitoes → Culicidae\n2b. Listed common name is fruit flies, husk fly → Tephritidae\n\nA specimen’s listed common name is fruit flies, husk fly. Which family do you reach?",
    choiceTexts: [
      "Culicidae",
      "Apidae",
      "Bombyliidae",
      "Tephritidae",
    ],
    correctChoiceId: "d",
    hint: "Stay on Diptera, then match the exact official common-name string in couplet 2.",
    explanation:
      "Couplet 1a keeps Diptera. Couplet 2b matches fruit flies, husk fly → Tephritidae. Culicidae is mosquitoes (2a). Apidae is bees in Hymenoptera (1b). Bombyliidae is bee flies, a listed dipteran family not used in this key.",
    taxonomyTags: ["Tephritidae", "Culicidae", "Diptera"],
    cognitiveDemand: "multi-step",
    sourceType: "rules-derived",
    sourceNote:
      "Original key using TAXON_LIST_2027.md Diptera vs Hymenoptera and Tephritidae/Culicidae common names.",
    verificationStatus: "verified",
  }),
  ento({
    id: "ento-q49",
    topicId: "dichotomous-keys",
    difficulty: 3,
    prompt:
      "You are making a simple key for these listed groups only: Collembola, Blattodea, and Ixodidae. What is the best first split?",
    choiceTexts: [
      "Lives in water versus lives on land",
      "Entognatha versus Insecta versus non-insect arthropods",
      "Has wings versus has no wings",
      "Can glow versus cannot glow",
    ],
    correctChoiceId: "b",
    hint: "Use how the 2027 list groups the three names, not unsourced habits.",
    explanation:
      "Collembola is a subclass of Entognatha, Blattodea is an insect order, and Ixodidae is under Non-Insect Arthropods. That list grouping splits the three taxa cleanly. Water vs land, wings, and glowing are not characters this key is allowed to assume from the list.",
    taxonomyTags: ["Collembola", "Blattodea", "Ixodidae", "Entognatha", "Insecta"],
    cognitiveDemand: "multi-step",
    sourceType: "rules-derived",
    sourceNote:
      "TAXON_LIST_2027.md headings: Entognatha (Collembola), Insecta (Blattodea), Non-Insect Arthropods (Ixodidae).",
    verificationStatus: "verified",
  }),
  ento({
    id: "ento-q50",
    topicId: "dichotomous-keys",
    difficulty: 2,
    prompt:
      "Follow this key from the top.\n\n1a. Family in Coleoptera (beetles) → go to 2\n1b. Family in Diptera (true flies) → stop; not in this key\n2a. Listed common name is metallic wood-boring/jewel beetles → Buprestidae\n2b. Listed common name is diabolical ironclad Beetles → Zopheridae\n\nA specimen’s listed common name is metallic wood-boring/jewel beetles. Which family do you reach?",
    choiceTexts: [
      "Buprestidae",
      "Zopheridae",
      "Lampyridae",
      "Tephritidae",
    ],
    correctChoiceId: "a",
    hint: "Stay on Coleoptera, then read couplet 2’s official common names.",
    explanation:
      "Couplet 1a keeps Coleoptera. Couplet 2a matches metallic wood-boring/jewel beetles → Buprestidae. Zopheridae is 2b. Lampyridae (fireflies) is a listed beetle family not in this key. Tephritidae is a fly family, so 1b would exclude it.",
    taxonomyTags: ["Buprestidae", "Zopheridae", "Coleoptera"],
    cognitiveDemand: "multi-step",
    sourceType: "rules-derived",
    sourceNote:
      "Original key using TAXON_LIST_2027.md Coleoptera vs Diptera and Buprestidae/Zopheridae common names.",
    verificationStatus: "verified",
  }),
  ento({
    id: "ento-q51",
    topicId: "external-anatomy",
    difficulty: 1,
    prompt:
      "An insect’s three main body regions are head, thorax, and abdomen. Which region sits in the middle?",
    choiceTexts: [
      "Abdomen",
      "Thorax",
      "Head",
      "Neck",
    ],
    correctChoiceId: "b",
    hint: "The three regions run front to back: head, then the middle piece, then the abdomen.",
    explanation:
      "The thorax is the middle region, between the head and the abdomen. Neck is not one of the three insect tagmata used in this curriculum. Knowing the middle region matters because that is also where walking legs attach.",
    taxonomyTags: ["Insecta"],
    cognitiveDemand: "recognition",
    sourceType: "generated",
    sourceNote:
      "Insect tagmata from CURRICULUM_2027.md external-anatomy and existing ento-q14 (head, thorax, abdomen). New stem asks which region is middle.",
    verificationStatus: "needs-review",
  }),
  ento({
    id: "ento-q52",
    topicId: "external-anatomy",
    difficulty: 1,
    prompt:
      "An insect’s three main body regions are head, thorax, and abdomen. Which region is at the rear?",
    choiceTexts: [
      "Head",
      "Thorax",
      "Abdomen",
      "Neck",
    ],
    correctChoiceId: "c",
    hint: "The rear region is the last of the three tagmata, not the middle thorax.",
    explanation:
      "The abdomen is the rear region. Head is at the front; thorax is in the middle. Neck is not one of the three insect body regions in this curriculum. Rear vs middle matters when locating abdominal appendages such as cerci.",
    taxonomyTags: ["Insecta"],
    cognitiveDemand: "recognition",
    sourceType: "generated",
    sourceNote:
      "Insect tagmata from CURRICULUM_2027.md and existing ento-q14. New stem asks which region is rear.",
    verificationStatus: "needs-review",
  }),
  ento({
    id: "ento-q53",
    topicId: "external-anatomy",
    difficulty: 1,
    prompt: "Where is an insect’s supporting skeleton found?",
    choiceTexts: [
      "Inside the body like a typical mammal backbone",
      "Only in the wings when wings are present",
      "Only inside the compound eyes",
      "On the outside of the body",
    ],
    correctChoiceId: "d",
    hint: "The word “exoskeleton” means the skeleton is on the outside.",
    explanation:
      "Insects have an exoskeleton: the supporting cuticle is on the outside of the body, where muscles can attach. It is not a mammal-style internal backbone, and it is not limited to wings or eyes. That outside position is why it both supports and protects.",
    taxonomyTags: ["Insecta"],
    cognitiveDemand: "recall",
    sourceType: "generated",
    sourceNote:
      "Exoskeleton location from CURRICULUM_2027.md and existing ento-q15 (outside skeleton / cuticle). New stem asks where it is, not only its job.",
    verificationStatus: "needs-review",
  }),
  ento({
    id: "ento-q54",
    topicId: "external-anatomy",
    difficulty: 2,
    prompt:
      "Which listed grouping is not an insect built with head, thorax, and abdomen as its three main regions?",
    choiceTexts: [
      "Family Apidae",
      "Order Coleoptera",
      "Family Ixodidae (hardback ticks)",
      "Order Blattodea",
    ],
    correctChoiceId: "c",
    hint: "Find the name that the 2027 list places outside Class Insecta.",
    explanation:
      "Ixodidae is listed under Non-Insect Arthropods as hardback ticks, not as Class Insecta. Apidae, Coleoptera, and Blattodea are insects on the list, so the three insect body regions apply to them. List grouping, not a new tick diagram, is what separates Ixodidae here.",
    taxonomyTags: ["Ixodidae", "Insecta", "Apidae", "Coleoptera", "Blattodea"],
    cognitiveDemand: "distinction",
    sourceType: "generated",
    sourceNote:
      "TAXON_LIST_2027.md Ixodidae under Non-Insect Arthropods; insect tagmata from CURRICULUM_2027.md and ento-q14.",
    verificationStatus: "needs-review",
  }),
  ento({
    id: "ento-q55",
    topicId: "life-cycles",
    difficulty: 2,
    prompt:
      "Dragonflies and damselflies are listed as Order Odonata. Do they have a pupal stage?",
    choiceTexts: [
      "Yes; Odonata are holometabolous like Lepidoptera",
      "No; Odonata have incomplete development without a pupa",
      "Only when they are listed as Ixodidae",
      "Only the family Papilionidae inside Odonata has a pupa",
    ],
    correctChoiceId: "b",
    hint: "Complete metamorphosis with a pupa was taught for Lepidoptera, not for Odonata.",
    explanation:
      "The existing life-cycle item treats Lepidoptera as holometabolous (egg, larva, pupa, adult) and treats Odonata, Hemiptera, and Orthoptera as incomplete development without a pupa. Odonata is not Ixodidae, and Papilionidae is a lepidopteran family, not an odonate family.",
    taxonomyTags: ["Odonata", "Lepidoptera"],
    cognitiveDemand: "application",
    sourceType: "generated",
    sourceNote:
      "Same complete vs incomplete split as existing ento-q23 (Odonata without a pupa). New stem asks about Odonata rather than which group is holometabolous.",
    verificationStatus: "needs-review",
  }),
  ento({
    id: "ento-q56",
    topicId: "ecology-habitat",
    difficulty: 2,
    prompt:
      "Students collect young insects from a freshwater pond. The order they want is listed as caddisflies. Which order is that?",
    choiceTexts: [
      "Ephemeroptera",
      "Plecoptera",
      "Odonata",
      "Trichoptera",
    ],
    correctChoiceId: "d",
    hint: "Match the official common name first, then remember this order’s immatures were taught as freshwater.",
    explanation:
      "Caddisflies are Order Trichoptera on the 2027 list. The existing habitat item treats caddisfly larvae as living in freshwater such as streams and ponds. Ephemeroptera is mayflies; Plecoptera is stoneflies; Odonata is dragon/damselflies — different official names.",
    taxonomyTags: ["Trichoptera"],
    cognitiveDemand: "application",
    sourceType: "generated",
    sourceNote:
      "TAXON_LIST_2027.md Trichoptera = caddisflies; freshwater larval habitat from existing ento-q21. New stem combines list name with that habitat.",
    verificationStatus: "needs-review",
  }),
  ento({
    id: "ento-q57",
    topicId: "internal-anatomy",
    difficulty: 1,
    prompt: "In insects, what are spiracles?",
    choiceTexts: [
      "Openings that lead into tracheal tubes",
      "A pair of lungs like those of mammals",
      "The pupal stage of complete metamorphosis",
      "The three pairs of walking legs",
    ],
    correctChoiceId: "a",
    hint: "They are breathing openings, not lungs and not legs.",
    explanation:
      "Spiracles are openings into the tracheal tubes that carry air to insect tissues. Insects do not have mammal lungs. A pupa is a life-cycle stage, and walking legs are thoracic appendages — neither is a spiracle.",
    taxonomyTags: ["Insecta"],
    cognitiveDemand: "recall",
    sourceType: "generated",
    sourceNote:
      "Spiracles/tracheal tubes from existing ento-q29 and CURRICULUM_2027.md internal-anatomy-gas-exchange. New stem names the openings.",
    verificationStatus: "needs-review",
  }),
  ento({
    id: "ento-q58",
    topicId: "behavior-adaptations",
    difficulty: 1,
    prompt:
      "Which listed family is known for a familiar night chirp made by rubbing body parts together (stridulation)?",
    choiceTexts: [
      "Lampyridae",
      "Culicidae",
      "Gryllidae",
      "Ixodidae",
    ],
    correctChoiceId: "c",
    hint: "Do not pick fireflies, mosquitoes, or hardback ticks.",
    explanation:
      "The existing behavior item treats Gryllidae (crickets/tree crickets) as stridulating by rubbing body parts together. Lampyridae are fireflies (light, not this chirp example). Culicidae are mosquitoes. Ixodidae are hardback ticks, not an insect cricket family.",
    taxonomyTags: ["Gryllidae", "Orthoptera"],
    cognitiveDemand: "recognition",
    sourceType: "generated",
    sourceNote:
      "Stridulation example taxon from existing ento-q25 (Gryllidae). New stem asks which listed family, not how the sound is produced.",
    verificationStatus: "needs-review",
  }),
  ento({
    id: "ento-q59",
    topicId: "interactions",
    difficulty: 1,
    prompt:
      "Gall wasps (Cynipidae) are known for their relationship with what?",
    choiceTexts: [
      "Plants",
      "Hardback ticks only",
      "Marine plankton only",
      "Mammalian lungs",
    ],
    correctChoiceId: "a",
    hint: "The official common name includes “gall,” a plant growth in this curriculum’s gall-wasp item.",
    explanation:
      "Cynipidae is printed as gall wasps. The existing interactions item treats them as causing plant galls — a plant–insect relationship on the official scope. They are not defined by ticks, marine plankton, or lungs.",
    taxonomyTags: ["Cynipidae", "Hymenoptera"],
    cognitiveDemand: "application",
    sourceType: "generated",
    sourceNote:
      "TAXON_LIST_2027.md Cynipidae = gall wasps; plant galls from existing ento-q28 and RULES_2027.md relationships with plants.",
    verificationStatus: "needs-review",
  }),
  ento({
    id: "ento-q60",
    topicId: "human-impact",
    difficulty: 2,
    prompt:
      "Which listed family includes species that can transmit pathogens to people or animals?",
    choiceTexts: [
      "Apidae",
      "Scarabaeidae",
      "Saturniidae",
      "Culicidae",
    ],
    correctChoiceId: "d",
    hint: "Eliminate bees, dung beetles, and Giant Silkworm moths using their official common names.",
    explanation:
      "The existing public-health item treats Culicidae (mosquitoes) as a family in which some species can transmit pathogens. Apidae are bees (food/pollination). Scarabaeidae are dung beetles. Saturniidae are Giant Silkworm moths. This stem does not name a specific disease.",
    taxonomyTags: ["Culicidae", "Diptera"],
    cognitiveDemand: "recognition",
    sourceType: "generated",
    sourceNote:
      "Public-health example taxon from existing ento-q26 (Culicidae). New stem asks which family, without naming a disease.",
    verificationStatus: "needs-review",
  }),
];

const IMAGE_REQUIRED_PREFIX = /^\[IMAGE REQUIRED:[^\]]*\]\s*/;

/** Map to the shared Question shape. Drops author notes, tags, and image briefs. Keeps verificationStatus for live-practice filtering. */
export function entomologyQuestionToPracticeQuestion(
  question: EntomologyQuestion,
): Question {
  const imageCredit = question.imageRequired
    ? entomologyImageCredit(question.imageSrc)
    : undefined;
  return {
    id: question.id,
    eventId: question.eventId,
    topicId: question.topicId,
    prompt: question.prompt.replace(IMAGE_REQUIRED_PREFIX, "").trim(),
    choices: question.choices,
    correctChoiceId: question.correctChoiceId,
    explanation: question.explanation,
    hint: question.hint,
    ...optionalSecondHintFields(question.hint2),
    difficulty: question.difficulty,
    imageRequired: question.imageRequired,
    verificationStatus: question.verificationStatus,
    ...(question.imageRequired
      ? {
          imageSrc: question.imageSrc,
          imageAlt: question.imageAlt,
          ...(imageCredit ? { imageCredit } : {}),
        }
      : {}),
  };
}
