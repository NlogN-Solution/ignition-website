import { getPhase, type PhaseId } from "@/data/journey/pipeline";

/**
 * What the student has already done, and the one thing worth doing next.
 *
 * WHY THIS EXISTS. The homepage used to ask "Where are you in your UK
 * journey?" and hand back a list of links for the answer. Two things were
 * wrong with that. It charged before it paid — half the section was an empty
 * placeholder until the student classified themselves into one of seven
 * overlapping descriptions — and what it paid was site navigation the navbar
 * already carried. Nothing about the answer was remembered in a way the
 * student could see.
 *
 * The site already knows most of what that question was asking. The career
 * quiz writes a profile, the calculator writes a budget, the eligibility
 * wizard writes a draft and then a receipt. This module reads those marks and
 * turns them into two things: a ladder of milestones with the student's *own
 * figures* on them, and a single recommended action. So the panel is useful
 * on the first visit (one confident recommendation instead of a blank card)
 * and more useful on every visit after it.
 *
 * It is deliberately pure — signals in, milestones and an action out — so the
 * ordering rules can be read in one place and tested without a browser.
 */

export type EligibilityState = "none" | "draft" | "submitted";

/** Everything the ladder reads, gathered from storage by `useJourneyProgress`. */
export type ProgressSignals = {
  /** Answers exist but no profile — the quiz was started and abandoned. */
  quizStarted: boolean;
  career: { title: string; match: number } | null;
  phase: PhaseId | null;
  budget: { annualTuition: number; monthlyLiving: number } | null;
  eligibility: EligibilityState;
  /** They have already asked for a callback, so stop asking. */
  adviserRequested: boolean;
};

export type Milestone = {
  id: "career" | "position" | "budget" | "eligibility";
  label: string;
  /** What they get out of it, shown while it is still outstanding. */
  blank: string;
  done: boolean;
  /** Their own answer, once there is one. Never a restatement of `label`. */
  detail?: string;
};

export type NextAction = {
  id: string;
  /** Framing above the title — "Start here" reads differently to "Pick up where you left off". */
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  /** Shown only when it is honest and short enough to lower the barrier. */
  minutes?: number;
};

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

export function milestonesFor(signals: ProgressSignals): Milestone[] {
  const phase = getPhase(signals.phase);

  return [
    {
      id: "career",
      label: "Career direction",
      blank: "Four minutes of questions, and a shortlist of careers that fit.",
      done: Boolean(signals.career),
      detail: signals.career
        ? `${signals.career.title} — ${signals.career.match}% match`
        : undefined,
    },
    {
      id: "position",
      label: "Where you are",
      blank: "Tell us which chapter you're in and this list reorders itself.",
      done: Boolean(phase),
      detail: phase?.stance,
    },
    {
      id: "budget",
      label: "What it costs",
      blank: "Tuition plus living, for the city you're actually considering.",
      done: Boolean(signals.budget),
      detail: signals.budget
        ? `${gbp.format(signals.budget.annualTuition)} tuition · ${gbp.format(
            signals.budget.monthlyLiving,
          )} a month`
        : undefined,
    },
    {
      id: "eligibility",
      label: "Where you stand",
      blank: "A counsellor reviews your background and comes back with the next step.",
      done: signals.eligibility === "submitted",
      detail:
        signals.eligibility === "submitted"
          ? "Submitted — a counsellor is reviewing it"
          : signals.eligibility === "draft"
            ? "In progress"
            : undefined,
    },
  ];
}

/**
 * The candidate actions, most urgent first. The first one whose `when` holds
 * is what the panel recommends.
 *
 * Order is the whole design here, so the rules are a list rather than a nest
 * of conditionals. Two of them exist only to stop the ladder being rude:
 * something half-finished is always offered back before anything new is
 * started, and a student who has said they are applying or arriving is never
 * sent to the career quiz — they settled that question before they got here,
 * and being asked it again reads as the site not listening.
 */
