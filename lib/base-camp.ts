import {
  topicsGroupedByLearningState,
  topicsNeedingRevisit,
  type LearningAttempt,
} from "@/lib/learning/adaptive";
import { isPlayablePracticeEvent } from "@/lib/mock/events";
import type { ScienceEvent, Topic } from "@/lib/types";

export type PrimaryExpedition = {
  event: ScienceEvent;
  /** True when the student has practiced this event before. */
  returning: boolean;
};

export type BaseCampTopicRef = {
  topicId: string;
  name: string;
  eventId: string;
  eventName: string;
};

const MAX_LEARNING_TOPICS_PER_STATE = 2;
const MAX_TRICKY_TOPICS = 2;

export function playableSelectedEvents(events: ScienceEvent[]): ScienceEvent[] {
  return events.filter((event) => isPlayablePracticeEvent(event));
}

export function choosePrimaryExpedition(
  selectedEvents: ScienceEvent[],
  continueEventId: string | null,
): PrimaryExpedition | null {
  const playable = playableSelectedEvents(selectedEvents);
  if (playable.length === 0) {
    return null;
  }
  if (continueEventId) {
    const returning = playable.find((event) => event.id === continueEventId);
    if (returning) {
      return { event: returning, returning: true };
    }
  }
  return { event: playable[0], returning: false };
}

export function namedTopicsFromIds(
  topicIds: string[],
  topics: Topic[],
  events: ScienceEvent[],
): BaseCampTopicRef[] {
  const eventNameById = new Map(events.map((event) => [event.id, event.name]));
  const seen = new Set<string>();
  const named: BaseCampTopicRef[] = [];

  for (const topicId of topicIds) {
    if (seen.has(topicId)) {
      continue;
    }
    const topic = topics.find((item) => item.id === topicId);
    if (!topic) {
      continue;
    }
    seen.add(topicId);
    named.push({
      topicId: topic.id,
      name: topic.name,
      eventId: topic.eventId,
      eventName: eventNameById.get(topic.eventId) ?? topic.eventId,
    });
  }

  return named;
}

export function learningTopicsFromHistory(
  history: LearningAttempt[],
  topics: Topic[],
  events: ScienceEvent[],
): {
  needsPractice: BaseCampTopicRef[];
  improving: BaseCampTopicRef[];
  strong: BaseCampTopicRef[];
} {
  const grouped = topicsGroupedByLearningState(history);
  return {
    needsPractice: namedTopicsFromIds(grouped.needsPractice, topics, events),
    improving: namedTopicsFromIds(grouped.improving, topics, events),
    strong: namedTopicsFromIds(grouped.strong, topics, events),
  };
}

export function learningTopicsForBaseCamp(
  history: LearningAttempt[],
  topics: Topic[],
  events: ScienceEvent[],
): {
  needsPractice: BaseCampTopicRef[];
  improving: BaseCampTopicRef[];
  strong: BaseCampTopicRef[];
} {
  const grouped = learningTopicsFromHistory(history, topics, events);
  return {
    needsPractice: grouped.needsPractice.slice(0, MAX_LEARNING_TOPICS_PER_STATE),
    improving: grouped.improving.slice(0, MAX_LEARNING_TOPICS_PER_STATE),
    strong: grouped.strong.slice(0, MAX_LEARNING_TOPICS_PER_STATE),
  };
}

export function trickyTopicsForBaseCamp(
  history: LearningAttempt[],
  topics: Topic[],
  events: ScienceEvent[],
): BaseCampTopicRef[] {
  return namedTopicsFromIds(
    topicsNeedingRevisit(history),
    topics,
    events,
  ).slice(0, MAX_TRICKY_TOPICS);
}

/** Event Hub: all classified topics for this event (history must already be event-scoped). */
export function learningTopicsForEventHub(
  history: LearningAttempt[],
  topics: Topic[],
  event: ScienceEvent,
) {
  return learningTopicsFromHistory(history, topics, [event]);
}

/** Event Hub: all tricky topics for this event (history must already be event-scoped). */
export function trickyTopicsForEventHub(
  history: LearningAttempt[],
  topics: Topic[],
  event: ScienceEvent,
): BaseCampTopicRef[] {
  return namedTopicsFromIds(topicsNeedingRevisit(history), topics, [event]);
}
