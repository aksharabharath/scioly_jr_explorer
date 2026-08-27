/**
 * Entomology curriculum seed — topics and overview for the event page.
 *
 * Question text lives in entomology-questions.ts. Practice selection uses the
 * generic Question shape via entomologyQuestionToPracticeQuestion().
 */
import { ENTOMOLOGY_EVENT_ID } from "@/lib/mock/entomology-questions";
import type { Topic } from "@/lib/types";

export const MOCK_ENTOMOLOGY_OVERVIEW =
  "Identify listed insects and related arthropods, then connect what you see to anatomy, life cycles, and ecology.";

export const MOCK_ENTOMOLOGY_TOPICS: Topic[] = [
  {
    id: "taxonomy",
    eventId: ENTOMOLOGY_EVENT_ID,
    name: "Taxonomy",
    shortDescription: "Match orders, families, and official common names on the 2027 list.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "visual-id",
    eventId: ENTOMOLOGY_EVENT_ID,
    name: "Visual identification",
    shortDescription: "Use traits you can see to identify a specimen.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "comparison",
    eventId: ENTOMOLOGY_EVENT_ID,
    name: "Comparisons",
    shortDescription: "Tell listed look-alikes apart.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "dichotomous-keys",
    eventId: ENTOMOLOGY_EVENT_ID,
    name: "Dichotomous keys",
    shortDescription: "Follow and write simple either/or identification keys.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "external-anatomy",
    eventId: ENTOMOLOGY_EVENT_ID,
    name: "External anatomy",
    shortDescription: "Body regions, mouthparts, legs, and other outside structures.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "internal-anatomy",
    eventId: ENTOMOLOGY_EVENT_ID,
    name: "Internal anatomy",
    shortDescription: "A light look at structures inside the body.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "life-cycles",
    eventId: ENTOMOLOGY_EVENT_ID,
    name: "Life cycles",
    shortDescription: "Complete and incomplete metamorphosis.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "ecology-habitat",
    eventId: ENTOMOLOGY_EVENT_ID,
    name: "Ecology and habitat",
    shortDescription: "Where listed taxa live and how they use that habitat.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "behavior-adaptations",
    eventId: ENTOMOLOGY_EVENT_ID,
    name: "Behavior and adaptations",
    shortDescription: "Feeding, movement, and other listed behaviors.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "interactions",
    eventId: ENTOMOLOGY_EVENT_ID,
    name: "Interactions",
    shortDescription: "How listed taxa relate to plants and other animals.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "human-impact",
    eventId: ENTOMOLOGY_EVENT_ID,
    name: "Human impact",
    shortDescription: "Helpful, harmful, and health-related roles.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "climate",
    eventId: ENTOMOLOGY_EVENT_ID,
    name: "Climate",
    shortDescription: "How climate change can affect listed taxa and habitats.",
    topicMastery: "learning",
    progressPercent: 0,
  },
];
