"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { RotateCcw } from "lucide-react";
import { ArrowButton, GhostButton } from "../ui/ArrowButton";
import { Container } from "../ui/Container";
import { Card } from "../ui/Card";
import { CareerCard } from "./CareerCard";
import { useEntrance } from "../ui/motion";
import { careers } from "@/data/careers";
import { matchCareers, profileStrengths } from "@/lib/quiz/scoring";
import type { Profile } from "@/lib/quiz/types";
import { storageKeys } from "@/lib/storage";
import { useStoredState } from "@/lib/storage/useStoredState";
import swoosh from "@/public/images/swoosh.png";

/**
 * Reads the profile the quiz stored rather than recomputing from answers, so
 * the result a student sees is stable even if the question set changes later.
 */
export function QuizResults() {
  const [profile, , ready] = useStoredState<Profile | null>(
    storageKeys.quizProfile,
    null,
  );
  const { container, item } = useEntrance(0.09);

  if (ready && !profile) return <NoResultYet />;

  const strengths = profile ? profileStrengths(profile) : [];
  const matches = profile ? matchCareers(profile, careers).slice(0, 6) : [];

  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={swoosh}
        alt=""
        sizes="288px"
        priority
        className="pointer-events-none absolute right-0 top-0 -z-10 h-[70%] w-auto select-none opacity-45 lg:opacity-70"
      />

      <Container className="pb-20 pt-10 lg:pt-14">
        <motion.div {...container}>
          <motion.p
            {...item}
            className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-blue-link"
          >
            Your results
          </motion.p>

          <motion.h1
            {...item}
            className="mt-3 max-w-[15ch] text-[clamp(2.25rem,4.6vw,4rem)] font-bold leading-[1.02] tracking-[-0.022em] text-navy"
          >
            Your career profile<span className="text-orange">.</span>
          </motion.h1>

          <motion.p
            {...item}
            className="mt-4 max-w-[54ch] text-[clamp(1rem,1.2vw,1.125rem)] font-medium leading-[1.55] text-muted"
          >
            Based on how you answered, here is where your strengths sit and
            which careers line up with them. Treat this as a starting point for
            exploring, not a verdict.
          </motion.p>

          {/* Profile strengths */}
          <motion.div {...item} className="mt-10">
            <Card className="p-6 sm:p-8">
              <h2 className="text-[19px] font-bold tracking-[-0.01em] text-navy">
                How you work
              </h2>
              <p className="mt-[6px] text-[14.5px] font-medium text-muted">
                Relative strengths across your own answers &mdash; not a score
                against anyone else.
              </p>

              <dl className="mt-7 grid gap-5 sm:grid-cols-2 lg:gap-x-12">
                {strengths.map((strength) => (
                  <div key={strength.key}>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-[15.5px] font-semibold text-ink">
                        {strength.label}
                      </dt>
                      <dd className="text-[15.5px] font-bold tabular-nums text-navy">
                        {strength.percent}
                        <span className="text-orange">%</span>
                      </dd>
                    </div>
                    <div
                      className="mt-[9px] h-[6px] w-full overflow-hidden rounded-full bg-track"
                      role="img"
                      aria-label={`${strength.label}: ${strength.percent} percent`}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${strength.percent}%` }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-blue-bright"
                      />
                    </div>
                  </div>
                ))}
              </dl>
            </Card>
          </motion.div>

          {/* Career matches */}
          <motion.h2
            {...item}
            className="mt-16 text-[clamp(1.6rem,2.6vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-navy"
          >
            Careers that may suit you<span className="text-orange">.</span>
          </motion.h2>

          <motion.div
            {...item}
            className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          >
            {matches.map((match) => (
              <CareerCard
                key={match.career.id}
                career={match.career}
                score={match.score}
                reasons={match.reasons}
              />
            ))}
          </motion.div>

          {/* Next step in the journey */}
          <motion.div {...item} className="mt-14">
            <Card className="items-start gap-6 p-6 sm:flex sm:items-center sm:justify-between sm:p-8">
              <div className="max-w-[52ch]">
                <h2 className="text-[19px] font-bold tracking-[-0.01em] text-navy">
                  Next: turn a career into a course
                </h2>
                <p className="mt-[6px] text-[15px] font-medium leading-[1.5] text-muted">
                  Every career above maps to UK degree subjects. Explore the
                  courses that lead there, then the universities that teach them.
                </p>
              </div>
              <div className="mt-6 flex shrink-0 flex-wrap items-center gap-3 sm:mt-0">
                <ArrowButton
                  href="/courses"
                  iconSize={17}
                  className="h-[48px] gap-[14px] px-6 text-[15px]"
                >
                  Explore UK Courses
                </ArrowButton>
                <GhostButton
                  href="/universities"
                  className="h-[48px] px-6 text-[15px]"
                >
                  Universities
                </GhostButton>
              </div>
            </Card>
          </motion.div>

          <motion.p {...item} className="mt-8">
            <Link
              href="/careers/quiz"
              className="group inline-flex items-center gap-[10px] text-[14.5px] font-bold text-blue-link transition-colors hover:text-navy"
            >
              <RotateCcw
                size={15}
                strokeWidth={2.4}
                aria-hidden
                className="transition-transform duration-300 group-hover:-rotate-90"
              />
              Retake the quiz
            </Link>
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}

/** Shown when someone reaches the results URL without having answered. */
function NoResultYet() {
  return (
    <Container className="py-24 text-center">
      <h1 className="mx-auto max-w-[18ch] text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-[-0.022em] text-navy">
        No results yet<span className="text-orange">.</span>
      </h1>
      <p className="mx-auto mt-4 max-w-[46ch] text-[17px] font-medium leading-[1.55] text-muted">
        Take the career quiz and we&rsquo;ll build your profile. It takes about
        four minutes, and you can pick it up again if you stop halfway.
      </p>
      <div className="mt-8">
        <ArrowButton
          href="/careers/quiz"
          iconSize={19}
          className="h-[54px] gap-[20px] px-8 text-[17px]"
        >
          Take Career Quiz
        </ArrowButton>
      </div>
    </Container>
  );
}
