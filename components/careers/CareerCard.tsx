import { ArrowUpRight, TrendingUp } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import type { Career } from "@/data/careers";
import type { MatchReason } from "@/lib/quiz/scoring";

const currency = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
  notation: "compact",
});

/**
 * Shared by the results page and the career explorer. `score` and `reasons`
 * are only present when a student has taken the quiz, so the same card serves
 * both a cold browse and a personalised match.
 */
export function CareerCard({
  career,
  score,
  reasons,
}: {
  career: Career;
  score?: number;
  reasons?: MatchReason[];
}) {
  const growth = Math.round(
    ((career.salary.experienced - career.salary.entry) / career.salary.entry) * 100,
  );

  return (
    <Card href={`/careers/${career.id}`} className="h-full p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-[18px] font-bold leading-[1.25] tracking-[-0.01em] text-navy sm:text-[19px]">
            {career.title}
          </h3>
          <p className="mt-[6px] text-[14.5px] font-medium leading-[1.45] text-muted">
            {career.tagline}
          </p>
        </div>

        {score !== undefined ? (
          <div className="shrink-0 text-right">
            <p className="text-[22px] font-bold leading-none tracking-[-0.02em] text-navy">
              {score}
              <span className="text-orange">%</span>
            </p>
            <p className="mt-[3px] text-[11.5px] font-semibold uppercase tracking-[0.1em] text-muted-light">
              match
            </p>
          </div>
        ) : null}
      </div>

      <div className="mt-5 flex items-stretch gap-4 rounded-lg border border-hairline bg-navy/[0.03] px-4 py-3.5 transition-colors duration-200 group-hover:border-ring-idle group-hover:bg-navy/[0.05]">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-light">
            Base salary
          </p>
          <p className="mt-[3px] text-[19px] font-bold tracking-[-0.02em] text-navy tabular-nums">
            {currency.format(career.salary.entry)}
          </p>
        </div>

        <div className="w-px shrink-0 self-stretch bg-hairline" aria-hidden />

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-light">
            Mid-level
          </p>
          <p className="mt-[3px] flex items-baseline gap-[6px] text-[19px] font-bold tracking-[-0.02em] text-navy tabular-nums">
            {currency.format(career.salary.experienced)}
            {growth > 0 ? (
              <span className="inline-flex items-center gap-[2px] text-[11.5px] font-bold text-orange">
                <TrendingUp size={12} strokeWidth={2.6} aria-hidden />
                {growth}%
              </span>
            ) : null}
          </p>
        </div>
      </div>

      {reasons?.length ? (
        <div className="mt-5">
          <p className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-blue-link">
            Why it matches
          </p>
          <ul className="mt-[10px] flex flex-wrap gap-[6px]">
            {reasons.map((reason) => (
              <li key={`${reason.dimension}-${reason.key}`}>
                <Badge tone="navy">{reason.label}</Badge>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-5">
        <p className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-muted-light">
          Relevant degrees
        </p>
        <p className="mt-[8px] text-[14.5px] font-medium leading-[1.5] text-ink-soft">
          {career.degreeSubjects.slice(0, 3).join(" · ")}
        </p>
      </div>

      <span className="mt-auto inline-flex items-center gap-[9px] pt-6 text-[14.5px] font-bold text-blue-link transition-colors group-hover:text-navy">
        Explore this career
        <ArrowUpRight
          size={16}
          strokeWidth={2.4}
          aria-hidden
          className="transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
        />
      </span>
    </Card>
  );
}
