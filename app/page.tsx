import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JourneyClose } from "@/components/apply/JourneyClose";
import { Hero } from "@/components/home/Hero";
import { CourseSearch } from "@/components/home/CourseSearch";
import { PopularCourses } from "@/components/home/PopularCourses";
import { PopularUniversities } from "@/components/home/PopularUniversities";
import { CostAndScholarships } from "@/components/home/CostAndScholarships";
import { WhyUk } from "@/components/home/WhyUk";
import { WhyIgnition } from "@/components/home/WhyIgnition";
import { IntentCards } from "@/components/home/IntentCards";
import { CommunityStat } from "@/components/home/CommunityStat";
import { NextStep } from "@/components/journey/NextStep";
import { LeadCapture } from "@/components/lead/LeadCapture";
import { JourneyPipeline } from "@/components/journey/JourneyPipeline";
import { HowToApply } from "@/components/home/HowToApply";
import { Section } from "@/components/ui/Section";
import { trustIntro } from "@/data/home/trust";
import { livingCostBreakdown } from "@/data/guides/money";
import {
  pickFeaturedScholarships,
  publishedTuitionRange,
  pickPopularUniversities,
} from "@/data/home/popular";
import { getScholarships, getUniversities, searchOfferings } from "@/lib/api/catalogue";
import {
  JsonLd,
  organizationSchema,
  siteName,
  siteTagline,
  siteUrl,
  websiteSchema,
} from "@/lib/seo";

export const revalidate = 3600;

const description =
  "Search UK undergraduate, postgraduate and top-up courses, discover the right career, compare universities, understand how to apply and prepare for your journey to the UK.";

export const metadata: Metadata = {
  title: { absolute: `${siteName} — ${siteTagline}` },
  description,
  alternates: { canonical: siteUrl },
  openGraph: {
    title: `${siteName} — ${siteTagline}`,
    description,
    url: siteUrl,
    siteName,
    locale: "en_GB",
    type: "website",
  },
};

/** Course discovery, application guidance and a persistent next-step selector. */
export default async function Home() {
  const [catalogue, scholarships, offerings] = await Promise.all([
    getUniversities(),
    getScholarships(),
    searchOfferings({ limit: 1 }),
  ]);

  const popularUniversities = pickPopularUniversities(catalogue);
  const featuredScholarships = pickFeaturedScholarships(scholarships);

  const tuitionRange = publishedTuitionRange(catalogue);
  const monthlyLivingRange = {
    low: livingCostBreakdown.reduce((sum, row) => sum + row.low, 0),
    high: livingCostBreakdown.reduce((sum, row) => sum + row.high, 0),
  };

  // Slimmed here rather than in the component: what crosses to the browser is
  // what the search box matches on, not the records behind it.
  const universitySuggestions = catalogue.map((university) => ({
    id: university.id,
    name: university.name,
    city: university.city,
    region: university.region,
  }));

  return (
    <>
      <JsonLd schema={organizationSchema()} />
      <JsonLd schema={websiteSchema()} />

      <Navbar />
      <main>
        <Hero />

        <CourseSearch universities={universitySuggestions} courseCount={offerings.total} />

        <Section
          eyebrow="Popular searches"
          title="Or start from what others are asking for."
          intro="Explore three popular subjects in the course catalogue, then compare the courses and universities that match."
        >
          <PopularCourses />
        </Section>

        <Section
          eyebrow="Why the UK"
          title="Three reasons students choose the UK."
          intro="Shorter degrees, some of the strongest universities in the world, and quality that is checked by someone other than the university. The trade-offs are real too — the full case, and the counter-case, are in the guide."
          surface
        >
          <WhyUk />
        </Section>

        <Section eyebrow={trustIntro.eyebrow} title={trustIntro.title} intro={trustIntro.intro}>
          <WhyIgnition />
        </Section>

        <Section
          eyebrow="Where to go"
          title="Some of the universities already in our catalogue."
          intro="Picked by graduate outcomes and recognition where we have them on record — not a ranking, just a reasonable place to start looking."
          surface
        >
          <PopularUniversities universities={popularUniversities} />
        </Section>

        <Section
          eyebrow="Before you go further"
          title="What this actually costs, and what brings it down."
          intro="The two numbers every applicant asks before anything else, and the scholarships that change them."
        >
          <CostAndScholarships
            tuition={tuitionRange}
            monthlyLiving={monthlyLivingRange}
            scholarships={featuredScholarships}
          />
        </Section>

        <Section
          eyebrow="Start anywhere"
          title="What do you need help with?"
          intro="Five ways in. Pick whichever matches the question you actually have right now — you can come back for the rest."
        >
          <IntentCards />
        </Section>

        <HowToApply />

        <Section
          id="route"
          eyebrow="End to end"
          title="From first idea to first week."
          intro="Mark the chapter you’re in so your next step starts from there."
        >
          <JourneyPipeline />
        </Section>

        <Section
          id="journey"
          eyebrow="Your next step"
          title="What should you do next?"
          intro="Ignition remembers the work you've already done — your career profile, your budget, where you are on the route — and points you at the one thing worth doing next."
          surface
        >
          <NextStep />
        </Section>

        <CommunityStat />

        <Section
          id="adviser"
          eyebrow="Talk to someone"
          title="Would you rather someone walked you through it?"
          intro="Leave your number and an Ignition adviser will call. Whatever you picked above comes with them, so they open the conversation already knowing where you are."
          surface
        >
          <LeadCapture />
        </Section>
      </main>

      <JourneyClose
        fallback={{
          title: "Not sure where to start?",
          intro:
            "The career quiz takes about four minutes and turns into a profile, a shortlist of careers, and the degrees that lead to them.",
          primary: { label: "Take Career Quiz", href: "/careers/quiz" },
          secondary: { label: "Why the UK", href: "/study-in-uk" },
        }}
        title="Ready to take the next step?"
      />
      <Footer />
    </>
  );
}
