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

  if (crumbs.length === 1 && crumbs[0].href) {
    return (
      <p className="text-sm">
        <Link
          href={crumbs[0].href}
          className="font-medium text-teal underline-offset-4 hover:underline"
        >
          ← {crumbs[0].label}
        </Link>
      </p>
    );
  }

  return (
    <nav aria-label="You are here" className="text-sm text-stone-500">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {crumbs.map((crumb, index) => {
          const current = crumb.href == null;
          return (
            <li key={`${crumb.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 ? (
                <span aria-hidden="true" className="text-stone-400">
                  →
                </span>
              ) : null}
              {current ? (
                <span className="font-medium text-ink">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href ?? "/"}
                  className="font-medium text-teal underline-offset-4 hover:underline"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
