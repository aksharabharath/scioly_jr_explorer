import { EventRulesDocument } from "@/components/EventRulesDocument";
import { ExplorerTrail } from "@/components/ExplorerTrail";
import {
  hasEventRules,
  loadEventRulesMarkdown,
  prepareRulesMarkdown,
  splitRulesSections,
} from "@/lib/event-rules";
import { fieldSiteSubtitle } from "@/lib/field-sites";
import { isStudentCatalogEventId } from "@/lib/mock/events";
import { getEventPageData } from "@/lib/mock/curriculum";
import { requireSelectedEvent } from "@/lib/student-events";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type RulesRouteProps = {
  params: Promise<{ eventId: string }>;
};

export async function generateMetadata({
  params,
}: RulesRouteProps): Promise<Metadata> {
  const { eventId } = await params;
  if (!isStudentCatalogEventId(eventId) || !hasEventRules(eventId)) {
    notFound();
  }
  const data = await getEventPageData(eventId);
  if (!data) {
    return { title: "Event Rules & Overview · Jr. Explorer" };
  }
  return {
    title: `Event Rules & Overview · ${data.event.name} · Jr. Explorer`,
  };
}

export default async function EventRulesPage({ params }: RulesRouteProps) {
  const { eventId } = await params;
  if (!isStudentCatalogEventId(eventId) || !hasEventRules(eventId)) {
    notFound();
  }
  await requireSelectedEvent(eventId);
  const data = await getEventPageData(eventId);
  const raw = await loadEventRulesMarkdown(eventId);
  if (!data || raw == null) {
    notFound();
  }

  const sections = splitRulesSections(prepareRulesMarkdown(raw));
  const site = fieldSiteSubtitle(data.event.id);
  const fieldSiteHref = `/events/${data.event.id}`;

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-5 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
          Event Rules & Overview
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {data.event.name}
        </h1>
        {site ? (
          <p className="mt-1 text-sm font-medium text-stone-600">{site}</p>
        ) : null}
        <p className="mt-2 text-sm leading-relaxed text-stone-600 sm:text-base">
          {data.overview}
        </p>
        <p className="mt-3 text-sm text-stone-600">
          Official 2027 event information
        </p>

        <EventRulesDocument sections={sections} />

        <div className="mt-6">
          <ExplorerTrail
            crumbs={[{ href: fieldSiteHref, label: "Back to field site" }]}
          />
        </div>
      </div>
    </main>
  );
}
