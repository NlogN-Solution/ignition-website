import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { AboutReveal } from "./AboutReveal";
import { AboutEyebrow, aboutHeading, aboutSpacing } from "./AboutTypography";

const stages = [
  { title: "Discover your options", description: "Explore UK universities and courses that align with your interests and goals." },
  { title: "Understand your requirements", description: "Review eligibility criteria and compare the costs and details that matter." },
  { title: "Create your profile", description: "Register, prepare your information and organise important documents." },
  { title: "Prepare your application", description: "Follow a structured process for submitting your application request and required materials." },
  { title: "Stay informed", description: "Use your dashboard to follow application progress and understand what comes next." },
];

export function AboutJourney() {
  return (
    <section aria-labelledby="about-journey-title" className={`bg-navy-ink text-white ${aboutSpacing}`}>
      <Container>
        <AboutReveal className="grid gap-5 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <AboutEyebrow dark>Built around your journey</AboutEyebrow>
            <h2 id="about-journey-title" className={`mt-5 max-w-[22ch] ${aboutHeading}`}>From the first search to the next big step.</h2>
          </div>
          <p className="max-w-[50ch] text-[clamp(1rem,1.2vw,1.125rem)] font-medium leading-[1.75] text-white/75 lg:self-end">
            Ignition brings the essential parts of your study journey together, helping you explore, prepare and stay informed throughout the process.
          </p>
        </AboutReveal>

        <div className="mt-10 grid items-start gap-10 lg:mt-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="min-w-0 lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
            <AboutReveal>
              <figure className="overflow-hidden rounded-md border border-white/20">
                <div className="flex items-center gap-2 border-b border-white/20 px-5 py-4 text-xs font-semibold text-white/80">
                  <span aria-hidden className="size-1.5 rounded-full bg-orange" />
                  Inside Ignition
                </div>
                <Image src="/images/how-it-works/1-explore-courses-universitiespng" width={1219} height={527} alt="Ignition course search showing study levels and course suggestions for Data Science" sizes="(min-width: 1320px) 600px, (min-width: 1024px) 50vw, 100vw" className="h-auto w-full bg-white" />
                <figcaption className="px-5 py-4 text-sm font-medium leading-relaxed text-white/70">Course discovery on the Ignition platform.</figcaption>
              </figure>
            </AboutReveal>
          </div>

          <ol className="relative min-w-0 before:absolute before:bottom-9 before:left-[19px] before:top-5 before:w-px before:bg-white/20">
            {stages.map((stage, index) => (
              <li key={stage.title} className="relative flex gap-5 pb-8 last:pb-0 sm:gap-6 sm:pb-10">
                <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-navy-ink text-xs font-semibold tabular-nums text-white/85">{String(index + 1).padStart(2, "0")}</span>
                <div className="min-w-0 pt-1">
                  <h3 className="font-display text-xl font-bold leading-[1.25] tracking-[-0.02em] sm:text-[23px]">{stage.title}</h3>
                  <p className="mt-3 max-w-[40ch] text-base font-medium leading-[1.7] text-white/75">{stage.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
