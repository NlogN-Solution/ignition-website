import { AlertTriangle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ReadyToApply } from "@/components/apply/ReadyToApply";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { GuideLayout } from "@/components/layout/OnThisPage";
import { Container } from "@/components/ui/Container";
import { Callout } from "@/components/ui/Callout";
import { Prose } from "@/components/ui/Prose";
import { Timeline } from "@/components/ui/Timeline";
import { Accordion } from "@/components/ui/Accordion";
import { Checklist } from "@/components/ui/Checklist";
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
  title: "The UK Student visa journey",
  description:
    "From accepting an offer to landing in the UK — what a CAS is, the ten stages of a Student visa application, the documents involved and the mistakes that cause delays.",
  path: "/visa",
});

const sections = [
  { id: "journey", label: "The ten stages" },
  { id: "documents", label: "Your documents" },
  { id: "mistakes", label: "Common mistakes" },
  { id: "terms", label: "Terminology" },
  { id: "faqs", label: "Common questions" },
];

/** Repeated at the top and bottom: this is the page where being out of date matters most. */
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

export default function VisaPage() {
  return (
    <>
      <JsonLd schema={faqSchema(visaFaqs.map((f) => ({ question: f.question, answer: f.answer })))} />
      <Navbar />
      <main>
        <PageHero
          eyebrow="Student visa"
          title="The UK Student visa journey."
          intro="Ten stages, in order, from the moment you receive an offer to the day you fly. This explains how the process fits together — the numbers themselves belong to the Home Office."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Student visa", href: "/visa" },
          ]}
        />

        <Container className="py-[clamp(2.5rem,4.5vw,4.5rem)]">
          <div className="mb-10">
            <VisaNotice />
          </div>

          <GuideLayout sections={sections}>
            <Prose id="journey" title="The ten stages">
              <p>
                The visa is the last part of the journey, not the first. Nothing
                below can begin until a UK university has offered you a place
                and you have accepted it.
              </p>
              <div className="pt-3">
                <Timeline stages={visaJourney} />
              </div>
            </Prose>

            <Prose id="documents" title="Documents you may need">
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

            <Prose id="mistakes" title="Common mistakes">
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

            <Prose id="terms" title="Terminology">
              <p>
                The vocabulary is the first barrier. These are the terms you
                will meet repeatedly.
              </p>
              <Accordion items={visaTerms} />
            </Prose>

            <Prose id="faqs" title="Common questions">
              <Accordion items={visaFaqs} />
              <div className="pt-4">
                <VisaNotice />
              </div>
            </Prose>
          </GuideLayout>
        </Container>
      </main>

      <CtaBand
        title="Visa in progress?"
        intro="Start planning what your first year will actually cost, and what to do in your first week."
        primary={{ label: "Money and costs", href: "/money" }}
        secondary={{ label: "Life in the UK", href: "/life-in-uk" }}
      />
      <ReadyToApply
        title="Applying through Ignition?"
        intro="Your visa journey continues in the same dashboard as your application — CAS, documents, decision and pre-departure, one checklist."
      />
      <Footer />
    </>
  );
}
