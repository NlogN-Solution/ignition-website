/**
 * The three reasons the UK is chosen, condensed for the homepage.
 *
 * These are claims about the UK system rather than about any one institution,
 * which is why they carry sources and years. TEF, REF and QAA in particular
 * are the sort of thing a student is told about without ever being told what
 * they actually are, so the third card names all three and says what each
 * covers.
 *
 * KEEP THESE SHORT. The three cards stretch to the tallest of them, so a
 * fourth sentence on one card adds height to all three — and this band sits
 * between the search and the entry points, where every extra pixel pushes the
 * rest of the homepage down. The full treatment, including who runs each body
 * and the fact that the TEF covers England only, is on /study-in-uk, which is
 * where the third card links.
 *
 * `source` is printed on the card. Anything that changes between years — the
 * ranking positions especially — must keep its year attached, so a figure that
 * has gone stale is visibly stale rather than quietly wrong.
 *
 * `tone` maps to the three brand colours in the order they carry weight —
 * blue for the opening claim, navy for the substantive one, orange for the
 * outcome.
 */
export type WhyUkPoint = {
  id: string;
  tone: "blue" | "navy" | "orange";
  /** The number or short phrase set large at the top of the card. */
  stat: string;
  statNote: string;
  title: string;
  body: string;
  /** Who says so, and when. Printed under the body. */
  source?: string;
  /**
   * Path under /public for the card's background photograph. It is rendered
   * at low opacity in `luminosity` blend, so only its light and shade survive
   * and the card's own colour supplies the hue — which is why the choice is
   * about *shape and subject*, not about whether the picture's own colours
   * suit the panel. Anything busy in the lower half will fight the text.
   */
  image: string;
  href: string;
  linkLabel: string;
};

export const whyUkPoints: WhyUkPoint[] = [
  {
    id: "shorter",
    tone: "blue",
    stat: "3 years",
    statNote: "a bachelor's · 1 for a master's",
    title: "Shorter degrees, lower total cost",
    body: "Three years for a bachelor's rather than four, one for a taught master's. That is a year less tuition and a year less living cost — which moves the total far more than the headline fee does.",
    // Graduation. The claim is that you get there a year sooner, so the card
    // shows the end of it rather than the middle.
    image: "/images/friends-graduating.webp",
    href: "/money",
    linkLabel: "See what it costs",
  },
  {
    id: "top-ten",
    tone: "navy",
    stat: "4 in the top 10",
    statNote: "of the world's universities",
    title: "Home to some of the best universities anywhere",
    body: "Imperial, Oxford, Cambridge and UCL all sit in the global top ten — more than any country except the United States. You don't need one of the four to get a good degree here.",
    source: "QS World University Rankings 2026",
    // The portico everyone pictures when they hear "a top ten university",
    // which is exactly the claim being made.
    // NOTE: the filename is misspelled on disk ("univeristy"). It is written
    // here as it actually is — correct the file and this string together.
    image: "/images/london-university.webp",
    href: "/universities",
    linkLabel: "Explore universities",
  },
  {
    id: "quality",
    tone: "orange",
    stat: "TEF · REF · QAA",
    statNote: "independently checked",
    title: "Quality is externally assessed, not self-declared",
    body: "The TEF rates teaching Gold, Silver or Bronze, the REF assesses research across all four nations, and the QAA safeguards academic standards. You can look any university up in all three before you apply.",
    source: "Office for Students, Research England and the QAA",
    // The TEF rates teaching and the REF rates research. A supervised lab is
    // the literal subject of both claims.
    image: "/images/teacher-and-students-working-in-science-lab.webp",
    href: "/study-in-uk",
    linkLabel: "How UK degrees work",
  },
];
