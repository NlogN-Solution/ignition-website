import type { LucideIcon } from "lucide-react";
import {
  Award,
  Banknote,
  BookOpen,
  Building2,
  Compass,
  FileCheck2,
  FileText,
  GraduationCap,
  Home,
  Languages,
  ListChecks,
  MessagesSquare,
  Plane,
  PlaneTakeoff,
  Send,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import type { ChecklistItem } from "@/components/ui/Checklist";
import type { TimelineStage } from "@/components/ui/Timeline";
import { applicationChecklist, applicationTimeline, commonMistakes, offerTypes } from "./apply";
import { arrivalChecklist, firstWeekChecklist } from "./life-in-uk";
import { livingCostBreakdown } from "./money";
import { visaDocuments, visaJourney, visaMistakes } from "./visa";

/**
 * The whole route to the UK, as three stages a student moves through.
 *
 * **Every piece of content here is borrowed, not written.** The requirements
 * checklist is the one on `/apply/entry-requirements`, the application
 * timeline is the one on `/apply`, the visa journey and its document list are
 * the ones on the visa guide, and the arrival and first-week checklists are
 * the ones on `/life-in-uk`. Nothing on this page is a second, drifting copy
 * of guidance that lives somewhere else — change the guide and this page
 * changes with it.
 *
 * That reuse is also what makes the ticks work. A checklist keeps its
 * progress against its own `id`, so a student who ticks four visa documents
 * here sees those four ticked on the visa guide, and vice versa. The ids
 * below are therefore load-bearing: renaming one silently resets everybody's
 * progress on both pages.
 *
 * The one thing this file does add is *sequence*. The guides each answer a
 * question well and none of them says what comes before or after it; the
 * three stages here are that missing spine, which is the entire reason the
 * page exists.
 */

/** A titled list inside a track — "Grade 10", "Plus 2", "Bachelor's". */
export interface JourneyGroup {
  title: string;
  /** An optional line under the title, before the list. */
  note?: string;
  items: string[];
  /** Shown beside the title — used on standalone group cards, not nested ones. */
  icon?: LucideIcon;
}

/**
 * One study level's version of a topic, opened on demand.
 *
 * Undergraduate and postgraduate applicants need different answers to the same
 * two questions — what do I have to have, and what do I have to produce — and
 * showing both at once doubles the reading for every student to find the half
 * that applies to them. Collapsed by default, so the topic still opens on its
 * general guidance.
 */
export interface JourneyTrack {
  id: string;
  label: string;
  /** The one-line summary on the card. */
  hint: string;
  icon?: LucideIcon;
  groups: JourneyGroup[];
  /** Shown under the groups, in the callout treatment. */
  caveat?: string;
  cta?: { label: string; href: string };
}

/** One line of the cost breakdown table — a GBP range, converted to NPR for display. */
export interface CostTableRow {
  label: string;
  lowGBP: number;
  highGBP: number;
  note?: string;
}

export interface JourneyTopic {
  id: string;
  title: string;
  /** One line. Also the summary shown on the collapsed row. */
  blurb: string;
  icon: LucideIcon;
  details?: string[];
  /** Per-study-level detail, shown as standalone cards — undergraduate and postgraduate side by side. */
  tracks?: JourneyTrack[];
  /** Applies to every track — shown once, beneath them. */
  sharedGroups?: JourneyGroup[];
  timeline?: TimelineStage[];
  /** Reuses a checklist from a guide, ticks and all. */
  checklist?: { id: string; items: ChecklistItem[] };
  /** Rows for the SN / Name / total-cost table, borrowed from `data/guides/money.ts`. */
  costTable?: CostTableRow[];
}

export interface JourneyStage {
  id: string;
  label: string;
  /** The line under the stage label in the stepper. */
  summary: string;
  icon: LucideIcon;
  topics: JourneyTopic[];
}

/** Turn a `{title, body}` list from a guide into the flat points this page shows. */
const points = (entries: readonly { title: string; body: string }[]): string[] =>
  entries.map((entry) => `${entry.title} — ${entry.body}`);

export const studyUkStages: JourneyStage[] = [
  {
    id: "plan",
    label: "Plan & prepare",
    summary: "Explore, understand and get ready",
    icon: Compass,
    topics: [
      {
        id: "entry-requirements",
        title: "University entry requirements",
        blurb: "Every university and course sets its own academic and personal requirements. Undergraduate and postgraduate applicants are asked for different things, so here is each as its own card.",
        icon: GraduationCap,
        tracks: [
          {
            id: "ug",
            label: "Undergraduate",
            hint: "Straight into a bachelor's degree after +2.",
            icon: GraduationCap,
            groups: [
              {
                title: "Academic",
                icon: GraduationCap,
                items: [
                  "60% or above in +2.",
                  "A study gap is accepted from 2023 onwards.",
                ],
              },
              {
                title: "English",
                icon: Languages,
                note: "Either of these is normally enough.",
                items: [
                  "Overall grade B or above in +2 English.",
                  "IELTS 6.0 overall with no band below 5.5 — or PTE 59 overall with no section below 59.",
                ],
              },
            ],
            caveat:
              "A gap of more than six months has to be explained, with evidence of what you were doing.",
            cta: { label: "See university-specific requirements", href: "/universities" },
          },
          {
            id: "pg",
            label: "Postgraduate",
            hint: "A taught master's after a bachelor's degree.",
            icon: Award,
            groups: [
              {
                title: "Academic",
                icon: GraduationCap,
                note: "The threshold depends on how long your bachelor's ran.",
                items: [
                  "55% on a four-year bachelor's degree.",
                  "60% on a three-year bachelor's degree.",
                  "A study gap is accepted from 2020 onwards.",
                ],
              },
              {
                title: "English",
                icon: Languages,
                note: "Either of these is normally enough.",
                items: [
                  "A medium-of-instruction letter, valid for five years from the date of your degree.",
                  "IELTS 6.0 overall with no band below 5.5 — or PTE 59 overall with no section below 59.",
                ],
              },
            ],
            caveat:
              "A gap of more than six months has to be explained, with evidence of what you were doing.",
            cta: { label: "See university-specific requirements", href: "/universities" },
          },
        ],
      },
      {
        id: "documents",
        title: "Document requirements",
        blurb: "What to gather before you apply, so nothing holds the application up later.",
        icon: FileText,
        tracks: [
          {
            id: "ug-docs",
            label: "Undergraduate",
            hint: "What a bachelor's application asks you to produce.",
            icon: GraduationCap,
            groups: [
              {
                title: "Grade 10",
                items: ["Marksheet", "Character certificate"],
              },
              {
                title: "+2",
                items: [
                  "Transcript",
                  "Provisional certificate",
                  "Migration certificate",
                  "Character certificate",
                  "Letters of recommendation — from your English teacher and your principal",
                  "Medium of instruction",
                ],
              },
            ],
          },
          {
            id: "pg-docs",
            label: "Postgraduate",
            hint: "Everything an undergraduate application needs, plus your degree.",
            icon: Award,
            groups: [
              {
                title: "Grade 10",
                items: ["Marksheet", "Character certificate"],
              },
              {
                title: "+2",
                items: [
                  "Transcript",
                  "Provisional certificate",
                  "Migration certificate",
                  "Character certificate",
                  "Letters of recommendation — from your English teacher and your principal",
                ],
              },
              {
                title: "Bachelor's",
                items: [
                  "Degree certificate",
                  "Transcript",
                  "Provisional certificate",
                  "Migration certificate",
                  "Medium of instruction — from Tribhuvan University, where that is your board",
                  "Letter of recommendation",
                ],
              },
            ],
          },
        ],
        sharedGroups: [
          {
            title: "Other documents",
            icon: FileText,
            items: [
              "Statement of purpose",
              "Work experience evidence, if your gap is longer than three years",
              "CV",
            ],
          },
          {
            title: "Financial documents",
            icon: Banknote,
            note: "From an A-class bank in Nepal.",
            items: [
              "An education loan covering tuition, living expenses and a further £500",
              "A 28-day bank balance certificate covering the same total",
              "The payment slip for any amount already deposited",
              "Salary slips for the period of employment",
            ],
          },
        ],
      },
      {
        id: "explore",
        title: "Explore universities and courses",
        blurb: "Choose what you want to study before you choose where to study it.",
        icon: BookOpen,
        details: [
          "Shortlist on course content and entry requirements first, then look at the universities that teach them — the reverse order is how students end up on a course they did not want at a name they recognised.",
          "Build a range rather than five versions of the same competitiveness: an ambitious choice, two realistic ones, and a backup whose requirements are genuinely lower.",
          "A foundation year opens a degree to students whose grades or qualifications do not yet meet the direct-entry requirement, and adds a year.",
          "A top-up turns a diploma or HND you already hold into the final year of a bachelor's degree.",
          "Placement years, integrated masters and study-abroad options change the length of a course and are worth checking before you apply, not after.",
        ],
      },
      {
        id: "ukvi",
        title: "UKVI requirements",
        blurb: "What the immigration rules will expect of you, long before you apply for a visa.",
        icon: ShieldCheck,
        details: [
          "Only a university licensed to sponsor students can support a Student visa — check the sponsor status of anywhere you are seriously considering.",
          "You will have to show you can pay your course fees and support yourself. The amount, the acceptable evidence and how long the funds must be held are all set by the Home Office and change.",
          "Your passport needs to be valid for the length of your course. Renewing it partway through is avoidable work at the worst possible moment.",
          "Some research and technology subjects require an ATAS certificate, which takes time to obtain and is applied for separately.",
          "Applicants from certain countries need a tuberculosis test certificate, and applicants under 18 need parental consent and a birth certificate.",
          "Rules change between intakes. Confirm everything against current UK government guidance rather than what applied when a friend or sibling applied.",
        ],
      },
      {
        id: "costs",
        title: "Cost breakdown",
        blurb: "Tuition is the number everyone quotes. Living costs are the one that decides it.",
        icon: Wallet,
        costTable: livingCostBreakdown.map((line) => ({
          label: line.category,
          lowGBP: line.low,
          highGBP: line.high,
          note: line.note,
        })),
        details: [
          "Where you study affects the total more than how you live — the gap between the cheapest and the most expensive UK student cities is substantial.",
          "Budget for twelve months rather than the nine months of term if you plan to stay over the summer.",
          "The first six weeks cost far more than a typical month: deposit, first month's rent, bedding, kitchen equipment and a phone all land at once.",
          "Treat part-time earnings as a supplement and never as part of the funds you rely on — the visa rules require you to show you can support yourself without working.",
        ],
      },
    ],
  },
  {
    id: "apply",
    label: "Apply & secure CAS",
    summary: "Apply to universities and receive your CAS",
    icon: Send,
    topics: [
      {
        id: "application-timeline",
        title: "How the application year runs",
        blurb: "The UK application cycle, from shortlisting to results day.",
        icon: ListChecks,
        timeline: applicationTimeline,
      },
      {
        id: "application-checklist",
        title: "Your application checklist",
        blurb: "Everything that has to be done before you can submit.",
        icon: FileCheck2,
        checklist: { id: "apply", items: applicationChecklist },
      },
      {
        id: "offers",
        title: "Offers and how you reply",
        blurb: "Offers arrive one at a time, and most are conditional on results you have not sat.",
        icon: MessagesSquare,
        details: points(offerTypes),
      },
      {
        id: "mistakes",
        title: "What goes wrong most often",
        blurb: "The mistakes that cost applicants a place, in the order they tend to happen.",
        icon: Sparkles,
        details: [...commonMistakes],
      },
      {
        id: "cas",
        title: "From offer to CAS",
        blurb: "The step between accepting a place and being able to apply for a visa.",
        icon: Building2,
        details: [
          "You accept one offer as your firm choice. Only the university you accept will sponsor your visa.",
          "A conditional offer becomes unconditional once you provide the results, English scores and documents the university asked for.",
          "The university then issues a Confirmation of Acceptance for Studies — a reference number confirming your sponsored place.",
          "The CAS lists the qualifications the offer was made on. Those are the documents the visa application will expect to see.",
          "No visa application can be made without a CAS, so every week saved here is a week added to the visa timeline.",
        ],
      },
    ],
  },
  {
    id: "visa",
    label: "Visa & departure",
    summary: "Get your visa, prepare and arrive",
    icon: PlaneTakeoff,
    topics: [
      {
        id: "visa-journey",
        title: "The visa journey",
        blurb: "Ten steps from your offer to the day you travel.",
        icon: ShieldCheck,
        timeline: visaJourney,
      },
      {
        id: "visa-documents",
        title: "Visa documents",
        blurb: "What the application asks for. The exact list depends on your nationality and history.",
        icon: FileText,
        checklist: { id: "visa-documents", items: visaDocuments },
      },
      {
        id: "visa-mistakes",
        title: "Where visa applications go wrong",
        blurb: "Almost all of these are timing or evidence problems, and all are avoidable.",
        icon: Sparkles,
        details: [...visaMistakes],
      },
      {
        id: "arrival",
        title: "Prepare to travel",
        blurb: "The things to sort before you get on the plane.",
        icon: Plane,
        checklist: { id: "arrival", items: arrivalChecklist },
      },
      {
        id: "first-week",
        title: "Your first week",
        blurb: "Enrolment, a doctor, a bank account, and finding your lecture theatre before the lecture.",
        icon: Home,
        checklist: { id: "first-week", items: firstWeekChecklist },
      },
    ],
  },
];
