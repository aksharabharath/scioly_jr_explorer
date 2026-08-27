import { EventSelectionForm } from "@/components/EventSelectionForm";
import { getEvents } from "@/lib/mock/events";
import { getMySelectedEventIds } from "@/lib/student-events";
import type { Metadata } from "next";
import Link from "next/link";

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
      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <p className="text-sm">
          <Link
            href="/"
            className="font-medium text-teal underline-offset-4 hover:underline"
          >
            ← Dashboard
          </Link>
        </p>
        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Choose your events
        </h1>
        <p className="mt-3 text-base leading-relaxed text-stone-600">
          Water Quality, Ecology, Entomology, Anatomy & Physiology, and Crime
          Busters are ready to practice. You can keep them on your list or come
          back later. Practice you already did stays saved.
        </p>
        <EventSelectionForm
          events={events}
          initialSelectedIds={selectedIds}
          submitLabel="Save events"
          description="Keep at least one ready event selected. Other events are coming later."
        />
      </div>
    </main>
  );
}
