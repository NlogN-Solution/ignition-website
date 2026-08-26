import { ChevronDown } from "lucide-react";

/**
 * Built on native <details>/<summary>: it is keyboard accessible and works
 * before hydration, which matters on the long guidance pages where most of
 * the content lives inside these. The chevron is the same 200ms rotation the
 * navbar dropdown uses.
 */
export type AccordionItem = { question: string; answer: string };

export function Accordion({ items }: { items: AccordionItem[] }) {
  return (
    <div className="divide-y divide-hairline overflow-hidden rounded-xl border border-hairline bg-white">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-[18px] transition-colors duration-200 hover:bg-canvas sm:px-6 [&::-webkit-details-marker]:hidden">
            <h3 className="text-[16px] font-semibold leading-[1.4] text-ink transition-colors duration-200 group-hover:text-navy sm:text-[17px]">
              {item.question}
            </h3>
            <ChevronDown
              size={18}
              strokeWidth={2.4}
              aria-hidden
              className="shrink-0 text-blue-link transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <p className="px-5 pb-[20px] pr-12 text-[15.5px] font-medium leading-[1.65] text-muted sm:px-6 sm:pr-16">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
