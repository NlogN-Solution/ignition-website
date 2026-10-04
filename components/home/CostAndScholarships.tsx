import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import { Badge } from "../ui/Badge";
import type { Scholarship } from "@/data/scholarships";

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

/**
 * Cost and scholarships share a band rather than two, because they answer
 * the same hesitation in sequence: "what does this cost" immediately
 * followed by "is there anything that brings that down." Splitting them
 * into separate sections would make a reader hold the tuition figure in
 * their head across a section break before the scholarship numbers could
 * answer it.
 */
export function CostAndScholarships({
  tuition,
  monthlyLiving,
  scholarships,
}: {
  tuition: { min: number; max: number } | null;
  monthlyLiving: { low: number; high: number };
  scholarships: Scholarship[];
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
      <div>
        <Badge tone="demo" className="mb-4">
          Example data
        </Badge>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <p className="font-display text-[clamp(1.5rem,2.4vw,2rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-navy">
              {tuition ? `${gbp.format(tuition.min)}–${gbp.format(tuition.max)}` : "Check course fees"}
            </p>
            <p className="mt-[6px] text-[13px] font-semibold uppercase tracking-[0.06em] text-muted-light">
              Tuition per year
            </p>
          </div>
          <div>
            <p className="font-display text-[clamp(1.5rem,2.4vw,2rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-navy">
              {gbp.format(monthlyLiving.low)}–{gbp.format(monthlyLiving.high)}
            </p>
            <p className="mt-[6px] text-[13px] font-semibold uppercase tracking-[0.06em] text-muted-light">
              Living costs per month
            </p>
          </div>
        </div>

        <p className="mt-6 max-w-[48ch] text-[15px] font-medium leading-[1.6] text-muted">
          Published tuition ranges where available, with example monthly living costs.
          Confirm your course fees with the university and build your own budget.
        </p>

        <Link
          href="/money/calculator"
          className="group mt-5 inline-flex items-center gap-[9px] text-[14.5px] font-bold text-navy transition-colors duration-200 hover:text-orange"
        >
          Work out your own budget
          <ArrowRight
            size={16}
            strokeWidth={2.4}
            aria-hidden
            className="shrink-0 transition-transform duration-200 group-hover:translate-x-[3px]"
          />
        </Link>
      </div>

      <div className="rounded-md border border-hairline bg-white p-5 sm:p-6">
        <p className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-blue-link">
          Scholarships
        </p>

        <ul className="mt-4 divide-y divide-hairline">
          {scholarships.map((scholarship) => (
            <li key={scholarship.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
              <span
                aria-hidden
                className="mt-[2px] flex size-[30px] shrink-0 items-center justify-center rounded-md bg-orange/10 text-orange"
              >
                <Award size={15} strokeWidth={2.1} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14.5px] font-bold leading-[1.3] text-navy">
                  {scholarship.name}
                </p>
                <p className="mt-[3px] text-[13px] font-medium leading-[1.4] text-muted">
                  {scholarship.provider}
                  {scholarship.amount ? ` · ${scholarship.amount}` : ""}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <Link
          href="/money#topics"
          className="group mt-5 inline-flex items-center gap-[9px] text-[14px] font-bold text-navy transition-colors duration-200 hover:text-orange"
        >
          Explore costs and funding
          <ArrowRight
            size={15}
            strokeWidth={2.4}
            aria-hidden
            className="shrink-0 transition-transform duration-200 group-hover:translate-x-[3px]"
          />
        </Link>
      </div>
    </div>
  );
}
