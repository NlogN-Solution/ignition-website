import { ArrowUpRight, BookOpen } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { ArrowButton } from "@/components/ui/ArrowButton";
import type { ContentPage } from "@/lib/api/types";
import { HorizontalCardRail } from "./HorizontalCardRail";

/** Latest published blog articles, read from the CMS index without fetching bodies. */
export function PopularArticles({ articles }: { articles: ContentPage[] }) {
  const cards = articles
    .filter((article) => article.slug)
    .sort((a, b) => (b.published ?? "").localeCompare(a.published ?? ""))
    .slice(0, 8);

  return (
    <div>
      {cards.length ? (
        <HorizontalCardRail label="Articles" reverse>
          {cards.map((article) => (
            <li key={article.slug} dir="ltr" className="min-w-0 shrink-0 basis-[85%] sm:basis-[320px]">
              <Card href={`/resources/blog/${article.slug}`} className="h-[370px] overflow-hidden">
                {article.coverImage?.startsWith("/") ? (
                  <div className="relative h-[140px] shrink-0">
                    <Image src={article.coverImage} alt="" fill sizes="(min-width: 640px) 320px, 85vw" className="object-cover" />
                  </div>
                ) : article.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element -- CMS-hosted article cover
                  <img src={article.coverImage} alt="" loading="lazy" className="h-[140px] w-full shrink-0 object-cover" />
                ) : (
                  <div aria-hidden className="flex h-[140px] shrink-0 items-center justify-center border-b border-hairline bg-canvas text-navy/40">
                    <BookOpen size={40} strokeWidth={1.2} />
                  </div>
                )}
                <div className="flex min-h-0 flex-1 flex-col p-5">
                  <p className="truncate text-[11px] font-bold uppercase tracking-[0.1em] text-muted">
                    {article.tag || "Article"}
                    {article.readingMinutes ? ` · ${article.readingMinutes} min read` : ""}
                  </p>
                  <h3 className="mt-2 line-clamp-2 font-display text-[18px] font-bold leading-[1.3] text-navy">{article.title}</h3>
                  {article.excerpt ? <p className="mt-2 line-clamp-2 text-[14px] font-medium leading-[1.55] text-muted">{article.excerpt}</p> : null}
                  <span className="mt-auto inline-flex items-center gap-2 pt-4 text-[14px] font-bold text-navy">
                    Read the article <ArrowUpRight size={16} aria-hidden />
                  </span>
                </div>
              </Card>
            </li>
          ))}
        </HorizontalCardRail>
      ) : (
        <p className="text-sm text-muted">No articles available yet. Check back soon.</p>
      )}
      <ArrowButton href="/resources/blog" className="mt-7 min-h-[44px] px-5 text-[14px]">Explore all articles</ArrowButton>
    </div>
  );
}
