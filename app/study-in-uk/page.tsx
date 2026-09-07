import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhyUkHero } from "@/components/study-in-uk/WhyUkHero";
import { FiveReasons } from "@/components/study-in-uk/FiveReasons";
import { WorkInUk } from "@/components/study-in-uk/WorkInUk";
import { FutureCta } from "@/components/study-in-uk/FutureCta";
import { workFaqs } from "@/data/study-in-uk/work";
import { faqSchema, JsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Why study in the UK",
  description:
    "World-class education and limitless opportunities — the five reasons students choose the UK, and what international students can actually earn working during and after their degree.",
  path: "/study-in-uk",
});

/**
 * Why the UK, in three moves.
 *
 * This page used to be the site's flagship guide: eleven sections, a sticky
 * quick-nav, and a full explanation of how the UK system works end to end.
 * That page answered "how does this work" for a reader who had already
 * decided. This one answers the question that comes before it — "should I go
 * at all?" — and it answers it the way the decision is actually made: the
 * claim, the five reasons behind it, then the number the reader was too
 * polite to ask for.
 *
 * WHY WORK COMES LAST AND NOT IN A GUIDE. "Can I work?" is the question that
 * decides whether the rest of the page was worth reading, for most students
 * and for nearly every parent. Filing it under a separate guide meant the
 * people who most needed it never found it. It sits here, on the page that
 * makes the case, because the case is not honest without it.
 *
 * The mechanics — course structures, the academic year, entry requirements,
 * the visa, the whole route — are not gone; they live where they are acted
 * on. `/start` is the route end to end, `/apply/entry-requirements` is what
 * you have to meet, `/money` is what it costs.
 */
export default function StudyInUkPage() {
  return (
    <>
      <JsonLd schema={faqSchema(workFaqs)} />

      <Navbar />

      <main>
        <WhyUkHero />
        <FiveReasons id="why" />
        <WorkInUk id="work" />
        <FutureCta />
      </main>

      <Footer />
    </>
  );
}
