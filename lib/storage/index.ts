/**
 * All persistence goes through this module. It is deliberately the only place
 * that knows about localStorage, so swapping in an API-backed store when
 * accounts arrive is a change to this file and nothing else.
 */

export const storageKeys = {
  quizAnswers: "ignition:quiz-answers:v1",
  quizProfile: "ignition:quiz-profile:v1",
  journeyStage: "ignition:journey-stage:v1",
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
