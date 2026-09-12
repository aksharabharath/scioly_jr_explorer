/**
 * Loads official event rules Markdown from docs/events.
 * Presentation only — does not change practice, XP, or banks.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";

const RULES_FOLDERS: Record<string, string> = {
  "water-quality": "water_quality",
  ecology: "ecology",
  entomology: "entomology",
  "anatomy-physiology": "anatomy_and_physiology",
  "crime-busters": "crime_busters",
};

export function eventRulesRelativePath(
  eventId: string,
): string | undefined {
  const folder = RULES_FOLDERS[eventId];
  if (!folder) {
    return undefined;
  }
  return `docs/events/${folder}/RULES_2027.md`;
}

export function hasEventRules(eventId: string): boolean {
  return eventId in RULES_FOLDERS;
}

export async function loadEventRulesMarkdown(
  eventId: string,
): Promise<string | null> {
  const folder = RULES_FOLDERS[eventId];
  if (!folder) {
    return null;
  }
  const absolute = path.join(
    process.cwd(),
    "docs",
    "events",
    folder,
    "RULES_2027.md",
  );
  try {
    return await readFile(absolute, "utf8");
  } catch {
    return null;
  }
}

/** Strip Google-Docs `++` wrappers only. Does not change rule wording. */
export function prepareRulesMarkdown(raw: string): string {
  return raw.replace(/\r\n/g, "\n").replace(/\+\+/g, "");
}

export type RulesSection = {
  heading: string | null;
  markdown: string;
};

function isHorizontalRule(line: string): boolean {
  return /^---+$/.test(line.trim());
}

function atxHeading(line: string): string | null {
  const match = line.match(/^(#{1,3})\s+(.*)$/);
  if (!match) {
    return null;
  }
  return match[2].replace(/\*\*/g, "").trim().replace(/:$/, "");
}

function standaloneBoldTitle(line: string): string | null {
  if (line.includes("|")) {
    return null;
  }
  const match = line.trim().match(/^\*\*([^*]+)\*\*:?\s*$/);
  if (!match) {
    return null;
  }
  const title = match[1].trim();
  if (title.length === 0 || title.length > 80) {
    return null;
  }
  if (/^official\b/i.test(title) || /^organizational\b/i.test(title)) {
    return null;
  }
  return title.replace(/:$/, "").trim();
}

export function splitRulesSections(markdown: string): RulesSection[] {
  const lines = markdown.split("\n");
  const sections: RulesSection[] = [];
  let heading: string | null = null;
  let body: string[] = [];

  function flush() {
    const text = body.join("\n").trim();
    if (heading == null && text.length === 0) {
      return;
    }
    sections.push({ heading, markdown: text });
    heading = null;
    body = [];
  }

  for (const line of lines) {
    const nextHeading = atxHeading(line) ?? standaloneBoldTitle(line);
    if (nextHeading != null) {
      flush();
      heading = nextHeading;
      continue;
    }
    if (isHorizontalRule(line)) {
      flush();
      continue;
    }
    body.push(line);
  }
  flush();
  return sections;
}
