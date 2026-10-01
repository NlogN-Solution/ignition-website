"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Check, ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";

/**
 * The horizontal filter bar shared by the course and university explorers.
 *
 * Both catalogues used to filter through different chrome — courses through a
 * row of dropdowns, universities through a rail of accordions down the left —
 * which meant the two halves of the same decision were operated in two
 * different ways. This is one control surface for both, and it is horizontal
 * for the reason the rail was abandoned: the results are what the student came
 * for, and a column of facets pushes the first card off the fold and takes a
 * third of the width away from the grid for the whole visit.
 *
 * The shape reads top to bottom as the order the decision is actually made:
 *
 *   1. a search line — the widest, quietest control, and the only one most
 *      students touch;
 *   2. a row of dropdown fields, each "label above value", each opening its
 *      own small panel with leave-one-out counts beside every option;
 *   3. a footer of yes/no toggles, with the active count and "Clear all"
 *      opposite them.
 *
 * Everything here is presentation. The counts, the URL writing and the
 * filtering itself stay with the explorer that owns them — this module knows
 * only what a field looks like, never what a field means.
 */

export interface FilterOption {
  value: string;
  label?: string;
  count?: number;
}

/* ---------------------------------------------------------------- shell -- */

/**
 * The card the whole bar sits in.
 *
 * The gradient is doing one job: lifting the search line off the fields
 * beneath it without a divider. A hairline there would cut the card into two
 * boxes, and the point is that this is one control.
 */
