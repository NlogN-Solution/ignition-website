import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JourneyClose } from "@/components/apply/JourneyClose";
import { getSearchSuggestions } from "@/lib/search/api";
import { Hero } from "@/components/home/Hero";
import { CourseSearch } from "@/components/home/CourseSearch";
import { PopularCourses } from "@/components/home/PopularCourses";
import { PopularUniversities } from "@/components/home/PopularUniversities";
import { WhyUk } from "@/components/home/WhyUk";
import { WhyIgnition } from "@/components/home/WhyIgnition";
import { CommunityStat } from "@/components/home/CommunityStat";
import { LeadCapture } from "@/components/lead/LeadCapture";
import { HowToApply } from "@/components/home/HowToApply";
import { Section } from "@/components/ui/Section";
import { trustIntro } from "@/data/home/trust";
import {
  featuredCourseQueries,
  pickPopularUniversities,
} from "@/data/home/popular";
import { getUniversities, searchOfferings } from "@/lib/api/catalogue";
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

/** Course discovery and a walkthrough of the self-apply journey. */
export default async function Home() {
  const [catalogue, popularSearches, popularResults] = await Promise.all([
    getUniversities(),
    getSearchSuggestions(""),
    Promise.all(featuredCourseQueries.map((q) => searchOfferings({ q, limit: 3 }))),
  ]);

  const popularOfferings = [...new Map(
    popularResults.flatMap((result) => result.items).map((offering) => [offering.slug, offering]),
  ).values()].slice(0, 7);
  const popularUniversities = pickPopularUniversities(catalogue);

  return (
    <>
      <JsonLd schema={organizationSchema()} />
      <JsonLd schema={websiteSchema()} />

      <Navbar />
      <main>
        <Hero>
          <CourseSearch popular={popularSearches?.items ?? []} />
        </Hero>

        <HowToApply />


        <Section
          eyebrow="Popular searches"
          title="Or start from what others are asking for."
          intro="Explore courses matching popular searches, see the universities offering them and start your application."
        >
          <PopularCourses offerings={popularOfferings} />
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
