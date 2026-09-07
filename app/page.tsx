import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JourneyClose } from "@/components/apply/JourneyClose";
import { Hero } from "@/components/home/Hero";
import { CourseSearch } from "@/components/home/CourseSearch";
import { WhyUk } from "@/components/home/WhyUk";
import { WhyIgnition } from "@/components/home/WhyIgnition";
import { IntentCards } from "@/components/home/IntentCards";
import { JourneySelector } from "@/components/journey/JourneySelector";
import { LeadCapture } from "@/components/lead/LeadCapture";
import { JourneyPipeline } from "@/components/journey/JourneyPipeline";
import { Section } from "@/components/ui/Section";
import { trustIntro } from "@/data/home/trust";
import { getCourses, getUniversities } from "@/lib/api/catalogue";
import { siteName, siteTagline, siteUrl } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: `${siteName} — ${siteTagline}` },
  description:
    "Search UK undergraduate, postgraduate and top-up courses, discover the right career, compare universities, understand how to apply and prepare for your journey to the UK.",
  alternates: { canonical: siteUrl },
};

/**
 * The homepage answers four questions in the order a student asks them.
 *
 * 1. "Do you have my course?" — the search, directly under the hero, because
 *    a student who arrives with a subject in mind should not have to navigate
 *    to find out. This is where every UK study site puts it and the pattern is
 *    recognised before it is read.
 * 2. "Why the UK at all?" — three cards, the one saturated block on the page,
 *    for the students who have not settled that yet. Shorter degrees, the
 *    universities at the top of the world tables, and the fact that teaching,
 *    research and standards are all checked by someone other than the
 *    university itself.
 * 3. "Where do I start?" — the entry points, then the journey selector, then
 *    the end-to-end pipeline, and the adviser form last.
 *
 * The adviser form used to sit directly under the journey selector, on the
 * reasoning that asking for a phone number is easier once the student has just
 * been given something. That reasoning still holds; what was wrong was where
 * it left the pipeline. The form is the largest request on the page, and
 * putting it mid-scroll made the two sections after it read as afterthoughts.
 * It now closes the page instead: a student who has scrolled past the whole
 * journey has seen everything Ignition does, which is a better moment to ask
 * than four sections earlier.
 *
 * The entry-point grid no longer carries "Find a course": the search above it
 * does that job better, and offering the same destination twice on one screen
 * makes the second offer read as a different thing than it is.
 */
export default async function Home() {
  const [catalogue, courses] = await Promise.all([getUniversities(), getCourses()]);

  // Slimmed here rather than in the component: what crosses to the browser is
  // what the search box matches on, not the records behind it.
  const universitySuggestions = catalogue.map((university) => ({
    id: university.id,
    name: university.name,
    city: university.city,
    region: university.region,
  }));
  const courseSuggestions = courses.map((course) => ({
    id: course.id,
    title: course.title,
    qualification: course.qualification,
    subject: course.subject,
    level: course.level,
    outcomes: course.careerOutcomes,
  }));

  return (
    <>
      <Navbar />
      <main>
        <Hero />

        <CourseSearch universities={universitySuggestions} courses={courseSuggestions} />

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
          eyebrow="Start anywhere"
          title="What do you need help with?"
          intro="Five ways in. Pick whichever matches the question you actually have right now — you can come back for the rest."
        >
          <IntentCards />
        </Section>

        <Section
          id="journey"
          eyebrow="Your journey"
          title="Where are you in your UK journey?"
          intro="Tell us where you are and we'll show you what to do next, in the right order — with nothing you don't need yet."
          surface
        >
          <JourneySelector />
        </Section>

        <Section
          eyebrow="End to end"
          title="From first idea to first week."
          intro="Ignition covers the whole route to a UK university — not just the application. Every stage connects to the next."
        >
          <JourneyPipeline />
        </Section>

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
