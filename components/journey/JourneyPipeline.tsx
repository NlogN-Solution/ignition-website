"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useReveal } from "../ui/motion";
import { journeyPhases, stagesIn } from "@/data/journey/pipeline";
import skyline from "@/public/images/skyline-panel.jpg";

/**
 * The whole product as a route rather than a list.
 *
 * The previous treatment laid the ten stages out as ten equal cells, which is
 * an accurate list and a poor map: it tells a student the journey has ten
 * steps without telling them where any of them sit. Here they are grouped into
 * the four things a student is actually doing — explore, decide, apply, arrive
 * — and a rail runs through the whole row, shifting navy → blue → orange so
 * the colour itself carries the progression. It is the hero's path, continued
 * down the page.
 *
 * The route ends somewhere: the final panel is the arrival image, so "Start
 * life in the UK" is a destination you can see rather than the tenth item in
 * a grid.
 */
export function JourneyPipeline() {
  const { container, item } = useReveal(0.07);

  return (
    <motion.div {...container}>
      {/* The rail. Decorative on its own, so it is hidden from the tree — the
          ordered list below carries the actual sequence. */}
      <div aria-hidden className="relative mb-8 hidden lg:block">
        <div className="h-[3px] w-full rounded-full bg-[linear-gradient(to_right,var(--color-navy),var(--color-blue-bright)_46%,var(--color-orange))]" />
        <div className="grid grid-cols-4">
          {journeyPhases.map((phase) => (
            <div key={phase.id} className="relative">
              <span className="absolute -top-[7px] size-[11px] rounded-full border-[3px] border-canvas bg-navy" />
            </div>
          ))}
        </div>
        {/* The terminus sits at the end of the rail, not at the start of the
            last column — the orange marks arriving, not departing. */}
        <span className="absolute -top-[4px] right-0 size-[13px] rounded-full border-[3px] border-canvas bg-orange" />
      </div>

      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {journeyPhases.map((phase, phaseIndex) => {
          const last = phaseIndex === journeyPhases.length - 1;

          return (
            <motion.li key={phase.id} {...item} className="min-w-0">
              <div
                className={`relative isolate flex h-full flex-col overflow-hidden rounded-xl border shadow-[0_18px_40px_-28px_rgba(1,22,111,0.28)] ${
                  last ? "border-navy bg-navy" : "border-hairline bg-white"
                }`}
              >
                {/* The route arrives somewhere you can see. Cropped to the
                    left of the plate, which is the London end of the skyline. */}
                {last ? (
                  <>
                    <Image
                      src={skyline}
                      alt=""
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                      aria-hidden
                      className="absolute inset-0 -z-10 h-full w-full object-cover object-[30%_58%]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(1,22,111,0.95)_18%,rgba(1,22,111,0.72)_52%,rgba(1,22,111,0.42))]"
                    />
                  </>
                ) : null}

                <div className="p-5 sm:p-6">
                  <div className="flex items-baseline gap-3">
                    <span
                      className={`text-[12.5px] font-bold uppercase tracking-[0.14em] ${
                        last ? "text-orange" : "text-blue-link"
                      }`}
                    >
                      {phase.label}
                    </span>
                    <span
                      aria-hidden
                      className={`h-px flex-1 ${last ? "bg-white/20" : "bg-hairline"}`}
                    />
                  </div>

                  <p
                    className={`mt-3 text-[15px] font-medium leading-[1.5] ${
                      last ? "text-white/80" : "text-muted"
                    }`}
                  >
                    {phase.summary}
                  </p>

                  <ul className="mt-5 space-y-[2px]">
                    {stagesIn(phase).map((stage) => (
                      <li key={stage.label}>
                        <Link
                          href={stage.href}
                          className={`group -mx-2 flex items-center gap-3 rounded-lg px-2 py-[9px] transition-colors duration-200 ${
                            last ? "hover:bg-white/[0.07]" : "hover:bg-canvas"
                          }`}
                        >
                          <span
                            aria-hidden
                            className={`w-[1.7em] shrink-0 text-[13px] font-bold tabular-nums transition-colors duration-200 ${
                              last
                                ? "text-white/45 group-hover:text-orange"
                                : "text-faint group-hover:text-orange"
                            }`}
                          >
                            {String(stage.index + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`min-w-0 flex-1 text-[15.5px] font-semibold leading-[1.35] tracking-[-0.005em] transition-colors duration-200 ${
                              last
                                ? "text-white group-hover:text-white"
                                : "text-navy group-hover:text-blue-link"
                            }`}
                          >
                            {stage.label}
                          </span>
                          <ArrowRight
                            size={15}
                            strokeWidth={2.4}
                            aria-hidden
                            className={`shrink-0 transition-[transform,color] duration-200 group-hover:translate-x-[3px] ${
                              last
                                ? "text-white/40 group-hover:text-orange"
                                : "text-faint group-hover:text-blue-link"
                            }`}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </motion.div>
  );
}
