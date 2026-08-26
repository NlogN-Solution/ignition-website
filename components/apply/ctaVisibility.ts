"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

/**
 * Tracks whether an in-page "ready to apply" block is currently on screen.
 *
 * The floating shortlist prompt and the `ReadyToApply` band make the same
 * offer, so only one of them should ever be visible: a fixed card that lands
 * on top of the full-width version of itself obscures the better treatment in
 * order to repeat the weaker one.
 *
 * Registration is push-based rather than the prompt scanning the DOM for
 * `[data-ignition-cta]` on mount. That scan looked correct and was wrong in
 * the case that matters most: on the homepage the band is rendered by
 * `JourneyClose`, which only decides to render it *after* hydration has read
 * the student's saved research. A one-shot query at mount sees the fallback
 * band, observes an element that is then unmounted, and never learns about
 * the one that replaced it. Here each block reports its own visibility, so
 * appearing late, disappearing, or being swapped during a client-side
 * navigation all work without the prompt knowing any of it happened.
 */

let visibleCount = 0;
const listeners = new Set<() => void>();

function publish() {
  listeners.forEach((listener) => listener());
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

/** Attach to the conversion block's outermost element. */
export function useReportCtaVisibility<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  // Whether this particular block is currently counted, so unmounting while
  // visible decrements exactly once.
  const counted = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const setVisible = (visible: boolean) => {
      if (visible === counted.current) return;
      counted.current = visible;
      visibleCount += visible ? 1 : -1;
      publish();
    };

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      // A sliver counts: the prompt sits at the bottom of the viewport, so the
      // band only has to be creeping into view to collide with it.
      { threshold: 0 },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      setVisible(false);
    };
  }, []);

  return ref;
}

const NOT_VISIBLE = false;

export function useCtaOnScreen(): boolean {
  return useSyncExternalStore(
    useCallback(subscribe, []),
    () => visibleCount > 0,
    () => NOT_VISIBLE,
  );
}
