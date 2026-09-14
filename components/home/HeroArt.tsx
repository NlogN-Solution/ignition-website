import Image from "next/image";
import towerBridge from "@/public/images/tower-bridge-london.png";

/**
 * Below `lg` the photograph sits under the copy as its own band. From `lg` it
 * becomes the section backdrop on the right, the same slot the previous
 * monument-and-student illustration held — object-position is tuned to keep
 * the bridge and skyline in frame and crop out the empty sky on the source
 * photo's right edge, rather than showing the full wide frame compressed.
 *
 * WHY THE PHOTO IS TONED, NOT RAW. Every other photograph on the site is
 * grounded into the brand rather than shown at full saturation — `WhyUk` and
 * `StatPhotoCard` run theirs through `mix-blend-luminosity` so navy or orange
 * supplies the colour; `WhyUkHero`'s bridge photo has its fade baked directly
 * into the pixels. A sunset this vivid, dropped in with only a crop, reads as
 * a stock photo sitting next to the brand rather than art that belongs to it.
 * A light navy wash plus a touch less saturation keeps the warmth — this is
 * meant to feel aspirational, not corporate-flat like the duotone cards — while
 * pulling its palette back toward the site's own navy-and-orange instead of
 * competing with the headline in full, uncontrolled colour.
 */
export function HeroArt() {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative mt-10 h-[300px] select-none overflow-hidden sm:h-[420px] lg:absolute lg:inset-0 lg:mt-0 lg:h-auto"
    >
      <div className="absolute bottom-0 left-1/2 h-full w-[150%] -translate-x-1/2 sm:w-[125%] lg:left-[36.5%] lg:top-[4px] lg:h-auto lg:w-[72.5%] lg:translate-x-0 lg:[mask-image:linear-gradient(to_right,transparent_0%,#000_13%)]">
        <Image
          src={towerBridge}
          alt=""
          sizes="(max-width: 1024px) 150vw, 73vw"
          priority
          className="h-full w-full object-cover object-[68%_42%] [filter:saturate(0.9)_brightness(0.97)_contrast(1.03)]"
        />

        {/* Grounds the photo's own colour into the brand — a light navy wash
            rather than the full duotone the smaller cards use, since a hero
            this size can carry some of the photo's own warmth without losing
            the site's palette. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-navy mix-blend-color opacity-[0.22]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[38%] bg-[linear-gradient(to_top,rgba(1,22,111,0.55),rgba(1,22,111,0))]"
        />
      </div>

      {/* Fades the plate into the canvas on the headline side, exactly as the
          reference does, instead of showing a hard image edge. */}
      <div className="absolute inset-0 hidden bg-[linear-gradient(to_right,var(--color-canvas)_20%,rgba(251,250,254,0.9)_34%,rgba(251,250,254,0.44)_48%,rgba(251,250,254,0.12)_62%,rgba(251,250,254,0)_74%)] lg:block" />
      <div className="absolute inset-x-0 top-0 h-[12%] bg-[linear-gradient(to_bottom,var(--color-canvas),rgba(251,250,254,0))]" />
    </div>
  );
}
