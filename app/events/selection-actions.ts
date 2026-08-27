"use server";

import { setMySelectedEvents } from "@/lib/student-events";
import { redirect } from "next/navigation";

export type SaveEventsState = {
  error?: string;
};

export async function saveSelectedEvents(
  _prev: SaveEventsState,
  formData: FormData,
): Promise<SaveEventsState> {
  const eventIds = formData
    .getAll("eventId")
    .filter((value): value is string => typeof value === "string");

  const result = await setMySelectedEvents(eventIds);

  if (!result.ok) {
    if (result.error === "empty") {
      return {
        error:
          "Please pick Water Quality, Ecology, Entomology, Anatomy & Physiology, or Crime Busters to continue.",
      };
    }
    if (result.error === "invalid") {
      return { error: "Please choose from the events on this list." };
    }
    if (result.error === "unauthenticated") {
      return { error: "Please log in to save your events." };
    }
    return {
      error: "Your events could not be saved. Try again in a moment.",
    };
  }

  redirect("/");
}
