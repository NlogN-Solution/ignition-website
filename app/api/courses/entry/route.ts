import { NextResponse } from "next/server";
import { getOffering } from "@/lib/api/catalogue";

/**
 * Real per-course entry requirements, for the course-compare popup.
 *
 * `Offering` (the list grain the /courses cards render) carries no entry
 * data — that only exists on an offering's own detail fetch (`getOffering`,
 * `OfferingDetail.entry`). The popup already has everything else it needs
 * from the cards already on screen; this is the one field worth a fetch,
 * because unlike the illustrative fee figures, real entry criteria exist and
 * showing a placeholder instead would be a downgrade, not a stand-in.
 *
 * Capped at 4 slugs — the same ceiling `CourseCompareTray` enforces on
 * selection, so a request here is never larger than what the UI allows.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const slugs = (url.searchParams.get("slugs") ?? "")
    .split(",")
    .map((slug) => slug.trim())
    .filter(Boolean)
    .slice(0, 4);

  const items = await Promise.all(
    slugs.map(async (slug) => {
      const detail = await getOffering(slug);
      return { slug, entry: detail?.entry ?? null };
    }),
  );

  return NextResponse.json({ items });
}
