/**
 * "UK vs the other places a family is actually weighing it against."
 *
 * `FiveReasons` argues the UK is a good place to study. It never argues the
 * UK over the USA, Australia or Canada — and for most families comparing
 * offers, that comparison, not "is studying abroad worth it", is the actual
 * decision on the table. This is the one section on the site that makes it.
 *
 * DATA HONESTY. Every figure is dated and sourced, the same discipline
 * `data/study-in-uk/work.ts` holds itself to. Several figures are
 * deliberately *not* claimed as UK wins:
 * - Canada's Post-Graduation Work Permit and Australia's Temporary Graduate
 *   visa can both reach 3 years, matching or exceeding the UK's Graduate
 *   Route — the honest UK advantage is a work route with no STEM/employer
 *   condition attached, not simply "longest visa".
 * - Canada's national average international tuition (StatCan, a genuine
 *   government figure) is not obviously cheaper than the UK's — the UK range
 *   overlaps and can run higher at the top end.
 * - The UK and Australia are the only two of the four with one simple
 *   national minimum wage; the US and Canada both depend on which state or
 *   province the job is actually in.
 * Overstating any of these would cost more trust than the section is worth.
 *
 * WHAT IS DELIBERATELY NOT IN THIS TABLE. Graduation/non-continuation rates
 * for international students, broken down by country of origin, do not exist
 * in a form that is genuinely comparable across all four destinations —
 * confirmed by direct research, not assumed. The UK's HESA Performance
 * Indicators are scoped to UK-domiciled students only, by design; no
 * Nepal-specific or South-Asia-specific completion dataset exists for any of
 * the four countries. What each country does publish measures something
 * different (a US graduation-rate, an Australian attrition-rate, a Canadian
 * completion-rate — three different metrics, three different cohort years),
 * so it is left out entirely rather than forced into a row that would look
 * precise and be false.
 *
 * NPR CONVERSIONS. Cost figures carry a parenthetical NPR equivalent,
 * converted at Nepal Rastra Bank's official sell rate — the rate a student
 * actually pays to buy foreign currency, not a mid-market rate — on
 * 8 September 2026 (£1 = NPR 205.04, $1 = NPR 151.48, AUD 1 = NPR 109.34,
 * CAD 1 = NPR 109.58; source: nrb.org.np/forex). This rate moves daily and
 * is the fastest-decaying figure on this page — re-derive it before every
 * republish rather than trusting the number already here, and mark the new
 * date when you do.
 *
 * REVIEW SCHEDULE. Every figure here moves on its own government's schedule,
 * not each other's — re-check all rows against source at least twice a year,
 * and immediately on any announced policy change (the US ended indefinite
 * F-1 "Duration of Status" in 2026; Canada's off-campus cap, PGWP rules and
 * proof-of-funds amount have all changed within the last two years).
 */
export type DestinationRow = {
  id: string;
  label: string;
  uk: string;
  usa: string;
  australia: string;
  canada: string;
  /** The point the row is making, not just the numbers — printed under the
   * table for rows where the raw figures alone invite a wrong reading. */
  note?: string;
};

