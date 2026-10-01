import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JourneyClose } from "@/components/apply/JourneyClose";
import { Hero } from "@/components/home/Hero";
import { CourseSearch } from "@/components/home/CourseSearch";
import { WhyUk } from "@/components/home/WhyUk";
import { WhyIgnition } from "@/components/home/WhyIgnition";
import { IntentCards } from "@/components/home/IntentCards";
import { CommunityStat } from "@/components/home/CommunityStat";
import { NextStep } from "@/components/journey/NextStep";
import { LeadCapture } from "@/components/lead/LeadCapture";
import { JourneyPipeline } from "@/components/journey/JourneyPipeline";
import { Section } from "@/components/ui/Section";
import { trustIntro } from "@/data/home/trust";
import { getCourses, getUniversities } from "@/lib/api/catalogue";
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
 * 3. "Where do I start?" — the entry points, then the end-to-end route, then
 *    the next step, then `CommunityStat` ("will I be alone"), and the
 *    adviser form last. Everything from the entry points onward is rational —
 *    a map, a next action, a claim. None of it answers the one question a
 *    reader who is otherwise convinced still hesitates on, so `CommunityStat`
 *    closes on it, in sourced numbers rather than sentiment, immediately
 *    before asking the reader to leave their number. The same section, same
 *    reasoning, closes `/study-in-uk` right before its own CTA.
 *
 * THE ROUTE COMES BEFORE THE NEXT-STEP PANEL, NOT AFTER. What used to sit
 * here was a section asking "Where are you in your UK journey?" above a
 * section showing the journey — a question about a map printed before the
 * map, which is backwards for the same reason it still is now: you cannot
 * sensibly point someone at "the one thing worth doing next" until they have
 * seen the full shape of what's ahead of them. The route runs first, so
 * `NextStep`'s recommendation — and the one-click "I'm here" marker inside
 * `JourneyPipeline` itself — both land on a map the reader has already been
 * shown, not one still below the fold.
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
      <JsonLd schema={organizationSchema()} />
      <JsonLd schema={websiteSchema()} />

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
          id="route"
          eyebrow="End to end"
          title="From first idea to first week."
          intro="The whole route to a UK university — not just the application. Mark the chapter you're in and the step below starts from there."
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
