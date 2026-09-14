/**
 * MOCK DATA — Astronomy curriculum seed
 *
 * Temporary prototype content. This is NOT an official Science Olympiad
 * test bank. Practice routing uses lib/mock/curriculum.ts. This file keeps
 * Astronomy topics and leftover helpers so existing Astronomy practice
 * and checks still resolve.
 */
import type { Topic } from "@/lib/types";

export const MOCK_ASTRONOMY_OVERVIEW =
  "Learn how the Sun, Moon, planets, and Earth's motion shape the sky we see every day.";

export const MOCK_ASTRONOMY_TOPICS: Topic[] = [
  {
    id: "sun-and-stars",
    eventId: "astronomy",
    name: "The Sun and Stars",
    shortDescription: "Meet our star, and find out why other stars look so small.",
    topicMastery: "practicing",
    progressPercent: 40,
  },
  {
    id: "the-moon",
    eventId: "astronomy",
    name: "The Moon",
    shortDescription: "See why the Moon shines and how it moves around Earth.",
    topicMastery: "learning",
    progressPercent: 15,
  },
  {
    id: "solar-system",
    eventId: "astronomy",
    name: "Planets in Our Solar System",
    shortDescription: "Name the planets and notice what makes each one special.",
    topicMastery: "learning",
    progressPercent: 10,
  },
  {
    id: "day-night-seasons",
    eventId: "astronomy",
    name: "Day, Night, and Seasons",
    shortDescription: "Connect Earth's spin and tilt to the sky you see.",
    topicMastery: "learning",
    progressPercent: 0,
  },
];
