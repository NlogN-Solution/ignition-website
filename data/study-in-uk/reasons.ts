/**
 * The five-reason grid on `/study-in-uk`.
 *
 * Each reason carries its own accent because the grid uses colour to
 * separate the five claims rather than to decorate them: the numeral, the
 * icon, the outbound link and the card's own tint are all the same hue, so a
 * reader scanning the row reads five distinct things rather than one striped
 * block. Adding a sixth reason means adding a sixth accent below — the
 * component has no fallback on purpose, so an unstyled card is a type error
 * rather than a silently grey card in production.
 */
export type ReasonAccent = "blue" | "orange" | "emerald" | "violet";

export type Reason = {
  id: string;
  title: string;
  body: string;
  /** Keys the icon in `components/study-in-uk/FiveReasons.tsx`. */
  icon: "award" | "users" | "briefcase" | "clipboard" | "globe";
  accent: ReasonAccent;
  link: { label: string; href: string };
};

export const reasons: Reason[] = [
  {
    id: "quality",
    title: "TEF, REF & QAA",
    body: "The UK is globally recognised for teaching excellence (TEF), world-leading research (REF), and quality assurance (QAA) ensuring you get the best education standards.",
    icon: "award",
    accent: "blue",
    link: { label: "Learn more", href: "/universities" },
  },
  {
    id: "nss",
    title: "NSS – Student Voice",
    body: "The National Student Survey (NSS) reflects high student satisfaction across teaching quality, academic support, assessment and feedback, and student voice.",
    icon: "users",
    accent: "orange",
    link: { label: "Explore results", href: "/compare" },
  },
  {
    id: "career",
    title: "Career & Employment Ready",
    body: "UK degrees are designed with real-world impact. Through case studies, group projects, and practical assessments, you graduate with the skills employers value most.",
    icon: "briefcase",
    accent: "emerald",
    link: { label: "See how", href: "/careers" },
  },
  {
    id: "learning",
    title: "Learning That Prepares You",
    body: "From problem-solving and critical thinking to hands-on learning and innovation – UK education develops future-ready graduates who can lead and make a difference.",
    icon: "clipboard",
    accent: "violet",
    link: { label: "Discover more", href: "/courses" },
  },
  {
    id: "global",
    title: "A Global Advantage",
    body: "Shorter degree duration, international exposure, and a globally respected qualification open doors to opportunities anywhere in the world.",
    icon: "globe",
    accent: "blue",
    link: { label: "Why it matters", href: "/start" },
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
