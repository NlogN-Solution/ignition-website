import type { Subject } from "./types";

/**
 * EXAMPLE IMAGERY, on the same terms as the university photography — stock
 * pictures standing in for course photography, chosen by subject rather than
 * by course. There are thirty-one courses and a handful of photographs, so
 * pretending each course has its own would be a lie the file sizes would give
 * away immediately.
 *
 * Subject is the right grain for the choice: what a student wants from the
 * image is "what does doing this look like", and that is a property of the
 * discipline. A picture of a lecture theatre says something true about law and
 * something false about product design.
 *
 * Replacing this with real photography is a change to this file alone.
 */

const bench = "/images/engineering-course.webp";
const screen = "/images/game-dev-course.webp";
const lecture = "/images/classroom.webp";
const studio = "/images/classroom1.webp";

const bySubject: Record<Subject, string> = {
  Computing: screen,
  Engineering: bench,
  Sciences: bench,
  "Arts & Design": screen,
  Health: studio,
  Education: studio,
  Business: lecture,
  Law: lecture,
  "Social Sciences": lecture,
  Humanities: lecture,
};

/**
 * `subject` is optional because a real offering may not have one: the importer
 * classifies ~4,800 course titles by keyword and leaves the ones it cannot
 * place for staff to file. An unclassified course still needs a picture.
 */
export function courseImage(subject?: Subject | string): string {
  if (!subject) return lecture;
  return bySubject[subject as Subject] ?? lecture;
}
