/**
 * Student event selections (Supabase).
 *
 * Catalog metadata stays in lib/mock/events.ts.
 * ID rules stay in lib/event-selection.ts.
 *
 * Never writes practice_attempts or gamification tables. Deselecting an event
 * is a preference change, not a history delete.
 */
import { getCurrentUser } from "@/lib/auth/session";
import {
  filterKnownEventIds,
  normalizeEventSelection,
  resolveSelectedEvents,
} from "@/lib/event-selection";
import { getSelectableEventIds } from "@/lib/mock/events";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type EventSelectionError =
  | "empty"
  | "invalid"
  | "unauthenticated"
  | "save_failed";

export type SaveSelectionResult =
  | { ok: true; eventIds: string[] }
  | { ok: false; error: EventSelectionError };

export { resolveSelectedEvents };

export async function getMySelectedEventIds(): Promise<string[]> {
  const user = await getCurrentUser();
  if (!user) {
    return [];
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("student_events")
    .select("event_id")
    .eq("student_id", user.id);

  if (error || !data) {
    return [];
  }

  return filterKnownEventIds(
    data.map((row) => row.event_id as string),
    getSelectableEventIds(),
  );
}

export async function setMySelectedEvents(
  eventIds: readonly string[],
): Promise<SaveSelectionResult> {
  const user = await getCurrentUser();
  if (!user) {
    return { ok: false, error: "unauthenticated" };
  }

  const normalized = normalizeEventSelection(eventIds, getSelectableEventIds());
  if (!normalized.ok) {
    return { ok: false, error: normalized.error };
  }

  const supabase = await createClient();
  const { data: existing, error: readError } = await supabase
    .from("student_events")
    .select("event_id")
    .eq("student_id", user.id);

  if (readError) {
    return { ok: false, error: "save_failed" };
  }

  const current = new Set(
    (existing ?? []).map((row) => row.event_id as string),
  );
  const next = new Set(normalized.eventIds);
  const toInsert = normalized.eventIds.filter((id) => !current.has(id));
  const toDelete = [...current].filter((id) => !next.has(id));

  if (toInsert.length > 0) {
    const { error: insertError } = await supabase.from("student_events").insert(
      toInsert.map((event_id) => ({
        student_id: user.id,
        event_id,
      })),
    );
    if (insertError) {
      return { ok: false, error: "save_failed" };
    }
  }

  if (toDelete.length > 0) {
    const { error: deleteError } = await supabase
      .from("student_events")
      .delete()
      .eq("student_id", user.id)
      .in("event_id", toDelete);
    if (deleteError) {
      return { ok: false, error: "save_failed" };
    }
  }

  revalidatePath("/");
  revalidatePath("/profile/events");
  revalidatePath("/onboarding/events");
  return { ok: true, eventIds: normalized.eventIds };
}

/** Dashboard, event routes, and explorer pages: no selections → onboarding. */
export async function requireEventSelection(): Promise<string[]> {
  const ids = await getMySelectedEventIds();
  if (ids.length === 0) {
    redirect("/onboarding/events");
  }
  return ids;
}

/** Practice and event hubs: only events on the student's list. */
export async function requireSelectedEvent(eventId: string): Promise<string[]> {
  const ids = await requireEventSelection();
  if (!ids.includes(eventId)) {
    redirect("/");
  }
  return ids;
}
