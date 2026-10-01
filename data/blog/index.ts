/**
 * The blog's shape. Articles themselves are written in the admin (Website ▸
 * Blog) and served by the API — there are no articles in code any more, so an
 * empty CMS shows an empty blog rather than placeholder posts.
 */

export type BlogSection = {
  heading: string;
  paragraphs: string[];
  /** Rendered as a bulleted list under the paragraphs. */
  points?: string[];
};

export type BlogPost = {
  id: string;
  title: string;
  /** One or two sentences. Used on the index and as the meta description. */
  excerpt: string;
  /** ISO date. Displayed as a long date in en-GB. */
  published: string;
  readingMinutes: number;
  /** The category an editor picked, if any. */
  tag?: string;
  coverImage?: string;
  /** The body written in the admin's editor, sanitised. Preferred when set. */
  bodyHtml?: string;
  /** Older block-built articles: the lead paragraph, then headed sections. */
  standfirst: string;
  sections: BlogSection[];
  /** Official publisher this post defers to, where it touches a regulated topic. */
  source?: { label: string; href: string };
  related: { label: string; href: string }[];
};

export function formatPostDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
