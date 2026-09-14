import type { components } from "./schema";
import type { EntryRoute, Ranking } from "@/data/universities/types";
import type { Scholarship } from "@/data/scholarships";

/** The generated DTOs, named once so nothing else imports `components` directly. */
export type UniversitySummaryDto = components["schemas"]["UniversitySummary"];
export type UniversityDetailDto = components["schemas"]["UniversityDetail"];
export type RouteDto = components["schemas"]["RoutePublic"];
export type OfferingDto = components["schemas"]["CoursePublic"];
export type OfferingDetailDto = components["schemas"]["CourseDetailPublic"];
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

/**
 * One offering on its own page.
 *
 * The extra fields over `Offering` are the whole reason the page is worth
 * having. An offering row carries no tuition, no outcomes and no prose — but
 * it points at the `university_routes` row it was imported under, and *that*
 * carries the real entry criteria and fee structure for this exact course. So
 * `entry` is not a property of the course; it is the course's inherited
 * admission column, and it is the same row the university page shows.
 */
export interface OfferingDetail extends Offering {
  city?: string;
  intake?: string;
  qualification?: string;
  extraRequirements?: string;
  feeTier?: string;
  /** The criteria this course is admitted under. Absent for the ~222 unattributed offerings. */
  entry?: EntryRoute;
  related: Offering[];

  /* The offering's own record. Every one of these was already stored on
     `programs` and had simply never been served, which is why this page was a
     spec list and an inherited entry column and nothing else. */
  highlights?: string[];
  outcomes?: string[];
  /** Grouped by section — academic / documents / english. */
  requirements?: RequirementSection[];
  /** Grouped by milestone, in the source's own order. */
  keyDates?: KeyDate[];
  intakes?: Intake[];
  /** Display copy ("Feb / Jul") where the record has it. */
  intakesSummary?: string[];
  tuitionFee?: number;
  currency?: string;
  durationMonths?: number;
  minimumIelts?: number;
  minimumGpa?: number;
  courseType?: string;
  imageUrl?: string;

  /* Inherited context, so "where would I be studying" and "what could pay for
     it" are tabs on this page rather than an errand somewhere else. */
  universityProfile?: OfferingUniversity;
  scholarships?: Scholarship[];
}

/** One intake of an offering: when it starts, and when to apply by. */
export interface Intake {
  name: string;
  startDate?: string;
  applicationDeadline?: string;
}

/** One milestone from `programs.key_dates`, label humanised for display. */
export interface KeyDate {
  label: string;
  value: string;
}

/** One group of `programs.requirements` — "Academic", "Documents", "English". */
export interface RequirementSection {
  label: string;
  items: string[];
}

/**
 * The institution behind an offering.
 *
 * A strict subset of `University`, not a second version of it: the API serves
 * the same columns with the same values, so the course page and the university
 * page cannot state different facts about one place. It is a separate type
 * only because `University` requires fields this subset deliberately omits.
 */
export interface OfferingUniversity {
  slug: string;
  name: string;
  city?: string;
  region?: string;
  monogram?: string;
  tagline?: string;
  overview?: string;
  website?: string;
  founded?: string;
  kind?: string;
  campus?: string;
  studentPopulation?: string;
  internationalStudents?: string;
  studentStaffRatio?: string;
  ranking?: number;
  rankings?: Ranking[];
  facilities?: string[];
  internationalSupport?: string[];
  tuitionMin?: number;
  tuitionMax?: number;
  livingCostMonthly?: number;
  courseCount?: number;
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
