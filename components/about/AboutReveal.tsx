"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/** Content starts visible in the server HTML, including without JavaScript. */
export function AboutReveal({ children, className = "", entrance = false, delay = 0 }: {
  children: ReactNode;
  className?: string;
  entrance?: boolean;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const reveal = reduce ? { opacity: 1, y: 0 } : { opacity: [0.8, 1], y: [10, 0] };

  return (
    <motion.div
      className={className}
      initial={false}
      {...(entrance ? { animate: reveal } : { whileInView: reveal })}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduce ? 0 : 0.55, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
