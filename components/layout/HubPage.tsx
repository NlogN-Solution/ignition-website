import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PageHero } from "./PageHero";
import { CtaBand } from "./CtaBand";
import { Container } from "../ui/Container";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Callout } from "../ui/Callout";
import type { Hub } from "@/data/hubs";

/**
 * Renders a content hub from its outline. The long-form guidance for these
 * pages is written in the next phase; publishing the structure now means the
 * URL, metadata, breadcrumbs and internal links are settled and navigable,
 * and the student can still see what the section will cover and where to go
 * in the meantime.
 */
export function HubPage({ hub }: { hub: Hub }) {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow={hub.eyebrow}
          title={hub.title}
          intro={hub.intro}
          crumbs={hub.crumbs}
        >
          <Badge tone="demo">Guide in progress</Badge>
        </PageHero>

        <Container className="py-[clamp(2.5rem,4.5vw,4.5rem)]">
          {hub.notice ? (
            <div className="mb-10">
              <Callout tone="official">
                {hub.notice.text}{" "}
                <a
                  href={hub.notice.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-link underline-offset-2 hover:underline"
                >
                  {hub.notice.linkLabel}
                </a>
                .
              </Callout>
            </div>
          ) : null}

          <h2 className="text-[clamp(1.375rem,2vw,1.75rem)] font-bold tracking-[-0.015em] text-navy">
            What this guide covers
          </h2>
          <p className="mt-3 max-w-[62ch] text-[16px] font-medium leading-[1.6] text-muted">
            The structure below is live. Each section is being written now
            &mdash; in the meantime, the links at the bottom of this page take
            you to the parts of the journey that are ready.
          </p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {hub.sections.map((section, i) => (
              <li key={section.title} className="min-w-0">
                <Card className="h-full p-5 sm:p-6">
                  <span
                    aria-hidden
                    className="text-[13px] font-bold tabular-nums text-faint"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-[16.5px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
                    {section.title}
                  </h3>
                  <p className="mt-[7px] text-[14.5px] font-medium leading-[1.5] text-muted">
                    {section.description}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </main>

      <CtaBand {...hub.cta} />
      <Footer />
    </>
  );
}
