import Image from "next/image";
import { communityStat } from "@/data/study-in-uk/community";

/**
 * "You won't be the only one" — see `data/study-in-uk/community.ts` for why
 * this section exists and why it's numbers rather than testimonials.
 *
 * Solid orange, not navy — `FutureCta` right after this is the navy plate,
 * and two of those back to back would read as one section repeated rather
 * than a build toward it. Text sits on the flat colour, photo sits beside it
 * rather than behind it, so the two stats stay fully legible rather than
 * fighting a photograph for contrast — the same text-block/photo-block split
 * `WorkInUk`'s intro already uses, not a new pattern to learn.
 */
export function CommunityStat({ id }: { id?: string }) {
  const { enrolled, visaGrant } = communityStat;

  return (
    <section
      id={id}
      className="scroll-mt-[calc(var(--nav-h)_+_2rem)] bg-white px-5 py-[clamp(3rem,5vw,4.5rem)] sm:px-8 lg:px-24"
    >
      <div className="mx-auto max-w-[1240px] overflow-hidden rounded-[22px] bg-orange text-white shadow-[0_28px_60px_-30px_rgba(252,90,7,0.55)]">
        <div className="grid lg:grid-cols-[1.15fr_1fr]">
          <div className="p-8 sm:p-10 lg:p-12">
            <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-white/70">
              {communityStat.eyebrow}
            </p>
            <h2 className="mt-[14px] text-[clamp(1.75rem,3vw,2.375rem)] font-bold leading-[1.15] tracking-[-0.02em]">
              {communityStat.headline}
            </h2>
            <p className="mt-[12px] max-w-[46ch] text-[15px] font-medium leading-[1.6] text-white/85">
              {communityStat.body}
            </p>

            <div className="mt-[clamp(1.5rem,2.5vw,2rem)] grid grid-cols-2 gap-[20px] sm:gap-[28px]">
              <div>
                <p className="text-[clamp(2rem,4vw,2.75rem)] font-bold leading-[1] tracking-[-0.02em] tabular-nums">
                  {enrolled.figure}
                </p>
                <p className="mt-[8px] text-[13.5px] font-semibold leading-[1.4]">
                  {enrolled.label}
                </p>
                <p className="mt-[4px] text-[12.5px] font-medium leading-[1.4] text-white/70">
                  {enrolled.detail}
                </p>
              </div>

              <div>
                <p className="text-[clamp(2rem,4vw,2.75rem)] font-bold leading-[1] tracking-[-0.02em] tabular-nums">
                  {visaGrant.figure}
                </p>
                <p className="mt-[8px] text-[13.5px] font-semibold leading-[1.4]">
                  {visaGrant.label}
                </p>
                <p className="mt-[4px] text-[12.5px] font-medium leading-[1.4] text-white/70">
                  {visaGrant.detail}
                </p>
              </div>
            </div>

            <p className="mt-[clamp(1.25rem,2vw,1.75rem)] text-[11.5px] font-medium leading-[1.6] text-white/60">
              Sources —{" "}
              <a
                href={enrolled.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-2 hover:text-white"
              >
                {enrolled.source}
              </a>{" "}
              ·{" "}
              <a
                href={visaGrant.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-2 hover:text-white"
              >
                {visaGrant.source}
              </a>
            </p>
          </div>

          <div className="relative min-h-[220px] lg:min-h-0">
            <Image
              src={communityStat.image}
              alt="Graduates celebrating together after their UK degree."
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
