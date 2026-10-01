import { createHmac, timingSafeEqual } from "node:crypto";
import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Draft preview: turns on Next's draft mode for the holder of a signed link,
 * so an editor can see an unpublished page before anyone else can.
 *
 * The token is an HS256 JWT minted by the admin API (`app/core/landing.py`)
 * and signed with the same shared secret as revalidation. It is verified here
 * rather than trusted, and it names one page key: a link forwarded to someone
 * else unlocks that draft and nothing more.
 *
 * Verification is hand-rolled against `node:crypto` rather than pulling in a
 * JWT library. The site has five runtime dependencies and this is one
 * signature check of a token we mint ourselves — the algorithm is not
 * negotiated with anyone, so the usual reason to reach for a library (the
 * `alg` confusion class of bugs) is answered by refusing to read `alg` at all.
 */

export const runtime = "nodejs";

function base64url(input: string): Buffer {
  return Buffer.from(input.replace(/-/g, "+").replace(/_/g, "/"), "base64");
}

function verify(token: string, secret: string): { key?: string; type?: string; exp?: number } | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [header, payload, signature] = parts;

  const expected = createHmac("sha256", secret).update(`${header}.${payload}`).digest();
  const given = base64url(signature);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;

  try {
    return JSON.parse(base64url(payload).toString("utf8")) as { key?: string; type?: string; exp?: number };
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Preview is not configured." }, { status: 503 });
  }

  const params = new URL(request.url).searchParams;
  const token = params.get("token") ?? "";
  const claims = verify(token, secret);

  if (!claims || claims.type !== "preview") {
    return NextResponse.json({ error: "Invalid preview link." }, { status: 401 });
  }
  if (typeof claims.exp === "number" && claims.exp * 1000 < Date.now()) {
    return NextResponse.json({ error: "This preview link has expired." }, { status: 401 });
  }
  // The token names the page it is good for; a slug in the query that does not
  // belong to it must not be honoured.
  if (params.get("key") && params.get("key") !== claims.key) {
    return NextResponse.json({ error: "This link is for a different page." }, { status: 401 });
  }

  (await draftMode()).enable();

  // A fragment has no URL of its own — it is pulled into a coded page — so the
  // best a preview can do is put the reader on the homepage with drafts on.
  const slug = params.get("slug");
  return NextResponse.redirect(new URL(slug ? `/${slug.replace(/^\/+/, "")}` : "/", request.url));
}
