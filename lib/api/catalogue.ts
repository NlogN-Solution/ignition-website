import { courses as fallbackCourses } from "@/data/courses";
import { scholarships as fallbackScholarships } from "@/data/scholarships";
import { universities as fallbackUniversities } from "@/data/universities";
import type { Course } from "@/data/courses";
import type { Scholarship } from "@/data/scholarships";
import type { University } from "@/data/universities";
import { REVALIDATE, TAG_CATALOGUE, get } from "./client";
import type { GetOptions } from "./client";
import {
  toCourse,
  toFacets,
  toOffering,
  toOfferingDetail,
  toScholarship,
  toUniversity,
} from "./map";
import type {
  CourseProfileDto,
  Facets,
  FacetsDto,
  Offering,
  OfferingDetail,
  OfferingDetailDto,
  OfferingDto,
  ScholarshipDto,
  UniversityDetailDto,
  UniversitySummaryDto,
} from "./types";

/**
 * Reading the catalogue.
 *
 * Every function here returns something renderable. When the API is
 * unreachable — or has no rows for an entity yet — the caller gets the static
 * fixture the site shipped with instead of an empty page.
 *
 * **The fallback is per entity, not per field.** A university the API returns
 * with no `overview` is a real university nobody has written copy for yet, and
 * its page must show that honestly: the sections hide themselves, which is the
 * signal to staff that there is work to do. Silently backfilling prose from a
 * fictional record would erase exactly that signal — and there is no honest
 * mapping to backfill *from*, since the fixtures are invented institutions with
 * invented slugs (`example-metropolitan`) and the catalogue is 44 real ones.
 *
 * What the fallback does cover is a collection with **no rows at all**. The
 * editorial layers — course profiles, scholarships, guides, articles — are
 * written in the admin over time, and until someone has written the first one
 * the site keeps rendering the copy in `data/`. That is the documented
 * degradation, and each of those surfaces already marks itself as example data.
 */

/**
 * Whether what came back is the shipped fixture rather than the real catalogue.
 *
 * The example-data badges on this site are load-bearing — every fee and
 * requirement in `data/` is invented, and saying so is the difference between
 * a demo and a lie. They have to come off once the figures are real, and the
 * fixtures are the only records whose slugs are prefixed `example-`, which is
 * what makes this a reliable test rather than a guess.
 */
export function isExampleRecord(record: { id: string }): boolean {
  return record.id.startsWith("example-");
}

export function isExampleCatalogue(records: { id: string }[]): boolean {
  return records.some(isExampleRecord);
}

interface ListEnvelope<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

/**
 * The API caps `limit` at 100 — deliberately, since `?limit=999999` against
 * ~4,800 offerings is a free denial of service — so anything that genuinely
 * needs a whole collection asks for it a page at a time.
 *
 * Only three callers need this, and each has a real ceiling: the editorial
 * course profiles (tens), the scholarships (tens), and one university's
 * offerings (265 at the largest). `MAX_PAGES` is the guard against a paging
 * bug turning into an unbounded loop at build time, not a business rule.
 */
const PAGE_LIMIT = 100;
const MAX_PAGES = 12;

async function getAll<T>(
  path: string,
  options: Omit<GetOptions, "params"> & { params?: GetOptions["params"] },
): Promise<T[] | null> {
  const items: T[] = [];

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const response = await get<ListEnvelope<T>>(path, {
      ...options,
      params: { ...options.params, page, limit: PAGE_LIMIT },
    });

    // A failure on the first page means no data; on a later one it means a
    // short list, which is still better than none.
    if (!response) return page === 1 ? null : items;

    items.push(...response.items);
    if (items.length >= response.total || response.items.length === 0) break;
  }

  return items;
}

// ── Universities ─────────────────────────────────────────────────────────────

export async function getUniversities(): Promise<University[]> {
  const response = await get<ListEnvelope<UniversitySummaryDto>>("/public/universities", {
    revalidate: REVALIDATE.universities,
    tags: [TAG_CATALOGUE],
    params: { limit: PAGE_LIMIT },
  });

  if (!response || response.items.length === 0) return fallbackUniversities;
  return response.items.map(toUniversity);
}

/**
 * The catalogue plus how many courses each institution lists.
 *
 * `course_count` is denormalised onto the university by the import and is not
 * part of the `University` domain type, which stays as it is. It comes back
 * beside the records rather than on them so the compare board can say "265
 * courses" without either changing that contract or pulling ~4,800 offerings
 * into the page to count them.
 */
export async function getUniversitiesWithCounts(): Promise<{
  universities: University[];
  courseCounts: Record<string, number>;
}> {
  const response = await get<ListEnvelope<UniversitySummaryDto>>("/public/universities", {
    revalidate: REVALIDATE.universities,
    tags: [TAG_CATALOGUE],
    params: { limit: PAGE_LIMIT },
  });

  if (!response || response.items.length === 0) {
    return { universities: fallbackUniversities, courseCounts: {} };
  }

  return {
    universities: response.items.map(toUniversity),
    courseCounts: Object.fromEntries(
      response.items
        .filter((item) => typeof item.course_count === "number")
        .map((item) => [item.slug, item.course_count as number]),
    ),
  };
}

