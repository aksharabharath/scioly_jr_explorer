"use server";

import {
  insertPracticeAttempt,
  type SaveAttemptInput,
  type SaveAttemptResult,
} from "@/lib/practice-attempts";
import { getCurrentUser } from "@/lib/auth/session";
import { isUuid } from "@/lib/gamification";
import {
  getQuestionById,
  createExpedition,
} from "@/lib/questions/server";
import {
  topicsNeedingRevisit,
  type LearningAttempt,
  type PracticeMode,
} from "@/lib/learning/adaptive";
import {
  createClient,
  createServiceRoleClient,
} from "@/lib/supabase/server";

export type QuestionFeedbackIssue =
  | "unfamiliar_words"
  | "correct_answer_may_be_wrong"
  | "explanation_confusing"
  | "too_easy"
  | "too_hard"
  | "wording_gives_answer"
  | "hint_gives_answer"
  | "explanation_gives_answer"
  | "choices_too_obvious"
  | "ambiguous_question"
  | "factual_error"
  | "wrong_answer_key"
  | "image_problem"
  | "other";

export type QuestionFeedbackInput = {
  attemptId: string;
  eventId: string;
  questionId: string;
  questionVersionId?: string;
  feedback: "positive" | "negative";
  issueCodes: QuestionFeedbackIssue[];
  otherText?: string;
};

export type StartPracticeExpeditionInput = {
  eventId: string;
  mode: PracticeMode;
  history: LearningAttempt[];
  topicId?: string | null;
};

export async function startPracticeExpedition(
  input: StartPracticeExpeditionInput,
) {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }
  const topicIds =
    input.mode === "weak"
      ? input.topicId
        ? [input.topicId]
        : topicsNeedingRevisit(input.history)
      : null;
  return createExpedition({
    eventId: input.eventId,
    userId: user.id,
    topicIds,
    history: input.history,
  });
}

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
  if (input.questionVersionId) {
    const { data: version } = await createServiceRoleClient()
      .from("question_versions")
      .select("question_id, event_id")
      .eq("id", input.questionVersionId)
      .maybeSingle();
    if (
      !version ||
      version.question_id !== input.questionId ||
      version.event_id !== input.eventId
    ) {
      return { ok: false, error: "Feedback could not be saved." };
    }
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
    question_version_id: input.questionVersionId ?? null,
    feedback: input.feedback,
    issue_codes: issueCodes,
    other_text: otherText,
  });

  if (error) {
    return { ok: false, error: "Feedback could not be saved." };
  }
  return { ok: true };
}
