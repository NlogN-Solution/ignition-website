import { AlertTriangle, Check, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ReadyToApply } from "@/components/apply/ReadyToApply";
import { StartApplicationButton } from "@/components/apply/StartApplicationButton";
import { whatIgnitionDoes } from "@/components/apply/whatIgnitionDoes";
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
import { applyWithIgnitionStages, withIgnitionFaqs } from "@/data/guides/with-ignition";
import { faqSchema, JsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How to apply to a UK university",
  description:
    "The full UCAS application process in order — timeline, personal statement, references, offers, firm and insurance choices and the mistakes to avoid — followed by what applying through Ignition involves, who does what, and what no agent can promise.",
  path: "/apply",
});

/**
 * How the application works, then how Ignition helps with it.
 *
 * WHY THEY WERE MERGED. "Apply through Ignition" was its own page at
 * `/apply/with-ignition`, which put the sales half of the story one click
 * away from the half that earns the right to tell it. A student reading about
 * UCAS deadlines is exactly the person who wants to know whether someone can
 * do this with them; making them find a second page to ask meant most never
 * did, and the page they landed on read as an advert because the guidance
 * that justified it was somewhere else.
 *
 * THE ORDER IS THE ARGUMENT. Everything a student needs in order to apply
 * alone comes first and is complete on its own terms — nothing is held back
 * to make the service look necessary. The Ignition half then follows as an
 * offer, not a prerequisite, and includes the section saying what Ignition
 * will not do.
 *
 * NOTHING WAS DROPPED IN THE MOVE. All five sections of the old page are
 * here, its `StartApplicationButton` moved from the hero to the head of the
 * Ignition half, and its FAQs are grouped under the shared "Common questions"
 * heading. `/apply/with-ignition` is redirected to `#ignition-what` in
 * `next.config.ts` rather than left to 404.
 */

const sections = [
  { id: "ucas", label: "What is UCAS" },
  { id: "timeline", label: "Application timeline" },
  { id: "statement", label: "Personal statement" },
  { id: "documents", label: "References & documents" },
  { id: "offers", label: "Offers and replies" },
  { id: "mistakes", label: "Common mistakes" },
  { id: "checklist", label: "Your checklist" },
  { id: "ignition-what", label: "Applying with Ignition" },
  { id: "ignition-steps", label: "How it works" },
  { id: "ignition-who", label: "Who does what" },
  { id: "ignition-honest", label: "What we don't do" },
  { id: "faqs", label: "Common questions" },
];

/** Both halves of the page carry a "who does what" list, so it is shared. */
const responsibilities = {
  you: [
    "Decide what and where you want to study",
    "Provide accurate details and real documents",
    "Write your own personal statement",
    "Sit your English test if you need one",
    "Accept or decline the offers you receive",
    "Make your own visa application",
  ],
  ignition: [
    "Tells you which documents each application needs",
    "Reviews what you upload and flags problems early",
    "Checks your profile against course requirements",
    "Prepares and submits the application",
    "Chases the university and records every update",
    "Guides you through CAS, visa and pre-departure",
  ],
};

