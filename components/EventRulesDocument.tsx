import type { RulesSection } from "@/lib/event-rules";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type EventRulesDocumentProps = {
  sections: RulesSection[];
};

const components: Components = {
  h1: ({ children }) => (
    <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
      {children}
    </h3>
  ),
  h2: ({ children }) => (
    <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
      {children}
    </h3>
  ),
  h3: ({ children }) => (
    <h4 className="font-display text-base font-semibold tracking-tight text-ink">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="text-sm leading-relaxed text-ink sm:text-base">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-ink">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  ul: ({ children }) => (
    <ul className="my-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink sm:text-base">
      {children}
    </ul>
  ),
  ol: ({ children, start }) => (
    <ol
      start={start}
      className="my-2 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-ink sm:text-base"
    >
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-0.5">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-stone-300 pl-3 text-sm leading-relaxed text-ink">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-stone-200" />,
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-medium text-teal underline-offset-4 hover:underline"
    >
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="my-3 overflow-x-auto">
      <table className="min-w-full border-collapse text-left text-sm text-ink">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-parchment/80">{children}</thead>
  ),
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b border-stone-200/80">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="px-2.5 py-2 align-top font-semibold text-ink">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-2.5 py-2 align-top text-ink">{children}</td>
  ),
  code: ({ children }) => (
    <code className="rounded bg-parchment px-1 py-0.5 font-mono text-[0.85em]">
      {children}
    </code>
  ),
};

export function EventRulesDocument({ sections }: EventRulesDocumentProps) {
  return (
    <div className="mt-5 space-y-4">
      {sections.map((section, index) => (
        <section
          key={`${section.heading ?? "intro"}-${index}`}
          className="journal-panel rounded-3xl p-4 sm:p-5"
        >
          {section.heading ? (
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
              {section.heading}
            </h2>
          ) : null}
          {section.markdown ? (
            <div className={section.heading ? "mt-3 space-y-3" : "space-y-3"}>
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                {section.markdown}
              </ReactMarkdown>
            </div>
          ) : null}
        </section>
      ))}
    </div>
  );
}
