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
      <div className="mx-auto w-full max-w-screen-xl flex-1 px-4 py-5 sm:px-6">
        <ExplorerMap
          events={selectedEvents}
          attempts={attempts}
          questions={questions}
        />
      </div>
    </main>
  );
}
