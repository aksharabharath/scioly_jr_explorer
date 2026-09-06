"use client";

import {
  updateStudentProfile,
  type ProfileFormState,
} from "@/app/profile/actions";
import { signOut } from "@/app/auth/actions";
import {
  DAILY_PRACTICE_GOALS,
  type DailyPracticeGoal,
} from "@/lib/student-preferences";
import { useActionState } from "react";

const INITIAL_STATE: ProfileFormState = {};

type ProfileSettingsFormProps = {
  displayName: string;
  email: string | null;
  dailyPracticeGoal: DailyPracticeGoal;
};

export function ProfileSettingsForm({
  displayName,
  email,
  dailyPracticeGoal,
}: ProfileSettingsFormProps) {
  const [state, action, pending] = useActionState(
    updateStudentProfile,
    INITIAL_STATE,
  );

  return (
    <div className="space-y-6">
      <form action={action} className="space-y-4">
        {state.error ? (
          <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-950">
            {state.error}
          </p>
        ) : null}
        {state.saved ? (
          <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-950">
            Saved. Your name and daily question goal are updated.
          </p>
        ) : null}

        <div>
          <label
            htmlFor="displayName"
            className="block text-sm font-medium text-ink"
          >
            What should we call you?
          </label>
          <input
            id="displayName"
            name="displayName"
            type="text"
            autoComplete="nickname"
            required
            minLength={2}
            defaultValue={displayName}
            className="mt-1 w-full rounded-2xl border border-stone-200 bg-parchment/70 px-4 py-2.5 text-ink outline-none ring-teal/30 focus:ring-2"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-ink">Sign-in email</p>
          <p className="mt-1 text-sm text-stone-600">
            {email ?? "No email on this account."}
          </p>
        </div>

        <fieldset>
          <legend className="text-sm font-medium text-ink">
            Daily question goal
          </legend>
          <p className="mt-1 text-sm text-stone-600">
            How many questions would you like to answer each day? Today&apos;s
            goal uses this number. It does not change XP.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {DAILY_PRACTICE_GOALS.map((goal) => (
              <label
                key={goal}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-stone-200 bg-parchment/50 px-3 py-2.5 text-sm font-medium text-ink has-[:checked]:border-teal has-[:checked]:bg-teal/10 has-[:checked]:text-teal-dark"
              >
                <input
                  type="radio"
                  name="dailyPracticeGoal"
                  value={goal}
                  defaultChecked={goal === dailyPracticeGoal}
                  className="accent-teal"
                />
                {goal}
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-teal-dark px-5 py-2.5 text-sm font-semibold text-parchment hover:bg-teal disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save profile"}
        </button>
      </form>

      <section
        aria-labelledby="account-heading"
        className="border-t border-stone-200/80 pt-4"
      >
        <h2
          id="account-heading"
          className="font-display text-xl font-semibold tracking-tight text-ink"
        >
          Account
        </h2>
        <p className="mt-1 text-sm text-stone-600">
          Log out when you are done exploring.
        </p>
        <form action={signOut} className="mt-4">
          <button
            type="submit"
            className="min-h-11 rounded-full border border-stone-200 bg-surface px-4 py-2.5 text-sm font-semibold text-ink hover:bg-parchment"
          >
            Log out
          </button>
        </form>
      </section>
    </div>
  );
}
