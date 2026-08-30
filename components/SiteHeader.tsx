import { signOut } from "@/app/auth/actions";
import { displayNameFromUser, getCurrentUser } from "@/lib/auth/session";
import Link from "next/link";

function CompassMark() {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal text-parchment shadow-sm">
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
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

export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="border-b border-stone-200/80 bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 rounded-xl outline-offset-4">
          <CompassMark />
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold tracking-tight text-ink sm:text-xl">
              Jr. Explorer
            </span>
            <span className="block text-xs font-medium text-stone-500 sm:text-sm">
              Science Olympiad
            </span>
          </span>
        </Link>
        {user ? (
          <div className="flex flex-wrap items-center justify-end gap-3">
            <span className="max-w-[10rem] truncate text-sm font-medium text-ink sm:max-w-none">
              {displayNameFromUser(user)}
            </span>
            <nav className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1 text-sm font-semibold text-teal">
              <Link href="/map" className="hover:underline">
                Map
              </Link>
              <Link href="/log" className="hover:underline">
                Log
              </Link>
              <Link href="/badges" className="hover:underline">
                Badges
              </Link>
              <Link href="/profile/events" className="hover:underline">
                My Events
              </Link>
            </nav>
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-full border border-stone-200 bg-surface px-4 py-2 text-sm font-semibold text-ink hover:bg-parchment"
              >
                Log out
              </button>
            </form>
          </div>
        ) : (
          <nav className="flex items-center gap-3 text-sm font-semibold">
            <Link href="/login" className="text-ink hover:text-teal">
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-teal-dark px-4 py-2 text-parchment hover:bg-teal"
            >
              Create account
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
