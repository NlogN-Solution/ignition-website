"use client";

import { useMemo } from "react";
import { RotateCcw } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { ArrowButton } from "../ui/ArrowButton";
import { cityPresets, defaultTuition } from "@/data/guides/cities";
import { storageKeys } from "@/lib/storage";
import { useStoredState } from "@/lib/storage/useStoredState";

type Estimate = {
  city: string;
  tuition: number;
  accommodation: number;
  food: number;
  transport: number;
  other: number;
};

function estimateFor(city: string): Estimate {
  const preset = cityPresets.find((p) => p.city === city) ?? cityPresets[0];

  return {
    city: preset.city,
    tuition: defaultTuition,
    accommodation: preset.accommodation,
    food: preset.food,
    transport: preset.transport,
    other: preset.other,
  };
}

const initial = estimateFor("Manchester");

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

const monthlyFields = [
  { key: "accommodation", label: "Accommodation", max: 1600, step: 10 },
  { key: "food", label: "Food and household", max: 600, step: 5 },
  { key: "transport", label: "Transport", max: 250, step: 5 },
  { key: "other", label: "Phone, books, social and everything else", max: 700, step: 5 },
] as const;

export function CostCalculator() {
  const [estimate, setEstimate] = useStoredState<Estimate>(
    storageKeys.costEstimate,
    initial,
  );

  const monthly = useMemo(
    () =>
      estimate.accommodation + estimate.food + estimate.transport + estimate.other,
    [estimate],
  );

  const annualTotal = monthly * 12 + estimate.tuition;

  const breakdown = [
    { label: "Tuition", value: estimate.tuition },
    { label: "Accommodation", value: estimate.accommodation * 12 },
    { label: "Food and household", value: estimate.food * 12 },
    { label: "Transport", value: estimate.transport * 12 },
    { label: "Everything else", value: estimate.other * 12 },
  ];

  function set<K extends keyof Estimate>(key: K, value: Estimate[K]) {
    setEstimate((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-start lg:gap-8">
      <Card className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <h2 className="text-[17px] font-bold tracking-[-0.01em] text-navy">
            Your details
          </h2>
          <button
            type="button"
            onClick={() => setEstimate(estimateFor(estimate.city))}
            className="group inline-flex items-center gap-[7px] text-[13.5px] font-semibold text-blue-link transition-colors hover:text-navy"
          >
            <RotateCcw
              size={13}
              strokeWidth={2.4}
              aria-hidden
              className="transition-transform duration-300 group-hover:-rotate-90"
            />
            Reset to city defaults
          </button>
        </div>

        <fieldset className="mt-6">
          <legend className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-muted-light">
            City
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {cityPresets.map((preset) => {
              const active = estimate.city === preset.city;

              return (
                <button
                  key={preset.city}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setEstimate(estimateFor(preset.city))}
                  className={`inline-flex items-center rounded-lg border px-[12px] py-[7px] text-[13.5px] font-semibold transition-colors duration-200 ${
                    active
                      ? "border-navy bg-navy text-white"
                      : "border-hairline bg-white text-muted hover:border-ring-idle hover:text-navy"
                  }`}
                >
                  {preset.city}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-[13.5px] font-medium leading-[1.5] text-muted">
            Choosing a city fills in example monthly costs. Adjust anything
            below to match your own situation.
          </p>
        </fieldset>

        <div className="mt-7">
          <label htmlFor="tuition" className="block">
            <span className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-muted-light">
              Tuition, per year
            </span>
            <div className="mt-3 flex items-center gap-4">
              <input
                id="tuition"
                type="range"
                min={8000}
                max={50000}
                step={500}
                value={estimate.tuition}
                onChange={(e) => set("tuition", Number(e.target.value))}
                className="h-[6px] w-full min-w-0 flex-1 cursor-pointer appearance-none rounded-full bg-track accent-navy"
              />
              <span className="w-[80px] shrink-0 text-right sm:w-[92px] text-[16px] font-bold tabular-nums text-navy">
                {gbp.format(estimate.tuition)}
              </span>
            </div>
          </label>
        </div>

        <div className="mt-7 space-y-6 border-t border-hairline pt-6">
          <p className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-muted-light">
            Monthly living costs
          </p>

          {monthlyFields.map((field) => (
            <label key={field.key} htmlFor={field.key} className="block">
              <span className="text-[14.5px] font-semibold text-ink">
                {field.label}
              </span>
              <div className="mt-2 flex items-center gap-4">
                <input
                  id={field.key}
                  type="range"
                  min={0}
                  max={field.max}
                  step={field.step}
                  value={estimate[field.key]}
                  onChange={(e) => set(field.key, Number(e.target.value))}
                  className="h-[6px] w-full min-w-0 flex-1 cursor-pointer appearance-none rounded-full bg-track accent-navy"
                />
                <span className="w-[80px] shrink-0 text-right sm:w-[92px] text-[16px] font-bold tabular-nums text-navy">
                  {gbp.format(estimate[field.key])}
                </span>
              </div>
            </label>
          ))}
        </div>
      </Card>

      <div className="lg:sticky lg:top-[calc(var(--nav-h)_+_1.5rem)]">
        <Card className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-[17px] font-bold tracking-[-0.01em] text-navy">
              Your estimate
            </h2>
            <Badge tone="demo">Example data</Badge>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-hairline bg-canvas p-4">
              <p className="text-[13px] font-semibold text-muted">Per month</p>
              <p className="mt-1 text-[26px] font-bold tracking-[-0.02em] text-navy">
                {gbp.format(monthly)}
              </p>
              <p className="mt-[2px] text-[12.5px] font-medium text-muted-light">
                Living costs only
              </p>
            </div>
            <div className="rounded-xl border border-hairline bg-canvas p-4">
              <p className="text-[13px] font-semibold text-muted">Per year</p>
              <p className="mt-1 text-[26px] font-bold tracking-[-0.02em] text-navy">
                {gbp.format(annualTotal)}
              </p>
              <p className="mt-[2px] text-[12.5px] font-medium text-muted-light">
                Tuition plus twelve months
              </p>
            </div>
          </div>

          <div className="mt-7">
            <p className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-muted-light">
              Where it goes, over a year
            </p>
            <ul className="mt-4 space-y-4">
              {breakdown.map((item) => {
                const share = annualTotal
                  ? Math.round((item.value / annualTotal) * 100)
                  : 0;

                return (
                  <li key={item.label}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="text-[14.5px] font-semibold text-ink">
                        {item.label}
                      </span>
                      <span className="text-[14.5px] font-semibold tabular-nums text-navy">
                        {gbp.format(item.value)}
                        <span className="ml-2 text-[13px] font-medium text-muted-light">
                          {share}%
                        </span>
                      </span>
                    </div>
                    <div
                      className="mt-[8px] h-[6px] w-full overflow-hidden rounded-full bg-track"
                      role="img"
                      aria-label={`${item.label}: ${share} percent of the annual total`}
                    >
                      <div
                        className="h-full rounded-full bg-blue-bright transition-[width] duration-300"
                        style={{ width: `${share}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <p className="mt-6 border-t border-hairline pt-4 text-[13px] font-medium leading-[1.55] text-muted-light">
            Twelve months rather than term time, because most international
            students keep their accommodation over the summer. Your estimate is
            saved in this browser.
          </p>

          <div className="mt-5">
            <ArrowButton
              href="/money/scholarships"
              iconSize={17}
              className="h-[48px] w-full gap-[14px] px-6 text-[15px]"
            >
              Find scholarships
            </ArrowButton>
          </div>
        </Card>
      </div>
    </div>
  );
}
