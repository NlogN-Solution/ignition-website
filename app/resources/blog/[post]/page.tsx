import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ReadyToApply } from "@/components/apply/ReadyToApply";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import { formatPostDate } from "@/data/blog";
import { getBlogPost, getBlogPosts } from "@/lib/api/content";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ post: post.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ post: string }>;
}) {
  const post = await getBlogPost((await params).post);
  if (!post) return {};

  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/resources/blog/${post.id}`,
  });
}

/**
 * One article, one measure, and an ending that goes somewhere.
 *
 * The `related` links are not a courtesy: an article that leaves a student
 * better informed and no further forward has not finished its job, so every
 * post closes on the tool or guide that turns the reading into a decision.
 */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ post: string }>;
}) {
  const post = await getBlogPost((await params).post);
  if (!post) notFound();

  const more = (await getBlogPosts())
    .filter((other) => other.id !== post.id)
    .sort((a, b) => b.published.localeCompare(a.published))
    .slice(0, 3);

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
                { label: "Blog", href: "/resources/blog" },
                { label: post.title, href: `/resources/blog/${post.id}` },
              ]}
            />

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Badge tone="navy">{post.tag}</Badge>
              <span className="text-[13.5px] font-semibold text-muted-light">
                {formatPostDate(post.published)} · {post.readingMinutes} min read
              </span>
            </div>

            <h1 className="mt-4 max-w-[24ch] text-[clamp(1.875rem,3.6vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.024em] text-navy">
              {post.title}
            </h1>

            <p className="mt-5 max-w-[68ch] text-[clamp(1.0625rem,1.35vw,1.25rem)] font-medium leading-[1.6] text-ink-soft">
              {post.standfirst}
            </p>
          </Container>
        </header>

        <Container className="py-[clamp(2.5rem,4.5vw,4rem)]">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)] lg:gap-16">
            <article className="min-w-0 max-w-[70ch] space-y-11">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-[clamp(1.25rem,1.9vw,1.5rem)] font-bold leading-[1.25] tracking-[-0.015em] text-navy">
                    {section.heading}
                  </h2>

                  <div className="mt-4 space-y-4 text-[16.5px] font-medium leading-[1.7] text-ink-soft">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                  </div>

                  {section.points?.length ? (
                    <ul className="mt-5 space-y-[10px] border-l-2 border-hairline pl-5">
                      {section.points.map((point) => (
                        <li
                          key={point}
                          className="text-[15.5px] font-medium leading-[1.6] text-muted"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              {post.source ? (
                <Callout tone="official">
                  This article explains how something works; it does not
                  restate the current figures, which change between cycles.
                  Confirm anything datable against{" "}
                  <a
                    href={post.source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-blue-link transition-colors hover:text-navy"
                  >
                    {post.source.label}
                    <ExternalLink
                      size={13}
                      strokeWidth={2.4}
                      aria-hidden
                      className="ml-[5px] inline-block align-[-1px]"
                    />
                  </a>
                  .
                </Callout>
              ) : null}

              <Link
                href="/resources/blog"
                className="group inline-flex items-center gap-[9px] text-[15px] font-bold text-blue-link transition-colors hover:text-navy"
              >
                <ArrowLeft
                  size={16}
                  strokeWidth={2.4}
                  aria-hidden
                  className="transition-transform duration-200 group-hover:-translate-x-[3px]"
                />
                All articles
              </Link>
            </article>

            <aside className="min-w-0 space-y-8 lg:sticky lg:top-[calc(var(--nav-h)+1.25rem)] lg:self-start">
              <div>
                <h2 className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-blue-link">
                  Where to go next
                </h2>
                <ul className="mt-4 space-y-2">
                  {post.related.map((link) => (
                    <li key={link.href}>
                      <Card href={link.href} className="p-4">
                        <span className="flex items-center justify-between gap-3">
                          <span className="text-[14.5px] font-semibold text-navy">
                            {link.label}
                          </span>
                          <ArrowUpRight
                            size={15}
                            strokeWidth={2.4}
                            aria-hidden
                            className="shrink-0 text-blue-link transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                          />
                        </span>
                      </Card>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-blue-link">
                  More reading
                </h2>
                <ul className="mt-4 space-y-4">
                  {more.map((other) => (
                    <li key={other.id}>
                      <Link
                        href={`/resources/blog/${other.id}`}
                        className="group block"
                      >
                        <span className="block text-[12px] font-bold uppercase tracking-[0.1em] text-muted-light">
                          {other.tag}
                        </span>
                        <span className="mt-[5px] block text-[15px] font-bold leading-[1.35] text-navy transition-colors group-hover:text-blue-link">
                          {other.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </main>

      <ReadyToApply
        title="Reading is the easy part."
        intro="When the research turns into a decision, Ignition takes it from there — one profile, real document review, and an advisor who stays with you to the UK."
      />
      <Footer />
    </>
  );
}
