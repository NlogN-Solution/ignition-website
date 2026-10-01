import type { StaticImageData } from "next/image";
import destination from "@/public/images/hero-section/london-bridge--establish-destination.jpg";
import education from "@/public/images/hero-section/uk-univeristy-student--education.jpg";
import outcome from "@/public/images/hero-section/int-student-graduating-uk--outcome.jpg";
import university from "@/public/images/hero-section/uk-uni.jpg";
// The original is portrait; this 3:2 version extends its sky so the whole
// building fits the landscape plate instead of a close-up band of columns.
import saintgeroge from "@/public/images/hero-section/saint-georges-hall--landscape.jpg";

/**
 * The four photographs in the hero's journey stack, in story order: the place,
 * the university, the life, the outcome. Read together they are one sentence —
 * which is why the order is fixed and the captions stay short. The hero
 * headline on the left carries the argument; these only name the chapter.
 *
 * `focus` is the photograph's object-position. The card is portrait from `xl`
 * and landscape below it, so each point is chosen to hold the subject in both
 * crops — the left tower and the Shard for the bridge, faces for the rest.
 */
export type JourneySlide = {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  image: StaticImageData;
  alt: string;
  focus: string;
  cta: { label: string; href: string };
};

export const journeySlides: JourneySlide[] = [
    {
      id: "experience",
      number: "01",
      category: "Experience",
      title: "More than a degree",
      description: "Discover student life, opportunities and your new surroundings.",
      image: university,
      alt: "Two international students sharing a book outside a university building",
      focus: "50% 32%",
      cta: { label: "Discover student life", href: "/life-in-uk" },
  },
  {
    id: "geroge",
    number: "02",
    category: "George",
    title: "",
    description: "",
    image: saintgeroge,
    alt: "The columned portico of St George's Hall, Liverpool, in late afternoon light",
    focus: "82% 50%",
    cta: { label: "See where a degree leads", href: "/careers" },
  },
  {
    id: "discover",
    number: "03",
    category: "Discover",
    title: "Your journey starts here",
    description: "Discover what studying and living in the UK could look like.",
    image: destination,
    alt: "Tower Bridge in London lit up at dusk, with the City skyline behind it",
    focus: "34% 55%",
    cta: { label: "Explore studying in the UK", href: "/study-in-uk" },
  },
  {
    id: "study",
    number: "04",
    category: "Study",
    title: "Find where you belong",
    description: "Explore universities and courses built around your goals.",
    image: education,
    alt: "Three students talking on the grass beneath a tree on a university campus",
    focus: "46% 50%",
    cta: { label: "Explore UK universities", href: "/universities" },
  },

  {
    id: "future",
    number: "05",
    category: "Future",
    title: "Build what comes next",
    description: "Turn your UK education into the beginning of your career.",
    image: outcome,
    alt: "A smiling graduate in cap and gown holding a degree scroll at a graduation ceremony",
    focus: "38% 35%",
    cta: { label: "See where a degree leads", href: "/careers" },
  },
];
