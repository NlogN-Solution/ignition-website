import { Container } from "../ui/Container";
import { AccentText } from "../ui/AccentText";
import { ArrowButton, GhostButton } from "../ui/ArrowButton";

/**
 * The "what should I do next?" close. Every content page ends with one, so a
 * student is never left at the bottom of a page with nowhere to go.
 */
export function CtaBand({
  title,
  intro,
  primary,
  secondary,
}: {
  title: string;
  intro?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="border-t border-hairline bg-white/55">
      <Container className="py-[clamp(3rem,5vw,5rem)]">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-[54ch]">
            <h2 className="text-[clamp(1.5rem,2.4vw,2.125rem)] font-bold leading-[1.12] tracking-[-0.02em] text-navy">
              <AccentText>{title}</AccentText>
            </h2>
            {intro ? (
              <p className="mt-3 text-[16px] font-medium leading-[1.55] text-muted">
                {intro}
              </p>
            ) : null}
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <ArrowButton
              href={primary.href}
              iconSize={18}
              className="h-[52px] gap-[16px] px-7 text-[16px]"
            >
              {primary.label}
            </ArrowButton>
            {secondary ? (
              <GhostButton href={secondary.href} className="h-[52px] px-7 text-[16px]">
                {secondary.label}
              </GhostButton>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
