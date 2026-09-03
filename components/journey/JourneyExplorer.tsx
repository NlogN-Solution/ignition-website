"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Headphones, Info } from "lucide-react";
import Link from "next/link";
import { Card } from "../ui/Card";
import { Checklist } from "../ui/Checklist";
import { Timeline } from "../ui/Timeline";
import {
  studyUkStages,
  type CostTableRow,
  type JourneyGroup,
  type JourneyTopic,
  type JourneyTrack,
} from "@/data/guides/study-uk-journey";
import { gbpToNprRate, nprRateNotice } from "@/data/guides/money";
import { whatsappUrl } from "@/lib/config";

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

const npr = (amountGBP: number) =>
  `NPR ${Math.round(amountGBP * gbpToNprRate).toLocaleString("en-IN")}`;

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * The interactive centre of /start: a three-stage stepper, a sidebar naming
 * every topic in the journey, and — for the whole stage, not just one topic
 * at a time — an accordion that opens each one in place.
 *
 * NOTHING HERE LINKS OUT TO CONTENT, with one deliberate exception. Every
 * topic carries enough of its own (a requirement grid, a checklist, a short
 * timeline or a few orientation points) to be read where it stands, because
 * the point of this page is that a student can follow the entire route
 * without being sent elsewhere to understand any one part of it.
 * `data/guides/study-uk-journey.ts` says which guide each piece is borrowed
 * from — and it *is* borrowed, not copied, so editing a guide edits this page.
 *
 * The exception is the entry-requirement tracks, which end on a link to the
 * universities. That is not a shortfall in the content: the figures there are
 * Ignition's general guidance, and only the university publishes the exact
 * requirement for one course in one intake. Sending a reader onward at that
 * point is the honest thing to do, and saying nothing would be the dishonest
 * one.
 *
 * What persists and what does not is deliberate. Checklist ticks persist,
 * through the storage the imported checklists already carry, so progress made
 * here shows on the guide the checklist came from and the other way round.
 * Which stage and topic are open is ordinary component state — but it is
 * mirrored into the URL hash, so a student can send someone "the visa
 * documents part" and have that be a real place. The hash is written with
 * `replaceState`, so it never adds history entries a Back button has to wade
 * through.
 */
