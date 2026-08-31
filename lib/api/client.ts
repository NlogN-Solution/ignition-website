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
 * **Cache tags are attached here.** Tagging at the call site is what makes the
 * admin's publish webhook (`/api/revalidate`) able to expire exactly the pages
 * that read the thing that changed.
 */

/** Cache tags. These are the contract with `app/api/revalidate/route.ts`. */
export const TAG_CATALOGUE = "catalogue";
export const TAG_CONTENT = "content";

const TIMEOUT_MS = 8_000;

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

export async function get<T>(path: string, options: GetOptions): Promise<T | null> {
  const url = `${apiBaseUrl}${withQuery(path, options.params)}`;

  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
      next: { revalidate: options.revalidate, tags: options.tags },
      headers: { accept: "application/json" },
    });

    // A 404 is a real answer — "no such university" — and the caller decides
    // what to do with it. It is not a reason to fall back to a fixture that
    // would then show a page for something the catalogue does not have.
    if (!response.ok) {
      if (response.status !== 404) {
        console.warn(`[api] ${response.status} from ${path}`);
      }
      return null;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.warn(`[api] ${path} unreachable:`, error instanceof Error ? error.message : error);
    return null;
  }
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