export const destinationRows: DestinationRow[] = [
  {
    id: "visa-time",
    label: "Visa processing time",
    uk: "~3 weeks from biometrics (15 working days)",
    usa: "No official average — depends on embassy interview availability, commonly 1 month, can exceed 6",
    australia: "Sector benchmark: 50% within 28 days, 90% within 5 months",
    canada: "80% of applications within 28 days (60-day service standard)",
    note: "The US publishes no single average on purpose — F-1 timing is dominated by interview-slot availability at each embassy, not processing speed, so a single number would be more misleading than no number.",
  },
  {
    id: "english-test",
    label: "English test to get in",
    uk: "Not always — a university teaching a degree-level course can assess your English itself instead of requiring an approved test, if it meets CEFR B2; decided per university, and regulated courses (medicine, nursing, law) usually still require one",
    usa: "Yes — TOEFL or IELTS required by nearly all institutions",
    australia: "Yes — IELTS 6.0 or equivalent required by all institutions",
    canada: "Yes — IELTS 6.0 or equivalent required by most programmes",
    note: "This is a per-university decision, not a blanket exemption — check it for your specific course rather than assume it applies.",
  },
  {
    id: "tuition",
    label: "Typical annual tuition (international students)",
    uk: "£12,000–£38,000, most £15,000–£25,000 (≈ NPR 24.6–77.9 lakhs, most ≈ NPR 30.8–51.3 lakhs)",
    usa: "No official \"international\" rate — out-of-state public average $31,880 (≈ NPR 48.3 lakhs); private average $45,000 (≈ NPR 68.2 lakhs)",
    australia: "AUD $20,000–$45,000, undergraduate (≈ NPR 21.9–49.2 lakhs)",
    canada: "CAD $41,746 national average, undergraduate (≈ NPR 45.8 lakhs)",
    note: "Canada's figure is a genuine government average and is not the cheapest of the four — check a specific course's fee rather than assume the UK undercuts every alternative.",
  },
  {
    id: "living-costs",
    label: "Government-required living-cost funds (per year)",
    uk: "£10,539 outside London, £13,761 in London — the visa's own required proof (≈ NPR 21.6–28.2 lakhs)",
    usa: "No single official figure — each university sets its own cost-of-attendance estimate on your I-20",
    australia: "AUD $29,710 — official Home Affairs requirement (≈ NPR 32.5 lakhs)",
    canada: "CAD $23,448, effective 1 September 2026 — official IRCC requirement (≈ NPR 25.7 lakhs)",
    note: "This is what each government requires you to prove you can afford, not a marketing estimate — and on this figure alone, Australia's official requirement is the highest of the four, not the UK's.",
  },
  {
    id: "bachelors",
    label: "Bachelor's degree",
    uk: "3 years",
    usa: "4 years",
    australia: "3 years",
    canada: "4 years",
  },
  {
    id: "masters",
    label: "Taught master's",
    uk: "1 year",
    usa: "2 years",
    australia: "1–2 years",
    canada: "1–2 years",
  },
  {
    id: "min-wage",
    label: "Minimum wage while you work part-time",
    uk: "£12.71/hour — one national rate",
    usa: "$7.25/hour federal floor — most states and cities set a higher local rate, some above $17",
    australia: "AUD $26.44/hour — one national rate",
    canada: "CAD $18.15/hour federal rate covers few jobs — most work falls under provincial rates, CAD $15.00–$19.75 depending on province",
    note: "The UK and Australia are the only two of the four with one simple number. In the US and Canada, the honest answer is \"it depends where the job is.\"",
  },
  {
    id: "vacation-work",
    label: "Full-time work during vacation",
    uk: "Yes — unlimited hours during official vacation",
    usa: "On-campus only, unlimited during breaks — off-campus work needs its own CPT/OPT authorisation",
    australia: "Yes — unlimited during scheduled course breaks (the 48-hr/fortnight cap only applies in term)",
    canada: "Yes — unlimited off-campus during scheduled breaks, if enrolled the term before and after",
    note: "The UK and Canada allow this with no extra paperwork. In the US, only on-campus work is automatically unlimited during a break — most students won't yet hold the separate authorisation off-campus vacation work needs.",
  },
  {
    id: "work-after",
    label: "Work after you graduate",
    uk: "Up to 2 years (3 for a PhD) — no job offer needed",
    usa: "12 months; 36 months only for STEM degrees, and only with an E-Verify-enrolled employer",
    australia: "2–3 years, depending on qualification level",
    canada: "Up to 3 years, but only for programmes 2+ years long — shorter programmes get a shorter permit",
    note: "Canada and Australia can match or beat the UK on length. The UK's route is the one with no field-of-study or employer condition attached.",
  },
];

