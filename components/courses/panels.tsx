import Link from "next/link";
import { ArrowUpRight, Check, MapPin } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Callout } from "../ui/Callout";
import { Prose } from "../ui/Prose";
import { SpecList } from "../ui/SpecList";
import { ApplyPrompt } from "../apply/ApplyPrompt";
import { getCareer } from "@/data/careers";
import { durationLabel, type Course } from "@/data/courses";
import type { University } from "@/data/universities";

/**
 * The six panels behind the course tabs.
 *
 * Same construction as the university panels: plain server components taking
 * the course and returning a section, rendered on the server and handed to the
 * client tab shell as props, so none of this ships as JavaScript.
 *
 * The split follows the order a student actually asks the questions. What is
 * it, what would I study, do I meet it, can I afford it, where does it lead,
 * and who teaches it. The old page had all six as one scroll with a sidebar,
 * which meant a student checking whether they met the requirements read three
 * sections they had not asked for to reach the answer.
 */

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

/** The shared shell: one measure, one rhythm, on every tab. */
function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1240px] px-5 py-[clamp(2.5rem,4.5vw,4rem)] sm:px-8 lg:px-12">
      <div className="max-w-[80ch] space-y-12 sm:space-y-14">{children}</div>
    </div>
  );
}

/* --------------------------------------------------------------- Overview */

export function CourseOverviewPanel({ course }: { course: Course }) {
  return (
    <Panel>
      <Prose title="What you'll study">
        <p>{course.whatYouStudy}</p>

        <div className="pt-2">
          <Card className="p-5 sm:p-6">
            <SpecList
              specs={[
                { label: "Qualification", value: course.qualification },
                { label: "Level", value: course.level },
                { label: "Duration", value: durationLabel(course.durationYears) },
                {
                  label: "Placement year",
                  value: course.placement
                    ? `Available — ${durationLabel(course.durationYears + 1)} in total`
                    : "Not offered",
                },
                { label: "Subject area", value: course.subject },
              ]}
            />
          </Card>
        </div>
      </Prose>

      <Prose title="Skills you'll build">
        <ul className="flex flex-wrap gap-2">
          {course.skills.map((skill) => (
            <li key={skill}>
              <Badge tone="navy" className="px-3 py-[6px] text-[13.5px]">
                {skill}
              </Badge>
            </li>
          ))}
        </ul>
      </Prose>

      <ApplyPrompt
        title="Found the course you were looking for?"
        body={`Start your application and ${course.title} is already on it. You choose the universities next — with an Ignition advisor to tell you which ones you realistically meet.`}
        cta="Start my application"
      />
    </Panel>
  );
}

/* ---------------------------------------------------------------- Modules */

export function CourseModulesPanel({ course }: { course: Course }) {
  return (
    <Panel>
      <Prose title="Typical modules">
        <p>
          A representative structure for a course of this kind. Module names,
          the balance between compulsory and optional, and the order they run in
          are set by each university &mdash; two courses with the same title can
          be taught very differently.
        </p>
      </Prose>

      <ol className="space-y-4">
        {course.modules.map((group) => (
          <li key={group.year}>
            <Card className="p-5 sm:p-6">
              <p className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-blue-link">
                {group.year}
              </p>
              <ul className="mt-4 grid gap-x-8 gap-y-[10px] sm:grid-cols-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-[10px] text-[14.5px] font-medium leading-[1.45] text-ink-soft"
                  >
                    <span
                      aria-hidden
                      className="mt-[8px] size-[5px] shrink-0 rounded-full bg-orange"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </li>
        ))}
      </ol>

      {course.placement ? (
        <Callout>
          This course offers a placement year between the second and final year.
          On most courses it is available rather than guaranteed, and finding
          the placement is partly your job &mdash;{" "}
          <Link
            href="/resources/blog/placement-years-what-they-change"
            className="font-bold text-blue-link transition-colors hover:text-navy"
          >
            the questions to ask before you count on it
          </Link>
          .
        </Callout>
      ) : null}
    </Panel>
  );
}

/* ------------------------------------------------------ Entry requirements */

