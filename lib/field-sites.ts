/**
 * Presentation-only field-site labels and tints.
 * Does not affect eligibility, live filters, XP, or question banks.
 */

export type FieldSiteTint = {
  wrap: string;
  icon: string;
  wash: string;
  pin: string;
};

export type FieldSite = {
  subtitle: string;
  tint: FieldSiteTint;
};

const OLIVE: FieldSiteTint = {
  wrap: "bg-[#e7eedc]",
  icon: "text-[#3d4f2f]",
  wash: "bg-[#e7eedc]/50",
  pin: "bg-[#3d4f2f]",
};

const SLATE: FieldSiteTint = {
  wrap: "bg-[#e4e9ef]",
  icon: "text-[#3d4a58]",
  wash: "bg-[#e4e9ef]/55",
  pin: "bg-[#3d4a58]",
};

const RIVER: FieldSiteTint = {
  wrap: "bg-[#dcecea]",
  icon: "text-[#1f5c58]",
  wash: "bg-[#dcecea]/55",
  pin: "bg-[#1f5c58]",
};

const FOREST: FieldSiteTint = {
  wrap: "bg-[#dfeadf]",
  icon: "text-[#2f4a38]",
  wash: "bg-[#dfeadf]/55",
  pin: "bg-[#2f4a38]",
};

const TERRACOTTA: FieldSiteTint = {
  wrap: "bg-[#f0e4d8]",
  icon: "text-[#6b4634]",
  wash: "bg-[#f0e4d8]/55",
  pin: "bg-[#6b4634]",
};

const DEFAULT_TINT: FieldSiteTint = {
  wrap: "bg-parchment",
  icon: "text-teal-dark",
  wash: "bg-parchment/40",
  pin: "bg-teal-dark",
};

const SITES: Record<string, FieldSite> = {
  entomology: { subtitle: "Insect field site", tint: OLIVE },
  "crime-busters": { subtitle: "Forensics bench", tint: SLATE },
  "water-quality": { subtitle: "Stream station", tint: RIVER },
  ecology: { subtitle: "Habitat survey", tint: FOREST },
  "anatomy-physiology": { subtitle: "Body systems lab", tint: TERRACOTTA },
};

export function fieldSiteForEvent(eventId: string): FieldSite | null {
  return SITES[eventId] ?? null;
}

export function fieldSiteSubtitle(eventId: string): string | null {
  return SITES[eventId]?.subtitle ?? null;
}

export function fieldSiteTint(eventId: string): FieldSiteTint {
  return SITES[eventId]?.tint ?? DEFAULT_TINT;
}

/** Most recently answered question's event, for a Continue CTA. */
export function mostRecentPracticedEventId(
  attempts: ReadonlyArray<{ questionId: string; answeredAt: string | null }>,
  questions: ReadonlyArray<{ id: string; eventId: string }>,
): string | null {
  const byId = new Map(questions.map((question) => [question.id, question]));
  let latest: { at: string; eventId: string } | null = null;
  for (const attempt of attempts) {
    if (!attempt.answeredAt) {
      continue;
    }
    const eventId = byId.get(attempt.questionId)?.eventId;
    if (!eventId) {
      continue;
    }
    if (!latest || attempt.answeredAt > latest.at) {
      latest = { at: attempt.answeredAt, eventId };
    }
  }
  return latest?.eventId ?? null;
}
