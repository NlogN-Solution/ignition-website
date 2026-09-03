/**
 * The research a student did before they had an account, in a shape that can
 * travel to the student portal.
 *
 * Everything here is *research context*, not a commitment: a shortlist is
 * "these are the ones I was looking at", not an application. The portal shows
 * it back to the student and to their advisor, and pre-fills what it honestly
 * can. It never becomes an application on its own — only a counsellor opens
 * one (see `backend/app/routes/application.py`).
 *
 * **Ids are catalogue slugs, and since the catalogue import they are the
 * *shared* catalogue's slugs** — `essex` here is `universities.slug` there.
 * That is what `v2` records. A `v1` payload was minted when this site ran on
 * six invented institutions, so its ids look identical in shape and mean
 * nothing on the other side; the version is how the portal tells them apart
 * and refuses to resolve the old ones.
 *
 * What still does not travel is a decision. A shortlist is "these are the ones
 * I was looking at", and the portal presents it as exactly that. Only a
 * counsellor opens an application (`backend/app/routes/application.py`) —
 * resolving a slug to a row makes that conversation faster, it does not
 * replace it.
 */

/**
 * 2 — ids are the shared catalogue's slugs, and resolve.
 * 1 — ids were the fictional catalogue's slugs. Still parsed, never resolved.
 */
export const HANDOFF_VERSION = 2;

/** Fragment key on the portal URL. See `handoffHref` for why the fragment. */
export const HANDOFF_PARAM = "ignition-research";

/**
 * Long shortlists are truncated rather than rejected. A URL that a browser
 * silently drops is far worse than a shortlist that arrives with its first
 * dozen entries, and nothing downstream treats the list as exhaustive.
 */
const MAX_ITEMS = 12;

export type HandoffCareer = {
  id: string;
  title: string;
  /** Percentage match from the career quiz, as the student was shown it. */
  match: number;
};

export type HandoffCourse = {
  id: string;
  title: string;
  qualification: string;
  subject: string;
};

export type HandoffUniversity = {
  id: string;
  name: string;
  city: string;
};

export type ResearchHandoff = {
  v: number;
  /** ISO timestamp of when the student pressed the button. */
  at: string;
  /** Where they said they were on /start, if they said. */
  stage?: string;
  career?: HandoffCareer;
  /** Runners-up from the quiz, for context on the career goal. */
  alsoMatched?: HandoffCareer[];
  /**
   * Kept on the wire although the public site no longer saves anything: the
   * portal validates this shape (`student-frontend/src/lib/handoff.js`) and
   * older links still in circulation carry populated lists. Nothing on this
   * side fills them any more, so they always arrive empty from here.
   */
  courses: HandoffCourse[];
  universities: HandoffUniversity[];
  /**
   * Slugs of universities put side by side on /compare — the actionable part
   * of the payload.
   *
   * Slugs alone, with no names beside them: the names live in the catalogue
   * the backend already owns, and it resolves them
   * (`GET /users/{id}/research`). Shipping a 44-record name index to every
   * page so that a URL could carry a label the receiver can look up would be
   * paying twice for one fact — and the URL is the one place where a label
   * can go stale without anything noticing.
   */
  compared: string[];
  /** Whatever the student modelled on /money/calculator, if anything. */
  budget?: { annualTuition?: number; monthlyLiving?: number; currency: "GBP" };
};

export type ResearchDraft = Omit<
  ResearchHandoff,
  "v" | "at" | "courses" | "universities"
>;

export function buildHandoff(draft: ResearchDraft): ResearchHandoff {
  return {
    v: HANDOFF_VERSION,
    at: new Date().toISOString(),
    ...draft,
    courses: [],
    universities: [],
    compared: draft.compared.slice(0, MAX_ITEMS),
    alsoMatched: draft.alsoMatched?.slice(0, 3),
  };
}

/** True when there is anything worth carrying across the login boundary. */
export function hasResearch(draft: ResearchDraft): boolean {
  return Boolean(draft.career || draft.compared.length || draft.budget);
}

/** UTF-8 safe base64url — `btoa` alone throws on anything above U+00FF. */
export function encodeHandoff(handoff: ResearchHandoff): string {
  const json = JSON.stringify(handoff);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Builds the portal URL a "start my application" button points at.
 *
 * The payload rides in the URL *fragment*, not the query string, and that is
 * deliberate: fragments are never sent to the server, so a student's
 * shortlist stays out of access logs, referrer headers and any CDN in front
 * of the portal. The portal reads it client-side and strips it immediately.
 */
export function handoffHref(base: string, handoff: ResearchHandoff | null): string {
  if (!handoff) return base;
  return `${base}#${HANDOFF_PARAM}=${encodeHandoff(handoff)}`;
}
