"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, ShieldCheck, type LucideIcon } from "lucide-react";
import { trustStats, type TrustStat } from "@/data/home/trust";

gsap.registerPlugin(ScrollTrigger);

/**
 * The track record, revealed as the page scrolls.
 *
 * A small rounded window opens on the student's face and widens, as you
 * scroll, into the full photograph while the picture settles from a close
 * crop to its natural framing. Then the two figures count up on the empty
 * side of the photograph — 0 → 99%, 0 → 90 days — each with its label and
 * one line of evidence.
 *
 * EVERYTHING IS ANCHORED ON THE FACE. The window, the zoom origin and the
 * crop are all set from where her face is (`FACE`, `FOCUS_*`), so the head is
 * in frame at every point of the scroll rather than cropped by a centred zoom.
 *
 * THE STAGE PINS BELOW THE HEADER, not at the top of the viewport — pinned
 * at `top: 0` the sticky header sat over the top of the picture for the
 * whole reveal.
 *
 * THE FIGURES NEVER COVER HER. From `md` the photograph occupies the right
 * 70% of the frame and dissolves at its left edge into a backdrop of the same
 * pale blue, which leaves a clean column for the numbers; on phones, where
 * the crop is portrait, they sit along the bottom over a soft white fade. The palette stays the brand's: navy figures, an orange accent,
 * blue labels.
 *
 * Driven by one scrubbed GSAP timeline with a little lag, so the reveal feels
 * weighted rather than bolted to the scrollbar. Reduced motion skips the
 * reveal and shows the finished frame.
 */

/** Where her face is in the photograph, as percentages of its width and height. */
const FACE = { x: 55, y: 20 };

/**
 * Where her face lands in the *frame*. From `md` the photograph fills only the
 * right 70% of the frame (the left is the figures' column), which puts her
 * face about two-thirds of the way across; on phones it fills the frame.
 */
const FOCUS_WIDE = { x: 68, y: 22 };
const FOCUS_NARROW = { x: 50, y: 22 };

const icons: Record<TrustStat["icon"], LucideIcon> = {
  shield: ShieldCheck,
  clock: Clock,
};

/** "99%" → { value: 99, suffix: "%" }; "90 days" → { value: 90, suffix: " days" }. */
function splitStat(stat: string) {
  const match = /^(\d+)(.*)$/.exec(stat);
  return match ? { value: Number(match[1]), suffix: match[2] } : { value: null, suffix: stat };
}

function Figure({ entry }: { entry: TrustStat }) {
  const Icon = icons[entry.icon];
  const { value, suffix } = splitStat(entry.stat);

  return (
    <li data-w="stat" className="min-w-0">
      <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-navy sm:text-[12px]">
        <Icon size={15} strokeWidth={2.25} aria-hidden className="shrink-0" />
        {entry.label}
      </p>
      <p className="font-display mt-2 flex flex-wrap items-baseline gap-x-3 font-extrabold leading-[0.9] tracking-[-0.04em] text-ink">
        <span className="text-[clamp(2.75rem,7.2vw,7.25rem)]">
          <span data-w="count" data-to={value ?? undefined} className="tabular-nums">
            {value ?? ""}
          </span>
          {/* A symbol stays full size beside the figure; a word ("days")
              drops to a smaller cut so the figure keeps one line. */}
          <span
            className={
              suffix.trim().length > 1
                ? "ml-[0.18em] text-[0.42em] tracking-[-0.02em] text-orange"
                : "text-orange"
            }
          >
            {suffix.trim().length > 1 ? suffix.trim() : suffix}
          </span>
        </span>
        {entry.statNote ? (
          <span className="text-[clamp(0.85rem,1.2vw,1.05rem)] font-semibold tracking-normal text-navy">
            {entry.statNote}
          </span>
        ) : null}
      </p>
      <p className="mt-3 hidden max-w-[36ch] text-[clamp(0.9rem,1.05vw,1rem)] font-medium leading-[1.6] text-ink/70 sm:block">
        {entry.body}
      </p>
    </li>
  );
}

