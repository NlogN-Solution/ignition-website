import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { CareerExplorer } from "@/components/careers/CareerExplorer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Explore careers",
  description:
    "Browse careers by interest, see the skills each one needs, and find the UK degree subjects that lead to them.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          compact
          eyebrow="Careers"
          title="Start from where you're going."
          intro="A degree is a means to an end. Explore careers first, and the right course usually becomes obvious — every career here lists the UK degree subjects that lead to it."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Careers", href: "/careers" },
          ]}
        />

        <Container className="pb-[clamp(2.5rem,4.5vw,4.5rem)] pt-[clamp(1.125rem,1.8vw,1.625rem)]">
          <CareerExplorer />
        </Container>
      </main>

      <CtaBand
        title="Not sure which of these is you?"
        intro="The career quiz scores five dimensions and ranks these careers against your profile."
        primary={{ label: "Take Career Quiz", href: "/careers/quiz" }}
        secondary={{ label: "Explore courses", href: "/courses" }}
      />
      <Footer />
    </>
  );
}
