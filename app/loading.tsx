export default function Loading() {
  return (
    <main className="flex flex-1 flex-col" aria-busy="true">
      <div className="mx-auto w-full max-w-screen-xl flex-1 px-4 py-5 sm:px-6">
        <section className="journal-panel rounded-3xl p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
            Field notes
          </p>
          <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
            Loading your expedition notes…
          </p>
          <p className="mt-2 text-sm text-stone-600">
            Getting the next page ready.
          </p>
        </section>
      </div>
    </main>
  );
}
