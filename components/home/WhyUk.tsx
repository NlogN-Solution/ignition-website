"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Clock, ShieldCheck, Trophy } from "lucide-react";
import { useReveal } from "../ui/motion";
import { whyUkPoints, type WhyUkPoint } from "@/data/home/why-uk";
import swoosh from "@/public/images/swoosh.png";

/**
 * Three solid colour cards, which is a deliberate break from the rest of the
 * page.
 *
 * Everything above and below this band is white-on-canvas with hairline
 * borders. This section is the one moment the homepage argues rather than
 * navigates, so it gets the brand at full strength — and because the three
 * cards are the only saturated block on the page, the eye stops here on the
 * way down to the six entry points.
 *
 * WHY THE PHOTOGRAPHS SURVIVE THE COLOUR. Each card carries a picture, but
 * dropping a photograph onto a saturated panel normally destroys both: the
 * panel stops being a brand colour and the photograph stops being legible.
 * `mix-blend-luminosity` avoids that — only the light and shade of the image
 * survive, and the card's own colour supplies every hue, so each picture
 * arrives as a duotone in that card's brand colour. It is why the choice of
 * image is about shape and subject and not about whether its colours suit the
 * panel; the colours are discarded either way.
 *
 * WHY IT IS A BAND AND NOT A FULL BLEED. The first attempt ran the photograph
 * behind the whole card. The source images are landscape and the cards are
 * tall, so `object-cover` blew up a narrow vertical slice of each one and all
 * three became unrecognisable texture — a graduation photo you could not tell
 * from a building. The band shows them the way round they were taken, and the
 * card's colour rises into its foot so there is no seam between picture and
 * panel.
 *
 * The band is 16:7 rather than the sources' own 5:3. That crops a little top
 * and bottom, which all three survive because their subject is central, and it
 * is what keeps the card short enough to sit between the search and the entry
 * points without pushing the rest of the homepage down a screen. Every card
 * here is as tall as the tallest of the three, so the height is a shared
 * budget — see the note on the copy in data/home/why-uk.ts.
 */

const icons: Record<WhyUkPoint["id"], typeof Clock> = {
  shorter: Clock,
  "top-ten": Trophy,
  quality: ShieldCheck,
};

/**
 * Each tone carries its own hover and link colours rather than sharing one
 * treatment, because white-on-orange and white-on-navy need different amounts
 * of lift to read as the same interaction.
 */
const tones: Record<WhyUkPoint["tone"], { panel: string; scrim: string }> = {
  blue: {
    panel:
      "border-blue-bright bg-blue-bright shadow-[0_20px_44px_-26px_rgba(16,113,246,0.7)] hover:shadow-[0_30px_60px_-26px_rgba(16,113,246,0.8)]",
    scrim: "from-blue-bright via-blue-bright/25 via-[55%] to-transparent",
  },
  navy: {
    panel:
      "border-navy bg-navy shadow-[0_20px_44px_-26px_rgba(1,22,111,0.75)] hover:shadow-[0_30px_60px_-26px_rgba(1,22,111,0.85)]",
    scrim: "from-navy via-navy/25 via-[55%] to-transparent",
  },
  orange: {
    panel:
      "border-orange bg-orange shadow-[0_20px_44px_-26px_rgba(252,90,7,0.7)] hover:shadow-[0_30px_60px_-26px_rgba(252,90,7,0.8)]",
    scrim: "from-orange via-orange/25 via-[55%] to-transparent",
  },
};

export function WhyUk() {
  const { container, item } = useReveal(0.08);

  return (
    <motion.ul {...container} className="grid gap-4 md:grid-cols-3">
      {whyUkPoints.map((point) => {
        const Icon = icons[point.id] ?? Clock;
        const tone = tones[point.tone];

        return (
          <motion.li key={point.id} {...item} className="min-w-0">
            <Link
              href={point.href}
              className={`group relative isolate flex h-full flex-col overflow-hidden rounded-xl border text-white transition-[transform,box-shadow] duration-200 hover:-translate-y-[2px] ${tone.panel}`}
            >
              <div className="relative aspect-[16/7] w-full shrink-0 overflow-hidden">
                <Image
                  src={point.image}
                  alt=""
                  aria-hidden
                  fill
                  sizes="(min-width: 768px) 420px, 100vw"
                  className="pointer-events-none select-none object-cover object-center opacity-[0.85] mix-blend-luminosity transition-transform duration-500 group-hover:scale-[1.05]"
                />

                {/* The panel colour rising into the foot of the picture, so
                    the band ends in the card rather than against it. */}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${tone.scrim}`}
                />

                <span
                  aria-hidden
                  className="absolute left-5 top-5 flex size-[40px] items-center justify-center rounded-[11px] border border-white/25 bg-white/15 backdrop-blur-sm sm:left-6 sm:top-6"
                >
                  <Icon size={19} strokeWidth={1.9} />
                </span>
              </div>

              {/* The same rising-path plate the career card carries, at the
                  same weight — a texture that reads as light on the panel
                  rather than as a picture. */}
              <Image
                src={swoosh}
                alt=""
                aria-hidden
                sizes="420px"
                className="pointer-events-none absolute -right-8 bottom-[-14%] -z-10 h-[128%] w-auto select-none opacity-[0.14] mix-blend-screen"
              />

              <div className="flex flex-1 flex-col p-5 pt-[18px] sm:p-6 sm:pt-5">
                <p className="text-[clamp(1.375rem,2.1vw,1.625rem)] font-bold leading-[1.05] tracking-[-0.02em]">
                  {point.stat}
                </p>
                <p className="mt-[5px] text-[12.5px] font-semibold uppercase tracking-[0.08em] text-white/60">
                  {point.statNote}
                </p>

                <h3 className="mt-[18px] text-[17.5px] font-bold leading-[1.25] tracking-[-0.012em]">
                  {point.title}
                </h3>
                <p className="mt-[9px] text-[14px] font-medium leading-[1.55] text-white/75">
                  {point.body}
                </p>

                {point.source ? (
                  <p className="mt-3 text-[12px] font-semibold leading-[1.45] text-white/50">
                    {point.source}
                  </p>
                ) : null}

                <span className="mt-auto inline-flex items-center gap-[9px] pt-5 text-[14px] font-bold text-white">
                  {point.linkLabel}
                  <ArrowRight
                    size={16}
                    strokeWidth={2.4}
                    aria-hidden
                    className="shrink-0 transition-transform duration-200 group-hover:translate-x-[3px]"
                  />
                </span>
              </div>
            </Link>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
