"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CourseCard } from "./CourseCard";
import { SearchField } from "../ui/SearchField";
import {
  ActiveFilters,
  ExplorerShell,
  FilterGroup,
  FilterSidebar,
  OptionList,
  SwitchRow,
} from "../ui/filters";
import { EmptyResults, ResultCount } from "../ui/ResultCount";
import { facetCounts } from "@/lib/search/facets";
import {
  courses,
  durationLabel,
  studyRoute,
  studyRoutes,
  subjects,
  type Course,
  type CourseLevel,
  type StudyRouteId,
  type Subject,
} from "@/data/courses";
import { universities } from "@/data/universities";

const durations = ["1 year", "3 years", "4 years", "5 years"] as const;
type Duration = (typeof durations)[number];

const routeIds = studyRoutes.map((route) => route.id);
const universityIds = universities.map((university) => university.id);

const isRouteId = (value: string | null): value is StudyRouteId =>
  value !== null && routeIds.includes(value as StudyRouteId);

/** The facets, in the order they appear in the rail. */
const filterKeys = [
  "route",
  "level",
  "subject",
  "duration",
  "university",
  "placement",
] as const;
type FilterKey = (typeof filterKeys)[number];

/**
 * Filtering runs client-side over the bundled catalogue — small enough that a
 * round trip would only add latency. When this grows past a few hundred
 * courses it moves behind `lib/search/`.
 *
 * The facets live in a rail beside the results (`ExplorerShell`) rather than
 * stacked above them, and each option carries the number of courses it would
 * leave. Those counts come from `pools`: one filtered set per facet, each
 * built with every filter applied *except* that facet's own — count an option
 * against a set its own facet has already narrowed and everything unselected
 * reads zero.
 *
 * Two things about the level facets are worth knowing before editing them.
 *
 * "Study level" is the route — undergraduate, postgraduate, top-up — and it is
 * the one the homepage search links into via `?route=`, so its option ids are
 * part of a URL contract and cannot be renamed casually.
 *
 * "Course type" is dependent on it, and its options are computed from whatever
 * is actually in the filtered set rather than listed statically. Showing
 * "Foundation" as an option while Postgraduate is selected would offer a
 * combination that returns nothing, and a facet that can produce a guaranteed
 * empty state is a worse affordance than no facet at all. It hides itself
 * entirely when the active route contains only one course type, which is the
 * case for both postgraduate and top-up.
 */
