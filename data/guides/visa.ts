import type { TimelineStage } from "@/components/ui/Timeline";
import type { AccordionItem } from "@/components/ui/Accordion";
import type { ChecklistItem } from "@/components/ui/Checklist";

/**
 * Process description only. Fees, maintenance amounts, processing times and
 * document lists are set by the Home Office and change — none are stated
 * here as fact. Everything datable defers to gov.uk.
 */
export const visaNotice =
  "Visa and immigration rules can change. Always verify current requirements using official UK government guidance.";

export const govUkSource = { label: "gov.uk/student-visa", href: "https://www.gov.uk/student-visa" };

export const visaJourney: TimelineStage[] = [
  {
    label: "Receive your offer",
    description:
      "Nothing visa-related can begin until a UK university has offered you a place on a course that is eligible to sponsor a Student visa.",
  },
  {
    label: "Accept your offer",
    description:
      "You accept one offer as your firm choice. Only the university you accept will sponsor your visa application.",
  },
  {
    label: "Meet your conditions",
    description:
      "Conditional offers become unconditional once you provide the results, English test scores and documents the university asked for.",
  },
  {
    label: "Receive your CAS",
    description:
      "The university issues a Confirmation of Acceptance for Studies — a reference number confirming your sponsored place. You cannot apply without one.",
  },
  {
    label: "Prepare your documents",
    description:
      "Passport, CAS, qualifications used to obtain the offer, and any additional documents your circumstances require. The list depends on your nationality and history.",
  },
  {
    label: "Prepare your financial evidence",
    description:
      "You must show you can pay your course fees and support yourself. The amount, the acceptable forms of evidence and how long funds must be held are all set by the Home Office.",
  },
  {
    label: "Submit your application",
    description:
      "Applications are made online from outside the UK, with a fee and the immigration health surcharge paid at the same time.",
  },
  {
    label: "Complete the required checks",
    description:
      "This normally includes biometrics, and depending on your circumstances may include a tuberculosis test or an interview about your study intentions.",
  },
  {
    label: "Receive your decision",
    description:
      "Processing times vary by country and time of year. Apply as early as the rules permit rather than as late as you can manage.",
  },
  {
    label: "Prepare to travel",
    description:
      "Confirm your arrival window, arrange accommodation and keep your key documents in your hand luggage, not your hold bag.",
  },
];

export const visaDocuments: ChecklistItem[] = [
  { id: "passport", label: "Valid passport", detail: "Check the expiry date against the length of your course." },
  { id: "cas", label: "CAS reference number", detail: "Issued by your university once you have met your conditions." },
  { id: "quals", label: "Qualifications used to get your offer", detail: "Certificates and transcripts, as listed on your CAS." },
  { id: "english", label: "English language evidence", detail: "Where required — the accepted tests are specified by the Home Office." },
  { id: "finance", label: "Financial evidence", detail: "In a form and for a duration set by current Home Office rules." },
  { id: "tb", label: "Tuberculosis test certificate", detail: "Required for applicants from certain countries only." },
  { id: "consent", label: "Parental consent and birth certificate", detail: "For applicants under 18." },
  { id: "atas", label: "ATAS certificate", detail: "Required for some sensitive research and technology subjects." },
];

export const visaMistakes = [
  "Applying before the CAS has been issued — the application cannot be made without it.",
  "Holding the required funds for a shorter period than the rules specify, or in an account that does not qualify.",
  "Submitting bank statements that do not show the account holder's name, the date, and the balance clearly.",
  "Booking flights before a decision is made.",
  "Letting a passport expire partway through the course.",
  "Assuming the requirements are the same as when a friend or sibling applied — they change frequently.",
  "Missing that some courses require an ATAS certificate, which itself takes time to obtain.",
];

export const visaTerms: AccordionItem[] = [
  {
    question: "CAS (Confirmation of Acceptance for Studies)",
    answer:
      "A unique reference number issued by a licensed student sponsor confirming they have offered you a place. It carries details of your course, fees and the qualifications used to make the offer, and is required before you can apply.",
  },
  {
    question: "Sponsor",
    answer:
      "The university or college holding a licence to sponsor international students. Your visa is tied to studying with that sponsor on that course.",
  },
  {
    question: "Immigration health surcharge",
    answer:
      "A charge paid as part of the visa application that gives access to the National Health Service during your stay. It is separate from the visa fee and is normally paid for the full length of the visa up front.",
  },
  {
    question: "Biometric information",
    answer:
      "Fingerprints and a photograph, collected as part of the application. How and where this is done depends on your country and the type of application.",
  },
  {
    question: "Maintenance funds",
    answer:
      "Money you must show you hold to cover course fees and living costs. The amount depends on where you will study and how long for, and the rules on how long the money must have been held are strict.",
  },
  {
    question: "ATAS",
    answer:
      "Academic Technology Approval Scheme. A certificate required before studying certain sensitive subjects, mostly in engineering, physical sciences and technology. Your university will tell you if your course needs one.",
  },
];

export const visaFaqs: AccordionItem[] = [
  {
    question: "When should I start the visa process?",
    answer:
      "As soon as you have accepted an offer and met your conditions. There is an earliest date before which you cannot apply, but processing times vary considerably by country and peak sharply over the summer, so applying at the earliest permitted point is the safest approach.",
  },
  {
    question: "How much money do I need to show?",
    answer:
      "The amount covers your outstanding course fees plus living costs for a set number of months, and it differs depending on where in the UK you will study. Both the figures and the rules on how the money must be held are set by the Home Office and reviewed regularly — check the current requirement on gov.uk rather than relying on any third-party summary.",
  },
  {
    question: "Can I work while I study?",
    answer:
      "Student visas normally permit limited work during term time and more during vacations, but the limits depend on your course level and the conditions printed on your visa. Working beyond your conditions is a serious breach, so confirm what your specific visa allows.",
  },
  {
    question: "Can my family come with me?",
    answer:
      "Dependants can only be brought in specific circumstances, and the rules on which courses qualify have changed in recent years. Check the current position on gov.uk before making any plans that assume dependants can join you.",
  },
  {
    question: "What happens if my visa is refused?",
    answer:
      "You will be given the reasons in writing. Depending on the grounds, you may be able to correct the issue and reapply, or request an administrative review. Contact your university's international office immediately — they deal with this regularly and can advise on next steps.",
  },
];
