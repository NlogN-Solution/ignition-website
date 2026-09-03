"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { AlertCircle, ArrowLeft, Loader2, RotateCcw } from "lucide-react";
import { Card } from "../ui/Card";
import type { University } from "@/data/universities";
import { apiBaseUrl } from "@/lib/config";
import { clearStored, readStored, storageKeys, writeStored } from "@/lib/storage";
import { ResultScreen, type Result } from "./ResultScreen";
import { ReviewStep } from "./ReviewStep";
import { StepProgress } from "./StepProgress";
import {
  ContactStep,
  CourseStep,
  DocumentsStep,
  EducationStep,
  EnglishStep,
  FinanceStep,
  type StepProps,
} from "./steps";
import { EMPTY_ANSWERS, STEPS, type Answers, type SectionKey } from "./types";
import { toSubmission, validateStep, type Errors } from "./validation";

/**
 * The assessment, as one journey.
 *
 * The design change this component exists for: the page used to show five
 * large cards at once, which asked a student to read forty questions before
 * answering one. Here there is a single card, one step of questions in it, and
 * a rail that says how much is left. Everything else — the reflective panels,
 * the readiness bar, the review — is subordinate to that one card.
 *
 * Three things worth knowing before editing it.
 *
 * **Nothing here decides anything.** The steps show encouragement; the verdict
 * is computed by the server from the stored answers on submit. A student who
 * edits this file's state in devtools changes what they submitted, not what
 * they were assessed as.
 *
 * **Progress survives a reload.** Answers are written to `localStorage` on
 * every change and read back on mount. Three minutes of typing lost to an
 * accidental refresh is the single most likely way this feature loses a lead,
 * and it costs one effect to prevent.
 *
 * **A failed submit keeps everything.** The error state is a banner above the
 * review, not a replacement for it, so "try again" is one click and no
 * retyping. The draft is only cleared once the server has confirmed.
 */

const DRAFT_KEY = storageKeys.eligibilityDraft;
const SOURCE_PAGE = "/resources/eligibility";

const BODIES: Record<SectionKey, (props: StepProps) => React.JSX.Element> = {
  education: EducationStep,
  english: EnglishStep,
  course: CourseStep,
  finance: FinanceStep,
  documents: DocumentsStep,
  contact: ContactStep,
};

type Phase = "editing" | "submitting" | "done";

