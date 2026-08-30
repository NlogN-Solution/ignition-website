import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Columns3,
  FileBadge,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { Container } from "../ui/Container";
import { AccentText } from "../ui/AccentText";
import { degreeStructures, type DegreeStructure } from "@/data/guides/study-in-uk";
import undergraduate from "@/public/images/undergraduate-degree.jpeg";
import foundation from "@/public/images/foundational-years.jpeg";
import integrated from "@/public/images/integrated-masters.jpeg";
import postgraduate from "@/public/images/postgraduate-taught.jpeg";

/**
 * The four shapes a student will actually meet when browsing UK courses.
 *
 * WHAT THE CARD IS FOR. Someone reading this row is comparing, not reading —
 * they want length, qualification and who it suits across four options
 * without working through four paragraphs. So those three facts sit above the
 * prose, and the prose is one sentence that says only what they cannot.
 *
 * HOW IT GOT SHORTER. The cards used to carry the duration in the spec list
 * *and* restate it in the first line of the body ("three years in England,
 * Wales and Northern Ireland" under a row already reading "3 years — 4 in
 * Scotland"). Cutting the duplication took a third off the height, which is
 * what paid for the photograph. The length now lives on the picture as a
 * pill, so the spec list is two rows rather than three.
 *
 * The icon plate matches the one on the learning cards exactly — solid navy
 * rather than glass, bottom-left of the image — because both rows sit on the
 * same page and should read as the same component family.
 */

const icons: Record<DegreeStructure["icon"], LucideIcon> = {
  cap: GraduationCap,
  book: BookOpen,
  columns: Columns3,
  certificate: FileBadge,
};

const photos: Record<DegreeStructure["id"], StaticImageData> = {
  undergraduate,
  foundation,
  integrated,
  postgraduate,
};

export function DegreeStructures({ id }: { id: string }) {
  return (
    <section
      id={id}
      className="scroll-mt-[calc(var(--nav-h)_+_4.5rem)] border-y border-hairline bg-white py-[clamp(2.75rem,4.5vw,4.5rem)]"
    >
      <Container>
        <div className="max-w-[62ch]">
          <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-blue-link">
            Degree types
          </p>
          <h2 className="mt-3 text-[clamp(1.625rem,2.8vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-navy">
            <AccentText>How UK degrees are structured</AccentText>
          </h2>
          <p className="mt-4 text-[16px] font-medium leading-[1.6] text-muted">
            Course names can be misleading between countries. These are the
            shapes you will actually encounter when browsing UK courses.
          </p>
        </div>

        <ul className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {degreeStructures.map((degree) => {
            const Icon = icons[degree.icon];

            return (
              <li key={degree.id} className="min-w-0">
                <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-hairline bg-white shadow-[0_18px_40px_-30px_rgba(1,22,111,0.3)] transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-[3px] hover:border-ring-idle hover:shadow-[0_26px_50px_-26px_rgba(1,22,111,0.35)]">
                  <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden">
                    <Image
                      src={photos[degree.id]}
                      alt=""
                      aria-hidden
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 290px"
                      style={{ objectPosition: degree.imagePosition }}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />

                    {/* The veil does two jobs: it ties four unrelated stock
                        photographs into one row, and it gives the duration
                        pill and the icon plate a ground they can rely on
                        whatever the picture behind them is doing. */}
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-[linear-gradient(to_top,rgba(1,22,111,0.72),rgba(1,22,111,0.1)_62%,rgba(1,22,111,0))]"
                    />

                    <span
                      aria-hidden
                      className="absolute bottom-3 left-3 flex size-[34px] items-center justify-center rounded-[10px] border border-white/20 bg-navy/90 text-white shadow-[0_6px_16px_-6px_rgba(1,22,111,0.8)]"
                    >
                      <Icon size={16} strokeWidth={2} />
                    </span>

                    {/* Length lives on the picture rather than in the spec
                        list below. It is the fact students compare first, and
                        moving it here is what let the list drop to two rows.

                        Top-right, not bottom-right: the longest of the four
                        strings ran into the icon plate on the same line. The
                        veil is weakest up here, so the pill is opaque white
                        rather than translucent. */}
                    <p className="absolute right-3 top-3 rounded-lg bg-white px-[9px] py-[4px] text-[11.5px] font-bold leading-[1.3] text-navy shadow-[0_4px_12px_-4px_rgba(1,22,111,0.5)]">
                      {degree.duration}
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-[16.5px] font-bold leading-[1.25] tracking-[-0.015em] text-navy">
                      {degree.title}
                    </h3>

                    <dl className="mt-[13px] space-y-[7px] border-y border-hairline py-[11px]">
                      {[
                        ["Leads to", degree.qualification],
                        ["Best for", degree.bestFor],
                      ].map(([label, value]) => (
                        <div key={label} className="flex gap-[10px]">
                          <dt className="w-[58px] shrink-0 text-[10.5px] font-bold uppercase tracking-[0.03em] text-muted-light">
                            {label}
                          </dt>
                          <dd className="min-w-0 flex-1 text-[13px] font-semibold leading-[1.4] text-ink">
                            {value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <p className="mt-[12px] text-[14px] font-medium leading-[1.55] text-muted">
                      {degree.body}
                    </p>

                    <Link
                      href={degree.cta.href}
                      className="mt-auto inline-flex items-center gap-[8px] pt-4 text-[13.5px] font-bold text-blue-link transition-colors duration-200 hover:text-navy"
                    >
                      {degree.cta.label}
                      <ArrowRight
                        size={14}
                        strokeWidth={2.4}
                        aria-hidden
                        className="shrink-0 transition-transform duration-200 group-hover:translate-x-[3px]"
                      />
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
