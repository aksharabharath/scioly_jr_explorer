/**
 * Generic curriculum registry.
 *
 * Event id → event-specific bank → generic Question[] → adaptive selector
 * → PracticeQuiz. Do not add event-specific selection algorithms here.
 */
import "server-only";

import { MOCK_ASTRONOMY_OVERVIEW, MOCK_ASTRONOMY_TOPICS } from "@/lib/mock/astronomy";
import { MOCK_ANATOMY_OVERVIEW, MOCK_ANATOMY_TOPICS } from "@/lib/mock/anatomy-physiology";
import { MOCK_ENTOMOLOGY_OVERVIEW, MOCK_ENTOMOLOGY_TOPICS } from "@/lib/mock/entomology";
import {
  MOCK_WATER_QUALITY_OVERVIEW,
  MOCK_WATER_QUALITY_TOPICS,
} from "@/lib/mock/water-quality";
import {
  MOCK_CRIME_BUSTERS_OVERVIEW,
  MOCK_CRIME_BUSTERS_TOPICS,
} from "@/lib/mock/crime-busters";
import {
  MOCK_CODEBUSTERS_OVERVIEW,
  MOCK_CODEBUSTERS_TOPICS,
} from "@/lib/mock/codebusters";
import { MOCK_ECOLOGY_OVERVIEW, MOCK_ECOLOGY_TOPICS } from "@/lib/mock/ecology";
import { getEvent } from "@/lib/mock/events";
import { MOCK_EXPLORER } from "@/lib/mock/explorer";
import {
  getAllQuestions as getAllQuestionsFromDatabase,
  getQuestionById as getQuestionByIdFromDatabase,
  getQuestionsForEvent as getQuestionsForEventFromDatabase,
  isLivePracticeQuestion,
  questionHasPracticeImage,
} from "@/lib/questions/server";
import type {
  ExplorerProfile,
  Question,
  ScienceEvent,
  Topic,
} from "@/lib/types";

const TOPICS_BY_EVENT: Record<string, Topic[]> = {
  astronomy: MOCK_ASTRONOMY_TOPICS,
  entomology: MOCK_ENTOMOLOGY_TOPICS,
  "anatomy-physiology": MOCK_ANATOMY_TOPICS,
  "water-quality": MOCK_WATER_QUALITY_TOPICS,
  "crime-busters": MOCK_CRIME_BUSTERS_TOPICS,
  codebusters: MOCK_CODEBUSTERS_TOPICS,
  ecology: MOCK_ECOLOGY_TOPICS,
};

const OVERVIEW_BY_EVENT: Record<string, string> = {
  astronomy: MOCK_ASTRONOMY_OVERVIEW,
  entomology: MOCK_ENTOMOLOGY_OVERVIEW,
  "anatomy-physiology": MOCK_ANATOMY_OVERVIEW,
  "water-quality": MOCK_WATER_QUALITY_OVERVIEW,
  "crime-busters": MOCK_CRIME_BUSTERS_OVERVIEW,
  codebusters: MOCK_CODEBUSTERS_OVERVIEW,
  ecology: MOCK_ECOLOGY_OVERVIEW,
};

/** True only when a quiz event has questions eligible for live practice. */
export async function eventHasPractice(eventId: string): Promise<boolean> {
  return (await getQuestionsForEvent(eventId)).length > 0;
}

export async function getTopicsForEvent(eventId: string): Promise<Topic[]> {
  return TOPICS_BY_EVENT[eventId] ?? [];
}

export async function getQuestionsForEvent(eventId: string): Promise<Question[]> {
  return getQuestionsForEventFromDatabase(eventId);
}

export async function getAllQuestions(): Promise<Question[]> {
  return getAllQuestionsFromDatabase();
}

export async function getQuestionById(
  questionId: string,
): Promise<Question | undefined> {
  return getQuestionByIdFromDatabase(questionId);
}

export { isLivePracticeQuestion, questionHasPracticeImage };

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
    event.unlocked && event.kind === "quiz" && (await eventHasPractice(eventId));

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

  const questions = await getQuestionsForEventFromDatabase(eventId);
  if (questions.length === 0) {
    return null;
  }

  return { event, questions };
}
