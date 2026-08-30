import { BadgeShelf } from "@/components/BadgeShelf";
import { requireUser } from "@/lib/auth/session";
import { getEarnedBadgeIds } from "@/lib/badges";
import { getAllQuestions } from "@/lib/mock/curriculum";
import { getMyGamification, getMyPracticeAttempts } from "@/lib/practice-attempts";
import { requireEventSelection } from "@/lib/student-events";
import type { Metadata } from "next";
import Link from "next/link";

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
      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <p className="text-sm">
          <Link
            href="/"
            className="font-medium text-teal underline-offset-4 hover:underline"
          >
            ← Dashboard
          </Link>
        </p>
        <div className="mt-6">
          <BadgeShelf earnedIds={earnedBadgeIds} />
        </div>
      </div>
    </main>
  );
}
