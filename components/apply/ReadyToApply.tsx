"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { AccentText } from "../ui/AccentText";
import { StartApplicationButton } from "./StartApplicationButton";
import { useReportCtaVisibility } from "./ctaVisibility";
import { useResearch } from "@/lib/handoff/useResearch";
import { useSessionHint } from "@/lib/session/useSessionHint";

/**
 * The conversion moment, placed where a student has plausibly finished
 * deciding rather than everywhere.
 *
 * It leads with what they have already done — their own shortlist, read back
 * to them — because the argument for creating an account is that the work
 * carries over, not that Ignition would like a lead. Students who have
 * researched nothing get the same block without the summary, and a softer
 * headline.
 */
export function ReadyToApply({
  title = "Ready to take the next step?",
  intro,
}: {
  title?: string;
  intro?: string;
}) {
  const { draft, comparedCount, hasAnything } = useResearch();
  const signedIn = useSessionHint();
  // Tells the contact widget to stand down while this is on screen.
  const sectionRef = useReportCtaVisibility<HTMLElement>();

  const summary = [
    draft.career ? `Career goal: ${draft.career.title}` : null,
    draft.alsoMatched?.length
      ? `${draft.alsoMatched.length} other career${draft.alsoMatched.length === 1 ? "" : "s"} matched`
      : null,
    comparedCount >= 2 ? `${comparedCount} universities compared` : null,
    draft.budget ? "Your cost estimate" : null,
  ].filter(Boolean) as string[];

  return (
    <section ref={sectionRef} className="border-t border-hairline bg-white/55">
      <Container className="py-[clamp(3rem,5vw,5rem)]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <h2 className="max-w-[20ch] text-[clamp(1.5rem,2.4vw,2.125rem)] font-bold leading-[1.12] tracking-[-0.02em] text-navy">
              <AccentText>{title}</AccentText>
            </h2>

            <p className="mt-4 max-w-[52ch] text-[16px] font-medium leading-[1.6] text-muted">
              {intro ??
                (hasAnything
                  ? "You’ve done the research. Ignition turns it into an application — and everything you worked out comes with you."
                  : "When you’re ready to apply, Ignition takes over: one profile, real document review, and an advisor who stays with you to the UK.")}
            </p>

            {summary.length && !signedIn ? (
              <div className="mt-7 rounded-xl border border-hairline bg-canvas p-5">
                <p className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-blue-link">
                  What comes with you
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                  {summary.map((line) => (
                    <li
                      key={line}
                      className="flex items-center gap-[9px] text-[15px] font-semibold text-navy"
                    >
                      <Check size={15} strokeWidth={2.6} aria-hidden className="text-orange" />
                      {line}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[13.5px] font-medium leading-[1.55] text-muted-light">
                  Saved in this browser today. Create your account and it moves to your
                  Ignition profile — nothing is submitted anywhere until you and your
                  advisor decide to.
                </p>
              </div>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <StartApplicationButton>
                {hasAnything
                  ? "Turn my research into an application"
                  : "Start my application"}
              </StartApplicationButton>
              <Link
                href="/apply/with-ignition"
                className="inline-flex h-[52px] items-center justify-center whitespace-nowrap rounded-[10px] border border-hairline bg-white/70 px-7 text-[16px] font-semibold text-navy transition-colors duration-200 hover:border-ring-idle hover:bg-white"
              >
                How it works
              </Link>
            </div>
          </div>

          <ul className="grid gap-x-8 gap-y-4 self-center sm:grid-cols-2 lg:grid-cols-1 lg:gap-y-[13px]">
            {[
              "One profile, reused for every application",
              "Documents reviewed by a real advisor",
              "Every status change tracked and dated",
              "Messages with your Ignition advisor",
              "Visa and pre-departure in the same place",
            ].map((line) => (
              <li key={line} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-[3px] flex size-[19px] shrink-0 items-center justify-center rounded-full bg-navy/[0.07]"
                >
                  <Check size={12} strokeWidth={3} className="text-navy" />
                </span>
                <span className="text-[15.5px] font-medium leading-[1.5] text-ink-soft">
                  {line}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