export function FilterBar({ children }: { children: React.ReactNode }) {
  return (
    <section
      aria-label="Filters"
      className="relative rounded-[20px] border border-hairline bg-gradient-to-b from-white via-white to-canvas p-[13px] shadow-[0_1px_2px_rgba(1,22,111,0.04),0_28px_56px_-40px_rgba(1,22,111,0.45)] sm:p-[17px]"
    >
      {/* A one-pixel highlight along the top edge. Cheap, and it is what keeps
          a white card on a near-white page from reading as flat paper. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-[18px] top-0 h-px bg-gradient-to-r from-transparent via-navy/15 to-transparent"
      />
      {children}
    </section>
  );
}

/**
 * The fields row.
 *
 * Flex rather than an auto-fit grid, because the two bounds have to be
 * independent: the fields grow to share the row, wrap at 164px, and stop at
 * 300px. `repeat(auto-fit, minmax(164px, 300px))` cannot do that — it counts
 * its tracks by the maximum, so five fields that would sit comfortably in one
 * row at 211px each get broken into 3 + 2 instead.
 *
 * The upper bound is what stops a short bar — universities, when no fee is on
 * record and the tuition field hides itself — from stretching two fields
 * across the full width and leaving "Any" adrift in half a metre of white.
 * Neither explorer has to know how many fields it ended up with.
 */
export function FilterFields({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap gap-[10px] [&>*]:min-w-[164px] [&>*]:max-w-[300px] [&>*]:flex-1">
      {children}
    </div>
  );
}

/**
 * The footer strip: toggles on the left, state on the right.
 *
 * "Clear all" lives here rather than beside the results because this is where
 * the filters are — a student looking to undo one looks at the thing they set
 * it with.
 */
export function FilterFooter({
  activeCount,
  onClear,
  children,
}: {
  activeCount: number;
  onClear: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="mt-[13px] flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-hairline pt-[13px]">
      <div className="flex flex-wrap items-center gap-2">{children}</div>

      <div className="flex items-center gap-[10px]">
        {activeCount > 0 ? (
          <>
            <p className="inline-flex items-center gap-[7px] text-[12.5px] font-semibold text-muted">
              <SlidersHorizontal size={13} strokeWidth={2.4} aria-hidden className="text-blue-link" />
              {activeCount} {activeCount === 1 ? "filter" : "filters"}
            </p>
            <button
              type="button"
              onClick={onClear}
              className="rounded-full border border-hairline bg-white px-[13px] py-[6px] text-[12.5px] font-bold text-blue-link transition-colors duration-200 hover:border-blue-link/40 hover:text-navy"
            >
              Clear all
            </button>
          </>
        ) : (
          <p className="text-[12.5px] font-medium text-muted-light">No filters applied</p>
        )}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- search -- */

/**
 * The search line, the full width of the bar.
 *
 * It carries its own clear button rather than the one WebKit draws inside
 * `type="search"`: that control is invisible until the field has focus, absent
 * in Firefox, and unstyleable.
 */
export function FilterSearch({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`relative mb-[11px] flex h-[54px] items-center rounded-[14px] border bg-white pl-[13px] pr-[10px] transition-[border-color,box-shadow] duration-200 ${
        focused
          ? "border-navy shadow-[0_0_0_3px_rgba(1,22,111,0.08)]"
          : "border-hairline hover:border-ring-idle"
      }`}
    >
      <span
        aria-hidden
        className={`mr-[11px] flex size-[32px] shrink-0 items-center justify-center rounded-[10px] transition-colors duration-200 ${
          focused || value ? "bg-navy text-white" : "bg-canvas text-muted-light"
        }`}
      >
        <Search size={16} strokeWidth={2.4} />
      </span>

      <label className="min-w-0 flex-1">
        <span className="sr-only">{label}</span>
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="w-full appearance-none bg-transparent text-[15.5px] font-medium text-ink outline-none placeholder:text-muted-light [&::-webkit-search-cancel-button]:hidden"
        />
      </label>

      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="ml-2 inline-flex size-[30px] shrink-0 items-center justify-center rounded-[9px] text-muted-light transition-colors duration-200 hover:bg-canvas hover:text-navy"
        >
          <X size={15} strokeWidth={2.6} aria-hidden />
        </button>
      ) : null}
    </div>
  );
}

/* --------------------------------------------------------------- fields -- */

const trigger =
  "group relative flex h-[58px] w-full min-w-0 flex-col justify-center gap-[3px] rounded-[13px] border px-[13px] text-left transition-[border-color,background-color,box-shadow] duration-200";

/**
 * One dropdown field.
 *
 * The panel aligns to the trigger's left edge unless that would run it off the
 * screen, in which case it flips to the right — measured on open rather than
 * guessed from the field's position in the row, because how many fields fit on
 * a line depends on the viewport.
 */
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
  const [flip, setFlip] = useState(false);
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

  useLayoutEffect(() => {
    if (!open || !ref.current) return;
    const left = ref.current.getBoundingClientRect().left;
    setFlip(left + 320 > window.innerWidth - 16);
  }, [open]);

  const active = Boolean(valueLabel);

  return (
    <div ref={ref} className="relative min-w-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className={`${trigger} pr-[34px] ${
          open
            ? "border-navy bg-white shadow-[0_0_0_3px_rgba(1,22,111,0.08)]"
            : active
              ? "border-navy/25 bg-navy/[0.035] hover:border-navy/45"
              : "border-hairline bg-white hover:border-ring-idle hover:shadow-[0_8px_20px_-14px_rgba(1,22,111,0.45)]"
        }`}
      >
        <span className="flex items-center gap-[6px]">
          <span
            className={`truncate text-[9.5px] font-bold uppercase tracking-[0.11em] transition-colors duration-200 ${
              active ? "text-navy/55" : "text-muted-light"
            }`}
          >
            {label}
          </span>
          {active ? <span aria-hidden className="size-[5px] shrink-0 rounded-full bg-orange" /> : null}
        </span>
        <span
          className={`truncate text-[14px] font-semibold leading-[1.2] ${
            active ? "text-navy" : "text-muted-light"
          }`}
        >
          {valueLabel ?? "Any"}
        </span>

        <ChevronDown
          size={15}
          strokeWidth={2.4}
          aria-hidden
          className={`pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2 transition-[transform,color] duration-200 ${
            open ? "rotate-180 text-navy" : "text-muted-light group-hover:text-navy"
          }`}
        />
      </button>

      {open ? (
        <div
          className={`filter-pop absolute top-[calc(100%+7px)] z-40 w-[min(320px,calc(100vw-2rem))] rounded-[16px] border border-hairline bg-white p-[7px] shadow-[0_32px_64px_-30px_rgba(1,22,111,0.5)] ${
            flip ? "right-0" : "left-0"
          }`}
        >
          {children(() => setOpen(false))}
          {active && onClear ? (
            <button
              type="button"
              onClick={() => {
                onClear();
                setOpen(false);
              }}
              className="mt-[6px] w-full rounded-[10px] border border-hairline px-2 py-[8px] text-[12.5px] font-bold text-orange transition-colors duration-150 hover:border-orange/40 hover:bg-orange/[0.05]"
            >
              Clear {label.toLowerCase()}
            </button>
          ) : null}
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
      className={`flex w-full items-center gap-[10px] rounded-[10px] px-[9px] py-[8px] text-left text-[13.5px] font-semibold transition-colors duration-150 ${
        active
          ? "bg-navy/[0.06] text-navy"
          : disabled
            ? "cursor-not-allowed text-faint"
            : "text-ink-soft hover:bg-canvas hover:text-navy"
      }`}
    >
      <span
        aria-hidden
        className={`flex size-[17px] shrink-0 items-center justify-center rounded-[5px] border transition-colors duration-150 ${
          active
            ? "border-navy bg-navy text-white"
            : disabled
              ? "border-hairline"
              : "border-ring-idle"
        }`}
      >
        {active ? <Check size={11} strokeWidth={3.4} /> : null}
      </span>
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {count !== undefined ? (
        <span
          className={`shrink-0 rounded-full px-[7px] py-[1.5px] text-[11px] font-bold tabular-nums ${
            active ? "bg-navy/10 text-navy" : "bg-canvas text-muted-light"
          }`}
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}

/** A single-choice dropdown. Choosing the set option clears it. */
export function SelectField({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: FilterOption[];
  value: string | null;
  onChange: (next: string | null) => void;
}) {
  const match = options.find((option) => option.value === value);
  const activeLabel = match ? (match.label ?? match.value) : null;

  return (
    <Field label={label} valueLabel={activeLabel} onClear={value ? () => onChange(null) : undefined}>
      {(close) => (
        <ul className="max-h-[288px] space-y-px overflow-y-auto overscroll-contain">
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
 * The same field with a filter box above the list — for the one facet with
 * too many options (upwards of 40 universities) to scan.
 */
export function SearchableSelectField({
  label,
  placeholder,
  emptyText,
  options,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  emptyText: (term: string) => string;
  options: FilterOption[];
  value: string | null;
  onChange: (next: string | null) => void;
}) {
  const [term, setTerm] = useState("");
  const activeLabel = options.find((option) => option.value === value)?.label ?? null;
  const needle = term.trim().toLowerCase();
  const matches = needle
    ? options.filter((option) => (option.label ?? option.value).toLowerCase().includes(needle))
    : options;

  return (
    <Field label={label} valueLabel={activeLabel} onClear={value ? () => onChange(null) : undefined}>
      {(close) => (
        <div>
          <div className="relative mb-[6px]">
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
              placeholder={placeholder}
              autoFocus
              className="h-[38px] w-full rounded-[10px] border border-hairline bg-canvas/60 pl-[32px] pr-3 text-[13.5px] font-medium text-ink outline-none placeholder:text-muted-light focus:border-blue-link focus:bg-white"
            />
          </div>
          <ul className="max-h-[248px] space-y-px overflow-y-auto overscroll-contain">
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
                {emptyText(term)}
              </li>
            ) : null}
          </ul>
        </div>
      )}
    </Field>
  );
}

/** A yes/no facet, as a pill in the footer strip. */
export function ToggleChip({
  label,
  active,
  onChange,
  count,
}: {
  label: string;
  active: boolean;
  onChange: (next: boolean) => void;
  count?: number;
}) {
  const disabled = count === 0 && !active;

  return (
    <button
      type="button"
      aria-pressed={active}
      disabled={disabled}
      onClick={() => onChange(!active)}
      className={`inline-flex items-center gap-[8px] rounded-full border px-[13px] py-[7px] text-[13px] font-semibold transition-colors duration-200 ${
        active
          ? "border-navy/30 bg-navy/[0.06] text-navy"
          : disabled
            ? "cursor-not-allowed border-hairline text-faint"
            : "border-hairline bg-white text-muted hover:border-ring-idle hover:text-navy"
      }`}
    >
      <span
        aria-hidden
        className={`flex size-[15px] shrink-0 items-center justify-center rounded-[4px] border transition-colors duration-150 ${
          active ? "border-navy bg-navy text-white" : disabled ? "border-hairline" : "border-ring-idle"
        }`}
      >
        {active ? <Check size={9} strokeWidth={3.6} /> : null}
      </span>
      {label}
      {count !== undefined ? (
        <span className="text-[11.5px] font-bold tabular-nums text-muted-light">{count}</span>
      ) : null}
    </button>
  );
}
