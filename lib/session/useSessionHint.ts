"use client";

import { useEffect, useState } from "react";
import { sessionHintCookie } from "@/lib/config";

/**
 * Whether the student appears to be signed in to the portal.
 *
 * This is a *hint*, and it is treated as one everywhere it is used: it flips
 * "Login" to "Dashboard" and softens a couple of CTAs. It grants nothing, it
 * is trivially forgeable, and no private data is ever rendered from it. The
 * real session is the portal's JWT, verified server-side on every call.
 *
 * Always false on the server and on the first client paint, so the markup
 * React hydrates against is the same one it rendered.
 */
export function useSessionHint(): boolean {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const read = () =>
      setSignedIn(
        document.cookie
          .split(";")
          .some((entry) => entry.trim().startsWith(`${sessionHintCookie}=1`)),
      );

    read();

    // Coming back from the portal in the same tab (bfcache restore) does not
    // re-run the effect, so the nav would keep the stale label.
    window.addEventListener("pageshow", read);
    document.addEventListener("visibilitychange", read);
    return () => {
      window.removeEventListener("pageshow", read);
      document.removeEventListener("visibilitychange", read);
    };
  }, []);

  return signedIn;
}
