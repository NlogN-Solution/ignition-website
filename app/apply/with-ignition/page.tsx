import { Check, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { GuideLayout } from "@/components/layout/OnThisPage";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Callout } from "@/components/ui/Callout";
import { Prose } from "@/components/ui/Prose";
import { Timeline } from "@/components/ui/Timeline";
import { Accordion } from "@/components/ui/Accordion";
import { ReadyToApply } from "@/components/apply/ReadyToApply";
import { StartApplicationButton } from "@/components/apply/StartApplicationButton";
import { whatIgnitionDoes } from "@/components/apply/whatIgnitionDoes";
import { applyWithIgnitionStages, withIgnitionFaqs } from "@/data/guides/with-ignition";
import { faqSchema, JsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Apply through Ignition",
  description:
    "What applying to a UK university through Ignition involves — the steps in order, what you do, what Ignition does, what it costs and what it cannot promise.",
  path: "/apply/with-ignition",
});

const sections = [
  { id: "what", label: "What you get" },
  { id: "steps", label: "How it works" },
  { id: "who", label: "Who does what" },
  { id: "honest", label: "What we don't do" },
  { id: "faqs", label: "Common questions" },
];

export default function ApplyWithIgnitionPage() {
  return (
    <>
      <JsonLd schema={faqSchema(withIgnitionFaqs)} />
      <Navbar />
      <main>
        <PageHero
          eyebrow="Applying"
          title="Apply through Ignition."
          intro="You have researched the careers, the courses and the universities. This is the part where it becomes an application — and where you stop doing it on your own."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "How to apply", href: "/apply" },
            { label: "Apply through Ignition", href: "/apply/with-ignition" },
          ]}
        >
          <StartApplicationButton />
        </PageHero>

        <Container className="py-[clamp(2.5rem,4.5vw,4.5rem)]">
          <GuideLayout sections={sections}>
            <Prose id="what" title="What you actually get">
              <p>
                Ignition is a consultancy as well as a research platform. Everything
                below exists in the student portal today — this is not a description
                of a roadmap.
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

            <Prose id="steps" title="How it works, in order">
              <p>
                Nine steps, and you are never handed all of them at once. The portal
                shows you one next action at a time, so there is always a single
                answer to &ldquo;what am I supposed to be doing?&rdquo;
              </p>
              <div className="pt-3">
                <Timeline stages={applyWithIgnitionStages} />
              </div>
            </Prose>

            <Prose id="who" title="Who does what">
              <p>
                The division of labour matters, because the thing that goes wrong
                most often in agent-assisted applications is a student assuming
                someone else was handling it.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="p-6">
                  <h3 className="text-[17px] font-bold tracking-[-0.01em] text-navy">
                    You
                  </h3>
                  <ul className="mt-4 space-y-[10px]">
                    {[
                      "Decide what and where you want to study",
                      "Provide accurate details and real documents",
                      "Write your own personal statement",
                      "Sit your English test if you need one",
                      "Accept or decline the offers you receive",
                      "Make your own visa application",
                    ].map((line) => (
                      <li key={line} className="flex items-start gap-[10px] text-[15px] font-medium leading-[1.5] text-ink-soft">
                        <Check size={14} strokeWidth={2.8} aria-hidden className="mt-[4px] shrink-0 text-orange" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </Card>
                <Card className="p-6">
                  <h3 className="text-[17px] font-bold tracking-[-0.01em] text-navy">
                    Ignition
                  </h3>
                  <ul className="mt-4 space-y-[10px]">
                    {[
                      "Tells you which documents each application needs",
                      "Reviews what you upload and flags problems early",
                      "Checks your profile against course requirements",
                      "Prepares and submits the application",
                      "Chases the university and records every update",
                      "Guides you through CAS, visa and pre-departure",
                    ].map((line) => (
                      <li key={line} className="flex items-start gap-[10px] text-[15px] font-medium leading-[1.5] text-ink-soft">
                        <Check size={14} strokeWidth={2.8} aria-hidden className="mt-[4px] shrink-0 text-orange" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </Prose>

            <Prose id="honest" title="What we don't do">
              <Callout tone="official">
                <p className="font-semibold text-navy">
                  No agent can guarantee an offer or a visa.
                </p>
                <p className="mt-2">
                  Admissions decisions belong to universities and visa decisions to
                  UKVI. Ignition will not write your personal statement for you,
                  will not submit a document it has reason to doubt, and will tell
                  you plainly if a university on your shortlist is out of reach on
                  your grades rather than taking the application anyway.
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
                  across this site are example data for demonstrating the interface.
                  Your advisor works from each university&rsquo;s official course
                  page, and so should you.
                </p>
              </div>
            </Prose>

            <Prose id="faqs" title="Common questions">
              <Accordion items={withIgnitionFaqs} />
            </Prose>
          </GuideLayout>
        </Container>
      </main>

      <ReadyToApply
        title="Ready when you are."
        intro="Create your profile and your research comes with you. You can stop at any point — nothing is sent anywhere without you."
      />
      <Footer />
    </>
  );
}
