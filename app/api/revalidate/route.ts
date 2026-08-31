import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * On-demand cache invalidation, called by the admin API when something is
 * published.
 *
 * Every page here is statically rendered and revalidated on a timer, which is
 * right for traffic and wrong for the person who has just pressed Publish and
 * wants to check their work. This is the escape hatch: the API posts the tags
 * that went stale and the next request rebuilds them.
 *
 * The secret is shared with the backend's `LANDING_REVALIDATE_SECRET`. With no
 * secret configured this endpoint refuses everything rather than defaulting
 * open — an unauthenticated purge is a free way to make the site rebuild every
 * page on demand.
 */

export const runtime = "nodejs";

const KNOWN_TAGS = ["content", "catalogue"] as const;

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Revalidation is not configured." }, { status: 503 });
  }
  if (request.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ error: "Not authorised." }, { status: 401 });
  }

  let tags: string[] = [];
  try {
    const body = (await request.json()) as { tags?: unknown };
    tags = Array.isArray(body.tags) ? body.tags.map(String) : [];
  } catch {
    return NextResponse.json({ error: "Expected a JSON body." }, { status: 400 });
  }

  // Only tags this site actually uses, so a typo on the calling side is a
  // visible no-op rather than a silent one.
  const accepted = tags.filter((tag): tag is (typeof KNOWN_TAGS)[number] =>
    (KNOWN_TAGS as readonly string[]).includes(tag),
  );
  // Next 16 requires a cache-life profile alongside the tag. "max" is the one
  // that means *whatever its age*, which is the only sensible reading of an
  // editor pressing Publish.
  accepted.forEach((tag) => revalidateTag(tag, "max"));

  return NextResponse.json({ revalidated: accepted, ignored: tags.filter((tag) => !accepted.includes(tag as never)) });
}
