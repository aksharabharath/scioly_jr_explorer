import { EventIcon } from "@/components/EventIcon";
import { EventProgressDashboard } from "@/components/EventProgressDashboard";
import { ExplorerTrail } from "@/components/ExplorerTrail";
import {
  completedSessionCountForEvent,
  expeditionLogEntries,
} from "@/lib/expeditions";
import { fieldSiteSubtitle, fieldSiteTint } from "@/lib/field-sites";
import { localCalendarDate } from "@/lib/gamification";
import { getAllQuestions, getEventPageData } from "@/lib/mock/curriculum";
import { isStudentCatalogEventId } from "@/lib/mock/events";
import {
  getMyGamification,
  getMyPracticeAttempts,
  latestInProgressPracticeSessionForEvent,
} from "@/lib/practice-attempts";
import { calculateEventProgress } from "@/lib/progress";
import { requireSelectedEvent } from "@/lib/student-events";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type EventRouteProps = {
  params: Promise<{ eventId: string }>;
};

export async function generateMetadata({
  params,
}: EventRouteProps): Promise<Metadata> {
  const { eventId } = await params;
  if (!isStudentCatalogEventId(eventId)) {
    notFound();
  }
  const data = await getEventPageData(eventId);
  if (!data) {
    return { title: "Event · Jr. Explorer" };
  }
  return { title: `${data.event.name} · Jr. Explorer` };
}

export default async function EventPage({ params }: EventRouteProps) {
  const { eventId } = await params;
  if (!isStudentCatalogEventId(eventId)) {
    notFound();
  }
  await requireSelectedEvent(eventId);
  const data = await getEventPageData(eventId);

  if (!data) {
    notFound();
  }

  const { event, topics, hasPractice } = data;
  const [attempts, questions, gamification] = await Promise.all([
    getMyPracticeAttempts(),
    getAllQuestions(),
    getMyGamification(),
  ]);
  const eventProgress = calculateEventProgress(
    event.id,
    attempts,
    questions,
    topics.length,
  );
  const questionsAnswered = eventProgress.totalQuestions;
  const expeditionsCompleted = completedSessionCountForEvent(
    event.id,
    attempts,
    questions,
  );
  const expeditionEntries = expeditionLogEntries(
    attempts,
    questions,
    { [event.id]: event.name },
    1000,
  ).filter((entry) => entry.eventId === event.id);
  const activeDays = new Set(
    expeditionEntries
      .map((entry) =>
        entry.endedAt ? localCalendarDate(new Date(entry.endedAt)) : null,
      )
      .filter((date): date is string => date !== null),
  ).size;
  const now = new Date();
  const hasInProgressExpedition =
    latestInProgressPracticeSessionForEvent(
    event.id,
    attempts,
    questions,
  ) !== null;
  const site = fieldSiteSubtitle(event.id);
  const tint = fieldSiteTint(event.id);

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-5 sm:px-6">
        <ExplorerTrail
          crumbs={[
            { href: "/", label: "Base camp" },
            { label: event.name },
          ]}
        />

        <div className="mt-4 flex flex-col gap-3">
          <div className={`rounded-3xl journal-panel p-4 sm:p-5 ${tint.wash}`}>
            <div className="flex items-start gap-3">
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${tint.wrap} ${tint.icon}`}
              >
                <EventIcon id={event.icon} className="h-6 w-6" />
              </span>
              <div>
                <p className="text-sm font-semibold text-teal">Field site</p>
                <h1 className="mt-0.5 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  {event.name}
                </h1>
                {site ? (
                  <p className="mt-1 text-sm font-medium text-stone-600">{site}</p>
                ) : null}
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base">
              {event.shortDescription}
            </p>
          </div>

          {!event.unlocked ? (
            <div className="journal-panel rounded-3xl p-4 sm:p-5">
              <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
                Coming later
              </h2>
              <p className="mt-2 text-sm text-stone-600">
                This event is not open for practice yet.
              </p>
            </div>
          ) : hasPractice ? (
            <>
              <EventProgressDashboard
                eventName={event.name}
                questionsAnswered={questionsAnswered}
                expeditionsCompleted={expeditionsCompleted}
                activeDays={activeDays}
                expeditionEntries={expeditionEntries}
                calendarYear={now.getFullYear()}
                calendarMonth={now.getMonth()}
              />

              <div className="journal-panel rounded-3xl p-3 sm:p-4">
                <h2 className="font-display text-lg font-semibold tracking-tight text-ink">
                  Ready for an expedition?
                </h2>
                <p className="mt-1 text-sm text-stone-600">
                  10 questions. Hints are there if you need them.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    href={`/events/${event.id}/practice`}
                    className="inline-flex min-h-11 justify-center rounded-full bg-teal-dark px-5 py-2.5 text-sm font-semibold text-parchment hover:bg-teal"
                  >
                    {hasInProgressExpedition
                      ? "Continue expedition"
                      : "Start expedition"}
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="journal-panel rounded-3xl p-4 sm:p-5">
              <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
                This site is on your list
              </h2>
              <p className="mt-2 text-sm text-stone-600">
                Expeditions for {event.name} will be here soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
