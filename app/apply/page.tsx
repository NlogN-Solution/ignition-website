import { AlertTriangle } from "lucide-react";
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
  applicationChecklist,
  applicationTimeline,
  applyFaqs,
  commonMistakes,
  offerTypes,
  personalStatementGuidance,
  ucasSource,
} from "@/data/guides/apply";
import { faqSchema, JsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How to apply to a UK university",
  description:
    "The full UCAS application process in order — timeline, personal statement, references, offers, firm and insurance choices, Clearing and the mistakes to avoid.",
  path: "/apply",
});

const sections = [
  { id: "ucas", label: "What is UCAS" },
  { id: "timeline", label: "Application timeline" },
  { id: "statement", label: "Personal statement" },
  { id: "documents", label: "References & documents" },
  { id: "offers", label: "Offers and replies" },
  { id: "mistakes", label: "Common mistakes" },
  { id: "checklist", label: "Your checklist" },
  { id: "faqs", label: "Common questions" },
];

export default function ApplyPage() {
  return (
    <>
      <JsonLd schema={faqSchema(applyFaqs.map((f) => ({ question: f.question, answer: f.answer })))} />
      <Navbar />
      <main>
        <PageHero
          eyebrow="Applying"
          title="How to apply to a UK university."
          intro="One application, sent to several courses, through a service called UCAS. Here is the whole process in order — what happens when, what you control, and what to do at each decision point."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "How to apply", href: "/apply" },
          ]}
        />

        <Container className="py-[clamp(2.5rem,4.5vw,4.5rem)]">
          <GuideLayout sections={sections}>
            <Prose id="ucas" title="What is UCAS?">
              <p>
                UCAS is the central service through which almost all
                undergraduate applications to UK universities are made. You
                complete one application — one form, one personal statement, one
                reference — and it goes to every course you have chosen.
                Universities then respond to you individually through the same
                system.
              </p>
              <p>
                Two consequences follow from that design, and both matter. Your
                personal statement is read by every university you apply to, so
                it cannot be written for one of them. And universities cannot
                see where else you have applied, so the order you list them in
                carries no meaning at all.
              </p>
              <Callout>
                Deadlines, fees and the number of choices permitted are set by
                UCAS and change between cycles. This guide explains how the
                process works &mdash; check current dates and limits on{" "}
                <a
                  href={ucasSource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-link underline-offset-2 hover:underline"
                >
                  {ucasSource.label}
                </a>
                .
              </Callout>
            </Prose>

            <Prose id="timeline" title="Application timeline">
              <p>
                Applications open roughly a year before you would start. The
                exact dates move each cycle, so these are the stages in order
                rather than fixed deadlines.
              </p>
              <div className="pt-3">
                <Timeline stages={applicationTimeline} />
              </div>
            </Prose>

            <Prose id="statement" title="The personal statement">
              <p>
                The one part of the application entirely within your control.
                Admissions tutors use it to work out whether you are genuinely
                interested in the subject and whether you would be worth
                teaching.
              </p>
              <ul className="grid gap-4 sm:grid-cols-2">
                {personalStatementGuidance.map((item) => (
                  <li key={item.title}>
                    <Card className="h-full p-5">
                      <h3 className="text-[16.5px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
                        {item.title}
                      </h3>
                      <p className="mt-[7px] text-[15px] font-medium leading-[1.55] text-muted">
                        {item.body}
                      </p>
                    </Card>
                  </li>
                ))}
              </ul>
            </Prose>

            <Prose id="documents" title="References and documents">
              <p>
                Your reference is written by a teacher, tutor or employer who
                can speak to your academic ability and suitability for the
                course. Ask early — a good reference takes time to write, and
                whoever writes yours is probably writing several others.
              </p>
              <p>
                Alongside it you will need transcripts and certificates for
                qualifications you already hold, predicted grades for those you
                do not, and evidence of English language ability if the course
                requires it. International applicants should gather certified
                translations well before the deadline rather than during it.
              </p>
            </Prose>

            <Prose id="offers" title="Offers, and how to reply">
              <p>
                Decisions arrive one at a time over several months, not
                together. Once they are all in, you hold two: a firm choice and
                an insurance choice.
              </p>
              <ul className="grid gap-4 sm:grid-cols-2">
                {offerTypes.map((item) => (
                  <li key={item.title}>
                    <Card className="h-full p-5">
                      <h3 className="text-[16.5px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
                        {item.title}
                      </h3>
                      <p className="mt-[7px] text-[15px] font-medium leading-[1.55] text-muted">
                        {item.body}
                      </p>
                    </Card>
                  </li>
                ))}
              </ul>
              <Callout>
                An insurance choice only protects you if its entry requirements
                are genuinely lower than your firm choice. Two equally
                competitive offers give you no backup at all.
              </Callout>
            </Prose>

            <Prose id="mistakes" title="Common mistakes">
              <ul className="space-y-3">
                {commonMistakes.map((mistake) => (
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

            <Prose id="checklist" title="Your application checklist">
              <p>
                Tick these off as you go. Progress is saved in this browser.
              </p>
              <div className="pt-1">
                <Checklist id="apply" items={applicationChecklist} />
              </div>
            </Prose>

            <Prose id="faqs" title="Common questions">
              <Accordion items={applyFaqs} />
            </Prose>
          </GuideLayout>
        </Container>
      </main>

      <CtaBand
        title="Got an interview coming?"
        intro="Some courses interview. Practise with real questions for your subject before it counts."
        primary={{ label: "Interview preparation", href: "/apply/interviews" }}
        secondary={{ label: "Entry requirements", href: "/apply/entry-requirements" }}
      />
      <ReadyToApply
        title="Ready to start your application?"
        intro="You know how the process works now. Ignition can take it from here — your profile, your documents and every application in one place."
      />
      <Footer />
    </>
  );
}
