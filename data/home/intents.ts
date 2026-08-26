/**
 * The five entry points on the homepage. `icon` is a key resolved to a lucide
 * component in the view, so this stays plain data.
 *
 * "Find a course" used to sit here and no longer does: the search directly
 * under the hero is the better answer to that question, and offering the same
 * destination twice on one screen makes a student read the second offer as
 * something different from the first. Course discovery is now the search, the
 * navbar and the footer — three routes, none of them competing with the entry
 * point that is genuinely unique to this grid, the career quiz.
 */
export type Intent = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon:
    | "compass"
    | "bookOpen"
    | "landmark"
    | "clipboard"
    | "plane"
    | "luggage";
};

export const intents: Intent[] = [
  {
    id: "career",
    title: "Find my career",
    description: "I'm not sure what I should study.",
    href: "/careers/quiz",
    icon: "compass",
  },
  {
    id: "university",
    title: "Find a university",
    description: "Compare universities across the UK.",
    href: "/universities",
    icon: "landmark",
  },
  {
    id: "apply",
    title: "How to apply",
    description: "Understand the UK university application process.",
    href: "/apply",
    icon: "clipboard",
  },
  {
    id: "visa",
    title: "Student visa",
    description: "Understand the UK Student visa journey.",
    href: "/visa",
    icon: "plane",
  },
  {
    id: "prepare",
    title: "Prepare for the UK",
    description: "Get ready for life and study in the UK.",
    href: "/life-in-uk",
    icon: "luggage",
  },
];
