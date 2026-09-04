"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, Phone, X } from "lucide-react";
import { contact, telUrl, whatsappUrl } from "@/lib/config";
import { useCtaOnScreen } from "../apply/ctaVisibility";

/**
 * The two ways to reach a person, parked in the bottom corner.
 *
 * A student researching a move to another country hits a question the site
 * cannot answer — a qualification that maps to nothing, a visa edge case, a
 * deadline they have already missed — and the alternative to a visible way of
 * asking is that they close the tab. So this is on every page.
 *
 * WHY THE LINKS ARE PLAIN ANCHORS. `tel:` and `wa.me` are handled by the
 * operating system: on a phone the first opens the dialer with the number
 * already entered, and the second opens WhatsApp with the message already
 * written. Neither works if JavaScript intercepts the click, so nothing here
 * calls `preventDefault` — the only client-side behaviour is deciding whether
 * to render.
 *
 * WHY IT HIDES. A page's own call-to-action band makes the same offer with
 * more room to make it, and a floating card landing on top of the better
 * treatment in order to repeat the weaker one is how a page starts to feel
 * like a pop-up farm. It stands down while that band is on screen, through
 * the shared observer in components/apply/ctaVisibility.ts.
 */

/** Left as a WhatsApp glyph would be a trademark; the chat bubble is not. */
function WhatsappIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden
      focusable="false"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23a8.2 8.2 0 0 1 8.23 8.24c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.21.89 2.39 1.01 2.55.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

export function ContactWidget() {
  const pathname = usePathname();
  const ctaOnScreen = useCtaOnScreen();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mount-gated so the server markup and the first client paint agree — the
  // widget animates in, and animating on hydration is a flash.
  useEffect(() => setMounted(true), []);

  // A route change should not leave the panel hanging open over a new page.
  useEffect(() => setOpen(false), [pathname]);

  if (!mounted || ctaOnScreen) return null;

  const message = whatsappUrl(pageContext(pathname));

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
      role="complementary"
      aria-label="Contact Ignition"
    >
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="w-[min(19rem,calc(100vw-2rem))] origin-bottom-right rounded-xl border border-hairline bg-white p-4 shadow-[0_28px_60px_-24px_rgba(1,22,111,0.45)]"
          >
            <p className="text-[15px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
              Talk to an adviser<span className="text-orange">.</span>
            </p>
            <p className="mt-[6px] text-[13.5px] font-medium leading-[1.5] text-muted">
              {contact.hours}. Ask anything — there is no charge for a
              conversation.
            </p>

            <div className="mt-4 space-y-2">
              <a
                href={message}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg border border-hairline p-3 transition-colors duration-200 hover:border-[#25d366]/40 hover:bg-[#25d366]/[0.06]"
              >
                <span
                  aria-hidden
                  className="flex size-[36px] shrink-0 items-center justify-center rounded-[10px] bg-[#25d366]/12 text-[#128c4a]"
                >
                  <WhatsappIcon size={19} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[14.5px] font-semibold leading-[1.3] text-navy">
                    Message on WhatsApp
                  </span>
                  <span className="block text-[12.5px] font-medium text-muted-light">
                    Opens with your message written
                  </span>
                </span>
              </a>

              <a
                href={telUrl}
                className="group flex items-center gap-3 rounded-lg border border-hairline p-3 transition-colors duration-200 hover:border-navy/25 hover:bg-navy/[0.04]"
              >
                <span
                  aria-hidden
                  className="flex size-[36px] shrink-0 items-center justify-center rounded-[10px] bg-navy/[0.08] text-navy"
                >
                  <Phone size={17} strokeWidth={2.2} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[14.5px] font-semibold leading-[1.3] text-navy">
                    Call {contact.phone}
                  </span>
                  <span className="block text-[12.5px] font-medium text-muted-light">
                    Dials straight from your phone
                  </span>
                </span>
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Both actions stay one tap away on a phone even with the panel shut:
          the two icon buttons are the links themselves, not a menu opener. */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Close contact options" : "Contact an adviser"}
          className="flex size-[46px] items-center justify-center rounded-full border border-hairline bg-white text-navy shadow-[0_14px_32px_-16px_rgba(1,22,111,0.5)] transition-[transform,color] duration-200 hover:scale-[1.04] hover:text-orange active:scale-95"
        >
          {open ? (
            <X size={19} strokeWidth={2.4} aria-hidden />
          ) : (
            <MessageCircle size={20} strokeWidth={2.1} aria-hidden />
          )}
        </button>

        <a
          href={telUrl}
          aria-label={`Call Ignition on ${contact.phone}`}
          className="flex size-[52px] items-center justify-center rounded-full bg-navy text-white shadow-[0_16px_36px_-14px_rgba(1,22,111,0.7)] transition-transform duration-200 hover:scale-[1.05] active:scale-95"
        >
          <Phone size={21} strokeWidth={2.1} aria-hidden />
        </a>

        <a
          href={message}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message Ignition on WhatsApp"
          className="flex size-[52px] items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_16px_36px_-14px_rgba(37,211,102,0.75)] transition-transform duration-200 hover:scale-[1.05] active:scale-95"
        >
          <WhatsappIcon size={24} />
        </a>
      </div>
    </div>
  );
}

/**
 * Turns the current route into the phrase that goes in the WhatsApp message,
 * so an adviser opens the thread already knowing what the student was reading.
 * Unknown routes contribute nothing rather than a slug.
 */
function pageContext(pathname: string): string | undefined {
  const map: Record<string, string> = {
    "/": "the homepage",
    "/start": "where to start",
    "/study-in-uk": "why study in the UK",
    "/careers": "careers",
    "/careers/quiz": "the career quiz",
    "/courses": "courses",
    "/universities": "universities",
    "/apply": "how to apply",
    "/apply/entry-requirements": "entry requirements and the visa",
    "/apply/interviews": "interview preparation",
    "/money": "tuition and living costs",
    "/money/calculator": "the cost calculator",
    "/money/scholarships": "scholarships",
    "/life-in-uk": "life in the UK",
  };

  if (map[pathname]) return map[pathname];
  if (pathname.startsWith("/courses/")) return "a course page";
  if (pathname.startsWith("/universities/")) return "a university page";
  if (pathname.startsWith("/careers/")) return "a career page";

  return undefined;
}
