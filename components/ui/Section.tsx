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

  const eyebrowBlock = eyebrow ? (
    <motion.p
      {...item}
      className="flex items-center gap-2.5 text-[12.5px] font-bold uppercase tracking-[0.14em] text-navy"
    >
      <span aria-hidden className="h-px w-6 bg-navy/45" />
      {eyebrow}
    </motion.p>
  ) : null;

  const titleBlock = (
    <motion.h2
      {...item}
      className={`font-display text-[clamp(1.875rem,3.1vw,2.75rem)] font-extrabold leading-[1.05] tracking-[-0.025em] text-ink ${
        eyebrow ? "mt-3" : ""
      }`}
    >
      <AccentText>{title}</AccentText>
    </motion.h2>
  );

  return (
    <section
      id={id}
      className={`py-[clamp(4rem,7vw,8rem)] ${
        surface ? "border-y border-hairline bg-white/55" : ""
      } ${className}`}
    >
      <Container>
        {centered ? (
          <motion.div {...container} className="mx-auto max-w-[62ch] text-center">
            {eyebrowBlock ? (
              <div className="flex justify-center">{eyebrowBlock}</div>
            ) : null}
            {titleBlock}
            {intro ? (
              <motion.p
                {...item}
                className="mt-4 text-[clamp(1rem,1.2vw,1.125rem)] font-medium leading-[1.55] text-muted"
              >
                {intro}
              </motion.p>
            ) : null}
          </motion.div>
        ) : (
          // The editorial default: a wide headline column and a narrower,
          // independent intro column — not a headline stacked over its own
          // caption. The gap between col 7 and col 9 is a deliberate visual
          // rest, not a missing column.
          <motion.div
            {...container}
            className="grid gap-x-10 gap-y-5 lg:grid-cols-12 lg:items-start"
          >
            <div className="lg:col-span-7">
              {eyebrowBlock}
              {titleBlock}
            </div>
            {intro ? (
              <motion.p
                {...item}
                className="text-[clamp(1rem,1.2vw,1.125rem)] font-medium leading-[1.55] text-muted lg:col-span-4 lg:col-start-9 lg:pt-[0.45em]"
              >
                {intro}
              </motion.p>
            ) : null}
          </motion.div>
        )}

        <div className="mt-[clamp(2.25rem,3.5vw,3.5rem)]">{children}</div>
      </Container>
    </section>
  );
}
