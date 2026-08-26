import { ArrowUpRight } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import type { Career } from "@/data/careers";
import type { MatchReason } from "@/lib/quiz/scoring";

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
