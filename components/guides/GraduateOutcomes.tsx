import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Container } from "../ui/Container";
import { AccentText } from "../ui/AccentText";
import {
  outcomeOrganisations,
  type OutcomeOrganisation,
  outcomesAreIllustrative,
  outcomeStats,
} from "@/data/guides/outcomes";
import backdrop from "@/public/images/campus.webp";
import railBackdrop from "@/public/images/why-uk-hero.png";
import nvidia from "@/public/images/nvidia-logo.png";
import microsoft from "@/public/images/microsoft-logo.png";
import amazon from "@/public/images/amazon-logo.png";
import jpmorgan from "@/public/images/jp-morgon-logo.png";
import nhs from "@/public/images/nhs-logo.png";
import liverpool from "@/public/images/liverpool-logo.png";

/**
 * "Where does this lead?" answered before the page starts explaining how the
 * system works — a student deciding whether to read on wants the destination
 * first and the mechanics second.
 *
 * THE HEADING IS THE CAREFUL PART. "From UK universities to global careers"
 * is a claim about UK degrees. "Our graduates work at NVIDIA and Microsoft"
 * is a claim about Ignition's alumni, and Ignition has no data to support it.
 * The first is both true and the thing the reader is actually asking; the
 * second is what every consultancy writes. Do not drift back toward it.
 *
 * THE LOGO WALL follows from that. It is the visual grammar of a partnership
 * page, so two things carry the disclosure: the "Example data" badge beside
 * the eyebrow, and the label over the wall itself — "Examples of
 * organisations that employ UK graduates". A longer footnote used to sit
 * under the statistics and was cut for length. Those two remaining pieces are
 * now the whole of it, so neither can be trimmed as well; without them the
 * wall asserts a partnership that does not exist.
 *
 * TWO BACKDROPS, DOING DIFFERENT JOBS. A campus photograph sits behind the
 * whole band under a heavy white wash, so the section reads as a place rather
 * than a table. The statistics then sit on their own dark photographic plate,
 * which gives the section a second beat and stops the numbers reading as a
 * third row of logo tiles.
 */

/**
 * Static imports rather than paths held in the data file: they hand Next the
 * intrinsic dimensions at build time, which is what makes `height` + `width:
 * auto` scale each mark exactly. Sizing a string `src` meant either guessing
 * a ratio or filling a percentage box, and both quietly rendered the wide
 * wordmarks at a fraction of their intended size.
 */
const logos: Record<OutcomeOrganisation["id"], StaticImageData> = {
  nvidia,
  microsoft,
  amazon,
  jpmorgan,
  nhs,
  liverpool,
};

