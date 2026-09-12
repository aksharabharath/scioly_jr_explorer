import Link from "next/link";

export type TrailCrumb = {
  label: string;
  href?: string;
};

type ExplorerTrailProps = {
  crumbs: TrailCrumb[];
};

export function ExplorerTrail({ crumbs }: ExplorerTrailProps) {
  if (crumbs.length === 0) {
    return null;
  }

  const origin = crumbs[0];
  const rest = crumbs.slice(1);

  return (
    <nav aria-label="You are here" className="text-sm">
      {origin.href ? (
        <Link
          href={origin.label === "Base camp" ? "/" : origin.href}
          className="inline-flex items-center font-semibold text-teal underline-offset-4 hover:underline"
        >
          ← {origin.label}
        </Link>
      ) : (
        <span
          aria-current="page"
          className="font-display text-base font-semibold tracking-tight text-ink"
        >
          {origin.label}
        </span>
      )}
      {rest.length > 0 ? (
        <ol className="mt-1.5 flex flex-col gap-0.5">
          {rest.map((crumb, index) => {
            const href = crumb.href;
            const current = href == null;
            return (
              <li
                key={`${crumb.label}-${index}`}
                className="flex items-baseline gap-1.5"
              >
                <span aria-hidden="true" className="text-stone-400">
                  →
                </span>
                {current ? (
                  <span
                    aria-current="page"
                    className="font-display text-base font-semibold tracking-tight text-ink"
                  >
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="font-medium text-teal underline-offset-4 hover:underline"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      ) : null}
    </nav>
  );
}
