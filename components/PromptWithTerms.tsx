"use client";

import {
  annotatePrompt,
  type PromptHelpSpan,
} from "@/lib/question-help";
import type { GlossaryEntry, PromptTermRef } from "@/lib/types";
import { useEffect, useId, useRef, useState } from "react";

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

type PromptWithTermsProps = {
  prompt: string;
  promptTerms?: PromptTermRef[];
  glossary: GlossaryEntry[];
};

function displayTerm(term: string): string {
  if (!term) {
    return term;
  }
  return term.charAt(0).toUpperCase() + term.slice(1);
}

function VocabMeaningDialog({
  entry,
  onClose,
}: {
  entry: GlossaryEntry;
  onClose: () => void;
}) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const root = dialogRef.current;
    const previous = document.activeElement;
    closeRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !root) {
        return;
      }
      const nodes = [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (node) => !node.hasAttribute("disabled"),
      );
      if (nodes.length === 0) {
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (previous instanceof HTMLElement) {
        previous.focus();
      }
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 sm:items-center"
      role="presentation"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md rounded-3xl border border-stone-200 bg-surface p-5 shadow-[0_16px_40px_rgba(28,45,41,0.18)]"
        onClick={(event) => event.stopPropagation()}
      >
        <p
          id={titleId}
          className="font-display text-xl font-semibold tracking-tight text-ink"
        >
          {displayTerm(entry.term)}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone-700">
          {entry.definition}
        </p>
        {entry.example ? (
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            {entry.example}
          </p>
        ) : null}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="mt-4 min-h-11 w-full rounded-full bg-teal-dark px-5 py-2.5 text-sm font-semibold text-parchment transition hover:bg-teal"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function PromptSpanView({
  span,
  onOpen,
}: {
  span: PromptHelpSpan;
  onOpen: (entry: GlossaryEntry) => void;
}) {
  if (span.type === "text") {
    return span.text;
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(span.entry)}
      aria-label={`${displayTerm(span.entry.term)}, show meaning`}
      className="rounded-sm text-teal-dark underline decoration-dotted decoration-teal/70 underline-offset-[5px] transition hover:bg-teal/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
    >
      {span.text}
    </button>
  );
}

export function PromptWithTerms({
  prompt,
  promptTerms,
  glossary,
}: PromptWithTermsProps) {
  const [openEntry, setOpenEntry] = useState<GlossaryEntry | null>(null);
  const spans = annotatePrompt(prompt, promptTerms, glossary);

  return (
    <>
      {spans.map((span, index) => (
        <PromptSpanView
          key={`${span.type}-${index}`}
          span={span}
          onOpen={setOpenEntry}
        />
      ))}
      {openEntry ? (
        <VocabMeaningDialog
          entry={openEntry}
          onClose={() => setOpenEntry(null)}
        />
      ) : null}
    </>
  );
}
