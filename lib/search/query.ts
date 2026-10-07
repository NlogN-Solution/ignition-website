import type { components } from "@/lib/api/schema";

export type SearchSuggestion = components["schemas"]["SearchSuggestion"];
export type SearchSuggestions = components["schemas"]["SearchSuggestions"];

export function normalizeQuery(value: string): string {
  return value.normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}_+#]+/gu, " ").trim().replace(/\s+/g, " ").slice(0, 100);
}

export function displayQuery(value: string): string {
  return value.normalize("NFKC").trim().replace(/\s+/g, " ").slice(0, 100);
}

export function searchHref(query: string): string {
  const params = new URLSearchParams();
  if (displayQuery(query)) params.set("q", displayQuery(query));
  return `/courses${params.size ? `?${params}` : ""}`;
}

export function suggestionHref(suggestion: SearchSuggestion): string {
  if (suggestion.exact_entity && suggestion.type === "university" && suggestion.entity_slug) {
    return `/universities/${encodeURIComponent(suggestion.entity_slug)}`;
  }
  const { path = "/courses", ...filters } = suggestion.destination;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value) params.set(key, value);
  }
  return `${path}?${params}`;
}
