import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ArrowButton } from "@/components/ui/ArrowButton";
import studentResearch from "@/public/images/about-us-images/2.jpeg";
import campusLife from "@/public/images/about-us-images/4.jpeg";
import { AboutReveal } from "./AboutReveal";
import { AboutEyebrow, aboutHeading, aboutBody, aboutSpacing } from "./AboutTypography";

export function AboutStory() {
  return (
    <section aria-labelledby="about-story-title" className={aboutSpacing}>
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <AboutReveal className="min-w-0 lg:order-2">
            <AboutEyebrow>Why we exist</AboutEyebrow>
            <h2 id="about-story-title" className={`mt-5 max-w-[20ch] ${aboutHeading}`}>Better decisions start with better information.</h2>
            <div className={`mt-7 max-w-[52ch] space-y-5 ${aboutBody}`}>
              <p className="font-semibold text-navy">Finding the right university involves more than browsing course names.</p>
              <p>Students need to understand entry requirements, compare costs, prepare documents and know what comes next. Too often, that information is spread across different places, making an already important decision harder than it needs to be.</p>
              <p>Ignition was created around a simple idea: the journey towards UK higher education should be easier to understand and navigate.</p>
              <p>We bring discovery, application preparation and progress tracking together in a more connected student experience.</p>
            </div>
          </AboutReveal>
          <AboutReveal className="min-w-0 lg:order-1">
            <div className="relative aspect-square overflow-hidden rounded-md bg-white">
              <Image src={studentResearch} alt="A student researching on a laptop beside her notes in a light-filled library" fill placeholder="blur" sizes="(min-width: 1320px) 500px, (min-width: 1024px) 40vw, (min-width: 640px) 90vw, 100vw" className="object-cover" />
            </div>
          </AboutReveal>
        </div>
      </Container>
    </section>
  );
}

const principles = [
  { title: "Clarity before decisions.", description: "Explore universities, understand entry requirements and compare study options before choosing your next step." },
  { title: "More control over your journey.", description: "Create your profile, organise essential documents and take an active role in preparing your application." },
  { title: "Visibility at every stage.", description: "Follow your application progress, understand upcoming requirements and access guidance when you need it." },
];

export function AboutApproach() {
  return (
    <section aria-labelledby="about-approach-title" className={`border-t border-hairline bg-white/55 ${aboutSpacing}`}>
      <Container>
        <AboutReveal className="grid gap-5 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <AboutEyebrow>The Ignition approach</AboutEyebrow>
            <h2 id="about-approach-title" className={`mt-5 max-w-[25ch] ${aboutHeading}`}>Explore freely. Decide confidently. Move forward clearly.</h2>
          </div>
          <p className={`max-w-[45ch] lg:self-end ${aboutBody}`}>We believe students should have the information and visibility to take an active role in their education journey.</p>
        </AboutReveal>
        <AboutReveal>
          <ol className="mt-10 grid border-t border-hairline lg:mt-14 lg:grid-cols-3">
            {principles.map((principle, index) => (
              <li key={principle.title} className="border-b border-hairline py-7 last:border-b-0 lg:border-b-0 lg:border-r lg:px-8 lg:py-8 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0">
                <span className="text-xs font-semibold tabular-nums tracking-[0.08em] text-muted">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 max-w-[20ch] font-display text-[clamp(1.375rem,2vw,1.625rem)] font-bold leading-[1.25] tracking-[-0.02em]">{principle.title}</h3>
                <p className="mt-4 max-w-[38ch] text-base font-medium leading-[1.75] text-muted">{principle.description}</p>
              </li>
            ))}
          </ol>
        </AboutReveal>
      </Container>
    </section>
  );
}

export function AboutStudents() {
  return (
    <section aria-labelledby="about-students-title" className={aboutSpacing}>
      <Container>
        <AboutReveal>
          <AboutEyebrow>Students first</AboutEyebrow>
          <h2 id="about-students-title" className={`mt-5 max-w-[24ch] ${aboutHeading}`}>Your journey. Your decisions. Your future.</h2>
        </AboutReveal>
        <div className="mt-10 grid items-center gap-8 lg:mt-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <AboutReveal className="min-w-0">
            <div className="relative aspect-[3/2] overflow-hidden rounded-md bg-white">
              <Image src={campusLife} alt="Four students walking and talking together through a university campus" fill placeholder="blur" sizes="(min-width: 1320px) 700px, (min-width: 1024px) 55vw, 100vw" className="object-cover" />
            </div>
          </AboutReveal>
          <AboutReveal className={`max-w-[45ch] space-y-5 border-l-2 border-orange pl-5 sm:pl-7 ${aboutBody}`}>
            <p className="font-semibold text-navy">Every student has different ambitions, circumstances and priorities.</p>
            <p>That&apos;s why Ignition is designed to help you explore options, understand your choices and move through the process at your own pace.</p>
            <p>Whether you&apos;re beginning to research universities or preparing to apply, our goal is to make the next step feel clearer.</p>
          </AboutReveal>
        </div>
      </Container>
    </section>
  );
}

export function AboutPurpose() {
  return (
    <section aria-labelledby="about-purpose-title" className={`border-y border-hairline bg-white/55 ${aboutSpacing}`}>
      <Container>
        <AboutReveal>
          <AboutEyebrow>What drives us</AboutEyebrow>
          <h2 id="about-purpose-title" className={`mt-5 ${aboutHeading}`}>Making the journey clearer.</h2>
          <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h3 className="font-display text-2xl font-bold tracking-[-0.02em]">Our mission</h3>
              <p className={`mt-4 max-w-[49ch] ${aboutBody}`}>To make access to UK higher education easier to understand and navigate by giving students the tools, information and support to make informed decisions about their future.</p>
            </div>
            <div className="border-t border-hairline pt-8 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
              <h3 className="font-display text-2xl font-bold tracking-[-0.02em]">Our vision</h3>
              <p className={`mt-4 max-w-[49ch] ${aboutBody}`}>A future where every student can explore educational opportunities with confidence, understand their options and take an active role in shaping their academic journey.</p>
            </div>
          </div>
        </AboutReveal>
      </Container>
    </section>
  );
}

export function AboutCta() {
  return (
    <section aria-labelledby="about-next-title" className={`bg-navy text-white ${aboutSpacing}`}>
      <Container>
        <AboutReveal className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <AboutEyebrow dark>Your next chapter</AboutEyebrow>
            <h2 id="about-next-title" className={`mt-5 max-w-[22ch] ${aboutHeading}`}>Your next chapter starts with a better decision.</h2>
            <p className="mt-6 max-w-[48ch] text-lg font-medium leading-[1.7] text-white/75">Explore universities, discover courses and take the first step towards your future in the UK.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col xl:items-start">
            <ArrowButton href="/courses" tone="white" className="min-h-[52px] gap-3 px-6 text-[15px] focus-visible:outline-white">Explore Courses</ArrowButton>
            <ArrowButton href="/universities" tone="onDark" className="min-h-[52px] gap-3 px-6 text-[15px] focus-visible:outline-white">Find Your University</ArrowButton>
          </div>
        </AboutReveal>
      </Container>
    </section>
  );
}
