import { Accordion } from "../ui/Accordion";
import { workFaqs } from "@/data/study-in-uk/work";

/**
 * `workFaqs` already existed — `app/study-in-uk/page.tsx` feeds it to
 * `faqSchema` for the FAQPage structured data, so a search or AI answer
 * engine can quote a direct answer. No human reader ever saw the same four
 * questions, which is the gap this closes: the same vetted, sourced answers,
 * visible on the page they were written for.
 */
export function WorkFaq({ id }: { id?: string }) {
  return (
    <section
      id={id}
      className="scroll-mt-[calc(var(--nav-h)_+_2rem)] bg-white px-5 py-[clamp(3rem,5vw,4.5rem)] sm:px-8 lg:px-24"
    >
      <div className="mx-auto max-w-[720px]">
        <div className="text-center">
          <p className="text-[15px] font-bold uppercase tracking-[0.08em] text-blue-link">
            Before you ask
          </p>
          <h2 className="mt-[24px] text-[clamp(1.875rem,3.4vw,2.75rem)] font-bold leading-[1.12] tracking-[-0.022em] text-navy">
            Questions worth <span className="text-orange">asking first.</span>
          </h2>
        </div>

        <div className="mt-[clamp(2rem,3vw,2.75rem)]">
          <Accordion
            size="editorial"
            items={workFaqs.map((faq) => ({
              question: faq.question,
              answer: faq.answer,
            }))}
          />
        </div>
      </div>
    </section>
  );
}
