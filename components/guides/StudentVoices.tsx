"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Container } from "../ui/Container";
import { AccentText } from "../ui/AccentText";
import {
  studentVoices,
  studentVoicesAreIllustrative,
} from "@/data/guides/student-voices";

/**
 * One quote at a time, with the whole panel reserved for it.
 *
 * A row of three short testimonials is the usual treatment and it flattens
 * them into decoration — three faces nobody reads. A single quote at full
 * width has to be worth the space, which is a useful constraint on what gets
 * written here.
 *
 * NOTHING BELOW IS REAL. The copy in `data/guides/student-voices.ts` is
 * placeholder text and the names say so; the badge stays until it is replaced
 * with quotes Ignition holds consent for. Avatars fall back to initials
 * rather than to stock portraits, because a stock photograph beside a name
 * reads as a real person and a monogram does not.
 */
export function StudentVoices({ id }: { id: string }) {
  const [index, setIndex] = useState(0);
  const voice = studentVoices[index];
  const count = studentVoices.length;

  const go = (next: number) => setIndex((next + count) % count);

  const initials = voice.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section
      id={id}
      className="scroll-mt-[calc(var(--nav-h)_+_4.5rem)] border-y border-hairline bg-white py-[clamp(2.75rem,4.5vw,4.5rem)]"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <div className="max-w-[54ch]">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-blue-link">
                Student voices
              </p>
              {studentVoicesAreIllustrative ? (
                <Badge tone="demo">Example data</Badge>
              ) : null}
            </div>

            <h2 className="mt-3 text-[clamp(1.625rem,2.8vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-navy">
              <AccentText>What students say.</AccentText>
            </h2>
            <p className="mt-4 text-[16px] font-medium leading-[1.6] text-muted">
              The parts of studying in the UK that are hard to work out from a
              prospectus.
            </p>
          </div>

          {count > 1 ? (
            <div className="flex items-center gap-[10px]">
              {(
                [
                  ["Previous quote", ChevronLeft, -1],
                  ["Next quote", ChevronRight, 1],
                ] as const
              ).map(([label, Icon, delta]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => go(index + delta)}
                  aria-label={label}
                  className="flex size-[42px] items-center justify-center rounded-full border border-hairline bg-white text-navy transition-[border-color,background-color] duration-200 hover:border-ring-idle hover:bg-canvas"
                >
                  <Icon size={18} strokeWidth={2.2} aria-hidden />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <figure
          aria-live="polite"
          className="mt-8 rounded-2xl border border-hairline bg-canvas p-6 sm:p-8 lg:p-10"
        >
          <Quote
            size={30}
            strokeWidth={1.6}
            aria-hidden
            className="text-orange/70"
          />

          <blockquote className="mt-5 max-w-[70ch] text-[clamp(1.0625rem,1.65vw,1.375rem)] font-medium leading-[1.55] tracking-[-0.01em] text-navy">
            {voice.quote}
          </blockquote>

          <figcaption className="mt-7 flex items-center gap-[14px] border-t border-hairline pt-6">
            {voice.image ? (
              <Image
                src={voice.image}
                alt=""
                width={48}
                height={48}
                aria-hidden
                className="size-[48px] shrink-0 rounded-full object-cover"
              />
            ) : (
              <span
                aria-hidden
                className="flex size-[48px] shrink-0 items-center justify-center rounded-full border border-hairline bg-white text-[15px] font-bold text-navy"
              >
                {initials}
              </span>
            )}

            <div className="min-w-0">
              <p className="text-[15.5px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
                {voice.name}
              </p>
              <p className="mt-[3px] text-[13.5px] font-medium leading-[1.4] text-muted">
                {voice.course} &middot; {voice.university}
              </p>
            </div>
          </figcaption>
        </figure>

        {count > 1 ? (
          <div className="mt-6 flex items-center gap-[7px]">
            {studentVoices.map((entry, i) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Quote ${i + 1} of ${count}`}
                aria-current={i === index ? "true" : undefined}
                className={`h-[7px] rounded-full transition-[width,background-color] duration-300 ${
                  i === index ? "w-[26px] bg-orange" : "w-[7px] bg-ring-idle hover:bg-faint"
                }`}
              />
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
