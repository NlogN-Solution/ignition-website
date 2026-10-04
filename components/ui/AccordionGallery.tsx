"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";

import "./AccordionGallery.css";

/**
 * An image accordion: a row of panels where one is expanded and the rest are
 * collapsed, dimmed and tilted away.
 *
 * From reactbits.dev, ported from the JavaScript variant to TypeScript to
 * match the rest of this codebase, with three corrections to the upstream
 * source:
 *
 * 1. **Ref callbacks are block-bodied.** Upstream writes
 *    `ref={el => (refs.current[i] = el)}`, which *returns* the assigned
 *    element. React 19 reads a returned function as a cleanup and warns about
 *    anything else, and this project is on React 19.
 * 2. **`--ag-dim` moved up to the panel** — see the note in the stylesheet.
 *    Upstream animates it on an element that is a sibling of the one reading
 *    it, so collapsed panels never dimmed at all.
 * 3. **`defaultIndex` is clamped against an empty list**, so `items={[]}`
 *    yields -1 rather than crashing on `items[NaN]`.
 *
 * `prefers-reduced-motion` is honoured by collapsing every duration to zero:
 * the layout still changes, it just arrives rather than travels.
 */

export type AccordionGalleryItem = {
  image: string;
  label?: string;
  link?: string;
  alt?: string;
};

export type AccordionGalleryProps = {
  items: AccordionGalleryItem[];
  defaultIndex?: number;
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  height?: number;
  gap?: number;
  radius?: number;
  expandRatio?: number;
  orientation?: "horizontal" | "vertical";
  duration?: number;
  ease?: string;
  parallax?: number;
  tilt?: number;
  stagger?: number;
  trigger?: "hover" | "click";
  showLabels?: boolean;
  grayscale?: boolean;
  /** How much the overlay colour veils a collapsed panel, 0–1. Lower keeps the
   *  photograph's own colour; 0 removes the veil entirely. */
  dim?: number;
  className?: string;
  /** Told the index of the panel that just opened, on every change. */
  onActiveChange?: (index: number) => void;
  /** Cycle through the panels on their own, so the gallery shows what it holds
   *  without being touched. Pauses whenever the reader is actually using it. */
  autoPlay?: boolean;
  /** How long each panel is held, in milliseconds. */
  autoPlayDelay?: number;
};

