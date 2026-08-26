import { notFound } from "next/navigation";
import {
  Building2,
  Compass,
  FileCheck2,
  Layers,
  PoundSterling,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ReadyToApply } from "@/components/apply/ReadyToApply";
import { DetailTabs } from "@/components/ui/DetailTabs";
import { CourseHero } from "@/components/courses/CourseHero";
import {
  CourseCareersPanel,
  CourseEntryPanel,
  CourseFeesPanel,
  CourseModulesPanel,
  CourseOverviewPanel,
  CourseUniversitiesPanel,
} from "@/components/courses/panels";
import { courses, getCourse } from "@/data/courses";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return courses.map((course) => ({ course: course.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ course: string }>;
}) {
  const course = getCourse((await params).course);
  if (!course) return {};

  return pageMetadata({
    title: `${course.title} ${course.qualification}`,
    description: `${course.overview} Modules, entry requirements, fees, career outcomes and the UK universities that teach it.`,
    path: `/courses/${course.id}`,
  });
}

/**
 * One course, six questions, no navigation between them.
 *
 * The old page was a single scroll with a sidebar: what you'll study, modules,
 * skills, where it leads, universities, and a rail carrying the entry
 * requirements and a spec list. Every student got the same order, so the one
 * checking whether they met the requirements — the question that decides
 * whether any of the rest matters — read three sections they had not asked for
 * to reach it, and the fees were not on the page at all.
 *
 * Same shell as the university page (`DetailTabs`), for the same reason: the
 * thing is the fixed point and the question is what changes. All six panels
 * are server-rendered and stay in the HTML, so nothing is hidden from search
 * or from a reader without JavaScript.
 */
export default async function CoursePage({
  params,
}: {
  params: Promise<{ course: string }>;
}) {
  const course = getCourse((await params).course);
  if (!course) notFound();

  const icon = { size: 15, strokeWidth: 2.2, "aria-hidden": true } as const;

  const tabs = [
    {
      id: "overview",
      label: "Course summary",
      hint: "What it is and what you'd build",
      icon: <Compass {...icon} />,
      panel: <CourseOverviewPanel course={course} />,
    },
    {
      id: "modules",
      label: "Modules",
      hint: "What you study, year by year",
      icon: <Layers {...icon} />,
      panel: <CourseModulesPanel course={course} />,
    },
    {
      id: "entry",
      label: "Entry requirements",
      hint: "What you need to get in",
      icon: <FileCheck2 {...icon} />,
      panel: <CourseEntryPanel course={course} />,
    },
    {
      id: "fees",
      label: "Fees and funding",
      hint: "Tuition where it is taught, and what is available",
      icon: <PoundSterling {...icon} />,
      panel: <CourseFeesPanel course={course} />,
    },
    {
      id: "careers",
      label: "Where it leads",
      hint: "The work this degree opens up",
      icon: <Sparkles {...icon} />,
      panel: <CourseCareersPanel course={course} />,
    },
    {
      id: "universities",
      label: "Universities",
      hint: "Where you can study it",
      icon: <Building2 {...icon} />,
      panel: <CourseUniversitiesPanel course={course} />,
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        <CourseHero course={course} />

        <DetailTabs tabs={tabs} label="Course information" />
      </main>

      <ReadyToApply
        title="Found your course?"
        intro="Compare the universities that teach it if you are still deciding. When you have made up your mind, Ignition takes it from there."
      />
      <Footer />
    </>
  );
}
