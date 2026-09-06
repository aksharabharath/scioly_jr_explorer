import { EventIcon } from "@/components/EventIcon";
import { fieldSiteSubtitle, fieldSiteTint } from "@/lib/field-sites";
import type { PrimaryExpedition } from "@/lib/base-camp";
import Link from "next/link";

type BaseCampNextExpeditionProps = {
  primary: PrimaryExpedition | null;
};

export function BaseCampNextExpedition({
  primary,
}: BaseCampNextExpeditionProps) {
  if (!primary) {
    return (
      <section
        aria-labelledby="next-expedition-heading"
        className="rounded-3xl border border-stone-200/80 bg-surface p-5 sm:p-7"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
          Your next expedition
        </p>
        <h2
          id="next-expedition-heading"
          className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
        >
          Choose a field site
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-stone-600 sm:text-base">
          Expeditions start from a field site. Open one below to get going.
        </p>
      </section>
    );
  }

  const { event, returning } = primary;
  const tint = fieldSiteTint(event.id);
  const site = fieldSiteSubtitle(event.id);

  return (
    <section
      aria-labelledby="next-expedition-heading"
      className={`rounded-3xl border border-teal-dark/15 p-5 sm:p-7 ${tint.wash}`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
        {returning ? "Your next expedition" : "Ready for your next expedition?"}
      </p>
      <div className="mt-3 flex items-start gap-3">
        <span
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${tint.wrap} ${tint.icon}`}
        >
          <EventIcon id={event.icon} className="h-7 w-7" />
        </span>
        <div className="min-w-0">
          <h2
            id="next-expedition-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
          >
            {event.name}
          </h2>
          {site ? (
            <p className="mt-0.5 text-sm font-medium text-stone-600">{site}</p>
          ) : null}
        </div>
      </div>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone-600 sm:text-base">
        {returning
          ? "Continue with a 10-question expedition at this field site."
          : "Put your knowledge to the test with 10 adaptive questions."}
      </p>
      <Link
        href={`/events/${event.id}/practice`}
        className="mt-5 inline-flex min-h-11 items-center rounded-full bg-teal-dark px-6 py-2.5 text-sm font-semibold text-parchment hover:bg-teal"
      >
        {returning ? "Continue expedition" : "Start expedition"}
      </Link>
    </section>
  );
}
