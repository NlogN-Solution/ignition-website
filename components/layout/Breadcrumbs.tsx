import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbSchema, JsonLd, type Crumb } from "@/lib/seo";

/**
 * Renders the visible trail and its BreadcrumbList JSON-LD from the same
 * array, so the two cannot drift apart. The final crumb is the current page
 * and is not a link.
 *
 * `inverse` is the same trail on a dark ground — the university header sits on
 * a photograph, where the muted greys this uses by default disappear.
 */
export function Breadcrumbs({
  crumbs,
  tone = "default",
}: {
  crumbs: Crumb[];
  tone?: "default" | "inverse";
}) {
  const inverse = tone === "inverse";

  return (
    <>
      <JsonLd schema={breadcrumbSchema(crumbs)} />
      <nav aria-label="Breadcrumb">
        <ol
          className={`flex flex-wrap items-center gap-x-[6px] gap-y-1 text-[13.5px] font-medium ${
            inverse ? "text-white/60" : "text-muted-light"
          }`}
        >
          {crumbs.map((crumb, i) => {
            const last = i === crumbs.length - 1;

            return (
              <li key={crumb.href} className="flex items-center gap-[6px]">
                {i > 0 ? (
                  <ChevronRight
                    size={13}
                    strokeWidth={2.5}
                    aria-hidden
                    className={inverse ? "text-white/35" : "text-faint"}
                  />
                ) : null}
                {last ? (
                  <span
                    aria-current="page"
                    className={`font-semibold ${inverse ? "text-white" : "text-ink-soft"}`}
                  >
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className={`transition-colors ${
                      inverse ? "hover:text-white" : "hover:text-navy"
                    }`}
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
