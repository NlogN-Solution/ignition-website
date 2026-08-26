import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import { EligibilityCalculator } from "@/components/resources/EligibilityCalculator";
import { eligibilityNotice } from "@/lib/eligibility";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Eligibility calculator",
  description:
    "Put your grades, your English score and your tuition budget against what UK universities typically ask for — and find out which routes are realistically open to you.",
  path: "/resources/eligibility",
});

export default function EligibilityPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          compact
          eyebrow="Eligibility"
          title="Find out where you stand."
          intro="Enter what you are studying, what you scored and what you can fund. This puts all three against what each university typically asks for, and tells you which of the three routes into a degree is realistically yours."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Resources", href: "/resources" },
            { label: "Eligibility calculator", href: "/resources/eligibility" },
          ]}
        >
          <Badge tone="demo">Example data</Badge>
        </PageHero>

        <Container className="pb-[clamp(2.5rem,4.5vw,4.5rem)] pt-[clamp(1.125rem,1.8vw,1.625rem)]">
          <div className="mb-6">
            <Callout compact tone="official">
              {eligibilityNotice}
            </Callout>
          </div>

          <EligibilityCalculator />
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
