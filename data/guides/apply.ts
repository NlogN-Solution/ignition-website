import type { TimelineStage } from "@/components/ui/Timeline";
import type { AccordionItem } from "@/components/ui/Accordion";
import type { ChecklistItem } from "@/components/ui/Checklist";

/**
 * Process guidance only. Deadlines, fees and the number of choices permitted
 * are set by UCAS and change between cycles, so this describes how the
 * process works and links to ucas.com for anything datable.
 */
export const ucasSource = { label: "ucas.com", href: "https://www.ucas.com" };

export const applicationTimeline: TimelineStage[] = [
  {
    label: "Research and shortlist",
    meta: "Spring–summer before entry",
    description:
      "Decide what you want to study before you decide where. Shortlist courses on content and entry requirements, then look at the universities that teach them.",
  },
  {
    label: "Register and start your application",
    meta: "Early autumn",
    description:
      "UCAS applications open in the autumn for entry the following year. You register once and apply to several courses through the same form.",
  },
  {
    label: "Write your personal statement",
    meta: "Autumn",
    description:
      "The single piece of the application you fully control. Expect several drafts — the first one is never the one you send.",
  },
  {
    label: "Get your reference",
    meta: "Autumn",
    description:
      "A teacher, tutor or employer writes about your academic ability and suitability. Ask early and give them time.",
  },
  {
    label: "Submit before the deadline",
    meta: "Autumn–winter",
    description:
      "Medicine, dentistry, veterinary courses and applications to Oxford or Cambridge close earlier than everything else. Check the current dates on UCAS.",
  },
  {
    label: "Interviews and admissions tests",
    meta: "Winter",
    description:
      "Only some courses require these. If yours does, you will usually be told after you submit rather than before.",
  },
  {
    label: "Receive decisions",
    meta: "Winter–spring",
    description:
      "Offers arrive one at a time, not together. Most will be conditional on results you have not sat yet.",
  },
  {
    label: "Reply with firm and insurance choices",
    meta: "Spring",
    description:
      "You hold two: a first choice, and a backup with lower requirements. Everything else is declined at this point.",
  },
  {
    label: "Results day and confirmation",
    meta: "Summer",
    description:
      "If you meet your conditions, your place is confirmed. If you narrowly miss, universities sometimes still accept you — wait for the decision before acting.",
  },
  {
    label: "Clearing, if you need it",
    meta: "Summer",
    description:
      "Clearing matches students without a place to courses with space. It is a normal route in, not a failure state.",
  },
];

export const applicationChecklist: ChecklistItem[] = [
  { id: "shortlist", label: "Shortlist your courses", detail: "Chosen on content and entry requirements, not reputation alone." },
  { id: "requirements", label: "Check entry requirements for every choice", detail: "Including subject requirements and English language levels." },
  { id: "register", label: "Register with UCAS" },
  { id: "statement", label: "Draft your personal statement", detail: "Then redraft it at least twice." },
  { id: "reference", label: "Ask for your reference", detail: "Give whoever writes it several weeks' notice." },
  { id: "transcripts", label: "Gather transcripts and certificates" },
  { id: "english", label: "Book an English language test if you need one", detail: "Only accepted tests count — check with each university." },
  { id: "tests", label: "Register for any admissions tests", detail: "These have their own deadlines, separate from UCAS." },
  { id: "proofread", label: "Have someone else proofread the application" },
  { id: "submit", label: "Submit before the deadline for your courses" },
];

export const offerTypes = [
  {
    title: "Conditional offer",
    body: "A place, provided you achieve specified results. Most offers to students who have not yet finished school are conditional.",
  },
  {
    title: "Unconditional offer",
    body: "A place regardless of further results, usually because you already hold the qualifications required.",
  },
  {
    title: "Firm choice",
    body: "Your first choice. If you meet its conditions, you go there and your insurance choice is released.",
  },
  {
    title: "Insurance choice",
    body: "Your backup. It only helps if its requirements are genuinely lower than your firm choice — otherwise it protects nothing.",
  },
  {
    title: "Unsuccessful",
    body: "No offer. It is common to receive a mix of offers and rejections; it says less about you than it feels like at the time.",
  },
  {
    title: "Clearing",
    body: "A route to a place after results, whether you missed your conditions, changed your mind, or applied late.",
  },
];

export const commonMistakes = [
  "Applying to five versions of the same course at five universities of the same competitiveness, leaving no realistic backup.",
  "Choosing an insurance choice with the same entry requirements as the firm choice, which makes it useless.",
  "Writing a personal statement about why you want to attend a particular university — it goes to all of your choices.",
  "Listing achievements without ever explaining what you learned or how it changed your thinking.",
  "Missing the earlier deadline that applies to medicine, dentistry, veterinary science, Oxford and Cambridge.",
  "Assuming an English language test taken years ago is still valid, or that any test is accepted.",
  "Asking for a reference a week before the deadline.",
  "Not checking subject requirements — a grade profile can be met while a required subject is missing entirely.",
];

export const personalStatementGuidance = [
  {
    title: "Lead with the subject, not yourself",
    body: "Open with something specific about the field that interests you. Admissions tutors read thousands of statements that begin with a childhood anecdote.",
  },
  {
    title: "Show reading beyond the syllabus",
    body: "Name what you have read, watched or built, then say what you took from it. The reflection matters more than the list.",
  },
  {
    title: "Connect experience to the course",
    body: "Work experience, projects and volunteering count when you explain what they taught you about the subject or about working.",
  },
  {
    title: "Keep it about one subject",
    body: "The same statement goes to every course you apply for, so it has to work for all of them. Applying to unrelated subjects makes that nearly impossible.",
  },
  {
    title: "Write it yourself",
    body: "Statements are checked for similarity, and interviewers ask about what you wrote. A statement you cannot discuss is worse than a plain one.",
  },
];

export const applyFaqs: AccordionItem[] = [
  {
    question: "What is UCAS?",
    answer:
      "UCAS is the central service through which almost all undergraduate applications to UK universities are made. You complete one application, with one personal statement and one reference, and it is sent to every course you have chosen. Universities then respond individually through the same system.",
  },
  {
    question: "How many courses can I apply to?",
    answer:
      "UCAS limits the number of choices in a single application, and applies a lower limit to medicine, dentistry and veterinary courses. The exact numbers are set per cycle — check the current limits on ucas.com before you plan your shortlist.",
  },
  {
    question: "Does it matter which order I list my choices?",
    answer:
      "No. Universities cannot see where you have placed them, or which other courses you have applied to. The order is not a ranking, and you only choose a firm and insurance once offers arrive.",
  },
  {
    question: "Can I apply if I have not finished my qualifications yet?",
    answer:
      "Yes, and most applicants do. You enter your predicted grades and any results you already hold, and offers are made conditional on you achieving the results specified.",
  },
  {
    question: "What happens if I miss my conditions?",
    answer:
      "Do not assume you have lost the place. Universities sometimes confirm applicants who narrowly miss, particularly where the course is not oversubscribed. Wait for the formal decision before entering Clearing.",
  },
  {
    question: "Is an application fee charged?",
    answer:
      "UCAS charges a fee that varies with the number of choices, and it changes between cycles. Some applicants are eligible for a waiver. Check the current fee and eligibility on ucas.com.",
  },
];
