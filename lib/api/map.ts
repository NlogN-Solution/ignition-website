import type { Course, CourseLevel, Subject } from "@/data/courses/types";
import { courseLevels, subjects } from "@/data/courses/types";
import type {
  Award,
  Employability,
  EntryRoute,
  InterviewProfile,
  Milestone,
  Ranking,
  RecognitionSection,
  Region,
  University,
} from "@/data/universities/types";
import { regions } from "@/data/universities/types";
import type { NationalityGroup, Scholarship, StudyLevel } from "@/data/scholarships";
import type { BlogPost, BlogSection } from "@/data/blog";
import type {
  ContentDto,
  ContentPage,
  CourseProfileDto,
  Facets,
  FacetsDto,
  Offering,
  OfferingDto,
  RouteDto,
  ScholarshipDto,
  UniversityDetailDto,
  UniversitySummaryDto,
} from "./types";

/**
 * DTO → domain type, one function per entity.
 *
 * **This file is the drift test.** the `data` type modules are the contract the whole
 * site is written against and they do not change; the generated `schema.d.ts`
 * is whatever the API currently serves. Every difference between the two has to
 * be resolved here, explicitly, which means a backend rename or a dropped field
 * fails `npm run typecheck` instead of turning into `undefined` on a page.
 *
 * The other rule these mappers keep is **hide-when-absent**. Optional keys are
 * assigned only when the API sent a value, never set to `undefined`, because
 * the components downstream test for the key's presence to decide whether to
 * render a section at all. `exclude_none` on the API and `set()` here are two
 * halves of the same contract.
 */

/** Assign only when there is something to assign. */
function set<T extends object, K extends keyof T>(target: T, key: K, value: T[K] | null | undefined) {
  if (value === null || value === undefined) return;
  if (Array.isArray(value) && value.length === 0) return;
  target[key] = value;
}

const isRegion = (value: string | null | undefined): value is Region =>
  value != null && (regions as readonly string[]).includes(value);

const isSubject = (value: string | null | undefined): value is Subject =>
  value != null && (subjects as readonly string[]).includes(value);

const isCourseLevel = (value: string | null | undefined): value is CourseLevel =>
  value != null && (courseLevels as readonly string[]).includes(value);

/** Read a key off a free-form JSON object as a string. */
function text(source: Record<string, unknown> | null | undefined, key: string): string | undefined {
  const value = source?.[key];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function num(source: Record<string, unknown> | null | undefined, key: string): number | undefined {
  const value = source?.[key];
  return typeof value === "number" ? value : undefined;
}

function list(source: Record<string, unknown> | null | undefined, key: string): string[] {
  const value = source?.[key];
  return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === "string") : [];
}

/**
 * `route_key` is an enum on the wire (`international_foundation_year`), and
 * every route also carries the workbook's own column header in `label`. The
 * header is what staff wrote and what a student will see on the university's
 * site, so it wins where it exists; this is the readable fallback for the
 * handful of rows that have none.
 */
const routeNames: Record<string, string> = {
  undergraduate: "Undergraduate",
  postgraduate: "Postgraduate",
  pre_masters: "Pre-Masters",
  extended_masters: "Extended Masters",
  international_foundation_year: "International Foundation Year",
  international_year_one: "International Year One",
  top_up: "Top-up",
  nursing: "Nursing",
  mres: "MRes",
  dba: "DBA",
};

/** Title Case a route key nothing above recognises, rather than printing the enum. */
const routeFallback = (key: string) =>
  key.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

export function routeLabel(route: EntryRoute): string {
  return route.label ?? routeNames[route.key] ?? routeFallback(route.key);
}

/**
 * The entry-criteria matrix.
 *
 * The API has served these on the university detail since the catalogue
 * import; nothing read them, so the real requirements sat in the payload while
 * the page showed a two-line summary. Mapping them here is what puts the
 * workbook on the site.
 *
 * "N/A" is dropped rather than printed. It is the spreadsheet's way of writing
 * an empty cell, and rendering "English waiver: N/A" states a policy the
 * university never gave — the absent-means-hidden rule this file keeps applies
 * to a placeholder as much as to a null.
 */
