import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { CourseExplorer } from "@/components/courses/CourseExplorer";
import type { ExplorerParams } from "@/components/courses/CourseExplorer";
import { getFacets, searchOfferings } from "@/lib/api/catalogue";
import { pageMetadata } from "@/lib/seo";

/** Search results move with every import. */
export const revalidate = 300;

const PAGE_SIZE = 24;

/** Read one value out of the query string, ignoring repeats. */
function one(value: string | string[] | undefined): string | undefined {
  const first = Array.isArray(value) ? value[0] : value;
  return first && first.length > 0 ? first : undefined;
}

export const metadata = pageMetadata({
  title: "Explore courses",
  description:
    "Search UK degree courses by subject, level, duration, placement and university — with modules, entry requirements and where each one leads.",
  path: "/courses",
});

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParams;

  const params: ExplorerParams = {
    q: one(raw.q),
    route: one(raw.route),
    level: one(raw.level),
    subject: one(raw.subject),
    duration: one(raw.duration),
    university: one(raw.university),
    placement: one(raw.placement) === "true",
    page: Math.max(1, Number(one(raw.page) ?? 1) || 1),
  };

  // Results and counts are one round trip each rather than one combined call:
  // they cache under different keys, and a page change reuses the facets it
  // already has instead of recomputing every count.
  const [results, facets] = await Promise.all([
    searchOfferings({ ...params, limit: PAGE_SIZE }),
    getFacets(params),
  ]);

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
          {results.items.some((offering) => offering.demo) ? (
            <Badge tone="demo">Example data</Badge>
          ) : null}
        </PageHero>

        <Container className="pb-[clamp(2.5rem,4.5vw,4.5rem)] pt-[clamp(1.125rem,1.8vw,1.625rem)]">
          <CourseExplorer
            offerings={results.items}
            facets={facets}
            total={results.total}
            page={params.page ?? 1}
            params={params}
          />
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
