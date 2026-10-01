"use client";

import { useEffect, useId, useState } from "react";
import { Check, ChevronDown, SlidersHorizontal, X } from "lucide-react";

/**
 * The explorer chrome: a filter rail on the left, results on the right.
 *
 * Every catalogue page used to stack its facets above its results — six rows
 * of chips between the heading and the first card. On a laptop that put the
 * results entirely below the fold, so the page opened on controls for a list
 * the student could not yet see, and every filter click scrolled them back to
 * check what it did. Moving the facets into a column beside the results makes
 * the two visible at once: change a filter, watch the grid respond.
 *
 * Below `lg` there is no room for a rail, so the same panel becomes a sheet
 * behind a "Filters" button. The panel renders once and changes position —
 * two copies would mean two sets of focusable controls and a duplicated tab
 * order for anyone using a keyboard.
 */
export function ExplorerShell({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-x-9 gap-y-5 lg:grid-cols-[248px_minmax(0,1fr)] xl:grid-cols-[272px_minmax(0,1fr)]">
      {sidebar}
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export function FilterSidebar({
  activeCount,
  onClear,
  resultSummary,
  children,
}: {
  /** How many facets are set. Drives the badge and whether "Clear" is offered. */
  activeCount: number;
  onClear: () => void;
  /** Shown on the sheet's confirm button, e.g. "Show 24 courses". */
  resultSummary: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  /**
   * While the sheet is up it owns the screen: the page behind it must not
   * scroll, and Escape must close it. Both are undone on unmount so a student
   * who navigates away mid-sheet does not inherit a frozen body.
   */
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    /* `self-start` is what lets the rail stick: a stretched grid item fills
       its row and has nowhere to travel, so the sidebar must shrink to its
       content while the grid area stays as tall as the results beside it. */
    <div className="lg:sticky lg:top-[calc(var(--nav-h)+1.25rem)] lg:self-start">
      <div className="flex items-center gap-3 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-[46px] flex-1 items-center justify-center gap-[9px] rounded-[10px] border border-hairline bg-white text-[14.5px] font-semibold text-navy transition-colors duration-200 hover:border-ring-idle sm:flex-none sm:px-6"
        >
          <SlidersHorizontal size={16} strokeWidth={2.2} aria-hidden />
          Filters
          {activeCount > 0 ? (
            <span className="inline-flex min-w-[20px] items-center justify-center rounded-full bg-navy px-[6px] py-[2px] text-[11.5px] font-bold tabular-nums text-white">
              {activeCount}
            </span>
          ) : null}
        </button>
        {activeCount > 0 ? (
          <button
            type="button"
            onClick={onClear}
            className="shrink-0 text-[13.5px] font-semibold text-blue-link transition-colors hover:text-navy"
          >
            Clear all
          </button>
        ) : null}
      </div>

      <div
        className={
          open
            ? "fixed inset-0 z-[60] lg:static lg:z-auto"
            : "hidden lg:block"
        }
      >
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-navy-ink/45 backdrop-blur-[2px] lg:hidden"
        />

        <aside
          aria-label="Filters"
          className="absolute inset-x-0 bottom-0 top-[9vh] flex flex-col overflow-hidden rounded-t-2xl border border-hairline bg-white shadow-[0_-24px_60px_-30px_rgba(1,22,111,0.5)] lg:static lg:max-h-[calc(100svh-var(--nav-h)-2.5rem)] lg:rounded-xl lg:shadow-[0_18px_40px_-28px_rgba(1,22,111,0.28)]"
        >
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-hairline px-4 py-[13px] lg:px-[18px]">
            <p className="inline-flex items-center gap-[9px] text-[14.5px] font-bold tracking-[-0.01em] text-navy">
              <SlidersHorizontal
                size={15}
                strokeWidth={2.3}
                aria-hidden
                className="hidden text-blue-link lg:block"
              />
              Filters
              {activeCount > 0 ? (
                <span className="inline-flex min-w-[19px] items-center justify-center rounded-full bg-navy px-[6px] py-[1.5px] text-[11px] font-bold tabular-nums text-white">
                  {activeCount}
                </span>
              ) : null}
            </p>

            <div className="flex items-center gap-1">
              {activeCount > 0 ? (
                <button
                  type="button"
                  onClick={onClear}
                  className="text-[13px] font-semibold text-blue-link transition-colors hover:text-navy"
                >
                  Clear all
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close filters"
                className="-mr-1 ml-1 inline-flex size-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-canvas hover:text-navy lg:hidden"
              >
                <X size={17} strokeWidth={2.4} aria-hidden />
              </button>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 lg:px-[18px]">
            {children}
          </div>

          <div className="shrink-0 border-t border-hairline p-3 lg:hidden">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-[46px] w-full rounded-[10px] bg-navy text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-navy-ink"
            >
              {resultSummary}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

/**
 * One facet. Collapsible, because a rail with six open facets is taller than
 * the screen and the student then scrolls the rail to reach the results —
 * exactly the problem the rail was meant to solve. What is set stays visible
 * when collapsed, so nothing can be applied and forgotten.
 */
export function FilterGroup({
  label,
  activeLabel,
  defaultOpen = true,
  children,
}: {
  label: string;
  /** The chosen value, echoed in the header while collapsed. */
  activeLabel?: string | null;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  return (
    <section className="border-b border-hairline last:border-b-0">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((value) => !value)}
          className="group flex w-full items-center justify-between gap-3 py-[13px] text-left"
        >
          <span className="flex min-w-0 flex-col gap-[3px]">
            <span className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-muted-light transition-colors group-hover:text-navy">
              {label}
            </span>
            {!open && activeLabel ? (
              <span className="truncate text-[13px] font-semibold text-navy">
                {activeLabel}
              </span>
            ) : null}
          </span>

          <span className="flex shrink-0 items-center gap-2">
            {open && activeLabel ? (
              <span aria-hidden className="size-[6px] rounded-full bg-orange" />
            ) : null}
            <ChevronDown
              size={15}
              strokeWidth={2.4}
              aria-hidden
              className={`text-muted-light transition-transform duration-200 group-hover:text-navy ${
                open ? "rotate-180" : ""
              }`}
            />
          </span>
        </button>
      </h3>

      <div id={id} hidden={!open} className="pb-[14px]">
        {children}
      </div>
    </section>
  );
}

const rowBase =
  "group flex w-full items-center gap-[10px] rounded-lg px-2 py-[6.5px] text-left text-[13.5px] font-semibold transition-colors duration-150";

function Marker({
  active,
  disabled,
}: {
  active: boolean;
  disabled: boolean;
}) {
  return (
    <span
      aria-hidden
      className={`flex size-[17px] shrink-0 items-center justify-center rounded-[5px] border transition-colors duration-150 ${
        active
          ? "border-navy bg-navy text-white"
          : disabled
            ? "border-hairline"
            : "border-ring-idle group-hover:border-navy"
      }`}
    >
      {active ? <Check size={11} strokeWidth={3.4} /> : null}
    </span>
  );
}

function rowTone(active: boolean, disabled: boolean) {
  if (active) return "bg-navy/[0.055] text-navy";
  if (disabled) return "cursor-not-allowed text-faint";
  return "text-muted hover:bg-canvas hover:text-navy";
}

/**
 * A single-choice facet as rows rather than chips. Rows survive a 250px
 * column without reflowing, keep the option labels left-aligned so they can
 * be scanned down, and leave a fixed slot on the right for the count.
 *
 * Choosing the active option clears it, so there is never a separate "any"
 * row to reason about — the same contract the chips had.
 */
export function OptionList<T extends string>({
  options,
  value,
  onChange,
  format,
  counts,
}: {
  options: readonly T[];
  value: T | null;
  onChange: (next: T | null) => void;
  format?: (option: T) => string;
  /** Results each option would leave. Zero-result options are disabled. */
  counts?: Record<T, number>;
}) {
  return (
    <ul className="-mx-2 space-y-px">
      {options.map((option) => {
        const active = value === option;
        const count = counts?.[option];
        const disabled = count === 0 && !active;

        return (
          <li key={option}>
            <button
              type="button"
              aria-pressed={active}
              disabled={disabled}
              onClick={() => onChange(active ? null : option)}
              className={`${rowBase} ${rowTone(active, disabled)}`}
            >
              <Marker active={active} disabled={disabled} />
              <span className="min-w-0 flex-1 truncate">
                {format ? format(option) : option}
              </span>
              {count !== undefined ? (
                <span className="shrink-0 text-[12px] font-semibold tabular-nums text-muted-light">
                  {count}
                </span>
              ) : null}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/** A yes/no facet, styled as one more row so the rail reads as one list. */
export function SwitchRow({
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
      className={`${rowBase} ${rowTone(active, disabled)}`}
    >
      <Marker active={active} disabled={disabled} />
      <span className="min-w-0 flex-1">{label}</span>
      {count !== undefined ? (
        <span className="shrink-0 text-[12px] font-semibold tabular-nums text-muted-light">
          {count}
        </span>
      ) : null}
    </button>
  );
}

/**
 * What is currently applied, above the results rather than only in the rail.
 * On a phone the rail is a closed sheet, so without this row the only sign a
 * filter is on would be a number on a button — and each pill removes its own
 * filter, which is faster than reopening the sheet to undo one thing.
 */
export function ActiveFilters({
  items,
}: {
  items: { key: string; label: string; onRemove: () => void }[];
}) {
  if (items.length === 0) return null;

  return (
    <ul className="flex flex-wrap items-center gap-2">
      {items.map((item) => (
        <li key={item.key}>
          <button
            type="button"
            onClick={item.onRemove}
            className="inline-flex items-center gap-[7px] rounded-lg border border-navy/15 bg-navy/[0.045] py-[5px] pl-[10px] pr-[8px] text-[13px] font-semibold text-navy transition-colors duration-200 hover:border-navy/30 hover:bg-navy/[0.08]"
          >
            {item.label}
            <X size={13} strokeWidth={2.8} aria-hidden className="text-muted" />
            <span className="sr-only">— remove filter</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
