import type { AccordionItem } from "@/components/ui/Accordion";

export const requirementsNotice =
  "Everything here is general guidance. Entry requirements are set by each university and differ between courses and intakes — always confirm on the official university course page before you rely on them.";

export const requirementTypes = [
  {
    title: "Academic requirements",
    body: "The grades or points a course asks for. UK offers are commonly expressed as A-level grades, but universities publish equivalents for a wide range of qualifications. A published requirement is a threshold, not a prediction of who gets in — competitive courses often receive many more qualified applicants than places.",
  },
  {
    title: "Subject requirements",
    body: "Specific subjects you must have studied. These are separate from grades and are the requirement most often missed: an applicant can exceed the grade profile and still be ineligible because a required subject is absent. Engineering usually requires mathematics and physics; medicine usually requires chemistry and biology.",
  },
  {
    title: "English language requirements",
    body: "Evidence that your English is sufficient for the course. Each university publishes which tests it accepts, the overall score required, and the minimum in each individual component. The component minimum catches people out — a strong overall score with one weak section can fall short.",
  },
  {
    title: "International qualifications",
    body: "Universities assess qualifications from other education systems against their own standards, and publish country-specific requirements. Some qualifications map directly to a UK offer; others require a foundation year first. The university's international pages are the authority on this, not a general conversion table.",
  },
  {
    title: "Course-specific requirements",
    body: "Some courses require more than grades. Portfolios for art, design and architecture; admissions tests for medicine, law and some Oxford and Cambridge courses; interviews; work experience; and background checks for courses involving children or patients.",
  },
];

export const generalVsOfficial = [
  {
    title: "General guidance",
    body: "What Ignition provides: how requirements are structured, what the terms mean, what is typically asked for in a subject area, and what to check. Useful for orienting yourself and building a realistic shortlist.",
  },
  {
    title: "University-specific requirements",
    body: "What only the university can tell you: the exact grades, subjects, test scores and additional requirements for one course in one intake year. These change, and they are the only version that counts when you apply.",
  },
];

export const requirementsChecklist = [
  { id: "grades", label: "Check the grade requirement for each course", detail: "Including the equivalent for your own qualification." },
  { id: "subjects", label: "Check required and preferred subjects", detail: "The most commonly missed requirement." },
  { id: "english-overall", label: "Check the overall English score required" },
  { id: "english-component", label: "Check the minimum score in each component", detail: "A strong overall score can still fail a component minimum." },
  { id: "test-validity", label: "Confirm your English test is accepted and still valid" },
  { id: "admissions-test", label: "Check whether an admissions test is required", detail: "These register separately and close earlier than UCAS." },
  { id: "portfolio", label: "Check whether a portfolio or audition is required" },
  { id: "extra", label: "Check for interviews, work experience or background checks" },
  { id: "verify", label: "Verify everything on the official course page", detail: "Requirements change between intakes." },
];

export const requirementsFaqs: AccordionItem[] = [
  {
    question: "Do I have to meet the published requirement exactly?",
    answer:
      "The published requirement is what the university expects to ask for. Some universities make contextual offers that are lower, and some make higher offers for oversubscribed courses. If you are close but not certain, apply anyway and include the course as an ambitious choice alongside a realistic one.",
  },
  {
    question: "My qualification is not listed. What do I do?",
    answer:
      "Contact the university's international admissions team directly. They assess qualifications they have not published equivalents for regularly, and they would far rather answer before you apply than reject an application they could not evaluate.",
  },
  {
    question: "What if my English score is below the requirement?",
    answer:
      "Many universities offer pre-sessional English courses — short programmes taken before your degree starts that satisfy the requirement on completion. Ask about these when you receive a conditional offer, since places are limited and they must be booked early.",
  },
  {
    question: "Can I retake to improve my grades?",
    answer:
      "Usually, but some competitive courses treat resat qualifications differently, and a few state that they will not consider them except in defined circumstances. Check the individual course policy before assuming a retake will be accepted.",
  },
  {
    question: "How long is an English language test valid for?",
    answer:
      "Most accepted tests have a validity period, and universities apply their own rules about how recent a test must be at the point you start the course, not just when you apply. Check both.",
  },
];
