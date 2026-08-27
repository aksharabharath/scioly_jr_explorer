/**
 * Generic curriculum registry.
 *
 * Event id → event-specific bank → generic Question[] → adaptive selector
 * → PracticeQuiz. Do not add event-specific selection algorithms here.
 */
import { MOCK_ASTRONOMY_OVERVIEW, MOCK_ASTRONOMY_QUESTIONS, MOCK_ASTRONOMY_TOPICS } from "@/lib/mock/astronomy";
import { MOCK_ANATOMY_OVERVIEW, MOCK_ANATOMY_TOPICS } from "@/lib/mock/anatomy-physiology";
import {
  MOCK_ANATOMY_PHYSIOLOGY_QUESTIONS,
  anatomyPhysiologyQuestionToPracticeQuestion,
} from "@/lib/mock/anatomy-physiology-questions";
import { MOCK_ENTOMOLOGY_OVERVIEW, MOCK_ENTOMOLOGY_TOPICS } from "@/lib/mock/entomology";
import {
  MOCK_ENTOMOLOGY_QUESTIONS,
  entomologyQuestionToPracticeQuestion,
} from "@/lib/mock/entomology-questions";
import {
  MOCK_WATER_QUALITY_OVERVIEW,
  MOCK_WATER_QUALITY_TOPICS,
} from "@/lib/mock/water-quality";
import {
  MOCK_WATER_QUALITY_QUESTIONS,
  waterQualityQuestionToPracticeQuestion,
} from "@/lib/mock/water-quality-questions";
import {
  MOCK_CRIME_BUSTERS_OVERVIEW,
  MOCK_CRIME_BUSTERS_TOPICS,
} from "@/lib/mock/crime-busters";
import {
  MOCK_CRIME_BUSTERS_QUESTIONS,
  crimeBustersQuestionToPracticeQuestion,
} from "@/lib/mock/crime-busters-questions";
import { MOCK_ECOLOGY_OVERVIEW, MOCK_ECOLOGY_TOPICS } from "@/lib/mock/ecology";
import {
  MOCK_ECOLOGY_QUESTIONS,
  ecologyQuestionToPracticeQuestion,
} from "@/lib/mock/ecology-questions";
import { getEvent } from "@/lib/mock/events";
import { MOCK_EXPLORER } from "@/lib/mock/explorer";
import type {
  ExplorerProfile,
  Question,
  ScienceEvent,
  Topic,
} from "@/lib/types";

const QUESTIONS_BY_EVENT: Record<string, Question[]> = {
  astronomy: MOCK_ASTRONOMY_QUESTIONS,
  entomology: MOCK_ENTOMOLOGY_QUESTIONS.map(entomologyQuestionToPracticeQuestion),
  "anatomy-physiology": MOCK_ANATOMY_PHYSIOLOGY_QUESTIONS.map(
    anatomyPhysiologyQuestionToPracticeQuestion,
  ),
  "water-quality": MOCK_WATER_QUALITY_QUESTIONS.map(
    waterQualityQuestionToPracticeQuestion,
  ),
  "crime-busters": MOCK_CRIME_BUSTERS_QUESTIONS.map(
    crimeBustersQuestionToPracticeQuestion,
  ),
  ecology: MOCK_ECOLOGY_QUESTIONS.map(ecologyQuestionToPracticeQuestion),
};

const TOPICS_BY_EVENT: Record<string, Topic[]> = {
  astronomy: MOCK_ASTRONOMY_TOPICS,
  entomology: MOCK_ENTOMOLOGY_TOPICS,
  "anatomy-physiology": MOCK_ANATOMY_TOPICS,
  "water-quality": MOCK_WATER_QUALITY_TOPICS,
  "crime-busters": MOCK_CRIME_BUSTERS_TOPICS,
  ecology: MOCK_ECOLOGY_TOPICS,
};

const OVERVIEW_BY_EVENT: Record<string, string> = {
  astronomy: MOCK_ASTRONOMY_OVERVIEW,
  entomology: MOCK_ENTOMOLOGY_OVERVIEW,
  "anatomy-physiology": MOCK_ANATOMY_OVERVIEW,
  "water-quality": MOCK_WATER_QUALITY_OVERVIEW,
  "crime-busters": MOCK_CRIME_BUSTERS_OVERVIEW,
  ecology: MOCK_ECOLOGY_OVERVIEW,
};

/**
 * Live practice eligibility. Banks that omit `verificationStatus` are treated
 * as verified so events that have not been through content QA stay playable.
 */
export function isLivePracticeQuestion(question: Question): boolean {
  const verificationStatus = question.verificationStatus ?? "verified";
  return (
    verificationStatus === "verified" && question.imageRequired !== true
  );
}

export function livePracticeQuestions(questions: Question[]): Question[] {
  return questions.filter(isLivePracticeQuestion);
}

/** True only when a quiz event has questions eligible for live practice. */
export function eventHasPractice(eventId: string): boolean {
  return livePracticeQuestions(QUESTIONS_BY_EVENT[eventId] ?? []).length > 0;
}

export async function getTopicsForEvent(eventId: string): Promise<Topic[]> {
  return TOPICS_BY_EVENT[eventId] ?? [];
}

export async function getQuestionsForEvent(eventId: string): Promise<Question[]> {
  return livePracticeQuestions(QUESTIONS_BY_EVENT[eventId] ?? []);
}

/** Full registered banks, including non-live and image-required items. */
export async function getAllQuestions(): Promise<Question[]> {
  return Object.values(QUESTIONS_BY_EVENT).flat();
}

export async function getQuestionById(
  questionId: string,
): Promise<Question | undefined> {
  for (const questions of Object.values(QUESTIONS_BY_EVENT)) {
    const match = questions.find((question) => question.id === questionId);
    if (match) {
      return match;
    }
  }
  return undefined;
}

export type EventPageData = {
  event: ScienceEvent;
  explorer: ExplorerProfile;
  overview: string;
  topics: Topic[];
  hasPractice: boolean;
};

export async function getEventPageData(
  eventId: string,
): Promise<EventPageData | null> {
  const event = await getEvent(eventId);
  if (!event) {
    return null;
  }

  const topics = await getTopicsForEvent(eventId);
  const hasPractice =
    event.unlocked && event.kind === "quiz" && eventHasPractice(eventId);

  return {
    event,
    explorer: MOCK_EXPLORER,
    overview: OVERVIEW_BY_EVENT[eventId] ?? event.shortDescription,
    topics,
    hasPractice,
  };
}

export type PracticePageData = {
  event: ScienceEvent;
  questions: Question[];
};

export async function getPracticePageData(
  eventId: string,
): Promise<PracticePageData | null> {
  const event = await getEvent(eventId);
  if (!event || event.kind === "build" || !event.unlocked) {
    return null;
  }

  const questions = await getQuestionsForEvent(eventId);
  if (questions.length === 0) {
    return null;
  }

  return { event, questions };
}
