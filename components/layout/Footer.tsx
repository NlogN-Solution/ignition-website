import Link from "next/link";
import { Phone } from "lucide-react";
import { Logo } from "./Logo";
import { Container } from "../ui/Container";
import { WhatsappIcon } from "../ui/WhatsappIcon";
import { footerGroups } from "@/lib/navigation";
import { contact, telUrl, whatsappUrl } from "@/lib/config";

/**
 * Doubles as the internal link map — every hub page is reachable from every
 * page, which is what makes a content site of this shape indexable. Kept on
 * the canvas rather than inverted, so the light identity holds to the bottom.
 */
export function Footer() {
  return (
    <footer className="border-t border-hairline bg-white/55">
      <Container className="py-[clamp(3rem,4.5vw,4.5rem)]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_3fr]">
          <div className="max-w-[34ch]">
            <Logo />
            <p className="mt-5 text-[15px] font-medium leading-[1.6] text-muted">
              Everything you need to study in the UK &mdash; from choosing a
              career to your first week on campus<span className="text-orange">.</span>
            </p>

            {/* The same number as the floating contact widget, from the same
                config — call it, or open WhatsApp with a message written. */}
            <div className="mt-6">
              <h2 className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-navy">Talk to us</h2>
              <div className="mt-4 flex items-center gap-2.5">
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Message Ignition on WhatsApp at ${contact.phone}`}
                  className="flex size-[40px] items-center justify-center rounded-full bg-[#25d366]/12 text-[#128c4a] transition-colors duration-200 hover:bg-[#25d366] hover:text-white"
                >
                  <WhatsappIcon size={21} />
                </a>
                <a
                  href={telUrl}
                  aria-label={`Call Ignition on ${contact.phone}`}
                  className="flex size-[40px] items-center justify-center rounded-full bg-navy/[0.08] text-navy transition-colors duration-200 hover:bg-navy hover:text-white"
                >
                  <Phone size={18} strokeWidth={2.2} />
                </a>
                <a
                  href={telUrl}
                  className="ml-1 text-[15px] font-semibold text-navy underline-offset-2 hover:underline"
                >
                  {contact.phone}
                </a>
              </div>
              <p className="mt-2 text-[13px] font-medium text-muted-light">{contact.hours}</p>
            </div>
          </div>

          <nav aria-label="Footer" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {footerGroups.map((group) => (
              <div key={group.label}>
                <h2 className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-navy">
                  {group.label}
                </h2>
                <ul className="mt-4 space-y-[10px]">
                  {group.items.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[14.5px] font-medium leading-[1.45] text-muted transition-colors hover:text-navy"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 border-t border-hairline pt-6">
          <p className="text-[13px] font-medium leading-[1.6] text-muted-light">
            Ignition provides general guidance for students planning to study in
            the United Kingdom. Course, university, fee and scholarship figures
            shown on this site are example data for demonstration and are not
            official. Always confirm entry requirements and fees with the
            university, and immigration requirements with{" "}
            <a
              href="https://www.gov.uk/student-visa"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-link underline-offset-2 hover:underline"
            >
              official UK government guidance
            </a>
            .
          </p>
          <p className="mt-4 text-[13px] font-medium text-muted-light">
            &copy; {new Date().getFullYear()} Ignition. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
