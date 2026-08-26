/** The end-to-end journey Ignition covers, in order. */
export type PipelineStage = {
  label: string;
  description: string;
  href: string;
};

export const journeyPipeline: PipelineStage[] = [
  { label: "Discover", description: "Work out what actually interests you.", href: "/careers/quiz" },
  { label: "Choose a career", description: "See which paths fit your profile.", href: "/careers" },
  { label: "Choose a course", description: "Find the degrees that lead there.", href: "/courses" },
  { label: "Choose a university", description: "Compare where you could study.", href: "/universities" },
  { label: "Check requirements", description: "Understand what you need to get in.", href: "/apply/entry-requirements" },
  { label: "Apply", description: "Get the application itself right.", href: "/apply" },
  { label: "Prepare for interviews", description: "Practise before it counts.", href: "/apply/interviews" },
  { label: "Get your visa", description: "Follow the Student visa journey.", href: "/visa" },
  { label: "Prepare to move", description: "Money, documents and packing.", href: "/money/calculator" },
  { label: "Start life in the UK", description: "Land, settle and find your feet.", href: "/life-in-uk" },
];

/**
 * The same ten stages, grouped into the four things a student is actually
 * *doing* at each point.
 *
 * Ten equal cells is a true list and a poor map: it tells a student the route
 * has ten steps without telling them where they are on it. These four chapters
 * are the product's own loop — research, decide, apply, arrive — so the
 * grouping carries information rather than decorating the row.
 *
 * `span` indexes into `journeyPipeline` so the numbering shown to a student
 * stays the real position in the sequence and cannot drift from the list above.
 */
export type JourneyPhase = {
  id: string;
  label: string;
  /** What the student is doing during this chapter, in their words. */
  summary: string;
  /** [firstIndex, lastIndex] into `journeyPipeline`, inclusive. */
  span: [number, number];
};

export const journeyPhases: JourneyPhase[] = [
  {
    id: "explore",
    label: "Explore",
    summary: "Work out what you want, before narrowing anything down.",
    span: [0, 2],
  },
  {
    id: "decide",
    label: "Decide",
    summary: "Turn a subject into a real shortlist you can meet.",
    span: [3, 4],
  },
  {
    id: "apply",
    label: "Apply",
    summary: "Get the application, the interview and the visa right.",
    span: [5, 7],
  },
  {
    id: "arrive",
    label: "Arrive",
    summary: "Land in the UK with everything already sorted.",
    span: [8, 9],
  },
];

export function stagesIn(phase: JourneyPhase) {
  return journeyPipeline
    .slice(phase.span[0], phase.span[1] + 1)
    .map((stage, offset) => ({ ...stage, index: phase.span[0] + offset }));
}
