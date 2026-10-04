"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  FileCheck2,
  ListChecks,
  type LucideIcon,
  MousePointer2,
  Scale,
  Search,
  Send,
  User,
  UserPlus,
} from "lucide-react";

/**
 * The six steps a student actually moves through on Ignition, not the ten
 * `ApplicationStatus` values `data/guides/apply.ts` tracks behind the scenes
 * — those are the system's bookkeeping; these are the six things a student
 * does. No step claims an application fee one way or the other — `applyFaqs`
 * in that file is explicit that it depends on the university.
 *
 * ## Why every screen shares one chrome
 *
 * Six unrelated illustration styles side by side would read as six different
 * products glued together, not one. Every demonstration here instead opens
 * with the same app header — the Ignition wordmark, a primary nav, an
 * avatar, then a small icon-and-title row for the page itself — so the six
 * screens read as six pages of the one Ignition portal, the way a real
 * product tour shows one piece of software at six different screens rather
 * than six different pieces of software. What's free to differ is the
 * content beneath that chrome, because the six tasks genuinely are different
 * kinds of work: a search, a checklist, a comparison, a form, an upload, a
 * submission.
 *
 * ## Why only the active row expands
 *
 * All six numbers and titles sit on screen at once — nothing is hidden, a
 * student scanning the list sees the whole shape of the process immediately.
 * Only the active row gets the bordered treatment and its description line,
 * the same collapsed-by-default, visible-affordance pattern a well-built FAQ
 * uses, because six fully expanded paragraphs stacked in one column is what
 * made an earlier version of this panel feel cluttered rather than
 * considered.
 */
type StepId = "explore" | "eligibility" | "compare" | "account" | "documents" | "apply";

type Step = {
  id: StepId;
  label: string;
  /** The big editorial headline shown above the list while this step is active. */
  headline: string;
  /** The sentence beneath that headline. */
  summary: string;
  meta: string;
  description: string;
  /** Short caption for the sticky-note callout beside the demo card. */
  annotation: string;
};

const steps: Step[] = [
  {
    id: "explore",
    label: "Explore courses and universities",
    headline: "Find the right course for your future.",
    summary:
      "Explore thousands of courses and universities based on what you want to study, all in one place.",
    meta: "Start here, before anything else",
    description:
      "Search by subject or career outcome, see entry requirements on every course page, and compare the universities that teach it.",
    annotation: "Explore world-class universities",
  },
  {
    id: "eligibility",
    label: "Verify eligibility and requirements",
    headline: "Know exactly where you stand before you apply.",
    summary:
      "Check your qualifications against each course's entry criteria, so a shortlist only turns into an application when it's worth it.",
    meta: "Based on your grades and English score",
    description:
      "Check your qualifications against each course's entry criteria before a shortlist turns into an application.",
    annotation: "See exactly what you qualify for",
  },
  {
    id: "compare",
    label: "Compare cost and value",
    headline: "Compare real costs and find the best value.",
    summary:
      "See tuition fees, scholarships and estimated study costs side by side, so you can choose what fits your budget and goals.",
    meta: "Tuition, scholarships and living costs",
    description:
      "Weigh total cost across your shortlist, including any scholarship you may qualify for, before choosing where to apply.",
    annotation: "Compare tuition, scholarships, universities",
  },
  {
    id: "account",
    label: "Create an account",
    headline: "Create your account and keep everything in one place.",
    summary:
      "Save your courses, track applications and get personalised recommendations throughout your journey.",
    meta: "One profile, every application",
    description:
      "Build your Ignition profile once. It carries your details into every application you make from here on.",
    annotation: "Everything you need, in one place",
  },
  {
    id: "documents",
    label: "Upload all the documents",
    headline: "Upload your documents and submit your application.",
    summary:
      "Upload the required documents, review everything and submit your application to your chosen university.",
    meta: "Transcripts, English test, statement of purpose",
    description:
      "Add your documents once — transcripts, test scores, references — and reuse them across every course you apply to.",
    annotation: "Prepare your documents and apply with confidence",
  },
  {
    id: "apply",
    label: "Apply",
    headline: "Submit with confidence, reviewed before it's sent.",
    summary:
      "An Ignition advisor checks your application before it's lodged with the university, so nothing goes in incomplete.",
    meta: "Reviewed, then lodged with the university",
    description:
      "Submit your application. An Ignition advisor checks it before it's lodged with the university on your behalf.",
    annotation: "Reviewed by an advisor before it's sent",
  },
];

