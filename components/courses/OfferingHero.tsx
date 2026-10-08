import Link from "next/link";
import { MapPin } from "lucide-react";
import { Container } from "../ui/Container";
import { Breadcrumbs } from "../layout/Breadcrumbs";
import { StartApplicationButton } from "../apply/StartApplicationButton";
import { CourseBackground } from "./CourseBackground";
import type { OfferingDetail } from "@/lib/api/types";

export function OfferingHero({ offering }: { offering: OfferingDetail }) {
  const university = offering.university;
  const profile = offering.universityProfile;
  const place = offering.campus || offering.city || university?.city;
  return (
    <header className="relative isolate overflow-hidden bg-navy-ink">
      <CourseBackground src={profile?.heroImage || profile?.cardImage} />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-navy-ink/45 via-navy-ink/10 to-transparent" />
      <Container className="relative pb-12 pt-6 sm:pb-16">
        <Breadcrumbs tone="inverse" crumbs={[
          { label: "Home", href: "/" },
          { label: "Courses", href: "/courses" },
          ...(university ? [{ label: university.name, href: `/universities/${university.slug}` }] : []),
          { label: offering.title, href: `/courses/at/${offering.slug}` },
        ]} />
        <div data-course-hero-card className="mt-6 flex h-[340px] w-full max-w-[360px] flex-col rounded-xl border border-white/60 bg-white p-5 shadow-xl sm:mt-8">
          <p className="h-4 shrink-0 truncate text-xs font-bold uppercase tracking-[0.12em] text-muted" title={offering.subject}>{offering.subject}</p>
          <h1 tabIndex={0} className="mt-2 h-[72px] shrink-0 overflow-y-auto break-words text-xl font-bold leading-6 tracking-[-0.025em] text-navy">{offering.title}</h1>
          <div className="mt-3 h-9 shrink-0">
            {university && <Link href={`/universities/${university.slug}`} title={university.name} className="line-clamp-2 text-sm font-semibold leading-[18px] text-blue-link hover:underline">{university.name}</Link>}
          </div>
          <div className="mt-1 h-5 shrink-0">{place && <p className="flex items-center gap-2 text-sm text-muted"><MapPin size={15} className="shrink-0" aria-hidden /><span className="truncate" title={place}>{place}</span></p>}</div>
          <div className="mt-3 flex h-7 shrink-0 gap-2 overflow-hidden text-xs font-semibold text-navy">
            {[...new Set([offering.qualification, offering.level].filter(Boolean))].map((label) => <span key={label} title={label} className="min-w-0 truncate rounded-md bg-canvas px-2.5 py-1.5">{label}</span>)}
          </div>
          <StartApplicationButton courseSlug={offering.slug} tone="accent" signedInLabel="Apply for this course" className="mt-auto min-h-[44px] w-full shrink-0 gap-3 rounded-md px-4 py-2 text-sm">
            Apply for this course
          </StartApplicationButton>
        </div>
      </Container>
    </header>
  );
}
