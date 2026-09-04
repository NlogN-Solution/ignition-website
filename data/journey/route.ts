/**
 * The whole route to a UK university, in three chapters.
 *
 * WHY THREE, NOT TEN. `journeyPipeline` in this folder is the product map —
 * ten stages, one per thing Ignition offers — and it stays that way; it is
 * what the homepage draws. This is the *student's* map, and a student does
 * not experience ten stages. They experience three: getting ready, applying,
 * and getting on the plane. Each chapter opens into the handful of things
 * that actually have to be done inside it.
 *
 * Every item links out to the guide that covers it in full. The cards under
 * an item are the shape of the task, not the task itself — four things to
 * have ready, four documents to gather — so the panel answers "what is this?"
 * in one screen and hands the reader off for "how do I do it?".
 *
 * ICONS are named rather than imported so this file stays a plain data module
 * either side of the client boundary. The registry is in
 * `components/journey/icons.ts`; a name with no entry there is a type error.
 */
import type { RouteIconName } from "@/components/journey/icons";

export type RouteCard = { icon: RouteIconName; title: string; body: string };

export type RouteItem = {
  id: string;
  label: string;
  summary: string;
  icon: RouteIconName;
  /** The guide that covers this properly. */
  href: string;
  cards: RouteCard[];
};

export type RoutePhase = {
  id: string;
  label: string;
  /** The one-line promise on the phase card at the top of the page. */
  summary: string;
  icon: RouteIconName;
  items: RouteItem[];
};

