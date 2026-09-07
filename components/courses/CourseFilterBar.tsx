"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import type { FacetOption } from "@/lib/api/types";

/**
 * The course filter bar: one row of compact dropdown-style fields rather than
 * a collapsible sidebar of accordions.
 *
 * The UX this borrows from is a familiar one on course-search platforms — a
 * horizontal strip of "label above value" fields, each opening its own small
 * panel, with University searchable by name rather than scrolled through as
 * a plain list of 40-odd institutions. The visual language is Ignition's own
 * (white, hairline borders, navy/orange), not a copy of any reference's
 * colours or box style — only the interaction pattern is shared.
 *
 * Every field is built on the same trigger shape (`fieldShell`) — same
 * height, same radius, same label position — including the course-name
 * search box, which used to be a taller, differently-shaped component
 * dropped into the same row. A filter bar where one field is a different
 * height than its neighbours reads as unfinished before anyone has clicked
 * anything.
 *
 * Every field still drives the same URL-backed filter state `CourseExplorer`
 * already had (`commit`), and the leave-one-out counts from `/courses/facets`
 * still show beside every option — a dropdown is a different container for
 * the same facet, not a different feature.
 */

const fieldShell =
  "flex h-[56px] w-full min-w-0 flex-col justify-center gap-[2px] rounded-[12px] border bg-white px-4 text-left shadow-[0_1px_2px_rgba(1,22,111,0.04)] transition-colors duration-150";

const fieldLabel = "text-[10.5px] font-bold uppercase tracking-[0.09em] text-muted-light";

