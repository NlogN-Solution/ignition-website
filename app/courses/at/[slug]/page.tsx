import { notFound } from "next/navigation";
import {
  Building2,
  CalendarClock,
  FileCheck2,
  Info,
  Layers,
  PoundSterling,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ReadyToApply } from "@/components/apply/ReadyToApply";
import { DetailTabs } from "@/components/ui/DetailTabs";
import { OfferingHero } from "@/components/courses/OfferingHero";
import {
  OfferingEntryPanel,
  OfferingFeesPanel,
  OfferingIntakesPanel,
  OfferingOverviewPanel,
  OfferingRelatedPanel,
  OfferingUniversityPanel,
} from "@/components/courses/offeringPanels";
import { getOffering, getOfferingResult } from "@/lib/api/catalogue";
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
    description: `${offering.title}${where}. ${facts.join(", ")}. Entry requirements, intakes, fees and how to apply from Nepal.`,
    path: `/courses/at/${offering.slug}`,
  });
}

/**
 * One university's offering of a course, six questions, no navigation between
 * them.
 *
 * This page exists because the course cards had nowhere to send anyone. Every
 * one of the 4,797 of them linked to the university, because the only other
 * destination was the editorial subject explainer and no offering is mapped to
 * one — so "BSc Occupational Therapy at Worcester" and "BSc Nursing at
 * Worcester" were the same click.
 *
 * It was then a single scroll of two sections — a spec list and the inherited
 * entry column — sitting next to a university page with six tabs. That was not
 * a judgement about how much a course is worth; it was the API. `programs` has
 * stored requirements, key dates, highlights, outcomes and a fee since the
 * import, and none of it was ever served, so the page rendered what it was
 * given.
 *
 * Now it takes the same shell as the university and the subject pages
 * (`DetailTabs`) for the same reason all three do: the thing is the fixed
 * point and the question is what changes. A student checking whether they meet
 * the requirements does not scroll past the intakes to find out.
 *
 * **The substance is still the entry criteria, and they are still inherited.**
 * An offering row carries a title, a level and a duration; the
 * `university_routes` row it was imported under carries the real academic and
 * English requirements, the fee structure and the scholarship bands. 4,575 of
 * the 4,797 have one. The 222 that do not say so plainly and send the reader
 * to the university's own criteria rather than showing an empty panel.
 *
 * Every panel is server-rendered and stays in the HTML, so nothing here is
 * hidden from search or from a reader without JavaScript.
 */
export default async function OfferingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const lookup = await getOfferingResult(slug);

  // Only a real 404 is a withdrawal. A 500 or a timeout is our problem, not a
  // fact about the catalogue, and telling the reader the course "may have been
  // withdrawn" when the endpoint is simply erroring sends them away from a
  // course that is still on offer. See `getOfferingResult`.
  if (!lookup.ok) {
    if (lookup.reason === "missing") notFound();
    throw new Error(`The catalogue is unreachable, so /courses/at/${slug} cannot be rendered.`);
  }
  const offering = lookup.data;

  const icon = { size: 15, strokeWidth: 2.2, "aria-hidden": true } as const;
  const university = offering.university;

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      hint: "What the course is, and what you come out with",
      icon: <Info {...icon} />,
      panel: <OfferingOverviewPanel offering={offering} />,
    },
    {
      id: "entry",
      label: "Admission requirements",
      hint: "What you need to get in",
      icon: <FileCheck2 {...icon} />,
      panel: <OfferingEntryPanel offering={offering} />,
    },
    {
      id: "intakes",
      label: "Intakes and dates",
      hint: "When it runs, and when to apply by",
      icon: <CalendarClock {...icon} />,
      panel: <OfferingIntakesPanel offering={offering} />,
    },
    {
      id: "fees",
      label: "Fees and funding",
      hint: "What it costs, and what could pay for it",
      icon: <PoundSterling {...icon} />,
      panel: <OfferingFeesPanel offering={offering} />,
    },
    {
      id: "university",
      label: "The university",
      hint: university ? `About ${university.name}` : "Where you would be studying",
      icon: <Building2 {...icon} />,
      panel: <OfferingUniversityPanel offering={offering} />,
    },
    {
      id: "related",
      label: "Related courses",
      hint: "What else this university teaches in the subject",
      icon: <Layers {...icon} />,
      panel: <OfferingRelatedPanel offering={offering} />,
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        <OfferingHero offering={offering} />

        <DetailTabs tabs={tabs} label="Course information" />
      </main>

      <ReadyToApply
        courseSlug={offering.slug}
        title="Ready to apply for this course?"
        intro="Read the application guide if you would rather do it yourself. If you would rather not, Ignition will take it from here — one advisor, from the application to the airport."
      />
      <Footer />
    </>
  );
}
