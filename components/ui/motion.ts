"use client";

import { useReducedMotion } from "motion/react";

export const rise = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Entrance props for a staggered section. Both server and client always start
 * from "hidden"; reduced motion collapses the durations to zero instead of
 * changing the initial state, which would desync hydration.
 */
export function useEntrance(stagger = 0.08) {
  const reduce = useReducedMotion();

  return {
    container: {
      initial: "hidden" as const,
      animate: "show" as const,
      transition: reduce
        ? { duration: 0, staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: stagger, delayChildren: 0.05 },
    },
    item: {
      variants: rise,
      transition: reduce ? { duration: 0 } : { duration: 0.65, ease },
    },
  };
}

/**
 * The scroll-triggered counterpart to `useEntrance`, for the long content
 * pages. Same variants, same easing — only the trigger differs, so sections
 * further down the page arrive exactly as the hero does. `once` keeps the
 * page calm on the way back up.
 */
export function useReveal(stagger = 0.08) {
  const reduce = useReducedMotion();

  return {
    container: {
      initial: "hidden" as const,
      whileInView: "show" as const,
      viewport: { once: true, amount: 0.25 } as const,
      transition: reduce
        ? { duration: 0, staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: stagger, delayChildren: 0.05 },
    },
    item: {
      variants: rise,
      transition: reduce ? { duration: 0 } : { duration: 0.65, ease },
    },
  };
}
