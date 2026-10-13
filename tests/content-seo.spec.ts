import { test, expect } from "@playwright/test";
import { pageMetadata } from "../lib/seo";
import { toBlogPost } from "../lib/api/map";
import type { ContentPage } from "../lib/api/types";

test("article mapping preserves the saved SEO brief and metadata overrides", () => {
  const page: ContentPage = {
    key: "post.visa", kind: "post", slug: "student-visa", title: "Visa guide",
    excerpt: "Application advice", related: [], blocks: [],
    seo: { primaryKeyword: "UK student visa", secondaryKeywords: ["visa documents"],
      title: "UK student visa guide", description: "Documents and application steps",
      ogImage: "https://example.com/visa.jpg", noindex: true },
  };
  const post = toBlogPost(page);
  const metadata = pageMetadata({ title: post.title, description: post.excerpt,
    path: `/resources/blog/${post.id}`, seo: post.seo });
  expect(post.seo).toEqual(page.seo);
  expect(metadata.title).toBe("UK student visa guide");
  expect(metadata.description).toBe("Documents and application steps");
  expect(metadata.openGraph).toMatchObject({ images: ["https://example.com/visa.jpg"] });
  expect(metadata.robots).toEqual({ index: false, follow: true });
  expect(metadata.keywords).toBeUndefined();
});

test("a keyword-only brief keeps editorial titles and defaults intact", () => {
  const metadata = pageMetadata({ title: "Visa guide", description: "Application advice",
    path: "/resources/guides/visa", seo: { primaryKeyword: "UK student visa",
      secondaryKeywords: ["visa documents"], title: "  ", description: "", noindex: false } });
  expect(metadata.title).toBe("Visa guide");
  expect(metadata.description).toBe("Application advice");
  expect(metadata.robots).toBeUndefined();
  expect(metadata.keywords).toBeUndefined();
  expect(metadata.alternates?.canonical).toMatch(/\/resources\/guides\/visa$/);
});
