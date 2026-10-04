import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import skyline from "@/public/images/cta-skyline-dusk.jpg";

/**
 * The close of the journey page.
 *
 * The skyline is a destination, not a texture, so it is a photograph rather
 * than a pattern — but it sits under a navy wash heavy enough that the two
 * buttons keep their contrast at every width. The wash is a gradient rather
 * than a flat overlay so the picture resolves out of the navy on the left
 * instead of starting at a hard edge halfway across the plate.
 *
 * The rings are the hero's flight arc, arrived: same stroke, same white, now
 * closing into circles over the city rather than heading towards it.
 */
export function JourneyCta() {
  return (
    <section className="mx-auto w-full max-w-[1240px] px-5 pb-[clamp(2.5rem,4.5vw,4rem)] sm:px-8 lg:px-12">
      <div className="relative isolate overflow-hidden rounded-[22px] bg-navy px-[26px] py-[36px] sm:px-[38px]">
        {/* Two washes, not one. The horizontal ramp resolves the city out of
            the navy on the left so the copy never sits on architecture; the
            violet on top is what turns a daylight photograph into the dusk the
            rest of the plate is lit for. */}
        <div aria-hidden className="absolute inset-y-0 right-0 -z-10 w-[72%]">
          <Image
            src={skyline}
            alt=""
            sizes="(max-width: 1024px) 72vw, 820px"
            className="h-full w-full object-cover object-[58%_62%]"
          />
          <span className="absolute inset-0 bg-[linear-gradient(120deg,rgba(63,42,140,0.55),rgba(88,60,150,0.35))]" />
          <span className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-navy)_0%,rgba(1,22,111,0.9)_18%,rgba(1,22,111,0.62)_48%,rgba(1,22,111,0.36)_100%)]" />
        </div>

        <svg
          aria-hidden
          viewBox="0 0 200 200"
          fill="none"
          className="pointer-events-none absolute -top-[52%] right-[14%] -z-10 hidden h-[210%] text-white/30 sm:block"
        >
          {[52, 70, 88].map((r) => (
            <circle key={r} cx="100" cy="100" r={r} stroke="currentColor" strokeWidth="1.2" />
          ))}
        </svg>

        <div className="flex flex-col gap-[24px] lg:flex-row lg:items-center lg:gap-[clamp(2rem,6vw,6rem)]">
          <div className="max-w-[40ch]">
            <h2 className="text-[clamp(1.375rem,2.1vw,1.625rem)] font-bold leading-[1.2] tracking-[-0.02em] text-white">
              Ready to take the next step?
            </h2>
            <p className="mt-[10px] text-[15.5px] font-medium leading-[1.5] text-white/75">
              Let&rsquo;s turn your UK dream into a plan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-[14px]">
            <Link
              href="/careers/quiz"
              className="group inline-flex h-[50px] items-center justify-center gap-[14px] rounded-[10px] bg-white px-[24px] text-[15.5px] font-bold text-navy transition-shadow duration-200 hover:shadow-[0_14px_34px_-14px_rgba(0,0,0,0.55)] active:scale-[0.985]"
            >
              Start Your Journey
              <ArrowRight
                size={17}
                strokeWidth={2.5}
                aria-hidden
                className="shrink-0 text-blue-link transition-transform duration-200 group-hover:translate-x-[3px]"
              />
            </Link>
            <Link
              href="/#adviser"
              className="inline-flex h-[50px] items-center justify-center rounded-[10px] border border-white/35 px-[24px] text-[15.5px] font-bold text-white transition-colors duration-200 hover:border-white/60 hover:bg-white/10"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
