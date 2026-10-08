export type HomeGuide = {
  title: string;
  href: string;
  excerpt?: string;
  tag?: string;
  coverImage?: string;
  readingMinutes?: number;
};

/** Existing editorial routes; titles and summaries match their page metadata.
 * These are real guides, not placeholder CMS articles.
 */
export const existingStudyGuides: HomeGuide[] = [
  {
    title: "What studying in the UK costs",
    href: "/money",
    excerpt: "Tuition, living costs, accommodation, banking, part-time work and scholarships — how the total is built and where the money actually goes.",
    tag: "Plan your budget",
    coverImage: "/images/student-work-uk.jpg",
  },
  {
    title: "Entry requirements and the Student visa",
    href: "/apply/entry-requirements",
    excerpt: "The two sets of conditions you have to meet — what UK universities ask for (grades, subjects, international qualifications, English) and what the Home Office asks for (the ten stages of a Student visa, documents, terminology and the mistakes that cause delays).",
    tag: "Prepare to apply",
    coverImage: "/images/learning.jpg",
  },
  {
    title: "Prepare for your interview",
    href: "/apply/interviews",
    excerpt: "Why UK universities interview, what they assess, and a practice tool that gives you real questions for your subject to answer before it counts.",
    tag: "Your next stage",
    coverImage: "/images/classroom.webp",
  },
  {
    title: "Life in the UK",
    href: "/life-in-uk",
    excerpt: "The practical side of arriving — airport arrival, a first-week checklist, accommodation, healthcare, banking, transport, academic expectations and settling in.",
    tag: "Settle into student life",
    coverImage: "/images/campus-life-1.jpg",
  },
];
