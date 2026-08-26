import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatPostDate, postsByDate } from "@/data/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Articles on choosing a course, what a UK year costs, writing a personal statement, the visa financial requirement and the routes into a degree.",
  path: "/resources/blog",
});

/**
 * The index leads with the newest article at full width and lists the rest.
 * A uniform grid would say every post is equally current, which is the one
 * thing an index of dated writing should never say.
 */
export default function BlogIndexPage() {
  const [lead, ...rest] = postsByDate;

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          compact
          eyebrow="Blog"
          title="The questions before the shortlist."
          intro="What students ask an adviser in the first conversation — about cost, about choosing, about what the application actually wants — answered once, here."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Resources", href: "/resources" },
            { label: "Blog", href: "/resources/blog" },
          ]}
        />

        <Container className="pb-[clamp(2.5rem,4.5vw,4.5rem)] pt-[clamp(1.75rem,3vw,2.75rem)]">
          <Card
            href={`/resources/blog/${lead.id}`}
            className="p-6 sm:p-8 lg:p-10"
          >
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="navy">{lead.tag}</Badge>
              <span className="text-[13.5px] font-semibold text-muted-light">
                {formatPostDate(lead.published)} · {lead.readingMinutes} min read
              </span>
            </div>

            <h2 className="mt-5 max-w-[22ch] text-[clamp(1.625rem,3vw,2.375rem)] font-bold leading-[1.12] tracking-[-0.02em] text-navy">
              {lead.title}
            </h2>
            <p className="mt-4 max-w-[68ch] text-[clamp(1rem,1.2vw,1.125rem)] font-medium leading-[1.6] text-muted">
              {lead.excerpt}
            </p>

            <span className="mt-7 inline-flex items-center gap-[9px] text-[15px] font-bold text-blue-link transition-colors group-hover:text-navy">
              Read the article
              <ArrowUpRight
                size={16}
                strokeWidth={2.4}
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
              />
            </span>
          </Card>

          <ul className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {rest.map((post) => (
              <li key={post.id} className="min-w-0">
                <Card href={`/resources/blog/${post.id}`} className="h-full p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="muted">{post.tag}</Badge>
                    <span className="text-[12.5px] font-semibold text-muted-light">
                      {post.readingMinutes} min read
                    </span>
                  </div>

                  <h3 className="mt-4 text-[18px] font-bold leading-[1.25] tracking-[-0.01em] text-navy">
                    {post.title}
                  </h3>
                  <p className="mt-[10px] text-[14.5px] font-medium leading-[1.55] text-muted">
                    {post.excerpt}
                  </p>

                  <p className="mt-auto pt-6 text-[13px] font-semibold text-muted-light">
                    {formatPostDate(post.published)}
                  </p>
                </Card>
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-[70ch] text-[14px] font-medium leading-[1.6] text-muted-light">
            Nothing here restates a fee, a visa threshold or a deadline as fact.
            Those are set by universities, UKVI and UCAS, they change between
            cycles, and every article that touches one links to whoever
            publishes it.{" "}
            <Link
              href="/resources/guides"
              className="font-bold text-blue-link transition-colors hover:text-navy"
            >
              The guides
            </Link>{" "}
            work the same way.
          </p>
        </Container>
      </main>

      <CtaBand
        title="Ready to turn the reading into a shortlist?"
        intro="Check what you qualify for, then look properly at the few that fit."
        primary={{ label: "Eligibility calculator", href: "/resources/eligibility" }}
        secondary={{ label: "Explore universities", href: "/universities" }}
      />
      <Footer />
    </>
  );
}