export function JourneyExplorer() {
  const reduce = useReducedMotion();

  const [stageIndex, setStageIndex] = useState(0);
  const [topicId, setTopicId] = useState(studyUkStages[0].topics[0].id);
  /**
   * Collapsing every topic is a real state, not an accident.
   *
   * The open card's control points up, which promises it can be closed. Making
   * that promise good gives a reader who wants the shape of a stage rather
   * than its detail a way to see all five topics at once.
   */
  const [open, setOpen] = useState(true);

  const contentRef = useRef<HTMLDivElement>(null);
  /** Suppresses the scroll-into-view on the very first paint and on hash restore. */
  const settled = useRef(false);

  const stage = studyUkStages[stageIndex];
  const topic = stage.topics.find((entry) => entry.id === topicId) ?? stage.topics[0];
  const topicIndex = stage.topics.findIndex((entry) => entry.id === topic.id);
  const otherTopics = stage.topics.filter((entry) => entry.id !== topic.id);
  const nextStage = studyUkStages[stageIndex + 1];

  // Sync from the hash on mount — reading `location` during render would
  // differ between the server pass and the client one — and again whenever it
  // changes. The second half matters more than it looks: without it, opening
  // a `#visa-documents` link while already on this page does nothing at all,
  // because the browser has no navigation to perform and this component has
  // no reason to re-read. Writes below use `replaceState`, which never fires
  // `hashchange`, so there is no loop here.
  useEffect(() => {
    const sync = () => {
      const wanted = window.location.hash.replace(/^#/, "");
      if (!wanted) return;

      const found = studyUkStages.findIndex((entry) =>
        entry.topics.some((candidate) => candidate.id === wanted),
      );
      if (found < 0) return;

      setStageIndex(found);
      setTopicId(wanted);
      setOpen(true);
    };

    sync();
    settled.current = true;

    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const select = useCallback(
    (nextTopicId: string, nextStageIndex = stageIndex) => {
      setStageIndex(nextStageIndex);
      setTopicId(nextTopicId);
      setOpen(true);

      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", `#${nextTopicId}`);
      }

      // Opening a topic from a row further down the page leaves the reader
      // looking at the row they clicked while the content appears above them.
      // On a phone that reads as nothing having happened.
      if (settled.current) {
        requestAnimationFrame(() =>
          contentRef.current?.scrollIntoView({
            behavior: reduce ? "auto" : "smooth",
            block: "start",
          }),
        );
      }
    },
    [stageIndex, reduce],
  );

  function selectStage(index: number) {
    select(studyUkStages[index].topics[0].id, index);
  }

  return (
    <div>
      <div className="relative isolate">
        <div
          aria-hidden
          className="absolute inset-x-0 top-1/2 -z-10 hidden h-[2px] -translate-y-1/2 bg-[linear-gradient(to_right,var(--color-navy),var(--color-blue-bright)_50%,var(--color-orange))] sm:block"
        />
        <ol className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          {studyUkStages.map((entry, index) => {
            const active = index === stageIndex;
            const done = index < stageIndex;

            return (
              <li key={entry.id}>
                <button
                  type="button"
                  onClick={() => selectStage(index)}
                  aria-current={active ? "step" : undefined}
                  className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-[transform,box-shadow,background-color,border-color] duration-200 sm:p-5 ${
                    active
                      ? "border-navy bg-navy shadow-[0_20px_44px_-26px_rgba(1,22,111,0.75)]"
                      : "border-hairline bg-white hover:-translate-y-[1px] hover:border-ring-idle hover:shadow-[0_18px_40px_-28px_rgba(1,22,111,0.28)]"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`flex size-[30px] shrink-0 items-center justify-center rounded-full border text-[13px] font-bold tabular-nums ${
                      active
                        ? "border-white/25 bg-white/15 text-white"
                        : done
                          ? "border-navy/20 bg-navy/[0.07] text-navy"
                          : "border-hairline bg-canvas text-muted-light"
                    }`}
                  >
                    {done ? <Check size={14} strokeWidth={3} /> : String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block text-[15px] font-bold leading-[1.3] tracking-[-0.01em] ${
                        active ? "text-white" : "text-navy"
                      }`}
                    >
                      {entry.label}
                    </span>
                    <span
                      className={`mt-[4px] block text-[13.5px] font-medium leading-[1.45] ${
                        active ? "text-white/70" : "text-muted"
                      }`}
                    >
                      {entry.summary}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,1fr)] lg:gap-8">
        <div className="lg:sticky lg:top-[calc(var(--nav-h)_+_2rem)] lg:self-start">
          {/*
            The rail lists every stage, not only the open one. A journey page
            whose navigation shows a fifth of the journey is asking the reader
            to trust that the rest exists; showing all three named stages with
            their topic counts is what makes the route legible before it is
            walked.
          */}
          <nav aria-label="Journey stages and topics">
            <ul className="flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
              {studyUkStages.map((entry, index) => {
                const current = index === stageIndex;

                return (
                  <li key={entry.id} className="shrink-0 lg:shrink">
                    <button
                      type="button"
                      onClick={() => selectStage(index)}
                      aria-expanded={current}
                      className={`flex w-full items-center gap-[10px] whitespace-nowrap rounded-lg border px-4 py-[11px] text-left transition-colors duration-200 lg:whitespace-normal ${
                        current
                          ? "border-navy bg-navy text-white"
                          : "border-hairline bg-white text-muted hover:border-ring-idle hover:text-navy"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`text-[12.5px] font-bold tabular-nums ${current ? "text-white/60" : "text-muted-light"}`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-[14px] font-bold tracking-[-0.005em]">
                        {entry.label}
                      </span>
                      <ChevronDown
                        size={16}
                        strokeWidth={2.4}
                        aria-hidden
                        className={`hidden shrink-0 transition-transform duration-200 lg:block ${
                          current ? "rotate-180 text-white/70" : "text-muted-light"
                        }`}
                      />
                    </button>

                    {current ? (
                      <ul className="mt-1 hidden lg:block lg:border-l lg:border-hairline">
                        {entry.topics.map((candidate) => {
                          const selected = candidate.id === topic.id && open;

                          return (
                            <li key={candidate.id}>
                              <button
                                type="button"
                                onClick={() => select(candidate.id, index)}
                                aria-current={selected ? "true" : undefined}
                                className={`-ml-px flex w-full items-center gap-[10px] border-l-2 px-4 py-[9px] text-left text-[14px] font-semibold transition-colors duration-200 ${
                                  selected
                                    ? "border-l-orange text-navy"
                                    : "border-l-transparent text-muted hover:border-l-ring-idle hover:text-navy"
                                }`}
                              >
                                <candidate.icon size={15} strokeWidth={2.1} aria-hidden className="shrink-0" />
                                <span className="min-w-0 flex-1">{candidate.title}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* On a phone the stage buttons above scroll horizontally and hide
              their topics, so the topics get their own strip. */}
          <ul className="mt-2 flex gap-2 overflow-x-auto pb-2 lg:hidden">
            {stage.topics.map((candidate) => {
              const selected = candidate.id === topic.id && open;
              return (
                <li key={candidate.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => select(candidate.id)}
                    aria-current={selected ? "true" : undefined}
                    className={`flex items-center gap-[8px] whitespace-nowrap rounded-lg border px-[13px] py-[9px] text-[13.5px] font-semibold transition-colors duration-200 ${
                      selected
                        ? "border-orange bg-orange/[0.06] text-navy"
                        : "border-hairline bg-white text-muted hover:border-ring-idle hover:text-navy"
                    }`}
                  >
                    <candidate.icon size={15} strokeWidth={2.1} aria-hidden />
                    {candidate.title}
                  </button>
                </li>
              );
            })}
          </ul>

          <Card tone="flat" className="mt-4 hidden p-5 lg:block">
            <span
              aria-hidden
              className="flex size-[38px] items-center justify-center rounded-[11px] bg-navy/[0.06] text-navy"
            >
              <Headphones size={18} strokeWidth={2} />
            </span>
            <p className="mt-3 text-[15px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
              Need personal guidance?
            </p>
            <p className="mt-[6px] text-[13.5px] font-medium leading-[1.5] text-muted">
              Talk to an adviser and get clarity at any step of this journey.
            </p>
            <a
              href={whatsappUrl("the journey to the UK")}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex items-center gap-[8px] text-[14px] font-bold text-blue-link transition-colors duration-200 hover:text-navy"
            >
              Talk to an adviser
              <ArrowRight
                size={15}
                strokeWidth={2.4}
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-[2px]"
              />
            </a>
          </Card>
        </div>

        <div
          ref={contentRef}
          className="min-w-0 space-y-4 scroll-mt-[calc(var(--nav-h)_+_1rem)]"
        >
          <motion.div
            /* Keyed on the topic alone. Including `open` here would remount
               the whole card on every collapse, replaying the entrance
               animation for a state change that is not an arrival — and
               detaching the header button mid-interaction. */
            key={topic.id}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.35, ease }}
          >
            <Card className="p-6 sm:p-8">
              {/* The whole header is the collapse control, so the chevron is
                  an affordance rather than the only target. */}
              <button
                type="button"
                onClick={() => setOpen((previous) => !previous)}
                aria-expanded={open}
                aria-controls={`journey-topic-${topic.id}`}
                className="flex w-full items-start justify-between gap-4 text-left"
              >
                <span className="flex items-center gap-[14px]">
                  <span
                    aria-hidden
                    className="flex size-[42px] shrink-0 items-center justify-center rounded-[12px] bg-navy/[0.06] text-navy"
                  >
                    <topic.icon size={20} strokeWidth={2} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[12px] font-bold uppercase tracking-[0.14em] text-blue-link">
                      {stage.label}
                      <span className="ml-2 font-semibold tracking-normal text-muted-light">
                        {topicIndex + 1} of {stage.topics.length}
                      </span>
                    </span>
                    <span className="mt-[2px] block text-[19px] font-bold leading-[1.25] tracking-[-0.012em] text-navy sm:text-[21px]">
                      {topic.title}
                    </span>
                  </span>
                </span>
                <span
                  aria-hidden
                  className="mt-[4px] flex size-[32px] shrink-0 items-center justify-center rounded-full border border-hairline bg-white text-muted-light transition-colors duration-200 hover:border-ring-idle hover:text-navy"
                >
                  <ChevronDown
                    size={17}
                    strokeWidth={2.4}
                    className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                  />
                </span>
              </button>

              <div id={`journey-topic-${topic.id}`} hidden={!open}>
                <p className="mt-4 max-w-[62ch] text-[15.5px] font-medium leading-[1.6] text-muted">
                  {topic.blurb}
                </p>

                {topic.costTable ? <CostTable rows={topic.costTable} /> : null}

                {topic.details ? (
                  <ul className="mt-6 space-y-3">
                    {topic.details.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span
                          aria-hidden
                          className="mt-[3px] flex size-[18px] shrink-0 items-center justify-center rounded-full bg-navy/[0.07] text-navy"
                        >
                          <Check size={11} strokeWidth={3} />
                        </span>
                        <span className="text-[15px] font-medium leading-[1.55] text-ink-soft">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {topic.tracks ? (
                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    {topic.tracks.map((track) => (
                      <TrackCard key={track.id} track={track} />
                    ))}
                  </div>
                ) : null}

                {topic.sharedGroups ? (
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {topic.sharedGroups.map((group) => (
                      <div
                        key={group.title}
                        className="rounded-2xl border border-hairline bg-white p-5 shadow-[0_14px_32px_-26px_rgba(1,22,111,0.24)] sm:p-6"
                      >
                        <GroupBody group={group} />
                      </div>
                    ))}
                  </div>
                ) : null}

                {topic.timeline ? (
                  <div className="mt-7">
                    <Timeline stages={topic.timeline} />
                  </div>
                ) : null}

                {topic.checklist ? (
                  <div className="mt-6">
                    <Checklist id={topic.checklist.id} items={topic.checklist.items} />
                  </div>
                ) : null}

                {/* The journey walks forward. On the last topic of a stage the
                    next thing to do is the next stage, and saying so is the
                    difference between a page you read and a route you follow. */}
                {topicIndex === stage.topics.length - 1 && nextStage ? (
                  <button
                    type="button"
                    onClick={() => selectStage(stageIndex + 1)}
                    className="group mt-8 flex w-full items-center justify-between gap-4 rounded-xl border border-hairline bg-canvas/60 p-4 text-left transition-colors duration-200 hover:border-ring-idle hover:bg-canvas"
                  >
                    <span className="min-w-0">
                      <span className="block text-[12px] font-bold uppercase tracking-[0.14em] text-muted-light">
                        Next stage
                      </span>
                      <span className="mt-[3px] block text-[15.5px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
                        {nextStage.label}
                      </span>
                    </span>
                    <ArrowRight
                      size={18}
                      strokeWidth={2.4}
                      aria-hidden
                      className="shrink-0 text-blue-link transition-transform duration-200 group-hover:translate-x-[3px]"
                    />
                  </button>
                ) : null}
              </div>
            </Card>
          </motion.div>

          {otherTopics.length > 0 ? (
            <Card className="overflow-hidden" tone="flat">
              <ul className="divide-y divide-hairline">
                {otherTopics.map((entry) => (
                  <li key={entry.id}>
                    <TopicRow topic={entry} onOpen={() => select(entry.id)} />
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}


/**
 * One study level's requirements, shown open rather than behind a click.
 *
 * This used to be a `<details>` accordion, on the reasoning that undergraduate
 * and postgraduate applicants only need to read their own half. In practice
 * that hid the page's clearest structure behind a tap most readers never
 * made, and cost the page its scannability — a card a search engine or an
 * answer engine can read straight through beats one whose content only
 * exists after a client-side interaction. Two cards, side by side, is what a
 * student comparing both levels actually wants to see at once.
 */
function TrackCard({ track }: { track: JourneyTrack }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-hairline bg-gradient-to-b from-white to-canvas/50 p-5 shadow-[0_18px_40px_-28px_rgba(1,22,111,0.28)] sm:p-6">
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="flex size-[40px] shrink-0 items-center justify-center rounded-[12px] bg-navy text-white shadow-[0_12px_26px_-14px_rgba(1,22,111,0.65)]"
        >
          {track.icon ? <track.icon size={19} strokeWidth={2} /> : null}
        </span>
        <span className="min-w-0">
          <span className="block text-[16px] font-bold leading-[1.25] tracking-[-0.01em] text-navy">
            {track.label}
          </span>
          <span className="mt-[2px] block text-[13px] font-medium leading-[1.4] text-muted">
            {track.hint}
          </span>
        </span>
      </div>

      <div className="mt-5 flex-1 space-y-5">
        {track.groups.map((group) => (
          <GroupBody key={group.title} group={group} />
        ))}
      </div>

      {track.caveat ? (
        <div className="mt-5 flex gap-3 rounded-[11px] border border-blue-link/15 bg-blue-link/[0.04] p-[13px]">
          <Info
            size={16}
            strokeWidth={2.1}
            aria-hidden
            className="mt-[1px] shrink-0 text-blue-link"
          />
          <p className="text-[13.5px] font-medium leading-[1.55] text-ink-soft">{track.caveat}</p>
        </div>
      ) : null}

      {track.cta ? (
        <Link
          href={track.cta.href}
          className="group/cta mt-5 inline-flex items-center gap-[8px] text-[14px] font-bold text-blue-link transition-colors duration-200 hover:text-navy"
        >
          {track.cta.label}
          <ArrowUpRight
            size={15}
            strokeWidth={2.4}
            aria-hidden
            className="transition-transform duration-200 group-hover/cta:translate-x-[2px] group-hover/cta:-translate-y-[2px]"
          />
        </Link>
      ) : null}
    </div>
  );
}

/** A titled list — one qualification's documents, or one class of criteria. */
function GroupBody({ group }: { group: JourneyGroup }) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-[10px]">
        {group.icon ? (
          <span
            aria-hidden
            className="flex size-[30px] shrink-0 items-center justify-center rounded-[9px] bg-orange/[0.08] text-orange"
          >
            <group.icon size={14} strokeWidth={2.1} />
          </span>
        ) : null}
        <p className="text-[13px] font-bold uppercase tracking-[0.09em] text-navy">{group.title}</p>
      </div>
      {group.note ? (
        <p
          className={`mt-[5px] text-[13px] font-medium leading-[1.5] text-muted-light ${group.icon ? "ml-10" : ""}`}
        >
          {group.note}
        </p>
      ) : null}
      <ul className={`mt-[10px] space-y-[7px] ${group.icon ? "ml-10" : ""}`}>
        {group.items.map((item) => (
          <li key={item} className="flex items-start gap-[9px]">
            <span
              aria-hidden
              className="mt-[7px] size-[5px] shrink-0 rounded-full bg-orange"
            />
            <span className="text-[14.5px] font-medium leading-[1.5] text-ink-soft">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * SN / Name / Total cost — the shape a student actually wants when comparing
 * line items, with the NPR figure alongside so the GBP number is not the only
 * one on the page. Rows are borrowed from `livingCostBreakdown`, so the
 * numbers can never drift from the guide they came from.
 */
function CostTable({ rows }: { rows: CostTableRow[] }) {
  const totalLow = rows.reduce((sum, row) => sum + row.lowGBP, 0);
  const totalHigh = rows.reduce((sum, row) => sum + row.highGBP, 0);

  return (
    <div className="mt-6">
      <div className="overflow-hidden rounded-2xl border border-hairline bg-white shadow-[0_18px_40px_-28px_rgba(1,22,111,0.24)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left">
            <thead>
              <tr className="border-b border-hairline bg-canvas/70">
                <th className="w-[52px] px-4 py-3 text-[12px] font-bold uppercase tracking-[0.09em] text-muted-light sm:px-5">
                  SN
                </th>
                <th className="px-4 py-3 text-[12px] font-bold uppercase tracking-[0.09em] text-muted-light sm:px-5">
                  Name
                </th>
                <th className="px-4 py-3 text-right text-[12px] font-bold uppercase tracking-[0.09em] text-muted-light sm:px-5">
                  Total cost / month
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={row.label}
                  className="border-b border-hairline last:border-b-0 even:bg-canvas/30"
                >
                  <td className="px-4 py-[14px] text-[13.5px] font-semibold tabular-nums text-muted-light sm:px-5">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="px-4 py-[14px] sm:px-5">
                    <p className="text-[14.5px] font-bold leading-[1.3] text-navy">{row.label}</p>
                    {row.note ? (
                      <p className="mt-[3px] text-[12.5px] font-medium leading-[1.4] text-muted">
                        {row.note}
                      </p>
                    ) : null}
                  </td>
                  <td className="px-4 py-[14px] text-right sm:px-5">
                    <p className="whitespace-nowrap text-[14.5px] font-bold tabular-nums text-navy">
                      {gbp.format(row.lowGBP)}–{gbp.format(row.highGBP)}
                    </p>
                    <p className="mt-[3px] whitespace-nowrap text-[12.5px] font-semibold tabular-nums text-muted">
                      ≈ {npr(row.lowGBP)}–{npr(row.highGBP)}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-hairline bg-navy/[0.04]">
                <td className="px-4 py-[14px] sm:px-5" colSpan={2}>
                  <p className="text-[13.5px] font-bold uppercase tracking-[0.06em] text-navy">
                    Total per month
                  </p>
                </td>
                <td className="px-4 py-[14px] text-right sm:px-5">
                  <p className="whitespace-nowrap text-[15px] font-extrabold tabular-nums text-navy">
                    {gbp.format(totalLow)}–{gbp.format(totalHigh)}
                  </p>
                  <p className="mt-[3px] whitespace-nowrap text-[12.5px] font-semibold tabular-nums text-muted">
                    ≈ {npr(totalLow)}–{npr(totalHigh)}
                  </p>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <p className="mt-3 text-[12.5px] font-medium leading-[1.5] text-muted-light">
        {nprRateNotice}
      </p>
    </div>
  );
}

function TopicRow({ topic, onOpen }: { topic: JourneyTopic; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-expanded={false}
      aria-controls={`journey-topic-${topic.id}`}
      className="group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors duration-200 hover:bg-canvas sm:px-6"
    >
      <span
        aria-hidden
        className="flex size-[36px] shrink-0 items-center justify-center rounded-[10px] bg-navy/[0.06] text-navy transition-colors duration-200 group-hover:bg-navy/[0.09]"
      >
        <topic.icon size={17} strokeWidth={2} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15.5px] font-bold leading-[1.3] tracking-[-0.005em] text-navy">
          {topic.title}
        </span>
        <span className="mt-[2px] block truncate text-[13.5px] font-medium leading-[1.4] text-muted">
          {topic.blurb}
        </span>
      </span>
      <ChevronDown
        size={18}
        strokeWidth={2.4}
        aria-hidden
        className="shrink-0 text-muted-light transition-transform duration-200 group-hover:translate-y-[1px]"
      />
    </button>
  );
}
