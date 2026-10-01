"use client";

import { Search, X } from "lucide-react";

/**
 * The search line that sits at the top of every explorer's results column.
 *
 * It carries its own clear button rather than relying on the one WebKit draws
 * inside `type="search"`: that control is invisible until the field has focus,
 * absent in Firefox, and unstyleable, so on three of four browsers a student
 * who wanted to drop their query had to select the text and delete it.
 */
export function SearchField({
  value,
  onChange,
  placeholder,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
}) {
  return (
    <div className="relative">
      <label className="block">
        <span className="sr-only">{label}</span>
        <Search
          size={18}
          strokeWidth={2.1}
          aria-hidden
          className="pointer-events-none absolute left-[16px] top-1/2 -translate-y-1/2 text-muted-light"
        />
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-[52px] w-full appearance-none rounded-xl border border-hairline bg-white pl-[46px] pr-11 text-[15.5px] font-medium text-ink shadow-[0_10px_30px_-24px_rgba(1,22,111,0.5)] transition-colors duration-200 placeholder:text-muted-light hover:border-ring-idle focus:border-ring-idle [&::-webkit-search-cancel-button]:hidden"
        />
      </label>

      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-[10px] top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-light transition-colors duration-200 hover:bg-canvas hover:text-navy"
        >
          <X size={16} strokeWidth={2.5} aria-hidden />
        </button>
      ) : null}
    </div>
  );
}
