import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { UniversityExplorer } from "@/components/universities/UniversityExplorer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Explore universities",
  description:
    "Search UK universities by location, subject, tuition, placement and international support — and compare what actually decides it rather than a league table.",
  path: "/universities",
});

export default function UniversitiesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          compact
          eyebrow="Universities"
          title="Compare universities across the UK."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Universities", href: "/universities" },
          ]}
        >
          <Badge tone="demo">Example data</Badge>
        </PageHero>

        <Container className="pb-[clamp(2.5rem,4.5vw,4.5rem)] pt-[clamp(1.125rem,1.8vw,1.625rem)]">
          {/* Suspense because the explorer now reads the URL for its seed
              query — the same boundary /courses uses for CourseExplorer. */}
          <Suspense fallback={<div className="min-h-[60svh]" />}>
            <UniversityExplorer />
          </Suspense>
        </Container>
      </main>

      <CtaBand
        title="Down to a shortlist?"
        intro="Check what each one asks for before you commit to an application."
        primary={{ label: "Entry requirements", href: "/apply/entry-requirements" }}
        secondary={{ label: "How to apply", href: "/apply" }}
      />
      <Footer />
    </>
  );
}
