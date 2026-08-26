import { notFound } from "next/navigation";
import {
  FileText,
  GraduationCap,
  Info,
  MessagesSquare,
  PoundSterling,
  Route,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ReadyToApply } from "@/components/apply/ReadyToApply";
import { UniversityHero } from "@/components/universities/UniversityHero";
import { DetailTabs } from "@/components/ui/DetailTabs";
import {
  AboutPanel,
  ApplicationPanel,
  CoursesPanel,
  DocumentsPanel,
  FinancialsPanel,
  InterviewPanel,
} from "@/components/universities/panels";
import { getUniversity, universities } from "@/data/universities";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return universities.map((university) => ({ university: university.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ university: string }>;
}) {
  const university = getUniversity((await params).university);
  if (!university) return {};

  return pageMetadata({
    title: university.name,
    description: `${university.tagline} Rankings, graduate outcomes, courses, the application process, what it costs from Nepal, the documents you need and how to prepare for interview.`,
    path: `/universities/${university.id}`,
  });
}

/**
 * One university, five questions, no navigation between them.
 *
 * The old page was a single scroll: overview, courses, accommodation,
 * scholarships, support, facilities, careers, with a sidebar of figures. It
 * answered every question in a fixed order and made a student researching six
 * institutions scroll past the four things they did not want to reach the one
 * they did — and anything about applying, paying or interviewing lived on
 * entirely different pages, so comparing two universities meant holding four
 * tabs open per institution.
 *
 * Here the university is the fixed point and the question is what changes.
 * The header carries the identity on a photograph of the place; the tab bar
 * sticks under the site header; and the five panels are the five things a
 * student actually needs to know before committing three years and most of a
 * family's savings.
 *
 * There is nothing to save or compare from here. Both controls asked a student
 * to file the page away instead of reading it, and the site no longer keeps a
 * shortlist for them to file it into.
 *
 * Courses sit second, directly after About. "Do you teach my subject?" is the
 * question that decides whether the other four tabs are worth reading at all,
 * and it used to be the last block of the first tab — eight sections of
 * institutional prose down.
 */
export default async function UniversityPage({
  params,
}: {
  params: Promise<{ university: string }>;
}) {
  const university = getUniversity((await params).university);
  if (!university) notFound();

  const icon = { size: 15, strokeWidth: 2.2, "aria-hidden": true } as const;

  const tabs = [
    {
      id: "about",
      label: "About",
      hint: "The place, its record and what it teaches",
      icon: <Info {...icon} />,
      panel: <AboutPanel university={university} />,
    },
    {
      id: "courses",
      label: "Courses",
      hint: "Everything this university teaches",
      icon: <GraduationCap {...icon} />,
      panel: <CoursesPanel university={university} />,
    },
    {
      id: "applying",
      label: "Application journey",
      hint: "How to apply here, step by step",
      icon: <Route {...icon} />,
      panel: <ApplicationPanel university={university} />,
    },
    {
      id: "financials",
      label: "Financials",
      hint: "Fees, scholarships and the cost from Nepal",
      icon: <PoundSterling {...icon} />,
      panel: <FinancialsPanel university={university} />,
    },
    {
      id: "documents",
      label: "Documents",
      hint: "What to gather, and when",
      icon: <FileText {...icon} />,
      panel: <DocumentsPanel university={university} />,
    },
    {
      id: "interview",
      label: "Interview resources",
      hint: "What they ask, and how to answer it",
      icon: <MessagesSquare {...icon} />,
      panel: <InterviewPanel university={university} />,
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        <UniversityHero university={university} />

        <DetailTabs tabs={tabs} label="University information" />
      </main>

      <ReadyToApply
        title="Found the place you want to be?"
        intro="Read the application guide if you would rather do it yourself. If you would rather not, Ignition will take it from here — one advisor, from the application to the airport."
      />
      <Footer />
    </>
  );
}
