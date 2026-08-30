import Image from "next/image";
import { Container } from "../ui/Container";
import { AccentText } from "../ui/AccentText";
import { ArrowButton } from "../ui/ArrowButton";
import graduating from "@/public/images/friends-graduating.webp";

/**
 * Two ways out instead of one.
 *
 * `CtaBand` puts a primary and a secondary action side by side, which is
 * right when one of them is clearly the next step. At the foot of this guide
 * neither is: a reader who now understands the system either knows what they
 * want to study or does not, and those are two different journeys rather than
 * a strong and a weak version of the same one. So each gets its own panel,
 * its own sentence and equal weight.
 *
 * The navy panel carries the quiz because that is the longer, more
 * considered route; the photographic panel carries the catalogue because
 * browsing is the thing the picture is about.
 */
export function SplitCta() {
  return (
    <section className="border-t border-hairline bg-canvas py-[clamp(3rem,5vw,5rem)]">
      <Container>
        <div className="grid overflow-hidden rounded-2xl border border-navy/15 shadow-[0_28px_60px_-38px_rgba(1,22,111,0.5)] lg:grid-cols-2">
          <div className="bg-navy p-7 sm:p-9 lg:p-11">
            <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-orange">
              Not sure what to study
            </p>
            <h2 className="mt-3 max-w-[18ch] text-[clamp(1.5rem,2.5vw,2rem)] font-bold leading-[1.12] tracking-[-0.02em] text-white">
              <AccentText>Know the system. Now find your course.</AccentText>
            </h2>
            <p className="mt-4 max-w-[42ch] text-[15.5px] font-medium leading-[1.6] text-white/70">
              Start from the career you want and work back to the degree that
              leads there.
            </p>

            <ArrowButton
              href="/careers/quiz"
              iconSize={18}
              tone="onDark"
              arrowClassName="text-orange"
              className="mt-8 h-[52px] w-full gap-[16px] px-7 text-[16px] sm:w-auto"
            >
              Take Career Quiz
            </ArrowButton>
          </div>

          {/* The picture is the argument on this side, so the panel is the
              photograph with a navy scrim over it rather than a card sitting
              on top of one. */}
          <div className="relative isolate p-7 sm:p-9 lg:p-11">
            <Image
              src={graduating}
              alt=""
              aria-hidden
              sizes="(max-width: 1024px) 100vw, 620px"
              className="absolute inset-0 -z-10 h-full w-full object-cover object-[50%_35%]"
            />
            <span
              aria-hidden
              /* Heaviest where the copy sits and lightening across to the
                 right, so the type keeps its contrast and the photograph is
                 still a photograph rather than a navy rectangle. */
              className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(1,22,111,0.97)_0%,rgba(1,22,111,0.9)_40%,rgba(1,22,111,0.55)_100%)]"
            />

            <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-white/70">
              Ready to look
            </p>
            <h2 className="mt-3 max-w-[18ch] text-[clamp(1.5rem,2.5vw,2rem)] font-bold leading-[1.12] tracking-[-0.02em] text-white">
              <AccentText>Ready to explore courses?</AccentText>
            </h2>
            <p className="mt-4 max-w-[42ch] text-[15.5px] font-medium leading-[1.6] text-white/75">
              Browse courses from UK universities and compare the options that
              fit your goals.
            </p>

            <ArrowButton
              href="/courses"
              iconSize={18}
              tone="white"
              arrowClassName="text-orange"
              className="mt-8 h-[52px] w-full gap-[16px] px-7 text-[16px] sm:w-auto"
            >
              Explore courses
            </ArrowButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
