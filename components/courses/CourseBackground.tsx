"use client";

import Image from "next/image";
import { useState } from "react";
import { isRemoteImage } from "@/lib/image";

export const COURSE_FALLBACK_IMAGE = "/images/course-fallback-bg.jpg";

/** University photography, with the same fallback for missing or broken media. */
export function CourseBackground({ src }: { src?: string }) {
  const [failedSrc, setFailedSrc] = useState<string>();
  const image = src && src !== failedSrc ? src : COURSE_FALLBACK_IMAGE;
  const fallback = image === COURSE_FALLBACK_IMAGE;
  return <div aria-hidden className="absolute inset-0 bg-[#bac5cd]"><Image src={image} alt="" fill priority sizes="100vw" unoptimized={fallback || isRemoteImage(image)} onError={() => setFailedSrc(src)} className={fallback ? "object-cover object-[65%_top] lg:object-contain lg:object-right-top" : "object-cover object-center"} /></div>;
}
