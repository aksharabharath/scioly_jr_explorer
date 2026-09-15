"use server";

import { friendlyAuthError } from "@/lib/auth/errors";
import {
  createClient,
  createServiceRoleClient,
} from "@/lib/supabase/server";
import { getSupabasePublicEnv } from "@/lib/supabase/env";
import { redirect } from "next/navigation";

export type AuthFormState = {
  error?: string;
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

const USERNAME_PATTERN = /^[a-z0-9_]{3,24}$/;

function normalizeUsername(value: string): string {
  return value.trim().toLowerCase();
}

export async function signUp(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const username = normalizeUsername(readString(formData, "username"));
  const displayName = readString(formData, "displayName");
  const password = readString(formData, "password");

  if (!username || !displayName || !password) {
    return { error: "Please fill in your username, name, and password." };
  }

  if (!USERNAME_PATTERN.test(username)) {
    return {
      error:
        "Username must be 3–24 characters using lowercase letters, numbers, or underscores.",
    };
  }

  if (displayName.length < 2) {
    return { error: "Please enter a name with at least 2 letters." };
  }

  if (password.length < 6) {
    return { error: "Please choose a longer password — at least 6 characters." };
  }

  if (!getSupabasePublicEnv()) {
    return missingConfigMessage();
  }

  const admin = createServiceRoleClient();
  const { data: existing, error: lookupError } = await admin
    .from("student_usernames")
    .select("user_id")
    .eq("username", username)
    .maybeSingle();
  if (lookupError) {
    return { error: "We could not create your account. Please try again." };
  }
  if (existing) {
    return {
      error: "That username is already taken. Please choose another one.",
    };
  }

  const authIdentifier = `user-${crypto.randomUUID()}@users.jr-explorer.invalid`;
  const { data, error } = await admin.auth.admin.createUser({
    email: authIdentifier,
    password,
    email_confirm: true,
    user_metadata: {
      username,
      display_name: displayName,
    },
  });
  if (error || !data.user) {
    const { data: duplicate } = await admin
      .from("student_usernames")
      .select("user_id")
      .eq("username", username)
      .maybeSingle();
    return {
      error: duplicate
        ? "That username is already taken. Please choose another one."
        : error
          ? friendlyAuthError(error)
          : "We could not create your account.",
    };
  }

  const { data: mapping, error: mappingError } = await admin
    .from("student_usernames")
    .select("user_id")
    .eq("user_id", data.user.id)
    .eq("username", username)
    .maybeSingle();
  if (mappingError || !mapping) {
    await admin.auth.admin.deleteUser(data.user.id);
    return {
      error: "We could not finish creating your account. Please try again.",
    };
  }

  const supabase = await createClient();
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: authIdentifier,
    password,
  });
  if (signInError) {
    await admin.from("student_usernames").delete().eq("user_id", data.user.id);
    await admin.auth.admin.deleteUser(data.user.id);
    return { error: friendlyAuthError(signInError) };
  }

  redirect("/");
}

export async function signIn(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const username = normalizeUsername(readString(formData, "username"));
  const password = readString(formData, "password");

  if (!username || !password) {
    return { error: "Please enter your username and password." };
  }

  if (!USERNAME_PATTERN.test(username)) {
    return { error: "Please enter a valid username and password." };
  }

  if (!getSupabasePublicEnv()) {
    return missingConfigMessage();
  }

  const admin = createServiceRoleClient();
  const { data: account, error: lookupError } = await admin
    .from("student_usernames")
    .select("auth_identifier")
    .eq("username", username)
    .maybeSingle();
  if (lookupError || !account) {
    return { error: "That username or password doesn't match." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: account.auth_identifier,
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
