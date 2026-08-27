/**
 * MOCK DATA — recommended action, next steps, and leftover event labels
 *
 * Explorer XP / Level / streak are no longer read from this file.
 * Event Level and topic mastery here are still hand-written display values.
 */
import { getEventById, getEvents } from "@/lib/mock/events";
import type {
  ExplorerProfile,
  NextStep,
  RecommendedAction,
  ScienceEvent,
} from "@/lib/types";

export const MOCK_EXPLORER: ExplorerProfile = {
  displayName: "Alex",
  explorerLevel: 1,
  currentXp: 0,
  xpForNextLevel: 100,
  streakDays: 0,
};

export const MOCK_RECOMMENDED: RecommendedAction = {
  eventId: "entomology",
  topicTitle: "Visual identification",
  difficulty: "medium",
  loopStage: "Practice",
  reason:
    "Entomology practice is ready. Start a short set when you want the next question. Mistakes keep your XP.",
};

export const MOCK_NEXT_STEPS: NextStep[] = [
  {
    id: "practice-entomology",
    title: "Practice Entomology",
    detail: "Entomology · Practice",
    done: false,
  },
  {
    id: "choose-events",
    title: "Add another event",
    detail: "My Events · keep events you want to study",
    done: false,
  },
  {
    id: "come-back",
    title: "Come back tomorrow",
    detail: "Streaks grow when you save a practice answer",
    done: false,
  },
];

export type DashboardData = {
  explorer: ExplorerProfile;
  events: ScienceEvent[];
  recommended: RecommendedAction;
  recommendedEvent: ScienceEvent | undefined;
  nextSteps: NextStep[];
};

/**
 * Single read for the homepage. When a real backend exists, this is the
 * function to reimplement (or split into parallel queries) without rewriting UI.
 */
export async function getDashboardData(): Promise<DashboardData> {
  const events = await getEvents();

  return {
    explorer: MOCK_EXPLORER,
    events,
    recommended: MOCK_RECOMMENDED,
    recommendedEvent: getEventById(events, MOCK_RECOMMENDED.eventId),
    nextSteps: MOCK_NEXT_STEPS,
  };
}