const NAV_ITEMS = ["Explore", "Universities", "Scholarships", "Guides"];

const AUTO_ADVANCE_MS = 5000;

/**
 * A plain elevated panel rather than a laptop mockup: a hairline border, a
 * soft perspective tilt, an ambient orange glow, and a ground-plane shadow
 * so it reads as floating just above the section rather than boxed inside a
 * device. The tilt is a static transform, not an animation, so
 * `prefers-reduced-motion` has nothing to strip from it.
 */
function DemoFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 -inset-y-14 -z-10 rounded-full bg-orange/[0.14] blur-[90px]"
      />
      <div className="[transform:perspective(2200px)_rotateY(-3deg)_rotateX(1deg)]">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] border border-white/10 bg-white shadow-[0_50px_90px_-28px_rgba(2,6,23,0.75)] sm:aspect-[16/11] lg:aspect-[16/10]">
          {children}
        </div>
      </div>
      <div aria-hidden className="mx-auto mt-5 h-[14px] w-[78%] rounded-[100%] bg-black/35 blur-[14px]" />
    </div>
  );
}

/** A caption staged like a sticky note clipped to the panel's corner — the
 *  one piece of editorial flair that stands in for the lifestyle photography
 *  the full reference composition uses, without requiring new photo assets. */
function Annotation({ text }: { text: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -right-3 -top-7 z-10 hidden max-w-[172px] rotate-[-2.5deg] rounded-[10px] rounded-bl-[3px] border border-hairline bg-white px-3 py-[9px] text-[11.5px] font-bold leading-[1.35] text-ink shadow-[0_18px_34px_-14px_rgba(2,6,23,0.4)] sm:block"
    >
      {text}
    </div>
  );
}

