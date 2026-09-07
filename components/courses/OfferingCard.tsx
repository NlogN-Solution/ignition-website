import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Card } from "../ui/Card";
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
  selectable = false,
  selected = false,
  onToggleSelect,
}: {
  offering: Offering;
  selectable?: boolean;
  selected?: boolean;
  onToggleSelect?: () => void;
}) {
  const university = offering.university;
  const [second, third] = courseMosaicExtras;
  const initials = university?.name.slice(0, 2).toUpperCase() ?? "—";

  return (
    <Card
      interactive
      className={`h-full overflow-hidden ${selected ? "ring-2 ring-blue-bright ring-offset-2 ring-offset-canvas" : ""}`}
    >
      <div className="relative grid h-[160px] grid-cols-[1.55fr_1fr] grid-rows-2 gap-[2px] bg-navy/5">
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

      <div className="relative flex flex-1 flex-col px-5 pb-5 sm:px-6 sm:pb-6">
        <span className="relative -mt-[26px] flex size-[56px] shrink-0 items-center justify-center rounded-full border-[3px] border-white bg-white shadow-[0_14px_30px_-16px_rgba(2,15,83,0.55)]">
          <span aria-hidden className="text-[13.5px] font-bold tracking-[0.02em] text-navy">
            {initials}
          </span>
        </span>

        <h3 className="mt-3 text-[17px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
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
            <span className="shrink-0 font-bold text-blue-link">{offering.level}</span>
          ) : null}
        </div>

        <dl className="mt-3 space-y-[8px] text-[13.5px]">
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
        <p className="mt-2 text-[11.5px] font-medium leading-[1.4] text-muted-light">
          Estimated figures for illustration — confirm exact fees and scholarship eligibility with the university.
        </p>

        <div className="mt-auto flex flex-col gap-3 pt-4">
          {offering.profileSlug ? (
            <Link
              href={`/courses/${offering.profileSlug}`}
              className="group/cta inline-flex items-center gap-[7px] self-start text-[13.5px] font-bold text-blue-link transition-colors hover:text-navy"
            >
              About this subject
              <ArrowUpRight
                size={14}
                strokeWidth={2.4}
                aria-hidden
                className="transition-transform duration-200 group-hover/cta:translate-x-[2px] group-hover/cta:-translate-y-[2px]"
              />
            </Link>
          ) : null}

          <StartApplicationButton
            tone="accent"
            className="h-[46px] w-full gap-[6px] text-[13px] uppercase tracking-[0.03em]"
            iconSize={14}
          >
            Apply now
          </StartApplicationButton>
        </div>
      </div>
    </Card>
  );
}
