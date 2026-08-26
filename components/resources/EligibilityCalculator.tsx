"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, CircleAlert, MinusCircle, TriangleAlert } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Callout } from "../ui/Callout";
import {
  aLevelGrades,
  assessAll,
  defaultAnswers,
  qualifications,
  verdictLabels,
  type ALevelGrade,
  type Answers,
  type QualificationId,
  type Verdict,
} from "@/lib/eligibility";
import { coursesAt } from "@/data/universities";

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

const fieldBase =
  "h-[46px] w-full appearance-none rounded-[10px] border border-hairline bg-white px-[13px] text-[15px] font-semibold text-navy transition-colors duration-200 hover:border-ring-idle focus:border-ring-idle";

const verdictStyle: Record<
  Verdict,
  { icon: typeof Check; ring: string; chip: string; tint: string }
> = {
  comfortable: {
    icon: Check,
    ring: "border-navy/20",
    chip: "bg-navy text-white",
    tint: "text-navy",
  },
  borderline: {
    icon: TriangleAlert,
    ring: "border-orange/30",
    chip: "bg-orange text-white",
    tint: "text-orange",
  },
  below: {
    icon: CircleAlert,
    ring: "border-hairline",
    chip: "bg-muted-light text-white",
    tint: "text-muted",
  },
  excluded: {
    icon: MinusCircle,
    ring: "border-hairline",
    chip: "bg-faint text-white",
    tint: "text-muted-light",
  },
};

/**
 * "Am I anywhere near this?" — answered before an application fee is spent.
 *
 * The answer is a band, never a yes. Three things decide whether a student can
 * go somewhere: their grades, their English, and what their family can fund,
 * and the tool keeps them separate in the result because the fixes are
 * different. A student two points short of the grades has a foundation year
 * available to them; a student short on IELTS has a pre-sessional course and
 * three more months; a student over budget has neither and needs a different
 * list. Collapsing all three into "not eligible" would tell them none of that.
 *
 * Everything recomputes as you type. There is no submit button because there
 * is nothing to submit — the whole calculation runs in the browser, and none
 * of these answers leave it.
 */
