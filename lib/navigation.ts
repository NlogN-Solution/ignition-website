export type NavItem = {
  label: string;
  /** Landing page for the group — the label itself links here on mobile. */
  href: string;
  items: { label: string; href: string; description?: string }[];
};

/**
 * Six groups rather than one item per journey stage: a label per stage
 * overflows the navbar below ~1440px at the existing type size, and the
 * dropdown pattern already in the header carries the rest without a redesign.
 * Every stage of the journey stays one click from the bar.
 *
 * "Resources" is the reference shelf — the reading and the tools — kept
 * separate from the journey groups above it. A student in the middle of an
 * application is not looking for a blog post, and a student reading around
 * the decision is not yet in a stage.
 */
export const navItems: NavItem[] = [
  {
    label: "Study in UK",
    href: "/study-in-uk",
    items: [
      { label: "Why study in the UK", href: "/study-in-uk" },
      { label: "Your UK journey", href: "/start" },
    ],
  },
  {
    label: "Careers",
    href: "/careers",
    items: [
      { label: "Take the career quiz", href: "/careers/quiz" },
      { label: "Explore careers", href: "/careers" },
    ],
  },
  {
    label: "Courses & Universities",
    href: "/courses",
    items: [
      { label: "Explore courses", href: "/courses" },
      { label: "Explore universities", href: "/universities" },
      { label: "Compare universities", href: "/compare" },
    ],
  },
  {
    label: "Apply",
    href: "/apply",
    items: [
      { label: "How to apply", href: "/apply" },
      { label: "Entry requirements & visa", href: "/apply/entry-requirements" },
      { label: "Interview preparation", href: "/apply/interviews" },
    ],
  },
  {
    label: "Life in UK",
    href: "/life-in-uk",
    items: [
      { label: "Living in the UK", href: "/life-in-uk" },
      { label: "Tuition & living costs", href: "/money" },
      { label: "Cost calculator", href: "/money/calculator" },
      { label: "Scholarships", href: "/money/scholarships" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    items: [
      { label: "Blog", href: "/resources/blog" },
      { label: "Guides", href: "/resources/guides" },
      { label: "Check your eligibility", href: "/resources/eligibility" },
      { label: "Cost calculator", href: "/money/calculator" },
      { label: "Scholarship finder", href: "/money/scholarships" },
      { label: "Interview practice", href: "/apply/interviews" },
    ],
  },
];

/** Grouped for the footer, which doubles as the site's internal link map. */
export const footerGroups = [
  {
    label: "Start here",
    items: [
      { label: "Why study in the UK", href: "/study-in-uk" },
      { label: "Where are you in your journey?", href: "/start" },
      { label: "Take the career quiz", href: "/careers/quiz" },
      { label: "Check what you qualify for", href: "/resources/eligibility" },
    ],
  },
  {
    label: "Choose",
    items: [
      { label: "Explore careers", href: "/careers" },
      { label: "Explore courses", href: "/courses" },
      { label: "Explore universities", href: "/universities" },
      { label: "Compare universities", href: "/compare" },
    ],
  },
  {
    label: "Apply",
    items: [
      { label: "How to apply", href: "/apply" },
      { label: "Entry requirements & visa", href: "/apply/entry-requirements" },
      { label: "Interview preparation", href: "/apply/interviews" },
    ],
  },
  {
    label: "Plan & prepare",
    items: [
      { label: "Tuition & living costs", href: "/money" },
      { label: "Cost calculator", href: "/money/calculator" },
      { label: "Scholarships", href: "/money/scholarships" },
      { label: "Life in the UK", href: "/life-in-uk" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Blog", href: "/resources/blog" },
      { label: "Guides", href: "/resources/guides" },
      { label: "Check your eligibility", href: "/resources/eligibility" },
      { label: "All resources", href: "/resources" },
    ],
  },
] as const;
