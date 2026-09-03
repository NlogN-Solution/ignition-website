"use client";

import { Info } from "lucide-react";
import type { ReactNode } from "react";
import { subjects } from "@/data/courses";
import type { University } from "@/data/universities";
import { CheckList, ChoiceList, ConsentBox, SelectField, TextAreaField, TextField } from "./fields";
import {
  BANDED_TESTS,
  CONTACT_METHODS,
  DOCUMENT_ITEMS,
  DOCUMENT_STATUSES,
  ENGLISH_EVIDENCE,
  FUNDING_SOURCES,
  QUALIFICATIONS,
  SCORED_TESTS,
  STUDY_LEVELS,
  type Answers,
} from "./types";
import type { Errors } from "./validation";

/**
 * The six question steps.
 *
 * Each is a plain function of `(answers, errors, set)` — no state of its own,
 * no submission logic, no knowledge of which step comes next. The wizard owns
 * all of that, which is what keeps a step readable as the questions it asks.
 *
 * The small blue panels are the honest version of the encouragement in the
 * reference design. They reflect what the student has entered back at them so
 * the form feels responsive; not one of them claims a verdict, because the
 * verdict is computed server-side after submission and a panel that guessed
 * ahead of it would sometimes be wrong in the direction that matters most.
 */

type Setter = <S extends keyof Answers>(
  section: S,
  patch: Partial<Answers[S]>,
) => void;

export interface StepProps {
  answers: Answers;
  errors: Errors;
  set: Setter;
  universities: University[];
}

/** The reflective panel. Informational tone; never a result. */
function Note({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl border border-blue-link/15 bg-blue-link/[0.04] p-[14px]">
      <Info
        size={17}
        strokeWidth={2.1}
        aria-hidden
        className="mt-[1px] shrink-0 text-blue-link"
      />
      <p className="text-[13.5px] font-medium leading-[1.55] text-ink-soft">{children}</p>
    </div>
  );
}

const YEARS = Array.from({ length: 30 }, (_, index) => {
  const year = new Date().getFullYear() + 1 - index;
  return { value: String(year), label: String(year) };
});

export function EducationStep({ answers, errors, set }: StepProps) {
  const { education } = answers;
  const postgraduate = ["bachelors", "masters"].includes(education.highest_qualification);

  return (
    <div className="space-y-6">
      <ChoiceList
        required
        label="What is your highest qualification?"
        value={education.highest_qualification}
        error={errors.highest_qualification}
        onChange={(value) => set("education", { highest_qualification: value })}
        options={QUALIFICATIONS}
        columns={2}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          label="What did you study?"
          value={education.subject}
          onChange={(value) => set("education", { subject: value })}
          options={subjects.map((subject) => ({ value: subject, label: subject }))}
          placeholder="Select your subject"
        />
        <TextField
          label="Grade or GPA"
          hint="However your result is written — 78%, 3.4, First class."
          value={education.grade}
          error={errors.grade}
          onChange={(value) => set("education", { grade: value })}
          placeholder="e.g. 78% or 3.4"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label={postgraduate ? "University or college" : "School or college"}
          value={education.institution}
          onChange={(value) => set("education", { institution: value })}
          placeholder="Where you studied"
        />
        <SelectField
          label="Year completed"
          value={education.completion_year}
          error={errors.completion_year}
          onChange={(value) => set("education", { completion_year: value })}
          options={YEARS}
          placeholder="Select a year"
        />
      </div>

      {education.highest_qualification ? (
        <Note>
          Academic profile recorded. Your background will be checked against the typical
          requirements for the courses you choose — a counsellor confirms the detail against each
          university.
        </Note>
      ) : null}
    </div>
  );
}

