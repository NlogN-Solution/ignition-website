/**
 * The quiz scores five independent dimensions rather than sorting students
 * into a single type. Each axis is declared once here as a const tuple, and
 * the record/partial types below are derived from it — so adding an interest
 * or a value is a one-line change that the compiler then enforces everywhere
 * (questions, careers and scoring alike).
 */

export const traits = [
  "analytical",
  "creative",
  "practical",
  "social",
  "independent",
  "collaborative",
  "organised",
  "curious",
  "empathetic",
  "leadership",
] as const;

export const interests = [
  "technology",
  "business",
  "engineering",
  "healthcare",
  "science",
  "design",
  "law",
  "media",
  "finance",
  "education",
  "psychology",
] as const;

export const workPreferences = [
  "withPeople",
  "independently",
  "complexProblems",
  "withTechnology",
  "creativeWork",
  "research",
  "leading",
  "practicalWork",
  "communication",
  "helpingPeople",
] as const;

export const values = [
  "salary",
  "jobSecurity",
  "creativity",
  "flexibility",
  "innovation",
  "helpingOthers",
  "leadership",
  "socialImpact",
] as const;

export const academicSubjects = [
  "mathematics",
  "computing",
  "physics",
  "chemistry",
  "biology",
  "economics",
  "business",
  "psychology",
  "art",
  "english",
  "geography",
] as const;

export type Trait = (typeof traits)[number];
export type Interest = (typeof interests)[number];
export type WorkPreference = (typeof workPreferences)[number];
export type Value = (typeof values)[number];
export type AcademicSubject = (typeof academicSubjects)[number];

export const dimensions = [
  "personality",
  "interests",
  "work",
  "values",
  "academic",
] as const;

export type Dimension = (typeof dimensions)[number];

/** The axes belonging to each dimension, for iteration in the scorer. */
export const dimensionKeys = {
  personality: traits,
  interests,
  work: workPreferences,
  values,
  academic: academicSubjects,
} as const;

/** A sparse contribution — what an answer, or a career, leans towards. */
export type Weights = {
  personality?: Partial<Record<Trait, number>>;
  interests?: Partial<Record<Interest, number>>;
  work?: Partial<Record<WorkPreference, number>>;
  values?: Partial<Record<Value, number>>;
  academic?: Partial<Record<AcademicSubject, number>>;
};

/** A dense, fully-populated profile — the result of accumulating weights. */
export type Profile = {
  personality: Record<Trait, number>;
  interests: Record<Interest, number>;
  work: Record<WorkPreference, number>;
  values: Record<Value, number>;
  academic: Record<AcademicSubject, number>;
};

export type QuizOption = {
  id: string;
  label: string;
  description?: string;
  weights: Weights;
};

export type QuizQuestion = {
  id: string;
  /** Drives the "Step n of 8" indicator and the dimension label. */
  dimension: Dimension;
  prompt: string;
  helper?: string;
  select: "single" | "multi";
  /** Cap for multi-select questions, so answers stay comparable. */
  maxChoices?: number;
  skippable?: boolean;
  options: QuizOption[];
};

/** Question id → chosen option ids. Single-select stores an array of one. */
export type QuizAnswers = Record<string, string[]>;
