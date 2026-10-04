"use client";

import { Check, ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { useId } from "react";

/**
 * The form controls for the assessment.
 *
 * They are here rather than in `components/ui` because nothing else on the
 * site is a form — the explorers filter, they do not collect — so these have
 * no second caller to generalise for. What they do share with the rest of the
 * site is its material: the same 52px control height as `SearchField`, the
 * same hairline border and `ring-idle` hover, the same radius.
 *
 * Every field takes an `error` and renders it in place. Validation that moves
 * the page is validation a student loses their place in.
 */

const control =
  "h-[52px] w-full appearance-none rounded-xl border bg-white px-[15px] text-[15.5px] font-medium text-ink transition-colors duration-200 placeholder:text-muted-light focus:outline-none";

function tone(error?: string) {
  return error
    ? "border-orange/60 hover:border-orange focus:border-orange"
    : "border-hairline hover:border-ring-idle focus:border-ring-idle";
}

function Shell({
  label,
  hint,
  error,
  required,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={htmlFor}
        className="block text-[14.5px] font-semibold leading-[1.4] text-navy"
      >
        {label}
        {required ? <span className="text-orange"> *</span> : null}
      </label>
      {hint ? (
        <p className="mt-[3px] text-[13.5px] font-medium leading-[1.5] text-muted-light">{hint}</p>
      ) : null}
      <div className="mt-[9px]">{children}</div>
      {error ? (
        <p role="alert" className="mt-[7px] text-[13.5px] font-semibold leading-[1.45] text-orange">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextField({
  label,
  value,
  onChange,
  hint,
  error,
  required,
  placeholder,
  type = "text",
  inputMode,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  inputMode?: "text" | "numeric" | "decimal" | "tel" | "email";
  autoComplete?: string;
}) {
  const id = useId();
  return (
    <Shell label={label} hint={hint} error={error} required={required} htmlFor={id}>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={value}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={`${control} ${tone(error)}`}
      />
    </Shell>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  hint,
  error,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  error?: string;
  placeholder?: string;
  rows?: number;
}) {
  const id = useId();
  return (
    <Shell label={label} hint={hint} error={error} htmlFor={id}>
      <textarea
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full appearance-none rounded-xl border bg-white p-[15px] text-[15.5px] font-medium leading-[1.6] text-ink transition-colors duration-200 placeholder:text-muted-light focus:outline-none ${tone(error)}`}
      />
    </Shell>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  hint,
  error,
  required,
  placeholder = "Select an option",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string }[];
  hint?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
}) {
  const id = useId();
  return (
    <Shell label={label} hint={hint} error={error} required={required} htmlFor={id}>
      <div className="relative">
        <select
          id={id}
          value={value}
          aria-invalid={error ? true : undefined}
          onChange={(event) => onChange(event.target.value)}
          className={`${control} pr-11 ${tone(error)} ${value ? "text-ink" : "text-muted-light"}`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={17}
          strokeWidth={2.3}
          aria-hidden
          className="pointer-events-none absolute right-[15px] top-1/2 -translate-y-1/2 text-muted-light"
        />
      </div>
    </Shell>
  );
}

/**
 * The single-choice list.
 *
 * A radio group rather than a `<select>` wherever the options are the question
 * — "how will you meet the English requirement" is a decision a student makes
 * by reading all six, and a collapsed dropdown hides five of them.
 */
export function ChoiceList({
  label,
  value,
  onChange,
  options,
  hint,
  error,
  required,
  columns = 1,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string; hint?: string }[];
  hint?: string;
  error?: string;
  required?: boolean;
  columns?: 1 | 2;
}) {
  const name = useId();
  return (
    <Shell label={label} hint={hint} error={error} required={required}>
      <div
        role="radiogroup"
        aria-label={label}
        className={`grid gap-2 ${columns === 2 ? "sm:grid-cols-2" : ""}`}
      >
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <label
              key={option.value}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-[14px] transition-colors duration-200 ${
                selected
                  ? "border-navy bg-navy/[0.035]"
                  : "border-hairline bg-white hover:border-ring-idle"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              <span
                aria-hidden
                className={`mt-[1px] flex size-[20px] shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                  selected ? "border-navy" : "border-ring-idle"
                }`}
              >
                {selected ? <span className="size-[10px] rounded-full bg-navy" /> : null}
              </span>
              <span className="min-w-0">
                <span
                  className={`block text-[15px] font-semibold leading-[1.35] ${selected ? "text-navy" : "text-ink"}`}
                >
                  {option.label}
                </span>
                {option.hint ? (
                  <span className="mt-[2px] block text-[13.5px] font-medium leading-[1.5] text-muted">
                    {option.hint}
                  </span>
                ) : null}
              </span>
            </label>
          );
        })}
      </div>
    </Shell>
  );
}

/** Multi-select, for the university shortlist. */
export function CheckList({
  label,
  values,
  onChange,
  options,
  hint,
  error,
  max,
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  options: readonly { value: string; label: string; hint?: string }[];
  hint?: string;
  error?: string;
  max?: number;
}) {
  return (
    <Shell label={label} hint={hint} error={error}>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const selected = values.includes(option.value);
          const full = Boolean(max && values.length >= max && !selected);
          return (
            <label
              key={option.value}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-[13px] transition-colors duration-200 ${
                selected ? "border-navy bg-navy/[0.035]" : "border-hairline bg-white hover:border-ring-idle"
              } ${full ? "cursor-not-allowed opacity-45" : ""}`}
            >
              <input
                type="checkbox"
                checked={selected}
                disabled={full}
                onChange={() =>
                  onChange(
                    selected
                      ? values.filter((entry) => entry !== option.value)
                      : [...values, option.value],
                  )
                }
                className="sr-only"
              />
              <span
                aria-hidden
                className={`mt-[1px] flex size-[20px] shrink-0 items-center justify-center rounded-md border-2 transition-colors duration-200 ${
                  selected ? "border-navy bg-navy text-white" : "border-ring-idle"
                }`}
              >
                {selected ? <Check size={13} strokeWidth={3} /> : null}
              </span>
              <span className="min-w-0">
                <span
                  className={`block truncate text-[14.5px] font-semibold leading-[1.35] ${selected ? "text-navy" : "text-ink"}`}
                >
                  {option.label}
                </span>
                {option.hint ? (
                  <span className="block truncate text-[13px] font-medium text-muted-light">
                    {option.hint}
                  </span>
                ) : null}
              </span>
            </label>
          );
        })}
      </div>
    </Shell>
  );
}

export function ConsentBox({
  checked,
  onChange,
  error,
  children,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        className={`flex cursor-pointer items-start gap-3 rounded-xl border p-[15px] transition-colors duration-200 ${
          error ? "border-orange/60" : checked ? "border-navy bg-navy/[0.035]" : "border-hairline bg-white hover:border-ring-idle"
        }`}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="sr-only"
        />
        <span
          aria-hidden
          className={`mt-[1px] flex size-[20px] shrink-0 items-center justify-center rounded-md border-2 transition-colors duration-200 ${
            checked ? "border-navy bg-navy text-white" : "border-ring-idle"
          }`}
        >
          {checked ? <Check size={13} strokeWidth={3} /> : null}
        </span>
        <span className="text-[14.5px] font-medium leading-[1.55] text-ink-soft">{children}</span>
      </label>
      {error ? (
        <p role="alert" className="mt-[7px] text-[13.5px] font-semibold text-orange">
          {error}
        </p>
      ) : null}
    </div>
  );
}
