"use client";

import { Check } from "lucide-react";
import type { StepDefinition } from "./types";

/**
 * Where am I, and how much is left.
 *
 * Two presentations of one fact, because the honest answer differs by width.
 * On a laptop there is room for the whole journey, and seeing all seven labels
 * is what makes a form feel finite. On a phone there is not: seven labels
 * squeezed onto 360px is a row of illegible stubs, so it becomes "Step 3 of 7 ·
 * Course" over a bar, which says the same thing in the space available.
 *
 * Completed steps are clickable. A student who wants to change an answer three
 * steps back should not have to press Back three times — and the review step
 * offers the same jump by another route.
 */
export function StepProgress({
  steps,
  current,
  furthest,
  onJump,
}: {
  steps: StepDefinition[];
  current: number;
  /** How far the student has actually reached — future steps stay locked. */
  furthest: number;
  onJump: (index: number) => void;
}) {
  const step = steps[current];
  const percent = Math.round(((current + 1) / steps.length) * 100);

  return (
    <div>
      {/* Desktop: the whole journey. */}
      <ol className="hidden items-center gap-1 lg:flex">
        {steps.map((entry, index) => {
          const done = index < furthest;
          const active = index === current;
          const reachable = index <= furthest;

          return (
            <li key={entry.id} className="flex min-w-0 flex-1 items-center gap-1">
              <button
                type="button"
                disabled={!reachable}
                aria-current={active ? "step" : undefined}
                onClick={() => reachable && onJump(index)}
                className={`group flex min-w-0 flex-1 items-center gap-[9px] rounded-lg px-2 py-[7px] text-left transition-colors duration-200 ${
                  reachable ? "cursor-pointer hover:bg-navy/[0.04]" : "cursor-default"
                }`}
              >
                <span
                  aria-hidden
                  className={`flex size-[26px] shrink-0 items-center justify-center rounded-full text-[12px] font-bold tabular-nums transition-colors duration-200 ${
                    active
                      ? "bg-navy text-white"
                      : done
                        ? "bg-navy/10 text-navy"
                        : "border border-hairline bg-white text-faint"
                  }`}
                >
                  {done ? <Check size={13} strokeWidth={3} /> : String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`truncate text-[13.5px] font-semibold leading-[1.3] transition-colors duration-200 ${
                    active ? "text-navy" : done ? "text-ink-soft" : "text-faint"
                  }`}
                >
                  {entry.label}
                </span>
              </button>
              {index < steps.length - 1 ? (
                <span
                  aria-hidden
                  className={`h-px w-3 shrink-0 ${done ? "bg-navy/25" : "bg-hairline"}`}
                />
              ) : null}
            </li>
          );
        })}
      </ol>

      {/* Mobile: position, name, bar. */}
      <div className="lg:hidden">
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-blue-link">
            Step {current + 1} of {steps.length}
          </p>
          <p className="text-[13px] font-semibold text-muted">{step.label}</p>
        </div>
        <div
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Assessment progress: step ${current + 1} of ${steps.length}`}
          className="mt-[10px] h-[6px] w-full overflow-hidden rounded-full bg-track"
        >
          <span
            className="block h-full rounded-full bg-navy transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
