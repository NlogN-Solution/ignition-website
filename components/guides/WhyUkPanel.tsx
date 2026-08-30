import Image from "next/image";
import { Clock, Compass, ShieldCheck, Target } from "lucide-react";
import { Container } from "../ui/Container";
import { AccentText } from "../ui/AccentText";
import { whyUk, type WhyUkReason } from "@/data/guides/study-in-uk";
import campusLife from "@/public/images/campus-life-1.jpg";

/**
 * The argument section, and the one place on the page that goes to full
 * brand strength.
 *
 * Four equal cards was the previous treatment and it flattened the section:
 * every point looked like a link and none of them looked like a claim. Here
 * the four reasons sit together on one navy panel, which turns them back into
 * a single argument, and the photograph beside them supplies the thing the
 * copy cannot — what any of this actually looks like.
 *
 * Each point keeps both its one-line summary and its full explanation. The
 * summary is what a scanner reads; the paragraph is what someone deciding
 * reads. Dropping either would cost the section one of its two audiences.
 */

const icons: Record<WhyUkReason["icon"], typeof Clock> = {
  clock: Clock,
  target: Target,
  compass: Compass,
  shield: ShieldCheck,
};

export function WhyUkPanel({ id }: { id: string }) {
  return (
    <section
      id={id}
      className="scroll-mt-[calc(var(--nav-h)_+_4.5rem)] py-[clamp(2.75rem,4.5vw,4.5rem)]"
    >
      <Container>
        <div className="overflow-hidden rounded-2xl border border-navy/15 shadow-[0_28px_60px_-38px_rgba(1,22,111,0.55)] lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div className="bg-navy p-6 sm:p-8 lg:p-10">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] font-bold leading-[1.1] tracking-[-0.02em] text-white">
              <AccentText>Why the UK?</AccentText>
            </h2>
            <p className="mt-3 max-w-[44ch] text-[15.5px] font-medium leading-[1.55] text-white/65">
              The UK is not the right choice for everyone. Four things shape
              the experience more than anything else — and each one cuts both
              ways.
            </p>

            <ul className="mt-8 space-y-[22px]">
              {whyUk.map((reason) => {
                const Icon = icons[reason.icon];

                return (
                  <li key={reason.id} className="flex gap-[14px]">
                    <span
                      aria-hidden
                      className="mt-[2px] flex size-[34px] shrink-0 items-center justify-center rounded-[10px] border border-white/15 bg-white/[0.08] text-white"
                    >
                      <Icon size={16} strokeWidth={2} />
                    </span>

                    <div className="min-w-0">
                      <h3 className="text-[16px] font-bold leading-[1.3] tracking-[-0.01em] text-white">
                        {reason.title}
                      </h3>
                      <p className="mt-[5px] text-[13.5px] font-semibold leading-[1.45] text-orange/90">
                        {reason.summary}
                      </p>
                      <p className="mt-[7px] max-w-[52ch] text-[14.5px] font-medium leading-[1.6] text-white/70">
                        {reason.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* The picture is the section's evidence, so it is given real room
              rather than a decorative strip. Navy bleeds a little way into
              its left edge on wide screens so the two halves meet rather than
              butt together. */}
          <div className="relative min-h-[240px] sm:min-h-[300px] lg:min-h-0">
            {/* `sizes` has to describe the CSS width the plate occupies, not
                the width of the file. It reads a little over half the 1240px
                container, and the browser doubles the number it picks on a
                retina screen — understating it here was why an HD source
                still arrived soft. */}
            <Image
              src={campusLife}
              alt="International students walking together across a UK university campus."
              sizes="(max-width: 1024px) 100vw, (max-width: 1400px) 55vw, 660px"
              quality={90}
              className="absolute inset-0 h-full w-full object-cover object-[50%_45%]"
            />
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 hidden w-24 bg-[linear-gradient(to_right,var(--color-navy),rgba(1,22,111,0))] lg:block"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
