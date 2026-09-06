import { BaseCampExplorerProgress } from "@/components/BaseCampExplorerProgress";
import { BaseCampLearning } from "@/components/BaseCampLearning";
import { BaseCampNextExpedition } from "@/components/BaseCampNextExpedition";
import { BaseCampTrickyTopics } from "@/components/BaseCampTrickyTopics";
import { EventCard } from "@/components/EventCard";
import { displayNameFromUser, requireUser } from "@/lib/auth/session";
import { getEarnedBadgeIds } from "@/lib/badges";
import {
  choosePrimaryExpedition,
  learningTopicsForBaseCamp,
  trickyTopicsForBaseCamp,
} from "@/lib/base-camp";
import { uniqueLiveQuestionsPracticed } from "@/lib/expeditions";
import { mostRecentPracticedEventId } from "@/lib/field-sites";
import { explorerProfileFromGamification } from "@/lib/gamification";
import { toLearningAttempts } from "@/lib/learning/adaptive";
import {
  getAllQuestions,
  getTopicsForEvent,
} from "@/lib/mock/curriculum";
import { getDashboardData } from "@/lib/mock/explorer";
import {
  getMyGamification,
  getMyPracticeAttempts,
  getMyRecentPracticeAttempts,
} from "@/lib/practice-attempts";
import {
  requireEventSelection,
  resolveSelectedEvents,
} from "@/lib/student-events";
import { dailyPracticeGoalFromUser } from "@/lib/student-preferences";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base camp · Jr. Explorer",
};

export const dynamic = "force-dynamic";

export default async function CampPage() {
  const user = await requireUser();
  const selectedEventIds = await requireEventSelection();
  const [{ events }, attempts, recentAttempts, questions, gamification] =
    await Promise.all([
      getDashboardData(),
      getMyPracticeAttempts(),
      getMyRecentPracticeAttempts(),
      getAllQuestions(),
      getMyGamification(),
    ]);
  const explorerWithIdentity = explorerProfileFromGamification(
    displayNameFromUser(user),
    gamification,
  );
  const selectedEvents = resolveSelectedEvents(events, selectedEventIds);
  const topicLists = await Promise.all(
    selectedEvents.map((event) => getTopicsForEvent(event.id)),
  );
  const topics = topicLists.flat();
  const learningHistory = toLearningAttempts(recentAttempts, questions);
  const learning = learningTopicsForBaseCamp(
    learningHistory,
    topics,
    selectedEvents,
  );
  const trickyTopics = trickyTopicsForBaseCamp(
    learningHistory,
    topics,
    selectedEvents,
  );
  const primary = choosePrimaryExpedition(
    selectedEvents,
    mostRecentPracticedEventId(attempts, questions),
  );
  const uniqueQuestions = uniqueLiveQuestionsPracticed(attempts, questions);
  const badgeCount = getEarnedBadgeIds({
    attempts,
    questions,
    streakDays: gamification.streakDays,
  }).length;
  const dailyPracticeGoal = dailyPracticeGoalFromUser(user);

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-[72rem] flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold text-teal">Base camp</p>
          <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Welcome back, {explorerWithIdentity.displayName}.
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-stone-600 sm:text-base">
            Ready for your next expedition?
          </p>
        </header>

        <div className="mt-6">
          <BaseCampNextExpedition primary={primary} />
        </div>

        <div className="mt-8">
          <BaseCampLearning
            needsPractice={learning.needsPractice}
            improving={learning.improving}
            strong={learning.strong}
          />
        </div>

        <div className="mt-8">
          <BaseCampTrickyTopics topics={trickyTopics} />
        </div>

        <section aria-labelledby="events-heading" className="mt-8">
          <h2
            id="events-heading"
            className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl"
          >
            Your field sites
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Visit a site to see this field site.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {selectedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                href={`/events/${event.id}`}
                cta="Explore →"
              />
            ))}
          </div>
        </section>

        <div className="mt-10">
          <BaseCampExplorerProgress
            explorer={explorerWithIdentity}
            uniqueQuestions={uniqueQuestions}
            badgeCount={badgeCount}
            attempts={attempts}
            dailyPracticeGoal={dailyPracticeGoal}
          />
        </div>
      </div>
    </main>
  );
}
