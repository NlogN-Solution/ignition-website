import type {
  AcademicSubject,
  Dimension,
  Interest,
  Trait,
  Value,
  WorkPreference,
} from "./types";

/** Human-readable names for every axis, used in results and explanations. */
export const traitLabels: Record<Trait, string> = {
  analytical: "Analytical",
  creative: "Creative",
  practical: "Practical",
  social: "Social",
  independent: "Independent",
  collaborative: "Collaborative",
  organised: "Organised",
  curious: "Curious",
  empathetic: "Empathetic",
  leadership: "Leadership",
};

export const interestLabels: Record<Interest, string> = {
  technology: "technology",
  business: "business",
  engineering: "engineering",
  healthcare: "healthcare",
  science: "science",
  design: "design",
  law: "law",
  media: "media",
  finance: "finance",
  education: "education",
  psychology: "psychology",
};

export const workLabels: Record<WorkPreference, string> = {
  withPeople: "working with people",
  independently: "working independently",
  complexProblems: "solving complex problems",
  withTechnology: "working with technology",
  creativeWork: "creative work",
  research: "research",
  leading: "leadership",
  practicalWork: "practical work",
  communication: "communication",
  helpingPeople: "helping people",
};

export const valueLabels: Record<Value, string> = {
  salary: "earning potential",
  jobSecurity: "job security",
  creativity: "creativity",
  flexibility: "flexibility",
  innovation: "innovation",
  helpingOthers: "helping others",
  leadership: "leadership",
  socialImpact: "social impact",
};

export const academicLabels: Record<AcademicSubject, string> = {
  mathematics: "mathematics",
  computing: "computing",
  physics: "physics",
  chemistry: "chemistry",
  biology: "biology",
  economics: "economics",
  business: "business",
  psychology: "psychology",
  art: "art",
  english: "English",
  geography: "geography",
};

export const dimensionLabels: Record<Dimension, string> = {
  personality: "How you work",
  interests: "What interests you",
  work: "Ways of working",
  values: "What you value",
  academic: "Subjects",
};

/** Flat lookup so the scorer can label any axis without a switch. */
export const axisLabels: Record<Dimension, Record<string, string>> = {
  personality: traitLabels,
  interests: interestLabels,
  work: workLabels,
  values: valueLabels,
  academic: academicLabels,
};
