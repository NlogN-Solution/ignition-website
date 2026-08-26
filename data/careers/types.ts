import type { Weights } from "@/lib/quiz/types";

/**
 * `destination` exists so the same career record can later carry
 * country-specific degree routes and salary bands. The UI never reads it
 * today — Ignition is UK-only — but adding a second destination will not
 * require reshaping this model.
 */
export type Destination = "UK";

export type Career = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  /** The career's own position on the same five axes the quiz scores. */
  weights: Weights;
  skills: string[];
  degreeSubjects: string[];
  /** Course slugs — resolved against the course catalogue. */
  relatedCourses: string[];
  /** University slugs — resolved against the university catalogue. */
  relatedUniversities: string[];
  /**
   * Illustrative only. Real figures must come from the National Careers
   * Service; every surface that renders this shows the example-data marker.
   */
  salary: { entry: number; experienced: number };
  outlook: string;
  destination: Destination;
};

/** Where a student should go for the real numbers behind `salary`. */
export const salarySource = {
  label: "National Careers Service",
  href: "https://nationalcareers.service.gov.uk/explore-careers",
};
