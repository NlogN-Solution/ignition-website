"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Headset,
} from "lucide-react";
import { routeIcons } from "./icons";
import {
  routeGuidance,
  routeHero,
  routePhases,
  type RouteItem,
  type RoutePhase,
} from "@/data/journey/route";
import bridge from "@/public/images/why-uk-hero-bridge.jpg";

/**
 * The route to the UK as one instrument: a three-chapter progress bar at the
 * top, an index down the left, and the chapter itself open on the right.
 *
 * WHY IT IS ONE COMPONENT. The stepper, the index and the panel are three
 * views of a single selection — pick a chapter anywhere and all three move.
 * Splitting them into three files means either lifting the state into a
 * context nobody else reads, or letting the hero and the panel disagree about
 * which chapter is open. The hero copy above the stepper comes along for the
 * ride; it is static markup and costs nothing to ship inside the boundary.
 *
 * WHAT REPLACED WHAT. This is the third attempt at showing the whole journey
 * on one screen. Ten equal cells (`journeyPipeline`) was an accurate list and
 * a poor map. A dotted rail with the stages hanging under it read better but
 * still could not say what any stage *involves* without a click that left the
 * page. Here the map and the detail are the same object: the answer opens in
 * place, so a reader can look at "what is a CAS" without losing their place
 * in the sequence that leads to it.
 *
 * SELECTION MODEL. One chapter and one item are open at a time. Choosing a
 * chapter opens its first item, because a chapter with everything collapsed
 * is a heading with nothing under it, and the panel would be empty on arrival.
 */
