import { CalendarClock, CalendarRange, FileCheck2, Layers } from "lucide-react";
import { Container } from "../ui/Container";
import { AccentText } from "../ui/AccentText";
import {
  academicTimeline,
  academicYear,
  yearBreakdown,
  type YearStop,
} from "@/data/guides/study-in-uk";

/**
 * The academic year as a calendar you can read left to right.
 *
 * Four cards described the same four facts before and told a student nothing
 * about their order, which is the only thing the question "how does the year
 * work" is really asking. The rail carries the sequence; the colour carries
 * the kind of period, so the shape of the year — long teaching blocks, two
 * assessment clusters, a very long summer — is legible before any label is
 * read.
 *
 * COLOUR IS THE KEY, so it is only three values and they are the brand's own:
 * blue for teaching, orange for assessment, grey for a break. A fourth hue
 * would look like decoration and stop the legend meaning anything.
 */

const tones: Record<
  YearStop["tone"],
  { dot: string; text: string; bar: string; chip: string }
> = {
  teaching: {
    dot: "bg-blue-bright",
    text: "text-blue-bright",
    bar: "bg-blue-bright",
    chip: "border-blue-bright/20 bg-blue-bright/[0.07]",
  },
  exams: {
    dot: "bg-orange",
    text: "text-orange",
    bar: "bg-orange",
    chip: "border-orange/20 bg-orange/[0.06]",
  },
  break: {
    dot: "bg-faint",
    text: "text-muted",
    bar: "bg-ring-idle",
    chip: "border-hairline bg-canvas",
  },
};

const legend = [
  { label: "Teaching", tone: "teaching" as const },
  { label: "Assessment", tone: "exams" as const },
  { label: "Break", tone: "break" as const },
];

const explainerIcons = [CalendarClock, CalendarRange, Layers, FileCheck2];

/**
 * The consequences of the calendar, which is what a student is really asking
 * about — not when term starts, but what starting then commits them to.
 */
const calendarImplications = [
  {
    label: "Apply a year ahead.",
    body: "UCAS applications for a September start are made the previous autumn, so the decision sits roughly twelve months before the first lecture.",
  },
  {
    label: "The summer is not free time for everyone.",
    body: "Undergraduates get three to four months clear; masters students spend most of it writing a dissertation.",
  },
  {
    label: "Two assessment clusters, not one.",
    body: "January and April–May both matter. A course weighted heavily toward exams feels very different from one assessed by coursework.",
  },
];

