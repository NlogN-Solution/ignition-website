import type { Metadata } from "next";
import { contact } from "@/lib/config";

export const siteName = "Ignition";

/**
 * The canonical origin, used for every `canonical`, `og:url`, the sitemap and
 * the JSON-LD.
 *
 * It has to be configured rather than hardcoded, because it is wrong in two
 * different ways otherwise: a preview deployment that claims the production
 * canonical asks Google to index the wrong host, and a production deployment
 * still carrying `ignition.example` emits canonicals to a domain that does not
 * resolve. The placeholder remains the default so local development and this
 * repository's own build keep working — set `NEXT_PUBLIC_SITE_URL` before any
 * deploy a search engine can reach.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ignition.example").replace(
  /\/+$/,
  "",
);
export const siteTagline = "Everything you need to study in the UK.";

/**
 * One place to build page metadata so every route gets a unique title, a
 * description and a canonical without repeating the boilerplate. `path` is
 * the route as written in the URL bar, e.g. "/apply/entry-requirements".
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = path === "/" ? siteUrl : `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — ${siteName}`,
      description,
      url,
      siteName,
      locale: "en_GB",
      type: "website",
    },
  };
}

export type Crumb = { label: string; href: string };

/**
 * BreadcrumbList JSON-LD. Rendered alongside the visible trail so the two
 * never drift apart.
 */
export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      item: `${siteUrl}${crumb.href}`,
    })),
  };
}

/**
 * Organization + WebSite JSON-LD, rendered once on the homepage. This is
 * what makes the brand eligible for a Google knowledge panel and the
 * sitelinks search box — signals that don't exist anywhere else on the site,
 * since every other page's schema (`faqSchema`, `breadcrumbSchema`) speaks
 * about that page's own content, not about Ignition as an entity.
 *
 * No `sameAs` (social profile links) — there is no verified social presence
 * configured anywhere in this codebase to point at, and a guessed URL is
 * worse than an absent field.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    description: siteTagline,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contact.phone,
      contactType: "customer service",
      areaServed: "GB",
      availableLanguage: ["English"],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    inLanguage: "en-GB",
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function JsonLd({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
