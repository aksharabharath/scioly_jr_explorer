"use server";

import { friendlyAuthError } from "@/lib/auth/errors";
import { createClient } from "@/lib/supabase/server";
import { getSupabasePublicEnv } from "@/lib/supabase/env";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type AuthFormState = {
  error?: string;
  info?: string;
};

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function missingConfigMessage(): AuthFormState {
  return {
    error:
      "Accounts are not connected yet. Ask a grown-up to add the Supabase keys.",
  };
}

export async function signUp(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const displayName = readString(formData, "displayName");
  const email = readString(formData, "email");
  const password = readString(formData, "password");

  if (!displayName || !email || !password) {
    return { error: "Please fill in your name, email, and password." };
  }

  if (displayName.length < 2) {
    return { error: "Please enter a name with at least 2 letters." };
  }

  if (!email.includes("@")) {
    return { error: "Please enter a real email address." };
  }

  if (password.length < 6) {
    return { error: "Please choose a longer password — at least 6 characters." };
  }

  if (!getSupabasePublicEnv()) {
    return missingConfigMessage();
  }

  const supabase = await createClient();
  const headerList = await headers();
  const origin =
    headerList.get("origin") ??
    `${headerList.get("x-forwarded-proto") ?? "http"}://${headerList.get("host") ?? "localhost:3000"}`;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { error: friendlyAuthError(error) };
  }

  if (!data.session) {
    return {
      info: "Check your email to finish creating your account, then log in.",
    };
  }

  redirect("/");
}

export async function signIn(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = readString(formData, "email");
  const password = readString(formData, "password");

  if (!email || !password) {
    return { error: "Please enter your email and password." };
  }

  if (!getSupabasePublicEnv()) {
    return missingConfigMessage();
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: friendlyAuthError(error) };
  }

  redirect("/");
}

export async function signOut(): Promise<void> {
  if (getSupabasePublicEnv()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/");
}
