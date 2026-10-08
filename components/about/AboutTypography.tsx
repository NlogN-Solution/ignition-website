export function AboutEyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] ${dark ? "text-white/70" : "text-muted"}`}>
      <span aria-hidden className="h-px w-7 shrink-0 bg-orange" />
      {children}
    </p>
  );
}

export const aboutHeading = "font-display text-[clamp(2rem,3.6vw,3rem)] font-extrabold leading-[1.12] tracking-[-0.03em]";
export const aboutBody = "text-[clamp(1rem,1.2vw,1.125rem)] font-medium leading-[1.75] text-muted";
export const aboutSpacing = "py-[clamp(3.5rem,7vw,7rem)]";
