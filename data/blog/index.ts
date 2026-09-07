/**
 * The blog: the questions students ask an adviser before they trust a
 * shortlist, answered once, in public.
 *
 * Editorial rules, because this is the one part of the site that is opinion
 * rather than catalogue:
 *
 * 1. Nothing datable. Fee levels, visa thresholds, UCAS deadlines and salary
 *    figures move every cycle, and a blog post is the worst possible place to
 *    pin one. Where a post touches a regulated number it says who publishes it
 *    and links there, through `source`.
 * 2. No institution is named. These are fictional universities; a post that
 *    recommended one would be recommending a placeholder.
 * 3. Every post ends somewhere. `related` is the tool or guide that turns the
 *    reading into a decision — a post that leaves a student better informed and
 *    no further forward has not finished its job.
 */

export type BlogSection = {
  heading: string;
  paragraphs: string[];
  /** Rendered as a bulleted list under the paragraphs. */
  points?: string[];
};

export type BlogPost = {
  id: string;
  title: string;
  /** One or two sentences. Used on the index and as the meta description. */
  excerpt: string;
  /** ISO date. Displayed as a long date in en-GB. */
  published: string;
  readingMinutes: number;
  tag: "Money" | "Choosing" | "Applying" | "Visa" | "Arriving";
  /** The lead paragraph, before the first heading. */
  standfirst: string;
  sections: BlogSection[];
  /** Official publisher this post defers to, where it touches a regulated topic. */
  source?: { label: string; href: string };
  related: { label: string; href: string }[];
};

