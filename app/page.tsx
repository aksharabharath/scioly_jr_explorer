import { DailyMissionCard } from "@/components/DailyMissionCard";
import { EventCard } from "@/components/EventCard";
import { ExplorerProgress } from "@/components/ExplorerProgress";
import { OverallProgressCard } from "@/components/OverallProgressCard";
import { RecentAchievements } from "@/components/RecentAchievements";
import { displayNameFromUser, requireUser } from "@/lib/auth/session";
import {
  completedSessionCountForEvent,
  uniqueQuestionsPracticed,
} from "@/lib/expeditions";
import { fieldSiteSubtitle, mostRecentPracticedEventId } from "@/lib/field-sites";
import { explorerProfileFromGamification } from "@/lib/gamification";
import { getAllQuestions } from "@/lib/mock/curriculum";
import { getDashboardData } from "@/lib/mock/explorer";
import { isPlayablePracticeEvent } from "@/lib/mock/events";
import {
  getMyGamification,
  getMyPracticeAttempts,
} from "@/lib/practice-attempts";
import { calculateOverallProgress } from "@/lib/progress";
import {
  requireEventSelection,
  resolveSelectedEvents,
} from "@/lib/student-events";
import { dailyPracticeGoalFromUser } from "@/lib/student-preferences";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await requireUser();
  const selectedEventIds = await requireEventSelection();
  const [{ events }, attempts, questions, gamification] = await Promise.all([
    getDashboardData(),
    getMyPracticeAttempts(),
    getAllQuestions(),
    getMyGamification(),
  ]);
  const explorerWithIdentity = explorerProfileFromGamification(
    displayNameFromUser(user),
    gamification,
  );
  const practiceProgress = calculateOverallProgress(attempts, questions);
  const selectedEvents = resolveSelectedEvents(events, selectedEventIds);
  const continueEventId = mostRecentPracticedEventId(attempts, questions);
  const continueEvent = selectedEvents.find(
    (event) =>
      event.id === continueEventId && isPlayablePracticeEvent(event),
  );

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-screen-xl flex-1 px-4 py-5 sm:px-6 sm:py-6">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold text-teal">Base camp</p>
          <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Welcome back, {explorerWithIdentity.displayName}.
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-stone-600 sm:text-base">
            Ready for today&apos;s expedition? Your field sites are waiting.
          </p>
        </header>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <DailyMissionCard
            attempts={attempts}
            dailyPracticeGoal={dailyPracticeGoalFromUser(user)}
          />
          <ExplorerProgress explorer={explorerWithIdentity} />
        </div>

        {continueEvent ? (
          <section
            aria-labelledby="continue-heading"
            className="journal-panel mt-5 rounded-2xl p-4 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-5"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
                Continue
              </p>
              <h2
                id="continue-heading"
                className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink"
              >
                {continueEvent.name}
              </h2>
              <p className="mt-1 text-sm text-stone-600">
                {fieldSiteSubtitle(continueEvent.id)
                  ? `${fieldSiteSubtitle(continueEvent.id)}. You've explored this site before.`
                  : "You've explored this site before."}
              </p>
            </div>
            <Link
              href={`/events/${continueEvent.id}/practice`}
              className="mt-4 inline-flex rounded-full bg-teal-dark px-5 py-2.5 text-sm font-semibold text-parchment hover:bg-teal sm:mt-0"
            >
              Continue expedition
            </Link>
          </section>
        ) : null}

        <section aria-labelledby="events-heading" className="mt-6">
          <h2
            id="events-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink"
          >
            Your field sites
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Visit a site to read your notes. Expeditions start from the site
            hub, not from this card.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(17rem,1fr))]">
            {selectedEvents.map((event) => {
              const unique = uniqueQuestionsPracticed(
                event.id,
                attempts,
                questions,
              );
              const expeditions = completedSessionCountForEvent(
                event.id,
                attempts,
                questions,
              );
              const progressLine = isPlayablePracticeEvent(event)
                ? unique > 0 || expeditions > 0
                  ? `${unique} questions explored · ${expeditions} expeditions`
                  : "Not explored yet"
                : undefined;
              return (
                <EventCard
                  key={event.id}
                  event={event}
                  href={`/events/${event.id}`}
                  progressLine={progressLine}
                />
              );
            })}
          </div>
        </section>

        <div className="mt-6">
          <OverallProgressCard progress={practiceProgress} />
        </div>

        <div className="mt-6">
          <RecentAchievements
            attempts={attempts}
            questions={questions}
            streakDays={gamification.streakDays}
            dailyPracticeGoal={dailyPracticeGoalFromUser(user)}
          />
        </div>
      </div>
    </main>
  );
}
