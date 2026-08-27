/**
 * Crime Busters 2027 MVP — topics and overview.
 *
 * Question text lives in crime-busters-questions.ts.
 * The catalog event is unlocked and uses the shared practice route.
 */
import { CRIME_BUSTERS_EVENT_ID } from "@/lib/mock/crime-busters-questions";
import type { Topic } from "@/lib/types";

export const MOCK_CRIME_BUSTERS_OVERVIEW =
  "Use printed 2027 lists and sourced forensic and chemistry facts. Image identification is not in this MVP.";

export const MOCK_CRIME_BUSTERS_TOPICS: Topic[] = [
  {
    id: "fingerprints",
    eventId: CRIME_BUSTERS_EVENT_ID,
    name: "Fingerprint analysis",
    shortDescription: "Official pattern names and sourced pattern, minutiae, and skin facts.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "hair-fiber",
    eventId: CRIME_BUSTERS_EVENT_ID,
    name: "Hair and fiber",
    shortDescription: "Official hair and fiber names plus general human-versus-animal hair facts.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "soil",
    eventId: CRIME_BUSTERS_EVENT_ID,
    name: "Soil analysis",
    shortDescription: "Official soil-type names and qualitative properties from inspected sources.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "chemical",
    eventId: CRIME_BUSTERS_EVENT_ID,
    name: "Chemical analysis",
    shortDescription: "Named powders and liquids, sourced formulas, and two sourced tests.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "safety",
    eventId: CRIME_BUSTERS_EVENT_ID,
    name: "Lab safety",
    shortDescription: "Printed 2027 safety notes for test chemicals.",
    topicMastery: "learning",
    progressPercent: 0,
  },
];
