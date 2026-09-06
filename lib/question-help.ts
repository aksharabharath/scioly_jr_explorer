import type {
  GlossaryEntry,
  PromptTermRef,
  Question,
} from "@/lib/types";

export const MAX_PROMPT_TERMS = 4;
export const MIN_DEFINITION_LENGTH = 20;
export const MAX_DEFINITION_LENGTH = 240;
export const MIN_WORDING_HELP_LENGTH = 20;
export const MAX_WORDING_HELP_LENGTH = 280;

const WORDING_HELP_LEAK_PHRASES = [
  "the answer is",
  "correct choice",
  "choose",
  "eliminate",
  "probably",
] as const;

export type PromptHelpSpan =
  | { type: "text"; text: string }
  | { type: "term"; text: string; entry: GlossaryEntry };

type TermMatch = {
  start: number;
  end: number;
  entry: GlossaryEntry;
  glossaryId: string;
  occurrence: number;
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function glossaryById(glossary: GlossaryEntry[]): Map<string, GlossaryEntry> {
  return new Map(glossary.map((entry) => [entry.id, entry]));
}

/** Find whole-term matches. Leaves the original prompt unchanged. */
export function findTermOccurrences(
  prompt: string,
  term: string,
): Array<{ start: number; end: number }> {
  const needle = term.trim();
  if (!needle) {
    return [];
  }
  const pattern = new RegExp(
    `(^|[^A-Za-z0-9])(${escapeRegExp(needle)})(?![A-Za-z0-9])`,
    "gi",
  );
  const matches: Array<{ start: number; end: number }> = [];
  let match = pattern.exec(prompt);
  while (match) {
    const prefixLength = match[1]?.length ?? 0;
    const start = match.index + prefixLength;
    const matched = match[2] ?? "";
    matches.push({ start, end: start + matched.length });
    if (pattern.lastIndex === match.index) {
      pattern.lastIndex += 1;
    }
    match = pattern.exec(prompt);
  }
  return matches;
}

function resolvedMatches(
  prompt: string,
  promptTerms: PromptTermRef[] | undefined,
  glossary: GlossaryEntry[],
): TermMatch[] {
  const byId = glossaryById(glossary);
  const matches: TermMatch[] = [];
  for (const ref of promptTerms ?? []) {
    const entry = byId.get(ref.glossaryId);
    if (!entry) {
      continue;
    }
    const occurrence = ref.occurrence ?? 0;
    if (!Number.isInteger(occurrence) || occurrence < 0) {
      continue;
    }
    const hits = findTermOccurrences(prompt, entry.term);
    const hit = hits[occurrence];
    if (!hit) {
      continue;
    }
    matches.push({
      start: hit.start,
      end: hit.end,
      entry,
      glossaryId: ref.glossaryId,
      occurrence,
    });
  }
  return matches;
}

function rangesOverlap(
  left: { start: number; end: number },
  right: { start: number; end: number },
): boolean {
  return left.start < right.end && right.start < left.end;
}

/** Longer glossary terms win when matches overlap. */
function pickNonOverlapping(matches: TermMatch[]): TermMatch[] {
  const ranked = [...matches].sort((left, right) => {
    const lengthDiff =
      right.end - right.start - (left.end - left.start);
    if (lengthDiff !== 0) {
      return lengthDiff;
    }
    return left.start - right.start;
  });
  const chosen: TermMatch[] = [];
  for (const match of ranked) {
    if (chosen.some((kept) => rangesOverlap(kept, match))) {
      continue;
    }
    chosen.push(match);
  }
  return chosen.sort((left, right) => left.start - right.start);
}

export function annotatePrompt(
  prompt: string,
  promptTerms: PromptTermRef[] | undefined,
  glossary: GlossaryEntry[],
): PromptHelpSpan[] {
  const chosen = pickNonOverlapping(
    resolvedMatches(prompt, promptTerms, glossary),
  );
  if (chosen.length === 0) {
    return [{ type: "text", text: prompt }];
  }

  const spans: PromptHelpSpan[] = [];
  let cursor = 0;
  for (const match of chosen) {
    if (match.start > cursor) {
      spans.push({ type: "text", text: prompt.slice(cursor, match.start) });
    }
    spans.push({
      type: "term",
      text: prompt.slice(match.start, match.end),
      entry: match.entry,
    });
    cursor = match.end;
  }
  if (cursor < prompt.length) {
    spans.push({ type: "text", text: prompt.slice(cursor) });
  }
  return spans;
}

export function optionalQuestionHelpFields(
  question: Pick<Question, "promptTerms" | "wordingHelp">,
): Pick<Question, "promptTerms" | "wordingHelp"> {
  const fields: Pick<Question, "promptTerms" | "wordingHelp"> = {};
  if (question.promptTerms && question.promptTerms.length > 0) {
    fields.promptTerms = question.promptTerms;
  }
  const wording = question.wordingHelp?.trim() ?? "";
  if (wording.length > 0) {
    fields.wordingHelp = wording;
  }
  return fields;
}

function normalizeCompare(value: string): string {
  return value.trim().toLowerCase();
}

function containsPhrase(haystack: string, needle: string): boolean {
  if (!needle.trim()) {
    return false;
  }
  return haystack.toLowerCase().includes(needle.trim().toLowerCase());
}

function definitionRepeatsTerm(entry: GlossaryEntry): boolean {
  const definition = normalizeCompare(entry.definition).replace(/[.,]/g, "");
  const term = normalizeCompare(entry.term);
  return (
    definition === term ||
    definition === `a ${term}` ||
    definition === `an ${term}` ||
    definition === `the ${term}`
  );
}

export function glossaryEntryIssues(
  entry: GlossaryEntry,
  correctChoiceTexts: string[] = [],
): string[] {
  const issues: string[] = [];
  const definition = entry.definition.trim();
  if (!entry.id.trim()) {
    issues.push("glossary id is empty");
  }
  if (!entry.term.trim()) {
    issues.push(`${entry.id} term is empty`);
  }
  if (!definition) {
    issues.push(`${entry.id} definition is empty`);
  } else if (definition.length < MIN_DEFINITION_LENGTH) {
    issues.push(`${entry.id} definition is too short`);
  } else if (definition.length > MAX_DEFINITION_LENGTH) {
    issues.push(`${entry.id} definition is too long`);
  }
  if (definitionRepeatsTerm(entry)) {
    issues.push(`${entry.id} definition only repeats the term`);
  }
  for (const choice of correctChoiceTexts) {
    if (choice.trim() && containsPhrase(definition, choice)) {
      issues.push(`${entry.id} definition contains a correct-choice string`);
    }
  }
  const example = entry.example?.trim();
  if (entry.example !== undefined && !example) {
    issues.push(`${entry.id} example is blank`);
  }
  return issues;
}

function wordingHelpLeakIssues(wordingHelp: string): string[] {
  const issues: string[] = [];
  const lower = wordingHelp.toLowerCase();
  for (const phrase of WORDING_HELP_LEAK_PHRASES) {
    const pattern = new RegExp(`\\b${escapeRegExp(phrase)}\\b`, "i");
    if (pattern.test(lower)) {
      issues.push(`wordingHelp contains "${phrase}"`);
    }
  }
  return issues;
}

export function questionHelpIssues(
  question: Pick<
    Question,
    | "id"
    | "prompt"
    | "choices"
    | "correctChoiceId"
    | "explanation"
    | "hint"
    | "hint2"
    | "promptTerms"
    | "wordingHelp"
  >,
  glossary: GlossaryEntry[],
): string[] {
  const issues: string[] = [];
  const byId = glossaryById(glossary);
  const refs = question.promptTerms ?? [];
  const label = question.id;

  if (refs.length > MAX_PROMPT_TERMS) {
    issues.push(`${label} has more than ${MAX_PROMPT_TERMS} prompt terms`);
  }

  const seen = new Set<string>();
  const resolved: TermMatch[] = [];
  for (const ref of refs) {
    const occurrence = ref.occurrence ?? 0;
    const key = `${ref.glossaryId}#${occurrence}`;
    if (seen.has(key)) {
      issues.push(`${label} duplicates glossary ${key}`);
    }
    seen.add(key);
    if (!Number.isInteger(occurrence) || occurrence < 0) {
      issues.push(`${label} has an invalid occurrence for ${ref.glossaryId}`);
      continue;
    }
    const entry = byId.get(ref.glossaryId);
    if (!entry) {
      issues.push(`${label} references missing glossary id ${ref.glossaryId}`);
      continue;
    }
    const hits = findTermOccurrences(question.prompt, entry.term);
    const hit = hits[occurrence];
    if (!hit) {
      issues.push(
        `${label} term "${entry.term}" occurrence ${occurrence} is not in the prompt`,
      );
      continue;
    }
    resolved.push({
      start: hit.start,
      end: hit.end,
      entry,
      glossaryId: ref.glossaryId,
      occurrence,
    });
  }

  for (let index = 0; index < resolved.length; index += 1) {
    for (let other = index + 1; other < resolved.length; other += 1) {
      if (rangesOverlap(resolved[index], resolved[other])) {
        issues.push(
          `${label} has overlapping prompt terms ${resolved[index].glossaryId} and ${resolved[other].glossaryId}`,
        );
      }
    }
  }

  const correct = question.choices.find(
    (choice) => choice.id === question.correctChoiceId,
  );
  const correctText = correct?.text ?? "";
  const usedIds = new Set(refs.map((ref) => ref.glossaryId));
  for (const entry of glossary) {
    if (!usedIds.has(entry.id)) {
      continue;
    }
    issues.push(
      ...glossaryEntryIssues(entry, correctText ? [correctText] : []).map(
        (issue) => `${label}: ${issue}`,
      ),
    );
  }

  const wording = question.wordingHelp;
  if (wording === undefined) {
    return issues;
  }
  const trimmed = wording.trim();
  if (!trimmed) {
    issues.push(`${label} wordingHelp is empty`);
    return issues;
  }
  if (trimmed.length < MIN_WORDING_HELP_LENGTH) {
    issues.push(`${label} wordingHelp is too short`);
  }
  if (trimmed.length > MAX_WORDING_HELP_LENGTH) {
    issues.push(`${label} wordingHelp is too long`);
  }
  if (normalizeCompare(trimmed) === normalizeCompare(question.explanation)) {
    issues.push(`${label} wordingHelp matches explanation`);
  }
  if (normalizeCompare(trimmed) === normalizeCompare(question.hint)) {
    issues.push(`${label} wordingHelp matches hint`);
  }
  if (
    question.hint2 &&
    normalizeCompare(trimmed) === normalizeCompare(question.hint2)
  ) {
    issues.push(`${label} wordingHelp matches hint2`);
  }
  if (correctText && containsPhrase(trimmed, correctText)) {
    issues.push(`${label} wordingHelp contains the correct choice`);
  }
  for (const choice of question.choices) {
    if (choice.id === question.correctChoiceId) {
      continue;
    }
    if (choice.text.trim() && containsPhrase(trimmed, choice.text)) {
      issues.push(`${label} wordingHelp contains another choice verbatim`);
    }
  }
  issues.push(
    ...wordingHelpLeakIssues(trimmed).map((issue) => `${label} ${issue}`),
  );
  return issues;
}
