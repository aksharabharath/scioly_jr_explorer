"use client";

import {
  startPracticeCheckInCall,
  type CheckInCallState,
} from "@/app/practice/check-in-call";
import Link from "next/link";
import { useActionState } from "react";

const INITIAL_STATE: CheckInCallState = {};

type PracticeCheckInCallProps = {
  practicedToday: boolean;
  defaultPhone?: string;
};

export function PracticeCheckInCall({
  practicedToday,
  defaultPhone = "",
}: PracticeCheckInCallProps) {
  const [state, action, pending] = useActionState(
    startPracticeCheckInCall,
    INITIAL_STATE,
  );

  return (
    <section
      aria-labelledby="practice-call-heading"
      className="rounded-3xl border border-stone-200/80 bg-surface p-5 sm:p-6"
    >
      <h2
        id="practice-call-heading"
        className="font-display text-2xl font-semibold tracking-tight text-ink"
      >
        Practice check-in call
      </h2>
      <p className="mt-1 text-sm leading-relaxed text-stone-600">
        We can ring your phone. A kind coach will ask if you practiced today.
        {practicedToday
          ? " Our notebook already shows you practiced. The coach will still ask, then talk about what you did."
          : " Our notebook does not show practice yet today. If you say you have not practiced, the coach will remind you kindly."}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-stone-600">
        You type the number that should ring. A grown-up also needs a Vapi
        number to call FROM.
      </p>

      <p className="mt-3">
        <Link
          href="/how-this-call-works.html"
          className="text-sm font-semibold text-teal hover:underline"
        >
          Show me how this works →
        </Link>
      </p>

      {state.error ? (
        <p className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-950">
          {state.error}
        </p>
      ) : null}
      {state.message ? (
        <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-950">
          {state.message}
        </p>
      ) : null}

      <form action={action} className="mt-5 space-y-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-ink">
            Phone number to call
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            defaultValue={defaultPhone}
            placeholder="555-123-4567"
            className="mt-1 w-full rounded-2xl border border-stone-200 bg-parchment/70 px-4 py-2.5 text-ink outline-none ring-teal/30 focus:ring-2"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-teal-dark px-5 py-2.5 text-sm font-semibold text-parchment hover:bg-teal disabled:opacity-60"
        >
          {pending ? "Calling..." : "Call me"}
        </button>
      </form>
    </section>
  );
}
