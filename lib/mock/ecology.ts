/**
 * Ecology 2027 MVP — topics and overview.
 *
 * Question text lives in ecology-questions.ts.
 * The catalog event is unlocked and uses the shared practice route.
 */
import { ECOLOGY_EVENT_ID } from "@/lib/mock/ecology-questions";
import type { Topic } from "@/lib/types";

export const MOCK_ECOLOGY_OVERVIEW =
  "Learn how living things interact with each other and with their environment.";

export const MOCK_ECOLOGY_TOPICS: Topic[] = [
  {
    id: "organization-and-energy",
    eventId: ECOLOGY_EVENT_ID,
    name: "Organization and energy",
    shortDescription: "Ecological levels, food webs, pyramids, and nutrient cycling.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "communities-and-succession",
    eventId: ECOLOGY_EVENT_ID,
    name: "Communities and succession",
    shortDescription: "Succession, competition, and symbiotic relationships.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "populations-and-evolution",
    eventId: ECOLOGY_EVENT_ID,
    name: "Populations and evolution",
    shortDescription: "Growth, limiting factors, selection, and speciation.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "terrestrial-ecosystems",
    eventId: ECOLOGY_EVENT_ID,
    name: "Terrestrial ecosystems",
    shortDescription: "Climate, deserts, grasslands, biodiversity, and services.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "human-impact",
    eventId: ECOLOGY_EVENT_ID,
    name: "Human impact",
    shortDescription: "Climate, invasives, pollution, energy, and conservation status.",
    topicMastery: "learning",
    progressPercent: 0,
  },
];
