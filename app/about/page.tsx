import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutJourney } from "@/components/about/AboutJourney";
import { AboutStory, AboutApproach, AboutStudents, AboutPurpose, AboutCta } from "@/components/about/AboutSections";
import { pageMetadata } from "@/lib/seo";

const title = "About Ignition | Making UK University Applications Clearer";
const baseMetadata = pageMetadata({
  title,
  description: "Learn how Ignition helps students explore UK universities, understand study options, prepare applications and stay informed throughout their journey.",
  path: "/about",
});

export const metadata: Metadata = {
  ...baseMetadata,
  title: { absolute: title },
  openGraph: {
    ...baseMetadata.openGraph,
    title,
    images: [{ url: "/images/about-us-images/1.jpg", width: 1920, height: 1280, alt: "Students exploring life on a university campus" }],
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="about-main">
        <AboutHero />
        <AboutStory />
        <AboutApproach />
        <AboutJourney />
        <AboutStudents />
        <AboutPurpose />
        <AboutCta />
      </main>
      <Footer />
    </>
  );
}
