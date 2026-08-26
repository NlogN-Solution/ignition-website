import type { AccordionItem } from "@/components/ui/Accordion";
import type { Subject } from "@/data/courses/types";

/**
 * The practice question bank. Questions are grouped so any course resolves to
 * a set via its subject, with the general bank always included.
 *
 * `PracticeQuestion` deliberately carries `focus` — what the interviewer is
 * actually assessing. The practice tool shows it after an answer is written,
 * and it is the field an automated feedback model would be given as the
 * grading rubric when that is added.
 */
export type PracticeQuestion = {
  id: string;
  question: string;
  focus: string;
};

export const generalQuestions: PracticeQuestion[] = [
  {
    id: "why-subject",
    question: "Why do you want to study this subject?",
    focus:
      "Genuine interest in the discipline rather than the career it leads to. Name something specific that pulled you in.",
  },
  {
    id: "recent-reading",
    question: "Tell me about something you have read recently that relates to this subject.",
    focus:
      "Evidence of curiosity beyond the syllabus, and the ability to say what you took from it rather than just summarising it.",
  },
  {
    id: "statement",
    question: "You mentioned something in your personal statement — can you tell me more about it?",
    focus:
      "That you wrote your own statement and can discuss anything in it in more depth than you wrote.",
  },
  {
    id: "strength-weakness",
    question: "What part of this subject do you find hardest?",
    focus:
      "Self-awareness and honesty. A candidate who finds nothing hard has usually not gone deep enough.",
  },
  {
    id: "why-here",
    question: "Why this course in particular?",
    focus:
      "That you have read the course structure and can point to something in it, rather than describing the university generally.",
  },
  {
    id: "five-years",
    question: "What do you hope to do after the degree?",
    focus:
      "A considered direction. It does not need to be fixed, but it should not be blank either.",
  },
];

export const subjectQuestions: Partial<Record<Subject, PracticeQuestion[]>> = {
  Computing: [
    { id: "c1", question: "Describe a problem you solved with code. What made it difficult?", focus: "How you decompose a problem, not which language you used." },
    { id: "c2", question: "How would you explain what an algorithm is to someone who has never programmed?", focus: "Clear explanation of a technical idea to a non-technical listener." },
    { id: "c3", question: "Should software that makes decisions about people be regulated?", focus: "Reasoned argument on a question with no settled answer." },
  ],
  Engineering: [
    { id: "e1", question: "Pick an everyday object and tell me how you would improve its design.", focus: "Practical reasoning about constraints, materials and trade-offs." },
    { id: "e2", question: "Estimate how much water a city of one million people uses in a day.", focus: "Structured estimation from assumptions you state out loud." },
    { id: "e3", question: "What engineering project, past or present, do you find most impressive, and why?", focus: "Genuine engagement with the field beyond the curriculum." },
  ],
  Health: [
    { id: "h1", question: "Why do you want to work with patients rather than in laboratory research?", focus: "Understanding of what the day-to-day role actually involves." },
    { id: "h2", question: "Tell me about a time you handled a difficult situation with someone.", focus: "Communication, empathy and reflection rather than a heroic story." },
    { id: "h3", question: "What do you think is the biggest pressure facing healthcare today?", focus: "Awareness of the system you would be entering, and balanced reasoning." },
  ],
  Law: [
    { id: "l1", question: "Should a law you disagree with still be obeyed?", focus: "Structured argument, acknowledging the strongest counter-position." },
    { id: "l2", question: "Tell me about a legal story in the news that interested you.", focus: "Engagement with law as it operates, not only as it is taught." },
    { id: "l3", question: "What is the difference between something being illegal and being wrong?", focus: "Precision of thought and willingness to sit with a hard distinction." },
  ],
  "Arts & Design": [
    { id: "a1", question: "Talk me through a piece in your portfolio you are least satisfied with.", focus: "Critical self-assessment and understanding of your own process." },
    { id: "a2", question: "Whose work has influenced you, and how does it show?", focus: "Awareness of context and an ability to locate your work within it." },
    { id: "a3", question: "How do you respond when a brief is criticised in review?", focus: "Openness to critique, which is how studio teaching works." },
  ],
  Business: [
    { id: "b1", question: "Name a company you think is well run and explain why.", focus: "Analysis rather than brand affinity — look at the model, not the marketing." },
    { id: "b2", question: "How would you decide whether to enter a new market?", focus: "Structured thinking under uncertainty." },
    { id: "b3", question: "What responsibility does a business have beyond making a profit?", focus: "Balanced reasoning on a genuinely contested question." },
  ],
  Sciences: [
    { id: "s1", question: "Describe an experiment you have carried out and what could have gone wrong.", focus: "Understanding of method, error and controls." },
    { id: "s2", question: "How would you test a claim you saw reported in the news?", focus: "Scientific scepticism and practical experimental design." },
    { id: "s3", question: "What scientific development in the past decade interests you most?", focus: "Curiosity beyond the syllabus, explained clearly." },
  ],
  "Social Sciences": [
    { id: "ss1", question: "How would you study whether a policy actually worked?", focus: "Research design, and awareness of what makes causal claims hard." },
    { id: "ss2", question: "Why might two people interpret the same evidence differently?", focus: "Understanding of bias, framing and interpretation." },
    { id: "ss3", question: "What idea from this subject has changed how you see something?", focus: "Genuine intellectual engagement rather than recall." },
  ],
  Education: [
    { id: "ed1", question: "What makes a good teacher, in your experience?", focus: "Reflection on learning from the learner's side, with specifics." },
    { id: "ed2", question: "How would you support a student who has fallen behind?", focus: "Practical, empathetic thinking rather than idealism." },
    { id: "ed3", question: "Should every child study the same curriculum?", focus: "Reasoned position on a contested question in education policy." },
  ],
  Humanities: [
    { id: "hu1", question: "Take a text you know well — what is it actually about?", focus: "Close reading and the ability to argue for an interpretation." },
    { id: "hu2", question: "Can a badly written book still be important?", focus: "Willingness to separate craft from significance and defend the distinction." },
    { id: "hu3", question: "What did you last change your mind about, and why?", focus: "Intellectual flexibility — central to seminar-based study." },
  ],
};