function toEntryRoutes(routes: RouteDto[] | null | undefined): EntryRoute[] | undefined {
  if (!routes?.length) return undefined;

  const clean = (value: string | null | undefined): string | undefined => {
    const trimmed = value?.trim();
    if (!trimmed || trimmed.toUpperCase() === "N/A") return undefined;
    return trimmed;
  };

  const mapped = routes.map((route) => {
    const entry: EntryRoute = { key: route.route_key };

    set(entry, "label", clean(route.label));
    set(entry, "academic", clean(route.academic_criteria));
    set(entry, "english", clean(route.english_criteria));
    set(entry, "englishWaiver", clean(route.english_waiver));
    set(entry, "fees", clean(route.fee_structure));
    set(entry, "scholarship", clean(route.scholarship_text));
    set(entry, "gapPolicy", clean(route.gap_policy));
    set(entry, "casDeposit", clean(route.cas_deposit));
    set(entry, "enrolmentFee", clean(route.enrolment_fee));
    set(entry, "deadlines", clean(route.deadlines));
    set(entry, "previousRefusal", clean(route.previous_refusal));

    // `extras` is the importer's long tail — "PATHWAY PROGRAMME", "LONDON
    // CAMPUS" — kept so nothing in the file is lost. Values arrive as unknown
    // and only the string ones can be rendered.
    const extras = Object.entries(route.extras ?? {}).reduce<Record<string, string>>(
      (accumulator, [label, value]) => {
        const usable = typeof value === "string" ? clean(value) : undefined;
        if (usable) accumulator[label] = usable;
        return accumulator;
      },
      {},
    );
    if (Object.keys(extras).length) entry.extras = extras;

    return entry;
  });

  // A route whose every cell was blank or "N/A" carries no information, and an
  // accordion row that opens onto nothing is worse than one that is not there.
  return mapped.filter((entry) => Object.keys(entry).length > 1);
}

// ── Universities ─────────────────────────────────────────────────────────────

/**
 * The summary and the detail record share every field the explorer reads, so
 * one mapper covers both. A summary simply produces a `University` whose
 * optional sections are all absent — which is exactly what the detail page
 * would render for a record nobody has written copy for yet.
 */
export function toUniversity(dto: UniversitySummaryDto | UniversityDetailDto): University {
  const detail = dto as Partial<UniversityDetailDto>;
  const accommodation = (detail.accommodation ?? null) as Record<string, unknown> | null;
  const entry = (detail.entry ?? null) as Record<string, unknown> | null;

  const university: University = {
    id: dto.slug,
    name: dto.name,
    city: dto.city ?? "",
    // A region outside the published vocabulary would break the facet rail, so
    // it is dropped rather than passed through as a string the filters cannot
    // match. The API serves the same enum, so this only fires on real drift.
    region: isRegion(dto.region) ? dto.region : regions[0],
    tagline: dto.tagline ?? "",
    overview: detail.overview ?? "",
    studentExperience: detail.student_experience ?? "",
    careers: detail.careers_text ?? "",
    tuition: { min: dto.tuition_min ?? 0, max: dto.tuition_max ?? 0 },
    livingCostMonthly: dto.living_cost_monthly ?? 0,
    accommodation: {
      guaranteed: accommodation?.guaranteed === true,
      weeklyFrom: num(accommodation, "weeklyFrom") ?? 0,
      weeklyTo: num(accommodation, "weeklyTo") ?? 0,
      note: text(accommodation, "note") ?? "",
    },
    entry: {
      typical: text(entry, "typical") ?? "",
      english: text(entry, "english") ?? "",
    },
    // Scholarships arrive as their own records, not nested on the university.
    // The detail page joins them back on; a summary has none.
    scholarships: (detail.scholarships ?? []).map((award) => ({
      name: award.name,
      amount: award.amount ?? "",
      detail: award.eligibility ?? "",
    })),
    placementYear: dto.placement_year ?? false,
    internationalSupport: detail.international_support ?? [],
    facilities: detail.facilities ?? [],
    subjects: (dto.subjects ?? []).filter(isSubject),
    destination: "UK",
  };

  set(university.entry, "tariff", num(entry, "tariff"));
  set(university.entry, "ielts", num(entry, "ielts"));

  set(university, "monogram", dto.monogram);
  set(university, "logo", dto.logo_url);
  set(university, "founded", detail.founded);
  set(university, "kind", detail.kind);
  set(university, "campus", detail.campus);
  set(university, "studentPopulation", detail.student_population);
  set(university, "internationalStudents", detail.international_students);
  set(university, "studentStaffRatio", detail.student_staff_ratio);
  set(university, "history", detail.history);
  set(university, "milestones", (detail.milestones ?? undefined) as Milestone[] | undefined);
  set(university, "rankings", (detail.rankings ?? undefined) as Ranking[] | undefined);
  set(university, "awards", (detail.awards ?? undefined) as Award[] | undefined);
  set(
    university,
    "recognition",
    (detail.recognition ?? undefined) as RecognitionSection[] | undefined,
  );
  set(university, "employability", (detail.employability ?? undefined) as Employability | undefined);
  set(university, "entryRoutes", toEntryRoutes(detail.routes));
  set(university, "interview", (detail.interview_profile ?? undefined) as InterviewProfile | undefined);

  return university;
}

