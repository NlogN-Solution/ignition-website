"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";

const examples = [
  { name: "Nawaraj Bastakot", initials: "NB", stage: "Exploring my options", quote: "Course details, university options and entry requirements — having everything together makes building a shortlist feel much more manageable." },
  { name: "Suman Sapkota", initials: "SS", stage: "Preparing to apply", quote: "Getting my documents organised makes the next step feel a lot less overwhelming. I can focus on one thing at a time." },
  { name: "Kewal Niraula", initials: "KN", stage: "Following my journey", quote: "Knowing where my application stands helps me focus on what I need to do next, and when to ask for a little guidance." },
];

/** Illustrative feedback only; replace with consented testimonials when supplied. */
export function StudentVoices() {
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);

  return (
    <section aria-labelledby="student-voices-title" className="overflow-hidden border-t border-hairline bg-canvas py-[clamp(4rem,7vw,7rem)]">
      <Container>
        <div className="mx-auto max-w-[650px] text-center">
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-navy">A clearer student journey</p>
          <h2 id="student-voices-title" className="mt-3 font-display text-[clamp(1.875rem,3.1vw,2.75rem)] font-extrabold leading-[1.1] tracking-[-0.025em] text-navy">Less uncertainty. More room for your future.</h2>
          <p className="mt-4 text-[15px] font-medium leading-[1.6] text-muted">Finding your course, preparing your documents and understanding your next step.</p>
          <p className="mt-3 text-[13px] font-medium leading-[1.5] text-muted">Sample reviews · fictional names and comments.</p>
          <button type="button" onClick={() => setPaused((value) => !value)} aria-pressed={paused} className="mt-4 min-h-[44px] rounded-md px-4 text-[13px] font-semibold text-navy underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2">
            {paused ? "Resume card animation" : "Pause card animation"}
          </button>
        </div>
        <ul className="mt-7 grid gap-5 py-3 md:grid-cols-3 md:gap-6 md:py-8">
          {examples.map((example, index) => (
            <motion.li key={example.name} initial={false}
              animate={{ y: reduce || paused ? 0 : [0, -7, 0] }}
              transition={{ duration: reduce || paused ? 0 : 6 + index, repeat: reduce || paused ? 0 : Infinity, ease: "easeInOut", delay: reduce || paused ? 0 : index * 0.6 }}
              className={`relative rounded-md border border-hairline bg-white p-6 shadow-[0_12px_32px_-22px_rgba(1,22,111,0.25)] sm:p-7 ${index === 1 ? "md:translate-y-6" : ""}`}>
              <figure className="flex h-full flex-col">
                <Quote size={28} strokeWidth={1.4} aria-hidden className="text-orange" />
                <blockquote className="mb-7 mt-5 text-[17px] font-medium leading-[1.65] tracking-[-0.01em] text-navy">“{example.quote}”</blockquote>
                <figcaption className="mt-auto flex items-center gap-3 border-t border-hairline pt-5">
                  <span aria-hidden className="flex size-11 shrink-0 items-center justify-center rounded-full border border-navy/10 bg-navy/[0.04] font-display text-[13px] font-bold text-navy">{example.initials}</span>
                  <div className="min-w-0">
                    <p className="text-[15px] font-bold text-navy">{example.name}</p>
                    <p className="mt-1 text-[12px] font-medium text-muted">{example.stage}</p>
                  </div>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
