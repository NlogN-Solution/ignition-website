import { AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";
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
import { Timeline } from "@/components/ui/Timeline";
import { Accordion } from "@/components/ui/Accordion";
import { Checklist } from "@/components/ui/Checklist";
import {
  generalVsOfficial,
  requirementTypes,
  requirementsChecklist,
  requirementsFaqs,
  requirementsNotice,
} from "@/data/guides/entry-requirements";
import {
  govUkSource,
  visaDocuments,
  visaFaqs,
  visaJourney,
  visaMistakes,
  visaNotice,
  visaTerms,
} from "@/data/guides/visa";
import { faqSchema, JsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Entry requirements and the Student visa",
  description:
    "The two sets of conditions you have to meet — what UK universities ask for (grades, subjects, international qualifications, English) and what the Home Office asks for (the ten stages of a Student visa, documents, terminology and the mistakes that cause delays).",
  path: "/apply/entry-requirements",
});

/**
 * Two guides on one page: what the university requires, then what the Home
 * Office requires.
 *
 * WHY THEY WERE MERGED. The Student visa lived at `/visa` and entry
 * requirements here, which split one question across two pages. A student is
 * not asking "what are entry requirements" and separately "how does a visa
 * work" — they are asking whether they qualify, and the honest answer has two
 * halves that are useless apart. Meeting the academic conditions and failing
 * the immigration ones ends the journey just as completely as the reverse.
 *
 * NOTHING WAS DROPPED IN THE MOVE. Every section of the old visa page is
 * below — the ten stages, the document checklist, the mistakes, the
 * terminology and its FAQs — along with both standing notices. The visa
 * blocks keep the `visa-` prefix on their anchors so the old page's deep
 * links survive as anchors on this one, and `/visa` itself is redirected here
 * in `next.config.ts` rather than left to 404.
 *
 * The order is deliberate: university first, Home Office second. That is the
 * sequence they actually happen in — no visa process can begin before an
 * offer exists — and the visa half opens by saying so.
 */

const sections = [
  { id: "types", label: "The five requirements" },
  { id: "authority", label: "General vs official" },
  { id: "checklist", label: "What to check" },
  { id: "visa-journey", label: "The visa: ten stages" },
  { id: "visa-documents", label: "Visa documents" },
  { id: "visa-mistakes", label: "Visa mistakes" },
  { id: "visa-terms", label: "Visa terminology" },
  { id: "faqs", label: "Common questions" },
];

/**
 * Repeated at the start and the end of the visa half. This is the material on
 * the site where being out of date matters most, and a reader who lands on an
 * anchor part-way down should still meet it.
 */
