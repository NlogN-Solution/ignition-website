/**
 * The vertical rail used for the application timeline and the visa journey.
 * The connecting line sits behind the numbered nodes so the stages read as
 * one continuous route rather than a stack of separate blocks.
 */
export type TimelineStage = {
  label: string;
  description: string;
  /** Optional right-hand note — a month, a duration, a responsible party. */
  meta?: string;
};

export function Timeline({ stages }: { stages: TimelineStage[] }) {
  return (
    <ol className="relative">
      {stages.map((stage, i) => {
        const last = i === stages.length - 1;

        return (
          <li key={stage.label} className="relative flex gap-5 sm:gap-6">
            <div className="relative flex flex-col items-center">
              <span className="relative z-10 flex size-[38px] shrink-0 items-center justify-center rounded-full border border-hairline bg-white text-[13.5px] font-bold tabular-nums text-navy shadow-[0_10px_24px_-18px_rgba(1,22,111,0.5)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              {!last ? (
                <span aria-hidden className="w-px flex-1 bg-hairline" />
              ) : null}
            </div>

            <div className={`min-w-0 flex-1 ${last ? "pb-0" : "pb-9"}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-[17px] font-bold leading-[1.3] tracking-[-0.01em] text-navy sm:text-[18px]">
                  {stage.label}
                </h3>
                {stage.meta ? (
                  <span className="text-[13px] font-semibold uppercase tracking-[0.09em] text-muted-light">
                    {stage.meta}
                  </span>
                ) : null}
              </div>
              <p className="mt-[7px] max-w-[62ch] text-[15.5px] font-medium leading-[1.6] text-muted">
                {stage.description}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
