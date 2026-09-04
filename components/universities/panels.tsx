import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Callout } from "../ui/Callout";
import { Prose } from "../ui/Prose";
import { SpecList } from "../ui/SpecList";
import { Timeline } from "../ui/Timeline";
import { Checklist } from "../ui/Checklist";
import { Accordion } from "../ui/Accordion";
import {
  AwardCards,
  EmployerGrid,
  RankingCards,
  RecognitionSections,
} from "./Reputation";
import { EntryRouteCards } from "./EntryRoutes";
import { CampusGallery } from "./CampusGallery";
import { NepalCostTable } from "./NepalCostTable";
import { InterviewLibrary } from "./InterviewLibrary";
import { OfferingCard } from "../courses/OfferingCard";
import { nepalCostNotice } from "@/data/universities/nepal";
import { universityImagery } from "@/data/universities/imagery";
import type { University } from "@/data/universities";
import { isExampleRecord } from "@/lib/api/catalogue";
import type { Offering } from "@/lib/api/types";
import {
  applicationChecklist,
  applicationTimeline,
  applyFaqs,
  offerTypes,
  ucasSource,
} from "@/data/guides/apply";
import { livingCostBreakdown, moneyFaqs, moneyNotice } from "@/data/guides/money";
import { visaDocuments } from "@/data/guides/visa";
import { interviewGuidance } from "@/data/guides/interviews";

/**
 * The five panels behind the university tabs.
 *
 * Each is a plain server component taking the university and returning a
 * section. They are rendered on the server and handed to the client tab shell
 * as props, so none of this ships as JavaScript except the three pieces that
 * genuinely need it — the checklists, the interview filter and the tab bar.
 *
 * Every panel follows the same rule about missing data: a block whose field is
 * absent does not render. That is what lets one component serve a fully
 * documented university and a sparse one without either looking broken.
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

/* ------------------------------------------------------------------ About */