export async function getUniversity(slug: string): Promise<University | null> {
  const dto = await get<UniversityDetailDto>(`/public/universities/${encodeURIComponent(slug)}`, {
    revalidate: REVALIDATE.universities,
    tags: [TAG_CATALOGUE],
  });

  if (dto) return toUniversity(dto);

  // A 404 from a live API means "no such university", and the fixtures must
  // not answer it — otherwise the six fictional institutions stay reachable by
  // URL for as long as the site is up, beside forty-four real ones. They are
  // only the answer when the API gave us nothing at all, which is the
  // build-time-outage case the fallback exists for.
  const catalogue = await getUniversities();
  if (!isExampleCatalogue(catalogue)) return null;
  return catalogue.find((university) => university.id === slug) ?? null;
}

// ── Offerings ────────────────────────────────────────────────────────────────

export interface OfferingQuery {
  q?: string;
  route?: string;
  level?: string;
  subject?: string;
  university?: string;
  placement?: boolean;
  duration?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export async function searchOfferings(query: OfferingQuery): Promise<ListEnvelope<Offering>> {
  const response = await get<ListEnvelope<OfferingDto>>("/public/courses", {
    revalidate: REVALIDATE.offerings,
    tags: [TAG_CATALOGUE],
    params: { ...query, placement: query.placement ? true : undefined },
  });

  if (!response) return { items: [], total: 0, page: query.page ?? 1, limit: query.limit ?? 24 };
  return { ...response, items: response.items.map(toOffering) };
}

export async function getFacets(query: OfferingQuery): Promise<Facets | null> {
  const dto = await get<FacetsDto>("/public/courses/facets", {
    revalidate: REVALIDATE.offerings,
    tags: [TAG_CATALOGUE],
    params: { ...query, placement: query.placement ? true : undefined, page: undefined, limit: undefined },
  });

  return dto ? toFacets(dto) : null;
}

// ── Course profiles ──────────────────────────────────────────────────────────

export async function getCourses(): Promise<Course[]> {
  const items = await getAll<CourseProfileDto>("/public/course-profiles", {
    revalidate: REVALIDATE.universities,
    tags: [TAG_CATALOGUE],
  });

  if (!items || items.length === 0) return fallbackCourses;
  return items.map((dto) => toCourse(dto));
}

/**
 * Everything one university teaches.
 *
 * Its own function rather than a `searchOfferings` call with a big limit,
 * because the largest institution in the catalogue lists 265 courses and the
 * page is meant to show all of them.
 */
export async function getOfferingsAt(slug: string): Promise<Offering[]> {
  const items = await getAll<OfferingDto>("/public/courses", {
    revalidate: REVALIDATE.offerings,
    tags: [TAG_CATALOGUE],
    params: { university: slug },
  });

  return (items ?? []).map(toOffering);
}

/**
 * One course profile, plus the universities that actually offer it.
 *
 * The universities come from a separate search over offerings rather than
 * being nested on the profile: the join is `course_profile_slug` on ~4,800
 * rows, and denormalising it onto the profile would go stale the moment an
 * import adds an offering.
 */
export async function getCourse(slug: string): Promise<Course | null> {
  const dto = await get<CourseProfileDto>(`/public/course-profiles/${encodeURIComponent(slug)}`, {
    revalidate: REVALIDATE.universities,
    tags: [TAG_CATALOGUE],
  });

  if (!dto) {
    // Same rule as the universities: the fixtures answer only when the API has
    // no course profiles of its own. See `getUniversity`.
    const profiles = await getCourses();
    if (profiles !== fallbackCourses) return null;
    return profiles.find((course) => course.id === slug) ?? null;
  }

  const offerings = await searchOfferings({ q: dto.title, limit: PAGE_LIMIT });
  const slugs = [
    ...new Set(
      offerings.items
        .filter((offering) => offering.profileSlug === dto.slug)
        .map((offering) => offering.university?.slug)
        .filter((value): value is string => Boolean(value)),
    ),
  ];

  return toCourse(dto, slugs);
}

/**
 * One offering, by slug.
 *
 * No fixture fallback, unlike `getUniversity` and `getCourse`. Those two fall
 * back because the `data/` modules contain records of the same kind — six
 * fictional universities, thirty-one course explainers — that are the right
 * answer while the API has none of its own. There has never been a fixture
 * offering: the ~4,800 rows only ever came from the intake workbook. An API
 * that cannot answer here means the course does not exist, and inventing one
 * would put a student on a page describing a course nobody teaches.
 */
export async function getOffering(slug: string): Promise<OfferingDetail | null> {
  const dto = await get<OfferingDetailDto>(`/public/courses/${encodeURIComponent(slug)}`, {
    revalidate: REVALIDATE.universities,
    tags: [TAG_CATALOGUE],
  });

  return dto ? toOfferingDetail(dto) : null;
}

// ── Scholarships ─────────────────────────────────────────────────────────────

export async function getScholarships(): Promise<Scholarship[]> {
  const items = await getAll<ScholarshipDto>("/public/scholarships", {
    revalidate: REVALIDATE.universities,
    tags: [TAG_CATALOGUE],
  });

  if (!items || items.length === 0) return fallbackScholarships;
  return items.map(toScholarship);
}
