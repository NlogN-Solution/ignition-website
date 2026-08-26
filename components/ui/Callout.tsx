import { Info, ShieldAlert } from "lucide-react";

/**
 * Used for the standing notices that must accompany time-sensitive guidance —
 * visa rules, entry requirements, scholarship terms. `official` is the
 * stronger treatment, reserved for anything a student could be harmed by
 * getting wrong.
 */
export function Callout({
  tone = "info",
  compact = false,
  children,
}: {
  tone?: "info" | "official";
  /** For the explorer pages, where the notice sits above a working surface
      and every line it takes is a line of results pushed off the screen. */
  compact?: boolean;
  children: React.ReactNode;
}) {
  const official = tone === "official";
  const Icon = official ? ShieldAlert : Info;

  return (
    <aside
      className={`flex rounded-xl border ${compact ? "gap-3 p-[14px] sm:px-4" : "gap-4 p-5 sm:p-6"} ${
        official
          ? "border-orange/25 bg-orange/[0.05]"
          : "border-hairline bg-white"
      }`}
    >
      <Icon
        size={compact ? 17 : 20}
        strokeWidth={2}
        aria-hidden
        className={`mt-[2px] shrink-0 ${official ? "text-orange" : "text-blue-link"}`}
      />
      <div
        className={`min-w-0 font-medium text-ink-soft ${
          compact ? "text-[13.5px] leading-[1.55]" : "text-[15px] leading-[1.6]"
        }`}
      >
        {children}
      </div>
    </aside>
  );
}
