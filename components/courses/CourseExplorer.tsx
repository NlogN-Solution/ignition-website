"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { OfferingCard } from "./OfferingCard";
import { CourseCompareTray } from "./CourseCompareTray";
import { CourseCompareModal } from "./CourseCompareModal";
import { CourseNameField, SelectField, UniversityField } from "./CourseFilterBar";
import { ActiveFilters } from "../ui/filters";
import { EmptyResults, ResultCount } from "../ui/ResultCount";
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
 * page means search engines and a reader without JavaScript get an empty rail
 * and no courses. The parameters arrive as a prop from the page that already
 * parsed them, which is the same information one render earlier.
 */

/** The facets, in the order they appear in the rail. */
type FilterKey = "route" | "level" | "subject" | "duration" | "university" | "placement";

export interface ExplorerParams {
  q?: string;
  route?: string;
  level?: string;
  subject?: string;
  duration?: string;
  university?: string;
  placement?: boolean;
  page?: number;
}

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
  useEffect(() => setQuery(params.q ?? ""), [params.q]);

  // Selection for the compare popup. Kept as component state rather than the
  // shared storage layer — this is "look at these two side by side right
  // now" while browsing, not a saved research signal, and it should not
  // survive a page reload the way the career quiz or the cost calculator do.
  // The map accumulates across pages and filter changes so a course picked
  // on page 1 is still describable in the popup after paging to page 2.
  const [selected, setSelected] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [knownOfferings, setKnownOfferings] = useState<Record<string, Offering>>({});
  useEffect(() => {
    setKnownOfferings((previous) => {
      const next = { ...previous };
      for (const offering of offerings) next[offering.slug] = offering;
      return next;
    });
  }, [offerings]);

  function toggleCompare(slug: string) {
    setSelected((previous) => {
      if (previous.includes(slug)) return previous.filter((entry) => entry !== slug);
      if (previous.length >= MAX_COMPARE) return previous;
      return [...previous, slug];
    });
  }

  function commit(changes: Partial<Record<FilterKey | "q" | "page", string | null>>) {
    const next = new URLSearchParams();

    // Rebuilt from what the server parsed rather than from `location.search`,
    // so the two can never disagree.
    const current: Record<string, string | undefined> = {
      q: params.q,
      route: params.route,
      level: params.level,
      subject: params.subject,
      duration: params.duration,
      university: params.university,
      placement: params.placement ? "true" : undefined,
      page: params.page && params.page > 1 ? String(params.page) : undefined,
    };
    for (const [key, value] of Object.entries(current)) {
      if (value) next.set(key, value);
    }

    for (const [key, value] of Object.entries(changes)) {
      if (value === null || value === "") next.delete(key);
      else next.set(key, value);
    }

    // Any filter change puts the reader back on the first page: page 7 of the
    // old result set is a different thing entirely in the new one.
    if (!("page" in changes)) next.delete("page");

    const queryString = next.toString();
    startTransition(() => {
      router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    });
  }

  useEffect(() => {
    if (query === (params.q ?? "")) return;
    const timer = setTimeout(() => commit({ q: query || null }), 350);
    return () => clearTimeout(timer);
    // `commit` closes over the current URL, which is exactly what is wanted.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const route = studyRoute(params.route);

  /**
   * Course type hides itself when the chosen route contains only one.
   *
   * Offering "Foundation" while Postgraduate is selected would advertise a
   * combination that returns nothing, and a facet that can produce a
   * guaranteed empty state is worse than no facet at all. Both postgraduate
   * and top-up are single-level routes, so the rail is shorter there.
   */
  const levelOptions = facets?.level ?? [];
  const showLevels = levelOptions.length > 1;

  const applied = useMemo(() => {
    const entries: { key: string; label: string; onRemove: () => void }[] = [];
    const add = (key: FilterKey, label: string | null) => {
      if (label) entries.push({ key, label, onRemove: () => commit({ [key]: null }) });
    };

    add("route", route?.label ?? null);
    add("level", labelFor(levelOptions, params.level));
    add("subject", labelFor(facets?.subject ?? [], params.subject));
    add("duration", labelFor(facets?.duration ?? [], params.duration));
    add("university", labelFor(facets?.university ?? [], params.university));
    if (params.placement) {
      entries.push({
        key: "placement",
        label: "Placement year",
        onRemove: () => commit({ placement: null }),
      });
    }
    return entries;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, facets, route]);

  const activeCount = applied.length;
  const filtered = activeCount > 0 || Boolean(params.q);

  function clearAll() {
    setQuery("");
    startTransition(() => router.push(pathname, { scroll: false }));
  }

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const routeOptions: FacetOption[] = studyRoutes.map((entry) => ({
    value: entry.id,
    label: entry.label,
    count: facets ? (counts(facets.route)[entry.id] ?? 0) : 0,
  }));

  return (
    <div>
      <div className="rounded-2xl border border-hairline bg-white p-4 shadow-[0_18px_40px_-28px_rgba(1,22,111,0.24)] sm:p-5">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
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

          <SelectField
            label="Duration"
            options={facets?.duration ?? []}
            value={params.duration ?? null}
            onChange={(next) => commit({ duration: next })}
          />

          <UniversityField
            options={facets?.university ?? []}
            value={params.university ?? null}
            onChange={(next) => commit({ university: next })}
          />

          <CourseNameField value={query} onChange={setQuery} />
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            aria-pressed={Boolean(params.placement)}
            onClick={() => commit({ placement: params.placement ? null : "true" })}
            className={`inline-flex items-center gap-[8px] rounded-full border px-[14px] py-[8px] text-[13.5px] font-semibold transition-colors duration-150 ${
              params.placement
                ? "border-navy bg-navy/[0.06] text-navy"
                : "border-hairline text-muted hover:border-ring-idle hover:text-navy"
            }`}
          >
            <span
              aria-hidden
              className={`flex size-[15px] items-center justify-center rounded-[4px] border ${
                params.placement ? "border-navy bg-navy text-white" : "border-ring-idle"
              }`}
            >
              {params.placement ? <Check size={9} strokeWidth={3.6} /> : null}
            </span>
            Placement year available
            {facets?.placement !== undefined ? (
              <span className="text-[12px] font-semibold tabular-nums text-muted-light">
                {facets.placement}
              </span>
            ) : null}
          </button>

          {activeCount > 0 || query ? (
            <button
              type="button"
              onClick={clearAll}
              className="text-[13.5px] font-semibold text-blue-link transition-colors hover:text-navy"
            >
              Clear all
            </button>
          ) : null}
        </div>
      </div>

      {route ? (
        <p className="mt-4 text-[14.5px] font-medium leading-[1.55] text-muted">{route.summary}</p>
      ) : null}

      {applied.length > 0 ? (
        <div className="mt-4">
          <ActiveFilters items={applied} />
        </div>
      ) : null}

      <div className="mt-5">
        <ResultCount
          count={total}
          noun={["course", "courses"]}
          onClear={filtered ? clearAll : undefined}
        />
      </div>

      {offerings.length ? (
        <>
          <ul
            className={`mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${pending ? "opacity-60 transition-opacity" : ""}`}
          >
            {offerings.map((offering) => (
              <li key={offering.slug} className="min-w-0">
                <OfferingCard
                  offering={offering}
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
    </div>
  );
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
