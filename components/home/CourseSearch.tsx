"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Building2, Search } from "lucide-react";
import { displayQuery, searchHref, suggestionHref, type SearchSuggestion } from "@/lib/search/query";
import { useHydrated } from "@/lib/search/useHydrated";
import { useSuggestions } from "@/lib/search/useSuggestions";
import { trackSearch } from "@/lib/search/analytics";

const chipStyle = "rounded-full border border-[#d7e0eb] bg-white px-3 py-1.5 text-xs font-medium text-navy transition-colors hover:border-[#a8bedc] hover:bg-[#edf4fc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7d9fc9] motion-reduce:transition-none";

export function CourseSearch({ popular: initialPopular = [] }: { popular?: SearchSuggestion[] }) {
  const ready = useHydrated();
  const router = useRouter();
  const root = useRef<HTMLElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const listId = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState<{ items: SearchSuggestion[]; index: number } | null>(null);
  const { items, popular, loading, error } = useSuggestions(query, open, initialPopular);
  const active = selection?.items === items ? selection.index : -1;
  function setActive(value: number | ((current: number) => number)) {
    setSelection(previous => ({ items, index: typeof value === "number" ? value : value(previous?.items === items ? previous.index : -1) }));
  }
  const term = displayQuery(query);
  const rowCount = items.length + (term ? 1 : 0);
  const panelOpen = open;

  useEffect(() => {
    const restore = () => { setQuery(window.history.state?.ignitionHeroQuery ?? ""); setOpen(false); setSelection(null); };
    restore();
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);
  useEffect(() => {
    function outside(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) { setOpen(false); setSelection(null); }
    }
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);
  useEffect(() => {
    if (active >= 0) document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, listId]);

  function remember(value: string) {
    setQuery(value);
    window.history.replaceState({ ...window.history.state, ignitionHeroQuery: value }, "");
  }
  function go(suggestion?: SearchSuggestion, isPopular = false) {
    if (suggestion) {
      trackSearch(isPopular ? "hero_search_popular_clicked" : "hero_search_suggestion_clicked", { label: suggestion.label, type: suggestion.type });
      remember(suggestion.destination.q);
    } else remember(query);
    setOpen(false);
    router.push(suggestion ? suggestionHref(suggestion) : searchHref(query));
  }
  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") { event.preventDefault(); setOpen(false); setActive(-1); return; }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault(); setOpen(true);
      if (rowCount) setActive(current => (current + (event.key === "ArrowDown" ? 1 : current < 0 ? 0 : -1) + rowCount) % rowCount);
    }
    if (event.key === "Enter" && open && active >= 0 && active < rowCount) {
      event.preventDefault(); go(items[active], !term);
    }
  }

  return (
    <section ref={root} aria-label="Find universities or courses" className="w-full lg:w-[44%]" onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget as Node)) { setOpen(false); setSelection(null); }
    }}>
      <form role="search" onSubmit={event => { event.preventDefault(); go(); }}>
        <div className="relative z-20">
          <div className="grid h-14 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-2xl border border-[#d7e0eb] bg-white p-[6px] shadow-[0_8px_28px_-8px_rgba(20,45,85,0.18)] transition-[border-color,box-shadow] duration-200 hover:border-[#a8bedc] hover:shadow-[0_12px_32px_-8px_rgba(20,45,85,0.24)] focus-within:border-[#7d9fc9] focus-within:ring-2 focus-within:ring-[#c9dbef]/70 sm:h-16 motion-reduce:transition-none">
            <div className="relative min-w-0">
              <Search size={18} aria-hidden className="pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2 text-muted" />
              <input ref={input} disabled={!ready} type="search" role="combobox" aria-label="Search universities or courses" aria-expanded={panelOpen} aria-controls={listId} aria-autocomplete="list" aria-activedescendant={open && active >= 0 ? `${listId}-${active}` : undefined} autoComplete="off" value={query} maxLength={100}
                onChange={event => { remember(event.target.value); setActive(-1); setOpen(true); }}
                onFocus={() => { setOpen(true); trackSearch("hero_search_focus"); }} onKeyDown={onKeyDown}
                placeholder="Search universities or courses"
                className="h-[42px] w-full min-w-0 appearance-none rounded-xl border-0 bg-white pl-[44px] pr-2 text-[14px] font-medium text-ink outline-none placeholder:text-muted sm:h-[50px] sm:text-[15px] [&::-webkit-search-cancel-button]:hidden" />
            </div>
            <button type="submit" aria-label="Search" className="inline-flex size-[42px] items-center justify-center rounded-xl bg-orange text-white transition-colors hover:bg-[#e04f04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy sm:size-[50px]"><ArrowRight size={20} aria-hidden /></button>
          </div>
          {panelOpen && (
            <div className="absolute inset-x-0 top-[calc(100%+8px)] max-h-[min(420px,60svh)] overflow-y-auto overscroll-contain rounded-2xl border border-[#d7e0eb] bg-white p-3 shadow-[0_14px_35px_-12px_rgba(20,45,85,0.22)]">
              <p aria-live="polite" role="status" className="min-h-5 px-2 text-xs font-medium text-muted">
                {loading ? "Finding suggestions…" : !term ? "Popular searches" : term.length < 2 ? "Type at least 2 characters" : error ? "Suggestions unavailable. You can still search below." : !items.length ? "No matching suggestions found." : `${items.length} search suggestions`}
              </p>
              <ul id={listId} role="listbox" aria-label={term ? "Suggested searches" : "Popular searches"} className={term ? "mt-2 space-y-1" : "mt-2 flex flex-wrap gap-2"}>
                {items.map((suggestion, index) => (
                  <li key={`${suggestion.type}-${suggestion.value}-${suggestion.label}`} role="presentation">
                    {term && (index === 0 || items[index - 1].exact_entity) && <p className="px-2 pb-1 pt-2 text-[11px] font-bold uppercase tracking-wide text-muted">{suggestion.exact_entity ? "University" : "Suggested searches"}</p>}
                    <button id={`${listId}-${index}`} type="button" role="option" aria-selected={active === index} tabIndex={-1}
                      onMouseEnter={() => setActive(index)} onMouseDown={event => event.preventDefault()} onClick={() => go(suggestion, !term)}
                      className={term ? `flex w-full items-center gap-3 rounded-lg px-2 py-3 text-left text-sm font-medium text-navy hover:bg-[#edf4fc] ${active === index ? "bg-[#edf4fc] outline-1 outline-[#a8bedc]" : ""}` : `${chipStyle} ${active === index ? "bg-[#edf4fc] ring-2 ring-[#a8bedc]" : ""}`}>
                      {term && (suggestion.exact_entity ? <Building2 size={17} className="shrink-0" aria-hidden /> : <Search size={16} className="shrink-0" aria-hidden />)}
                      <span className="min-w-0 flex-1 break-words">{suggestion.label}{suggestion.exact_entity && <span className="mt-1 block text-xs text-muted">View university →</span>}</span>
                      {suggestion.result_count != null && <span className="text-xs text-muted">{suggestion.result_count} courses</span>}
                    </button>
                  </li>
                ))}
                {term && <li role="presentation" className="border-t border-hairline pt-1">
                  <button id={`${listId}-${items.length}`} type="button" role="option" aria-selected={active === items.length} tabIndex={-1} onMouseEnter={() => setActive(items.length)} onMouseDown={event => event.preventDefault()} onClick={() => go()}
                    className={`flex w-full items-center justify-between gap-3 rounded-lg px-2 py-3 text-left text-sm font-semibold text-navy hover:bg-[#edf4fc] ${active === items.length ? "bg-[#edf4fc] outline-1 outline-[#a8bedc]" : ""}`}>
                    <span className="min-w-0 break-words">{error || !items.length ? "Search all courses" : "View all results"} for “{term}”</span><ArrowRight size={16} className="shrink-0" aria-hidden />
                  </button>
                </li>}
              </ul>
            </div>
          )}
        </div>
        {popular.length > 0 && <div aria-hidden={open} className={`mt-3 flex flex-wrap items-center gap-2 ${open ? "invisible" : ""}`}><span className="text-xs font-semibold text-muted">Popular searches:</span>{popular.map(suggestion => <button key={suggestion.value} type="button" className={chipStyle} onClick={() => go(suggestion, true)}>{suggestion.label}</button>)}</div>}
      </form>
    </section>
  );
}
