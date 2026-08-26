"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Check, Compass } from "lucide-react";
import { RadioOption } from "../ui/RadioOption";
import { Card } from "../ui/Card";
import { GatewayMotif } from "../ui/GatewayMotif";
import { ArrowButton } from "../ui/ArrowButton";
import { journeyStages } from "@/data/journey/stages";
import { storageKeys } from "@/lib/storage";
import { setStored, useStoredValue } from "@/lib/storage/store";

/**
 * Keeps the quiet radio treatment from the original "Where are you today?"
 * screen — unpicked options recede to `faint`, the picked one turns orange —
 * but the answer now does something: it reveals the steps Ignition recommends
 * from that point, and remembers the choice for next visit.
 *
 * THE PANEL IS A ROUTE, NOT A LIST. The first version was a white card with a
 * label, a sentence and six links in a row, which is what every "helpful
 * links" box on the internet looks like — nothing about it said these were in
 * an order, or that the student was somewhere on it. Now the steps are a path:
 * a navy header that names the stage back to them, numbered stops joined by a
 * rule down the left, and the first one marked as where to start. The rule is
 * the whole idea. It is what turns six destinations into one sequence.
 */
export function JourneySelector() {
  const stageId = useStoredValue<string | null>(storageKeys.journeyStage, null);
  const stage = journeyStages.find((s) => s.id === stageId) ?? null;

  /**
   * The answer goes through the shared store rather than `useStoredState`,
   * which is what lets the adviser form read it from a different section of
   * the page. `useStoredState` gives each caller its own copy and writes
   * without telling anyone, so two components on one key do not see each
   * other until a reload — fine when the selector and the form were siblings,
   * wrong now that the form sits three sections further down. Everything else
   * reading this slot (`useResearch`, and the progress summary through it)
   * already subscribed here, so those update live now too.
   */
  function select(id: string) {
    setStored(storageKeys.journeyStage, id);
  }

  return (
    <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
      <fieldset>
        <legend className="sr-only">Where are you in your UK journey?</legend>
        <div className="flex flex-col items-start gap-[clamp(0.7rem,1.1vw,1.1rem)]">
          {journeyStages.map((option) => (
            <RadioOption
              key={option.id}
              name="journey-stage"
              label={option.label}
              selected={stageId === option.id}
              onSelect={() => select(option.id)}
              tone="quiet"
              ringClassName="size-[clamp(20px,1.5vw,24px)]"
              className="gap-[clamp(0.9rem,1.4vw,1.4rem)] text-[clamp(1.1rem,1.6vw,1.5rem)] font-semibold"
            />
          ))}
        </div>
      </fieldset>

      {/* Keyed remount rather than an exit animation, so a new selection
          always replaces the panel immediately. */}
      <div className="min-w-0">
        {stage ? (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="overflow-hidden">
              {/* The header is solid navy so the panel reads as an answer
                  returned rather than as more page. It names the stage back to
                  the student, which is the confirmation that the click landed. */}
              <div className="relative isolate overflow-hidden bg-navy px-6 py-5 text-white sm:px-8 sm:py-6">
                <GatewayMotif className="pointer-events-none absolute -right-6 -top-10 -z-10 h-[210%] w-auto select-none text-white opacity-[0.07]" />

                <p className="flex items-center gap-[9px] text-[12px] font-bold uppercase tracking-[0.14em] text-white/60">
                  <Compass size={14} strokeWidth={2.3} aria-hidden className="text-orange" />
                  Your route from here
                </p>
                <p className="mt-[10px] text-[17px] font-bold leading-[1.35] tracking-[-0.012em]">
                  {stage.label}
                  <span className="text-orange">.</span>
                </p>
                <p className="mt-[10px] max-w-[46ch] text-[14.5px] font-medium leading-[1.55] text-white/70">
                  {stage.summary}
                </p>
              </div>

              <div className="p-6 sm:p-8">
                <ol className="relative">
                  {/* The spine. Inset to sit under the centre of the markers,
                      and stopped short of the last one so the path ends at the
                      final step rather than trailing past it. */}
                  <span
                    aria-hidden
                    className="absolute bottom-[26px] left-[13px] top-[26px] w-px bg-hairline"
                  />

                  {stage.steps.map((step, i) => {
                    const first = i === 0;

                    return (
                      <li key={`${step.href}-${step.label}`} className="relative">
                        <Link
                          href={step.href}
                          className="group -mx-3 flex items-start gap-[14px] rounded-lg px-3 py-[9px] transition-colors duration-200 hover:bg-canvas"
                        >
                          <span
                            aria-hidden
                            className={`relative z-10 mt-[1px] flex size-[27px] shrink-0 items-center justify-center rounded-full border text-[12px] font-bold tabular-nums transition-colors duration-200 ${
                              first
                                ? "border-orange bg-orange text-white"
                                : "border-hairline bg-white text-muted-light group-hover:border-navy group-hover:text-navy"
                            }`}
                          >
                            {first ? (
                              <Check size={13} strokeWidth={3} />
                            ) : (
                              i + 1
                            )}
                          </span>

                          <span className="min-w-0 flex-1 pt-[3px]">
                            <span className="block text-[15.5px] font-semibold leading-[1.4] text-ink transition-colors duration-200 group-hover:text-navy">
                              {step.label}
                            </span>
                            {first ? (
                              <span className="mt-[2px] block text-[12.5px] font-bold uppercase tracking-[0.1em] text-orange">
                                Start here
                              </span>
                            ) : null}
                          </span>

                          <ArrowRight
                            size={16}
                            strokeWidth={2.25}
                            aria-hidden
                            className="mt-[6px] shrink-0 text-faint transition-[transform,color] duration-200 group-hover:translate-x-[3px] group-hover:text-blue-link"
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ol>

                <div className="mt-7 border-t border-hairline pt-6">
                  <ArrowButton
                    href={stage.steps[0].href}
                    iconSize={17}
                    className="h-[48px] w-full gap-[14px] px-6 text-[15px] sm:w-auto"
                  >
                    {stage.steps[0].label}
                  </ArrowButton>
                  <p className="mt-[14px] text-[13px] font-medium leading-[1.5] text-muted-light">
                    {stage.steps.length} steps, in order. Your answer is
                    remembered, so this is here when you come back.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ) : (
          <Card
            tone="flat"
            className="relative isolate items-start overflow-hidden p-8 sm:p-10"
          >
            <GatewayMotif className="pointer-events-none absolute -right-10 -top-6 -z-10 h-[132%] w-auto select-none text-navy opacity-[0.09]" />
            <p className="max-w-[34ch] text-[17px] font-semibold leading-[1.45] tracking-[-0.01em] text-navy">
              Pick where you are and we&rsquo;ll show you exactly what to do
              next<span className="text-orange">.</span>
            </p>
            <p className="mt-3 max-w-[38ch] text-[15.5px] font-medium leading-[1.6] text-muted">
              The right steps in the right order, with nothing you don&rsquo;t
              need yet. Your answer is remembered for next time.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
