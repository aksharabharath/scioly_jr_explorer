import { EventSelectionForm } from "@/components/EventSelectionForm";
import { EventRequestForm } from "@/components/EventRequestForm";
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
          Which field sites appear at Base camp?
        </h1>
        <p className="mt-3 text-base leading-relaxed text-stone-600">
          Pick at least one ready field site. You will start expeditions from
          Base camp, not from this list. Other events are coming later.
        </p>
        <div className="mt-4">
          <EventRequestForm />
        </div>
        <EventSelectionForm
          events={events}
          initialSelectedIds={[]}
          submitLabel="Continue"
          description="Water Quality, Ecology, Entomology, Anatomy & Physiology, and Crime Busters are ready. Choose at least one."
        />
      </div>
    </main>
  );
}
