import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ContactWidget } from "@/components/layout/ContactWidget";
import { siteName, siteTagline, siteUrl } from "@/lib/seo";
import "./globals.css";
import "./fonts.css";

// GA4 property for the public site. Only production builds report, so local
// dev and preview runs don't pollute the numbers; NEXT_PUBLIC_GA_ID overrides
// the ID (e.g. a separate staging property).
const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "G-263JG8639P";
const analyticsEnabled = process.env.NODE_ENV === "production" && gaId !== "";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — ${siteTagline}`,
    template: `%s — ${siteName}`,
  },
  description:
    "Discover the right career, find the right course, compare UK universities, understand how to apply and prepare for your journey to the UK.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preload" href="/fonts/1a4aa50920b5315c-s.p.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/26d4368bf94c0ec4-s.p.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        {/* Site-wide, and it stands down while a page's own CTA band is on
            screen so the two never stack — see components/apply/ctaVisibility.ts. */}
        <ContactWidget />
      </body>
      {analyticsEnabled && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
