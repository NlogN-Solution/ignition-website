import Image from "next/image";
import { ArrowUpRight, Building2, Clock } from "lucide-react";
import { Card, CardLink } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { courseImage } from "@/data/courses/imagery";
import { durationLabel, type Course } from "@/data/courses";
import { universitiesFor } from "@/data/universities";

/**
 * The card answers three questions in the order a student asks them: what is
 * this, how long does it take, and who teaches it.
 *
 * The third used to be a count — "4 universities" — which is a number nobody
 * has ever wanted. Naming them is the point: a student filtering by university
 * is looking for a name, and a student who has not filtered yet is deciding
 * whether this course exists anywhere they would go. Two names and an overflow
 * count fits the width; the full list is on the course page.
 */
export function CourseCard({ course }: { course: Course }) {
  const taughtAt = universitiesFor(course.id);
  const [first, second, ...more] = taughtAt;

  return (
    <Card interactive className="h-full overflow-hidden">
      <div className="relative aspect-[16/7] w-full overflow-hidden bg-navy/5">
        <Image
          src={courseImage(course.subject)}
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
          <span className="inline-flex items-center rounded-lg border border-white/20 bg-navy-ink/50 px-[9px] py-[4px] text-[12px] font-semibold text-white backdrop-blur-sm">
            {course.subject}
          </span>
          {/* Undergraduate is the catalogue's default and saying so on four
              cards in five is noise; the three that are not carry the badge. */}
          {course.level !== "Undergraduate" ? (
            <span className="inline-flex items-center rounded-lg border border-orange/50 bg-orange/70 px-[9px] py-[4px] text-[12px] font-semibold text-white backdrop-blur-sm">
              {course.level}
            </span>
          ) : null}
          {course.placement ? (
            <span className="inline-flex items-center rounded-lg border border-white/20 bg-navy-ink/50 px-[9px] py-[4px] text-[12px] font-semibold text-white backdrop-blur-sm">
              Placement year
            </span>
          ) : null}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-[18px] font-bold leading-[1.25] tracking-[-0.01em] text-navy sm:text-[19px]">
          <CardLink href={`/courses/${course.id}`}>{course.title}</CardLink>
        </h3>
        <p className="mt-[5px] text-[14px] font-semibold text-muted-light">
          {course.qualification}
        </p>

        <p className="mt-3 line-clamp-3 text-[14.5px] font-medium leading-[1.5] text-muted">
          {course.overview}
        </p>

        <dl className="mt-5 space-y-[10px] border-t border-hairline pt-4 text-[13.5px]">
          <div className="flex items-start gap-[9px]">
            <dt className="sr-only">Duration</dt>
            <Clock
              size={15}
              strokeWidth={2}
              aria-hidden
              className="mt-[2px] shrink-0 text-blue-link"
            />
            <dd className="min-w-0 font-medium text-ink-soft">
              {durationLabel(course.durationYears)}
              {course.placement
                ? ` · ${durationLabel(course.durationYears + 1)} with placement`
                : ""}
            </dd>
          </div>

          {first ? (
            <div className="flex items-start gap-[9px]">
              <dt className="sr-only">Taught at</dt>
              <Building2
                size={15}
                strokeWidth={2}
                aria-hidden
                className="mt-[2px] shrink-0 text-blue-link"
              />
              <dd className="min-w-0 font-medium text-ink-soft">
                {first.name}
                {second ? `, ${second.name}` : ""}
                {more.length ? (
                  <span className="text-muted-light">
                    {" "}
                    and {more.length} more
                  </span>
                ) : null}
              </dd>
            </div>
          ) : null}
        </dl>

        <div className="mt-auto flex items-center justify-between gap-4 pt-5">
          <span className="inline-flex items-center gap-[9px] text-[14.5px] font-bold text-blue-link transition-colors group-hover:text-navy">
            View course
            <ArrowUpRight
              size={16}
              strokeWidth={2.4}
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
            />
          </span>
          <Badge tone="demo">Example data</Badge>
        </div>
      </div>
    </Card>
  );
}