/** The one header every screen shares — see the file-top note on why. */
function DemoChrome({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
  return (
    <div className="shrink-0 border-b border-hairline">
      <div className="flex items-center gap-2.5 px-4 py-[11px]">
        <span className="flex size-[20px] shrink-0 items-center justify-center rounded-[5px] bg-navy text-[9px] font-black text-white">
          I
        </span>
        <span className="text-[12.5px] font-extrabold tracking-[-0.01em] text-ink">Ignition</span>
        <span aria-hidden className="mx-1 hidden h-[14px] w-px bg-hairline sm:block" />
        <nav aria-hidden className="hidden items-center gap-3 sm:flex">
          {NAV_ITEMS.map((item) => (
            <span key={item} className="text-[11px] font-semibold text-muted-light">
              {item}
            </span>
          ))}
        </nav>
        <span className="ml-auto flex size-[22px] shrink-0 items-center justify-center rounded-full bg-navy/10 text-navy">
          <User size={11} strokeWidth={2.4} aria-hidden />
        </span>
      </div>
      <div className="flex items-center gap-2.5 px-4 pb-3">
        <span className="flex size-[22px] shrink-0 items-center justify-center rounded-[6px] bg-orange/10 text-orange">
          <Icon size={12.5} strokeWidth={2.4} aria-hidden />
        </span>
        <span className="text-[13px] font-bold text-ink">{title}</span>
      </div>
    </div>
  );
}

const cardShadow = "shadow-[0_1px_2px_rgba(10,14,28,0.05)]";

function ExploreDemo({ reduce }: { reduce: boolean }) {
  const rows = [
    { name: "BSc Computer Science", uni: "Arden University", fee: "£12,400" },
    { name: "BSc Computer Science", uni: "Aston University", fee: "£14,800" },
    { name: "BEng Software Engineering", uni: "Bath Spa University", fee: "£13,200" },
  ];

  return (
    <div className="flex h-full flex-col">
      <DemoChrome icon={Search} title="Course search" />

      <div className="px-4 pt-4">
        <div className={`flex items-center gap-2 rounded-[8px] border border-hairline px-3 py-[9px] ${cardShadow}`}>
          <Search size={14} strokeWidth={2.2} aria-hidden className="shrink-0 text-muted-light" />
          <span className="text-[13px] font-medium text-ink">Computer Science</span>
        </div>
        <div className="mt-3 flex gap-2">
          <span className="rounded-full border border-navy/15 bg-navy/[0.06] px-3 py-[4px] text-[11px] font-semibold text-navy">
            Undergraduate
          </span>
          <span className="rounded-full border border-navy/15 bg-navy/[0.06] px-3 py-[4px] text-[11px] font-semibold text-navy">
            London
          </span>
        </div>
      </div>

      <div className="mt-4 flex-1 space-y-[8px] px-4 pb-4">
        {rows.map((row, i) => {
          const selected = i === 1;
          return (
            <div
              key={row.name + row.uni}
              className={`relative items-center gap-3 rounded-[8px] border px-3 py-[10px] transition-colors ${cardShadow} ${
                selected ? "border-orange/40 bg-orange/[0.05]" : "border-hairline"
              } ${i === 2 ? "hidden sm:flex" : "flex"}`}
            >
              <span className="size-[30px] shrink-0 rounded-[6px] bg-navy/10" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12.5px] font-bold text-ink">{row.name}</span>
                <span className="block truncate text-[11px] font-medium text-muted-light">{row.uni}</span>
              </span>
              <span className="shrink-0 text-[12px] font-bold tabular-nums text-navy">{row.fee}</span>

              {selected ? (
                <motion.span
                  aria-hidden
                  initial={reduce ? false : { scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="absolute -right-[7px] -top-[7px] flex size-[20px] items-center justify-center rounded-full bg-orange text-white"
                >
                  <Check size={12} strokeWidth={3} />
                </motion.span>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Always mounted in both server and client renders — `reduce` only
          toggles the animation, never whether this node exists, because a
          value that resolves synchronously on the client but not during SSR
          (as `useReducedMotion` does) turns a conditional *element* into a
          hydration mismatch the moment the two disagree. */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, x: -40, y: -56 }}
        animate={
          reduce
            ? { opacity: 0, x: -40, y: -56 }
            : { opacity: [0, 1, 1, 0], x: [-40, 0, 0, 0], y: [-56, -40, -40, -40] }
        }
        transition={
          reduce ? { duration: 0 } : { duration: 2.4, repeat: Infinity, repeatDelay: 1.2, ease: "easeOut" }
        }
        className="pointer-events-none absolute bottom-[22%] right-[12%] text-ink"
      >
        <MousePointer2 size={18} strokeWidth={2} fill="currentColor" />
      </motion.div>
    </div>
  );
}

function EligibilityDemo({ reduce }: { reduce: boolean }) {
  const matches = [
    { course: "BSc Computer Science", uni: "Arden University", eligible: true },
    { course: "BSc Computer Science", uni: "Aston University", eligible: true },
    { course: "BEng Software Engineering", uni: "Bath Spa University", eligible: false },
  ];

  return (
    <div className="flex h-full flex-col">
      <DemoChrome icon={ListChecks} title="Eligibility check" />

      <div className="flex gap-2 px-4 pt-4">
        <span className="rounded-full bg-navy/[0.06] px-3 py-[4px] text-[11px] font-semibold text-navy">
          Grades: AAB
        </span>
        <span className="rounded-full bg-navy/[0.06] px-3 py-[4px] text-[11px] font-semibold text-navy">
          IELTS 6.5
        </span>
      </div>

      <div className="mt-4 flex-1 space-y-[8px] px-4 pb-4">
        {matches.map((m, i) => (
          <div
            key={m.course + m.uni}
            className={`flex items-center gap-3 rounded-[8px] border border-hairline px-3 py-[10px] ${cardShadow}`}
          >
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12.5px] font-bold text-ink">{m.course}</span>
              <span className="block truncate text-[11px] font-medium text-muted-light">{m.uni}</span>
            </span>
            <motion.span
              initial={reduce ? false : { opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: reduce ? 0 : 0.18 * i }}
              className={`shrink-0 rounded-full px-[10px] py-[4px] text-[10.5px] font-bold ${
                m.eligible ? "bg-navy text-white" : "border border-hairline text-muted-light"
              }`}
            >
              {m.eligible ? "Eligible" : "Borderline"}
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompareDemo({ reduce }: { reduce: boolean }) {
  const options = [
    { uni: "Aston University", net: "£12,800", pct: 100, best: false },
    { uni: "Arden University", net: "£11,400", pct: 78, best: true },
  ];

  return (
    <div className="flex h-full flex-col">
      <DemoChrome icon={Scale} title="Cost comparison" />

      <div className="flex-1 space-y-3 px-4 py-4">
        {options.map((o, i) => (
          <div
            key={o.uni}
            className={`rounded-[8px] border px-3 py-3 ${cardShadow} ${
              o.best ? "border-orange/40 bg-orange/[0.04]" : "border-hairline"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[12.5px] font-bold text-ink">{o.uni}</span>
              {o.best ? (
                <span className="shrink-0 rounded-full bg-orange px-[8px] py-[2px] text-[9.5px] font-bold uppercase tracking-[0.03em] text-white">
                  Best value
                </span>
              ) : null}
            </div>
            <div className="mt-2 flex items-baseline justify-between text-[11.5px]">
              <span className="font-medium text-muted-light">Net cost after scholarship</span>
              <span className="font-bold tabular-nums text-navy">{o.net}</span>
            </div>
            <div className="mt-[7px] h-[5px] overflow-hidden rounded-full bg-navy/10">
              <motion.div
                className={`h-full rounded-full ${o.best ? "bg-orange" : "bg-navy/25"}`}
                initial={reduce ? false : { width: "0%" }}
                animate={{ width: `${o.pct}%` }}
                transition={{ duration: 0.7, delay: reduce ? 0 : 0.2 * i, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Shared by `AccountDemo` and `SubmitDemo` — a button that swaps its own
 *  label and icon for a settled confirmation state, rather than a separate
 *  confirmation element appearing beside it. */
function MorphButton({
  reduce,
  tone,
  idleLabel,
  doneLabel,
}: {
  reduce: boolean;
  tone: "navy" | "orange";
  idleLabel: string;
  doneLabel: string;
}) {
  return (
    <div
      className={`relative flex h-[38px] items-center justify-center overflow-hidden rounded-[8px] text-[12.5px] font-bold text-white ${
        tone === "navy" ? "bg-navy" : "bg-orange"
      }`}
    >
      <motion.span
        className="absolute inset-0 flex items-center justify-center"
        initial={reduce ? { opacity: 0 } : { opacity: 1, y: 0 }}
        animate={reduce ? { opacity: 0 } : { opacity: [1, 1, 0], y: [0, 0, -20] }}
        transition={reduce ? undefined : { duration: 3.2, repeat: Infinity, times: [0, 0.62, 0.78] }}
      >
        {idleLabel}
      </motion.span>
      <motion.span
        className="absolute inset-0 flex items-center justify-center gap-[6px]"
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={reduce ? { opacity: 1, y: 0 } : { opacity: [0, 0, 1], y: [20, 20, 0] }}
        transition={reduce ? undefined : { duration: 3.2, repeat: Infinity, times: [0, 0.62, 0.8] }}
      >
        <CheckCircle2 size={14} strokeWidth={2.4} aria-hidden />
        {doneLabel}
      </motion.span>
    </div>
  );
}

function AccountDemo({ reduce }: { reduce: boolean }) {
  const fields = [
    { label: "Full name", value: "Aditi Sharma" },
    { label: "Email", value: "aditi@email.com" },
  ];

  return (
    <div className="flex h-full flex-col">
      <DemoChrome icon={UserPlus} title="Create your account" />

      <div className="flex-1 space-y-3 px-5 py-4">
        {fields.map((field) => (
          <div key={field.label}>
            <p className="text-[10.5px] font-bold uppercase tracking-[0.06em] text-muted-light">{field.label}</p>
            <div className={`mt-1 rounded-[8px] border border-hairline px-3 py-[9px] text-[13px] font-medium text-ink ${cardShadow}`}>
              {field.value}
            </div>
          </div>
        ))}
        <div>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.06em] text-muted-light">Password</p>
          <div className={`mt-1 flex items-center gap-[5px] rounded-[8px] border border-hairline px-3 py-[12px] ${cardShadow}`}>
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="size-[5px] rounded-full bg-ink/50" />
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 pb-5">
        <MorphButton reduce={reduce} tone="navy" idleLabel="Create account" doneLabel="Account created" />
      </div>
    </div>
  );
}

function DocumentsDemo({ reduce }: { reduce: boolean }) {
  const docs = ["Academic transcript", "English test score", "Statement of purpose", "References", "Passport copy"];

  return (
    <div className="flex h-full flex-col">
      <DemoChrome icon={FileCheck2} title="Your documents" />

      <ul className="flex-1 space-y-3 px-5 py-4">
        {docs.map((doc, i) => (
          <li key={doc} className="flex items-center gap-3">
            <motion.span
              aria-hidden
              className="flex size-[22px] shrink-0 items-center justify-center rounded-full border-2 border-navy/15"
              initial={false}
              animate={
                reduce
                  ? { backgroundColor: "#fc5a07", borderColor: "#fc5a07" }
                  : {
                      backgroundColor: ["#ffffff", "#ffffff", "#fc5a07", "#fc5a07"],
                      borderColor: ["#dee1e8", "#dee1e8", "#fc5a07", "#fc5a07"],
                    }
              }
              transition={
                reduce
                  ? undefined
                  : { duration: 4.5, repeat: Infinity, times: [0, i * 0.18, i * 0.18 + 0.05, 1], ease: "easeOut" }
              }
            >
              <motion.span
                initial={false}
                animate={reduce ? { opacity: 1 } : { opacity: [0, 0, 1, 1] }}
                transition={
                  reduce ? undefined : { duration: 4.5, repeat: Infinity, times: [0, i * 0.18, i * 0.18 + 0.05, 1] }
                }
                className="text-white"
              >
                <Check size={12} strokeWidth={3} />
              </motion.span>
            </motion.span>
            <span className="text-[13.5px] font-semibold text-ink">{doc}</span>
          </li>
        ))}
      </ul>

      <div className="px-5 pb-5">
        <div className="h-[6px] overflow-hidden rounded-full bg-navy/10">
          <motion.div
            className="h-full rounded-full bg-orange"
            initial={false}
            animate={reduce ? { width: "100%" } : { width: ["0%", "100%"] }}
            transition={reduce ? undefined : { duration: 4.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <p className="mt-2 text-[12px] font-medium text-muted-light">Preparing your application file</p>
      </div>
    </div>
  );
}

function SubmitDemo({ reduce }: { reduce: boolean }) {
  const rows = [
    { label: "Course", value: "BSc Computer Science" },
    { label: "University", value: "Aston University" },
    { label: "Documents", value: "5 of 5 ready" },
  ];

  return (
    <div className="flex h-full flex-col">
      <DemoChrome icon={Send} title="Review & submit" />

      <div className="flex-1 space-y-[8px] px-4 pt-4">
        {rows.map((row) => (
          <div
            key={row.label}
            className={`flex items-center justify-between rounded-[8px] border border-hairline px-3 py-[9px] ${cardShadow}`}
          >
            <span className="text-[12px] font-medium text-muted-light">{row.label}</span>
            <span className="text-[12.5px] font-bold text-ink">{row.value}</span>
          </div>
        ))}
      </div>

      <div className="px-4 pb-4 pt-2">
        <MorphButton reduce={reduce} tone="orange" idleLabel="Submit application" doneLabel="Submitted — IGN-48213" />
      </div>
    </div>
  );
}

const demos: Record<StepId, React.ComponentType<{ reduce: boolean }>> = {
  explore: ExploreDemo,
  eligibility: EligibilityDemo,
  compare: CompareDemo,
  account: AccountDemo,
  documents: DocumentsDemo,
  apply: SubmitDemo,
};

export function HowToApply() {
  const [active, setActive] = useState<StepId>(steps[0].id);
  const [onScreen, setOnScreen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const reduce = Boolean(useReducedMotion());

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!onScreen || reduce) return;
    const id = window.setInterval(() => {
      const el = rootRef.current;
      if (!el || el.matches(":hover")) return;
      if (document.activeElement instanceof Node && el.contains(document.activeElement)) return;
      setActive((current) => {
        const index = steps.findIndex((s) => s.id === current);
        return steps[(index + 1) % steps.length].id;
      });
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [onScreen, reduce]);

  const Demo = demos[active];
  const activeIndex = steps.findIndex((s) => s.id === active);
  const activeStep = steps[activeIndex];

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-navy px-5 py-[clamp(3rem,6vw,5rem)] sm:px-8 lg:px-24"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-[12%] top-[8%] size-[560px] rounded-full bg-orange/[0.08] blur-[140px]" />
        <div className="absolute -left-[10%] bottom-[-10%] size-[460px] rounded-full bg-white/[0.04] blur-[140px]" />
      </div>

      <div className="mx-auto w-full max-w-[1320px]">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Information — eyebrow and page count are constant; the headline
              and the active row's detail swap with the selected step. */}
          <div>
            <p className="flex items-center gap-2.5 text-[12.5px] font-bold uppercase tracking-[0.14em] text-orange">
              <span aria-hidden className="h-px w-6 bg-orange/50" />
              Your self-apply journey
            </p>

            <div className="relative mt-4 min-h-[128px] sm:min-h-[104px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h2 className="font-display text-[clamp(1.875rem,3.1vw,2.625rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-white">
                    {activeStep.headline}
                  </h2>
                  <p className="mt-4 max-w-[46ch] text-[15px] font-medium leading-[1.6] text-white/60">
                    {activeStep.summary}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <ol className="relative mt-8">
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-[17px] left-[17px] top-[17px] border-l-[1.5px] border-dashed border-white/15"
              />
              {steps.map((step, index) => {
                const isActive = step.id === active;
                return (
                  <li key={step.id} className={index === 0 ? "" : "mt-[6px]"}>
                    <button
                      type="button"
                      aria-expanded={isActive}
                      onClick={() => setActive(step.id)}
                      className={`group relative flex w-full items-start gap-3.5 rounded-[12px] text-left transition-colors duration-300 ${
                        isActive
                          ? "border border-orange/40 bg-orange/[0.07] px-3.5 py-3.5"
                          : "border border-transparent px-3.5 py-[9px] hover:bg-white/[0.04]"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`font-display relative z-10 flex shrink-0 items-center justify-center rounded-full font-extrabold tabular-nums transition-all duration-300 ${
                          isActive
                            ? "size-[34px] bg-orange text-[14px] text-white shadow-[0_6px_16px_-4px_rgba(252,90,7,0.6)]"
                            : "size-[30px] bg-white/10 text-[12px] text-white/60 ring-1 ring-inset ring-white/10"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="min-w-0 flex-1 pt-[5px]">
                        <span
                          className={`block text-[14.5px] font-bold leading-[1.3] transition-colors duration-300 ${
                            isActive ? "text-white" : "text-white/55 group-hover:text-white/80"
                          }`}
                        >
                          {step.label}
                        </span>

                        {isActive ? (
                          <p className="mt-[5px] max-w-[38ch] text-[12.5px] font-medium leading-[1.55] text-white/60">
                            {step.description}
                          </p>
                        ) : null}
                      </span>

                      {isActive ? (
                        <ArrowUpRight
                          size={16}
                          strokeWidth={2.4}
                          aria-hidden
                          className="mt-[6px] shrink-0 text-orange"
                        />
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="mt-7 flex items-center justify-between">
              <p className="text-[13px] font-bold tabular-nums text-white/35">
                <span className="text-white">{String(activeIndex + 1).padStart(2, "0")}</span>
                <span className="px-[6px]">/</span>
                {String(steps.length).padStart(2, "0")}
              </p>

              <Link
                href="/apply"
                className="group inline-flex items-center gap-[7px] text-[13.5px] font-bold text-white transition-colors duration-200 hover:text-orange"
              >
                See the full process
                <ArrowUpRight
                  size={15}
                  strokeWidth={2.4}
                  aria-hidden
                  className="shrink-0 transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                />
              </Link>
            </div>
          </div>

          {/* Demonstration — the one part of the section that's allowed to
              move, staged like a product shot rather than boxed like a card. */}
          <div className="relative w-full">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                className="relative w-full"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <DemoFrame>
                  <Demo reduce={reduce} />
                </DemoFrame>
                <Annotation text={activeStep.annotation} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
