"use client";

import { signUp, type AuthFormState } from "@/app/auth/actions";
import Link from "next/link";
import { useActionState } from "react";

const INITIAL_STATE: AuthFormState = {};

export function SignupForm() {
  const [state, action, pending] = useActionState(signUp, INITIAL_STATE);

  return (
    <form action={action} className="mt-6 space-y-4">
      {state.error ? (
        <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-950">
          {state.error}
        </p>
      ) : null}
      {state.info ? (
        <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-emerald-950">
          <p className="font-display text-lg font-semibold tracking-tight">
            Check your inbox
          </p>
          <p className="mt-1 text-sm leading-relaxed">
            We sent you a confirmation email. Open it and confirm your email
            address to start exploring Science Olympiad.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-emerald-900/80">
            Can&apos;t find it? Check your spam or junk folder, or search your
            inbox for &ldquo;Supabase&rdquo;.
          </p>
        </div>
      ) : null}

      <div>
        <label
          htmlFor="displayName"
          className="block text-sm font-medium text-ink"
        >
          Display name
        </label>
        <input
          id="displayName"
          name="displayName"
          type="text"
          autoComplete="nickname"
          required
          minLength={2}
          className="mt-1 w-full rounded-2xl border border-stone-200 bg-parchment/70 px-4 py-2.5 text-ink outline-none ring-teal/30 focus:ring-2"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-1 w-full rounded-2xl border border-stone-200 bg-parchment/70 px-4 py-2.5 text-ink outline-none ring-teal/30 focus:ring-2"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-ink">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          className="mt-1 w-full rounded-2xl border border-stone-200 bg-parchment/70 px-4 py-2.5 text-ink outline-none ring-teal/30 focus:ring-2"
        />
        <p className="mt-1 text-xs text-stone-500">At least 6 characters.</p>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-teal-dark px-5 py-2.5 text-sm font-semibold text-parchment hover:bg-teal disabled:opacity-60"
      >
        {pending ? "Creating account..." : "Create account"}
      </button>

      <p className="text-center text-sm text-stone-600">
        Already exploring?{" "}
        <Link href="/login" className="font-semibold text-teal hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
