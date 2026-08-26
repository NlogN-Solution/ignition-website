import { Award as AwardIcon, ExternalLink, Trophy } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import type { Award, Employer, Ranking } from "@/data/universities/types";

/**
 * Rankings, awards and graduate employers.
 *
 * The one rule these three share: a claim is shown with its source and its
 * year, or it is not shown. A placing with no attribution is a rumour, and on
 * a page a student uses to choose where to spend three years and most of a
 * family's savings, an unattributed number is worse than no number. So
 * `source` and `year` are required by the type, and the card prints them
 * under every claim rather than hiding them behind a tooltip.
 */

export function RankingCards({ rankings }: { rankings: Ranking[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {rankings.map((ranking) => (
        <li key={`${ranking.title}-${ranking.year}`}>
          <Card className="h-full p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              {ranking.position ? (
                <p className="text-[clamp(1.5rem,2.4vw,1.875rem)] font-bold leading-[1] tracking-[-0.02em] text-navy">
                  {ranking.position}
                </p>
              ) : (
                <Trophy
                  size={22}
                  strokeWidth={1.9}
                  aria-hidden
                  className="mt-[2px] shrink-0 text-orange"
                />
              )}
              {ranking.scope ? (
                <Badge tone="muted">{ranking.scope}</Badge>
              ) : null}
            </div>

            <h3 className="mt-4 text-[16.5px] font-bold leading-[1.35] tracking-[-0.01em] text-navy">
              {ranking.title}
            </h3>

            {ranking.note ? (
              <p className="mt-2 text-[14px] font-medium leading-[1.55] text-muted">
                {ranking.note}
              </p>
            ) : null}

            {/* The attribution line. Never optional. */}
            <p className="mt-auto pt-5 text-[13.5px] font-semibold leading-[1.5] text-muted-light">
              {ranking.href ? (
                <a
                  href={ranking.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-[6px] text-blue-link transition-colors hover:text-navy"
                >
                  {ranking.source}, {ranking.year}
                  <ExternalLink size={13} strokeWidth={2.4} aria-hidden />
                </a>
              ) : (
                <>
                  {ranking.source}, {ranking.year}
                </>
              )}
            </p>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export function AwardCards({ awards }: { awards: Award[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {awards.map((award) => (
        <li key={`${award.title}-${award.year}`}>
          <Card className="h-full p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <span
                aria-hidden
                className="flex size-[40px] shrink-0 items-center justify-center rounded-[11px] border border-orange/20 bg-orange/[0.07] text-orange"
              >
                <AwardIcon size={19} strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <h3 className="text-[16px] font-bold leading-[1.35] tracking-[-0.01em] text-navy">
                  {award.title}
                </h3>
                <p className="mt-[5px] text-[13.5px] font-semibold text-muted-light">
                  {award.organisation}, {award.year}
                </p>
              </div>
            </div>

            {award.detail ? (
              <p className="mt-4 text-[14.5px] font-medium leading-[1.6] text-muted">
                {award.detail}
              </p>
            ) : null}
          </Card>
        </li>
      ))}
    </ul>
  );
}

/**
 * Graduate employers. No logo files ship for these fictional institutions, so
 * the wordmark is the designed state rather than a gap — the same position
 * PartnerLogo takes. Set `logo` on an employer and this switches to the file
 * with no other change.
 */
export function EmployerGrid({ employers }: { employers: Employer[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {employers.map((employer) => (
        <li
          key={employer.name}
          className="flex min-w-0 flex-col justify-center rounded-xl border border-hairline bg-white px-4 py-5 text-center"
        >
          <span className="truncate text-[14.5px] font-bold leading-[1.35] tracking-[-0.01em] text-navy">
            {employer.name}
          </span>
          {employer.sector ? (
            <span className="mt-[5px] text-[12.5px] font-medium text-muted-light">
              {employer.sector}
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
