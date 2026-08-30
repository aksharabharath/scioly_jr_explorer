"use client";

import { localCalendarDate } from "@/lib/gamification";
import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

function clientDate() {
  return localCalendarDate();
}

function serverDate(): string | null {
  return null;
}

/** Local calendar date after mount so SSR and the browser TZ do not clash. */
export function useLocalCalendarDate(): string | null {
  return useSyncExternalStore(subscribe, clientDate, serverDate);
}
