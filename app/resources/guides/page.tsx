import {
  ArrowUpRight,
  Banknote,
  BookOpen,
  Building2,
  ClipboardList,
  FileCheck2,
  Globe2,
  Home,
  MessagesSquare,
  Plane,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Callout } from "@/components/ui/Callout";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Guides",
  description:
    "Every stage of studying in the UK written out in full — why the UK, how applying works, entry requirements, interviews, the visa, what it costs and life after you land.",
  path: "/resources/guides",
});

/**
 * An index of guidance that already exists, grouped by the question it
 * answers rather than by where it sits in the site.
 *
 * The navigation groups these by journey stage, which is right for a student
 * who knows their stage. A student who wants to read the whole thing through,
 * or who half-remembers a page and cannot find it again, needs one list. This
 * is that list, and it is the only place all nine appear together.
 */

const groups = [
  {
    title: "Before you choose",
    blurb: "The case for the UK, and how a degree here is actually built.",
    guides: [
      {
        icon: Globe2,
        title: "Why study in the UK",
        blurb:
          "Shorter degrees, the universities at the top of the world tables, and quality checked by someone other than the university. The trade-offs too.",
        href: "/study-in-uk",
      },
      {
        icon: BookOpen,
        title: "Explore courses",
        blurb:
          "What you would actually study, what each course asks for, and where each one leads.",
        href: "/courses",
      },
      {
        icon: Building2,
        title: "Explore universities",
        blurb:
          "Filter on the things that decide it — subject, cost, location, placement and support — rather than on a league table.",
        href: "/universities",
      },
    ],
  },
  {
    title: "Applying",
    blurb: "What the process wants, in the order it wants it.",
    guides: [
      {
        icon: ClipboardList,
        title: "How to apply",
        blurb:
          "The UCAS timeline end to end, what a personal statement is for, the kinds of offer you can get and the mistakes that cost places.",
        href: "/apply",
      },
      {
        icon: FileCheck2,
        title: "Entry requirements",
        blurb:
          "How requirements are structured, what the terms mean, and what to check before you count yourself in or out.",
        href: "/apply/entry-requirements",
      },
      {
        icon: MessagesSquare,
        title: "Interview preparation",
        blurb:
          "Which courses interview, what the questions are testing, and how to answer them without rehearsing a script.",
        href: "/apply/interviews",
      },
    ],
  },
  {
    title: "Paying for it, and getting there",
    blurb: "The two things that stop applications that were otherwise fine.",
    guides: [
      {
        icon: Banknote,
        title: "Tuition and living costs",
        blurb:
          "The full shape of a year — tuition, accommodation, living and the one-off costs of arriving — and which parts you can move.",
        href: "/money",
      },
      {
        icon: Plane,
        title: "Student visa",
        blurb:
          "What the application asks for, the financial requirement in detail, and the documents that most often go wrong.",
        href: "/apply/entry-requirements#visa-journey",
      },
      {
        icon: Home,
        title: "Life in the UK",
        blurb:
          "The first week, the first month, and the practical things nobody tells you until you need them.",
        href: "/life-in-uk",
      },
    ],
  },
];

export default function GuidesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          compact
          eyebrow="Guides"
          title="The whole journey, written out."
          intro="Nine guides covering everything from whether the UK is the right choice to what to do in your first week there. Read one, or read them in order."
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
              visa thresholds or deadlines as fact — those are set by
              universities, UKVI and UCAS and change between cycles, so every
              guide links to whoever publishes them.
            </Callout>
          </div>

          <div className="space-y-14">
            {groups.map((group) => (
              <section key={group.title}>
                <h2 className="text-[clamp(1.375rem,2.1vw,1.75rem)] font-bold leading-[1.2] tracking-[-0.015em] text-navy">
                  {group.title}
                  <span className="text-orange">.</span>
                </h2>
                <p className="mt-3 max-w-[62ch] text-[15.5px] font-medium leading-[1.6] text-muted">
                  {group.blurb}
                </p>

                <ul className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {group.guides.map((guide) => (
                    <li key={guide.href} className="min-w-0">
                      <Card href={guide.href} className="h-full p-5 sm:p-6">
                        <span
                          aria-hidden
                          className="flex size-[34px] items-center justify-center rounded-[10px] bg-navy/[0.06] text-navy"
                        >
                          <guide.icon size={17} strokeWidth={2.1} />
                        </span>

                        <h3 className="mt-4 text-[17px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
                          {guide.title}
                        </h3>
                        <p className="mt-[9px] text-[14.5px] font-medium leading-[1.55] text-muted">
                          {guide.blurb}
                        </p>

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
