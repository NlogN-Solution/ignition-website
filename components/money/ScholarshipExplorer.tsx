"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, ExternalLink } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
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
import {
  nationalityGroups,
  studyLevels,
  type NationalityGroup,
  type Scholarship,
  type StudyLevel,
} from "@/data/scholarships";
import type { University } from "@/data/universities";

const filterKeys = ["level", "nationality", "university", "deadline"] as const;
type FilterKey = (typeof filterKeys)[number];

/**
 * The scholarship list, filtered client-side, in the shared explorer chrome:
 * facets in a rail on the left, results beside them, a count on every option
 * from a leave-one-out pool. See `CourseExplorer` for how the pools work.
 *
 * Both lists arrive as props from the server. Filtering stays in the browser
 * for the same reason the university explorer's does: this is a list of tens,
 * not thousands.
 */
export function ScholarshipExplorer({
  scholarships,
  universities,
}: {
  scholarships: Scholarship[];
  universities: University[];
}) {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<StudyLevel | null>(null);
  const [nationality, setNationality] = useState<NationalityGroup | null>(null);
  const [university, setUniversity] = useState<string | null>(null);
  const [deadline, setDeadline] = useState<string | null>(null);

  const universityNames = useMemo(
    () => Object.fromEntries(universities.map((u) => [u.id, u.name])),
    [universities],
  );

  /**
   * The deadline facet is built from the awards themselves.
   *
   * It used to be four fixed dates, which was safe while every deadline came
   * from the same fictional generator. Real deadlines are prose — "31 July",
   * "Rolling", "Two weeks after offer" — so a hardcoded list would silently
   * omit most of them. Only universities named on an award can appear in the
   * university facet, for the same reason.
   */
  const deadlineOptions = useMemo(
    () => [...new Set(scholarships.map((s) => s.deadline).filter((d): d is string => Boolean(d)))].sort(),
    [scholarships],
  );

  const universityIds = useMemo(
    () =>
      universities
        .map((u) => u.id)
        .filter((id) => scholarships.some((s) => s.universityId === id)),
    [universities, scholarships],
  );

  const pools = useMemo(() => {
    const needle = query.trim().toLowerCase();

    const tests: Record<FilterKey, (s: Scholarship) => boolean> = {
      level: (s) => !level || s.levels.includes(level),
      nationality: (s) => !nationality || s.nationality === nationality,
      university: (s) => !university || s.universityId === university,
      deadline: (s) => !deadline || s.deadline === deadline,
    };

    const matchesQuery = (s: Scholarship) =>
      !needle ||
      s.name.toLowerCase().includes(needle) ||
      s.provider.toLowerCase().includes(needle) ||
      s.eligibility.toLowerCase().includes(needle);

    const subset = (except?: FilterKey) =>
      scholarships.filter(
        (s) =>
          matchesQuery(s) &&
          filterKeys.every((key) => key === except || tests[key](s)),
      );

    return {
      results: subset(),
      level: subset("level"),
      nationality: subset("nationality"),
      university: subset("university"),
      deadline: subset("deadline"),
    };
  }, [scholarships, query, level, nationality, university, deadline]);

  const results = pools.results;

  const counts = useMemo(
    () => ({
      level: facetCounts(pools.level, studyLevels, (s, l) => s.levels.includes(l)),
      nationality: facetCounts(
        pools.nationality,
        nationalityGroups,
        (s, group) => s.nationality === group,
      ),
      university: facetCounts(
        pools.university,
        universityIds,
        (s, id) => s.universityId === id,
      ),
      deadline: facetCounts(pools.deadline, deadlineOptions, (s, d) => s.deadline === d),
    }),
    [pools, deadlineOptions, universityIds],
  );

  /**
   * Externally-run schemes carry no verified nationality or deadline, so a
   * filter on either necessarily excludes them. Saying so is more useful than
   * letting them silently disappear.
   */
  const hiddenExternal =
    nationality || deadline || university
      ? scholarships.filter((s) => s.kind === "external" && !results.includes(s)).length
      : 0;

  const activeCount =
    (level ? 1 : 0) + (nationality ? 1 : 0) + (university ? 1 : 0) + (deadline ? 1 : 0);

  const filtered = activeCount > 0 || query.length > 0;

  function clearAll() {
    setQuery("");
    setLevel(null);
    setNationality(null);
    setUniversity(null);
    setDeadline(null);
  }

  const applied = [
    level && { key: "level", label: level, onRemove: () => setLevel(null) },
    nationality && {
      key: "nationality",
      label: nationality,
      onRemove: () => setNationality(null),
    },
    university && {
      key: "university",
      label: universityNames[university] ?? university,
      onRemove: () => setUniversity(null),
    },
    deadline && {
      key: "deadline",
      label: `By ${deadline}`,
      onRemove: () => setDeadline(null),
    },
  ].filter(Boolean) as { key: string; label: string; onRemove: () => void }[];

  return (
    <ExplorerShell
      sidebar={
        <FilterSidebar
          activeCount={activeCount}
          onClear={clearAll}
          resultSummary={`Show ${results.length} ${
            results.length === 1 ? "scholarship" : "scholarships"
          }`}
        >
          <FilterGroup label="Study level" activeLabel={level}>
            <OptionList
              options={studyLevels}
              value={level}
              onChange={setLevel}
              counts={counts.level}
            />
          </FilterGroup>

          <FilterGroup label="Nationality" activeLabel={nationality}>
            <OptionList
              options={nationalityGroups}
              value={nationality}
              onChange={setNationality}
              counts={counts.nationality}
            />
          </FilterGroup>

          {universityIds.length > 1 ? (
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
          ) : null}

          {deadlineOptions.length > 1 ? (
            <FilterGroup label="Deadline" activeLabel={deadline} defaultOpen={false}>
              <OptionList
                options={deadlineOptions}
                value={deadline}
                onChange={setDeadline}
                counts={counts.deadline}
              />
            </FilterGroup>
          ) : null}
        </FilterSidebar>
      }
    >
      <SearchField
        label="Search scholarships"
        value={query}
        onChange={setQuery}
        placeholder="Search scholarships or providers"
      />

      {applied.length > 0 ? (
        <div className="mt-4">
          <ActiveFilters items={applied} />
        </div>
      ) : null}

      <div className="mt-5">
        <ResultCount
          count={results.length}
          noun={["scholarship", "scholarships"]}
          onClear={filtered ? clearAll : undefined}
        />
      </div>

      {hiddenExternal > 0 ? (
        <p className="mt-3 text-[13.5px] font-medium leading-[1.55] text-muted-light">
          {hiddenExternal} externally-run{" "}
          {hiddenExternal === 1 ? "scheme is" : "schemes are"} hidden by this
          filter. Their eligibility and deadlines are set by the provider each
          cycle, so Ignition does not classify them &mdash; clear the filter to
          see them.
        </p>
      ) : null}

      {results.length ? (
        <ul className="mt-5 grid gap-4 xl:grid-cols-2">
          {results.map((scholarship) => (
            <li key={scholarship.id} className="min-w-0">
              <ScholarshipCard scholarship={scholarship} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-5">
          <EmptyResults>
            Nothing matched that combination. Try clearing the nationality or
            deadline filter &mdash; the externally-run schemes set their own.
          </EmptyResults>
        </div>
      )}
    </ExplorerShell>
  );
}

function ScholarshipCard({ scholarship }: { scholarship: Scholarship }) {
  const external = scholarship.kind === "external";

  return (
    <Card className="h-full p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={external ? "navy" : "muted"}>
          {external ? "External scheme" : "University award"}
        </Badge>
        {scholarship.levels.map((l) => (
          <Badge key={l} tone="muted">
            {l}
          </Badge>
        ))}
        {scholarship.demo ? <Badge tone="demo">Example data</Badge> : null}
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <h3 className="text-[18px] font-bold leading-[1.25] tracking-[-0.01em] text-navy">
          {scholarship.name}
        </h3>
        {scholarship.amount ? (
          <span className="shrink-0 text-[19px] font-bold tracking-[-0.02em] text-navy">
            {scholarship.amount}
          </span>
        ) : null}
      </div>

      <p className="mt-[5px] text-[14px] font-semibold text-muted-light">
        {scholarship.provider}
      </p>

      <p className="mt-4 text-[14.5px] font-medium leading-[1.55] text-muted">
        {scholarship.eligibility}
      </p>

      <dl className="mt-5 space-y-[10px] border-t border-hairline pt-4 text-[14px]">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <dt className="font-medium text-muted">Amount</dt>
          <dd className="font-semibold text-ink">
            {scholarship.amount ?? "Set by the provider"}
          </dd>
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <dt className="font-medium text-muted">Deadline</dt>
          <dd className="inline-flex items-center gap-[7px] font-semibold text-ink">
            {scholarship.deadline ? (
              <>
                <CalendarDays
                  size={14}
                  strokeWidth={2.2}
                  aria-hidden
                  className="text-blue-link"
                />
                {scholarship.deadline}
              </>
            ) : (
              "Check official source"
            )}
          </dd>
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <dt className="shrink-0 font-medium text-muted">How to apply</dt>
          <dd className="text-right font-semibold text-ink">
            {scholarship.applyVia}
          </dd>
        </div>
      </dl>

      <div className="mt-auto pt-6">
        {external ? (
          <a
            href={scholarship.source.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-[9px] text-[14.5px] font-bold text-blue-link transition-colors hover:text-navy"
          >
            {scholarship.source.label}
            <ExternalLink
              size={15}
              strokeWidth={2.4}
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
            />
          </a>
        ) : (
          <Link
            href={scholarship.source.href}
            className="group inline-flex items-center gap-[9px] text-[14.5px] font-bold text-blue-link transition-colors hover:text-navy"
          >
            {scholarship.source.label}
            <ArrowUpRight
              size={15}
              strokeWidth={2.4}
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
            />
          </Link>
        )}
      </div>
    </Card>
  );
}
