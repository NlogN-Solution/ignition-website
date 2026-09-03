import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ReadyToApply } from "@/components/apply/ReadyToApply";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Callout } from "@/components/ui/Callout";
import { BlockRenderer } from "@/components/content/BlockRenderer";
import { getUniversitiesWithCounts } from "@/lib/api/catalogue";
import { getContent, getContentIndex } from "@/lib/api/content";
import { JsonLd, faqSchema, pageMetadata } from "@/lib/seo";
import type { ContentPage } from "@/lib/api/types";

/**
 * Every page written in the admin rather than in this repository.
 *
 * It is a catch-all deliberately, and it is matched **last**: Next tries every
 * real route first, so a CMS page can never shadow `/courses` or
 * `/universities`. That ordering is what makes it safe to let an editor choose
 * a slug without a developer checking it against the router.
 *
 * The nine coded guides are still coded. This is where they land as they are
 * migrated into blocks, one at a time, and until then it serves whatever
 * pages, guides and fragments staff have written.
 */

export const revalidate = 300;

/** Only `page` and `guide` have URLs. A fragment is copy a coded page pulls in. */
async function published(): Promise<ContentPage[]> {
  const [pages, guides] = await Promise.all([getContentIndex("page"), getContentIndex("guide")]);
  return [...pages, ...guides].filter((page) => Boolean(page.slug));
}

export async function generateStaticParams() {
  const pages = await published();
  return pages.map((page) => ({ slug: (page.slug as string).split("/") }));
}

async function find(slug: string[]): Promise<ContentPage | null> {
  const path = slug.join("/");
  const match = (await published()).find((page) => page.slug === path);
  return match ? getContent(match.key) : null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const page = await find((await params).slug);
  if (!page) return {};

  const seo = (page.seo ?? {}) as Record<string, unknown>;
  const title = typeof seo.title === "string" && seo.title ? seo.title : page.title;
  const description =
    typeof seo.description === "string" && seo.description ? seo.description : (page.excerpt ?? "");

  return {
    ...pageMetadata({ title, description, path: `/${page.slug}` }),
    ...(seo.noindex === true ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function ContentRoute({ params }: { params: Promise<{ slug: string[] }> }) {
  const page = await find((await params).slug);
  if (!page) notFound();

  const hero = (page.hero ?? {}) as Record<string, unknown>;
  const text = (key: string) => (typeof hero[key] === "string" ? (hero[key] as string) : undefined);

  // Only fetched because a page may place one of the catalogue-backed
  // interactive blocks. The call is cached and shared with every other page
  // that reads the catalogue.
  const context = await getUniversitiesWithCounts();

  // FAQ blocks are emitted as structured data as well as rendered, which is
  // the whole reason `faq` is its own block type rather than prose with bold
  // questions in it.
  const faqs = page.blocks
    .filter((block) => block.type === "faq")
    .flatMap((block) => (Array.isArray(block.data.items) ? block.data.items : []))
    .map((item) => item as { question?: string; answer?: string })
    .filter((item): item is { question: string; answer: string } =>
      Boolean(item.question && item.answer),
    );

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow={text("eyebrow")}
          title={text("title") ?? page.title}
          intro={text("intro") ?? page.excerpt}
          crumbs={[
            { label: "Home", href: "/" },
            { label: page.title, href: `/${page.slug}` },
          ]}
        />

        <Container className="pb-[clamp(2.5rem,4.5vw,4.5rem)] pt-[clamp(1.75rem,3vw,2.75rem)]">
          {page.source?.label && page.source.href ? (
            <div className="mb-10">
              <Callout compact tone="official">
                This page explains how things work. The rules themselves are set and published by{" "}
                <Link
                  href={page.source.href}
                  className="font-bold text-blue-link transition-colors hover:text-navy"
                >
                  {page.source.label}
                </Link>
                , and change between cycles.
              </Callout>
            </div>
          ) : null}

          <BlockRenderer blocks={page.blocks} context={context} />

          {page.related.length ? (
            <section className="mt-16 border-t border-hairline pt-10">
              <h2 className="text-[17px] font-bold tracking-[-0.01em] text-navy">Read next</h2>
              <ul className="mt-4 space-y-2">
                {page.related.map((entry) => (
                  <li key={entry.href}>
                    <Link
                      href={entry.href}
                      className="group inline-flex items-center gap-[8px] text-[15.5px] font-bold text-blue-link transition-colors hover:text-navy"
                    >
                      {entry.label}
                      <ArrowUpRight
                        size={15}
                        strokeWidth={2.4}
                        aria-hidden
                        className="transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </Container>

        {faqs.length ? <JsonLd schema={faqSchema(faqs)} /> : null}
      </main>

      <ReadyToApply
        title="Ready to start?"
        intro="One advisor, from the application to the airport."
      />
      <Footer />
    </>
  );
}
