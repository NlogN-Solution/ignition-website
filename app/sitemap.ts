import type { MetadataRoute } from "next";
import { careers } from "@/data/careers";
import { hubs } from "@/data/hubs";
import { getCourses, getUniversities } from "@/lib/api/catalogue";
import { getBlogPosts, getContentIndex } from "@/lib/api/content";
import { siteUrl } from "@/lib/seo";

export const revalidate = 3600;

/** Every indexable route. /careers/quiz/results is excluded — see robots.ts. */
const staticPaths = [
  "/",
  "/start",
  "/study-in-uk",
  "/careers",
  "/careers/quiz",
  "/courses",
  "/universities",
  "/apply",
  "/apply/entry-requirements",
  "/apply/interviews",
  "/money",
  "/life-in-uk",
  "/resources",
  "/resources/blog",
  "/resources/guides",
  "/resources/eligibility",
  ...Object.values(hubs).map((hub) => hub.path),
];

/**
 * Careers are the one catalogue still written in code — they are not part of
 * the imported spreadsheet and have no CMS entity yet — so they come from
 * `data/`. Everything else is whatever the API is serving.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const [universities, courses, posts, pages] = await Promise.all([
    getUniversities(),
    getCourses(),
    getBlogPosts(),
    getContentIndex("page"),
  ]);

  const paths = [
    ...staticPaths,
    ...careers.map((career) => `/careers/${career.id}`),
    ...courses.map((course) => `/courses/${course.id}`),
    ...universities.map((university) => `/universities/${university.id}`),
    ...posts.map((post) => `/resources/blog/${post.id}`),
    ...pages.map((page) => `/${page.slug}`).filter((path) => path !== "/undefined"),
  ];

  return paths.map((path) => ({
    url: path === "/" ? siteUrl : `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));
}
