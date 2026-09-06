"use server";

import { friendlyAuthError } from "@/lib/auth/errors";
import { getCurrentUser } from "@/lib/auth/session";
import {
  parseDailyPracticeGoal,
  type DailyPracticeGoal,
} from "@/lib/student-preferences";
import { createClient } from "@/lib/supabase/server";
import { getSupabasePublicEnv } from "@/lib/supabase/env";
import { revalidatePath } from "next/cache";

export type ProfileFormState = {
  error?: string;
  saved?: boolean;
};

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function updateStudentProfile(
  _prevState: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  const displayName = readString(formData, "displayName");
  const dailyPracticeGoal = parseDailyPracticeGoal(
    formData.get("dailyPracticeGoal"),
  ) as DailyPracticeGoal;

  if (displayName.length < 2) {
    return { error: "Please enter a name with at least 2 letters." };
  }

  if (!getSupabasePublicEnv()) {
    return {
      error:
        "Accounts are not connected yet. Ask a grown-up to add the Supabase keys.",
    };
  }

  const user = await getCurrentUser();
  if (!user) {
    return { error: "Please log in to save your profile." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    data: {
      display_name: displayName,
      daily_practice_goal: dailyPracticeGoal,
    },
  });

  if (error) {
    return { error: friendlyAuthError(error) };
  }

  revalidatePath("/", "layout");
  revalidatePath("/camp");
  revalidatePath("/profile");
  return { saved: true };
}
