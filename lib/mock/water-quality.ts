/**
 * Water Quality 2027 MVP — topics and overview.
 *
 * Question text lives in water-quality-questions.ts.
 */
import { WATER_QUALITY_EVENT_ID } from "@/lib/mock/water-quality-questions";
import type { Topic } from "@/lib/types";

export const MOCK_WATER_QUALITY_OVERVIEW =
  "Learn about water, habitats, and what helps a stream stay healthy.";

export const MOCK_WATER_QUALITY_TOPICS: Topic[] = [
  {
    id: "indicator-classes",
    eventId: WATER_QUALITY_EVENT_ID,
    name: "Indicator classes",
    shortDescription: "Official 2027 class titles and how listed names are grouped.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "macroinvertebrates",
    eventId: WATER_QUALITY_EVENT_ID,
    name: "Listed macroinvertebrates",
    shortDescription: "Common names on the adult macroinvertebrate table.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "nuisance-species",
    eventId: WATER_QUALITY_EVENT_ID,
    name: "Aquatic nuisance lists",
    shortDescription: "Official nuisance plant and animal name strings.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "water-monitoring",
    eventId: WATER_QUALITY_EVENT_ID,
    name: "Water monitoring",
    shortDescription: "Named parameters and sourced qualitative water-quality facts.",
    topicMastery: "learning",
    progressPercent: 0,
  },
];
