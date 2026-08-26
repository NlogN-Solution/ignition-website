"use client";

import Link from "next/link";
import { ArrowUpRight, Compass, PoundSterling, Scale, Target } from "lucide-react";
import { Card } from "../ui/Card";
import { journeyStages } from "@/data/journey/stages";
import { useResearch } from "@/lib/handoff/useResearch";

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

/**
 * What this browser remembers, read back to the student.
 *
 * There is nothing to save on the public site any more, so this is not a
 * shortlist — it is the four things the site works out *for* a student and
 * would otherwise silently forget: where they said they were, what the quiz
 * concluded, what they modelled on the calculator, and what they put side by
 * side. Each one is a link back to the tool that produced it, because the
 * value of remembering it is being able to pick it up.
 *
 * Renders empty on the server and on the first client paint, then adopts what
 * storage holds — `useResearch` reads through `useSyncExternalStore`, so both
 * passes see the same snapshot and hydration stays stable.
 */
export function ProgressSummary() {
  const { draft, comparedCount } = useResearch();

  const stage = journeyStages.find((option) => option.id === draft.stage);

  const items = [
    stage && {
      key: "stage",
      icon: Compass,
      label: "Where you are",
      value: stage.label,
      href: "/start",
      action: "Change",
    },
    draft.career && {
      key: "career",
      icon: Target,
      label: "Your strongest career match",
      value: `${draft.career.title} · ${draft.career.match}% match`,
      href: "/careers/quiz/results",
      action: "See your profile",
    },
    draft.budget && {
      key: "budget",
      icon: PoundSterling,
      label: "Your cost estimate",
      value: [
        draft.budget.annualTuition
          ? `${gbp.format(draft.budget.annualTuition)} tuition`
          : null,
        draft.budget.monthlyLiving
          ? `${gbp.format(draft.budget.monthlyLiving)} a month living`
          : null,
      ]
        .filter(Boolean)
        .join(" · "),
      href: "/money/calculator",
      action: "Revisit",
    },
    comparedCount > 0 && {
      key: "compared",
      icon: Scale,
      label: "On your comparison",
      value: `${comparedCount} ${comparedCount === 1 ? "university" : "universities"}`,
      href: "/compare",
      action: "Open comparison",
    },
  ].filter(Boolean) as {
    key: string;
    icon: typeof Compass;
    label: string;
    value: string;
    href: string;
    action: string;
  }[];

  if (items.length === 0) {
    return (
      <Card tone="flat" className="p-6 sm:p-8">
        <p className="text-[15.5px] font-medium leading-[1.6] text-muted">
          Nothing here yet. Take the career quiz, model a year on the cost
          calculator or put two universities side by side, and what you work
          out will be waiting here when you come back.
        </p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
          {[
            { label: "Take the career quiz", href: "/careers/quiz" },
            { label: "Cost calculator", href: "/money/calculator" },
            { label: "Compare universities", href: "/compare" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[14.5px] font-bold text-blue-link transition-colors hover:text-navy"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.key} className="min-w-0">
          <Card className="h-full p-5 sm:p-6">
            <div className="flex items-start gap-[14px]">
              <span
                aria-hidden
                className="mt-[2px] flex size-[34px] shrink-0 items-center justify-center rounded-[10px] bg-navy/[0.06] text-navy"
              >
                <item.icon size={17} strokeWidth={2.1} />
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-muted-light">
                  {item.label}
                </p>
                <p className="mt-[6px] text-[16px] font-bold leading-[1.35] tracking-[-0.01em] text-navy">
                  {item.value}
                </p>
              </div>
            </div>

            <Link
              href={item.href}
              className="group mt-auto inline-flex items-center gap-[8px] pt-5 text-[14px] font-bold text-blue-link transition-colors hover:text-navy"
            >
              {item.action}
              <ArrowUpRight
                size={15}
                strokeWidth={2.4}
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
              />
            </Link>
          </Card>
        </li>
      ))}
    </ul>
  );
}
