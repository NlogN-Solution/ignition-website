import type { AccordionItem } from "@/components/ui/Accordion";

export const moneyNotice =
  "Cost figures shown across Ignition are example data for demonstration. Tuition is set by each university and living costs vary widely by city and lifestyle — confirm both directly before budgeting.";

/**
 * Example monthly living costs. Illustrative ranges only, used to show how a
 * budget breaks down rather than to state what anything costs.
 */
export const livingCostBreakdown = [
  { category: "Accommodation", low: 480, high: 950, note: "The single largest cost, and the one that varies most by city." },
  { category: "Food and household", low: 180, high: 300, note: "Cooking rather than eating out is the biggest lever here." },
  { category: "Transport", low: 30, high: 90, note: "Lower if you live within walking distance; student passes help." },
  { category: "Phone and internet", low: 15, high: 40, note: "Pay-as-you-go SIMs are cheaper than contracts in the first year." },
  { category: "Course materials", low: 20, high: 60, note: "Books, printing, equipment and studio materials." },
  { category: "Social and personal", low: 80, high: 200, note: "The line most often underestimated when planning." },
];

export const moneyTopics = [
  {
    title: "Tuition fees",
    body: "International tuition is set by each university and varies by subject — laboratory, studio and clinical courses cost more to teach and are priced accordingly. Fees are usually quoted per year, and some universities fix them for the duration of a course while others increase them annually. Ask which applies before you accept.",
  },
  {
    title: "Living costs",
    body: "The second half of the real number, and the one applicants underestimate. Where you study matters more than how you live: the gap between the cheapest and most expensive UK student cities is substantial. Budget for twelve months if you plan to stay over the summer, not the nine months of term.",
  },
  {
    title: "Accommodation",
    body: "University halls are simpler in the first year — bills are usually included, contracts match the academic year, and international students are often guaranteed a place. Private renting is typically cheaper per week but adds deposits, bills, longer contracts and sometimes a UK-based guarantor.",
  },
  {
    title: "Budgeting",
    body: "Build the budget before you arrive, in monthly terms, and include the one-off costs at the start: deposit, first month's rent, bedding, kitchen equipment and a phone. The first six weeks cost far more than a typical month, and running short then is what causes problems later.",
  },
  {
    title: "Banking",
    body: "A UK bank account makes rent and bills far easier. Most banks ask for your passport, visa or immigration status, and proof of your address and student status — your university can usually issue a bank letter. Digital banks are often faster to open, and many students use one while a traditional account is set up.",
  },
  {
    title: "Part-time work",
    body: "Student visas normally permit limited work in term time and more during vacations, but the limits depend on your course and the conditions on your visa. Treat any earnings as a supplement, never as part of the funds you rely on — visa rules require you to show you can support yourself without working.",
  },
  {
    title: "Scholarships",
    body: "Funding comes from universities, governments and external organisations, and the amounts range from small fee reductions to full awards. University scholarships are the most accessible, are often assessed automatically at the point of offer, and are worth asking about directly.",
  },
];

export const moneyFaqs: AccordionItem[] = [
  {
    question: "How much does it cost to study in the UK in total?",
    answer:
      "Tuition plus living costs, and both vary enormously — by subject, by university and by city. A laboratory-based degree in the south of England can cost several times a classroom-based degree in Wales or the north. Build the number from your own shortlist rather than from an average, and confirm each figure with the university.",
  },
  {
    question: "When do I have to pay tuition?",
    answer:
      "Most universities ask for a deposit to confirm your place, with the balance due at or shortly after enrolment. Many allow payment in instalments across the year. The deposit is usually credited against your fees but may be non-refundable, so check the terms before you pay.",
  },
  {
    question: "Do I need to show all of this money for my visa?",
    answer:
      "Visa financial requirements are separate from what you will actually spend, and are set by the Home Office rather than the university. The amount, the acceptable evidence and how long funds must be held are all specified in current immigration rules — check gov.uk.",
  },
  {
    question: "Are there scholarships for international students?",
    answer:
      "Yes, though full scholarships are rare and highly competitive. Partial awards and fee reductions are far more common, and many are assessed automatically when you receive an offer. Ask the admissions team what you are eligible for — a surprising number go unclaimed.",
  },
  {
    question: "Can I work to cover my living costs?",
    answer:
      "Part-time work helps but should not be relied on. Term-time hours are capped by your visa conditions, work is not guaranteed, and the visa application itself requires you to demonstrate funds without counting future earnings.",
  },
];
