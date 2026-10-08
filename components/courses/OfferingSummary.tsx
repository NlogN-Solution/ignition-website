/** @jsxImportSource react */
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock, Languages, MapPin, Wallet } from "lucide-react";
import { durationLabel } from "@/data/courses";
import { isRemoteImage } from "@/lib/image";
import type { OfferingDetail } from "@/lib/api/types";

function dateLabel(value?: string) {
  if (!value) return "";
  if (!/^\d{4}-\d{2}-\d{2}/.test(value)) return value;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

export function OfferingSummary({ offering, overview }: { offering: OfferingDetail; overview?: string }) {
  const university = offering.universityProfile;
  const institution = university || offering.university;
  const intake = offering.intakes?.[0];
  const fee = offering.feeText || (offering.tuitionFee != null
    ? `${new Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 }).format(offering.tuitionFee)}${offering.currency ? ` ${offering.currency}` : ""}`
    : "");
  const location = [...new Set([offering.campus || university?.campus, offering.city || institution?.city, institution?.region].filter(Boolean))].join(", ");
  const facts = [
    { label: "Tuition fee", value: fee, icon: Wallet },
    { label: "Duration", value: offering.durationYears ? durationLabel(offering.durationYears) : offering.durationMonths ? `${offering.durationMonths} months` : "", icon: Clock },
    { label: "Apply date", value: dateLabel(intake?.applicationDeadline) || offering.keyDates?.find((date) => /application|apply|deadline/i.test(date.label))?.value || "", icon: CalendarDays },
    { label: "Start date", value: dateLabel(intake?.startDate) || offering.keyDates?.find((date) => /start|commence/i.test(date.label))?.value || offering.intake || offering.intakesSummary?.join(" · ") || "", icon: CalendarDays },
    { label: "Campus location", value: location, icon: MapPin },
    // English entry requirements do not establish the programme's teaching language.
    { label: "Taught in", value: "", icon: Languages },
  ];

  return <>
    <section aria-label="Course key facts" className="relative -mt-6 rounded-xl border border-hairline bg-white px-5 py-6 shadow-[0_4px_16px_-6px_rgba(2,15,83,0.2)] sm:px-7">
      <dl className="grid grid-cols-2 gap-x-5 gap-y-6 md:grid-cols-3 xl:grid-cols-[1.4fr_0.8fr_1fr_1fr_1.4fr_0.7fr]">
        {facts.map(({ label, value, icon: Icon }) => <div key={label} className="flex min-w-0 items-start gap-2">
          <Icon size={16} className="mt-5 shrink-0 text-muted" aria-hidden />
          <div className="min-w-0"><dt className="text-xs leading-5 text-muted">{label}</dt><dd className="min-h-5 whitespace-pre-line text-sm font-semibold leading-5 text-navy">{value}</dd>
            {label === "Tuition fee" && (offering.scholarshipText || Boolean(offering.scholarships?.length)) && <p className="mt-1 whitespace-pre-line text-xs leading-5 text-blue-link">{offering.scholarshipText || "Scholarships available"}</p>}
          </div>
        </div>)}
      </dl>
    </section>
    <div className="my-8 grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
      <section aria-labelledby="course-about-title" className="min-w-0">
        <nav aria-label="Study path" className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-5 text-muted">
          <Link href="/courses" className="hover:text-navy">All studies</Link>
          {offering.subject && <><span aria-hidden>›</span><Link href={`/courses?subject=${encodeURIComponent(offering.subject)}`} className="hover:text-navy">{offering.subject}</Link></>}
          {institution && <><span aria-hidden>›</span><Link href={`/universities/${institution.slug}`} className="hover:text-navy">{institution.name}</Link></>}
          <span aria-hidden>›</span><span className="text-navy">{offering.title}</span>
        </nav>
        <h2 id="course-about-title" className="text-[24px] font-bold tracking-[-0.015em] text-navy">About</h2>
        <p className="mt-3 min-h-6 whitespace-pre-line text-[15px] leading-7 text-ink-soft">{overview || offering.highlights?.join(" ") || ""}</p>
      </section>
      {institution && <aside aria-label="University summary" className="rounded-xl border border-hairline bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-4">
          {university?.logo && <Image src={university.logo} alt={`${institution.name} logo`} width={52} height={60} unoptimized={isRemoteImage(university.logo)} className="h-[60px] w-[52px] shrink-0 object-contain" />}
          <div className="min-w-0"><Link href={`/universities/${institution.slug}`} className="text-[15px] font-semibold leading-6 text-navy hover:underline">{institution.name}</Link>
            <p className="mt-1 text-xs leading-5 text-muted">Main campus: {[university?.campus, institution.city, institution.region].filter(Boolean).join(", ")}</p>
          </div>
        </div>
        {university?.ranking != null && <div className="mt-5 border-t border-hairline pt-4"><p className="text-lg font-bold text-navy">#{university.ranking}</p><p className="text-xs text-muted">University ranking</p></div>}
        {university?.website && <a href={university.website} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-link hover:underline">Visit university website <ArrowUpRight size={15} aria-hidden /></a>}
      </aside>}
    </div>
  </>;
}
