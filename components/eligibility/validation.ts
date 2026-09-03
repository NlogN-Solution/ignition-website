import { BANDED_TESTS, SCORED_TESTS, type Answers, type SectionKey } from "./types";

/**
 * Client-side validation, which exists to be *kind* — the server's is what
 * makes the data safe.
 *
 * The division matters. This file stops a student submitting a form with an
 * empty required field and tells them which one, in a sentence. It does not
 * decide anything: the eligibility verdict is computed server-side from the
 * stored answers, and `app/schemas/eligibility.py` re-checks every constraint
 * here on arrival. Nothing enforced only in this file is enforced at all.
 *
 * Two rules about the messages themselves:
 *
 * **They name the field.** "Please enter your overall IELTS score", never
 * "Invalid field" — a student re-reading a form to find what upset it is a
 * student who leaves.
 *
 * **They only fire when the answer is genuinely needed.** Choosing "I haven't
 * taken an English test yet" must not then demand a score, and someone who
 * skips the optional half of a step should never be blocked by it.
 */

export type Errors = Record<string, string>;

/** IELTS is the only scale here scored out of 9. The rest run much higher. */
const SCORE_RANGE: Record<string, { max: number; label: string }> = {
  ielts: { max: 9, label: "IELTS scores run from 0 to 9" },
  pte: { max: 90, label: "PTE scores run from 10 to 90" },
  toefl: { max: 120, label: "TOEFL scores run from 0 to 120" },
  other_test: { max: 120, label: "Enter the overall score as your test reports it" },
};

function isBlank(value: string): boolean {
  return value.trim().length === 0;
}

function scoreError(raw: string, evidence: string, field: string): string | null {
  if (isBlank(raw)) return null;
  const value = Number(raw);
  if (Number.isNaN(value)) return `${field} should be a number.`;
  const range = SCORE_RANGE[evidence];
  if (!range) return null;
  if (value < 0 || value > range.max) return `${range.label}.`;
  return null;
}

export function validateStep(step: SectionKey | "review", answers: Answers): Errors {
  const errors: Errors = {};

  if (step === "education") {
    const { highest_qualification, completion_year } = answers.education;
    if (isBlank(highest_qualification)) {
      errors.highest_qualification = "Please tell us your highest qualification.";
    }
    if (!isBlank(completion_year)) {
      const year = Number(completion_year);
      const thisYear = new Date().getFullYear();
      if (Number.isNaN(year) || year < 1950 || year > thisYear + 10) {
        errors.completion_year = "Please enter the year as four digits, for example 2025.";
      }
    }
  }

  if (step === "english") {
    const { evidence, overall_score } = answers.english;
    if (isBlank(evidence)) {
      errors.evidence = "Please choose how you'll meet the English requirement.";
    }

    // Only a named test has a score to give, and only then is it required.
    if (SCORED_TESTS.includes(evidence)) {
      if (isBlank(overall_score)) {
        const label = evidence === "other_test" ? "test" : evidence.toUpperCase();
        errors.overall_score = `Please enter your overall ${label} score.`;
      } else {
        const problem = scoreError(overall_score, evidence, "Your overall score");
        if (problem) errors.overall_score = problem;
      }

      if (BANDED_TESTS.includes(evidence)) {
        for (const band of ["listening", "reading", "writing", "speaking"] as const) {
          const problem = scoreError(answers.english[band], evidence, "Band scores");
          if (problem) errors[band] = problem;
        }
      }
    }

    if (evidence === "other_test" && isBlank(answers.english.other_test_name)) {
      errors.other_test_name = "Please tell us which test you took.";
    }
  }

  if (step === "course" && isBlank(answers.course.study_level)) {
    errors.study_level = "Please choose the level you want to study at.";
  }

  if (step === "finance") {
    const { funding_source, estimated_funds, loan_amount, scholarship_amount } = answers.finance;
    if (isBlank(funding_source)) {
      errors.funding_source = "Please tell us how you plan to fund your studies.";
    }
    for (const [field, value, name] of [
      ["estimated_funds", estimated_funds, "available funds"],
      ["loan_amount", loan_amount, "loan amount"],
      ["scholarship_amount", scholarship_amount, "scholarship amount"],
    ] as const) {
      if (!isBlank(value) && (Number.isNaN(Number(value)) || Number(value) < 0)) {
        errors[field] = `Please enter your ${name} as a number.`;
      }
    }
  }

  // Documents are entirely optional. A student who skips the checklist gets a
  // lower readiness figure, which is the honest answer, not an error.

  if (step === "contact") {
    const { full_name, email, phone, consent } = answers.contact;
    if (isBlank(full_name)) errors.full_name = "Please enter your name.";
    if (isBlank(email)) {
      errors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      errors.email = "That email address doesn't look right — please check it.";
    }
    if (isBlank(phone)) {
      errors.phone = "Please enter a phone number we can reach you on.";
    } else if ((phone.match(/\d/g) ?? []).length < 6) {
      errors.phone = "That phone number looks too short. Include your country code.";
    }
    if (!consent) {
      errors.consent = "We need your permission before a counsellor can contact you.";
    }
  }

  return errors;
}

