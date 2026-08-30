import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GuideHero } from "@/components/guides/GuideHero";
import { SectionNav } from "@/components/guides/SectionNav";
import { GraduateOutcomes } from "@/components/guides/GraduateOutcomes";
import { WhyUkPanel } from "@/components/guides/WhyUkPanel";
import { HowYouLearn } from "@/components/guides/HowYouLearn";
import { DegreeStructures } from "@/components/guides/DegreeStructures";
import { AcademicYear } from "@/components/guides/AcademicYear";
import { WorkAndVisas } from "@/components/guides/WorkAndVisas";
import { JourneyRail } from "@/components/guides/JourneyRail";
import { NssSection } from "@/components/guides/NssSection";
import { StudentVoices } from "@/components/guides/StudentVoices";
import { FaqSection } from "@/components/guides/FaqSection";
import { SplitCta } from "@/components/guides/SplitCta";
import { studyUkFaqs, studyUkSections } from "@/data/guides/study-in-uk";
import { faqSchema, JsonLd, pageMetadata } from "@/lib/seo";
import campusFacade from "@/public/images/why-uk-hero.png";

export const metadata = pageMetadata({
  title: "Study in the UK",
  description:
    "How UK degrees are structured, how long they take, how the academic year works and what the whole route looks like — from choosing a subject to your first week on campus.",
  path: "/study-in-uk",
});

/**
 * The flagship guide.
 *
 * It is built from full-width sections rather than from the `GuideLayout`
 * two-column shell the shorter guides use. That shell puts everything inside
 * one reading column with a sticky index beside it, which is right for a page
 * that is mostly prose — but this page is mostly *structure*: a timeline, a
 * rail, a comparison of four degree shapes, a survey broken into seven
 * themes. Those need the full measure, and the index they need is horizontal
 * and always visible, not a column that vanishes below `xl`.
 *
 * ORDER OF THE PAGE. Outcomes come immediately after the hero, before any
 * explanation of how the system works, because "where does this lead" is the
 * question that decides whether the next ten minutes are worth spending.
 * Everything after that runs in the order a student meets it: why the UK, how
 * they will be taught, what the degrees are, when the year runs, what they can
 * do for work during and after it, how to judge a course once they are
 * choosing between them, the whole route end to end, and finally what other
 * students found and the questions.
 *
 * The journey rail closes the guide's argument rather than interrupting it.
 * It sat before the NSS at first, which put a map of the next twelve months
 * in front of a reader still deciding whether the UK is for them; after the
 * survey it lands on someone who has decided, and answers "so what do I
 * actually do next".
 *
 * There is no "what you'll learn on this page" block. One was built and cut:
 * with the sticky rail directly above it, it restated the same eight
 * destinations twice within a screen of each other and pushed the argument
 * down the page for a reader who had already decided to read.
 *
 * DATA HONESTY. Three sections show figures that do not exist yet — outcomes,
 * NSS and student voices. Each renders the site's standard "Example data"
 * badge and a standing note, driven by flags in its own data file, so
 * replacing the placeholders is a data edit rather than a component edit. See
 * the headers of `data/guides/outcomes.ts`, `data/guides/nss.ts` and
 * `data/guides/student-voices.ts`.
 *
 * `WorkAndVisas` is the exception on this page: it states real wage and
 * immigration figures rather than deferring to gov.uk, because "can I work?"
 * and "can I stay?" have no useful answer without them. Every figure there
 * carries a government source link and the section carries the date it was
 * last checked. The review checklist is in the header of
 * `data/guides/beyond-the-degree.ts` — the two-year Graduate visa row expires
 * on 31 December 2026.
 */
export default function StudyInUkPage() {
  return (
    <>
      <JsonLd
        schema={faqSchema(
          studyUkFaqs.map((f) => ({ question: f.question, answer: f.answer })),
        )}
      />
      <Navbar />

      <main>
        <GuideHero
          eyebrow="Study in the UK"
          title="Everything you need to know about studying in the UK."
          intro="What a UK degree actually involves — how the system is structured, how long courses take, how the year is organised, and what the whole route looks like from here to your first week on campus."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Study in the UK", href: "/study-in-uk" },
          ]}
          image={campusFacade}
          imageAlt="The portico of a historic UK university building under a clear sky."
          imagePosition="52% 42%"
        />

        <SectionNav sections={studyUkSections} />

        <GraduateOutcomes id="outcomes" />

        <WhyUkPanel id="why" />
        <HowYouLearn id="learning" />
        <DegreeStructures id="structures" />
        <AcademicYear id="year" />
        <WorkAndVisas id="work" />
        <NssSection id="nss" />
        <JourneyRail id="journey" />
        <StudentVoices id="voices" />
        <FaqSection id="faqs" items={studyUkFaqs} />
      </main>

      <SplitCta />
      <Footer />
    </>
  );
}
