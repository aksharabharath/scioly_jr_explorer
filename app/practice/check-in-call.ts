"use server";

import { displayNameFromUser, getCurrentUser } from "@/lib/auth/session";
import { practicedTodayUtc } from "@/lib/practice-check-in";
import {
  getMyGamification,
  getMyPracticeAttempts,
} from "@/lib/practice-attempts";
import { getMySelectedEventIds, resolveSelectedEvents } from "@/lib/student-events";
import { getEvents } from "@/lib/mock/events";
import { buildPracticeCoachAssistant } from "@/lib/vapi/assistant";
import {
  createOutboundCall,
  getOrCreateVapiPhoneNumberId,
  VapiMissingFromNumberError,
  VapiRequestError,
} from "@/lib/vapi/client";
import { getVapiApiKey, getVapiPhoneNumberId } from "@/lib/vapi/env";
import { toE164 } from "@/lib/vapi/phone";

export type CheckInCallState = {
  error?: string;
  message?: string;
};

export async function startPracticeCheckInCall(
  _prev: CheckInCallState,
  formData: FormData,
): Promise<CheckInCallState> {
  const user = await getCurrentUser();
  if (!user) {
    return { error: "Please log in first. Then we can call you." };
  }

  const apiKey = getVapiApiKey();
  if (!apiKey) {
    return {
      error:
        "The phone robot is missing its secret key. Ask a grown-up to add VAPI_API_KEY in .env.local.",
    };
  }

  const customerNumber = toE164(String(formData.get("phone") ?? ""));
  if (!customerNumber) {
    return {
      error: "Please type a real phone number, like 555-123-4567.",
    };
  }

  const [attempts, gamification, selectedIds, events] = await Promise.all([
    getMyPracticeAttempts(),
    getMyGamification(),
    getMySelectedEventIds(),
    getEvents(),
  ]);

  const eventNames = resolveSelectedEvents(events, selectedIds)
    .map((event) => event.name)
    .join(", ");

  const assistant = buildPracticeCoachAssistant({
    studentName: displayNameFromUser(user),
    practicedToday: practicedTodayUtc(attempts),
    eventNames,
    streakDays: gamification.streakDays,
  });

  try {
    const phoneNumberId = await getOrCreateVapiPhoneNumberId(
      apiKey,
      getVapiPhoneNumberId(),
    );
    await createOutboundCall({
      apiKey,
      phoneNumberId,
      customerNumber,
      assistant,
    });
  } catch (cause) {
    if (cause instanceof VapiMissingFromNumberError) {
      return {
        error:
          "The phone robot has no number to call FROM. Ask a grown-up to add a phone number in the Vapi dashboard, then put VAPI_PHONE_NUMBER_ID in .env.local.",
      };
    }
    if (cause instanceof VapiRequestError) {
      if (cause.status === 401) {
        return {
          error:
            "The secret key was not accepted. Ask a grown-up to check VAPI_API_KEY.",
        };
      }
      return {
        error:
          "The phone robot could not start the call. Check the Vapi account, then try again.",
      };
    }
    return { error: "Something went wrong. Please try the call again." };
  }

  return {
    message: "Your phone should ring in a few seconds. Pick up when it does!",
  };
}
