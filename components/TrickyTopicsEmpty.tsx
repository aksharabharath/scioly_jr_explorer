import Link from "next/link";

type TrickyTopicsEmptyProps = {
  eventId: string;
  eventName: string;
  headingLevel?: "h1" | "h2";
};

export function TrickyTopicsEmpty({
  eventId,
  eventName,
  headingLevel = "h2",
}: TrickyTopicsEmptyProps) {
  const Heading = headingLevel;

  return (
    <section className="journal-panel rounded-3xl p-5">
      <Heading className="font-display text-2xl font-semibold tracking-tight text-ink">
        No tricky topics yet
      </Heading>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-stone-600">
        Keep exploring. We&apos;ll bring back anything that needs another look.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Link
          href={`/events/${eventId}/practice`}
          className="rounded-full bg-teal-dark px-5 py-2.5 text-center text-sm font-semibold text-parchment hover:bg-teal"
        >
          Start an expedition
        </Link>
        <Link
          href={`/events/${eventId}`}
          className="rounded-full border border-stone-200 px-5 py-2.5 text-center text-sm font-semibold text-ink hover:bg-parchment"
        >
          Back to {eventName}
        </Link>
      </div>
    </section>
  );
}
