"use client";

import { ProgressBar } from "@/components/ProgressBar";
import { questionsPracticedOnLocalDate } from "@/lib/expeditions";
import { useLocalCalendarDate } from "@/components/useLocalCalendarDate";
import type { ExpeditionAttempt } from "@/lib/expeditions";
import {
  isDailyMissionComplete,
  type DailyPracticeGoal,
} from "@/lib/student-preferences";

type DailyMissionCardProps = {
  attempts: ExpeditionAttempt[];
  dailyPracticeGoal: DailyPracticeGoal;
};

export function DailyMissionCard({
  attempts,
  dailyPracticeGoal,
}: DailyMissionCardProps) {
  const practiceDate = useLocalCalendarDate();
  const practiced =
    practiceDate == null
      ? 0
      : questionsPracticedOnLocalDate(attempts, practiceDate);
  const complete = isDailyMissionComplete(practiced, dailyPracticeGoal);
  const remaining = Math.max(0, dailyPracticeGoal - practiced);
  const shown = Math.min(practiced, dailyPracticeGoal);
  const percent = (shown / dailyPracticeGoal) * 100;

  return (
    <section
      aria-labelledby="daily-mission-heading"
      className="rounded-3xl border border-gold-dark/25 bg-gold/12 p-4 sm:p-5"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
        Today
      </p>
      <h2
        id="daily-mission-heading"
        className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink"
      >
        Today&apos;s goal
      </h2>
      <p className="mt-2 text-sm text-stone-600">
        Answer {dailyPracticeGoal} questions today. Any playable event counts.
        Missing a day does not take XP away.
      </p>
      <p className="mt-4 font-display text-xl font-semibold tabular-nums text-ink">
        {practiceDate == null ? "—" : `${shown} / ${dailyPracticeGoal}`}
      </p>
      <div className="mt-2">
        <ProgressBar
          value={practiceDate == null ? 0 : percent}
          label="Today's question goal"
          fillClassName="bg-gold-dark"
        />
      </div>
      <p className="mt-2 text-sm font-medium text-ink">
        {practiceDate == null
          ? "Checking today's goal…"
          : complete
            ? "Today's goal is complete. Nice work!"
            : remaining === 1
              ? "1 question to go."
              : `${remaining} questions to go.`}
      </p>
    </section>
  );
}
