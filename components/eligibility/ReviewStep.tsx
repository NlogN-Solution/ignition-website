"use client";

import { Pencil } from "lucide-react";
import type { University } from "@/data/universities";
import {
  CONTACT_METHODS,
  DOCUMENT_ITEMS,
  DOCUMENT_STATUSES,
  ENGLISH_EVIDENCE,
  FUNDING_SOURCES,
  QUALIFICATIONS,
  SCORED_TESTS,
  STUDY_LEVELS,
  type Answers,
  type SectionKey,
} from "./types";

/**
 * The last thing a student sees before they commit.
 *
 * Deliberately a list and not a dashboard. Everything on it is something they
 * typed, grouped as they were asked for it, so a wrong answer is findable by
 * remembering which step it was on — and each group edits back to that exact
 * step rather than restarting the form.
 *
 * Empty answers show as an em dash rather than being hidden. A student
 * checking their work needs to see that they skipped the grade field; a
 * summary that quietly omits it reads as complete.
 */

function label(options: readonly { value: string; label: string }[], value: string): string {
  return options.find((option) => option.value === value)?.label ?? value;
}

function Row({ term, value }: { term: string; value: string | null | undefined }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-[2px] py-[7px]">
      <dt className="text-[14px] font-medium text-muted">{term}</dt>
      <dd className="text-[14.5px] font-semibold text-ink">{value?.trim() ? value : "—"}</dd>
    </div>
  );
}

function Group({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-hairline bg-white p-[15px] sm:p-5">
      <div className="flex items-center justify-between gap-4 border-b border-hairline pb-[10px]">
        <h3 className="text-[15px] font-bold tracking-[-0.01em] text-navy">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-[6px] rounded-lg px-2 py-1 text-[13.5px] font-bold text-blue-link transition-colors duration-200 hover:bg-navy/[0.04] hover:text-navy"
        >
          <Pencil size={13} strokeWidth={2.4} aria-hidden />
          Edit
        </button>
      </div>
      <dl className="mt-1 divide-y divide-hairline">{children}</dl>
    </section>
  );
}

export function ReviewStep({
  answers,
  universities,
  onEdit,
}: {
  answers: Answers;
  universities: University[];
  onEdit: (step: SectionKey) => void;
}) {
  const { education, english, course, finance, documents, contact } = answers;
  const scored = SCORED_TESTS.includes(english.evidence);

  const names = Object.fromEntries(universities.map((entry) => [entry.id, entry.name]));
  const shortlist = course.preferred_universities.map((slug) => names[slug] ?? slug).join(", ");

  const bands = (["listening", "reading", "writing", "speaking"] as const)
    .filter((band) => english[band].trim())
    .map((band) => `${band[0].toUpperCase()}${english[band]}`)
    .join(" · ");

  return (
    <div className="space-y-4">
      <Group title="Education" onEdit={() => onEdit("education")}>
        <Row term="Highest qualification" value={label(QUALIFICATIONS, education.highest_qualification)} />
        <Row term="Subject" value={education.subject} />
        <Row term="Grade or GPA" value={education.grade} />
        <Row term="Institution" value={education.institution} />
        <Row term="Year completed" value={education.completion_year} />
      </Group>

      <Group title="English" onEdit={() => onEdit("english")}>
        <Row
          term="Evidence"
          value={
            english.evidence === "other_test" && english.other_test_name
              ? english.other_test_name
              : label(ENGLISH_EVIDENCE, english.evidence)
          }
        />
        {scored ? <Row term="Overall score" value={english.overall_score} /> : null}
        {scored && bands ? <Row term="Bands" value={bands} /> : null}
      </Group>

      <Group title="Course preferences" onEdit={() => onEdit("course")}>
        <Row term="Study level" value={label(STUDY_LEVELS, course.study_level)} />
        <Row term="Course" value={course.preferred_course} />
        <Row term="Location" value={course.preferred_location || "Anywhere in the UK"} />
        <Row term="Universities" value={shortlist} />
      </Group>

      <Group title="Financial readiness" onEdit={() => onEdit("finance")}>
        <Row term="Funding source" value={label(FUNDING_SOURCES, finance.funding_source)} />
        <Row term="Funds available" value={finance.estimated_funds} />
        {finance.sponsor_relationship ? (
          <Row term="Sponsor" value={finance.sponsor_relationship} />
        ) : null}
        {finance.loan_amount ? <Row term="Loan" value={finance.loan_amount} /> : null}
        {finance.scholarship_amount ? (
          <Row term="Scholarship" value={finance.scholarship_amount} />
        ) : null}
      </Group>

      <Group title="Documents" onEdit={() => onEdit("documents")}>
        {DOCUMENT_ITEMS.map((item) => (
          <Row
            key={item.key}
            term={item.label}
            value={documents[item.key] ? label(DOCUMENT_STATUSES, documents[item.key]) : ""}
          />
        ))}
      </Group>

      <Group title="Contact details" onEdit={() => onEdit("contact")}>
        <Row term="Name" value={contact.full_name} />
        <Row term="Email" value={contact.email} />
        <Row term="Phone" value={contact.phone} />
        <Row term="Country" value={contact.country} />
        <Row term="Preferred contact" value={label(CONTACT_METHODS, contact.preferred_contact_method)} />
      </Group>
    </div>
  );
}