const decided = (signals: ProgressSignals) =>
  signals.phase === "apply" || signals.phase === "arrive";

const rules: { when: (s: ProgressSignals) => boolean; action: (s: ProgressSignals) => NextAction }[] = [
  {
    when: (s) => s.eligibility === "draft",
    action: () => ({
      id: "eligibility-resume",
      eyebrow: "Pick up where you left off",
      title: "Finish your eligibility assessment.",
      body: "Your answers are still here. Complete it and a counsellor reviews it, then comes back to you with what to do next.",
      href: "/resources/eligibility",
      cta: "Finish the assessment",
    }),
  },
  {
    when: (s) => s.quizStarted && !s.career,
    action: () => ({
      id: "quiz-resume",
      eyebrow: "Pick up where you left off",
      title: "You're partway through the career quiz.",
      body: "Your answers were kept. Finish it and you get a profile, the careers that fit it, and the degrees that lead there.",
      href: "/careers/quiz",
      cta: "Finish the quiz",
      minutes: 2,
    }),
  },
  {
    when: (s) => !s.career && !decided(s),
    action: () => ({
      id: "quiz",
      eyebrow: "Start here",
      title: "Find out what suits you.",
      body: "Most students arrive knowing they want to study in the UK and not what. The quiz starts from what you enjoy rather than from a course list, and turns into a career profile you keep.",
      href: "/careers/quiz",
      cta: "Take the career quiz",
      minutes: 4,
    }),
  },
  {
    when: (s) => !s.phase,
    action: () => ({
      id: "position",
      eyebrow: "One click",
      title: "Say where you are on the route.",
      body: "The map above runs from first idea to first week. Mark the chapter you're in and everything here — and the adviser you eventually speak to — starts from the right place.",
      href: "#route",
      cta: "Find your place on the map",
    }),
  },
  {
    when: (s) => Boolean(s.career) && s.phase === "explore",
    action: (s) => ({
      id: "courses",
      eyebrow: "Next",
      title: `See which degrees lead to ${s.career?.title.toLowerCase()}.`,
      body: "You have a direction. The next question is which courses actually get you there, and which universities teach them.",
      href: "/courses",
      cta: "Explore courses",
    }),
  },
  {
    when: (s) => !s.budget,
    action: () => ({
      id: "budget",
      eyebrow: "Next",
      title: "Work out what a year really costs.",
      body: "Tuition is the number everyone quotes and rent is the one that decides it. Model both for the city you're considering before the shortlist hardens.",
      href: "/money/calculator",
      cta: "Open the cost calculator",
      minutes: 3,
    }),
  },
  {
    when: (s) => s.eligibility === "none",
    action: () => ({
      id: "eligibility",
      eyebrow: "Next",
      title: "Find out where you actually stand.",
      body: "Your academic background, your English and how you plan to fund it — answered once, reviewed by a counsellor, and answered properly rather than guessed at.",
      href: "/resources/eligibility",
      cta: "Check your eligibility",
      minutes: 3,
    }),
  },
  {
    when: (s) => !s.adviserRequested,
    action: () => ({
      id: "adviser",
      eyebrow: "You've done the groundwork",
      title: "Get a person on it.",
      body: "Everything above travels with the request, so an adviser opens the conversation already knowing your direction, your budget and where you are.",
      href: "#adviser",
      cta: "Ask for a callback",
    }),
  },
];

/** The last resort, when every rule above has been satisfied. */
const settled: NextAction = {
  id: "settled",
  eyebrow: "You're set up",
  title: "Keep going through the route.",
  body: "An adviser has your details and everything you've done here is saved. The map below is the rest of it — open whichever chapter you're in.",
  href: "#route",
  cta: "Open the route",
};

export function nextActionFor(signals: ProgressSignals): NextAction {
  return rules.find((rule) => rule.when(signals))?.action(signals) ?? settled;
}
