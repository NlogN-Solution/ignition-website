import Link from "next/link";
import { Accordion } from "../ui/Accordion";
import { ArrowButton } from "../ui/ArrowButton";
import { Callout } from "../ui/Callout";
import { Card } from "../ui/Card";
import { Checklist } from "../ui/Checklist";
import { Timeline } from "../ui/Timeline";
import { CostCalculator } from "../money/CostCalculator";
import { CareerQuiz } from "../careers/CareerQuiz";
import { InterviewPractice } from "../application/InterviewPractice";
import { NepalCostTable } from "../universities/NepalCostTable";
import { EligibilityCalculator } from "../resources/EligibilityCalculator";
import type { University } from "@/data/universities";
import type { AccordionItem } from "../ui/Accordion";
import type { ChecklistItem } from "../ui/Checklist";
import type { TimelineStage } from "../ui/Timeline";
import type { ContentBlock } from "@/lib/api/types";

/**
 * Renders a CMS page's blocks through the components the site already has.
 *
 * This is the half of the CMS that makes the other half tractable: nothing
 * here is a new design. A `timeline` block is `components/ui/Timeline`, a
 * `faq` block is the same `Accordion` the guides use, and an editor arranging
 * blocks in the admin is arranging the page's existing vocabulary rather than
 * inventing layout. The type list is closed on both sides — the admin offers
 * ten types and this renders ten — so a block this does not know about
 * renders as nothing rather than as an error.
 *
 * `component` is the escape hatch for the interactive tools, and its allowlist
 * lives here in code rather than in the database. That is deliberate: an
 * editor naming an arbitrary component into a page would be a code-execution
 * surface behind a marketing login.
 */

/** What the catalogue-backed interactive blocks need to render. */
export interface BlockContext {
  universities: University[];
  courseCounts: Record<string, number>;
}

function str(data: Record<string, unknown>, key: string): string {
  const value = data[key];
  return typeof value === "string" ? value : "";
}

function rows(data: Record<string, unknown>, key: string): Record<string, unknown>[] {
  const value = data[key];
  return Array.isArray(value) ? (value as Record<string, unknown>[]) : [];
}

function strings(data: Record<string, unknown>, key: string): string[] {
  const value = data[key];
  return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === "string") : [];
}

function link(data: Record<string, unknown>, key: string): { label: string; href: string } | null {
  const value = data[key];
  if (!value || typeof value !== "object") return null;
  const entry = value as Record<string, unknown>;
  const label = str(entry, "label");
  const href = str(entry, "href");
  return label && href ? { label, href } : null;
}

export function BlockRenderer({
  blocks,
  context,
}: {
  blocks: ContentBlock[];
  context?: BlockContext;
}) {
  return (
    <div className="space-y-12">
      {blocks.map((block, index) => (
        <Block key={`${block.type}-${index}`} block={block} context={context} />
      ))}
    </div>
  );
}

