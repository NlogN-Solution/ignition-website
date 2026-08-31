import Image from "next/image";
import {
  CalendarDays,
  CircleDollarSign,
  Clock,
  GraduationCap,
  IdCard,
  Lightbulb,
  type LucideIcon,
  TrendingUp,
  Wallet,
} from "lucide-react";
import {
  pswRouteNote,
  workBanner,
  workCards,
  workFootnote,
  workIntro,
  type WorkCard,
} from "@/data/study-in-uk/work";
import student from "@/public/images/student-work-uk.jpg";

/**
 * "Can I work?" answered in numbers rather than in prose.
 *
 * This is the one section on the page that states real money. Everything
 * else here argues; this counts. So it is built as three ledgers rather than
 * three paragraphs — the hours, the weekly rate, the same figure in rupees,
 * a rule, and the monthly total the reader actually came for, in that order
 * down every card. Reading across the three cards compares like with like,
 * which is the whole point of the shape.
 *
 * The rupee lines are set lighter than the sterling ones on purpose. They are
 * a conversion, not a quoted figure, and the footnote's illustrative week is
 * doing real work under the vacation column — setting both in the same weight
 * would present an estimate as a wage.
 *
 * ON THE PALETTE. This section is the only place on the site that leaves the
 * white/canvas ground for a periwinkle one. It earns the departure by being
 * the only section that is a data panel: the tinted plates group five
 * unrelated numbers into one readable object, which a bordered white card at
 * this density does not. Every figure and its review schedule live in
 * `data/study-in-uk/work.ts`.
 */

const cardIcons: Record<WorkCard["icon"], LucideIcon> = {
  clock: Clock,
  cap: GraduationCap,
  passport: IdCard,
};

const statIcons = { calendar: CalendarDays, coin: CircleDollarSign };
const highlightIcons = { wallet: Wallet, chart: TrendingUp };

const plate =
  "rounded-[22px] bg-[linear-gradient(155deg,#e8ecfe_0%,#f1f4ff_55%,#e9eefe_100%)]";

