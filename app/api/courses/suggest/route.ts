import { NextResponse } from "next/server";
import { searchOfferings } from "@/lib/api/catalogue";

/**
 * Live course suggestions for the homepage search.
 *
 * The suggestions used to be matched in the browser against `getCourses()`,
 * the editorial course profiles. There are none in the catalogue yet, so that
 * call answered with the fixtures in `data/courses` — invented courses with
 * invented slugs — and a student typing "nursing" was offered a page about a
 * course nobody teaches. The ~4,800 real offerings are too many to ship to the
 * browser, so the field asks here instead, and this asks the same search the
 * /courses explorer runs.
 *
 * Capped at 6 — the dropdown's own ceiling — so a request is never larger than
 * what the UI shows.
 */
const MAX_SUGGESTIONS = 6;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = (url.searchParams.get("q") ?? "").trim().slice(0, 100);
  const route = url.searchParams.get("route") ?? undefined;

  if (q.length < 2) return NextResponse.json({ items: [], total: 0 });

  const result = await searchOfferings({ q, route, limit: MAX_SUGGESTIONS });

  return NextResponse.json({
    total: result.total,
    items: result.items.map((offering) => ({
      slug: offering.slug,
      title: offering.title,
      level: offering.level,
      university: offering.university?.name,
    })),
  });
}