export const posts: BlogPost[] = [
  {
    id: "what-a-uk-year-actually-costs",
    title: "What a year in the UK actually costs",
    excerpt:
      "Tuition is the number everyone quotes and rarely the number that decides it. Here is the full shape of a year, and which parts you can move.",
    published: "2026-07-28",
    readingMinutes: 7,
    tag: "Money",
    standfirst:
      "Almost every student we speak to has researched tuition and nothing else. Tuition is the single largest line, but it is also the one you have least control over once you have chosen a course — and the lines you do control add up to something comparable.",
    sections: [
      {
        heading: "The four lines that make a year",
        paragraphs: [
          "A year is tuition, accommodation, living costs and the one-off costs of arriving. Tuition is fixed the day you accept an offer. Accommodation is a decision you make twice — once when you pick a city and again when you pick between halls and a shared house. Living costs follow the city more than they follow you. Arrival costs are one-time, easy to forget, and land in the same month as everything else.",
          "Put crudely: two universities quoting the same tuition in different cities can be several thousand pounds apart over three years, and the difference is entirely in the lines nobody compares.",
        ],
        points: [
          "Tuition — fixed per course and per intake, published by the university",
          "Accommodation — the widest range of anything here, and the most movable",
          "Living costs — food, transport, phone, everything else, and city-led",
          "Arrival — the visa fee, the health surcharge, flights, a deposit, a winter coat",
        ],
      },
      {
        heading: "Where the money actually goes",
        paragraphs: [
          "Accommodation is the line worth the most attention. University halls are convenient, usually catered or semi-catered, and priced accordingly; a shared house in the second year is often substantially cheaper and is what most students move to. First-year halls are also where the guarantee matters — some universities guarantee a place to international students who apply by a deadline, and missing that deadline is an expensive administrative error rather than a financial one.",
          "Transport varies more than students expect. A compact city where everything is walkable removes a monthly cost entirely. A campus fifteen minutes out of town by bus does not.",
        ],
      },
      {
        heading: "Build the number from your own shortlist",
        paragraphs: [
          "Averages are useless here. A laboratory-based degree in the south of England and a classroom-based degree in the north are not the same product at a discount; they are different costs with different living contexts around them. The only figure worth planning against is one built from the specific universities you are actually considering.",
          "That is what the cost calculator is for. Put your own city, your own accommodation choice and your own tuition into it, and check the result against what each university publishes before you commit to anything.",
        ],
      },
      {
        heading: "What to do with the number once you have it",
        paragraphs: [
          "Two things. First, check it against scholarships — partial awards and fee reductions are far more common than full scholarships, are often assessed automatically at the point of offer, and a surprising number go unclaimed because nobody applied. Second, check it against the visa financial requirement, which is a separate test with its own rules about how long the money has to have been in the account.",
        ],
      },
    ],
    source: {
      label: "UKCISA — international student fees and finance",
      href: "https://www.ukcisa.org.uk",
    },
    related: [
      { label: "Cost calculator", href: "/money/calculator" },
      { label: "Scholarships", href: "/money/scholarships" },
      { label: "Tuition and living costs", href: "/money" },
    ],
  },
  {
    id: "course-before-university",
    title: "Choose the course before you choose the university",
    excerpt:
      "The order most students use is backwards, and it is the single most expensive habit in UK applications.",
    published: "2026-07-14",
    readingMinutes: 6,
    tag: "Choosing",
    standfirst:
      "Almost everyone starts with a list of universities and works down to a course. It feels like the sensible order — the university is the famous part — and it produces a shortlist assembled around reputation rather than around what you will spend three years doing.",
    sections: [
      {
        heading: "A UK degree is narrow on purpose",
        paragraphs: [
          "This is the part that surprises students from systems with a broad first year. A UK bachelor's degree specialises from week one. There is no general education requirement to hide behind and very little room to switch subject after the first year without losing time. Whatever you pick, you are doing it — most days, for three years.",
          "Which means the course content is not a detail to be settled after the university. It is the decision, and the university is the setting you make it in.",
        ],
      },
      {
        heading: "Two courses with the same name are not the same course",
        paragraphs: [
          "Computer science at one university can be theoretical, mathematics-heavy and assessed by examination; at another it can be project-led, built around industry-designed modules and assessed by portfolio. Both are computer science. One of them suits you considerably better than the other, and the only way to find out which is to read the module list rather than the course title.",
          "Look for: what you study in each year, how much is compulsory versus optional, how it is assessed, and whether a placement year is available and how it is arranged.",
        ],
        points: [
          "The year-by-year module list, not the summary paragraph",
          "The balance of examination, coursework and project work",
          "Whether the placement year is offered, and who finds the placement",
          "What graduates of that specific course go on to do",
        ],
      },
      {
        heading: "Work backwards from the career, not forwards from the grades",
        paragraphs: [
          "If you do not yet know the subject, the most productive move is not to browse course lists — it is to look at where you want to end up. Careers list the degree subjects that lead to them, and most of them lead from more than one. Starting there usually collapses a list of forty possible courses into three or four that are genuinely worth reading properly.",
        ],
      },
      {
        heading: "Then, and only then, look at universities",
        paragraphs: [
          "Once you have two or three courses, the university question becomes answerable: which of the places teaching this course fits the cost, the city, the entry requirements and the support you need? That is a comparison with real criteria in it. Reputation, at that point, is one input among several rather than the whole basis of the shortlist.",
        ],
      },
    ],
    related: [
      { label: "Take the career quiz", href: "/careers/quiz" },
      { label: "Explore courses", href: "/courses" },
    ],
  },
  {
    id: "personal-statement-without-the-myths",
    title: "The personal statement, without the myths",
    excerpt:
      "It is not a life story, it is not a list of adjectives, and nobody is counting your extracurriculars. What it is, and how to draft one.",
    published: "2026-06-30",
    readingMinutes: 8,
    tag: "Applying",
    standfirst:
      "The personal statement is the only part of a UCAS application you fully control, which is exactly why so much folklore has grown around it. Most of that folklore makes statements worse.",
    sections: [
      {
        heading: "What an admissions tutor is actually reading for",
        paragraphs: [
          "One question, mostly: is this person going to cope with, and enjoy, three years of this subject? Everything useful in a statement is evidence for that. Everything else is filler competing for the same limited space.",
          "That reframing kills several myths at once. A dramatic opening line is not evidence. A list of positions held is not evidence. A paragraph explaining that you have been passionate about the subject since childhood is not evidence, because every applicant writes it and none of them can be checked.",
        ],
      },
      {
        heading: "Evidence looks like specifics",
        paragraphs: [
          "The reliable pattern is: something you did, what it made you think, and what you did next because of it. A book you read and the specific argument you disagreed with. A project that broke and what you changed. A module you found hard and how you got through it. These are unfakeable and they are interesting, which are the same property viewed from two sides.",
          "A useful test: could another applicant copy your sentence into their own statement without changing anything? If yes, it is not evidence about you.",
        ],
      },
      {
        heading: "Structure, roughly",
        paragraphs: [
          "Most of the statement should be about the subject and your engagement with it. A smaller part can cover relevant experience — work, volunteering, anything where the relevance is to the course rather than to your character in general. A short close on what you want to do next is enough; you do not need a conclusion that restates the whole thing.",
        ],
        points: [
          "Why this subject — with evidence, not adjectives",
          "What you have done about it — reading, projects, work, competitions",
          "What that taught you — the reflection is the part being assessed",
          "Relevant experience — relevant to the course, not to your personality",
          "Where you are heading — briefly",
        ],
      },
      {
        heading: "Drafting",
        paragraphs: [
          "The first draft is never the one you send, and it is not supposed to be. Write it long and badly, then cut. The cutting is where the statement is actually made: everything generic goes, everything specific stays, and what remains is usually both shorter and considerably stronger.",
          "One statement goes to every course you apply to, so it has to work for all of them. If your choices are too different for one statement to serve them honestly, that is useful information about your shortlist rather than a writing problem.",
        ],
      },
    ],
    source: { label: "ucas.com", href: "https://www.ucas.com" },
    related: [
      { label: "How to apply", href: "/apply" },
      { label: "Entry requirements", href: "/apply/entry-requirements" },
      { label: "Interview preparation", href: "/apply/interviews" },
    ],
  },
  {
    id: "foundation-top-up-or-straight-in",
    title: "Foundation year, top-up, or straight in?",
    excerpt:
      "Three routes into the same degree, with different lengths, costs and entry requirements. Which one is yours depends on what you already hold.",
    published: "2026-06-16",
    readingMinutes: 6,
    tag: "Choosing",
    standfirst:
      "Students often assume there is one way into a UK bachelor's degree and that missing the grades for it ends the conversation. There are three common routes, and which is right for you is mostly a question of what qualification you already hold.",
    sections: [
      {
        heading: "Straight in",
        paragraphs: [
          "Three years, four with a placement, entered directly on your school-leaving qualification. This is the default route and the one every published entry requirement describes. If your grades sit inside the typical range for the course, this is your route and there is nothing to think about.",
        ],
      },
      {
        heading: "Foundation year",
        paragraphs: [
          "A preparatory year attached to the front of the degree, designed for students whose qualifications do not yet meet the direct-entry requirement, or whose subject background does not match. Four years in total instead of three. It costs an additional year of tuition and living costs, which is the real trade-off and is worth calculating rather than hand-waving.",
          "It is not a consolation prize. For a student changing subject direction, or coming from a school system that does not map cleanly onto A-levels, a foundation year is frequently the sensible route rather than the fallback.",
        ],
      },
      {
        heading: "Top-up",
        paragraphs: [
          "The final year of a bachelor's degree, for students who already hold an HND, HNC or a two-year diploma in a related subject. One year, and you graduate with the full degree. It is the least well known of the three and the most valuable to the students it applies to — a diploma already completed at home can be worth two of the three years.",
          "The catch is subject alignment: a top-up expects you to arrive with the first two years' content already covered, so the diploma has to be close to the degree.",
        ],
      },
      {
        heading: "How to work out which applies to you",
        paragraphs: [
          "Start from the qualification in your hand rather than from the degree you want. School-leaving qualification, grades inside the range: straight in. School-leaving qualification, grades below the range or the wrong subjects: foundation. A completed HND, HNC or two-year diploma in the subject: top-up. The eligibility check will put your grades against what each university typically asks for, which is the fastest way to find out which of the three conversations you are actually having.",
        ],
      },
    ],
    related: [
      { label: "Eligibility calculator", href: "/resources/eligibility" },
      { label: "Explore courses", href: "/courses" },
      { label: "Entry requirements", href: "/apply/entry-requirements" },
    ],
  },
  {
    id: "student-visa-financial-requirement",
    title: "What the financial requirement really asks for",
    excerpt:
      "Not just how much, but whose account it is in, how long it has been there, and what the bank statement has to show.",
    published: "2026-05-29",
    readingMinutes: 6,
    tag: "Visa",
    standfirst:
      "The financial requirement is the part of a student visa application that most often goes wrong, and almost never because the family does not have the money. It goes wrong on the conditions attached to the money.",
    sections: [
      {
        heading: "It is three questions, not one",
        paragraphs: [
          "How much, held by whom, and for how long. Applicants prepare for the first and are caught by the second and third. The amount is set by the Home Office and depends on your course and where you will study; the holding conditions are set out in the same guidance and are just as binding.",
        ],
        points: [
          "The amount — course fees for the year plus living costs for a set number of months",
          "The holder — you, or a parent or legal guardian who provides evidence of the relationship",
          "The period — a continuous window ending shortly before you apply",
          "The evidence — statements or a letter that show the balance across that whole window",
        ],
      },
      {
        heading: "The consecutive-days rule is the one that catches people",
        paragraphs: [
          "The money must have been held for a continuous period, and the balance must not have dropped below the required amount at any point in it. A transfer in the week before applying does not satisfy this, however large. Neither does an account that dipped below the threshold on one day in the middle of the window.",
          "The practical consequence: the money needs to be in the right account, untouched, well before you intend to apply. Plan the timing backwards from your application date rather than assembling funds when the CAS arrives.",
        ],
      },
      {
        heading: "Where students lose time",
        paragraphs: [
          "Documents in the wrong name. Statements that do not show the account holder, the account number, the currency and the full date range. Fixed deposits that cannot be accessed. A sponsor relationship that is real but undocumented. Each of these is fixable, and each of them costs weeks if it is discovered at submission rather than at preparation.",
        ],
      },
      {
        heading: "Check it against the source",
        paragraphs: [
          "The amounts, the qualifying period and the accepted document formats are all set by the Home Office and change. Nothing on this page — or any advice site — is a substitute for the current guidance on gov.uk. Read it, and if a document is borderline, get it checked before you submit rather than after.",
        ],
      },
    ],
    source: {
      label: "gov.uk — Student visa",
      href: "https://www.gov.uk/student-visa",
    },
    related: [
      { label: "Student visa guide", href: "/apply/entry-requirements#visa-journey" },
      { label: "Cost calculator", href: "/money/calculator" },
      { label: "Apply through Ignition", href: "/apply#ignition-what" },
    ],
  },
  {
    id: "placement-years-what-they-change",
    title: "Placement years: what they change, and what they cost",
    excerpt:
      "A year in industry adds a year to your degree. What you get for it, and the questions to ask before you assume it is included.",
    published: "2026-05-12",
    readingMinutes: 5,
    tag: "Choosing",
    standfirst:
      "A placement year — sometimes called a sandwich year or an industry year — sits between the second and final year of a bachelor's degree and is spent working. It is one of the more genuinely distinctive features of UK undergraduate study, and it is frequently misunderstood as automatic.",
    sections: [
      {
        heading: "What it changes",
        paragraphs: [
          "You graduate with a year of relevant, full-time, paid experience and a degree, rather than a degree. For competitive graduate routes that is a material difference, and for students who are unsure whether they want the career at all, it is the cheapest possible way to find out before committing to it.",
          "It also changes how the final year feels. Students come back from a placement with a clearer sense of what the subject is for, and it tends to show in their final-year project.",
        ],
      },
      {
        heading: "What it costs",
        paragraphs: [
          "A fourth year of living costs, and a fourth year of tuition — usually at a substantially reduced rate for the placement year, but not free. Against that, the placement is normally paid. Whether the year is net positive financially depends on the salary and the city, and it is worth doing the arithmetic rather than assuming either way.",
        ],
      },
      {
        heading: "The questions to ask before you count on it",
        paragraphs: [
          "This is where the misunderstanding lives. On many courses the placement is available rather than guaranteed, and finding the placement is partly or wholly your job. A university with a dedicated placement team, employer relationships and a track record is offering something quite different from one that simply permits a year out.",
        ],
        points: [
          "Is the placement year offered on this specific course, or only on some?",
          "Who finds the placement — the university, or you with support?",
          "What proportion of students on this course actually secure one?",
          "What happens if you do not find one — do you transfer back to the three-year degree?",
          "What is the tuition fee for the placement year itself?",
        ],
      },
      {
        heading: "Visa implications",
        paragraphs: [
          "A placement that forms an assessed part of your course is normally permitted on a student visa, within limits set by the Home Office on how much of the course can be spent working. This is a rule to confirm rather than assume — check the current guidance and confirm with the university that the placement is a formal part of the programme.",
        ],
      },
    ],
    source: {
      label: "gov.uk — Student visa: work",
      href: "https://www.gov.uk/student-visa/work",
    },
    related: [
      { label: "Courses with a placement year", href: "/courses" },
      { label: "Explore universities", href: "/universities" },
      { label: "Student visa guide", href: "/apply/entry-requirements#visa-journey" },
    ],
  },
];

export function getPost(id: string) {
  return posts.find((post) => post.id === id) ?? null;
}

/** Newest first, which is the only order an index should use. */
export const postsByDate = [...posts].sort((a, b) =>
  b.published.localeCompare(a.published),
);

export function formatPostDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
