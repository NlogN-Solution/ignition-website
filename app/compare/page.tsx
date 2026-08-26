import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ReadyToApply } from "@/components/apply/ReadyToApply";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Callout } from "@/components/ui/Callout";
import { CompareBoard } from "@/components/universities/CompareBoard";
import { rankingPolicy } from "@/data/universities";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Compare universities",
  description:
    "Put two to four UK universities side by side on cost, entry requirements, accommodation, scholarships, placement, courses and international support.",
  path: "/compare",
});

export default function ComparePage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Compare"
          title="Put your shortlist side by side."
          intro="Two to four at a time, on the things that actually decide it — the full cost of a year, what each asks for, where you'd live, and what support exists once you arrive."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Universities", href: "/universities" },
            { label: "Compare", href: "/compare" },
          ]}
        />

        <Container className="py-[clamp(2.5rem,4.5vw,4.5rem)]">
          <div className="mb-10 space-y-4">
            <Callout>{rankingPolicy}</Callout>
            <Callout tone="official">
              Every figure below is example data from fictional universities,
              shown to demonstrate the comparison. Confirm real fees, costs and
              requirements with each university directly.
            </Callout>
          </div>

          <CompareBoard />
        </Container>
      </main>

      <ReadyToApply
        title="Ready to turn your shortlist into applications?"
        intro="You have weighed them against each other. Ignition takes it from here — one profile, one set of documents, every application tracked in one place."
      />
      <Footer />
    </>
  );
}
