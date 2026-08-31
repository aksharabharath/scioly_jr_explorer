import { EventSelectionForm } from "@/components/EventSelectionForm";
import { getEvents } from "@/lib/mock/events";
import { getMySelectedEventIds } from "@/lib/student-events";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Events · Jr. Explorer",
};

export const dynamic = "force-dynamic";

export default async function ProfileEventsPage() {
  const [events, selectedIds] = await Promise.all([
    getEvents(),
    getMySelectedEventIds(),
  ]);

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-5 sm:px-6">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          My Events
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          Choose which field sites appear at Base camp. This page does not
          start an expedition.
        </p>
        <EventSelectionForm
          events={events}
          initialSelectedIds={selectedIds}
          submitLabel="Save field sites"
          description="Keep at least one ready field site selected. Expeditions you already finished stay saved."
        />
      </div>
    </main>
  );
}
