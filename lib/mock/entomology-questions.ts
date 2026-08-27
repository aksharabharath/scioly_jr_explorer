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
import type {
  DifficultyLevel,
  Question,
  QuestionVerificationStatus,
} from "@/lib/types";

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
    explanation: string;
    taxonomyTags: EntomologyTaxonId[];
    cognitiveDemand: EntomologyCognitiveDemand;
    sourceType: EntomologySourceType;
    sourceNote: string;
    verificationStatus?: EntomologyVerificationStatus;
  } & (
    | { imageRequired: true; imageBrief: string }
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
    explanation: input.explanation,
    taxonomyTags: input.taxonomyTags,
    cognitiveDemand: input.cognitiveDemand,
    sourceType: input.sourceType,
    sourceNote: input.sourceNote,
    verificationStatus: input.verificationStatus ?? "draft",
  };

  if (input.imageRequired === true) {
    return { ...base, imageRequired: true, imageBrief: input.imageBrief };
  }
  return { ...base, imageRequired: false };
}

export const MOCK_ENTOMOLOGY_QUESTIONS: EntomologyQuestion[] = [
  ento({
    id: "ento-q1",
    topicId: "taxonomy",
    difficulty: 1,
    prompt:
      "On the 2027 ESO Entomology List, which order includes both cockroaches and termites?",
    choiceTexts: [
      "Mantodea",
      "Blattodea",
      "Orthoptera",
      "Coleoptera",
    ],
    correctChoiceId: "b",
    hint: "Look at the official common names printed next to that order.",
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
      "What official common names does the 2027 ESO list give for Subclass Collembola?",
    choiceTexts: [
      "diplurans",
      "silverfish, firebrats",
      "thrips",
      "springtails, snow fleas",
    ],
    correctChoiceId: "d",
    hint: "Collembola is a subclass under Class Entognatha, not an insect order.",
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
    topicId: "taxonomy",
    difficulty: 1,
    prompt:
      "Family Ixodidae appears on the 2027 ESO Entomology List. How is it grouped?",
    choiceTexts: [
      "As an insect order in Class Insecta",
      "As a beetle family in Coleoptera",
      "As a true-bug family in Hemiptera",
      "As a non-insect arthropod family (hardback ticks)",
    ],
    correctChoiceId: "d",
    hint: "Find the list heading that is separate from Class Entognatha and Class Insecta.",
    explanation:
      "Ixodidae is listed under Non-Insect Arthropods with the common name hardback ticks. It is not an insect order or a beetle or true-bug family.",
    taxonomyTags: ["Ixodidae"],
    cognitiveDemand: "recall",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027_OFFICIAL.md / TAXON_LIST_2027.md Non-Insect Arthropods, Family Ixodidae — hardback ticks.",
    verificationStatus: "verified",
  }),
  ento({
    id: "ento-q4",
    topicId: "taxonomy",
    difficulty: 1,
    prompt: "Mayflies are listed on the 2027 ESO list as which order?",
    choiceTexts: [
      "Odonata",
      "Plecoptera",
      "Ephemeroptera",
      "Trichoptera",
    ],
    correctChoiceId: "c",
    hint: "Dragon/damselflies, stoneflies, and caddisflies are different listed orders.",
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
    topicId: "taxonomy",
    difficulty: 2,
    prompt:
      "A specimen is correctly identified as family Apidae (bees). Which order must it belong to on the 2027 list?",
    choiceTexts: [
      "Hymenoptera",
      "Diptera",
      "Lepidoptera",
      "Coleoptera",
    ],
    correctChoiceId: "a",
    hint: "Bee flies are a different listed family; do not mix them with Apidae.",
    explanation:
      "Apidae is a family under Order Hymenoptera. Bee flies (Bombyliidae) are Diptera and are a different listed family.",
    taxonomyTags: ["Apidae", "Hymenoptera"],
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote:
      "RULES_2027_OFFICIAL.md / TAXON_LIST_2027.md Order Hymenoptera (bees/ants/wasps.) → Family Apidae — bees.",
    verificationStatus: "verified",
  }),
  ento({
    id: "ento-q6",
    topicId: "visual-id",
    difficulty: 1,
    prompt:
      "[IMAGE REQUIRED: worker ant in side view.] Using the 2027 list, which family is this insect?",
    choiceTexts: [
      "Vespidae — paper wasps, hornets, yellowjackets",
      "Formicidae — ants",
      "Cynipidae — gall wasps",
      "Apidae — bees",
    ],
    correctChoiceId: "b",
    hint: "Among listed Hymenoptera families, match the specimen to its official common name. Do not pick bees, gall wasps, or paper wasps.",
    explanation:
      "Ants are family Formicidae in Hymenoptera. Wasps, gall wasps, and bees are other listed hymenopteran families with different body plans.",
    taxonomyTags: ["Formicidae", "Hymenoptera"],
    cognitiveDemand: "recognition",
    sourceType: "generated",
    sourceNote:
      "Generated ID item using official Formicidae common name. Image not supplied. Visual diagnostics (petiole, elbowed antennae) are not in TAXON_LIST_2027.md.",
    verificationStatus: "needs-review",
    imageRequired: true,
    imageBrief:
      "Clear side view of a worker ant: distinct head, thorax, petiole (narrow waist), and gaster; elbowed antennae; no wasp-like folded wings required. Not a bee (no pollen baskets / hairy bee shape) and not a paper wasp.",
  }),
  ento({
    id: "ento-q7",
    topicId: "visual-id",
    difficulty: 2,
    prompt:
      "[IMAGE REQUIRED: butterfly with tailed hindwings.] Which listed Lepidoptera family best matches this specimen?",
    choiceTexts: [
      "Nymphalidae — brush-footed butterflies",
      "Saturniidae — Giant Silkworm moths",
      "Papilionidae — swallowtails",
      "No listed moth or butterfly family has hindwing tails",
    ],
    correctChoiceId: "c",
    hint: "Among the three listed Lepidoptera families, match the specimen to its official common name. Do not pick Giant Silkworm moths.",
    explanation:
      "Papilionidae (swallowtails) often have tail-like projections on the hindwings. Saturniidae are Giant Silkworm moths; Nymphalidae are brush-footed butterflies. Tails are a useful clue among the three listed lepidopteran families, not a proof for every swallowtail species.",
    taxonomyTags: ["Papilionidae", "Lepidoptera"],
    cognitiveDemand: "recognition",
    sourceType: "generated",
    sourceNote:
      "Generated visual ID. Style similar to sample Papilionidae items but not a copy. Hindwing-tail diagnostic is not on the 2027 list.",
    verificationStatus: "needs-review",
    imageRequired: true,
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
    hint: "Match the swimming pose in the photo to a listed aquatic family. Do not pick beetle families if the specimen is a true bug.",
    explanation:
      "Notonectidae is printed as backswimmers. Orientation in the photo is not a list fact. Corixidae is printed as water boatmen. Dytiscidae and Hydrophilidae (water scavenger) are Coleoptera families, not Hemiptera.",
    taxonomyTags: ["Notonectidae", "Hemiptera"],
    cognitiveDemand: "recognition",
    sourceType: "generated",
    sourceNote:
      "Generated from listed common names. Not a copy of Sample Test 1. Swimming-orientation diagnostic: needs-review if photo is ambiguous.",
    verificationStatus: "needs-review",
    imageRequired: true,
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
      "Coccinellidae — lady-bird beetles(ladybugs)",
      "Curculionidae — weevils",
    ],
    correctChoiceId: "d",
    hint: "Among listed beetle families, match the specimen to its official common name. Do not pick lady-bird beetles or dung beetles.",
    explanation:
      "Curculionidae is printed as weevils. The snout diagnostic is not on the 2027 list. Tenebrionidae, Scarabaeidae, and Coccinellidae (lady-bird beetles(ladybugs)) are other listed beetle families.",
    taxonomyTags: ["Curculionidae", "Coleoptera"],
    cognitiveDemand: "recognition",
    sourceType: "generated",
    sourceNote: "Generated visual ID from official Curculionidae common name. Snout diagnostic is not on the 2027 list.",
    verificationStatus: "needs-review",
    imageRequired: true,
    imageBrief:
      "Dorsal or three-quarter view of an adult weevil with a clear rostrum (snout) and clubbed/elbowed antennae arising from the snout. Not a round ladybug, not a scarab, not a smooth darkling beetle without a snout.",
  }),
  ento({
    id: "ento-q10",
    topicId: "visual-id",
    difficulty: 3,
    prompt:
      "[IMAGE REQUIRED: tiny six-legged arthropod with a forked jumping organ under the abdomen, no wings.] Using the 2027 list, what is the best identification?",
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
      "Generated mixed-class ID. Furcula diagnostic is not on the 2027 list; photo must show it if used.",
    verificationStatus: "needs-review",
    imageRequired: true,
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
    hint: "Use the official common name “backswimmers” as a clue.",
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
      "[IMAGE REQUIRED: two aquatic beetles — one with threadlike antennae and flattened hind legs, one with short clubbed antennae often hidden and palps that look like extra antennae.] Which pairing matches the 2027 list?",
    choiceTexts: [
      "Threadlike antennae = Hydrophilidae; clubbed hidden antennae = Dytiscidae",
      "Both are Lampyridae because they glow underwater",
      "Threadlike antennae and hunting hind-leg kickers = Dytiscidae; clubbed antennae = Hydrophilidae",
      "Both must be Curculionidae because they live in water",
    ],
    correctChoiceId: "c",
    hint: "Match each beetle to its official 2027 family common name. Antenna characters are not printed on the list.",
    explanation:
      "Dytiscidae is printed as predaceous diving beetles; Hydrophilidae is printed as water scavenger. Threadlike vs clubbed antennae and palps are not official-list facts. Lampyridae is fireflies; Curculionidae is weevils.",
    taxonomyTags: ["Dytiscidae", "Hydrophilidae", "Coleoptera"],
    cognitiveDemand: "distinction",
    sourceType: "generated",
    sourceNote:
      "Standard aquatic-beetle split. Some hydrophilids are predatory; wording uses typical antenna characters. Flagged for review.",
    verificationStatus: "needs-review",
    imageRequired: true,
    imageBrief:
      "Side-by-side adults: (1) dytiscid with visible filiform antennae and oar-like hind legs; (2) hydrophilid with short clubbed antennae and prominent palps, often a convex underside. Labels optional; diagnostics must be visible.",
  }),
  ento({
    id: "ento-q13",
    topicId: "comparison",
    difficulty: 3,
    prompt:
      "[IMAGE REQUIRED: a long-legged fly that looks like a giant mosquito, next to a true mosquito.] Which listed families are being compared, and which one has piercing mouthparts used to take blood in many species?",
    choiceTexts: [
      "Tipulidae (crane flies) have the piercing mouthparts; Culicidae do not bite.",
      "Both are Bombyliidae (bee flies).",
      "Culicidae (mosquitoes) include many blood-feeding species; Tipulidae (crane flies) do not have a mosquito-like piercing proboscis.",
      "Both are Calliphoridae (blow flies).",
    ],
    correctChoiceId: "c",
    hint: "Crane flies are often mistaken for mosquitoes but are a different listed family.",
    explanation:
      "Tipulidae are crane flies; Culicidae are mosquitoes. Adult crane flies do not have the scaled wings and piercing proboscis of mosquitoes. Bee flies and blow flies are other listed Diptera families with different shapes.",
    taxonomyTags: ["Tipulidae", "Culicidae", "Diptera"],
    cognitiveDemand: "distinction",
    sourceType: "generated",
    sourceNote:
      "Generated comparison. Blood-feeding applies to many but not all mosquitoes; adult crane flies are not blood-feeders. Review photo pair.",
    verificationStatus: "needs-review",
    imageRequired: true,
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
    hint: "Ticks (Ixodidae) are built differently; think of a bee or a beetle.",
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
    hint: "Think of armor that is also a skeleton on the outside.",
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
    hint: "Walking legs attach on the middle body region, not on the head or abdomen.",
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
      "[IMAGE REQUIRED: labeled insect rear end.] Cerci, when present, are paired appendages located where?",
    choiceTexts: [
      "On the antennae",
      "On the tarsi of the front legs",
      "At the end of the abdomen",
      "Inside the compound eyes",
    ],
    correctChoiceId: "c",
    hint: "Use the labeled diagram. Do not pick antennae or eyes.",
    explanation:
      "Cerci arise at the posterior end of the abdomen. They are not parts of the antennae, tarsi, or eyes.",
    taxonomyTags: ["Insecta"],
    cognitiveDemand: "recognition",
    sourceType: "generated",
    sourceNote:
      "Cerci location is sample-adjacent (Sample Test 1 had a cerci item). Not an official structure checklist. Diagram required.",
    verificationStatus: "needs-review",
    imageRequired: true,
    imageBrief:
      "Simple side or dorsal diagram of an insect with the abdomen tip highlighted, showing a pair of cerci. Do not label antennae as cerci. Optional: a dipluran for contrast, clearly not required for the correct choice.",
  }),
  ento({
    id: "ento-q18",
    topicId: "dichotomous-keys",
    difficulty: 3,
    prompt:
      "Use this simple key for listed taxa.\n\n1a. Aquatic true bug (Hemiptera) that swims at the surface … go to 2\n1b. Not an aquatic true bug … not keyed here\n2a. Typically swims with the back downward (on its back) … Notonectidae\n2b. Typically swims with the back upward … Corixidae\n\nA listed water bug is observed swimming on its back. What is the keyed identification?",
    choiceTexts: [
      "Corixidae",
      "Notonectidae",
      "Dytiscidae",
      "The key cannot finish because beetles are Hemiptera",
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
      "Use this key for listed Orthoptera families.\n\n1a. Official common name short-horned grasshoppers … Acrididae\n1b. Official common name not short-horned grasshoppers … go to 2\n2a. Official common name katydids … Tettigoniidae\n2b. Official common names crickets/tree crickets … Gryllidae\n\nA listed orthopteran is printed as short-horned grasshoppers. What does the key give?",
    choiceTexts: [
      "Tettigoniidae",
      "Gryllidae",
      "Acrididae",
      "Membracidae",
    ],
    correctChoiceId: "c",
    hint: "Start at couplet 1 using the official common-name string, not a look-alike Hemiptera family.",
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
      "You must write the first couplet of a simple key for these listed taxa only: Dytiscidae, Hydrophilidae, Acrididae, and Gryllidae. Which first split is most useful?",
    choiceTexts: [
      "Printed names mention diving or water versus printed names are grasshoppers or crickets",
      "Has six legs vs has eight legs",
      "Can glow vs cannot glow",
      "Is a tick vs is an insect",
    ],
    correctChoiceId: "a",
    hint: "Look at the official common names: two mention diving or water; two are grasshoppers or crickets.",
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
    hint: "Caddisflies are often grouped with other aquatic insect orders on study lists.",
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
    hint: "Adult mayflies stay near the water where they emerged.",
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
    hint: "Butterflies and moths have a resting pupal/chrysalis stage; true bugs and grasshoppers do not.",
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
      "[IMAGE REQUIRED: aquatic beetle hind legs flattened like oars.] What is the name of this leg adaptation, and which listed family commonly shows it?",
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
      "Natatorial/fossorial/raptorial terms are sample-adjacent. Not on TAXON_LIST_2027.md.",
    verificationStatus: "needs-review",
    imageRequired: true,
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
      "Why are mosquitoes (Culicidae) an important public-health family on the 2027 list?",
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
    hint: "Do not pick mushrooms, honey, or moth cocoons.",
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
      "Mayflies (Ephemeroptera) and stoneflies (Plecoptera) often need cool, well-oxygenated freshwater as immatures. If a stream becomes warmer and holds less oxygen, what is the most reasonable 2027-scope concern?",
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
      "The 2027 ESO list prints Family Scutelleridae with which official common names?",
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
      "On the 2027 ESO list, “Stink bugs” is the official common name for which family?",
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
    topicId: "taxonomy",
    difficulty: 2,
    prompt:
      "A specimen is correctly identified as family Cicadidae (cicadas). Which order must it belong to on the 2027 list?",
    choiceTexts: [
      "Hemiptera",
      "Coleoptera",
      "Diptera",
      "Thysanoptera",
    ],
    correctChoiceId: "a",
    hint: "Find the parent order printed above Cicadidae on the 2027 list.",
    explanation:
      "Cicadidae is a family of Order Hemiptera. Coleoptera holds beetle families; Diptera holds fly families; Thysanoptera is the order for thrips and has no families listed. Recording the parent order is part of list identification.",
    taxonomyTags: ["Cicadidae", "Hemiptera"],
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote: "TAXON_LIST_2027.md Hemiptera → Cicadidae.",
    verificationStatus: "verified",
  }),
  ento({
    id: "ento-q34",
    topicId: "taxonomy",
    difficulty: 1,
    prompt:
      "What official common name does the 2027 ESO list give for Order Megaloptera?",
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
    topicId: "taxonomy",
    difficulty: 2,
    prompt:
      "Family Buprestidae (metallic wood-boring/jewel beetles) belongs to which order on the 2027 list?",
    choiceTexts: [
      "Hemiptera",
      "Coleoptera",
      "Diptera",
      "Lepidoptera",
    ],
    correctChoiceId: "b",
    hint: "Find the parent order printed above Buprestidae on the 2027 list.",
    explanation:
      "Buprestidae is a beetle family under Coleoptera (printed as beetles). Hemiptera is printed as true bugs; Diptera as true flies; Lepidoptera as moths and butterflies. The parent order comes from the list hierarchy.",
    taxonomyTags: ["Buprestidae", "Coleoptera"],
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote: "TAXON_LIST_2027.md Coleoptera → Buprestidae.",
    verificationStatus: "verified",
  }),
  ento({
    id: "ento-q36",
    topicId: "taxonomy",
    difficulty: 1,
    prompt:
      "Which official common name does the 2027 list print for Family Zopheridae?",
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
    topicId: "taxonomy",
    difficulty: 1,
    prompt:
      "Order Mantodea appears on the 2027 list as which official common name?",
    choiceTexts: [
      "silverfish, firebrats",
      "cockroaches/termites",
      "crickets/tree crickets",
      "mantids",
    ],
    correctChoiceId: "d",
    hint: "Do not confuse this order with Blattodea or with cricket families.",
    explanation:
      "Mantodea is printed as mantids. Silverfish and firebrats are Zygentoma; cockroaches/termites are Blattodea; crickets/tree crickets are Gryllidae in Orthoptera. The official string is what the list uses.",
    taxonomyTags: ["Mantodea"],
    cognitiveDemand: "recall",
    sourceType: "rules-derived",
    sourceNote: "TAXON_LIST_2027.md Order Mantodea common names.",
    verificationStatus: "verified",
  }),
  ento({
    id: "ento-q39",
    topicId: "taxonomy",
    difficulty: 2,
    prompt:
      "Siphonaptera is printed on the 2027 list as fleas. How is it grouped?",
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
    topicId: "taxonomy",
    difficulty: 3,
    prompt:
      "Bee flies and bees are both on the 2027 list. Which pairing matches the official names and orders?",
    choiceTexts: [
      "Bee flies = Apidae in Hymenoptera; bees = Bombyliidae in Diptera",
      "Bee flies = Bombyliidae in Diptera; bees = Apidae in Hymenoptera",
      "Both official names belong to families in Hymenoptera",
      "Both official names belong to families in Diptera",
    ],
    correctChoiceId: "b",
    hint: "Match each official common name to its family and parent order. Similar everyday words can sit in different orders.",
    explanation:
      "Bombyliidae is printed as bee flies under Diptera. Apidae is printed as bees under Hymenoptera. Swapping those families or putting both in one order mixes two list entries that only sound similar.",
    taxonomyTags: ["Bombyliidae", "Apidae", "Diptera", "Hymenoptera"],
    cognitiveDemand: "distinction",
    sourceType: "rules-derived",
    sourceNote:
      "TAXON_LIST_2027.md Bombyliidae (bee flies) vs Apidae (bees) and their parent orders.",
    verificationStatus: "verified",
  }),
  ento({
    id: "ento-q41",
    topicId: "taxonomy",
    difficulty: 1,
    prompt:
      "Family Vespidae is printed on the 2027 list as which official common names?",
    choiceTexts: [
      "ants",
      "bees",
      "paper wasps, hornets, yellowjackets",
      "gall wasps",
    ],
    correctChoiceId: "c",
    hint: "All four choices are Hymenoptera common names on this list; match this family exactly.",
    explanation:
      "Vespidae is printed as paper wasps, hornets, yellowjackets. Ants are Formicidae; bees are Apidae; gall wasps are Cynipidae. Recording the full official string keeps four hymenopteran families from collapsing into “wasp.”",
    taxonomyTags: ["Vespidae", "Hymenoptera"],
    cognitiveDemand: "recall",
    sourceType: "rules-derived",
    sourceNote: "TAXON_LIST_2027.md Family Vespidae common names.",
    verificationStatus: "verified",
  }),
  ento({
    id: "ento-q42",
    topicId: "taxonomy",
    difficulty: 2,
    prompt:
      "Giant Silkworm moths are the official common name for Family Saturniidae. Which order contains that family?",
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
      "On the 2027 list, how do Collembola and Diplura differ in rank?",
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
    topicId: "taxonomy",
    difficulty: 2,
    prompt:
      "Family Membracidae (treehoppers) belongs to which listed order?",
    choiceTexts: [
      "Orthoptera",
      "Hemiptera",
      "Coleoptera",
      "Thysanoptera",
    ],
    correctChoiceId: "b",
    hint: "Find the parent order printed above Membracidae on the 2027 list.",
    explanation:
      "Membracidae is a family of Hemiptera (true bugs). Orthoptera is printed as grasshoppers & crickets; Coleoptera as beetles; Thysanoptera as thrips with no families listed. Parent order comes from the hierarchy.",
    taxonomyTags: ["Membracidae", "Hemiptera"],
    cognitiveDemand: "application",
    sourceType: "rules-derived",
    sourceNote: "TAXON_LIST_2027.md Hemiptera → Membracidae.",
    verificationStatus: "verified",
  }),
  ento({
    id: "ento-q45",
    topicId: "dichotomous-keys",
    difficulty: 3,
    prompt:
      "Use this simple key for listed taxa.\n\n1a. Listed under Non-Insect Arthropods … Ixodidae\n1b. Listed in Class Insecta … go to 2\n2a. Official common name bees … Apidae\n2b. Official common name ants … Formicidae\n\nA specimen is a hardback tick on the 2027 list. What is the keyed identification?",
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
      "Use this simple key for listed taxa.\n\n1a. Family in Hemiptera … go to 2\n1b. Family in Coleoptera … not keyed here\n2a. Official common name cicadas … Cicadidae\n2b. Official common name metallic shield bugs … Scutelleridae\n\nA listed hemipteran family is printed as metallic shield bugs. What does the key give?",
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
      "Use this simple key for listed orders.\n\n1a. Official common name thrips … Thysanoptera\n1b. Not thrips … go to 2\n2a. Official common name dobsonflies … Megaloptera\n2b. Official common name caddisflies … Trichoptera\n\nA listed order’s official common name is dobsonflies. What is the keyed identification?",
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
      "Use this simple key for listed families.\n\n1a. Family in Diptera … go to 2\n1b. Family in Hymenoptera … not keyed here\n2a. Official common name mosquitoes … Culicidae\n2b. Official common names fruit flies, husk fly … Tephritidae\n\nA listed fly family is printed as fruit flies, husk fly. What does the key give?",
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
      "You must write the first couplet of a simple key for these listed taxa only: Collembola, Blattodea, and Ixodidae. Which first split is most useful?",
    choiceTexts: [
      "Lives in water versus lives on land",
      "Listed in Class Entognatha versus Class Insecta versus Non-Insect Arthropods",
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
      "Use this simple key for listed beetle families.\n\n1a. Family in Coleoptera … go to 2\n1b. Family in Diptera … not keyed here\n2a. Official common names metallic wood-boring/jewel beetles … Buprestidae\n2b. Official common name diabolical ironclad Beetles … Zopheridae\n\nA listed beetle family is printed as metallic wood-boring/jewel beetles. What does the key give?",
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
      "Dragon/damselflies are listed as Order Odonata. According to this bank’s life-cycle teaching, do they have a pupal stage?",
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
      "Students collect immatures from a freshwater pond. The listed order they want has the official common name caddisflies. Which order is that?",
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
      "Which listed family is this bank’s example of insects that make a familiar night chirp by rubbing body parts together (stridulation)?",
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
      "Family Cynipidae is printed as gall wasps. That official common name points to a listed relationship with which of the following?",
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
      "Which listed family is this bank’s public-health example of insects of which some species can transmit pathogens?",
    choiceTexts: [
      "Apidae",
      "Scarabaeidae",
      "Saturniidae",
      "Culicidae",
    ],
    correctChoiceId: "d",
    hint: "Eliminate bees, dung beetles, and Giant Silkworm moths using their official common names.",
    explanation:
      "The existing public-health item treats Culicidae (mosquitoes) as a family in which some species can transmit pathogens. Apidae are bees (food/pollination in this bank). Scarabaeidae are dung beetles. Saturniidae are Giant Silkworm moths. This stem does not name a specific disease.",
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
  return {
    id: question.id,
    eventId: question.eventId,
    topicId: question.topicId,
    prompt: question.prompt.replace(IMAGE_REQUIRED_PREFIX, "").trim(),
    choices: question.choices,
    correctChoiceId: question.correctChoiceId,
    explanation: question.explanation,
    hint: question.hint,
    difficulty: question.difficulty,
    imageRequired: question.imageRequired,
    verificationStatus: question.verificationStatus,
  };
}
