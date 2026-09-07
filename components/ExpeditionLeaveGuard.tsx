"use client";

import { signOut } from "@/app/auth/actions";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  type FormEvent,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export const ACTIVE_EXPEDITION_KEY = "jr-explorer-active-expedition";
const EXPEDITION_STATE_EVENT = "jr-explorer-expedition-state";

export function setActiveExpedition(active: boolean) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    if (active) {
      window.sessionStorage.setItem(ACTIVE_EXPEDITION_KEY, "1");
    } else {
      window.sessionStorage.removeItem(ACTIVE_EXPEDITION_KEY);
    }
  } catch {
    // Navigation remains usable when browser storage is unavailable.
  }

  window.dispatchEvent(new Event(EXPEDITION_STATE_EVENT));
}

function hasActiveExpedition() {
  try {
    return window.sessionStorage.getItem(ACTIVE_EXPEDITION_KEY) === "1";
  } catch {
    return false;
  }
}

type PendingLeave = {
  destination?: string;
  action?: () => void;
};

type GuardContextValue = {
  requestAction: (action: () => void) => void;
};

const GuardContext = createContext<GuardContextValue | null>(null);

export function ExpeditionLeaveGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [pending, setPending] = useState<PendingLeave | null>(null);

  useEffect(() => {
    const sync = () => setActive(hasActiveExpedition());
    sync();
    window.addEventListener(EXPEDITION_STATE_EVENT, sync);
    return () => window.removeEventListener(EXPEDITION_STATE_EVENT, sync);
  }, []);

  useEffect(() => {
    if (!active) {
      return;
    }

    function handleClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const link = target.closest("a");
      if (!link || link.target === "_blank") {
        return;
      }
      const destination = new URL(link.href, window.location.href);
      if (
        destination.origin !== window.location.origin ||
        destination.pathname === pathname
      ) {
        return;
      }
      event.preventDefault();
      setPending({ destination: `${destination.pathname}${destination.search}` });
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [active, pathname]);

  function requestAction(action: () => void) {
    if (active) {
      setPending({ action });
    } else {
      action();
    }
  }

  function leave() {
    const next = pending;
    setPending(null);
    setActiveExpedition(false);
    if (next?.destination) {
      router.push(next.destination);
    } else {
      next?.action?.();
    }
  }

  return (
    <GuardContext.Provider value={{ requestAction }}>
      {children}
      {pending ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/35 px-4"
          role="presentation"
        >
          <section
            aria-labelledby="leave-expedition-heading"
            aria-modal="true"
            className="journal-panel w-full max-w-md rounded-3xl p-5"
            role="dialog"
          >
            <h2
              id="leave-expedition-heading"
              className="font-display text-xl font-semibold tracking-tight text-ink"
            >
              Leave this expedition?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              Your progress is saved, and you can continue later from the event
              page.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setPending(null)}
                className="rounded-full border border-stone-200 px-4 py-2.5 text-sm font-semibold text-ink hover:bg-parchment focus-visible:ring-2 focus-visible:ring-teal"
              >
                Stay
              </button>
              <button
                type="button"
                onClick={leave}
                className="rounded-full bg-teal-dark px-4 py-2.5 text-sm font-semibold text-parchment hover:bg-teal focus-visible:ring-2 focus-visible:ring-teal"
              >
                Leave expedition
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </GuardContext.Provider>
  );
}

export function GuardedSignOutForm() {
  const guard = useContext(GuardContext);
  const allowSubmitRef = useRef(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (allowSubmitRef.current) {
      allowSubmitRef.current = false;
      return;
    }
    if (!guard) {
      return;
    }
    const form = event.currentTarget;
    event.preventDefault();
    guard.requestAction(() => {
      allowSubmitRef.current = true;
      form.requestSubmit();
    });
  }

  return (
    <form action={signOut} onSubmit={handleSubmit}>
      <button
        type="submit"
        className="rounded-md px-2.5 py-2 text-[13px] font-medium text-stone-600 outline-none transition-colors hover:bg-parchment hover:text-ink focus-visible:ring-2 focus-visible:ring-teal sm:px-3 sm:text-sm"
      >
        Log out
      </button>
    </form>
  );
}
