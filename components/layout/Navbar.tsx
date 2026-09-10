"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ArrowButton } from "../ui/ArrowButton";
import { PortalLink } from "./PortalLink";
import { navItems, type NavItem } from "@/lib/navigation";

/**
 * Which group the current page belongs to.
 *
 * Two groups can legitimately claim one page — the cost calculator is listed
 * under both "Life in UK" and "Resources" — so the first match wins rather
 * than lighting up two labels at once. Prefix matching is what makes a detail
 * page (`/courses/computer-science`) still highlight its section.
 */
function activeIndex(pathname: string, items: NavItem[]): number {
  return items.findIndex((item) =>
    [item.href, ...item.items.map((sub) => sub.href)].some(
      (href) => pathname === href || pathname.startsWith(`${href}/`),
    ),
  );
}

/**
 * `dimmed` reproduces the muted header state shown on the "Where are you
 * today?" screen, where the chrome recedes behind the question.
 */
export function Navbar({ dimmed = false }: { dimmed?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const current = activeIndex(pathname, navItems);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-hairline/70 bg-canvas/90 backdrop-blur-md transition-opacity duration-500 ${
        dimmed ? "opacity-40 hover:opacity-100 focus-within:opacity-100" : ""
      }`}
    >
      <div className="mx-auto grid h-[68px] grid-cols-[auto_1fr_auto] items-center gap-4 px-5 sm:px-8 lg:grid-cols-[1fr_auto_1fr] xl:h-[90px] xl:px-12">
        <Logo className="justify-self-start" />

        {/* Six groups, and the width they need is bought with type size rather
            than by dropping one: the labels sit at 13.5px with the gaps
            carried inside each link as padding, so what separates them is a
            hover target rather than dead space. The old bar spent 32px of
            nothing between six 14.5px labels and still read as a clump. */}
        <nav aria-label="Main" className="hidden justify-self-center lg:block">
          <ul className="flex items-center gap-[1px] xl:gap-[5px]">
            {navItems.map((item, index) => {
              const active = index === current;

              return (
                <li key={item.label} className="group relative">
                  <Link
                    href={item.href}
                    aria-haspopup="true"
                    aria-current={active ? "page" : undefined}
                    className={`flex cursor-pointer items-center gap-[6px] whitespace-nowrap rounded-[10px] px-[10px] py-[8px] text-[13.5px] font-semibold tracking-[-0.005em] transition-colors duration-200 xl:px-[12px] ${
                      active ? "text-navy" : "text-nav group-hover:text-navy"
                    } group-hover:bg-navy/[0.045]`}
                  >
                    {item.label}
                    <ChevronDown
                      size={13}
                      strokeWidth={2.6}
                      aria-hidden
                      className={`mt-[1px] shrink-0 transition-[transform,color] duration-200 group-hover:rotate-180 group-hover:text-navy ${
                        active ? "text-navy/60" : "text-muted-light"
                      }`}
                    />
                  </Link>

                  {/* The marker for the section you are in. Under the label
                      rather than behind it, so the hover pill and the current
                      page never argue over the same background. */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute inset-x-[12px] -bottom-[3px] h-[2px] rounded-full bg-orange transition-opacity duration-200 ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  {/* The wrapper's top padding is a hover bridge: without it
                      the gap between label and panel is a dead strip that
                      closes the menu as the pointer crosses it. */}
                  <div className="invisible absolute left-1/2 top-full z-10 w-[244px] -translate-x-1/2 translate-y-[6px] pt-[9px] opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="rounded-[14px] border border-hairline bg-white p-[6px] shadow-[0_28px_56px_-28px_rgba(1,22,111,0.4)]">
                      {item.items.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="block rounded-[9px] px-[11px] py-[8px] text-[13.5px] font-medium text-muted transition-colors duration-150 hover:bg-canvas hover:text-navy"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-[10px] justify-self-end lg:flex">
          <PortalLink className="h-[38px] px-[17px] text-[13.5px]" />
          <ArrowButton
            href="/careers/quiz"
            iconSize={15}
            className="h-[38px] gap-[8px] px-[16px] text-[13.5px]"
          >
            Take Career Quiz
          </ArrowButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="justify-self-end rounded-lg p-2 text-nav lg:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open ? (
        <div className="max-h-[calc(100svh_-_68px)] overflow-y-auto border-t border-hairline bg-white px-5 pb-6 pt-2 sm:px-8 lg:hidden">
          <ul className="divide-y divide-hairline">
            {navItems.map((item, index) => (
              <li key={item.label} className="py-3">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="mb-1 flex items-center gap-2 text-[15px] font-bold text-navy"
                >
                  {item.label}
                  {index === current ? (
                    <span aria-hidden className="size-[6px] rounded-full bg-orange" />
                  ) : null}
                </Link>
                <div className="flex flex-wrap gap-x-5 gap-y-1">
                  {item.items.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      onClick={() => setOpen(false)}
                      className="text-[14px] font-medium text-muted"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-center gap-3">
            <PortalLink className="h-[44px] flex-1 px-5 text-[15px]" />
            <ArrowButton
              href="/careers/quiz"
              iconSize={16}
              className="h-[44px] flex-1 gap-[10px] px-5 text-[15px]"
            >
              Career Quiz
            </ArrowButton>
          </div>
        </div>
      ) : null}
    </header>
  );
}
