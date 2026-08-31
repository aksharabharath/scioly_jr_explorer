"use client";

import { saveSelectedEvents, type SaveEventsState } from "@/app/events/selection-actions";
import { EventIcon } from "@/components/EventIcon";
import { fieldSiteSubtitle, fieldSiteTint } from "@/lib/field-sites";
import { isPlayablePracticeEvent, isSelectableEvent } from "@/lib/mock/events";
import type { ScienceEvent } from "@/lib/types";
import { useActionState, useMemo, useState } from "react";

const INITIAL_STATE: SaveEventsState = {};

type EventSelectionFormProps = {
  events: ScienceEvent[];
  initialSelectedIds: string[];
  submitLabel: string;
  description: string;
};

export function EventSelectionForm({
  events,
  initialSelectedIds,
  submitLabel,
  description,
}: EventSelectionFormProps) {
  const selectableIds = useMemo(
    () => new Set(events.filter(isSelectableEvent).map((event) => event.id)),
    [events],
  );
  const [selected, setSelected] = useState<Set<string>>(
    () =>
      new Set(
        initialSelectedIds.filter((eventId) =>
          events.some(
            (event) => event.id === eventId && isSelectableEvent(event),
          ),
        ),
      ),
  );
  const [state, action, pending] = useActionState(
    saveSelectedEvents,
    INITIAL_STATE,
  );

  const selectedList = useMemo(() => [...selected], [selected]);
  const hasPlayableSelection = useMemo(
    () =>
      selectedList.some((eventId) =>
        events.some(
          (event) => event.id === eventId && isPlayablePracticeEvent(event),
        ),
      ),
    [events, selectedList],
  );

  function toggle(eventId: string) {
    if (!selectableIds.has(eventId)) {
      return;
    }
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(eventId)) {
        next.delete(eventId);
      } else {
        next.add(eventId);
      }
      return next;
    });
  }

  return (
    <form action={action} className="mt-6">
      <p className="text-sm leading-relaxed text-stone-600">{description}</p>

      {state.error ? (
        <p className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-950">
          {state.error}
        </p>
      ) : null}

      {selectedList.map((eventId) => (
        <input key={eventId} type="hidden" name="eventId" value={eventId} />
      ))}

      <div
        className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        role="group"
        aria-label="Science Olympiad events"
      >
        {events.map((event) => {
          const tint = fieldSiteTint(event.id);
          const site = fieldSiteSubtitle(event.id);
          const locked = !isSelectableEvent(event);
          const isSelected = selected.has(event.id);
          const playable = isPlayablePracticeEvent(event);

          if (locked) {
            return (
              <div
                key={event.id}
                className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-3 py-3 text-left"
              >
                <span className="flex items-start gap-3">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${tint.wrap} ${tint.icon}`}
                  >
                    <EventIcon id={event.icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="font-display text-lg font-semibold tracking-tight text-ink">
                      {event.name}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-stone-600">
                      {event.shortDescription}
                    </span>
                    <span className="mt-2 inline-block rounded-full bg-stone-200 px-2.5 py-1 text-xs font-semibold text-stone-700">
                      Coming later
                    </span>
                  </span>
                </span>
              </div>
            );
          }

          return (
            <button
              key={event.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => toggle(event.id)}
              className={`min-h-11 rounded-2xl border px-3 py-3 text-left transition ${
                isSelected
                  ? "border-teal bg-teal/10"
                  : "border-stone-200/80 bg-surface hover:border-teal/40"
              }`}
            >
              <span className="flex items-start gap-3">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${tint.wrap} ${tint.icon}`}
                >
                  <EventIcon id={event.icon} className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-lg font-semibold tracking-tight text-ink">
                      {event.name}
                    </span>
                    {isSelected ? (
                      <span className="rounded-full bg-teal-dark px-2 py-0.5 text-xs font-semibold text-parchment">
                        Selected
                      </span>
                    ) : playable ? (
                      <span className="rounded-full bg-teal/15 px-2 py-0.5 text-xs font-semibold text-teal-dark">
                        Ready to explore
                      </span>
                    ) : null}
                  </span>
                  {site ? (
                    <span className="mt-0.5 block text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
                      {site}
                    </span>
                  ) : null}
                  <span className="mt-1 block text-sm leading-relaxed text-stone-600">
                    {event.shortDescription}
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-stone-500">
          {selected.size === 0 || !hasPlayableSelection
            ? "Select Water Quality, Ecology, Entomology, Anatomy & Physiology, or Crime Busters to continue."
            : `${selected.size} field site${selected.size === 1 ? "" : "s"} selected`}
        </p>
        <button
          type="submit"
          disabled={pending || selected.size === 0 || !hasPlayableSelection}
          className="min-h-11 rounded-full bg-teal-dark px-5 py-2.5 text-sm font-semibold text-parchment transition enabled:hover:bg-teal disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
