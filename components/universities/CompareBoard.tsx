"use client";

import Link from "next/link";
import { Check, Minus, Plus, X } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { ArrowButton } from "../ui/ArrowButton";
import { coursesAt, universities } from "@/data/universities";
import type { University } from "@/data/universities";
import { storageKeys } from "@/lib/storage";
import { useStoredList } from "@/lib/storage/store";

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

const MAX = 4;

type Row = {
  label: string;
  render: (university: University) => React.ReactNode;
};

const rows: Row[] = [
  {
    label: "Location",
    render: (u) => (
      <span>
        {u.city}
        <span className="block text-[13.5px] font-medium text-muted">{u.region}</span>
      </span>
    ),
  },
  {
    label: "Tuition, per year",
    render: (u) => `${gbp.format(u.tuition.min)}–${gbp.format(u.tuition.max)}`,
  },
  {
    label: "Living costs, per month",
    render: (u) => gbp.format(u.livingCostMonthly),
  },
  {
    label: "Estimated first year",
    render: (u) => (
      <span>
        {gbp.format(u.tuition.min + u.livingCostMonthly * 12)}
        <span className="block text-[13.5px] font-medium text-muted">
          Lowest tuition plus twelve months of living costs
        </span>
      </span>
    ),
  },
  {
    label: "Entry requirements",
    render: (u) => (
      <span>
        {u.entry.typical}
        <span className="mt-[3px] block text-[13.5px] font-medium text-muted">
          {u.entry.english}
        </span>
      </span>
    ),
  },
  {
    label: "Accommodation",
    render: (u) => (
      <span>
        {gbp.format(u.accommodation.weeklyFrom)}–{gbp.format(u.accommodation.weeklyTo)} per week
        <span className="mt-[3px] block text-[13.5px] font-medium text-muted">
          {u.accommodation.guaranteed
            ? "First-year place guaranteed"
            : "Not guaranteed"}
        </span>
      </span>
    ),
  },
  {
    label: "Scholarships",
    render: (u) => (
      <ul className="space-y-[6px]">
        {u.scholarships.map((s) => (
          <li key={s.name} className="text-[14.5px]">
            <span className="font-semibold text-ink">{s.amount}</span>{" "}
            <span className="font-medium text-muted">{s.name}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    label: "Placement year",
    render: (u) =>
      u.placementYear ? (
        <span className="inline-flex items-center gap-[7px] font-semibold text-navy">
          <Check size={16} strokeWidth={2.6} aria-hidden className="text-orange" />
          Available
        </span>
      ) : (
        <span className="inline-flex items-center gap-[7px] font-medium text-muted">
          <Minus size={16} strokeWidth={2.6} aria-hidden className="text-faint" />
          Not offered
        </span>
      ),
  },
  {
    label: "International support",
    render: (u) => (
      <ul className="space-y-[6px]">
        {u.internationalSupport.map((item) => (
          <li
            key={item}
            className="flex gap-[9px] text-[14.5px] font-medium text-muted"
          >
            <Check
              size={15}
              strokeWidth={2.4}
              aria-hidden
              className="mt-[3px] shrink-0 text-orange"
            />
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    label: "Courses listed",
    render: (u) => {
      const list = coursesAt(u.id);
      return (
        <ul className="space-y-[5px]">
          {list.map((course) => (
            <li key={course.id}>
              <Link
                href={`/courses/${course.id}`}
                className="text-[14.5px] font-medium text-blue-link transition-colors hover:text-navy"
              >
                {course.title}
              </Link>
            </li>
          ))}
        </ul>
      );
    },
  },
  {
    label: "Careers and employability",
    render: (u) => (
      <span className="text-[14.5px] font-medium text-muted">{u.careers}</span>
    ),
  },
];

export function CompareBoard() {
  const { items, toggle, clear } = useStoredList(storageKeys.compareSelection);
  const selected = items
    .map((id) => universities.find((u) => u.id === id))
    .filter((u): u is University => Boolean(u));

  return (
    <div>
      <Card className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <h2 className="text-[17px] font-bold tracking-[-0.01em] text-navy">
            Your shortlist
          </h2>
          <p className="text-[14px] font-medium text-muted">
            <span className="font-semibold text-ink">{selected.length}</span> of{" "}
            {MAX} selected
            {selected.length ? (
              <button
                type="button"
                onClick={clear}
                className="ml-4 font-semibold text-blue-link transition-colors hover:text-navy"
              >
                Clear
              </button>
            ) : null}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {universities.map((university) => {
            const active = items.includes(university.id);
            const full = selected.length >= MAX && !active;

            return (
              <button
                key={university.id}
                type="button"
                aria-pressed={active}
                disabled={full}
                title={full ? `Compare up to ${MAX} at once` : undefined}
                onClick={() => toggle(university.id)}
                className={`inline-flex items-center gap-[7px] rounded-lg border px-[12px] py-[7px] text-[13.5px] font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${
                  active
                    ? "border-navy bg-navy text-white"
                    : "border-hairline bg-white text-muted hover:border-ring-idle hover:text-navy"
                }`}
              >
                {active ? (
                  <X size={13} strokeWidth={2.6} aria-hidden />
                ) : (
                  <Plus size={13} strokeWidth={2.6} aria-hidden />
                )}
                {university.name.replace("Example ", "").replace(" University", "")}
              </button>
            );
          })}
        </div>
      </Card>

      {selected.length < 2 ? (
        <div className="mt-8 rounded-xl border border-dashed border-hairline bg-white/60 p-8 text-center">
          <p className="mx-auto max-w-[44ch] text-[16px] font-medium leading-[1.6] text-muted">
            Pick at least two universities above to compare them side by side.
            You can also add them from any university page as you browse
            <span className="text-orange">.</span>
          </p>
          <div className="mt-6">
            <ArrowButton
              href="/universities"
              iconSize={17}
              className="h-[48px] gap-[14px] px-6 text-[15px]"
            >
              Browse universities
            </ArrowButton>
          </div>
        </div>
      ) : (
        <div className="mt-10">
          <div className="mb-4">
            <Badge tone="demo">Example data</Badge>
          </div>

          {/* One markup for both layouts. Below `lg` each attribute is a block
              with the university named beside its value; from `lg` the same
              cells become columns under a sticky header row. */}
          <div
            className="lg:grid lg:items-start"
            style={{
              gridTemplateColumns: `180px repeat(${selected.length}, minmax(0,1fr))`,
            }}
          >
            <div className="hidden lg:sticky lg:top-[var(--nav-h)] lg:z-10 lg:col-span-full lg:grid lg:grid-cols-subgrid lg:border-b lg:border-hairline lg:bg-canvas/95 lg:backdrop-blur-md">
              <span />
              {selected.map((university) => (
                <div key={university.id} className="px-4 py-4">
                  <Link
                    href={`/universities/${university.id}`}
                    className="text-[15.5px] font-bold leading-[1.3] text-navy transition-colors hover:text-blue-link"
                  >
                    {university.name}
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggle(university.id)}
                    className="mt-[6px] flex items-center gap-[6px] text-[13px] font-semibold text-muted-light transition-colors hover:text-orange"
                  >
                    <X size={12} strokeWidth={2.6} aria-hidden />
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {rows.map((row) => (
              <div
                key={row.label}
                className="mb-6 rounded-xl border border-hairline bg-white p-5 lg:col-span-full lg:mb-0 lg:grid lg:grid-cols-subgrid lg:rounded-none lg:border-0 lg:border-b lg:border-hairline lg:bg-transparent lg:p-0"
              >
                <h3 className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-blue-link lg:px-4 lg:py-5 lg:normal-case lg:tracking-normal lg:text-[14.5px] lg:font-semibold lg:text-muted">
                  {row.label}
                </h3>

                {selected.map((university) => (
                  <div
                    key={university.id}
                    className="mt-4 border-t border-hairline pt-4 lg:mt-0 lg:border-t-0 lg:px-4 lg:py-5"
                  >
                    <p className="mb-[6px] text-[13px] font-bold text-navy lg:hidden">
                      {university.name}
                    </p>
                    <div className="text-[15px] font-semibold leading-[1.5] text-ink">
                      {row.render(university)}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