// ── Courses ──────────────────────────────────────────────────────────────────

/** The editorial explainer behind `/courses/[course]`. */
export function toCourse(dto: CourseProfileDto, universitySlugs: string[] = []): Course {
  const entry = (dto.entry ?? null) as Record<string, unknown> | null;

  return {
    id: dto.slug,
    title: dto.title,
    qualification: dto.qualification ?? "",
    subject: isSubject(dto.subject) ? dto.subject : subjects[0],
    level: isCourseLevel(dto.course_level) ? dto.course_level : "Undergraduate",
    durationYears: dto.duration_years ?? 3,
    placement: dto.placement ?? false,
    overview: dto.overview ?? "",
    whatYouStudy: dto.what_you_study ?? "",
    modules: (dto.modules ?? []).map((module) => ({
      year: text(module, "year") ?? "",
      items: list(module, "items"),
    })),
    skills: dto.skills ?? [],
    entry: {
      academic: text(entry, "academic") ?? "",
      subjects: text(entry, "subjects") ?? "",
      english: text(entry, "english") ?? "",
    },
    careerOutcomes: dto.career_outcomes ?? [],
    relatedCareers: dto.related_careers ?? [],
    universities: universitySlugs,
    destination: "UK",
  };
}

/** One university's offering — the grain the explorer searches. */
export function toOffering(dto: OfferingDto): Offering {
  const offering: Offering = {
    slug: dto.slug,
    title: dto.title,
    placement: dto.placement ?? false,
    university: dto.university
      ? {
          slug: dto.university.slug,
          name: dto.university.name,
          ...(dto.university.city ? { city: dto.university.city } : {}),
          ...(dto.university.region ? { region: dto.university.region } : {}),
        }
      : null,
    demo: dto.is_example ?? false,
  };

  set(offering, "qualification", dto.qualification);
  set(offering, "subject", dto.subject);
  set(offering, "level", dto.course_level);
  set(offering, "durationYears", dto.duration_years);
  set(offering, "campus", dto.campus);
  set(offering, "profileSlug", dto.course_profile_slug);

  return offering;
}

export function toFacets(dto: FacetsDto): Facets {
  const options = (entries: FacetsDto["route"]) =>
    entries.map((entry) => ({ value: entry.value, label: entry.label, count: entry.count }));

  return {
    route: options(dto.route),
    level: options(dto.level),
    subject: options(dto.subject),
    duration: options(dto.duration),
    university: options(dto.university),
    placement: dto.placement,
    total: dto.total,
  };
}

// ── Scholarships ─────────────────────────────────────────────────────────────

const studyLevelValues: readonly string[] = ["Undergraduate", "Postgraduate"];
const nationalityValues: readonly string[] = [
  "All international students",
  "Commonwealth countries",
  "South Asia",
  "Africa",
];

