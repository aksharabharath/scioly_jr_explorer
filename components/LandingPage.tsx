import { EventCard } from "@/components/EventCard";
import { LandingCtas } from "@/components/LandingCtas";
import { LandingHeroNotebook } from "@/components/LandingHeroNotebook";
import type { ScienceEvent } from "@/lib/types";

type LandingPageProps = {
  events: ScienceEvent[];
};

const EXPEDITION_STEPS = [
  {
    n: "1",
    title: "Choose a field site",
    body: "Pick a Science Olympiad event.",
  },
  {
    n: "2",
    title: "Take a 10-question expedition",
    body: "Work through questions one at a time, with hints when you need them.",
  },
  {
    n: "3",
    title: "See what was tricky",
    body: "Missed questions point to topics worth another look.",
  },
  {
    n: "4",
    title: "Practice and come back",
    body: "Practice those topics and return for another expedition.",
  },
] as const;

const XP_STAMPS = [
  { label: "XP", note: "Earned by answering" },
  { label: "Explorer Level", note: "For explorers, not a grade" },
  { label: "Streak", note: "Come back another day" },
] as const;

export function LandingPage({ events }: LandingPageProps) {
  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-[72rem] flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <section className="grid items-start gap-8 md:grid-cols-2 md:items-center md:gap-10 lg:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
              Science Olympiad practice
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              Your field notebook for Science Olympiad.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-stone-600 sm:text-lg">
              Practice elementary Science Olympiad in short 10-question
              expeditions. See what was tricky, get a little stronger, and come
              back. A grown-up’s email is all you need to start.
            </p>
            <LandingCtas />
          </div>
          <LandingHeroNotebook events={events} />
        </section>

        <section className="mt-16 sm:mt-20" aria-labelledby="expedition-heading">
          <h2
            id="expedition-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
          >
            How an expedition works
          </h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {EXPEDITION_STEPS.map((step, index) => (
              <li key={step.n} className="relative">
                {index < EXPEDITION_STEPS.length - 1 ? (
                  <span
                    className="pointer-events-none absolute -right-3 top-8 hidden text-teal/35 xl:block"
                    aria-hidden="true"
                  >
                    →
                  </span>
                ) : null}
                <article className="journal-panel h-full rounded-3xl p-4 sm:p-5">
                  <p className="flex h-8 w-8 items-center justify-center rounded-full bg-teal text-sm font-semibold text-parchment">
                    {step.n}
                  </p>
                  <h3 className="mt-3 font-display text-lg font-semibold tracking-tight text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">
                    {step.body}
                  </p>
                </article>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm font-medium text-stone-500">
            Needs Practice → Improving → Strong
          </p>
        </section>

        <section className="mt-16 sm:mt-20" aria-labelledby="sites-heading">
          <h2
            id="sites-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
          >
            Field sites you can explore
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-base">
            Start with the events currently ready for practice.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {events.map((event) => (
              <EventCard key={event.id} event={event} showCta={false} />
            ))}
          </div>
          <p className="mt-4 text-sm text-stone-500">More events are coming later.</p>
        </section>

        <section className="mt-16 sm:mt-20" aria-labelledby="xp-heading">
          <h2
            id="xp-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
          >
            A little progress goes a long way
          </h2>
          <div className="journal-panel mt-6 rounded-3xl border-t-2 border-t-gold p-5 sm:p-6">
            <p className="max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-base">
              Questions earn XP. Explorer Level is for explorers, not a grade.
              Missing an answer never takes XP away.
            </p>
            <ul className="mt-5 flex flex-wrap gap-3">
              {XP_STAMPS.map((stamp) => (
                <li
                  key={stamp.label}
                  className="rounded-2xl border border-stone-200/80 bg-parchment/70 px-4 py-3"
                >
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-gold-dark">
                    Stamp
                  </p>
                  <p className="mt-1 font-display text-base font-semibold text-ink">
                    {stamp.label}
                  </p>
                  <p className="mt-0.5 text-sm text-stone-600">{stamp.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-16 sm:mt-20" aria-labelledby="grownup-heading">
          <h2
            id="grownup-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
          >
            A grown-up helps you get started
          </h2>
          <div className="journal-panel mt-6 max-w-3xl rounded-3xl p-5 sm:p-6">
            <p className="text-sm leading-relaxed text-stone-600 sm:text-base">
              Ask a grown-up to use their email to create an account. Jr.
              Explorer is practice—not a scored invitational. Mistakes don&apos;t
              take XP away. The goal is to get a little better each expedition.
            </p>
          </div>
        </section>

        <section
          className="mt-16 sm:mt-20"
          aria-labelledby="final-cta-heading"
        >
          <div className="mx-auto max-w-xl text-center">
            <h2
              id="final-cta-heading"
              className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
            >
              Ready to start exploring?
            </h2>
            <LandingCtas align="center" />
          </div>
        </section>
      </div>

      <footer className="mt-auto border-t border-stone-200/80 bg-surface/60">
        <div className="mx-auto flex w-full max-w-[72rem] flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 font-display text-sm font-semibold text-ink">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal text-parchment">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.75" />
                <path
                  d="M12 6.5v2M12 15.5v2M6.5 12h2M15.5 12h2"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
                <path d="M12 9.2 14.8 12 12 14.8 9.2 12z" fill="currentColor" />
              </svg>
            </span>
            Jr. Explorer
          </p>
          <p className="text-xs leading-relaxed text-stone-500">
            This is not an official Science Olympiad test bank.
          </p>
        </div>
      </footer>
    </main>
  );
}
