"use client";

import { useRef } from "react";
import Image from "next/image";
import { journeySlides } from "@/data/home/journey";
import { useJourneyBackdrop } from "./useJourneyBackdrop";

/**
 * The hero's right-hand side: a full-bleed photographic backdrop that tells
 * the journey — the UK, a university, student life, graduation — by changing
 * underneath the headline. All motion lives in `useJourneyBackdrop`; this file
 * is markup, tagged with `data-j` so the controller can find each layer.
 *
 * THE BLEND is the one the single hero photograph used before it: from `lg`
 * the plate starts a third of the way across, its left edge is masked away,
 * and a canvas-coloured wash carries it under the headline so there is never
 * a hard edge. A light navy tint grounds every photograph in the brand. Below `lg` the plate becomes a band under the calls to action,
 * fading into the page at the top.
 *
 * It is pure imagery — no text, no controls — so, like the single photograph
 * before it, it is hidden from assistive technology; the headline beside it
 * carries the meaning. Every animated element is left without a React
 * `style` prop, so nothing React renders can overwrite what GSAP set inline.
 */
export function UKJourneyVisual() {
  const rootRef = useRef<HTMLDivElement>(null);
  useJourneyBackdrop(rootRef);

  return (
    <div
      ref={rootRef}
      aria-hidden
      data-j="backdrop"
      className="relative mt-10 h-[340px] select-none overflow-hidden sm:h-[460px] lg:absolute lg:inset-0 lg:mt-0 lg:h-auto"
    >
      <div className="pointer-events-none absolute inset-0 lg:left-[34%] lg:[mask-image:linear-gradient(to_right,transparent_0%,#000_16%)]"
      >
        {/* Parallax layer — the transitions never touch it. */}
        <div data-j="drift" className="absolute inset-0">
          {journeySlides.map((slide, i) => (
            <div key={slide.id} data-j="slide" className="absolute inset-0 overflow-hidden opacity-0">
              <div data-j="media" className="absolute -inset-[4%]">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  sizes="(min-width: 1024px) 72vw, 110vw"
                  placeholder="blur"
                  draggable={false}
                  {...(i === 0 ? { preload: true } : { loading: i === 1 ? "eager" : "lazy" })}
                  style={{ objectPosition: slide.focus }}
                  className="object-cover [filter:saturate(0.9)_brightness(0.97)_contrast(1.03)]"
                />
              </div>
            </div>
          ))}

          {/* The incoming photograph, cut into slices, blinds or a mosaic
              depending on the change. A pool of tiles the controller paints
              and positions each time. */}
          <div
            data-j="strips"
            className="invisible absolute inset-0 z-[4] overflow-hidden [filter:saturate(0.9)_brightness(0.97)_contrast(1.03)]"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} data-j="tile" className="absolute bg-no-repeat" />
            ))}
          </div>
        </div>

        <div className="absolute inset-0 bg-navy/[0.14]" />
        <div className="absolute inset-x-0 bottom-0 h-[38%] bg-[linear-gradient(to_top,rgba(1,22,111,0.55),rgba(1,22,111,0))]" />

      </div>

      {/* Fades the plate into the canvas on the headline side and at the top,
          so the photograph has no edge anywhere the page can see. */}
      <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(to_right,var(--color-canvas)_20%,rgba(251,250,254,0.9)_34%,rgba(251,250,254,0.44)_48%,rgba(251,250,254,0.12)_62%,rgba(251,250,254,0)_74%)] lg:block"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[16%] bg-[linear-gradient(to_bottom,var(--color-canvas),rgba(251,250,254,0))]"
      />

    </div>
  );
}
