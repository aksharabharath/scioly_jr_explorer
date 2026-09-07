import { GuardedSignOutForm } from "@/components/ExpeditionLeaveGuard";
import { SiteBrand } from "@/components/SiteBrand";
import { SiteNav } from "@/components/SiteNav";
import { getCurrentUser } from "@/lib/auth/session";
import Link from "next/link";

export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center gap-2 px-4 py-3.5 sm:gap-3 sm:px-6 sm:py-4">
        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <SiteBrand highlightHome={Boolean(user)} />
          {user ? (
            <GuardedSignOutForm />
          ) : null}
        </div>
        {user ? (
          <SiteNav />
        ) : (
          <nav
            aria-label="Account"
            className="ml-auto flex items-center gap-1 text-sm font-medium"
          >
            <Link
              href="/login"
              className="rounded-lg px-2.5 py-1.5 text-stone-600 outline-none hover:bg-parchment hover:text-ink focus-visible:ring-2 focus-visible:ring-teal"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-teal-dark px-3 py-1.5 text-parchment outline-none hover:bg-teal focus-visible:ring-2 focus-visible:ring-teal"
            >
              Start exploring
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
