"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { useReveal } from "../ui/motion";
import { journeyPhases, stagesIn, type PhaseId } from "@/data/journey/pipeline";
import { storageKeys } from "@/lib/storage";
import { setStored, useStoredValue } from "@/lib/storage/store";
import exploreImg from "@/public/images/critical-thinking.jpeg";
import decideImg from "@/public/images/london-university.webp";
import applyImg from "@/public/images/presentations.jpeg";
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
 * EVERY CARD CARRIES THE RAIL'S OWN COLOUR NOW, NOT JUST THE LAST ONE. Only
 * "Arrive" used to have a photograph — the other three were plain white text
 * boxes, which made the row read as three placeholders and one finished
 * panel rather than four chapters of one journey. Each phase now gets its own
 * photograph and the same tinted-overlay treatment, in the rail's own colour
 * at that point in the sequence (navy at the start, blue-bright through the
 * middle, orange for the push to apply) — `Arrive` keeps its established
 * navy dusk-skyline mood and orange terminus accent unchanged.
 *
 * IT ALSO ASKS WHERE YOU ARE NOW. That question used to be its own section
 * above this one — seven overlapping self-descriptions and an empty panel
 * waiting on the answer. It failed for the reason `/start` had already
 * written down: a student who cannot yet name the stages is exactly the
 * student who came here to find out what they are, and asking them to choose
 * between "exploring my options" and "don't know what I want to study" is
 * asking them to guess. Here the map is on the page first and marking
 * yourself on it is one click, on a chapter you can already read. The answer
 * lands in the same slot it always did, so the next-step panel below and the
 * adviser record both still read it.
 */
type PhaseTheme = {
  image: typeof skyline;
  /** object-position for the crop. */
  focus: string;
  /** "r, g, b" for the overlay gradient — the rail's own palette, not a
   * fifth invented hue. */
  tintRgb: string;
  /** Orange reads on navy and on blue; it doesn't read on orange, so the
   * Apply card (already orange-tinted) gets a white label instead. */
  labelClass: string;
};

const phaseThemes: Record<PhaseId, PhaseTheme> = {
  explore: {
    image: exploreImg,
    focus: "50% 40%",
    tintRgb: "1, 22, 111",
    labelClass: "text-orange",
  },
  decide: {
    image: decideImg,
    focus: "50% 45%",
    tintRgb: "16, 113, 246",
    labelClass: "text-orange",
  },
  apply: {
    image: applyImg,
    focus: "50% 35%",
    tintRgb: "252, 90, 7",
    labelClass: "text-white",
  },
  arrive: {
    image: skyline,
    focus: "30% 58%",
    tintRgb: "1, 22, 111",
    labelClass: "text-orange",
  },
};

export function JourneyPipeline() {
  const { container, item } = useReveal(0.07);
  const current = useStoredValue<string | null>(storageKeys.journeyStage, null);

  /** Choosing the marked chapter again clears it — the same contract every
      single-choice control on this site has. */
  function mark(id: PhaseId) {
    setStored(storageKeys.journeyStage, current === id ? null : id);
  }

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
        {journeyPhases.map((phase) => {
          const here = current === phase.id;
          const theme = phaseThemes[phase.id];

          return (
            <motion.li key={phase.id} {...item} className="min-w-0">
              <div
                className={`relative isolate flex h-full flex-col overflow-hidden rounded-xl border border-transparent bg-navy shadow-[0_18px_40px_-28px_rgba(1,22,111,0.28)] ${
                  here ? "ring-[3px] ring-orange/35" : ""
                }`}
              >
                {/* Every chapter is somewhere you can see, not just the
                    destination. */}
                <Image
                  src={theme.image}
                  alt=""
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                  aria-hidden
                  className="absolute inset-0 -z-10 h-full w-full object-cover"
                  style={{ objectPosition: theme.focus }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(${theme.tintRgb}, 0.95) 18%, rgba(${theme.tintRgb}, 0.72) 52%, rgba(${theme.tintRgb}, 0.42))`,
                  }}
                />

                <div className="p-5 sm:p-6">
                  <div className="flex items-baseline gap-3">
                    <span
                      className={`text-[12.5px] font-bold uppercase tracking-[0.14em] ${theme.labelClass}`}
                    >
                      {phase.label}
                    </span>
                    <span aria-hidden className="h-px flex-1 bg-white/20" />
                  </div>

                  <p className="mt-3 text-[15px] font-medium leading-[1.5] text-white/80">
                    {phase.summary}
                  </p>

                  <ul className="mt-5 space-y-[2px]">
                    {stagesIn(phase).map((stage) => (
                      <li key={stage.label}>
                        <Link
                          href={stage.href}
                          className="group -mx-2 flex items-center gap-3 rounded-lg px-2 py-[9px] transition-colors duration-200 hover:bg-white/[0.07]"
                        >
                          <span
                            aria-hidden
                            className="w-[1.7em] shrink-0 text-[13px] font-bold tabular-nums text-white/45 transition-colors duration-200 group-hover:text-orange"
                          >
                            {String(stage.index + 1).padStart(2, "0")}
                          </span>
                          <span className="min-w-0 flex-1 text-[15.5px] font-semibold leading-[1.35] tracking-[-0.005em] text-white transition-colors duration-200">
                            {stage.label}
                          </span>
                          <ArrowRight
                            size={15}
                            strokeWidth={2.4}
                            aria-hidden
                            className="shrink-0 text-white/40 transition-[transform,color] duration-200 group-hover:translate-x-[3px] group-hover:text-orange"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* The marker sits at the foot of the card rather than in a
                    section of its own, because "which chapter am I in" is a
                    question about this card and nothing else. It is a real
                    button, not a link: it changes state on the page the reader
                    is already looking at. */}
                <div className="mt-auto border-t border-white/15 px-5 py-[13px] sm:px-6">
                  <button
                    type="button"
                    aria-pressed={here}
                    onClick={() => mark(phase.id)}
                    className={`group/mark inline-flex items-center gap-[9px] rounded-full border px-[13px] py-[7px] text-[13px] font-bold transition-colors duration-200 ${
                      here
                        ? "border-orange bg-orange text-white"
                        : "border-white/20 text-white/70 hover:border-white/45 hover:text-white"
                    }`}
                  >
                    {here ? (
                      <Check size={14} strokeWidth={3} aria-hidden />
                    ) : (
                      <MapPin size={14} strokeWidth={2.4} aria-hidden />
                    )}
                    {here ? "This is where I am" : "I'm here"}
                  </button>
                </div>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </motion.div>
  );
}
