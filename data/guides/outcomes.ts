/**
 * PLACEHOLDER DATA — NOT FOR PUBLICATION.
 *
 * Nothing in this file is verified, and none of it describes Ignition
 * students. It exists so the outcomes section on /study-in-uk has the right
 * shape, spacing and hierarchy while the real figures are sourced.
 *
 * WHAT MUST HAPPEN BEFORE THIS PAGE GOES LIVE
 *
 * 1. Every entry in `outcomeStats` must be replaced with a figure that has a
 *    named source and a year (HESA Graduate Outcomes, UCAS end-of-cycle,
 *    Office for Students). Set `verified: true` only once `source` names a
 *    publication a reader could go and check.
 * 2. `outcomeOrganisations` is a list of well-known employers of UK graduates
 *    in general. It is NOT a claim that Ignition students work there, and the
 *    section copy must never imply that. If Ignition ever holds verified
 *    placement data, replace this list with it and rewrite the heading.
 * 3. The logo files (imported by id in `GraduateOutcomes`) are placeholders
 *    dropped in to build the layout.
 *    Before publication, confirm each mark is used within the owner's brand
 *    guidelines and that Ignition has the right to display it — a logo wall
 *    is the visual grammar of a partnership, so the surrounding copy must
 *    keep saying these are examples of employers rather than partners.
 *    Prefer SVG or a 2x PNG on a transparent ground, and trim it to its ink
 *    before dropping it in — `logoHeight` sizes the mark, so padding baked
 *    into the file makes it render small.
 *
 * `StudyUkOutcomes` renders the "Example data" badge and the footnote below
 * whenever any figure here is unverified, so an unreplaced placeholder is
 * always visible to the reader rather than silently passing as fact.
 */

export type OutcomeStat = {
  value: string;
  label: string;
  detail: string;
  /** Where the figure comes from. Required before `verified` can be true. */
  source: string;
  verified: boolean;
};

export const outcomeStats: OutcomeStat[] = [
  {
    value: "300K+",
    label: "Students surveyed each year",
    detail: "Final-year students responding to the National Student Survey.",
    source: "Placeholder — replace with the current NSS response figure",
    verified: false,
  },
  {
    value: "700+",
    label: "Universities and colleges",
    detail: "Institutions covered by UK higher education reporting.",
    source: "Placeholder — replace with the current OfS register count",
    verified: false,
  },
  {
    value: "Graduate outcomes",
    label: "Employment or further study",
    detail: "Measured 15 months after graduation across UK providers.",
    source: "Placeholder — replace with HESA Graduate Outcomes data",
    verified: false,
  },
  {
    value: "Global careers",
    label: "Industries UK graduates enter",
    detail: "Technology, finance, healthcare, engineering, media and research.",
    source: "Placeholder — replace with a sourced sector breakdown",
    verified: false,
  },
];

export type OutcomeOrganisation = {
  /** Keys the logo file in `GraduateOutcomes`. */
  id: "nvidia" | "microsoft" | "amazon" | "jpmorgan" | "nhs" | "liverpool";
  name: string;
  /** Rendered under the mark — this is the informative half. */
  sector: string;
  /**
   * Rendered height in px inside the shared 56px logo box.
   *
   * Logo walls cannot be sized by one shared height: a tall crest and a long
   * wordmark set to the same pixel height look nothing like the same weight.
   * These values balance the two — closer to equal optical area than to equal
   * height, but pulled back toward height so the very wide wordmarks
   * (Microsoft, J.P. Morgan, both better than 4:1) do not end up too short to
   * read. That is why the crest is roughly twice the height of a wordmark.
   *
   * The source files are trimmed to their ink, so these numbers size the mark
   * itself rather than the padding around it. A replacement file with
   * whitespace baked in renders small until it is trimmed too.
   */
  logoHeight: number;
};

/**
 * Illustrative only. See the header note: these are widely known employers of
 * UK graduates, not organisations Ignition has a relationship with.
 */
export const outcomeOrganisations: OutcomeOrganisation[] = [
  { id: "nvidia", name: "NVIDIA", sector: "Semiconductors & AI", logoHeight: 40 },
  { id: "microsoft", name: "Microsoft", sector: "Software", logoHeight: 26 },
  { id: "amazon", name: "Amazon", sector: "Technology & logistics", logoHeight: 30 },
  { id: "jpmorgan", name: "J.P. Morgan", sector: "Banking & finance", logoHeight: 26 },
  { id: "nhs", name: "NHS", sector: "Healthcare", logoHeight: 34 },
  { id: "liverpool", name: "Liverpool FC", sector: "Sport & media", logoHeight: 52 },
];

/** True when anything above still needs replacing. Drives the demo badge. */
export const outcomesAreIllustrative = outcomeStats.some((s) => !s.verified);

/**
 * The sectors UK graduates go into. This is descriptive rather than
 * statistical, so it carries no figures and needs no source.
 */
export const outcomeSectors = [
  "Technology",
  "Finance",
  "Healthcare",
  "Engineering",
  "Media & creative",
  "Research & academia",
];
