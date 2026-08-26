/**
 * EXAMPLE IMAGERY. These are stock photographs, deliberately shared across the
 * fictional institutions rather than presented as bespoke campus photography —
 * there is no Example Metropolitan University to photograph. They exist so the
 * university pages can be designed and reviewed with real images in them, and
 * every surface that renders one carries the example-data marker.
 *
 * The split is by character rather than by id: the older, collegiate and civic
 * institutions get the historic quad, the applied and technical ones get the
 * modern campus. That way the header of a research-intensive university does
 * not open on a picture that contradicts the paragraph beneath it.
 *
 * Replacing this with real photography is a change to this file alone. Point
 * `hero` and each `gallery` entry at the new asset; nothing else reads the
 * paths.
 */

export type CampusImage = {
  /** Path under /public. */
  src: string;
  /** Describes the photograph, and doubles as the alt text. */
  caption: string;
};

export type UniversityImagery = {
  /** The wide band behind the page header. */
  hero: string;
  /** The card image in the explorer grid. */
  card: string;
  gallery: CampusImage[];
};

const modern = "/images/campus.webp";
const historic = "/images/university1.webp";

const shots = {
  campus: { src: modern, caption: "The main campus from above, late afternoon" },
  quad: { src: historic, caption: "The original quadrangle and its colonnades" },
  life: { src: "/images/campus-life.webp", caption: "Between lectures on the walk into campus" },
  lecture: { src: "/images/classroom.webp", caption: "A first-year lecture in one of the teaching rooms" },
  studio: { src: "/images/classroom1.webp", caption: "Project work in the labs and studios" },
} satisfies Record<string, CampusImage>;

/**
 * Applied and technical institutions lead on the modern campus and the
 * workshops; the research-led, collegiate and civic ones lead on the historic
 * buildings and the lecture theatre.
 */
const applied = (card: string): UniversityImagery => ({
  hero: modern,
  card,
  gallery: [shots.campus, shots.life, shots.studio, shots.lecture],
});

const traditional = (card: string): UniversityImagery => ({
  hero: historic,
  card,
  gallery: [shots.quad, shots.lecture, shots.life, shots.campus],
});

/**
 * The header images are chosen by character, but the *card* images are
 * deliberately spread across every photograph available: six cards in a grid
 * all carrying the same two pictures would make the six institutions look
 * like one, which is the opposite of what a card is for.
 */
const imagery: Record<string, UniversityImagery> = {
  "example-metropolitan": applied(modern),
  "example-northgate": applied(shots.studio.src),
  "example-harbourside": applied(shots.life.src),
  "example-riverside": traditional(historic),
  "example-kingsford": traditional(shots.lecture.src),
  "example-castleton": traditional(historic),
};

/** Never returns nothing: a university added without an entry still gets a page. */
export function universityImagery(id: string): UniversityImagery {
  return imagery[id] ?? applied(modern);
}
