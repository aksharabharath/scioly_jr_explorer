import type { GlossaryEntry } from "@/lib/types";

/**
 * Anatomy & Physiology glossary. Only terms actually annotated on approved questions.
 */
export const ANATOMY_PHYSIOLOGY_GLOSSARY: GlossaryEntry[] = [
  {
    id: "keratin",
    term: "keratin",
    definition: "A tough protein found in skin, hair, and nails.",
  },
  {
    id: "epidermal-strata",
    term: "epidermal strata",
    definition: "The stacked layers of the outer skin.",
  },
  {
    id: "thermoregulation",
    term: "thermoregulation",
    definition: "Keeping the body's temperature in a safe range.",
  },
  {
    id: "dermis",
    term: "dermis",
    definition: "The thicker inner layer of skin under the outer surface.",
  },
  {
    id: "spongy-bone",
    term: "spongy bone",
    definition: "Bone with many small spaces inside, not the solid outer shell.",
  },
  {
    id: "salter-harris",
    term: "Salter-Harris",
    definition: "A system for naming some breaks in a child's growing bone.",
  },
  {
    id: "homeostasis",
    term: "homeostasis",
    definition:
      "Keeping conditions inside the body steady and in a healthy range.",
  },
  {
    id: "neuromuscular-junction",
    term: "neuromuscular junction",
    definition: "The meeting place where a nerve cell signals a muscle fiber.",
  },
  {
    id: "involuntary",
    term: "involuntary",
    definition: "Happening without you choosing to move it.",
  },
];

export const ANATOMY_PHYSIOLOGY_GLOSSARY_BY_ID = new Map(
  ANATOMY_PHYSIOLOGY_GLOSSARY.map((entry) => [entry.id, entry]),
);
