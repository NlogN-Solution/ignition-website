import Link from "next/link";

/**
 * The card language is lifted from the navbar dropdown panel — white on
 * canvas, hairline border, 12px radius, navy-tinted shadow — so cards read as
 * the same material as the chrome. `interactive` adds the button's hover
 * contract: a small lift plus the deeper navy shadow over 200ms.
 */
type CardProps = {
  children: React.ReactNode;
  /** Lift and deepen the shadow on hover. Implied when `href` is set. */
  interactive?: boolean;
  /** Recede the card into the canvas — used for supporting or nested content. */
  tone?: "raised" | "flat";
  href?: string;
  className?: string;
};

const base =
  "relative flex flex-col rounded-xl border bg-white transition-[transform,border-color,box-shadow] duration-200";

const tones = {
  raised: "border-hairline shadow-[0_18px_40px_-28px_rgba(1,22,111,0.28)]",
  flat: "border-hairline bg-white/60 shadow-none",
} as const;

const lift =
  "hover:-translate-y-[2px] hover:border-ring-idle hover:shadow-[0_24px_48px_-24px_rgba(1,22,111,0.35)]";

export function Card({
  children,
  interactive = false,
  tone = "raised",
  href,
  className = "",
}: CardProps) {
  const styles = `${base} ${tones[tone]} ${
    interactive || href ? `group ${lift}` : ""
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return <div className={styles}>{children}</div>;
}

/**
 * Makes a card clickable while leaving room for its own buttons. The link
 * covers the card through a stretched pseudo-element rather than wrapping the
 * content, so save and compare controls can sit above it — nesting a button
 * inside an anchor is invalid, and would navigate on click.
 */
export function CardLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`after:absolute after:inset-0 after:rounded-xl after:content-[''] ${className}`}
    >
      {children}
    </Link>
  );
}
