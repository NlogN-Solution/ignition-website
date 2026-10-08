import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ArrowButton, GhostButton } from "@/components/ui/ArrowButton";
import campusStudents from "@/public/images/about-us-images/1.jpg";
import { AboutReveal } from "./AboutReveal";
import { AboutEyebrow, aboutBody } from "./AboutTypography";

export function AboutHero() {
  return (
    <section aria-labelledby="about-title" className="border-b border-hairline">
      <Container className="pb-[clamp(3rem,6vw,6rem)] pt-[clamp(2.5rem,5vw,5rem)]">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="min-w-0">
            <AboutReveal entrance>
              <AboutEyebrow>About Ignition</AboutEyebrow>
              <h1 id="about-title" className="mt-6 max-w-[13ch] font-display text-[clamp(2.75rem,5.5vw,4.75rem)] font-extrabold leading-[1.04] tracking-[-0.045em] text-navy">
                Your future deserves more than guesswork.
              </h1>
            </AboutReveal>
            <AboutReveal entrance delay={0.08}>
              <p className={`mt-6 max-w-[48ch] ${aboutBody}`}>
                Choosing where and what to study is a big decision. Ignition brings the information, tools and guidance you need into one place, so you can explore your options and move forward with greater confidence.
              </p>
            </AboutReveal>
            <AboutReveal entrance delay={0.16} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ArrowButton href="/courses" className="min-h-[52px] gap-3 px-6 text-[15px]">Explore Courses</ArrowButton>
              <GhostButton href="/universities" className="min-h-[52px] px-6 text-[15px]">Discover Universities</GhostButton>
            </AboutReveal>
          </div>
          <AboutReveal entrance delay={0.12} className="min-w-0">
            <figure>
              <div className="relative aspect-[3/2] overflow-hidden rounded-md bg-white lg:aspect-[4/5]">
                <Image src={campusStudents} alt="Students walking together outside a contemporary university building" fill preload placeholder="blur" sizes="(min-width: 1320px) 530px, (min-width: 1024px) 45vw, (min-width: 640px) 90vw, 100vw" className="object-cover object-[55%_center]" />
              </div>
              <figcaption className="mt-4 flex items-center justify-between gap-3 border-t border-hairline pt-3 text-xs font-medium text-muted">
                <span>Student life. A world of possibilities.</span>
                <span aria-hidden className="h-px w-8 bg-orange" />
              </figcaption>
            </figure>
          </AboutReveal>
        </div>
      </Container>
    </section>
  );
}
