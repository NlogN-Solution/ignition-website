import { test, expect } from "@playwright/test";
import { normalizeQuery, searchHref, suggestionHref, type SearchSuggestion } from "../lib/search/query";
import { parseCourseParams, parseUniversityParams, updateExplorerUrl } from "../lib/search/explorerQuery";

test("query contract normalizes text without corrupting course notation", () => {
  expect(normalizeQuery("  Computer   SCIENCE!! ")).toBe("computer science");
  expect(normalizeQuery("C++ / C#")).toBe("c++ c#");
  expect(new URL(searchHref("  comp  sci "), "https://example.com").searchParams.get("q")).toBe("comp sci");
  expect(normalizeQuery("x".repeat(101))).toHaveLength(100);
});

test("query contract sends intents to discovery and exact universities to detail", () => {
  const item: SearchSuggestion = { label: "Computer Science", value: "computer science", type: "course", exact_entity: false, destination: { path: "/courses", q: "Computer Science" } };
  expect(suggestionHref(item)).toBe("/courses?q=Computer+Science");
  expect(suggestionHref({ ...item, label: "York St John University", type: "university", exact_entity: true, entity_slug: "york-st-john" })).toBe("/universities/york-st-john");
  expect(suggestionHref({ ...item, destination: { path: "/courses", q: "Computer Science", university: "york-st-john", route: "postgraduate" } })).toContain("university=york-st-john");
});

test("query contract retains filters and resets pagination on refinements", () => {
  const current = parseCourseParams({ q: "Computer Science", route: "postgraduate", page: "3" });
  const next = new URL(updateExplorerUrl("/courses", { ...current }, { qualification: "MSc" }), "https://example.com");
  expect(next.searchParams.get("q")).toBe("Computer Science");
  expect(next.searchParams.get("route")).toBe("postgraduate");
  expect(next.searchParams.get("qualification")).toBe("MSc");
  expect(next.searchParams.has("page")).toBe(false);
  expect(updateExplorerUrl("/courses", { ...current }, { page: "4" })).toContain("page=4");
  expect(parseCourseParams({ q: ["first", "second"], page: "-2", sort: "unsupported" })).toMatchObject({ q: "first", page: 1, sort: "relevance" });
});

test("query contract restores university facet state", () => {
  expect(parseUniversityParams({ q: "York", region: "England — North", scholarships: "true", placement: "false" })).toMatchObject({ q: "York", region: "England — North", scholarships: true, placement: false });
});
