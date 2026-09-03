"use client";

import { ArrowUpRight, CheckCircle2, Compass } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowButton } from "../ui/ArrowButton";
import { Card } from "../ui/Card";
import { portalRoutes } from "@/lib/config";

/**
 * What the student sees when it is done.
 *
 * The whole screen is written to a rule: say what was received, say what
 * happens next, and never imply a decision has been made. There is no "not
 * eligible" outcome here and there is no score — the server does not produce
 * one, because a public form has verified nothing, and a student reading a
 * refusal from a web page would act on it.
 *
 * The reference is shown because it is the thing a student quotes when they
 * ring, and because a submission that gives back nothing concrete feels like
 * it went nowhere.
 */

export type Result = {
  reference: string;
  overall_status: string;
  document_readiness: number;
  summary: string;
};

const HEADLINE: Record<string, string> = {
  preliminary_likely_eligible: "Likely eligible",
  needs_counsellor_review: "Needs further review",
  more_information_required: "A little more information needed",
};

export function ResultScreen({ result, firstName }: { result: Result; firstName: string }) {
  const reduce = useReducedMotion();
  const positive = result.overall_status === "preliminary_likely_eligible";

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="overflow-hidden p-6 sm:p-8 lg:p-10">
        <span
          aria-hidden
          className={`flex size-[48px] items-center justify-center rounded-[14px] ${
            positive ? "bg-emerald/10 text-emerald" : "bg-blue-link/10 text-blue-link"
          }`}
        >
          <CheckCircle2 size={26} strokeWidth={2.1} />
        </span>

        <h2 className="mt-5 max-w-[20ch] text-[clamp(1.5rem,2.6vw,2rem)] font-bold leading-[1.15] tracking-[-0.02em] text-navy">
          Your eligibility assessment is complete<span className="text-orange">.</span>
        </h2>
        <p className="mt-3 max-w-[62ch] text-[15.5px] font-medium leading-[1.6] text-muted">
          Thanks{firstName ? `, ${firstName}` : ""} — we&rsquo;ve received your information.
        </p>

        <div className="mt-7 rounded-xl border border-hairline bg-canvas p-5">
          <p className="text-[12.5px] font-bold uppercase tracking-[0.1em] text-blue-link">
            Preliminary assessment
          </p>
          <p className="mt-2 text-[clamp(1.125rem,1.8vw,1.375rem)] font-bold leading-[1.25] tracking-[-0.015em] text-navy">
            {HEADLINE[result.overall_status] ?? "Received"}
          </p>
          <p className="mt-3 max-w-[64ch] text-[14.5px] font-medium leading-[1.6] text-muted">
            {result.summary}
          </p>

          <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3 border-t border-hairline pt-4">
            <div>
              <dt className="text-[13px] font-medium text-muted">Document readiness</dt>
              <dd className="text-[15px] font-bold tabular-nums text-navy">
                {result.document_readiness}%
              </dd>
            </div>
            <div>
              <dt className="text-[13px] font-medium text-muted">Your reference</dt>
              <dd className="font-mono text-[15px] font-bold text-navy">{result.reference}</dd>
            </div>
          </dl>
        </div>

        <p className="mt-5 max-w-[64ch] text-[14px] font-medium leading-[1.6] text-muted">
          We&rsquo;ll contact you using the details you provided. This assessment is a preliminary
          indication based on the information you gave us — final university and visa decisions
          depend on additional requirements and document verification.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <ArrowButton href="/universities" className="px-[18px] py-[12px] text-[15px]">
            Continue exploring UK study options
          </ArrowButton>
          <Link
            href={portalRoutes.login}
            className="group inline-flex items-center gap-[8px] text-[15px] font-bold text-blue-link transition-colors duration-200 hover:text-navy"
          >
            Go to student dashboard
            <ArrowUpRight
              size={16}
              strokeWidth={2.4}
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
            />
          </Link>
        </div>
      </Card>

      <div className="mt-4 flex gap-3 rounded-xl border border-hairline bg-white p-[15px]">
        <Compass size={17} strokeWidth={2.1} aria-hidden className="mt-[1px] shrink-0 text-blue-link" />
        <p className="text-[13.5px] font-medium leading-[1.55] text-muted">
          While you wait: the{" "}
          <Link href="/courses" className="font-bold text-blue-link hover:text-navy">
            course explorer
          </Link>{" "}
          searches every course we list, and the{" "}
          <Link href="/money/calculator" className="font-bold text-blue-link hover:text-navy">
            cost calculator
          </Link>{" "}
          models a full year in any UK city.
        </p>
      </div>
    </motion.div>
  );
}
