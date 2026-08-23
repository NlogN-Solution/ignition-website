import Image from "next/image";
import monument from "@/public/images/hero-monument.png";
import student from "@/public/images/student.png";

/**
 * Below `lg` the gateway sits under the copy as its own band. From `lg` it
 * becomes the section backdrop, anchored by percentage so the arch keeps its
 * position relative to the headline; the student is placed against the same
 * box so he stays centred in the opening.
 */
export function HeroArt() {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative mt-10 h-[300px] select-none overflow-hidden sm:h-[420px] lg:absolute lg:inset-0 lg:mt-0 lg:h-auto"
    >
      <div className="absolute bottom-0 left-1/2 h-full w-[150%] -translate-x-1/2 sm:w-[125%] lg:left-[36.5%] lg:top-[4px] lg:h-auto lg:w-[72.5%] lg:translate-x-0 lg:[mask-image:linear-gradient(to_right,transparent_0%,#000_13%)]">
        <Image
          src={monument}
          alt=""
          sizes="(max-width: 1024px) 150vw, 73vw"
          priority
          className="h-full w-full object-cover object-[50%_86%] lg:object-fill"
        />
        <Image
          src={student}
          alt=""
          sizes="130px"
          priority
          className="absolute left-[47.6%] top-[40%] h-[48%] w-auto -translate-x-1/2 lg:left-[47.1%] lg:top-[38.2%] lg:h-[42.5%]"
        />
      </div>

      {/* Fades the plate into the canvas on the headline side, exactly as the
          reference does, instead of showing a hard image edge. */}
      <div className="absolute inset-0 hidden bg-[linear-gradient(to_right,var(--color-canvas)_20%,rgba(251,250,254,0.9)_34%,rgba(251,250,254,0.44)_48%,rgba(251,250,254,0.12)_62%,rgba(251,250,254,0)_74%)] lg:block" />
      <div className="absolute inset-x-0 top-0 h-[12%] bg-[linear-gradient(to_bottom,var(--color-canvas),rgba(251,250,254,0))]" />
    </div>
  );
}
