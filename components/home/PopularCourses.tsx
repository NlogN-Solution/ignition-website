import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { courseImage, courseMosaicExtras } from "@/data/courses/imagery";
import { popularSearchTerms } from "@/data/home/popular";

const subjects = {
  "Computer Science": { imageSubject: "Computing", description: "Explore computing, software and the technology shaping our future." },
  Business: { imageSubject: "Business", description: "Find courses in management, enterprise and the world of business." },
  Nursing: { imageSubject: "Health", description: "Explore nursing courses and check each university’s entry requirements." },
  Engineering: { imageSubject: "Engineering", description: "Explore the design, systems and technology behind the things we build." },
};

/** Subject entry points use the live explorer, without inventing university or fee associations. */
export function PopularCourses() {
  const [second, third] = courseMosaicExtras;
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {popularSearchTerms.slice(0, 3).map((term) => {
        const subject = subjects[term];
        return (
          <li key={term} className="min-w-0">
            <Link
              href={`/courses?${new URLSearchParams({ q: term })}`}
              className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-hairline bg-white shadow-[0_8px_24px_-14px_rgba(10,14,28,0.18)] transition-shadow hover:shadow-[0_20px_40px_-16px_rgba(10,14,28,0.24)]"
            >
              <div className="relative grid h-[160px] grid-cols-[1.55fr_1fr] grid-rows-2 gap-[2px] bg-navy/5">
                <div className="relative row-span-2 overflow-hidden">
                  <Image src={courseImage(subject.imageSubject)} alt="" fill sizes="(min-width: 1024px) 270px, (min-width: 640px) 210px, 60vw" className="object-cover" />
                </div>
                <div className="relative overflow-hidden">
                  <Image src={second} alt="" fill sizes="140px" className="object-cover" />
                </div>
                <div className="relative overflow-hidden">
                  <Image src={third} alt="" fill sizes="140px" className="object-cover" />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="font-display text-xl font-bold text-ink">{term}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{subject.description}</p>
                <span className="mt-auto pt-6">
                  <span className="flex h-[46px] items-center justify-center gap-2 rounded-md bg-orange text-sm font-bold text-white group-hover:bg-[#e04f04]">
                    Explore courses <ArrowUpRight size={16} aria-hidden />
                  </span>
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
