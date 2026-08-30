import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  CalendarCheck,
  Clock3,
  Plane,
  ShieldAlert,
} from "lucide-react";
import { Container } from "../ui/Container";
import { AccentText } from "../ui/AccentText";
import { Callout } from "../ui/Callout";
import {
  checkedOn,
  earningsNote,
  graduateVisaIntro,
  graduateVisaLimits,
  graduateVisaTerms,
  graduateVisaWindow,
  placementBenefits,
  placementCaveat,
  placementIntro,
  sources,
  workConditionsNote,
  workRules,
} from "@/data/guides/beyond-the-degree";
import placementScene from "@/public/images/work-experiece-and-what-comes-after.png";
import cafeWork from "@/public/images/working-while-studying.jpg";

/**
 * Working during the degree, and staying after it.
 *
 * These are three separate questions — a placement year, part-time work, the
 * Graduate visa — and students ask them as one: "can I get experience, can I
 * earn, and can I stay?" Splitting them into three sections would scatter the
 * answer; running them as one chapter in time order (during, alongside,
 * after) lets each build on the last.
 *
 * THIS IS THE ONE SECTION THAT PRINTS NUMBERS. Everywhere else the site sends
 * datable immigration and money questions to gov.uk rather than restating
 * them. Here the numbers are the answer, so the trade is that each block ends
 * on its own government source link and the whole section carries the date it
 * was last checked. Do not add a figure here without both. The reasoning, and
 * the review checklist, are in the header of `data/guides/beyond-the-degree.ts`.
 */

