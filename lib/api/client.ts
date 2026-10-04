import { apiBaseUrl } from "@/lib/config";

/**
 * The fetch wrapper every server-side read goes through.
 *
 * Three things it exists to guarantee.
 *
 * **A slow API cannot hang a build.** Next will wait on a `fetch` for as long
 * as it takes; a page that renders at build time therefore inherits whatever
 * the worst case is. Everything here is bounded by `AbortSignal.timeout`.
 *
 * **A failed read is not a failed page.** `get` returns `null` rather than
 * throwing, and each caller in `lib/api/*.ts` falls back to the static fixture
 * it used to render from. A backend outage degrades the site to the copy it
 * shipped with instead of turning it into an error page — which matters most
 * at build time, when a 500 from the API would otherwise fail the deploy.
 *
 * One consequence of the timeout worth knowing: passing an `AbortSignal` opts
 * a request out of Next's per-render memoization, so two components fetching
 * the same URL in one render each make the call. They still share the
 * persistent cache entry, and nothing here fetches the same URL twice in a
 * render, but a bound timeout is worth more than deduplication that is not
 * being relied on.
 *
 * **Cache tags are attached here.** Tagging at the call site is what makes the
 * admin's publish webhook (`/api/revalidate`) able to expire exactly the pages
 * that read the thing that changed.
 */

/** Cache tags. These are the contract with `app/api/revalidate/route.ts`. */
export const TAG_CATALOGUE = "catalogue";
export const TAG_CONTENT = "content";

/**
 * How long a single API read may take before it is abandoned.
 *
 * This was 8 seconds, and 8 seconds was silently turning a slow catalogue into
 * a missing one. `get` returns `null` for an abandoned read exactly as it does
 * for a 404, and `getUniversity` read that `null` as "no such university" — so
 * every university page on the site served "That page isn't here" whenever the
 * API took longer than the budget. Which it did: uncached, a university detail
 * read against the Neon instance in `us-east-2` costs 2–5 seconds from a
 * developer machine before the page's second read has even started.
 *
 * Two things changed. The API now caches its own public responses in Redis
 * (`backend/app/core/public_cache.py`), so the warm path is milliseconds and
 * this number is only ever the cold one. And `getResult` below now
 * distinguishes "the API said no" from "the API did not answer", so a page can
 * refuse to 404 on the second — which is the real fix. The larger budget is
 * the belt to that braces.
 */
const TIMEOUT_MS = 20_000;

export interface GetOptions {
  /** Seconds before Next rebuilds the page in the background. */
  revalidate: number;
  tags: string[];
  /** Query string values. `undefined` and `null` are dropped. */
  params?: Record<string, string | number | boolean | undefined | null>;
}

export function withQuery(
  path: string,
  params: GetOptions["params"],
): string {
  if (!params) return path;
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    search.set(key, String(value));
  }
  const query = search.toString();
  return query ? `${path}?${query}` : path;
}

/**
 * A read that says *why* it has nothing, for the callers that need to know.
 *
 * `get` below collapses every failure to `null`, which is right for a caller
 * whose answer is "render the fixture". It is wrong for a caller whose answer
 * is `notFound()`, because "the catalogue does not have this university" and
 * "we could not reach the catalogue" are not the same fact and only one of
 * them is the reader's problem.
 *
 *   - `missing` — the API answered, and the answer was 404.
 *   - `unavailable` — a timeout, a network failure, or a 5xx. The record may
 *     well exist; we do not know.
 */
export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; reason: "missing" | "unavailable" };

/**
 * Statuses worth trying again.
 *
 * All of them mean "ask later", none of them mean "there is no such thing".
 * A 404 is deliberately absent: retrying it would turn every missing record
 * into three requests and the same answer.
 */
const RETRYABLE_STATUS = new Set([408, 425, 429, 500, 502, 503, 504]);

/** Attempts in total, not retries after the first. */
const MAX_ATTEMPTS = 3;

/** Waits between attempts, with jitter so 125 pages do not retry in lockstep. */
function backoffMs(attempt: number): number {
  return attempt * 600 + Math.random() * 400;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getResult<T>(path: string, options: GetOptions): Promise<ApiResult<T>> {
  const url = `${apiBaseUrl}${withQuery(path, options.params)}`;

  /**
   * Transient failures are retried, and that is what keeps a deploy alive.
   *
   * `next build` prerenders 125 pages, and each university page reads the
   * institution and then pages through its offerings — a few hundred requests
   * in a burst against a single small API instance. A handful of them come
   * back 502 under that load, and before this the first one killed the build:
   * `app/universities/[university]` throws on an unreachable catalogue, which
   * is right at request time and far too brittle when the cause is a
   * momentary blip during a deploy.
   *
   * Retrying does not paper over a real outage. Three attempts against a
   * catalogue that is genuinely down still fail, and the build still stops —
   * which is the correct outcome, because the alternative is shipping
   * forty-four universities that all say "That page isn't here".
   */
  let lastReason = "";
  let attempts = 0;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    attempts = attempt;
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(TIMEOUT_MS),
        // `force-cache` is stated rather than left to the default. Fetches
        // reached *after* a request-time API — `await searchParams` on the
        // course explorer, say — are not cached under the default policy, and a
        // catalogue search that hit the API on every request is exactly what the
        // revalidate window exists to prevent. `next.revalidate` then sets how
        // long an entry stays fresh.
        cache: "force-cache",
        next: { revalidate: options.revalidate, tags: options.tags },
        headers: { accept: "application/json" },
      });

      // A 404 is a real answer — "no such university" — and the caller decides
      // what to do with it. It is not a reason to fall back to a fixture that
      // would then show a page for something the catalogue does not have.
      if (response.status === 404) return { ok: false, reason: "missing" };

      if (response.ok) return { ok: true, data: (await response.json()) as T };

      lastReason = `HTTP ${response.status}`;
      if (!RETRYABLE_STATUS.has(response.status)) break;
    } catch (error) {
      // A timeout or a dropped connection. Both are worth another go.
      lastReason = error instanceof Error ? error.message : String(error);
    }

    if (attempt < MAX_ATTEMPTS) {
      console.warn(`[api] ${path} — ${lastReason}, retrying (${attempt}/${MAX_ATTEMPTS - 1})`);
      await sleep(backoffMs(attempt));
    }
  }

  // `attempts`, not MAX_ATTEMPTS: a non-retryable status breaks out after one
  // try, and a log that claimed three would send someone hunting for two
  // requests that never happened.
  console.warn(`[api] ${path} unreachable after ${attempts} attempt(s): ${lastReason}`);
  return { ok: false, reason: "unavailable" };
}

export async function get<T>(path: string, options: GetOptions): Promise<T | null> {
  const result = await getResult<T>(path, options);
  return result.ok ? result.data : null;
}

/** How long each kind of read stays fresh (CATALOGUE-CMS-PLAN.md §10.3). */
export const REVALIDATE = {
  /** Institutional records change rarely and by hand. */
  universities: 3_600,
  /** Search results move with every import. */
  offerings: 300,
  /** Editorial copy, which an editor expects to see soon after publishing. */
  content: 300,
} as const;
