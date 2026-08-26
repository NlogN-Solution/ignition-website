import Image from "next/image";
import { MapPin } from "lucide-react";
import { Container } from "../ui/Container";
import { Breadcrumbs } from "../layout/Breadcrumbs";
import { UniversityLogo } from "./UniversityLogo";
import { universityImagery } from "@/data/universities/imagery";
import type { University } from "@/data/universities";

/**
 * The page header, on a photograph of the place.
 *
 * A university is somewhere a student is deciding to live for three years, and
 * the old header — a monogram, a name and four lines of metadata on white —
 * gave them nothing to picture.
 *
 * WHY THE WASH IS AS LIGHT AS IT IS. The first version stacked three darkening
 * layers: the image at 62% opacity, a flat navy multiply over it and a
 * gradient that reached full navy at the bottom. Each was defensible alone and
 * together they left a photograph nobody could see — the block read as a navy
 * band that happened to have texture in it. There is one gradient now, heavy
 * only in the bottom third where the type actually sits, plus a soft wash from
 * the left for the same reason. The picture is the point of the block; the
 * washes are there to keep type legible and nothing else.
 *
 * The source images are 500px wide stock (see data/universities/imagery.ts),
 * so this band is deliberately short. Soft reads as atmosphere at this height;
 * it would read as a broken asset across a full-height hero.
 */
export function UniversityHero({ university }: { university: University }) {
  const { hero } = universityImagery(university.id);

  return (
    <header className="relative isolate flex min-h-[clamp(340px,34vw,420px)] flex-col overflow-hidden bg-navy-ink">
      <Image
        src={hero}
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Bottom-weighted, and it ramps rather than steps: the top two thirds
          of the band stay close to the photograph, and the wash only becomes
          heavy in the strip the type actually occupies. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,15,83,0.9)_0%,rgba(2,15,83,0.62)_28%,rgba(2,15,83,0.22)_62%,rgba(2,15,83,0.06)_100%)]"
      />
      {/* And a light one from the left, so the name and the breadcrumbs keep
          their contrast over a bright patch of sky or stonework. Between these
          and the type shadows, the type holds up without the picture being
          buried. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(2,15,83,0.55)_0%,rgba(2,15,83,0.12)_45%,rgba(2,15,83,0)_75%)]"
      />

      <Container className="relative flex flex-1 flex-col pb-[clamp(1.5rem,2.5vw,2.25rem)] pt-6 lg:pt-7">
        <Breadcrumbs
          tone="inverse"
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Universities", href: "/universities" },
            { label: university.name, href: `/universities/${university.id}` },
          ]}
        />

        <div className="mt-auto flex flex-col gap-5 pt-[clamp(2rem,5vw,3.25rem)] sm:flex-row sm:items-end sm:gap-6">
          <UniversityLogo university={university} size="md" tone="onImage" />

          <div className="min-w-0 flex-1">
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] font-semibold text-white/80 [text-shadow:0_1px_12px_rgba(2,15,83,0.6)]">
              <MapPin
                size={14}
                strokeWidth={2.4}
                aria-hidden
                className="shrink-0 text-orange"
              />
              {university.city}
              <Separator />
              {university.region}
              {university.kind ? (
                <>
                  <Separator />
                  {university.kind}
                </>
              ) : null}
              {university.founded ? (
                <>
                  <Separator />
                  Founded {university.founded}
                </>
              ) : null}
            </p>

            <h1 className="mt-[10px] text-[clamp(1.875rem,3.6vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.024em] text-white [text-shadow:0_2px_18px_rgba(2,15,83,0.5)]">
              {university.name}
            </h1>

            <p className="mt-3 max-w-[62ch] text-[clamp(0.9375rem,1.1vw,1.0625rem)] font-medium leading-[1.55] text-white/85 [text-shadow:0_1px_12px_rgba(2,15,83,0.55)]">
              {university.tagline}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {university.placementYear ? (
            <HeroChip>Placement year</HeroChip>
          ) : null}
          <HeroChip>
            {university.scholarships.length}{" "}
            {university.scholarships.length === 1 ? "scholarship" : "scholarships"}
          </HeroChip>
          {university.studentPopulation ? (
            <HeroChip>{university.studentPopulation} students</HeroChip>
          ) : null}
          {/* The orange-on-cream `demo` badge disappears against the
              photograph, so the marker is restated in the same language as the
              chips beside it. It still has to be here: the figures behind
              every tab are placeholders. */}
          <span className="inline-flex items-center rounded-lg border border-orange/50 bg-orange/25 px-[11px] py-[5px] text-[13px] font-semibold text-white backdrop-blur-sm">
            Example data
          </span>
        </div>
      </Container>
    </header>
  );
}

function Separator() {
  return (
    <span aria-hidden className="text-white/30">
      ·
    </span>
  );
}

/** The badge language, restated for a dark ground where `Badge` would vanish. */
function HeroChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-lg border border-white/20 bg-white/10 px-[11px] py-[5px] text-[13px] font-semibold text-white backdrop-blur-sm">
      {children}
    </span>
  );
}
