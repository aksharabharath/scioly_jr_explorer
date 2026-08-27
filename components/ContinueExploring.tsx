import { EventIcon } from "@/components/EventIcon";
import type {
  EventAccent,
  QuestionDifficulty,
  RecommendedAction,
  ScienceEvent,
  TopicMastery,
} from "@/lib/types";

const ACCENT_STYLES: Record<EventAccent, { wrap: string; icon: string }> = {
  amber: { wrap: "bg-amber-100", icon: "text-amber-800" },
  sky: { wrap: "bg-sky-100", icon: "text-sky-800" },
  rose: { wrap: "bg-rose-100", icon: "text-rose-800" },
  emerald: { wrap: "bg-emerald-100", icon: "text-emerald-800" },
  violet: { wrap: "bg-violet-100", icon: "text-violet-800" },
  indigo: { wrap: "bg-indigo-100", icon: "text-indigo-800" },
};

const DIFFICULTY_LABEL: Record<QuestionDifficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

const MASTERY_LABEL: Record<TopicMastery, string> = {
  learning: "Learning",
  practicing: "Practicing",
  mastered: "Mastered",
};

type ContinueExploringProps = {
  event: ScienceEvent;
  recommended: RecommendedAction;
};

export function ContinueExploring({
  event,
  recommended,
}: ContinueExploringProps) {
  const accent = ACCENT_STYLES[event.accent];

  return (
    <section
      aria-labelledby="continue-exploring-heading"
      className="relative overflow-hidden rounded-3xl bg-teal-dark p-5 text-parchment shadow-[0_16px_40px_rgba(19,78,73,0.28)] sm:p-7"
    >
      <div
        className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-teal/50"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 right-16 h-40 w-40 rounded-full bg-gold/20"
        aria-hidden="true"
      />

      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
          Continue exploring
        </p>
        <h2
          id="continue-exploring-heading"
          className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {recommended.loopStage} {recommended.topicTitle}
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-parchment/85 sm:text-base">
          {recommended.reason}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          <span
            className={`inline-flex items-center gap-2 rounded-full ${accent.wrap} px-3 py-1.5 text-sm font-medium ${accent.icon}`}
          >
            <EventIcon id={event.icon} className="h-4 w-4" />
            {event.name}
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium">
            Event Level {event.eventLevel}
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium">
            Mastery: {MASTERY_LABEL[event.topicMastery]}
          </span>
          <span className="rounded-full bg-gold/20 px-3 py-1.5 text-sm font-medium text-gold">
            {DIFFICULTY_LABEL[recommended.difficulty]}
          </span>
        </div>

        <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-parchment px-5 py-2.5 text-sm font-semibold text-teal-dark">
          Recommended next action
          <span aria-hidden="true">→</span>
        </p>
      </div>
    </section>
  );
}
