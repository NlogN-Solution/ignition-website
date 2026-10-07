"use client";

import { motion } from "motion/react";
import { useEntrance } from "../ui/motion";
import type { ReactNode } from "react";
import { UKJourneyVisual } from "./UKJourneyVisual";

/**
 * From `lg` the whole hero is driven by one fluid unit, `--hs`, so the block
 * scales as a unit instead of only tracking viewport width. The reference was
 * captured at 1536x1024 — an unusually tall viewport — so a width-only scale
 * overflows ordinary 16:9 laptops. Capping `--hs` by height as well keeps the
 * section inside the viewport everywhere while still resolving to the
 * reference's 104px at 1536x1024. Ratios below are that reference divided by
 * 104: padding-top 110px, subtitle 22px, and so on.
 */
export function Hero({ children }: { children: ReactNode }) {
  const { container, item } = useEntrance(0.11);

  return (
    <section className="relative isolate pb-12 [--hs:clamp(2.5rem,min(8.6vw,10.3svh),6.5rem)] lg:min-h-[calc(100svh_-_var(--nav-h))] lg:pb-0">
      <motion.div
        {...container}
        className="relative z-10 px-5 pt-10 sm:px-8 sm:pt-14 lg:px-20 lg:pb-[calc(var(--hs)*0.85)] lg:pt-[calc(var(--hs)*1.06)]"
      >
        <motion.h1
          {...item}
          className="font-display text-[clamp(1.44rem,4.5vw,5.4rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-navy lg:text-[length:min(calc(var(--hs)*0.81),4.5vw)]"
        >
          Your future in the UK
          <span className="mt-[0.12em] block text-orange">
            starts here.
          </span>
        </motion.h1>

        <motion.p
          {...item}
          className="mt-[clamp(1.25rem,2.6vw,2.5rem)] max-w-[38ch] text-[clamp(0.95rem,1.31vw,1.25rem)] font-medium leading-[1.55] text-muted lg:mt-[calc(var(--hs)*0.34)] lg:text-[length:calc(var(--hs)*0.195)]"
        >
          Discover the right career, find the right course, compare UK
          universities, understand how to apply and prepare for your journey to
          the UK.
        </motion.p>

        <div className="relative mt-8 lg:mt-[calc(var(--hs)*0.4)]">
          {children}
        </div>
      </motion.div>

      <UKJourneyVisual />
    </section>
  );
}
