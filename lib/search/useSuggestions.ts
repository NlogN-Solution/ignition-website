"use client";
import { useEffect, useState } from "react";
import { displayQuery, normalizeQuery, type SearchSuggestion, type SearchSuggestions } from "./query";
import { trackSearch } from "./analytics";

const emptyItems: SearchSuggestion[] = [];

export function useSuggestions(query: string, open: boolean, initialPopular: SearchSuggestion[]) {
  const key = normalizeQuery(query);
  const [popular, setPopular] = useState(initialPopular);
  const [response, setResponse] = useState<{ key: string; items: SearchSuggestion[]; error: boolean } | null>(null);
  const [pendingKey, setPendingKey] = useState<string | null>(null);
  useEffect(() => {
    if (!open || (key.length > 0 && key.length < 2) || (!key && popular.length)) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setPendingKey(key);
      if (key) trackSearch("hero_search_query", { query_length: key.length });
      try {
        const result = await fetch(`/api/search/suggestions?${new URLSearchParams({ q: displayQuery(query) })}`, { signal: controller.signal });
        if (!result.ok) throw new Error("Suggestions unavailable");
        const data = await result.json() as SearchSuggestions;
        if (controller.signal.aborted) return;
        if (!key) setPopular(data.items);
        setResponse({ key, items: data.items, error: false });
      } catch {
        if (!controller.signal.aborted) setResponse({ key, items: [], error: true });
      } finally {
        if (!controller.signal.aborted) setPendingKey(null);
      }
    }, key ? 250 : 0);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [key, query, open, popular.length]);
  const current = response?.key === key ? response : null;
  return {
    popular,
    items: key ? (key.length >= 2 ? current?.items ?? emptyItems : emptyItems) : popular,
    loading: open && (key.length >= 2 || !key) && (!current && !(key === "" && popular.length) || pendingKey === key),
    error: current?.error ?? false,
  };
}
