"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  Clock3,
  Compass,
  Check,
  MapPin,
  Phone,
  PoundSterling,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Card } from "../ui/Card";
import { GatewayMotif } from "../ui/GatewayMotif";
import { useJourneyProgress } from "@/lib/journey/useJourneyProgress";
import type { Milestone } from "@/lib/journey/progress";

/** Keyed on `NextAction["id"]` — every rule in `lib/journey/progress.ts`
 * names one of these. Falls back to `Compass` for any id added there
 * without a matching entry here. */
const actionIcons: Record<string, LucideIcon> = {
  "eligibility-resume": ClipboardCheck,
  "quiz-resume": Compass,
  quiz: Compass,
  position: MapPin,
  courses: BookOpen,
  budget: PoundSterling,
  eligibility: ClipboardCheck,
  adviser: Phone,
  settled: Sparkles,
};

/** One colour per milestone domain, the same disciplined set used on the
 * homepage's own entry-point cards — not a fifth invented hue. */
const milestoneTheme: Record<
  Milestone["id"],
  { icon: LucideIcon; tone: string }
> = {
  career: { icon: Compass, tone: "border-navy/20 bg-navy/[0.06] text-navy" },
  position: { icon: MapPin, tone: "border-blue-bright/25 bg-blue-bright/[0.07] text-blue-bright" },
  budget: { icon: PoundSterling, tone: "border-orange/25 bg-orange/[0.07] text-orange" },
  eligibility: { icon: ClipboardCheck, tone: "border-emerald/25 bg-emerald/[0.07] text-emerald" },
};

/**
 * The homepage's next-step panel — what replaced "Where are you in your UK
 * journey?".
 *
 * WHAT WAS WRONG WITH THE QUESTION. It asked the student to place themselves
 * in one of seven descriptions before the section did anything, and half the
 * band sat empty until they did. Several of the seven were the same person
 * ("I'm exploring my options" and "I don't know what I want to study"), so
 * the answer was a coin toss; and because picking differently changed nothing
 * visible, the ambiguity quietly told the reader their answer did not matter.
 * What it paid out was five to eight links to pages the navbar already
 * carried.
 *
 * WHAT THIS DOES INSTEAD. It stops asking and starts reflecting. The site
 * already knows the answer to most of that question — the quiz wrote a
 * profile, the calculator wrote a budget, the eligibility wizard wrote a
 * draft and then a receipt — so the panel shows the student their own marks
 * back, with their own figures on them, and names the single next thing worth
 * doing. `lib/journey/progress` holds the ordering rules.
 *
 * NEITHER HALF IS EVER EMPTY. On a first visit the left card is a real
 * recommendation at full strength rather than a placeholder, and the right
 * column is the ladder with its rungs still blank — each one saying what it
 * would give you rather than merely that it is undone. That is the whole
 * difference from the old empty state: a cold visitor is told what this
 * section is *for*, in the shape it will take once they have used it.
 *
 * The stage question did not disappear, it moved: `JourneyPipeline` carries
 * it now, as one click on the chapter of a map the reader can already see.
 * That is the ordering `/start` arrived at for the same reason — you cannot
 * place yourself on a route you have not been shown.
 */
