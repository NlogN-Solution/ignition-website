import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Callout } from "@/components/ui/Callout";
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
  const { universities } = await getUniversitiesWithCounts();

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          compact
          eyebrow="Eligibility"
          title="Find out where you stand."
          intro="Answer a few questions about your background, your English and how you plan to fund your studies. A counsellor reviews every assessment and comes back to you with the next step."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Resources", href: "/resources" },
            { label: "Check your eligibility", href: "/resources/eligibility" },
          ]}
        />

        <Container className="pb-[clamp(2.5rem,4.5vw,4.5rem)] pt-[clamp(1.125rem,1.8vw,1.625rem)]">
          {/* The assessment is the page. It is capped at a comfortable reading
              width rather than filling the container: one question at a time
              is the whole point, and a form the width of a desktop screen
              reads as a spreadsheet. */}
          <div className="mx-auto max-w-[880px]">
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