export function AccordionGallery({
  items,
  defaultIndex = 0,
  accentColor = "#ffffff",
  overlayColor = "#060010",
  textColor = "#ffffff",
  height = 460,
  gap = 10,
  radius = 16,
  expandRatio = 0.52,
  orientation = "horizontal",
  duration = 0.6,
  ease = "power3.out",
  parallax = 0.5,
  tilt = 8,
  stagger = 0.06,
  trigger = "hover",
  showLabels = true,
  grayscale = true,
  dim = 0.35,
  className = "",
  onActiveChange,
  autoPlay = false,
  autoPlayDelay = 3000,
}: AccordionGalleryProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const mediaRefs = useRef<(HTMLElement | null)[]>([]);
  const barRefs = useRef<(HTMLElement | null)[]>([]);
  const textRefs = useRef<(HTMLElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(320);

  const vertical = orientation === "vertical";
  const count = items.length;
  const [active, setActive] = useState(() => Math.min(Math.max(defaultIndex, 0), count - 1));
  //: The gallery is on screen. Starts false so the cycle begins when it is
  //: scrolled to rather than a third of the way through on arrival.
  const [onScreen, setOnScreen] = useState(false);

  const prefersReduced =
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const applyLayout = useCallback(
    (animate: boolean) => {
      const panels = panelRefs.current;
      if (!panels.length) return;

      const ratio = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (ratio * (count - 1)) / (1 - ratio) : 1;
      const mediaSize = mediaSizeRef.current;

      tlRef.current?.kill();
      const dur = animate && !prefersReduced ? duration : 0;
      const tl = gsap.timeline();

      panels.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === active;
        const media = mediaRefs.current[i];
        const bar = barRefs.current[i];
        const text = textRefs.current[i];

        const rot = isActive ? 0 : i < active ? tilt : -tilt;
        const rotProp = vertical ? { rotateX: -rot } : { rotateY: rot };

        tl.to(
          panel,
          {
            flexGrow: isActive ? grow : 1,
            ...rotProp,
            // Both variables live on the panel so the media (which reads
            // --ag-gray) and the overlay (which reads --ag-dim) each inherit
            // the one they need.
            "--ag-gray": grayscale ? (isActive ? 0 : 1) : 0,
            "--ag-dim": isActive ? 0 : Math.min(Math.max(dim, 0), 1),
            duration: dur,
            ease,
          },
          0,
        );

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - i));
          const shift = drift * parallax * mediaSize * 0.06;
          tl.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: vertical ? 0 : isActive ? 0 : shift,
              y: vertical ? (isActive ? 0 : shift) : 0,
              duration: dur,
              ease,
            },
            0,
          );
        }

        if (showLabels && bar && text) {
          if (isActive) {
            tl.to(
              [bar, text],
              { opacity: 1, x: 0, duration: dur, ease, stagger: prefersReduced ? 0 : stagger },
              0,
            );
          } else {
            tl.to([bar, text], { opacity: 0, x: -14, duration: dur * 0.6, ease }, 0);
          }
        }
      });

      tlRef.current = tl;
    },
    [
      active,
      count,
      expandRatio,
      duration,
      ease,
      vertical,
      tilt,
      parallax,
      grayscale,
      dim,
      showLabels,
      stagger,
      prefersReduced,
    ],
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const total = vertical ? rect.height : rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const size = Math.max(140, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22);
      mediaSizeRef.current = size;
      el.style.setProperty("--ag-media-size", `${size}px`);
      applyLayout(!firstRunRef.current);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [applyLayout, gap, count, expandRatio, vertical]);

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(() => () => void tlRef.current?.kill(), []);

  const onActiveChangeRef = useRef(onActiveChange);
  onActiveChangeRef.current = onActiveChange;

  const open = useCallback((index: number) => setActive(index), []);

  /**
   * Tell the parent which panel is open, once per change, after commit.
   *
   * Not from the click handler and emphatically not from inside the
   * `setActive` updater: React runs an updater during the render phase, so
   * calling a parent's setter there is "Cannot update a component while
   * rendering a different component" — it warned, and on a bad day it drops
   * the update. An effect keyed on `active` covers every route in (pointer,
   * keyboard, the autoplay tick) with one notification apiece.
   */
  useEffect(() => {
    onActiveChangeRef.current?.(active);
  }, [active]);

  /**
   * Watch whether the gallery is actually on screen.
   *
   * Without this the cycle runs from page load, so a reader who scrolls down
   * to the section arrives partway through it — and a timer keeps firing
   * layout work for a component nobody can see.
   */
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !autoPlay) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [autoPlay]);

  /**
   * The cycle.
   *
   * Each tick asks whether the reader is on it — pointer over the gallery, or
   * focus inside it — and skips if so, because content that moves itself out
   * from under someone reading it is worse than content that never moved. It
   * never starts at all under `prefers-reduced-motion`: auto-advancing is
   * motion the reader did not ask for, which is the case that setting exists
   * for.
   */
  useEffect(() => {
    if (!autoPlay || !onScreen || prefersReduced || count < 2) return;
    const id = window.setInterval(() => {
      const el = rootRef.current;
      if (!el) return;

      // Asked of the DOM on each tick rather than tracked in state from
      // `onMouseEnter` / `onMouseLeave`. The panels resize and tilt in 3D
      // under a stationary pointer, which means the element beneath the
      // cursor keeps changing and enter/leave pairs get lost — the state
      // version read as "not hovered" while the pointer was sitting on the
      // gallery, and it carried on advancing under the reader. `:hover` is
      // the browser's own hit test, so it cannot fall out of step.
      if (el.matches(":hover")) return;
      if (document.activeElement instanceof Node && el.contains(document.activeElement)) return;

      setActive((current) => (current + 1) % count);
    }, Math.max(autoPlayDelay, 200));
    return () => window.clearInterval(id);
  }, [autoPlay, autoPlayDelay, onScreen, prefersReduced, count]);

  const handleKeyDown = (i: number, event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      open((i + 1) % count);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      open((i - 1 + count) % count);
    }
  };

  return (
    <div
      ref={rootRef}
      className={`accordion-gallery${vertical ? " accordion-gallery--vertical" : ""}${
        className ? ` ${className}` : ""
      }`}
      style={
        {
          "--ag-accent": accentColor,
          "--ag-overlay": overlayColor,
          "--ag-text": textColor,
          "--ag-gap": `${gap}px`,
          "--ag-radius": `${radius}px`,
          height: vertical ? `${Math.round(height * 1.6)}px` : `${height}px`,
        } as React.CSSProperties
      }
      role="list"
      aria-label="Image accordion gallery"
    >
      {items.map((item, i) => {
        const isActive = i === active;
        const Tag = (item.link ? "a" : "div") as "a";
        return (
          <Tag
            key={item.link ?? item.image ?? i}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
            className={`ag-panel${isActive ? " ag-panel--active" : ""}`}
            style={{ borderRadius: `${radius}px` }}
            href={item.link || undefined}
            // A collapsed panel opens on the first click and follows its link
            // on the second — on a touch screen there is no hover, so the first
            // tap has to be allowed to mean "show me this one".
            onClick={(event) => {
              if (i !== active) {
                event.preventDefault();
                open(i);
              }
            }}
            onMouseEnter={() => {
              if (trigger === "hover") open(i);
            }}
            onFocus={() => open(i)}
            onKeyDown={(event) => handleKeyDown(i, event)}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? "true" : undefined}
            aria-label={item.label}
          >
            <span className="ag-panel__frame">
              <span
                className="ag-panel__media"
                ref={(el) => {
                  mediaRefs.current[i] = el;
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- the
                    panel resizes continuously and the media is deliberately
                    wider than its frame, which is the parallax; next/image
                    wants a fixed box or `fill` and would fight both. */}
                <img src={item.image} alt={item.alt || item.label || ""} draggable="false" />
              </span>
              <span className="ag-panel__overlay" aria-hidden="true" />
            </span>
            {showLabels && (
              <span className="ag-panel__label" aria-hidden="true">
                <span
                  className="ag-panel__bar"
                  ref={(el) => {
                    barRefs.current[i] = el;
                  }}
                />
                <span
                  className="ag-panel__text"
                  ref={(el) => {
                    textRefs.current[i] = el;
                  }}
                >
                  {item.label}
                </span>
              </span>
            )}
          </Tag>
        );
      })}
    </div>
  );
}

export default AccordionGallery;
