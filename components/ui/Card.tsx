import Link from "next/link";

/**
 * Flat, hairline-bordered, 4px radius — no soft shadow at rest. `interactive`
 * swaps the lift-and-glow hover for a border that darkens to ink and a thin
 * orange rule that draws in along the top edge: depth comes from a line, not
 * a blur.
 */
type CardProps = {
  children: React.ReactNode;
  /** Border darkens, top rule draws in. Implied when `href` is set. */
  interactive?: boolean;
  /** Recede the card into the canvas — used for supporting or nested content. */
  tone?: "raised" | "flat";
  href?: string;
  className?: string;
};

const base =
  "relative flex flex-col rounded-md border transition-colors duration-200 before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:scale-x-0 before:bg-orange before:transition-transform before:duration-200 before:content-['']";

const tones = {
  raised: "border-hairline bg-white",
  flat: "border-hairline bg-white/60",
} as const;

const lift = "hover:border-ink/35 hover:before:scale-x-100";

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
      className={`after:absolute after:inset-0 after:rounded-md after:content-[''] ${className}`}
    >
      {children}
    </Link>
  );
}
