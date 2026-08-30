import type { AccordionItem } from "@/components/ui/Accordion";

/**
 * The Study in the UK guide is the site's longest explanatory page, so its
 * content lives here rather than in the page component. Icons are named
 * rather than imported: data files stay free of React, and the component
 * that renders each block owns the mapping — the same split `data/home` uses.
 */

export type WhyUkReason = {
  id: string;
  icon: "clock" | "target" | "compass" | "shield";
  title: string;
  /** The one-line version, for the navy panel where room is tight. */
  summary: string;
  body: string;
};

export const whyUk: WhyUkReason[] = [
  {
    id: "shorter",
    icon: "clock",
    title: "Degrees are shorter",
    summary: "Three years for most bachelors, one for a taught masters.",
    body: "Most UK undergraduate degrees take three years rather than four, and taught masters degrees usually take one. That is a year less tuition and a year less living cost than many systems, which changes the total figure considerably.",
  },
  {
    id: "specialise",
    icon: "target",
    title: "You specialise immediately",
    summary: "You apply to a subject and study it from the first week.",
    body: "You apply to a subject, not to a university generally, and you study it from the first week. There is far less general education outside your discipline than in some systems — an advantage if you know what you want, a constraint if you do not.",
  },
  {
    id: "independent",
    icon: "compass",
    title: "Independent study is the method",
    summary: "Contact hours are low by design; the reading is yours to do.",
    body: "Contact hours are low by design. Teaching sets direction and assessment tests understanding, but the reading, practice and thinking happen on your own time. This suits self-directed students and catches out those expecting to be led.",
  },
  {
    id: "quality",
    icon: "shield",
    title: "Teaching quality is externally reviewed",
    summary: "Universities are regulated and independently assessed.",
    body: "UK higher education is regulated, and universities are independently assessed on teaching quality and student outcomes. Professional degrees are additionally accredited by the bodies that govern each profession.",
  },
];

export type DegreeStructure = {
  id: string;
  icon: "cap" | "book" | "columns" | "certificate";
  /** Tint for the icon plate. Kept restrained — three blues and one orange. */
  tone: "navy" | "blue" | "sky" | "orange";
  title: string;
  duration: string;
  qualification: string;
  /** Who the shape actually suits, which is the question behind the question. */
  bestFor: string;
  /**
   * One sentence, and it must not restate `duration` or `qualification`.
   *
   * These were two sentences each and the cards ran long. Most of what was cut
   * was already sitting in the rows above it — "three years in England, Wales
   * and Northern Ireland" under a Length row reading "3 years — 4 in
   * Scotland". What survives is the part the rows cannot say.
   */
  body: string;
  /** `object-position` for the card photograph; the sources crop differently. */
  imagePosition: string;
  cta: { label: string; href: string };
};

export const degreeStructures: DegreeStructure[] = [
  {
    id: "undergraduate",
    icon: "cap",
    tone: "navy",
    title: "Undergraduate degree",
    duration: "3 years — 4 in Scotland",
    qualification: "BA, BSc, BEng or similar",
    bestFor: "School leavers entering a subject directly",
    body: "Scotland's extra year is a broader first year rather than more of the subject. A placement or study-abroad year adds one more.",
    imagePosition: "50% 30%",
    cta: { label: "Browse undergraduate courses", href: "/courses" },
  },
  {
    id: "foundation",
    icon: "book",
    tone: "blue",
    title: "Foundation year",
    duration: "1 year, then the degree",
    qualification: "Progression to year one",
    bestFor: "Qualifications that do not yet meet direct entry",
    body: "A preparatory year bolted to the front of a degree — often the route in when an international qualification does not map onto UK entry requirements.",
    imagePosition: "50% 45%",
    cta: { label: "Check entry requirements", href: "/apply/entry-requirements" },
  },
  {
    id: "integrated",
    icon: "columns",
    tone: "sky",
    title: "Integrated masters",
    duration: "4 years",
    qualification: "MEng, MSci or similar",
    bestFor: "Engineering and science students certain of the field",
    body: "Undergraduate and masters study in one application, and normally cheaper than taking the two degrees separately.",
    imagePosition: "50% 8%",
    cta: { label: "See engineering courses", href: "/courses" },
  },
  {
    id: "postgraduate",
    icon: "certificate",
    tone: "orange",
    title: "Postgraduate taught",
    duration: "1 year full time",
    qualification: "MA, MSc or MBA",
    bestFor: "Graduates specialising or changing direction",
    body: "Intensive from the first week, with a dissertation written over the summer. Two years part time at many universities.",
    imagePosition: "50% 40%",
    cta: { label: "Browse masters courses", href: "/courses" },
  },
];

