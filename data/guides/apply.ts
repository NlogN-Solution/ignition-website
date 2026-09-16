import type { TimelineStage } from "@/components/ui/Timeline";
import type { AccordionItem } from "@/components/ui/Accordion";
import type { ChecklistItem } from "@/components/ui/Checklist";

/**
 * How applying to a UK university works, through Ignition.
 *
 * ## Why this is no longer a UCAS guide
 *
 * It used to describe a central form, one shared personal statement, five
 * choices, firm and insurance replies and Clearing. Every word of that is
 * about UCAS, which is a different company's product and a route none of
 * Ignition's students take: it is the centralised service for undergraduate
 * applications made from inside the UK school system. Explaining someone
 * else's platform on Ignition's own How-to-apply page taught students the
 * wrong vocabulary, pointed them at deadlines that did not apply to them, and
 * described a journey the portal they sign into does not run.
 *
 * ## What it describes instead
 *
 * Ignition's journey, in Ignition's words. A student builds one profile and
 * one set of documents here, chooses courses from this catalogue, and their
 * advisor prepares and lodges each application with the university — then
 * tracks it through review, offer, acceptance, CAS and visa to enrolment.
 *
 * The stages below are `ApplicationStatus` in the backend, in order, so the
 * public guide and the portal describe one journey rather than two accounts of
 * it. Adding a status there means adding a stage here.
 *
 * ## What it still refuses to do
 *
 * Restate anything datable. Visa rules and financial thresholds belong to UKVI
 * and change; entry criteria and intake dates belong to each university and
 * differ per course. This file holds the shape of the process and links to
 * whoever owns the numbers.
 */

/** The one external authority this guide sends anyone to. */
export const visaSource = {
  label: "gov.uk/student-visa",
  href: "https://www.gov.uk/student-visa",
};

export const applicationTimeline: TimelineStage[] = [
  {
    label: "Research and shortlist",
    meta: "6–12 months before your intake",
    description:
      "Decide what you want to study before you decide where. Shortlist courses on content and entry requirements, then look at the universities that teach them.",
  },
  {
    label: "Check the entry criteria for each course",
    meta: "Before you apply to anything",
    description:
      "Every university sets its own academic and English requirements, and they differ by course level. Each course page on this site shows the criteria that course is admitted under.",
  },
  {
    label: "Gather your documents",
    meta: "Start early — this is the slow part",
    description:
      "Transcripts, certificates, passport, English test result, CV, statement of purpose and references. Certified translations take time; nothing else can start until these exist.",
  },
  {
    label: "Your applications go in",
    meta: "Rolling, per intake",
    description:
      "One application per course, lodged with each university. Intakes are rolling rather than fixed — a September intake usually opens the previous autumn and closes when the course fills, which is often earlier than the published date.",
  },
  {
    label: "The university reviews it",
    meta: "2–8 weeks, varies widely",
    description:
      "Some institutions decide in a fortnight, some take two months. Having several applications open at once is normal, and each university assesses yours on its own.",
  },
  {
    label: "Receive your offer",
    meta: "Any time after submission",
    description:
      "Offers arrive one at a time. Most are conditional on something you have not done yet — a final transcript, an English score, a deposit.",
  },
  {
    label: "Accept one offer and pay the deposit",
    meta: "By the date on the offer letter",
    description:
      "You can hold several offers, but only one can become a place. Accepting means paying the tuition deposit that university asks for; the rest are declined.",
  },
  {
    label: "The university issues your CAS",
    meta: "After the deposit clears",
    description:
      "A Confirmation of Acceptance for Studies. It is the document a UK Student visa cannot be applied for without, and it has a number you will need.",
  },
  {
    label: "Apply for your Student visa",
    meta: "Up to 6 months before the course starts",
    description:
      "Made to UKVI with your CAS, your financial evidence and your English result. The visa decision is UKVI's alone, and the application is made in your name — Ignition prepares you for it and cannot make it for you.",
  },
  {
    label: "Pre-departure and enrolment",
    meta: "Weeks before the course starts",
    description:
      "Accommodation, flights, the immigration health surcharge, and registering with the university when you arrive.",
  },
];

export const applicationChecklist: ChecklistItem[] = [
  { id: "shortlist", label: "Shortlist your courses", detail: "Chosen on content and entry requirements, not reputation alone." },
  { id: "requirements", label: "Check entry requirements for every choice", detail: "Academic and English criteria are set per course, per university. Every course page here shows the criteria it is admitted under." },
  { id: "passport", label: "Check your passport is valid", detail: "It needs to cover your whole course, and the name on it is the name on everything else." },
  { id: "transcripts", label: "Gather transcripts and certificates", detail: "Originals plus certified translations where they are not in English." },
  { id: "english", label: "Book an English language test if you need one", detail: "Only accepted tests count, and each university sets its own minimum band scores." },
  { id: "statement", label: "Draft your statement of purpose", detail: "One per university. Then redraft it at least twice." },
  { id: "references", label: "Ask for your references", detail: "Give whoever writes them several weeks' notice." },
  { id: "finance", label: "Prepare your financial evidence", detail: "Needed for the visa, not the application — but it takes the longest to arrange." },
  { id: "proofread", label: "Have every application checked before it goes" },
  { id: "submit", label: "Get your applications lodged", detail: "One per course, with each university, well inside the intake." },
];

