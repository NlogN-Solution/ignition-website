import { displayQuery } from "./query";

export const courseFilterKeys = ["route", "level", "subject", "duration", "university", "qualification", "location", "placement"] as const;
export type CourseFilterKey = typeof courseFilterKeys[number];
export interface ExplorerParams {
  q?: string; route?: string; level?: string; subject?: string; duration?: string;
  university?: string; qualification?: string; location?: string; placement?: boolean;
  sort?: string; page?: number;
}
export const courseSortOptions = [{ value: "relevance", label: "Recommended" }, { value: "title", label: "A–Z" }, { value: "university", label: "University" }, { value: "duration", label: "Duration" }];
export function one(value: string | string[] | undefined): string | undefined {
  return (Array.isArray(value) ? value[0] : value) || undefined;
}
export function parseCourseParams(raw: Record<string, string | string[] | undefined>): ExplorerParams {
  const q = displayQuery(one(raw.q) ?? "") || undefined;
  return { q, route: one(raw.route), level: one(raw.level), subject: one(raw.subject), duration: one(raw.duration), university: one(raw.university), qualification: one(raw.qualification), location: one(raw.location), placement: one(raw.placement) === "true", sort: courseSortOptions.some(option => option.value === one(raw.sort)) ? one(raw.sort) : q ? "relevance" : "title", page: Math.min(10000, Math.max(1, Math.floor(Number(one(raw.page) ?? 1)) || 1)) };
}
export function updateExplorerUrl(path: string, current: Record<string, string | number | boolean | undefined>, changes: Record<string, string | null>): string {
  const next = new URLSearchParams();
  for (const [key, value] of Object.entries(current)) {
    if (value !== undefined && value !== false && value !== "" && !(key === "page" && value === 1)) next.set(key, String(value));
  }
  for (const [key, value] of Object.entries(changes)) {
    if (value === null || value === "") next.delete(key); else next.set(key, value);
  }
  if (!("page" in changes)) next.delete("page");
  return `${path}${next.size ? `?${next}` : ""}`;
}

export interface UniversityParams {
  q?: string; region?: string; subject?: string; tuition?: string;
  placement?: boolean; scholarships?: boolean;
}
export function parseUniversityParams(raw: Record<string, string | string[] | undefined>): UniversityParams {
  return { q: displayQuery(one(raw.q) ?? "") || undefined, region: one(raw.region), subject: one(raw.subject), tuition: one(raw.tuition), placement: one(raw.placement) === "true", scholarships: one(raw.scholarships) === "true" };
}
