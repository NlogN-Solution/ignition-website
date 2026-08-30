import { ArrowRight, Info } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/Badge";
import { Container } from "../ui/Container";
import { AccentText } from "../ui/AccentText";
import {
  nssDataIsVerified,
  nssHeadline,
  nssHowToUse,
  nssIntro,
  nssThemes,
  nssWhyItMatters,
} from "@/data/guides/nss";

/**
 * The NSS treated as a research tool a student can use, not as a statistic
 * to display.
 *
 * A single satisfaction figure in a card is the least useful form this
 * information takes: it invites a student to rank whole universities on one
 * number, which is exactly what the survey is bad at. So the section leads
 * with what the seven themes actually ask, and follows with how to read the
 * results — because "compare the same subject across universities" changes
 * how someone shortlists, and "86%" does not.
 *
 * The score column is built and empty. While `nssDataIsVerified` is false
 * every score renders as a dash against an unfilled track, the panel carries
 * the "Example data" badge, and the standing notice below explains why. That
 * is deliberate: the layout has to survive real numbers arriving, and an
 * invented number would be worse than a visible gap.
 */
export function NssSection({ id }: { id: string }) {
  return (
    <section
      id={id}
      className="scroll-mt-[calc(var(--nav-h)_+_4.5rem)] py-[clamp(2.75rem,4.5vw,4.5rem)]"
    >
      <Container>
        <div className="overflow-hidden rounded-2xl border border-hairline bg-white shadow-[0_20px_48px_-34px_rgba(1,22,111,0.35)]">
          <div className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
            <div className="border-b border-hairline p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-blue-link">
                  Student feedback
                </p>
                {!nssDataIsVerified ? <Badge tone="demo">Example data</Badge> : null}
              </div>

              <h2 className="mt-3 text-[clamp(1.5rem,2.6vw,2rem)] font-bold leading-[1.1] tracking-[-0.02em] text-navy">
                <AccentText>National Student Survey (NSS)</AccentText>
              </h2>

              <p className="mt-4 max-w-[64ch] text-[15.5px] font-medium leading-[1.65] text-ink-soft">
                {nssIntro}
              </p>

              {/* The "so what". A reader who has not accepted that the
                  survey bears on their decision will not read the method
                  below it, so this comes first. */}
              <div className="mt-6 rounded-xl border border-navy/12 bg-navy/[0.035] p-5">
                <h3 className="text-[15.5px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
                  Why should you care?
                </h3>
                <p className="mt-2 max-w-[64ch] text-[14.5px] font-medium leading-[1.65] text-ink-soft">
                  {nssWhyItMatters}
                </p>
              </div>

              <h3 className="mt-8 text-[12.5px] font-bold uppercase tracking-[0.12em] text-muted-light">
                What the survey measures
              </h3>

              <ul className="mt-4 divide-y divide-hairline border-y border-hairline">
                {nssThemes.map((theme) => (
                  <li
                    key={theme.id}
                    className="flex flex-wrap items-start justify-between gap-x-8 gap-y-2 py-[15px]"
                  >
                    <div className="min-w-0 max-w-[54ch] flex-1">
                      <h4 className="text-[15px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
                        {theme.title}
                      </h4>
                      <p className="mt-[5px] text-[14px] font-medium leading-[1.55] text-muted">
                        {theme.body}
                      </p>
                    </div>

                    {/* The score column. Present and empty until real data
                        lands — see the note at the top of this file. */}
                    <div className="w-[110px] shrink-0">
                      <p className="text-right text-[15px] font-bold tabular-nums text-faint">
                        {theme.score === null ? "—" : `${theme.score}%`}
                      </p>
                      <span
                        aria-hidden
                        className="mt-[6px] block h-[5px] w-full overflow-hidden rounded-full bg-track"
                      >
                        {theme.score !== null ? (
                          <span
                            className="block h-full rounded-full bg-blue-bright"
                            style={{ width: `${theme.score}%` }}
                          />
                        ) : null}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              {!nssDataIsVerified ? (
                <p className="mt-4 flex gap-[9px] text-[12.5px] font-medium leading-[1.5] text-muted-light">
                  <Info size={14} strokeWidth={2.2} aria-hidden className="mt-[1px] shrink-0" />
                  Scores are intentionally blank. They are filled from published
                  Office for Students results before this page goes live rather
                  than estimated here.
                </p>
              ) : null}
            </div>

            <div className="flex flex-col bg-canvas p-6 sm:p-8 lg:p-10">
              <h3 className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-muted-light">
                Headline results
              </h3>

              <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-hairline bg-hairline">
                {nssHeadline.map((stat) => (
                  <div key={stat.label} className="bg-white px-4 py-[18px]">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <p className="text-[clamp(1.375rem,2vw,1.625rem)] font-bold leading-[1.05] tracking-[-0.02em] tabular-nums text-blue-link">
                        {stat.value}
                      </p>
                      <p className="mt-[6px] text-[13.5px] font-bold leading-[1.3] text-navy">
                        {stat.label}
                      </p>
                      <p className="mt-[4px] text-[12.5px] font-medium leading-[1.45] text-muted">
                        {stat.detail}
                      </p>
                    </dd>
                  </div>
                ))}
              </dl>

              <h3 className="mt-8 text-[12.5px] font-bold uppercase tracking-[0.12em] text-muted-light">
                How to use it
              </h3>

              <ul className="mt-4 space-y-[11px] pb-7">
                {nssHowToUse.map((point) => (
                  <li key={point} className="flex gap-[10px]">
                    <span
                      aria-hidden
                      className="mt-[8px] size-[5px] shrink-0 rounded-full bg-orange"
                    />
                    <p className="text-[14px] font-medium leading-[1.6] text-ink-soft">
                      {point}
                    </p>
                  </li>
                ))}
              </ul>

              <Link
                href="/universities"
                className="group mt-auto inline-flex w-fit items-center gap-[9px] rounded-[10px] border border-hairline bg-white px-[18px] py-[12px] text-[14.5px] font-bold text-navy transition-[border-color,transform] duration-200 hover:-translate-y-[1px] hover:border-ring-idle"
              >
                Explore NSS results by university
                <ArrowRight
                  size={15}
                  strokeWidth={2.4}
                  aria-hidden
                  className="shrink-0 text-orange transition-transform duration-200 group-hover:translate-x-[3px]"
                />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
