/**
 * `demo` is reserved for the "Example data" marker that must appear anywhere
 * placeholder course, university, fee or scholarship figures are shown.
 */
type Tone = "navy" | "orange" | "muted" | "demo";

const tones: Record<Tone, string> = {
  navy: "border-navy/15 bg-navy/[0.06] text-navy",
  orange: "border-orange/20 bg-orange/[0.08] text-orange",
  muted: "border-hairline bg-canvas text-muted",
  demo: "border-orange/25 bg-orange/[0.07] text-orange",
};

export function Badge({
  children,
  tone = "muted",
  className = "",
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-[6px] rounded-lg border px-[9px] py-[3px] text-[12px] font-semibold leading-[1.4] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
