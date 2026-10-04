import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * The page's close: one navy plate, one destination.
 *
 * It is a plate inside the page rather than a full-bleed band because the
 * five reasons above it are also plates — a band would put a hard horizontal
 * edge under a grid that has just established a soft one, and the page would
 * read as ending twice.
 *
 * The paper plane is drawn rather than imported: it is one continuous dashed
 * path and a four-point glyph, which is smaller as markup than as a file and
 * lets the dash pattern stay crisp at any width. It is decorative and sits
 * behind the content, so it is out of the accessibility tree and is dropped
 * entirely below `md`, where the plate is too narrow to hold both the copy
 * and a flight path.
 */
export function FutureCta() {
  return (
    <section className="bg-white px-5 pb-[clamp(3rem,5vw,4.5rem)] sm:px-8 lg:px-24">
      <div className="relative isolate overflow-hidden rounded-[22px] bg-navy px-[30px] py-[38px] sm:px-[40px]">
        <svg
          aria-hidden
          viewBox="0 0 300 120"
          fill="none"
          preserveAspectRatio="xMaxYMid meet"
          className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden h-full w-[380px] text-white/45 md:block"
        >
          <path
            d="M4 86c26 14 46 6 48-8 2-13-16-18-22-8-7 12 8 27 30 27 26 0 40-16 52-34 14-21 30-38 54-46"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="0.5 7"
          />
          <path
            d="M232 20 285 3l-19 51-11-22-23-12Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="m255 32 30-29" stroke="currentColor" strokeWidth="1.8" />
        </svg>

        <div className="flex flex-col gap-[26px] lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-[46ch]">
            <span
              aria-hidden
              className="block h-[3.5px] w-[34px] rounded-full bg-orange"
            />
            <h2 className="mt-[20px] text-[clamp(1.25rem,1.9vw,1.4375rem)] font-bold leading-[1.2] tracking-[-0.015em] text-white">
              Your future starts in the UK.
            </h2>
            <p className="mt-[10px] max-w-[40ch] text-[15px] font-medium leading-[1.65] text-white/70">
              Join thousands of students building successful careers and
              brighter futures.
            </p>
          </div>

          <Link
            href="/courses"
            className="group inline-flex h-[50px] w-fit shrink-0 items-center justify-center gap-[16px] rounded-[10px] bg-white px-[24px] text-[15px] font-bold text-navy transition-shadow duration-200 hover:shadow-[0_14px_34px_-14px_rgba(0,0,0,0.5)] active:scale-[0.985] lg:mr-[clamp(0px,9vw,150px)]"
          >
            Explore Courses &amp; Universities
            <ArrowUpRight
              size={17}
              strokeWidth={2.4}
              aria-hidden
              className="shrink-0 transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
