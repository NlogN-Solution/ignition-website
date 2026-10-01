"use client";

import { motion } from "motion/react";
import {
  Award,
  Briefcase,
  ClipboardList,
  Globe,
  type LucideIcon,
  Users,
} from "lucide-react";
import { useReveal } from "../ui/motion";
import { StatPhotoCard } from "../ui/StatPhotoCard";
import { reasons, type Reason } from "@/data/study-in-uk/reasons";

/**
 * Five claims, bento-sized rather than five equal boxes — built on
 * `StatPhotoCard`, the same duotone card the homepage's `WhyUk` band uses, so
 * the two sections read as one design language rather than two.
 *
 * WHY SIZES VARY. Five reasons stacked in equal boxes claims all five carry
 * the same weight, and they don't: externally verified quality is the reason
 * that makes the other four worth believing, so it leads, wide. The other
 * four are real supporting evidence, not padding, so they stay legible —
 * just not shouting at the same volume as the lead claim.
 *
 * WHY THERE IS NO LINK. The homepage band exists to send a reader on to
 * `/universities`, `/money` and so on. This section is already the
 * destination — the whole page's job is to make the case for the UK in one
 * place — so a card here says everything it has to say and stops, in more
 * depth than the homepage band has room for, rather than ending on "learn
 * more" when the reader is already exactly where that link would send them.
 */

const icons: Record<Reason["icon"], LucideIcon> = {
  award: Award,
  users: Users,
  briefcase: Briefcase,
  clipboard: ClipboardList,
  globe: Globe,
};

/** Column span per card, keyed by id — the bento layout, not row position.
 * `quality` leads at double width with a wider photo band; the rest share
 * the remaining space evenly. */
const spans: Record<string, { col: string; imageAspect?: string }> = {
  quality: { col: "md:col-span-4", imageAspect: "aspect-[21/9]" },
  nss: { col: "md:col-span-2" },
  career: { col: "md:col-span-2" },
  learning: { col: "md:col-span-2" },
  global: { col: "md:col-span-2" },
};

export function FiveReasons({ id }: { id?: string }) {
  const { container, item } = useReveal(0.09);

  return (
    <section
      id={id}
      className="scroll-mt-[calc(var(--nav-h)_+_2rem)] bg-white px-5 py-[clamp(3rem,5vw,4.5rem)] sm:px-8 lg:px-24"
    >
      <div className="mx-auto max-w-[min(100%,720px)] text-center">
        <p className="text-[15px] font-bold uppercase tracking-[0.08em] text-blue-link">
          Why the UK
        </p>
        <h2 className="mt-[24px] text-[clamp(1.875rem,3.4vw,2.75rem)] font-bold leading-[1.12] tracking-[-0.022em] text-navy">
          Five reasons <span className="text-orange">to choose the UK.</span>
        </h2>
        <p className="mx-auto mt-[14px] max-w-[52ch] text-[15.5px] font-medium leading-[1.55] text-muted">
          Not opinion — five claims you can check for yourself, each pointing
          at the public record behind it.
        </p>
      </div>

      <motion.div
        {...container}
        className="mx-auto mt-[clamp(2.25rem,3.6vw,3.3rem)] max-w-[1240px]"
      >
        <ul className="grid grid-cols-1 gap-[22px] md:grid-cols-6">
          {reasons.map((reason) => {
            const span = spans[reason.id] ?? { col: "md:col-span-2" };
            return (
              <motion.li
                key={reason.id}
                {...item}
                className={`min-w-0 ${span.col}`}
              >
                <StatPhotoCard
                  tone={reason.tone}
                  image={reason.image}
                  icon={icons[reason.icon]}
                  stat={reason.stat}
                  statNote={reason.statNote}
                  title={reason.title}
                  body={reason.body}
                  source={reason.source}
                  imageAspect={span.imageAspect}
                />
              </motion.li>
            );
          })}
        </ul>
      </motion.div>
    </section>
  );
}