export function GraduateOutcomes({ id }: { id: string }) {
  return (
    <section
      id={id}
      className="relative isolate scroll-mt-[calc(var(--nav-h)_+_4.5rem)] overflow-hidden border-b border-hairline bg-white py-[clamp(2.75rem,4.5vw,4.5rem)]"
    >
      <Image
        src={backdrop}
        alt=""
        aria-hidden
        priority
        sizes="100vw"
        /* Pulled back toward neutral: the source is a warm golden-hour
           photograph and the section's own palette is navy and royal blue, so
           at full saturation the backdrop reads as a different brand. */
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_62%] saturate-[0.55]"
      />

      {/* Three washes. A flat floor that guarantees contrast everywhere, a
          left-weighted gradient so the heading column sits on plain white
          while the picture survives on the right behind the tiles, and a
          top-and-bottom fade so the band resolves into its neighbours instead
          of ending on a hard seam. */}
      <span aria-hidden className="absolute inset-0 -z-10 bg-white/[0.72]" />
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,#fff_0%,rgba(255,255,255,0.95)_28%,rgba(255,255,255,0.6)_62%,rgba(255,255,255,0.78)_100%)]"
      />
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,#fff_0%,rgba(255,255,255,0)_22%,rgba(255,255,255,0)_74%,rgba(255,255,255,0.85)_100%)]"
      />

      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-center lg:gap-12">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-blue-link">
                After you graduate
              </p>
              {outcomesAreIllustrative ? (
                <Badge tone="demo">Example data</Badge>
              ) : null}
            </div>

            <h2 className="mt-3 text-[clamp(1.625rem,2.8vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-navy">
              <AccentText>From UK universities to global careers.</AccentText>
            </h2>

            <p className="mt-4 max-w-[50ch] text-[16px] font-medium leading-[1.6] text-muted">
              UK graduates enter industries and organisations around the world —
              technology, finance, engineering, healthcare, consulting, media
              and sport — both in the UK and in the country they came from.
            </p>

            <Link
              href="/careers"
              className="group mt-6 inline-flex items-center gap-[9px] text-[15px] font-bold text-blue-link transition-colors duration-200 hover:text-navy"
            >
              Explore careers and where they lead
              <ArrowRight
                size={16}
                strokeWidth={2.4}
                aria-hidden
                className="shrink-0 transition-transform duration-200 group-hover:translate-x-[3px]"
              />
            </Link>
          </div>

          <div>
            <p className="flex items-center gap-[7px] text-[12.5px] font-semibold uppercase tracking-[0.1em] text-muted-light">
              <Building2 size={14} strokeWidth={2.2} aria-hidden className="text-faint" />
              Examples of organisations that employ UK graduates
            </p>

            <ul className="mt-4 grid grid-cols-2 gap-[10px] sm:grid-cols-3">
              {outcomeOrganisations.map((org) => (
                <li key={org.id}>
                  <div className="group flex h-full flex-col items-center justify-center rounded-xl border border-hairline bg-white px-4 py-[18px] shadow-[0_14px_34px_-26px_rgba(1,22,111,0.4)] transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-[2px] hover:border-ring-idle hover:shadow-[0_22px_44px_-24px_rgba(1,22,111,0.4)]">
                    {/* `max-w-full` with `object-contain` rather than a hard
                        width: if a very wide wordmark ever outgrows a narrow
                        tile it letterboxes instead of squashing. The mark is
                        the organisation's name, so the image carries it as alt
                        text and the visible caption is the sector — the
                        informative half. */}
                    <span className="flex h-[56px] w-full items-center justify-center">
                      <Image
                        src={logos[org.id]}
                        alt={org.name}
                        sizes="220px"
                        style={{ height: org.logoHeight }}
                        className="w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.05]"
                      />
                    </span>

                    <p className="mt-[10px] text-center text-[11.5px] font-semibold leading-[1.35] text-muted-light">
                      {org.sector}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The statistics, on their own dark plate. These are the only figures
            in this part of the page and they should look like it; left on
            white they read as a third row of logo tiles. The scrim is heavy
            enough that white type clears contrast against the brightest part
            of the photograph rather than against its average. */}
        <div className="relative isolate mt-9 overflow-hidden rounded-2xl border border-navy/20 shadow-[0_26px_56px_-34px_rgba(1,22,111,0.6)]">
          {/* Cropped to the bridge and the river at the foot of the frame,
              which is the part of this photograph the hero does not show —
              the same file, but not the same picture. The 500px campus shot
              that was here before was being stretched to 1160 and read as
              mud; this one is 1536 wide and holds up. */}
          <Image
            src={railBackdrop}
            alt=""
            aria-hidden
            sizes="(max-width: 1024px) 100vw, 1160px"
            quality={88}
            className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_74%]"
          />
          {/* Light enough to see the photograph, dark enough that white type
              still clears roughly 9:1 against the brightest thing in the crop
              rather than against its average.
              
              THIS IS WHY THE LABELS ARE WHITE AND NOT ORANGE. They were
              orange while the scrim was near-solid navy, where the brand
              orange clears 4.5:1. Letting the picture through drops that to
              about 2.9:1 over the pale sky — under the threshold for 14px
              bold text. The accent moved to the rule above each figure, which
              is decorative and carries no contrast requirement. Do not put
              orange type back on this plate without re-checking it. */}
          <span
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(1,22,111,0.82)_0%,rgba(1,22,111,0.74)_45%,rgba(2,15,83,0.78)_100%)]"
          />

          <dl className="grid divide-y divide-white/[0.14] sm:grid-cols-2 sm:divide-y-0 sm:[&>*:nth-child(n+3)]:border-t sm:[&>*:nth-child(even)]:border-l lg:grid-cols-4 lg:[&>*:nth-child(n+2)]:border-l lg:[&>*:nth-child(n+3)]:border-t-0">
            {outcomeStats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col border-white/[0.14] px-5 py-[26px] sm:px-6 sm:py-[32px]"
              >
                {/* Value first visually, label second — but the label is the
                    term and the value defines it, so `order` reshuffles the
                    presentation without inverting the markup or duplicating
                    the label into a screen-reader-only copy. */}
                <span
                  aria-hidden
                  className="order-1 mb-[14px] block h-[3px] w-[26px] rounded-full bg-orange"
                />

                <dd className="order-2">
                  <p
                    className={`font-bold leading-[1.05] tracking-[-0.025em] text-white ${
                      /^[\d£]/.test(stat.value)
                        ? "text-[clamp(1.875rem,2.9vw,2.375rem)] tabular-nums"
                        : "text-[clamp(1.125rem,1.7vw,1.375rem)]"
                    }`}
                  >
                    {stat.value}
                  </p>
                </dd>

                <dt className="order-3 mt-[8px] text-[14px] font-bold leading-[1.35] text-white">
                  {stat.label}
                </dt>

                <dd className="order-4 mt-[6px] text-[13px] font-medium leading-[1.5] text-white/75">
                  {stat.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>

      </Container>
    </section>
  );
}
