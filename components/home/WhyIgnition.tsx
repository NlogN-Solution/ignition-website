"use client";

import { Clock, ShieldCheck, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { Card } from "../ui/Card";
import { useReveal } from "../ui/motion";
import { trustStats, type TrustStat } from "@/data/home/trust";

/**
 * Two big numbers rather than a paragraph, because a claim like "99% visa
 * success" is undermined rather than supported by surrounding prose — the
 * figure is the whole argument, and a reader either believes a clearly
 * stated number or doesn't. `Card` (white, hairline border) rather than the
 * saturated duotone treatment above: that treatment says "here is a fact
 * about the UK", this section says "here is a fact about us", and the two
 * should not look like the same kind of claim.
 */
const icons: Record<TrustStat["icon"], LucideIcon> = {
  shield: ShieldCheck,
  clock: Clock,
};

export function WhyIgnition() {
  const { container, item } = useReveal(0.1);

  return (
    <motion.ul {...container} className="grid gap-5 sm:grid-cols-2">
      {trustStats.map((entry) => {
        const Icon = icons[entry.icon];

        return (
          <motion.li key={entry.id} {...item}>
            <Card className="h-full p-6 sm:p-7">
              <span
                aria-hidden
                className="flex size-[52px] items-center justify-center rounded-2xl bg-navy/[0.06] text-navy"
              >
                <Icon size={24} strokeWidth={2} />
              </span>

              <p className="mt-5 flex flex-wrap items-baseline gap-x-[10px] text-[clamp(2rem,3.4vw,2.75rem)] font-extrabold leading-none tracking-[-0.02em] text-navy">
                {entry.stat}
                {entry.statNote ? (
                  <span className="text-[15px] font-semibold text-muted-light">
                    {entry.statNote}
                  </span>
                ) : null}
              </p>

              <p className="mt-[10px] text-[13px] font-bold uppercase tracking-[0.08em] text-blue-link">
                {entry.label}
              </p>

              <p className="mt-[14px] text-[15px] font-medium leading-[1.6] text-muted">
                {entry.body}
              </p>
            </Card>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
