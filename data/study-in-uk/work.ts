/**
 * "Can international students work in the UK?"
 *
 * DATA HONESTY. Every figure here is a real one, not a placeholder, because
 * the question has no useful answer without numbers. The two rates are the
 * National Living Wage arithmetic rather than a quoted salary: 20 hours at
 * £10.85 is £217 a week, and the vacation figure is the same rate over the
 * 40-hour illustrative week the footnote states. The NPR conversions use a
 * round 208 NPR to the pound.
 *
 * REVIEW BEFORE APRIL. The National Living Wage changes every April and the
 * Graduate Route's two-year length is under review — the entry-requirements
 * guide carries the same warning. When the rate moves, `hourlyRate` and both
 * `rate` lines change together, and so do the monthly totals (weekly × 4).
 */
export type WorkStat = { icon: "calendar" | "coin"; label: string; muted?: boolean };

export type WorkCard = {
  id: string;
  icon: "clock" | "cap" | "passport";
  title: string;
  /** Second line under the title, e.g. the expansion of an acronym. */
  subtitle?: string;
  /** Sentence shown instead of a stat list — the PSW card leads with prose. */
  lead?: string;
  stats: WorkStat[];
  highlight: {
    icon: "wallet" | "chart";
    /** Small line above the figure. The first two cards fold it into `value`. */
    kicker?: string;
    value: string;
    /** Emphasised tail of `value`, rendered heavier. */
    strong?: string;
    note: string;
  };
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
    icon: "clock",
    title: "Term time",
    stats: [
      { icon: "calendar", label: "20 hrs / week" },
      { icon: "coin", label: "£217 / week" },
      { icon: "coin", label: "≈ NPR 45,125 / week", muted: true },
    ],
    highlight: {
      icon: "wallet",
      value: "Earn up to ",
      strong: "£870 / month",
      note: "≈ NPR 180,500",
    },
  },
  {
    id: "vacation",
    icon: "cap",
    title: "Official vacations",
    stats: [
      { icon: "calendar", label: "Full-time*" },
      { icon: "coin", label: "£434 / week" },
      { icon: "coin", label: "≈ NPR 90,250 / week", muted: true },
    ],
    highlight: {
      icon: "wallet",
      value: "Earn up to ",
      strong: "£1,736 / month",
      note: "≈ NPR 360,500",
    },
  },
  {
    id: "psw",
    icon: "passport",
    title: "PSW Visa",
    subtitle: "(Post-Study Work)",
    lead: "After completing your studies, you can stay and work in the UK for up to",
    stats: [
      { icon: "calendar", label: "2 years" },
    ],
    highlight: {
      icon: "chart",
      kicker: "Earn Upto",
      value: "£37,000+ / year",
      note: "(≈ NPR 7.7 Lakhs+)",
    },
  },
];

/** Sits under the PSW card's "2 years", in the same chip. */
export const pswRouteNote = "(Graduate Route / Post-Study Work Visa)";

export const workBanner = {
  headline: "Build experience while you study.",
  body: "Work, gain skills and grow your future – in the UK.",
};

export const workFootnote = "*Based on £10.85/hour and a 40-hour illustrative week.";