function VisaNotice() {
  return (
    <Callout tone="official">
      {visaNotice} Check{" "}
      <a
        href={govUkSource.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-blue-link underline-offset-2 hover:underline"
      >
        {govUkSource.label}
      </a>{" "}
      before acting on anything here. Ignition does not state fees, maintenance
      amounts or processing times, because they change.
    </Callout>
  );
}

export default function EntryRequirementsPage() {
  return (
    <>
      <JsonLd
        schema={faqSchema(
          [...requirementsFaqs, ...visaFaqs].map((f) => ({
            question: f.question,
            answer: f.answer,
          })),
        )}
      />
      <Navbar />
      <main>
        <PageHero
          eyebrow="Applying"
          title="Entry requirements and the Student visa."
          intro="Two sets of conditions stand between an offer and a lecture theatre: what the university asks for, and what the Home Office asks for. Meeting one and missing the other gets you nowhere, so both are here, in the order they happen."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "How to apply", href: "/apply" },
            { label: "Entry requirements and visa", href: "/apply/entry-requirements" },
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
            {/* ---- Part one: what the university requires ---- */}

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

            {/* ---- Part two: what the Home Office requires ----

                The rule marks a change of authority, not just a change of
                topic. Everything above is decided by a university and can be
                negotiated around — a foundation year, a different course, a
                retake. Nothing below is. */}
            <div className="border-t border-hairline pt-[clamp(2rem,3.5vw,3rem)]">
              <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-orange">
                Part two — the Home Office
              </p>
              <h2 className="mt-3 max-w-[24ch] text-[clamp(1.5rem,2.5vw,2rem)] font-bold leading-[1.12] tracking-[-0.02em] text-navy">
                Once a university says yes, the Student visa begins
              </h2>
              <p className="mt-4 max-w-[68ch] text-[16.5px] font-medium leading-[1.7] text-ink-soft">
                The visa is the last part of the journey, not the first.
                Nothing below can begin until a UK university has offered you a
                place and you have accepted it — but the documents take longer
                to gather than most applicants expect, so it is worth reading
                before you need it.
              </p>

              <div className="mt-7">
                <VisaNotice />
              </div>
            </div>

            <Prose id="visa-journey" title="The ten stages of a Student visa">
              <p>
                In order, from the moment you accept an offer to the day you
                fly. This explains how the process fits together — the numbers
                themselves belong to the Home Office.
              </p>
              <div className="pt-3">
                <Timeline stages={visaJourney} />
              </div>
            </Prose>

            <Prose id="visa-documents" title="Documents you may need">
              <p>
                The exact list depends on your nationality, your course and your
                circumstances. Treat this as what to start gathering, and
                confirm the specifics against current guidance and your
                university&rsquo;s international office.
              </p>
              <div className="pt-1">
                <Checklist id="visa-documents" items={visaDocuments} />
              </div>
            </Prose>

            <Prose id="visa-mistakes" title="Common visa mistakes">
              <p>
                Most refusals and delays come from process errors rather than
                from anything about the applicant.
              </p>
              <ul className="space-y-3">
                {visaMistakes.map((mistake) => (
                  <li
                    key={mistake}
                    className="flex gap-[12px] text-[15.5px] font-medium leading-[1.6] text-ink-soft"
                  >
                    <AlertTriangle
                      size={17}
                      strokeWidth={2.1}
                      aria-hidden
                      className="mt-[4px] shrink-0 text-orange"
                    />
                    {mistake}
                  </li>
                ))}
              </ul>
            </Prose>

            <Prose id="visa-terms" title="Visa terminology">
              <p>
                The vocabulary is the first barrier. These are the terms you
                will meet repeatedly.
              </p>
              <Accordion items={visaTerms} />

              {/* Carried over from the old visa page's closing band: a student
                  who has read this far is planning a move, not an
                  application. */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border border-hairline bg-white p-5">
                <p className="text-[15px] font-semibold text-navy">
                  Visa in progress? Start planning the year itself.
                </p>
                {[
                  { label: "Money and costs", href: "/money" },
                  { label: "Life in the UK", href: "/life-in-uk" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group inline-flex items-center gap-[7px] text-[14.5px] font-bold text-blue-link transition-colors duration-200 hover:text-navy"
                  >
                    {link.label}
                    <ArrowRight
                      size={15}
                      strokeWidth={2.4}
                      aria-hidden
                      className="shrink-0 transition-transform duration-200 group-hover:translate-x-[3px]"
                    />
                  </Link>
                ))}
              </div>
            </Prose>

            <Prose id="faqs" title="Common questions">
              <h3 className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-muted-light">
                About entry requirements
              </h3>
              <Accordion items={requirementsFaqs} />

              <h3 className="pt-2 text-[12.5px] font-bold uppercase tracking-[0.12em] text-muted-light">
                About the Student visa
              </h3>
              <Accordion items={visaFaqs} />

              <div className="pt-4">
                <VisaNotice />
              </div>
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
        intro="An Ignition advisor checks your grades and your English against what each course asks for, tells you plainly where you stand, and stays with you through CAS, visa and pre-departure."
      />
      <Footer />
    </>
  );
}
