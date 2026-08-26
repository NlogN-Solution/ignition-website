import { axisLabels } from "./labels";
import {
  dimensionKeys,
  dimensions,
  type Dimension,
  type Profile,
  type QuizAnswers,
  type QuizQuestion,
  type Weights,
} from "./types";

/**
 * Scoring lives entirely here — no React, no DOM. The UI hands in answers and
 * gets back plain data, which keeps the quiz testable and lets the same
 * profile drive course and university recommendations later.
 */

const dimensionWeight: Record<Dimension, number> = {
  interests: 0.3,
  work: 0.25,
  personality: 0.2,
  academic: 0.15,
  values: 0.1,
};

export function emptyProfile(): Profile {
  // Built through a loose shape because indexing `Profile` by a union of
  // dimensions widens the assignment target to an intersection of every axis.
  const profile: Record<string, Record<string, number>> = {};

  for (const dimension of dimensions) {
    const axis: Record<string, number> = {};
    for (const key of dimensionKeys[dimension]) axis[key] = 0;
    profile[dimension] = axis;
  }

  return profile as unknown as Profile;
}

function addWeights(profile: Profile, weights: Weights) {
  for (const dimension of dimensions) {
    const contribution = weights[dimension];
    if (!contribution) continue;

    const axis = profile[dimension] as Record<string, number>;
    for (const [key, value] of Object.entries(contribution)) {
      if (typeof value === "number") axis[key] += value;
    }
  }
}

/** Accumulate every chosen option's weights into one dense profile. */
export function buildProfile(
  answers: QuizAnswers,
  questions: QuizQuestion[],
): Profile {
  const profile = emptyProfile();

  for (const question of questions) {
    const chosen = answers[question.id];
    if (!chosen?.length) continue;

    for (const optionId of chosen) {
      const option = question.options.find((o) => o.id === optionId);
      if (option) addWeights(profile, option.weights);
    }
  }

  return profile;
}

function cosine(a: Record<string, number>, b: Record<string, number>) {
  let dot = 0;
  let magA = 0;
  let magB = 0;

  for (const key of Object.keys(a)) {
    const x = a[key] ?? 0;
    const y = b[key] ?? 0;
    dot += x * y;
    magA += x * x;
    magB += y * y;
  }

  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

/**
 * Cosine similarity on non-negative vectors clusters tightly in the upper
 * range, so a raw 0.78 and a raw 0.72 would look identical to a student.
 * This stretches the band we actually observe (~0.35–0.95) across a readable
 * 40–96%, and caps below 100 because no quiz result is a certainty.
 */
function toPercentage(similarity: number) {
  const stretched = (similarity - 0.35) / 0.6;
  return Math.round(40 + Math.max(0, Math.min(1, stretched)) * 56);
}

export type MatchReason = { dimension: Dimension; key: string; label: string };

export type CareerMatch<T extends { weights: Weights }> = {
  career: T;
  score: number;
  reasons: MatchReason[];
};

/**
 * Why a career matched: the axes where the student's profile and the career's
 * own profile are both strong. Ranked by the product of the two normalised
 * strengths, so a shared peak beats two lukewarm overlaps.
 */
function explain(profile: Profile, careerProfile: Profile, limit = 4) {
  const candidates: (MatchReason & { strength: number })[] = [];

  for (const dimension of dimensions) {
    const mine = profile[dimension] as Record<string, number>;
    const theirs = careerProfile[dimension] as Record<string, number>;
    const myMax = Math.max(...Object.values(mine), 0);
    const theirMax = Math.max(...Object.values(theirs), 0);
    if (myMax === 0 || theirMax === 0) continue;

    for (const key of Object.keys(mine)) {
      const strength =
        (mine[key] / myMax) * (theirs[key] / theirMax) * dimensionWeight[dimension];
      if (strength <= 0) continue;

      candidates.push({
        dimension,
        key,
        label: axisLabels[dimension][key] ?? key,
        strength,
      });
    }
  }

  return candidates
    .sort((a, b) => b.strength - a.strength)
    .slice(0, limit)
    .map(({ dimension, key, label }) => ({ dimension, key, label }));
}

export function matchCareers<T extends { weights: Weights }>(
  profile: Profile,
  careers: T[],
): CareerMatch<T>[] {
  return careers
    .map((career) => {
      const careerProfile = emptyProfile();
      addWeights(careerProfile, career.weights);

      let similarity = 0;
      for (const dimension of dimensions) {
        similarity +=
          dimensionWeight[dimension] *
          cosine(
            profile[dimension] as Record<string, number>,
            careerProfile[dimension] as Record<string, number>,
          );
      }

      return {
        career,
        score: toPercentage(similarity),
        reasons: explain(profile, careerProfile),
      };
    })
    .sort((a, b) => b.score - a.score);
}

export type TraitScore = { key: string; label: string; percent: number };

/**
 * The "Your Career Profile" bars. Scores are relative strengths within the
 * student's own answers, not absolute measurements — the top axis is scaled
 * to 96 rather than 100 to keep that honest.
 */
export function profileStrengths(
  profile: Profile,
  dimension: Dimension = "personality",
  limit = 5,
): TraitScore[] {
  const axis = profile[dimension] as Record<string, number>;
  const max = Math.max(...Object.values(axis), 0);
  if (max === 0) return [];

  return Object.entries(axis)
    .map(([key, value]) => ({
      key,
      label: axisLabels[dimension][key] ?? key,
      percent: Math.round((value / max) * 96),
    }))
    .filter((entry) => entry.percent > 0)
    .sort((a, b) => b.percent - a.percent)
    .slice(0, limit);
}

/** True once enough has been answered for the result to mean anything. */
export function hasEnoughAnswers(answers: QuizAnswers, questions: QuizQuestion[]) {
  const answered = questions.filter((q) => answers[q.id]?.length).length;
  return answered >= Math.ceil(questions.length / 2);
}
