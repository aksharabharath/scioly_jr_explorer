import "server-only";

import { createServerClient } from "@supabase/ssr";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { getSupabasePublicEnv } from "@/lib/supabase/env";

export async function createClient() {
  const cookieStore = await cookies();
  const env = getSupabasePublicEnv();
  if (!env) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL and a publishable/anon key.",
    );
  }

  return createServerClient(env.url, env.key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Called from a Server Component. Proxy refreshes the session.
        }
      },
    },
  });
}

/**
 * Server-only database client for trusted application reads.
 *
 * Question tables are deliberately not readable by anon/authenticated
 * clients. Keep this key in a non-public SUPABASE_SERVICE_ROLE_KEY variable.
 */
export function createServiceRoleClient() {
  const env = getSupabasePublicEnv();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!env || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase URL or server-only SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  return createServiceClient(env.url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
