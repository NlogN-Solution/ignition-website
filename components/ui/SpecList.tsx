/**
 * Label/value rows for course and university facts. Kept as a definition list
 * so the pairing survives screen readers and the comparison page can reuse
 * the same data shape later.
 */
export type Spec = { label: string; value: React.ReactNode };

export function SpecList({ specs }: { specs: Spec[] }) {
  return (
    <dl className="divide-y divide-hairline">
      {specs.map((spec) => (
        <div
          key={spec.label}
          className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-[13px] first:pt-0 last:pb-0"
        >
          <dt className="text-[14.5px] font-medium text-muted">{spec.label}</dt>
          <dd className="text-[15px] font-semibold text-ink">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}
