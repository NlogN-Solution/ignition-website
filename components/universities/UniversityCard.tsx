import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { universityImagery } from "@/data/universities/imagery";
import type { University } from "@/data/universities";
import { isExampleRecord } from "@/lib/api/catalogue";
import { whatsappUrl } from "@/lib/config";

/**
 * Three photographs rather than one, because a single wide image reads as
 * generic stock in a way that a small mosaic does not — it is closer to what
 * a student sees browsing an institution's own gallery. The big frame carries
 * the card image every other surface already uses; the two stacked frames
 * borrow the first two campus shots from the gallery, so no new imagery is
 * needed to show three photos instead of one.
 *
 * The logo sits in its own circular badge over the seam between the images,
 * which is what stops a three-photo header from reading as an unrelated
 * collage — it gives the eye one fixed point to land on before it reads the
 * name.
 *
 * DETAILS and APPLY NOW are two real destinations rather than one card-wide
 * link, so the card no longer uses `CardLink`'s stretched overlay — a button
 * for "look at this" and a button for "start this" are different intentions.
 * APPLY NOW opens WhatsApp with the university's name already in the message,
 * the same "talk to an adviser" pattern used elsewhere on the site, rather
 * than sending a reader straight into the portal's registration flow.
 */
export function UniversityCard({ university }: { university: University }) {
  const { card, gallery } = universityImagery(university.id);
  const [second, third] = gallery;

  return (
    <Card interactive className="h-full overflow-hidden">
      <div className="relative grid h-[188px] grid-cols-[1.55fr_1fr] grid-rows-2 gap-[2px] bg-navy/5 sm:h-[206px]">
        <div className="relative row-span-2 overflow-hidden">
          <Image
            src={card}
            alt=""
            aria-hidden
            fill
            sizes="(min-width: 1024px) 270px, (min-width: 640px) 210px, 60vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
        <div className="relative overflow-hidden">
          <Image
            src={second?.src ?? card}
            alt=""
            aria-hidden
            fill
            sizes="(min-width: 1024px) 170px, (min-width: 640px) 140px, 40vw"
            className="object-cover"
          />
        </div>
        <div className="relative overflow-hidden">
          <Image
            src={third?.src ?? card}
            alt=""
            aria-hidden
            fill
            sizes="(min-width: 1024px) 170px, (min-width: 640px) 140px, 40vw"
            className="object-cover"
          />
        </div>

        {isExampleRecord(university) ? (
          <Badge tone="demo" className="absolute right-3 top-3">
            Example data
          </Badge>
        ) : null}
      </div>

      <div className="relative flex flex-1 flex-col px-5 pb-5 sm:px-6 sm:pb-6">
        <span className="relative -mt-[30px] flex size-[64px] shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] border-white bg-white shadow-[0_14px_30px_-16px_rgba(2,15,83,0.55)] sm:size-[72px]">
          {university.logo ? (
            <Image
              src={university.logo}
              alt=""
              aria-hidden
              fill
              sizes="72px"
              className="object-contain p-[16%]"
            />
          ) : (
            <span aria-hidden className="text-[15px] font-bold tracking-[0.02em] text-navy">
              {university.monogram ?? university.name.slice(0, 2).toUpperCase()}
            </span>
          )}
        </span>

        <h3 className="mt-4 flex items-start gap-[7px] text-[18px] font-bold leading-[1.25] tracking-[-0.01em] text-navy sm:text-[19px]">
          <Link href={`/universities/${university.id}`} className="transition-colors duration-200 hover:text-blue-link">
            {university.name}
          </Link>
          <ExternalLink
            size={14}
            strokeWidth={2.4}
            aria-hidden
            className="mt-[4px] shrink-0 text-muted-light"
          />
        </h3>

        <p className="mt-[8px] text-[14px] font-medium leading-[1.5] text-muted">
          {university.city}, {university.region}
        </p>

        <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
          <Link
            href={`/universities/${university.id}`}
            className="inline-flex h-[46px] items-center justify-center rounded-[10px] border border-navy text-[13px] font-bold uppercase tracking-[0.03em] text-navy transition-colors duration-200 hover:bg-navy/[0.06]"
          >
            Details
          </Link>
          <a
            href={whatsappUrl(university.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="group/apply inline-flex h-[46px] items-center justify-center gap-[6px] rounded-[10px] bg-orange text-[13px] font-bold uppercase tracking-[0.03em] text-white transition-[background-color,box-shadow] duration-200 hover:brightness-[0.94] hover:shadow-[0_10px_30px_-12px_rgba(252,90,7,0.7)]"
          >
            Apply now
            <ArrowUpRight
              size={14}
              strokeWidth={2.4}
              aria-hidden
              className="shrink-0 transition-transform duration-200 group-hover/apply:translate-x-[2px] group-hover/apply:-translate-y-[2px]"
            />
          </a>
        </div>
      </div>
    </Card>
  );
}
