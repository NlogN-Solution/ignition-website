/**
 * The five-reason grid on `/study-in-uk`.
 *
 * Shares its visual language with the homepage's `WhyUk` band — a duotone
 * photograph, a large stat, then the claim in full — rather than the flat
 * tinted card this section used before. `tone` maps to a brand colour the
 * same way it does there, so a reader who has already seen the homepage
 * treatment recognises this as the deeper version of the same argument
 * instead of a different section reinventing its own look.
 *
 * There is no outbound link on these cards on purpose. The homepage band
 * exists to send a reader on to `/universities`, `/money` and so on; this
 * section is the destination itself, on the page whose whole job is to make
 * the case for the UK in one place. A card that ends on "learn more" when it
 * is already the place a reader came to learn more reads as an unfinished
 * thought — so each card is written to stand on its own, in more depth than
 * the homepage has room for, and stop there.
 */
export type ReasonAccent = "navy" | "blue" | "orange" | "emerald" | "violet";

export type Reason = {
  id: string;
  tone: ReasonAccent;
  /** The number or short phrase set large at the top of the card. */
  stat: string;
  statNote: string;
  title: string;
  body: string;
  /** Who says so, printed under the body. Omit where the claim needs no citation. */
  source?: string;
  /**
   * Path under /public for the card's background photograph. Rendered at low
   * opacity in `luminosity` blend, so only its light and shade survive and
   * the card's own colour supplies the hue — see `components/home/WhyUk.tsx`
   * for the full reasoning, which this section reuses rather than repeats.
   */
  image: string;
  /** Keys the icon in `components/study-in-uk/FiveReasons.tsx`. */
  icon: "award" | "users" | "briefcase" | "clipboard" | "globe";
};

export const reasons: Reason[] = [
  {
    id: "quality",
    tone: "orange",
    stat: "TEF · REF · QAA",
    statNote: "independently checked",
    title: "Quality is externally assessed, not self-declared",
    body: "The Teaching Excellence Framework rates teaching Gold, Silver or Bronze, the Research Excellence Framework assesses research across all four nations, and the Quality Assurance Agency safeguards academic standards institution by institution. All three are public, so a university's rating is something you look up before you apply — not a line to take on its own word.",
    source: "Office for Students, Research England and the QAA",
    image: "/images/teacher-and-students-working-in-science-lab.webp",
    icon: "award",
  },
  {
    id: "nss",
    tone: "blue",
    stat: "National Student Survey",
    statNote: "student voice, measured every year",
    title: "Independently high student satisfaction",
    body: "The NSS surveys final-year undergraduates at every UK university on the same questions — teaching quality, academic support, assessment and feedback, and whether they'd choose the same course again. Because every institution answers the same survey, a course's real student experience is something you can compare, not just something its prospectus claims.",
    image: "/images/campus-life.webp",
    icon: "users",
  },
  {
    id: "career",
    tone: "emerald",
    stat: "Career & employment ready",
    statNote: "skills employers actually screen for",
    title: "Built around what comes after graduation",
    body: "Case studies, group projects and practical assessments run through UK degrees rather than sitting beside them, so the skills you practise — teamwork, communication, applied problem-solving — are the ones employers test for at interview, not only the subject knowledge a transcript shows.",
    image: "/images/group-projects.jpeg",
    icon: "briefcase",
  },
  {
    id: "learning",
    tone: "violet",
    stat: "Learning that prepares you",
    statNote: "critical thinking · innovation",
    title: "Built for what comes next, not just the exam",
    body: "From problem-solving and critical thinking to hands-on studio and lab work, UK teaching is built to develop judgement rather than recall — the habits that transfer into a career, a research project or a business of your own, and not only onto an exam script.",
    image: "/images/problem-solving.jpeg",
    icon: "clipboard",
  },
  {
    id: "global",
    tone: "navy",
    stat: "A global advantage",
    statNote: "shorter, recognised, portable",
    title: "A qualification that travels",
    body: "A three-year bachelor's or a one-year taught master's gets you into the workforce sooner without giving up recognition — a UK degree is respected on its own name, which is what opens the same doors whether you end up in Kathmandu, London or Sydney.",
    image: "/images/skyline-panel.jpg",
    icon: "globe",
  },
];

/** The employer wall in the hero. Files live in `public/images`. */
export const graduateEmployers = [
  { name: "Microsoft", file: "microsoft-logo.png", width: 150, height: 36 },
  { name: "NVIDIA", file: "nvidia-logo.png", width: 138, height: 105 },
  { name: "Amazon", file: "amazon-logo.png", width: 260, height: 82 },
  { name: "J.P. Morgan", file: "jp-morgon-logo.png", width: 211, height: 50 },
  { name: "NHS", file: "nhs-logo.png", width: 140, height: 60 },
] as const;
