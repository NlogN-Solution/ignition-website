/** The student dashboard is a separate deployment. */
export const loginUrl = "https://ignition-studentdashboard.onrender.com/login";

export type NavItem = {
  label: string;
  items: { label: string; href: string }[];
};

export const navItems: NavItem[] = [
  {
    label: "Explore",
    items: [
      { label: "Find your path", href: "/start" },
      { label: "Take the quiz", href: "/discover" },
      { label: "Your match", href: "/match" },
    ],
  },
  {
    label: "Countries",
    items: [
      { label: "Germany", href: "/match" },
      { label: "United Kingdom", href: "/match" },
      { label: "Australia", href: "/match" },
      { label: "United States", href: "/match" },
    ],
  },
  {
    label: "Universities",
    items: [
      { label: "Public universities", href: "/match" },
      { label: "Ranked by ROI", href: "/match" },
      { label: "Engineering schools", href: "/match" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Budget planner", href: "/start" },
      { label: "Application guide", href: "/start" },
      { label: "Scholarships", href: "/start" },
      { label: "Blogs", href: "/start" },
    ],
  },
];
