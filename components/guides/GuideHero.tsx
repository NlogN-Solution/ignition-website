import Image, { type StaticImageData } from "next/image";
import { Flag } from "lucide-react";
import { Breadcrumbs } from "../layout/Breadcrumbs";
import { AccentText } from "../ui/AccentText";
import type { Crumb } from "@/lib/seo";

/**
 * The opening for a flagship guide: copy on the left, a photographic plate on
 * the right that bleeds off the edge of the viewport.
 *
 * WHY IT IS NOT `PageHero`. `PageHero` is the quiet standard opening every
 * content page shares, and it stays that way — this is one page, not a new
 * default. The difference is that a guide of this length has to establish in
 * one screen that it is a substantial resource rather than a landing page,
 * and a picture is the fastest way to do that.
 *
 * THE SEAM. The plate is masked with a canvas-to-transparent gradient down
 * its left edge rather than being clipped, so the photograph resolves into
 * the page instead of ending against the headline. Below `lg` it becomes a
 * band under the copy, where a side-by-side split would leave both halves too
 * narrow to read.
 */
export function GuideHero({
  eyebrow,
  title,
  intro,
  crumbs,
  image,
  imageAlt,
  imagePosition = "50% 50%",
}: {
  eyebrow: string;
  title: string;
  intro: string;
  crumbs: Crumb[];
  image: StaticImageData;
  imageAlt: string;
  /** `object-position` for the plate — most of these photographs have their
      subject off-centre once cropped this wide. */
  imagePosition?: string;
}) {
  return (
    <section className="relative flex flex-col-reverse overflow-hidden bg-white lg:block">
      {/* The plate. Absolute from `lg` so the copy can sit over the left of
          it; below that it becomes a band, and `flex-col-reverse` on the
          section puts it *under* the copy — a photograph above the breadcrumb
          would push the trail and the H1 off a phone's first screen. */}
      <div className="pointer-events-none relative h-[210px] select-none sm:h-[280px] lg:absolute lg:inset-y-0 lg:left-[46%] lg:right-0 lg:h-auto">
        <Image
          src={image}
          alt={imageAlt}
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          style={{ objectPosition: imagePosition }}
          className="h-full w-full object-cover"
        />

        {/* Fades the photograph into the page: downward on the stacked band,
            leftward once it sits beside the headline. */}
        <span
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.55),rgba(255,255,255,0)_40%,rgba(255,255,255,0.92))] lg:hidden"
        />
        <span
          aria-hidden
          className="absolute inset-0 hidden bg-[linear-gradient(to_right,#fff_0%,rgba(255,255,255,0.86)_16%,rgba(255,255,255,0.35)_38%,rgba(255,255,255,0)_62%)] lg:block"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1240px] px-5 pb-[clamp(2.25rem,3.6vw,3.5rem)] pt-7 sm:px-8 lg:px-12 lg:pb-[clamp(3.5rem,5vw,5.5rem)] lg:pt-9">
        <Breadcrumbs crumbs={crumbs} />

        <div className="mt-7">
          <p className="inline-flex items-center gap-[7px] rounded-lg border border-orange/25 bg-orange/[0.07] px-[10px] py-[5px] text-[12px] font-bold uppercase tracking-[0.12em] text-orange">
            <Flag size={13} strokeWidth={2.4} aria-hidden />
            {eyebrow}
          </p>

          {/* The measure lives on the heading, not on this wrapper: a `ch`
              here would be a character of the inherited 16px body face, not
              of the display size, and would cut the headline to a third of
              the width it wants. */}
          <h1 className="mt-5 max-w-[13ch] text-[clamp(2.25rem,4.6vw,3.625rem)] font-bold leading-[1.03] tracking-[-0.028em] text-navy">
            <AccentText>{title}</AccentText>
          </h1>
        </div>

        <p className="mt-6 max-w-[50ch] text-[clamp(1rem,1.2vw,1.125rem)] font-medium leading-[1.6] text-muted lg:max-w-[44ch]">
          {intro}
        </p>
      </div>
    </section>
  );
}