export const routePhases: RoutePhase[] = [
  {
    id: "plan",
    label: "Plan & Prepare",
    summary: "Explore, understand & get ready",
    icon: "compass",
    items: [
      {
        id: "entry-requirements",
        label: "University Entry Requirements",
        summary:
          "Every university and course has specific academic and personal requirements.",
        icon: "landmark",
        href: "/apply/entry-requirements",
        cards: [
          {
            icon: "cap",
            title: "Academic",
            body: "Minimum qualifications, grades & subject requirements.",
          },
          {
            icon: "chat",
            title: "English Language",
            body: "IELTS/TOEFL/PTE or MOI accepted universities.",
          },
          {
            icon: "briefcase",
            title: "Work Experience",
            body: "Required (if any), duration & relevant background.",
          },
          {
            icon: "star",
            title: "Other Criteria",
            body: "Personal statement, references, portfolios & interviews.",
          },
        ],
      },
      {
        id: "documents",
        label: "Document Requirements",
        summary:
          "All the documents you need to prepare for a smooth application process.",
        icon: "file",
        href: "/apply",
        cards: [
          {
            icon: "file",
            title: "Academic records",
            body: "Transcripts and certificates for every year you have completed.",
          },
          {
            icon: "chat",
            title: "English test",
            body: "A valid IELTS, TOEFL or PTE report, or your MOI letter.",
          },
          {
            icon: "star",
            title: "Statement & references",
            body: "Your personal statement and one or two academic referees.",
          },
          {
            icon: "passport",
            title: "Passport",
            body: "Valid well past your course start date, with clear bio pages.",
          },
        ],
      },
      {
        id: "explore",
        label: "Explore Universities & Courses",
        summary: "Find the right universities and courses that match your goals.",
        icon: "book",
        href: "/universities",
        cards: [
          {
            icon: "cap",
            title: "Course content",
            body: "What you actually study, module by module, in each year.",
          },
          {
            icon: "landmark",
            title: "The university",
            body: "Teaching quality, student satisfaction and support on offer.",
          },
          {
            icon: "coin",
            title: "Cost of the city",
            body: "Rent and living costs vary more than tuition does.",
          },
          {
            icon: "briefcase",
            title: "Where it leads",
            body: "Placement years, industry links and graduate outcomes.",
          },
        ],
      },
      {
        id: "ukvi",
        label: "UKVI Requirements",
        summary:
          "Understand the UKVI rules and guidelines for international students.",
        icon: "shield",
        href: "/apply/entry-requirements#visa-journey",
        cards: [
          {
            icon: "landmark",
            title: "Licensed sponsor",
            body: "Your university has to hold a Student sponsor licence.",
          },
          {
            icon: "chat",
            title: "English level",
            body: "B2 for degree level, proved by a test the Home Office accepts.",
          },
          {
            icon: "coin",
            title: "Maintenance funds",
            body: "Held for 28 consecutive days before you apply.",
          },
          {
            icon: "shield",
            title: "Genuine student",
            body: "You can explain your course, your choice and your plans.",
          },
        ],
      },
      {
        id: "cost",
        label: "Cost Breakdown",
        summary:
          "Get a clear estimate of tuition fees, living costs & other expenses.",
        icon: "coin",
        href: "/money",
        cards: [
          {
            icon: "cap",
            title: "Tuition",
            body: "Set per course, paid per year, and rarely negotiable.",
          },
          {
            icon: "landmark",
            title: "Living costs",
            body: "Rent, food and travel — the number that varies by city.",
          },
          {
            icon: "shield",
            title: "Visa & health",
            body: "The application fee and the Immigration Health Surcharge.",
          },
          {
            icon: "plane",
            title: "One-off costs",
            body: "Flights, deposits and everything you buy in the first month.",
          },
        ],
      },
    ],
  },
  {
    id: "apply",
    label: "Apply & Secure CAS",
    summary: "Apply to universities & receive your CAS",
    icon: "folder",
    items: [
      {
        id: "shortlist",
        label: "Build Your Shortlist",
        summary: "Narrow a long list of maybes into the courses you will actually apply to.",
        icon: "book",
        href: "/courses",
        cards: [
          {
            icon: "star",
            title: "Aspirational",
            body: "One or two above your predicted grades — worth the attempt.",
          },
          {
            icon: "cap",
            title: "Matched",
            body: "The courses your profile is genuinely competitive for.",
          },
          {
            icon: "shield",
            title: "Insurance",
            body: "One you would still be happy with on results day.",
          },
          {
            icon: "coin",
            title: "Affordable",
            body: "Check the whole cost, not the tuition line alone.",
          },
        ],
      },
      {
        id: "application",
        label: "Submit Your Application",
        summary: "Personal statement, references and the application itself.",
        icon: "file",
        href: "/apply",
        cards: [
          {
            icon: "file",
            title: "The form",
            body: "Your details, qualifications and course choices, entered once.",
          },
          {
            icon: "star",
            title: "Personal statement",
            body: "Why this subject, and what you have done about it.",
          },
          {
            icon: "chat",
            title: "Reference",
            body: "A teacher or employer who can speak to your academic work.",
          },
          {
            icon: "calendar",
            title: "Deadlines",
            body: "Equal consideration closes in January for most courses.",
          },
        ],
      },
      {
        id: "interviews",
        label: "Interviews & Assessments",
        summary: "Some courses interview. Practise before it counts.",
        icon: "chat",
        href: "/apply/interviews",
        cards: [
          {
            icon: "chat",
            title: "Subject questions",
            body: "They are testing how you think, not what you have memorised.",
          },
          {
            icon: "star",
            title: "Motivation",
            body: "Why this course, this university, and the UK.",
          },
          {
            icon: "file",
            title: "Admissions tests",
            body: "A few subjects sit one — check early, they book out.",
          },
          {
            icon: "shield",
            title: "Credibility",
            body: "The same ground a visa credibility interview covers.",
          },
        ],
      },
      {
        id: "offers",
        label: "Offers & Replies",
        summary: "Understand conditional and unconditional offers, then reply.",
        icon: "star",
        href: "/apply",
        cards: [
          {
            icon: "star",
            title: "Unconditional",
            body: "The place is yours — nothing left to prove.",
          },
          {
            icon: "cap",
            title: "Conditional",
            body: "Yours once you meet the grades or English score named.",
          },
          {
            icon: "shield",
            title: "Firm & insurance",
            body: "One first choice, one backup with a lower condition.",
          },
          {
            icon: "calendar",
            title: "Reply deadline",
            body: "Miss it and the offers are declined for you.",
          },
        ],
      },
      {
        id: "cas",
        label: "Deposit & CAS",
        summary: "Pay the deposit, meet your conditions and receive your CAS.",
        icon: "shield",
        href: "/apply",
        cards: [
          {
            icon: "cap",
            title: "Meet conditions",
            body: "Send final transcripts and your English result.",
          },
          {
            icon: "coin",
            title: "Tuition deposit",
            body: "Usually part of the first year, paid before the CAS is issued.",
          },
          {
            icon: "file",
            title: "The CAS",
            body: "A reference number confirming your sponsored place.",
          },
          {
            icon: "calendar",
            title: "Check it",
            body: "Every detail has to match your passport and documents exactly.",
          },
        ],
      },
    ],
  },
  {
    id: "visa",
    label: "Visa & Departure",
    summary: "Get your visa, prepare & arrive in the UK",
    icon: "plane",
    items: [
      {
        id: "visa-application",
        label: "Student Visa Application",
        summary: "The Home Office route from your CAS to a decision.",
        icon: "shield",
        href: "/apply/entry-requirements#visa-journey",
        cards: [
          {
            icon: "file",
            title: "Online form",
            body: "Started with your CAS number, up to six months ahead.",
          },
          {
            icon: "coin",
            title: "Fees",
            body: "The application fee plus the Immigration Health Surcharge.",
          },
          {
            icon: "passport",
            title: "Biometrics",
            body: "Fingerprints and a photograph at a visa application centre.",
          },
          {
            icon: "calendar",
            title: "Decision",
            body: "Usually three weeks, longer in the summer peak.",
          },
        ],
      },
      {
        id: "finances",
        label: "Financial Evidence",
        summary: "Maintenance funds, the 28-day rule and evidence that is accepted.",
        icon: "coin",
        href: "/apply/entry-requirements#visa-journey",
        cards: [
          {
            icon: "coin",
            title: "How much",
            body: "Tuition for year one plus monthly living costs, capped at nine months.",
          },
          {
            icon: "calendar",
            title: "28 days",
            body: "The balance must not dip below the total on any of them.",
          },
          {
            icon: "file",
            title: "What counts",
            body: "Bank statements or a loan letter, dated within 31 days.",
          },
          {
            icon: "shield",
            title: "Whose account",
            body: "Yours, or a parent's with a letter of consent.",
          },
        ],
      },
      {
        id: "pre-departure",
        label: "Pre-Departure Checklist",
        summary: "Money, documents, packing and the flight itself.",
        icon: "file",
        href: "/money/calculator",
        cards: [
          {
            icon: "passport",
            title: "Hand luggage",
            body: "Passport, visa decision letter, CAS and offer — never checked in.",
          },
          {
            icon: "coin",
            title: "First month",
            body: "Budget for rent, a deposit and everything before your first payment.",
          },
          {
            icon: "plane",
            title: "Arrival window",
            body: "You can enter up to a week before your course starts.",
          },
          {
            icon: "calendar",
            title: "Registration",
            body: "Enrolment dates are fixed — book the flight around them.",
          },
        ],
      },
      {
        id: "accommodation",
        label: "Accommodation & Arrival",
        summary: "Where you will live, and what happens in your first week.",
        icon: "landmark",
        href: "/life-in-uk",
        cards: [
          {
            icon: "landmark",
            title: "Halls",
            body: "Simplest for year one, and where you meet people.",
          },
          {
            icon: "coin",
            title: "Private renting",
            body: "Cheaper, but needs a guarantor and a deposit up front.",
          },
          {
            icon: "file",
            title: "BRP or eVisa",
            body: "Collect or activate your proof of status on arrival.",
          },
          {
            icon: "calendar",
            title: "Welcome week",
            body: "Enrol, register with a doctor, and find your department.",
          },
        ],
      },
      {
        id: "life",
        label: "Life in the UK",
        summary: "Banking, phone, healthcare and finding your feet.",
        icon: "compass",
        href: "/life-in-uk",
        cards: [
          {
            icon: "coin",
            title: "Bank account",
            body: "Opened with your enrolment letter and proof of address.",
          },
          {
            icon: "chat",
            title: "Phone & SIM",
            body: "A pay-monthly plan usually needs a UK bank account first.",
          },
          {
            icon: "shield",
            title: "The NHS",
            body: "Covered by your health surcharge — register with a GP early.",
          },
          {
            icon: "briefcase",
            title: "Working",
            body: "Up to 20 hours a week in term time on a Student visa.",
          },
        ],
      },
    ],
  },
];

export const routeHero = {
  eyebrow: "Your journey to the UK",
  title: "From first idea to your first week in the UK.",
  intro:
    "A complete guide that connects every step — from exploring your options to arriving and starting your new life.",
};

export const routeGuidance = {
  title: "Need personal guidance?",
  body: "Talk to our experts and get clarity at every step.",
  cta: { label: "Talk to an Expert", href: "/#lead" },
};
