import Image from "next/image";
import { Clock, IdCard, Lightbulb, type LucideIcon, Sun, Briefcase } from "lucide-react";
import { StatPhotoCard } from "../ui/StatPhotoCard";
import { workBanner, workCards, workFootnote, workIntro, type WorkCard } from "@/data/study-in-uk/work";
import student from "@/public/images/student-work-uk.jpg";

/**
 * "Can I work?" — built on `StatPhotoCard`, the same duotone card
 * `FiveReasons` and the homepage's `WhyUk` band use, so this answer reads as
 * part of the same design rather than a different section bolted on.
 *
 * Four cards rather than the original three: term-time work and vacation
 * work answer "can I work while studying", and the Graduate Route and
 * Skilled Worker cards answer the question that follows it unprompted — "and
 * after?" — which is the one a student planning five years ahead actually
 * needs. Every figure and its source lives in `data/study-in-uk/work.ts`,
 * and the same facts are restated as `workFaqs` for the FAQPage schema
 * rendered on `app/study-in-uk/page.tsx`, so the visible answer and the one
 * an answer engine quotes never drift apart.
 */

const cardIcons: Record<WorkCard["icon"], LucideIcon> = {
  clock: Clock,
  sun: Sun,
  passport: IdCard,
  briefcase: Briefcase,
};

export function WorkInUk({ id }: { id?: string }) {
  return (
    <section
      id={id}
      className="scroll-mt-[calc(var(--nav-h)_+_2rem)] bg-white px-5 py-[clamp(3rem,5vw,4.5rem)] sm:px-8 lg:px-12"
    >
      <div className="mx-auto w-full max-w-[1240px]">
        <div className="grid items-center gap-[clamp(1.75rem,2.5vw,1.75rem)] lg:grid-cols-[1.45fr_1fr]">
          <div>
            <p className="text-[15px] font-bold uppercase tracking-[0.09em] text-blue-link">
              {workIntro.eyebrow}
            </p>
            <h2 className="mt-[18px] max-w-[17ch] text-[clamp(2rem,4.2vw,3.25rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-navy">
              Can international students work in the UK
              <span className="text-orange">?</span>
            </h2>
            <p className="mt-[22px] text-[clamp(1.0625rem,1.68vw,1.46875rem)] font-medium leading-[1.42] text-[#2b3160]">
              {workIntro.body}
            </p>
          </div>

          <div className="overflow-hidden rounded-[18px] shadow-[0_24px_54px_-34px_rgba(1,22,111,0.5)]">
            <Image
              src={student}
              alt={workIntro.imageAlt}
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="aspect-[625/366] w-full object-cover"
            />
          </div>
        </div>

        <ul className="mt-[clamp(1.75rem,3vw,2.5rem)] grid grid-cols-1 gap-[22px] sm:grid-cols-2">
          {workCards.map((card) => (
            <li key={card.id} className="min-w-0">
              <StatPhotoCard
                tone={card.tone}
                image={card.image}
                icon={cardIcons[card.icon]}
                stat={card.stat}
                statNote={card.statNote}
                title={card.title}
                body={card.body}
                source={card.source}
                imageAspect="aspect-square sm:aspect-[4/3]"
                rounded="rounded-2xl"
                imageSizes="(min-width: 640px) 50vw, 100vw"
              />
            </li>
          ))}
        </ul>

        <div className="mt-[22px] flex flex-wrap items-center gap-x-[22px] gap-y-[14px] rounded-[18px] bg-navy px-[24px] py-[22px] text-white shadow-[0_20px_44px_-26px_rgba(1,22,111,0.75)] sm:px-[26px]">
          <span
            aria-hidden
            className="flex size-[52px] shrink-0 items-center justify-center rounded-[15px] border border-white/20 bg-white/10 text-white"
          >
            <Lightbulb size={26} strokeWidth={1.9} />
          </span>
          <p className="text-[clamp(1.0625rem,1.72vw,1.5rem)] font-extrabold leading-[1.3] tracking-[-0.015em]">
            {workBanner.headline}
          </p>
          <span aria-hidden className="hidden h-[26px] w-px bg-white/25 sm:block" />
          <p className="text-[clamp(1.0625rem,1.72vw,1.5rem)] font-medium leading-[1.3] text-white/75">
            {workBanner.body}
          </p>
        </div>

        <p className="mt-[16px] text-[clamp(0.8125rem,0.95vw,0.9375rem)] font-medium leading-[1.5] text-[#3f456e]">
          {workFootnote}
        </p>
      </div>
    </section>
  );
}
