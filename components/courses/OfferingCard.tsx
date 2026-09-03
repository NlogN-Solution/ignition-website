import Image from "next/image";
import { ArrowUpRight, Building2, Clock, MapPin } from "lucide-react";
import { Card, CardLink } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { courseImage } from "@/data/courses/imagery";
import { durationLabel } from "@/data/courses";
import type { Offering } from "@/lib/api/types";

/**
 * One university's offering of a course.
 *
 * The distinction from `CourseCard` is the whole point of carrying two grains.
 * A `CourseCard` says "BSc Computer Science, taught at four universities" — an
 * explainer that exists once. This says "BSc Computer Science at Coventry,
 * four years, Coventry campus" — one of ~4,800 rows, and the thing a student
 * filtering by university is actually looking at.
 *
 * The institution is therefore the second line rather than a footnote, and the
 * card links to the university, since that is the page that exists for every
 * row. The course explainer is offered as a second link only where an editor
 * has written one.
 */
export function OfferingCard({ offering }: { offering: Offering }) {
  const university = offering.university;

  return (
    <Card interactive className="h-full overflow-hidden">
      <div className="relative aspect-[16/7] w-full overflow-hidden bg-navy/5">
        <Image
          src={courseImage(offering.subject)}
          alt=""
          aria-hidden
          fill
          sizes="(min-width: 1024px) 440px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-navy-ink/70 via-navy-ink/15 to-transparent"
        />

        <span className="absolute inset-x-0 bottom-0 flex flex-wrap items-center gap-[6px] p-[13px]">
          {offering.subject ? (
            <span className="inline-flex items-center rounded-lg border border-white/20 bg-navy-ink/50 px-[9px] py-[4px] text-[12px] font-semibold text-white backdrop-blur-sm">
              {offering.subject}
            </span>
          ) : null}
          {offering.level && offering.level !== "Undergraduate" ? (
            <span className="inline-flex items-center rounded-lg border border-orange/50 bg-orange/70 px-[9px] py-[4px] text-[12px] font-semibold text-white backdrop-blur-sm">
              {offering.level}
            </span>
          ) : null}
          {offering.placement ? (
            <span className="inline-flex items-center rounded-lg border border-white/20 bg-navy-ink/50 px-[9px] py-[4px] text-[12px] font-semibold text-white backdrop-blur-sm">
              Placement year
            </span>
          ) : null}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-[18px] font-bold leading-[1.25] tracking-[-0.01em] text-navy sm:text-[19px]">
          {university ? (
            <CardLink href={`/universities/${university.slug}`}>{offering.title}</CardLink>
          ) : (
            offering.title
          )}
        </h3>
        {offering.qualification ? (
          <p className="mt-[5px] text-[14px] font-semibold text-muted-light">
            {offering.qualification}
          </p>
        ) : null}

        <dl className="mt-4 space-y-[10px] border-t border-hairline pt-4 text-[13.5px]">
          {university ? (
            <div className="flex items-start gap-[9px]">
              <dt className="sr-only">Taught at</dt>
              <Building2
                size={15}
                strokeWidth={2}
                aria-hidden
                className="mt-[2px] shrink-0 text-blue-link"
              />
              <dd className="min-w-0 font-medium text-ink-soft">{university.name}</dd>
            </div>
          ) : null}

          {offering.campus || university?.city ? (
            <div className="flex items-start gap-[9px]">
              <dt className="sr-only">Where</dt>
              <MapPin
                size={15}
                strokeWidth={2}
                aria-hidden
                className="mt-[2px] shrink-0 text-blue-link"
              />
              <dd className="min-w-0 font-medium text-ink-soft">
                {offering.campus ?? university?.city}
              </dd>
            </div>
          ) : null}

          {offering.durationYears ? (
            <div className="flex items-start gap-[9px]">
              <dt className="sr-only">Duration</dt>
              <Clock
                size={15}
                strokeWidth={2}
                aria-hidden
                className="mt-[2px] shrink-0 text-blue-link"
              />
              <dd className="min-w-0 font-medium text-ink-soft">
                {durationLabel(offering.durationYears)}
                {offering.placement
                  ? ` · ${durationLabel(offering.durationYears + 1)} with placement`
                  : ""}
              </dd>
            </div>
          ) : null}
        </dl>

        <div className="mt-auto flex items-center justify-between gap-4 pt-5">
          {offering.profileSlug ? (
            <a
              href={`/courses/${offering.profileSlug}`}
              className="relative z-10 inline-flex items-center gap-[9px] text-[14.5px] font-bold text-blue-link transition-colors hover:text-navy"
            >
              About this course
              <ArrowUpRight
                size={16}
                strokeWidth={2.4}
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
              />
            </a>
          ) : (
            <span className="inline-flex items-center gap-[9px] text-[14.5px] font-bold text-blue-link transition-colors group-hover:text-navy">
              View university
              <ArrowUpRight
                size={16}
                strokeWidth={2.4}
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
              />
            </span>
          )}
          {offering.demo ? <Badge tone="demo">Example data</Badge> : null}
        </div>
      </div>
    </Card>
  );
}
