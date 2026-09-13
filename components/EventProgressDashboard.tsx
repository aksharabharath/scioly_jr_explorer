import type { ExpeditionLogEntry } from "@/lib/expeditions";

type EventProgressDashboardProps = {
  eventName: string;
  questionsAnswered: number;
  accuracyPercent: number | null;
  expeditionsCompleted: number;
  activeDays: number;
  expeditionEntries: ExpeditionLogEntry[];
  calendarYear: number;
  calendarMonth: number;
};

export function EventProgressDashboard({
  eventName,
  questionsAnswered,
  accuracyPercent,
  expeditionsCompleted,
  activeDays,
  expeditionEntries,
  calendarYear,
  calendarMonth,
}: EventProgressDashboardProps) {
  const recentEntries = expeditionEntries.slice(0, 10);
  const trendEntries = [...recentEntries].reverse();
  const completedDates = new Set(
    expeditionEntries
      .map((entry) => localDateKey(entry.endedAt))
      .filter((date): date is string => date !== null),
  );

  return (
    <div className="space-y-3">
      <section
        aria-labelledby="event-stats-heading"
        className="journal-panel rounded-3xl p-3 sm:p-4"
      >
        <h2
          id="event-stats-heading"
          className="font-display text-lg font-semibold tracking-tight text-ink"
        >
          Your progress
        </h2>
        <dl className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat label="Expeditions completed" value={expeditionsCompleted} />
          <Stat label="Questions answered" value={questionsAnswered} />
          <Stat
            label="Accuracy"
            value={accuracyPercent == null ? "—" : `${accuracyPercent}%`}
          />
          <Stat label="Active days" value={activeDays} />
        </dl>
      </section>

      <div className="grid gap-3 lg:grid-cols-2">
        <ActivityCalendar
          year={calendarYear}
          month={calendarMonth}
          completedDates={completedDates}
        />
        <AccuracyTrend eventName={eventName} entries={trendEntries} />
      </div>

      <RecentExpeditions
        totalCompleted={expeditionsCompleted}
        entries={recentEntries}
      />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl bg-parchment/80 px-3 py-3">
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">
        {label}
      </dt>
      <dd className="mt-1 font-display text-xl font-semibold tabular-nums text-ink">
        {value}
      </dd>
    </div>
  );
}

function ActivityCalendar({
  year,
  month,
  completedDates,
}: {
  year: number;
  month: number;
  completedDates: Set<string>;
}) {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month, 1));
  const cells = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  return (
    <section
      aria-labelledby="activity-calendar-heading"
      className="journal-panel rounded-3xl p-3 sm:p-4"
    >
      <h2
        id="activity-calendar-heading"
        className="font-display text-lg font-semibold tracking-tight text-ink"
      >
        Expedition days
      </h2>
      <p className="mt-1 text-sm text-stone-600">{monthLabel}</p>
      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <span key={`${day}-${index}`} className="py-1 font-semibold text-stone-500">
            {day}
          </span>
        ))}
        {cells.map((day, index) => {
          const date = day
            ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
            : null;
          const completed = date !== null && completedDates.has(date);
          return (
            <span
              key={date ?? `blank-${index}`}
              className={`flex aspect-square items-center justify-center rounded-lg ${
                completed
                  ? "bg-teal-dark font-semibold text-parchment"
                  : "text-stone-600"
              }`}
              aria-label={
                day
                  ? `${monthLabel} ${day}${completed ? ", expedition completed" : ""}`
                  : undefined
              }
            >
              {day ?? ""}
            </span>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-stone-500">
        Teal days mark a completed expedition.
      </p>
    </section>
  );
}

function AccuracyTrend({
  eventName,
  entries,
}: {
  eventName: string;
  entries: ExpeditionLogEntry[];
}) {
  const width = 320;
  const height = 130;
  const padding = 22;
  const points = entries.map((entry, index) => {
    const accuracy = Math.round(
      (entry.correctAnswers / Math.max(1, entry.questionsAnswered)) * 100,
    );
    const x =
      entries.length === 1
        ? width / 2
        : padding +
          (index * (width - padding * 2)) / (entries.length - 1);
    const y = height - padding - (accuracy / 100) * (height - padding * 2);
    return { x, y, accuracy };
  });

  return (
    <section
      aria-labelledby="accuracy-trend-heading"
      className="journal-panel rounded-3xl p-3 sm:p-4"
    >
      <h2
        id="accuracy-trend-heading"
        className="font-display text-lg font-semibold tracking-tight text-ink"
      >
        Your Accuracy
      </h2>
      <p className="mt-1 text-sm text-stone-600">
        Recent {eventName} Expeditions
      </p>
      {points.length === 0 ? (
        <p className="mt-6 rounded-2xl bg-parchment/80 px-3 py-4 text-sm text-stone-600">
          Complete an Expedition to start your trend.
        </p>
      ) : (
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="Accuracy across recent Expeditions"
          className="mt-3 h-36 w-full"
        >
          <line
            x1={padding}
            x2={padding}
            y1={padding}
            y2={height - padding}
            stroke="currentColor"
            className="text-stone-300"
          />
          <line
            x1={padding}
            x2={width - padding}
            y1={height - padding}
            y2={height - padding}
            stroke="currentColor"
            className="text-stone-300"
          />
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points.map((point) => `${point.x},${point.y}`).join(" ")}
            className="text-teal-dark"
          />
          {points.map((point, index) => (
            <circle
              key={`${point.x}-${point.y}`}
              cx={point.x}
              cy={point.y}
              r="5"
              fill="currentColor"
              className="text-teal-dark"
            >
              <title>
                Expedition {index + 1}: {point.accuracy}% accuracy
              </title>
            </circle>
          ))}
          <text x="2" y={padding + 4} className="fill-stone-500 text-[11px]">
            100%
          </text>
          <text x="7" y={height - padding + 4} className="fill-stone-500 text-[11px]">
            0%
          </text>
        </svg>
      )}
    </section>
  );
}

function RecentExpeditions({
  totalCompleted,
  entries,
}: {
  totalCompleted: number;
  entries: ExpeditionLogEntry[];
}) {
  return (
    <section
      aria-labelledby="recent-expeditions-heading"
      className="journal-panel rounded-3xl p-3 sm:p-4"
    >
      <h2
        id="recent-expeditions-heading"
        className="font-display text-lg font-semibold tracking-tight text-ink"
      >
        Recent Expeditions
      </h2>
      {entries.length === 0 ? (
        <p className="mt-2 text-sm text-stone-600">
          Your completed Expeditions will appear here.
        </p>
      ) : (
        <ul className="mt-2 divide-y divide-stone-200/80">
          {entries.map((entry, index) => {
            const accuracy = Math.round(
              (entry.correctAnswers / Math.max(1, entry.questionsAnswered)) * 100,
            );
            return (
              <li
                key={entry.sessionId}
                className="flex items-center justify-between gap-3 py-2 text-sm"
              >
                <span className="font-medium text-ink">
                  Expedition {totalCompleted - index}
                </span>
                <span className="text-right text-stone-600">
                  {entry.correctAnswers} / {entry.questionsAnswered} · {accuracy}% ·{" "}
                  {formatDate(entry.endedAt)}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

function localDateKey(value: string | null): string | null {
  if (!value) {
    return null;
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDate(value: string | null): string {
  if (!value) {
    return "Date unknown";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Date unknown";
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}
