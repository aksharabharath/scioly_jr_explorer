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

export async function updateStudentProfile(
  _prevState: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  const dailyPracticeGoal = parseDailyPracticeGoal(
    formData.get("dailyPracticeGoal"),
  ) as DailyPracticeGoal;

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
      daily_practice_goal: dailyPracticeGoal,
    },
  });

  if (error) {
    return { error: friendlyAuthError(error) };
  }

  revalidatePath("/", "layout");
  revalidatePath("/profile");
  return { saved: true };
}
