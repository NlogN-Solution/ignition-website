"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { CampusImage } from "@/data/universities/imagery";

/**
 * The campus, as pictures rather than adjectives.
 *
 * A mosaic, not a uniform grid: the lead image is the place and the three
 * beside it are the life in it, and giving all four the same weight would say
 * the walk to a lecture matters as much as where you would be living. Every
 * tile opens a lightbox, because the interesting thing about a photograph of
 * somewhere you might spend three years is the detail.
 *
 * The lightbox is a plain overlay rather than a `<dialog>`: it needs to work
 * identically on a phone, arrow keys have to move between images, and the
 * modality here is one trapped element with nothing focusable behind it.
 */
export function CampusGallery({
  images,
  name,
}: {
  images: CampusImage[];
  /** The university, for alt text that says which campus this is. */
  name: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
      if (event.key === "ArrowRight") setOpen((i) => ((i ?? 0) + 1) % images.length);
      if (event.key === "ArrowLeft")
        setOpen((i) => ((i ?? 0) - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, images.length]);

  if (images.length === 0) return null;

  const [lead, ...rest] = images;
  const current = open === null ? null : images[open];

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <Tile
          image={lead}
          name={name}
          onOpen={() => setOpen(0)}
          className="aspect-[4/3] sm:aspect-auto sm:min-h-[320px]"
          sizes="(min-width: 640px) 55vw, 100vw"
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
          {rest.slice(0, 3).map((image, index) => (
            <Tile
              key={`${image.src}-${index}`}
              image={image}
              name={name}
              onOpen={() => setOpen(index + 1)}
              className={`aspect-[4/3] sm:aspect-auto sm:min-h-[98px] ${
                index === 2 ? "col-span-2 sm:col-span-1" : ""
              }`}
              sizes="(min-width: 640px) 28vw, 50vw"
            />
          ))}
        </div>
      </div>

      <p className="mt-3 text-[13px] font-medium leading-[1.55] text-muted-light">
        Example imagery. These are stock photographs standing in for campus
        photography, not pictures of a real institution.
      </p>

      {current ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${name} — ${current.caption}`}
          className="fixed inset-0 z-[70] flex flex-col bg-navy-ink/92 backdrop-blur-sm"
          onClick={() => setOpen(null)}
        >
          <div className="flex shrink-0 items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <p className="text-[13.5px] font-semibold text-white/60">
              {(open ?? 0) + 1} of {images.length}
            </p>
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close"
              autoFocus
              className="inline-flex size-10 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={20} strokeWidth={2.3} aria-hidden />
            </button>
          </div>

          <div
            className="flex min-h-0 flex-1 items-stretch gap-2 px-2 pb-6 sm:gap-4 sm:px-6"
            /* The overlay closes on click; the picture and its controls must
               not, or every attempt to look closer dismisses the thing being
               looked at. */
            onClick={(event) => event.stopPropagation()}
          >
            <Arrow
              direction="previous"
              onClick={() =>
                setOpen((i) => ((i ?? 0) - 1 + images.length) % images.length)
              }
            />

            {/* `items-stretch` above and `min-h-0 flex-1` here are what give
                the image a definite height to fill — a `fill` image inside an
                auto-height box collapses to nothing. */}
            <figure className="flex min-h-0 flex-1 flex-col gap-4">
              <div className="relative min-h-0 w-full flex-1">
                <Image
                  src={current.src}
                  alt={`${name} — ${current.caption}`}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="shrink-0 text-center text-[14.5px] font-medium text-white/75">
                {current.caption}
              </figcaption>
            </figure>

            <Arrow
              direction="next"
              onClick={() => setOpen((i) => ((i ?? 0) + 1) % images.length)}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

function Tile({
  image,
  name,
  onOpen,
  className,
  sizes,
}: {
  image: CampusImage;
  name: string;
  onOpen: () => void;
  className: string;
  sizes: string;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group relative w-full overflow-hidden rounded-xl border border-hairline bg-navy/5 ${className}`}
    >
      <Image
        src={image.src}
        alt={`${name} — ${image.caption}`}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />

      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-navy-ink/75 via-navy-ink/10 to-transparent opacity-90"
      />

      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-[13px] text-left">
        <span className="text-[13px] font-semibold leading-[1.4] text-white/90">
          {image.caption}
        </span>
        <span
          aria-hidden
          className="flex size-[26px] shrink-0 items-center justify-center rounded-lg bg-white/15 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100"
        >
          <Expand size={13} strokeWidth={2.4} />
        </span>
      </span>
    </button>
  );
}

function Arrow({
  direction,
  onClick,
}: {
  direction: "previous" | "next";
  onClick: () => void;
}) {
  const Icon = direction === "previous" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${direction === "previous" ? "Previous" : "Next"} image`}
      className="inline-flex size-11 shrink-0 self-center items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
    >
      <Icon size={22} strokeWidth={2.2} aria-hidden />
    </button>
  );
}
