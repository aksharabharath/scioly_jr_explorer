/**
 * MOCK DATA — Science Olympiad events
 *
 * Temporary in-memory catalog so we can build the UI without a database.
 * Replace the body of `getEvents()` with a Supabase query later.
 *
 * Astronomy is not in the 2027 catalog. It remains a reachable extra event
 * for development and checks. Students never see it in selection or Your Events.
 *
 * MVP selectable events: Water Quality, Ecology, Entomology, Anatomy &
 * Physiology, and Crime Busters. Other catalog events stay Coming later.
 */
import type { ScienceEvent } from "@/lib/types";

export const MOCK_EVENTS: ScienceEvent[] = [
  {
    id: "water-quality",
    name: "Water Quality",
    shortDescription: "Learn about water, habitats, and healthy streams.",
    icon: "water",
    accent: "sky",
    kind: "quiz",
    eventLevel: 1,
    topicMastery: "learning",
    progressPercent: 0,
    unlocked: true,
  },
  {
    id: "ecology",
    name: "Ecology",
    shortDescription: "See how plants and animals share a home.",
    icon: "leaf",
    accent: "emerald",
    kind: "quiz",
    eventLevel: 1,
    topicMastery: "learning",
    progressPercent: 0,
    unlocked: true,
  },
  {
    id: "entomology",
    name: "Entomology",
    shortDescription: "Identify insects and other listed bugs.",
    icon: "bug",
    accent: "amber",
    kind: "quiz",
    eventLevel: 1,
    topicMastery: "learning",
    progressPercent: 0,
    unlocked: true,
  },
  {
    id: "anatomy-physiology",
    name: "Anatomy & Physiology",
    shortDescription: "Learn how body systems work together.",
    icon: "body",
    accent: "rose",
    kind: "quiz",
    eventLevel: 1,
    topicMastery: "learning",
    progressPercent: 0,
    unlocked: true,
  },
  {
    id: "codebusters",
    name: "Codebusters",
    shortDescription: "Crack ciphers and decode secret messages.",
    icon: "cipher",
    accent: "violet",
    kind: "quiz",
    eventLevel: 1,
    topicMastery: "learning",
    progressPercent: 0,
    unlocked: false,
    unlockHint: "Coming later",
  },
  {
    id: "crime-busters",
    name: "Crime Busters",
    shortDescription: "Use science clues to figure out what happened.",
    icon: "search",
    accent: "indigo",
    kind: "quiz",
    eventLevel: 1,
    topicMastery: "learning",
    progressPercent: 0,
    unlocked: true,
  },
  {
    id: "engineering-cad",
    name: "Engineering CAD",
    shortDescription: "Design and draw engineered objects.",
    icon: "gear",
    accent: "violet",
    kind: "build",
    eventLevel: 1,
    topicMastery: "learning",
    progressPercent: 0,
    unlocked: false,
    unlockHint: "Coming later",
  },
  {
    id: "hovercraft",
    name: "Hovercraft",
    shortDescription: "Build and test a vehicle that rides on air.",
    icon: "hover",
    accent: "sky",
    kind: "build",
    eventLevel: 1,
    topicMastery: "learning",
    progressPercent: 0,
    unlocked: false,
    unlockHint: "Coming later",
  },
  {
    id: "rubber-band-catapult",
    name: "Rubber Band Catapult",
    shortDescription: "Build a catapult and learn how stored energy launches.",
    icon: "catapult",
    accent: "amber",
    kind: "build",
    eventLevel: 1,
    topicMastery: "learning",
    progressPercent: 0,
    unlocked: false,
    unlockHint: "Coming later",
  },
];

/** Reachable for development/tests. Not shown in student event selection. */
export const EXTRA_EVENTS: ScienceEvent[] = [
  {
    id: "astronomy",
    name: "Astronomy",
    shortDescription: "Look up! Planets, stars, and our place in the solar system.",
    icon: "star",
    accent: "indigo",
    kind: "quiz",
    eventLevel: 1,
    topicMastery: "learning",
    progressPercent: 18,
    unlocked: true,
  },
];

const KNOWN_EVENTS: ScienceEvent[] = [...MOCK_EVENTS, ...EXTRA_EVENTS];

export function getKnownEvent(eventId: string): ScienceEvent | undefined {
  return KNOWN_EVENTS.find((event) => event.id === eventId);
}

export async function getEvents(): Promise<ScienceEvent[]> {
  return MOCK_EVENTS;
}

export function getEventById(
  events: ScienceEvent[],
  id: string,
): ScienceEvent | undefined {
  return events.find((event) => event.id === id);
}

export async function getEvent(
  eventId: string,
): Promise<ScienceEvent | undefined> {
  return getKnownEvent(eventId);
}

/** All 2027 catalog IDs, including locked future events. */
export function getCatalogEventIds(): string[] {
  return MOCK_EVENTS.map((event) => event.id);
}

/** IDs students may save to student_events. Locked events are excluded. */
export function getSelectableEventIds(): string[] {
  return MOCK_EVENTS.filter((event) => event.unlocked).map((event) => event.id);
}

/** True for the 2027 catalog, including locked future events. Not Astronomy. */
export function isStudentCatalogEventId(eventId: string): boolean {
  return MOCK_EVENTS.some((event) => event.id === eventId);
}

export const BUILD_EVENT_IDS = MOCK_EVENTS.filter(
  (event) => event.kind === "build",
).map((event) => event.id);

export const QUIZ_EVENT_IDS = MOCK_EVENTS.filter(
  (event) => event.kind === "quiz",
).map((event) => event.id);

export const AVAILABLE_EVENT_IDS = getSelectableEventIds();

/**
 * Event ids that may be unlocked for live practice.
 */
export const EVENTS_WITH_QUESTION_BANKS = [
  "astronomy",
  "entomology",
  "anatomy-physiology",
  "water-quality",
  "ecology",
  "crime-busters",
] as const;

export type EventStatusLabel = "Practice" | "Coming later";

/**
 * True when a student can open a live quiz for this event.
 * Uses the registered-bank list so this file does not import curriculum.
 */
export function isPlayablePracticeEvent(event: ScienceEvent): boolean {
  return (
    event.unlocked === true &&
    event.kind === "quiz" &&
    (EVENTS_WITH_QUESTION_BANKS as readonly string[]).includes(event.id)
  );
}

export function eventStatusLabel(event: ScienceEvent): EventStatusLabel {
  if (!isPlayablePracticeEvent(event)) {
    return "Coming later";
  }
  return "Practice";
}

export function eventDashboardCta(event: ScienceEvent): string {
  return isPlayablePracticeEvent(event) ? "Visit this site →" : "Coming later";
}

export function isSelectableEvent(event: ScienceEvent): boolean {
  return event.unlocked === true;
}
