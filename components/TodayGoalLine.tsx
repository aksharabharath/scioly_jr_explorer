"use client";

import { questionsPracticedOnLocalDate } from "@/lib/expeditions";
import { useLocalCalendarDate } from "@/components/useLocalCalendarDate";
import type { ExpeditionAttempt } from "@/lib/expeditions";
import type { DailyPracticeGoal } from "@/lib/student-preferences";

type TodayGoalLineProps = {
  attempts: ExpeditionAttempt[];
  dailyPracticeGoal: DailyPracticeGoal;
};

export function TodayGoalLine({
  attempts,
  dailyPracticeGoal,
}: TodayGoalLineProps) {
  const practiceDate = useLocalCalendarDate();
  const practiced =
    practiceDate == null
      ? null
      : questionsPracticedOnLocalDate(attempts, practiceDate);
  const shown =
    practiced == null ? null : Math.min(practiced, dailyPracticeGoal);

  return (
    <p className="text-sm text-stone-600">
      Today:{" "}
      <span className="font-medium tabular-nums text-ink">
        {shown == null ? "—" : `${shown} / ${dailyPracticeGoal}`} questions
      </span>
    </p>
  );
}
