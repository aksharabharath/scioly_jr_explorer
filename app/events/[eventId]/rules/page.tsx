import { redirect } from "next/navigation";

type RulesRouteProps = {
  params: Promise<{ eventId: string }>;
};

export default async function EventRulesPage({ params }: RulesRouteProps) {
  const { eventId } = await params;
  redirect(`/events/${eventId}`);
}
