"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { QuizOption } from "./QuizOption";
import { useEntrance } from "../ui/motion";
import { quizQuestions } from "@/data/quiz/questions";
import { buildProfile } from "@/lib/quiz/scoring";
import { dimensionLabels } from "@/lib/quiz/labels";
import type { QuizAnswers } from "@/lib/quiz/types";
import { storageKeys, writeStored } from "@/lib/storage";
import { useStoredState } from "@/lib/storage/useStoredState";
import panel from "@/public/images/skyline-panel.jpg";

/**
 * Keeps the /discover composition — image plate left, question right, the
 * height-aware `--hs` unit driving desktop rhythm — and swaps the four
 * country questions for the eight-step career profile. Answers persist as
 * they are given, so a student can close the tab and come back.
 */
export function CareerQuiz() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers, ready] = useStoredState<QuizAnswers>(
    storageKeys.quizAnswers,
    {},
  );
  const { container, item } = useEntrance(0.07);

  const question = quizQuestions[step];
  const picked = useMemo(
    () => answers[question.id] ?? [],
    [answers, question.id],
  );
  const isLast = step === quizQuestions.length - 1;
  const atLimit =
    question.select === "multi" &&
    question.maxChoices !== undefined &&
    picked.length >= question.maxChoices;

  // Resume where they left off rather than restarting from step one.
  useEffect(() => {
    if (!ready) return;
    const next = quizQuestions.findIndex((q) => !answers[q.id]?.length);
    if (next > 0) setStep(next);
    // Runs once, when the stored answers first arrive.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  function toggle(optionId: string) {
    setAnswers((current) => {
      const existing = current[question.id] ?? [];

      if (question.select === "single") {
        return { ...current, [question.id]: [optionId] };
      }

      const next = existing.includes(optionId)
        ? existing.filter((id) => id !== optionId)
        : [...existing, optionId];

      return { ...current, [question.id]: next };
    });
  }

  function goNext() {
    if (!isLast) {
      setStep(step + 1);
      return;
    }

    writeStored(storageKeys.quizProfile, buildProfile(answers, quizQuestions));
    router.push("/careers/quiz/results");
  }

  function skip() {
    setAnswers((current) => ({ ...current, [question.id]: [] }));
    if (isLast) goNext();
    else setStep(step + 1);
  }

  const canContinue = picked.length > 0 || question.skippable;

  return (
    <section className="grid [--hs:clamp(2.3rem,min(4.75vw,8.35svh),4.75rem)] lg:min-h-[calc(100svh_-_var(--nav-h))] lg:grid-cols-[42%_1fr]">
      <div className="relative h-[200px] sm:h-[300px] lg:sticky lg:top-[var(--nav-h)] lg:h-[calc(100svh_-_var(--nav-h))]">
        <Image
          src={panel}
          alt="A student looking out across a city skyline"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 42vw"
          className="object-cover object-[44%_22%] lg:object-[38%_center]"
        />
        {/* The plate dissolves into the canvas on the question side. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(251,250,254,0)_62%,var(--color-canvas)_99%)] max-lg:bg-[linear-gradient(to_bottom,rgba(251,250,254,0)_60%,var(--color-canvas)_100%)]" />
      </div>

      <motion.div
        {...container}
        className="flex min-w-0 flex-col px-5 pb-14 pt-8 sm:px-8 lg:pb-[calc(var(--hs)*1.1)] lg:pl-[2.4vw] lg:pr-[3.56vw] lg:pt-[calc(var(--hs)*0.8)]"
      >
        <motion.h1
          {...item}
          className="text-[clamp(1.75rem,3.2vw,2.6rem)] font-bold leading-[1.02] tracking-[-0.022em] text-navy"
        >
          Let&rsquo;s find <span className="text-orange">where</span> you belong
          <span className="text-orange">.</span>
        </motion.h1>

        <motion.p
          {...item}
          className="mt-[10px] max-w-[46ch] text-[15px] font-medium leading-[1.55] text-muted"
        >
          Eight quick steps. There are no right answers &mdash; answer as you
          actually are, not as you think you should be.
        </motion.p>

        {/* Keyed on the question so React remounts the block and it animates
            in from scratch. Deliberately no exit animation: an outgoing step
            has nothing to say, and orchestrating one only risks leaving the
            old question on screen if it never resolves. */}
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="mt-[clamp(1.75rem,3vw,2.75rem)]"
        >
          <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-blue-link">
            {dimensionLabels[question.dimension]}
          </p>

          <h2 className="mt-[10px] text-[clamp(1.3rem,1.9vw,1.75rem)] font-bold leading-[1.2] tracking-[-0.015em] text-ink">
            {question.prompt}
          </h2>

          {question.helper ? (
            <p className="mt-[8px] text-[14.5px] font-medium leading-[1.5] text-muted">
              {question.helper}
            </p>
          ) : null}

          <fieldset className="mt-[clamp(1.25rem,1.9vw,1.75rem)]">
            <legend className="sr-only">{question.prompt}</legend>
            <div
              role={question.select === "multi" ? "group" : "radiogroup"}
              className={`grid gap-[10px] ${
                question.options.some((o) => o.description)
                  ? "sm:grid-cols-2"
                  : "grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {question.options.map((option) => (
                <QuizOption
                  key={option.id}
                  label={option.label}
                  description={option.description}
                  multi={question.select === "multi"}
                  selected={picked.includes(option.id)}
                  disabled={atLimit}
                  onToggle={() => toggle(option.id)}
                />
              ))}
            </div>
          </fieldset>
        </motion.div>

        <motion.div
          {...item}
          className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-4 lg:mt-auto lg:pt-[calc(var(--hs)*0.4)]"
        >
          <div className="flex items-center gap-[4px]" aria-hidden>
            {quizQuestions.map((q, i) => (
              <span
                key={q.id}
                className={`h-[4px] w-[clamp(18px,2.2vw,34px)] rounded-full transition-colors duration-300 ${
                  i <= step ? "bg-blue-bright" : "bg-track"
                }`}
              />
            ))}
          </div>
          <p className="text-[14px] font-medium text-ink-soft">
            Step {step + 1} of {quizQuestions.length}
          </p>

          <div className="ml-auto flex w-full items-center gap-3 sm:w-auto">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex h-[52px] items-center justify-center gap-[9px] rounded-[10px] border border-hairline bg-white/70 px-5 text-[15px] font-semibold text-navy transition-colors duration-200 hover:border-ring-idle hover:bg-white"
              >
                <ArrowLeft size={16} strokeWidth={2.25} aria-hidden />
                <span>Back</span>
              </button>
            ) : null}

            {question.skippable && picked.length === 0 ? (
              <button
                type="button"
                onClick={skip}
                className="text-[14.5px] font-semibold text-blue-link transition-colors hover:text-navy"
              >
                Skip
              </button>
            ) : null}

            <button
              type="button"
              onClick={goNext}
              disabled={!canContinue}
              className="group inline-flex h-[52px] flex-1 items-center justify-center gap-[18px] rounded-[10px] bg-navy px-8 text-[16px] font-semibold text-white transition-[transform,background-color,box-shadow] duration-200 hover:bg-navy-ink hover:shadow-[0_10px_30px_-12px_rgba(1,22,111,0.65)] active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-navy disabled:hover:shadow-none disabled:active:scale-100 sm:flex-none"
            >
              <span>{isLast ? "See my results" : "Continue"}</span>
              <ArrowUpRight
                size={18}
                strokeWidth={2.25}
                aria-hidden
                className="shrink-0 transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
              />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
