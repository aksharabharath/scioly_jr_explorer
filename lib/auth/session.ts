import { createClient } from "@/lib/supabase/server";
import { getSupabasePublicEnv } from "@/lib/supabase/env";
import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";

export async function getCurrentUser(): Promise<User | null> {
  if (!getSupabasePublicEnv()) {
    return null;
  }

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}

/** Server-side gate. Hiding UI is not enough. */
export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

const FALLBACK_DISPLAY_NAME = "Explorer";

/** Identity from Auth metadata. Not from mock explorer progress data. */
export function displayNameFromUser(user: User): string {
  const name = user.user_metadata?.display_name;
  if (typeof name === "string" && name.trim()) {
    return name.trim();
  }
  return FALLBACK_DISPLAY_NAME;
}