export function WhyIgnition() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visaRate] = trustStats;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia(root);
    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        wide: "(min-width: 768px)",
      },
      (context) => {
        const { motion, wide } = context.conditions as Record<string, boolean>;
        if (!motion) return;

        const q = gsap.utils.selector(root);
        const stage = q("[data-w=stage]")[0] as HTMLElement;
        const frame = q("[data-w=frame]")[0] as HTMLElement;
        const media = q("[data-w=media]")[0] as HTMLElement;
        const fade = q("[data-w=fade]")[0] as HTMLElement;
        const hint = q("[data-w=hint]")[0] as HTMLElement;
        const stats = q("[data-w=stat]") as HTMLElement[];
        const counts = q("[data-w=count]") as HTMLElement[];

        // The opening window: a portrait of her, centred on her face and
        // kept inside the frame.
        const focus = wide ? FOCUS_WIDE : FOCUS_NARROW;
        const win = wide ? { w: 28, h: 56 } : { w: 62, h: 46 };
        const left = gsap.utils.clamp(0, 100 - win.w, focus.x - win.w / 2);
        const top = gsap.utils.clamp(0, 100 - win.h, focus.y + 12 - win.h / 2);
        const inset = (t: number, r: number, b: number, l: number, radius: number) =>
          `inset(${t}% ${r}% ${b}% ${l}% round ${radius}px)`;

        const navH = () =>
          parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 0;

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: () => `top ${navH()}px`,
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        // 0 → 0.5: the window opens on her face and the photograph settles.
        tl.fromTo(
          frame,
          { clipPath: inset(top, 100 - left - win.w, 100 - top - win.h, left, 12) },
          { clipPath: inset(0, 0, 0, 0, 4), duration: 0.5, ease: "power2.inOut" },
          0,
        )
          .fromTo(
            media,
            { scale: 1.35, transformOrigin: `${FACE.x}% ${FACE.y}%` },
            { scale: 1, duration: 0.5, ease: "power2.out" },
            0,
          )
          .to(hint, { opacity: 0, y: 8, duration: 0.08 }, 0)
          // The white fade that the figures sit on.
          .fromTo(fade, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.34)
          // A slow drift through the rest of the scroll, so the picture never
          // freezes while the figures arrive.
          .to(media, { yPercent: -2.5, duration: 0.5 }, 0.5);

        // 0.45 → 0.9: each figure rises in and counts up, one after the other.
        stats.forEach((stat, i) => {
          const at = 0.46 + i * 0.18;
          tl.fromTo(
            stat,
            { opacity: 0, y: 36 },
            { opacity: 1, y: 0, duration: 0.14, ease: "power2.out" },
            at,
          );
          const count = counts[i];
          const to = Number(count?.dataset.to);
          if (count && Number.isFinite(to)) {
            const n = { v: 0 };
            count.textContent = "0";
            tl.to(
              n,
              {
                v: to,
                duration: 0.2,
                ease: "power1.out",
                onUpdate: () => {
                  count.textContent = String(Math.round(n.v));
                },
              },
              at + 0.02,
            );
          }
        });
        tl.to({}, { duration: 0.1 }, 0.9);

        ScrollTrigger.refresh();

        return () => {
          counts.forEach((count) => {
            if (count.dataset.to) count.textContent = count.dataset.to;
          });
          gsap.set([frame, media, fade, hint, ...stats, stage], { clearProps: "all" });
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    // The track is what the page scrolls through while the stage holds still.
    // No `overflow-hidden` on any ancestor: that would turn sticky back into
    // static.
    <div ref={rootRef} className="relative h-[260svh] motion-reduce:h-auto">
      <div
        data-w="stage"
        className="sticky top-[var(--nav-h)] flex h-[calc(100svh-var(--nav-h))] items-center py-4 motion-reduce:static motion-reduce:h-[min(80svh,760px)] sm:py-6"
      >
        <div
          data-w="frame"
          className="relative h-full w-full overflow-hidden rounded-md bg-[linear-gradient(to_bottom,#f2f3f6,#e2e4ea)]"
        >
          <div
            data-w="media"
            className="absolute inset-0 md:left-[30%] md:[mask-image:linear-gradient(to_right,transparent_0%,#000_24%)]"
          >
            <Image
              src={visaRate.image ?? ""}
              alt="An Ignition student celebrating with her passport and suitcase after her UK visa was granted."
              fill
              sizes="(min-width: 1280px) 900px, (min-width: 768px) 70vw, 100vw"
              style={{ objectPosition: `${FACE.x}% ${FACE.y}%` }}
              className="object-cover"
            />
          </div>

          {/* The surface the figures sit on: from the left on wide screens,
              from the bottom on phones, so it never covers her face. */}
          <div
            data-w="fade"
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(251,250,254,0.97)_0%,rgba(251,250,254,0.9)_40%,rgba(251,250,254,0)_66%)] md:bg-[linear-gradient(to_right,rgba(251,250,254,0.7)_0%,rgba(251,250,254,0.45)_30%,rgba(251,250,254,0)_46%)]"
          />

          <ul className="absolute inset-x-0 bottom-0 grid grid-cols-2 gap-5 p-6 pb-24 sm:p-8 sm:pb-24 md:inset-y-0 md:right-auto md:w-[40%] md:grid-cols-1 md:content-center md:gap-[clamp(1.75rem,4vh,3rem)] md:py-10 md:pl-[5%] md:pr-0">
            {trustStats.map((entry) => (
              <Figure key={entry.id} entry={entry} />
            ))}
          </ul>
        </div>

        <p
          data-w="hint"
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-8 text-center text-[12.5px] font-semibold uppercase tracking-[0.14em] text-muted-light motion-reduce:hidden"
        >
          Keep scrolling
        </p>
      </div>
    </div>
  );
}
