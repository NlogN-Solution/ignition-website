import { defineConfig, devices } from "@playwright/test";
const baseURL = process.env.SEARCH_TEST_URL ?? "http://127.0.0.1:3100";
export default defineConfig({
  testDir: "./tests",
  timeout: 180000,
  expect: { timeout: 45000 },
  workers: 1,
  use: { baseURL, trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: [{ name: "desktop", use: { ...devices["Desktop Chrome"] } }, { name: "mobile", use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" } }],
  webServer: process.env.SEARCH_TEST_URL ? undefined : { command: "npm run dev -- --webpack --port 3100", url: baseURL, reuseExistingServer: true, timeout: 180000 },
});
