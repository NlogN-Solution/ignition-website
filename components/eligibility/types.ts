import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Languages,
  PoundSterling,
  UserRound,
} from "lucide-react";

/**
 * The answers, exactly as `POST /public/eligibility` accepts them.
 *
 * Snake_case because this object is the request body — mapping camelCase to
 * snake at the boundary would put a second shape in the middle of a form that
 * already has enough state, and there is nothing on this side that reads these
 * names except the fields that write them.
 *
 * Every field is optional and every one is a string. A half-finished form is
 * the normal state of this object for three of the four minutes it exists, and
 * a number field that has been cleared is `""` rather than `NaN`. Coercion
 * happens once, on submit.
 */

export interface Answers {
  education: {
    highest_qualification: string;
    subject: string;
    grade: string;
    institution: string;
    completion_year: string;
  };
  english: {
    evidence: string;
    overall_score: string;
    listening: string;
    reading: string;
    writing: string;
    speaking: string;
    other_test_name: string;
  };
  course: {
    study_level: string;
    preferred_course: string;
    preferred_location: string;
    preferred_universities: string[];
  };
  finance: {
    funding_source: string;
    estimated_funds: string;
    sponsor_relationship: string;
    loan_amount: string;
    scholarship_amount: string;
    notes: string;
  };
  documents: {
    academic: string;
    passport: string;
    english: string;
    financial: string;
    personal: string;
  };
  contact: {
    full_name: string;
    email: string;
    phone: string;
    country: string;
    preferred_contact_method: string;
    message: string;
    consent: boolean;
  };
}

export const EMPTY_ANSWERS: Answers = {
  education: {
    highest_qualification: "",
    subject: "",
    grade: "",
    institution: "",
    completion_year: "",
  },
  english: {
    evidence: "",
    overall_score: "",
    listening: "",
    reading: "",
    writing: "",
    speaking: "",
    other_test_name: "",
  },
  course: {
    study_level: "",
    preferred_course: "",
    preferred_location: "",
    preferred_universities: [],
  },
  finance: {
    funding_source: "",
    estimated_funds: "",
    sponsor_relationship: "",
    loan_amount: "",
    scholarship_amount: "",
    notes: "",
  },
  documents: { academic: "", passport: "", english: "", financial: "", personal: "" },
  contact: {
    full_name: "",
    email: "",
    phone: "",
    country: "",
    preferred_contact_method: "email",
    message: "",
    consent: false,
  },
};

export type SectionKey = keyof Answers;

export interface StepDefinition {
  id: SectionKey | "review";
  /** The two-digit number in the rail. */
  label: string;
  /** The long form, used in the mobile header and the review page. */
  title: string;
  /** The question, in the student's own terms. */
  heading: string;
  intro: string;
  icon: LucideIcon;
}

/**
 * Seven steps, in the order a student can actually answer them.
 *
 * Education first because it is the one thing every applicant knows without
 * looking anything up, and contact details last because asking for a phone
 * number before giving anything back is how a form gets abandoned.
 */
export const STEPS: StepDefinition[] = [
  {
    id: "education",
    label: "Education",
    title: "Your education",
    heading: "Let's start with your education.",
    intro:
      "Your academic background helps us understand which UK study options may be suitable for you.",
    icon: GraduationCap,
  },
  {
    id: "english",
    label: "English",
    title: "English",
    heading: "How will you meet the English requirement?",
    intro:
      "Most UK universities ask for evidence of English. There is more than one way to provide it, and not having it yet is fine.",
    icon: Languages,
  },
  {
    id: "course",
    label: "Course",
    title: "Course",
    heading: "Now tell us what you'd like to study.",
    intro: "You can change your mind later — this is about finding the right starting point.",
    icon: BookOpen,
  },
  {
    id: "finance",
    label: "Finance",
    title: "Finance",
    heading: "How are you planning to fund your studies?",
    intro:
      "A clear funding plan is part of every UK application. Nothing here is checked against a threshold.",
    icon: PoundSterling,
  },
  {
    id: "documents",
    label: "Documents",
    title: "Documents",
    heading: "Almost there — how ready are your documents?",
    intro: "An honest answer is more useful than an optimistic one. Most students are mid-way.",
    icon: FileText,
  },
  {
    id: "contact",
    label: "Details",
    title: "Your details",
    heading: "Finally, where should we send your results?",
    intro: "A counsellor reviews every assessment and gets back to you.",
    icon: UserRound,
  },
  {
    id: "review",
    label: "Review",
    title: "Review",
    heading: "Your assessment is ready to be reviewed.",
    intro: "Check anything you want to change before you send it.",
    icon: ClipboardCheck,
  },
];

// --- Option vocabularies, matching the backend enums -------------------------

export const QUALIFICATIONS = [
  { value: "plus_two", label: "+2 / A Levels" },
  { value: "bachelors", label: "Bachelor's degree" },
  { value: "masters", label: "Master's degree" },
  { value: "diploma", label: "Diploma" },
  { value: "other", label: "Other" },
] as const;

export const ENGLISH_EVIDENCE = [
  { value: "ielts", label: "IELTS" },
  { value: "pte", label: "PTE" },
  { value: "toefl", label: "TOEFL" },
  { value: "other_test", label: "Another accepted test" },
  { value: "moi", label: "Medium of Instruction (MOI)" },
  { value: "not_taken", label: "I haven't taken an English test yet" },
] as const;

/** The tests that have a score to collect. MOI and "not taken" do not. */
export const SCORED_TESTS = ["ielts", "pte", "toefl", "other_test"];

/** Band scores only make sense for IELTS. */
export const BANDED_TESTS = ["ielts"];

export const STUDY_LEVELS = [
  { value: "foundation", label: "Foundation" },
  { value: "undergraduate", label: "Undergraduate" },
  { value: "postgraduate", label: "Postgraduate" },
  { value: "other", label: "Other" },
] as const;

export const FUNDING_SOURCES = [
  { value: "family", label: "Family funded" },
  { value: "loan", label: "Education loan" },
  { value: "scholarship", label: "Scholarship" },
  { value: "self", label: "Self-funded" },
  { value: "combination", label: "A combination" },
] as const;

export const DOCUMENT_STATUSES = [
  { value: "ready", label: "Ready" },
  { value: "in_progress", label: "In progress" },
  { value: "not_available", label: "Not yet" },
  { value: "not_sure", label: "Not sure" },
] as const;

export const DOCUMENT_ITEMS = [
  { key: "academic", label: "Academic documents", hint: "Transcripts and certificates" },
  { key: "passport", label: "Passport", hint: "Valid for the length of your course" },
  { key: "english", label: "English evidence", hint: "Test report or MOI letter" },
  { key: "financial", label: "Financial documents", hint: "Bank statements, loan or sponsor letters" },
  { key: "personal", label: "Personal documents", hint: "Photographs, citizenship, references" },
] as const;

export const CONTACT_METHODS = [
  { value: "phone", label: "Phone" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "Email" },
] as const;
