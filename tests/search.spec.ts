import { test, expect, type Page } from "@playwright/test";

// These are interaction tests; image decoding is unrelated and exhausts small CI workers.
test.beforeEach(async ({ page }) => {
  await page.route("**/_next/image?**", route => route.fulfill({ contentType: "image/svg+xml", body: '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>' }));
  await page.route(/https:\/\/[^/]*(?:google-analytics|googletagmanager)\.com\//, route => route.abort());
});

const search = (page: Page) => page.getByRole("combobox", { name: "Search universities or courses" });

test("empty focus, minimum length, popular intent, keyboard and history", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const input = search(page);
  await expect(input).toBeEnabled();
  await input.focus();
  await expect(page.getByRole("listbox", { name: "Popular searches" })).toBeVisible();
  await expect(page.getByRole("option", { name: "Computer Science", exact: true })).toBeVisible();
  let requests = 0;
  page.on("request", request => { if (request.url().includes("/api/search/suggestions?q=c&") || request.url().endsWith("/api/search/suggestions?q=c")) requests++; });
  await input.fill("c");
  await expect(page.getByText("Type at least 2 characters")).toBeVisible();
  await page.waitForTimeout(400);
  expect(requests).toBe(0);
  await input.fill("comp sci");
  await expect(page.getByRole("option", { name: "Computer Science", exact: true })).toBeVisible();
  await input.press("ArrowDown");
  await expect(input).toHaveAttribute("aria-activedescendant", /-0$/);
  await input.press("ArrowUp");
  await expect(page.getByRole("option").last()).toHaveAttribute("aria-selected", "true");
  await input.press("Escape");
  await expect(input).toHaveAttribute("aria-expanded", "false");
  await input.press("ArrowDown");
  await input.press("Enter");
  await expect(page).toHaveURL(/\/courses\?q=Computer\+Science/);
  await expect(page.getByRole("searchbox", { name: "Search courses", exact: true })).toHaveValue("Computer Science");
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.getByRole("searchbox", { name: "Search courses", exact: true })).toHaveValue("Computer Science");
  await expect(page.getByRole("searchbox").first()).toBeEnabled();
  await page.goBack({ waitUntil: "domcontentloaded" });
  await expect(input).toHaveValue("Computer Science");
});

test("real suggestions, no-record results, click outside and tab", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const input = search(page);
  for (const query of ["computer", "computor scince", "business", "ai", "artificial intelligence", "engineering", "msc", "london", "manchester"]) {
    await input.fill(query);
    await expect(page.getByRole("option").first()).toBeVisible();
    await expect(page.getByRole("status")).not.toHaveText("Finding suggestions…");
    expect(await page.getByRole("option").count()).toBeLessThanOrEqual(7);
  }
  await input.fill("zzzxxyy");
  await expect(page.getByText("No matching suggestions found.")).toBeVisible();
  await expect(page.getByRole("option", { name: /Search all courses/ })).toBeVisible();
  await page.getByRole("heading", { level: 1 }).click();
  await expect(input).toHaveAttribute("aria-expanded", "false");
  await expect(input).toBeEnabled();
  await input.focus();
  await input.press("Tab");
  await expect(page.getByRole("button", { name: "Search", exact: true })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(input).toHaveAttribute("aria-expanded", "false");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
});

test("exact university has detail and discovery choices", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(search(page)).toBeEnabled();
  await search(page).fill("York St John University");
  await expect(page.getByRole("option", { name: /York St John University View university/ })).toBeVisible();
  await page.getByRole("option", { name: "Courses at York St John University", exact: true }).click();
  await expect(page).toHaveURL(/university=york-st-john/);
  await expect(page).toHaveURL(/\/courses\?/);
});

test("cancels stale replies and degrades safely on API errors", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.route("**/api/search/suggestions?*", async route => {
    const q = new URL(route.request().url()).searchParams.get("q");
    if (q === "co") await new Promise(resolve => setTimeout(resolve, 800));
    if (q === "error") return route.fulfill({ status: 503, json: { items: [] } });
    await route.fulfill({ json: { items: [{ label: q === "co" ? "Stale result" : "Computer Science", value: "computer science", type: "course", destination: { path: "/courses", q: "Computer Science" } }] } });
  });
  const input = search(page);
  await input.fill("co");
  await page.waitForTimeout(300);
  await input.fill("computer");
  await expect(page.getByRole("option", { name: "Computer Science", exact: true })).toBeVisible();
  await page.waitForTimeout(900);
  await expect(page.getByText("Stale result")).not.toBeVisible();
  await input.fill("error");
  await expect(page.getByText("Suggestions unavailable. You can still search below.")).toBeVisible();
  await page.getByRole("option", { name: /Search all courses/ }).click();
  await expect(page).toHaveURL(/q=error/);
});

