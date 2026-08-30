import { getCurrentUser } from "@/lib/auth/session";
import {
  EMPTY_GAMIFICATION,
  isUuid,
  resolvePracticeDate,
  type GamificationState,
} from "@/lib/gamification";
import { WEAK_TOPIC_ATTEMPT_WINDOW } from "@/lib/learning/adaptive";
import { getQuestionById } from "@/lib/mock/curriculum";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type StoredPracticeAttempt = {
  questionId: string;
  isCorrect: boolean;
  hintUsed: boolean;
  sessionId: string | null;
  answeredAt: string | null;
};

function mapAttemptRow(row: {
  question_id: unknown;
  is_correct: unknown;
  hint_used: unknown;
  session_id?: unknown;
  answered_at?: unknown;
}): StoredPracticeAttempt {
  return {
    questionId: row.question_id as string,
    isCorrect: Boolean(row.is_correct),
    hintUsed: Boolean(row.hint_used),
    sessionId: typeof row.session_id === "string" ? row.session_id : null,
    answeredAt: typeof row.answered_at === "string" ? row.answered_at : null,
  };
}

export async function getMyPracticeAttempts(): Promise<StoredPracticeAttempt[]> {
  const user = await getCurrentUser();
  if (!user) {
    return [];
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("practice_attempts")
    .select("question_id, is_correct, hint_used, session_id, answered_at")
    .eq("student_id", user.id)
    .order("answered_at", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data.map(mapAttemptRow);
}

export async function getMyRecentPracticeAttempts(): Promise<
  StoredPracticeAttempt[]
> {
  const user = await getCurrentUser();
  if (!user) {
    return [];
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("practice_attempts")
    .select("question_id, is_correct, hint_used, session_id, answered_at")
    .eq("student_id", user.id)
    .order("answered_at", { ascending: false })
    .limit(WEAK_TOPIC_ATTEMPT_WINDOW);

  if (error || !data) {
    return [];
  }

  return [...data].reverse().map(mapAttemptRow);
}

export async function getMyPracticeAttemptCount(): Promise<number> {
  const user = await getCurrentUser();
  if (!user) {
    return 0;
  }

  const supabase = await createClient();
  const { count, error } = await supabase
    .from("practice_attempts")
    .select("id", { count: "exact", head: true })
    .eq("student_id", user.id);

  if (error || count == null) {
    return 0;
  }

  return count;
}

export async function getMyGamification(): Promise<GamificationState> {
  const user = await getCurrentUser();
  if (!user) {
    return EMPTY_GAMIFICATION;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("student_gamification")
    .select("xp, streak_days")
    .eq("student_id", user.id)
    .maybeSingle();

  if (error || !data) {
    return EMPTY_GAMIFICATION;
  }

  return {
    xp: Math.max(0, Number(data.xp) || 0),
    streakDays: Math.max(0, Number(data.streak_days) || 0),
  };
}

export type SaveAttemptInput = {
  questionId: string;
  selectedOptionId: string;
  hintUsed: boolean;
  attemptId: string;
  sessionId: string;
  practiceDate: string;
};

export type SaveAttemptResult =
  | {
      ok: true;
      attemptXp: number;
      sessionBonusXp: number;
      xp: number;
      streakDays: number;
    }
  | { ok: false; error: string };

type AwardRpcResult = {
  xp?: unknown;
  streakDays?: unknown;
  attemptXp?: unknown;
  sessionBonusXp?: unknown;
};

/**
 * Persist one practice answer and award XP via RPC.
 *
 * Duplicate Check answer / retry uses the same `attemptId`. The database
 * unique constraint on `gamification_attempt_awards.attempt_id` awards XP
 * once; later calls return attemptXp 0. Refreshing the page does not call
 * this unless the student answers again (a new attempt id).
 */
export async function insertPracticeAttempt(
  input: SaveAttemptInput,
): Promise<SaveAttemptResult> {
  const user = await getCurrentUser();
  if (!user) {
    return { ok: false, error: "Please log in to save your answers." };
  }

  if (!isUuid(input.attemptId) || !isUuid(input.sessionId)) {
    return { ok: false, error: "That question could not be saved." };
  }

  const question = await getQuestionById(input.questionId);
  const selected = question?.choices.find(
    (choice) => choice.id === input.selectedOptionId,
  );
  if (!question || !selected) {
    return { ok: false, error: "That question could not be saved." };
  }

  const practiceDate = resolvePracticeDate(input.practiceDate);
  const supabase = await createClient();
  const { data, error } = await supabase.rpc(
    "record_practice_attempt_and_award",
    {
      p_attempt_id: input.attemptId,
      p_session_id: input.sessionId,
      p_question_id: question.id,
      p_selected_option_id: selected.id,
      p_is_correct: selected.id === question.correctChoiceId,
      p_hint_used: input.hintUsed === true,
      p_practice_date: practiceDate,
    },
  );

  if (error || data == null) {
    // Next.js Server Actions often hide console.error objects. A single
    // console.log string is what shows up next to savePracticeAttempt().
    console.log(
      "[record_practice_attempt_and_award RPC failed] " +
        JSON.stringify({
          message: error?.message ?? null,
          code: error?.code ?? null,
          details: error?.details ?? null,
          hint: error?.hint ?? null,
          data: data ?? null,
        }),
    );
    return {
      ok: false,
      error:
        "Your answer was checked, but it could not be saved. Try again later.",
    };
  }

  const awarded = parseAwardResult(data);
  // Refresh dashboard XP/streak and the event hub. Do not revalidate the
  // `/events` layout — that refetches the in-progress practice page and can
  // leave Next question disabled after Check answer.
  revalidatePath("/");
  revalidatePath(`/events/${question.eventId}`);
  return { ok: true, ...awarded };
}

function parseAwardResult(data: unknown): {
  attemptXp: number;
  sessionBonusXp: number;
  xp: number;
  streakDays: number;
} {
  const row =
    typeof data === "string"
      ? (JSON.parse(data) as AwardRpcResult)
      : ((data ?? {}) as AwardRpcResult);

  return {
    xp: asNonNegativeInt(row.xp),
    streakDays: asNonNegativeInt(row.streakDays),
    attemptXp: asNonNegativeInt(row.attemptXp),
    sessionBonusXp: asNonNegativeInt(row.sessionBonusXp),
  };
}

function asNonNegativeInt(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n) || n < 0) {
    return 0;
  }
  return Math.floor(n);
}