export function AcademicYear({ id }: { id: string }) {
  return (
    <section
      id={id}
      className="scroll-mt-[calc(var(--nav-h)_+_4.5rem)] py-[clamp(2.75rem,4.5vw,4.5rem)]"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <div className="max-w-[56ch]">
            <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-blue-link">
              The calendar
            </p>
            <h2 className="mt-3 text-[clamp(1.625rem,2.8vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-navy">
              <AccentText>The academic year</AccentText>
            </h2>
            <p className="mt-4 text-[16px] font-medium leading-[1.6] text-muted">
              Understand intakes, terms and assessment periods before you pick
              a start date.
            </p>
          </div>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legend.map((entry) => (
              <li key={entry.label} className="flex items-center gap-[7px]">
                <span
                  aria-hidden
                  className={`size-[9px] rounded-full ${tones[entry.tone].dot}`}
                />
                <span className="text-[13px] font-semibold text-muted">
                  {entry.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* The rail. A horizontal row of stops from `md`, a vertical timeline
            below it — the same six stops, not a squeezed version of the row. */}
        <ol className="mt-9 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          {academicTimeline.map((stop, i) => {
            const tone = tones[stop.tone];

            return (
              <li key={stop.months} className="relative min-w-0">
                <div
                  className={`flex h-full flex-col rounded-xl border p-4 transition-colors duration-200 sm:p-[18px] ${tone.chip}`}
                >
                  <div className="flex items-center gap-[7px]">
                    <span aria-hidden className={`size-[7px] rounded-full ${tone.dot}`} />
                    <p
                      className={`text-[12.5px] font-bold uppercase tracking-[0.09em] ${tone.text}`}
                    >
                      {stop.months}
                    </p>
                  </div>

                  <h3 className="mt-[9px] text-[15.5px] font-bold leading-[1.25] tracking-[-0.01em] text-navy">
                    {stop.label}
                  </h3>
                  <p className="mt-[6px] text-[13.5px] font-medium leading-[1.5] text-muted">
                    {stop.detail}
                  </p>
                </div>

                {/* The connector between stops. Vertical while the stops are
                    stacked, horizontal once all six sit in a row — and absent
                    at the intermediate widths, where the grid wraps and a
                    connector would point at the wrong neighbour. */}
                {i < academicTimeline.length - 1 ? (
                  <>
                    <span
                      aria-hidden
                      className="absolute bottom-[-12px] left-[22px] h-[12px] w-px bg-ring-idle md:hidden"
                    />
                    <span
                      aria-hidden
                      className="absolute right-[-12px] top-1/2 hidden h-px w-[12px] -translate-y-1/2 bg-ring-idle xl:block"
                    />
                  </>
                ) : null}
              </li>
            );
          })}
        </ol>

        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {/* Where the weeks actually go. A single stacked bar rather than
              three statistics, because the point is the proportion. */}
          <div className="flex flex-col rounded-xl border border-hairline bg-white p-5 sm:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="text-[15.5px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
                Typical year breakdown
              </h3>
              <p className="text-[12px] font-semibold text-muted-light">
                Approximate — varies by university
              </p>
            </div>

            <div
              className="mt-4 flex h-[10px] w-full overflow-hidden rounded-full bg-track"
              role="img"
              aria-label={yearBreakdown
                .map((part) => `${part.label} ${part.weeks}`)
                .join(", ")}
            >
              {yearBreakdown.map((part) => (
                <span
                  key={part.label}
                  aria-hidden
                  className={tones[part.tone].bar}
                  style={{ width: `${part.share}%` }}
                />
              ))}
            </div>

            <dl className="mt-4 grid grid-cols-3 gap-4 pt-1">
              {yearBreakdown.map((part) => (
                <div key={part.label}>
                  <dt className="flex items-center gap-[6px] text-[13px] font-bold text-navy">
                    <span
                      aria-hidden
                      className={`size-[8px] shrink-0 rounded-full ${tones[part.tone].dot}`}
                    />
                    {part.label}
                  </dt>
                  <dd className="mt-[3px] text-[13px] font-medium text-muted">
                    {part.weeks}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-xl border border-hairline bg-white p-5 sm:p-6">
            <h3 className="text-[15.5px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
              What the calendar means for you
            </h3>

            <ul className="mt-3 space-y-[10px]">
              {calendarImplications.map((point) => (
                <li key={point.label} className="flex gap-[10px]">
                  <span
                    aria-hidden
                    className="mt-[7px] size-[5px] shrink-0 rounded-full bg-orange"
                  />
                  <p className="text-[14px] font-medium leading-[1.55] text-muted">
                    <span className="font-bold text-ink">{point.label}</span>{" "}
                    {point.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The four explanations. Two columns, so they read as notes on the
            rail above rather than as another grid of cards. */}
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {academicYear.map((item, i) => {
            const Icon = explainerIcons[i] ?? CalendarClock;

            return (
              <li key={item.title} className="min-w-0">
                <div className="flex h-full gap-[14px] rounded-xl border border-hairline bg-white p-5 sm:p-6">
                  <span
                    aria-hidden
                    className="flex size-[36px] shrink-0 items-center justify-center rounded-[10px] border border-hairline bg-canvas text-blue-link"
                  >
                    <Icon size={17} strokeWidth={2} />
                  </span>

                  <div className="min-w-0">
                    <h3 className="text-[16px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
                      {item.title}
                    </h3>
                    <p className="mt-[6px] text-[14.5px] font-medium leading-[1.6] text-muted">
                      {item.body}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
