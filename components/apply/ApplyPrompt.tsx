"use client";

import { StartApplicationButton } from "./StartApplicationButton";

/**
 * The contextual, low-key version of the conversion CTA — a card that sits
 * inside a page's own column rather than a band across the bottom.
 *
 * Used on course and university pages, where the student is still deciding.
 * The headline names the thing they are looking at, so the offer reads as an
 * answer to where they are rather than a house advert.
 */
export function ApplyPrompt({
  title,
  body,
  cta,
}: {
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <div className="rounded-xl border border-navy/12 bg-navy/[0.035] p-6">
      <h2 className="text-[17px] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
        {title}
      </h2>
      <p className="mt-[7px] text-[15px] font-medium leading-[1.55] text-muted">
        {body}
      </p>
      <div className="mt-5">
        <StartApplicationButton
          className="h-[46px] w-full gap-[12px] px-5 text-[15px]"
          iconSize={16}
          signedInLabel="Open my dashboard"
        >
          {cta}
        </StartApplicationButton>
      </div>
      <p className="mt-4 text-[13px] font-medium leading-[1.5] text-muted-light">
        Free to start. An Ignition advisor reviews your profile before anything is
        sent to a university.
      </p>
    </div>
  );
}
