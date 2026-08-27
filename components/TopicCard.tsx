import { MasteryBadge } from "@/components/MasteryBadge";
import { ProgressBar } from "@/components/ProgressBar";
import type { Topic } from "@/lib/types";

type TopicCardProps = {
  topic: Topic;
};

export function TopicCard({ topic }: TopicCardProps) {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-stone-200/80 bg-surface p-5 shadow-[0_8px_30px_rgba(28,45,41,0.05)]">
      <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
        {topic.name}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-stone-600">
        {topic.shortDescription}
      </p>
      <div className="mt-4">
        <MasteryBadge status={topic.topicMastery} />
      </div>
      <div className="mt-auto pt-4">
        <div className="mb-2 flex justify-between text-xs font-medium text-stone-500">
          <span>Topic progress</span>
          <span className="tabular-nums">{topic.progressPercent}%</span>
        </div>
        <ProgressBar
          value={topic.progressPercent}
          label={`${topic.name} topic progress`}
          fillClassName="bg-indigo-500"
        />
      </div>
    </article>
  );
}

type TopicListProps = {
  topics: Topic[];
};

export function TopicList({ topics }: TopicListProps) {
  if (topics.length === 0) {
    return (
      <p className="rounded-3xl border border-dashed border-stone-300 bg-surface px-5 py-8 text-center text-stone-600">
        Topics for this event are coming soon.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {topics.map((topic) => (
        <TopicCard key={topic.id} topic={topic} />
      ))}
    </div>
  );
}
