import { ExplorerAvatarPicker } from "@/components/ExplorerAvatar";
import { ExplorerProgress } from "@/components/ExplorerProgress";
import { ProfileSettingsForm } from "@/components/ProfileSettingsForm";
import {
  displayNameFromUser,
  requireUser,
} from "@/lib/auth/session";
import { explorerProfileFromGamification } from "@/lib/gamification";
import { getMyGamification } from "@/lib/practice-attempts";
import { dailyPracticeGoalFromUser } from "@/lib/student-preferences";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Your Profile · Jr. Explorer",
};

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = await requireUser();
  const displayName = displayNameFromUser(user);
  const gamification = await getMyGamification();
  const explorer = explorerProfileFromGamification(displayName, gamification);

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-xl flex-1 px-4 py-5 sm:px-6">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {displayName}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          Your name, daily goal, and account.
        </p>
        <p className="mt-2 text-sm">
          <Link
            href="/profile/events"
            className="font-medium text-teal underline-offset-4 hover:underline"
          >
            Choose which field sites appear at Base camp
          </Link>
        </p>

        <div className="mt-4">
          <ExplorerProgress explorer={explorer} compact />
        </div>

        <div className="journal-panel mt-5 rounded-3xl p-4 sm:p-5">
          <ExplorerAvatarPicker />
        </div>

        <div className="journal-panel mt-5 rounded-3xl p-4 sm:p-5">
          <h2 className="font-display text-lg font-semibold tracking-tight text-ink">
            Settings
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            These stay on your account. They do not change XP rules.
          </p>
          <div className="mt-4">
            <ProfileSettingsForm
              displayName={displayName}
              email={user.email ?? null}
              dailyPracticeGoal={dailyPracticeGoalFromUser(user)}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
