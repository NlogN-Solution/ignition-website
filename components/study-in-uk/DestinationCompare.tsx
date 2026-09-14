import {
  destinationFootnote,
  destinationRows,
  destinationSourceGroups,
} from "@/data/study-in-uk/destinations";

/**
 * "UK vs the other three places a family is actually choosing between."
 *
 * A table, not cards — this is comparison data, read across a row more often
 * than down a column, and a table is the one shape that makes "same question,
 * four answers" legible at a glance. The UK column stays visually anchored
 * (solid navy header, tinted body cells) so a reader scanning fast never
 * loses which column is the one this whole site is arguing for.
 *
 * See `data/study-in-uk/destinations.ts` for the sourcing discipline behind
 * every cell — this component only renders what that file already vetted.
 */
export function DestinationCompare({ id }: { id?: string }) {
  return (
    <section
      id={id}
      className="scroll-mt-[calc(var(--nav-h)_+_2rem)] bg-white px-5 py-[clamp(3rem,5vw,4.5rem)] sm:px-8 lg:px-24"
    >
      <div className="mx-auto max-w-[min(100%,720px)] text-center">
        <p className="text-[15px] font-bold uppercase tracking-[0.08em] text-blue-link">
          UK vs elsewhere
        </p>
        <h2 className="mt-[24px] text-[clamp(1.875rem,3.4vw,2.75rem)] font-bold leading-[1.12] tracking-[-0.022em] text-navy">
          How the UK <span className="text-orange">compares.</span>
        </h2>
        <p className="mx-auto mt-[14px] max-w-[52ch] text-[15.5px] font-medium leading-[1.55] text-muted">
          The three places most families weigh against the UK, set side by
          side on the numbers that actually decide it — visa timing, English
          test requirements, what a year genuinely costs in NPR, how long
          you're studying, what you can earn, and what happens after you
          graduate.
        </p>
      </div>

      <div className="mx-auto mt-[clamp(2.25rem,3.6vw,3.3rem)] max-w-[1240px]">
        <div className="overflow-x-auto rounded-2xl border border-hairline">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr>
                <th scope="col" className="w-[26%] border-b border-hairline bg-canvas px-5 py-4" />
                <th
                  scope="col"
                  className="border-b border-navy-ink bg-navy px-5 py-4 text-[13.5px] font-bold uppercase tracking-[0.06em] text-white"
                >
                  United Kingdom
                </th>
                <th
                  scope="col"
                  className="border-b border-hairline bg-canvas px-5 py-4 text-[13.5px] font-bold uppercase tracking-[0.06em] text-muted"
                >
                  United States
                </th>
                <th
                  scope="col"
                  className="border-b border-hairline bg-canvas px-5 py-4 text-[13.5px] font-bold uppercase tracking-[0.06em] text-muted"
                >
                  Australia
                </th>
                <th
                  scope="col"
                  className="border-b border-hairline bg-canvas px-5 py-4 text-[13.5px] font-bold uppercase tracking-[0.06em] text-muted"
                >
                  Canada
                </th>
              </tr>
            </thead>
            <tbody>
              {destinationRows.map((row, i) => {
                const last = i === destinationRows.length - 1;
                return (
                  <tr key={row.id} className={last ? "" : "border-b border-hairline"}>
                    <th
                      scope="row"
                      className="px-5 py-5 align-top text-[14.5px] font-bold leading-[1.4] text-navy"
                    >
                      {row.label}
                    </th>
                    <td className="bg-navy/[0.045] px-5 py-5 align-top text-[14px] font-semibold leading-[1.5] text-navy">
                      {row.uk}
                    </td>
                    <td className="px-5 py-5 align-top text-[14px] font-medium leading-[1.5] text-ink-soft">
                      {row.usa}
                    </td>
                    <td className="px-5 py-5 align-top text-[14px] font-medium leading-[1.5] text-ink-soft">
                      {row.australia}
                    </td>
                    <td className="px-5 py-5 align-top text-[14px] font-medium leading-[1.5] text-ink-soft">
                      {row.canada}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <ul className="mt-[20px] grid gap-[14px] sm:grid-cols-2">
          {destinationRows
            .filter((row) => row.note)
            .map((row) => (
              <li key={row.id} className="border-l-2 border-orange/40 pl-[14px]">
                <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-muted-light">
                  {row.label}
                </p>
                <p className="mt-[4px] text-[13.5px] font-medium leading-[1.55] text-muted">
                  {row.note}
                </p>
              </li>
            ))}
        </ul>

        <p className="mt-[18px] text-[12.5px] font-medium leading-[1.6] text-muted">
          {destinationFootnote}
        </p>

        <div className="mt-[16px] flex flex-wrap gap-x-[22px] gap-y-[8px] text-[12px] font-medium leading-[1.6] text-muted-light">
          {destinationSourceGroups.map((group) => (
            <p key={group.country} className="min-w-0">
              <span className="font-bold text-muted">{group.country} —</span>{" "}
              {group.sources.map((source, i) => (
                <span key={source.href}>
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-link underline-offset-2 hover:underline"
                  >
                    {source.label}
                  </a>
                  {i < group.sources.length - 1 ? " · " : ""}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
