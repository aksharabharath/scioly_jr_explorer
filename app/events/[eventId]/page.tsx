import { EventPracticeProgress } from "@/components/EventPracticeProgress";
import { getCurrentUser } from "@/lib/auth/session";
import {
  toLearningAttempts,
  topicsNeedingRevisit,
} from "@/lib/learning/adaptive";
import { getAllQuestions, getEventPageData } from "@/lib/mock/curriculum";
import { isStudentCatalogEventId } from "@/lib/mock/events";
import { getMyPracticeAttempts } from "@/lib/practice-attempts";
import { calculateEventProgress } from "@/lib/progress";
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
  const data = await getEventPageData(eventId);

  if (!data) {
    notFound();
  }

  const { event, overview, topics, hasPractice } = data;
  const user = await getCurrentUser();
  const [attempts, questions] = await Promise.all([
    getMyPracticeAttempts(),
    getAllQuestions(),
  ]);
  const eventProgress = calculateEventProgress(
    event.id,
    attempts,
    questions,
    topics.length,
  );
  const eventQuestions = questions.filter(
    (question) => question.eventId === event.id,
  );
  const topicNames = new Map(topics.map((topic) => [topic.id, topic.name]));
  const weakTopicNames =
    user && hasPractice
      ? topicsNeedingRevisit(
          toLearningAttempts(attempts, eventQuestions),
        )
          .map((topicId) => topicNames.get(topicId))
          .filter((name): name is string => Boolean(name))
          .slice(0, 4)
      : [];

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <p className="text-sm">
          <Link
            href="/"
            className="font-medium text-teal underline-offset-4 hover:underline"
          >
            ← Dashboard
          </Link>
        </p>

        <p className="mt-6 text-sm font-semibold text-teal">Your event</p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {event.name}
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-stone-600">
          {overview}
        </p>

        {!event.unlocked ? (
          <div className="mt-8 rounded-3xl border border-stone-200/80 bg-surface p-5 sm:p-6">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              🔒 Coming later
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
            />

            {weakTopicNames.length > 0 ? (
              <section
                aria-labelledby="weak-topics-heading"
                className="mt-6 rounded-3xl border border-stone-200/80 bg-surface p-5 sm:p-6"
              >
                <h2
                  id="weak-topics-heading"
                  className="font-display text-2xl font-semibold tracking-tight text-ink"
                >
                  Worth revisiting
                </h2>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-stone-600">
                  {weakTopicNames.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            <div className="mt-6 rounded-3xl border border-stone-200/80 bg-surface p-5 sm:p-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                Ready to practice?
              </h2>
              <p className="mt-2 text-sm text-stone-600">
                10 questions. Hints are there if you need them.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/events/${event.id}/practice`}
                  className="inline-flex justify-center rounded-full bg-teal-dark px-5 py-2.5 text-sm font-semibold text-parchment hover:bg-teal"
                >
                  Start Practice
                </Link>
                <Link
                  href={`/events/${event.id}/practice?mode=weak`}
                  className="inline-flex justify-center rounded-full border border-stone-200 px-5 py-2.5 text-sm font-semibold text-ink hover:bg-parchment"
                >
                  Practice Tricky Topics
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="mt-8 rounded-3xl border border-stone-200/80 bg-surface p-5 sm:p-6">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              Ready to practice?
            </h2>
            <p className="mt-2 text-sm text-stone-600">
              You can keep {event.name} on your list. Practice questions for
              this event will be here soon.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
