import Link from "next/link";

type LandingCtasProps = {
  align?: "start" | "center";
};

export function LandingCtas({ align = "start" }: LandingCtasProps) {
  return (
    <div
      className={`mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center ${
        align === "center" ? "sm:justify-center" : ""
      }`}
    >
      <Link
        href="/signup"
        className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-teal-dark px-5 py-2.5 text-center text-sm font-semibold text-parchment outline-none hover:bg-teal focus-visible:ring-2 focus-visible:ring-teal sm:w-auto"
      >
        Start exploring
      </Link>
      <Link
        href="/login"
        className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-stone-200 bg-surface px-5 py-2.5 text-center text-sm font-semibold text-ink outline-none hover:bg-parchment focus-visible:ring-2 focus-visible:ring-teal sm:w-auto"
      >
        Log in
      </Link>
    </div>
  );
}
