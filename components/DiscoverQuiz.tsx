"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { RadioOption } from "./RadioOption";
import { useEntrance } from "./motion";
import { questions } from "@/lib/quiz";
import panel from "@/public/images/skyline-panel.jpg";

export function DiscoverQuiz() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { container, item } = useEntrance(0.07);

  const question = questions[step];
  const picked = answers[question.id];

  function goNext() {
    if (step < questions.length - 1) setStep(step + 1);
    else router.push("/match");
  }

  return (
    <section className="grid [--hs:clamp(2.3rem,min(4.75vw,8.35svh),4.75rem)] lg:min-h-[calc(100svh_-_var(--nav-h))] lg:grid-cols-[53.5%_1fr]">
      <div className="relative h-[240px] sm:h-[340px] lg:h-auto">
        <Image
          src={panel}
          alt="A student looking out across a skyline of world landmarks"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 54vw"
          className="object-cover object-[44%_22%] lg:object-[38%_center]"
        />
        {/* The plate dissolves into the canvas on the question side. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(251,250,254,0)_62%,var(--color-canvas)_99%)] max-lg:bg-[linear-gradient(to_bottom,rgba(251,250,254,0)_60%,var(--color-canvas)_100%)]" />
      </div>

      <motion.div
        {...container}
        className="flex min-w-0 flex-col px-5 pb-14 pt-8 sm:px-8 lg:pb-[calc(var(--hs)*1.184)] lg:pl-[1.6vw] lg:pr-[3.56vw] lg:pt-[calc(var(--hs)*0.842)]"
      >
        <motion.h1
          {...item}
          className="text-[clamp(2.3rem,4.75vw,4.75rem)] font-bold leading-[0.96] tracking-[-0.022em] text-navy lg:text-[length:var(--hs)]"
        >
          <span className="block">Let&rsquo;s discover</span>
          <span className="block">
            <span className="text-orange">where</span> you belong
            <span className="text-orange">.</span>
          </span>
        </motion.h1>

        <motion.p
          {...item}
          className="mt-[clamp(1.5rem,3.65vw,3.65rem)] text-[clamp(0.85rem,0.89vw,0.89rem)] font-medium text-muted-light lg:mt-[calc(var(--hs)*0.768)] lg:text-[length:calc(var(--hs)*0.187)]"
        >
          Question {step + 1}
        </motion.p>

        <motion.h2
          {...item}
          className="mt-[clamp(0.4rem,0.78vw,0.78rem)] text-[clamp(1.4rem,1.88vw,1.88rem)] font-bold tracking-[-0.015em] text-ink lg:mt-[calc(var(--hs)*0.164)] lg:text-[length:calc(var(--hs)*0.396)]"
        >
          {question.prompt}
        </motion.h2>

        <fieldset className="mt-[clamp(1.5rem,1.94vw,1.94rem)] lg:mt-[calc(var(--hs)*0.408)]">
          <legend className="sr-only">{question.prompt}</legend>
          <div className="flex flex-col gap-[clamp(0.9rem,1.4vw,1.4rem)] lg:gap-[calc(var(--hs)*0.295)]">
            {question.options.map((option) => (
              <motion.div key={option} {...item}>
                <RadioOption
                  name={question.id}
                  label={option}
                  selected={picked === option}
                  onSelect={() =>
                    setAnswers({ ...answers, [question.id]: option })
                  }
                  ringClassName="size-[clamp(22px,1.7vw,27px)] lg:size-[calc(var(--hs)*0.355)]"
                  className="gap-[clamp(0.9rem,1.5vw,1.5rem)] text-[clamp(1.05rem,1.4vw,1.4rem)] font-medium lg:gap-[calc(var(--hs)*0.316)] lg:text-[length:calc(var(--hs)*0.295)]"
                />
              </motion.div>
            ))}
          </div>
        </fieldset>

        <motion.div
          {...item}
          className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-5 lg:mt-auto lg:pt-[calc(var(--hs)*0.3)]"
        >
          <div className="flex items-center gap-[4px]" aria-hidden>
            {questions.map((q, i) => (
              <span
                key={q.id}
                className={`h-[4px] w-[clamp(40px,3.56vw,57px)] rounded-full lg:w-[calc(var(--hs)*0.75)] transition-colors duration-300 ${
                  i <= step ? "bg-blue-bright" : "bg-track"
                }`}
              />
            ))}
          </div>
          <p className="text-[clamp(0.85rem,0.95vw,0.95rem)] font-medium text-ink-soft lg:text-[length:calc(var(--hs)*0.2)]">
            Step {step + 1} of {questions.length}
          </p>

          <button
            type="button"
            onClick={goNext}
            className="group ml-auto inline-flex h-[52px] w-full items-center justify-center gap-[22px] rounded-[10px] bg-navy text-[17px] font-semibold text-white transition-[transform,background-color,box-shadow] duration-200 hover:bg-navy-ink hover:shadow-[0_10px_30px_-12px_rgba(1,22,111,0.65)] active:scale-[0.985] sm:w-auto sm:px-10 lg:h-[calc(var(--hs)*0.868)] lg:w-[calc(var(--hs)*3.79)] lg:px-0 lg:text-[length:calc(var(--hs)*0.25)]"
          >
            <span>{step === questions.length - 1 ? "See my match" : "Continue"}</span>
            <ArrowUpRight
              size={19}
              strokeWidth={2.25}
              aria-hidden
              className="shrink-0 transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
            />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