export function NextStep() {
  const { milestones, next, done, total, quizAnswered, quizTotal } = useJourneyProgress();
  const ActionIcon = actionIcons[next.id] ?? Compass;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:gap-10">
      {/* The recommendation. Keyed on the action so a milestone completed in
          another tab swaps the card rather than mutating it in place. */}
      <motion.div
        key={next.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="min-w-0"
      >
        <Card className="overflow-hidden">
          <div className="relative isolate overflow-hidden bg-navy px-6 py-5 text-white sm:px-8 sm:py-6">
            <GatewayMotif className="pointer-events-none absolute -right-6 -top-10 -z-10 h-[210%] w-auto select-none text-white opacity-[0.07]" />

            <p className="flex items-center gap-[9px] text-[12px] font-bold uppercase tracking-[0.14em] text-white/60">
              <ActionIcon size={14} strokeWidth={2.3} aria-hidden className="text-orange" />
              {next.eyebrow}
            </p>
            <p className="mt-[10px] text-[clamp(1.25rem,1.9vw,1.5rem)] font-bold leading-[1.25] tracking-[-0.018em]">
              {next.title}
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <p className="max-w-[52ch] text-[15.5px] font-medium leading-[1.6] text-muted">
              {next.body}
            </p>

            {/* Resuming an abandoned quiz is the one case where the student's
                own position is more persuasive than any sentence about it. */}
            {next.id === "quiz-resume" && quizAnswered > 0 ? (
              <div className="mt-5">
                <div className="flex items-center justify-between gap-4 text-[12.5px] font-bold uppercase tracking-[0.1em] text-muted-light">
                  <span>Question {Math.min(quizAnswered + 1, quizTotal)} of {quizTotal}</span>
                  <span className="tabular-nums text-navy">
                    {Math.round((quizAnswered / quizTotal) * 100)}%
                  </span>
                </div>
                <div aria-hidden className="mt-[7px] h-[5px] overflow-hidden rounded-full bg-track">
                  <div
                    className="h-full rounded-full bg-orange transition-[width] duration-500"
                    style={{ width: `${(quizAnswered / quizTotal) * 100}%` }}
                  />
                </div>
              </div>
            ) : null}

            <div className="mt-7">
              <Link
                href={next.href}
                className="group inline-flex h-[50px] w-full items-center justify-center gap-[12px] rounded-[10px] bg-navy px-6 text-[15px] font-semibold text-white transition-[background-color,box-shadow] duration-200 hover:bg-navy-ink hover:shadow-[0_14px_34px_-14px_rgba(1,22,111,0.65)] sm:w-auto"
              >
                {next.cta}
                <ArrowRight
                  size={17}
                  strokeWidth={2.3}
                  aria-hidden
                  className="shrink-0 transition-transform duration-200 group-hover:translate-x-[3px]"
                />
              </Link>

              {next.minutes ? (
                <p className="mt-[14px] flex items-center gap-[7px] text-[13px] font-medium text-muted-light">
                  <Clock3 size={14} strokeWidth={2.2} aria-hidden />
                  About {next.minutes} minutes.
                </p>
              ) : null}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* The ladder. */}
      <div className="min-w-0">
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-muted-light">
            Your groundwork
          </p>
          <p className="text-[13px] font-semibold tabular-nums text-muted">
            {done} of {total}
          </p>
        </div>

        <ol className="mt-4 space-y-[6px]">
          {milestones.map((milestone) => (
            <li key={milestone.id}>
              <Rung milestone={milestone} />
            </li>
          ))}
        </ol>

        <p className="mt-5 text-[13px] font-medium leading-[1.55] text-muted-light">
          Kept in this browser, not in an account — nothing here asks you to
          sign up. Whatever you have done travels with you if you talk to an
          adviser.
        </p>
      </div>
    </div>
  );
}

/**
 * One rung. A finished one states the student's own answer; an unfinished one
 * states what it would give them — which is the part that makes the cold
 * ladder worth looking at rather than a row of empty boxes.
 *
 * An outstanding rung shows its own domain icon rather than an empty ring —
 * four blank circles in a row said only "undone, undone, undone, undone";
 * the icon says what each one actually is before the label does, and its
 * colour is the same domain-colour system the homepage's entry-point cards
 * use, so career/budget/eligibility read as the same categories in both
 * places.
 */
function Rung({ milestone }: { milestone: Milestone }) {
  const { done, label, detail, blank } = milestone;
  const { icon: Icon, tone } = milestoneTheme[milestone.id];

  return (
    <div
      className={`flex items-start gap-[13px] rounded-[12px] border px-4 py-[13px] transition-colors duration-200 ${
        done ? "border-navy/15 bg-navy/[0.035]" : "border-hairline bg-white"
      }`}
    >
      <span
        aria-hidden
        className={`mt-[1px] flex size-[30px] shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
          done ? "border-navy bg-navy text-white" : tone
        }`}
      >
        {done ? <Check size={14} strokeWidth={3.2} /> : <Icon size={15} strokeWidth={2.2} />}
      </span>

      <div className="min-w-0 flex-1">
        <p
          className={`text-[14.5px] font-bold leading-[1.35] tracking-[-0.005em] ${
            done ? "text-navy" : "text-ink"
          }`}
        >
          {label}
        </p>
        <p
          className={`mt-[3px] text-[13.5px] leading-[1.5] ${
            done ? "font-semibold text-ink-soft" : "font-medium text-muted-light"
          }`}
        >
          {detail ?? blank}
        </p>
      </div>
    </div>
  );
}
