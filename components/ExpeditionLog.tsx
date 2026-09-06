"use client";

import { EventIcon } from "@/components/EventIcon";
import { useLocalCalendarDate } from "@/components/useLocalCalendarDate";
import {
  groupExpeditionLogByLocalWeek,
  startOfLocalWeek,
  type ExpeditionLogEntry,
  type WeeklyFieldJournalWeek,
} from "@/lib/expeditions";
import { getKnownEvent } from "@/lib/mock/events";
import Link from "next/link";

type ExpeditionLogProps = {
  entries: ExpeditionLogEntry[];
};

function plural(count: number, singular: string, pluralWord: string): string {
  return `${count} ${count === 1 ? singular : pluralWord}`;
}

function formatWeekOf(weekStart: string): string {
  const [year, month, day] = weekStart.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function EventWeekRows({ week }: { week: WeeklyFieldJournalWeek }) {
  return (
    <ul className="mt-2 space-y-1.5">
      {week.events.map((row) => {
        const icon = getKnownEvent(row.eventId)?.icon ?? "star";
        return (
          <li key={row.eventId}>
            <Link
              href={`/events/${row.eventId}`}
              className="flex items-baseline gap-2 rounded-xl px-1 py-1 outline-offset-4 hover:bg-parchment/70"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-parchment text-teal-dark">
                <EventIcon id={icon} className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-base font-semibold text-ink">
                  {row.eventName}
                </span>
                <span className="text-sm text-stone-600">
                  {plural(row.expeditions, "expedition", "expeditions")}
                  {" · "}
                  {plural(row.questionsAnswered, "question", "questions")}
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function ExpeditionLog({ entries }: ExpeditionLogProps) {
  const today = useLocalCalendarDate();
  const weeks = groupExpeditionLogByLocalWeek(entries);
  const currentWeekStart = today ? startOfLocalWeek(today) : null;
  const currentWeek = currentWeekStart
    ? weeks.find((week) => week.weekStart === currentWeekStart)
    : undefined;
  const olderWeeks = currentWeekStart
    ? weeks.filter((week) => week.weekStart !== currentWeekStart)
    : weeks;

  const thisWeekExpeditions = currentWeek?.expeditionCount ?? 0;
  const thisWeekSites = currentWeek?.fieldSiteCount ?? 0;

  return (
    <section aria-labelledby="expedition-log-heading">
      <h1
        id="expedition-log-heading"
        className="font-display text-2xl font-semibold tracking-tight text-ink"
      >
        EXPEDITION LOG
      </h1>

      <div className="mt-4">
        <h2 className="font-display text-lg font-semibold text-ink">This week</h2>
        <p className="mt-1 text-sm text-stone-600">
          {today
            ? `${plural(thisWeekExpeditions, "expedition", "expeditions")} completed · ${plural(thisWeekSites, "field site", "field sites")} explored`
            : "Loading this week's field notes…"}
        </p>
        {today && currentWeek ? (
          <div className="journal-panel mt-3 rounded-2xl p-3 sm:p-4">
            <EventWeekRows week={currentWeek} />
          </div>
        ) : null}
        {today && !currentWeek && entries.length > 0 ? (
          <p className="mt-3 text-sm text-stone-600">
            No completed expeditions this week yet.
          </p>
        ) : null}
      </div>

      {entries.length === 0 ? (
        <p className="mt-4 text-sm text-stone-600">
          Your field log is empty. Finish an expedition and it will be written
          here.
        </p>
      ) : null}

      {olderWeeks.length > 0 ? (
        <div className="mt-6 space-y-2">
          {olderWeeks.map((week) => (
            <details
              key={week.weekStart}
              className="group rounded-2xl border border-stone-200/80 bg-parchment/30 px-3 py-2 text-stone-600 open:bg-parchment/50"
            >
              <summary className="cursor-pointer list-none font-display text-sm font-semibold text-stone-500 marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="inline-flex items-center gap-2">
                  <span aria-hidden="true" className="text-stone-400 group-open:rotate-90">
                    ▸
                  </span>
                  Week of {formatWeekOf(week.weekStart)}
                </span>
              </summary>
              <ul className="mt-2 space-y-1 pb-1 text-sm">
                {week.events.map((row) => (
                  <li key={row.eventId}>
                    <Link
                      href={`/events/${row.eventId}`}
                      className="rounded-md outline-offset-2 hover:text-ink"
                    >
                      {row.eventName} — {plural(row.expeditions, "expedition", "expeditions")}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      ) : null}
    </section>
  );
}
