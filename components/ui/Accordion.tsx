import { ChevronDown, Plus } from "lucide-react";

/**
 * Built on native <details>/<summary>: it is keyboard accessible and works
 * before hydration, which matters on the long guidance pages where most of
 * the content lives inside these. The panel glides open through the
 * `.details-reveal` rule in globals.css rather than through JavaScript, so
 * none of that is given up for the animation; browsers without
 * `::details-content` open instantly, as this always used to.
 *
 * `size="editorial"` is the treatment for a page where the questions are a
 * section in their own right rather than a footnote — larger type, more room
 * per row, and a plus that rotates into a minus.
 */
export type AccordionItem = { question: string; answer: string };

export function Accordion({
  items,
  size = "default",
}: {
  items: AccordionItem[];
  size?: "default" | "editorial";
}) {
  const editorial = size === "editorial";

  return (
    <div className="divide-y divide-hairline overflow-hidden rounded-xl border border-hairline bg-white">
      {items.map((item) => (
        <details key={item.question} className="details-reveal group">
          <summary
            className={`flex cursor-pointer list-none items-center justify-between gap-5 transition-colors duration-200 hover:bg-canvas [&::-webkit-details-marker]:hidden ${
              editorial ? "px-5 py-[22px] sm:px-7" : "px-5 py-[18px] sm:px-6"
            }`}
          >
            <h3
              className={`font-semibold leading-[1.4] text-ink transition-colors duration-200 group-hover:text-navy group-open:text-navy ${
                editorial
                  ? "text-[16.5px] tracking-[-0.01em] sm:text-[18.5px]"
                  : "text-[16px] sm:text-[17px]"
              }`}
            >
              {item.question}
            </h3>

            {/* The editorial variant gets a plate that turns into a minus;
                everywhere else keeps the navbar's chevron, so the two hundred
                other disclosures on the site are unchanged. */}
            {editorial ? (
              <span
                aria-hidden
                className="flex size-[32px] shrink-0 items-center justify-center rounded-full border border-hairline bg-canvas text-blue-link transition-[transform,background-color,color,border-color] duration-300 group-hover:border-ring-idle group-open:rotate-45 group-open:border-navy group-open:bg-navy group-open:text-white"
              >
                <Plus size={17} strokeWidth={2.4} />
              </span>
            ) : (
              <ChevronDown
                size={18}
                strokeWidth={2.4}
                aria-hidden
                className="shrink-0 text-blue-link transition-transform duration-200 group-open:rotate-180"
              />
            )}
          </summary>

          <p
            className={`font-medium text-muted ${
              editorial
                ? "px-5 pb-[24px] pr-14 text-[15.5px] leading-[1.7] sm:px-7 sm:pr-24 sm:text-[16px]"
                : "px-5 pb-[20px] pr-12 text-[15.5px] leading-[1.65] sm:px-6 sm:pr-16"
            }`}
          >
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
