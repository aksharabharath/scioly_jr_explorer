"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  match: (pathname: string) => boolean;
  icon: "camp" | "log" | "badges" | "events" | "profile";
};

const ITEMS: NavItem[] = [
  {
    href: "/",
    label: "Base camp",
    match: (path) => path === "/",
    icon: "camp",
  },
  {
    href: "/log",
    label: "Expedition log",
    match: (path) => path === "/log" || path.startsWith("/log/"),
    icon: "log",
  },
  {
    href: "/badges",
    label: "Badges",
    match: (path) => path === "/badges" || path.startsWith("/badges/"),
    icon: "badges",
  },
  {
    href: "/profile/events",
    label: "My Events",
    match: (path) =>
      path === "/profile/events" || path.startsWith("/profile/events/"),
    icon: "events",
  },
  {
    href: "/profile",
    label: "Profile",
    match: (path) => path === "/profile",
    icon: "profile",
  },
];

function NavIcon({ name }: { name: NavItem["icon"] }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "h-4 w-4 shrink-0",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "camp":
      return (
        <svg {...common}>
          <path d="M4 19.5 12 5l8 14.5" />
          <path d="M8.5 19.5h7" />
          <path d="M12 12.5v7" />
        </svg>
      );
    case "log":
      return (
        <svg {...common}>
          <path d="M7 4.5h8.5A2.5 2.5 0 0 1 18 7v12.5H8.5A2.5 2.5 0 0 1 6 17V6.5A2 2 0 0 1 8 4.5" />
          <path d="M9.5 9h5M9.5 12.5h5M9.5 16h3" />
        </svg>
      );
    case "badges":
      return (
        <svg {...common}>
          <path d="m12 3.5 2.1 4.3 4.7.7-3.4 3.3.8 4.7L12 14.3 7.8 16.5l.8-4.7-3.4-3.3 4.7-.7z" />
        </svg>
      );
    case "events":
      return (
        <svg {...common}>
          <path d="M8 4v3M16 4v3M5.5 8.5h13M6.5 6.5h11A1.5 1.5 0 0 1 19 8v10.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 18.5V8a1.5 1.5 0 0 1 1.5-1.5Z" />
          <path d="M9 13h.01M12 13h.01M15 13h.01M9 16h.01M12 16h.01" />
        </svg>
      );
    case "profile":
      return (
        <svg {...common}>
          <circle cx="12" cy="8.5" r="3" />
          <path d="M5.5 19c.8-3.2 3.3-5 6.5-5s5.7 1.8 6.5 5" />
        </svg>
      );
  }
}

export function SiteNav() {
  const pathname = usePathname() ?? "";

  return (
    <nav
      aria-label="Main"
      className="min-w-0 flex-1"
    >
      <ul className="flex min-w-0 flex-wrap items-center justify-end gap-0.5 sm:flex-nowrap sm:gap-1">
        {ITEMS.map((item) => {
          const active = item.match(pathname);
          return (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-11 items-center gap-1.5 rounded-md px-2 py-2 text-[13px] font-medium outline-none transition-colors sm:min-h-0 sm:px-2.5 sm:py-1.5 sm:text-sm focus-visible:ring-2 focus-visible:ring-teal ${
                  active
                    ? "bg-parchment font-semibold text-teal-dark shadow-[inset_0_-2px_0_0_var(--teal)]"
                    : "text-stone-600 hover:bg-parchment hover:text-ink"
                }`}
              >
                <NavIcon name={item.icon} />
                <span className="hidden min-[480px]:inline">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
