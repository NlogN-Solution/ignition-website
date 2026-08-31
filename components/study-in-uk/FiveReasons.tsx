"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Award,
  Briefcase,
  ClipboardList,
  Globe,
  type LucideIcon,
  Users,
} from "lucide-react";
import { useReveal } from "../ui/motion";
import { reasons, type Reason, type ReasonAccent } from "@/data/study-in-uk/reasons";

/**
 * Five claims, three over two.
 *
 * WHY THE SECOND ROW IS NARROWER. Five things do not divide into a grid.
 * Three-then-two is the honest split, but two cards stretched across the same
 * track as three above them read as a different, more important pair. Insetting
 * the lower row by a card's own padding and widening its gutter keeps the two
 * rows reading as one set of five while still letting the eye know the row
 * ended early on purpose rather than by accident.
 *
 * COLOUR IS THE INDEX. Each card's tint, numeral, icon and link share one
 * accent, so the five are told apart by hue before they are read. The tints
 * are a few per cent of the accent over white — enough to separate the cards
 * from the canvas, not enough to compete with the photograph above them.
 */

const icons: Record<Reason["icon"], LucideIcon> = {
  award: Award,
  users: Users,
  briefcase: Briefcase,
  clipboard: ClipboardList,
  globe: Globe,
};

/** Every accent-dependent class, resolved up front — Tailwind cannot see a
    class name that is assembled from a variable at runtime. */
const accents: Record<
  ReasonAccent,
  { card: string; text: string; icon: string }
> = {
  blue: {
    card: "border-blue-link/[0.09] bg-[linear-gradient(150deg,#f2f5fd_0%,#f8fafe_58%,#f4f7fd_100%)]",
    text: "text-blue-link",
    icon: "text-blue-link",
  },
  orange: {
    card: "border-orange/[0.11] bg-[linear-gradient(150deg,#fef5f0_0%,#fefaf8_58%,#fef7f4_100%)]",
    text: "text-orange",
    icon: "text-orange",
  },
  emerald: {
    card: "border-emerald/[0.11] bg-[linear-gradient(150deg,#f1faf5_0%,#f8fcfa_58%,#f4fbf7_100%)]",
    text: "text-emerald",
    icon: "text-emerald",
  },
  violet: {
    card: "border-violet/[0.09] bg-[linear-gradient(150deg,#f5f3fd_0%,#faf9fe_58%,#f6f5fd_100%)]",
    text: "text-violet",
    icon: "text-violet",
  },
};

function ReasonCard({ reason, index }: { reason: Reason; index: number }) {
  const Icon = icons[reason.icon];
  const accent = accents[reason.accent];

  return (
    <div
      className={`flex h-full flex-col rounded-[22px] border p-[30px] ${accent.card}`}
    >
      <div className="flex items-center gap-[28px]">
        <span
          aria-hidden
          className={`flex size-[64px] shrink-0 items-center justify-center rounded-2xl bg-white shadow-[0_10px_24px_-12px_rgba(1,22,111,0.28)] ${accent.icon}`}
        >
          <Icon size={27} strokeWidth={1.9} />
        </span>
        <span
          className={`text-[30px] font-bold leading-none tabular-nums ${accent.text}`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-[28px] text-[clamp(1.1875rem,1.62vw,1.40625rem)] font-bold leading-[1.25] tracking-[-0.015em] text-navy">
        {reason.title}
      </h3>

      {/* The measure is capped rather than left to the card, so the two
          wider cards in the lower row set the same number of words to a line
          as the three above them. Without it the pair below reads as a
          different, looser voice than the trio above. */}
      <p className="mt-[16px] max-w-[318px] text-[15.5px] font-medium leading-[1.68] text-muted">
        {reason.body}
      </p>

      <Link
        href={reason.link.href}
        className={`group mt-auto inline-flex w-fit items-center gap-[11px] pt-[26px] text-[15px] font-semibold ${accent.text}`}
      >
        {reason.link.label}
        <ArrowRight
          size={17}
          strokeWidth={2.3}
          aria-hidden
          className="shrink-0 transition-transform duration-200 group-hover:translate-x-[3px]"
        />
      </Link>
    </div>
  );
}

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
          {top.map((reason, i) => (
            <motion.li key={reason.id} {...item} className="min-w-0">
              <ReasonCard reason={reason} index={i} />
            </motion.li>
          ))}
        </ul>

        <ul className="mt-[26px] grid gap-[30px] sm:grid-cols-2 lg:mx-[27px]">
          {bottom.map((reason, i) => (
            <motion.li key={reason.id} {...item} className="min-w-0">
              <ReasonCard reason={reason} index={i + top.length} />
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
