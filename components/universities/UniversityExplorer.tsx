"use client";

import { useEffect, useMemo, useState } from "react";
import { UniversityCard } from "./UniversityCard";
import {
  FilterBar,
  FilterFields,
  FilterFooter,
  FilterSearch,
  SearchableSelectField,
  SelectField,
  ToggleChip,
  type FilterOption,
} from "../ui/FilterBar";
import { ActiveFilters } from "../ui/filters";
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
 * It shares its chrome with the course explorer: one horizontal `FilterBar`
 * above the results, with option counts drawn from a leave-one-out pool per
 * facet. It used to run its facets down a rail on the left instead — the same
 * filters, operated a different way from the other half of the same decision,
 * and costing the grid a third of its width on every visit for a set of
 * controls most students touch once. See `CourseExplorer` for why the counts
 * are built the way they are.
 *
 * The records arrive as a prop from the server rather than being imported:
 * they come from the API now. Filtering stays here — 44 records is nothing,
 * and a round trip per keystroke would only add latency, which is the
 * opposite of the call made for `CourseExplorer` and its ~4,800 offerings.
 */
export function UniversityExplorer({ universities }: { universities: University[] }) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<Region | null>(null);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [tuition, setTuition] = useState<TuitionBand | null>(null);
  const [placementOnly, setPlacementOnly] = useState(false);
  const [scholarshipsOnly, setScholarshipsOnly] = useState(false);

  /**
   * The URL seeds the search and is then let go of. Added so the homepage
   * search can send a student here with their words intact — before this,
   * switching that search to "Universities" threw the query away and dropped
   * them on an unfiltered list.
   *
   * Read from `location` in an effect rather than through `useSearchParams`,
   * which would put this whole subtree — the 44 cards included — behind a
   * Suspense boundary that only fills in on the client. The seed is a
   * convenience; the list is the page, and the list belongs in the HTML.
   */
  useEffect(() => {
    const incoming = new URLSearchParams(window.location.search).get("q");
    if (incoming) setQuery(incoming.slice(0, 80));
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
    const needle = query.trim().toLowerCase();

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
      university.name.toLowerCase().includes(needle) ||
      university.city.toLowerCase().includes(needle) ||
      university.tagline.toLowerCase().includes(needle);

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
    setQuery("");
    setRegion(null);
    setSubject(null);
    setTuition(null);
    setPlacementOnly(false);
    setScholarshipsOnly(false);
  }

  const applied = [
    region && { key: "region", label: region, onRemove: () => setRegion(null) },
    subject && { key: "subject", label: subject, onRemove: () => setSubject(null) },
    tuition && { key: "tuition", label: tuition, onRemove: () => setTuition(null) },
    placementOnly && {
      key: "placement",
      label: "Placement year",
      onRemove: () => setPlacementOnly(false),
    },
    scholarshipsOnly && {
      key: "scholarships",
      label: "Offers scholarships",
      onRemove: () => setScholarshipsOnly(false),
    },
  ].filter(Boolean) as { key: string; label: string; onRemove: () => void }[];

  return (
    <div>
      <FilterBar>
        <FilterSearch
          label="Search universities"
          value={query}
          onChange={setQuery}
          placeholder="Search by university or city — “Coventry”, “Manchester”…"
        />

        <FilterFields>
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
      </FilterBar>

      {applied.length > 0 ? (
        <div className="mt-4">
          <ActiveFilters items={applied} />
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
          /* Three across from `lg`, where the two-column grid used to sit
             beside a filter rail. With the rail gone the same two columns
             would stretch each card past 500px, which the three-photo header
             was never drawn for — and this is the width the course grid
             uses. */
          className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
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
    </div>
  );
}
