import type { BlogPost } from "@/data/blog";
import { REVALIDATE, TAG_CONTENT, get } from "./client";
import { toBlogPost, toContentPage } from "./map";
import type { ContentDto, ContentPage } from "./types";

/**
 * Reading editorial copy.
 *
 * Articles and guides come only from the admin. There is no fallback to copy
 * in code: the placeholder articles that used to fill an empty blog read as
 * real advice, so an empty CMS now shows an empty blog.
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
  if (pages.length === 0) return [];

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

  if (!match) return null;

  const page = await getContent(match.key);
  return page ? toBlogPost(page) : null;
}

/** One published guide by its slug, with its body. */
export async function getGuide(slug: string): Promise<ContentPage | null> {
  const match = (await getContentIndex("guide")).find((page) => page.slug === slug);
  return match ? getContent(match.key) : null;
}
