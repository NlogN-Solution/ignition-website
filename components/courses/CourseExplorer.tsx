"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { OfferingCard } from "./OfferingCard";
import { CourseCompareTray } from "./CourseCompareTray";
import { CourseCompareModal } from "./CourseCompareModal";
import {
  FilterBar,
  FilterFields,
  FilterFooter,
  FilterSearch,
  SearchableSelectField,
  SelectField,
  ToggleChip,
} from "../ui/FilterBar";
import { ExplorerShell, FilterSidebar, ActiveFilters } from "../ui/filters";
import { EmptyResults, ResultCount } from "../ui/ResultCount";
import { courseSortOptions, updateExplorerUrl, type CourseFilterKey, type ExplorerParams } from "@/lib/search/explorerQuery";
import { trackSearch } from "@/lib/search/analytics";
import { studyRoute, studyRoutes } from "@/data/courses";
import type { Facets, FacetOption, Offering } from "@/lib/api/types";

/**
 * The course explorer, filtering ~4,800 real offerings.
 *
 * **The filter state is the URL, and the results come from the server.** That
 * is the change from the version that shipped with the fictional catalogue,
 * where thirty-one courses were bundled into the page and filtered in the
 * browser. Two reasons it had to move, and one thing that did not change.
 *
 * Bundling is out of the question at this size — the catalogue is larger than
 * the rest of the JavaScript on the site put together, and a student on a
 * phone would download all of it to look at twenty-four rows. And the counts
 * beside each option have to be computed over the whole set, not over what
 * happens to be loaded, or they stop being trustworthy exactly when they
 * matter.
 *
 * What did not change is that the counts are leave-one-out: each option is
 * counted against a set that every *other* filter has narrowed. The arithmetic
 * now happens in `/public/courses/facets` rather than in `lib/search/facets`,
 * but it is the same arithmetic, and for the same reason — an option that
 * would return nothing says so before it is clicked.
 *
 * This component therefore holds no results of its own. It renders what the
 * server sent and writes filter changes back into the URL; the page is a
 * server component that reads them and fetches again. `?route=` keeps working
 * exactly as it did, which matters because the homepage links into it.
 *
 * Note that it does *not* call `useSearchParams`, even though the URL is its
 * state. Doing so would push the whole subtree — the results included — behind
 * a Suspense boundary that only fills in on the client, which on a catalogue
 * page means search engines and a reader without JavaScript get an empty bar
 * and no courses. The parameters arrive as a prop from the page that already
 * parsed them, which is the same information one render earlier.
 */

/** The facets, in the order they appear in the bar. */
type FilterKey = CourseFilterKey;

const PAGE_SIZE = 24;
const MAX_COMPARE = 4;

function labelFor(options: FacetOption[], value: string | undefined): string | null {
  if (!value) return null;
  return options.find((option) => option.value === value)?.label ?? value;
}

function counts(options: FacetOption[]): Record<string, number> {
  return Object.fromEntries(options.map((option) => [option.value, option.count]));
}

