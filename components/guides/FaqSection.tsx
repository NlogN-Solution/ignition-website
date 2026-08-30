import Link from "next/link";
import { ArrowRight, MessagesSquare } from "lucide-react";
import { Container } from "../ui/Container";
import { AccentText } from "../ui/AccentText";
import { Accordion, type AccordionItem } from "../ui/Accordion";

/**
 * Questions as a section rather than a strip at the foot of the page.
 *
 * The heading sits in its own column with the way out underneath it, which
 * does two things: it gives the questions the width to be read as prose, and
 * it puts "ask us instead" next to the heading rather than after five
 * accordions the reader may never open.
 */
export function FaqSection({
  id,
  items,
}: {
  id: string;
  items: AccordionItem[];
}) {
  return (
    <section
      id={id}
      className="scroll-mt-[calc(var(--nav-h)_+_4.5rem)] py-[clamp(2.75rem,4.5vw,4.5rem)]"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-14">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)_+_5rem)] lg:self-start">
            <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-blue-link">
              Answers
            </p>
            <h2 className="mt-3 text-[clamp(1.625rem,2.8vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-navy">
              <AccentText>Common questions</AccentText>
            </h2>
            <p className="mt-4 max-w-[42ch] text-[16px] font-medium leading-[1.6] text-muted">
              The five things students ask most often about the UK system, and
              the honest answer to each.
            </p>

            <div className="mt-7 rounded-xl border border-hairline bg-white p-5">
              <MessagesSquare
                size={19}
                strokeWidth={2}
                aria-hidden
                className="text-blue-link"
              />
              <p className="mt-3 text-[15px] font-bold leading-[1.35] tracking-[-0.01em] text-navy">
                Still not sure whether the UK is right for you?
              </p>
              <p className="mt-[6px] text-[14px] font-medium leading-[1.55] text-muted">
                Start from where you actually are, and work forward from there.
              </p>

              <Link
                href="/start"
                className="group mt-4 inline-flex items-center gap-[8px] text-[14.5px] font-bold text-blue-link transition-colors duration-200 hover:text-navy"
              >
                Find your starting point
                <ArrowRight
                  size={15}
                  strokeWidth={2.4}
                  aria-hidden
                  className="shrink-0 transition-transform duration-200 group-hover:translate-x-[3px]"
                />
              </Link>
            </div>
          </div>

          <Accordion items={items} size="editorial" />
        </div>
      </Container>
    </section>
  );
}
