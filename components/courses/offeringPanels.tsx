import Link from "next/link";
import {
  ArrowUpRight,
  Award,
  Building2,
  CalendarClock,
  Check,
  Globe,
  Users,
} from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Callout } from "../ui/Callout";
import { Prose } from "../ui/Prose";
import { SpecList } from "../ui/SpecList";
import type { Spec } from "../ui/SpecList";
import { EntryRouteCards } from "../universities/EntryRoutes";
import { RankingCards } from "../universities/Reputation";
import { OfferingCard } from "./OfferingCard";
import { durationLabel } from "@/data/courses";
import type { OfferingDetail, OfferingUniversity } from "@/lib/api/types";

/**
 * The six panels behind the offering tabs.
 *
 * The page they replace was one scroll with two sections on it — a spec list
 * and the inherited entry column — while the university page beside it had
 * six tabs. That gap was not a design decision. `programs` has stored
 * requirements, key dates, highlights, outcomes and a fee since the import,
 * and the public API simply never served any of it; the page rendered what it
 * was given, which was a title and a duration.
 *
 * Same shell and same rules as `universities/panels.tsx`: plain server
 * components, one measure, and **a block whose field is absent does not
 * render**. That last rule carries most of the weight here, because the
 * catalogue is uneven — 4,575 of 4,797 offerings inherit an entry route and
 * the rest inherit nothing — and one component has to serve both without
 * either looking broken.
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

/** A tick list. Used for anything the record states as a flat set of claims. */
function Ticks({ items }: { items: string[] }) {
  return (
    <ul className="space-y-[10px]">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-[10px]">
          <Check
            size={17}
            strokeWidth={2.4}
            aria-hidden
            className="mt-[3px] shrink-0 text-orange"
          />
          <span className="text-[15px] font-medium leading-[1.6] text-ink-soft">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * The standing caveat, worded once.
 *
 * Every figure on this page came out of one university's September 2026 intake
 * sheet, and none of it is Ignition's to guarantee. Repeating that under each
 * panel that carries a number is deliberate — a student who opens straight to
 * "Fees" from a link must read it too, and tabs mean they may never see the
 * overview.
 */
function SourceNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] font-medium leading-[1.55] text-muted-light">{children}</p>
  );
}

const money = (value: number, currency?: string) =>
  currency && currency !== "GBP"
    ? `${new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 }).format(value)} ${currency}`
    : gbp.format(value);

/* --------------------------------------------------------------- Overview */

export function OfferingOverviewPanel({ offering }: { offering: OfferingDetail }) {
  const university = offering.university;

  const specs: Spec[] = [];
  const add = (label: string, value: React.ReactNode | null | undefined) => {
    if (value !== null && value !== undefined && value !== "") specs.push({ label, value });
  };

  add("Qualification", offering.qualification);
  add("Level", offering.level);
  add("Subject", offering.subject);
  add(
    "Duration",
    offering.durationYears
      ? durationLabel(offering.durationYears)
      : offering.durationMonths
        ? `${offering.durationMonths} months`
        : null,
  );
  add("Placement year", offering.placement ? "Available" : "Not offered");
  add("Study mode", offering.courseType);
  add("Campus", offering.campus);
  add("Intake", offering.intake ?? offering.intakesSummary?.join(" · "));
  if (university) {
    add(
      "University",
      <Link
        href={`/universities/${university.slug}`}
        className="font-semibold text-blue-link underline underline-offset-2 transition-colors hover:text-navy"
      >
        {university.name}
      </Link>,
    );
  }

  return (
    <Panel>
      <Prose title="This course">
        <Card className="p-5 sm:p-6">
          <SpecList specs={specs} />
        </Card>

        {offering.extraRequirements ? (
          <Callout tone="official">
            <strong>Additional requirement.</strong> {offering.extraRequirements}
          </Callout>
        ) : null}
      </Prose>

      {offering.highlights?.length ? (
        <Prose title="What stands out">
          <Ticks items={offering.highlights} />
        </Prose>
      ) : null}

      {offering.outcomes?.length ? (
        <Prose title="What you come out with">
          <Ticks items={offering.outcomes} />
        </Prose>
      ) : null}

      {/* The subject explainer, where one has been written. It is a different
          thing from this page — what studying the subject is like anywhere,
          rather than this university's offering of it — so it is a link out,
          not a section. */}
      {offering.profileSlug ? (
        <Card className="p-5 sm:p-6">
          <h2 className="text-[16.5px] font-bold leading-[1.35] tracking-[-0.01em] text-navy">
            What studying {offering.subject ?? "this subject"} is actually like
          </h2>
          <p className="mt-2 text-[14.5px] font-medium leading-[1.6] text-muted">
            The modules, the skills and where the degree leads — written about the
            subject rather than about any one university&rsquo;s version of it.
          </p>
          <Link
            href={`/courses/${offering.profileSlug}`}
            className="mt-4 inline-flex items-center gap-[9px] text-[14.5px] font-bold text-blue-link transition-colors hover:text-navy"
          >
            Read the subject guide
            <ArrowUpRight size={16} strokeWidth={2.4} aria-hidden />
          </Link>
        </Card>
      ) : null}
    </Panel>
  );
}

