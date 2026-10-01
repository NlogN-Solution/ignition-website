import { ArrowUpRight, BookOpen } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Callout } from "@/components/ui/Callout";
import { getContentIndex } from "@/lib/api/content";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata = pageMetadata({
  title: "Guides",
  description:
    "Every stage of studying in the UK written out in full — why the UK, how applying works, entry requirements, interviews, the visa, what it costs and life after you land.",
  path: "/resources/guides",
});

/**
 * Every guide written in the admin (Website ▸ Guides), grouped by the group
 * an editor gave it. There are no guides in code: the hard-coded list that
 * used to stand in for an empty CMS is gone, so an empty CMS shows an empty
 * index rather than placeholder cards.
 */

type Group = {
  title: string;
  blurb: string;
  guides: { title: string; blurb: string; href: string; image?: string }[];
};

/** Guides written in the admin, grouped by their tag. */
function fromCms(
  pages: { title: string; slug?: string; excerpt?: string; tag?: string; coverImage?: string }[],
): Group[] {
  const byTag = new Map<string, Group>();

  for (const page of pages) {
    if (!page.slug) continue;
    const title = page.tag ?? "Guides";
    const group = byTag.get(title) ?? { title, blurb: "", guides: [] };
    group.guides.push({
      title: page.title,
      blurb: page.excerpt ?? "",
      href: `/resources/guides/${page.slug}`,
      ...(page.coverImage ? { image: page.coverImage } : {}),
    });
    byTag.set(title, group);
  }

  return [...byTag.values()];
}

export default async function GuidesPage() {
  const published = await getContentIndex("guide");

  const groups = fromCms(published);

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          compact
          eyebrow="Guides"
          title="The whole journey, written out."
          intro="Step-by-step guidance on studying in the UK, written by the Ignition team."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Resources", href: "/resources" },
            { label: "Guides", href: "/resources/guides" },
          ]}
        />

        <Container className="pb-[clamp(2.5rem,4.5vw,4.5rem)] pt-[clamp(1.75rem,3vw,2.75rem)]">
          <div className="mb-10">
            <Callout compact tone="official">
              These guides explain how things work. They do not restate fees,
              visa thresholds or deadlines as fact — those are set by each
              university and by UKVI and change between cycles, so every guide
              links to whoever publishes them.
            </Callout>
          </div>

          {groups.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-hairline bg-white/60 px-6 py-14 text-center text-[16px] font-medium text-muted">
              No guides yet. Check back soon.
            </p>
          ) : null}

          <div className="space-y-14">
            {groups.map((group) => (
              <section key={group.title}>
                <h2 className="text-[clamp(1.375rem,2.1vw,1.75rem)] font-bold leading-[1.2] tracking-[-0.015em] text-navy">
                  {group.title}
                  <span className="text-orange">.</span>
                </h2>
                {group.blurb ? (
                  <p className="mt-3 max-w-[62ch] text-[15.5px] font-medium leading-[1.6] text-muted">
                    {group.blurb}
                  </p>
                ) : null}

                <ul className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {group.guides.map((guide) => (
                    <li key={guide.href} className="min-w-0">
                      <Card href={guide.href} className="h-full p-5 sm:p-6">
                        {guide.image ? (
                          // eslint-disable-next-line @next/next/no-img-element -- editor-uploaded CDN image
                          <img src={guide.image} alt="" className="aspect-[16/9] w-full rounded-lg object-cover" />
                        ) : (
                          <span
                            aria-hidden
                            className="flex size-[34px] items-center justify-center rounded-[10px] bg-navy/[0.06] text-navy"
                          >
                            <BookOpen size={17} strokeWidth={2.1} />
                          </span>
                        )}

                        <h3 className="mt-4 text-[17px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
                          {guide.title}
                        </h3>
                        {guide.blurb ? (
                          <p className="mt-[9px] text-[14.5px] font-medium leading-[1.55] text-muted">
                            {guide.blurb}
                          </p>
                        ) : null}

                        <span className="mt-auto inline-flex items-center gap-[8px] pt-6 text-[14px] font-bold text-blue-link transition-colors group-hover:text-navy">
                          Read the guide
                          <ArrowUpRight
                            size={15}
                            strokeWidth={2.4}
                            aria-hidden
                            className="transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                          />
                        </span>
                      </Card>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </Container>
      </main>

      <CtaBand
        title="Know enough to narrow it down?"
        intro="Check what your grades qualify you for, then look properly at the few that fit."
        primary={{ label: "Eligibility calculator", href: "/resources/eligibility" }}
        secondary={{ label: "Read the blog", href: "/resources/blog" }}
      />
      <Footer />
    </>
  );
}
