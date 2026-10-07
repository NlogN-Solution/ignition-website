"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Vertical page progress reveals the full row before the section releases. */
export function HorizontalCardRail({ children, label, reverse = false }: {
  children: ReactNode;
  label: string;
  reverse?: boolean;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLUListElement>(null);
  const [travel, setTravel] = useState(0);
  const [rowHeight, setRowHeight] = useState(0);
  const [stickyTop, setStickyTop] = useState(96);

  useEffect(() => {
    const wrapper = stage.current;
    const row = rail.current;
    if (!wrapper || !row) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let distance = 0;
    let pinTop = 96;
    let frame = 0;
    let target = 0;
    let position = row.scrollLeft;
    let previousTime = 0;

    function animate(time: number) {
      if (!row) return;
      const elapsed = previousTime ? Math.min(time - previousTime, 64) : 16;
      previousTime = time;
      // Time-based easing keeps wheel steps soft at any display refresh rate.
      position += (target - position) * (1 - Math.exp(-elapsed / 110));
      if (Math.abs(target - position) < 0.25) position = target;
      row.scrollLeft = position;
      if (position !== target) {
        frame = requestAnimationFrame(animate);
      } else {
        frame = 0;
        previousTime = 0;
      }
    }

    function schedule() {
      if (!wrapper || !row || reducedMotion.matches || !distance) return;
      const progress = Math.max(0, Math.min(1, (pinTop - wrapper.getBoundingClientRect().top) / distance));
      // Courses travel right; universities travel left. Text stays LTR.
      target = (reverse ? 1 : -1) * progress * distance;
      if (!frame) {
        position = row.scrollLeft;
        frame = requestAnimationFrame(animate);
      }
    }

    function measure() {
      if (!row) return;
      // Adapt the pinned position to taller cards; phones retain native swiping.
      pinTop = Math.min(96, window.innerHeight - row.offsetHeight - 24);
      setStickyTop(pinTop);
      distance = reducedMotion.matches || window.innerWidth < 640
        ? 0 : Math.max(0, row.scrollWidth - row.clientWidth);
      if (!distance) {
        cancelAnimationFrame(frame);
        frame = 0;
        previousTime = 0;
      }
      setTravel(distance);
      setRowHeight(row.offsetHeight);
      schedule();
    }

    const observer = new ResizeObserver(measure);
    observer.observe(row);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    reducedMotion.addEventListener("change", measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      reducedMotion.removeEventListener("change", measure);
      cancelAnimationFrame(frame);
    };
  }, [reverse]);

  return (
    <div ref={stage} style={travel > 0 ? { height: rowHeight + travel } : undefined}>
      <div className={travel > 0 ? "sticky" : ""} style={travel > 0 ? { top: stickyTop } : undefined}>
        <ul
          ref={rail}
          dir={reverse ? "ltr" : "rtl"}
          aria-label={label}
          tabIndex={0}
          className="flex gap-6 overflow-x-auto overscroll-x-contain px-1 pt-1 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
        >
          {children}
        </ul>
      </div>
    </div>
  );
}
