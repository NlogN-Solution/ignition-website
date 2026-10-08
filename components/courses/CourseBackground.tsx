"use client";

import Image from "next/image";
import { useState } from "react";
import { isRemoteImage } from "@/lib/image";

export const COURSE_FALLBACK_IMAGE = "/images/course-fallback-bg.jpg";

/** University photography, with the same fallback for missing or broken media. */
export function CourseBackground({ src }: { src?: string }) {
  const [failedSrc, setFailedSrc] = useState<string>();
  const image = src && src !== failedSrc ? src : COURSE_FALLBACK_IMAGE;
  return <Image src={image} alt="" aria-hidden fill priority sizes="100vw" unoptimized={isRemoteImage(image)} onError={() => setFailedSrc(src)} className="object-cover object-center" />;
}
