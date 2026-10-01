import { AccentText } from "./AccentText";

/**
 * A titled block of guidance. Content pages are built from these rather than
 * from a single long article, so each idea has its own heading, its own
 * anchor and a readable measure.
 */
export function Prose({
  title,
  id,
  children,
  className = "",
}: {
  title?: string;
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-28 ${className}`}>
      {title ? (
        <h2 className="text-[clamp(1.375rem,2.1vw,1.75rem)] font-bold leading-[1.2] tracking-[-0.015em] text-navy">
          <AccentText>{title}</AccentText>
        </h2>
      ) : null}
      <div className="mt-4 space-y-4 text-[16.5px] font-medium leading-[1.7] text-ink-soft [&>p]:max-w-[68ch]">
        {children}
      </div>
    </section>
  );
}
