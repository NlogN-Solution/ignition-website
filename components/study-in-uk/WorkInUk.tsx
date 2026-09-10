import Image from "next/image";
import { Clock, IdCard, Lightbulb, type LucideIcon, Sun, Briefcase } from "lucide-react";
import { Container } from "../ui/Container";
import type { ReasonAccent } from "@/data/study-in-uk/reasons";
import { workBanner, workCards, workFootnote, workIntro, type WorkCard } from "@/data/study-in-uk/work";
import student from "@/public/images/student-work-uk.jpg";

/**
 * "Can I work?" — a numbered rail rather than a card grid.
 *
 * The four facts here are not four independent claims the way `FiveReasons`'s
 * are; they are one sequence — work now, earn more over the break, then the
 * route that opens the day the degree ends, then the visa after that. A card
 * grid presents them as four things to pick between. A rail presents them as
 * what they are: a route, read top to bottom, each stage building on the
 * last — which is also the exact shape of the question a student (or more
 * often, a parent) is actually asking: not "can I work", but "and after?"
 *
 * The chapter labels ("While you study" / "After you graduate") mark the one
 * real seam in that route without splitting it into two separate lists — the
 * rail itself stays continuous, because Graduate Route and Skilled Worker are
 * only reachable by having done the first two.
 *
 * Every figure and its source lives in `data/study-in-uk/work.ts`, and the
 * same facts are restated as `workFaqs` for the FAQPage schema rendered on
 * `app/study-in-uk/page.tsx`, so the visible answer and the one an answer
 * engine quotes never drift apart.
 */

const cardIcons: Record<WorkCard["icon"], LucideIcon> = {
  clock: Clock,
  sun: Sun,
  passport: IdCard,
  briefcase: Briefcase,
};

const toneStyles: Record<ReasonAccent, { node: string; stat: string }> = {
  navy: { node: "bg-navy", stat: "text-navy" },
  blue: { node: "bg-blue-bright", stat: "text-blue-bright" },
  orange: { node: "bg-orange", stat: "text-orange" },
};

/** Chapter label to print above a given stage index, keyed by index. */
const chapters: Record<number, string> = {
  0: "While you study",
  2: "After you graduate",
};

export function WorkInUk({ id }: { id?: string }) {
  return (
    <section
      id={id}
      className="scroll-mt-[calc(var(--nav-h)_+_2rem)] border-t border-hairline bg-canvas py-[clamp(2.25rem,3.6vw,3.25rem)]"
    >
      <Container>
        <div className="grid items-center gap-[clamp(1.5rem,2.2vw,1.75rem)] lg:grid-cols-[1.45fr_1fr]">
          <div>
            <p className="text-[13.5px] font-bold uppercase tracking-[0.09em] text-blue-link">
              {workIntro.eyebrow}
            </p>
            <h2 className="mt-[12px] max-w-[17ch] text-[clamp(1.75rem,3.2vw,2.5rem)] font-extrabold leading-[1.15] tracking-[-0.025em] text-navy">
              Can international students work in the UK
              <span className="text-orange">?</span>
            </h2>
            <p className="mt-[14px] text-[clamp(1rem,1.3vw,1.125rem)] font-medium leading-[1.5] text-ink-soft">
              {workIntro.body}
            </p>
          </div>

          <div className="overflow-hidden rounded-[16px] shadow-[0_24px_54px_-34px_rgba(1,22,111,0.5)]">
            <Image
              src={student}
              alt={workIntro.imageAlt}
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="aspect-[625/300] w-full object-cover"
            />
          </div>
        </div>

        <ol className="relative mt-[clamp(2rem,3vw,2.75rem)] max-w-[720px]">
          {workCards.map((card, i) => {
            const last = i === workCards.length - 1;
            const Icon = cardIcons[card.icon];
            const tone = toneStyles[card.tone];
            const chapter = chapters[i];

            return (
              <li key={card.id}>
                {chapter ? (
                  <p
                    className={`mb-[14px] text-[12px] font-bold uppercase tracking-[0.12em] text-muted-light ${
                      i === 0 ? "" : "mt-[6px]"
                    }`}
                  >
                    {chapter}
                  </p>
                ) : null}

                <div className="relative flex gap-5 sm:gap-6">
                  <div className="relative flex flex-col items-center">
                    <span
                      className={`relative z-10 flex size-[46px] shrink-0 items-center justify-center rounded-full text-white shadow-[0_10px_24px_-14px_rgba(1,22,111,0.55)] ${tone.node}`}
                    >
                      <Icon size={20} strokeWidth={2} aria-hidden />
                    </span>
                    {!last ? (
                      <span aria-hidden className="w-px flex-1 bg-hairline" />
                    ) : null}
                  </div>

                  <div className={`min-w-0 flex-1 ${last ? "pb-0" : "pb-10"}`}>
                    <p
                      className={`text-[clamp(1.375rem,2vw,1.625rem)] font-bold leading-[1.15] tracking-[-0.015em] tabular-nums ${tone.stat}`}
                    >
                      {card.stat}
                    </p>
                    <p className="mt-[4px] text-[12px] font-semibold uppercase tracking-[0.08em] text-muted-light">
                      {card.statNote}
                    </p>

                    <h3 className="mt-[12px] text-[16.5px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
                      {card.title}
                    </h3>
                    <p className="mt-[7px] max-w-[58ch] text-[14.5px] font-medium leading-[1.6] text-muted">
                      {card.body}
                    </p>
                    <p className="mt-[8px] text-[12px] font-semibold leading-[1.45] text-muted-light">
                      {card.source}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-[8px] flex flex-wrap items-center gap-x-[18px] gap-y-[10px] rounded-[16px] bg-navy px-[20px] py-[16px] text-white shadow-[0_20px_44px_-26px_rgba(1,22,111,0.75)] sm:px-[22px]">
          <span
            aria-hidden
            className="flex size-[42px] shrink-0 items-center justify-center rounded-[13px] border border-white/20 bg-white/10 text-white"
          >
            <Lightbulb size={20} strokeWidth={1.9} />
          </span>
          <p className="text-[clamp(0.9375rem,1.3vw,1.125rem)] font-extrabold leading-[1.3] tracking-[-0.01em]">
            {workBanner.headline}
          </p>
          <span aria-hidden className="hidden h-[22px] w-px bg-white/25 sm:block" />
          <p className="text-[clamp(0.9375rem,1.3vw,1.125rem)] font-medium leading-[1.3] text-white/75">
            {workBanner.body}
          </p>
        </div>

        <p className="mt-[12px] text-[12.5px] font-medium leading-[1.5] text-muted">
          {workFootnote}
        </p>
      </Container>
    </section>
  );
}
