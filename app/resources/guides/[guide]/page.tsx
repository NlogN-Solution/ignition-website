import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ReadyToApply } from "@/components/apply/ReadyToApply";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { BlockRenderer } from "@/components/content/BlockRenderer";
import { RichText } from "@/components/content/RichText";
import { getUniversitiesWithCounts } from "@/lib/api/catalogue";
import { getContentIndex, getGuide } from "@/lib/api/content";
import { formatPostDate } from "@/data/blog";
import { pageMetadata } from "@/lib/seo";

/** Editorial copy an editor expects to see soon after publishing. */
export const revalidate = 300;

export async function generateStaticParams() {
  const guides = await getContentIndex("guide");
  return guides.filter((guide) => guide.slug).map((guide) => ({ guide: guide.slug as string }));
}

export async function generateMetadata({ params }: { params: Promise<{ guide: string }> }) {
  const guide = await getGuide((await params).guide);
  if (!guide) return {};
  return pageMetadata({
    title: guide.title,
    description: guide.excerpt ?? "",
    path: `/resources/guides/${guide.slug}`,
  });
}

/**
 * One guide written in the admin. The body is the rich text from the editor;
 * a guide built from blocks before the editor existed still renders them.
 */
export default async function GuidePage({ params }: { params: Promise<{ guide: string }> }) {
  const guide = await getGuide((await params).guide);
  if (!guide) notFound();

  // Only needed when an older, block-built guide places a catalogue block.
  const context = guide.blocks.length ? await getUniversitiesWithCounts() : undefined;

  return (
    <>
      <Navbar />
      <main>
        <header className="border-b border-hairline bg-white/55">
          <Container className="pb-[clamp(1.75rem,3vw,2.5rem)] pt-6 lg:pt-7">
            <Breadcrumbs
              crumbs={[
                { label: "Home", href: "/" },
                { label: "Resources", href: "/resources" },
                { label: "Guides", href: "/resources/guides" },
                { label: guide.title, href: `/resources/guides/${guide.slug}` },
              ]}
            />

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {guide.tag ? <Badge tone="navy">{guide.tag}</Badge> : null}
              {guide.readingMinutes ? (
                <span className="text-[13.5px] font-semibold text-muted-light">
                  {guide.published ? `${formatPostDate(guide.published)} · ` : ""}
                  {guide.readingMinutes} min read
                </span>
              ) : null}
            </div>

            <h1 className="mt-4 max-w-[28ch] text-[clamp(1.875rem,3.6vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.024em] text-navy">
              {guide.title}
            </h1>
            {guide.excerpt ? (
              <p className="mt-5 max-w-[68ch] text-[clamp(1.0625rem,1.35vw,1.25rem)] font-medium leading-[1.6] text-ink-soft">
                {guide.excerpt}
              </p>
            ) : null}

            {guide.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element -- editor-uploaded CDN image
              <img
                src={guide.coverImage}
                alt=""
                className="mt-8 aspect-[21/9] w-full max-w-[1100px] rounded-2xl object-cover"
              />
            ) : null}
          </Container>
        </header>

        <Container className="py-[clamp(2.5rem,4.5vw,4rem)]">
          <article className="min-w-0 max-w-[75ch] space-y-10">
            {guide.bodyHtml ? <RichText html={guide.bodyHtml} /> : null}
            {!guide.bodyHtml && guide.blocks.length && context ? (
              <BlockRenderer blocks={guide.blocks} context={context} />
            ) : null}

            {guide.related.length ? (
              <section className="border-t border-hairline pt-8">
                <h2 className="text-[17px] font-bold tracking-[-0.01em] text-navy">Read next</h2>
                <ul className="mt-4 space-y-2">
                  {guide.related.map((entry) => (
                    <li key={entry.href}>
                      <Link
                        href={entry.href}
                        className="group inline-flex items-center gap-[8px] text-[15.5px] font-bold text-blue-link transition-colors hover:text-navy"
                      >
                        {entry.label}
                        <ArrowUpRight size={15} strokeWidth={2.4} aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <Link
              href="/resources/guides"
              className="group inline-flex items-center gap-[9px] text-[15px] font-bold text-blue-link transition-colors hover:text-navy"
            >
              <ArrowLeft
                size={16}
                strokeWidth={2.4}
                aria-hidden
                className="transition-transform duration-200 group-hover:-translate-x-[3px]"
              />
              All guides
            </Link>
          </article>
        </Container>
      </main>

      <ReadyToApply title="Ready to start?" intro="One advisor, from the application to the airport." />
      <Footer />
    </>
  );
}
