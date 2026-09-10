"use client";

import { ArrowUpRight, X } from "lucide-react";
import { useReportCtaVisibility } from "../apply/ctaVisibility";

/**
 * A persistent bottom bar rather than a page navigation. Selecting courses
 * to compare is a browsing action, not a destination — the student is still
 * looking at the grid, deciding whether to add a third or fourth course, and
 * a route change would lose that context every time they wanted to go back
 * and pick one more.
 *
 * WHY IT REPORTS ITS OWN VISIBILITY. `ContactWidget` floats in the same
 * bottom-right corner at a higher `z-index`, so without coordination it lands
 * on top of this bar's own `Compare` button the moment both are on screen.
 * Reporting through the same channel `ReadyToApply` uses (see
 * `components/apply/ctaVisibility.ts`) makes the contact bubble stand down
 * for exactly as long as the tray is open, the same "don't stack two floating
 * asks in one corner" rule the site already applies everywhere else.
 */
export function CourseCompareTray({
  count,
  max,
  onClear,
  onCompare,
}: {
  count: number;
  max: number;
  onClear: () => void;
  onCompare: () => void;
}) {
  const ctaRef = useReportCtaVisibility<HTMLDivElement>();

  if (count === 0) return null;

  const ready = count >= 2;

  return (
    <div
      ref={ctaRef}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-white/97 backdrop-blur-sm shadow-[0_-14px_32px_-22px_rgba(1,22,111,0.35)]"
    >
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-3 px-5 py-[14px] sm:px-8">
        <div className="flex items-center gap-3">
          <span className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-navy text-[13px] font-bold text-white">
            {count}
          </span>
          <p className="text-[14.5px] font-semibold text-navy">
            {count} {count === 1 ? "course" : "courses"} selected
            {!ready ? (
              <span className="ml-[6px] font-medium text-muted"> — pick one more to compare</span>
            ) : null}
            {count >= max ? (
              <span className="ml-[6px] font-medium text-muted"> — max {max} at a time</span>
            ) : null}
          </p>
        </div>

        <div className="flex items-center gap-[10px]">
          <button
            type="button"
            onClick={onClear}
            className="inline-flex h-[42px] items-center gap-[6px] rounded-[10px] px-3 text-[14px] font-semibold text-muted transition-colors hover:text-navy"
          >
            <X size={15} strokeWidth={2.4} aria-hidden />
            Clear
          </button>
          <button
            type="button"
            onClick={onCompare}
            disabled={!ready}
            className="group/cta inline-flex h-[42px] items-center justify-center gap-[7px] rounded-[10px] bg-navy px-5 text-[14px] font-bold text-white transition-[background-color,box-shadow,transform] duration-200 hover:bg-navy-ink hover:shadow-[0_14px_28px_-14px_rgba(1,22,111,0.6)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none"
          >
            Compare
            <ArrowUpRight
              size={15}
              strokeWidth={2.4}
              aria-hidden
              className="shrink-0 transition-transform duration-200 group-hover/cta:translate-x-[2px] group-hover/cta:-translate-y-[2px]"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
