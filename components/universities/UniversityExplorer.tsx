"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { updateExplorerUrl, type UniversityParams } from "@/lib/search/explorerQuery";
import { trackSearch } from "@/lib/search/analytics";
import { normalizeQuery } from "@/lib/search/query";
import { UniversityCard } from "./UniversityCard";
import {
  FilterFields,
  FilterFooter,
  FilterSearch,
  SearchableSelectField,
  SelectField,
  ToggleChip,
  type FilterOption,
} from "../ui/FilterBar";
import { ExplorerShell, FilterSidebar, ActiveFilters } from "../ui/filters";
import { EmptyResults, ResultCount } from "../ui/ResultCount";
import { facetCounts } from "@/lib/search/facets";
import { subjects, type Subject } from "@/data/courses";
import { regions, type Region, type University } from "@/data/universities";

const tuitionBands = ["Under £18,000", "£18,000–£25,000", "Over £25,000"] as const;
type TuitionBand = (typeof tuitionBands)[number];

function inBand(min: number, band: TuitionBand) {
  if (band === "Under £18,000") return min < 18000;
  if (band === "£18,000–£25,000") return min >= 18000 && min <= 25000;
  return min > 25000;
}

const filterKeys = [
  "region",
  "subject",
  "tuition",
  "placement",
  "scholarships",
] as const;
type FilterKey = (typeof filterKeys)[number];

/** Facet values are plain strings here; the bar wants `{ value, count }`. */
function toOptions<T extends string>(
  options: readonly T[],
  counts: Record<T, number>,
): FilterOption[] {
  return options.map((option) => ({ value: option, label: option, count: counts[option] }));
}

/**
 * The university catalogue, filtered client-side.
 *
 * Filters stay in the left rail, with a filter sheet on smaller screens.
 * Option counts are drawn from a leave-one-out pool per facet.
 *
 * The records arrive as a prop from the server rather than being imported:
 * they come from the API now. Filtering stays here — 44 records is nothing,
 * and a round trip per keystroke would only add latency, which is the
 * opposite of the call made for `CourseExplorer` and its ~4,800 offerings.
 */
