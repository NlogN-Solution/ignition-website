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
 * Five claims, three over two — built on `StatPhotoCard`, the same duotone
 * card the homepage's `WhyUk` band uses, so the two sections read as one
 * design language rather than two.
 *
 * WHY THE SECOND ROW IS NARROWER. Five things do not divide into a grid.
 * Three-then-two is the honest split, but two cards stretched across the same
 * track as three above them read as a different, more important pair. Insetting
 * the lower row by a card's own padding and widening its gutter keeps the two
 * rows reading as one set of five while still letting the eye know the row
 * ended early on purpose rather than by accident.
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

export function FiveReasons({ id }: { id?: string }) {
  const { container, item } = useReveal(0.09);
  const [top, bottom] = [reasons.slice(0, 3), reasons.slice(3)];

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
      </div>

      <motion.div {...container} className="mt-[clamp(2.25rem,3.6vw,3.3rem)]">
        <ul className="grid gap-[26px] md:grid-cols-3">
          {top.map((reason) => (
            <motion.li key={reason.id} {...item} className="min-w-0">
              <StatPhotoCard
                tone={reason.tone}
                image={reason.image}
                icon={icons[reason.icon]}
                stat={reason.stat}
                statNote={reason.statNote}
                title={reason.title}
                body={reason.body}
                source={reason.source}
              />
            </motion.li>
          ))}
        </ul>

        <ul className="mt-[26px] grid gap-[26px] sm:grid-cols-2 lg:mx-[27px]">
          {bottom.map((reason) => (
            <motion.li key={reason.id} {...item} className="min-w-0">
              <StatPhotoCard
                tone={reason.tone}
                image={reason.image}
                icon={icons[reason.icon]}
                stat={reason.stat}
                statNote={reason.statNote}
                title={reason.title}
                body={reason.body}
                source={reason.source}
              />
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
