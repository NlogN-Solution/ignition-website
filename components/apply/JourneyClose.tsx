"use client";

import { CtaBand } from "../layout/CtaBand";
import { ReadyToApply } from "./ReadyToApply";
import { useResearch } from "@/lib/handoff/useResearch";

/**
 * The closing band on pages that serve both a cold visitor and a student who
 * has already done a lot of work.
 *
 * A student who has saved nothing is not ready to be asked for an account —
 * they get the ordinary "here is where to go next" band. A student carrying a
 * shortlist, a career result or a comparison is at the decision point, and
 * gets the conversion block. Same slot, chosen from what they have actually
 * done rather than from where they happen to be standing.
 *
 * `fallback` renders on the server and on the first client paint, so the page
 * never flashes from one to the other for a visitor with no research.
 */
export function JourneyClose({
  fallback,
  title,
  intro,
}: {
  fallback: React.ComponentProps<typeof CtaBand>;
  title?: string;
  intro?: string;
}) {
  const { hasAnything } = useResearch();

  if (!hasAnything) return <CtaBand {...fallback} />;
  return <ReadyToApply title={title} intro={intro} />;
}
