export type Question = {
  id: string;
  prompt: string;
  options: string[];
};

/** The four-step profile builder shown on /discover. */
export const questions: Question[] = [
  {
    id: "priority",
    prompt: "What matters most to you?",
    options: ["Career", "Lifestyle", "Budget", "Research"],
  },
  {
    id: "budget",
    prompt: "What can you comfortably invest each year?",
    options: [
      "Under $10,000",
      "$10,000 – $20,000",
      "$20,000 – $35,000",
      "Above $35,000",
    ],
  },
  {
    id: "field",
    prompt: "Which field are you heading into?",
    options: ["Engineering", "Business", "Health sciences", "Still deciding"],
  },
  {
    id: "timing",
    prompt: "When do you want to start?",
    options: [
      "Next intake",
      "Within a year",
      "In one to two years",
      "Just planning ahead",
    ],
  },
];

/** The entry question on /start. */
export const startOptions = [
  "I’m just exploring",
  "I’ve already researched",
  "I know what I want",
  "Budget matters most",
];
