import type { EventIconId } from "@/lib/types";

type EventIconProps = {
  id: EventIconId;
  className?: string;
};

export function EventIcon({ id, className = "h-7 w-7" }: EventIconProps) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (id) {
    case "rock":
      return (
        <svg {...common}>
          <path d="M4.5 16.5 8 7l5 2.5 6.5 7.5-3.5 3H7z" />
          <path d="M8 7 11 12.5 13 9.5" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...common}>
          <path d="M7 17h10a4 4 0 0 0 .4-8 5.5 5.5 0 0 0-10.5 1.5A3.5 3.5 0 0 0 7 17Z" />
          <path d="M8 20h.01M12 20h.01M16 20h.01" />
        </svg>
      );
    case "body":
      return (
        <svg {...common}>
          <circle cx="12" cy="5" r="2.2" />
          <path d="M12 8v4M9 21l3-9 3 9M6.5 12h11" />
        </svg>
      );
    case "bird":
      return (
        <svg {...common}>
          <path d="M4 14c3-1 5-4 5-4s1.5 3 5 4c2 .6 5 .2 6.5-1-1 4-5 7-10 7-4 0-7-2.5-6.5-6Z" />
          <path d="M9 10c.5-3 3-6 7-6 0 2-1 4-3 5" />
        </svg>
      );
    case "gear":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 5v2M12 17v2M5 12h2M17 12h2M7.2 7.2l1.4 1.4M15.4 15.4l1.4 1.4M7.2 16.8l1.4-1.4M15.4 8.6l1.4-1.4" />
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <path d="M12 3.5 14.2 9l5.8.5-4.4 3.8 1.4 5.7L12 16.4 7 19l1.4-5.7L4 9.5 9.8 9z" />
        </svg>
      );
    case "water":
      return (
        <svg {...common}>
          <path d="M12 3.5c0 0-5.5 6.2-5.5 10a5.5 5.5 0 0 0 11 0c0-3.8-5.5-10-5.5-10Z" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...common}>
          <path d="M5 19c8-1 13-8 14-14-6 1-13 6-14 14Z" />
          <path d="M8 16c3-3 6-6 9-8" />
        </svg>
      );
    case "bug":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="13" rx="5" ry="6" />
          <path d="M10 7.5 8 4.5M14 7.5l2-3M7 11H4M20 11h-3M7 16H4.5M19.5 16H17M12 7v12" />
        </svg>
      );
    case "cipher":
      return (
        <svg {...common}>
          <rect x="5" y="7" width="14" height="12" rx="2" />
          <path d="M8 11h2M12 11h2M16 11h.01M8 15h3M13 15h3" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="5.5" />
          <path d="m15.5 15.5 4 4" />
        </svg>
      );
    case "hover":
      return (
        <svg {...common}>
          <path d="M5 14h14l-1.5-4H6.5L5 14Z" />
          <path d="M8 10V8.5A4 4 0 0 1 16 8.5V10" />
          <path d="M7 17h10M8.5 20h7" />
        </svg>
      );
    case "catapult":
      return (
        <svg {...common}>
          <path d="M4 19h16M7 19 12 8l8 3" />
          <circle cx="12" cy="8" r="1.6" />
        </svg>
      );
  }
}
