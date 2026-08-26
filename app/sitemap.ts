import type { MetadataRoute } from "next";
import { careers } from "@/data/careers";
import { courses } from "@/data/courses";
import { universities } from "@/data/universities";
import { hubs } from "@/data/hubs";
import { posts } from "@/data/blog";
import { siteUrl } from "@/lib/seo";

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
  "/apply/with-ignition",
  "/visa",
  "/money",
  "/life-in-uk",
  "/resources",
  "/resources/blog",
  "/resources/guides",
  "/resources/eligibility",
  ...Object.values(hubs).map((hub) => hub.path),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const paths = [
    ...staticPaths,
    ...careers.map((career) => `/careers/${career.id}`),
    ...courses.map((course) => `/courses/${course.id}`),
    ...universities.map((university) => `/universities/${university.id}`),
    ...posts.map((post) => `/resources/blog/${post.id}`),
  ];

  return paths.map((path) => ({
    url: path === "/" ? siteUrl : `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));
}
