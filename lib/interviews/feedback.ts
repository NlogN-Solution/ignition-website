import type { PracticeQuestion } from "@/data/guides/interviews";

/**
 * The seam for automated interview feedback.
 *
 * Today the only implementation is `rubricFeedback`, which returns the
 * question's own assessment focus plus a few deterministic observations about
 * the answer. It makes no judgement it cannot justify.
 *
 * When model-generated feedback is added it implements this same interface —
 * the practice component calls `getFeedback` and does not care which provider
 * answered, so swapping or adding one touches this file alone.
 */
export type Feedback = {
  /** What the interviewer is actually assessing. */
  focus: string;
  /** Neutral, checkable observations about the answer as written. */
  observations: string[];
};

export type FeedbackProvider = (
  question: PracticeQuestion,
  answer: string,
) => Promise<Feedback> | Feedback;

/** Rough proxy for spoken length: interview answers run ~130 words a minute. */
const WORDS_PER_MINUTE = 130;

export const rubricFeedback: FeedbackProvider = (question, answer) => {
  const words = answer.trim().split(/\s+/).filter(Boolean).length;
  const seconds = Math.round((words / WORDS_PER_MINUTE) * 60);
  const observations: string[] = [];

  observations.push(
    `About ${words} words — roughly ${seconds} seconds spoken aloud.`,
  );

  if (words < 60) {
    observations.push(
      "Short for an interview answer. Most answers benefit from a specific example after the opening point.",
    );
  } else if (words > 260) {
    observations.push(
      "Long for a single answer. Interviewers usually prefer a clear point they can follow up on to an exhaustive one.",
    );
  }

  if (!/\b(because|since|so that|which means|therefore)\b/i.test(answer)) {
    observations.push(
      "No explicit reasoning words appear. Saying why, not just what, is most of what is being assessed.",
    );
  }

  if (!/\b(I|my|me)\b/.test(answer)) {
    observations.push(
      "The answer does not refer to your own experience. Interviewers are asking about you, not the subject in general.",
    );
  }

  return { focus: question.focus, observations };
};

export function getFeedback(
  question: PracticeQuestion,
  answer: string,
  provider: FeedbackProvider = rubricFeedback,
) {
  return provider(question, answer);
}
