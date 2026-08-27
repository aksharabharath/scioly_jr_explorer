/**
 * Event Selection v1 — catalog ID rules.
 *
 * Metadata lives in lib/mock/events.ts. Persistence lives in
 * lib/student-events.ts. Keep this file free of Next/Supabase imports so
 * checks can run with tsx.
 */
import type { ScienceEvent } from "@/lib/types";

export type NormalizeSelectionResult =
  | { ok: true; eventIds: string[] }
  | { ok: false; error: "empty" | "invalid" };

export function catalogIdSet(catalogIds: readonly string[]): Set<string> {
  return new Set(catalogIds);
}

export function isCatalogEventId(
  eventId: string,
  catalogIds: readonly string[],
): boolean {
  return catalogIdSet(catalogIds).has(eventId);
}

/** Keep known catalog ids; ignore unknown. Used when reading stored rows. */
export function filterKnownEventIds(
  input: readonly string[],
  catalogIds: readonly string[],
): string[] {
  const allowed = catalogIdSet(catalogIds);
  const seen = new Set<string>();
  for (const raw of input) {
    const eventId = typeof raw === "string" ? raw.trim() : "";
    if (allowed.has(eventId)) {
      seen.add(eventId);
    }
  }
  return catalogIds.filter((id) => seen.has(id));
}

/**
 * Drop blanks, de-dupe, keep catalog order.
 * Reject the whole input if it is empty after that, or if any id is unknown.
 */
export function normalizeEventSelection(
  input: readonly string[],
  catalogIds: readonly string[],
): NormalizeSelectionResult {
  const allowed = catalogIdSet(catalogIds);
  const seen = new Set<string>();

  for (const raw of input) {
    const eventId = typeof raw === "string" ? raw.trim() : "";
    if (!eventId) {
      continue;
    }
    if (!allowed.has(eventId)) {
      return { ok: false, error: "invalid" };
    }
    seen.add(eventId);
  }

  if (seen.size === 0) {
    return { ok: false, error: "empty" };
  }

  const eventIds = catalogIds.filter((id) => seen.has(id));
  return { ok: true, eventIds };
}

export function resolveSelectedEvents(
  catalog: ScienceEvent[],
  selectedIds: readonly string[],
): ScienceEvent[] {
  const selected = new Set(selectedIds);
  return catalog.filter((event) => selected.has(event.id));
}
