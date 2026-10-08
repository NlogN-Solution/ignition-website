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
        <div className="mt-8 max-w-[460px] rounded-xl border border-white/60 bg-white p-6 shadow-xl sm:mt-12 sm:p-8">
          {offering.subject && <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">{offering.subject}</p>}
          <h1 className="mt-2 text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.025em] text-navy">{offering.title}</h1>
          {university && <Link href={`/universities/${university.slug}`} className="mt-4 block text-[15px] font-semibold text-blue-link hover:underline">{university.name}</Link>}
          {place && <p className="mt-2 flex items-start gap-2 text-sm text-muted"><MapPin size={16} className="mt-0.5 shrink-0" aria-hidden />{place}</p>}
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-navy">
            {[...new Set([offering.qualification, offering.level].filter(Boolean))].map((label) => <span key={label} className="rounded-md bg-canvas px-2.5 py-1.5">{label}</span>)}
          </div>
          <StartApplicationButton courseSlug={offering.slug} tone="accent" signedInLabel="Apply for this course" className="mt-6 min-h-[48px] w-full gap-3 rounded-md px-4 py-3 text-[15px]">
            Apply for this course
          </StartApplicationButton>
        </div>
      </Container>
    </header>
  );
}
