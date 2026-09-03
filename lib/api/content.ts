import { posts as fallbackPosts } from "@/data/blog";
import type { BlogPost } from "@/data/blog";
import { REVALIDATE, TAG_CONTENT, get } from "./client";
import { toBlogPost, toContentPage } from "./map";
import type { ContentDto, ContentPage } from "./types";

/**
 * Reading editorial copy.
 *
 * Same fallback rule as the catalogue: an entity with no rows yet keeps
 * rendering what `data/` holds. Guides and articles are written in the admin
 * one at a time, so the interesting state is not "the API is down" but "nobody
 * has migrated this page yet", and both have to degrade to the same place.
 */

interface ListEnvelope<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

/** One page by its key — `guide.visa`, `home.hero`. */
export async function getContent(key: string): Promise<ContentPage | null> {
  const dto = await get<ContentDto>(`/public/content/${encodeURIComponent(key)}`, {
    revalidate: REVALIDATE.content,
    tags: [TAG_CONTENT],
  });

  return dto ? toContentPage(dto) : null;
}

/** The index behind `/resources/guides` and the blog listing. */
export async function getContentIndex(kind: string): Promise<ContentPage[]> {
  const response = await get<ListEnvelope<ContentDto>>("/public/content", {
    revalidate: REVALIDATE.content,
    tags: [TAG_CONTENT],
    params: { kind, limit: 100 },
  });

  return response ? response.items.map(toContentPage) : [];
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const pages = await getContentIndex("post");
  if (pages.length === 0) return fallbackPosts;

  // The index omits blocks, so each post is fetched for its body. There are a
  // handful of these and the listing is cached; a bulk endpoint that returned
  // every article's full text would be the wrong shape for the one page that
  // needs it.
  const full = await Promise.all(pages.map((page) => getContent(page.key)));
  return full.filter((page): page is ContentPage => page !== null).map(toBlogPost);
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const pages = await getContentIndex("post");
  const match = pages.find((page) => page.slug === slug);

  // The fixtures answer only when the API has no articles at all — see
  // `getUniversity` in `lib/api/catalogue.ts` for why.
  if (!match) return pages.length === 0 ? (fallbackPosts.find((post) => post.id === slug) ?? null) : null;

  const page = await getContent(match.key);
  return page ? toBlogPost(page) : null;
}