export function toScholarship(dto: ScholarshipDto): Scholarship {
  const source = (dto.source ?? null) as Record<string, unknown> | null;
  const levels = (dto.levels ?? []).filter((level): level is StudyLevel =>
    studyLevelValues.includes(level),
  );
  const awardSubjects = (dto.subjects ?? []).filter(isSubject);
  const nationality = dto.nationality_group;

  const scholarship: Scholarship = {
    id: dto.slug,
    name: dto.name,
    provider: dto.provider ?? "",
    kind: dto.kind === "external" ? "external" : "university",
    levels: levels.length ? levels : ["Undergraduate"],
    // `null` is not "none" here — it is the API saying the award is open to any
    // subject, which is a different statement from an empty list.
    subjects: awardSubjects.length ? awardSubjects : null,
    nationality: nationalityValues.includes(nationality ?? "")
      ? (nationality as NationalityGroup)
      : null,
    amount: dto.amount ?? null,
    deadline: dto.deadline ?? null,
    eligibility: dto.eligibility ?? "",
    applyVia: dto.apply_via ?? "",
    source: {
      label: text(source, "label") ?? dto.provider ?? dto.name,
      href: text(source, "href") ?? "",
    },
    demo: dto.is_example ?? false,
  };

  set(scholarship, "universityId", dto.university_slug);

  return scholarship;
}

// ── Content ──────────────────────────────────────────────────────────────────

export function toContentPage(dto: ContentDto): ContentPage {
  const page: ContentPage = {
    key: dto.key,
    kind: dto.kind,
    title: dto.title,
    related: ((dto.related ?? []) as Record<string, unknown>[])
      .map((entry) => ({ label: text(entry, "label") ?? "", href: text(entry, "href") ?? "" }))
      .filter((entry) => entry.label && entry.href),
    blocks: (dto.blocks ?? []).map((block) => ({
      type: block.block_type,
      data: block.data as Record<string, unknown>,
    })),
  };

  set(page, "slug", dto.slug);
  set(page, "excerpt", dto.excerpt);
  set(page, "tag", dto.tag);
  set(page, "hero", (dto.hero ?? undefined) as Record<string, unknown> | undefined);
  set(page, "seo", (dto.seo ?? undefined) as Record<string, unknown> | undefined);
  set(page, "source", (dto.source ?? undefined) as { label?: string; href?: string } | undefined);
  set(page, "readingMinutes", dto.reading_minutes);
  set(page, "published", typeof dto.published_at === "string" ? dto.published_at : undefined);

  return page;
}

const blogTags: readonly BlogPost["tag"][] = ["Money", "Choosing", "Applying", "Visa", "Arriving"];

/**
 * A `kind="post"` content page as the blog renders it.
 *
 * The blog's own shape predates the CMS: a standfirst, then headed sections.
 * That maps onto blocks with one asymmetry worth knowing — the first `prose`
 * block *without* a heading is read as the standfirst, because that is exactly
 * what a lead paragraph is and asking editors to fill a separate field for it
 * would only produce posts where it is empty.
 */
export function toBlogPost(page: ContentPage): BlogPost {
  const proseBlocks = page.blocks.filter((block) => block.type === "prose");
  const leadIndex = proseBlocks.findIndex((block) => !text(block.data, "heading"));

  const standfirst =
    leadIndex >= 0 ? list(proseBlocks[leadIndex].data, "paragraphs").join(" ") : (page.excerpt ?? "");

  const sections: BlogSection[] = proseBlocks
    .filter((_, index) => index !== leadIndex)
    .map((block) => {
      const section: BlogSection = {
        heading: text(block.data, "heading") ?? "",
        paragraphs: list(block.data, "paragraphs"),
      };
      const points = list(block.data, "points");
      if (points.length) section.points = points;
      return section;
    });

  const post: BlogPost = {
    id: page.slug ?? page.key,
    title: page.title,
    excerpt: page.excerpt ?? "",
    published: page.published ?? "",
    readingMinutes: page.readingMinutes ?? 5,
    tag: blogTags.includes(page.tag as BlogPost["tag"]) ? (page.tag as BlogPost["tag"]) : "Choosing",
    standfirst,
    sections,
    related: page.related,
  };

  if (page.source?.label && page.source.href) {
    post.source = { label: page.source.label, href: page.source.href };
  }

  return post;
}
