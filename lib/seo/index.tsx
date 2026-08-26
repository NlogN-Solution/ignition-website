import type { Metadata } from "next";

export const siteName = "Ignition";
export const siteUrl = "https://ignition.example";
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