export function EligibilityCalculator() {
  const [answers, setAnswers] = useState<Answers>(defaultAnswers);

  const { tariff, results } = useMemo(() => assessAll(answers), [answers]);

  function set<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function setGrade(index: number, grade: ALevelGrade) {
    setAnswers((current) => {
      const grades = [...current.grades];
      grades[index] = grade;
      return { ...current, grades };
    });
  }

  const counts = {
    comfortable: results.filter((r) => r.verdict === "comfortable").length,
    borderline: results.filter((r) => r.verdict === "borderline").length,
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-10">
      <div className="lg:sticky lg:top-[calc(var(--nav-h)+1.25rem)] lg:self-start">
        <Card className="p-5 sm:p-6">
          <h2 className="text-[16px] font-bold tracking-[-0.01em] text-navy">
            Your qualifications
          </h2>
          <p className="mt-2 text-[13.5px] font-medium leading-[1.55] text-muted">
            Nothing you type here is sent anywhere. The whole calculation runs
            in this browser.
          </p>

          <div className="mt-6 space-y-5">
            <Field label="What are you studying?" htmlFor="qualification">
              <select
                id="qualification"
                value={answers.qualification}
                onChange={(event) =>
                  set("qualification", event.target.value as QualificationId)
                }
                className={fieldBase}
              >
                {qualifications.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>

            {answers.qualification === "a-level" ? (
              <Field label="Your three grades">
                <div className="grid grid-cols-3 gap-2">
                  {answers.grades.map((grade, index) => (
                    <select
                      key={index}
                      aria-label={`Subject ${index + 1} grade`}
                      value={grade}
                      onChange={(event) =>
                        setGrade(index, event.target.value as ALevelGrade)
                      }
                      className={`${fieldBase} text-center`}
                    >
                      {aLevelGrades.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ))}
                </div>
              </Field>
            ) : null}

            {answers.qualification === "ib" ? (
              <Field label="Diploma total" htmlFor="ib">
                <NumberField
                  id="ib"
                  value={answers.ibPoints}
                  min={24}
                  max={45}
                  step={1}
                  suffix="points"
                  onChange={(value) => set("ibPoints", value)}
                />
              </Field>
            ) : null}

            {answers.qualification === "nepal-plus-two" ? (
              <Field label="Your GPA" htmlFor="gpa">
                <NumberField
                  id="gpa"
                  value={answers.gpa}
                  min={0}
                  max={4}
                  step={0.1}
                  suffix="out of 4"
                  onChange={(value) => set("gpa", value)}
                />
              </Field>
            ) : null}

            {answers.qualification === "india-cbse" ? (
              <Field label="Your aggregate" htmlFor="percentage">
                <NumberField
                  id="percentage"
                  value={answers.percentage}
                  min={35}
                  max={100}
                  step={1}
                  suffix="%"
                  onChange={(value) => set("percentage", value)}
                />
              </Field>
            ) : null}

            <Field
              label="IELTS overall"
              htmlFor="ielts"
              hint="Leave at 0 if you have not taken it yet."
            >
              <NumberField
                id="ielts"
                value={answers.ielts}
                min={0}
                max={9}
                step={0.5}
                suffix="band"
                onChange={(value) => set("ielts", value)}
              />
            </Field>

            <Field
              label="Tuition you can fund"
              htmlFor="budget"
              hint="Per year. Leave at 0 for no limit."
            >
              <NumberField
                id="budget"
                value={answers.budget}
                min={0}
                max={60000}
                step={500}
                suffix="£ / year"
                onChange={(value) => set("budget", value)}
              />
            </Field>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 rounded-[10px] border border-hairline bg-canvas px-4 py-[13px]">
            <span className="text-[13px] font-bold uppercase tracking-[0.1em] text-muted-light">
              Indicative tariff
            </span>
            <span className="text-[20px] font-bold tabular-nums tracking-[-0.02em] text-navy">
              {tariff}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setAnswers(defaultAnswers)}
            className="mt-4 text-[13.5px] font-semibold text-blue-link transition-colors hover:text-navy"
          >
            Reset
          </button>
        </Card>
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p aria-live="polite" className="text-[15px] font-medium text-muted">
            <span className="font-bold text-ink">{counts.comfortable}</span>{" "}
            within range
            {counts.borderline > 0 ? (
              <>
                {" "}
                and{" "}
                <span className="font-bold text-ink">{counts.borderline}</span>{" "}
                borderline
              </>
            ) : null}
            , of {results.length} universities
          </p>
          <Badge tone="demo">Example data</Badge>
        </div>

        <ul className="mt-5 space-y-3">
          {results.map((result) => {
            const style = verdictStyle[result.verdict];
            const Icon = style.icon;
            const taught = coursesAt(result.university.id);

            return (
              <li key={result.university.id}>
                <Card className={`p-5 sm:p-6 ${style.ring}`}>
                  <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                    <div className="min-w-0">
                      <h3 className="text-[17.5px] font-bold leading-[1.25] tracking-[-0.01em] text-navy">
                        <Link
                          href={`/universities/${result.university.id}`}
                          className="transition-colors hover:text-blue-link"
                        >
                          {result.university.name}
                        </Link>
                      </h3>
                      <p className="mt-[5px] text-[13.5px] font-semibold text-muted-light">
                        {result.university.city} ·{" "}
                        {gbp.format(result.university.tuition.min)}–
                        {gbp.format(result.university.tuition.max)} a year
                      </p>
                    </div>

                    <span
                      className={`inline-flex shrink-0 items-center gap-[7px] rounded-lg px-[11px] py-[6px] text-[13px] font-semibold ${style.chip}`}
                    >
                      <Icon size={14} strokeWidth={2.5} aria-hidden />
                      {verdictLabels[result.verdict].title}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-[7px] border-t border-hairline pt-4">
                    {result.notes.map((note) => (
                      <li
                        key={note}
                        className="text-[14px] font-medium leading-[1.55] text-muted"
                      >
                        {note}
                      </li>
                    ))}
                  </ul>

                  {result.verdict === "below" ? (
                    <p className="mt-4 text-[14px] font-medium leading-[1.55] text-ink-soft">
                      A foundation year adds a year and gets you in on lower
                      grades.{" "}
                      <Link
                        href="/courses?route=undergraduate"
                        className="font-bold text-blue-link transition-colors hover:text-navy"
                      >
                        See foundation routes
                      </Link>
                      .
                    </p>
                  ) : null}

                  <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                    <Link
                      href={`/universities/${result.university.id}`}
                      className="group inline-flex items-center gap-[8px] text-[14px] font-bold text-blue-link transition-colors hover:text-navy"
                    >
                      Open university
                      <ArrowUpRight
                        size={15}
                        strokeWidth={2.4}
                        aria-hidden
                        className="transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                      />
                    </Link>
                    {taught.length ? (
                      <span className="text-[13.5px] font-medium text-muted-light">
                        {taught.length} {taught.length === 1 ? "course" : "courses"} in
                        the catalogue
                      </span>
                    ) : null}
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>

        <div className="mt-6">
          <Callout compact tone="official">
            {verdictLabels.borderline.blurb} None of these bands is a decision.
            An offer comes from a university, against the requirements published
            for the specific course and intake you apply to.
          </Callout>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-[12.5px] font-bold uppercase tracking-[0.1em] text-muted-light"
      >
        {label}
      </label>
      <div className="mt-[9px]">{children}</div>
      {hint ? (
        <p className="mt-[7px] text-[12.5px] font-medium leading-[1.5] text-muted-light">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function NumberField({
  id,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  id: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        type="number"
        inputMode="decimal"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => {
          const next = Number(event.target.value);
          if (Number.isNaN(next)) return;
          onChange(Math.min(max, Math.max(min, next)));
        }}
        className={`${fieldBase} pr-[76px]`}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-[13px] top-1/2 -translate-y-1/2 text-[12.5px] font-semibold text-muted-light"
      >
        {suffix}
      </span>
    </div>
  );
}
