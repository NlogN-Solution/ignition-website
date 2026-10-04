import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { routeLabel } from "@/lib/api/map";
import type { EntryRoute } from "@/data/universities/types";

/**
 * The entry-criteria matrix, one card per route.
 *
 * This is the September intake workbook rendered back in roughly the shape
 * staff maintain it: criteria down the side, one column per entry route. It is
 * the only place on the public site where a student sees the real requirement
 * rather than a summary, and the deliberate decision is that the text is not
 * touched. "12th Grade GPA 2.7 or 70% or above" is one requirement with an
 * either/or in it; "LOWER TIER COURSES: £12,100 / UPPER TIER: £14,900" is a
 * fee that depends on a course tier. Tidying either into a single number would
 * read cleaner and mislead, and the conditions are exactly the part applicants
 * get wrong.
 *
 * `SpecList` is not reused here for the same reason it works everywhere else:
 * it lays a label and its value on one baseline, which is right for "Founded /
 * 1841" and wrong for a paragraph of English-language bands. These rows stack.
 */

/** Source order, not this order, decides what shows — this only ranks it. */
const criteriaOrder = [
  ["academic", "Academic requirement"],
  ["english", "English language"],
  ["englishWaiver", "English waiver"],
  ["fees", "Tuition fees"],
  ["scholarship", "Scholarship"],
  ["casDeposit", "CAS deposit"],
  ["enrolmentFee", "Enrolment fee"],
  ["gapPolicy", "Study gap policy"],
  ["previousRefusal", "Previous visa refusal"],
  ["deadlines", "Deadlines"],
] as const satisfies readonly (readonly [keyof EntryRoute, string])[];

function Rows({ route }: { route: EntryRoute }) {
  const rows: { label: string; value: string }[] = [];

  for (const [key, label] of criteriaOrder) {
    const value = route[key];
    if (typeof value === "string") rows.push({ label, value });
  }

  // The workbook's long tail of one-off criteria labels. They are printed
  // under the header the file used, because a label staff invented for one
  // institution is still the label that institution answers to.
  for (const [label, value] of Object.entries(route.extras ?? {})) {
    rows.push({ label, value });
  }

  return (
    <dl className="mt-5 space-y-4">
      {rows.map((row) => (
        <div key={row.label} className="border-t border-hairline pt-4 first:border-t-0 first:pt-0">
          <dt className="text-[12.5px] font-bold uppercase tracking-[0.06em] text-muted-light">
            {row.label}
          </dt>
          <dd className="mt-[6px] whitespace-pre-line text-[14.5px] font-medium leading-[1.6] text-ink">
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function EntryRouteCards({ routes }: { routes: EntryRoute[] }) {
  return (
    <ul className="space-y-5">
      {routes.map((route) => (
        <li key={`${route.key}-${route.label ?? ""}`}>
          <Card className="p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-[16.5px] font-bold leading-[1.35] tracking-[-0.01em] text-navy">
                {routeLabel(route)}
              </h3>
              {/* Only worth a badge when it says something the heading did
                  not. Most labels are the route name in the workbook's own
                  capitals, and "Undergraduate · Undergraduate" is noise. */}
              {route.label && route.label.toLowerCase() !== routeLabel(route).toLowerCase() ? (
                <Badge tone="muted">{route.key.replace(/_/g, " ")}</Badge>
              ) : null}
            </div>

            <Rows route={route} />
          </Card>
        </li>
      ))}
    </ul>
  );
}