function Field({
  label,
  valueLabel,
  onClear,
  children,
}: {
  label: string;
  valueLabel: string | null;
  onClear?: () => void;
  children: (close: () => void) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const active = Boolean(valueLabel);

  return (
    <div ref={ref} className="relative min-w-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className={`${fieldShell} pr-9 ${
          open
            ? "border-navy ring-[3px] ring-navy/[0.08]"
            : active
              ? "border-blue-link/40 hover:border-blue-link/60"
              : "border-hairline hover:border-ring-idle"
        }`}
      >
        <span className={fieldLabel}>{label}</span>
        <span
          className={`truncate text-[14px] font-semibold leading-[1.2] ${
            active ? "text-navy" : "text-muted-light"
          }`}
        >
          {valueLabel ?? "Any"}
        </span>
      </button>
      <ChevronDown
        size={16}
        strokeWidth={2.3}
        aria-hidden
        className={`pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2 text-muted-light transition-transform duration-200 ${
          open ? "rotate-180 text-navy" : ""
        }`}
      />

      {open ? (
        <div className="absolute left-0 top-[calc(100%+8px)] z-30 w-[min(320px,86vw)] rounded-[14px] border border-hairline bg-white p-2 shadow-[0_28px_56px_-24px_rgba(1,22,111,0.4)]">
          {active && onClear ? (
            <button
              type="button"
              onClick={() => {
                onClear();
                setOpen(false);
              }}
              className="mb-1 flex w-full items-center justify-between gap-[10px] rounded-lg px-2 py-[7px] text-left text-[13px] font-bold text-orange transition-colors duration-150 hover:bg-orange/[0.06]"
            >
              Clear {label.toLowerCase()}
            </button>
          ) : null}
          {children(() => setOpen(false))}
        </div>
      ) : null}
    </div>
  );
}

function OptionRow({
  label,
  active,
  count,
  onClick,
}: {
  label: string;
  active: boolean;
  count?: number;
  onClick: () => void;
}) {
  const disabled = count === 0 && !active;

  return (
    <button
      type="button"
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={`flex w-full items-center gap-[10px] rounded-lg px-2 py-[8px] text-left text-[13.5px] font-semibold transition-colors duration-150 ${
        active
          ? "bg-blue-link/[0.08] text-navy"
          : disabled
            ? "cursor-not-allowed text-faint"
            : "text-ink-soft hover:bg-canvas hover:text-navy"
      }`}
    >
      <span
        aria-hidden
        className={`flex size-[16px] shrink-0 items-center justify-center rounded-[5px] border transition-colors duration-150 ${
          active ? "border-navy bg-navy text-white" : "border-ring-idle"
        }`}
      >
        {active ? <Check size={10} strokeWidth={3.4} /> : null}
      </span>
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {count !== undefined ? (
        <span
          className={`shrink-0 rounded-full px-[7px] py-[1px] text-[11.5px] font-bold tabular-nums ${
            active ? "bg-navy/10 text-navy" : "bg-canvas text-muted-light"
          }`}
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}

/** A plain single-choice dropdown — study level, course type, subject, duration. */
export function SelectField({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: FacetOption[];
  value: string | null;
  onChange: (next: string | null) => void;
}) {
  const activeLabel = options.find((option) => option.value === value)?.label ?? null;

  return (
    <Field label={label} valueLabel={activeLabel} onClear={value ? () => onChange(null) : undefined}>
      {(close) => (
        <ul className="max-h-[280px] space-y-px overflow-y-auto">
          {options.map((option) => (
            <li key={option.value}>
              <OptionRow
                label={option.label ?? option.value}
                active={value === option.value}
                count={option.count}
                onClick={() => {
                  onChange(value === option.value ? null : option.value);
                  close();
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </Field>
  );
}

/**
 * University, searchable by name — the one field with too many options
 * (upwards of 40) to scan as a plain list. Typing narrows the list to
 * matching names; selecting one closes the panel, the same as any other
 * field.
 */
export function UniversityField({
  options,
  value,
  onChange,
}: {
  options: FacetOption[];
  value: string | null;
  onChange: (next: string | null) => void;
}) {
  const [term, setTerm] = useState("");
  const activeLabel = options.find((option) => option.value === value)?.label ?? null;
  const matches = term.trim()
    ? options.filter((option) => (option.label ?? option.value).toLowerCase().includes(term.trim().toLowerCase()))
    : options;

  return (
    <Field label="University" valueLabel={activeLabel} onClear={value ? () => onChange(null) : undefined}>
      {(close) => (
        <div>
          <div className="relative mb-2">
            <Search
              size={14}
              strokeWidth={2.4}
              aria-hidden
              className="pointer-events-none absolute left-[11px] top-1/2 -translate-y-1/2 text-muted-light"
            />
            <input
              type="text"
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Type a university name…"
              autoFocus
              className="h-[38px] w-full rounded-[9px] border border-hairline bg-canvas/60 pl-[32px] pr-3 text-[14px] font-medium text-ink outline-none placeholder:text-muted-light focus:border-blue-link focus:bg-white"
            />
          </div>
          <ul className="max-h-[240px] space-y-px overflow-y-auto">
            {matches.slice(0, 40).map((option) => (
              <li key={option.value}>
                <OptionRow
                  label={option.label ?? option.value}
                  active={value === option.value}
                  count={option.count}
                  onClick={() => {
                    onChange(value === option.value ? null : option.value);
                    setTerm("");
                    close();
                  }}
                />
              </li>
            ))}
            {matches.length === 0 ? (
              <li className="px-2 py-[10px] text-[13px] font-medium text-muted-light">
                No universities match “{term}”.
              </li>
            ) : null}
          </ul>
        </div>
      )}
    </Field>
  );
}

/**
 * Course name — built on the exact same `fieldShell` as the dropdowns, so
 * it lines up pixel-for-pixel with its neighbours in the grid instead of
 * being a taller, differently-radiused search bar dropped into the row.
 */
export function CourseNameField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <label
      className={`${fieldShell} relative cursor-text pr-9 ${
        focused ? "border-navy ring-[3px] ring-navy/[0.08]" : "border-hairline hover:border-ring-idle"
      }`}
    >
      <span className={fieldLabel}>Course name</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search by course name"
        className="w-full min-w-0 truncate bg-transparent text-[14px] font-semibold leading-[1.2] text-navy outline-none placeholder:font-medium placeholder:text-muted-light [&::-webkit-search-cancel-button]:hidden"
      />
      <Search
        size={16}
        strokeWidth={2.3}
        aria-hidden
        className="pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2 text-muted-light"
      />
    </label>
  );
}
