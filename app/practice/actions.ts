"use server";

import {
  insertPracticeAttempt,
  type SaveAttemptInput,
  type SaveAttemptResult,
} from "@/lib/practice-attempts";

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
