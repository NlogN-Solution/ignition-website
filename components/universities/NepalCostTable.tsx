import { ExternalLink } from "lucide-react";
import { Badge } from "../ui/Badge";
import { costStages, costsInStage, type NepalCost } from "@/data/universities/nepal";

/**
 * The cost of getting from Kathmandu to this university, payment by payment.
 *
 * Grouped by when the money is due rather than by size, because that is the
 * distinction that actually matters to a family planning this. The English
 * test and the translations are spent whether or not an offer ever arrives;
 * the health surcharge is only due once a place is accepted. A single total
 * hides that difference, so this shows the stages and refuses to print a
 * grand total — the honest answer to "what does it all come to" is a range
 * that depends on the course length and the city, and a confident-looking
 * single figure would be the most misleading thing on the page.
 *
 * Two lines are flagged rather than summed: maintenance funds, which stay the
 * student's money, and anything optional. Adding them into a total would
 * overstate the cost by the largest single number on the list.
 */

function Amount({ cost }: { cost: NepalCost }) {
  return (
    <span className="whitespace-nowrap text-[15px] font-bold tabular-nums text-navy">
      {cost.currency === "GBP" ? "£" : "NPR "}
      {cost.amount}
    </span>
  );
}

function CostRow({ cost }: { cost: NepalCost }) {
  return (
    <li className="py-[18px] first:pt-0 last:pb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h4 className="text-[15.5px] font-bold leading-[1.35] tracking-[-0.01em] text-navy">
          {cost.label}
          {cost.refundable ? (
            <span className="ml-2 align-middle">
              <Badge tone="navy">Stays yours</Badge>
            </span>
          ) : null}
          {cost.optional ? (
            <span className="ml-2 align-middle">
              <Badge tone="muted">If required</Badge>
            </span>
          ) : null}
        </h4>
        <Amount cost={cost} />
      </div>

      <p className="mt-[7px] max-w-[68ch] text-[14.5px] font-medium leading-[1.6] text-muted">
        {cost.detail}
      </p>

      <p className="mt-[7px] text-[13px] font-semibold text-muted-light">
        Set by:{" "}
        {cost.href ? (
          <a
            href={cost.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[5px] text-blue-link transition-colors hover:text-navy"
          >
            {cost.source}
            <ExternalLink size={12} strokeWidth={2.4} aria-hidden />
          </a>
        ) : (
          cost.source
        )}
      </p>
    </li>
  );
}

export function NepalCostTable() {
  return (
    <div className="space-y-4">
      {costStages.map((stage) => {
        const costs = costsInStage(stage.id);
        if (costs.length === 0) return null;

        return (
          <section
            key={stage.id}
            className="overflow-hidden rounded-xl border border-hairline bg-white"
          >
            <header className="border-b border-hairline bg-canvas px-5 py-4 sm:px-6">
              <h3 className="text-[15px] font-bold tracking-[-0.01em] text-navy">
                {stage.label}
              </h3>
              <p className="mt-[4px] text-[13.5px] font-medium leading-[1.5] text-muted">
                {stage.summary}
              </p>
            </header>

            <ul className="divide-y divide-hairline px-5 py-5 sm:px-6">
              {costs.map((cost) => (
                <CostRow key={cost.id} cost={cost} />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
