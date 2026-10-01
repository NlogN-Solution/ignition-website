"use client";

import { Check, RotateCcw } from "lucide-react";
import { checklistKey } from "@/lib/storage";
import { useStoredList } from "@/lib/storage/store";

/**
 * Ticks persist per checklist id, so a student can work through the arrival
 * or application list across several sessions. State lives behind the same
 * storage module as everything else, ready to move to an account later.
 */
export type ChecklistItem = { id: string; label: string; detail?: string };

export function Checklist({
  id,
  items,
}: {
  id: string;
  items: ChecklistItem[];
}) {
  const { items: done, toggle, clear } = useStoredList(checklistKey(id));

  const completed = items.filter((item) => done.includes(item.id)).length;
  const percent = Math.round((completed / items.length) * 100);

  return (
    <div className="rounded-xl border border-hairline bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <p className="text-[14.5px] font-semibold text-ink-soft">
          <span className="tabular-nums text-navy">{completed}</span> of{" "}
          <span className="tabular-nums">{items.length}</span> done
        </p>

        {completed > 0 ? (
          <button
            type="button"
            onClick={clear}
            className="group inline-flex items-center gap-[7px] text-[13.5px] font-semibold text-blue-link transition-colors hover:text-navy"
          >
            <RotateCcw
              size={13}
              strokeWidth={2.4}
              aria-hidden
              className="transition-transform duration-300 group-hover:-rotate-90"
            />
            Reset
          </button>
        ) : null}
      </div>

      <div
        className="mt-3 h-[6px] w-full overflow-hidden rounded-full bg-track"
        role="img"
        aria-label={`${percent} percent complete`}
      >
        <div
          className="h-full rounded-full bg-blue-bright transition-[width] duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <ul className="mt-5 space-y-[2px]">
        {items.map((item) => {
          const checked = done.includes(item.id);

          return (
            <li key={item.id}>
              <button
                type="button"
                role="checkbox"
                aria-checked={checked}
                onClick={() => toggle(item.id)}
                className="group -mx-2 flex w-full items-start gap-3 rounded-lg px-2 py-[10px] text-left transition-colors duration-200 hover:bg-canvas"
              >
                <span
                  aria-hidden
                  className={`mt-[1px] flex size-[21px] shrink-0 items-center justify-center rounded-md border-[2px] transition-colors duration-200 ${
                    checked
                      ? "border-navy bg-navy text-white"
                      : "border-[#e0e3eb] text-transparent group-hover:border-ring-idle"
                  }`}
                >
                  <Check size={12} strokeWidth={3} />
                </span>

                <span className="min-w-0">
                  <span
                    className={`block text-[15.5px] font-semibold leading-[1.45] transition-colors duration-200 ${
                      checked ? "text-muted-light line-through" : "text-ink"
                    }`}
                  >
                    {item.label}
                  </span>
                  {item.detail ? (
                    <span className="mt-[3px] block text-[14px] font-medium leading-[1.5] text-muted">
                      {item.detail}
                    </span>
                  ) : null}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
