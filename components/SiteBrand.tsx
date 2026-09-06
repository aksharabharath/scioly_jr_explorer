"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function CompassMark() {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal text-parchment shadow-sm">
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        aria-hidden="true"
      >
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
  );
}

type SiteBrandProps = {
  /** Logged-in home is Base camp. Logged-out `/` is the public landing page. */
  showBaseCampLabel?: boolean;
};

export function SiteBrand({ showBaseCampLabel = false }: SiteBrandProps) {
  const pathname = usePathname() ?? "";
  const atBaseCamp = Boolean(showBaseCampLabel) && pathname === "/";

  return (
    <Link
      href="/"
      aria-current={atBaseCamp ? "page" : undefined}
      aria-label={atBaseCamp ? "Jr. Explorer, Base camp" : "Jr. Explorer, home"}
      className={`flex shrink-0 items-center gap-2.5 rounded-lg px-1 py-0.5 outline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-teal ${
        atBaseCamp ? "bg-parchment/80" : "hover:bg-parchment/70"
      }`}
    >
      <CompassMark />
      <span className="leading-tight">
        <span className="block font-display text-base font-semibold tracking-tight text-ink sm:text-lg">
          Jr. Explorer
        </span>
        {atBaseCamp ? (
          <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-teal">
            Base camp
          </span>
        ) : null}
      </span>
    </Link>
  );
}
