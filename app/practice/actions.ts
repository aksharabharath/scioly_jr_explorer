"use server";

import {
  insertPracticeAttempt,
  type SaveAttemptInput,
  type SaveAttemptResult,
} from "@/lib/practice-attempts";
import { getCurrentUser } from "@/lib/auth/session";
import { isUuid } from "@/lib/gamification";
import { getQuestionById } from "@/lib/mock/curriculum";
import { createClient } from "@/lib/supabase/server";

export type QuestionFeedbackIssue =
  | "unfamiliar_words"
  | "correct_answer_may_be_wrong"
  | "explanation_confusing"
  | "too_easy"
  | "too_hard"
  | "other";

export type QuestionFeedbackInput = {
  attemptId: string;
  eventId: string;
  questionId: string;
  feedback: "positive" | "negative";
  issueCodes: QuestionFeedbackIssue[];
  otherText?: string;
};

export async function savePracticeAttempt(
  input: SaveAttemptInput,
): Promise<SaveAttemptResult> {
  try {
    return await insertPracticeAttempt(input);
  } catch (cause) {
    console.log(
      "[savePracticeAttempt threw] " +
        JSON.stringify({
          name: cause instanceof Error ? cause.name : typeof cause,
          message: cause instanceof Error ? cause.message : String(cause),
        }),
    );
    throw cause;
  }
}

export async function saveQuestionFeedback(
  input: QuestionFeedbackInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const user = await getCurrentUser();
  if (!user || !isUuid(input.attemptId)) {
    return { ok: false, error: "Feedback could not be saved." };
  }

  const question = await getQuestionById(input.questionId);
  if (!question || question.eventId !== input.eventId) {
    return { ok: false, error: "Feedback could not be saved." };
  }

  const issueCodes = input.feedback === "negative" ? input.issueCodes : [];
  const otherText =
    input.feedback === "negative" && issueCodes.includes("other")
      ? input.otherText?.trim() || null
      : null;
  const supabase = await createClient();
  const { error } = await supabase.from("question_feedback").insert({
    attempt_id: input.attemptId,
    user_id: user.id,
    event_id: input.eventId,
    question_id: input.questionId,
    feedback: input.feedback,
    issue_codes: issueCodes,
    other_text: otherText,
  });

  if (error) {
    return { ok: false, error: "Feedback could not be saved." };
  }
  return { ok: true };
}
