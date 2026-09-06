import type { GlossaryEntry } from "@/lib/types";

/**
 * Ecology pilot glossary. Only terms actually annotated on pilot questions.
 */
export const ECOLOGY_GLOSSARY: GlossaryEntry[] = [
  {
    id: "temperate",
    term: "temperate",
    definition:
      "A place or climate that is usually not extremely hot or extremely cold.",
    example: "Many places in the middle of North America have a temperate climate.",
  },
  {
    id: "biome",
    term: "biome",
    definition: "A large area with similar weather, plants, and animals.",
  },
  {
    id: "niche",
    term: "niches",
    definition:
      "The ways living things use a habitat, such as what they eat and where they live.",
  },
  {
    id: "density-dependent",
    term: "density-dependent",
    definition:
      "A limit whose effect changes with how crowded a population is.",
  },
  {
    id: "phenotype",
    term: "phenotypes",
    definition: "The traits you can observe in a living thing.",
  },
  {
    id: "precipitation",
    term: "precipitation",
    definition: "Water that falls from the sky, such as rain or snow.",
  },
];

export const ECOLOGY_GLOSSARY_BY_ID = new Map(
  ECOLOGY_GLOSSARY.map((entry) => [entry.id, entry]),
);
