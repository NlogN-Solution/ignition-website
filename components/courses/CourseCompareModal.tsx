"use client";

import { Fragment, useEffect, useState } from "react";
import { X } from "lucide-react";
import { Badge } from "../ui/Badge";
import { exampleScholarship, exampleTuition } from "@/lib/courses/estimatedFees";
import type { Offering } from "@/lib/api/types";
import type { EntryRoute } from "@/data/universities/types";

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

type EntryResult = { slug: string; entry: EntryRoute | null };

/**
 * The overview a student asked for "just there" — a popup rather than a
 * page, so comparing a shortlist never means leaving the grid they built it
 * from. Follows the same bespoke-overlay pattern as `CampusGallery`'s
 * lightbox (no generic `Dialog` exists in this codebase yet): a fixed
 * backdrop, `role="dialog"`, `Escape` to close, body scroll locked while
 * open.
 *
 * Fee and scholarship prefer the course's real `EntryRoute` text
 * (`entry.fees` / `entry.scholarship`) once it has loaded, and fall back to
 * the same deterministic estimate `OfferingCard` shows — so a course that
 * has no real figures yet still shows the number the student already saw on
 * its card, not a different placeholder. Entry requirement has no
 * placeholder to fall back to: it is either the real criteria or an honest
 * "not yet published".
 */
export function CourseCompareModal({
  offerings,
  onClose,
  onRemove,
}: {
  offerings: Offering[];
  onClose: () => void;
  onRemove: (slug: string) => void;
}) {
  const [entries, setEntries] = useState<Record<string, EntryRoute | null>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const slugs = offerings.map((offering) => offering.slug).join(",");

    fetch(`/api/courses/entry?slugs=${encodeURIComponent(slugs)}`)
      .then((response) => response.json())
      .then((data: { items: EntryResult[] }) => {
        if (cancelled) return;
        setEntries(Object.fromEntries(data.items.map((item) => [item.slug, item.entry])));
      })
      .catch(() => {
        if (!cancelled) setEntries({});
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [offerings]);

  if (offerings.length === 0) return null;

  const rows: { label: string; render: (offering: Offering) => React.ReactNode }[] = [
    {
      label: "University",
      render: (offering) =>
        offering.university ? (
          <>
            <p className="text-[14px] font-bold leading-[1.3] text-navy">{offering.university.name}</p>
            <p className="mt-[3px] text-[13px] font-medium leading-[1.4] text-muted">
              {offering.campus ?? offering.university.city ?? ""}
            </p>
          </>
        ) : (
          <span className="text-muted-light">—</span>
        ),
    },
    {
      label: "Tuition fee",
      render: (offering) => {
        const entry = entries[offering.slug];
        if (entry?.fees) {
          return <p className="text-[14px] font-semibold leading-[1.4] text-navy">{entry.fees}</p>;
        }
        return (
          <>
            <p className="text-[14px] font-semibold leading-[1.4] text-navy">
              {gbp.format(exampleTuition(offering.slug))}
            </p>
            <Badge tone="demo" className="mt-[6px]">
              Estimate
            </Badge>
          </>
        );
      },
    },
    {
      label: "Scholarship",
      render: (offering) => {
        const entry = entries[offering.slug];
        if (entry?.scholarship) {
          return <p className="text-[14px] font-semibold leading-[1.4] text-navy">{entry.scholarship}</p>;
        }
        return (
          <>
            <p className="text-[14px] font-semibold leading-[1.4] text-navy">
              Up to {gbp.format(exampleScholarship(offering.slug))}
            </p>
            <Badge tone="demo" className="mt-[6px]">
              Estimate
            </Badge>
          </>
        );
      },
    },
    {
      label: "Entry requirement",
      render: (offering) => {
        if (loading) {
          return <p className="text-[13.5px] font-medium text-muted-light">Loading…</p>;
        }
        const entry = entries[offering.slug];
        if (!entry?.academic && !entry?.english) {
          return (
            <p className="text-[13.5px] font-medium leading-[1.5] text-muted-light">
              Not yet published for this course.
            </p>
          );
        }
        return (
          <>
            {entry.academic ? (
              <p className="text-[13.5px] font-medium leading-[1.5] text-ink-soft">{entry.academic}</p>
            ) : null}
            {entry.english ? (
              <p className="mt-[6px] text-[13.5px] font-medium leading-[1.5] text-ink-soft">
                {entry.english}
              </p>
            ) : null}
          </>
        );
      },
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Compare courses"
      className="fixed inset-0 z-[70] flex items-end justify-center bg-navy-ink/60 p-0 sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[92vh] w-full max-w-[980px] flex-col overflow-hidden rounded-t-2xl bg-white sm:rounded-2xl"
      >
        <div className="flex items-center justify-between border-b border-hairline px-5 py-4 sm:px-6">
          <h2 className="text-[17px] font-bold tracking-[-0.01em] text-navy">
            Compare courses
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex size-[32px] items-center justify-center rounded-full text-muted-light transition-colors hover:bg-canvas hover:text-navy"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>

        <div className="overflow-auto p-5 sm:p-6">
          <div
            className="grid min-w-[620px] gap-x-5 gap-y-4"
            style={{ gridTemplateColumns: `130px repeat(${offerings.length}, minmax(200px, 1fr))` }}
          >
            <div />
            {offerings.map((offering) => (
              <div key={offering.slug} className="min-w-0 border-b border-hairline pb-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="min-w-0 text-[14.5px] font-bold leading-[1.3] text-navy">
                    {offering.title}
                  </p>
                  <button
                    type="button"
                    onClick={() => onRemove(offering.slug)}
                    aria-label={`Remove ${offering.title} from comparison`}
                    className="shrink-0 text-muted-light transition-colors hover:text-orange"
                  >
                    <X size={15} strokeWidth={2.4} />
                  </button>
                </div>
                {offering.qualification ? (
                  <p className="mt-[3px] text-[12.5px] font-semibold text-muted-light">
                    {offering.qualification}
                  </p>
                ) : null}
              </div>
            ))}

            {rows.map((row) => (
              <Fragment key={row.label}>
                <p className="self-start text-[12px] font-bold uppercase tracking-[0.07em] text-muted-light">
                  {row.label}
                </p>
                {offerings.map((offering) => (
                  <div key={offering.slug} className="min-w-0">
                    {row.render(offering)}
                  </div>
                ))}
              </Fragment>
            ))}
          </div>

          <p className="mt-6 text-[12px] font-medium leading-[1.5] text-muted-light">
            Tuition and scholarship figures are illustrative estimates where a course has no published
            figure of its own — confirm exact costs and eligibility with the university.
          </p>
        </div>
      </div>
    </div>
  );
}
