import { hasEventRules } from "@/lib/event-rules";
import { isStudentCatalogEventId } from "@/lib/mock/events";
import { notFound, redirect } from "next/navigation";

type OverviewRedirectProps = {
  params: Promise<{ eventId: string }>;
};

export default async function EventOverviewRedirect({
  params,
}: OverviewRedirectProps) {
  const { eventId } = await params;
  if (!isStudentCatalogEventId(eventId) || !hasEventRules(eventId)) {
    notFound();
  }
  redirect(`/events/${eventId}/rules`);
}
