"use client";

import { useLocalCalendarDate } from "@/components/useLocalCalendarDate";
import { recentAchievements } from "@/lib/recent-achievements";
import type { BadgeProgressAttempt } from "@/lib/badges";
import type { Question } from "@/lib/types";
import Link from "next/link";

type RecentAchievementsProps = {
  attempts: BadgeProgressAttempt[];
  questions: Question[];
  streakDays: number;
};

export function RecentAchievements({
  attempts,
  questions,
  streakDays,
}: RecentAchievementsProps) {
  const practiceDate = useLocalCalendarDate();
  const items =
    practiceDate == null
      ? null
      : recentAchievements({
          attempts,
          questions,
          streakDays,
          practiceDate,
        });

  return (
    <section aria-labelledby="recent-achievements-heading">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h2
          id="recent-achievements-heading"
          className="font-display text-2xl font-semibold tracking-tight text-ink"
        >
          Recent achievements
        </h2>
        <Link
          href="/badges"
          className="text-sm font-semibold text-teal hover:underline"
        >
          All badges
        </Link>
      </div>
      {items == null ? (
        <p className="mt-3 text-sm text-stone-600">Loading achievements…</p>
      ) : items.length === 0 ? (
        <p className="mt-3 text-sm text-stone-600">
          Finish an expedition to see badges, streaks, and today&apos;s mission
          here.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="rounded-2xl border border-stone-200/80 bg-surface px-4 py-3"
            >
              <p className="font-display text-lg font-semibold text-ink">
                {item.title}
              </p>
              <p className="mt-0.5 text-sm text-stone-600">{item.detail}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