/* --------------------------------------------------- Admission requirements */

export function OfferingEntryPanel({ offering }: { offering: OfferingDetail }) {
  const university = offering.university;

  return (
    <Panel>
      {offering.entry ? (
        <Prose title="Entry criteria and fees">
          <p>
            {university ? `${university.name} admits` : "This course admits"} this course
            through the route below. These are the criteria Ignition holds for the
            September 2026 intake, written for applicants from Nepal, and they are
            reproduced as the university stated them.
          </p>
          <div className="pt-2">
            <EntryRouteCards routes={[offering.entry]} />
          </div>
        </Prose>
      ) : (
        <Prose title="Entry criteria and fees">
          <Callout tone="official">
            <strong>Not recorded for this course yet.</strong> Ignition has not
            attributed this offering to one of{" "}
            {university ? university.name : "the university"}&rsquo;s entry routes, so
            its specific requirements and fees are not shown here rather than guessed
            at.{" "}
            {university ? (
              <Link
                href={`/universities/${university.slug}`}
                className="font-semibold text-blue-link underline underline-offset-2 transition-colors hover:text-navy"
              >
                See every route at {university.name}
              </Link>
            ) : null}
            , or ask an advisor and we will confirm it with the university.
          </Callout>
        </Prose>
      )}

      {offering.requirements?.length ? (
        <Prose title="What this course asks for">
          <div className="space-y-5">
            {offering.requirements.map((section) => (
              <Card key={section.label} className="p-5 sm:p-6">
                <h3 className="text-[12.5px] font-bold uppercase tracking-[0.06em] text-muted-light">
                  {section.label}
                </h3>
                <div className="mt-4">
                  <Ticks items={section.items} />
                </div>
              </Card>
            ))}
          </div>
        </Prose>
      ) : null}

      {/* The two numeric thresholds the offering row carries in its own right.
          They sit *after* the route because the route's prose is the
          authoritative statement and these are the machine-readable floor. */}
      {offering.minimumIelts != null || offering.minimumGpa != null ? (
        <Prose title="Minimum thresholds on record">
          <Card className="p-5 sm:p-6">
            <SpecList
              specs={[
                ...(offering.minimumIelts != null
                  ? [{ label: "Minimum IELTS", value: offering.minimumIelts.toFixed(1) }]
                  : []),
                ...(offering.minimumGpa != null
                  ? [{ label: "Minimum GPA", value: offering.minimumGpa.toFixed(2) }]
                  : []),
              ]}
            />
          </Card>
          <SourceNote>
            A threshold is the floor, not the bar that gets an offer. Where the entry
            route above states something different, the route is the university&rsquo;s
            own wording and wins.
          </SourceNote>
        </Prose>
      ) : null}

      {offering.extraRequirements ? (
        <Callout tone="official">
          <strong>Additional requirement.</strong> {offering.extraRequirements}
        </Callout>
      ) : null}

      <SourceNote>
        Criteria change between intakes and are set by the university, not by Ignition.
        Confirm on the official course page, or ask your advisor, before you rely on any
        figure here.
      </SourceNote>
    </Panel>
  );
}

/* ------------------------------------------------------ Intakes & key dates */

