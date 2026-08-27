import type { TopicMastery } from "@/lib/types";

export const MASTERY_LABEL: Record<TopicMastery, string> = {
  learning: "Learning",
  practicing: "Practicing",
  mastered: "Mastered",
};

const MASTERY_STYLES: Record<TopicMastery, string> = {
  learning: "bg-sky-100 text-sky-800",
  practicing: "bg-amber-100 text-amber-900",
  mastered: "bg-emerald-100 text-emerald-800",
};

type MasteryBadgeProps = {
  status: TopicMastery;
};

export function MasteryBadge({ status }: MasteryBadgeProps) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${MASTERY_STYLES[status]}`}
    >
      Mastery: {MASTERY_LABEL[status]}
    </span>
  );
}
