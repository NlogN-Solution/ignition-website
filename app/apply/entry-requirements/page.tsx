import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ReadyToApply } from "@/components/apply/ReadyToApply";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { GuideLayout } from "@/components/layout/OnThisPage";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Callout } from "@/components/ui/Callout";
import { Prose } from "@/components/ui/Prose";
import { Accordion } from "@/components/ui/Accordion";
import { Checklist } from "@/components/ui/Checklist";
import {
  generalVsOfficial,
  requirementTypes,
  requirementsChecklist,
  requirementsFaqs,
  requirementsNotice,
} from "@/data/guides/entry-requirements";
import { faqSchema, JsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Understanding entry requirements",
  description:
    "What UK universities ask for and how to read it — academic grades, subject requirements, international qualifications, English language levels and course-specific extras.",
  path: "/apply/entry-requirements",
});

const sections = [
  { id: "types", label: "The five requirements" },
  { id: "authority", label: "General vs official" },
  { id: "checklist", label: "What to check" },
  { id: "faqs", label: "Common questions" },
];

export default function EntryRequirementsPage() {
  return (
    <>
      <JsonLd schema={faqSchema(requirementsFaqs.map((f) => ({ question: f.question, answer: f.answer })))} />
      <Navbar />
      <main>
        <PageHero
          eyebrow="Applying"
          title="Understanding entry requirements."
          intro="Entry requirements are not one number. They are a set of separate conditions, and meeting four of the five is the same as meeting none — this is how to read them properly."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "How to apply", href: "/apply" },
            { label: "Entry requirements", href: "/apply/entry-requirements" },
          ]}
        />

        <Container className="py-[clamp(2.5rem,4.5vw,4.5rem)]">
          <div className="mb-10">
            <Callout tone="official">
              {requirementsNotice}{" "}
              <a
                href="https://www.ucas.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-link underline-offset-2 hover:underline"
              >
                ucas.com
              </a>
            </Callout>
          </div>

          <GuideLayout sections={sections}>
            <Prose id="types" title="The five things a course asks for">
              <p>
                Nearly every UK course expresses its requirements across these
                five categories. The second one — subject requirements — is the
                one applicants most often miss.
              </p>
              <ul className="space-y-4">
                {requirementTypes.map((item, i) => (
                  <li key={item.title}>
                    <Card className="p-5 sm:p-6">
                      <div className="flex items-baseline gap-4">
                        <span
                          aria-hidden
                          className="text-[13px] font-bold tabular-nums text-faint"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-[17px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
                            {item.title}
                          </h3>
                          <p className="mt-[8px] max-w-[68ch] text-[15.5px] font-medium leading-[1.6] text-muted">
                            {item.body}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </li>
                ))}
              </ul>
            </Prose>

            <Prose id="authority" title="General guidance vs the official requirement">
              <p>
                There is an important difference between what a guide like this
                can tell you and what actually binds your application.
              </p>
              <ul className="grid gap-4 sm:grid-cols-2">
                {generalVsOfficial.map((item) => (
                  <li key={item.title}>
                    <Card className="h-full p-5 sm:p-6">
                      <h3 className="text-[16.5px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
                        {item.title}
                      </h3>
                      <p className="mt-[8px] text-[15px] font-medium leading-[1.6] text-muted">
                        {item.body}
                      </p>
                    </Card>
                  </li>
                ))}
              </ul>
              <Callout tone="official">
                Where this guide and a university&rsquo;s own course page
                disagree, the university is right. Requirements change between
                intakes, and only the official page reflects the current cycle.
              </Callout>
            </Prose>

            <Prose id="checklist" title="What to check for every course">
              <p>
                Run this for each course on your shortlist before you apply.
                Progress is saved in this browser.
              </p>
              <div className="pt-1">
                <Checklist id="entry-requirements" items={requirementsChecklist} />
              </div>
            </Prose>

            <Prose id="faqs" title="Common questions">
              <Accordion items={requirementsFaqs} />
            </Prose>
          </GuideLayout>
        </Container>
      </main>

      <CtaBand
        title="Requirements met?"
        intro="Then it's the application itself — the timeline, the statement and the references."
        primary={{ label: "How to apply", href: "/apply" }}
        secondary={{ label: "Explore courses", href: "/courses" }}
      />
      <ReadyToApply
        title="Not sure whether you meet them?"
        intro="An Ignition advisor checks your grades and your English against what each course asks for, and tells you plainly where you stand."
      />
      <Footer />
    </>
  );
}
