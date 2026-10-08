import { test, expect } from "@playwright/test";

// Keep these layout/interaction checks independent of decorative images and analytics.
test.beforeEach(async ({ page }) => {
  await page.route("**/_next/image?**", route => route.fulfill({ contentType: "image/svg+xml", body: '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>' }));
  await page.route(/https:\/\/[^/]*(?:google-analytics|googletagmanager)\.com\//, route => route.abort());
});

test("compact results show only university logos, stay dense and retain comparison and detail links", async ({ page }, testInfo) => {
  if (testInfo.project.name === "desktop") await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/courses?q=Engineering", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("searchbox").first()).toBeEnabled();
  const results = page.getByRole("list", { name: "Course results" });
  const cards = results.getByRole("article");
  await expect(cards).toHaveCount(24);
  await expect(results.locator('img:not([alt$=" logo"])')).toHaveCount(0);
  await expect(results.getByRole("button", { name: /application|apply/i })).toHaveCount(0);
  const boxes = await cards.evaluateAll(elements => elements.map(element => {
    const box = element.getBoundingClientRect();
    return { x: box.x, y: box.y, width: box.width, height: box.height };
  }));
  expect(boxes.every(box => Math.abs(box.x - boxes[0].x) < 1 && Math.abs(box.width - boxes[0].width) < 1)).toBeTruthy();
  expect(boxes[1].y).toBeGreaterThanOrEqual(boxes[0].y + boxes[0].height);
  if (testInfo.project.name === "desktop") {
    const median = boxes.map(box => box.height).sort((a, b) => a - b)[12];
    expect(median).toBeLessThanOrEqual(205);
    expect(Math.floor((1000 - 91) / (median + 12))).toBeGreaterThanOrEqual(4);
    console.log(`Desktop median card height: ${median}px`);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await cards.first().scrollIntoViewIfNeeded();
  await page.screenshot({ path: testInfo.outputPath("compact-results.png") });
  const first = cards.first();
  const detailHref = await first.getByRole("link", { name: "View course" }).getAttribute("href");
  expect(detailHref).toMatch(/^\/courses\/at\//);
  await expect(first.getByRole("heading").getByRole("link")).toHaveAttribute("href", detailHref!);
  await first.getByRole("button", { name: /Add .* to comparison/ }).click();
  await expect(first.getByRole("button", { name: /Remove .* from comparison/ })).toHaveAttribute("aria-pressed", "true");
  await cards.nth(1).getByRole("button", { name: /Add .* to comparison/ }).click();
  await expect(page.getByRole("button", { name: "Compare", exact: true })).toBeEnabled();
  await expect(page.getByRole("complementary", { name: "Contact Ignition" })).toHaveCount(0);
  await page.getByRole("button", { name: "Compare", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Compare courses" })).toBeVisible();
  await page.getByRole("dialog", { name: "Compare courses" }).getByRole("button", { name: "Close", exact: true }).click();
  await page.getByRole("button", { name: "Clear", exact: true }).click();
  await first.getByRole("link", { name: "View course" }).click();
  await expect(page).toHaveURL(new RegExp(detailHref!));
  await expect(page.locator("header").getByRole("button", { name: "Apply for this course", exact: true })).toBeVisible();
  await expect(page.getByRole("region", { name: "Course key facts" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await page.screenshot({ path: testInfo.outputPath("course-detail-header.png") });
});

test("university refinement and clearing preserve the compact results", async ({ page }, testInfo) => {
  await page.goto("/courses?q=Computer+Science", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("searchbox").first()).toBeEnabled();
  if (testInfo.project.name === "mobile") await page.getByRole("button", { name: /^Filters/ }).click();
  await page.getByRole("button", { name: "University Any", exact: true }).click();
  await page.getByPlaceholder("Type a university name…").fill("York St John");
  await page.getByRole("button", { name: /^York St John University \d/ }).click();
  await expect(page).toHaveURL(/university=york-st-john/);
  if (testInfo.project.name === "mobile") await page.getByRole("button", { name: "Close filters" }).click();
  const cards = page.getByRole("list", { name: "Course results" }).getByRole("article");
  await expect(cards.first()).toContainText("York St John University");
  expect((await cards.allTextContents()).every(text => text.includes("York St John University"))).toBeTruthy();
  await page.getByRole("button", { name: /York St John.*remove filter/i }).click();
  await expect(page).not.toHaveURL(/university=/);
  await expect(page).toHaveURL(/q=Computer\+Science/);
  await expect(cards).toHaveCount(24);
});

test("tablet results stay in one column without horizontal overflow", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "One tablet viewport check is sufficient");
  await page.setViewportSize({ width: 820, height: 1180 });
  await page.goto("/courses?q=business", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("searchbox").first()).toBeEnabled();
  await expect(page.getByRole("button", { name: /^Filters/ })).toBeVisible();
  const cards = page.getByRole("list", { name: "Course results" }).getByRole("article");
  const first = await cards.first().boundingBox();
  const second = await cards.nth(1).boundingBox();
  expect(first?.x).toBe(second?.x);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await cards.first().scrollIntoViewIfNeeded();
  await page.screenshot({ path: testInfo.outputPath("tablet-results.png") });
});

test("existing facets can each refine and clear the compact list", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Shared facet logic is exercised once; mobile drawer has separate coverage");
  await page.goto("/courses?q=Engineering", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("searchbox").first()).toBeEnabled();
  for (const [label, key] of [["Study level", "route"], ["Course type", "level"], ["Subject", "subject"], ["Qualification", "qualification"], ["Location", "location"], ["Duration", "duration"], ["University", "university"]]) {
    await page.getByRole("button", { name: `${label} Any`, exact: true }).click();
    await page.locator('.filter-pop button[aria-pressed="false"]:not([disabled])').first().click();
    await expect(page).toHaveURL(new RegExp(`[?&]${key}=`));
    await expect(page.getByRole("list", { name: "Course results" }).getByRole("article").first()).toBeVisible();
    await page.getByRole("button", { name: /remove filter/ }).click();
    await expect(page).not.toHaveURL(new RegExp(`[?&]${key}=`));
  }
  const placement = page.getByRole("button", { name: /^Placement year available/ });
  if (await placement.isEnabled()) {
    await placement.click();
    await expect(page).toHaveURL(/placement=true/);
    await page.getByRole("button", { name: /remove filter/ }).click();
    await expect(page).not.toHaveURL(/placement=/);
  }
});