export function AboutPanel({ university }: { university: University }) {
  const { gallery } = universityImagery(university.id);
  const isExample = isExampleRecord(university);

  return (
    <Panel>
      {/* The notice used to sit in the page header, above the fold on every
          university. It belongs with the facts it qualifies rather than in
          front of the photograph, and this is the first panel a student
          opens, so it is still the first thing they read.

          It is shown only for the example records. Printing "this is a
          fictional university" above a real one would be a worse lie than the
          one the notice exists to prevent. */}
      {isExample ? (
        <Callout tone="official">
          This is a fictional university created to demonstrate the interface.
          Every figure on this page &mdash; fees, rankings, graduate outcomes and
          processing costs &mdash; is a placeholder, and the photographs are
          stock imagery.
        </Callout>
      ) : null}

      <Prose title="Overview">
        {university.overview ? <p>{university.overview}</p> : null}
        <div className="pt-2">
          <Card className="p-5 sm:p-6">
            <SpecList
              specs={[
                { label: "City", value: university.city },
                { label: "Region", value: university.region },
                ...(university.founded
                  ? [{ label: "Founded", value: university.founded }]
                  : []),
                ...(university.kind
                  ? [{ label: "Type", value: university.kind }]
                  : []),
                ...(university.campus
                  ? [{ label: "Campus", value: university.campus }]
                  : []),
                ...(university.studentPopulation
                  ? [{ label: "Students", value: university.studentPopulation }]
                  : []),
                ...(university.internationalStudents
                  ? [
                      {
                        label: "International students",
                        value: university.internationalStudents,
                      },
                    ]
                  : []),
                ...(university.studentStaffRatio
                  ? [
                      {
                        label: "Student to staff ratio",
                        value: university.studentStaffRatio,
                      },
                    ]
                  : []),
                {
                  label: "Placement year",
                  value: university.placementYear ? "Available" : "Not offered",
                },
              ]}
            />
          </Card>
        </div>
      </Prose>

      {/* The gallery is stock photography with captions that describe a
          specific place — "the original quadrangle and its colonnades". That
          is honest beneath a fictional institution and a fabrication beneath a
          real one, so it renders only for the example records. */}
      {university.studentExperience || isExample ? (
        <Prose title="Campus and student life">
          {university.studentExperience ? <p>{university.studentExperience}</p> : null}
          {isExample ? (
            <div className="pt-2">
              <CampusGallery images={gallery} name={university.name} />
            </div>
          ) : null}
        </Prose>
      ) : null}

      {university.history?.length ? (
        <Prose title="History">
          {university.history.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}

          {/* The timeline only earns its space when there is a sequence to
              show. One milestone is a fact, not a history. */}
          {university.milestones && university.milestones.length > 1 ? (
            <div className="pt-4">
              <Timeline
                stages={university.milestones.map((milestone) => ({
                  label: milestone.label,
                  description: "",
                  meta: milestone.year,
                }))}
              />
            </div>
          ) : null}
        </Prose>
      ) : null}

      {university.rankings?.length ? (
        <Prose title="Rankings and reputation">
          <p>
            Every placing below is shown with the publication that awarded it
            and the year it was awarded. A ranking without a source is not
            worth reading, and league tables measure research output and entry
            grades far more than they measure whether a course suits you.
          </p>
          <div className="pt-2">
            <RankingCards rankings={university.rankings} />
          </div>
        </Prose>
      ) : null}

      {university.awards?.length ? (
        <Prose title="Awards and recognition">
          <AwardCards awards={university.awards} />
        </Prose>
      ) : null}

      {/* What the university says about itself, in its own sections.
          Deliberately last of the three reputation blocks and deliberately
          plainer than them: the placings above carry a source and a year and
          have been checked against one, and this has not. It is institutional
          copy, useful and worth reading, but it is not evidence, and the
          ordering says so without a disclaimer having to. */}
      {university.recognition?.length ? (
        <Prose title={`What ${university.name} highlights`}>
          <p>
            Published by the university itself. Unlike the placings above,
            these are the institution&rsquo;s own descriptions of its work
            rather than an independent measurement &mdash; read them as what
            the university chooses to tell you about itself.
          </p>
          <div className="pt-2">
            <RecognitionSections sections={university.recognition} />
          </div>
        </Prose>
      ) : null}

      {university.employability ? (
        <Prose title="Graduate outcomes">
          <p>{university.careers}</p>

          <div className="pt-2">
            <Card className="p-5 sm:p-6">
              <SpecList
                specs={[
                  ...(university.employability.employedRate
                    ? [
                        {
                          label: "In work or further study",
                          value: university.employability.employedRate,
                        },
                      ]
                    : []),
                  ...(university.employability.medianSalary
                    ? [
                        {
                          label: "Median graduate salary",
                          value: university.employability.medianSalary,
                        },
                      ]
                    : []),
                  ...(university.employability.placementRate
                    ? [
                        {
                          label: "Placements",
                          value: university.employability.placementRate,
                        },
                      ]
                    : []),
                ]}
              />
              {university.employability.employedSource ? (
                <p className="mt-5 border-t border-hairline pt-4 text-[13px] font-medium leading-[1.55] text-muted-light">
                  {university.employability.employedSource}
                </p>
              ) : null}
            </Card>
          </div>

          {university.employability.employers.length ? (
            <div className="pt-4">
              <h3 className="text-[17px] font-bold tracking-[-0.01em] text-navy">
                Where graduates have gone
              </h3>
              <p className="mt-2 max-w-[68ch] text-[15px] font-medium leading-[1.65] text-muted">
                Organisations that have employed graduates from this
                university. It is a sample, not a guarantee of a route.
              </p>
              <div className="mt-4">
                <EmployerGrid employers={university.employability.employers} />
              </div>
            </div>
          ) : null}

          {university.employability.services.length ? (
            <ul className="grid gap-x-8 gap-y-3 pt-4 sm:grid-cols-2">
              {university.employability.services.map((service) => (
                <li
                  key={service}
                  className="flex gap-[11px] text-[15px] font-medium leading-[1.5] text-ink-soft"
                >
                  <Check
                    size={17}
                    strokeWidth={2.4}
                    aria-hidden
                    className="mt-[3px] shrink-0 text-orange"
                  />
                  {service}
                </li>
              ))}
            </ul>
          ) : null}
        </Prose>
      ) : null}

      {university.accommodation.note ||
      university.accommodation.weeklyFrom > 0 ||
      university.accommodation.guaranteed ? (
      <Prose title="Where you would live">
        <div>
          <Card className="p-5 sm:p-6">
            <SpecList
              specs={[
                {
                  label: "First-year accommodation",
                  value: university.accommodation.guaranteed
                    ? "Guaranteed"
                    : "Not guaranteed",
                },
                {
                  label: "Halls, per week",
                  value: `${gbp.format(university.accommodation.weeklyFrom)}–${gbp.format(university.accommodation.weeklyTo)}`,
                },
              ]}
            />
            {university.accommodation.note ? (
              <p className="mt-5 border-t border-hairline pt-4 text-[14px] font-medium leading-[1.6] text-muted">
                {university.accommodation.note}
              </p>
            ) : null}
          </Card>
        </div>
      </Prose>
      ) : null}

      {university.internationalSupport.length ? (
      <Prose title="Support for international students">
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {university.internationalSupport.map((item) => (
            <li
              key={item}
              className="flex gap-[11px] text-[15px] font-medium leading-[1.5] text-ink-soft"
            >
              <Check
                size={17}
                strokeWidth={2.4}
                aria-hidden
                className="mt-[3px] shrink-0 text-orange"
              />
              {item}
            </li>
          ))}
        </ul>
      </Prose>
      ) : null}

      {university.facilities.length ? (
      <Prose title="Facilities">
        <ul className="flex flex-wrap gap-2">
          {university.facilities.map((facility) => (
            <li key={facility}>
              <Badge tone="muted" className="px-3 py-[6px] text-[13.5px]">
                {facility}
              </Badge>
            </li>
          ))}
        </ul>
      </Prose>
      ) : null}

    </Panel>
  );
}