export const destinationSourceGroups = [
  {
    country: "UK",
    sources: [
      { label: "GOV.UK — Visa processing times (applications outside the UK)", href: "https://www.gov.uk/guidance/visa-processing-times-applications-outside-the-uk" },
      { label: "GOV.UK — Student visa: knowledge of English", href: "https://www.gov.uk/student-visa/knowledge-of-english" },
      { label: "GOV.UK — Student visa: money you need", href: "https://www.gov.uk/student-visa/money" },
      { label: "GOV.UK — National Minimum Wage and National Living Wage rates", href: "https://www.gov.uk/national-minimum-wage-rates" },
      { label: "UK Home Office — Graduate Route", href: "https://www.gov.uk/graduate-visa" },
    ],
  },
  {
    country: "USA",
    sources: [
      { label: "U.S. Department of State — Visa appointment wait times", href: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/wait-times.html" },
      { label: "College Board — Trends in College Pricing and Student Aid 2025", href: "https://research.collegeboard.org/media/pdf/Trends-in-College-Pricing-and-Student-Aid-2025-final_1.pdf" },
      { label: "U.S. Department of Labor — Federal minimum wage", href: "https://www.dol.gov/agencies/whd/minimum-wage" },
      { label: "USCIS — Students and Employment", href: "https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/students-and-employment" },
      { label: "DHS Study in the States — OPT & STEM OPT", href: "https://studyinstates.dhs.gov/stem-opt-hub/additional-resources/stem-opt-extension-overview" },
    ],
  },
  {
    country: "Australia",
    sources: [
      { label: "Department of Home Affairs — Global visa processing times", href: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-processing-times/global-visa-processing-times" },
      { label: "IDP Education — Cost of study at universities in Australia", href: "https://www.idp.com/blog/cost-of-study-at-universities-in-australia/" },
      { label: "Department of Home Affairs — Student visa (subclass 500), financial requirement", href: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500" },
      { label: "Fair Work Ombudsman — Minimum wages, Annual Wage Review 2026", href: "https://www.fairwork.gov.au/pay-and-wages/minimum-wages" },
      { label: "Department of Home Affairs — Temporary Graduate visa (subclass 485)", href: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/temporary-graduate-485" },
    ],
  },
  {
    country: "Canada",
    sources: [
      { label: "IRCC — Processing times and service delivery", href: "https://www.canada.ca/en/immigration-refugees-citizenship/corporate/transparency/committees/cimm-may-04-2026/processing-times-service-delivery.html" },
      { label: "Statistics Canada — Tuition fees for degree programs, 2025/2026", href: "https://www150.statcan.gc.ca/n1/daily-quotidien/250910/dq250910d-eng.htm" },
      { label: "IRCC — Study permit (official information hub; proof-of-funds amount per IRCC's September 2026 update)", href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html" },
      { label: "Government of Canada — Federal minimum wage", href: "https://www.canada.ca/en/employment-social-development/news/2026/03/government-of-canada-raises-the-federal-minimum-wage.html" },
      { label: "IRCC — Work off campus as an international student", href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/work-off-campus.html" },
      { label: "IRCC — Post-Graduation Work Permit", href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/after-graduation/about.html" },
    ],
  },
  {
    country: "Exchange rate",
    sources: [
      { label: "Nepal Rastra Bank — Foreign Exchange Rate (8 September 2026)", href: "https://www.nrb.org.np/forex/" },
    ],
  },
] as const;

export const destinationFootnote =
  "Figures current as of 2026 and change on each government's own schedule — confirm the live rule on the source before relying on it, especially for the US, where F-1 status rules changed in 2026, and for Canada, where off-campus work and Post-Graduation Work Permit rules have both changed within the last two years. NPR equivalents use Nepal Rastra Bank's sell rate on 8 September 2026 and move daily — treat them as a snapshot, not a quote.";
