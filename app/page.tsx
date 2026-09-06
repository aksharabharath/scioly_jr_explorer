import { LandingPage } from "@/components/LandingPage";
import { getCurrentUser } from "@/lib/auth/session";
import { getEvents, isPlayablePracticeEvent } from "@/lib/mock/events";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Jr. Explorer",
  description:
    "Practice elementary Science Olympiad in short expeditions with Jr. Explorer.",
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/camp");
  }

  const events = (await getEvents()).filter(isPlayablePracticeEvent);

  return <LandingPage events={events} />;
}
