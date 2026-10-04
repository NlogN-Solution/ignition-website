import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Callout } from "@/components/ui/Callout";
import { EligibilityCalculator } from "@/components/resources/EligibilityCalculator";
import { EligibilityIntro } from "@/components/eligibility/EligibilityIntro";
import { eligibilityNotice } from "@/lib/eligibility";
import { getUniversitiesWithCounts } from "@/lib/api/catalogue";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata = pageMetadata({
  title: "Check your eligibility",
  description:
    "A three-minute preliminary assessment of your UK study eligibility — your academic background, English qualification, funding and documents, reviewed by a counsellor.",
  path: "/resources/eligibility",
});

export default async function EligibilityPage() {
  const { universities, courseCounts } = await getUniversitiesWithCounts();

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          compact
          eyebrow="Eligibility"
          title="Find out where you stand."
          intro="Pick a subject and see every university ranked against your grades instantly — then, if you want a second opinion, a counsellor reviews the full picture and comes back with the next step."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Resources", href: "/resources" },
            { label: "Check your eligibility", href: "/resources/eligibility" },
          ]}
        />

        <Container className="pb-[clamp(2.5rem,4.5vw,4.5rem)] pt-[clamp(1.125rem,1.8vw,1.625rem)]">
          {/* Instant tier first: subject, region and grades in, a ranked
              university list out, nothing sent anywhere. This used to be the
              only way to get this — a CMS content block with no connection to
              the "Check your eligibility" link every nav/CTA on the site
              already points at. It lives here now instead. */}
          <EligibilityCalculator universities={universities} courseCounts={courseCounts} />

          {/* The deeper, counsellor-reviewed assessment — for a reader who's
              seen their instant matches and wants the full picture checked by
              a person before they commit to an application. Capped at a
              comfortable reading width rather than filling the container: one
              question at a time is the whole point, and a form the width of a
              desktop screen reads as a spreadsheet. */}
          <div className="mx-auto mt-[clamp(3rem,5vw,4.5rem)] max-w-[880px] border-t border-hairline pt-[clamp(2.5rem,4vw,3.5rem)]">
            <EligibilityIntro universities={universities} />

            <div className="mt-6">
              <Callout compact tone="official">
                {eligibilityNotice}
              </Callout>
            </div>
          </div>
        </Container>
      </main>

      <CtaBand
        title="Grades not where you need them?"
        intro="A foundation year gets you in on lower grades, and a top-up turns a diploma you already hold into the final year of a degree."
        primary={{ label: "See the routes", href: "/courses" }}
        secondary={{ label: "Entry requirements", href: "/apply/entry-requirements" }}
      />
      <Footer />
    </>
  );
}
