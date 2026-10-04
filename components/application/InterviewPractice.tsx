"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight, Lightbulb, RotateCcw } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { courses } from "@/data/courses";
import {
  generalQuestions,
  subjectQuestions,
  type PracticeQuestion,
} from "@/data/guides/interviews";
import { getFeedback, type Feedback } from "@/lib/interviews/feedback";
import { storageKeys } from "@/lib/storage";
import { useStoredState } from "@/lib/storage/useStoredState";

type Answers = Record<string, string>;

export function InterviewPractice() {
  const [courseId, setCourseId] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useStoredState<Answers>(
    storageKeys.interviewAnswers,
    {},
  );
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const course = courses.find((c) => c.id === courseId) ?? null;

  const questions: PracticeQuestion[] = useMemo(() => {
    if (!course) return [];
    return [...(subjectQuestions[course.subject] ?? []), ...generalQuestions];
  }, [course]);

  const question = questions[index];
  const answer = question ? (answers[question.id] ?? "") : "";

  function choose(id: string) {
    setCourseId(id);
    setIndex(0);
    setFeedback(null);
  }

  function move(delta: number) {
    setIndex((i) => Math.min(Math.max(i + delta, 0), questions.length - 1));
    setFeedback(null);
  }

  async function review() {
    if (!question) return;
    setFeedback(await getFeedback(question, answer));
  }

  if (!course) {
    return (
      <Card className="p-6 sm:p-8">
        <h3 className="text-[19px] font-bold tracking-[-0.01em] text-navy">
          Which course are you interviewing for?
        </h3>
        <p className="mt-[7px] max-w-[58ch] text-[15px] font-medium leading-[1.55] text-muted">
          Pick the closest match and we&rsquo;ll give you questions for that
          subject, plus the ones almost every interview asks.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {courses.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => choose(c.id)}
              className="inline-flex items-center rounded-lg border border-hairline bg-white px-[13px] py-[8px] text-[14px] font-semibold text-muted transition-colors duration-200 hover:border-ring-idle hover:text-navy"
            >
              {c.title}
            </button>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="navy">{course.title}</Badge>
          <Badge tone="muted">{course.subject}</Badge>
        </div>
        <button
          type="button"
          onClick={() => setCourseId(null)}
          className="group inline-flex items-center gap-[7px] text-[13.5px] font-semibold text-blue-link transition-colors hover:text-navy"
        >
          <RotateCcw
            size={13}
            strokeWidth={2.4}
            aria-hidden
            className="transition-transform duration-300 group-hover:-rotate-90"
          />
          Change course
        </button>
      </div>

      <div className="mt-6 flex items-center gap-[4px]" aria-hidden>
        {questions.map((q, i) => (
          <span
            key={q.id}
            className={`h-[4px] flex-1 rounded-full transition-colors duration-300 ${
              i <= index ? "bg-blue-bright" : "bg-track"
            }`}
          />
        ))}
      </div>
      <p className="mt-3 text-[13.5px] font-medium text-ink-soft">
        Question {index + 1} of {questions.length}
      </p>

      <motion.div
        key={question.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mt-5"
      >
        <h3 className="text-[clamp(1.2rem,1.8vw,1.5rem)] font-bold leading-[1.25] tracking-[-0.015em] text-ink">
          {question.question}
        </h3>

        <label className="mt-5 block">
          <span className="sr-only">Your answer</span>
          <textarea
            value={answer}
            onChange={(e) => {
              setAnswers((current) => ({
                ...current,
                [question.id]: e.target.value,
              }));
              setFeedback(null);
            }}
            rows={7}
            placeholder="Write your answer as you would say it out loud…"
            className="w-full resize-y rounded-xl border border-hairline bg-canvas p-4 text-[15.5px] font-medium leading-[1.6] text-ink placeholder:text-muted-light focus:border-ring-idle"
          />
        </label>

        {feedback ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 rounded-xl border border-hairline bg-canvas p-5"
          >
            <p className="flex items-center gap-[9px] text-[12.5px] font-bold uppercase tracking-[0.12em] text-blue-link">
              <Lightbulb size={15} strokeWidth={2.2} aria-hidden />
              What the interviewer is assessing
            </p>
            <p className="mt-3 text-[15px] font-medium leading-[1.6] text-ink-soft">
              {feedback.focus}
            </p>

            <ul className="mt-4 space-y-2 border-t border-hairline pt-4">
              {feedback.observations.map((observation) => (
                <li
                  key={observation}
                  className="flex gap-[10px] text-[14.5px] font-medium leading-[1.55] text-muted"
                >
                  <span aria-hidden className="mt-[9px] size-[5px] shrink-0 rounded-full bg-orange" />
                  {observation}
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </motion.div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {index > 0 ? (
          <button
            type="button"
            onClick={() => move(-1)}
            className="inline-flex h-[46px] items-center justify-center gap-[9px] rounded-[10px] border border-hairline bg-white/70 px-5 text-[14.5px] font-semibold text-navy transition-colors duration-200 hover:border-ring-idle hover:bg-white"
          >
            <ArrowLeft size={16} strokeWidth={2.25} aria-hidden />
            Back
          </button>
        ) : null}

        <button
          type="button"
          onClick={review}
          disabled={answer.trim().length === 0}
          className="inline-flex h-[46px] items-center justify-center rounded-[10px] border border-hairline bg-white/70 px-5 text-[14.5px] font-semibold text-navy transition-colors duration-200 hover:border-ring-idle hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Review my answer
        </button>

        {index < questions.length - 1 ? (
          <button
            type="button"
            onClick={() => move(1)}
            className="group ml-auto inline-flex h-[46px] items-center justify-center gap-[14px] rounded-[10px] bg-navy px-6 text-[15px] font-semibold text-white transition-[transform,background-color,box-shadow] duration-200 hover:bg-navy-ink hover:shadow-[0_10px_30px_-12px_rgba(1,22,111,0.65)] active:scale-[0.985]"
          >
            Next question
            <ArrowUpRight
              size={17}
              strokeWidth={2.25}
              aria-hidden
              className="shrink-0 transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
            />
          </button>
        ) : null}
      </div>

      <p className="mt-6 border-t border-hairline pt-4 text-[13px] font-medium leading-[1.55] text-muted-light">
        Answers are saved in this browser only. Nothing is submitted anywhere,
        and nobody else sees them.
      </p>
    </Card>
  );
}
