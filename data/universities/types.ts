import type { Subject } from "@/data/courses/types";

export type Destination = "UK";

export const regions = [
  "England — North",
  "England — Midlands",
  "England — South",
  "Scotland",
  "Wales",
  "Northern Ireland",
] as const;

export type Region = (typeof regions)[number];

/** A league-table placing or similar public recognition. */
export type Ranking = {
  /** What was awarded or measured, e.g. "University of the Year for Teaching Quality". */
  title: string;
  /** The placing itself, e.g. "1st", "Top 10", "12th". Omit for an award with no position. */
  position?: string;
  /** Where it applies — "UK", "England", "London". */
  scope?: string;
  category?: string;
  /** The publication or survey that awarded it. Required: a ranking without a source is a rumour. */
  source: string;
  year: number;
  note?: string;
  /** The published table or methodology, where one exists. */
  href?: string;
};

export type Award = {
  title: string;
  organisation: string;
  /**
   * Optional, unlike `Ranking.year`. A placing is a measurement taken in a
   * particular cycle and is meaningless without one. An accreditation is a
   * standing status — "BPS accredited", "Living Wage Employer" — and most
   * bodies publish no year against it. Requiring one here would have forced a
   * date to be invented or the accreditation to be dropped; the attribution
   * that matters, `organisation`, is still mandatory.
   */
  year?: number;
  detail?: string;
  href?: string;
};

/** One bullet of a source document's own recognition copy. */
export type RecognitionItem = {
  label: string;
  detail?: string;
  /** Nested bullets, where the source nested them. */
  sub?: string[];
};

/**
 * A section of institutional recognition copy, kept in the shape the source
 * published it.
 *
 * `Ranking` and `Award` are deliberately narrow: they exist to make a claim
 * unpublishable without its attribution. Most of what a university writes
 * about itself is neither — a sustainability programme, a partner list, a
 * mentoring scheme — and squeezing it into a ranking card would dress prose up
 * as a measurement. This carries the remainder without that distortion, under
 * the heading the source gave it.
 */
export type RecognitionSection = {
  heading: string;
  items: RecognitionItem[];
};

/**
 * One column of a university's entry-criteria matrix.
 *
 * The September intake workbook is a matrix per institution: criteria labels
 * down the side, entry routes across the top. This is one of those columns,
 * and it is kept as text because the source is text — "12th Grade GPA 2.7 or
 * 70% or above", "LOWER TIER COURSES: £12,100, £2,420 extra for placement
 * year". Parsing those into numbers would lose the conditions that make them
 * usable, and the conditions are the part a student gets wrong.
 *
 * `entry.typical` and `entry.english` on the university remain the one-line
 * summary for a student skimming. This is the full picture behind it.
 */
export type EntryRoute = {
  key: string;
  /** The workbook's own column header, verbatim &mdash; staff recognise their own wording. */
  label?: string;
  academic?: string;
  english?: string;
  englishWaiver?: string;
  fees?: string;
  scholarship?: string;
  gapPolicy?: string;
  casDeposit?: string;
  enrolmentFee?: string;
  deadlines?: string;
  previousRefusal?: string;
  /** Criteria labels outside the eleven known ones, kept rather than dropped. */
  extras?: Record<string, string>;
};

/** One dated step in the institution's history. */
export type Milestone = { year: string; label: string };

export type Employer = {
  name: string;
  /** Path under /public. Falls back to the name set as a wordmark. */
  logo?: string;
  sector?: string;
};

export type Employability = {
  /** Share in work or further study 15 months after graduating. */
  employedRate?: string;
  /** What that figure measures and who published it. */
  employedSource?: string;
  medianSalary?: string;
  placementRate?: string;
  employers: Employer[];
  services: string[];
};

/** What a student should expect if this university interviews. */
export type InterviewProfile = {
  /** Whether interviews are usual here at all. */
  common: boolean;
  format?: string;
  duration?: string;
  /** Courses at this university that almost always interview. */
  interviewingSubjects?: string[];
  note?: string;
};

export type University = {
  id: string;
  name: string;
  city: string;
  region: Region;
  /** One line for cards; `overview` is the full paragraph. */
  tagline: string;
  overview: string;
  studentExperience: string;
  careers: string;
  /**
   * EXAMPLE DATA throughout. Fees, costs and requirements are placeholders
   * for the interface and are marked as such wherever they appear.
   */
  tuition: { min: number; max: number };
  livingCostMonthly: number;
  accommodation: { guaranteed: boolean; weeklyFrom: number; weeklyTo: number; note: string };
  /**
   * `typical` and `english` are the published prose. `tariff` and `ielts` are
   * the same thing in numbers — the *lower* end of the typical range — so the
   * eligibility tool can compare against them. They are example data like
   * everything else here, and a real integration reads them from each
   * university's published requirements per course, not per institution.
   */
  entry: { typical: string; english: string; tariff?: number; ielts?: number };
  scholarships: { name: string; amount: string; detail: string }[];
  placementYear: boolean;
  internationalSupport: string[];
  facilities: string[];
  subjects: Subject[];
  destination: Destination;

  /**
   * Everything below is optional, and every section that renders it hides
   * itself when the field is absent. That is the whole contract: a university
   * with no rankings shows no rankings block rather than an empty shell, and
   * adding data is the only thing needed to make a section appear.
   */

  /** Initials for the logo lockup fallback. Two or three characters. */
  monogram?: string;
  /** Path under /public for a supplied logo file. */
  logo?: string;
  founded?: string;
  /** "Public research university", "Post-1992 university", and so on. */
  kind?: string;
  campus?: string;
  studentPopulation?: string;
  internationalStudents?: string;
  studentStaffRatio?: string;
  /** Two or three paragraphs of institutional history. */
  history?: string[];
  /** Dated milestones. The timeline renders only when there are two or more. */
  milestones?: Milestone[];
  rankings?: Ranking[];
  awards?: Award[];
  /** Verbatim sections from the institution's own published recognition copy. */
  recognition?: RecognitionSection[];
  /**
   * The entry-criteria matrix from the intake workbook, one entry per route.
   * Real data where it exists, unlike `entry` above.
   */
  entryRoutes?: EntryRoute[];
  employability?: Employability;
  interview?: InterviewProfile;
};

/**
 * Ignition does not publish university rankings. League tables measure
 * research output and entry grades far more than they measure whether a
 * course suits a particular student, and reproducing them would encourage
 * exactly the comparison this product is trying to replace. Filters are
 * built around fit — subject, cost, location, placement and support.
 */
export const rankingPolicy =
  "Ignition doesn't rank universities. What matters is whether a course fits you — the teaching, the cost, the city and the support — so we let you filter on those instead.";