function SourceLink({ source }: { source: { label: string; href: string } }) {
  return (
    <a
      href={source.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-[5px] text-[12.5px] font-semibold text-blue-link transition-colors duration-200 hover:text-navy"
    >
      {source.label}
      <ArrowUpRight
        size={12}
        strokeWidth={2.6}
        aria-hidden
        className="shrink-0 transition-transform duration-200 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
      />
    </a>
  );
}

/** Label, big value, supporting line — used by both the work and visa blocks. */
function FactRow({
  facts,
}: {
  facts: { label: string; value: string; detail: string }[];
}) {
  return (
    <dl className="grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-3">
      {facts.map((fact) => (
        <div key={fact.label} className="flex flex-col bg-white px-4 py-[16px]">
          <dt className="order-2 mt-[6px] text-[13px] font-bold leading-[1.3] text-navy">
            {fact.label}
          </dt>
          <dd className="order-1 text-[clamp(1.25rem,1.9vw,1.5rem)] font-bold leading-[1.05] tracking-[-0.02em] tabular-nums text-blue-link">
            {fact.value}
          </dd>
          <dd className="order-3 mt-[4px] text-[12.5px] font-medium leading-[1.45] text-muted">
            {fact.detail}
          </dd>
        </div>
      ))}
    </dl>
  );
}

const stages = [
  { key: "during", label: "During your degree", icon: Briefcase },
  { key: "alongside", label: "Alongside your degree", icon: Clock3 },
  { key: "after", label: "After your degree", icon: Plane },
] as const;

function StageHeading({
  index,
  title,
  inverse = false,
}: {
  index: 0 | 1 | 2;
  title: string;
  /** For the one stage whose heading sits on a photograph rather than on white. */
  inverse?: boolean;
}) {
  const stage = stages[index];
  const Icon = stage.icon;

  return (
    <div className="flex items-center gap-[11px]">
      <span
        aria-hidden
        className={`flex size-[38px] shrink-0 items-center justify-center rounded-[11px] border ${
          inverse
            ? "border-white/25 bg-white/15 text-white backdrop-blur-sm"
            : "border-hairline bg-canvas text-blue-link"
        }`}
      >
        <Icon size={18} strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <p
          className={`text-[11.5px] font-bold uppercase tracking-[0.12em] ${
            inverse ? "text-orange" : "text-muted-light"
          }`}
        >
          {stage.label}
        </p>
        <h3
          className={`mt-[2px] text-[18px] font-bold leading-[1.25] tracking-[-0.015em] ${
            inverse ? "text-white" : "text-navy"
          }`}
        >
          {title}
        </h3>
      </div>
    </div>
  );
}

export function WorkAndVisas({ id }: { id: string }) {
  return (
    <section
      id={id}
      className="scroll-mt-[calc(var(--nav-h)_+_4.5rem)] py-[clamp(2.75rem,4.5vw,4.5rem)]"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div className="max-w-[58ch]">
            <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-blue-link">
              Experience and eligibility
            </p>
            <h2 className="mt-3 text-[clamp(1.625rem,2.8vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-navy">
              <AccentText>Work, experience and what comes after.</AccentText>
            </h2>
            <p className="mt-4 text-[16px] font-medium leading-[1.6] text-muted">
              Three questions students ask as one — can I get experience, can I
              earn while I study, and can I stay when I finish.
            </p>
          </div>

          <p className="inline-flex items-center gap-[7px] rounded-lg border border-hairline bg-white px-[11px] py-[6px] text-[12px] font-semibold text-muted">
            <CalendarCheck size={13} strokeWidth={2.3} aria-hidden className="text-faint" />
            Figures checked {checkedOn}
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {/* 1 — Placements */}
          <div className="rounded-2xl border border-hairline bg-white p-5 shadow-[0_18px_40px_-30px_rgba(1,22,111,0.3)] sm:p-7">
            <StageHeading index={0} title="Industrial placements" />

            {/* The photograph takes a real column rather than a strip along
                the top. A placement is the one thing in this section a
                student cannot picture from the words — "a professional
                environment" is an abstraction until you see four people round
                a table with a city out of the window — so it is given the
                same width as the paragraph explaining it.

                The four benefits then run full width underneath as a row of
                four. They were a 2x2 block squeezed beside the prose, which
                made both columns narrow; moving them below is what freed the
                width for the picture. */}
            <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-stretch lg:gap-9">
              {/* The minimum height is set close to the source's own 3:2 so
                  `object-cover` has almost nothing to crop. A shorter box was
                  slicing the lettering on the office wall in half, which
                  reads as a mistake rather than as a crop — with a mostly
                  uncropped frame the whole composition survives instead. */}
              <div className="relative min-h-[210px] overflow-hidden rounded-xl border border-hairline sm:min-h-[250px] lg:min-h-[272px]">
                <Image
                  src={placementScene}
                  alt="Students on an industrial placement working together in a London office, with the city visible through the window."
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  quality={88}
                  className="object-cover object-[50%_46%]"
                />
              </div>

              <div className="flex flex-col justify-center">
                <p className="max-w-[58ch] text-[15px] font-medium leading-[1.65] text-ink-soft">
                  {placementIntro}
                </p>
                {/* A caveat, not a footnote: "you still have to secure the
                    role" is the sentence that stops a student assuming a
                    placement is included. It gets body-text contrast. */}
                <p className="mt-4 max-w-[58ch] border-l-2 border-orange/40 pl-4 text-[14px] font-medium leading-[1.6] text-muted">
                  {placementCaveat}
                </p>
              </div>
            </div>

            <ul className="mt-4 grid gap-[10px] sm:grid-cols-2 xl:grid-cols-4">
              {placementBenefits.map((benefit) => (
                <li
                  key={benefit.title}
                  className="rounded-xl border border-hairline bg-canvas p-4"
                >
                  <h4 className="text-[14.5px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
                    {benefit.title}
                  </h4>
                  <p className="mt-[5px] text-[13.5px] font-medium leading-[1.55] text-muted">
                    {benefit.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* 2 — Part-time work.

              The photograph carries the heading rather than sitting beside
              it, which is deliberately not what the placements card above
              does. Two identical image-left cards in a row would read as a
              template; this one opens on a dark band and drops into white for
              the figures, so the three stages have their own rhythm going
              down the page.

              The picture earns the treatment: it is lit dark on the left and
              holds its subject hard right, so the copy has somewhere to sit
              without a scrim heavy enough to bury the photograph. */}
          <div className="overflow-hidden rounded-2xl border border-hairline bg-white shadow-[0_18px_40px_-30px_rgba(1,22,111,0.3)]">
            {/* The photograph is shown whole, at its own 3:2, rather than
                cropped into a band.

                A full-bleed strip across the card was the first attempt and
                it could not work: at this width a 3:2 frame would need to be
                over seven hundred pixels tall to survive, so a band of any
                sensible height showed about a fifth of it and cut the subject
                off at the neck. Giving the picture a column instead lets it
                keep its own proportions — the copy panel stretches to
                whatever height the image lands at, rather than the image
                being cut to fit a height chosen for the copy. */}
            <div className="grid bg-navy lg:grid-cols-[minmax(0,1fr)_minmax(0,1.04fr)]">
              {/* Image first in the source order on narrow screens, where it
                  reads as the card's opening; alongside the copy from `lg`. */}
              <div className="relative order-1 flex items-center lg:order-2">
                <Image
                  src={cafeWork}
                  alt="A student working a shift behind the counter of a café."
                  sizes="(max-width: 1024px) 100vw, 580px"
                  quality={88}
                  className="h-auto w-full"
                />

                {/* A short navy blend on the inner edge so the picture meets
                    the panel instead of butting against it. It falls over the
                    unlit left side of the frame, so nothing in the photograph
                    is lost to it. */}
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 hidden w-20 bg-[linear-gradient(to_right,var(--color-navy),rgba(1,22,111,0))] lg:block"
                />
              </div>

              <div className="order-2 flex flex-col justify-center p-5 sm:p-7 lg:order-1 lg:p-8">
                <StageHeading index={1} title="Working while you study" inverse />

                <p className="mt-5 max-w-[46ch] text-[15px] font-medium leading-[1.65] text-white/85">
                  Eligible international students on a full-time degree-level
                  course with an approved higher education provider can normally
                  work limited hours in term time and full time during official
                  vacations.
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-7">
              <FactRow facts={workRules} />

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <Callout tone="official">
                  <p className="font-bold text-navy">Your visa sets your limit.</p>
                  <p className="mt-[5px]">{workConditionsNote}</p>
                </Callout>

                <div className="rounded-xl border border-hairline bg-canvas p-5">
                  <p className="text-[14.5px] font-bold leading-[1.3] text-navy">
                    What you will earn is not a fixed number
                  </p>
                  <p className="mt-[6px] text-[14px] font-medium leading-[1.6] text-muted">
                    {earningsNote}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                <SourceLink source={sources.studentVisaWork} />
                <SourceLink source={sources.minimumWage} />
              </div>
            </div>
          </div>

          {/* 3 — Graduate visa */}
          <div className="rounded-2xl border border-hairline bg-white p-5 shadow-[0_18px_40px_-30px_rgba(1,22,111,0.3)] sm:p-7">
            <StageHeading index={2} title="The Graduate visa" />

            <p className="mt-5 max-w-[74ch] text-[15px] font-medium leading-[1.65] text-ink-soft">
              {graduateVisaIntro}
            </p>

            <div className="mt-5">
              <FactRow facts={graduateVisaTerms} />
            </div>

            {/* The closing window is the one thing on this page with a
                deadline attached, so it gets the strong treatment rather than
                a line inside the paragraph above. */}
            <div className="mt-5 flex gap-[13px] rounded-xl border border-orange/25 bg-orange/[0.05] p-5">
              <ShieldAlert
                size={19}
                strokeWidth={2}
                aria-hidden
                className="mt-[2px] shrink-0 text-orange"
              />
              <div className="min-w-0">
                <p className="text-[14.5px] font-bold leading-[1.3] text-navy">
                  The date you apply decides the length
                </p>
                <p className="mt-[6px] max-w-[70ch] text-[14px] font-medium leading-[1.6] text-ink-soft">
                  {graduateVisaWindow}
                </p>
              </div>
            </div>

            <ul className="mt-5 grid gap-[10px] sm:grid-cols-3">
              {graduateVisaLimits.map((limit) => (
                <li
                  key={limit}
                  className="rounded-xl border border-hairline bg-canvas p-4 text-[13.5px] font-medium leading-[1.55] text-muted"
                >
                  {limit}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
              <SourceLink source={sources.graduateVisa} />
              <Link
                href="/apply/entry-requirements#visa-journey"
                className="text-[12.5px] font-semibold text-blue-link transition-colors duration-200 hover:text-navy"
              >
                The Student visa journey, step by step
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
