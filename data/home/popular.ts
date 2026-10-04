import type { Course } from "@/data/courses/types";
import type { University } from "@/data/universities/types";
import type { Scholarship } from "@/data/scholarships";

/**
 * The four subjects students arrive already knowing they want. One list, so
 * the homepage search field's quick-fill chips (`CourseSearch.tsx`) and the
 * "Popular courses" cards below it can't end up naming the same subjects
 * differently — the cards currently show the first three of these four, see
 * `pickPopularCourses`'s `take` parameter.
 */
export const popularSearchTerms = ["Computer Science", "Business", "Nursing", "Engineering"] as const;

/**
 * One concrete course per popular term. An exact subject match wins first —
 * "Engineering" should pick a course whose `subject` is actually Engineering,
 * not whichever course's *title* happens to contain the word first (the
 * catalogue lists "Software Engineering" under Computing before it reaches
 * any true Engineering-subject course, which is exactly the wrong pick for
 * a card meant to show four distinct subjects). Title substring is the
 * fallback, for terms like "Computer Science" or "Nursing" that name a
 * course rather than one of the `Subject` values.
 *
 * Resolved against whatever course list is passed in (the homepage's own
 * `getCourses()` fetch) rather than a hand-maintained id list, so a term
 * silently stops matching if the catalogue ever drops it, instead of linking
 * to a course that no longer exists.
 *
 * `take` lets a caller show fewer cards than there are search chips (the
 * homepage's "Popular courses" cards currently show 3 of the 4 terms) without
 * forking the term list itself — `popularSearchTerms` stays the one shared
 * source for both surfaces, just read partially by one of them.
 */
export function pickPopularCourses(courses: Course[], take: number = popularSearchTerms.length): Course[] {
  return popularSearchTerms
    .slice(0, take)
    .map((term) => {
      const needle = term.toLowerCase();
      const bySubject = courses.find((course) => course.subject.toLowerCase() === needle);
      if (bySubject) return bySubject;
      return courses.find((course) => course.title.toLowerCase().includes(needle));
    })
    .filter((course): course is Course => Boolean(course));
}

/**
 * Four universities to lead with, picked by a rule rather than an editorial
 * list — nothing in the catalogue is flagged "popular", so a hand-picked
 * order would silently go stale the moment the underlying records change.
 * Graduate outcomes are the strongest single signal of a well-documented,
 * prominent institution; rankings/awards count is the fallback for records
 * that don't carry employability data yet.
 */
export function pickPopularUniversities(universities: University[]): University[] {
  function score(university: University): number {
    const rate = Number.parseFloat(university.employability?.employedRate ?? "");
    if (Number.isFinite(rate)) return 1000 + rate;
    return (university.rankings?.length ?? 0) + (university.awards?.length ?? 0);
  }

  return [...universities].sort((a, b) => score(b) - score(a)).slice(0, 4);
}

/**
 * Three scholarships for the homepage teaser. Externally-run schemes first —
 * their eligibility and deadlines come from the provider's own page, not from
 * a fictional university record, so they read as real to a visitor who has
 * not yet learned which university names on this site are examples.
 */
export function pickFeaturedScholarships(scholarships: Scholarship[]): Scholarship[] {
  const external = scholarships.filter((s) => s.kind === "external");
  const rest = scholarships.filter((s) => s.kind !== "external");
  return [...external, ...rest].slice(0, 3);
}
