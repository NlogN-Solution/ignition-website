import { HorizontalCardRail } from "./HorizontalCardRail";
import { UniversityCard } from "../universities/UniversityCard";
import type { University } from "@/data/universities";

/**
 * `pickPopularUniversities`' featured selections, rendered with the same card the
 * explorer and the university listing already use — one card design for
 * "here are some universities" everywhere it appears on the site.
 */
export function PopularUniversities({ universities }: { universities: University[] }) {
  return (
    <HorizontalCardRail label="Universities" reverse>
      {universities.map((university) => (
        <li key={university.id} dir="ltr" className="min-w-0 shrink-0 basis-[90%] sm:basis-[380px] xl:basis-[420px]">
          <UniversityCard university={university} roomy />
        </li>
      ))}
    </HorizontalCardRail>
  );
}
