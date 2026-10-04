import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "../ui/Badge";
import { courseImage, courseMosaicExtras } from "@/data/courses/imagery";
import { durationLabel, type Course } from "@/data/courses";
import type { University } from "@/data/universities";

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

/**
 * Styled to match `OfferingCard` exactly — same photo mosaic, monogram,
 * spec rows and Apply Now button — because a student shouldn't be able to
 * tell "this came from the homepage" from "this came from a search result".
 *
 * The honest difference underneath: an `Offering` is one university's
 * instance of a course, with its own real fee and a real application waiting
 * at the end of the button. A `Course` here is the subject itself — taught
 * at several universities, each setting its own price — so the photo, fee
 * and location shown are one university that teaches it (see
 * `pickExampleUniversities` below), marked as example data for the same
 * reason every other estimated figure on the site is: it illustrates the
 * shape of the number, not a quote from a specific institution.
 */
/**
 * Matched by subject, not by `course.universities`' own id list: the
 * editorial course catalogue and the live university catalogue are fetched
 * from different sources (one falls back to static demo data independently
 * of the other, and which one is "live" can change mid-session as a backend
 * comes online), so their ids aren't guaranteed to line up — subject is the
 * one join that holds regardless of which side is live.
 *
 * A real tuition figure (`min > 0`) is preferred over a subject match with
 * none, so "Tuition from £0" never renders just because the matched record
 * hasn't had its fees entered yet. Picks avoid repeating a university across
 * the cards where a different real match exists — every card crediting the
 * same institution reads as a bug, not a coincidence — but will still reuse
 * one rather than show nothing if that's genuinely the only match.
 */
function pickExampleUniversities(courses: Course[], universities: University[]) {
  const used = new Set<string>();

  return courses.map((course) => {
    const candidates = universities.filter((u) => u.subjects.includes(course.subject));
    const pool = candidates.length ? candidates : universities;

    const pick =
      pool.find((u) => !used.has(u.id) && u.tuition.min > 0) ??
      pool.find((u) => !used.has(u.id)) ??
      pool.find((u) => u.tuition.min > 0) ??
      pool[0] ??
      null;

    if (pick) used.add(pick.id);
    return pick;
  });
}

export function PopularCourses({
  courses,
  universities,
}: {
  courses: Course[];
  universities: University[];
}) {
  const examples = pickExampleUniversities(courses, universities);

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course, index) => {
        const example = examples[index];
        const [second, third] = courseMosaicExtras;
        const initials = example?.monogram ?? example?.name.slice(0, 2).toUpperCase() ?? "—";

        return (
          <li key={course.id} className="min-w-0">
            <div className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-hairline bg-white shadow-[0_8px_24px_-14px_rgba(10,14,28,0.18)] transition-[box-shadow,transform] duration-200 hover:-translate-y-[2px] hover:shadow-[0_20px_40px_-16px_rgba(10,14,28,0.24)]">
              <div className="relative grid h-[160px] grid-cols-[1.55fr_1fr] grid-rows-2 gap-[2px] bg-navy/5">
                <div className="relative row-span-2 overflow-hidden">
                  <Image
                    src={courseImage(course.subject)}
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

                <Badge tone="demo" className="absolute right-3 top-3">
                  Example data
                </Badge>
              </div>

              <div className="relative flex flex-1 flex-col px-5 pb-5 sm:px-6 sm:pb-6">
                <span className="relative -mt-[26px] flex size-[56px] shrink-0 items-center justify-center rounded-full border-[3px] border-white bg-white shadow-[0_14px_30px_-16px_rgba(2,15,83,0.55)]">
                  <span aria-hidden className="text-[13.5px] font-bold tracking-[0.02em] text-navy">
                    {initials}
                  </span>
                </span>

                <h3 className="mt-3 text-[17px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
                  <Link
                    href={`/courses/${course.id}`}
                    className="transition-colors duration-200 hover:text-blue-link"
                  >
                    {course.title} {course.qualification}
                  </Link>
                </h3>

                {example ? (
                  <p className="mt-[4px] text-[14px] font-semibold leading-[1.4] text-muted">
                    e.g. {example.name}
                  </p>
                ) : null}

                <div className="mt-3 flex items-center justify-between gap-3 border-t border-hairline pt-3 text-[13.5px]">
                  <span className="min-w-0 truncate font-medium text-muted">
                    {example?.city ?? "—"}
                  </span>
                  <span className="shrink-0 font-bold text-[#2450dc]">{course.level}</span>
                </div>

                <dl className="mt-3 space-y-[8px] text-[13.5px]">
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="font-medium text-muted">Tuition from:</dt>
                    <dd className="font-bold tabular-nums text-navy">
                      {example && example.tuition.min > 0 ? gbp.format(example.tuition.min) : "Varies"}
                    </dd>
                  </div>
                  {example?.scholarships[0] ? (
                    <div className="flex items-baseline justify-between gap-3">
                      <dt className="font-medium text-muted">Scholarship:</dt>
                      <dd className="font-bold tabular-nums text-navy">
                        {example.scholarships[0].amount}
                      </dd>
                    </div>
                  ) : null}
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="font-medium text-muted">Duration:</dt>
                    <dd className="font-bold text-navy">
                      {durationLabel(course.durationYears)}
                      {course.placement ? " with placement" : ""}
                    </dd>
                  </div>
                </dl>
                <p className="mt-2 text-[11.5px] font-medium leading-[1.4] text-muted-light">
                  Figures from one university that teaches this course — fees and
                  scholarships are set per institution, so confirm with the one you apply to.
                </p>

                <div className="mt-auto pt-4">
                  <Link
                    href={`/courses/${course.id}`}
                    className="group/cta flex h-[46px] w-full items-center justify-center gap-[6px] rounded-[10px] bg-orange text-[13px] font-bold uppercase tracking-[0.03em] text-white transition-colors duration-200 hover:brightness-[0.94]"
                  >
                    Apply now
                    <ArrowUpRight
                      size={14}
                      strokeWidth={2.4}
                      aria-hidden
                      className="shrink-0 transition-transform duration-200 group-hover/cta:translate-x-[2px] group-hover/cta:-translate-y-[2px]"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
