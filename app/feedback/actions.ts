"use server";

import { getCurrentUser } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";

export async function saveGeneralFeedback(
  feedbackText: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const user = await getCurrentUser();
  const trimmedFeedback = feedbackText.trim();

  if (!user || !trimmedFeedback) {
    return { ok: false, error: "Feedback could not be saved." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("general_feedback").insert({
    user_id: user.id,
    feedback_text: trimmedFeedback,
  });

  if (error) {
    return { ok: false, error: "Feedback could not be saved." };
  }

  return { ok: true };
}
