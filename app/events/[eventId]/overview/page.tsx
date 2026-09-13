import { redirect } from "next/navigation";

type OverviewRedirectProps = {
  params: Promise<{ eventId: string }>;
};

export default async function EventOverviewRedirect({
  params,
}: OverviewRedirectProps) {
  const { eventId } = await params;
  redirect(`/events/${eventId}`);
}
