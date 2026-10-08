import { notFound } from "next/navigation";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ReadyToApply } from "@/components/apply/ReadyToApply";
import { CourseDetailsSidebar } from "@/components/courses/CourseDetailsSidebar";
import { CourseHero } from "@/components/courses/CourseHero";
import {
  CourseCareersPanel,
  CourseEntryPanel,
  CourseFeesPanel,
  CourseModulesPanel,
  CourseOverviewPanel,
  CourseOverviewCard,
  CourseUniversitiesPanel,
} from "@/components/courses/panels";
import { getCourse, getCourses, getUniversities } from "@/lib/api/catalogue";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.map((course) => ({ course: course.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ course: string }>;
}) {
  const course = await getCourse((await params).course);
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
 * Body sidebar beneath the overview card (`CourseDetailsSidebar`), for the same reason: the
 * thing is the fixed point and the question is what changes. All six panels
 * are server-rendered and stay in the HTML, so nothing is hidden from search
 * or from a reader without JavaScript.
 */
export default async function CoursePage({
  params,
}: {
  params: Promise<{ course: string }>;
}) {
  const course = await getCourse((await params).course);
  if (!course) notFound();

  // The join is by slug over one cached list rather than a request per
  // university: 44 records is a single call the whole site already makes.
  const catalogue = await getUniversities();
  const taughtAt = catalogue.filter((university) => course.universities.includes(university.id));


  const tabs = [
    {
      id: "key-information",
      label: "Key information",
      panel: <CourseOverviewCard course={course} />,
    },
    {
      id: "overview",
      label: "Overview",
      panel: <CourseOverviewPanel course={course} />,
    },
    {
      id: "modules",
      label: "Programme structure",
      panel: <CourseModulesPanel course={course} />,
    },
    {
      id: "entry",
      label: "Admission requirements",
      panel: <CourseEntryPanel course={course} taughtAt={taughtAt} />,
    },
    {
      id: "fees",
      label: "Fees and funding",
      panel: <CourseFeesPanel course={course} taughtAt={taughtAt} />,
    },
    {
      id: "careers",
      label: "Where it leads",
      panel: <CourseCareersPanel course={course} />,
    },
    {
      id: "universities",
      label: "Universities",
      panel: <CourseUniversitiesPanel course={course} taughtAt={taughtAt} />,
    },
  ];

  return (
    <>
      <Navbar />
      <main className="bg-white">
        <CourseHero course={course} />

        <div className="mx-auto w-full max-w-[908px] px-5 py-[clamp(2.5rem,4.5vw,4rem)] sm:px-8 lg:px-12">
          <section aria-label="Course overview" className="mb-10 sm:mb-14">
            <h2 className="mb-5 text-[24px] font-bold tracking-[-0.015em] text-navy">Course overview</h2>
            <CourseOverviewCard course={course} />
          </section>
          <CourseDetailsSidebar sections={tabs} />
        </div>
      </main>

      <ReadyToApply
        title="Found your course?"
        intro="Compare the universities that teach it if you are still deciding. When you have made up your mind, Ignition takes it from there."
      />
      <Footer />
    </>
  );
}
