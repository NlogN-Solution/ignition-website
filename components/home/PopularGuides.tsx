import { ArrowUpRight, BookOpen } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { ArrowButton } from "@/components/ui/ArrowButton";
import type { ContentPage } from "@/lib/api/types";
import { existingStudyGuides, type HomeGuide } from "@/data/home/guides";
import { HorizontalCardRail } from "./HorizontalCardRail";

/** Published CMS guides, using the same compact rail as course discovery. */
export function PopularGuides({ guides }: { guides: ContentPage[] }) {
  const published: HomeGuide[] = guides.filter((guide) => guide.slug).slice(0, 8).map((guide) => ({
    title: guide.title,
    href: `/resources/guides/${guide.slug}`,
    excerpt: guide.excerpt,
    tag: guide.tag,
    coverImage: guide.coverImage,
    readingMinutes: guide.readingMinutes,
  }));
  const cards = published.length ? published : existingStudyGuides;

  return (
    <div>
        <HorizontalCardRail label="Study guides" reverse>
          {cards.map((guide) => (
            <li key={guide.href} dir="ltr" className="min-w-0 shrink-0 basis-[85%] sm:basis-[320px]">
              <Card href={guide.href} className="h-[370px] overflow-hidden">
                {guide.coverImage?.startsWith("/") ? (
                  <div className="relative h-[140px] shrink-0">
                    <Image src={guide.coverImage} alt="" fill sizes="(min-width: 640px) 320px, 85vw" className="object-cover" />
                  </div>
                ) : guide.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element -- CMS-hosted cover, matching the guide index
                  <img src={guide.coverImage} alt="" loading="lazy" className="h-[140px] w-full shrink-0 object-cover" />
                ) : (
                  <div aria-hidden className="flex h-[140px] shrink-0 items-center justify-center border-b border-hairline bg-canvas text-navy/40">
                    <BookOpen size={40} strokeWidth={1.2} />
                  </div>
                )}
                <div className="flex min-h-0 flex-1 flex-col p-5">
                  <p className="truncate text-[11px] font-bold uppercase tracking-[0.1em] text-muted">
                    {guide.tag || "Study guide"}
                    {guide.readingMinutes ? ` · ${guide.readingMinutes} min read` : ""}
                  </p>
                  <h3 className="mt-2 line-clamp-2 font-display text-[18px] font-bold leading-[1.3] text-navy">{guide.title}</h3>
                  {guide.excerpt ? <p className="mt-2 line-clamp-2 text-[14px] font-medium leading-[1.55] text-muted">{guide.excerpt}</p> : null}
                  <span className="mt-auto inline-flex items-center gap-2 pt-4 text-[14px] font-bold text-navy">
                    Read the guide <ArrowUpRight size={16} aria-hidden />
                  </span>
                </div>
              </Card>
            </li>
          ))}
        </HorizontalCardRail>
      <ArrowButton href="/resources/guides" className="mt-7 min-h-[44px] px-5 text-[14px]">Browse all guides</ArrowButton>
    </div>
  );
}
