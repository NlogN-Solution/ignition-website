import Image from "next/image";
import { routeHero } from "@/data/journey/route";
import bridge from "@/public/images/why-uk-hero-bridge.jpg";
import { JourneyExplorer } from "./JourneyExplorer";

/**
 * The route to the UK: the hero band, then the explorer.
 *
 * WHAT THIS FILE IS NOW. It used to carry the stepper and the panel as well,
 * because those two and the hero were three views of one selection and
 * splitting them meant lifting state into a context nobody else read. That
 * selection now belongs to `JourneyExplorer`, which owns its own stepper —
 * so what is left here is the hero, and the hero is static markup. The
 * component is a server component again as a result: no state, no
 * `"use client"`, and the only JavaScript this page ships for the route is
 * the explorer's own.
 *
 * THE HERO IS UNCHANGED — deliberately, down to its padding. Same photograph,
 * same baked white ramp down its left edge (see
 * `components/study-in-uk/WhyUkHero.tsx` for why that lives in the pixels
 * rather than in CSS), same drawn flight arc, same two-line headline with its
 * manual break. The stepper that used to sit at its foot has gone with the
 * rest of the old instrument, and the explorer's own section supplies the
 * space beneath.
 */
export function JourneyRoute() {
  return (
    <>
      <section className="relative overflow-hidden bg-white">
        {/* The plate is the same photograph the "why the UK" hero uses, and it
            carries the same baked white ramp down its left edge — see
            `components/study-in-uk/WhyUkHero.tsx` for why that is in the
            pixels rather than in CSS. Cropped tighter here: this hero is a
            band, not a full screen, and the stepper sits over its foot. */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[57%] select-none lg:block">
          <Image
            src={bridge}
            alt=""
            aria-hidden
            preload
            sizes="57vw"
            className="h-full w-full object-cover object-[50%_38%]"
          />
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[45%] bg-[linear-gradient(to_top,#fff,rgba(255,255,255,0))]"
          />
        </div>

        {/* The arc is the flight path the headline describes, drawn rather
            than photographed so it can land its orange terminus on the same
            spot at every width. */}
        <svg
          aria-hidden
          viewBox="0 0 400 150"
          fill="none"
          preserveAspectRatio="none"
          className="pointer-events-none absolute right-[6%] top-[6%] hidden h-[26%] w-[38%] text-white lg:block"
        >
          <path
            d="M0 148C60 92 130 26 250 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.85"
          />
          <circle cx="250" cy="10" r="7" className="fill-orange" />
        </svg>

        <div className="relative mx-auto w-full max-w-[1240px] px-5 pb-[clamp(2rem,3vw,2.75rem)] pt-[clamp(2.5rem,6.7vw,5.3125rem)] sm:px-8 lg:px-12">
          <p className="text-[16.5px] font-bold uppercase tracking-[0.09em] text-blue-link">
            {routeHero.eyebrow}
          </p>

          {/* The two lines are set rather than left to wrap. The reference
              breaks after "to", and no max-width can produce that: its second
              line is longer than its first plus the word that would follow,
              so any measure wide enough to hold line two pulls "your" up.
              Below `sm` the spans wrap normally and the break falls out. */}
          <h1 className="mt-[26px] max-w-[min(100%,640px)] text-[clamp(2.25rem,4.35vw,3.625rem)] font-bold leading-[1.14] tracking-[-0.035em] text-navy">
            <span className="sm:block">From first idea to </span>
            <span className="sm:block">
              your first week in the <span className="text-orange">UK.</span>
            </span>
          </h1>

          <p className="mt-[24px] max-w-[min(100%,570px)] text-[clamp(1.0625rem,1.5vw,1.28rem)] font-medium leading-[1.55] text-muted">
            {routeHero.intro}
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1240px] px-5 py-[clamp(2rem,3.5vw,3rem)] sm:px-8 lg:px-12">
        <JourneyExplorer />
      </section>
    </>
  );
}