export const offerTypes = [
  {
    title: "Conditional offer",
    body: "A place, provided you do something specified — supply a final transcript, reach an English score, pay a deposit. Most offers start here.",
  },
  {
    title: "Unconditional offer",
    body: "A place with nothing outstanding, usually because you already hold every qualification the course requires.",
  },
  {
    title: "Holding several offers",
    body: "Normal, and allowed. Each university assesses you independently, so more than one can say yes — and you compare them properly before choosing.",
  },
  {
    title: "Accepting one",
    body: "You accept a single offer and pay that university's tuition deposit. That is the step that starts the CAS, and it is not easily undone.",
  },
  {
    title: "Declining the rest",
    body: "Tell the others. A withdrawn application frees a place, and a university you leave hanging is one you may want next year.",
  },
  {
    title: "Unsuccessful",
    body: "No offer. It is common to receive a mix of offers and rejections; it says less about you than it feels like at the time.",
  },
];

export const commonMistakes = [
  "Applying only to universities at one level of competitiveness, so a single set of results decides everything.",
  "Sending the same statement of purpose to six universities with the name changed — each one asks why *this* course.",
  "Treating the deposit as refundable. Accepting an offer and paying is the point of no return in practice, whatever the policy says.",
  "Leaving financial evidence until the visa stage. The funds usually have to have been held for a set period, so it cannot be arranged in a week.",
  "Assuming an English test taken years ago is still valid, or that every university accepts the same tests and band scores.",
  "Meeting the overall English score but missing a band minimum — most universities set both, and the band is what fails.",
  "Asking for a reference a week before you want to apply.",
  "Applying so late in the cycle that the intake is full, which happens long before any published closing date.",
  "Letting anyone else write the statement, fill the form or handle the visa application in your name.",
];

export const personalStatementGuidance = [
  {
    title: "Write one per university",
    body: "Unlike a UK school-leaver's single central application, yours goes to each institution separately — so each statement can and should name the course and say why that one.",
  },
  {
    title: "Lead with the subject, not yourself",
    body: "Open with something specific about the field that interests you. Admissions staff read thousands of statements that begin with a childhood anecdote.",
  },
  {
    title: "Explain the gap, if there is one",
    body: "Time between qualifications is common and not a problem. Leaving it unexplained is, because the reader will assume the worst version.",
  },
  {
    title: "Show reading and work beyond the syllabus",
    body: "Name what you have read, built or done, then say what you took from it. The reflection matters more than the list.",
  },
  {
    title: "Say why the UK, and why now",
    body: "For an international application this is a real question, and a vague answer to it is the commonest reason a strong file reads as weak.",
  },
  {
    title: "Write it yourself",
    body: "Statements are checked for similarity, and interviewers ask about what you wrote. A statement you cannot discuss is worse than a plain one.",
  },
];

export const applyFaqs: AccordionItem[] = [
  {
    question: "How do I actually apply?",
    answer:
      "Through Ignition. You build one profile and one document set in the portal, pick the courses you want from the catalogue, and your advisor prepares and lodges each application with the university for you. From there the portal shows you one next action at a time, all the way through offer, CAS and visa.",
  },
  {
    question: "How many universities can I apply to?",
    answer:
      "As many as you and your advisor think are worth it, and applying to several is sensible — decisions take different lengths of time and each university assesses you on its own. What limits you in practice is that every application is real work: its own statement of purpose, its own documents, its own fee where one is charged.",
  },
  {
    question: "Is there a deadline?",
    answer:
      "Per university and per intake, rather than one date for everybody. A September intake usually opens the previous autumn, and the deadline that bites is when the course fills, which is often well before the published one. Apply early rather than close to the date — your advisor will tell you which of your choices are tight.",
  },
  {
    question: "Can I apply if I have not finished my qualifications yet?",
    answer:
      "Yes, and most applicants do. You supply the results you already hold with a provisional or predicted transcript, and the offer is made conditional on the final ones.",
  },
  {
    question: "What happens after I accept an offer?",
    answer:
      "You pay that university's tuition deposit. Once it clears, the university issues your CAS — the Confirmation of Acceptance for Studies — and that is the document your Student visa application is built around. Ignition records the offer letter, the CAS and every date in your portal as they arrive.",
  },
  {
    question: "Is an application fee charged?",
    answer:
      "It depends on the university. Many of the institutions here charge nothing; some charge a modest fee per application. Your advisor tells you the figure before anything is submitted, and it is the university's fee rather than Ignition's.",
  },
  {
    question: "What if a university says no?",
    answer:
      "You try elsewhere, or a different course at the same institution — and because the catalogue is open all cycle with intakes in September and January, a rejection costs you time rather than the year. Your advisor will say plainly whether the next choice is realistic on your grades rather than letting you find out twice.",
  },
];
