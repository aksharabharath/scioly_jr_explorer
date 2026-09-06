import {
  EventNotebookCallout,
  EventStrongestTopic,
} from "@/components/EventHomeNotes";
import { EventIcon } from "@/components/EventIcon";
import { EventPracticeProgress } from "@/components/EventPracticeProgress";
import { EventTrickyTopics } from "@/components/EventTrickyTopics";
import { ExplorerTrail } from "@/components/ExplorerTrail";
import { getCurrentUser } from "@/lib/auth/session";
import {
  eventHomeCallout,
  recentMissCountForTopic,
  strongestTopicsForEventHome,
  trickyTopicsForEventHome,
} from "@/lib/event-home-notes";
import { completedSessionCountForEvent } from "@/lib/expeditions";
import { fieldSiteSubtitle, fieldSiteTint } from "@/lib/field-sites";
import { toLearningAttempts } from "@/lib/learning/adaptive";
import { getAllQuestions, getEventPageData } from "@/lib/mock/curriculum";
import { isStudentCatalogEventId } from "@/lib/mock/events";
import {
  getMyGamification,
  getMyPracticeAttempts,
  getMyRecentPracticeAttempts,
  latestInProgressPracticeSessionForEvent,
} from "@/lib/practice-attempts";
import { calculateEventProgress } from "@/lib/progress";
import { hasEventRules } from "@/lib/event-rules";
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

  const { event, overview, topics, hasPractice } = data;
  const user = await getCurrentUser();
  const [attempts, recentAttempts, questions, gamification] = await Promise.all([
    getMyPracticeAttempts(),
    getMyRecentPracticeAttempts(),
    getAllQuestions(),
    getMyGamification(),
  ]);
  const eventQuestions = questions.filter(
    (question) => question.eventId === event.id,
  );
  const eventProgress = calculateEventProgress(
    event.id,
    attempts,
    questions,
    topics.length,
  );
  const questionsAnswered = eventProgress.uniqueQuestions;
  const topicsExplored = eventProgress.topicsPracticed;
  const expeditionsCompleted = completedSessionCountForEvent(
    event.id,
    attempts,
    questions,
  );
  const hasInProgressExpedition =
    latestInProgressPracticeSessionForEvent(
    event.id,
    attempts,
    questions,
  ) !== null;
  const topicNames = new Map(topics.map((topic) => [topic.id, topic.name]));
  const learningHistory = toLearningAttempts(recentAttempts, eventQuestions);
  const trickyTopics =
    user && hasPractice
      ? trickyTopicsForEventHome(learningHistory).flatMap((topicId) => {
          const name = topicNames.get(topicId);
          if (!name) {
            return [];
          }
          return [
            {
              id: topicId,
              name,
              recentMisses: recentMissCountForTopic(learningHistory, topicId),
            },
          ];
        })
      : [];
  const strongestTopicNames =
    user && hasPractice
      ? strongestTopicsForEventHome(learningHistory).flatMap((topicId) => {
          const name = topicNames.get(topicId);
          return name ? [name] : [];
        })
      : [];
  const callout = eventHomeCallout({
    eventName: event.name,
    streakDays: gamification.streakDays,
    expeditionsCompleted,
    questionsAnswered,
  });
  const site = fieldSiteSubtitle(event.id);
  const tint = fieldSiteTint(event.id);
  const rulesHref = hasEventRules(event.id)
    ? `/events/${event.id}/rules`
    : null;

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
              {overview}
            </p>
            {rulesHref ? (
              <p className="mt-3">
                <Link
                  href={rulesHref}
                  className="text-sm font-medium text-teal underline-offset-4 hover:underline"
                >
                  Event Rules & Overview
                </Link>
              </p>
            ) : null}
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
              <div className="grid gap-3 lg:grid-cols-2 lg:items-stretch">
                <EventPracticeProgress
                  questionsAnswered={questionsAnswered}
                  topicsExplored={topicsExplored}
                  expeditionsCompleted={expeditionsCompleted}
                />
                <EventNotebookCallout title={callout.title} body={callout.body} />
              </div>

              <div className="grid gap-3 lg:grid-cols-2 lg:items-stretch">
                <EventStrongestTopic topicNames={strongestTopicNames} />
                <EventTrickyTopics topics={trickyTopics} />
              </div>

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
                  {trickyTopics.length > 0 ? (
                    <Link
                      href={`/events/${event.id}/practice?mode=weak`}
                      className="inline-flex min-h-11 justify-center rounded-full border border-stone-200 px-5 py-2.5 text-sm font-semibold text-ink hover:bg-parchment"
                    >
                      Revisit tricky topics
                    </Link>
                  ) : (
                    <Link
                      href={`/events/${event.id}/practice`}
                      className="inline-flex min-h-11 justify-center rounded-full border border-stone-200 px-5 py-2.5 text-sm font-semibold text-ink hover:bg-parchment"
                    >
                      Keep exploring
                    </Link>
                  )}
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
