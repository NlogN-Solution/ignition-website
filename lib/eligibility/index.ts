import type { University } from "@/data/universities";

/**
 * An indicative check, not an offer.
 *
 * Every UK university sets its own conversion from an international
 * qualification to its own entry standard, publishes it per course rather than
 * per institution, and revises it per intake. Nothing here is that. What this
 * does is put a student's grades and a university's *typical* range on the
 * same scale so the answer to "am I anywhere near this?" stops being a guess —
 * and then says, in the result itself, that the real answer comes from the
 * university.
 *
 * The tariff table for A-level is UCAS's published one. Everything below it is
 * Ignition's own rough guide, marked as such wherever it is shown, and it is
 * the first thing to replace when real per-course requirements arrive.
 */

export const eligibilityNotice =
  "This is an indicative guide, not a decision. Universities set their own conversions from international qualifications, publish them per course rather than per institution, and change them between intakes — always confirm against the official course page before you rely on it.";

/** UCAS tariff points for a single A-level grade. */
const aLevelPoints: Record<string, number> = {
  "A*": 56,
  A: 48,
  B: 40,
  C: 32,
  D: 24,
  E: 16,
};

export const aLevelGrades = ["A*", "A", "B", "C", "D", "E"] as const;
export type ALevelGrade = (typeof aLevelGrades)[number];

export const qualifications = [
  { id: "a-level", label: "A-level (three subjects)" },
  { id: "ib", label: "International Baccalaureate diploma" },
  { id: "nepal-plus-two", label: "Nepal +2 / HSEB (GPA out of 4)" },
  { id: "india-cbse", label: "Indian Class XII (percentage)" },
] as const;

export type QualificationId = (typeof qualifications)[number]["id"];

export type Answers = {
  qualification: QualificationId;
  /** Three A-level grades. Only read when the qualification is A-level. */
  grades: ALevelGrade[];
  /** IB diploma total, 24–45. */
  ibPoints: number;
  /** Nepal +2 GPA, 0–4. */
  gpa: number;
  /** Indian Class XII aggregate percentage. */
  percentage: number;
  /** IELTS overall band, or 0 for "not taken yet". */
  ielts: number;
  /** Maximum annual tuition the student can fund, or 0 for no limit. */
  budget: number;
};

export const defaultAnswers: Answers = {
  qualification: "a-level",
  grades: ["B", "B", "C"],
  ibPoints: 30,
  gpa: 3.2,
  percentage: 75,
  ielts: 6,
  budget: 0,
};

/**
 * Everything reduces to a UCAS-style tariff so one comparison serves every
 * qualification. The non-UK scales are linear approximations of the bands
 * universities commonly publish, deliberately conservative at the top: a
 * calculator that flatters a student into applying somewhere they will be
 * rejected has cost them a choice and an application fee.
 */
export function toTariff(answers: Answers): number {
  switch (answers.qualification) {
    case "a-level":
      return answers.grades.reduce((total, grade) => total + (aLevelPoints[grade] ?? 0), 0);

    case "ib":
      // 24 points (the pass) sits around three Cs; 45 sits above three A*s.
      return Math.round(96 + (answers.ibPoints - 24) * 3.4);

    case "nepal-plus-two":
      // A 4.0 GPA is treated as around AAB, 2.4 as around three Ds.
      return Math.round(Math.max(0, (answers.gpa - 2.4) / 1.6) * 64 + 72);

    case "india-cbse":
      // 60% is treated as around three Ds, 95% as around AAA.
      return Math.round(Math.max(0, (answers.percentage - 60) / 35) * 72 + 72);
  }
}

export type Verdict = "comfortable" | "borderline" | "below" | "excluded";

export type Assessment = {
  university: University;
  verdict: Verdict;
  /** Plain-language reasons, in the order they should be read. */
  notes: string[];
  /** How far above or below the typical range, in tariff points. */
  margin: number;
};

const verdictOrder: Record<Verdict, number> = {
  comfortable: 0,
  borderline: 1,
  below: 2,
  excluded: 3,
};

export const verdictLabels: Record<Verdict, { title: string; blurb: string }> = {
  comfortable: {
    title: "Within the typical range",
    blurb: "Your grades sit at or above what this university usually asks for.",
  },
  borderline: {
    title: "Close, but not clear",
    blurb:
      "You are within about a grade of the typical range. Worth an application, and worth asking the university directly.",
  },
  below: {
    title: "Below the typical range",
    blurb:
      "A direct entry application is unlikely on these grades. A foundation year or a different route is the realistic way in.",
  },
  excluded: {
    title: "Ruled out by your other answers",
    blurb: "Not the grades — the English requirement or the tuition budget you set.",
  },
};

/**
 * One university, assessed. `excluded` is kept separate from `below` on
 * purpose: "your English score is not there yet" and "your grades are not
 * there yet" have completely different fixes, and collapsing them into one
 * rejection tells the student neither.
 */
function assess(university: University, answers: Answers, tariff: number): Assessment {
  const required = university.entry.tariff ?? 0;
  const margin = tariff - required;
  const notes: string[] = [];

  const overBudget =
    answers.budget > 0 && university.tuition.min > answers.budget;
  const shortOnEnglish =
    answers.ielts > 0 &&
    university.entry.ielts !== undefined &&
    answers.ielts < university.entry.ielts;

  if (overBudget) {
    notes.push(
      `Tuition starts at £${university.tuition.min.toLocaleString("en-GB")}, above the budget you set.`,
    );
  }

  if (shortOnEnglish) {
    notes.push(
      `Asks for IELTS ${university.entry.ielts} overall; you entered ${answers.ielts}. A pre-sessional English course is the usual route when you are close.`,
    );
  } else if (answers.ielts === 0) {
    notes.push(`Asks for IELTS ${university.entry.ielts ?? "—"} overall.`);
  }

  notes.push(`Typically asks for ${university.entry.typical}.`);

  if (overBudget || shortOnEnglish) {
    return { university, verdict: "excluded", notes, margin };
  }

  // A grade at A-level is worth eight tariff points, so "within one grade" is
  // the honest width of the borderline band rather than a round number.
  const verdict: Verdict =
    margin >= 0 ? "comfortable" : margin >= -8 ? "borderline" : "below";

  return { university, verdict, notes, margin };
}

/** `catalogue` is passed in because the records come from the API now. */
export function assessAll(answers: Answers, catalogue: University[]) {
  const tariff = toTariff(answers);

  const results = catalogue
    .map((university) => assess(university, answers, tariff))
    .sort(
      (a, b) =>
        verdictOrder[a.verdict] - verdictOrder[b.verdict] || b.margin - a.margin,
    );

  return { tariff, results };
}
