"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ArrowButton } from "../ui/ArrowButton";
import { PortalLink } from "./PortalLink";
import { navItems } from "@/lib/navigation";

/**
 * `dimmed` reproduces the muted header state shown on the "Where are you
 * today?" screen, where the chrome recedes behind the question.
 */
export function Navbar({ dimmed = false }: { dimmed?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-hairline/70 bg-canvas/90 backdrop-blur-md transition-opacity duration-500 ${
        dimmed ? "opacity-40 hover:opacity-100 focus-within:opacity-100" : ""
      }`}
    >
      <div className="mx-auto grid h-[68px] grid-cols-[auto_1fr_auto] items-center gap-4 px-5 sm:px-8 lg:grid-cols-[1fr_auto_1fr] xl:h-[90px] xl:px-12">
        <Logo className="justify-self-start" />

        <nav aria-label="Main" className="hidden justify-self-center lg:block">
          {/* Six groups at a tighter gap again. The saved-items link that
              used to sit in the CTA cluster is gone, and the width it freed is
              what lets "Resources" join the bar without pushing the quiz
              button off the end at 1280px. */}
          <ul className="flex items-center gap-[22px] xl:gap-[32px]">
            {navItems.map((item) => (
              <li key={item.label} className="group relative">
                <Link
                  href={item.href}
                  aria-haspopup="true"
                  className="flex cursor-pointer items-center gap-[9px] py-3 text-[14.5px] font-semibold text-nav transition-colors duration-200 group-hover:text-navy"
                >
                  {item.label}
                  <ChevronDown
                    size={15}
                    strokeWidth={2.5}
                    aria-hidden
                    className="mt-[1px] transition-transform duration-200 group-hover:rotate-180"
                  />
                </Link>
                <div className="invisible absolute left-1/2 top-full z-10 w-60 -translate-x-1/2 translate-y-1 rounded-xl border border-hairline bg-white p-2 opacity-0 shadow-[0_24px_48px_-24px_rgba(1,22,111,0.35)] transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {item.items.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      className="block rounded-lg px-3 py-2 text-[14px] font-medium text-muted transition-colors hover:bg-canvas hover:text-navy"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-[12px] justify-self-end lg:flex">
          <PortalLink className="h-[39px] px-[20px] text-[14px]" />
          <ArrowButton
            href="/careers/quiz"
            iconSize={16}
            className="h-[39px] gap-[10px] px-[17px] text-[15px]"
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
            {navItems.map((item) => (
              <li key={item.label} className="py-3">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="mb-1 block text-[15px] font-bold text-navy"
                >
                  {item.label}
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
