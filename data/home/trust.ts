/**
 * Ignition's own track record — the one homepage section that says "here's
 * what we did" rather than "here's why the UK is worth it". It sits right
 * after the UK-system band (`data/home/why-uk.ts`) on purpose: that section
 * makes the case for going, this one makes the case for going with Ignition.
 *
 * Kept to two figures deliberately. A visa success rate and a processing
 * time are the two questions every applicant actually has before they commit
 * to using an agency at all — stacking on more numbers dilutes the two that
 * matter into a wall of statistics nobody reads closely.
 *
 * REVIEW ON A FIXED SCHEDULE. Both are live claims about current performance,
 * not a one-time achievement — recompute the visa success rate and the
 * median application-to-decision time quarterly rather than leaving a good
 * quarter's numbers on the page indefinitely.
 */
export type TrustStat = {
  id: string;
  icon: "shield" | "clock";
  stat: string;
  /** A short secondary reading of the same figure, e.g. the same duration in different units. */
  statNote?: string;
  label: string;
  body: string;
};

export const trustIntro = {
  eyebrow: "Why Ignition",
  title: "A track record you can hold us to.",
  intro:
    "Two numbers, because these are the two questions every applicant actually has before they commit to using an agency at all.",
};

export const trustStats: TrustStat[] = [
  {
    id: "visa-rate",
    icon: "shield",
    stat: "99%",
    label: "Visa success rate",
    body: "Nearly every Ignition-supported application results in a visa grant — the result of getting every document, deadline and financial requirement right the first time, not a second attempt.",
  },
  {
    id: "processing-time",
    icon: "clock",
    stat: "90 days",
    statNote: "≈ 3 months",
    label: "Application to visa decision",
    body: "From a complete application to a visa decision, most Ignition students hear back in around three months — enough certainty to plan flights, housing and term start dates with confidence.",
  },
];
