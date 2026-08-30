/**
 * Placements, part-time work and the Graduate visa.
 *
 * THIS FILE IS DIFFERENT FROM EVERY OTHER GUIDE FILE, because it is the one
 * place on the site that states datable immigration and wage figures rather
 * than deferring to gov.uk for all of them. `data/guides/visa.ts` states none
 * on purpose. The exception is made here because the two questions this
 * section answers — "can I work?" and "can I stay?" — are unanswerable
 * without numbers, and a student who cannot find them here will find them
 * somewhere less careful.
 *
 * The trade is that every figure carries three things: the exact rule it
 * comes from, the date it was checked, and a link to the government page that
 * governs it. `checkedOn` is rendered to the reader, not just kept here.
 *
 * WHEN YOU REVIEW THIS FILE
 *
 * 1. Re-read each figure against its `source` link and move `checkedOn` on.
 *    Do not move the date without re-reading the page.
 * 2. The Graduate visa length is date-dependent and the two-year window
 *    closes on 31 December 2026. After that date, delete `graduateVisaWindow`
 *    and simplify `graduateVisaTerms` to the single 18-month rule.
 * 3. Never convert a wage figure into a monthly or annual income, in pounds
 *    or in any other currency. Hours vary, work is not guaranteed, and tax
 *    and National Insurance come off the top — a headline like
 *    "NPR 250,000 per month" reads as a promise and is not one.
 * 4. Say "Graduate visa", never "PSW" or "post-study work visa", and
 *    "permission to work", never "unlimited work".
 */

export const checkedOn = "27 August 2026";

export const sources = {
  studentVisaWork: {
    label: "gov.uk — Student visa: work",
    href: "https://www.gov.uk/student-visa/work",
  },
  graduateVisa: {
    label: "gov.uk — Graduate visa",
    href: "https://www.gov.uk/graduate-visa",
  },
  minimumWage: {
    label: "gov.uk — National Minimum Wage rates",
    href: "https://www.gov.uk/national-minimum-wage-rates",
  },
};

/* ------------------------------------------------------------------ *
 * During the degree — industrial placements
 * ------------------------------------------------------------------ */

export const placementIntro =
  "Many UK universities offer courses with an optional or integrated placement year, where you spend part of your degree working in a professional environment before returning to finish it. A placement normally adds a year to the course and is arranged through the university's placement team, though you apply for the role itself much as you would for any job.";

export const placementBenefits = [
  {
    title: "Apply what you have studied",
    body: "The gap between a taught module and the work it describes is wider than most students expect. A placement closes it while you still have a tutor to ask.",
  },
  {
    title: "Professional experience before you graduate",
    body: "You finish the degree with a year of real work on your CV rather than competing for entry-level roles against graduates who have none.",
  },
  {
    title: "Industry connections",
    body: "References, mentors and a manager who has seen you work. Some students are offered a graduate role by the same employer.",
  },
  {
    title: "A clearer idea of the job",
    body: "Sometimes the most valuable outcome is finding out the work is not what you want, early enough to change direction.",
  },
];

export const placementCaveat =
  "Placement availability varies by university and by course, and a placement year is not guaranteed simply because a course advertises one — you still have to secure the role. Check the specific course structure before you apply.";

/* ------------------------------------------------------------------ *
 * Alongside the degree — part-time work
 * ------------------------------------------------------------------ */

export const workRules = [
  {
    label: "During term time",
    value: "Up to 20 hours a week",
    detail:
      "For eligible students on a full-time course at degree level or above with an approved higher education provider.",
  },
  {
    label: "Outside term time",
    value: "Full time",
    detail:
      "During official university vacations, and after your course has formally finished while your visa is still valid.",
  },
  {
    label: "Minimum hourly pay, 21 and over",
    value: "£12.71",
    detail:
      "The National Living Wage from 1 April 2026. Lower rates apply to workers under 21 and to apprentices.",
  },
];

export const workConditionsNote =
  "Your own limit is the one printed on your visa, and it depends on your course level and your sponsor. Some work is barred outright — self-employment, professional sporting roles and permanent full-time posts among them. Working beyond your conditions is a serious breach that can end your visa and your course, so read the conditions on your own grant rather than a summary of somebody else's.";

export const earningsNote =
  "What you actually earn depends on the hours you get, the rate the job pays, and the tax and National Insurance deducted from it. Part-time work helps with living costs; it is not a second budget you can plan a year around, and no honest figure exists for what a student \"will\" earn in a month.";

/* ------------------------------------------------------------------ *
 * After the degree — the Graduate visa
 * ------------------------------------------------------------------ */

export const graduateVisaIntro =
  "After completing an eligible course at a UK university, international graduates may be able to apply for the Graduate visa. It gives permission to stay and work in the UK without needing an employer to sponsor you first — time to look for work, take a role in your field and build the start of a career rather than leaving the week after graduation.";

export const graduateVisaTerms = [
  {
    label: "Applications from 1 January 2027",
    value: "18 months",
    detail: "The standard length for bachelors and masters graduates.",
  },
  {
    label: "Applications on or before 31 December 2026",
    value: "2 years",
    detail: "The longer length still applies to applications made by that date.",
  },
  {
    label: "PhD and doctoral graduates",
    value: "3 years",
    detail: "Regardless of which of the two windows the application falls in.",
  },
];

/**
 * Delete this together with the 2-year row once 31 December 2026 has passed.
 * See note 2 in the file header.
 */
export const graduateVisaWindow =
  "The two-year length is the one that closes: it applies to applications made on or before 31 December 2026. If you are finishing a course this year, when you apply — not when you graduated — is what decides which length you get.";

export const graduateVisaLimits = [
  "It cannot be extended.",
  "You may be able to switch to another route before it ends, such as the Skilled Worker route, if you meet that route's requirements.",
  "Your course and your university both have to be eligible, and your sponsor has to have told the Home Office you completed the course.",
];
