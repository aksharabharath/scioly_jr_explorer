/**
 * Shared shapes for the Jr. Explorer UI.
 *
 * Keep Explorer Level, Event Level, and Topic Mastery as separate fields.
 * Do not fold them into one "progress" number — they mean different things.
 *
 * Today these types are filled by mock data. Later a Supabase (or other)
 * data layer can return the same shapes so pages and components stay as-is.
 */

/** Academic understanding for an event (not the same as Event Level). */
export type TopicMastery = "learning" | "practicing" | "mastered";

export type QuestionDifficulty = "easy" | "medium" | "hard";

/** Visual accent for event cards. Presentation-only; not stored as game logic. */
export type EventAccent = "amber" | "sky" | "rose" | "emerald" | "violet" | "indigo";

export type EventIconId =
  | "rock"
  | "cloud"
  | "body"
  | "bird"
  | "gear"
  | "star"
  | "water"
  | "leaf"
  | "bug"
  | "cipher"
  | "search"
  | "hover"
  | "catapult";

/** Quiz events use the practice loop. Build events do not. */
export type EventKind = "quiz" | "build";

export type ScienceEvent = {
  id: string;
  name: string;
  shortDescription: string;
  icon: EventIconId;
  accent: EventAccent;
  kind: EventKind;
  /** Progression within this event. Separate from Explorer Level. */
  eventLevel: number;
  /** Academic understanding for this event. Separate from Event Level. */
  topicMastery: TopicMastery;
  /**
   * MOCK display value (0–100). Not calculated from questions yet.
   * Later this can be derived from real attempts.
   */
  progressPercent: number;
  unlocked: boolean;
  /** Shown only when unlocked is false. */
  unlockHint?: string;
};

/** Overall journey across the product. Separate from any single event. */
export type ExplorerProfile = {
  displayName: string;
  explorerLevel: number;
  currentXp: number;
  /** Total XP required to reach the next Explorer Level. Null at Level 10. */
  xpForNextLevel: number | null;
  streakDays: number;
};

export type RecommendedAction = {
  eventId: string;
  topicTitle: string;
  difficulty: QuestionDifficulty;
  /** Core loop stage — not a fourth progression system. */
  loopStage: "Learn" | "Practice" | "Demonstrate Mastery";
  reason: string;
};

export type NextStep = {
  id: string;
  title: string;
  detail: string;
  done: boolean;
};

/** Academic unit inside an event. Topic Mastery lives here, not on Explorer Level. */
export type Topic = {
  id: string;
  eventId: string;
  name: string;
  shortDescription: string;
  topicMastery: TopicMastery;
  /**
   * MOCK display value (0–100). Not calculated from question results yet.
   */
  progressPercent: number;
};

/**
 * Question difficulty in the bank: 1 = Easy, 2 = Medium, 3 = Hard.
 * Separate from the dashboard's "easy" | "medium" | "hard" labels.
 */
export type DifficultyLevel = 1 | 2 | 3;

/**
 * Author-only live-practice eligibility. Omitted on banks that have not been
 * QA'd; those are treated as verified. Not shown in the student UI.
 */
export type QuestionVerificationStatus = "draft" | "needs-review" | "verified";

export type AnswerChoice = {
  id: string;
  text: string;
};

export type Question = {
  id: string;
  eventId: string;
  topicId: string;
  prompt: string;
  choices: AnswerChoice[];
  correctChoiceId: string;
  explanation: string;
  hint: string;
  difficulty: DifficultyLevel;
  /**
   * True when the item is written as an image question. Live practice still
   * requires a real `imageSrc` (see `isLivePracticeQuestion`).
   */
  imageRequired?: boolean;
  /** Public path for Entomology (and later events) practice images. */
  imageSrc?: string;
  /** Required when `imageSrc` is set. Read by the quiz; keep child-friendly. */
  imageAlt?: string;
  /** Student-visible credit for CC BY / CC BY-SA practice photos. */
  imageCredit?: string;
  /** Author-only. Used to decide live practice eligibility; not shown to students. */
  verificationStatus?: QuestionVerificationStatus;
};

export type PracticeSummary = {
  questionsAnswered: number;
  correctAnswers: number;
  accuracyPercent: number;
};

export type PracticeFollowUp = {
  headline: string;
  detail: string;
};