export function CourseExplorer() {
  const params = useSearchParams();

  const [query, setQuery] = useState("");
  const [route, setRoute] = useState<StudyRouteId | null>(null);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [level, setLevel] = useState<CourseLevel | null>(null);
  const [duration, setDuration] = useState<Duration | null>(null);
  const [university, setUniversity] = useState<string | null>(null);
  const [placementOnly, setPlacementOnly] = useState(false);

  /**
   * The URL seeds the filters and is then let go of. Writing every chip back
   * into the address bar would put a history entry behind each one, so the
   * back button would walk a student through their own filtering rather than
   * returning them to where they came from.
   */
  useEffect(() => {
    const incomingRoute = params.get("route");
    if (isRouteId(incomingRoute)) setRoute(incomingRoute);

    const incomingQuery = params.get("q");
    if (incomingQuery) setQuery(incomingQuery.slice(0, 80));

    const incomingSubject = params.get("subject");
    if (incomingSubject && (subjects as readonly string[]).includes(incomingSubject)) {
      setSubject(incomingSubject as Subject);
    }
    // Seeded once, from the URL that opened the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const universityNames = useMemo(
    () => Object.fromEntries(universities.map((u) => [u.id, u.name])),
    [],
  );

  /** The results, plus the leave-one-out set each facet counts against. */
  const pools = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const routeLevels = studyRoute(route)?.levels ?? null;

    const tests: Record<FilterKey, (course: Course) => boolean> = {
      route: (course) => !routeLevels || routeLevels.includes(course.level),
      level: (course) => !level || course.level === level,
      subject: (course) => !subject || course.subject === subject,
      duration: (course) =>
        !duration || durationLabel(course.durationYears) === duration,
      university: (course) =>
        !university || course.universities.includes(university),
      placement: (course) => !placementOnly || course.placement,
    };

    const matchesQuery = (course: Course) =>
      !needle ||
      course.title.toLowerCase().includes(needle) ||
      course.qualification.toLowerCase().includes(needle) ||
      course.subject.toLowerCase().includes(needle) ||
      course.overview.toLowerCase().includes(needle) ||
      course.careerOutcomes.some((outcome) => outcome.toLowerCase().includes(needle));

    const subset = (except?: FilterKey) =>
      courses.filter(
        (course) =>
          matchesQuery(course) &&
          filterKeys.every((key) => key === except || tests[key](course)),
      );

    return {
      results: subset(),
      route: subset("route"),
      level: subset("level"),
      subject: subset("subject"),
      duration: subset("duration"),
      university: subset("university"),
      placement: subset("placement"),
    };
  }, [query, route, subject, level, duration, university, placementOnly]);

  const results = pools.results;

  /** Course types present in the current route, in the catalogue's own order. */
  const levelOptions = useMemo(() => {
    const levels = studyRoute(route)?.levels;

    return [
      ...new Set(
        courses
          .filter((course) => !levels || levels.includes(course.level))
          .map((course) => course.level),
      ),
    ];
  }, [route]);

  const counts = useMemo(
    () => ({
      route: facetCounts(
        pools.route,
        routeIds,
        (course, id) => studyRoute(id)?.levels.includes(course.level) ?? false,
      ),
      level: facetCounts(pools.level, levelOptions, (course, l) => course.level === l),
      subject: facetCounts(pools.subject, subjects, (course, s) => course.subject === s),
      duration: facetCounts(
        pools.duration,
        durations,
        (course, d) => durationLabel(course.durationYears) === d,
      ),
      university: facetCounts(pools.university, universityIds, (course, id) =>
        course.universities.includes(id),
      ),
      placement: pools.placement.filter((course) => course.placement).length,
    }),
    [pools, levelOptions],
  );

  const activeCount =
    (route ? 1 : 0) +
    (level ? 1 : 0) +
    (subject ? 1 : 0) +
    (duration ? 1 : 0) +
    (university ? 1 : 0) +
    (placementOnly ? 1 : 0);

  const filtered = activeCount > 0 || query.length > 0;

  function clearAll() {
    setQuery("");
    setRoute(null);
    setSubject(null);
    setLevel(null);
    setDuration(null);
    setUniversity(null);
    setPlacementOnly(false);
  }

  /** Changing route can strand a course type that the new route does not contain. */
  function changeRoute(next: StudyRouteId | null) {
    setRoute(next);

    const levels = studyRoute(next)?.levels;
    if (level && levels && !levels.includes(level)) setLevel(null);
  }

  const routeLabel = studyRoute(route)?.label ?? null;

  const applied = [
    route && { key: "route", label: routeLabel ?? route, onRemove: () => changeRoute(null) },
    level && { key: "level", label: level, onRemove: () => setLevel(null) },
    subject && { key: "subject", label: subject, onRemove: () => setSubject(null) },
    duration && { key: "duration", label: duration, onRemove: () => setDuration(null) },
    university && {
      key: "university",
      label: universityNames[university] ?? university,
      onRemove: () => setUniversity(null),
    },
    placementOnly && {
      key: "placement",
      label: "Placement year",
      onRemove: () => setPlacementOnly(false),
    },
  ].filter(Boolean) as { key: string; label: string; onRemove: () => void }[];

  return (
    <ExplorerShell
      sidebar={
        <FilterSidebar
          activeCount={activeCount}
          onClear={clearAll}
          resultSummary={`Show ${results.length} ${
            results.length === 1 ? "course" : "courses"
          }`}
        >
          <FilterGroup label="Study level" activeLabel={routeLabel}>
            <OptionList
              options={routeIds}
              value={route}
              onChange={changeRoute}
              counts={counts.route}
              format={(id) => studyRoute(id)?.label ?? id}
            />
          </FilterGroup>

          {levelOptions.length > 1 ? (
            <FilterGroup label="Course type" activeLabel={level}>
              <OptionList
                options={levelOptions}
                value={level}
                onChange={setLevel}
                counts={counts.level}
              />
            </FilterGroup>
          ) : null}

          <FilterGroup label="Subject" activeLabel={subject}>
            <OptionList
              options={subjects}
              value={subject}
              onChange={setSubject}
              counts={counts.subject}
            />
          </FilterGroup>

          <FilterGroup label="Duration" activeLabel={duration} defaultOpen={false}>
            <OptionList
              options={durations}
              value={duration}
              onChange={setDuration}
              counts={counts.duration}
            />
          </FilterGroup>

          <FilterGroup
            label="University"
            activeLabel={university ? universityNames[university] : null}
            defaultOpen={false}
          >
            <OptionList
              options={universityIds}
              value={university}
              onChange={setUniversity}
              counts={counts.university}
              format={(id) => universityNames[id] ?? id}
            />
          </FilterGroup>

          <FilterGroup
            label="Placement"
            activeLabel={placementOnly ? "Placement year" : null}
          >
            <div className="-mx-2">
              <SwitchRow
                label="Placement year available"
                active={placementOnly}
                onChange={setPlacementOnly}
                count={counts.placement}
              />
            </div>
          </FilterGroup>
        </FilterSidebar>
      }
    >
      <SearchField
        label="Search courses"
        value={query}
        onChange={setQuery}
        placeholder="Search courses, subjects or career outcomes"
      />

      {applied.length > 0 ? (
        <div className="mt-4">
          <ActiveFilters items={applied} />
        </div>
      ) : null}

      <div className="mt-5">
        <ResultCount
          count={results.length}
          noun={["course", "courses"]}
          onClear={filtered ? clearAll : undefined}
        />
      </div>

      {results.length ? (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {results.map((course) => (
            <li key={course.id} className="min-w-0">
              <CourseCard course={course} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4">
          <EmptyResults>
            Nothing matched that combination. Try clearing a filter, or search
            for a career outcome such as &ldquo;data science&rdquo;.
          </EmptyResults>
        </div>
      )}
    </ExplorerShell>
  );
}
