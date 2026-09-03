import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Card, CardLink } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { UniversityLogo } from "./UniversityLogo";
import { universityImagery } from "@/data/universities/imagery";
import type { University } from "@/data/universities";
import { isExampleRecord } from "@/lib/api/catalogue";

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

/**
 * The card's job is to identify the university and get out of the way.
 *
 * It used to lead with a location chip and three rows of figures, which made
 * every card in the grid look the same at a glance — the shape a student
 * scans is a block of numbers, and the numbers are the part that differs
 * least. The photograph leads now, because the first question asked of a grid
 * is "which one is this" and a picture answers it before any label does; the
 * figures drop to two, the tuition range that students filter on and the count
 * of what else is inside. Everything more detailed is one click away on the
 * page, where there is room to source it properly.
 *
 * The logo sits half over the image edge, which is what stops the two reading
 * as unrelated blocks stacked in a box.
 *
 * It is deliberately short. The first version carried a 16:8 photograph, a
 * three-line tagline, a two-row definition list and a badge row, which made a
 * card taller than the viewport slot it sits in and pushed the second row of
 * results off the screen — the exact problem the filter rail was built to
 * fix. The tagline is clamped, the figures are one line, and everything that
 * can overflow is now allowed to truncate.
 */
export function UniversityCard({ university }: { university: University }) {
  const { card } = universityImagery(university.id);

  return (
    <Card interactive className="h-full overflow-hidden">
      <div className="relative aspect-[16/7] w-full overflow-hidden bg-navy/5">
        <Image
          src={card}
          alt=""
          aria-hidden
          fill
          sizes="(min-width: 1024px) 440px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-navy-ink/55 via-navy-ink/5 to-transparent"
        />

        {university.placementYear ? (
          <span className="absolute right-[13px] top-[13px] inline-flex items-center rounded-lg border border-white/20 bg-navy-ink/50 px-[9px] py-[4px] text-[12px] font-semibold text-white backdrop-blur-sm">
            Placement year
          </span>
        ) : null}
      </div>

      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        <div className="absolute -top-[26px] left-5 sm:left-6">
          <UniversityLogo university={university} size="sm" tone="onImage" />
        </div>

        <h3 className="mt-[22px] text-[18px] font-bold leading-[1.25] tracking-[-0.01em] text-navy sm:text-[19px]">
          <CardLink href={`/universities/${university.id}`}>
            {university.name}
          </CardLink>
        </h3>

        <p className="mt-[7px] flex min-w-0 items-center gap-[6px] text-[13.5px] font-semibold text-muted">
          <MapPin
            size={13}
            strokeWidth={2.4}
            aria-hidden
            className="shrink-0 text-orange"
          />
          <span className="truncate">
            {university.city}
            {university.kind ? ` · ${university.kind}` : ""}
          </span>
        </p>

        {university.tagline ? (
          <p className="mt-[10px] line-clamp-2 text-[14.5px] font-medium leading-[1.5] text-muted">
            {university.tagline}
          </p>
        ) : null}

        {/* Two figures, and only where there is a figure. A card reading
            "Tuition £0–£0" is worse than a card that says nothing about fees. */}
        {university.tuition.min > 0 || university.scholarships.length > 0 ? (
          <dl className="mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-1 border-t border-hairline pt-4 text-[13.5px]">
            {university.tuition.min > 0 ? (
              <div className="flex min-w-0 items-baseline gap-[7px]">
                <dt className="shrink-0 font-medium text-muted">Tuition</dt>
                <dd className="truncate font-semibold text-ink">
                  {gbp.format(university.tuition.min)}–{gbp.format(university.tuition.max)}
                </dd>
              </div>
            ) : null}
            {university.scholarships.length > 0 ? (
              <div className="flex min-w-0 items-baseline gap-[7px]">
                <dt className="shrink-0 font-medium text-muted">Scholarships</dt>
                <dd className="font-semibold text-ink">{university.scholarships.length}</dd>
              </div>
            ) : null}
          </dl>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-4 pt-5">
          <span className="inline-flex items-center gap-[9px] text-[14.5px] font-bold text-blue-link transition-colors group-hover:text-navy">
            Explore university
            <ArrowUpRight
              size={16}
              strokeWidth={2.4}
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
            />
          </span>
          {isExampleRecord(university) ? <Badge tone="demo">Example data</Badge> : null}
        </div>
      </div>
    </Card>
  );
}
