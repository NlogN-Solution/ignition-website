import type { components } from "./schema";

/** The generated DTOs, named once so nothing else imports `components` directly. */
export type UniversitySummaryDto = components["schemas"]["UniversitySummary"];
export type UniversityDetailDto = components["schemas"]["UniversityDetail"];
export type RouteDto = components["schemas"]["RoutePublic"];
export type OfferingDto = components["schemas"]["CoursePublic"];
export type CourseProfileDto = components["schemas"]["CourseProfilePublic"];
export type ScholarshipDto = components["schemas"]["ScholarshipPublic"];
export type ContentDto = components["schemas"]["ContentPublic"];
export type BlockDto = components["schemas"]["BlockPublic"];
export type FacetsDto = components["schemas"]["CourseFacets"];
export type FacetOptionDto = components["schemas"]["FacetOption"];
export type TaxonomiesDto = components["schemas"]["Taxonomies"];

/**
 * One university's offering of a course — the ~4,800-row grain.
 *
 * This is a new domain type rather than a change to `data/courses/types.ts`,
 * which stays the contract for the editorial `Course`. The two are genuinely
 * different things: a `Course` is an explainer about studying Computer Science,
 * an `Offering` is *BSc Computer Science at Coventry, four years with a
 * placement*. The explorer lists offerings; `/courses/[course]` explains a
 * course.
 */
export interface Offering {
  slug: string;
  title: string;
  qualification?: string;
  subject?: string;
  level?: string;
  durationYears?: number;
  placement: boolean;
  campus?: string;
  /** The editorial explainer for this course, where one has been written. */
  profileSlug?: string;
  university: { slug: string; name: string; city?: string; region?: string } | null;
  /** True while the record's figures are still placeholders. */
  demo: boolean;
}

/** One option in a facet rail, with the count it would leave. */
export interface FacetOption {
  value: string;
  label?: string;
  count: number;
}

export interface Facets {
  route: FacetOption[];
  level: FacetOption[];
  subject: FacetOption[];
  duration: FacetOption[];
  university: FacetOption[];
  placement: number;
  total: number;
}

/** A page assembled from typed blocks. */
export interface ContentBlock {
  type: string;
  data: Record<string, unknown>;
}

export interface ContentPage {
  key: string;
  kind: string;
  slug?: string;
  title: string;
  excerpt?: string;
  tag?: string;
  hero?: Record<string, unknown>;
  seo?: Record<string, unknown>;
  source?: { label?: string; href?: string };
  related: { label: string; href: string }[];
  readingMinutes?: number;
  published?: string;
  blocks: ContentBlock[];
}
