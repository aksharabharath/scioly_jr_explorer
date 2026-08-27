import { requireUser } from "@/lib/auth/session";
import { requireEventSelection } from "@/lib/student-events";
import type { ReactNode } from "react";

export const dynamic = "force-dynamic";

export default async function EventsLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireUser();
  await requireEventSelection();
  return children;
}
