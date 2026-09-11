"use client";

import Image from "next/image";
import { Clock, ShieldCheck, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { Card } from "../ui/Card";
import { useReveal } from "../ui/motion";
import { trustStats, type TrustStat } from "@/data/home/trust";

/**
 * Two big numbers rather than a paragraph, because a claim like "99% visa
 * success" is undermined rather than supported by surrounding prose — the
 * figure is the whole argument, and a reader either believes a clearly
 * stated number or doesn't. `Card` (white, hairline border) rather than the
 * saturated duotone treatment above: that treatment says "here is a fact
 * about the UK", this section says "here is a fact about us", and the two
 * should not look like the same kind of claim.
 *
 * WHY THE TWO CARDS AREN'T THE SAME SHAPE. The first version gave both stats
 * an identical icon-chip-then-number box, which is the correct shape for a
 * fact but reads as inert for two facts in a row — nothing to look at, only
 * to read. The fix isn't a saturated photo treatment (that would blur the
 * distinction this section exists to make from `WhyUk`); it's giving each
 * stat the visual form its own claim actually has. A visa grant is a real
 * outcome for a real person, so it gets a real, natural-colour photograph —
 * not duotoned — of that outcome. A processing time is a duration with
 * stages inside it, so it gets a small route rather than a bare number, the
 * same "this is a journey" language the timeline elsewhere on the site
 * already uses.
 */
const icons: Record<TrustStat["icon"], LucideIcon> = {
  shield: ShieldCheck,
  clock: Clock,
};

function StatFigure({ entry }: { entry: TrustStat }) {
  return (
    <p className="flex flex-wrap items-baseline gap-x-[10px] text-[clamp(2rem,3.4vw,2.75rem)] font-extrabold leading-none tracking-[-0.02em] text-navy">
      {entry.stat}
      {entry.statNote ? (
        <span className="text-[15px] font-semibold text-muted-light">
          {entry.statNote}
        </span>
      ) : null}
    </p>
  );
}

export function WhyIgnition() {
  const { container, item } = useReveal(0.1);
  const [visaRate, processingTime] = trustStats;
  const VisaIcon = icons[visaRate.icon];
  const ClockIcon = icons[processingTime.icon];

  return (
    <motion.ul {...container} className="grid gap-5 lg:grid-cols-5">
      {/* Visa success rate — the wider card, led by a real photo. */}
      <motion.li {...item} className="min-w-0 lg:col-span-3">
        <Card className="h-full overflow-hidden p-0">
          {visaRate.image ? (
            <div className="relative h-[168px] w-full overflow-hidden sm:h-[196px]">
              <Image
                src={visaRate.image}
                alt="Ignition students celebrating after their visa outcome."
                fill
                sizes="(min-width: 1024px) 620px, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}

          <div className="p-6 sm:p-7">
            {/* Breaks out of the photo above via negative margin rather than
                absolute-positioning inside it — the photo's own
                `overflow-hidden` would clip anything placed past its edge. */}
            <span
              aria-hidden
              className="relative -mt-[50px] mb-5 flex size-[52px] items-center justify-center rounded-2xl border-[3px] border-white bg-navy text-white shadow-[0_14px_30px_-16px_rgba(1,22,111,0.6)]"
            >
              <VisaIcon size={24} strokeWidth={2} />
            </span>

            <StatFigure entry={visaRate} />

            <p className="mt-[10px] text-[13px] font-bold uppercase tracking-[0.08em] text-blue-link">
              {visaRate.label}
            </p>

            <p className="mt-[14px] text-[15px] font-medium leading-[1.6] text-muted">
              {visaRate.body}
            </p>
          </div>
        </Card>
      </motion.li>

      {/* Processing time — the narrower card, led by a small route instead
          of a bare number. */}
      <motion.li {...item} className="min-w-0 lg:col-span-2">
        <Card className="h-full p-6 sm:p-7">
          <span
            aria-hidden
            className="flex size-[52px] items-center justify-center rounded-2xl bg-navy/[0.06] text-navy"
          >
            <ClockIcon size={24} strokeWidth={2} />
          </span>

          {processingTime.steps ? (
            <ol className="mt-6 flex items-center">
              {processingTime.steps.map((step, i) => {
                const last = i === processingTime.steps!.length - 1;
                return (
                  <li key={step} className="flex flex-1 items-center last:flex-none">
                    <div className="flex flex-col items-start gap-[7px]">
                      <span
                        aria-hidden
                        className={`size-[10px] rounded-full ${
                          last ? "bg-orange" : "bg-navy"
                        }`}
                      />
                      <span className="text-[11.5px] font-semibold uppercase tracking-[0.04em] text-muted-light">
                        {step}
                      </span>
                    </div>
                    {!last ? (
                      <span aria-hidden className="mx-[10px] h-px flex-1 bg-hairline" />
                    ) : null}
                  </li>
                );
              })}
            </ol>
          ) : null}

          <div className="mt-6">
            <StatFigure entry={processingTime} />
          </div>

          <p className="mt-[10px] text-[13px] font-bold uppercase tracking-[0.08em] text-blue-link">
            {processingTime.label}
          </p>

          <p className="mt-[14px] text-[15px] font-medium leading-[1.6] text-muted">
            {processingTime.body}
          </p>
        </Card>
      </motion.li>
    </motion.ul>
  );
}
