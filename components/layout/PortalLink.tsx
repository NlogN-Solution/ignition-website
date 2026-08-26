"use client";

import { LayoutDashboard } from "lucide-react";
import { portalRoutes } from "@/lib/config";
import { handoffHref } from "@/lib/handoff/payload";
import { useResearch } from "@/lib/handoff/useResearch";
import { useSessionHint } from "@/lib/session/useSessionHint";

/**
 * The header's account control. One slot, two states:
 *
 *   signed out — "Login", plain.
 *   signed in  — "Dashboard", so the public site stops behaving like a
 *                different product once a student has an account.
 *
 * Signed-out students carry their research on this link too, not only on the
 * apply CTAs: a student who saves four universities and then goes looking for
 * the login button should not lose them for having taken the other door.
 */
export function PortalLink({ className = "" }: { className?: string }) {
  const signedIn = useSessionHint();
  const { handoff } = useResearch();

  const styles = `inline-flex items-center justify-center gap-[8px] whitespace-nowrap rounded-[10px] border font-semibold transition-colors duration-200 ${
    signedIn
      ? "border-navy/20 bg-navy/[0.06] text-navy hover:border-navy/35 hover:bg-navy/[0.1]"
      : "border-hairline bg-white/70 text-navy hover:border-ring-idle hover:bg-white"
  } ${className}`;

  if (signedIn) {
    return (
      <a href={portalRoutes.dashboard} className={styles}>
        <LayoutDashboard size={15} strokeWidth={2.2} aria-hidden />
        Dashboard
      </a>
    );
  }

  return (
    <a href={handoffHref(portalRoutes.login, handoff)} className={styles}>
      Login
    </a>
  );
}
