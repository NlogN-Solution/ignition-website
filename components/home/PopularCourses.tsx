import { HorizontalCardRail } from "./HorizontalCardRail";
import Link from "next/link";
import { OfferingCard } from "../courses/OfferingCard";
import type { Offering } from "@/lib/api/types";

/** The same offering data, details and application action as the course explorer. */
export function PopularCourses({ offerings }: { offerings: Offering[] }) {
  if (!offerings.length) {
    return (
      <p className="text-muted">
        Course recommendations are unavailable right now. {" "}
        <Link href="/courses" className="font-semibold text-navy underline underline-offset-4">
          Browse all courses
        </Link>
      </p>
    );
  }

  return (
    <HorizontalCardRail label="Popular courses">
      {offerings.map((offering) => (
        <li key={offering.slug} dir="ltr" className="min-w-0 shrink-0 basis-[90%] sm:basis-[380px] xl:basis-[420px]">
          <OfferingCard offering={offering} roomy />
        </li>
      ))}
    </HorizontalCardRail>
  );
}