export function CourseEntryPanel({
  course,
  taughtAt,
}: {
  course: Course;
  /** The universities that teach it, resolved by the page. */
  taughtAt: University[];
}) {

  return (
    <Panel>
      <Prose title="What you need to get in">
        <p>
          Requirements are set per course, per intake, by each university. The
          figures below are placeholders showing the shape of a typical offer
          for a course of this kind, not an offer from anyone.
        </p>

        <div className="pt-2">
          <Card className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-[16px] font-bold tracking-[-0.01em] text-navy">
                A typical offer
              </h3>
              <Badge tone="demo">Example data</Badge>
            </div>

            <div className="mt-5">
              <SpecList
                specs={[
                  { label: "Academic", value: course.entry.academic },
                  { label: "Subjects", value: course.entry.subjects },
                  { label: "English", value: course.entry.english },
                ]}
              />
            </div>
          </Card>
        </div>
      </Prose>

      {taughtAt.length ? (
        <Prose title="What each university asks for">
          <p>
            The same course, at the universities that teach it. The spread is
            normal &mdash; it is why applying to a range rather than to one
            level of offer is the standard advice.
          </p>

          <ul className="grid gap-3 sm:grid-cols-2">
            {taughtAt.map((university) => (
              <li key={university.id} className="min-w-0">
                <Card href={`/universities/${university.id}`} className="h-full p-5">
                  <h3 className="text-[15.5px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
                    {university.name}
                  </h3>
                  <p className="mt-[8px] text-[14px] font-medium leading-[1.5] text-muted">
                    {university.entry.typical}
                  </p>
                  <p className="mt-[6px] text-[13.5px] font-medium leading-[1.5] text-muted-light">
                    {university.entry.english}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </Prose>
      ) : null}

      <Callout tone="official">
        Placeholder figures throughout.{" "}
        <Link
          href="/apply/entry-requirements"
          className="font-bold text-blue-link transition-colors hover:text-navy"
        >
          How to read entry requirements
        </Link>{" "}
        explains what the terms mean, and{" "}
        <Link
          href="/resources/eligibility"
          className="font-bold text-blue-link transition-colors hover:text-navy"
        >
          the eligibility calculator
        </Link>{" "}
        puts your own grades against them. Always confirm against the official
        university course page before you apply.
      </Callout>
    </Panel>
  );
}

/* -------------------------------------------------------- Fees and funding */

export function CourseFeesPanel({
  course,
  taughtAt,
}: {
  course: Course;
  /** The universities that teach it, resolved by the page. */
  taughtAt: University[];
}) {

  const withScholarships = taughtAt.filter(
    (university) => university.scholarships.length > 0,
  );

  const cheapest = taughtAt.length
    ? Math.min(...taughtAt.map((university) => university.tuition.min))
    : 0;
  const dearest = taughtAt.length
    ? Math.max(...taughtAt.map((university) => university.tuition.max))
    : 0;

  return (
    <Panel>
      <Prose title="What this course costs">
        {taughtAt.length ? (
          <p>
            Across the universities that teach it, tuition runs from{" "}
            {gbp.format(cheapest)} to {gbp.format(dearest)} a year. Tuition is
            the largest single line and the one you have least control over once
            you have accepted an offer &mdash; accommodation and the city are
            where a year actually gets cheaper or dearer.
          </p>
        ) : (
          <p>
            No universities in the example catalogue are listed against this
            course yet, so there is no fee range to show.
          </p>
        )}
      </Prose>

      {taughtAt.length ? (
        <Prose title="Tuition, by university">
          <ul className="space-y-3">
            {taughtAt.map((university) => (
              <li key={university.id}>
                <Card className="p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <div className="min-w-0">
                      <h3 className="text-[15.5px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
                        <Link
                          href={`/universities/${university.id}`}
                          className="transition-colors hover:text-blue-link"
                        >
                          {university.name}
                        </Link>
                      </h3>
                      <p className="mt-[5px] inline-flex items-center gap-[6px] text-[13.5px] font-medium text-muted-light">
                        <MapPin
                          size={13}
                          strokeWidth={2.4}
                          aria-hidden
                          className="shrink-0 text-orange"
                        />
                        {university.city} &middot; about{" "}
                        {gbp.format(university.livingCostMonthly)} a month to live
                      </p>
                    </div>

                    <p className="shrink-0 text-[16.5px] font-bold tabular-nums tracking-[-0.01em] text-navy">
                      {gbp.format(university.tuition.min)}&ndash;
                      {gbp.format(university.tuition.max)}
                    </p>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </Prose>
      ) : null}

      {withScholarships.length ? (
        <Prose title="Funding available where it is taught">
          <p>
            Full scholarships are rare and competitive. Partial awards and fee
            reductions are far more common, are often assessed automatically at
            the point of offer, and a surprising number go unclaimed.
          </p>

          <ul className="space-y-4">
            {withScholarships.map((university) => (
              <li key={university.id}>
                <p className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-muted-light">
                  {university.name}
                </p>
                <ul className="mt-3 space-y-[9px]">
                  {university.scholarships.map((scholarship) => (
                    <li
                      key={scholarship.name}
                      className="flex gap-[11px] text-[14.5px] font-medium leading-[1.5] text-ink-soft"
                    >
                      <Check
                        size={16}
                        strokeWidth={2.4}
                        aria-hidden
                        className="mt-[3px] shrink-0 text-orange"
                      />
                      <span className="min-w-0">
                        <span className="font-bold text-navy">
                          {scholarship.name}
                        </span>{" "}
                        &mdash; {scholarship.amount}. {scholarship.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Prose>
      ) : null}

      <Prose title="Build your own number">
        <p>
          Averages are useless here. The only figure worth planning against is
          one built from the city, the accommodation and the course you are
          actually considering.
        </p>
        <ul className="flex flex-wrap gap-3">
          {[
            { label: "Cost calculator", href: "/money/calculator" },
            { label: "Scholarship finder", href: "/money/scholarships" },
            { label: "What a UK year costs", href: "/resources/blog/what-a-uk-year-actually-costs" },
          ].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex items-center gap-[8px] rounded-lg border border-hairline bg-white px-[13px] py-[9px] text-[14.5px] font-semibold text-navy transition-colors duration-200 hover:border-ring-idle hover:text-blue-link"
              >
                {link.label}
                <ArrowUpRight size={14} strokeWidth={2.4} aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </Prose>

      <Callout tone="official">
        Every fee, living cost and scholarship figure here is a placeholder from
        the example catalogue. Confirm the real numbers with each university
        before you plan around them.
      </Callout>
    </Panel>
  );
}

/* ---------------------------------------------------------------- Careers */

export function CourseCareersPanel({ course }: { course: Course }) {
  const careers = course.relatedCareers
    .map((id) => getCareer(id))
    .filter((career): career is NonNullable<typeof career> => Boolean(career));

  return (
    <Panel>
      <Prose title="Where it leads">
        <p>
          Graduates of courses like this commonly move into the areas below.
          None of them is a fixed track &mdash; a degree opens doors rather than
          choosing one for you.
        </p>
        <ul className="flex flex-wrap gap-2">
          {course.careerOutcomes.map((outcome) => (
            <li key={outcome}>
              <Badge tone="muted" className="px-3 py-[6px] text-[13.5px]">
                {outcome}
              </Badge>
            </li>
          ))}
        </ul>
      </Prose>

      {careers.length ? (
        <Prose title="Career guides for this course">
          <p>
            Each one covers what the work actually involves, the skills it
            needs, and the other degrees that lead there.
          </p>

          <ul className="grid gap-3 sm:grid-cols-2">
            {careers.map((career) => (
              <li key={career.id} className="min-w-0">
                <Card href={`/careers/${career.id}`} className="h-full p-5">
                  <h3 className="text-[16px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
                    {career.title}
                  </h3>
                  <p className="mt-[7px] text-[14px] font-medium leading-[1.5] text-muted">
                    {career.tagline}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-[8px] pt-5 text-[14px] font-bold text-blue-link transition-colors group-hover:text-navy">
                    Read the guide
                    <ArrowUpRight
                      size={15}
                      strokeWidth={2.4}
                      aria-hidden
                      className="transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                    />
                  </span>
                </Card>
              </li>
            ))}
          </ul>
        </Prose>
      ) : null}
    </Panel>
  );
}

/* ------------------------------------------------------------ Universities */

export function CourseUniversitiesPanel({
  course,
  taughtAt,
}: {
  course: Course;
  /** The universities that teach it, resolved by the page. */
  taughtAt: University[];
}) {

  return (
    <Panel>
      <Prose title="Where you can study it">
        {taughtAt.length ? (
          <p>
            {taughtAt.length}{" "}
            {taughtAt.length === 1 ? "university teaches" : "universities teach"}{" "}
            this course in the example catalogue. The course is the decision; the
            university is the setting you make it in &mdash; so compare them on
            the city, the cost and the support rather than on reputation alone.
          </p>
        ) : (
          <p>
            No universities in the example catalogue are listed against this
            course yet.
          </p>
        )}
      </Prose>

      {taughtAt.length ? (
        <ul className="grid gap-3 sm:grid-cols-2">
          {taughtAt.map((university) => (
            <li key={university.id} className="min-w-0">
              <Card href={`/universities/${university.id}`} className="h-full p-5">
                <h3 className="text-[16px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
                  {university.name}
                </h3>
                <p className="mt-[7px] inline-flex items-center gap-[6px] text-[13.5px] font-semibold text-muted">
                  <MapPin
                    size={13}
                    strokeWidth={2.4}
                    aria-hidden
                    className="shrink-0 text-orange"
                  />
                  {university.city} &middot; {university.region}
                </p>
                <p className="mt-3 text-[14px] font-medium leading-[1.5] text-muted">
                  {gbp.format(university.tuition.min)}&ndash;
                  {gbp.format(university.tuition.max)} a year
                  {university.placementYear ? " · placement year available" : ""}
                </p>

                <span className="mt-auto inline-flex items-center gap-[8px] pt-5 text-[14px] font-bold text-blue-link transition-colors group-hover:text-navy">
                  View university
                  <ArrowUpRight
                    size={15}
                    strokeWidth={2.4}
                    aria-hidden
                    className="transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                  />
                </span>
              </Card>
            </li>
          ))}
        </ul>
      ) : null}
    </Panel>
  );
}
