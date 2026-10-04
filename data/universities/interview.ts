/**
 * The interview question bank for university and visa-credibility interviews.
 *
 * WHY THIS IS SEPARATE FROM data/guides/interviews.ts. That file is the
 * academic practice bank — subject questions an admissions tutor asks to test
 * whether you can think about the discipline, used by the practice tool where
 * a student writes an answer and gets it assessed. This file answers a
 * different question: what will I be asked about *this university*, and about
 * my reasons for going at all. Those questions have model answers, because
 * the skill being taught is what a good answer contains rather than whether
 * you know the subject. Merging the two would put a rubric where a marking
 * scheme belongs.
 *
 * Nothing here is university-specific data. These are the questions every
 * applicant meets, with guidance on constructing an answer — the sample
 * answers are illustrations of shape, and a student who recites one will
 * interview badly, which the guidance says out loud.
 */

export const questionCategories = [
  "University",
  "Course",
  "Career goals",
  "Studying in the UK",
  "Finances",
  "Credibility",
] as const;

export type QuestionCategory = (typeof questionCategories)[number];

export type InterviewQuestion = {
  id: string;
  category: QuestionCategory;
  question: string;
  /** What the interviewer is actually assessing. */
  looking: string;
  /** How to build an answer. */
  how: string;
  /** An illustration of the shape, not a script. */
  sample: string;
  /** The specific failure mode for this question. */
  avoid: string;
};

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: "why-this-university",
    category: "University",
    question: "Why did you choose this university?",
    looking:
      "Evidence you researched this institution specifically, rather than applying to a list someone handed you.",
    how: "Name two or three concrete things — a module, a facility, a placement scheme, a named academic — and connect each to what you want to do. Specific beats enthusiastic.",
    sample:
      "The course runs a compulsory industry placement in the third year, and the department publishes who students were placed with — several were at firms doing the kind of work I want to move into. The design studios are also open outside teaching hours, which matters because most of my portfolio work happens in long sessions rather than short ones.",
    avoid:
      "Anything that would be equally true of forty other universities: good reputation, beautiful campus, friendly people.",
  },
  {
    id: "why-this-course",
    category: "Course",
    question: "Why did you choose this course?",
    looking:
      "That you have read the actual course structure, and that your interest predates the application.",
    how: "Point at named modules or the way the course is assessed, then link it to something you have already done — a project, a job, a book, a problem you could not let go of.",
    sample:
      "I want the second-year data modules in particular. I built a small tool last year to track bus arrival times in my area and got stuck on how to handle missing readings — that is the exact thing the statistics module covers, and I would rather learn it properly than keep guessing.",
    avoid:
      "Describing the career instead of the course. If your answer never mentions what you would study, it is an answer to a different question.",
  },
  {
    id: "why-uk",
    category: "Studying in the UK",
    question: "Why do you want to study in the UK rather than at home or elsewhere?",
    looking:
      "A comparison you have actually made, and awareness of what a UK degree involves.",
    how: "Give a structural reason — the three-year degree, immediate specialisation, the accreditation your profession requires — and be honest that other places were considered.",
    sample:
      "I looked at courses at home and in Australia. The UK degree is three years rather than four and specialises from the first term, which suits me because I already know the field I want. The professional accreditation on this course is also recognised by the body I would need to register with later.",
    avoid:
      "Saying the UK is better. It is a comparison, not a verdict, and interviewers hear the difference.",
  },
  {
    id: "career-goals",
    category: "Career goals",
    question: "What do you want to do after you graduate?",
    looking:
      "A considered direction. It does not need to be fixed, but it should not be blank.",
    how: "Give a realistic first role and the step after it, and connect it back to the course. Saying you may change direction is fine if you say what would make you change.",
    sample:
      "I want to start as a junior developer somewhere with structured mentoring rather than at a very small company, then move toward backend and infrastructure work. If the machine learning modules turn out to suit me better than I expect, that would shift things — but I would still start in a development role.",
    avoid:
      "Naming a job title with no path to it, or answering that you have not thought about it.",
  },
  {
    id: "why-you",
    category: "University",
    question: "Why should we offer you a place?",
    looking:
      "Self-knowledge and evidence, not confidence. They are asking what you bring that the transcript does not show.",
    how: "Pick one strength, give one piece of evidence for it, and say how it applies to studying here. One well-evidenced claim beats four unevidenced ones.",
    sample:
      "I finish things. I ran the coding club at my school for two years, including the year we had almost no members, and rebuilt it from four people to about thirty. On a course assessed largely by long projects, that is the habit that matters most.",
    avoid:
      "A list of adjectives. Hardworking, passionate and dedicated are claims every candidate makes and none can prove.",
  },
  {
    id: "funding",
    category: "Finances",
    question: "How will you fund your studies?",
    looking:
      "That the money is real, understood and documented. In a credibility interview this is the central question, not a side one.",
    how: "State the source, who is providing it, and that you know the total cost including living expenses. Be precise with the figures.",
    sample:
      "My family is funding it. My father runs a construction supply business and the tuition and first-year living costs are held in a fixed deposit that has been in the account for the last three months. I have the bank statements and the relationship documents ready.",
    avoid:
      "Vagueness about who is paying, or knowing the tuition figure but not the living costs.",
  },
  {
    id: "return-plans",
    category: "Credibility",
    question: "What are your plans after your visa ends?",
    looking:
      "That you are a genuine student, which is the entire purpose of a credibility interview.",
    how: "Answer honestly. The Graduate Route is a legitimate part of the system and saying you intend to use it is not a problem — being evasive is.",
    sample:
      "I intend to apply for the Graduate Route and work in the UK for those two years to get experience in the sector. After that I would like to come back and work in the industry here, where that experience is worth a great deal.",
    avoid:
      "Rehearsed insistence that you will leave immediately. It rarely sounds true, and it is not what is being tested.",
  },
  {
    id: "course-content",
    category: "Course",
    question: "What do you know about the modules on this course?",
    looking:
      "The simplest possible check on whether you read the course page. A surprising number of candidates have not.",
    how: "Name real modules from the year structure and say which you are most and least looking forward to. Naming a hard one honestly reads as genuine.",
    sample:
      "First year covers programming fundamentals, computer systems and discrete mathematics. I am looking forward to systems most. Discrete mathematics I expect to find hardest — my proof technique is the weakest part of my maths.",
    avoid:
      "Describing the subject in general when you were asked about the course in particular.",
  },
  {
    id: "accommodation",
    category: "Credibility",
    question: "Where will you live, and how did you choose it?",
    looking:
      "Practical preparation — a genuine student has looked into arriving, not just into applying.",
    how: "Say what you have arranged or applied for, roughly what it costs, and how you get from there to campus.",
    sample:
      "I have applied for university halls, which are guaranteed for first-year international students who apply before the deadline. They are between £125 and £195 a week depending on the room, and about fifteen minutes' walk from the main building.",
    avoid:
      "Not knowing. It is an easy question to prepare and a conspicuous one to fail.",
  },
  {
    id: "weakness",
    category: "Course",
    question: "Which part of this subject do you find hardest?",
    looking:
      "Honesty and self-awareness. A candidate who finds nothing difficult has usually not gone deep enough to meet the difficulty.",
    how: "Name something real, then say what you are doing about it. The recovery matters more than the weakness.",
    sample:
      "Writing about my own work. I can build something and explain it out loud, but the written evaluation is always the part I leave until last. I have started writing a short note at the end of each project while it is still fresh, which has helped.",
    avoid:
      "A strength wearing a disguise. Being a perfectionist is not an answer to this question.",
  },
];

export function questionsInCategory(category: QuestionCategory | null) {
  if (!category) return interviewQuestions;
  return interviewQuestions.filter((q) => q.category === category);
}
