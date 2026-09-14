"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <>
      <nav
        aria-label="Main"
        className="min-w-0 flex-1 max-[479px]:basis-full"
      >
        <ul className="flex min-w-0 flex-wrap items-center justify-end gap-0.5 sm:flex-nowrap sm:gap-1 max-[479px]:justify-between">
          {ITEMS.map((item) => {
            const active = item.match(pathname);
            return (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  aria-label={item.label}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex min-h-12 items-center gap-1.5 rounded-md px-2.5 py-2.5 text-[13px] font-medium outline-none transition-colors max-[479px]:px-1.5 max-[479px]:text-[11px] sm:min-h-11 sm:px-3 sm:py-2.5 sm:text-sm focus-visible:ring-2 focus-visible:ring-teal ${
                    active
                      ? "bg-parchment font-semibold text-teal-dark shadow-[inset_0_-2px_0_0_var(--teal)]"
                      : "text-stone-600 hover:bg-parchment hover:text-ink"
                  }`}
                >
                  <NavIcon name={item.icon} />
                  <span className="hidden min-[480px]:inline max-[479px]:inline">
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
          <li className="shrink-0">
            <button
              type="button"
              onClick={() => setFeedbackOpen(true)}
              className="inline-flex min-h-12 items-center rounded-md px-2.5 py-2.5 text-[13px] font-medium text-stone-600 outline-none transition-colors hover:bg-parchment hover:text-ink focus-visible:ring-2 focus-visible:ring-teal max-[479px]:px-1.5 max-[479px]:text-[11px] sm:min-h-11 sm:px-3 sm:py-2.5 sm:text-sm"
            >
              <span>Feedback</span>
            </button>
          </li>
        </ul>
      </nav>
      {feedbackOpen ? (
        <GlobalFeedbackWindow onClose={() => setFeedbackOpen(false)} />
      ) : null}
    </>
  );
}

function GlobalFeedbackWindow({ onClose }: { onClose: () => void }) {
  const [otherText, setOtherText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!submitted) {
      return;
    }
    const timeoutId = window.setTimeout(onClose, 1600);
    return () => window.clearTimeout(timeoutId);
  }, [onClose, submitted]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-ink/20 p-4 pt-20"
      role="dialog"
      aria-modal="true"
      aria-labelledby="global-feedback-heading"
    >
      <div className="w-full max-w-lg rounded-3xl border border-stone-200 bg-surface p-4 shadow-xl sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="global-feedback-heading"
              className="font-display text-xl font-semibold text-ink"
            >
              Feedback
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              Help us make Jr. Explorer better.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close feedback"
            className="rounded-full px-2 py-1 text-xl leading-none text-stone-500 hover:bg-parchment hover:text-ink"
          >
            ×
          </button>
        </div>
        <label className="mt-4 block text-sm text-stone-700">
          <span className="font-semibold text-ink">Anything else?</span>
          <textarea
            value={otherText}
            onChange={(event) => setOtherText(event.target.value)}
            rows={4}
            placeholder="What could we improve? Tell us about anything that surprised you, didn’t work the way you expected, or would make Jr. Explorer more useful or fun to use."
            className="mt-1 w-full resize-y rounded-2xl border border-stone-200 bg-parchment px-3 py-2 text-sm text-ink outline-none placeholder:text-stone-400 focus:border-teal focus:ring-2 focus:ring-teal/20"
          />
        </label>
        <div className="mt-4 flex justify-end gap-2">
          {submitted ? (
            <p className="mr-auto self-center text-sm font-semibold text-teal-dark" aria-live="polite">
              Feedback has been received, thanks!
            </p>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-stone-200 px-4 py-2 text-sm font-semibold text-ink hover:bg-parchment"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="rounded-full bg-teal-dark px-4 py-2 text-sm font-semibold text-parchment hover:bg-teal"
          >
            Submit feedback
          </button>
        </div>
      </div>
    </div>
  );
}
