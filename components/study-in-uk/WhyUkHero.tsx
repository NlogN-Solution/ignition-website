import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { graduateEmployers } from "@/data/study-in-uk/reasons";
import bridge from "@/public/images/why-uk-hero-bridge.jpg";
import avatar1 from "@/public/images/avatar-1.jpg";
import avatar2 from "@/public/images/avatar-2.jpg";
import avatar3 from "@/public/images/avatar-3.jpg";
import avatar4 from "@/public/images/avatar-4.jpg";

/**
 * The opening of the "why the UK" page: the argument on the left, the walk
 * across Westminster Bridge on the right.
 *
 * THE PLATE CARRIES ITS OWN FADE. The photograph is cut with the white
 * left-to-transparent ramp already in the pixels rather than having one laid
 * over it in CSS. That is deliberate: the ramp has to resolve exactly where
 * the headline ends, and a CSS gradient anchored to the plate's own box
 * drifts across viewport widths — at 1100px it clipped the man's shoulder, at
 * 1600px it washed out the clock face. Baking it means the seam is fixed to
 * the picture instead of to the layout, and the section's white ground makes
 * the join invisible. The consequence is that this file is the *only* place
 * `why-uk-hero-bridge.jpg` can be used; anywhere with a non-white background
 * would show the ramp as a grey wedge.
 *
 * Below `lg` the plate drops under the copy as a band, and there the fade
 * runs downward instead — so that one is a real gradient, laid over the top
 * of the picture where the baked-in one is not doing any work.
 *
 * The employer wall is a card rather than a bare row because it is a claim
 * ("our graduates work here"), and a claim needs an edge around it to read as
 * evidence rather than as decoration between the intro and the buttons.
 */
export function WhyUkHero() {
  return (
    <section className="relative flex flex-col-reverse overflow-hidden bg-white lg:block">
      {/* 48.05% is where the extracted crop begins in the reference, so the
          baked ramp lands on the same pixel column it was cut from. */}
      <div className="pointer-events-none relative h-[240px] select-none sm:h-[320px] lg:absolute lg:inset-y-0 lg:left-[48.05%] lg:right-0 lg:h-auto">
        <Image
          src={bridge}
          alt="A student walking across Westminster Bridge towards Big Ben."
          preload
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="h-full w-full object-cover object-[62%_50%] lg:object-[50%_50%]"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.72),rgba(255,255,255,0)_45%,rgba(255,255,255,0.9))] lg:hidden"
        />
      </div>

      <div className="relative px-5 pb-[clamp(2.5rem,5.6vw,4.875rem)] pt-[clamp(2.25rem,7vw,6.0625rem)] sm:px-8 lg:px-[60px]">
        <p className="text-[16.5px] font-bold uppercase tracking-[0.04em] text-blue-link">
          Why study in the UK
        </p>

        {/* The measure is in pixels rather than `ch`: a `ch` here would be a
            character of the inherited 16px body face, not of the display
            size, and would break "World-class education." after the first
            word. 660px is the width that line wants at the top of the clamp. */}
        <h1 className="mt-[26px] max-w-[min(100%,660px)] text-[clamp(2.375rem,4.35vw,3.625rem)] font-bold leading-[1.08] tracking-[-0.045em] text-navy">
          World-class education.
          <span className="block text-orange">Limitless opportunities.</span>
        </h1>

        <p className="mt-[26px] max-w-[min(100%,560px)] text-[clamp(1.0625rem,1.5vw,1.28rem)] font-medium leading-[1.55] text-muted">
          The UK combines academic excellence with real-world experience to
          help you build a global career.
        </p>

        <div className="mt-[34px] w-full max-w-[600px] rounded-2xl border border-hairline bg-white/70 px-[26px] py-[28px] shadow-[0_18px_44px_-34px_rgba(1,22,111,0.5)]">
          <p className="text-[15px] font-bold leading-none text-navy">
            Our graduates work at world-leading companies
          </p>
          <ul className="mt-[20px] flex flex-wrap items-center gap-x-[clamp(1.25rem,3vw,2.25rem)] gap-y-4">
            {graduateEmployers.map((employer) => (
              <li key={employer.name} className="flex items-center">
                <Image
                  src={`/images/${employer.file}`}
                  alt={employer.name}
                  width={employer.width}
                  height={employer.height}
                  className="h-[26px] w-auto object-contain"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-[38px] flex flex-wrap items-center gap-[18px]">
          <Link
            href="/start"
            className="group inline-flex h-[62px] items-center justify-center gap-[18px] rounded-[11px] bg-navy px-[30px] text-[17px] font-semibold text-white transition-[background-color,box-shadow,transform] duration-200 hover:bg-navy-ink hover:shadow-[0_16px_36px_-16px_rgba(1,22,111,0.7)] active:scale-[0.985]"
          >
            Start Your Journey
            <ArrowUpRight
              size={19}
              strokeWidth={2.25}
              aria-hidden
              className="shrink-0 transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
            />
          </Link>
          <Link
            href="/#adviser"
            className="inline-flex h-[62px] items-center justify-center rounded-[11px] border border-hairline bg-white px-[30px] text-[17px] font-semibold text-navy shadow-[0_14px_32px_-26px_rgba(1,22,111,0.45)] transition-colors duration-200 hover:border-ring-idle hover:bg-canvas"
          >
            Talk to an Expert
          </Link>
        </div>

        <div className="mt-[34px] flex items-center gap-[22px]">
          <ul aria-hidden className="flex items-center">
            {[avatar1, avatar2, avatar3, avatar4].map((face, i) => (
              <li
                key={i}
                className="-ml-[11px] first:ml-0 rounded-full ring-[2.5px] ring-white"
              >
                <Image
                  src={face}
                  alt=""
                  className="size-[44px] rounded-full object-cover"
                />
              </li>
            ))}
          </ul>
          <p className="max-w-[min(100%,228px)] text-[15.5px] font-medium leading-[1.45] text-muted">
            Trusted by 10,000+ students who are now studying in the UK
          </p>
        </div>
      </div>
    </section>
  );
}
