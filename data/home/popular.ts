import type { University } from "@/data/universities/types";
import type { Scholarship } from "@/data/scholarships";

/** Editorial queries for featured course cards; hero intents come from the catalogue search API. */
export const featuredCourseQueries = ["Computer Science", "Business", "Nursing", "Engineering"] as const;

/** Missing fees are unknown, not free tuition. Only complete published ranges count. */
export function publishedTuitionRange(universities: Pick<University, "tuition">[]): { min: number; max: number } | null {
  const ranges = universities.map((university) => university.tuition).filter(
    ({ min, max }) => Number.isFinite(min) && Number.isFinite(max) && min > 0 && max >= min,
  );
  if (!ranges.length) return null;
  return { min: Math.min(...ranges.map((range) => range.min)), max: Math.max(...ranges.map((range) => range.max)) };
}

/** The first six real universities, preserving the public API's order. */
export function pickPopularUniversities(universities: University[]): University[] {
  return universities.filter((university) => !university.id.startsWith("example-")).slice(0, 6);
}

/**
 * Three scholarships for the homepage teaser. Externally-run schemes first —
 * their eligibility and deadlines come from the provider's own page, not from
 * a fictional university record, so they read as real to a visitor who has
 * not yet learned which university names on this site are examples.
 */
export function pickFeaturedScholarships(scholarships: Scholarship[]): Scholarship[] {
  const external = scholarships.filter((s) => s.kind === "external");
  const rest = scholarships.filter((s) => s.kind !== "external");
  return [...external, ...rest].slice(0, 3);
}
