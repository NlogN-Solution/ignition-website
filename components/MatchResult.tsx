"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Briefcase, ChevronRight, Landmark, TrendingUp } from "lucide-react";
import { ArrowButton } from "./ArrowButton";
import { useEntrance } from "./motion";
import berlin from "@/public/images/berlin.png";
import swoosh from "@/public/images/swoosh.png";

const highlights = [
  { label: "Public Universities", Icon: Landmark },
  { label: "High ROI", Icon: TrendingUp },
  { label: "Strong Engineering Opportunities", Icon: Briefcase },
];

export function MatchResult() {
  const { container, item } = useEntrance(0.09);

  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={swoosh}
        alt=""
        sizes="288px"
        className="pointer-events-none absolute -right-16 bottom-0 -z-10 h-[55%] w-auto select-none opacity-60 sm:-right-8 sm:h-[70%] lg:right-0 lg:bottom-auto lg:top-[10px] lg:h-[calc(100%_-_10px)] lg:opacity-90"
      />

      <motion.div
        {...container}
        className="px-5 pb-16 pt-8 text-center sm:px-8 lg:pb-20 lg:pt-[16px]"
      >
        <motion.h1
          {...item}
          className="font-bold mx-auto max-w-[10.5em] text-[clamp(2.15rem,4.32vw,4.32rem)] leading-[1.045] tracking-[-0.022em] text-navy"
        >
          Germany <span className="text-orange">looks like</span> your strongest
          match<span className="text-orange">.</span>
        </motion.h1>

        <motion.p
          {...item}
          className="mt-[clamp(0.8rem,0.66vw,0.66rem)] text-[clamp(0.95rem,1.14vw,1.14rem)] font-medium text-muted"
        >
          Based on your goals, budget and academic profile.
        </motion.p>

        <motion.div
          {...item}
          className="mx-auto mt-8 w-full max-w-[1072px] lg:mt-[0.23vw]"
        >
          <Image
            src={berlin}
            alt="Berlin skyline with the cathedral, TV tower and the Reichstag"
            priority
            sizes="(max-width: 1100px) 100vw, 1072px"
            className="h-auto w-full"
          />
        </motion.div>

        <motion.ul
          {...item}
          className="mx-auto mt-8 flex max-w-[1120px] flex-wrap items-center justify-center gap-x-[clamp(1.5rem,6.19vw,6.19rem)] gap-y-4 lg:mt-[calc(var(--hs)*0.08)] lg:gap-x-[calc(var(--hs)*1.43)]"
        >
          {highlights.map(({ label, Icon }, i) => (
            <li
              key={label}
              className="flex items-center gap-[clamp(0.9rem,1.5vw,1.5rem)]"
            >
              {i > 0 ? (
                <span aria-hidden className="h-8 w-px bg-hairline" />
              ) : null}
              <span className="relative shrink-0 text-navy">
                <Icon className="size-[calc(var(--hs)*0.478)]" strokeWidth={1.55} aria-hidden />
                <span
                  aria-hidden
                  className="absolute -right-[1px] bottom-[6px] size-[6px] rounded-full bg-orange"
                />
              </span>
              <span className="text-[clamp(0.875rem,0.94vw,0.94rem)] font-medium text-[#5b5e79] lg:text-[length:calc(var(--hs)*0.217)]">
                {label}
              </span>
            </li>
          ))}
        </motion.ul>

        <motion.div {...item} className="mt-[clamp(1.75rem,2.7vw,2.7rem)] lg:mt-[calc(var(--hs)*0.625)]">
          <ArrowButton
            href="/discover"
            iconSize={20}
            arrowClassName="text-orange"
            className="h-[52px] w-full max-w-[377px] gap-[22px] text-[17px] sm:w-[377px] lg:h-[calc(var(--hs)*0.81)] lg:w-[calc(var(--hs)*5.456)] lg:max-w-none lg:text-[length:calc(var(--hs)*0.29)]"
          >
            Explore Your Universities
          </ArrowButton>
        </motion.div>

        <motion.p {...item} className="mt-[clamp(0.7rem,0.81vw,0.81rem)] lg:mt-[calc(var(--hs)*0.188)]">
          <Link
            href="/discover"
            className="group inline-flex items-center gap-[13px] text-[clamp(0.8rem,0.87vw,0.87rem)] font-bold text-blue-link transition-colors hover:text-navy lg:text-[length:calc(var(--hs)*0.201)]"
          >
            See why we recommended Germany
            <ChevronRight
              size={15}
              strokeWidth={2.5}
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-[3px]"
            />
          </Link>
        </motion.p>

        <motion.div
          {...item}
          className="mt-[clamp(1.25rem,1.65vw,1.65rem)] flex items-center justify-center gap-[clamp(0.75rem,1.3vw,1.3rem)] lg:mt-[calc(var(--hs)*0.382)]"
        >
          <span className="relative shrink-0 text-blue-link">
            <ShieldCheck />
          </span>
          <p className="text-left text-[clamp(0.75rem,0.82vw,0.82rem)] font-medium leading-[1.45] text-[#777990] lg:text-[length:calc(var(--hs)*0.19)]">
            Your profile has been saved.
            <br />
            You can continue anytime.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

/** Blue shield with the orange tick used beside the saved-profile note. */
function ShieldCheck() {
  return (
    <svg
      width="23"
      height="27"
      viewBox="0 0 24 28"
      fill="none"
      aria-hidden
      className="block"
    >
      <path
        d="M12 1.2 2.4 5.1v8.3c0 6.1 4 11 9.6 13.4 5.6-2.4 9.6-7.3 9.6-13.4V5.1L12 1.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="m7.9 13.6 2.9 3.1 5.4-6"
        stroke="var(--color-orange)"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
