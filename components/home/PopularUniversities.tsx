import { UniversityCard } from "../universities/UniversityCard";
import type { University } from "@/data/universities";

/**
 * `pickPopularUniversities`' top four, rendered with the same card the
 * explorer and the university listing already use — one card design for
 * "here are some universities" everywhere it appears on the site.
 */
export function PopularUniversities({ universities }: { universities: University[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {universities.map((university) => (
        <li key={university.id} className="min-w-0">
          <UniversityCard university={university} />
        </li>
      ))}
    </ul>
  );
}
