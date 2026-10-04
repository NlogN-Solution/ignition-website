"use client";

import { useMemo, useState } from "react";
import { CareerCard } from "./CareerCard";
import { SearchField } from "../ui/SearchField";
import {
  ActiveFilters,
  ExplorerShell,
  FilterGroup,
  FilterSidebar,
  OptionList,
} from "../ui/filters";
import { EmptyResults, ResultCount } from "../ui/ResultCount";
import { facetCounts } from "@/lib/search/facets";
import { careers, type Career } from "@/data/careers";
import { interestLabels } from "@/lib/quiz/labels";
import type { Interest } from "@/lib/quiz/types";

/**
 * Filtering runs client-side over the bundled career list — the dataset is
 * small enough that a round trip would only add latency. When the catalogue
 * grows past a few hundred entries this moves behind `lib/search/`.
 *
 * One facet, but it sits in the same rail the other explorers use rather than
 * as a row of chips above the cards: the three catalogue pages should not each
 * teach a different way to narrow a list.
 */
const filters = Object.keys(interestLabels) as Interest[];

const inInterest = (career: Career, interest: Interest) =>
  Boolean(career.weights.interests?.[interest]);

/** `interestLabels` reads as a sentence fragment — "in technology". */
const titleCase = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export function CareerExplorer() {
  const [query, setQuery] = useState("");
  const [interest, setInterest] = useState<Interest | null>(null);

  const pools = useMemo(() => {
    const needle = query.trim().toLowerCase();

    const matchesQuery = (career: Career) =>
      !needle ||
      career.title.toLowerCase().includes(needle) ||
      career.tagline.toLowerCase().includes(needle) ||
      career.degreeSubjects.some((subject) => subject.toLowerCase().includes(needle));

    /* One facet, so the leave-one-out pool is simply the query-matched set. */
    const searched = careers.filter(matchesQuery);

    return {
      results: interest
        ? searched.filter((career) => inInterest(career, interest))
        : searched,
      interest: searched,
    };
  }, [query, interest]);

  const results = pools.results;

  const counts = useMemo(
    () => facetCounts(pools.interest, filters, inInterest),
    [pools.interest],
  );

  function clearAll() {
    setQuery("");
    setInterest(null);
  }

  const applied = interest
    ? [
        {
          key: "interest",
          label: titleCase(interestLabels[interest]),
          onRemove: () => setInterest(null),
        },
      ]
    : [];

  return (
    <ExplorerShell
      sidebar={
        <FilterSidebar
          activeCount={interest ? 1 : 0}
          onClear={clearAll}
          resultSummary={`Show ${results.length} ${
            results.length === 1 ? "career" : "careers"
          }`}
        >
          <FilterGroup
            label="Interest"
            activeLabel={interest ? titleCase(interestLabels[interest]) : null}
          >
            <OptionList
              options={filters}
              value={interest}
              onChange={setInterest}
              counts={counts}
              format={(key) => titleCase(interestLabels[key])}
            />
          </FilterGroup>
        </FilterSidebar>
      }
    >
      <SearchField
        label="Search careers"
        value={query}
        onChange={setQuery}
        placeholder="Search careers or degree subjects"
      />

      {applied.length > 0 ? (
        <div className="mt-4">
          <ActiveFilters items={applied} />
        </div>
      ) : null}

      <div className="mt-5">
        <ResultCount
          count={results.length}
          noun={["career", "careers"]}
          suffix={interest ? `in ${interestLabels[interest]}` : undefined}
          onClear={interest || query ? clearAll : undefined}
        />
      </div>

      {results.length ? (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {results.map((career) => (
            <li key={career.id} className="min-w-0">
              <CareerCard career={career} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4">
          <EmptyResults>
            Nothing matched that. Try a broader search, or clear the filter.
          </EmptyResults>
        </div>
      )}
    </ExplorerShell>
  );
}
