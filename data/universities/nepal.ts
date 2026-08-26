/**
 * What it costs a student in Nepal to get from "I want to apply" to "I have
 * landed", broken into the individual payments rather than one total.
 *
 * WHY THIS EXISTS SEPARATELY FROM TUITION. A student comparing universities
 * sees the fee and assumes that is the number. It is not: before the fee is
 * ever paid there is a test, a visa, a health surcharge, a medical, a set of
 * translations and a ticket, and they are paid in a different currency, at
 * different times, to different people. Most of these costs are identical
 * whichever university is chosen — they are set by the Home Office, by the
 * test providers and by the Nepali authorities, not by the institution — so
 * they live here once rather than being copied onto six university records.
 *
 * EXAMPLE DATA. Every figure below is a placeholder for the interface, and is
 * marked as such wherever it is shown. Real amounts change constantly: the
 * visa fee and the health surcharge are set by the Home Office and revised by
 * statute, test fees are set by the providers, and the NPR figures move with
 * the exchange rate. `source` on each line is the authority a student must
 * check before budgeting, and the UI links it rather than asking them to
 * trust the number here.
 *
 * `stage` groups the payments the way a student actually meets them, so the
 * table can show what is due before applying versus what is due only after an
 * offer arrives — the difference between money at risk and money committed.
 */

export type CostStage = "before-applying" | "applying" | "after-offer" | "before-departure";

export const costStages: { id: CostStage; label: string; summary: string }[] = [
  {
    id: "before-applying",
    label: "Before you apply",
    summary:
      "Spent whether or not you get an offer. This is the money genuinely at risk.",
  },
  {
    id: "applying",
    label: "Applying",
    summary: "Paid to make the application itself.",
  },
  {
    id: "after-offer",
    label: "After an offer",
    summary:
      "Only due once a university has offered you a place and you have accepted it.",
  },
  {
    id: "before-departure",
    label: "Before you fly",
    summary: "The last payments, once the visa is granted.",
  },
];

export type NepalCost = {
  id: string;
  label: string;
  stage: CostStage;
  /** Amount in the currency it is actually paid in. */
  amount: string;
  currency: "NPR" | "GBP";
  detail: string;
  /** Who sets this price — the authority to check before budgeting. */
  source: string;
  href?: string;
  /** True when the payment is not required by every student. */
  optional?: boolean;
  /** True when the money comes back, so it should not be added to the total. */
  refundable?: boolean;
};

export const nepalCosts: NepalCost[] = [
  {
    id: "english-test",
    label: "English language test",
    stage: "before-applying",
    amount: "28,000–32,000",
    currency: "NPR",
    detail:
      "IELTS, PTE or an accepted equivalent. Book early — test centres in Kathmandu fill up months ahead in the peak intake.",
    source: "Test provider",
  },
  {
    id: "document-translation",
    label: "Translation and notarisation",
    stage: "before-applying",
    amount: "3,000–8,000",
    currency: "NPR",
    detail:
      "Academic transcripts, character certificates and citizenship documents translated into English and notarised.",
    source: "Notary / translation service",
  },
  {
    id: "application-fee",
    label: "University application fee",
    stage: "applying",
    amount: "0–25",
    currency: "GBP",
    detail:
      "Many UK universities charge nothing to apply directly. UCAS charges a single fee covering all your choices.",
    source: "The university, or UCAS",
    href: "https://www.ucas.com",
  },
  {
    id: "deposit",
    label: "Tuition deposit",
    stage: "after-offer",
    amount: "2,000–5,000",
    currency: "GBP",
    detail:
      "Paid to confirm your place and trigger the CAS. It is not an extra cost — it comes off your first-year tuition — but you need it in cash months before term starts.",
    source: "The university",
  },
  {
    id: "tb-test",
    label: "Tuberculosis test",
    stage: "after-offer",
    amount: "4,500–6,000",
    currency: "NPR",
    detail:
      "Compulsory for Nepali applicants and only valid from a clinic approved by the Home Office. A test taken anywhere else will be rejected.",
    source: "Home Office approved clinic",
    href: "https://www.gov.uk/tb-test-visa",
  },
  {
    id: "visa-fee",
    label: "Student visa application",
    stage: "after-offer",
    amount: "524",
    currency: "GBP",
    detail:
      "Paid to the Home Office when you submit the visa application from outside the UK.",
    source: "Home Office",
    href: "https://www.gov.uk/student-visa",
  },
  {
    id: "ihs",
    label: "Immigration Health Surcharge",
    stage: "after-offer",
    amount: "776 per year",
    currency: "GBP",
    detail:
      "Paid up front for the full length of your visa, not annually. A three-year course is charged as one lump sum, and this is the payment students most often fail to budget for.",
    source: "Home Office",
    href: "https://www.gov.uk/healthcare-immigration-application",
  },
  {
    id: "maintenance",
    label: "Maintenance funds held in your account",
    stage: "after-offer",
    amount: "Varies by course length and location",
    currency: "GBP",
    detail:
      "Not a fee. You must show the money has been held in a qualifying account for 28 consecutive days before you apply. It stays yours — but it must be there, and it must be evidenced correctly.",
    source: "Home Office",
    href: "https://www.gov.uk/student-visa/money",
    refundable: true,
  },
  {
    id: "noc",
    label: "No Objection Certificate",
    stage: "before-departure",
    amount: "2,000–3,000",
    currency: "NPR",
    detail:
      "Issued by the Ministry of Education. Required to send tuition abroad through a bank and to clear immigration at Kathmandu.",
    source: "Ministry of Education, Nepal",
  },
  {
    id: "bank-transfer",
    label: "Bank transfer and remittance charges",
    stage: "before-departure",
    amount: "1,500–5,000",
    currency: "NPR",
    detail:
      "Charged per transfer when tuition is sent abroad, plus the spread the bank takes on the exchange rate.",
    source: "Your bank",
  },
  {
    id: "flight",
    label: "One-way flight",
    stage: "before-departure",
    amount: "55,000–110,000",
    currency: "NPR",
    detail:
      "Kathmandu to a UK airport. The September intake is the most expensive week of the year to fly.",
    source: "Airline",
  },
  {
    id: "arrival",
    label: "First month in the UK",
    stage: "before-departure",
    amount: "1,200–1,800",
    currency: "GBP",
    detail:
      "Deposit and first rent, a phone contract, bedding and food before any loan or part-time work arrives.",
    source: "Estimate",
  },
];

export function costsInStage(stage: CostStage) {
  return nepalCosts.filter((cost) => cost.stage === stage);
}

/**
 * The standing notice for the whole breakdown. The figures are illustrative;
 * the two that are set by statute — the visa fee and the health surcharge —
 * are the ones a student must confirm on gov.uk before relying on them.
 */
export const nepalCostNotice =
  "Every figure here is an example for the interface, not a quote. The visa fee and health surcharge are set by the Home Office and change by statute; test and travel prices are set by the providers, and the rupee amounts move with the exchange rate. Check each source before you budget.";
