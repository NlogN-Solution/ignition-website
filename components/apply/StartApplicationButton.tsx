"use client";

import { ArrowUpRight } from "lucide-react";
import { portalRoutes } from "@/lib/config";
import { handoffHref } from "@/lib/handoff/payload";
import { useResearch } from "@/lib/handoff/useResearch";
import { useSessionHint } from "@/lib/session/useSessionHint";

/**
 * The one button that crosses from the public platform into the portal.
 *
 * It is a plain anchor, not a `next/link` — the portal is a separate
 * deployment — and it carries whatever the student has researched so far in
 * the URL fragment. A student already signed in goes straight to their
 * dashboard; everyone else lands on registration with their shortlist
 * attached.
 *
 * Deliberately not a `<Link>`-shaped abstraction over `ArrowButton`: the href
 * can only be built on the client (it reads localStorage), so this renders
 * the shared button styling directly rather than fighting a server component.
 */

const base =
  "group inline-flex items-center justify-center rounded-[10px] font-semibold transition-[transform,background-color,box-shadow] duration-200 active:scale-[0.985]";

const tones = {
  primary:
    "bg-navy text-white hover:bg-navy-ink hover:shadow-[0_10px_30px_-12px_rgba(1,22,111,0.65)]",
  accent:
    "bg-orange text-white hover:brightness-[0.94] hover:shadow-[0_10px_30px_-12px_rgba(252,90,7,0.7)]",
  ghost:
    "border border-hairline bg-white/70 text-navy hover:border-ring-idle hover:bg-white",
} as const;

export function StartApplicationButton({
  children = "Start my application",
  tone = "primary",
  className = "h-[52px] gap-[16px] px-7 text-[16px]",
  iconSize = 18,
  /** Copy shown instead of `children` once the session hint says signed in. */
  signedInLabel = "Go to my application",
}: {
  children?: React.ReactNode;
  tone?: keyof typeof tones;
  className?: string;
  iconSize?: number;
  signedInLabel?: string;
}) {
  const { handoff } = useResearch();
  const signedIn = useSessionHint();

  // A signed-in student's shortlist already lives on their account, so there
  // is nothing to hand across — sending them to registration would be worse
  // than useless.
  const href = signedIn
    ? portalRoutes.dashboard
    : handoffHref(portalRoutes.register, handoff);

  return (
    <a href={href} className={`${base} ${tones[tone]} ${className}`}>
      <span className="whitespace-nowrap">{signedIn ? signedInLabel : children}</span>
      <ArrowUpRight
        size={iconSize}
        strokeWidth={2.25}
        aria-hidden
        className="shrink-0 transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
      />
    </a>
  );
}
