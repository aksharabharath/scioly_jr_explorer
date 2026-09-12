import type { GlossaryEntry } from "@/lib/types";

/**
 * Water Quality glossary. Only terms actually annotated on approved questions.
 */
export const WATER_QUALITY_GLOSSARY: GlossaryEntry[] = [
  {
    id: "macroinvertebrate",
    term: "macroinvertebrate",
    definition:
      "A water animal without a backbone that is big enough to see without a microscope.",
    example: "A mayfly nymph in a stream.",
  },
  {
    id: "turbidity",
    term: "turbidity",
    definition: "How cloudy or murky water looks.",
  },
  {
    id: "dissolved-oxygen",
    term: "dissolved oxygen",
    definition:
      "Oxygen that is mixed into the water and available to water animals.",
  },
];

export const WATER_QUALITY_GLOSSARY_BY_ID = new Map(
  WATER_QUALITY_GLOSSARY.map((entry) => [entry.id, entry]),
);