function Block({ block, context }: { block: ContentBlock; context?: BlockContext }) {
  const { data } = block;
  const heading = str(data, "heading");

  switch (block.type) {
    case "prose":
      return (
        <section>
          {heading ? <H2>{heading}</H2> : null}
          <div className={heading ? "mt-4 space-y-4" : "space-y-4"}>
            {strings(data, "paragraphs").map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-[68ch] text-[16.5px] font-medium leading-[1.65] text-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>
          {strings(data, "points").length ? (
            <ul className="mt-5 max-w-[68ch] space-y-2">
              {strings(data, "points").map((point) => (
                <li
                  key={point}
                  className="relative pl-5 text-[16px] font-medium leading-[1.6] text-muted before:absolute before:left-0 before:top-[0.7em] before:size-[6px] before:rounded-full before:bg-orange"
                >
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      );

    case "cards":
      return (
        <section>
          {heading ? <H2>{heading}</H2> : null}
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {rows(data, "items").map((item, index) => {
              const href = str(item, "href");
              return (
                <li key={`${str(item, "title")}-${index}`} className="min-w-0">
                  <Card href={href || undefined} className="h-full p-5 sm:p-6">
                    <h3 className="text-[17px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
                      {str(item, "title")}
                    </h3>
                    <p className="mt-[9px] text-[14.5px] font-medium leading-[1.55] text-muted">
                      {str(item, "body")}
                    </p>
                  </Card>
                </li>
              );
            })}
          </ul>
        </section>
      );

    case "timeline": {
      const stages = rows(data, "stages")
        .map((stage) => {
          const entry: TimelineStage = {
            label: str(stage, "label"),
            description: str(stage, "description"),
          };
          const meta = str(stage, "meta");
          if (meta) entry.meta = meta;
          return entry;
        })
        .filter((stage) => stage.label);

      if (!stages.length) return null;

      return (
        <section>
          {heading ? <H2>{heading}</H2> : null}
          <div className="mt-7">
            <Timeline stages={stages} />
          </div>
        </section>
      );
    }

    case "checklist": {
      const id = str(data, "id");
      const items = rows(data, "items")
        .map((item) => {
          const entry: ChecklistItem = { id: str(item, "id"), label: str(item, "label") };
          const detail = str(item, "detail");
          if (detail) entry.detail = detail;
          return entry;
        })
        .filter((item) => item.id && item.label);

      // Without a storage key the ticks would have nowhere to persist, and a
      // checklist that forgets between visits is worse than a plain list.
      if (!id || !items.length) return null;

      return (
        <section>
          {str(data, "label") ? <H2>{str(data, "label")}</H2> : null}
          <div className="mt-6">
            <Checklist id={id} items={items} />
          </div>
        </section>
      );
    }

    case "faq": {
      const items = rows(data, "items")
        .map((item) => ({ question: str(item, "question"), answer: str(item, "answer") }))
        .filter((item): item is AccordionItem => Boolean(item.question && item.answer));

      if (!items.length) return null;

      return (
        <section>
          {heading ? <H2>{heading}</H2> : null}
          <div className="mt-6">
            <Accordion items={items} size="editorial" />
          </div>
        </section>
      );
    }

    case "callout": {
      const href = str(data, "href");
      const linkLabel = str(data, "linkLabel");
      return (
        <Callout tone={str(data, "tone") === "official" ? "official" : "info"}>
          {str(data, "text")}
          {href ? (
            <>
              {" "}
              <Link
                href={href}
                className="font-bold text-blue-link transition-colors hover:text-navy"
              >
                {linkLabel || "Read more"}
              </Link>
            </>
          ) : null}
        </Callout>
      );
    }

    case "stats":
      return (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {rows(data, "items").map((item, index) => (
            <li key={`${str(item, "stat")}-${index}`} className="min-w-0">
              <Card className="h-full p-5 sm:p-6">
                <p className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-navy">
                  {str(item, "stat")}
                </p>
                {str(item, "statNote") ? (
                  <p className="mt-[6px] text-[13.5px] font-semibold text-muted-light">
                    {str(item, "statNote")}
                  </p>
                ) : null}
                <h3 className="mt-4 text-[16.5px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
                  {str(item, "title")}
                </h3>
                <p className="mt-[9px] text-[14.5px] font-medium leading-[1.55] text-muted">
                  {str(item, "body")}
                </p>
                {/* A figure that has gone stale should look stale, so the year
                    stays attached to the claim rather than to a footnote. */}
                {str(item, "source") ? (
                  <p className="mt-4 text-[13px] font-medium text-muted-light">
                    {str(item, "source")}
                  </p>
                ) : null}
              </Card>
            </li>
          ))}
        </ul>
      );

    case "list":
      return (
        <section>
          {heading ? <H2>{heading}</H2> : null}
          <ul className="mt-5 max-w-[68ch] space-y-2">
            {strings(data, "items").map((item) => (
              <li
                key={item}
                className="relative pl-5 text-[16px] font-medium leading-[1.6] text-muted before:absolute before:left-0 before:top-[0.7em] before:size-[6px] before:rounded-full before:bg-orange"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      );

    case "cta": {
      const primary = link(data, "primary");
      const secondary = link(data, "secondary");

      return (
        <Card className="p-6 sm:p-8">
          <h2 className="max-w-[24ch] text-[clamp(1.375rem,2.1vw,1.75rem)] font-bold leading-[1.2] tracking-[-0.015em] text-navy">
            {str(data, "title")}
          </h2>
          <p className="mt-3 max-w-[62ch] text-[15.5px] font-medium leading-[1.6] text-muted">
            {str(data, "intro")}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {primary ? (
              <ArrowButton href={primary.href} className="px-[18px] py-[11px] text-[15px]">
                {primary.label}
              </ArrowButton>
            ) : null}
            {secondary ? (
              <Link
                href={secondary.href}
                className="inline-flex items-center gap-[8px] text-[15px] font-bold text-blue-link transition-colors hover:text-navy"
              >
                {secondary.label}
              </Link>
            ) : null}
          </div>
        </Card>
      );
    }

    case "component":
      return <Interactive slot={str(data, "key")} context={context} />;

    default:
      // A block type this build does not know about. Rendering nothing is the
      // right failure: the admin can ship a new type before the site can
      // render it, and a half-drawn block is worse than an absent one.
      return null;
  }
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[clamp(1.375rem,2.1vw,1.75rem)] font-bold leading-[1.2] tracking-[-0.015em] text-navy">
      {children}
      <span className="text-orange">.</span>
    </h2>
  );
}

/**
 * The interactive allowlist.
 *
 * Three of these read the catalogue and so need it passed in. Where a page
 * places one and the caller supplied no context, it renders nothing — the same
 * failure as an unknown block type, and for the same reason.
 */
function Interactive({ slot, context }: { slot: string; context?: BlockContext }) {
  switch (slot) {
    case "cost-calculator":
      return <CostCalculator />;
    case "career-quiz":
      return <CareerQuiz />;
    case "interview-practice":
      return <InterviewPractice />;
    case "nepal-cost-table":
      return <NepalCostTable />;
    case "eligibility-calculator":
      return context ? (
        <EligibilityCalculator
          universities={context.universities}
          courseCounts={context.courseCounts}
        />
      ) : null;
    case "course-explorer":
      // The explorer is a route, not a widget: its filters are the URL, and
      // two of them on one page would fight over it. A page that wants it
      // links to it.
      return (
        <Card className="p-6">
          <p className="text-[15.5px] font-medium text-muted">
            <Link href="/courses" className="font-bold text-blue-link hover:text-navy">
              Open the course explorer
            </Link>{" "}
            to search every course by subject, level and university.
          </p>
        </Card>
      );
    default:
      return null;
  }
}
