import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Personal to a single browser and empty for anyone else.
      disallow: ["/careers/quiz/results"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
