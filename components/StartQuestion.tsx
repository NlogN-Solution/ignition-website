"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useEntrance } from "./motion";
import { ArrowButton } from "./ArrowButton";
import { RadioOption } from "./RadioOption";
import { startOptions } from "@/lib/quiz";

/**
 * Like the hero, the desktop rhythm hangs off one height-aware unit so the
 * question always sits inside the viewport. Ratios are the 1600x900 reference
 * divided by its 104px headline.
 */
export function StartQuestion() {
  const [picked, setPicked] = useState(startOptions.length - 1);
  const { container, item } = useEntrance(0.07);

  return (
    <motion.section
      {...container}
      className="px-5 pb-20 pt-8 text-center [--hs:clamp(2.25rem,min(6.5vw,11.5svh),6.5rem)] sm:px-8 lg:pb-[calc(var(--hs)*0.5)] lg:pt-[calc(var(--hs)*0.385)]"
    >
      <motion.h1
        {...item}
        className="mx-auto max-w-[5.7em] text-[clamp(2.75rem,6.5vw,6.5rem)] font-bold leading-[0.98] tracking-[-0.02em] text-navy lg:text-[length:var(--hs)]"
      >
        Where are you today<span className="text-orange">?</span>
      </motion.h1>

      <motion.p
        {...item}
        className="mx-auto mt-[clamp(0.9rem,1.4vw,1.4rem)] max-w-[30ch] text-[clamp(1rem,1.16vw,1.16rem)] font-medium leading-[1.5] text-[#686b85] lg:mt-[calc(var(--hs)*0.215)] lg:text-[length:calc(var(--hs)*0.179)]"
      >
        It takes about 60 seconds.
        <br />
        We&rsquo;ll guide the rest.
      </motion.p>

      <fieldset className="mx-auto mt-[clamp(1.5rem,1.65vw,1.65rem)] w-fit lg:mt-[calc(var(--hs)*0.254)]">
        <legend className="sr-only">Where are you today?</legend>
        <div className="flex flex-col items-start gap-[clamp(0.75rem,1.2vw,1.2rem)] lg:gap-[calc(var(--hs)*0.185)]">
          {startOptions.map((option, i) => (
            <motion.div key={option} {...item}>
              <RadioOption
                name="starting-point"
                label={option}
                selected={picked === i}
                onSelect={() => setPicked(i)}
                tone="quiet"
                ringClassName="size-[clamp(20px,1.7vw,27px)] lg:size-[calc(var(--hs)*0.26)]"
                className="gap-[clamp(1rem,2vw,2rem)] text-[clamp(1.375rem,2.06vw,2.06rem)] font-semibold lg:gap-[calc(var(--hs)*0.308)] lg:text-[length:calc(var(--hs)*0.317)]"
              />
            </motion.div>
          ))}
        </div>
      </fieldset>

      <motion.div
        {...item}
        className="mt-[clamp(1.75rem,2.25vw,2.25rem)] lg:mt-[calc(var(--hs)*0.346)]"
      >
        <ArrowButton
          href="/discover"
          iconSize={22}
          className="h-[56px] w-[220px] gap-[26px] text-[18px] lg:h-[calc(var(--hs)*0.692)] lg:w-[calc(var(--hs)*2.606)] lg:gap-[calc(var(--hs)*0.25)] lg:text-[length:calc(var(--hs)*0.212)]"
        >
          Continue
        </ArrowButton>
      </motion.div>
    </motion.section>
  );
}
