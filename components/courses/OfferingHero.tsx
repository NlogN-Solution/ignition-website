import Image from "next/image";
import Link from "next/link";
import { Building2, Clock, GraduationCap, Layers, MapPin } from "lucide-react";
import { Container } from "../ui/Container";
import { Breadcrumbs } from "../layout/Breadcrumbs";
import { courseImage } from "@/data/courses/imagery";
import { durationLabel } from "@/data/courses";
import type { OfferingDetail } from "@/lib/api/types";

/**
 * The header for one university's offering of a course.
 *
 * Built on `CourseHero`'s block, with one deliberate difference: the
 * institution is a **link in the header**, not a chip at the bottom. This page
 * exists because a course at Worcester is not the same product as the same
 * course at Hertfordshire, so the university is half the title — and a student
 * who arrived from a search result needs the way back to it to be obvious
 * rather than buried under the fold.
 *
 * There is no "Example data" badge. `CourseHero` prints one unconditionally
 * because every record behind it is fictional. Every record behind this one
 * came from the intake workbook, so the badge is shown only when the row
 * actually says so.
 */
export function OfferingHero({ offering }: { offering: OfferingDetail }) {
  const university = offering.university;
  const place = offering.campus ?? offering.city ?? university?.city;

  return (
    <header className="relative isolate flex min-h-[clamp(340px,34vw,420px)] flex-col overflow-hidden bg-navy-ink">
      <Image
        src={courseImage(offering.subject)}
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,15,83,0.9)_0%,rgba(2,15,83,0.62)_28%,rgba(2,15,83,0.22)_62%,rgba(2,15,83,0.06)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(2,15,83,0.55)_0%,rgba(2,15,83,0.12)_45%,rgba(2,15,83,0)_75%)]"
      />

      <Container className="relative flex flex-1 flex-col pb-[clamp(1.5rem,2.5vw,2.25rem)] pt-6 lg:pt-7">
        <Breadcrumbs
          tone="inverse"
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Courses", href: "/courses" },
            ...(university
              ? [{ label: university.name, href: `/universities/${university.slug}` }]
              : []),
            { label: offering.title, href: `/courses/at/${offering.slug}` },
          ]}
        />

        <div className="mt-auto max-w-[68ch] pt-[clamp(2rem,5vw,3.25rem)]">
          {offering.subject ? (
            <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-orange [text-shadow:0_1px_12px_rgba(2,15,83,0.6)]">
              {offering.subject}
            </p>
          ) : null}

          <h1 className="mt-[10px] text-[clamp(1.875rem,3.6vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.024em] text-white [text-shadow:0_2px_18px_rgba(2,15,83,0.5)]">
            {offering.title}
          </h1>

          {university ? (
            <p className="mt-3 flex flex-wrap items-center gap-x-[10px] gap-y-1 text-[clamp(0.9375rem,1.1vw,1.0625rem)] font-semibold text-white/90 [text-shadow:0_1px_12px_rgba(2,15,83,0.55)]">
              <Building2 size={16} strokeWidth={2.2} aria-hidden className="shrink-0" />
              <Link
                href={`/universities/${university.slug}`}
                className="underline decoration-white/35 underline-offset-[5px] transition-colors hover:decoration-white"
              >
                {university.name}
              </Link>
              {place ? (
                <>
                  <MapPin size={15} strokeWidth={2.2} aria-hidden className="shrink-0 opacity-80" />
                  <span className="font-medium text-white/80">{place}</span>
                </>
              ) : null}
            </p>
          ) : null}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {offering.qualification ? (
            <HeroChip icon={<GraduationCap size={14} strokeWidth={2.2} aria-hidden />}>
              {offering.qualification}
            </HeroChip>
          ) : null}
          {offering.level ? (
            <HeroChip icon={<Layers size={14} strokeWidth={2.2} aria-hidden />}>
              {offering.level}
            </HeroChip>
          ) : null}
          {offering.durationYears ? (
            <HeroChip icon={<Clock size={14} strokeWidth={2.2} aria-hidden />}>
              {durationLabel(offering.durationYears)}
              {offering.placement
                ? ` · ${durationLabel(offering.durationYears + 1)} with placement`
                : ""}
            </HeroChip>
          ) : null}
          {offering.placement ? <HeroChip>Placement year available</HeroChip> : null}
          {offering.demo ? (
            <span className="inline-flex items-center rounded-lg border border-orange/50 bg-orange/25 px-[11px] py-[5px] text-[13px] font-semibold text-white backdrop-blur-sm">
              Example data
            </span>
          ) : null}
        </div>
      </Container>
    </header>
  );
}

/** The badge language, restated for a dark ground where `Badge` would vanish. */
function HeroChip({
  icon,
  children,
}: {
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-[7px] rounded-lg border border-white/20 bg-white/10 px-[11px] py-[5px] text-[13px] font-semibold text-white backdrop-blur-sm">
      {icon}
      {children}
    </span>
  );
}