/** Long-form so a deadline cannot be misread as day/month or month/day. */
const formatDate = (value: string) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export function OfferingIntakesPanel({ offering }: { offering: OfferingDetail }) {
  const intakes = offering.intakes ?? [];
  const keyDates = offering.keyDates ?? [];
  const nothing = intakes.length === 0 && keyDates.length === 0 && !offering.intake;

  return (
    <Panel>
      <Prose title="When this course runs">
        {nothing ? (
          <Callout>
            No intake has been recorded against this course yet. Every course in this
            catalogue is held for the <strong>September 2026</strong> intake unless the
            university says otherwise — ask your advisor and we will confirm the exact
            dates with them.
          </Callout>
        ) : (
          <p>
            Applying is a queue, not a deadline: places on a course go as they are
            offered, and an application in October is read against a fuller cohort than
            the same application in February. These are the dates on record.
          </p>
        )}
      </Prose>

      {intakes.length ? (
        <Prose title="Intakes">
          <ul className="space-y-4">
            {intakes.map((intake) => (
              <li key={intake.name}>
                <Card className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="flex items-center gap-[9px] text-[16.5px] font-bold leading-[1.35] tracking-[-0.01em] text-navy">
                      <CalendarClock
                        size={18}
                        strokeWidth={2.1}
                        aria-hidden
                        className="shrink-0 text-orange"
                      />
                      {intake.name}
                    </h3>
                    {intake.applicationDeadline ? (
                      <Badge tone="muted">
                        Apply by {formatDate(intake.applicationDeadline)}
                      </Badge>
                    ) : null}
                  </div>

                  {intake.startDate ? (
                    <p className="mt-3 text-[14.5px] font-medium leading-[1.6] text-muted">
                      Teaching starts {formatDate(intake.startDate)}.
                    </p>
                  ) : null}
                </Card>
              </li>
            ))}
          </ul>
        </Prose>
      ) : null}

      {keyDates.length ? (
        <Prose title="Key dates">
          <Card className="p-5 sm:p-6">
            <SpecList
              specs={keyDates.map((date) => ({
                label: date.label,
                value: formatDate(date.value),
              }))}
            />
          </Card>
        </Prose>
      ) : null}

      <SourceNote>
        Dates come from the university&rsquo;s own intake information and move between
        cycles. Confirm on the official course page before you plan around one.
      </SourceNote>
    </Panel>
  );
}

/* -------------------------------------------------------- Fees and funding */

export function OfferingFeesPanel({ offering }: { offering: OfferingDetail }) {
  const university = offering.universityProfile;
  const scholarships = offering.scholarships ?? [];
  const fees = offering.entry?.fees;

  const hasBand =
    university?.tuitionMin != null &&
    university?.tuitionMax != null &&
    university.tuitionMin > 0;

  return (
    <Panel>
      <Prose title="What this course costs">
        {fees ? (
          <>
            <p>
              The fee below is the one attached to the entry route this course is
              admitted under, in the university&rsquo;s own wording. Where it names a
              tier, the tier is set by the course — this one is
              {offering.feeTier ? ` the ${offering.feeTier} tier` : " not tiered"}.
            </p>
            <Card className="p-5 sm:p-6">
              <p className="whitespace-pre-line text-[15px] font-medium leading-[1.6] text-ink">
                {fees}
              </p>
            </Card>
          </>
        ) : offering.tuitionFee != null ? (
          <>
            <p>Tuition on record for this course, per year of study.</p>
            <Card className="p-5 sm:p-6">
              <p className="text-[clamp(1.5rem,2.4vw,1.875rem)] font-bold leading-[1] tracking-[-0.02em] text-navy">
                {money(offering.tuitionFee, offering.currency)}
              </p>
              <p className="mt-2 text-[14px] font-medium text-muted">a year</p>
            </Card>
          </>
        ) : hasBand ? (
          <p>
            No fee is recorded against this specific course. Tuition at{" "}
            {university.name} runs from {gbp.format(university.tuitionMin!)} to{" "}
            {gbp.format(university.tuitionMax!)} a year across its courses — ask your
            advisor for the exact figure for this one.
          </p>
        ) : (
          <p>
            No tuition figure is recorded against this course yet. Ignition does not
            estimate one: a fee you plan a family&rsquo;s savings around has to come
            from the university. Ask your advisor and we will confirm it.
          </p>
        )}
      </Prose>

      {university?.livingCostMonthly ? (
        <Prose title="Living costs where you would be">
          <Card className="p-5 sm:p-6">
            <SpecList
              specs={[
                {
                  label: `Living costs in ${university.city ?? "this city"}`,
                  value: `${gbp.format(university.livingCostMonthly)} a month`,
                },
              ]}
            />
          </Card>
          <SourceNote>
            An indicative figure for a student living independently, before tuition.
            What you actually spend depends most on rent and on the city.
          </SourceNote>
        </Prose>
      ) : null}

      {offering.entry?.casDeposit || offering.entry?.enrolmentFee ? (
        <Prose title="What you pay before you travel">
          <Card className="p-5 sm:p-6">
            <SpecList
              specs={[
                ...(offering.entry.casDeposit
                  ? [{ label: "CAS deposit", value: offering.entry.casDeposit }]
                  : []),
                ...(offering.entry.enrolmentFee
                  ? [{ label: "Enrolment fee", value: offering.entry.enrolmentFee }]
                  : []),
              ]}
            />
          </Card>
        </Prose>
      ) : null}

      {scholarships.length ? (
        <Prose title="Funding this course can draw on">
          <p>
            {university ? `${university.name}'s` : "The university's"} published awards,
            narrowed to the ones open to a course at this level and in this subject.
            Full scholarships are rare; most of what is here is a fee discount, and a
            fee discount on a course you were going to take is still real money.
          </p>
          <ul className="space-y-4 pt-2">
            {scholarships.map((scholarship) => (
              <li key={scholarship.id}>
                <Card className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="flex items-center gap-[9px] text-[16.5px] font-bold leading-[1.35] tracking-[-0.01em] text-navy">
                      <Award
                        size={18}
                        strokeWidth={2.1}
                        aria-hidden
                        className="shrink-0 text-orange"
                      />
                      {scholarship.name}
                    </h3>
                    {scholarship.amount ? <Badge tone="muted">{scholarship.amount}</Badge> : null}
                  </div>

                  {scholarship.eligibility ? (
                    <p className="mt-3 whitespace-pre-line text-[14.5px] font-medium leading-[1.6] text-muted">
                      {scholarship.eligibility}
                    </p>
                  ) : null}

                  {scholarship.deadline || scholarship.applyVia ? (
                    <div className="mt-4">
                      <SpecList
                        specs={[
                          ...(scholarship.deadline
                            ? [{ label: "Deadline", value: scholarship.deadline }]
                            : []),
                          ...(scholarship.applyVia
                            ? [{ label: "Apply via", value: scholarship.applyVia }]
                            : []),
                        ]}
                      />
                    </div>
                  ) : null}
                </Card>
              </li>
            ))}
          </ul>
        </Prose>
      ) : offering.entry?.scholarship ? (
        <Prose title="Funding this course can draw on">
          <Card className="p-5 sm:p-6">
            <p className="whitespace-pre-line text-[15px] font-medium leading-[1.6] text-ink">
              {offering.entry.scholarship}
            </p>
          </Card>
          <SourceNote>
            The scholarship terms attached to this course&rsquo;s entry route, in the
            university&rsquo;s own wording.
          </SourceNote>
        </Prose>
      ) : null}

      <SourceNote>
        Every figure here is the university&rsquo;s, held for the September 2026 intake.
        Fees and awards change between cycles — confirm on the official course page
        before you rely on one.
      </SourceNote>
    </Panel>
  );
}

