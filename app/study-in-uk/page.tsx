import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhyUkHero } from "@/components/study-in-uk/WhyUkHero";
import { PageJumpNav } from "@/components/study-in-uk/PageJumpNav";
import { FiveReasons } from "@/components/study-in-uk/FiveReasons";
import { DestinationCompare } from "@/components/study-in-uk/DestinationCompare";
import { WorkInUk } from "@/components/study-in-uk/WorkInUk";
import { WorkFaq } from "@/components/study-in-uk/WorkFaq";
import { CommunityStat } from "@/components/home/CommunityStat";
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
 * Why the UK, argued in order.
 *
 * This page used to be the site's flagship guide: eleven sections, a sticky
 * quick-nav, and a full explanation of how the UK system works end to end.
 * That page answered "how does this work" for a reader who had already
 * decided. This one answers the questions that come before it, in the order
 * they actually get asked: the claim, the five reasons behind it, the
 * competing offer from another country, the number the reader was too polite
 * to ask for, the objections that survive all of the above, and — last,
 * deliberately — the fear no spreadsheet answers: will I be doing this alone.
 *
 * WHY WORK COMES BEFORE THE FAQ AND NOT IN A GUIDE. "Can I work?" is the
 * question that decides whether the rest of the page was worth reading, for
 * most students and for nearly every parent. Filing it under a separate guide
 * meant the people who most needed it never found it. It sits here, on the
 * page that makes the case, because the case is not honest without it.
 *
 * WHY THE COMPARISON EXISTS. `FiveReasons` argues studying in the UK is a
 * good decision; it never argues the UK over the USA, Australia or Canada —
 * and for most families holding more than one offer, that comparison is the
 * decision actually being made. `DestinationCompare` is the one place on the
 * site that makes it, on the two dimensions that move the numbers most:
 * course length and the post-study work route.
 *
 * WHY `CommunityStat` COMES LAST, RIGHT BEFORE THE CTA. Every section before
 * it proves a claim, compares an offer, states a fact or answers an
 * objection — all rational. None of them touch the reason a decided reader
 * still hesitates: not "is this worth it" but "will I be alone". It closes
 * the case on that note, in numbers rather than sentiment, immediately before
 * asking the reader to act.
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
        <PageJumpNav />
        <FiveReasons id="why" />
        <DestinationCompare id="compare" />
        <WorkInUk id="work" />
        <WorkFaq id="faq" />
        <CommunityStat />
        <FutureCta />
      </main>

      <Footer />
    </>
  );
}
