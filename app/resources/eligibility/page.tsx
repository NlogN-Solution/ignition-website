import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import { EligibilityIntro } from "@/components/eligibility/EligibilityIntro";
import { EligibilityCalculator } from "@/components/resources/EligibilityCalculator";
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

        {/* The grade-by-grade estimator that used to be this page.
            It answers a different question — "what would my grades convert to"
            — and is kept, one section down, for the student who wants to try
            numbers rather than be assessed. */}
        <Container className="pb-[clamp(2.5rem,4.5vw,4.5rem)]">
          <div className="border-t border-hairline pt-[clamp(2rem,3.5vw,3rem)]">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-[clamp(1.375rem,2.1vw,1.75rem)] font-bold leading-[1.2] tracking-[-0.015em] text-navy">
                Or try the grade estimator<span className="text-orange">.</span>
              </h2>
              <Badge tone="demo">Example data</Badge>
            </div>
            <p className="mb-7 max-w-[62ch] text-[15.5px] font-medium leading-[1.6] text-muted">
              Put grades and an English score against what each university typically asks for. No
              details needed, and nothing is sent to us.
            </p>

            <EligibilityCalculator universities={universities} courseCounts={courseCounts} />
          </div>
        </Container>
      </main>

      <CtaBand
        title="Grades not where you need them?"
        intro="A foundation year gets you in on lower grades, and a top-up turns a diploma you already hold into the final year of a degree."
        primary={{ label: "See the routes", href: "/resources/blog/foundation-top-up-or-straight-in" }}
        secondary={{ label: "Entry requirements", href: "/apply/entry-requirements" }}
      />
      <Footer />
    </>
  );
}
