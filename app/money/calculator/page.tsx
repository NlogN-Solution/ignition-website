import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import { CostCalculator } from "@/components/money/CostCalculator";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cost calculator",
  description:
    "Estimate what a year of studying in the UK would cost you — tuition, accommodation, food, transport and everything else, with a full monthly and annual breakdown.",
  path: "/money/calculator",
});

export default function CalculatorPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Money"
          title="Estimate your cost of studying."
          intro="Start from a city, then adjust every line to your own situation. The number you plan around should be yours, not a national average."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Money", href: "/money" },
            { label: "Cost calculator", href: "/money/calculator" },
          ]}
        >
          <Badge tone="demo">Example data</Badge>
        </PageHero>

        <Container className="py-[clamp(2.5rem,4.5vw,4.5rem)]">
          <div className="mb-10">
            <Callout tone="official">
              The starting figures are illustrative examples showing how
              location changes a budget &mdash; they are not researched costs
              for these cities. Confirm tuition with the university and living
              costs with its accommodation office before you rely on a total.
            </Callout>
          </div>

          <CostCalculator />
        </Container>
      </main>

      <CtaBand
        title="Number higher than expected?"
        intro="Scholarships and a cheaper city can both close a meaningful part of the gap."
        primary={{ label: "Explore scholarships", href: "/money/scholarships" }}
        secondary={{ label: "Compare courses", href: "/courses" }}
      />
      <Footer />
    </>
  );
}
