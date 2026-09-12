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
  {
    id: "perpendicular",
    term: "perpendicular",
    definition: "Crossing at a right angle; straight across, not along.",
    example: "The two lines in a plus sign are perpendicular.",
  },
  {
    id: "ecosystem-services",
    term: "ecosystem-service",
    definition:
      "Benefits people get from nature, such as food, clean water, and other things nature provides.",
    example: "A forest can provide clean water and materials people use.",
  },
  {
    id: "proximate",
    term: "proximate",
    definition: "The most direct or immediate causes of something.",
  },
  {
    id: "biodiversity",
    term: "biodiversity",
    definition: "The variety of living things in a place or on Earth.",
  },
  {
    id: "greenhouse-gases",
    term: "greenhouse gases",
    definition: "Gases in the air that trap heat and help warm Earth.",
  },
  {
    id: "hydropower",
    term: "hydropower",
    definition: "Electricity made using moving water.",
    example: "A dam can use moving water to generate electricity.",
  },
  {
    id: "iucn-red-list",
    term: "IUCN Red List",
    definition:
      "A worldwide list that shows how much risk different species face.",
  },
];

export const ECOLOGY_GLOSSARY_BY_ID = new Map(
  ECOLOGY_GLOSSARY.map((entry) => [entry.id, entry]),
);