/* ---------------------------------------------------------------- Courses */

/**
 * What this university actually teaches, as its own tab.
 *
 * It used to be the last block of the About panel, which put the single most
 * concrete question a student has — "do you do my subject?" — behind eight
 * sections of institutional prose. It is a tab now, and the courses are
 * grouped by subject because a student arrives knowing the subject and not the
 * course title.
 */
export function CoursesPanel({
  university,
  offerings,
}: {
  university: University;
  offerings: Offering[];
}) {
  const taught = offerings;

  if (taught.length === 0) {
    return (
      <Panel>
        <Prose title="Courses">
          <p>
            No courses are listed against {university.name} yet. The full
            catalogue is on{" "}
            <Link
              href="/courses"
              className="font-bold text-blue-link transition-colors hover:text-navy"
            >
              the courses page
            </Link>
            .
          </p>
        </Prose>
      </Panel>
    );
  }

  // Subject order follows the catalogue rather than the alphabet, so the
  // grouping matches the order of the filters on /courses.
  // An offering whose subject the classifier could not place is still a real
  // course this university teaches, so it is grouped rather than dropped.
  const bySubject = new Map<string, typeof taught>();
  for (const course of taught) {
    const key = course.subject ?? "Other";
    const group = bySubject.get(key) ?? [];
    group.push(course);
    bySubject.set(key, group);
  }

  return (
    <Panel>
      <Prose title={`What ${university.name} teaches`}>
        <p>
          {taught.length} {taught.length === 1 ? "course" : "courses"} across{" "}
          {bySubject.size}{" "}
          {bySubject.size === 1 ? "subject area" : "subject areas"}. Where a
          course has a written guide, it opens onto the modules, entry
          requirements and where it leads.
        </p>
      </Prose>

      {[...bySubject].map(([subject, group]) => (
        <section key={subject}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h2 className="text-[clamp(1.125rem,1.7vw,1.375rem)] font-bold leading-[1.25] tracking-[-0.015em] text-navy">
              {subject}
            </h2>
            <span className="text-[13px] font-semibold text-muted-light">
              {group.length} {group.length === 1 ? "course" : "courses"}
            </span>
          </div>

          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {group.map((course) => (
              <li key={course.slug} className="min-w-0">
                <OfferingCard offering={course} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Panel>
  );
}

/* ------------------------------------------------------ Application journey */

export function ApplicationPanel({ university }: { university: University }) {
  return (
    <Panel>
      <Prose title="How applying works">
        <p>
          Undergraduate applications to {university.name} go through UCAS, the
          single service every UK university uses. You apply once, to several
          courses, on one form. Deadlines and the number of choices allowed are
          set by UCAS and change between cycles — check{" "}
          <a
            href={ucasSource.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-link underline underline-offset-2 transition-colors hover:text-navy"
          >
            {ucasSource.label}
          </a>{" "}
          for the current cycle.
        </p>
        <div className="pt-2">
          <Timeline stages={applicationTimeline} />
        </div>
      </Prose>

      {/* The summary. It stays, because a student skimming six universities
          wants one line, not a matrix — but it now sits above the real thing
          rather than standing in for it. */}
      {university.entry.typical || university.entry.english ? (
      <Prose title="What this university asks for">
        <Card className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[16px] font-bold tracking-[-0.01em] text-navy">
              Entry requirements
            </h3>
            {isExampleRecord(university) ? <Badge tone="demo">Example data</Badge> : null}
          </div>
          <div className="mt-5">
            <SpecList
              specs={[
                { label: "Typical offer", value: university.entry.typical },
                { label: "English language", value: university.entry.english },
              ]}
            />
          </div>
          <p className="mt-5 border-t border-hairline pt-4 text-[13px] font-medium leading-[1.55] text-muted-light">
            Requirements differ by course. Always confirm on the official
            course page before you rely on them.
          </p>
        </Card>
      </Prose>
      ) : null}

      {/* The entry-criteria matrix from the intake workbook. Requirements are
          set per route, not per institution — a foundation year and a
          pre-Masters at the same university ask for different things — so this
          is one card per route rather than one list per university. */}
      {university.entryRoutes?.length ? (
        <Prose title="Entry criteria by route">
          <p>
            What {university.name} asks for depends on which route you apply
            through. These are the criteria Ignition holds for the September
            2026 intake, written for applicants from Nepal, and they are
            reproduced as the university stated them &mdash; including the
            either/or conditions, which are the part applicants most often get
            wrong.
          </p>
          <div className="pt-2">
            <EntryRouteCards routes={university.entryRoutes} />
          </div>
          <p className="text-[13px] font-medium leading-[1.55] text-muted-light">
            Criteria change between intakes and are set by the university, not
            by Ignition. Confirm the current requirement on the official course
            page, or ask your advisor, before you rely on any figure here.
          </p>
        </Prose>
      ) : null}

      <Prose title="What the decision can be">
        <ul className="grid gap-3 sm:grid-cols-2">
          {offerTypes.map((offer) => (
            <li key={offer.title}>
              <Card className="h-full p-5">
                <h3 className="text-[15.5px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
                  {offer.title}
                </h3>
                <p className="mt-[7px] text-[14.5px] font-medium leading-[1.6] text-muted">
                  {offer.body}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </Prose>

      <Prose title="If they interview you">
        <p>
          {university.interview?.common
            ? `Interviews are usual for some courses here. The Interview resources tab has the format, the questions and how to answer them.`
            : `Most courses at ${university.name} admit on the application alone. If yours is an exception, the Interview resources tab covers what to expect.`}
        </p>
      </Prose>

      <Prose title="Common questions">
        <Accordion items={applyFaqs} />
      </Prose>
    </Panel>
  );
}

/* ------------------------------------------------------------- Financials */

export function FinancialsPanel({ university }: { university: University }) {
  return (
    <Panel>
      <Prose title="Tuition and living costs">
        <Callout>{moneyNotice}</Callout>
        {/* Fees are the one figure the source spreadsheet states as prose
            rather than as a number, so they reach a record only once someone
            has confirmed them. A card of £0s would read as free tuition. */}
        {university.tuition.min > 0 || university.livingCostMonthly > 0 ? (
          <div className="pt-2">
            <Card className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-[16px] font-bold tracking-[-0.01em] text-navy">
                  At {university.name}
                </h3>
                {isExampleRecord(university) ? <Badge tone="demo">Example data</Badge> : null}
              </div>
              <div className="mt-5">
                <SpecList
                  specs={[
                    ...(university.tuition.min > 0
                      ? [
                          {
                            label: "Tuition, per year",
                            value: `${gbp.format(university.tuition.min)}–${gbp.format(university.tuition.max)}`,
                          },
                        ]
                      : []),
                    ...(university.livingCostMonthly > 0
                      ? [
                          {
                            label: "Living costs, per month",
                            value: gbp.format(university.livingCostMonthly),
                          },
                        ]
                      : []),
                    ...(university.accommodation.weeklyFrom > 0
                      ? [
                          {
                            label: "Halls, per week",
                            value: `${gbp.format(university.accommodation.weeklyFrom)}–${gbp.format(university.accommodation.weeklyTo)}`,
                          },
                        ]
                      : []),
                  ]}
                />
              </div>
            </Card>
          </div>
        ) : (
          <p>
            Fees for {university.name} are not published here yet. Confirm them on the
            university&rsquo;s own course pages.
          </p>
        )}
      </Prose>

      <Prose title="Where the monthly money goes">
        <Card className="p-5 sm:p-6">
          <SpecList
            specs={livingCostBreakdown.map((line) => ({
              label: line.category,
              value: `${gbp.format(line.low)}–${gbp.format(line.high)}`,
            }))}
          />
        </Card>
        <p className="text-[14px] text-muted-light">
          Illustrative monthly ranges, shown to demonstrate how a budget breaks
          down rather than to state what anything costs.
        </p>
      </Prose>

      <Prose title="Scholarships">
        <ul className="grid gap-3 sm:grid-cols-2">
          {university.scholarships.map((scholarship) => (
            <li key={scholarship.name}>
              <Card className="h-full p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[16px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
                    {scholarship.name}
                  </h3>
                  <span className="shrink-0 text-[17px] font-bold text-navy">
                    {scholarship.amount}
                  </span>
                </div>
                <p className="mt-[8px] text-[14.5px] font-medium leading-[1.5] text-muted">
                  {scholarship.detail}
                </p>
              </Card>
            </li>
          ))}
        </ul>
        <p className="pt-1">
          <Link
            href="/money/scholarships"
            className="inline-flex items-center gap-[8px] text-[15px] font-bold text-blue-link transition-colors hover:text-navy"
          >
            Search every scholarship on Ignition
            <ArrowUpRight size={16} strokeWidth={2.4} aria-hidden />
          </Link>
        </p>
      </Prose>

      {/* The section this page exists for, as far as a family in Nepal is
          concerned: not the fee, but everything around the fee. */}
      <Prose title="What it costs from Nepal">
        <p>
          The tuition figure is not the number you need. Before it is ever
          paid there is a test, a visa, a health surcharge, a medical, a set of
          translations and a ticket — paid in two currencies, at different
          times, to different people. This is that list, grouped by when the
          money is actually due.
        </p>
        <Callout tone="official">{nepalCostNotice}</Callout>
        <div className="pt-2">
          <NepalCostTable />
        </div>
        <p className="text-[14px] text-muted-light">
          No grand total is shown on purpose. It depends on the length of your
          course, the city you live in and the exchange rate on the day, and a
          single confident-looking figure would be the most misleading thing on
          this page. Use{" "}
          <Link
            href="/money/calculator"
            className="font-semibold text-blue-link underline underline-offset-2 transition-colors hover:text-navy"
          >
            the cost calculator
          </Link>{" "}
          to build your own estimate.
        </p>
      </Prose>

      <Prose title="Common questions">
        <Accordion items={moneyFaqs} />
      </Prose>
    </Panel>
  );
}

/* ----------------------------------------------------------- Documentation */

export function DocumentsPanel({ university }: { university: University }) {
  return (
    <Panel>
      <Prose title="Documents for the application">
        <p>
          Everything {university.name} needs before it can make a decision.
          Tick these off as you gather them — your progress is saved on this
          device.
        </p>
        <div className="pt-2">
          <Checklist id={`university-apply-${university.id}`} items={applicationChecklist} />
        </div>
      </Prose>

      <Prose title="Documents for the visa">
        <p>
          A separate list, needed later and by a different body. You cannot
          start it until the university has issued your CAS, and the CAS only
          arrives once you have accepted an offer and paid any deposit.
        </p>
        <Callout tone="official">
          The Home Office sets exactly what form this evidence must take, and
          it changes. Check{" "}
          <a
            href="https://www.gov.uk/student-visa"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-link underline underline-offset-2 transition-colors hover:text-navy"
          >
            gov.uk/student-visa
          </a>{" "}
          before you submit anything.
        </Callout>
        <div className="pt-2">
          <Checklist id={`university-visa-${university.id}`} items={visaDocuments} />
        </div>
      </Prose>

      <Prose title="From Nepal specifically">
        <ul className="space-y-3">
          {[
            {
              label: "Tuberculosis test certificate",
              detail:
                "Compulsory for applicants from Nepal, and only valid from a clinic approved by the Home Office. A test from any other clinic will be rejected outright.",
            },
            {
              label: "Translated and notarised academic documents",
              detail:
                "Transcripts, character certificates and citizenship documents, translated into English and notarised.",
            },
            {
              label: "No Objection Certificate",
              detail:
                "Issued by the Ministry of Education. Needed to send tuition abroad through a bank and to clear immigration at Kathmandu.",
            },
            {
              label: "Financial evidence held for 28 days",
              detail:
                "The money must have been in a qualifying account for 28 consecutive days before you apply, and the statement must show it. Moving the funds in late is the single most common reason a visa is refused.",
            },
          ].map((item) => (
            <li key={item.label}>
              <Card className="p-5">
                <h3 className="text-[15.5px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
                  {item.label}
                </h3>
                <p className="mt-[7px] text-[14.5px] font-medium leading-[1.6] text-muted">
                  {item.detail}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </Prose>
    </Panel>
  );
}

/* ------------------------------------------------------ Interview resources */

export function InterviewPanel({ university }: { university: University }) {
  const profile = university.interview;

  return (
    <Panel>
      <Prose title="Does this university interview?">
        {profile ? (
          <>
            <p>
              {profile.common
                ? `Some courses at ${university.name} interview as a normal part of admission.`
                : `Most courses at ${university.name} admit on the application alone.`}{" "}
              {profile.note}
            </p>
            <div className="pt-2">
              <Card className="p-5 sm:p-6">
                <SpecList
                  specs={[
                    {
                      label: "Interviews",
                      value: profile.common ? "Usual for some courses" : "Uncommon",
                    },
                    ...(profile.format
                      ? [{ label: "Format", value: profile.format }]
                      : []),
                    ...(profile.duration
                      ? [{ label: "Typical length", value: profile.duration }]
                      : []),
                    ...(profile.interviewingSubjects?.length
                      ? [
                          {
                            label: "Subjects that interview",
                            value: profile.interviewingSubjects.join(", "),
                          },
                        ]
                      : []),
                  ]}
                />
              </Card>
            </div>
          </>
        ) : (
          <p>
            No interview information has been recorded for {university.name}{" "}
            yet. The questions below apply to any UK university interview and to
            the visa credibility interview, which almost every student from
            Nepal will sit regardless of the course.
          </p>
        )}
      </Prose>

      <Prose title="How university interviews work">
        <ul className="space-y-3">
          {interviewGuidance.map((item) => (
            <li key={item.title}>
              <Card className="p-5">
                <h3 className="text-[15.5px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
                  {item.title}
                </h3>
                <p className="mt-[7px] text-[14.5px] font-medium leading-[1.6] text-muted">
                  {item.body}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </Prose>

      <Prose title="Questions and how to answer them">
        <p>
          Read what the question is testing before you read the sample answer.
          Interviewers recognise a memorised answer immediately, and the point
          of the sample is to show the shape of a good one — not to give you
          something to recite.
        </p>
        <div className="pt-2">
          <InterviewLibrary />
        </div>
      </Prose>

      <Prose title="Practise with feedback">
        <p>
          Ignition&rsquo;s practice tool puts subject questions in front of you
          one at a time and shows what an interviewer is assessing once you
          have written an answer.
        </p>
        <p className="pt-1">
          <Link
            href="/apply/interviews"
            className="inline-flex items-center gap-[8px] text-[15px] font-bold text-blue-link transition-colors hover:text-navy"
          >
            Open interview practice
            <ArrowUpRight size={16} strokeWidth={2.4} aria-hidden />
          </Link>
        </p>
      </Prose>
    </Panel>
  );
}
