import type { GlossaryEntry } from "@/lib/types";
import { ANATOMY_PHYSIOLOGY_GLOSSARY } from "@/lib/mock/glossary/anatomy-physiology";
import { CRIME_BUSTERS_GLOSSARY } from "@/lib/mock/glossary/crime-busters";
import { ECOLOGY_GLOSSARY } from "@/lib/mock/glossary/ecology";
import { WATER_QUALITY_GLOSSARY } from "@/lib/mock/glossary/water-quality";

/** Resolve the authored glossary for a practice event. Unknown events have none. */
export function glossaryForEvent(eventId: string): GlossaryEntry[] {
  switch (eventId) {
    case "ecology":
      return ECOLOGY_GLOSSARY;
    case "water-quality":
      return WATER_QUALITY_GLOSSARY;
    case "anatomy-physiology":
      return ANATOMY_PHYSIOLOGY_GLOSSARY;
    case "crime-busters":
      return CRIME_BUSTERS_GLOSSARY;
    default:
      return [];
  }
}
