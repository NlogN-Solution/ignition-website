"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Clock, ShieldCheck, Trophy } from "lucide-react";
import { AccordionGallery } from "../ui/AccordionGallery";
import { whyUkPoints, type WhyUkPoint } from "@/data/home/why-uk";

/**
 * The three reasons, as an image accordion with the argument underneath it.
 *
 * This band used to be three saturated cards side by side. It is now one
 * accordion: three photographs, the open one expanded, the other two narrowed
 * and tilted away. It is still the one moment on the homepage that argues
 * rather than navigates.
 *
 * ALL THREE PHOTOGRAPHS KEEP THEIR OWN COLOUR. The component desaturates
 * collapsed panels by default and veils them in the overlay colour at 0.35,
 * which turned two of the three into navy silhouettes — the pictures are of
 * people, and a greyed-out graduation is a worse advertisement than no
 * picture. `grayscale` is off and the veil is down to 0.14, which is enough
 * to seat the collapsed panels behind the open one without draining them.
 * Navy still supplies the legibility gradient under each caption, and orange
 * the accent bar.
 *
 * WHY THE COPY DID NOT GO WITH THE CARDS. An accordion shows one caption at a
 * time and nothing else, and these three claims are not decoration: each is a
 * figure with a year and a source attached, which is the whole reason the
 * section is persuasive rather than promotional. So the panel is the picture
 * and the headline, and the reasoning sits directly below, swapped in as the
 * open panel changes. Hovering a photograph changes the paragraph under it —
 * one subject at a time, in full, rather than three truncated at once.
 *
 * The panel below is a fixed height at `sm` and up. Its three bodies differ by
 * a line, and letting the block resize on hover made the entry points beneath
 * it jump every time the pointer crossed the gallery.
 *
 * THE GALLERY CYCLES ON ITS OWN. Most readers never hover a homepage band, and
 * a static accordion shows one of three reasons and hides the other two — so
 * it advances by itself and stops the instant a pointer or focus lands on it.
 * The hold is two seconds, which is long enough for the panel to settle after
 * its 0.6s transition and for the stat below it to register, and short enough
 * that all three are seen without the reader waiting. It is still shorter than
 * the paragraph underneath takes to read — a reader who wants to read one
 * stops the cycle by pointing at it, which is what makes the short hold
 * survivable.
 */

const icons: Record<WhyUkPoint["id"], typeof Clock> = {
  shorter: Clock,
  "top-ten": Trophy,
  quality: ShieldCheck,
};

const galleryItems = whyUkPoints.map((point) => ({
  image: point.image,
  label: point.title,
  // No `link`: the panel's job here is to open, and the reasoning below it
  // carries the call to action. A panel that navigated on its second click
  // would make the first click feel like a misfire.
  alt: "",
}));

export function WhyUk() {
  const [active, setActive] = useState(0);
  const point = whyUkPoints[active] ?? whyUkPoints[0];
  const Icon = icons[point.id] ?? Clock;

  return (
    <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
      <AccordionGallery
        items={galleryItems}
        defaultIndex={0}
        onActiveChange={setActive}
        accentColor="#fc5a07"
        overlayColor="#01166f"
        textColor="#ffffff"
        height={400}
        gap={8}
        radius={4}
        expandRatio={0.5}
        tilt={6}
        trigger="hover"
        autoPlay
        autoPlayDelay={2000}
        grayscale={false}
        dim={0.14}
      />

      {/* Sits beside the gallery rather than under it — a text block the
          width of the whole band left a dead strip of white to the right of
          a paragraph that never needed that much room. Narrower and
          vertically centred, it reads as the gallery's companion column
          instead of a second, under-filled band. */}
      <div className="flex flex-col justify-center rounded-md border border-hairline bg-white p-5 sm:p-6 lg:h-[400px]">
        <div className="flex flex-wrap items-start gap-x-5 gap-y-3">
          <span
            aria-hidden
            className="flex size-[40px] shrink-0 items-center justify-center rounded-md bg-navy text-white"
          >
            <Icon size={19} strokeWidth={1.9} />
          </span>

          <div className="min-w-0 flex-1">
            <p className="font-display text-[clamp(1.375rem,2.1vw,1.625rem)] font-extrabold tabular-nums leading-[1.05] tracking-[-0.02em] text-ink">
              {point.stat}
            </p>
            <p className="mt-[5px] text-[12.5px] font-semibold uppercase tracking-[0.08em] text-muted-light">
              {point.statNote}
            </p>
          </div>
        </div>

        {/* `key` on the copy, so a panel change replays the fade rather than
            cross-dissolving one sentence into another mid-word. */}
        <div key={point.id} className="mt-4 animate-[ag-copy-in_260ms_ease-out]">
          <p className="text-[14.5px] font-medium leading-[1.6] text-muted">
            {point.body}
          </p>

          {point.source ? (
            <p className="mt-2.5 text-[12px] font-semibold leading-[1.45] text-muted-light">
              {point.source}
            </p>
          ) : null}

          <Link
            href={point.href}
            className="group mt-4 inline-flex items-center gap-[9px] text-[14px] font-bold text-navy transition-colors duration-200 hover:text-orange"
          >
            {point.linkLabel}
            <ArrowRight
              size={16}
              strokeWidth={2.4}
              aria-hidden
              className="shrink-0 transition-transform duration-200 group-hover:translate-x-[3px]"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
