import { EventHubLearning } from "@/components/EventHubLearning";
import { EventHubTopicCatalog } from "@/components/EventHubTopicCatalog";
import { EventHubTrickyTopics } from "@/components/EventHubTrickyTopics";
import { EventIcon } from "@/components/EventIcon";
import { ExplorerTrail } from "@/components/ExplorerTrail";
import {
  learningTopicsForEventHub,
  trickyTopicsForEventHub,
} from "@/lib/base-camp";
import {
  completedSessionCountForEvent,
  uniqueQuestionsPracticed,
} from "@/lib/expeditions";
import { fieldSiteSubtitle, fieldSiteTint } from "@/lib/field-sites";
import {
  toLearningAttempts,
  topicLearningState,
} from "@/lib/learning/adaptive";
import { hasEventRules } from "@/lib/event-rules";
import {
  getAllQuestions,
  getEventPageData,
  isLivePracticeQuestion,
} from "@/lib/mock/curriculum";
import { isStudentCatalogEventId } from "@/lib/mock/events";
import {
  getMyPracticeAttempts,
  getMyRecentPracticeAttempts,
} from "@/lib/practice-attempts";
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
  const [attempts, recentAttempts, questions] = await Promise.all([
    getMyPracticeAttempts(),
    getMyRecentPracticeAttempts(),
    getAllQuestions(),
  ]);
  const eventQuestions = questions.filter(
    (question) => question.eventId === event.id,
  );
  const liveBankSize = eventQuestions.filter(isLivePracticeQuestion).length;
  const uniqueQuestions = uniqueQuestionsPracticed(
    event.id,
    attempts,
    questions,
  );
  const expeditionsCompleted = completedSessionCountForEvent(
    event.id,
    attempts,
    questions,
  );
  const practicedHere = uniqueQuestions > 0 || expeditionsCompleted > 0;
  const history = toLearningAttempts(recentAttempts, eventQuestions);
  const learning = learningTopicsForEventHub(history, topics, event);
  const trickyTopics = trickyTopicsForEventHub(history, topics, event);
  const trickyIds = new Set(trickyTopics.map((topic) => topic.topicId));
  const catalogItems = topics.map((topic) => ({
    topic,
    state: topicLearningState(history, topic.id),
    isTricky: trickyIds.has(topic.id),
  }));
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
            { href: "/camp", label: "Base camp" },
            { label: event.name },
          ]}
        />

        <div className={`mt-4 rounded-3xl journal-panel p-4 sm:p-5 ${tint.wash}`}>
          <div className="flex items-start gap-3">
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${tint.wrap} ${tint.icon}`}
            >
              <EventIcon id={event.icon} className="h-6 w-6" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <p className="text-sm font-semibold text-teal">Field site</p>
                {rulesHref ? (
                  <Link
                    href={rulesHref}
                    aria-label="Open Event Rules & Overview"
                    className="rounded-full border border-stone-300/90 bg-surface/80 px-2.5 py-0.5 text-xs font-semibold text-ink hover:bg-parchment"
                  >
                    Field site
                  </Link>
                ) : null}
              </div>
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

        {rulesHref ? (
          <Link
            href={rulesHref}
            className="journal-panel mt-4 block rounded-3xl p-4 outline-offset-4 transition hover:-translate-y-0.5 sm:p-5"
          >
            <h2 className="font-display text-lg font-semibold tracking-tight text-ink">
              Event Rules & Overview
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-stone-600">
              Read the official 2027 rules and event information.
            </p>
            <p className="mt-2 text-sm font-semibold text-teal">Open Event Rules</p>
          </Link>
        ) : null}

        {!event.unlocked ? (
          <div className="journal-panel mt-5 rounded-3xl p-4 sm:p-5">
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
              Coming later
            </h2>
            <p className="mt-2 text-sm text-stone-600">
              This event is not open for practice yet.
            </p>
          </div>
        ) : !hasPractice ? (
          <div className="journal-panel mt-5 rounded-3xl p-4 sm:p-5">
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
              This site is on your list
            </h2>
            <p className="mt-2 text-sm text-stone-600">
              Expeditions for {event.name} will be here soon.
            </p>
          </div>
        ) : (
          <div className="mt-5 flex flex-col gap-8">
            <section
              aria-labelledby="expedition-heading"
              className="journal-panel rounded-3xl p-4 sm:p-5"
            >
              <h2
                id="expedition-heading"
                className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl"
              >
                Ready for an expedition?
              </h2>
              <p className="mt-1 text-sm text-stone-600">
                A regular expedition is 10 adaptive questions. Hints are there
                if you need them.
              </p>
              <Link
                href={`/events/${event.id}/practice`}
                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-teal-dark px-5 py-2.5 text-sm font-semibold text-parchment hover:bg-teal"
              >
                {practicedHere
                  ? "Start another expedition"
                  : "Start expedition"}
              </Link>
            </section>

            <EventHubLearning
              needsPractice={learning.needsPractice}
              improving={learning.improving}
              strong={learning.strong}
            />

            <EventHubTrickyTopics
              eventId={event.id}
              topics={trickyTopics}
            />

            <section aria-labelledby="event-progress-heading">
              <h2
                id="event-progress-heading"
                className="font-display text-lg font-semibold tracking-tight text-ink"
              >
                Practice progress
              </h2>
              <p className="mt-2 text-sm text-ink">
                {uniqueQuestions} of {liveBankSize} questions explored
                {" · "}
                {expeditionsCompleted === 1
                  ? "1 expedition completed"
                  : `${expeditionsCompleted} expeditions completed`}
              </p>
              <p className="mt-1 text-sm text-stone-500">
                Practice progress, not a mastery grade.
              </p>
            </section>

            <EventHubTopicCatalog
              eventId={event.id}
              items={catalogItems}
            />
          </div>
        )}
      </div>
    </main>
  );
}
