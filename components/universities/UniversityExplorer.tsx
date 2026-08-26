"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { UniversityCard } from "./UniversityCard";
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
import { subjects, type Subject } from "@/data/courses";
import {
  regions,
  universities,
  type Region,
  type University,
} from "@/data/universities";

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

/**
 * The university catalogue, filtered client-side. It shares its chrome with
 * every other explorer: facets in a rail on the left, results beside them,
 * option counts from a leave-one-out pool per facet. See `CourseExplorer` for
 * why the counts are built that way.
 */
export function UniversityExplorer() {
  const params = useSearchParams();

  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<Region | null>(null);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [tuition, setTuition] = useState<TuitionBand | null>(null);
  const [placementOnly, setPlacementOnly] = useState(false);
  const [scholarshipsOnly, setScholarshipsOnly] = useState(false);

  /**
   * The URL seeds the search and is then let go of, exactly as CourseExplorer
   * does. Added so the homepage search can send a student here with their
   * words intact — before this, switching that search to "Universities" threw
   * the query away and dropped them on an unfiltered list.
   */
  useEffect(() => {
    const incoming = params.get("q");
    if (incoming) setQuery(incoming.slice(0, 80));
    // Seeded once, from the URL that opened the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  }, [query, region, subject, tuition, placementOnly, scholarshipsOnly]);

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

  const filtered = activeCount > 0 || query.length > 0;

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

  const extras = [placementOnly && "Placement year", scholarshipsOnly && "Scholarships"]
    .filter(Boolean)
    .join(", ");

  return (
    <ExplorerShell
      sidebar={
        <FilterSidebar
          activeCount={activeCount}
          onClear={clearAll}
          resultSummary={`Show ${results.length} ${
            results.length === 1 ? "university" : "universities"
          }`}
        >
          <FilterGroup label="Location" activeLabel={region}>
            <OptionList
              options={regions}
              value={region}
              onChange={setRegion}
              counts={counts.region}
            />
          </FilterGroup>

          <FilterGroup label="Subject" activeLabel={subject}>
            <OptionList
              options={subjects}
              value={subject}
              onChange={setSubject}
              counts={counts.subject}
            />
          </FilterGroup>

          <FilterGroup label="Tuition, per year" activeLabel={tuition}>
            <OptionList
              options={tuitionBands}
              value={tuition}
              onChange={setTuition}
              counts={counts.tuition}
            />
          </FilterGroup>

          <FilterGroup label="Also show only" activeLabel={extras || null}>
            <div className="-mx-2 space-y-px">
              <SwitchRow
                label="Placement year available"
                active={placementOnly}
                onChange={setPlacementOnly}
                count={counts.placement}
              />
              <SwitchRow
                label="Offers scholarships"
                active={scholarshipsOnly}
                onChange={setScholarshipsOnly}
                count={counts.scholarships}
              />
            </div>
          </FilterGroup>
        </FilterSidebar>
      }
    >
      <SearchField
        label="Search universities"
        value={query}
        onChange={setQuery}
        placeholder="Search universities or cities"
      />

      {applied.length > 0 ? (
        <div className="mt-4">
          <ActiveFilters items={applied} />
        </div>
      ) : null}

      <div className="mt-5">
        <ResultCount
          count={results.length}
          noun={["university", "universities"]}
          onClear={filtered ? clearAll : undefined}
        />
      </div>

      {results.length ? (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {results.map((university) => (
            <li key={university.id} className="min-w-0">
              <UniversityCard university={university} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4">
          <EmptyResults>
            Nothing matched that combination. Try widening the tuition band or
            clearing the location filter.
          </EmptyResults>
        </div>
      )}
    </ExplorerShell>
  );
}
