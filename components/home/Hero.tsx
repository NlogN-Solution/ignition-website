"use client";

import { motion } from "motion/react";
import { useEntrance } from "../ui/motion";
import { ArrowButton, GhostButton } from "../ui/ArrowButton";
import { HeroArt } from "./HeroArt";

/**
 * From `lg` the whole hero is driven by one fluid unit, `--hs`, so the block
 * scales as a unit instead of only tracking viewport width. The reference was
 * captured at 1536x1024 — an unusually tall viewport — so a width-only scale
 * overflows ordinary 16:9 laptops. Capping `--hs` by height as well keeps the
 * section inside the viewport everywhere while still resolving to the
 * reference's 104px at 1536x1024. Ratios below are that reference divided by
 * 104: padding-top 110px, subtitle 22px, button 68x274px, and so on.
 */
export function Hero() {
  const { container, item } = useEntrance(0.11);

  return (
    <section className="relative isolate overflow-hidden pb-12 [--hs:clamp(2.5rem,min(8.6vw,10.3svh),6.5rem)] lg:min-h-[calc(100svh_-_var(--nav-h))] lg:pb-0">
      <motion.div
        {...container}
        className="relative z-10 px-5 pt-10 sm:px-8 sm:pt-14 lg:px-20 lg:pb-[calc(var(--hs)*0.85)] lg:pt-[calc(var(--hs)*1.06)]"
      >
        <motion.h1
          {...item}
          className="max-w-[9ch] text-[clamp(2.75rem,8.6vw,6.5rem)] font-bold leading-[0.94] tracking-[-0.012em] text-navy lg:text-[length:var(--hs)]"
        >
          Everything you need
          <span className="mt-[0.29em] block text-orange">
            to study in the UK.
          </span>
        </motion.h1>

        <motion.p
          {...item}
          className="mt-[clamp(1.25rem,2.6vw,2.5rem)] max-w-[38ch] text-[clamp(0.95rem,1.31vw,1.25rem)] font-medium leading-[1.55] text-[#51556e] lg:mt-[calc(var(--hs)*0.34)] lg:text-[length:calc(var(--hs)*0.195)]"
        >
          Discover the right career, find the right course, compare UK
          universities, understand how to apply and prepare for your journey to
          the UK.
        </motion.p>

        <motion.div
          {...item}
          className="mt-[clamp(1.5rem,2.4vw,2.32rem)] flex flex-wrap items-center gap-3 sm:gap-4 lg:mt-[calc(var(--hs)*0.33)]"
        >
          <ArrowButton
            href="/start"
            iconSize={21}
            className="h-[54px] w-full gap-[20px] px-7 text-[17px] sm:h-[62px] sm:w-auto sm:text-[19px] lg:h-[calc(var(--hs)*0.654)] lg:gap-[calc(var(--hs)*0.22)] lg:px-[calc(var(--hs)*0.42)] lg:text-[length:calc(var(--hs)*0.192)]"
          >
            Start Your Journey
          </ArrowButton>
          <GhostButton
            href="/careers/quiz"
            className="h-[54px] w-full px-7 text-[17px] sm:h-[62px] sm:w-auto sm:text-[19px] lg:h-[calc(var(--hs)*0.654)] lg:px-[calc(var(--hs)*0.42)] lg:text-[length:calc(var(--hs)*0.192)]"
          >
            Take Career Quiz
          </GhostButton>
        </motion.div>
      </motion.div>

      <HeroArt />
    </section>
  );
}