/** The first step that is not yet valid, or null when the whole form is. */
export function firstIncompleteStep(
  answers: Answers,
  steps: (SectionKey | "review")[],
): (SectionKey | "review") | null {
  for (const step of steps) {
    if (Object.keys(validateStep(step, answers)).length > 0) return step;
  }
  return null;
}

/**
 * The answers as the API wants them: numbers as numbers, blanks as absent.
 *
 * `null` rather than `""` throughout, because the schema types these as
 * optional numbers and strings — an empty string would fail validation on a
 * field the student was entitled to skip.
 */
export function toSubmission(answers: Answers, sourcePage: string) {
  const num = (value: string) => (isBlank(value) ? null : Number(value));
  const str = (value: string) => (isBlank(value) ? null : value.trim());
  const scored = SCORED_TESTS.includes(answers.english.evidence);
  const banded = BANDED_TESTS.includes(answers.english.evidence);

  return {
    education: {
      highest_qualification: answers.education.highest_qualification,
      subject: str(answers.education.subject),
      grade: str(answers.education.grade),
      institution: str(answers.education.institution),
      completion_year: num(answers.education.completion_year),
    },
    english: {
      evidence: answers.english.evidence,
      // A score kept from before the student changed their mind about which
      // test they took would be attached to the wrong scale.
      overall_score: scored ? num(answers.english.overall_score) : null,
      listening: banded ? num(answers.english.listening) : null,
      reading: banded ? num(answers.english.reading) : null,
      writing: banded ? num(answers.english.writing) : null,
      speaking: banded ? num(answers.english.speaking) : null,
      other_test_name:
        answers.english.evidence === "other_test" ? str(answers.english.other_test_name) : null,
    },
    course: {
      study_level: answers.course.study_level,
      preferred_course: str(answers.course.preferred_course),
      preferred_location: str(answers.course.preferred_location),
      preferred_universities: answers.course.preferred_universities,
    },
    finance: {
      funding_source: answers.finance.funding_source,
      estimated_funds: num(answers.finance.estimated_funds),
      sponsor_relationship: str(answers.finance.sponsor_relationship),
      loan_amount: num(answers.finance.loan_amount),
      scholarship_amount: num(answers.finance.scholarship_amount),
      notes: str(answers.finance.notes),
    },
    documents: {
      academic: str(answers.documents.academic),
      passport: str(answers.documents.passport),
      english: str(answers.documents.english),
      financial: str(answers.documents.financial),
      personal: str(answers.documents.personal),
    },
    contact: {
      full_name: answers.contact.full_name.trim(),
      email: answers.contact.email.trim(),
      phone: answers.contact.phone.trim(),
      country: str(answers.contact.country),
      preferred_contact_method: answers.contact.preferred_contact_method || "email",
      message: str(answers.contact.message),
      consent: answers.contact.consent,
    },
    source_page: sourcePage,
  };
}
