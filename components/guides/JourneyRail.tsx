"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Compass,
  FileSignature,
  Landmark,
  type LucideIcon,
  Plane,
} from "lucide-react";
import { useReveal } from "../ui/motion";
import { journeyPhases, stagesIn } from "@/data/journey/pipeline";

/**
 * The same four phases the homepage shows, drawn as a route rather than a row
 * of panels.
 *
 * WHY NOT REUSE `JourneyPipeline`. It is the homepage's treatment and it is
 * right there: four tall cards, ending on the arrival photograph, sized to
 * hold the whole product on one screen. Repeating it verbatim halfway down a
 * long guide makes the guide look like the homepage with more text. Here the
 * job is different — the reader has just learned how the system works and
 * wants to see where they are in it — so the rail itself is the object, the
 * nodes sit on it, and the stage links hang underneath.
 *
 * The rail is dotted rather than solid: a solid line reads as progress
 * already made, and none of it has been.
 *
 * Below `lg` it turns through ninety degrees into a vertical timeline. That is
 * a genuinely different layout rather than a narrower copy — four columns at
 * phone width would give each phase about eighty pixels, which is not enough
 * for a stage list.
 */

const icons: Record<string, LucideIcon> = {
  explore: Compass,
  decide: Landmark,
  apply: FileSignature,
  arrive: Plane,
};

export function JourneyRail({ id }: { id: string }) {
  const { container, item } = useReveal(0.12);

  return (
    <section
      id={id}
      className="scroll-mt-[calc(var(--nav-h)_+_4.5rem)] border-y border-hairline bg-white py-[clamp(2.75rem,4.5vw,4.5rem)]"
    >
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[60ch] text-center">
          <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-blue-link">
            End to end
          </p>
          <h2 className="mt-3 text-[clamp(1.625rem,2.8vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-navy">
            The whole journey
          </h2>
          <p className="mt-4 text-[16px] font-medium leading-[1.6] text-muted">
            Every stage connects to the next. You do not need to think about
            the visa while you are still choosing a subject — but it helps to
            know the shape of what is ahead.
          </p>
        </div>

        <motion.ol {...container} className="relative mt-12 grid gap-10 lg:grid-cols-4 lg:gap-6">
          {/* The rail. Horizontal behind the four nodes on wide screens, a
              vertical spine down the left of the stack below that. Decorative,
              so it is out of the accessibility tree — the ordered list carries
              the sequence. */}
          <span
            aria-hidden
            className="absolute left-[27px] top-2 h-[calc(100%-1rem)] w-px border-l border-dashed border-ring-idle lg:left-0 lg:top-[27px] lg:h-px lg:w-full lg:border-l-0 lg:border-t"
          />

          {journeyPhases.map((phase, i) => {
            const Icon = icons[phase.id] ?? Compass;
            const last = i === journeyPhases.length - 1;

            return (
              <motion.li
                key={phase.id}
                {...item}
                className="relative flex min-w-0 gap-5 lg:block lg:gap-0"
              >
                <span
                  aria-hidden
                  className={`relative z-10 flex size-[54px] shrink-0 items-center justify-center rounded-full border bg-white shadow-[0_12px_28px_-18px_rgba(1,22,111,0.55)] lg:mx-auto ${
                    last
                      ? "border-orange/25 text-orange"
                      : "border-hairline text-blue-link"
                  }`}
                >
                  <Icon size={21} strokeWidth={1.9} />
                </span>

                <div className="min-w-0 flex-1 lg:mt-5 lg:text-center">
                  <p className="flex items-baseline gap-[9px] lg:justify-center">
                    <span
                      className={`text-[13px] font-bold tabular-nums ${
                        last ? "text-orange" : "text-faint"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[17px] font-bold leading-[1.2] tracking-[-0.015em] text-navy">
                      {phase.label}
                    </span>
                  </p>

                  <p className="mt-[7px] text-[14.5px] font-medium leading-[1.55] text-muted lg:mx-auto lg:max-w-[30ch]">
                    {phase.summary}
                  </p>

                  <ul className="mt-4 space-y-[2px] rounded-xl border border-hairline bg-canvas p-[7px] lg:text-left">
                    {stagesIn(phase).map((stage) => (
                      <li key={stage.label}>
                        <Link
                          href={stage.href}
                          className="group flex items-center gap-[10px] rounded-lg px-[9px] py-[8px] transition-colors duration-200 hover:bg-white"
                        >
                          <span
                            aria-hidden
                            className="shrink-0 text-[12px] font-bold tabular-nums text-faint transition-colors duration-200 group-hover:text-orange"
                          >
                            {String(stage.index + 1).padStart(2, "0")}
                          </span>
                          <span className="min-w-0 flex-1 text-[14px] font-semibold leading-[1.3] text-navy transition-colors duration-200 group-hover:text-blue-link">
                            {stage.label}
                          </span>
                          <ArrowRight
                            size={14}
                            strokeWidth={2.4}
                            aria-hidden
                            className="shrink-0 text-faint transition-[transform,color] duration-200 group-hover:translate-x-[3px] group-hover:text-blue-link"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}
