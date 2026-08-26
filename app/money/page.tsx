import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { GuideLayout } from "@/components/layout/OnThisPage";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import { Prose } from "@/components/ui/Prose";
import { Accordion } from "@/components/ui/Accordion";
import { livingCostBreakdown, moneyFaqs, moneyNotice, moneyTopics } from "@/data/guides/money";
import { faqSchema, JsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "What studying in the UK costs",
  description:
    "Tuition, living costs, accommodation, banking, part-time work and scholarships — how the total is built and where the money actually goes.",
  path: "/money",
});

const sections = [
  { id: "breakdown", label: "Where money goes" },
  { id: "topics", label: "The seven costs" },
  { id: "faqs", label: "Common questions" },
];

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

export default function MoneyPage() {
  const low = livingCostBreakdown.reduce((sum, row) => sum + row.low, 0);
  const high = livingCostBreakdown.reduce((sum, row) => sum + row.high, 0);

  return (
    <>
      <JsonLd schema={faqSchema(moneyFaqs.map((f) => ({ question: f.question, answer: f.answer })))} />
      <Navbar />
      <main>
        <PageHero
          eyebrow="Money"
          title="What studying in the UK costs."
          intro="The real number is tuition plus living costs, and the second half is the one applicants underestimate. Here is how the total is built, and which parts you can actually change."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Money", href: "/money" },
          ]}
        >
          <Badge tone="demo">Example data</Badge>
        </PageHero>

        <Container className="py-[clamp(2.5rem,4.5vw,4.5rem)]">
          <div className="mb-10">
            <Callout tone="official">{moneyNotice}</Callout>
          </div>

          <GuideLayout sections={sections}>
            <Prose id="breakdown" title="Where the money actually goes">
              <p>
                A monthly living budget, broken into the categories students
                actually spend on. The ranges are wide because the gap between
                UK cities is wide &mdash; accommodation alone can double.
              </p>

              <Card className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[17px] font-bold tracking-[-0.01em] text-navy">
                    Monthly living costs
                  </h3>
                  <Badge tone="demo">Example data</Badge>
                </div>

                <ul className="mt-5 divide-y divide-hairline">
                  {livingCostBreakdown.map((row) => {
                    const share = Math.round((row.high / high) * 100);

                    return (
                      <li key={row.category} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                          <span className="text-[15.5px] font-semibold text-ink">
                            {row.category}
                          </span>
                          <span className="text-[15px] font-semibold tabular-nums text-navy">
                            {gbp.format(row.low)}–{gbp.format(row.high)}
                          </span>
                        </div>
                        <div
                          className="mt-[9px] h-[6px] w-full overflow-hidden rounded-full bg-track"
                          role="img"
                          aria-label={`${row.category}: up to ${share} percent of a monthly budget`}
                        >
                          <div
                            className="h-full rounded-full bg-blue-bright"
                            style={{ width: `${share}%` }}
                          />
                        </div>
                        <p className="mt-[7px] text-[14px] font-medium leading-[1.5] text-muted">
                          {row.note}
                        </p>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-hairline pt-4">
                  <span className="text-[15.5px] font-bold text-navy">
                    Monthly total
                  </span>
                  <span className="text-[19px] font-bold tabular-nums text-navy">
                    {gbp.format(low)}–{gbp.format(high)}
                  </span>
                </div>
              </Card>

              <Callout>
                This is living costs only &mdash; tuition sits on top. Build
                your own figure from your city and course rather than from a
                national average.
              </Callout>
            </Prose>

            <Prose id="topics" title="The seven costs to plan for">
              <ul className="grid gap-4 sm:grid-cols-2">
                {moneyTopics.map((topic) => (
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
              <Accordion items={moneyFaqs} />
            </Prose>
          </GuideLayout>
        </Container>
      </main>

      <CtaBand
        title="Work out your own number."
        intro="The cost calculator builds an estimate from your city, course and living choices."
        primary={{ label: "Cost calculator", href: "/money/calculator" }}
        secondary={{ label: "Scholarships", href: "/money/scholarships" }}
      />
      <Footer />
    </>
  );
}