export function UniversityExplorer({ universities, params }: { universities: University[]; params: UniversityParams }) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState(params.q ?? "");
  const [previousQuery, setPreviousQuery] = useState(params.q);
  if (previousQuery !== params.q) {
    setPreviousQuery(params.q);
    setQuery(params.q ?? "");
  }
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const region = regions.find(value => value === params.region) ?? null;
  const subject = subjects.find(value => value === params.subject) ?? null;
  const tuition = tuitionBands.find(value => value === params.tuition) ?? null;
  const placementOnly = Boolean(params.placement);
  const scholarshipsOnly = Boolean(params.scholarships);
  function commit(changes: Record<string, string | null>) {
    if (timer.current) clearTimeout(timer.current);
    trackSearch("search_filter_changed", { keys: Object.keys(changes).join(","), explorer: "universities" });
    router.push(updateExplorerUrl(pathname, { ...params }, { ...(query !== (params.q ?? "") ? { q: query.trim() || null } : {}), ...changes }), { scroll: false });
  }
  const setRegion = (value: Region | null) => commit({ region: value });
  const setSubject = (value: Subject | null) => commit({ subject: value });
  const setTuition = (value: TuitionBand | null) => commit({ tuition: value });
  const setPlacementOnly = (value: boolean) => commit({ placement: value ? "true" : null });
  const setScholarshipsOnly = (value: boolean) => commit({ scholarships: value ? "true" : null });
  function changeQuery(value: string) {
    setQuery(value);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => commit({ q: value.trim() || null }), 350);
  }
  useEffect(() => { if (timer.current) clearTimeout(timer.current); }, [params]);
  useEffect(() => {
    const cancel = () => { if (timer.current) clearTimeout(timer.current); };
    window.addEventListener("popstate", cancel);
    return () => { cancel(); window.removeEventListener("popstate", cancel); };
  }, []);

  /**
   * Hide the tuition field when nothing has a fee on it.
   *
   * Fees are the one figure the spreadsheet states as prose rather than a
   * number, so they reach a record only once someone confirms them in the
   * admin. A band list where every option reads zero is not a filter, it is a
   * dead end — and this is the same hide-when-absent rule the detail page's
   * sections follow.
   */
  const hasTuition = useMemo(
    () => universities.some((university) => university.tuition.min > 0),
    [universities],
  );

  const pools = useMemo(() => {
    const needle = normalizeQuery(query);

    const tests: Record<FilterKey, (university: University) => boolean> = {
      region: (university) => !region || university.region === region,
      subject: (university) => !subject || university.subjects.includes(subject),
      tuition: (university) => !tuition || inBand(university.tuition.min, tuition),
      placement: (university) => !placementOnly || university.placementYear,
      scholarships: (university) =>
        !scholarshipsOnly || university.scholarships.length > 0,
    };

    const matchesQuery = (university: University) =>
      !needle ||
      normalizeQuery(university.name).includes(needle) ||
      normalizeQuery(university.city).includes(needle) ||
      normalizeQuery(university.tagline).includes(needle);

    const subset = (except?: FilterKey) =>
      universities.filter(
        (university) =>
          matchesQuery(university) &&
          filterKeys.every((key) => key === except || tests[key](university)),
      );

    return {
      results: subset(),
      region: subset("region"),
      subject: subset("subject"),
      tuition: subset("tuition"),
      placement: subset("placement"),
      scholarships: subset("scholarships"),
    };
  }, [universities, query, region, subject, tuition, placementOnly, scholarshipsOnly]);

  const results = pools.results;

  const counts = useMemo(
    () => ({
      region: facetCounts(pools.region, regions, (u, r) => u.region === r),
      subject: facetCounts(pools.subject, subjects, (u, s) => u.subjects.includes(s)),
      tuition: facetCounts(pools.tuition, tuitionBands, (u, band) =>
        inBand(u.tuition.min, band),
      ),
      placement: pools.placement.filter((u) => u.placementYear).length,
      scholarships: pools.scholarships.filter((u) => u.scholarships.length > 0).length,
    }),
    [pools],
  );

  const activeCount =
    (region ? 1 : 0) +
    (subject ? 1 : 0) +
    (tuition ? 1 : 0) +
    (placementOnly ? 1 : 0) +
    (scholarshipsOnly ? 1 : 0);

  // The search term counts toward the bar's tally, the same as a facet: see
  // `CourseExplorer`.
  const barCount = activeCount + (query.trim() ? 1 : 0);

  function clearAll() {
    if (timer.current) clearTimeout(timer.current);
    setQuery("");
    router.push(pathname, { scroll: false });
  }

  const applied = [
    { key: "region", label: region }, { key: "subject", label: subject }, { key: "tuition", label: tuition },
    { key: "placement", label: placementOnly ? "Placement year" : null },
    { key: "scholarships", label: scholarshipsOnly ? "Offers scholarships" : null },
  ].filter((entry): entry is { key: string; label: string } => Boolean(entry.label));

  const fields = (
        <FilterFields vertical>
          <SelectField
            label="Location"
            options={toOptions(regions, counts.region)}
            value={region}
            onChange={(next) => setRegion(next as Region | null)}
          />

          {/* Subject is the one list long enough to want typing rather than
              scrolling, so it takes the same searchable field the course bar
              gives University. */}
          <SearchableSelectField
            label="Subject"
            placeholder="Type a subject…"
            emptyText={(term) => `No subjects match “${term}”.`}
            options={toOptions(subjects, counts.subject)}
            value={subject}
            onChange={(next) => setSubject(next as Subject | null)}
          />

          {hasTuition ? (
            <SelectField
              label="Tuition, per year"
              options={toOptions(tuitionBands, counts.tuition)}
              value={tuition}
              onChange={(next) => setTuition(next as TuitionBand | null)}
            />
          ) : null}
        </FilterFields>
  );
  const footer = (
        <FilterFooter activeCount={barCount} onClear={clearAll}>
          <ToggleChip
            label="Placement year available"
            active={placementOnly}
            onChange={setPlacementOnly}
            count={counts.placement}
          />
          <ToggleChip
            label="Offers scholarships"
            active={scholarshipsOnly}
            onChange={setScholarshipsOnly}
            count={counts.scholarships}
          />
        </FilterFooter>
  );
  const search = <FilterSearch label="Search universities" value={query} onChange={changeQuery} placeholder="Search by university or city…" />;
  const resultContent = <>


      {applied.length > 0 ? (
        <div className="mt-4">
          <ActiveFilters items={applied} onRemove={key => commit({ [key]: null })} />
        </div>
      ) : null}

      <div className="mt-5">
        <ResultCount
          count={results.length}
          noun={["university", "universities"]}
        />
      </div>

      {results.length ? (
        <ul
          className="mt-4 grid gap-4 sm:grid-cols-2"
        >
          {results.map((university) => (
            <li key={university.id} className="min-w-0">
              <UniversityCard university={university} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4">
          <EmptyResults>
            Nothing matched that combination. Try clearing the location filter
            or choosing a different subject.
          </EmptyResults>
        </div>
      )}
    </>;
  return <ExplorerShell sidebar={<FilterSidebar activeCount={barCount} onClear={clearAll} resultSummary={`Show ${results.length} universities`}>{fields}{footer}</FilterSidebar>}>{search}{resultContent}</ExplorerShell>;
}
