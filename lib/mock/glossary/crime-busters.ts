import type { GlossaryEntry } from "@/lib/types";

/**
 * Crime Busters glossary. Only terms actually annotated on approved questions.
 */
export const CRIME_BUSTERS_GLOSSARY: GlossaryEntry[] = [
  {
    id: "recurve",
    term: "recurve",
    definition: "To curve back the other way.",
  },
  {
    id: "delta",
    term: "deltas",
    definition: "A triangle-shaped area in a fingerprint pattern.",
  },
  {
    id: "stratum-basale",
    term: "stratum basale",
    definition: "The deepest living layer of the outer skin.",
  },
  {
    id: "medulla",
    term: "medulla",
    definition: "The innermost core of a hair shaft.",
  },
  {
    id: "cuticle",
    term: "cuticle",
    definition: "The outer scale layer of a hair shaft.",
  },
  {
    id: "alkaline",
    term: "alkaline",
    definition: "The opposite of acidic; a high pH.",
  },
];

export const CRIME_BUSTERS_GLOSSARY_BY_ID = new Map(
  CRIME_BUSTERS_GLOSSARY.map((entry) => [entry.id, entry]),
);
