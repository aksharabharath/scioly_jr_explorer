import { ExpeditionLog } from "@/components/ExpeditionLog";
import { requireUser } from "@/lib/auth/session";
import { expeditionLogEntries } from "@/lib/expeditions";
import { getAllQuestions } from "@/lib/mock/curriculum";
import { getDashboardData } from "@/lib/mock/explorer";
import { getMyPracticeAttempts } from "@/lib/practice-attempts";
import { requireEventSelection } from "@/lib/student-events";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Expedition log · Jr. Explorer",
};

export const dynamic = "force-dynamic";

export default async function LogPage() {
  await requireUser();
  await requireEventSelection();
  const [{ events }, attempts, questions] = await Promise.all([
    getDashboardData(),
    getMyPracticeAttempts(),
    getAllQuestions(),
  ]);
  const eventNameById = Object.fromEntries(
    events.map((event) => [event.id, event.name]),
  );
  const logEntries = expeditionLogEntries(attempts, questions, eventNameById);

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
          <ExpeditionLog entries={logEntries} />
        </div>
      </div>
    </main>
  );
}
