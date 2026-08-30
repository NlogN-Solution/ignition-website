import Image, { type StaticImageData } from "next/image";
import {
  Briefcase,
  FlaskConical,
  Lightbulb,
  type LucideIcon,
  MessageSquare,
  Puzzle,
  Scale,
  Users,
} from "lucide-react";
import { Container } from "../ui/Container";
import { AccentText } from "../ui/AccentText";
import {
  learningIntro,
  learningMethods,
  learningOutro,
  learningWeek,
  type LearningMethod,
} from "@/data/guides/study-in-uk";
import classroom from "@/public/images/classroom.webp";
import caseStudies from "@/public/images/case-studies.jpeg";
import groupProjects from "@/public/images/group-projects.jpeg";
import presentations from "@/public/images/presentations.jpeg";
import criticalThinking from "@/public/images/critical-thinking.jpeg";
import problemSolving from "@/public/images/problem-solving.jpeg";
import practical from "@/public/images/practical-assesments.jpeg";

/**
 * The second half of the "why the UK" argument: not how long the degree is,
 * but what it does to you.
 *
 * It sits after the navy panel and before the degree shapes on purpose. A
 * student comparing systems can find course lengths anywhere; what decides
 * whether the UK suits them is that they will be assessed on a group
 * presentation as well as on an exam, and that the difference is deliberate.
 *
 * WHY THE WEEK IS DESCRIBED AND NOT COUNTED. The closing panel refuses to
 * give a number for time on campus. Contact hours differ by an order of
 * magnitude between a clinical course and an essay-based one, so any single
 * figure would be wrong for most readers in the direction that matters — the
 * ones planning work or travel around it. See the note on `learningWeek`.
 */

const icons: Record<LearningMethod["icon"], LucideIcon> = {
  case: Briefcase,
  group: Users,
  present: MessageSquare,
  think: Scale,
  solve: Puzzle,
  practical: FlaskConical,
};

/**
 * Keyed by `LearningMethod.id`. The sources are small — a few hundred pixels
 * wide — so the band is deliberately short and wide: at `2/1` the crop is
 * close to the file's own scale and stays sharp, where a taller band would
 * have to enlarge it. The icon plate stays on the card and moves onto the
 * picture, which keeps the six cards recognisable as a set once each one has
 * a different photograph on it.
 */
const photos: Record<LearningMethod["id"], StaticImageData> = {
  "case-studies": caseStudies,
  "group-projects": groupProjects,
  presentations,
  "critical-thinking": criticalThinking,
  "problem-solving": problemSolving,
  practical,
};

export function HowYouLearn({ id }: { id: string }) {
  return (
    <section
      id={id}
      className="scroll-mt-[calc(var(--nav-h)_+_4.5rem)] border-y border-hairline bg-white py-[clamp(2.75rem,4.5vw,4.5rem)]"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.78fr)] lg:items-start lg:gap-14">
          <div>
            <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-blue-link">
              How you are taught
            </p>
            <h2 className="mt-3 text-[clamp(1.625rem,2.8vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-navy">
              <AccentText>More than lectures and exams.</AccentText>
            </h2>
            <p className="mt-4 max-w-[64ch] text-[16px] font-medium leading-[1.65] text-ink-soft">
              {learningIntro}
            </p>
          </div>

          {/* The picture belongs to this section rather than to "why the UK":
              a lecture theatre is what the assessment methods below are a
              reaction against, which makes it an argument and not decoration. */}
          <div className="relative overflow-hidden rounded-2xl border border-hairline lg:mt-2">
            <Image
              src={classroom}
              alt="Students in a UK university lecture theatre."
              sizes="(max-width: 1024px) 100vw, 460px"
              className="h-[200px] w-full object-cover object-[50%_60%] sm:h-[240px] lg:h-[260px]"
            />
          </div>
        </div>

        <ul className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {learningMethods.map((method) => {
            const Icon = icons[method.icon];

            return (
              <li key={method.id} className="min-w-0">
                <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-hairline bg-white shadow-[0_18px_40px_-30px_rgba(1,22,111,0.3)] transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-[3px] hover:border-ring-idle hover:shadow-[0_26px_50px_-26px_rgba(1,22,111,0.35)]">
                  <div className="relative aspect-[2/1] w-full shrink-0 overflow-hidden">
                    <Image
                      src={photos[method.id]}
                      alt=""
                      aria-hidden
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 380px"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                    />

                    {/* A navy veil at the foot of the picture. The six sources
                        are unrelated stock photographs in six different colour
                        temperatures; without it the row reads as six separate
                        cards rather than one set, and the icon plate has
                        nothing reliable to sit against. */}
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-[linear-gradient(to_top,rgba(1,22,111,0.55),rgba(1,22,111,0.06)_58%,rgba(1,22,111,0))]"
                    />

                    {/* A solid navy plate, not translucent glass. Three of the
                        six photographs are very pale, and a white-on-white
                        glass chip disappeared into them entirely — the plate
                        has to carry its own contrast rather than borrow it
                        from whatever image sits behind. */}
                    <span
                      aria-hidden
                      className="absolute bottom-3 left-3 flex size-[36px] items-center justify-center rounded-[10px] border border-white/20 bg-navy/90 text-white shadow-[0_6px_16px_-6px_rgba(1,22,111,0.8)]"
                    >
                      <Icon size={17} strokeWidth={2} />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-[16.5px] font-bold leading-[1.3] tracking-[-0.012em] text-navy">
                      {method.title}
                    </h3>
                    <p className="mt-[7px] text-[14.5px] font-medium leading-[1.6] text-muted">
                      {method.body}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-navy/12 bg-navy/[0.035] p-5 sm:p-6">
            <Lightbulb
              size={19}
              strokeWidth={2}
              aria-hidden
              className="text-orange"
            />
            <h3 className="mt-3 text-[15.5px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
              What this adds up to
            </h3>
            <p className="mt-2 max-w-[58ch] text-[14.5px] font-medium leading-[1.65] text-ink-soft">
              {learningOutro}
            </p>
          </div>

          <div className="rounded-xl border border-hairline bg-white p-5 sm:p-6">
            <h3 className="text-[15.5px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
              What a week actually looks like
            </h3>
            <p className="mt-2 max-w-[58ch] text-[14.5px] font-medium leading-[1.65] text-muted">
              {learningWeek}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