/**
 * The academic year as a rail rather than a list. `tone` marks what kind of
 * period it is — teaching, assessment or break — so the timeline can be read
 * at a glance before any of the labels are.
 */
export type YearStop = {
  months: string;
  label: string;
  detail: string;
  tone: "teaching" | "exams" | "break";
};

export const academicTimeline: YearStop[] = [
  {
    months: "Sep / Oct",
    label: "Main intake",
    detail: "Welcome week, registration and the first teaching block.",
    tone: "teaching",
  },
  {
    months: "Dec",
    label: "Christmas break",
    detail: "Roughly three to four weeks, usually used for revision.",
    tone: "break",
  },
  {
    months: "Jan",
    label: "Exams",
    detail: "First assessment period, plus the January intake at some universities.",
    tone: "exams",
  },
  {
    months: "Feb – Mar",
    label: "Teaching & projects",
    detail: "Second teaching block, with coursework and group projects running.",
    tone: "teaching",
  },
  {
    months: "Apr / May",
    label: "Exams",
    detail: "Main assessment period, after a short Easter break for revision.",
    tone: "exams",
  },
  {
    months: "Jun – Aug",
    label: "Summer break",
    detail: "Three to four months. Masters students write their dissertation here.",
    tone: "break",
  },
];

/**
 * Approximate shape of a typical year. Universities differ, so these are
 * ranges and are labelled as such wherever they are shown.
 */
export const yearBreakdown = [
  { label: "Teaching", weeks: "30–32 weeks", share: 60, tone: "teaching" as const },
  { label: "Exams", weeks: "6–8 weeks", share: 14, tone: "exams" as const },
  { label: "Breaks", weeks: "12–16 weeks", share: 26, tone: "break" as const },
];

export const academicYear = [
  {
    title: "Main intake",
    body: "September or October, and the intake almost every course runs. Applications for it are made through UCAS the previous autumn.",
  },
  {
    title: "January intake",
    body: "Offered by some universities on some courses, mainly business and computing. Fewer options and smaller cohorts, but a useful route if you miss the main cycle.",
  },
  {
    title: "Terms and semesters",
    body: "Universities use either three terms or two semesters. Either way there are long breaks at Christmas and Easter, and a summer break of roughly three to four months.",
  },
  {
    title: "Assessment periods",
    body: "Examinations cluster in January and in April or May, with coursework deadlines spread through each term. Final-year projects run across most of the year.",
  },
];

/**
 * How a UK course is actually assessed.
 *
 * This is the half of "why the UK" that a prospectus tends to skip. A student
 * choosing between systems can find out how long a degree takes anywhere;
 * what is harder to find out is that they will be marked on a group
 * presentation as well as on an exam, and that the difference is the point.
 */
export type LearningMethod = {
  id: string;
  icon: "case" | "group" | "present" | "think" | "solve" | "practical";
  title: string;
  body: string;
};

export const learningMethods: LearningMethod[] = [
  {
    id: "case-studies",
    icon: "case",
    title: "Case studies",
    body: "A real or realistic situation with incomplete information, which you have to read, interpret and act on. It is how a taught module stops being theory.",
  },
  {
    id: "group-projects",
    icon: "group",
    title: "Group projects",
    body: "Assessed work delivered with other people, often from other countries. Splitting work, disagreeing productively and hitting a shared deadline are part of what is being marked.",
  },
  {
    id: "presentations",
    icon: "present",
    title: "Presentations",
    body: "Explaining your work out loud to people who will question it. Uncomfortable at first, and the single skill graduates most often say transferred straight into work.",
  },
  {
    id: "critical-thinking",
    icon: "think",
    title: "Critical thinking",
    body: "Marks come from questioning a source, weighing evidence and reaching your own conclusion. Restating what a lecturer said, accurately, is not a strong answer here.",
  },
  {
    id: "problem-solving",
    icon: "solve",
    title: "Problem solving",
    body: "Working through problems that have no memorised answer — which is why past papers get you further in some subjects than in others.",
  },
  {
    id: "practical",
    icon: "practical",
    title: "Practical assessment",
    body: "Laboratory work, studio work, clinical placements, code, a portfolio. Demonstrating that you can do the thing, not only describe it.",
  },
];

