import {
  BADGE_DEFINITIONS,
  type BadgeDefinition,
  type BadgeId,
} from "@/lib/badges";

type BadgeShelfProps = {
  earnedIds: readonly BadgeId[];
};

export function BadgeShelf({ earnedIds }: BadgeShelfProps) {
  const earned = new Set(earnedIds);

  return (
    <section aria-labelledby="badges-heading">
      <h2
        id="badges-heading"
        className="font-display text-2xl font-semibold tracking-tight text-ink"
      >
        Your Badges
      </h2>
      <p className="mt-1 text-sm text-stone-600">
        Gray badges are still waiting. Colorful ones are yours.
      </p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {BADGE_DEFINITIONS.map((badge) => (
          <li key={badge.id}>
            <BadgeTile badge={badge} earned={earned.has(badge.id)} />
          </li>
        ))}
      </ul>
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
      className={`flex h-full gap-3 rounded-2xl border px-4 py-3 ${
        earned
          ? "border-teal/40 bg-surface shadow-[0_4px_16px_rgba(28,45,41,0.06)]"
          : "border-stone-200/80 bg-stone-50"
      }`}
      aria-label={
        earned
          ? `${badge.name}, earned. ${badge.description}`
          : `${badge.name}, locked. ${badge.requirement}`
      }
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xl ${
          earned
            ? "bg-gold/25"
            : "bg-stone-200 text-stone-400 grayscale opacity-60"
        }`}
        aria-hidden="true"
      >
        {badge.emoji}
      </span>
      <div className="min-w-0">
        <p
          className={`font-display text-lg font-semibold tracking-tight ${
            earned ? "text-ink" : "text-stone-500"
          }`}
        >
          {badge.name}
        </p>
        <p
          className={`mt-1 text-sm leading-relaxed ${
            earned ? "text-stone-600" : "text-stone-400"
          }`}
        >
          {earned ? badge.description : badge.requirement}
        </p>
      </div>
    </article>
  );
}
