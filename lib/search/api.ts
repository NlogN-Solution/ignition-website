import "server-only";
import { apiBaseUrl } from "@/lib/config";
import { TAG_CATALOGUE } from "@/lib/api/client";
import { displayQuery } from "./query";
import type { SearchSuggestions } from "./query";

export async function getSearchSuggestions(query: string, signal?: AbortSignal): Promise<SearchSuggestions | null> {
  try {
    const response = await fetch(`${apiBaseUrl}/public/search/suggestions?${new URLSearchParams({ q: displayQuery(query) })}`, {
      signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(2500)]) : AbortSignal.timeout(2500),
      next: { revalidate: 300, tags: [TAG_CATALOGUE] },
    });
    if (!response.ok) throw new Error(`Search suggestions HTTP ${response.status}`);
    return await response.json() as SearchSuggestions;
  } catch (error) {
    if (!signal?.aborted) console.warn("Search suggestions unavailable", error instanceof Error ? error.name : "Unknown error");
    return null;
  }
}
