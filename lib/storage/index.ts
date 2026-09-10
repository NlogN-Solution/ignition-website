/**
 * All persistence goes through this module. It is deliberately the only place
 * that knows about localStorage, so swapping in an API-backed store when
 * accounts arrive is a change to this file and nothing else.
 */

export const storageKeys = {
  quizAnswers: "ignition:quiz-answers:v1",
  quizProfile: "ignition:quiz-profile:v1",
  /**
   * Which of the four journey phases the student says they are in.
   *
   * `v2` because the vocabulary changed, not the shape. It used to hold one of
   * seven overlapping self-descriptions ("I'm exploring my options" and "I
   * don't know what I want to study" were, in practice, the same person); it
   * now holds a `PhaseId` from `data/journey/pipeline`, the one taxonomy the
   * map, the next-step panel and the adviser record all share. A `v1` value
   * would resolve to no phase at all, so it is left behind rather than
   * migrated — the question is one click to answer again.
   */
  journeyStage: "ignition:journey-stage:v2",
  interviewAnswers: "ignition:interview-answers:v1",
  compareSelection: "ignition:compare-selection:v1",
  costEstimate: "ignition:cost-estimate:v1",
  /**
   * Name, email and phone from the homepage adviser form. Kept so the form
   * does not ask a returning student twice, and so the portal registration
   * page can be prefilled from it later. Never sent anywhere except the lead
   * endpoint the student submitted it to.
   */
  leadContact: "ignition:lead-contact:v1",
  /**
   * The eligibility assessment in progress.
   *
   * Kept because the assessment is three or four minutes of typing and a
   * refresh part-way through is the single most likely way it is abandoned.
   * Cleared the moment the server confirms the submission — a draft that
   * outlived its own submission would greet a returning student with a form
   * they have already sent.
   */
  eligibilityDraft: "ignition:eligibility-draft:v1",
  /**
   * The receipt for a *submitted* assessment — reference and date, nothing
   * else.
   *
   * Submitting clears `eligibilityDraft`, which used to leave no trace at all:
   * a student who had finished the assessment looked identical to one who had
   * never opened it, and the next-step panel would cheerfully invite them to
   * do the whole thing again. This is the smallest record that prevents that.
   */
  eligibilityOutcome: "ignition:eligibility-outcome:v1",
} as const;

/**
 * Checklists get one slot each rather than sharing a single record. Two
 * checklists render on the same page, each holding its own copy of that
 * record in state — whichever was ticked last would otherwise write its
 * stale snapshot over the other's progress.
 */
export function checklistKey(id: string) {
  return `ignition:checklist:${id}:v1` as const;
}

export type StorageKey =
  | (typeof storageKeys)[keyof typeof storageKeys]
  | ReturnType<typeof checklistKey>;

/**
 * Reads never throw. Private browsing, disabled site data and corrupted JSON
 * all resolve to the fallback rather than breaking the page.
 */
export function readStored<T>(key: StorageKey, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function writeStored<T>(key: StorageKey, value: T): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Quota or blocked storage — the session continues in memory. */
  }
}

export function clearStored(key: StorageKey): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(key);
  } catch {
    /* Ignored for the same reasons as above. */
  }
}
