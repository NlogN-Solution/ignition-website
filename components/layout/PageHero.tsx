import { Container } from "../ui/Container";
import { AccentText } from "../ui/AccentText";
import { Breadcrumbs } from "./Breadcrumbs";
import type { Crumb } from "@/lib/seo";

/**
 * The standard opening for every content page: breadcrumb trail, eyebrow, the
 * H1 with Ignition's orange terminal punctuation, and a short introduction.
 * Deliberately quieter than the homepage hero so the two never compete.
 *
 * `compact` is for the pages that open onto a working surface rather than
 * prose — the explorers. There the heading is not the point of the screen;
 * the results are, and a full-height hero spends most of the fold explaining
 * a list the student cannot yet see. It keeps the same parts and takes about
 * half the room.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  compact = false,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs?: Crumb[];
  compact?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-hairline bg-white/55">
      <Container
        className={
          compact
            ? "pb-[clamp(1.125rem,1.8vw,1.625rem)] pt-[18px] lg:pt-5"
            : "pb-[clamp(2.5rem,4vw,4rem)] pt-8 lg:pt-10"
        }
      >
        {crumbs ? <Breadcrumbs crumbs={crumbs} /> : null}

        <div className={crumbs ? (compact ? "mt-4" : "mt-7") : ""}>
          {/* Compact heroes put the badge on the eyebrow line rather than
              under the introduction: it is a label on the page, not a step
              after reading it, and its own row costs fifty vertical pixels
              that the results below have a better use for. */}
          {eyebrow || (compact && children) ? (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              {eyebrow ? (
                <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-blue-link">
                  {eyebrow}
                </p>
              ) : null}
              {compact ? children : null}
            </div>
          ) : null}

          <h1
            className={`font-bold tracking-[-0.022em] text-navy ${
              compact
                ? "max-w-[34ch] text-[clamp(1.625rem,2.6vw,2.125rem)] leading-[1.12]"
                : "max-w-[20ch] text-[clamp(2.125rem,4.4vw,3.75rem)] leading-[1.03]"
            } ${eyebrow ? (compact ? "mt-[10px]" : "mt-3") : ""}`}
          >
            <AccentText>{title}</AccentText>
          </h1>

          {intro ? (
            <p
              className={`font-medium leading-[1.6] text-muted ${
                compact
                  ? "mt-[10px] max-w-[86ch] text-[15px]"
                  : "mt-5 max-w-[62ch] text-[clamp(1rem,1.25vw,1.1875rem)]"
              }`}
            >
              {intro}
            </p>
          ) : null}

          {children && !compact ? <div className="mt-8">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
