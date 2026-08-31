import { EventPracticeProgress } from "@/components/EventPracticeProgress";
import { EventIcon } from "@/components/EventIcon";
import { getCurrentUser } from "@/lib/auth/session";
import {
  completedSessionCountForEvent,
  uniqueQuestionsPracticed,
} from "@/lib/expeditions";
import { fieldSiteSubtitle, fieldSiteTint } from "@/lib/field-sites";
import {
  toLearningAttempts,
  topicsNeedingRevisit,
} from "@/lib/learning/adaptive";
import { getAllQuestions, getEventPageData, isLivePracticeQuestion } from "@/lib/mock/curriculum";
import { isStudentCatalogEventId } from "@/lib/mock/events";
import {
  getMyPracticeAttempts,
  getMyRecentPracticeAttempts,
} from "@/lib/practice-attempts";
import { calculateEventProgress } from "@/lib/progress";
import { requireSelectedEvent } from "@/lib/student-events";
import type { Metadata } from "next";
import { ExplorerTrail } from "@/components/ExplorerTrail";
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
  const [attempts, recentAttempts, questions] = await Promise.all([
    getMyPracticeAttempts(),
    getMyRecentPracticeAttempts(),
    getAllQuestions(),
  ]);
  const eventQuestions = questions.filter(
    (question) => question.eventId === event.id,
  );
  const liveBankSize = eventQuestions.filter(isLivePracticeQuestion).length;
  const eventProgress = {
    ...calculateEventProgress(
      event.id,
      attempts,
      questions,
      topics.length,
    ),
    uniqueQuestions: uniqueQuestionsPracticed(event.id, attempts, questions),
  };
  const topicNames = new Map(topics.map((topic) => [topic.id, topic.name]));
  const weakTopicNames =
    user && hasPractice
      ? topicsNeedingRevisit(
          toLearningAttempts(recentAttempts, eventQuestions),
        )
          .map((topicId) => topicNames.get(topicId))
          .filter((name): name is string => Boolean(name))
          .slice(0, 4)
      : [];
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

        <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-6">
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
          </div>

          <div className="flex flex-col gap-4">
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
                <EventPracticeProgress
                  eventName={event.name}
                  progress={eventProgress}
                  expeditionsCompleted={completedSessionCountForEvent(
                    event.id,
                    attempts,
                    questions,
                  )}
                  liveBankSize={liveBankSize}
                />

                <div className="journal-panel rounded-3xl p-4 sm:p-5">
                  <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
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
                      Start expedition
                    </Link>
                    <Link
                      href={`/events/${event.id}/practice?mode=weak`}
                      className="inline-flex min-h-11 justify-center rounded-full border border-stone-200 px-5 py-2.5 text-sm font-semibold text-ink hover:bg-parchment"
                    >
                      Revisit tricky topics
                    </Link>
                  </div>
                  {weakTopicNames.length > 0 ? (
                    <div className="mt-4 border-t border-stone-200/80 pt-3">
                      <h3
                        id="weak-topics-heading"
                        className="text-sm font-semibold text-ink"
                      >
                        Worth revisiting
                      </h3>
                      <p className="mt-1 text-xs text-stone-600">
                        A miss marks a topic as tricky. Three later correct
                        answers in that topic mark it strong again.
                      </p>
                      <ul className="mt-2 list-disc space-y-0.5 pl-5 text-sm text-stone-600">
                        {weakTopicNames.map((name) => (
                          <li key={name}>{name}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
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
      </div>
    </main>
  );
}
