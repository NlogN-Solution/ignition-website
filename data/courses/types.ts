export type Destination = "UK";

export const subjects = [
  "Computing",
  "Engineering",
  "Health",
  "Sciences",
  "Business",
  "Law",
  "Arts & Design",
  "Social Sciences",
  "Education",
  "Humanities",
] as const;

export type Subject = (typeof subjects)[number];

export const courseLevels = [
  "Foundation",
  "Undergraduate",
  "Top-Up",
  "Integrated Masters",
  "Postgraduate",
] as const;

export type CourseLevel = (typeof courseLevels)[number];

/**
 * The three routes a student actually picks between at the top of the funnel,
 * and the course levels each one contains.
 *
 * `courseLevel` above is the precise thing a course *is*; this is the question
 * a student is answering when they arrive — "am I starting a bachelor's, going
 * on to a master's, or topping up a diploma I already hold?". A foundation
 * year and an integrated masters both sit inside the undergraduate route
 * because both are applied to as first degrees, so putting them beside
 * "Postgraduate" as peers would misdescribe the decision.
 */
export type StudyRouteId = "undergraduate" | "postgraduate" | "top-up";

export type StudyRoute = {
  id: StudyRouteId;
  /** Primary label on the tab. */
  label: string;
  /** The qualification in brackets — the word most students search for. */
  note: string;
  /** One line, shown once the route is selected. */
  summary: string;
  levels: readonly CourseLevel[];
};

export const studyRoutes: readonly StudyRoute[] = [
  {
    id: "undergraduate",
    label: "Undergraduate",
    note: "Bachelor's",
    summary:
      "Your first degree — three years, or four with a placement, foundation or integrated masters year.",
    levels: ["Undergraduate", "Foundation", "Integrated Masters"],
  },
  {
    id: "postgraduate",
    label: "Postgraduate",
    note: "Master's",
    summary:
      "One year full time after a bachelor's degree, ending in a dissertation over the summer.",
    levels: ["Postgraduate"],
  },
  {
    id: "top-up",
    label: "UG Top-Up",
    note: "Final year",
    summary:
      "The final year of a bachelor's degree, for students who already hold an HND, HNC or a two-year diploma.",
    levels: ["Top-Up"],
  },
] as const;

export function studyRoute(id: string | null | undefined) {
  return studyRoutes.find((route) => route.id === id) ?? null;
}

export type Course = {
  id: string;
  title: string;
  qualification: string;
  subject: Subject;
  level: CourseLevel;
  /** Years without a placement; `placement` adds one. */
  durationYears: number;
  placement: boolean;
  overview: string;
  whatYouStudy: string;
  modules: { year: string; items: string[] }[];
  skills: string[];
  /**
   * EXAMPLE DATA. Real requirements are set per course, per intake, by each
   * university. Every surface rendering these shows the example-data marker
   * and links out to the official course page.
   */
  entry: { academic: string; subjects: string; english: string };
  careerOutcomes: string[];
  /** Career ids from the career database. */
  relatedCareers: string[];
  /** University ids from the university catalogue. */
  universities: string[];
  destination: Destination;
};
