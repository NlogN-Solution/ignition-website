import Image, { type StaticImageData } from "next/image";
import type { LucideIcon } from "lucide-react";
import swoosh from "@/public/images/swoosh.png";

/**
 * The duotone photo-stat card used across `components/home/WhyUk.tsx`,
 * `components/study-in-uk/FiveReasons.tsx` and `components/study-in-uk/WorkInUk.tsx`.
 *
 * Pulled out once these three stopped being "similar" and became the same
 * card with different data — a photograph in `mix-blend-luminosity` so the
 * panel's own colour supplies every hue, a stat set large, then the claim in
 * full. Keeping one implementation means a change to the recipe (the crop,
 * the scrim, the icon chip) lands everywhere it's used rather than in
 * whichever copy someone remembered to update.
 *
 * This component never links anywhere itself — callers that want the whole
 * card to navigate (as `WhyUk` does) wrap it in their own `<Link>`; callers
 * that don't (as `FiveReasons` and `WorkInUk` don't) render it as-is.
 */
export type StatPhotoCardTone = "navy" | "blue" | "orange" | "emerald" | "violet";

const tones: Record<StatPhotoCardTone, { panel: string; scrim: string }> = {
  navy: {
    panel:
      "border-navy bg-navy shadow-[0_20px_44px_-26px_rgba(1,22,111,0.75)] group-hover:shadow-[0_30px_60px_-26px_rgba(1,22,111,0.85)]",
    scrim: "from-navy via-navy/25 via-[55%] to-transparent",
  },
  blue: {
    panel:
      "border-blue-bright bg-blue-bright shadow-[0_20px_44px_-26px_rgba(16,113,246,0.7)] group-hover:shadow-[0_30px_60px_-26px_rgba(16,113,246,0.8)]",
    scrim: "from-blue-bright via-blue-bright/25 via-[55%] to-transparent",
  },
  orange: {
    panel:
      "border-orange bg-orange shadow-[0_20px_44px_-26px_rgba(252,90,7,0.7)] group-hover:shadow-[0_30px_60px_-26px_rgba(252,90,7,0.8)]",
    scrim: "from-orange via-orange/25 via-[55%] to-transparent",
  },
  emerald: {
    panel:
      "border-emerald bg-emerald shadow-[0_20px_44px_-26px_rgba(20,160,92,0.7)] group-hover:shadow-[0_30px_60px_-26px_rgba(20,160,92,0.8)]",
    scrim: "from-emerald via-emerald/25 via-[55%] to-transparent",
  },
  violet: {
    panel:
      "border-violet bg-violet shadow-[0_20px_44px_-26px_rgba(109,40,224,0.7)] group-hover:shadow-[0_30px_60px_-26px_rgba(109,40,224,0.8)]",
    scrim: "from-violet via-violet/25 via-[55%] to-transparent",
  },
};

export function StatPhotoCard({
  tone,
  image,
  icon: Icon,
  stat,
  statNote,
  title,
  body,
  source,
  className = "",
  /** The photo band's shape. Wider bands suit a narrow card in a dense row; a
      squarer one reads better once a card has room to breathe in a 2-up row. */
  imageAspect = "aspect-[16/7]",
  /** Corner radius for the whole card. */
  rounded = "rounded-xl",
  imageSizes = "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw",
}: {
  tone: StatPhotoCardTone;
  /** Path under /public, or a static import. */
  image: string | StaticImageData;
  icon: LucideIcon;
  stat: string;
  statNote: string;
  title: string;
  body: string;
  source?: string;
  className?: string;
  imageAspect?: string;
  rounded?: string;
  imageSizes?: string;
}) {
  const palette = tones[tone];

  return (
    <div
      className={`group relative isolate flex h-full flex-col overflow-hidden ${rounded} border text-white transition-shadow duration-200 ${palette.panel} ${className}`}
    >
      <div className={`relative w-full shrink-0 overflow-hidden ${imageAspect}`}>
        <Image
          src={image}
          alt=""
          aria-hidden
          fill
          sizes={imageSizes}
          className="pointer-events-none select-none object-cover object-center opacity-[0.85] mix-blend-luminosity transition-transform duration-500 group-hover:scale-[1.05]"
        />
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${palette.scrim}`}
        />
        <span
          aria-hidden
          className="absolute left-5 top-5 flex size-[40px] items-center justify-center rounded-[11px] border border-white/25 bg-white/15 backdrop-blur-sm sm:left-6 sm:top-6"
        >
          <Icon size={19} strokeWidth={1.9} />
        </span>
      </div>

      <Image
        src={swoosh}
        alt=""
        aria-hidden
        sizes="400px"
        className="pointer-events-none absolute -right-8 bottom-[-14%] -z-10 h-[128%] w-auto select-none opacity-[0.14] mix-blend-screen"
      />

      <div className="flex flex-1 flex-col p-5 pt-[18px] sm:p-6 sm:pt-5">
        <p className="text-[clamp(1.1875rem,1.85vw,1.4375rem)] font-bold leading-[1.2] tracking-[-0.015em]">
          {stat}
        </p>
        <p className="mt-[5px] text-[12.5px] font-semibold uppercase tracking-[0.08em] text-white/60">
          {statNote}
        </p>

        <h3 className="mt-[18px] text-[17.5px] font-bold leading-[1.25] tracking-[-0.012em]">
          {title}
        </h3>
        <p className="mt-[9px] text-[14px] font-medium leading-[1.6] text-white/75">{body}</p>

        {source ? (
          <p className="mt-3 text-[12px] font-semibold leading-[1.45] text-white/50">{source}</p>
        ) : null}
      </div>
    </div>
  );
}
