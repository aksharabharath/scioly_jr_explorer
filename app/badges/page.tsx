import { BadgeShelf } from "@/components/BadgeShelf";
import { requireUser } from "@/lib/auth/session";
import {
  getBadgeProgress,
  getEarnedBadgeIds,
  getNewlyEarnedBadges,
} from "@/lib/badges";
import { calculateStreak, localCalendarDate } from "@/lib/gamification";
import { getAllQuestions } from "@/lib/mock/curriculum";
import { getMyGamification, getMyPracticeAttempts } from "@/lib/practice-attempts";
import { requireEventSelection } from "@/lib/student-events";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Badges · Jr. Explorer",
};

export const dynamic = "force-dynamic";

export default async function BadgesPage() {
  const user = await requireUser();
  await requireEventSelection();
  const [attempts, questions, gamification] = await Promise.all([
    getMyPracticeAttempts(),
    getAllQuestions(),
    getMyGamification(),
  ]);
  const badgeInput = {
    attempts,
    questions,
    streakDays: gamification.streakDays,
  };
  const earnedBadgeIds = getEarnedBadgeIds(badgeInput);
  const latestSessionId = attempts.at(-1)?.sessionId;
  const previousAttempts = latestSessionId
    ? attempts.filter((attempt) => attempt.sessionId !== latestSessionId)
    : attempts.slice(0, -1);
  let previousStreakDays = 0;
  let previousPracticeDate: string | null = null;
  for (const attempt of previousAttempts) {
    if (!attempt.answeredAt) {
      continue;
    }
    const answeredAt = new Date(attempt.answeredAt);
    if (Number.isNaN(answeredAt.getTime())) {
      continue;
    }
    const practiceDate = localCalendarDate(answeredAt);
    const nextStreakDays = calculateStreak({
      lastPracticeDate: previousPracticeDate,
      practiceDate,
      currentStreak: previousStreakDays,
    });
    if (
      previousPracticeDate === null ||
      practiceDate >= previousPracticeDate
    ) {
      previousPracticeDate = practiceDate;
      previousStreakDays = nextStreakDays;
    }
  }
  const previousEarnedBadgeIds = getEarnedBadgeIds({
    attempts: previousAttempts,
    questions,
    streakDays: previousStreakDays,
  });
  const newlyEarnedBadgeIds = getNewlyEarnedBadges(
    previousEarnedBadgeIds,
    earnedBadgeIds,
  );
  const badgeProgress = getBadgeProgress(badgeInput);

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-5 sm:px-6">
        <BadgeShelf
          earnedIds={earnedBadgeIds}
          progress={badgeProgress}
          newlyEarnedIds={newlyEarnedBadgeIds}
          accountId={user.id}
        />
      </div>
    </main>
  );
}
