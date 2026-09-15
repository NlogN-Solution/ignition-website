"use client";

import { useState } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { portalRoutes } from "@/lib/config";
import { applyDestination, mintApplyIntent } from "@/lib/apply/intent";
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
 *
 * ## Carrying the course
 *
 * Given a `courseSlug` it stops being a plain anchor and becomes a button that
 * mints an apply intent first (see `lib/apply/intent`). That round trip is why
 * it cannot simply be an href: the id does not exist until the student presses
 * the button, and pre-minting one on every card render would write a row for
 * every course anybody scrolled past.
 *
 * Without a `courseSlug` — the hero, the generic ready-to-apply block — it
 * behaves exactly as it always did. Those buttons genuinely have no course
 * behind them, and inventing one would be worse than carrying none.
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
  /**
   * The offering the student is applying for, if this button is attached to
   * one. Its public slug — the same key `/public/courses/{slug}` serves.
   */
  courseSlug,
  /** Pre-selected intake, where the surface knows one. */
  intakeId,
}: {
  children?: React.ReactNode;
  tone?: keyof typeof tones;
  className?: string;
  iconSize?: number;
  signedInLabel?: string;
  courseSlug?: string | null;
  intakeId?: string | null;
}) {
  const { handoff } = useResearch();
  const signedIn = useSessionHint();
  const [isStarting, setIsStarting] = useState(false);

  // A signed-in student's shortlist already lives on their account, so there
  // is nothing to hand across — sending them to registration would be worse
  // than useless.
  const plainHref = signedIn
    ? portalRoutes.dashboard
    : handoffHref(portalRoutes.register, handoff);

  const label = signedIn ? signedInLabel : children;
  const icon = (
    <ArrowUpRight
      size={iconSize}
      strokeWidth={2.25}
      aria-hidden
      className="shrink-0 transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
    />
  );

  // No course attached: the original anchor, unchanged. Real navigation,
  // middle-clickable, no JavaScript needed to work.
  if (!courseSlug) {
    return (
      <a href={plainHref} className={`${base} ${tones[tone]} ${className}`}>
        <span className="whitespace-nowrap">{label}</span>
        {icon}
      </a>
    );
  }

  async function start() {
    if (isStarting) return;
    setIsStarting(true);
    const intent = await mintApplyIntent(courseSlug!, {
      intakeId,
      sourcePath: typeof window === "undefined" ? undefined : window.location.pathname,
    });
    // `intent` is null when the mint failed. Navigating anyway is the point:
    // the student still gets to apply, they just have to pick the course once.
    const base = signedIn
      ? applyDestination.dashboard(intent?.id ?? null)
      : handoffHref(applyDestination.register(intent?.id ?? null), handoff);
    window.location.href = base;
  }

  return (
    <button
      type="button"
      onClick={start}
      disabled={isStarting}
      aria-busy={isStarting}
      className={`${base} ${tones[tone]} ${className} disabled:opacity-80`}
    >
      <span className="whitespace-nowrap">{isStarting ? "Starting…" : label}</span>
      {isStarting ? (
        <Loader2 size={iconSize} strokeWidth={2.25} aria-hidden className="shrink-0 animate-spin" />
      ) : (
        icon
      )}
    </button>
  );
}
