import { Award as AwardIcon, ExternalLink, Trophy } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import type {
  Award,
  Employer,
  Ranking,
  RecognitionSection,
} from "@/data/universities/types";

/**
 * Rankings, awards and graduate employers.
 *
 * The one rule these three share: a claim is shown with its attribution, or it
 * is not shown. A placing with no source is a rumour, and on a page a student
 * uses to choose where to spend three years and most of a family's savings, an
 * unattributed number is worse than no number. So `Ranking.source` and
 * `Ranking.year` are both required by the type, and the card prints them under
 * every claim rather than hiding them behind a tooltip.
 *
 * `Award.year` is the one exception, and it is a deliberate one. An
 * accreditation is a standing status rather than a measurement taken in a
 * cycle — "BPS accredited", "Living Wage Employer" — and the awarding bodies
 * mostly publish no year against it. The organisation is still mandatory, so
 * the attribution never disappears; only the date does, when the source itself
 * has none to give.
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
        <li key={`${award.title}-${award.organisation}`}>
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
                  {award.year ? `${award.organisation}, ${award.year}` : award.organisation}
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

/**
 * The institution's own recognition copy, in the shape it published it.
 *
 * Everything above this point is a card grid, because a placing and an award
 * are each one self-contained claim and read best as a tile. This is not that.
 * It is prose the university wrote about itself — a sustainability programme,
 * a partner list, an alumni scheme — grouped under its own headings, and a
 * grid of tiles would break sentences into fragments and imply each fragment
 * is a comparable metric. So it stays a list, in source order, with the
 * heading the source gave it.
 *
 * The deliberate absence here is a Badge. Nothing in this block is measured or
 * attributed, and decorating it like the ranking cards would lend it authority
 * the source never claimed.
 */
export function RecognitionSections({ sections }: { sections: RecognitionSection[] }) {
  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <Card key={section.heading} className="p-5 sm:p-6">
          <h3 className="text-[16.5px] font-bold leading-[1.35] tracking-[-0.01em] text-navy">
            {section.heading}
          </h3>

          <ul className="mt-4 space-y-3">
            {section.items.map((item) => (
              <li
                key={item.label}
                className="border-t border-hairline pt-3 first:border-t-0 first:pt-0"
              >
                {/* A label with no detail is the whole item — a partner name,
                    an accreditation body. It is the line, not a heading for
                    one, so it is not styled as a lead-in to nothing. */}
                {item.detail || item.sub?.length ? (
                  <p className="text-[14.5px] font-medium leading-[1.6] text-muted">
                    <span className="font-bold text-navy">{item.label}</span>
                    {item.detail ? <> &mdash; {item.detail}</> : null}
                  </p>
                ) : (
                  <p className="text-[14.5px] font-semibold leading-[1.6] text-navy">
                    {item.label}
                  </p>
                )}

                {item.sub?.length ? (
                  <ul className="mt-2 space-y-[6px] pl-4">
                    {item.sub.map((line) => (
                      <li
                        key={line}
                        className="relative text-[14px] font-medium leading-[1.55] text-muted before:absolute before:-left-4 before:top-[9px] before:size-[5px] before:rounded-full before:bg-orange/60 before:content-['']"
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}
