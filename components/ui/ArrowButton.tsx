import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * `tone` exists because two of these sit on a navy panel at the foot of the
 * study guide, where the default navy fill is invisible. Setting a background
 * through `className` instead would leave two `bg-*` utilities on one element
 * and let stylesheet order decide the winner, which is not something to leave
 * to chance on a call to action.
 */
type Tone = "navy" | "white" | "onDark";

const tones: Record<Tone, string> = {
  navy: "bg-navy text-white hover:bg-navy-ink hover:shadow-[0_10px_30px_-12px_rgba(1,22,111,0.65)]",
  white:
    "bg-white text-navy hover:shadow-[0_14px_36px_-14px_rgba(0,0,0,0.45)]",
  onDark:
    "border border-white/20 bg-white/[0.08] text-white hover:border-white/35 hover:bg-white/[0.15]",
};

type Props = {
  href: string;
  children: React.ReactNode;
  /** Colour of the trailing arrow — the match-screen CTA uses orange. */
  arrowClassName?: string;
  className?: string;
  iconSize?: number;
  tone?: Tone;
};

export function ArrowButton({
  href,
  children,
  arrowClassName = "",
  className = "",
  iconSize = 18,
  tone = "navy",
}: Props) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center rounded-[10px] font-semibold transition-[transform,background-color,border-color,box-shadow] duration-200 active:scale-[0.985] ${tones[tone]} ${className}`}
    >
      <span className="whitespace-nowrap">{children}</span>
      <ArrowUpRight
        size={iconSize}
        strokeWidth={2.25}
        aria-hidden
        className={`shrink-0 transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] ${arrowClassName}`}
      />
    </Link>
  );
}

export function GhostButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const styles = `inline-flex items-center justify-center whitespace-nowrap rounded-[10px] border border-hairline bg-white/70 font-semibold text-navy transition-colors duration-200 hover:border-ring-idle hover:bg-white ${className}`;

  // Login points at the separately hosted student dashboard, so absolute URLs
  // leave the router alone and go out as a plain anchor.
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} rel="noopener noreferrer" className={styles}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={styles}>
      {children}
    </Link>
  );
}
