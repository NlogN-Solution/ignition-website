import Image from "next/image";
import type { University } from "@/data/universities";

/**
 * The logo lockup for a university card and page header.
 *
 * These universities are fictional, so the monogram is a placeholder waiting
 * for an asset rather than a design choice.
 *
 * `tone` exists because the page header now sits on a photograph. The default
 * monogram is navy on a 5% navy tile, which is correct on canvas and
 * completely invisible on a dark image — so on a photograph the tile goes
 * solid white and keeps the navy mark.
 *
 * The monogram is never the accessible name: the university's full name sits
 * beside it in every place this is used, so the mark is `aria-hidden`.
 */
export function UniversityLogo({
  university,
  size = "md",
  tone = "default",
}: {
  university: University;
  /** `sm` for cards, `md` for the page header. */
  size?: "sm" | "md";
  /** `onImage` for a dark photographic ground. */
  tone?: "default" | "onImage";
}) {
  const box = {
    sm: "size-[44px] rounded-[11px] text-[13.5px]",
    md: "size-[64px] rounded-[15px] text-[18px] sm:size-[76px] sm:rounded-[18px] sm:text-[21px]",
  }[size];

  if (university.logo) {
    return (
      <span
        className={`relative flex shrink-0 items-center justify-center overflow-hidden border border-hairline bg-white ${box}`}
      >
        <Image
          src={university.logo}
          alt=""
          aria-hidden
          fill
          sizes="76px"
          className="object-contain p-[14%]"
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center border font-bold tracking-[0.02em] text-navy ${
        tone === "onImage"
          ? "border-white/30 bg-white shadow-[0_14px_30px_-16px_rgba(2,15,83,0.9)]"
          : "border-navy/12 bg-navy/[0.055]"
      } ${box}`}
    >
      {university.monogram ?? university.name.slice(0, 2).toUpperCase()}
    </span>
  );
}
