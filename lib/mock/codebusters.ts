/**
 * Codebusters 2027 MVP — topics and overview.
 *
 * Question text lives in codebusters-questions.ts.
 * The catalog event remains locked until the bank has completed playability QA.
 */
import { CODEBUSTERS_EVENT_ID } from "@/lib/mock/codebusters-questions";
import type { Topic } from "@/lib/types";

export const MOCK_CODEBUSTERS_OVERVIEW =
  "Learn to recognize, encode, and decode the ciphers listed in the 2027 rules.";

export const MOCK_CODEBUSTERS_TOPICS: Topic[] = [
  {
    id: "baconian",
    eventId: CODEBUSTERS_EVENT_ID,
    name: "Baconian",
    shortDescription: "Group A/B symbols into five-symbol letter patterns.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "porta",
    eventId: CODEBUSTERS_EVENT_ID,
    name: "Porta",
    shortDescription: "Use repeating keywords and reciprocal substitution alphabets.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "aristocrat",
    eventId: CODEBUSTERS_EVENT_ID,
    name: "Aristocrat",
    shortDescription: "Solve letter substitutions with hints, patterns, and frequency clues.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "cryptarithm",
    eventId: CODEBUSTERS_EVENT_ID,
    name: "Cryptarithm",
    shortDescription: "Use addition, subtraction, and carries to recover digit assignments.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "caesar-atbash",
    eventId: CODEBUSTERS_EVENT_ID,
    name: "Caesar and Atbash",
    shortDescription: "Apply fixed shifts and reversed-alphabet substitutions.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "cryptanalysis-strategy",
    eventId: CODEBUSTERS_EVENT_ID,
    name: "Cryptanalysis strategy",
    shortDescription: "Choose useful clues and methods when the cipher information is incomplete.",
    topicMastery: "learning",
    progressPercent: 0,
  },
];