/* -------------------------------------------------- About the university */

export function OfferingUniversityPanel({ offering }: { offering: OfferingDetail }) {
  const university = offering.universityProfile;
  const named = offering.university;

  if (!university) {
    return (
      <Panel>
        <Prose title="About the university">
          {named ? (
            <>
              <p>
                This course is taught at {named.name}
                {named.city ? ` in ${named.city}` : ""}. Its full record — the place,
                what it teaches, what it costs from Nepal and the documents you will
                need — lives on its own page.
              </p>
              <Link
                href={`/universities/${named.slug}`}
                className="inline-flex items-center gap-[9px] text-[14.5px] font-bold text-blue-link transition-colors hover:text-navy"
              >
                Open {named.name}
                <ArrowUpRight size={16} strokeWidth={2.4} aria-hidden />
              </Link>
            </>
          ) : (
            <Callout>
              This offering is not currently attached to a published university record.
            </Callout>
          )}
        </Prose>
      </Panel>
    );
  }

  const specs: Spec[] = [];
  const add = (label: string, value: React.ReactNode | null | undefined) => {
    if (value !== null && value !== undefined && value !== "") specs.push({ label, value });
  };

  add("Founded", university.founded);
  add("Type", university.kind);
  add("Campus", university.campus);
  add("City", university.city);
  add("Region", university.region);
  add("Students", university.studentPopulation);
  add("International students", university.internationalStudents);
  add("Student–staff ratio", university.studentStaffRatio);
  add("UK ranking", university.ranking ? `#${university.ranking}` : null);
  add(
    "Courses in this catalogue",
    university.courseCount ? `${university.courseCount.toLocaleString()}` : null,
  );

  return (
    <Panel>
      <Prose title={`About ${university.name}`}>
        {university.tagline ? (
          <p className="text-[clamp(1.0625rem,1.4vw,1.1875rem)] font-semibold leading-[1.55] text-navy">
            {university.tagline}
          </p>
        ) : null}

        {university.overview ? <p>{university.overview}</p> : null}

        {!university.tagline && !university.overview ? (
          <p>
            {university.name}
            {university.city ? ` is in ${university.city}` : ""} and teaches{" "}
            {university.courseCount?.toLocaleString() ?? "a range of"} courses in this
            catalogue, including this one. Its full record is on its own page.
          </p>
        ) : null}

        {specs.length ? (
          <Card className="p-5 sm:p-6">
            <SpecList specs={specs} />
          </Card>
        ) : null}
      </Prose>

      {university.rankings?.length ? (
        <Prose title="What it is recognised for">
          <RankingCards rankings={university.rankings} />
        </Prose>
      ) : null}

      {university.facilities?.length ? (
        <Prose title="On campus">
          <Ticks items={university.facilities} />
        </Prose>
      ) : null}

      {university.internationalSupport?.length ? (
        <Prose title="Support for international students">
          <Ticks items={university.internationalSupport} />
        </Prose>
      ) : null}

      {/* The link out is last, not first. A student on this tab asked "what is
          this place", and sending them away before answering it is the thing
          the old bottom-of-page card did. */}
      <Card className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <span
            aria-hidden
            className="flex size-[40px] shrink-0 items-center justify-center rounded-[11px] border border-orange/20 bg-orange/[0.07] text-orange"
          >
            <Building2 size={19} strokeWidth={2} />
          </span>
          <div className="min-w-0">
            <h2 className="text-[16.5px] font-bold leading-[1.35] tracking-[-0.01em] text-navy">
              The full record for {university.name}
            </h2>
            <p className="mt-2 text-[14.5px] font-medium leading-[1.6] text-muted">
              Every entry route, the application journey, what a year costs from Nepal,
              the documents to gather, and what an interview here is like.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href={`/universities/${university.slug}`}
                className="inline-flex items-center gap-[9px] text-[14.5px] font-bold text-blue-link transition-colors hover:text-navy"
              >
                Open the university
                <ArrowUpRight size={16} strokeWidth={2.4} aria-hidden />
              </Link>
              {university.website ? (
                <a
                  href={university.website}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-[9px] text-[14.5px] font-bold text-muted transition-colors hover:text-navy"
                >
                  <Globe size={16} strokeWidth={2.2} aria-hidden />
                  Official site
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </Card>
    </Panel>
  );
}

/* ------------------------------------------------------- Related courses */

export function OfferingRelatedPanel({ offering }: { offering: OfferingDetail }) {
  const university = offering.university;

  return (
    <Panel>
      <Prose title="Other courses in this subject here">
        {offering.related.length ? (
          <>
            <p>
              More {offering.subject ? offering.subject.toLowerCase() : ""} courses at{" "}
              {university ? university.name : "this university"}. You have already chosen
              the place; this is what else it teaches.
            </p>
            <ul className="grid gap-5 pt-2 sm:grid-cols-2">
              {offering.related.map((related) => (
                <li key={related.slug}>
                  <OfferingCard offering={related} />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p>
              Nothing else at {university ? university.name : "this university"} is
              classified under{" "}
              {offering.subject ? offering.subject.toLowerCase() : "this subject"} in the
              catalogue — which usually means the subject is narrow here rather than that
              the university is small.
            </p>
            <Link
              href={`/courses${university ? `?university=${university.slug}` : ""}`}
              className="inline-flex items-center gap-[9px] text-[14.5px] font-bold text-blue-link transition-colors hover:text-navy"
            >
              Search every course{university ? ` at ${university.name}` : ""}
              <ArrowUpRight size={16} strokeWidth={2.4} aria-hidden />
            </Link>
          </>
        )}
      </Prose>

      {offering.universityProfile?.courseCount ? (
        <Card className="p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <span
              aria-hidden
              className="flex size-[40px] shrink-0 items-center justify-center rounded-[11px] border border-orange/20 bg-orange/[0.07] text-orange"
            >
              <Users size={19} strokeWidth={2} />
            </span>
            <div className="min-w-0">
              <h2 className="text-[16.5px] font-bold leading-[1.35] tracking-[-0.01em] text-navy">
                {offering.universityProfile.courseCount.toLocaleString()} courses in total
                here
              </h2>
              <p className="mt-2 text-[14.5px] font-medium leading-[1.6] text-muted">
                Across every subject and every level this university teaches.
              </p>
              <Link
                href={`/universities/${offering.universityProfile.slug}#courses`}
                className="mt-4 inline-flex items-center gap-[9px] text-[14.5px] font-bold text-blue-link transition-colors hover:text-navy"
              >
                Browse them all
                <ArrowUpRight size={16} strokeWidth={2.4} aria-hidden />
              </Link>
            </div>
          </div>
        </Card>
      ) : null}
    </Panel>
  );
}

/** Re-exported so the page can name the type without reaching into `lib/api`. */
export type { OfferingUniversity };
