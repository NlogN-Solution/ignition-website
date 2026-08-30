/**
 * The National Student Survey.
 *
 * The explanatory copy and the list of themes below are a description of how
 * the survey is organised, and are safe to publish. THE SCORES ARE NOT.
 *
 * `nssThemes[].score` and `nssHeadline` are placeholders. Replace them with
 * figures published by the Office for Students, set `year`, and flip
 * `nssDataIsVerified` to true. Until that happens the section renders an
 * "Example data" badge and a standing notice in place of a source line, so
 * an unreplaced number can never read as a real one.
 */

export const nssIntro =
  "The National Student Survey is one of the major sources of student feedback in UK higher education. Final-year undergraduates at every publicly funded UK university are asked the same questions about their course, and the results are published openly. For an applicant it is the closest thing there is to asking a whole cohort what their degree was actually like before you commit three years to it.";

/**
 * The reason to read the results at all, put in the second person.
 *
 * Without this the section explains a survey; with it the section explains a
 * decision. It sits above "how to use it" because a reader who does not
 * accept the premise will not read the method.
 */
export const nssWhyItMatters =
  "You are not only choosing a university — you are choosing the teaching, the feedback and the learning environment you will live inside for the next three or four years. Prospectuses are written by marketing teams. The NSS is written by students who have just finished the exact course you are considering, which makes it the closest thing to asking a whole cohort what it was really like.";

export const nssHowToUse = [
  "Compare the same subject across universities rather than comparing whole institutions — a university with a mid-table overall score can be excellent in your field.",
  "Read the theme scores, not just the headline. Assessment and feedback behaves very differently from teaching quality, and one may matter more to you than the other.",
  "Check the response rate alongside the score. A high score from a small cohort tells you less than a slightly lower one from a large, well-answered survey.",
];

export type NssTheme = {
  id: string;
  title: string;
  /** What the questions in this theme actually ask about. */
  body: string;
  /** PLACEHOLDER. Null until a published figure replaces it. */
  score: number | null;
};

export const nssThemes: NssTheme[] = [
  {
    id: "teaching",
    title: "Teaching on my course",
    body: "Whether teaching staff explain things well, make the subject engaging and challenge students to do their best work.",
    score: null,
  },
  {
    id: "learning-opportunities",
    title: "Learning opportunities",
    body: "Whether the course gave students the chance to explore ideas in depth, bring subjects together and apply what they learned.",
    score: null,
  },
  {
    id: "assessment",
    title: "Assessment and feedback",
    body: "Whether marking criteria were clear in advance, and whether feedback arrived in time and was specific enough to act on.",
    score: null,
  },
  {
    id: "academic-support",
    title: "Academic support",
    body: "How easy it was to get help with study, and whether staff were available and useful when students asked.",
    score: null,
  },
  {
    id: "organisation",
    title: "Organisation and management",
    body: "Whether the timetable ran as published, and how well changes to the course were communicated when they happened.",
    score: null,
  },
  {
    id: "student-voice",
    title: "Student voice",
    body: "Whether students felt able to give feedback on the course, and whether it was clear that acting on it changed anything.",
    score: null,
  },
  {
    id: "learning-community",
    title: "Learning community",
    body: "Whether the course encouraged students to work together and gave them a sense of belonging to a cohort.",
    score: null,
  },
];

export type NssHeadlineStat = { value: string; label: string; detail: string };

/** PLACEHOLDER — see the file header. */
export const nssHeadline: NssHeadlineStat[] = [
  {
    value: "—",
    label: "Positivity measure",
    detail: "Share of final-year students answering positively across all themes.",
  },
  {
    value: "—",
    label: "Students responding",
    detail: "Final-year undergraduates who completed the survey.",
  },
  {
    value: "—",
    label: "Providers covered",
    detail: "Universities and colleges included in the published results.",
  },
  {
    value: "—",
    label: "Survey year",
    detail: "The cycle the figures above are drawn from.",
  },
];

export const nssDataIsVerified = false;
