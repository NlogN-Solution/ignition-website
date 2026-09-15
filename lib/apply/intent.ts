import { apiBaseUrl, portalRoutes } from "@/lib/config";

/**
 * Carrying "I want to apply for *this* course" across the sign-up boundary.
 *
 * Until now the public Apply Now button was one fixed link to the portal's
 * registration screen — the same href on the hero, on every offering card and
 * on every course page. The card knew its offering slug and dropped it, and
 * onboarding then asked the student to find the same course again in a
 * dropdown. The product knew the answer and asked the question anyway.
 *
 * ## Why the server holds it
 *
 * The obvious fix is to put the course in the URL and read it on the other
 * side. That works right up until you ask what stops a crafted link claiming a
 * course that is unpublished, or priced differently, or someone else's — at
 * which point every consumer needs to re-resolve and re-validate it, and one
 * of them eventually will not.
 *
 * So the course never travels. `POST /public/apply-intents` resolves the slug
 * against `programs` and returns an opaque id; that id is all the browser ever
 * carries. There is no payload to tamper with and no signature to check,
 * because there is nothing in the URL but a pointer to a row the server wrote.
 *
 * ## Why it is best-effort
 *
 * If the mint call fails — offline, rate-limited, backend down — Apply Now
 * still navigates, just without the context. Losing the shortcut is a small
 * regression in convenience; blocking the button is a student who cannot
 * apply. The failure is silent for exactly that reason.
 */

export interface ApplyIntentCourse {
  program_id: string;
  course_slug: string | null;
  course_name: string;
  degree_level: string | null;
  university_id: string | null;
  university_name: string | null;
  university_city: string | null;
  intake_id: string | null;
  intake_label: string | null;
  tuition_fee: number | null;
  currency: string | null;
  duration_months: number | null;
}

export interface ApplyIntent {
  id: string;
  course: ApplyIntentCourse;
  source_path: string | null;
  created_at: string;
  claimed_at: string | null;
  is_fulfilled: boolean;
}

/** The query parameter the portal reads on `/registration` and `/login`. */
export const INTENT_PARAM = "intent";

export async function mintApplyIntent(
  courseSlug: string,
  options: { intakeId?: string | null; sourcePath?: string } = {},
): Promise<ApplyIntent | null> {
  try {
    const response = await fetch(`${apiBaseUrl}/public/apply-intents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        course_slug: courseSlug,
        intake_id: options.intakeId ?? null,
        source_path: options.sourcePath ?? null,
      }),
    });
    if (!response.ok) return null;
    return (await response.json()) as ApplyIntent;
  } catch {
    // See "Why it is best-effort" above.
    return null;
  }
}

/**
 * Where Apply Now should send someone.
 *
 * A query parameter rather than the fragment the research handoff uses. The
 * two carry different things and want opposite treatment: the shortlist is the
 * student's own browsing history and is deliberately kept out of server logs,
 * whereas the intent id is an opaque pointer to a published course that the
 * *server* has to read in order to render "You're applying for…" on the
 * registration screen before anyone has signed in. A fragment never reaches it.
 */
export function withIntent(baseUrl: string, intentId: string | null | undefined): string {
  if (!intentId) return baseUrl;
  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}${INTENT_PARAM}=${encodeURIComponent(intentId)}`;
}

export const applyDestination = {
  /** Signed out: make an account, then land in the apply flow. */
  register: (intentId: string | null) => withIntent(portalRoutes.register, intentId),
  /** Signed in: the portal resolves the intent and goes straight to the course. */
  dashboard: (intentId: string | null) => withIntent(portalRoutes.dashboard, intentId),
};
