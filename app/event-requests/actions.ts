"use server";

import { getCurrentUser } from "@/lib/auth/session";
import { EXTRA_EVENTS, MOCK_EVENTS } from "@/lib/mock/events";
import { createClient } from "@/lib/supabase/server";

export type EventRequestState = {
  status: "idle" | "success" | "error";
  message?: string;
};

function normalizeEventName(value: string): string {
  return value.trim().replace(/\s+/g, " ").toLocaleLowerCase();
}

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitEventRequest(
  _previousState: EventRequestState,
  formData: FormData,
): Promise<EventRequestState> {
  const eventName = readString(formData, "eventName");
  const message = readString(formData, "message");

  if (!eventName) {
    return {
      status: "error",
      message: "Please enter the event you would like to request.",
    };
  }

  const normalizedEventName = normalizeEventName(eventName);
  const eventAlreadyExists = [...MOCK_EVENTS, ...EXTRA_EVENTS].some(
    (event) => normalizeEventName(event.name) === normalizedEventName,
  );

  if (eventAlreadyExists) {
    return {
      status: "error",
      message: "This event is already available in Jr. Explorer!",
    };
  }

  const user = await getCurrentUser();
  if (!user) {
    return {
      status: "error",
      message: "Please log in before requesting an event.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("event_requests").insert({
    user_id: user.id,
    event_name: eventName,
    message: message || null,
  });

  if (error) {
    if (error.code === "23505") {
      return {
        status: "error",
        message: "You've already requested this event!",
      };
    }

    return {
      status: "error",
      message: "We couldn't submit your request. Please try again.",
    };
  }

  return {
    status: "success",
    message:
      "Request submitted! Thanks for letting us know — we'll review your request.",
  };
}
