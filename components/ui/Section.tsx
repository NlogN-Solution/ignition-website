"use client";

import { motion } from "motion/react";
import { Container } from "./Container";
import { AccentText } from "./AccentText";
import { useReveal } from "./motion";

type Props = {
  /** Small uppercase label above the heading. */
  eyebrow?: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  /** Centre the heading block — used for the wider, more editorial sections. */
  align?: "left" | "center";
  /** Lift the band off the canvas to separate two adjacent sections. */
  surface?: boolean;
  id?: string;
  className?: string;
};

export function Section({
  eyebrow,
  title,
  intro,
  children,
  align = "left",
  surface = false,
  id,
  className = "",
}: Props) {
  const { container, item } = useReveal();
  const centered = align === "center";

  return (
    <section
      id={id}
      className={`py-[clamp(3.5rem,6vw,6.5rem)] ${
        surface ? "border-y border-hairline bg-white/55" : ""
      } ${className}`}
    >
      <Container>
        <motion.div
          {...container}
          className={centered ? "mx-auto max-w-[62ch] text-center" : "max-w-[62ch]"}
        >
          {eyebrow ? (
            <motion.p
              {...item}
              className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-blue-link"
            >
              {eyebrow}
            </motion.p>
          ) : null}

          <motion.h2
            {...item}
            className={`text-[clamp(1.875rem,3.4vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.02em] text-navy ${
              eyebrow ? "mt-3" : ""
            }`}
          >
            <AccentText>{title}</AccentText>
          </motion.h2>

          {intro ? (
            <motion.p
              {...item}
              className="mt-4 text-[clamp(1rem,1.2vw,1.125rem)] font-medium leading-[1.55] text-muted"
            >
              {intro}
            </motion.p>
          ) : null}
        </motion.div>

        <div className="mt-[clamp(2rem,3.5vw,3.25rem)]">{children}</div>
      </Container>
    </section>
  );
}
