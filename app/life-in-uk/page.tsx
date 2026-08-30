import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { GuideLayout } from "@/components/layout/OnThisPage";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Prose } from "@/components/ui/Prose";
import { Accordion } from "@/components/ui/Accordion";
import { Checklist } from "@/components/ui/Checklist";
import {
  arrivalChecklist,
  firstWeekChecklist,
  lifeFaqs,
  lifeTopics,
} from "@/data/guides/life-in-uk";
import { faqSchema, JsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Life in the UK",
  description:
    "The practical side of arriving — airport arrival, a first-week checklist, accommodation, healthcare, banking, transport, academic expectations and settling in.",
  path: "/life-in-uk",
});

const sections = [
  { id: "arrival", label: "Arriving" },
  { id: "first-week", label: "First-week checklist" },
  { id: "topics", label: "Settling in" },
  { id: "faqs", label: "Common questions" },
];

export default function LifeInUkPage() {
  return (
    <>
      <JsonLd schema={faqSchema(lifeFaqs.map((f) => ({ question: f.question, answer: f.answer })))} />
      <Navbar />
      <main>
        <PageHero
          eyebrow="Life in the UK"
          title="Getting ready for life in the UK."
          intro="The part nobody prepares you for. Landing, finding somewhere to live, registering with a doctor, opening a bank account, and getting through the first month without anything going wrong."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Life in the UK", href: "/life-in-uk" },
          ]}
        />

        <Container className="py-[clamp(2.5rem,4.5vw,4.5rem)]">
          <GuideLayout sections={sections}>
            <Prose id="arrival" title="Arriving">
              <p>
                Getting through the airport and to your accommodation is
                straightforward if you have prepared five things. Progress is
                saved in this browser.
              </p>
              <div className="pt-1">
                <Checklist id="arrival" items={arrivalChecklist} />
              </div>
            </Prose>

            <Prose id="first-week" title="Your first week">
              <p>
                Do these in the first seven days. Almost every problem
                international students hit in the first term traces back to one
                of them being left too late.
              </p>
              <div className="pt-1">
                <Checklist id="first-week" items={firstWeekChecklist} />
              </div>
            </Prose>

            <Prose id="topics" title="Settling in">
              <ul className="grid gap-4 sm:grid-cols-2">
                {lifeTopics.map((topic) => (
                  <li key={topic.title}>
                    <Card className="h-full p-5 sm:p-6">
                      <h3 className="text-[16.5px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
                        {topic.title}
                      </h3>
                      <p className="mt-[8px] text-[15px] font-medium leading-[1.6] text-muted">
                        {topic.body}
                      </p>
                    </Card>
                  </li>
                ))}
              </ul>
            </Prose>

            <Prose id="faqs" title="Common questions">
              <Accordion items={lifeFaqs} />
            </Prose>
          </GuideLayout>
        </Container>
      </main>

      <CtaBand
        title="Still earlier in the journey?"
        intro="Work out where you are, and we'll show you what to do next."
        primary={{ label: "Your UK journey", href: "/start" }}
        secondary={{ label: "Student visa", href: "/apply/entry-requirements#visa-journey" }}
      />
      <Footer />
    </>
  );
}
