import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ContactWidget } from "@/components/layout/ContactWidget";
import { siteName, siteTagline, siteUrl } from "@/lib/seo";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

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
    <html lang="en-GB" className={jakarta.variable}>
      <body>
        {children}
        {/* Site-wide, and it stands down while a page's own CTA band is on
            screen so the two never stack — see components/apply/ctaVisibility.ts. */}
        <ContactWidget />
      </body>
    </html>
  );
}
