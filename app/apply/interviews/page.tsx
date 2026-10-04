import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ReadyToApply } from "@/components/apply/ReadyToApply";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { GuideLayout } from "@/components/layout/OnThisPage";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Prose } from "@/components/ui/Prose";
import { Accordion } from "@/components/ui/Accordion";
import { InterviewPractice } from "@/components/application/InterviewPractice";
import { interviewFaqs, interviewGuidance } from "@/data/guides/interviews";
import { faqSchema, JsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Prepare for your interview",
  description:
    "Why UK universities interview, what they assess, and a practice tool that gives you real questions for your subject to answer before it counts.",
  path: "/apply/interviews",
});

const sections = [
  { id: "practice", label: "Practise your interview" },
  { id: "guidance", label: "How to prepare" },
  { id: "faqs", label: "Common questions" },
];

export default function InterviewsPage() {
  return (
    <>
      <JsonLd schema={faqSchema(interviewFaqs.map((f) => ({ question: f.question, answer: f.answer })))} />
      <Navbar />
      <main>
        <PageHero
          eyebrow="Applying"
          title="Prepare for your interview."
          intro="Most UK courses do not interview. Those that do are usually competitive, vocational or portfolio-based — and they are assessing how you think, not what you have memorised."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "How to apply", href: "/apply" },
            { label: "Interviews", href: "/apply/interviews" },
          ]}
        />

        <Container className="py-[clamp(2.5rem,4.5vw,4.5rem)]">
          <GuideLayout sections={sections}>
            <Prose id="practice" title="Practise your interview">
              <p>
                Pick the course closest to yours and work through the questions.
                Write each answer as you would say it aloud, then review it
                against what the interviewer is actually assessing.
              </p>
              <div className="pt-2">
                <InterviewPractice />
              </div>
            </Prose>

            <Prose id="guidance" title="How to prepare">
              <ul className="grid gap-4 sm:grid-cols-2">
                {interviewGuidance.map((item) => (
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
            </Prose>

            <Prose id="faqs" title="Common questions">
              <Accordion items={interviewFaqs} />
            </Prose>
          </GuideLayout>
        </Container>
      </main>

      <CtaBand
        title="Holding an offer?"
        intro="Once you accept and meet your conditions, the visa journey begins."
        primary={{ label: "Student visa", href: "/apply/entry-requirements#visa-journey" }}
        secondary={{ label: "How to apply", href: "/apply" }}
      />
      <ReadyToApply
        title="Ready to prepare the rest of your application?"
        intro="Interview practice is one part of it. Your profile, documents and applications live in the same place, with an advisor who reviews them."
      />
      <Footer />
    </>
  );
}