function Card({ card }: { card: WorkCard }) {
  const Icon = cardIcons[card.icon];
  const Highlight = highlightIcons[card.highlight.icon];

  return (
    <div className={`flex h-full flex-col p-[22px] sm:p-[24px] ${plate}`}>
      <div className="flex items-center gap-[18px]">
        <span
          aria-hidden
          className="flex size-[62px] shrink-0 items-center justify-center rounded-[18px] bg-[linear-gradient(150deg,#c8d3fc,#e4eafe)] text-[#1230f2]"
        >
          <Icon size={32} strokeWidth={2} />
        </span>
        <div className="min-w-0">
          <h3 className="text-[clamp(1.3125rem,1.83vw,1.59375rem)] font-extrabold uppercase leading-[1.1] tracking-[0.01em] text-navy">
            {card.title}
          </h3>
          {card.subtitle ? (
            <p className="mt-[3px] text-[clamp(1rem,1.32vw,1.1875rem)] font-medium leading-[1.2] text-navy/75">
              {card.subtitle}
            </p>
          ) : null}
        </div>
      </div>

      {card.lead ? (
        <p className="mt-[20px] text-[clamp(1rem,1.35vw,1.21875rem)] font-medium leading-[1.45] text-[#333a63]">
          {card.lead}
        </p>
      ) : null}

      {/* With a lead sentence the card has one fact, not three, so it is set
          as a plate the sentence runs into rather than as a list of one. */}
      {card.lead ? (
        <div className="mt-[14px] flex items-center gap-[14px] rounded-[15px] bg-[linear-gradient(110deg,#dfe7fc,#eaeffe)] px-[16px] py-[14px]">
          <CalendarDays
            size={26}
            strokeWidth={2}
            aria-hidden
            className="shrink-0 text-[#1230f2]"
          />
          <div className="min-w-0">
            <p className="text-[clamp(1.375rem,1.9vw,1.71875rem)] font-extrabold leading-[1.1] tracking-[-0.01em] text-navy">
              {card.stats[0].label}
            </p>
            <p className="mt-[3px] text-[clamp(0.75rem,0.93vw,0.8125rem)] font-medium leading-[1.25] text-[#3b4270]">
              {pswRouteNote}
            </p>
          </div>
        </div>
      ) : (
        <ul className="mt-[22px] space-y-[7px]">
          {card.stats.map((stat) => {
            const StatIcon = statIcons[stat.icon];
            return (
              <li key={stat.label} className="flex items-center gap-[14px]">
                <span
                  aria-hidden
                  className="flex size-[36px] shrink-0 items-center justify-center rounded-full bg-[#dfe8fd] text-[#1230f2]"
                >
                  <StatIcon size={20} strokeWidth={2.1} />
                </span>
                <span
                  className={`text-[clamp(1.125rem,1.9vw,1.65625rem)] leading-[1.2] tracking-[-0.015em] ${
                    stat.muted
                      ? "font-semibold text-[#3f456e]"
                      : "font-extrabold text-navy"
                  }`}
                >
                  {stat.label}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      {/* The rule and the total are one block so `mt-auto` can float them to
          the foot of the tallest card in the row — the three cards carry a
          different number of stat lines and their totals still have to line
          up across the row. */}
      <div className="mt-auto pt-[22px]">
        <div aria-hidden className="h-px w-full bg-[#c6d0f0]" />

        <div className="mt-[18px] flex items-center gap-[14px] rounded-[15px] bg-[linear-gradient(110deg,#dee7fc,#eaeffe)] px-[16px] py-[15px]">
          <Highlight
            size={28}
            strokeWidth={2}
            aria-hidden
            className="shrink-0 text-[#1230f2]"
          />
          <div className="min-w-0">
            {card.highlight.kicker ? (
              <p className="text-[clamp(0.9375rem,1.25vw,1.125rem)] font-medium leading-[1.2] text-[#3b4270]">
                {card.highlight.kicker}
              </p>
            ) : null}
            <p className="text-[clamp(1.0625rem,1.62vw,1.4375rem)] font-semibold leading-[1.2] tracking-[-0.015em] text-navy">
              {card.highlight.value}
              {card.highlight.strong ? (
                <span className="font-extrabold">{card.highlight.strong}</span>
              ) : null}
            </p>
            <p className="mt-[3px] text-[clamp(0.875rem,1.15vw,1.0625rem)] font-medium leading-[1.25] text-[#3f456e]">
              {card.highlight.note}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WorkInUk({ id }: { id?: string }) {
  return (
    <section
      id={id}
      className="scroll-mt-[calc(var(--nav-h)_+_2rem)] bg-white px-5 py-[clamp(3rem,5vw,4.5rem)] sm:px-8 lg:px-12"
    >
      <div className="mx-auto w-full max-w-[1240px]">
        <div className="grid items-center gap-[clamp(1.75rem,2.5vw,1.75rem)] lg:grid-cols-[1.45fr_1fr]">
          <div>
            <p className="text-[15px] font-bold uppercase tracking-[0.09em] text-blue-link">
              {workIntro.eyebrow}
            </p>
            <h2 className="mt-[18px] max-w-[17ch] text-[clamp(2rem,4.2vw,3.25rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-navy">
              Can international students work in the UK
              <span className="text-orange">?</span>
            </h2>
            <p className="mt-[22px] text-[clamp(1.0625rem,1.68vw,1.46875rem)] font-medium leading-[1.42] text-[#2b3160]">
              {workIntro.body}
            </p>
          </div>

          <div className="overflow-hidden rounded-[18px] shadow-[0_24px_54px_-34px_rgba(1,22,111,0.5)]">
            <Image
              src={student}
              alt={workIntro.imageAlt}
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="aspect-[625/366] w-full object-cover"
            />
          </div>
        </div>

        {/* The middle column is widest because "Official vacations" is the
            longest heading and the only one that would otherwise wrap. */}
        <ul className="mt-[clamp(1.75rem,3vw,2.5rem)] grid gap-[18px] md:grid-cols-2 lg:grid-cols-[1fr_1.14fr_1fr]">
          {workCards.map((card) => (
            <li key={card.id} className="min-w-0">
              <Card card={card} />
            </li>
          ))}
        </ul>

        <div className="mt-[18px] flex flex-wrap items-center gap-x-[22px] gap-y-[14px] rounded-[22px] bg-[linear-gradient(100deg,#dce6fd,#e5ebfe_50%,#d8e1fe)] px-[24px] py-[20px] sm:px-[26px]">
          <span
            aria-hidden
            className="flex size-[52px] shrink-0 items-center justify-center rounded-[16px] bg-[linear-gradient(150deg,#c8d3fc,#e0e8fe)] text-[#1230f2]"
          >
            <Lightbulb size={27} strokeWidth={2} />
          </span>
          <p className="text-[clamp(1.0625rem,1.72vw,1.5rem)] font-extrabold leading-[1.3] tracking-[-0.015em] text-navy">
            {workBanner.headline}
          </p>
          <span aria-hidden className="hidden h-[26px] w-px bg-navy/25 sm:block" />
          <p className="text-[clamp(1.0625rem,1.72vw,1.5rem)] font-medium leading-[1.3] text-[#12206e]">
            {workBanner.body}
          </p>
        </div>

        <p className="mt-[16px] text-[clamp(0.875rem,1.05vw,1rem)] font-medium italic leading-[1.4] text-[#3f456e]">
          {workFootnote}
        </p>
      </div>
    </section>
  );
}
