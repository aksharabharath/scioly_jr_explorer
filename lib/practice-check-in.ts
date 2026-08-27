import { utcCalendarDate } from "@/lib/gamification";

/** True when at least one saved answer happened on that calendar day (UTC). */
export function practicedOnDate(
  attempts: { answeredAt: string | null }[],
  date: string,
): boolean {
  return attempts.some(
    (attempt) =>
      typeof attempt.answeredAt === "string" &&
      attempt.answeredAt.slice(0, 10) === date,
  );
}

export function practicedTodayUtc(
  attempts: { answeredAt: string | null }[],
  now: Date = new Date(),
): boolean {
  return practicedOnDate(attempts, utcCalendarDate(now));
}
