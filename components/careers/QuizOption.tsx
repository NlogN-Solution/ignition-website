"use client";

import { Check } from "lucide-react";

/**
 * One answer. Two shapes from the same material: questions whose options carry
 * an explanation render as cards, and long lists of bare labels (subjects,
 * interests) render as compact chips so twelve of them still fit a phone
 * screen without scrolling past the question.
 */
type Props = {
  label: string;
  description?: string;
  selected: boolean;
  /** Multi-select questions show a tick; single-select shows the radio dot. */
  multi: boolean;
  disabled?: boolean;
  onToggle: () => void;
};

export function QuizOption({
  label,
  description,
  selected,
  multi,
  disabled = false,
  onToggle,
}: Props) {
  const compact = !description;

  return (
    <button
      type="button"
      role={multi ? "checkbox" : "radio"}
      aria-checked={selected}
      disabled={disabled && !selected}
      onClick={onToggle}
      className={`group flex w-full items-center gap-3 rounded-xl border bg-white text-left transition-[transform,border-color,box-shadow,background-color] duration-200 disabled:cursor-not-allowed disabled:opacity-45 ${
        compact ? "px-4 py-[13px]" : "px-4 py-4 sm:px-5"
      } ${
        selected
          ? "border-navy shadow-[0_18px_40px_-28px_rgba(1,22,111,0.45)]"
          : "border-hairline hover:-translate-y-[1px] hover:border-ring-idle hover:shadow-[0_18px_40px_-28px_rgba(1,22,111,0.28)] disabled:hover:translate-y-0 disabled:hover:border-hairline disabled:hover:shadow-none"
      }`}
    >
      <span
        aria-hidden
        className={`flex shrink-0 items-center justify-center border-[2px] transition-colors duration-200 ${
          multi ? "size-[22px] rounded-md" : "size-[22px] rounded-full"
        } ${selected ? "border-navy bg-navy text-white" : "border-[#e0e3eb] text-transparent"}`}
      >
        {multi ? (
          <Check size={13} strokeWidth={3} />
        ) : (
          <span
            className={`rounded-full bg-white transition-all duration-200 ${
              selected ? "size-[8px]" : "size-0"
            }`}
          />
        )}
      </span>

      <span className="min-w-0">
        <span
          className={`block font-semibold leading-[1.35] transition-colors duration-200 ${
            compact ? "text-[15px]" : "text-[16px] sm:text-[17px]"
          } ${selected ? "text-navy" : "text-ink"}`}
        >
          {label}
        </span>
        {description ? (
          <span className="mt-[3px] block text-[14px] font-medium leading-[1.45] text-muted">
            {description}
          </span>
        ) : null}
      </span>
    </button>
  );
}
