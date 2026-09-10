import { ArrowRight } from "lucide-react";

/**
 * Jump links between the hero and the first section.
 *
 * This page makes its case in five moves — the claim, the five reasons, the
 * competing offer from another country, the number ("can I work?"), then the
 * objections — and `app/study-in-uk/page.tsx`'s own reasoning is that the
 * work section in particular answers the question that decides whether the
 * rest was worth reading, for most students and nearly every parent. Before
 * this existed, reaching it meant scrolling past the hero and every reason
 * card with no signal it was coming. A reader who already knows what they're
 * after — or is scanning on a second visit — should not have to.
 *
 * Not a sticky sub-nav: five sections is still short enough that a bar pinned
 * through the whole scroll would spend permanent header space on a decision
 * that takes one glance to make. This sits once, right where the hero hands
 * off, and lets `scroll-behavior: smooth` (set globally in
 * `app/globals.css`) do the rest.
 */
const links = [
  { href: "#why", label: "Five reasons to choose the UK" },
  { href: "#compare", label: "UK vs other countries" },
  { href: "#work", label: "Can I work while I study?" },
  { href: "/start", label: "Start your application" },
] as const;

export function PageJumpNav() {
  return (
    <nav
      aria-label="On this page"
      className="border-y border-hairline bg-canvas px-5 py-[14px] sm:px-8 lg:px-24"
    >
      <ul className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-x-[10px] gap-y-[10px]">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="group inline-flex items-center gap-[7px] rounded-full border border-hairline bg-white px-[16px] py-[9px] text-[13.5px] font-semibold text-navy transition-colors duration-200 hover:border-ring-idle hover:text-blue-link"
            >
              {link.label}
              <ArrowRight
                size={13}
                strokeWidth={2.4}
                aria-hidden
                className="shrink-0 text-muted-light transition-transform duration-200 group-hover:translate-x-[2px] group-hover:text-blue-link"
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