export default function ApplyPage() {
  return (
    <>
      <JsonLd
        schema={faqSchema(
          [...applyFaqs, ...withIgnitionFaqs].map((f) => ({
            question: f.question,
            answer: f.answer,
          })),
        )}
      />
      <Navbar />
      <main>
        <PageHero
          eyebrow="Applying"
          title="How to apply to a UK university."
          intro="One application, sent to several courses, through a service called UCAS. Here is the whole process in order — what happens when, what you control, and what to do at each decision point — and then what it looks like to do it with Ignition rather than alone."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "How to apply", href: "/apply" },
          ]}
        />

        <Container className="py-[clamp(2.5rem,4.5vw,4.5rem)]">
          <GuideLayout sections={sections}>
            {/* ---- Part one: the process, complete on its own ---- */}

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

            {/* ---- Part two: doing it with Ignition ----

                The rule matters here. Everything above is what a student needs
                in order to apply on their own, and it is complete: nothing was
                withheld to make what follows look necessary. This half is an
                offer, and it is marked as one. */}
            <div className="border-t border-hairline pt-[clamp(2rem,3.5vw,3rem)]">
              <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-orange">
                Part two — with Ignition
              </p>
              <h2 className="mt-3 max-w-[26ch] text-[clamp(1.5rem,2.5vw,2rem)] font-bold leading-[1.12] tracking-[-0.02em] text-navy">
                Or stop doing it on your own
              </h2>
              <p className="mt-4 max-w-[68ch] text-[16.5px] font-medium leading-[1.7] text-ink-soft">
                You have researched the careers, the courses and the
                universities, and you now know how the application itself
                works. Everything above is enough to do it alone. This is what
                changes if you would rather not.
              </p>

              <div className="mt-7">
                <StartApplicationButton />
              </div>
            </div>

            <Prose id="ignition-what" title="What you actually get">
              <p>
                Ignition is a consultancy as well as a research platform.
                Everything below exists in the student portal today — this is
                not a description of a roadmap.
              </p>
              <ul className="grid gap-4 sm:grid-cols-2">
                {whatIgnitionDoes.map((item) => (
                  <li key={item.title}>
                    <Card className="h-full p-5">
                      <span
                        aria-hidden
                        className="flex size-[30px] items-center justify-center rounded-lg bg-navy/[0.07]"
                      >
                        <Check size={15} strokeWidth={2.8} className="text-navy" />
                      </span>
                      <h3 className="mt-4 text-[16.5px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
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

            <Prose id="ignition-steps" title="How it works, in order">
              <p>
                Nine steps, and you are never handed all of them at once. The
                portal shows you one next action at a time, so there is always a
                single answer to &ldquo;what am I supposed to be doing?&rdquo;
              </p>
              <div className="pt-3">
                <Timeline stages={applyWithIgnitionStages} />
              </div>
            </Prose>

            <Prose id="ignition-who" title="Who does what">
              <p>
                The division of labour matters, because the thing that goes
                wrong most often in agent-assisted applications is a student
                assuming someone else was handling it.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {(
                  [
                    ["You", responsibilities.you],
                    ["Ignition", responsibilities.ignition],
                  ] as const
                ).map(([who, duties]) => (
                  <Card key={who} className="p-6">
                    <h3 className="text-[17px] font-bold tracking-[-0.01em] text-navy">
                      {who}
                    </h3>
                    <ul className="mt-4 space-y-[10px]">
                      {duties.map((line) => (
                        <li
                          key={line}
                          className="flex items-start gap-[10px] text-[15px] font-medium leading-[1.5] text-ink-soft"
                        >
                          <Check
                            size={14}
                            strokeWidth={2.8}
                            aria-hidden
                            className="mt-[4px] shrink-0 text-orange"
                          />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </Prose>

            <Prose id="ignition-honest" title="What we don't do">
              <Callout tone="official">
                <p className="font-semibold text-navy">
                  No agent can guarantee an offer or a visa.
                </p>
                <p className="mt-2">
                  Admissions decisions belong to universities and visa decisions
                  to UKVI. Ignition will not write your personal statement for
                  you, will not submit a document it has reason to doubt, and
                  will tell you plainly if a university on your shortlist is out
                  of reach on your grades rather than taking the application
                  anyway.
                </p>
              </Callout>
              <div className="flex items-start gap-4 rounded-xl border border-hairline bg-white p-5 sm:p-6">
                <ShieldCheck
                  size={20}
                  strokeWidth={2}
                  aria-hidden
                  className="mt-[2px] shrink-0 text-blue-link"
                />
                <p className="min-w-0 text-[15px] font-medium leading-[1.6] text-ink-soft">
                  Course fees, entry requirements and scholarship figures shown
                  across this site are example data for demonstrating the
                  interface. Your advisor works from each university&rsquo;s
                  official course page, and so should you.
                </p>
              </div>
            </Prose>

            <Prose id="faqs" title="Common questions">
              <h3 className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-muted-light">
                About the application
              </h3>
              <Accordion items={applyFaqs} />

              <h3 className="pt-2 text-[12.5px] font-bold uppercase tracking-[0.12em] text-muted-light">
                About applying through Ignition
              </h3>
              <Accordion items={withIgnitionFaqs} />
            </Prose>
          </GuideLayout>
        </Container>
      </main>

      <CtaBand
        title="Got an interview coming?"
        intro="Some courses interview. Practise with real questions for your subject before it counts."
        primary={{ label: "Interview preparation", href: "/apply/interviews" }}
        secondary={{ label: "Entry requirements and visa", href: "/apply/entry-requirements" }}
      />
      <ReadyToApply
        title="Ready to start your application?"
        intro="You know how the process works now. Ignition can take it from here — your profile, your documents and every application in one place."
      />
      <Footer />
    </>
  );
}
