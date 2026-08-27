import { EventSelectionForm } from "@/components/EventSelectionForm";
import { getEvents } from "@/lib/mock/events";
import { getMySelectedEventIds } from "@/lib/student-events";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Choose events · Jr. Explorer",
};

export const dynamic = "force-dynamic";

export default async function OnboardingEventsPage() {
  const [events, selectedIds] = await Promise.all([
    getEvents(),
    getMySelectedEventIds(),
  ]);

  if (selectedIds.length > 0) {
    redirect("/");
  }

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Choose your events
        </h1>
        <p className="mt-3 text-base leading-relaxed text-stone-600">
          Water Quality, Ecology, Entomology, Anatomy & Physiology, and Crime
          Busters are ready to practice. Other events are coming later. Pick at
          least one to continue.
        </p>
        <EventSelectionForm
          events={events}
          initialSelectedIds={[
            "water-quality",
            "ecology",
            "entomology",
            "anatomy-physiology",
            "crime-busters",
          ]}
          submitLabel="Continue"
          description="You can practice Water Quality, Ecology, Entomology, Anatomy & Physiology, and Crime Busters today."
        />
      </div>
    </main>
  );
}
