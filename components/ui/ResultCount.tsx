export function ResultCount({
  count,
  noun,
  suffix,
  onClear,
}: {
  count: number;
  noun: [singular: string, plural: string];
  suffix?: string;
  onClear?: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
      <p aria-live="polite" className="text-[14.5px] font-medium text-muted">
        <span className="font-semibold text-ink">{count}</span>{" "}
        {count === 1 ? noun[0] : noun[1]}
        {suffix ? ` ${suffix}` : ""}
      </p>
      {onClear ? (
        <button
          type="button"
          onClick={onClear}
          className="text-[13.5px] font-semibold text-blue-link transition-colors hover:text-navy"
        >
          Clear all filters
        </button>
      ) : null}
    </div>
  );
}

export function EmptyResults({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-xl border border-dashed border-hairline bg-white/60 p-8 text-[15.5px] font-medium text-muted">
      {children}
    </p>
  );
}
