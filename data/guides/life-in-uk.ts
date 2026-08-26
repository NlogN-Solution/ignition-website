import type { AccordionItem } from "@/components/ui/Accordion";
import type { ChecklistItem } from "@/components/ui/Checklist";

export const arrivalChecklist: ChecklistItem[] = [
  { id: "docs", label: "Keep documents in your hand luggage", detail: "Passport, visa decision letter, CAS and offer letter — never in the hold." },
  { id: "address", label: "Know your term-time address", detail: "You will be asked for it at the border and by the university." },
  { id: "cash", label: "Carry a small amount of pounds", detail: "Enough for transport and a first meal; cards work almost everywhere else." },
  { id: "transport", label: "Plan the journey from the airport", detail: "Many universities run a pickup service in welcome week — book ahead." },
  { id: "sim", label: "Sort a UK SIM card", detail: "Airport kiosks work, but a supermarket or high-street shop is cheaper." },
];

export const firstWeekChecklist: ChecklistItem[] = [
  { id: "enrol", label: "Enrol and collect your student ID" },
  { id: "brp", label: "Complete any immigration steps your visa requires", detail: "Your university's international office will confirm what applies to you." },
  { id: "gp", label: "Register with a GP", detail: "A local doctor. Do this before you are ill, not after." },
  { id: "bank", label: "Open a UK bank account", detail: "Ask the university for a bank letter confirming your address and student status." },
  { id: "orientation", label: "Attend international orientation" },
  { id: "timetable", label: "Check your timetable and find your buildings", detail: "Walk the route once before the first lecture." },
  { id: "societies", label: "Join two societies", detail: "One connected to your subject, one nothing to do with it." },
  { id: "travel", label: "Get a student travel card" },
  { id: "essentials", label: "Buy bedding, kitchen basics and a plug adapter" },
  { id: "contacts", label: "Save emergency and university contact numbers" },
];

export const lifeTopics = [
  {
    title: "Accommodation",
    body: "First-year international students are usually offered university halls, which are simpler than they look: bills included, a contract matching the academic year, and everyone else arriving at the same time. From the second year most students rent privately in shared houses, which is cheaper per week but means deposits, bills, longer contracts and sometimes a UK-based guarantor. Start looking for second-year housing far earlier than feels necessary.",
  },
  {
    title: "Healthcare",
    body: "Register with a GP — a local family doctor — in your first weeks. The GP is the entry point to almost all non-emergency care, and registering takes far longer when you are already unwell. For urgent but non-life-threatening problems there is a free 24-hour advice line; for emergencies, accident and emergency departments at hospitals. Your immigration health surcharge, paid with your visa, covers this care.",
  },
  {
    title: "Banking",
    body: "Most banks want your passport, evidence of your immigration status, and proof of your address and student status. Your university can issue a letter for this. Appointments at traditional banks can take weeks in September, so many students open a digital account immediately and set up a traditional one alongside it.",
  },
  {
    title: "Transport",
    body: "Cities are walkable and buses are the default for students. Railcards for young people and students cut long-distance rail fares substantially and pay for themselves quickly. In larger cities, contactless payment caps daily and weekly spend automatically — you rarely need a separate ticket.",
  },
  {
    title: "Academic expectations",
    body: "The biggest adjustment for most international students is how little contact time there is. A humanities degree may have six or eight hours of teaching a week, with the rest expected as independent reading and writing. Nobody chases you. Referencing rules are strict and plagiarism is treated seriously, including reusing your own work — ask about referencing conventions in your first week rather than guessing.",
  },
  {
    title: "Food and cost of living",
    body: "Supermarkets are far cheaper than eating out, and the larger chains have distinctly cheaper own-brand ranges. Most campuses have international food shops nearby. Cooking with housemates a few nights a week is the single most effective way to cut a food budget.",
  },
  {
    title: "Culture and social life",
    body: "Societies are the main way students meet people outside their course, and joining in the first fortnight is much easier than joining in November. British social conventions can feel indirect — invitations are often loose and plans informal. Say yes early and often; the first month sets most friendships.",
  },
  {
    title: "Part-time work",
    body: "Term-time hours are limited by your visa conditions and the cap is enforced. Universities advertise on-campus jobs that understand student timetables, and these are usually the easiest place to start. Keep a record of your hours.",
  },
  {
    title: "Safety",
    body: "UK university cities are generally safe, with the ordinary caution any city requires at night. The emergency number is 999. Universities run late-night campus transport, security escorts and wellbeing services — find out what yours offers before you need it.",
  },
];

export const lifeFaqs: AccordionItem[] = [
  {
    question: "How much contact time will I have?",
    answer:
      "Far less than most school systems. Science and engineering courses have more, with laboratories and problem classes; humanities and social science courses may have under ten hours a week. The expectation is that the remaining time is spent reading and writing independently, and the workload is real even when the timetable looks empty.",
  },
  {
    question: "Do I need to register with a doctor even if I am healthy?",
    answer:
      "Yes, and do it early. Registration takes time and you cannot easily access non-emergency care without it. Most universities run registration sessions during welcome week specifically because so many students leave it too late.",
  },
  {
    question: "How do I make friends if I do not know anyone?",
    answer:
      "Almost nobody knows anyone in the first week, which makes it the easiest time to meet people. Societies, hall kitchens and course seminars are where most friendships start. Joining something unrelated to your degree tends to matter more than joining something related to it.",
  },
  {
    question: "What should I bring, and what should I buy here?",
    answer:
      "Bring documents, medication with a prescription, and clothes for cold and wet weather. Buy bedding, kitchen equipment, and anything bulky after you arrive — it is cheaper than shipping it and every university city has budget shops geared to arriving students.",
  },
  {
    question: "Is it cold?",
    answer:
      "It is milder than many people expect but much greyer and wetter, and daylight is short from November to February. A waterproof coat matters more than a thick one. The lack of light affects people more than the temperature does — get outside during daylight and say something to student services if it starts to weigh on you.",
  },
];
