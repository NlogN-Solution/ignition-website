"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  BookOpen,
  ClipboardList,
  Compass,
  Landmark,
  Luggage,
  Plane,
  type LucideIcon,
} from "lucide-react";
import { Card } from "../ui/Card";
import { useReveal } from "../ui/motion";
import { intents, type Intent } from "@/data/home/intents";
import swoosh from "@/public/images/swoosh.png";

/**
 * Five ways into the product — but not five equal ones.
 *
 * The original treatment gave every option the same box, the same bare line
 * icon and the same lonely arrow parked below a stretch of empty card. That is
 * an honest layout for equivalent options and a misleading one here: a student
 * who does not know what to study cannot use the others, and the career quiz
 * is the entry point the hero and the header both already point at. So the
 * quiz gets the width, the artwork and the one concrete detail a student
 * actually wants before starting something ("how long is this?"), and the rest
 * tighten into a quieter row beside it.
 *
 * The grid dropped from six cells to five when course search moved up under
 * the hero. Six closed a 3x3 with the feature spanning 2x2; five does not, so
 * the breakpoint moved to four columns, where the feature's 2x2 block and the
 * four remaining cards fill two rows exactly and the grid still closes square.
 */

const icons: Record<Intent["icon"], LucideIcon> = {
  compass: Compass,
  bookOpen: BookOpen,
  landmark: Landmark,
  clipboard: ClipboardList,
  plane: Plane,
  luggage: Luggage,
};

/** The navy line-icon with the orange dot, in a tinted tile. */
function IconTile({ icon, tone = "light" }: { icon: Intent["icon"]; tone?: "light" | "dark" }) {
  const Icon = icons[icon];
  const dark = tone === "dark";

  return (
    <span
      className={`relative flex size-[46px] shrink-0 items-center justify-center rounded-[12px] border transition-colors duration-200 ${
        dark
          ? "border-white/15 bg-white/10 text-white"
          : "border-hairline bg-canvas text-navy group-hover:border-ring-idle"
      }`}
    >
      <Icon size={22} strokeWidth={1.7} aria-hidden />
      {/* The orange dot is the mark already used beside the match-screen
          highlights — kept, just anchored to the tile instead of floating. */}
      <span
        aria-hidden
        className="absolute right-[9px] top-[11px] size-[5px] rounded-full bg-orange"
      />
    </span>
  );
}

export function IntentCards() {
  const { container, item } = useReveal(0.06);
  const [feature, ...rest] = intents;
  const FeatureIcon = icons[feature.icon];

  return (
    <motion.ul
      {...container}
      /**
       * On `lg` the feature occupies a 2x2 block and the four others fill the
       * remaining four cells exactly, so the 4x2 grid closes with no ragged
       * row. Heights come from the content: the two cards stacked beside the
       * feature set its height between them, which is why nothing here needs a
       * fixed `min-height` to stop the small cards stretching.
       */
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {/* Feature: the career quiz. */}
      <motion.li {...item} className="min-w-0 sm:col-span-2 lg:row-span-2">
        <Link
          href={feature.href}
          className="group relative isolate flex h-full min-h-[236px] flex-col overflow-hidden rounded-xl border border-navy bg-navy p-6 shadow-[0_18px_40px_-24px_rgba(1,22,111,0.55)] transition-[transform,box-shadow] duration-200 hover:-translate-y-[2px] hover:shadow-[0_28px_56px_-24px_rgba(1,22,111,0.65)] sm:p-8"
        >
          {/* The brand's rising path, bleeding off the right edge. Hidden
              below sm, where the card is too narrow to carry it without
              crowding the copy. */}
          <Image
            src={swoosh}
            alt=""
            aria-hidden
            sizes="320px"
            className="pointer-events-none absolute -right-6 bottom-[-12%] -z-10 hidden h-[124%] w-auto select-none opacity-[0.16] mix-blend-screen sm:block"
          />

          <div className="flex items-start justify-between gap-4">
            <IconTile icon={feature.icon} tone="dark" />
            <ArrowUpRight
              size={20}
              strokeWidth={2.4}
              aria-hidden
              className="mt-[3px] shrink-0 text-white/45 transition-[transform,color] duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:text-orange"
            />
          </div>

          <h3 className="mt-6 max-w-[16ch] text-[clamp(1.375rem,2.1vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.018em] text-white">
            {feature.title}
            <span className="text-orange">.</span>
          </h3>
          <p className="mt-3 max-w-[42ch] text-[15.5px] font-medium leading-[1.55] text-white/70">
            {feature.description} Answer eight questions and we&rsquo;ll show you
            the careers that fit, and the UK degrees that lead to them.
          </p>

          <p className="mt-auto pt-7 text-[13.5px] font-semibold text-white/55">
            8 questions
            <span aria-hidden className="px-2 text-white/25">
              &middot;
            </span>
            about 4 minutes
            <span aria-hidden className="px-2 text-white/25">
              &middot;
            </span>
            no account needed
          </p>
        </Link>
      </motion.li>

      {rest.map((intent) => (
        <motion.li key={intent.id} {...item} className="min-w-0">
          <Card href={intent.href} className="h-full p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <IconTile icon={intent.icon} />
              <ArrowUpRight
                size={18}
                strokeWidth={2.4}
                aria-hidden
                className="mt-[3px] shrink-0 text-faint transition-[transform,color] duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:text-blue-link"
              />
            </div>

            <h3 className="mt-5 text-[17.5px] font-bold leading-[1.28] tracking-[-0.012em] text-navy">
              {intent.title}
            </h3>
            <p className="mt-[6px] text-[14.5px] font-medium leading-[1.5] text-muted">
              {intent.description}
            </p>
          </Card>
        </motion.li>
      ))}
    </motion.ul>
  );
}