export function CourseExplorer({
  offerings,
  facets,
  total,
  page,
  params,
}: {
  offerings: Offering[];
  facets: Facets | null;
  total: number;
  page: number;
  params: ExplorerParams;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  // The search box types locally and commits on a pause. Pushing a URL per
  // keystroke would put one server round trip and one history entry behind
  // every letter.
  const [query, setQuery] = useState(params.q ?? "");
  const [previousQuery, setPreviousQuery] = useState(params.q);
  if (previousQuery !== params.q) {
    setPreviousQuery(params.q);
    setQuery(params.q ?? "");
  }
  const queryTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Selection for the compare popup. Kept as component state rather than the
  // shared storage layer — this is "look at these two side by side right
  // now" while browsing, not a saved research signal, and it should not
  // survive a page reload the way the career quiz or the cost calculator do.
  // The map accumulates across pages and filter changes so a course picked
  // on page 1 is still describable in the popup after paging to page 2.
  const [selected, setSelected] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [knownOfferings, setKnownOfferings] = useState<Record<string, Offering>>({});

  function toggleCompare(slug: string) {
    const offering = offerings.find(entry => entry.slug === slug);
    if (offering) setKnownOfferings(previous => ({ ...previous, [slug]: offering }));
    setSelected((previous) => {
      if (previous.includes(slug)) return previous.filter((entry) => entry !== slug);
      if (previous.length >= MAX_COMPARE) return previous;
      return [...previous, slug];
    });
  }

  function commit(changes: Partial<Record<FilterKey | "q" | "page" | "sort", string | null>>) {
    if (queryTimer.current) clearTimeout(queryTimer.current);
    const merged = { ...(query !== (params.q ?? "") ? { q: query.trim() || null } : {}), ...changes };
    const url = updateExplorerUrl(pathname, { ...params }, merged);
    trackSearch("search_filter_changed", { keys: Object.keys(changes).join(","), explorer: "courses" });
    startTransition(() => router.push(url, { scroll: false }));
  }

  function changeQuery(value: string) {
    setQuery(value);
    if (queryTimer.current) clearTimeout(queryTimer.current);
    queryTimer.current = setTimeout(() => commit({ q: value.trim() || null, sort: value.trim() ? "relevance" : "title" }), 350);
  }
  useEffect(() => {
    const cancel = () => { if (queryTimer.current) clearTimeout(queryTimer.current); };
    window.addEventListener("popstate", cancel);
    return () => { cancel(); window.removeEventListener("popstate", cancel); };
  }, []);
  useEffect(() => { if (queryTimer.current) clearTimeout(queryTimer.current); }, [params]);

  const route = studyRoute(params.route);

  /**
   * Course type hides itself when the chosen route contains only one.
   *
   * Offering "Foundation" while Postgraduate is selected would advertise a
   * combination that returns nothing, and a facet that can produce a
   * guaranteed empty state is worse than no facet at all. Both postgraduate
   * and top-up are single-level routes, so the bar is shorter there.
   */
  const levelOptions = facets?.level ?? [];
  const showLevels = levelOptions.length > 1;

  const applied = [
    { key: "route", label: route?.label },
    { key: "level", label: labelFor(levelOptions, params.level) },
    { key: "subject", label: labelFor(facets?.subject ?? [], params.subject) },
    { key: "qualification", label: labelFor(facets?.qualification ?? [], params.qualification) },
    { key: "location", label: labelFor(facets?.location ?? [], params.location) },
    { key: "duration", label: labelFor(facets?.duration ?? [], params.duration) },
    { key: "university", label: labelFor(facets?.university ?? [], params.university) },
    { key: "placement", label: params.placement ? "Placement year" : null },
  ].filter((entry): entry is { key: string; label: string } => Boolean(entry.label));

  const activeCount = applied.length;

  // The search term counts toward the bar's tally: it narrows the results
  // exactly as a facet does, and a reader who has only typed something still
  // needs a way to get back to the whole catalogue in one click.
  const barCount = activeCount + (params.q ? 1 : 0);

  function clearAll() {
    if (queryTimer.current) clearTimeout(queryTimer.current);
    setQuery("");
    startTransition(() => router.push(pathname, { scroll: false }));
  }

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const routeOptions: FacetOption[] = studyRoutes.map((entry) => ({
    value: entry.id,
    label: entry.label,
    count: facets ? (counts(facets.route)[entry.id] ?? 0) : 0,
  }));

  const fields = (
        <FilterFields vertical={Boolean(params.q)}>
          <SelectField
            label="Study level"
            options={routeOptions}
            value={route?.id ?? null}
            onChange={(next) => commit({ route: next })}
          />

          {showLevels ? (
            <SelectField
              label="Course type"
              options={levelOptions}
              value={params.level ?? null}
              onChange={(next) => commit({ level: next })}
            />
          ) : null}

          <SelectField
            label="Subject"
            options={facets?.subject ?? []}
            value={params.subject ?? null}
            onChange={(next) => commit({ subject: next })}
          />

          <SelectField label="Qualification" options={facets?.qualification ?? []} value={params.qualification ?? null} onChange={next => commit({ qualification: next })} />
          <SelectField label="Location" options={facets?.location ?? []} value={params.location ?? null} onChange={next => commit({ location: next })} />
          <SelectField
            label="Duration"
            options={facets?.duration ?? []}
            value={params.duration ?? null}
            onChange={(next) => commit({ duration: next })}
          />

          <SearchableSelectField
            label="University"
            placeholder="Type a university name…"
            emptyText={(term) => `No universities match “${term}”.`}
            options={facets?.university ?? []}
            value={params.university ?? null}
            onChange={(next) => commit({ university: next })}
          />
        </FilterFields>
  );
  const footer = (
        <FilterFooter activeCount={barCount} onClear={clearAll}>
          <ToggleChip
            label="Placement year available"
            active={Boolean(params.placement)}
            onChange={(next) => commit({ placement: next ? "true" : null })}
            count={facets?.placement}
          />
        </FilterFooter>
  );
  const search = <FilterSearch label="Search courses" value={query} onChange={changeQuery} placeholder="Search courses or universities…" />;
  const results = <>


      {route ? (
        <p className="mt-4 text-[14.5px] font-medium leading-[1.55] text-muted">{route.summary}</p>
      ) : null}

      {applied.length > 0 ? (
        <div className="mt-4">
          <ActiveFilters items={applied} onRemove={key => commit({ [key]: null })} />
        </div>
      ) : null}

      <div className="mt-5">
        <ResultCount
          count={total}
          noun={["course", "courses"]}
        />
      </div>

      {offerings.length ? (
        <>
          <ul
            aria-label="Course results"
            className={`mt-4 grid grid-cols-1 gap-3 ${pending ? "opacity-60 transition-opacity" : ""}`}
          >
            {offerings.map((offering) => (
              <li key={offering.slug} className="min-w-0">
                <OfferingCard
                  offering={offering}
                  realData={Boolean(params.q)}
                  compact
                  selectable
                  selected={selected.includes(offering.slug)}
                  onToggleSelect={() => toggleCompare(offering.slug)}
                />
              </li>
            ))}
          </ul>

          {pages > 1 ? (
            <Pagination page={page} pages={pages} onGo={(next) => commit({ page: String(next) })} />
          ) : null}
        </>
      ) : (
        <div className="mt-4">
          <EmptyResults>
            Nothing matched that combination. Try clearing the university filter, or
            searching for the subject rather than the exact course title.
          </EmptyResults>
        </div>
      )}

      <CourseCompareTray
        count={selected.length}
        max={MAX_COMPARE}
        onClear={() => setSelected([])}
        onCompare={() => setCompareOpen(true)}
      />

      {compareOpen ? (
        <CourseCompareModal
          offerings={selected.map((slug) => knownOfferings[slug]).filter((entry): entry is Offering => Boolean(entry))}
          onClose={() => setCompareOpen(false)}
          onRemove={(slug) => {
            setSelected((previous) => {
              const next = previous.filter((entry) => entry !== slug);
              if (next.length < 2) setCompareOpen(false);
              return next;
            });
          }}
        />
      ) : null}
    </>;
  return params.q ? (
    <ExplorerShell sidebar={<FilterSidebar activeCount={barCount} onClear={clearAll} resultSummary={`Show ${total} courses`}>{fields}{footer}</FilterSidebar>}>
      {search}
      <div className="mt-3 flex items-center justify-end gap-2"><label htmlFor="course-sort" className="text-sm text-muted">Sort</label><select id="course-sort" value={params.sort ?? "relevance"} onChange={event => commit({ sort: event.target.value })} className="rounded-md border border-hairline bg-white p-2 text-sm">{courseSortOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>
      {results}
    </ExplorerShell>
  ) : <div><FilterBar>{search}{fields}{footer}</FilterBar>{results}</div>;
}

/**
 * Previous / next with a position, not a numbered strip.
 *
 * At 4,800 offerings and 24 to a page there are two hundred pages; a strip of
 * numbers would be a wall nobody reads, and page 137 is not a place anyone
 * means to go. Filtering is how a student narrows this, and the pager exists
 * for the last step.
 */
function Pagination({
  page,
  pages,
  onGo,
}: {
  page: number;
  pages: number;
  onGo: (page: number) => void;
}) {
  const button =
    "rounded-lg border border-hairline bg-white px-[14px] py-[8px] text-[14px] font-semibold text-navy transition-colors duration-200 hover:border-ring-idle disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <nav aria-label="Pagination" className="mt-8 flex items-center justify-between gap-4">
      <button type="button" className={button} disabled={page <= 1} onClick={() => onGo(page - 1)}>
        Previous
      </button>
      <p className="text-[14px] font-medium text-muted">
        Page <span className="font-semibold text-ink">{page}</span> of {pages}
      </p>
      <button
        type="button"
        className={button}
        disabled={page >= pages}
        onClick={() => onGo(page + 1)}
      >
        Next
      </button>
    </nav>
  );
}
