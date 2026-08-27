/**
 * Anatomy & Physiology 2027 MVP — topics and overview.
 *
 * Question text lives in anatomy-physiology-questions.ts.
 */
import { ANATOMY_PHYSIOLOGY_EVENT_ID } from "@/lib/mock/anatomy-physiology-questions";
import type { Topic } from "@/lib/types";

export const MOCK_ANATOMY_OVERVIEW =
  "Learn how the integumentary, skeletal, and muscular systems are built and how they work together.";

export const MOCK_ANATOMY_TOPICS: Topic[] = [
  {
    id: "integument-functions",
    eventId: ANATOMY_PHYSIOLOGY_EVENT_ID,
    name: "Integumentary functions",
    shortDescription: "Protection, vitamin D, temperature, and sensation.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "integument-structure",
    eventId: ANATOMY_PHYSIOLOGY_EVENT_ID,
    name: "Skin structure",
    shortDescription: "Layers, glands, receptors, and aging of the skin.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "integument-conditions",
    eventId: ANATOMY_PHYSIOLOGY_EVENT_ID,
    name: "Skin conditions",
    shortDescription: "Sourced facts about selected skin diseases and risks.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "bone-tissue",
    eventId: ANATOMY_PHYSIOLOGY_EVENT_ID,
    name: "Bone and cartilage",
    shortDescription: "Bone tissue, cartilage, and how bones grow.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "joints",
    eventId: ANATOMY_PHYSIOLOGY_EVENT_ID,
    name: "Joints",
    shortDescription: "How bones meet and how much they can move.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "skeletal-conditions",
    eventId: ANATOMY_PHYSIOLOGY_EVENT_ID,
    name: "Skeletal conditions",
    shortDescription: "Sourced facts about selected bone and joint conditions.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "muscle-physiology",
    eventId: ANATOMY_PHYSIOLOGY_EVENT_ID,
    name: "Muscle physiology",
    shortDescription: "How muscle fibers are excited and how they contract.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "muscle-types",
    eventId: ANATOMY_PHYSIOLOGY_EVENT_ID,
    name: "Muscle types",
    shortDescription: "Skeletal, cardiac, and smooth muscle.",
    topicMastery: "learning",
    progressPercent: 0,
  },
  {
    id: "listed-muscles",
    eventId: ANATOMY_PHYSIOLOGY_EVENT_ID,
    name: "Listed muscles",
    shortDescription: "Origin, insertion, and action for fully evidenced listed muscles.",
    topicMastery: "learning",
    progressPercent: 0,
  },
];
