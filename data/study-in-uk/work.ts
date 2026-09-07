import type { ReasonAccent } from "./reasons";

/**
 * "Can international students work in the UK?"
 *
 * DATA HONESTY. Every figure here is a real, dated one, not an illustrative
 * example — the question has no useful answer without numbers, and a
 * placeholder here would be actively misleading rather than merely
 * incomplete. Each card names its own source and the year the figure applies
 * to, because every rate in this file changes on its own schedule:
 *
 * - The National Minimum Wage (card 1 and 2) is reviewed every April by the
 *   Low Pay Commission. £12.71/hour is the April 2026 rate.
 * - The Graduate Route's length depends on *when the application is filed*,
 *   not when the student graduates — a rule change already announced for
 *   1 January 2027. Both dates are named on the card on purpose, so the card
 *   does not go quietly wrong the day the cutoff passes.
 * - The Skilled Worker salary threshold (£38,700/year) and the five
 *   qualifying years for Indefinite Leave to Remain are separate Home Office
 *   figures that move independently of each other and of the two above.
 *
 * REVIEW SCHEDULE. Re-check all four cards each April (Low Pay Commission
 * cycle) and again as 1 January 2027 approaches (Graduate Route cutoff).
 * `workFaqs` restates the same facts as question-and-answer pairs for the
 * FAQPage schema on `/study-in-uk` — update both together, or the visible
 * card and the structured data quietly disagree.
 */
export type WorkCard = {
  id: string;
  tone: ReasonAccent;
  icon: "clock" | "sun" | "passport" | "briefcase";
  /** The figure set large at the top of the card. */
  stat: string;
  statNote: string;
  title: string;
  body: string;
  /** Who says so, and when. Printed under the body. */
  source: string;
  /** Path under /public for the card's background photograph. */
  image: string;
};

export const workIntro = {
  eyebrow: "Work while you study",
  title: "Can international students work in the UK?",
  body: "Eligible students can generally work up to 20 hours during term time and enjoy full-time work during official vacations.",
  imageAlt:
    "An international student standing by the Houses of Parliament with her books, looking up.",
};

export const workCards: WorkCard[] = [
  {
    id: "term",
    tone: "blue",
    icon: "clock",
    stat: "£254.20 / week",
    statNote: "20 hrs/week at National Minimum Wage",
    title: "Term time: any employer, any sector",
    body: "Eligible students can work up to 20 hours a week during term time, for any employer in any sector — there's no restriction on the type of job. At the National Minimum Wage of £12.71 an hour, 20 hours a week comes to about £254.20, roughly NPR 1.98 lakhs a month.",
    source: "UK Low Pay Commission, gov.uk — April 2026",
    image: "/images/working-while-studying.jpg",
  },
  {
    id: "vacation",
    tone: "emerald",
    icon: "sun",
    stat: "≈ NPR 5.1 lakhs",
    statNote: "full-time for 8 weeks, at minimum wage",
    title: "Unlimited hours during official vacations",
    body: "During official university vacations and holidays, eligible students can work unlimited hours — the 20-hour cap doesn't apply. Full-time at £12.71 an hour for 8 weeks comes to roughly NPR 5.1 lakhs, a significant contribution toward the following year's living costs.",
    source: "UKVI Appendix Student — gov.uk/student-visa/work, 2026",
    image: "/images/practical-assesments.jpeg",
  },
  {
    id: "graduate-route",
    tone: "orange",
    icon: "passport",
    stat: "Up to 2 years",
    statNote: "Graduate Route visa after your degree",
    title: "Stay and work after graduation — no job offer required",
    body: "After completing a UK bachelor's or master's degree, you're eligible for the Graduate Route visa: no job offer, no employer sponsorship, no salary minimum. Length depends on when you file, not when you graduate — applications filed on or before 31 December 2026 get 2 years; filed on or after 1 January 2027, bachelor's and master's graduates get 18 months. PhD graduates get 3 years either way.",
    source: "UK Home Office, gov.uk/graduate-visa, 2026",
    image: "/images/work-experiece-and-what-comes-after.png",
  },
  {
    id: "skilled-worker",
    tone: "navy",
    icon: "briefcase",
    stat: "£38,700+ / year",
    statNote: "2026 Skilled Worker salary threshold",
    title: "From Graduate Route to permanent settlement",
    body: "After the Graduate Route, a job paying £38,700 or more a year — the 2026 Skilled Worker threshold — qualifies for a Skilled Worker visa. Indefinite Leave to Remain follows after five qualifying years on the Skilled Worker route; time on the Graduate Route doesn't count toward those five years, only toward the separate 10-year long-residence route.",
    source: "UK Home Office, gov.uk/skilled-worker-visa, 2026",
    image: "/images/presentations.jpeg",
  },
];

export const workBanner = {
  headline: "Build experience while you study.",
  body: "Work, gain skills and grow your future – in the UK.",
};

export const workFootnote =
  "Figures are based on the UK National Minimum Wage of £12.71/hour (April 2026) and current Home Office visa rules, both of which are reviewed on their own schedules — confirm the live rate and rules on gov.uk before relying on them.";

/**
 * The same four facts as question-and-answer pairs, for the FAQPage schema
 * on `/study-in-uk` (see `app/study-in-uk/page.tsx`). This is what makes the
 * section answer-engine-friendly: a search or AI answer engine can quote a
 * direct answer to "can international students work in the UK" without
 * having to parse it out of the card copy. Keep these and `workCards` in
 * sync — the visible card and the structured data are two views of one fact.
 */
export const workFaqs = [
  {
    question: "Can international students work in the UK during their studies?",
    answer:
      "Yes. Most international students on a UK Student visa can work up to 20 hours a week during term time, for any employer in any sector, and full-time with no hour limit during official university vacations.",
  },
  {
    question: "How much can an international student earn working in the UK?",
    answer:
      "At the UK National Minimum Wage of £12.71 an hour (April 2026), 20 hours a week during term time comes to about £254.20 a week, roughly NPR 1.98 lakhs a month. Working full-time at the same rate over an 8-week vacation comes to roughly NPR 5.1 lakhs.",
  },
  {
    question: "Can international students stay and work in the UK after graduating?",
    answer:
      "Yes, through the Graduate Route visa, which needs no job offer, no employer sponsorship and no salary minimum. Applications filed on or before 31 December 2026 get 2 years (3 years for PhD graduates); applications filed from 1 January 2027 get 18 months for bachelor's and master's graduates, with PhD graduates still getting 3 years.",
  },
  {
    question: "How do international students settle permanently in the UK after graduating?",
    answer:
      "After the Graduate Route, a job paying £38,700 or more a year — the 2026 Skilled Worker threshold — qualifies for a Skilled Worker visa. Indefinite Leave to Remain follows after five qualifying years on the Skilled Worker route; time spent on the Graduate Route does not count toward those five years.",
  },
];