export function EligibilityWizard({ universities }: { universities: University[] }) {
  const reduce = useReducedMotion();

  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const [index, setIndex] = useState(0);
  const [furthest, setFurthest] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [phase, setPhase] = useState<Phase>("editing");
  const [failure, setFailure] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  /** Which way the card should travel — forward on Continue, back on Back. */
  const [direction, setDirection] = useState(1);

  const cardRef = useRef<HTMLDivElement>(null);
  const restored = useRef(false);

  // Restored once, after mount: reading storage during render would differ
  // between the server pass and the client one and break hydration.
  useEffect(() => {
    const draft = readStored<{ answers: Answers; index: number; furthest: number } | null>(
      DRAFT_KEY,
      null,
    );
    if (draft?.answers) {
      setAnswers({ ...EMPTY_ANSWERS, ...draft.answers });
      setIndex(Math.min(draft.index ?? 0, STEPS.length - 1));
      setFurthest(Math.min(draft.furthest ?? 0, STEPS.length - 1));
    }
    restored.current = true;
  }, []);

  useEffect(() => {
    if (!restored.current || phase === "done") return;
    writeStored(DRAFT_KEY, { answers, index, furthest });
  }, [answers, index, furthest, phase]);

  const step = STEPS[index];

  const set = useCallback<StepProps["set"]>((section, patch) => {
    setAnswers((previous) => ({ ...previous, [section]: { ...previous[section], ...patch } }));
    // Clear the errors for the fields being edited, so a message disappears as
    // it is answered rather than surviving until the next Continue.
    setErrors((previous) => {
      const next = { ...previous };
      for (const key of Object.keys(patch)) delete next[key];
      return next;
    });
  }, []);

  function focusCard() {
    // Moving between steps must move the reader too: on a phone the next
    // question would otherwise open scrolled past.
    cardRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  function goTo(next: number) {
    setDirection(next > index ? 1 : -1);
    setIndex(next);
    setErrors({});
    focusCard();
  }

  function advance() {
    const found = validateStep(step.id, answers);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }
    const next = Math.min(index + 1, STEPS.length - 1);
    setFurthest((previous) => Math.max(previous, next));
    goTo(next);
  }

  async function submit() {
    if (phase === "submitting") return;

    // Re-check every step, not just this one: a student can reach Review by
    // jumping backwards and forwards through the rail.
    for (const entry of STEPS) {
      const found = validateStep(entry.id, answers);
      if (Object.keys(found).length > 0) {
        setErrors(found);
        setFailure(null);
        goTo(STEPS.indexOf(entry));
        return;
      }
    }

    setPhase("submitting");
    setFailure(null);

    try {
      const response = await fetch(`${apiBaseUrl}/public/eligibility`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toSubmission(answers, SOURCE_PAGE)),
      });

      if (!response.ok) {
        // Never claim a submission that did not happen — a student who is told
        // a counsellor is coming and then hears nothing is worse off than one
        // who is asked to press the button again.
        setPhase("editing");
        setFailure(
          response.status === 429
            ? "That's a few submissions in quick succession. Give it a minute and try again — your answers are safe."
            : "We couldn't submit your assessment right now. Your information is still here. Please try again.",
        );
        return;
      }

      setResult((await response.json()) as Result);
      setPhase("done");
      clearStored(DRAFT_KEY);
    } catch {
      setPhase("editing");
      setFailure(
        "We couldn't reach our servers. Your information is still here — check your connection and try again.",
      );
    }
  }

  const firstName = useMemo(
    () => answers.contact.full_name.trim().split(" ")[0] ?? "",
    [answers.contact.full_name],
  );

  if (phase === "done" && result) {
    return <ResultScreen result={result} firstName={firstName} />;
  }

  const Body = step.id === "review" ? null : BODIES[step.id];
  const slide = reduce ? 0 : 28;

  return (
    <div ref={cardRef} className="scroll-mt-[calc(var(--header-h,72px)+16px)]">
      <div className="mb-5">
        <StepProgress steps={STEPS} current={index} furthest={furthest} onJump={goTo} />
      </div>

      <Card className="overflow-hidden p-5 sm:p-7 lg:p-8">
        {/* The step is keyed, so React remounts it and the enter animation
            runs on every move — a fade and a short slide in the direction of
            travel, so Back visibly goes back.

            Deliberately *not* `AnimatePresence` with `mode="wait"`. That waits
            for the outgoing step's exit animation to finish before mounting
            the next one, and if that exit never completes the wizard silently
            stops advancing while its state moves on underneath — which is
            exactly what it did here. An enter-only transition cannot get
            stuck: the new step is mounted by React the moment the index
            changes, and the animation is decoration on top of a render that
            has already happened. */}
        <div className="overflow-hidden">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: direction * slide }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reduce ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[12.5px] font-bold uppercase tracking-[0.1em] text-blue-link">
              {String(index + 1).padStart(2, "0")} · {step.title}
            </p>
            <h2 className="mt-2 max-w-[26ch] text-[clamp(1.375rem,2.4vw,1.875rem)] font-bold leading-[1.18] tracking-[-0.02em] text-navy">
              {step.heading}
            </h2>
            <p className="mt-[10px] max-w-[62ch] text-[15px] font-medium leading-[1.6] text-muted">
              {step.intro}
            </p>

            <div className="mt-7">
              {Body ? (
                <Body answers={answers} errors={errors} set={set} universities={universities} />
              ) : (
                <ReviewStep
                  answers={answers}
                  universities={universities}
                  onEdit={(section) => goTo(STEPS.findIndex((entry) => entry.id === section))}
                />
              )}
            </div>
          </motion.div>
        </div>

        {step.id === "review" ? (
          <p className="mt-6 rounded-xl border border-hairline bg-canvas p-[14px] text-[13px] font-medium leading-[1.55] text-muted">
            This assessment provides a preliminary indication based on the information you provide.
            Final university and visa eligibility may depend on additional requirements and document
            verification.
          </p>
        ) : null}

        {failure ? (
          <div
            role="alert"
            className="mt-5 flex gap-3 rounded-xl border border-orange/30 bg-orange/[0.06] p-[14px]"
          >
            <AlertCircle
              size={17}
              strokeWidth={2.2}
              aria-hidden
              className="mt-[1px] shrink-0 text-orange"
            />
            <p className="text-[13.5px] font-semibold leading-[1.55] text-ink-soft">{failure}</p>
          </div>
        ) : null}

        {/* Sticky on a phone so Continue is always in reach of a thumb, static
            from `sm` up where the whole card fits on screen anyway. */}
        <div className="sticky bottom-0 -mx-5 mt-7 flex items-center justify-between gap-3 border-t border-hairline bg-white px-5 py-4 sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:pb-0">
          <button
            type="button"
            onClick={() => goTo(Math.max(index - 1, 0))}
            disabled={index === 0}
            className="inline-flex items-center gap-[7px] rounded-[10px] px-[13px] py-[10px] text-[14.5px] font-bold text-muted transition-colors duration-200 hover:bg-navy/[0.04] hover:text-navy disabled:pointer-events-none disabled:opacity-0"
          >
            <ArrowLeft size={16} strokeWidth={2.4} aria-hidden />
            Back
          </button>

          {step.id === "review" ? (
            <button
              type="button"
              onClick={submit}
              disabled={phase === "submitting"}
              className="inline-flex items-center gap-[9px] rounded-[10px] bg-navy px-[18px] py-[12px] text-[15px] font-semibold text-white transition-[background-color,box-shadow,transform] duration-200 hover:bg-navy-ink hover:shadow-[0_10px_30px_-12px_rgba(1,22,111,0.65)] active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {phase === "submitting" ? (
                <>
                  <Loader2 size={16} strokeWidth={2.4} aria-hidden className="animate-spin" />
                  Submitting…
                </>
              ) : failure ? (
                <>
                  <RotateCcw size={16} strokeWidth={2.4} aria-hidden />
                  Try again
                </>
              ) : (
                "Submit eligibility assessment"
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={advance}
              className="inline-flex items-center gap-[9px] rounded-[10px] bg-navy px-[18px] py-[12px] text-[15px] font-semibold text-white transition-[background-color,box-shadow,transform] duration-200 hover:bg-navy-ink hover:shadow-[0_10px_30px_-12px_rgba(1,22,111,0.65)] active:scale-[0.985]"
            >
              Continue
              <span aria-hidden>→</span>
            </button>
          )}
        </div>
      </Card>
    </div>
  );
}
