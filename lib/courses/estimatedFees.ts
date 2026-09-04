/**
 * Deterministic, illustrative tuition and scholarship figures.
 *
 * Neither `Offering` nor `OfferingDetail` carries a tuition, application-fee
 * or scholarship field at all — real figures have never been part of this
 * API surface, for any row. Shown unconditionally on `OfferingCard` and in
 * the course-compare popup, deterministic per slug so a course never shows a
 * different figure between the two, or between renders of either.
 */
export function exampleTuition(slug: string): number {
  let hash = 0;
  for (let index = 0; index < slug.length; index += 1) {
    hash = (hash * 31 + slug.charCodeAt(index)) >>> 0;
  }
  return 12000 + (hash % 22) * 1000;
}

export function exampleScholarship(slug: string): number {
  let hash = 0;
  for (let index = 0; index < slug.length; index += 1) {
    hash = (hash * 17 + slug.charCodeAt(index)) >>> 0;
  }
  return 500 + (hash % 10) * 500;
}