export function JourneyRoute() {
  const [phaseId, setPhaseId] = useState(routePhases[0].id);
  const [itemId, setItemId] = useState(routePhases[0].items[0].id);

  const phaseIndex = routePhases.findIndex((p) => p.id === phaseId);
  const phase = routePhases[phaseIndex];

  function openPhase(next: RoutePhase) {
    setPhaseId(next.id);
    setItemId(next.items[0].id);
  }

  return (
    <>
      <section className="relative overflow-hidden bg-white">
        {/* The plate is the same photograph the "why the UK" hero uses, and it
            carries the same baked white ramp down its left edge — see
            `components/study-in-uk/WhyUkHero.tsx` for why that is in the
            pixels rather than in CSS. Cropped tighter here: this hero is a
            band, not a full screen, and the stepper sits over its foot. */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[57%] select-none lg:block">
          <Image
            src={bridge}
            alt=""
            aria-hidden
            preload
            sizes="57vw"
            className="h-full w-full object-cover object-[50%_38%]"
          />
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[45%] bg-[linear-gradient(to_top,#fff,rgba(255,255,255,0))]"
          />
        </div>

        {/* The arc is the flight path the headline describes, drawn rather
            than photographed so it can land its orange terminus on the same
            spot at every width. */}
        <svg
          aria-hidden
          viewBox="0 0 400 150"
          fill="none"
          preserveAspectRatio="none"
          className="pointer-events-none absolute right-[6%] top-[6%] hidden h-[26%] w-[38%] text-white lg:block"
        >
          <path
            d="M0 148C60 92 130 26 250 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.85"
          />
          <circle cx="250" cy="10" r="7" className="fill-orange" />
        </svg>

        <div className="relative mx-auto w-full max-w-[1240px] px-5 pb-[clamp(2rem,3vw,2.75rem)] pt-[clamp(2.5rem,6.7vw,5.3125rem)] sm:px-8 lg:px-12">
          <p className="text-[16.5px] font-bold uppercase tracking-[0.09em] text-blue-link">
            {routeHero.eyebrow}
          </p>

          {/* The two lines are set rather than left to wrap. The reference
              breaks after "to", and no max-width can produce that: its second
              line is longer than its first plus the word that would follow,
              so any measure wide enough to hold line two pulls "your" up.
              Below `sm` the spans wrap normally and the break falls out. */}
          <h1 className="mt-[26px] max-w-[min(100%,640px)] text-[clamp(2.25rem,4.35vw,3.625rem)] font-bold leading-[1.14] tracking-[-0.035em] text-navy">
            <span className="sm:block">From first idea to </span>
            <span className="sm:block">
              your first week in the <span className="text-orange">UK.</span>
            </span>
          </h1>

          <p className="mt-[24px] max-w-[min(100%,570px)] text-[clamp(1.0625rem,1.5vw,1.28rem)] font-medium leading-[1.55] text-muted">
            {routeHero.intro}
          </p>

          <ol className="mt-[clamp(2.25rem,4vw,4.2rem)] grid gap-[24px] md:grid-cols-3">
            {routePhases.map((p, i) => {
              const Icon = routeIcons[p.icon];
              const active = p.id === phaseId;

              return (
                <li key={p.id} className="min-w-0">
                  <button
                    type="button"
                    onClick={() => openPhase(p)}
                    aria-current={active ? "step" : undefined}
                    className={`flex h-full w-full items-center gap-[16px] rounded-[16px] bg-white p-[18px] text-left transition-shadow duration-200 ${
                      active
                        ? "shadow-[0_18px_40px_-22px_rgba(1,22,111,0.5)]"
                        : "shadow-[0_14px_34px_-24px_rgba(1,22,111,0.4)] hover:shadow-[0_18px_40px_-22px_rgba(1,22,111,0.45)]"
                    }`}
                  >
                    <span
                      className={`flex size-[48px] shrink-0 items-center justify-center rounded-full text-[17px] font-bold tabular-nums ${
                        active
                          ? "bg-blue-bright text-white"
                          : "border border-ring-idle text-navy"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden
                      className="flex size-[48px] shrink-0 items-center justify-center rounded-full bg-canvas text-blue-link"
                    >
                      <Icon size={22} strokeWidth={1.9} />
                    </span>
                    <span className="min-w-0">
                      <span
                        className={`block text-[14px] font-bold uppercase tracking-[0.045em] ${
                          active ? "text-blue-link" : "text-navy"
                        }`}
                      >
                        {p.label}
                      </span>
                      <span className="mt-[6px] block text-[15px] font-medium leading-[1.4] text-muted">
                        {p.summary}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* The rail reads progress, so it fills only as far as the chapter
              the reader has opened. Decorative — the list above carries the
              sequence and the current step. */}
          <div aria-hidden className="relative mt-[16px] hidden h-[5px] md:block">
            <div className="absolute inset-0 rounded-full bg-ring-idle" />
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(to_right,var(--color-navy),var(--color-blue-bright))] transition-[width] duration-500 ease-out"
              style={{ width: `${16.667 + phaseIndex * 33.333}%` }}
            />
            {routePhases.map((p, i) => (
              <span
                key={p.id}
                style={{ left: `${16.667 + i * 33.333}%` }}
                className={`absolute top-1/2 size-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-300 ${
                  i <= phaseIndex ? "bg-blue-bright" : "bg-muted-light"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1240px] px-5 py-[clamp(2rem,3.5vw,3rem)] sm:px-8 lg:px-12">
        <div className="grid gap-[22px] lg:grid-cols-[minmax(0,314px)_minmax(0,1fr)] lg:items-start">
          <div>
            <nav
              aria-label="Journey chapters"
              className="overflow-hidden rounded-[16px] border border-hairline bg-white"
            >
              {routePhases.map((p, i) => {
                const open = p.id === phaseId;

                return (
                  <div key={p.id} className={i > 0 ? "border-t border-hairline" : ""}>
                    <button
                      type="button"
                      onClick={() => openPhase(p)}
                      aria-expanded={open}
                      className={`flex w-full items-center gap-[18px] px-[22px] py-[24px] text-left transition-colors duration-200 ${
                        open ? "bg-navy text-white" : "text-navy hover:bg-canvas"
                      }`}
                    >
                      <span className="text-[15px] font-bold tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1 text-[15px] font-bold uppercase tracking-[0.045em]">
                        {p.label}
                      </span>
                      {open ? (
                        <ChevronUp size={18} strokeWidth={2.4} aria-hidden />
                      ) : (
                        <ChevronDown
                          size={18}
                          strokeWidth={2.4}
                          aria-hidden
                          className="text-navy/60"
                        />
                      )}
                    </button>

                    {open ? (
                      <ul className="py-[6px]">
                        {p.items.map((item) => {
                          const Icon = routeIcons[item.icon];
                          const current = item.id === itemId;

                          return (
                            <li key={item.id}>
                              <button
                                type="button"
                                onClick={() => setItemId(item.id)}
                                aria-current={current ? "true" : undefined}
                                className={`flex w-full items-center gap-[14px] py-[15px] pr-[18px] text-left transition-colors duration-200 ${
                                  current
                                    ? "border-l-[5px] border-navy bg-[#eef4fe] pl-[17px]"
                                    : "pl-[22px] hover:bg-canvas"
                                }`}
                              >
                                <Icon
                                  size={22}
                                  strokeWidth={1.8}
                                  aria-hidden
                                  className={`shrink-0 ${
                                    current ? "text-blue-link" : "text-muted-light"
                                  }`}
                                />
                                <span
                                  className={`min-w-0 flex-1 text-[14px] leading-[1.3] ${
                                    current
                                      ? "font-semibold text-blue-link"
                                      : "font-medium text-muted"
                                  }`}
                                >
                                  {item.label}
                                </span>
                                {current ? (
                                  <ChevronRight
                                    size={17}
                                    strokeWidth={2.4}
                                    aria-hidden
                                    className="shrink-0 text-blue-link"
                                  />
                                ) : null}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </div>
                );
              })}
            </nav>

            <div className="mt-[24px] rounded-[16px] border border-hairline bg-white/60 p-[24px]">
              <div className="flex gap-[18px]">
                <span
                  aria-hidden
                  className="flex size-[48px] shrink-0 items-center justify-center rounded-full bg-canvas text-blue-link"
                >
                  <Headset size={23} strokeWidth={1.9} />
                </span>
                <div className="min-w-0">
                  <p className="text-[15px] font-bold leading-[1.3] text-navy">
                    {routeGuidance.title}
                  </p>
                  <p className="mt-[6px] text-[14.5px] font-medium leading-[1.5] text-muted">
                    {routeGuidance.body}
                  </p>
                </div>
              </div>

              <Link
                href={routeGuidance.cta.href}
                className="group mt-[20px] inline-flex h-[46px] items-center gap-[12px] rounded-[10px] border border-hairline bg-white px-[20px] text-[15px] font-semibold text-blue-link transition-colors duration-200 hover:border-ring-idle hover:bg-canvas"
              >
                {routeGuidance.cta.label}
                <ArrowRight
                  size={16}
                  strokeWidth={2.4}
                  aria-hidden
                  className="shrink-0 transition-transform duration-200 group-hover:translate-x-[3px]"
                />
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[16px] border border-hairline bg-white">
            {phase.items.map((item, i) => (
              <div
                key={item.id}
                className={i > 0 ? "border-t border-hairline" : ""}
              >
                {item.id === itemId ? (
                  <OpenItem item={item} phase={phase} />
                ) : (
                  <ClosedItem item={item} onOpen={() => setItemId(item.id)} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function OpenItem({ item, phase }: { item: RouteItem; phase: RoutePhase }) {
  return (
    <div className="p-[24px] sm:p-[30px]">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="text-[13.5px] font-bold uppercase tracking-[0.1em] text-blue-link">
            {phase.label}
          </p>
          <h2 className="mt-[10px] text-[clamp(1.3125rem,2.02vw,1.625rem)] font-bold leading-[1.2] tracking-[-0.02em] text-navy">
            {item.label}
          </h2>
          <p className="mt-[10px] max-w-[60ch] text-[16px] font-medium leading-[1.5] text-muted">
            {item.summary}
          </p>
        </div>

        {/* Decorative: the row is opened and closed from the collapsed rows
            and the index, both of which are real buttons. A second control
            for the same state would be a third thing to tab through for no
            new destination. */}
        <span
          aria-hidden
          className="hidden size-[42px] shrink-0 items-center justify-center rounded-full border border-hairline text-navy sm:flex"
        >
          <ChevronUp size={19} strokeWidth={2.2} />
        </span>
      </div>

      <ul className="mt-[24px] grid gap-[14px] sm:grid-cols-2 lg:grid-cols-4">
        {item.cards.map((card) => {
          const Icon = routeIcons[card.icon];

          return (
            <li
              key={card.title}
              className="flex flex-col items-center rounded-[14px] border border-hairline px-[16px] py-[22px] text-center"
            >
              <span
                aria-hidden
                className="flex size-[52px] items-center justify-center rounded-[15px] bg-[#eef1fd] text-blue-link"
              >
                <Icon size={24} strokeWidth={1.9} />
              </span>
              <p className="mt-[14px] text-[13px] font-bold leading-[1.3] text-navy">
                {card.title}
              </p>
              <p className="mt-[7px] text-[12.5px] font-medium leading-[1.55] text-muted">
                {card.body}
              </p>
            </li>
          );
        })}
      </ul>

      <Link
        href={item.href}
        className="group mt-[22px] inline-flex items-center gap-[10px] text-[15px] font-semibold text-blue-link"
      >
        Read the full guide
        <ArrowRight
          size={16}
          strokeWidth={2.4}
          aria-hidden
          className="shrink-0 transition-transform duration-200 group-hover:translate-x-[3px]"
        />
      </Link>
    </div>
  );
}

function ClosedItem({ item, onOpen }: { item: RouteItem; onOpen: () => void }) {
  const Icon = routeIcons[item.icon];

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-expanded={false}
      className="group flex w-full items-center gap-[18px] p-[24px] text-left transition-colors duration-200 hover:bg-canvas sm:px-[30px]"
    >
      <span
        aria-hidden
        className="flex size-[46px] shrink-0 items-center justify-center rounded-[13px] bg-[#eef1fd] text-blue-link"
      >
        <Icon size={22} strokeWidth={1.9} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[clamp(1rem,1.35vw,1.125rem)] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
          {item.label}
        </span>
        <span className="mt-[5px] block text-[15px] font-medium leading-[1.45] text-muted">
          {item.summary}
        </span>
      </span>
      <span
        aria-hidden
        className="flex size-[36px] shrink-0 items-center justify-center rounded-full bg-canvas text-navy transition-colors duration-200 group-hover:bg-white"
      >
        <ChevronDown size={18} strokeWidth={2.3} />
      </span>
    </button>
  );
}
