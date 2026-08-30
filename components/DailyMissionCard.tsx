"use client";

import { hasCompletedExpeditionOnLocalDate } from "@/lib/expeditions";
import { useLocalCalendarDate } from "@/components/useLocalCalendarDate";
import type { ExpeditionAttempt } from "@/lib/expeditions";

type DailyMissionCardProps = {
  attempts: ExpeditionAttempt[];
};

export function DailyMissionCard({ attempts }: DailyMissionCardProps) {
  const practiceDate = useLocalCalendarDate();
  const complete =
    practiceDate != null &&
    hasCompletedExpeditionOnLocalDate(attempts, practiceDate);

  return (
    <section
      aria-labelledby="daily-mission-heading"
      className="rounded-3xl border border-gold/40 bg-gold/15 p-5 sm:p-6"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
        Today
      </p>
      <h2
        id="daily-mission-heading"
        className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink"
      >
        Daily mission
      </h2>
      <p className="mt-2 text-sm text-stone-600">
        Complete 1 expedition. Any playable event counts. Missing a day does
        not take XP away.
      </p>
      <p className="mt-4 font-display text-xl font-semibold tabular-nums text-ink">
        {practiceDate == null ? "—" : complete ? "1 / 1" : "0 / 1"}
      </p>
      <p className="mt-1 text-sm font-medium text-ink">
        {practiceDate == null
          ? "Checking today's mission…"
          : complete
            ? "Expedition complete for today."
            : "Finish a 10-question set."}
      </p>
    </section>
  );
}
