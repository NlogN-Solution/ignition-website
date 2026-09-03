import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Building2, Info } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ReadyToApply } from "@/components/apply/ReadyToApply";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Callout } from "@/components/ui/Callout";
import { Prose } from "@/components/ui/Prose";
import { SpecList } from "@/components/ui/SpecList";
import { OfferingHero } from "@/components/courses/OfferingHero";
import { OfferingCard } from "@/components/courses/OfferingCard";
import { EntryRouteCards } from "@/components/universities/EntryRoutes";
import { getOffering } from "@/lib/api/catalogue";
import { durationLabel } from "@/data/courses";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

// **Deliberately no `generateStaticParams`.** There are 4,797 offerings, and
// pre-rendering them would add 4,797 pages to a build that currently renders
// 123 — to generate a long tail almost none of which is ever requested. With
// no static params the segment renders on demand and then caches for an hour
// under `revalidate` above, which is what a catalogue this size wants.
// (`dynamicParams` defaults to true, so it is not restated here.)

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const offering = await getOffering((await params).slug);
  if (!offering) return {};

  const university = offering.university;
  const where = university ? ` at ${university.name}` : "";
  const facts = [
    offering.qualification,
    offering.level,
    offering.durationYears ? durationLabel(offering.durationYears) : null,
    offering.placement ? "placement year available" : null,
  ].filter(Boolean);

  return pageMetadata({
    title: `${offering.title}${where}`,
    description: `${offering.title}${where}. ${facts.join(", ")}. Entry requirements, fees and how to apply from Nepal.`,
    path: `/courses/at/${offering.slug}`,
  });
}

/**
 * One university's offering of a course.
 *
 * This page exists because the course cards had nowhere to send anyone. Every
 * one of the 4,797 of them linked to the university, because the only other
 * destination was the editorial subject explainer and no offering is mapped to
 * one — so "BSc Occupational Therapy at Worcester" and "BSc Nursing at
 * Worcester" were the same click.
 *
 * The substance here is the **entry criteria**, and they are inherited rather
 * than stored: an offering row carries a title, a level and a duration, but the
 * `university_routes` row it was imported under carries the real academic and
 * English requirements, the fee structure and the scholarship bands. 4,575 of
 * the 4,797 have one. The 222 that do not say so plainly and send the reader to
 * the university's own criteria rather than showing an empty panel.
 */
export default async function OfferingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const offering = await getOffering((await params).slug);
  if (!offering) notFound();

  const university = offering.university;

  return (
    <>
      <Navbar />
      <main>
        <OfferingHero offering={offering} />

        <Container className="py-[clamp(2.5rem,4.5vw,4rem)]">
          <div className="max-w-[80ch] space-y-12 sm:space-y-14">
            <Prose title="This course">
              <Card className="p-5 sm:p-6">
                <SpecList
                  specs={[
                    ...(offering.qualification
                      ? [{ label: "Qualification", value: offering.qualification }]
                      : []),
                    ...(offering.level ? [{ label: "Level", value: offering.level }] : []),
                    ...(offering.subject ? [{ label: "Subject", value: offering.subject }] : []),
                    ...(offering.durationYears
                      ? [{ label: "Duration", value: durationLabel(offering.durationYears) }]
                      : []),
                    {
                      label: "Placement year",
                      value: offering.placement ? "Available" : "Not offered",
                    },
                    ...(offering.campus ? [{ label: "Campus", value: offering.campus }] : []),
                    ...(offering.intake ? [{ label: "Intake", value: offering.intake }] : []),
                    ...(university
                      ? [
                          {
                            label: "University",
                            value: (
                              <Link
                                href={`/universities/${university.slug}`}
                                className="font-semibold text-blue-link underline underline-offset-2 transition-colors hover:text-navy"
                              >
                                {university.name}
                              </Link>
                            ),
                          },
                        ]
                      : []),
                  ]}
                />
              </Card>

              {offering.extraRequirements ? (
                <Callout tone="official">
                  <strong>Additional requirement.</strong> {offering.extraRequirements}
                </Callout>
              ) : null}
            </Prose>

            {/* The inherited admission column. Same component and same rows as
                the university's own "Entry criteria by route" tab, because it
                is literally the same record — a student who checks one against
                the other must not find two different numbers. */}
            {offering.entry ? (
              <Prose title="Entry criteria and fees">
                <p>
                  {university ? `${university.name} admits` : "This course admits"} this
                  course through the route below. These are the criteria Ignition
                  holds for the September 2026 intake, written for applicants from
                  Nepal, and they are reproduced as the university stated them.
                </p>
                <div className="pt-2">
                  <EntryRouteCards routes={[offering.entry]} />
                </div>
                <p className="text-[13px] font-medium leading-[1.55] text-muted-light">
                  Criteria change between intakes and are set by the university,
                  not by Ignition. Confirm on the official course page, or ask
                  your advisor, before you rely on any figure here.
                </p>
              </Prose>
            ) : (
              <Prose title="Entry criteria and fees">
                <Callout tone="official">
                  <strong>Not recorded for this course yet.</strong> Ignition has
                  not attributed this offering to one of{" "}
                  {university ? university.name : "the university"}&rsquo;s entry
                  routes, so its specific requirements and fees are not shown
                  here rather than guessed at.{" "}
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

            {offering.related.length ? (
              <Prose title="Other courses in this subject here">
                <p>
                  More {offering.subject ? offering.subject.toLowerCase() : ""} courses at{" "}
                  {university ? university.name : "this university"}. You have
                  already chosen the place; this is what else it teaches.
                </p>
                <ul className="grid gap-5 pt-2 sm:grid-cols-2">
                  {offering.related.map((related) => (
                    <li key={related.slug}>
                      <OfferingCard offering={related} />
                    </li>
                  ))}
                </ul>
              </Prose>
            ) : null}

            {university ? (
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
                      About {university.name}
                    </h2>
                    <p className="mt-2 text-[14.5px] font-medium leading-[1.6] text-muted">
                      The place, its record, what it costs from Nepal, and the
                      documents you will need.
                    </p>
                    <Link
                      href={`/universities/${university.slug}`}
                      className="mt-4 inline-flex items-center gap-[9px] text-[14.5px] font-bold text-blue-link transition-colors hover:text-navy"
                    >
                      Open the university
                      <ArrowUpRight size={16} strokeWidth={2.4} aria-hidden />
                    </Link>
                  </div>
                </div>
              </Card>
            ) : null}

            <p className="flex items-start gap-[9px] text-[13px] font-medium leading-[1.55] text-muted-light">
              <Info size={15} strokeWidth={2} aria-hidden className="mt-[2px] shrink-0" />
              Course details come from the university&rsquo;s September 2026
              intake information. Always confirm on the official course page
              before you apply.
            </p>
          </div>
        </Container>
      </main>

      <ReadyToApply
        title="Ready to apply for this course?"
        intro="Read the application guide if you would rather do it yourself. If you would rather not, Ignition will take it from here — one advisor, from the application to the airport."
      />
      <Footer />
    </>
  );
}