export const interviewGuidance = [
  {
    title: "Why universities interview",
    body: "An interview tests things an application cannot: whether you can think aloud, respond to a challenge, and hold a conversation about the subject. Most courses do not interview at all — those that do are usually competitive, vocational, or portfolio-based.",
  },
  {
    title: "They are not trying to catch you out",
    body: "Interviewers are largely assessing whether you would be good to teach. Being stuck is normal; saying nothing is not. Talk through your reasoning and say when you are unsure.",
  },
  {
    title: "Know your personal statement",
    body: "Anything you wrote is fair material. If you claimed to have read something, expect to be asked what you made of it.",
  },
  {
    title: "Preparing for an online interview",
    body: "Test your camera, microphone and connection beforehand. Sit somewhere quiet with light in front of you rather than behind. Have water and a copy of your statement nearby, and allow for a delay before you answer.",
  },
  {
    title: "Group interviews and tasks",
    body: "Used mostly in healthcare and business. They assess how you work with others, so contributing thoughtfully matters more than dominating or staying silent.",
  },
  {
    title: "Portfolio interviews",
    body: "For art, design and architecture. Be ready to explain your process, not just show the outcome — including work that did not go well and what you learned.",
  },
  {
    title: "Questions to ask them",
    body: "Have two ready. Ask about how the course is taught, how students are supported, or what previous graduates went on to do. Avoid anything answered on the first page of the website.",
  },
];

export const interviewFaqs: AccordionItem[] = [
  {
    question: "How do I know if my course interviews?",
    answer:
      "The course page usually says, and you will normally be told after you apply rather than before. Medicine, dentistry, nursing, teaching, and art and design courses interview most often, as do Oxford and Cambridge across almost all subjects.",
  },
  {
    question: "What should I wear?",
    answer:
      "Smart but comfortable. Nobody is assessing your clothes, but feeling underdressed is a distraction you do not need. For online interviews the same applies from the waist up, and dress fully anyway in case you need to stand.",
  },
  {
    question: "What if I do not know the answer?",
    answer:
      "Say so, then think aloud about how you would approach it. Interviewers frequently ask questions with no expected answer precisely to see how you reason when you are out of your depth.",
  },
  {
    question: "Can I ask for a question to be repeated?",
    answer:
      "Yes, always. Asking for clarification is treated as a good sign, not a weakness — it is what you would do in a tutorial.",
  },
];
