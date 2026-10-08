/** @jsxImportSource react */
"use client";

import Image from "next/image";
import { useState } from "react";
import type { Offering } from "@/lib/api/types";
import { isRemoteImage } from "@/lib/image";

export function OfferingUniversityLogo({ university, small = false }: { university: Offering["university"]; small?: boolean }) {
  const [failed, setFailed] = useState<string>();
  const logo = university?.logo;
  const initials = university?.name.split(/\s+/).filter(word => !["of", "the", "and"].includes(word.toLowerCase())).slice(0, 2).map(word => word[0]).join("").toUpperCase() || "—";
  return <span className={`relative flex shrink-0 items-center justify-center overflow-hidden border border-hairline bg-white font-bold text-navy ${small ? "size-8 rounded-md text-[11px]" : "size-12 rounded-full text-sm"}`}>
    {logo && logo !== failed ? <Image src={logo} alt={`${university?.name} logo`} fill sizes={small ? "32px" : "48px"} unoptimized={isRemoteImage(logo)} onError={() => setFailed(logo)} className="object-contain p-1.5" /> : <span aria-hidden>{initials}</span>}
  </span>;
}
