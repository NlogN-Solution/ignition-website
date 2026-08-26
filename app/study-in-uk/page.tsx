import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { GuideLayout } from "@/components/layout/OnThisPage";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Prose } from "@/components/ui/Prose";
import { Accordion } from "@/components/ui/Accordion";
import { JourneyPipeline } from "@/components/journey/JourneyPipeline";
import {
  academicYear,
  degreeStructures,
  studyUkFaqs,
  whyUk,
} from "@/data/guides/study-in-uk";
import { faqSchema, JsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Study in the UK",
  description:
    "How UK degrees are structured, how long they take, how the academic year works and what the whole route looks like — from choosing a subject to your first week on campus.",
  path: "/study-in-uk",
});

const sections = [
  { id: "why", label: "Why the UK" },
  { id: "structures", label: "How degrees work" },
  { id: "year", label: "The academic year" },
  { id: "journey", label: "The whole journey" },
  { id: "faqs", label: "Common questions" },
];

export default function StudyInUkPage() {
  return (
    <>
      <JsonLd schema={faqSchema(studyUkFaqs.map((f) => ({ question: f.question, answer: f.answer })))} />
      <Navbar />
      <main>
        <PageHero
          eyebrow="Study in the UK"
          title="Everything you need to study in the UK."
          intro="What a UK degree actually involves — how the system is structured, how long courses take, how the year is organised, and what the whole route looks like from here to your first week on campus."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Study in the UK", href: "/study-in-uk" },
          ]}
        />

        <Container className="py-[clamp(2.5rem,4.5vw,4.5rem)]">
          <GuideLayout sections={sections}>
            <Prose id="why" title="Why the UK">
              <p>
                The UK is not the right choice for everyone, and it is worth
                understanding what makes it different before deciding. Four
                things shape the experience more than anything else.
              </p>
              <ul className="grid gap-4 sm:grid-cols-2">
                {whyUk.map((item) => (
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

            <Prose id="structures" title="How UK degrees are structured">
              <p>
                Course names can be misleading between countries. These are the
                shapes you will actually encounter when browsing UK courses.
              </p>
              <ul className="grid gap-4 sm:grid-cols-2">
                {degreeStructures.map((item) => (
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

            <Prose id="year" title="The academic year">
              <ul className="grid gap-4 sm:grid-cols-2">
                {academicYear.map((item) => (
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

            <Prose id="journey" title="The whole journey">
              <p>
                Every stage below connects to the next. You do not need to think
                about the visa while you are still choosing a subject &mdash;
                but it helps to know the shape of what is ahead.
              </p>
              <div className="pt-2">
                <JourneyPipeline />
              </div>
            </Prose>

            <Prose id="faqs" title="Common questions">
              <Accordion items={studyUkFaqs} />
            </Prose>
          </GuideLayout>
        </Container>
      </main>

      <CtaBand
        title="Know the system. Now find your course."
        intro="Start from the career you want and work back to the degree that leads there."
        primary={{ label: "Take Career Quiz", href: "/careers/quiz" }}
        secondary={{ label: "Explore courses", href: "/courses" }}
      />
      <Footer />
    </>
  );
}
