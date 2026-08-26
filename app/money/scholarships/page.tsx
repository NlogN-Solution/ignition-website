import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Callout } from "@/components/ui/Callout";
import { ScholarshipExplorer } from "@/components/money/ScholarshipExplorer";
import { scholarshipPolicy } from "@/data/scholarships";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Scholarships",
  description:
    "Filter UK scholarships by level, nationality, university and deadline — with the eligibility, the amount and a link to the official source for every entry.",
  path: "/money/scholarships",
});

export default function ScholarshipsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          compact
          eyebrow="Money"
          title="Find scholarships you can actually apply for."
          intro="Full scholarships are rare and competitive. Partial awards and fee reductions are far more common, often assessed automatically at the point of offer — and a surprising number go unclaimed."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Money", href: "/money" },
            { label: "Scholarships", href: "/money/scholarships" },
          ]}
        />

        <Container className="pb-[clamp(2.5rem,4.5vw,4.5rem)] pt-[clamp(1.125rem,1.8vw,1.625rem)]">
          <div className="mb-6">
            <Callout compact tone="official">{scholarshipPolicy}</Callout>
          </div>

          <ScholarshipExplorer />
        </Container>
      </main>

      <CtaBand
        title="Working out affordability?"
        intro="Build a full-year estimate before you commit to anywhere."
        primary={{ label: "Cost calculator", href: "/money/calculator" }}
        secondary={{ label: "Money guide", href: "/money" }}
      />
      <Footer />
    </>
  );
}
