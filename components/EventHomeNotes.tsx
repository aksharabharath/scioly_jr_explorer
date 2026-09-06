export function EventNotebookCallout({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <aside className="journal-panel h-full rounded-3xl border-t-2 border-t-gold p-3 sm:p-4">
      <h2 className="font-display text-lg font-semibold tracking-tight text-ink">
        Field note
      </h2>
      <p className="mt-1 font-medium text-ink">{title}</p>
      <p className="mt-0.5 text-sm leading-relaxed text-stone-600">{body}</p>
    </aside>
  );
}

export function EventStrongestTopic({
  topicNames,
}: {
  topicNames: string[];
}) {
  return (
    <section
      aria-labelledby="strongest-topic-heading"
      className="journal-panel h-full rounded-3xl p-3 sm:p-4"
    >
      <h2
        id="strongest-topic-heading"
        className="font-display text-lg font-semibold tracking-tight text-ink"
      >
        Your strongest topics
      </h2>
      {topicNames.length > 0 ? (
        <ul className="mt-2 space-y-1.5">
          {topicNames.map((name) => (
            <li key={name}>
              <p className="font-display text-base font-semibold tracking-tight text-ink">
                {name}
              </p>
              <p className="text-sm text-stone-600">
                You&apos;ve been doing especially well here.
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <p className="mt-2 font-medium text-ink">Keep exploring</p>
          <p className="mt-0.5 text-sm leading-relaxed text-stone-600">
            We&apos;ll learn which topics become your strengths as you practice.
          </p>
        </>
      )}
    </section>
  );
}
