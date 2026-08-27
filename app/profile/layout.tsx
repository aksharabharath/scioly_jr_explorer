import { requireUser } from "@/lib/auth/session";
import type { ReactNode } from "react";

export const dynamic = "force-dynamic";

export default async function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireUser();
  return children;
}
