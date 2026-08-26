import Image from "next/image";
import { Clock, GraduationCap, Layers } from "lucide-react";
import { Container } from "../ui/Container";
import { Breadcrumbs } from "../layout/Breadcrumbs";
import { courseImage } from "@/data/courses/imagery";
import { durationLabel, type Course } from "@/data/courses";

/**
 * The course header, built on the same block as the university one.
 *
 * Same reasoning, same construction: one bottom-weighted gradient for the type
 * and a soft one from the left, over a photograph at full strength. The
 * picture is chosen by subject rather than by course — see
 * data/courses/imagery.ts for why that is the right grain.
 */
export function CourseHero({ course }: { course: Course }) {
  return (
    <header className="relative isolate flex min-h-[clamp(340px,34vw,420px)] flex-col overflow-hidden bg-navy-ink">
      <Image
        src={courseImage(course.subject)}
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
            { label: course.title, href: `/courses/${course.id}` },
          ]}
        />

        <div className="mt-auto max-w-[68ch] pt-[clamp(2rem,5vw,3.25rem)]">
          <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-orange [text-shadow:0_1px_12px_rgba(2,15,83,0.6)]">
            {course.subject}
          </p>

          <h1 className="mt-[10px] text-[clamp(1.875rem,3.6vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.024em] text-white [text-shadow:0_2px_18px_rgba(2,15,83,0.5)]">
            {course.title}
          </h1>

          <p className="mt-3 text-[clamp(0.9375rem,1.1vw,1.0625rem)] font-medium leading-[1.55] text-white/85 [text-shadow:0_1px_12px_rgba(2,15,83,0.55)]">
            {course.overview}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <HeroChip icon={<GraduationCap size={14} strokeWidth={2.2} aria-hidden />}>
            {course.qualification}
          </HeroChip>
          <HeroChip icon={<Layers size={14} strokeWidth={2.2} aria-hidden />}>
            {course.level}
          </HeroChip>
          <HeroChip icon={<Clock size={14} strokeWidth={2.2} aria-hidden />}>
            {durationLabel(course.durationYears)}
            {course.placement
              ? ` · ${durationLabel(course.durationYears + 1)} with placement`
              : ""}
          </HeroChip>
          <span className="inline-flex items-center rounded-lg border border-orange/50 bg-orange/25 px-[11px] py-[5px] text-[13px] font-semibold text-white backdrop-blur-sm">
            Example data
          </span>
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
