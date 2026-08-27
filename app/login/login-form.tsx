"use client";

import { signIn, type AuthFormState } from "@/app/auth/actions";
import Link from "next/link";
import { useActionState } from "react";

const INITIAL_STATE: AuthFormState = {};

type LoginFormProps = {
  confirmError?: boolean;
};

export function LoginForm({ confirmError = false }: LoginFormProps) {
  const [state, action, pending] = useActionState(signIn, INITIAL_STATE);

  return (
    <form action={action} className="mt-6 space-y-4">
      {confirmError ? (
        <p className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-950">
          We could not finish confirming that account. Try logging in, or create
          the account again.
        </p>
      ) : null}
      {state.error ? (
        <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-950">
          {state.error}
        </p>
      ) : null}

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
          autoComplete="current-password"
          required
          className="mt-1 w-full rounded-2xl border border-stone-200 bg-parchment/70 px-4 py-2.5 text-ink outline-none ring-teal/30 focus:ring-2"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-teal-dark px-5 py-2.5 text-sm font-semibold text-parchment hover:bg-teal disabled:opacity-60"
      >
        {pending ? "Logging in..." : "Log in"}
      </button>

      <p className="text-center text-sm text-stone-600">
        New explorer?{" "}
        <Link href="/signup" className="font-semibold text-teal hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  );
}
