"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-xl flex-1 px-4 py-10 sm:px-6">
        <section
          className="journal-panel rounded-3xl p-6 sm:p-8"
          role="alert"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
            Field note
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">
            That page needs another look
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            Something went wrong, but your field notes are safe. Try the page
            again or return to Base camp.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={reset}
              className="min-h-11 rounded-full bg-teal-dark px-5 py-2.5 text-sm font-semibold text-parchment hover:bg-teal"
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-stone-200 px-5 py-2.5 text-sm font-semibold text-ink hover:bg-parchment"
            >
              Back to Base camp
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
