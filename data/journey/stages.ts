/**
 * The seven points a student can be at, and what Ignition recommends they do
 * next from each. Kept as data so the same list drives the homepage selector,
 * the /start page and, later, a signed-in dashboard.
 */
export type JourneyStep = { label: string; href: string };

export type JourneyStage = {
  id: string;
  label: string;
  /** Shown once the stage is chosen, above the recommended steps. */
  summary: string;
  steps: JourneyStep[];
};

export const journeyStages: JourneyStage[] = [
  {
    id: "exploring",
    label: "I'm exploring my options",
    summary:
      "Start wide. Get a feel for what studying in the UK involves before narrowing anything down.",
    steps: [
      { label: "Why study in the UK", href: "/study-in-uk" },
      { label: "Take the career quiz", href: "/careers/quiz" },
      { label: "Browse careers", href: "/careers" },
      { label: "Browse courses", href: "/courses" },
      { label: "See what a UK degree costs", href: "/money" },
      { label: "Understand the application process", href: "/apply" },
    ],
  },
  {
    id: "undecided",
    label: "I don't know what I want to study",
    summary:
      "The fastest way through this is to start from what you enjoy rather than from a course list.",
    steps: [
      { label: "Take the career quiz", href: "/careers/quiz" },
      { label: "Read your career profile", href: "/careers/quiz/results" },
      { label: "Explore careers that fit", href: "/careers" },
      { label: "See which degrees lead there", href: "/courses" },
      { label: "Check entry requirements", href: "/apply/entry-requirements" },
    ],
  },
  {
    id: "decided",
    label: "I know what I want to study",
    summary:
      "Turn that subject into a shortlist of real courses, and check you meet what they ask for.",
    steps: [
      { label: "Find courses in your subject", href: "/courses" },
      { label: "Check entry requirements", href: "/apply/entry-requirements" },
      { label: "Check English language requirements", href: "/apply/entry-requirements" },
      { label: "See which universities teach it", href: "/universities" },
      { label: "Compare tuition fees", href: "/money" },
      { label: "Look for scholarships", href: "/money/scholarships" },
    ],
  },
  {
    id: "choosing",
    label: "I'm choosing universities",
    summary:
      "Fit matters more than ranking. Weigh course content, cost, city and support together.",
    steps: [
      { label: "Understand what matters when choosing", href: "/universities" },
      { label: "Explore courses", href: "/courses" },
      { label: "Compare universities", href: "/compare" },
      { label: "Check entry requirements", href: "/apply/entry-requirements" },
      { label: "Compare tuition fees", href: "/money" },
      { label: "Check living costs", href: "/money/calculator" },
      { label: "Explore scholarships", href: "/money/scholarships" },
      { label: "Shortlist your universities", href: "/compare" },
    ],
  },
  {
    id: "applying",
    label: "I'm ready to apply",
    summary:
      "Get the application itself right — the statement, the references and the deadlines.",
    steps: [
      { label: "How to apply, step by step", href: "/apply" },
      { label: "Entry requirements", href: "/apply/entry-requirements" },
      { label: "Write your personal statement", href: "/apply" },
      { label: "Prepare your documents", href: "/apply" },
      { label: "Prepare for interviews", href: "/apply/interviews" },
      { label: "Start planning your budget", href: "/money/calculator" },
    ],
  },
  {
    id: "offer",
    label: "I've received an offer",
    summary:
      "Now it becomes logistics: meeting conditions, choosing firmly, and starting the visa.",
    steps: [
      { label: "Understand your offer", href: "/apply" },
      { label: "Firm and insurance choices", href: "/apply" },
      { label: "Meet your conditions", href: "/apply/entry-requirements" },
      { label: "Start the Student visa journey", href: "/visa" },
      { label: "Plan your finances", href: "/money/calculator" },
      { label: "Apply for scholarships", href: "/money/scholarships" },
    ],
  },
  {
    id: "moving",
    label: "I'm preparing to move to the UK",
    summary:
      "The last stretch — visa, accommodation, money and the first week on the ground.",
    steps: [
      { label: "Complete your visa application", href: "/visa" },
      { label: "Prepare your documents", href: "/visa" },
      { label: "Sort accommodation", href: "/life-in-uk" },
      { label: "Set up banking and a phone", href: "/life-in-uk" },
      { label: "Budget your first months", href: "/money/calculator" },
      { label: "First-week checklist", href: "/life-in-uk" },
    ],
  },
];

export function getStage(id: string) {
  return journeyStages.find((stage) => stage.id === id);
}
