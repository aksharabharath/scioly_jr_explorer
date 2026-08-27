import type { NextStep } from "@/lib/types";

type NextStepsProps = {
  steps: NextStep[];
};

export function NextSteps({ steps }: NextStepsProps) {
  return (
    <section
      aria-labelledby="next-steps-heading"
      className="rounded-3xl border border-stone-200/80 bg-surface p-5 shadow-[0_8px_30px_rgba(28,45,41,0.05)] sm:p-6"
    >
      <h2
        id="next-steps-heading"
        className="font-display text-2xl font-semibold tracking-tight text-ink"
      >
        What to do next
      </h2>
      <p className="mt-1 text-sm text-stone-600">
        A simple path for today. Learn, then practice, then show what you know.
      </p>

      <ol className="mt-5 space-y-3">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className="flex gap-3 rounded-2xl border border-stone-100 bg-parchment/60 px-3 py-3 sm:px-4"
          >
            <span
              className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                step.done
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-teal/10 text-teal-dark"
              }`}
            >
              {step.done ? (
                <CheckIcon />
              ) : (
                <span aria-hidden="true">{index + 1}</span>
              )}
            </span>
            <div>
              <p className="font-medium text-ink">{step.title}</p>
              <p className="text-sm text-stone-600">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
    >
      <path d="M6 12.5 10 16.5 18 8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
