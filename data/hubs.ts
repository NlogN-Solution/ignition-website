/**
 * The remaining outline pages, built in the next phase. Each is live now with
 * its own URL, metadata and outline, so navigation is complete and the
 * structure is reviewable before the tooling behind it is written.
 */
export type Hub = {
  path: string;
  eyebrow: string;
  title: string;
  intro: string;
  crumbs: { label: string; href: string }[];
  sections: { title: string; description: string }[];
  /** Statutory or official guidance this hub must always defer to. */
  notice?: { text: string; href: string; linkLabel: string };
  cta: {
    title: string;
    intro: string;
    primary: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
};

export const hubs: Record<string, Hub> = {
  calculator: {
    path: "/money/calculator",
    eyebrow: "Money",
    title: "Estimate your cost of studying.",
    intro:
      "Put in your city, tuition, accommodation and living choices and get a monthly and annual estimate with a full breakdown — so the number you plan around is yours, not an average.",
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Money", href: "/money" },
      { label: "Cost calculator", href: "/money/calculator" },
    ],
    sections: [
      { title: "City", description: "Where you'll be studying, since it changes almost everything." },
      { title: "Tuition", description: "Your course fee for the year." },
      { title: "Accommodation", description: "Halls or private, and how many months." },
      { title: "Food and transport", description: "The two costs students most often underestimate." },
      { title: "Everything else", description: "Phone, books, insurance, social and travel home." },
      { title: "Your breakdown", description: "Monthly and annual totals, split by category." },
    ],
    cta: {
      title: "Number higher than expected?",
      intro: "Scholarships and part-time work can close a meaningful part of the gap.",
      primary: { label: "Explore scholarships", href: "/money/scholarships" },
      secondary: { label: "Money guide", href: "/money" },
    },
  },
  scholarships: {
    path: "/money/scholarships",
    eyebrow: "Money",
    title: "Find scholarships you can actually apply for.",
    intro:
      "Filter funding by nationality, level, subject, university and deadline — with the eligibility, the amount and a link to the official source for every entry.",
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Money", href: "/money" },
      { label: "Scholarships", href: "/money/scholarships" },
    ],
    sections: [
      { title: "Filters", description: "Nationality, study level, subject, university and deadline." },
      { title: "Amount and eligibility", description: "What each award covers and who can apply." },
      { title: "Deadlines", description: "When applications open and close." },
      { title: "How to apply", description: "The process for each award, and what it asks for." },
      { title: "Official source", description: "Every entry links to the provider's own page." },
    ],
    notice: {
      text: "Ignition never lists a scholarship it cannot link to an official source. Amounts, eligibility and deadlines change every cycle — confirm on the provider's own page before applying.",
      href: "https://www.gov.uk/guidance/chevening-scholarships",
      linkLabel: "official funding sources",
    },
    cta: {
      title: "Working out affordability?",
      intro: "Build a full-year estimate before you commit to anywhere.",
      primary: { label: "Cost calculator", href: "/money/calculator" },
      secondary: { label: "Money guide", href: "/money" },
    },
  },
};
