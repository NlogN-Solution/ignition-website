/** @jsxImportSource react */
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Badge } from "../ui/Badge";
import { StartApplicationButton } from "../apply/StartApplicationButton";
import { courseImage, courseMosaicExtras } from "@/data/courses/imagery";
import { durationLabel } from "@/data/courses";
import { exampleScholarship, exampleTuition } from "@/lib/courses/estimatedFees";
import type { Offering } from "@/lib/api/types";

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 2,
});

export function OfferingCard({
  offering,
  /** Renders the compare checkbox — only wanted where a compare tray exists to act on it. */
  realData = false,
  compact = false,
  roomy = false,
  selectable = false,
  selected = false,
  onToggleSelect,
}: {
  offering: Offering;
  realData?: boolean;
  compact?: boolean;
  roomy?: boolean;
  selectable?: boolean;
  selected?: boolean;
  onToggleSelect?: () => void;
}) {
  const university = offering.university;
  const [second, third] = courseMosaicExtras;
  const initials = university?.name.slice(0, 2).toUpperCase() ?? "—";

  if (compact) {
    const href = `/courses/at/${offering.slug}`;
    const location = offering.campus || university?.city;
    const monogram = university?.name.split(/\s+/).filter(word => !["of", "the", "and"].includes(word.toLowerCase())).slice(0, 2).map(word => word[0]).join("").toUpperCase() || "—";
    const tag = "inline-flex min-h-[22px] items-center rounded border border-hairline bg-canvas px-2 py-0.5 text-xs font-medium leading-4 text-muted";

    return (
      <article aria-label={offering.title} className={`group rounded-[9px] border bg-white p-3.5 transition-colors duration-150 hover:border-navy/35 sm:p-4 ${selected ? "border-navy ring-1 ring-navy" : "border-hairline"}`}>
        <div className="flex items-start gap-3">
          <span aria-hidden className="flex size-8 shrink-0 items-center justify-center rounded-md border border-hairline bg-canvas text-[11px] font-bold text-navy">{monogram}</span>
          <div className="min-w-0 flex-1">
            <h3 className="text-[17px] font-bold leading-[1.3] tracking-[-0.01em] text-navy sm:text-[18px]">
              <Link href={href} className="line-clamp-2 rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy">{offering.title}</Link>
            </h3>
            {(university || location) && <p className="mt-0.5 text-[13px] leading-[18px] text-muted">{university?.name}{university && location ? " · " : ""}{location}</p>}
          </div>
          {selectable && <button type="button" onClick={onToggleSelect} aria-pressed={selected} aria-label={selected ? `Remove ${offering.title} from comparison` : `Add ${offering.title} to comparison`} className={`flex size-8 shrink-0 items-center justify-center rounded-md border transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${selected ? "border-navy bg-navy text-white" : "border-hairline bg-white text-muted hover:border-navy"}`}><Check size={15} aria-hidden /></button>}
        </div>

        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {offering.level && <span className={tag}>{offering.level}</span>}
          {offering.qualification && offering.qualification !== offering.level && <span className={tag}>{offering.qualification}</span>}
          {offering.placement && <span className={tag}>Placement available</span>}
          {offering.demo && <Badge tone="demo">Example data</Badge>}
        </div>

        <dl className={`mt-2 grid grid-cols-2 gap-x-5 gap-y-2 ${offering.intake ? "sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]" : "sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"}`}>
          <div className="min-w-0"><dt className="text-[11px] leading-4 text-muted">Tuition fee</dt><dd className="line-clamp-2 text-[13px] font-semibold leading-[18px] text-navy">{offering.feeText || "Not provided"}</dd></div>
          <div className="min-w-0"><dt className="text-[11px] leading-4 text-muted">Duration</dt><dd className="text-[13px] font-semibold leading-[18px] text-navy">{offering.durationYears ? durationLabel(offering.durationYears) : "Not provided"}</dd></div>
          {offering.intake && <div className="min-w-0"><dt className="text-[11px] leading-4 text-muted">Intake</dt><dd className="line-clamp-2 text-[13px] font-semibold leading-[18px] text-navy">{offering.intake}</dd></div>}
        </dl>

        <div className="mt-2 flex items-end justify-between gap-3">
          {offering.scholarshipText && <p className="min-w-0 flex-1 line-clamp-1 text-xs leading-5 text-muted"><span className="font-semibold">Scholarship: </span>{offering.scholarshipText}</p>}
          <Link href={href} className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-sm text-[13px] font-semibold leading-5 text-navy hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy">View course <ArrowRight size={14} aria-hidden /></Link>
        </div>
      </article>
    );
  }

  return (
    <div
      className={`group flex h-full flex-col overflow-hidden rounded-[20px] border border-hairline bg-white shadow-[0_8px_24px_-14px_rgba(10,14,28,0.18)] transition-[box-shadow,transform] duration-200 hover:-translate-y-[2px] hover:shadow-[0_20px_40px_-16px_rgba(10,14,28,0.24)] ${roomy ? "min-h-[550px]" : ""} ${selected ? "ring-2 ring-blue-bright ring-offset-2 ring-offset-canvas" : ""}`}
    >
      <div className={`relative grid shrink-0 grid-cols-[1.55fr_1fr] grid-rows-2 gap-[2px] bg-navy/5 ${roomy ? "h-[180px]" : "h-[160px]"}`}>
        <div className="relative row-span-2 overflow-hidden">
          <Image
            src={courseImage(offering.subject)}
            alt=""
            aria-hidden
            fill
            sizes="(min-width: 1024px) 270px, (min-width: 640px) 210px, 60vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
        <div className="relative overflow-hidden">
          <Image src={second} alt="" aria-hidden fill sizes="140px" className="object-cover" />
        </div>
        <div className="relative overflow-hidden">
          <Image src={third} alt="" aria-hidden fill sizes="140px" className="object-cover" />
        </div>

        {offering.demo ? (
          <Badge tone="demo" className="absolute right-3 top-3">
            Example data
          </Badge>
        ) : null}

        {selectable ? (
          <button
            type="button"
            onClick={onToggleSelect}
            aria-pressed={selected}
            aria-label={selected ? `Remove ${offering.title} from comparison` : `Add ${offering.title} to comparison`}
            className={`absolute left-3 top-3 flex size-[28px] items-center justify-center rounded-full border-2 transition-colors duration-150 ${
              selected
                ? "border-blue-bright bg-blue-bright text-white"
                : "border-white/80 bg-navy-ink/25 text-transparent backdrop-blur-sm hover:border-white"
            }`}
          >
            <Check size={15} strokeWidth={3} />
          </button>
        ) : null}
      </div>

      <div className={`relative flex flex-1 flex-col ${roomy ? "px-6 pb-5 sm:px-7" : "px-5 pb-5 sm:px-6 sm:pb-6"}`}>
        <span className="relative -mt-[26px] flex size-[56px] shrink-0 items-center justify-center rounded-full border-[3px] border-white bg-white shadow-[0_14px_30px_-16px_rgba(2,15,83,0.55)]">
          <span aria-hidden className="text-[13.5px] font-bold tracking-[0.02em] text-navy">
            {initials}
          </span>
        </span>

        <h3 className={`font-bold leading-[1.3] tracking-[-0.01em] text-navy ${roomy ? "mt-4 text-[20px]" : "mt-3 text-[17px]"}`}>
          <Link
            href={`/courses/at/${offering.slug}`}
            className="transition-colors duration-200 hover:text-blue-link"
          >
            {offering.title}
          </Link>
        </h3>

        {university ? (
          <p className="mt-[4px] text-[14px] font-semibold leading-[1.4] text-muted">
            {university.name}
          </p>
        ) : null}

        <div className="mt-3 flex items-center justify-between gap-3 border-t border-hairline pt-3 text-[13.5px]">
          <span className="min-w-0 truncate font-medium text-muted">
            {offering.campus ?? university?.city ?? "—"}
          </span>
          {offering.level ? (
            // A literal blue rather than the site's `navy` token: this tag is
            // the one place on the card meant to read as a category chip, not
            // as brand ink, and the reference this card matches keeps it
            // visually distinct from the navy price figures below it.
            <span className="shrink-0 font-bold text-[#2450dc]">{offering.level}</span>
          ) : null}
        </div>

        <dl className={roomy ? "mt-3 space-y-2 text-[14px]" : "mt-3 space-y-[8px] text-[13.5px]"}>
          {realData ? (
            <>
              <div><dt className="font-medium text-muted">Tuition fee</dt><dd className="mt-1 whitespace-pre-line text-sm font-semibold text-navy">{offering.feeText || "Not provided"}</dd></div>
              <div><dt className="font-medium text-muted">Scholarship</dt><dd className="mt-1 whitespace-pre-line text-sm font-semibold text-navy">{offering.scholarshipText || "Not provided"}</dd></div>
              {offering.intake && <div><dt className="font-medium text-muted">Intake</dt><dd className="font-semibold text-navy">{offering.intake}</dd></div>}
            </>
          ) : <>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="font-medium text-muted">Tuition Fee:</dt>
            <dd className="font-bold tabular-nums text-navy">
              {gbp.format(exampleTuition(offering.slug))}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="font-medium text-muted">Application Fee:</dt>
            <dd className="font-bold tabular-nums text-navy">{gbp.format(0)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="font-medium text-muted">Scholarship:</dt>
            <dd className="font-bold tabular-nums text-navy">
              Up to {gbp.format(exampleScholarship(offering.slug))}
            </dd>
          </div>
          </>}
          {offering.durationYears ? (
            <div className="flex items-baseline justify-between gap-3">
              <dt className="font-medium text-muted">Duration:</dt>
              <dd className="font-bold text-navy">
                {durationLabel(offering.durationYears)}
                {offering.placement ? " with placement" : ""}
              </dd>
            </div>
          ) : null}
        </dl>
        {!realData && <p className="mt-2 text-[11.5px] font-medium leading-[1.4] text-muted-light">
          Estimated figures for illustration — confirm exact fees and scholarship eligibility with the university.
        </p>}

        <div className="mt-auto flex flex-col gap-3 pt-4">
          {/* The card has always known which offering it is. Handing the
              slug over is what stops the portal asking the student to find
              the same course again after they register. */}
          <StartApplicationButton
            tone="accent"
            className="h-[46px] w-full gap-[6px] rounded-[10px] text-[13px] uppercase tracking-[0.03em]"
            iconSize={14}
            courseSlug={offering.slug}
          >
            Apply now
          </StartApplicationButton>
        </div>
      </div>
    </div>
  );
}
