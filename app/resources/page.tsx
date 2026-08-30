import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Calculator,
  FileCheck2,
  MessagesSquare,
  Newspaper,
  PoundSterling,
  ShieldCheck,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { postsByDate, formatPostDate } from "@/data/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Resources",
  description:
    "The reference shelf: guides to every stage of a UK application, tools that do the arithmetic for you, and articles on the questions students ask before they trust a shortlist.",
  path: "/resources",
});

/**
 * The reference shelf.
 *
 * Everything on this page exists elsewhere on the site, organised by journey
 * stage. That organisation is right for a student who knows where they are and
 * useless for one who does not — a student who wants to read around the
 * decision, or who needs a specific tool and cannot remember which stage owns
 * it, has nowhere to start. This is that start.
 */

const tools = [
  {
    icon: FileCheck2,
    title: "Eligibility calculator",
    blurb:
      "Put your grades, your English score and your budget against what each university typically asks for.",
    href: "/resources/eligibility",
  },
  {
    icon: Calculator,
    title: "Cost calculator",
    blurb:
      "Build a full year from your own city, course and accommodation rather than from an average.",
    href: "/money/calculator",
  },
  {
    icon: PoundSterling,
    title: "Scholarship finder",
    blurb:
      "Filter awards by level, nationality, university and deadline, with a link to the official source for every entry.",
    href: "/money/scholarships",
  },
  {
    icon: MessagesSquare,
    title: "Interview practice",
    blurb:
      "Real question types by subject, what each is testing, and a place to draft your answer.",
    href: "/apply/interviews",
  },
];

const shelves = [
  {
    icon: Newspaper,
    eyebrow: "Reading",
    title: "Blog",
    blurb:
      "The questions students ask an adviser before they trust a shortlist, answered once, in public.",
    href: "/resources/blog",
    meta: `${postsByDate.length} articles`,
  },
  {
    icon: BookOpen,
    eyebrow: "Reference",
    title: "Guides",
    blurb:
      "Every stage of the journey written out in full — why the UK, how applying works, what things cost, and what happens after you land.",
    href: "/resources/guides",
    meta: "9 guides",
  },
  {
    icon: ShieldCheck,
    eyebrow: "Official",
    title: "Where the real numbers live",
    blurb:
      "Fees, visa thresholds and deadlines are set by universities, UKVI and UCAS. Ignition explains them and links to them; it never restates them as fact.",
    href: "/apply/entry-requirements#visa-journey",
    meta: "Sources on every page",
  },
];

export default function ResourcesPage() {
  const [latest] = postsByDate;

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          compact
          eyebrow="Resources"
          title="Everything, in one place."
          intro="The guides, the tools and the reading — organised by what you need rather than by where you are in the journey."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Resources", href: "/resources" },
          ]}
        />

        <Container className="pb-[clamp(2.5rem,4.5vw,4.5rem)] pt-[clamp(1.75rem,3vw,2.75rem)]">
          <ul className="grid gap-4 md:grid-cols-3">
            {shelves.map((shelf) => (
              <li key={shelf.href} className="min-w-0">
                <Card href={shelf.href} className="h-full p-6">
                  <span
                    aria-hidden
                    className="flex size-[38px] items-center justify-center rounded-[11px] bg-navy/[0.06] text-navy"
                  >
                    <shelf.icon size={19} strokeWidth={2.1} />
                  </span>

                  <p className="mt-5 text-[12.5px] font-bold uppercase tracking-[0.12em] text-blue-link">
                    {shelf.eyebrow}
                  </p>
                  <h2 className="mt-[7px] text-[20px] font-bold leading-[1.2] tracking-[-0.015em] text-navy">
                    {shelf.title}
                  </h2>
                  <p className="mt-3 text-[14.5px] font-medium leading-[1.55] text-muted">
                    {shelf.blurb}
                  </p>

                  <span className="mt-auto flex items-center justify-between gap-4 pt-6">
                    <span className="text-[13px] font-semibold text-muted-light">
                      {shelf.meta}
                    </span>
                    <ArrowUpRight
                      size={16}
                      strokeWidth={2.4}
                      aria-hidden
                      className="text-blue-link transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                    />
                  </span>
                </Card>
              </li>
            ))}
          </ul>

          <section className="mt-14">
            <h2 className="text-[clamp(1.375rem,2.1vw,1.75rem)] font-bold leading-[1.2] tracking-[-0.015em] text-navy">
              Tools that do the arithmetic<span className="text-orange">.</span>
            </h2>
            <p className="mt-3 max-w-[62ch] text-[15.5px] font-medium leading-[1.6] text-muted">
              Four calculations students would otherwise do on paper, badly, at
              the point where getting them wrong is expensive.
            </p>

            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {tools.map((tool) => (
                <li key={tool.href} className="min-w-0">
                  <Card href={tool.href} className="h-full p-5 sm:p-6">
                    <span className="flex gap-4">
                      <span
                        aria-hidden
                        className="mt-[2px] flex size-[34px] shrink-0 items-center justify-center rounded-[10px] bg-orange/[0.09] text-orange"
                      >
                        <tool.icon size={17} strokeWidth={2.1} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[16.5px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
                          {tool.title}
                        </span>
                        <span className="mt-[6px] block text-[14px] font-medium leading-[1.55] text-muted">
                          {tool.blurb}
                        </span>
                      </span>
                    </span>
                  </Card>
                </li>
              ))}
            </ul>
          </section>

          {latest ? (
            <section className="mt-14 rounded-2xl border border-hairline bg-white p-6 sm:p-8">
              <p className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-blue-link">
                Latest article
              </p>
              <h2 className="mt-3 max-w-[24ch] text-[clamp(1.375rem,2.1vw,1.75rem)] font-bold leading-[1.2] tracking-[-0.015em] text-navy">
                <Link
                  href={`/resources/blog/${latest.id}`}
                  className="transition-colors hover:text-blue-link"
                >
                  {latest.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-[66ch] text-[15.5px] font-medium leading-[1.6] text-muted">
                {latest.excerpt}
              </p>
              <p className="mt-4 text-[13.5px] font-semibold text-muted-light">
                {formatPostDate(latest.published)} · {latest.readingMinutes} min read
              </p>
            </section>
          ) : null}
        </Container>
      </main>

      <CtaBand
        title="Rather have someone walk you through it?"
        intro="An Ignition adviser will talk through your options, your grades and your budget in one conversation."
        primary={{ label: "Apply through Ignition", href: "/apply#ignition-what" }}
        secondary={{ label: "Take Career Quiz", href: "/careers/quiz" }}
      />
      <Footer />
    </>
  );
}
