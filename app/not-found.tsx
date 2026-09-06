import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-xl flex-1 px-4 py-10 sm:px-6">
        <section className="journal-panel rounded-3xl p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
            Field note
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">
            We could not find that page
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            The trail may have moved. Return to Base camp and choose a field
            site from there.
          </p>
          <Link
            href="/"
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-teal-dark px-5 py-2.5 text-sm font-semibold text-parchment hover:bg-teal"
          >
            Back to Base camp
          </Link>
        </section>
      </div>
    </main>
  );
}
