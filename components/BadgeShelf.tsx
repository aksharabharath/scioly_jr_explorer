import {
  BADGE_DEFINITIONS,
  type BadgeDefinition,
  type BadgeId,
} from "@/lib/badges";

type BadgeShelfProps = {
  earnedIds: readonly BadgeId[];
};

const GROUPS: Array<{ title: string; ids: readonly BadgeId[] }> = [
  {
    title: "Firsts",
    ids: ["first-try", "first-discovery"],
  },
  {
    title: "Field work",
    ids: [
      "event-explorer",
      "three-event-explorer",
      "tricky-topic-tamer",
      "practice-regular",
      "question-crusher",
      "curious-mind",
    ],
  },
  {
    title: "Field sites",
    ids: [
      "water-watcher",
      "entomologist",
      "body-explorer",
      "ecosystem-explorer",
      "crime-scene-rookie",
    ],
  },
  {
    title: "Returning",
    ids: ["consistent-explorer", "dedicated-explorer"],
  },
];

export function BadgeShelf({ earnedIds }: BadgeShelfProps) {
  const earned = new Set(earnedIds);
  const empty = earnedIds.length === 0;

  return (
    <section aria-labelledby="badges-heading">
      <h1
        id="badges-heading"
        className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
      >
        Your discoveries
      </h1>
      <p className="mt-1 text-sm text-stone-600">
        A specimen cabinet of what you have earned. Locked tiles show what to
        try next.
      </p>
      {empty ? (
        <p className="journal-panel mt-4 rounded-2xl px-4 py-3 text-sm text-stone-600">
          Your discovery shelf is waiting. Complete expeditions and you&apos;ll
          start filling it up.
        </p>
      ) : null}
      <div className="mt-5 space-y-6">
        {GROUPS.map((group) => (
          <div key={group.title}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
              {group.title}
            </h3>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {group.ids.map((id) => {
                const badge = BADGE_DEFINITIONS.find((item) => item.id === id);
                if (!badge) {
                  return null;
                }
                return (
                  <li key={badge.id}>
                    <BadgeTile badge={badge} earned={earned.has(badge.id)} />
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function BadgeTile({
  badge,
  earned,
}: {
  badge: BadgeDefinition;
  earned: boolean;
}) {
  return (
    <article
      className={`flex h-full min-h-11 gap-3 rounded-2xl border px-3 py-2.5 ${
        earned
          ? "border-gold-dark/40 bg-gold/12 shadow-[0_4px_16px_rgba(28,45,41,0.06)]"
          : "border-dashed border-stone-300 bg-transparent"
      }`}
      aria-label={
        earned
          ? `${badge.name}, earned. ${badge.description}`
          : `${badge.name}, locked. ${badge.requirement}`
      }
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ${
          earned
            ? "bg-gold/40"
            : "border border-dashed border-stone-300 bg-parchment/40 text-stone-400"
        }`}
        aria-hidden="true"
      >
        {badge.emoji}
      </span>
      <div className="min-w-0">
        <p
          className={`font-display text-base font-semibold tracking-tight ${
            earned ? "text-ink" : "text-stone-500"
          }`}
        >
          {badge.name}
        </p>
        <p
          className={`mt-1 text-sm leading-relaxed ${
            earned ? "text-stone-600" : "text-stone-500"
          }`}
        >
          {earned ? badge.description : badge.requirement}
        </p>
      </div>
    </article>
  );
}