export const learningIntro =
  "A UK degree is built to take you past the classroom. Rather than resting everything on traditional exams, most courses assess in several different ways across the year — which is why the experience is less about how much you can recall and more about how you think, work with other people and apply what you know.";

export const learningOutro =
  "The result is a degree that reports not only what you know, but how you handle a problem you have not seen before. That is also what an employer is reading for when they look at a UK transcript.";

/**
 * The shape of a week. Deliberately non-numeric.
 *
 * An earlier draft said students are on campus "two to three days a week".
 * That is true of some courses and badly wrong for others — a laboratory
 * science or a clinical course can run close to a full week, while a
 * humanities degree may timetable under ten hours. Publishing one figure as
 * a UK-wide rule would mislead exactly the students who most need to plan
 * around it, so this describes the pattern and sends them to the course page
 * for the number.
 */
export const learningWeek =
  "Contact hours vary enormously between subjects and between universities: a laboratory or clinical course can fill most of the week, while an essay-based degree may timetable under ten hours and expect the rest as independent reading. Whatever the split, a UK week is a mix of taught sessions, independent study, project work and — on many courses — placements or practical work outside the university. The individual course page is the only reliable place to find your own timetable, so check it before you assume the shape of your week.";

/**
 * The sticky "on this page" rail.
 *
 * Nine entries is the ceiling for this bar at 1280–1440px, which is why not
 * every section on the page has one: student voices sits next to NSS and is
 * reached on the way past it. The bar scrolls horizontally below that width
 * and centres whichever entry is current, so the list degrades rather than
 * truncates.
 */
export const studyUkSections = [
  { id: "outcomes", label: "Outcomes", icon: "briefcase" as const },
  { id: "why", label: "Why the UK", icon: "sparkle" as const },
  { id: "learning", label: "How you learn", icon: "brain" as const },
  { id: "structures", label: "Degrees", icon: "cap" as const },
  { id: "year", label: "Academic year", icon: "calendar" as const },
  { id: "work", label: "Work & visas", icon: "briefcase2" as const },
  { id: "nss", label: "NSS", icon: "chart" as const },
  { id: "journey", label: "The journey", icon: "route" as const },
  { id: "faqs", label: "Questions", icon: "help" as const },
];

export const studyUkFaqs: AccordionItem[] = [
  {
    question: "Is a three-year UK degree worth the same as a four-year degree elsewhere?",
    answer:
      "UK bachelors degrees are widely recognised internationally, including for postgraduate admission. The length difference reflects immediate specialisation rather than less study of the subject — a UK student studies their discipline for all three years, with little general education alongside it. Where a specific country or professional body requires four years, check their recognition rules directly.",
  },
  {
    question: "Can I change subject after I start?",
    answer:
      "Sometimes, but it is much harder than in systems built around choosing a major later. Changing within a faculty in the first weeks is often possible; changing to an unrelated subject usually means restarting. This is why the choice of course matters more in the UK than in many other systems, and why it is worth starting from a career direction.",
  },
  {
    question: "What is the difference between a university and a college?",
    answer:
      "Universities award their own degrees. Colleges may teach degree courses validated by a university, and also teach further education below degree level. For a Student visa, what matters is that the institution is a licensed student sponsor — confirm this before applying.",
  },
  {
    question: "Do I need to speak perfect English?",
    answer:
      "No, but you need to meet the course's language requirement, and you need enough to follow fast lectures and contribute in seminars. Universities run in-sessional English support throughout the year, and pre-sessional courses before term for students who narrowly miss the requirement.",
  },
  {
    question: "Can I stay and work after graduating?",
    answer:
      "There are routes that allow graduates of UK universities to stay and work for a period after finishing, but eligibility and duration are set by immigration rules and have changed several times in recent years. Check the current position on gov.uk rather than relying on what applied to a previous cohort.",
  },
];
