"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Clock } from "lucide-react";
import type { University } from "@/data/universities";
import { EligibilityWizard } from "./EligibilityWizard";
import { STEPS } from "./types";

/**
 * The page before the form, and the form.
 *
 * The brief's rule, and the reason this component exists: **do not dump the
 * whole assessment below the call to action.** A visitor who has not decided
 * to start should see the offer, roughly what it will ask and how long it
 * takes — seven quiet labels, not seven live forms. Pressing the button is
 * what replaces all of that with the wizard.
 *
 * The overview stays mounted-then-swapped rather than living on a second
 * route: the assessment keeps its draft in local storage and nothing about it
 * belongs in the URL, so a navigation would cost a page load and buy nothing.
 */
export function EligibilityIntro({ universities }: { universities: University[] }) {
  const [started, setStarted] = useState(false);
  const reduce = useReducedMotion();

  if (started) {
    return <EligibilityWizard universities={universities} />;
  }

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-hairline bg-white p-6 shadow-[0_18px_40px_-28px_rgba(1,22,111,0.28)] sm:p-8 lg:p-10"
    >
      <p className="text-[12.5px] font-bold uppercase tracking-[0.1em] text-blue-link">
        Check your eligibility
      </p>
      <h2 className="mt-3 max-w-[16ch] text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.025em] text-navy">
        Can you apply? Let&rsquo;s check<span className="text-orange">.</span>
      </h2>
      <p className="mt-4 max-w-[58ch] text-[clamp(0.9375rem,1.15vw,1.0625rem)] font-medium leading-[1.6] text-muted">
        Get a personalised view of your eligibility based on your academic background, English
        qualification, finances and chosen UK course.
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setStarted(true)}
          className="inline-flex items-center gap-[10px] rounded-[10px] bg-blue-bright px-[20px] py-[13px] text-[15.5px] font-semibold text-white transition-[background-color,box-shadow,transform] duration-200 hover:bg-blue-link hover:shadow-[0_12px_32px_-14px_rgba(16,113,246,0.8)] active:scale-[0.985]"
        >
          Check my eligibility
          <span aria-hidden>→</span>
        </button>

        <span className="inline-flex items-center gap-[9px] rounded-[10px] border border-hairline bg-canvas px-[14px] py-[11px] text-[13.5px] font-medium text-muted">
          <Clock size={15} strokeWidth={2.1} aria-hidden className="text-blue-link" />
          Takes about 3 minutes · no account needed
        </span>
      </div>

      <div className="mt-9 border-t border-hairline pt-7">
        <p className="text-[13.5px] font-semibold text-navy">What we&rsquo;ll ask</p>
        <ol className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li key={step.id} className="flex items-start gap-[10px]">
              <span
                aria-hidden
                className="mt-[1px] flex size-[24px] shrink-0 items-center justify-center rounded-lg bg-navy/[0.06] text-[11.5px] font-bold tabular-nums text-navy"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span className="block text-[14px] font-semibold leading-[1.35] text-ink">
                  {step.title}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </motion.div>
  );
}