export function EnglishStep({ answers, errors, set }: StepProps) {
  const { english } = answers;
  const scored = SCORED_TESTS.includes(english.evidence);
  const banded = BANDED_TESTS.includes(english.evidence);
  const testLabel = english.evidence === "other_test" ? "test" : english.evidence.toUpperCase();

  return (
    <div className="space-y-6">
      <ChoiceList
        required
        label="How will you meet the English requirement?"
        value={english.evidence}
        error={errors.evidence}
        onChange={(value) => set("english", { evidence: value })}
        options={ENGLISH_EVIDENCE}
      />

      {english.evidence === "other_test" ? (
        <TextField
          required
          label="Which test did you take?"
          value={english.other_test_name}
          error={errors.other_test_name}
          onChange={(value) => set("english", { other_test_name: value })}
          placeholder="e.g. Duolingo, Cambridge"
        />
      ) : null}

      {scored ? (
        <div className="space-y-5">
          <TextField
            required
            label={`Overall ${testLabel} score`}
            value={english.overall_score}
            error={errors.overall_score}
            inputMode="decimal"
            onChange={(value) => set("english", { overall_score: value })}
            placeholder={english.evidence === "ielts" ? "e.g. 6.5" : "Your overall score"}
          />

          {banded ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {(["listening", "reading", "writing", "speaking"] as const).map((band) => (
                <TextField
                  key={band}
                  label={band[0].toUpperCase() + band.slice(1)}
                  value={english[band]}
                  error={errors[band]}
                  inputMode="decimal"
                  onChange={(value) => set("english", { [band]: value } as Partial<Answers["english"]>)}
                  placeholder="—"
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {english.evidence === "not_taken" ? (
        <Note>
          No problem — most students are at this stage when they first get in touch. We can help you
          work out which test your course needs and what score to aim for, and some universities
          accept other evidence entirely.
        </Note>
      ) : null}

      {english.evidence === "moi" ? (
        <Note>
          Some universities accept a medium-of-instruction letter in place of a test and many do
          not. A counsellor will check this against the universities you are interested in.
        </Note>
      ) : null}
    </div>
  );
}

export function CourseStep({ answers, errors, set, universities }: StepProps) {
  const { course } = answers;

  // Locations come from the catalogue rather than a hardcoded list, so the
  // cities on offer are the cities Ignition actually has universities in.
  const cities = [...new Set(universities.map((entry) => entry.city).filter(Boolean))].sort();
  const shortlist = universities.filter((entry) =>
    course.preferred_location ? entry.city === course.preferred_location : true,
  );

  return (
    <div className="space-y-6">
      <ChoiceList
        required
        label="What level do you want to study at?"
        value={course.study_level}
        error={errors.study_level}
        onChange={(value) => set("course", { study_level: value })}
        options={STUDY_LEVELS}
        columns={2}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Preferred course"
          value={course.preferred_course}
          onChange={(value) => set("course", { preferred_course: value })}
          placeholder="e.g. Computer Science"
        />
        <SelectField
          label="Preferred city"
          value={course.preferred_location}
          onChange={(value) =>
            // Changing city re-scopes the university list, so a shortlist from
            // the old city would silently survive as hidden selections.
            set("course", { preferred_location: value, preferred_universities: [] })
          }
          options={cities.map((city) => ({ value: city, label: city }))}
          placeholder="Anywhere in the UK"
        />
      </div>

      {shortlist.length ? (
        <CheckList
          label="Any universities in mind?"
          hint={`Optional — pick up to four.${course.preferred_location ? ` Showing universities in ${course.preferred_location}.` : ""}`}
          values={course.preferred_universities}
          max={4}
          onChange={(values) => set("course", { preferred_universities: values })}
          options={shortlist.map((entry) => ({
            value: entry.id,
            label: entry.name,
            hint: entry.city,
          }))}
        />
      ) : null}

      {course.study_level || course.preferred_course ? (
        <Note>
          Based on your preferences
          {course.preferred_course ? ` — ${course.preferred_course}` : ""}
          {course.preferred_location ? ` in ${course.preferred_location}` : ""}
          {course.preferred_universities.length
            ? `, ${course.preferred_universities.length} ${course.preferred_universities.length === 1 ? "university" : "universities"} shortlisted`
            : ""}
          . We&rsquo;ll check each university&rsquo;s specific requirements against your profile.
        </Note>
      ) : null}
    </div>
  );
}

export function FinanceStep({ answers, errors, set }: StepProps) {
  const { finance } = answers;
  const shows = (source: string) =>
    finance.funding_source === source || finance.funding_source === "combination";

  return (
    <div className="space-y-6">
      <ChoiceList
        required
        label="How are you planning to fund your studies?"
        value={finance.funding_source}
        error={errors.funding_source}
        onChange={(value) => set("finance", { funding_source: value })}
        options={FUNDING_SOURCES}
        columns={2}
      />

      {finance.funding_source ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Funds available for your first year"
            hint="Optional. An approximate figure is fine."
            value={finance.estimated_funds}
            error={errors.estimated_funds}
            inputMode="numeric"
            onChange={(value) => set("finance", { estimated_funds: value })}
            placeholder="Approximate amount"
          />

          {shows("family") ? (
            <TextField
              label="Who is sponsoring you?"
              hint="Optional — their relationship to you."
              value={finance.sponsor_relationship}
              onChange={(value) => set("finance", { sponsor_relationship: value })}
              placeholder="e.g. Parent, uncle"
            />
          ) : null}

          {shows("loan") ? (
            <TextField
              label="Loan amount, if arranged"
              hint="Optional."
              value={finance.loan_amount}
              error={errors.loan_amount}
              inputMode="numeric"
              onChange={(value) => set("finance", { loan_amount: value })}
              placeholder="Approximate amount"
            />
          ) : null}

          {shows("scholarship") ? (
            <TextField
              label="Scholarship amount, if awarded"
              hint="Optional."
              value={finance.scholarship_amount}
              error={errors.scholarship_amount}
              inputMode="numeric"
              onChange={(value) => set("finance", { scholarship_amount: value })}
              placeholder="Approximate amount"
            />
          ) : null}
        </div>
      ) : null}

      {finance.funding_source ? (
        <Note>
          Funding plan recorded. What the UK asks for depends on your course, your city and what
          you have already paid, so a counsellor works the exact figure out with you rather than
          against a fixed threshold.
        </Note>
      ) : null}
    </div>
  );
}

export function DocumentsStep({ answers, set }: StepProps) {
  const { documents } = answers;

  const answered = DOCUMENT_ITEMS.filter((item) => documents[item.key]);
  const weight: Record<string, number> = {
    ready: 1,
    in_progress: 0.5,
    not_available: 0,
    not_sure: 0,
  };
  const readiness = Math.round(
    (answered.reduce((total, item) => total + (weight[documents[item.key]] ?? 0), 0) /
      DOCUMENT_ITEMS.length) *
      100,
  );

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {DOCUMENT_ITEMS.map((item) => (
          <div
            key={item.key}
            className="rounded-xl border border-hairline bg-white p-[14px] sm:flex sm:items-center sm:justify-between sm:gap-6"
          >
            <div className="min-w-0">
              <p className="text-[15px] font-semibold leading-[1.35] text-navy">{item.label}</p>
              <p className="mt-[2px] text-[13.5px] font-medium text-muted-light">{item.hint}</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-[6px] sm:mt-0 sm:shrink-0">
              {DOCUMENT_STATUSES.map((status) => {
                const selected = documents[item.key] === status.value;
                return (
                  <button
                    key={status.value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() =>
                      set("documents", {
                        // Pressing the chosen status again clears it — the
                        // checklist is optional and there must be a way back
                        // out of an answer given by mistake.
                        [item.key]: selected ? "" : status.value,
                      } as Partial<Answers["documents"]>)
                    }
                    className={`rounded-lg border px-[11px] py-[6px] text-[13px] font-semibold transition-colors duration-200 ${
                      selected
                        ? "border-navy bg-navy text-white"
                        : "border-hairline bg-white text-muted hover:border-ring-idle hover:text-navy"
                    }`}
                  >
                    {status.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {answered.length ? (
        <div className="rounded-xl border border-hairline bg-white p-[15px]">
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-[14.5px] font-semibold text-navy">Document readiness</p>
            <p className="text-[15px] font-bold tabular-nums text-navy">{readiness}%</p>
          </div>
          <div className="mt-[10px] h-[6px] w-full overflow-hidden rounded-full bg-track">
            <span
              className="block h-full rounded-full bg-navy transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ width: `${readiness}%` }}
            />
          </div>
          <p className="mt-3 text-[13px] font-medium leading-[1.5] text-muted">
            This is how ready your paperwork is — not a measure of whether you will be accepted or
            granted a visa. Most students start well below 100%.
          </p>
        </div>
      ) : null}
    </div>
  );
}

export function ContactStep({ answers, errors, set }: StepProps) {
  const { contact } = answers;

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          required
          label="Full name"
          value={contact.full_name}
          error={errors.full_name}
          autoComplete="name"
          onChange={(value) => set("contact", { full_name: value })}
          placeholder="Your name"
        />
        <TextField
          required
          label="Email address"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={contact.email}
          error={errors.email}
          onChange={(value) => set("contact", { email: value })}
          placeholder="you@example.com"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          required
          label="Phone number"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          hint="Include your country code."
          value={contact.phone}
          error={errors.phone}
          onChange={(value) => set("contact", { phone: value })}
          placeholder="+977 …"
        />
        <TextField
          label="Country of residence"
          autoComplete="country-name"
          value={contact.country}
          onChange={(value) => set("contact", { country: value })}
          placeholder="Where you live now"
        />
      </div>

      <ChoiceList
        label="How would you prefer we contact you?"
        value={contact.preferred_contact_method}
        onChange={(value) => set("contact", { preferred_contact_method: value })}
        options={CONTACT_METHODS}
        columns={2}
      />

      <TextAreaField
        label="Anything else we should know?"
        hint="Optional."
        value={contact.message}
        rows={3}
        onChange={(value) => set("contact", { message: value })}
        placeholder="A question, a deadline you're working to, anything at all."
      />

      <ConsentBox
        checked={contact.consent}
        error={errors.consent}
        onChange={(checked) => set("contact", { consent: checked })}
      >
        I agree to be contacted by the counselling team about my UK study options. We use your
        details only to reply to this assessment.
      </ConsentBox>
    </div>
  );
}
