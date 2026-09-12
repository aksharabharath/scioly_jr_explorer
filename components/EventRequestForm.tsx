"use client";

import {
  submitEventRequest,
  type EventRequestState,
} from "@/app/event-requests/actions";
import { useActionState, useId, useState } from "react";

const INITIAL_STATE: EventRequestState = { status: "idle" };

export function EventRequestForm() {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const [state, action, pending] = useActionState(
    submitEventRequest,
    INITIAL_STATE,
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-left text-sm font-semibold text-teal underline decoration-teal/40 underline-offset-4 hover:text-teal-dark"
      >
        If you do not see your event, please request it here.
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 sm:items-center"
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="w-full max-w-md rounded-3xl border border-stone-200 bg-surface p-5 shadow-[0_16px_40px_rgba(28,45,41,0.18)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h2
                id={titleId}
                className="font-display text-xl font-semibold tracking-tight text-ink"
              >
                Request an event
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close event request"
                className="rounded-full px-2 py-1 text-lg leading-none text-stone-500 hover:bg-parchment hover:text-ink"
              >
                ×
              </button>
            </div>

            <form action={action} className="mt-5 space-y-4">
              {state.status === "error" ? (
                <p
                  role="alert"
                  className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-950"
                >
                  {state.message}
                </p>
              ) : null}
              {state.status === "success" ? (
                <p
                  role="status"
                  className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-950"
                >
                  {state.message}
                </p>
              ) : null}

              <div>
                <label
                  htmlFor="eventRequestName"
                  className="block text-sm font-medium text-ink"
                >
                  Event name
                </label>
                <input
                  id="eventRequestName"
                  name="eventName"
                  type="text"
                  required
                  autoFocus
                  className="mt-1 w-full rounded-2xl border border-stone-200 bg-parchment/70 px-4 py-2.5 text-ink outline-none ring-teal/30 focus:ring-2"
                />
              </div>

              <div>
                <label
                  htmlFor="eventRequestMessage"
                  className="block text-sm font-medium text-ink"
                >
                  Anything else you&apos;d like us to know?
                </label>
                <textarea
                  id="eventRequestMessage"
                  name="message"
                  rows={4}
                  className="mt-1 w-full resize-y rounded-2xl border border-stone-200 bg-parchment/70 px-4 py-2.5 text-ink outline-none ring-teal/30 focus:ring-2"
                />
              </div>

              <button
                type="submit"
                disabled={pending}
                className="min-h-11 w-full rounded-full bg-teal-dark px-5 py-2.5 text-sm font-semibold text-parchment transition hover:bg-teal disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pending ? "Submitting..." : "Submit Request"}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
