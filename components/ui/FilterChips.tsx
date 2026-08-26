"use client";

import { X } from "lucide-react";

/**
 * A row of chips for a single facet, used where a filter sits inside a
 * content page rather than beside a results grid — the interview library is
 * the one such place left. The explorers moved to the filter rail in
 * `ui/filters`; selecting an active chip still clears it, so neither
 * treatment has a separate "all" option to reason about.
 */
export function FilterChips<T extends string>({
  label,
  options,
  value,
  onChange,
  format,
}: {
  label: string;
  options: readonly T[];
  value: T | null;
  onChange: (next: T | null) => void;
  format?: (option: T) => string;
}) {
  return (
    <div>
      <p className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-muted-light">
        {label}
      </p>
      <div className="mt-[10px] flex flex-wrap gap-2">
        {options.map((option) => {
          const active = value === option;

          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(active ? null : option)}
              className={`inline-flex items-center gap-[6px] rounded-lg border px-[11px] py-[6px] text-[13.5px] font-semibold transition-colors duration-200 ${
                active
                  ? "border-navy bg-navy text-white"
                  : "border-hairline bg-white text-muted hover:border-ring-idle hover:text-navy"
              }`}
            >
              {format ? format(option) : option}
              {active ? <X size={13} strokeWidth={2.6} aria-hidden /> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
