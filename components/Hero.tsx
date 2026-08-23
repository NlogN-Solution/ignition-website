"use client";

import { motion } from "motion/react";
import { useEntrance } from "./motion";
import { ArrowButton } from "./ArrowButton";
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
          Different dreams<span className="text-orange">.</span>
          <span className="mt-[0.29em] block text-orange">
            Different journeys.
          </span>
        </motion.h1>

        <motion.p
          {...item}
          className="mt-[clamp(1.5rem,2.6vw,2.5rem)] max-w-[34ch] text-[clamp(1rem,1.43vw,1.375rem)] font-medium leading-[1.55] text-[#51556e] lg:mt-[calc(var(--hs)*0.385)] lg:text-[length:calc(var(--hs)*0.212)]"
        >
          We don&rsquo;t ask every student to follow the same path. Let&rsquo;s
          first understand yours.
        </motion.p>

        <motion.div
          {...item}
          className="mt-[clamp(1.5rem,2.4vw,2.32rem)] lg:mt-[calc(var(--hs)*0.356)]"
        >
          <ArrowButton
            href="/start"
            iconSize={21}
            className="h-[54px] w-[210px] gap-[26px] text-[17px] sm:h-[62px] sm:w-[250px] sm:text-[19px] lg:h-[calc(var(--hs)*0.654)] lg:w-[calc(var(--hs)*2.635)] lg:gap-[calc(var(--hs)*0.25)] lg:text-[length:calc(var(--hs)*0.192)]"
          >
            Begin
          </ArrowButton>
        </motion.div>
      </motion.div>

      <HeroArt />
    </section>
  );
}
