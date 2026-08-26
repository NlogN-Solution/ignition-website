import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { CourseExplorer } from "@/components/courses/CourseExplorer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Explore courses",
  description:
    "Search UK degree courses by subject, level, duration, placement and university — with modules, entry requirements and where each one leads.",
  path: "/courses",
});

export default function CoursesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          compact
          eyebrow="Courses"
          title="Find the course that gets you there."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Courses", href: "/courses" },
          ]}
        >
          <Badge tone="demo">Example data</Badge>
        </PageHero>

        <Container className="pb-[clamp(2.5rem,4.5vw,4.5rem)] pt-[clamp(1.125rem,1.8vw,1.625rem)]">
          {/* The explorer seeds its filters from `?route=` and `?q=`, which
              `useSearchParams` cannot read during static rendering — the
              boundary is what lets the rest of this page stay static. */}
          <Suspense fallback={<div className="min-h-[60svh]" />}>
            <CourseExplorer />
          </Suspense>
        </Container>
      </main>

      <CtaBand
        title="Not sure which subject is right?"
        intro="Work backwards. The career quiz shows which careers fit you, and each one lists the degrees that lead there."
        primary={{ label: "Take Career Quiz", href: "/careers/quiz" }}
        secondary={{ label: "Explore universities", href: "/universities" }}
      />
      <Footer />
    </>
  );
}
