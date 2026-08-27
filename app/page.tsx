import { BadgeShelf } from "@/components/BadgeShelf";
import { EventCard } from "@/components/EventCard";
import { ExplorerProgress } from "@/components/ExplorerProgress";
import { OverallProgressCard } from "@/components/OverallProgressCard";
import { PracticeCheckInCall } from "@/components/PracticeCheckInCall";
import { displayNameFromUser, requireUser } from "@/lib/auth/session";
import { getEarnedBadgeIds } from "@/lib/badges";
import { explorerProfileFromGamification } from "@/lib/gamification";
import { getAllQuestions } from "@/lib/mock/curriculum";
import { getDashboardData } from "@/lib/mock/explorer";
import { practicedTodayUtc } from "@/lib/practice-check-in";
import {
  getMyGamification,
  getMyPracticeAttempts,
} from "@/lib/practice-attempts";
import { calculateOverallProgress } from "@/lib/progress";
import {
  requireEventSelection,
  resolveSelectedEvents,
} from "@/lib/student-events";
import { getVapiCustomerNumber } from "@/lib/vapi/env";

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
  const earnedBadgeIds = getEarnedBadgeIds({
    attempts,
    questions,
  });

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold text-teal">Hi there</p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Ready to practice, {explorerWithIdentity.displayName}?
          </h1>
          <p className="mt-3 text-base leading-relaxed text-stone-600 sm:text-lg">
            Water Quality, Ecology, Entomology, Anatomy & Physiology, and Crime
            Busters are ready to practice. Other events are coming later.
          </p>
        </header>

        <div className="mt-8">
          <ExplorerProgress explorer={explorerWithIdentity} />
        </div>

        <section aria-labelledby="events-heading" className="mt-8">
          <h2
            id="events-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink"
          >
            Your Events
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Water Quality, Ecology, Entomology, Anatomy & Physiology, and Crime
            Busters are ready to practice.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {selectedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                href={`/events/${event.id}`}
              />
            ))}
          </div>
        </section>

        <div className="mt-8">
          <PracticeCheckInCall
            practicedToday={practicedTodayUtc(attempts)}
            defaultPhone={getVapiCustomerNumber() ?? ""}
          />
        </div>

        <div className="mt-8">
          <OverallProgressCard progress={practiceProgress} />
        </div>

        <div className="mt-8">
          <BadgeShelf earnedIds={earnedBadgeIds} />
        </div>
      </div>
    </main>
  );
}
