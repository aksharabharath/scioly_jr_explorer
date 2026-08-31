import { BadgeShelf } from "@/components/BadgeShelf";
import { requireUser } from "@/lib/auth/session";
import { getEarnedBadgeIds } from "@/lib/badges";
import { getAllQuestions } from "@/lib/mock/curriculum";
import { getMyGamification, getMyPracticeAttempts } from "@/lib/practice-attempts";
import { requireEventSelection } from "@/lib/student-events";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Badges · Jr. Explorer",
};

export const dynamic = "force-dynamic";

export default async function BadgesPage() {
  await requireUser();
  await requireEventSelection();
  const [attempts, questions, gamification] = await Promise.all([
    getMyPracticeAttempts(),
    getAllQuestions(),
    getMyGamification(),
  ]);
  const earnedBadgeIds = getEarnedBadgeIds({
    attempts,
    questions,
    streakDays: gamification.streakDays,
  });

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-5 sm:px-6">
        <BadgeShelf earnedIds={earnedBadgeIds} />
      </div>
    </main>
  );
}
