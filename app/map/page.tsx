import { ExplorerMap } from "@/components/ExplorerMap";
import { requireUser } from "@/lib/auth/session";
import { getAllQuestions } from "@/lib/mock/curriculum";
import { getDashboardData } from "@/lib/mock/explorer";
import { getMyPracticeAttempts } from "@/lib/practice-attempts";
import {
  requireEventSelection,
  resolveSelectedEvents,
} from "@/lib/student-events";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Explorer Map · Jr. Explorer",
};

export const dynamic = "force-dynamic";

export default async function MapPage() {
  await requireUser();
  const selectedEventIds = await requireEventSelection();
  const [{ events }, attempts, questions] = await Promise.all([
    getDashboardData(),
    getMyPracticeAttempts(),
    getAllQuestions(),
  ]);
  const selectedEvents = resolveSelectedEvents(events, selectedEventIds);

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
          <ExplorerMap
            events={selectedEvents}
            attempts={attempts}
            questions={questions}
          />
        </div>
      </div>
    </main>
  );
}
