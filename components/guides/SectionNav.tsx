"use client";

import { useEffect, useRef, useState } from "react";
import {
  BarChart3,
  Brain,
  Briefcase,
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  HelpCircle,
  type LucideIcon,
  Quote,
  Route,
  Sparkles,
} from "lucide-react";

/**
 * The "on this page" bar for the long guides.
 *
 * The old sticky rail lived in a left column and disappeared below `xl`,
 * which meant the page that most needed a map lost it on exactly the screens
 * where the scroll is longest. This is the same idea turned horizontal: it
 * docks under the header at every width, so the reader always knows both what
 * else is here and where they currently are.
 *
 * ACTIVE STATE. An IntersectionObserver with a top-heavy root margin — the
 * band it watches is a thin strip just below the docked bar, so a section
 * becomes current when its top reaches the bar rather than when it happens to
 * occupy the most pixels. Sections are held in document order and the highest
 * intersecting one wins, which keeps the highlight stable when two short
 * sections are on screen at once.
 *
 * On narrow screens the row scrolls horizontally and the active chip is
 * scrolled into view, so the map stays useful when only three of eight labels
 * fit.
 */

export type NavSection = {
  id: string;
  label: string;
  icon?: keyof typeof icons;
};

const icons = {
  briefcase: Briefcase,
  briefcase2: BriefcaseBusiness,
  brain: Brain,
  sparkle: Sparkles,
  cap: GraduationCap,
  calendar: CalendarDays,
  route: Route,
  chart: BarChart3,
  quote: Quote,
  help: HelpCircle,
} satisfies Record<string, LucideIcon>;

export function SectionNav({ sections }: { sections: NavSection[] }) {
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const nodes = sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => node !== null);

    if (nodes.length === 0) return;

    const order = new Map(nodes.map((node, i) => [node.id, i]));
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }

        if (visible.size === 0) return;

        // Topmost wins, so the highlight tracks reading position rather than
        // whichever section happens to have fired last.
        const first = [...visible].sort(
          (a, b) => (order.get(a) ?? 0) - (order.get(b) ?? 0),
        )[0];

        setActive(first);
      },
      {
        // Watch a strip starting just below the docked bar and ending well
        // above the fold: a heading is "current" from the moment it arrives.
        rootMargin: "-22% 0px -68% 0px",
        threshold: 0,
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [sections]);

  // Keep the current chip on screen while the row is scrolling horizontally.
  useEffect(() => {
    if (!active || !listRef.current) return;

    const chip = listRef.current.querySelector<HTMLElement>(
      `[data-section="${active}"]`,
    );
    if (!chip) return;

    const list = listRef.current;
    if (list.scrollWidth <= list.clientWidth) return;

    const left = chip.offsetLeft - list.clientWidth / 2 + chip.offsetWidth / 2;
    list.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label="On this page"
      className="sticky top-[var(--nav-h)] z-40 border-y border-hairline bg-white/85 backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-[1240px] items-center gap-4 px-5 sm:px-8 lg:px-12">
        <p className="hidden shrink-0 py-[15px] text-[13px] font-bold text-navy 2xl:block">
          On this page
        </p>

        <span aria-hidden className="hidden h-6 w-px shrink-0 bg-hairline 2xl:block" />

        <ul
          ref={listRef}
          className="-mx-1 flex min-w-0 flex-1 items-center gap-[2px] overflow-x-auto px-1 py-[9px] [-ms-overflow-style:none] [scrollbar-width:none] xl:justify-between [&::-webkit-scrollbar]:hidden"
        >
          {sections.map((section) => {
            const Icon = section.icon ? icons[section.icon] : null;
            const current = active === section.id;

            return (
              <li key={section.id} className="shrink-0">
                <a
                  href={`#${section.id}`}
                  data-section={section.id}
                  aria-current={current ? "true" : undefined}
                  className={`flex items-center gap-[6px] whitespace-nowrap rounded-lg px-[10px] py-[8px] text-[13.5px] font-semibold transition-colors duration-200 ${
                    current
                      ? "bg-navy/[0.06] text-navy"
                      : "text-muted hover:bg-canvas hover:text-navy"
                  }`}
                >
                  {Icon ? (
                    <Icon
                      size={15}
                      strokeWidth={2.1}
                      aria-hidden
                      className={`shrink-0 transition-colors duration-200 ${
                        current ? "text-orange" : "text-faint"
                      }`}
                    />
                  ) : null}
                  {section.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