test("search-only sidebar and responsive drawer preserve URL filters", async ({ page }, testInfo) => {
  await page.goto("/courses?q=Computer+Science&route=postgraduate&sort=title", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("searchbox").first()).toBeEnabled();
  const mobile = testInfo.project.name === "mobile";
  if (mobile) {
    await page.getByRole("button", { name: /^Filters/ }).click();
    await expect(page.getByRole("dialog", { name: "Filters" })).toBeVisible();
    await page.keyboard.press("Shift+Tab");
    await expect(page.getByRole("button", { name: /^Show \d+ courses$/ })).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("dialog").getByRole("button", { name: "Clear all", exact: true }).first()).toBeFocused();
    await page.getByRole("button", { name: "Close filters" }).click();
    await expect(page.getByRole("button", { name: /^Filters/ })).toBeFocused();
    await page.getByRole("button", { name: /^Filters/ }).click();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
  } else await expect(page.getByRole("complementary", { name: "Filters" })).toBeVisible();
  await page.getByLabel("Sort", { exact: true }).selectOption("duration");
  await expect(page).toHaveURL(/route=postgraduate/);
  await expect(page).toHaveURL(/sort=duration/);
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.getByLabel("Sort", { exact: true })).toHaveValue("duration");
  await expect(page.getByRole("searchbox").first()).toBeEnabled();
  await page.goBack({ waitUntil: "domcontentloaded" });
  await expect(page.getByLabel("Sort", { exact: true })).toHaveValue("title");
  await expect(page.getByText("Estimated figures for illustration", { exact: false })).not.toBeVisible();
  await page.goto("/courses", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.getByRole("complementary", { name: "Filters" })).not.toBeVisible();
});

test("popular chips, filter combinations, pagination and empty results", async ({ page }, testInfo) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(search(page)).toBeEnabled();
  await search(page).focus();
  await expect(page.getByRole("option", { name: "Engineering", exact: true })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("hero-search.png") });
  await page.getByRole("option", { name: "Engineering", exact: true }).click();
  await expect(page).toHaveURL(/q=Engineering/);
  await expect(page.getByRole("searchbox").first()).toBeEnabled();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(page).toHaveURL(/page=2/);
  if (testInfo.project.name === "mobile") await page.getByRole("button", { name: /^Filters/ }).click();
  const studyLevel = page.getByRole("button", { name: "Study level Any", exact: true });
  await studyLevel.click();
  const panelBounds = await page.locator(".filter-pop").boundingBox();
  const triggerBounds = await studyLevel.boundingBox();
  expect(panelBounds?.width).toBeLessThanOrEqual((triggerBounds?.width ?? 0) + 1);
  await page.screenshot({ path: testInfo.outputPath("search-filters.png") });
  await page.getByRole("button", { name: /^Postgraduate \d/ }).click();
  await expect(page).toHaveURL(/route=postgraduate/);
  await expect(page).not.toHaveURL(/page=2/);
  await page.getByRole("button", { name: "Qualification Any", exact: true }).click();
  await page.getByRole("button", { name: /^MSc \d/ }).click();
  await expect(page).toHaveURL(/qualification=MSc/);
  await expect(page).toHaveURL(/q=Engineering/);
  if (testInfo.project.name === "mobile") await page.getByRole("button", { name: "Close filters" }).click();
  await page.goto("/courses?q=zzzxxyy", { waitUntil: "domcontentloaded" });
  await expect(page.getByText(/Nothing matched that combination/)).toBeVisible();
});

test("university filters survive refresh and browser history", async ({ page }) => {
  await page.goto("/universities?q=York&region=England+%E2%80%94+North", { waitUntil: "domcontentloaded" });
  const input = page.getByRole("searchbox", { name: "Search universities", exact: true });
  await expect(input).toHaveValue("York");
  await input.fill("London");
  await expect(page).toHaveURL(/q=London/);
  await expect(page).toHaveURL(/region=/);
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(input).toHaveValue("London");
  await expect(page.getByRole("searchbox").first()).toBeEnabled();
  await page.goBack({ waitUntil: "domcontentloaded" });
  await expect(input).toHaveValue("York");
});
