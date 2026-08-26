import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { JourneySelector } from "@/components/journey/JourneySelector";
import { ProgressSummary } from "@/components/journey/ProgressSummary";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Where are you in your UK journey?",
  description:
    "Tell us where you are — exploring, choosing universities, ready to apply or preparing to move — and Ignition will show you the next steps in order.",
  path: "/start",
});

export default function StartPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Your journey"
          title="Where are you today?"
          intro="It takes about ten seconds. We'll guide the rest — the right steps, in the right order, with nothing you don't need yet."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Your journey", href: "/start" },
          ]}
        />

        <Container className="py-[clamp(2.5rem,4.5vw,4.5rem)]">
          <JourneySelector />

          <section className="mt-16">
            <h2 className="text-[clamp(1.5rem,2.4vw,2.125rem)] font-bold leading-[1.12] tracking-[-0.02em] text-navy">
              Your progress so far<span className="text-orange">.</span>
            </h2>
            <p className="mt-3 max-w-[58ch] text-[16px] font-medium leading-[1.55] text-muted">
              Built from what you&rsquo;ve already done across the site. Saved
              in this browser, and yours to pick up whenever you come back.
            </p>
            <div className="mt-7">
              <ProgressSummary />
            </div>
          </section>
        </Container>
      </main>

      <CtaBand
        title="Still deciding what to study?"
        intro="Start from what interests you rather than from a course list."
        primary={{ label: "Take Career Quiz", href: "/careers/quiz" }}
        secondary={{ label: "Browse careers", href: "/careers" }}
      />
      <Footer />
    </>
  );
}
