import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "../ui/Container";
import { footerGroups } from "@/lib/navigation";

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
