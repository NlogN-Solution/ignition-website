import type { QuizQuestion } from "@/lib/quiz/types";

/**
 * Eight steps across the five dimensions. Questions are written as situations
 * rather than self-assessments ("what do you do first?" instead of "are you
 * organised?") because students answer those more honestly, and because the
 * same answer can then feed several axes at once.
 *
 * Weights are contributions, not percentages — the scorer normalises each
 * dimension afterwards, so numbers only need to be sensible relative to the
 * other options in the same question.
 */
export const quizQuestions: QuizQuestion[] = [
  {
    id: "problems",
    dimension: "work",
    prompt: "What kind of problems do you enjoy solving?",
    helper: "Pick up to three. There are no wrong answers.",
    select: "multi",
    maxChoices: 3,
    options: [
      {
        id: "logical",
        label: "Puzzles with a right answer",
        description: "Logic, patterns, numbers that have to add up.",
        weights: {
          personality: { analytical: 3, curious: 1 },
          work: { complexProblems: 3, independently: 1 },
          academic: { mathematics: 2, computing: 1 },
        },
      },
      {
        id: "openEnded",
        label: "Open questions with no set answer",
        description: "Where the interesting part is defining the problem.",
        weights: {
          personality: { creative: 3, curious: 2 },
          work: { creativeWork: 2, research: 2 },
          values: { creativity: 1 },
        },
      },
      {
        id: "human",
        label: "Problems between people",
        description: "Conflict, motivation, why someone behaves as they do.",
        weights: {
          personality: { empathetic: 3, social: 2 },
          work: { withPeople: 3, helpingPeople: 2 },
          interests: { psychology: 2 },
        },
      },
      {
        id: "building",
        label: "Things that are broken",
        description: "Fixing, improving and making something actually work.",
        weights: {
          personality: { practical: 3 },
          work: { practicalWork: 3, complexProblems: 1 },
          interests: { engineering: 2 },
        },
      },
      {
        id: "organising",
        label: "Chaos that needs order",
        description: "Plans, systems and moving parts that need coordinating.",
        weights: {
          personality: { organised: 3, leadership: 1 },
          work: { leading: 2 },
          interests: { business: 2 },
        },
      },
      {
        id: "persuading",
        label: "Convincing people of something",
        description: "Arguments, negotiation, making a case that lands.",
        weights: {
          personality: { social: 2, leadership: 2 },
          work: { communication: 3, withPeople: 1 },
          interests: { law: 2, business: 1 },
        },
      },
    ],
  },
  {
    id: "curiosity",
    dimension: "interests",
    prompt: "Which of these would you happily read about on a Sunday?",
    helper: "Pick up to four.",
    select: "multi",
    maxChoices: 4,
    options: [
      {
        id: "technology",
        label: "Technology & software",
        weights: {
          interests: { technology: 3 },
          work: { withTechnology: 2 },
          academic: { computing: 2 },
        },
      },
      {
        id: "engineering",
        label: "How things are built",
        weights: {
          interests: { engineering: 3 },
          personality: { practical: 1 },
          academic: { physics: 2, mathematics: 1 },
        },
      },
      {
        id: "healthcare",
        label: "Medicine & the human body",
        weights: {
          interests: { healthcare: 3 },
          work: { helpingPeople: 2 },
          academic: { biology: 2, chemistry: 1 },
        },
      },
      {
        id: "business",
        label: "Companies & how they grow",
        weights: {
          interests: { business: 3 },
          academic: { business: 2, economics: 1 },
        },
      },
      {
        id: "finance",
        label: "Money & markets",
        weights: {
          interests: { finance: 3 },
          personality: { analytical: 1 },
          academic: { economics: 2, mathematics: 1 },
        },
      },
      {
        id: "design",
        label: "Design & visual craft",
        weights: {
          interests: { design: 3 },
          personality: { creative: 2 },
          academic: { art: 2 },
        },
      },
      {
        id: "media",
        label: "Media, film & storytelling",
        weights: {
          interests: { media: 3 },
          work: { creativeWork: 2, communication: 1 },
          academic: { english: 2 },
        },
      },
      {
        id: "law",
        label: "Law, rights & justice",
        weights: {
          interests: { law: 3 },
          work: { communication: 1 },
          academic: { english: 1 },
        },
      },
      {
        id: "science",
        label: "Science & discovery",
        weights: {
          interests: { science: 3 },
          work: { research: 2 },
          academic: { physics: 1, chemistry: 1, biology: 1 },
        },
      },
      {
        id: "psychology",
        label: "Minds & behaviour",
        weights: {
          interests: { psychology: 3 },
          personality: { empathetic: 1 },
          academic: { psychology: 2 },
        },
      },
      {
        id: "education",
        label: "Teaching & learning",
        weights: {
          interests: { education: 3 },
          work: { helpingPeople: 2, communication: 1 },
        },
      },
      {
        id: "environment",
        label: "Cities, climate & the planet",
        weights: {
          interests: { science: 2, engineering: 1 },
          values: { socialImpact: 2 },
          academic: { geography: 3 },
        },
      },
    ],
  },
  {
    id: "described",
    dimension: "personality",
    prompt: "How would people who know you well describe you?",
    helper: "Pick up to three.",
    select: "multi",
    maxChoices: 3,
    options: [
      {
        id: "analytical",
        label: "The one who thinks it through",
        weights: {
          personality: { analytical: 3, curious: 1 },
          work: { complexProblems: 1 },
        },
      },
      {
        id: "creative",
        label: "The one with the ideas",
        weights: {
          personality: { creative: 3 },
          work: { creativeWork: 2 },
          values: { creativity: 1 },
        },
      },
      {
        id: "organised",
        label: "The one who keeps it all on track",
        weights: {
          personality: { organised: 3 },
          work: { leading: 1 },
          values: { jobSecurity: 1 },
        },
      },
      {
        id: "empathetic",
        label: "The one people talk to",
        weights: {
          personality: { empathetic: 3, social: 1 },
          work: { helpingPeople: 2, withPeople: 1 },
        },
      },
      {
        id: "leader",
        label: "The one who ends up in charge",
        weights: {
          personality: { leadership: 3, social: 1 },
          work: { leading: 3 },
          values: { leadership: 2 },
        },
      },
      {
        id: "practical",
        label: "The one who just gets it done",
        weights: {
          personality: { practical: 3 },
          work: { practicalWork: 2 },
        },
      },
      {
        id: "curious",
        label: "The one asking why",
        weights: {
          personality: { curious: 3 },
          work: { research: 2 },
          values: { innovation: 1 },
        },
      },
      {
        id: "independent",
        label: "The one who does their own thing",
        weights: {
          personality: { independent: 3 },
          work: { independently: 2 },
          values: { flexibility: 1 },
        },
      },
    ],
  },
  {
    id: "workStyle",
    dimension: "work",
    prompt: "Picture your ideal working day. What does it look like?",
    select: "single",
    options: [
      {
        id: "deep",
        label: "Long stretches of focus",
        description: "Headphones on, one hard problem, nobody interrupting.",
        weights: {
          personality: { independent: 3, analytical: 2 },
          work: { independently: 3, complexProblems: 2 },
          values: { flexibility: 1 },
        },
      },
      {
        id: "team",
        label: "A room full of people",
        description: "Ideas bouncing around, building something together.",
        weights: {
          personality: { collaborative: 3, social: 2 },
          work: { withPeople: 3, communication: 1 },
        },
      },
      {
        id: "hands",
        label: "On your feet, hands on",
        description: "Moving between places and things, not a desk all day.",
        weights: {
          personality: { practical: 3 },
          work: { practicalWork: 3 },
        },
      },
      {
        id: "varied",
        label: "No two days the same",
        description: "New people, new problems, constant variety.",
        weights: {
          personality: { curious: 2, social: 1 },
          work: { withPeople: 1, communication: 2 },
          values: { flexibility: 3 },
        },
      },
    ],
  },
  {
    id: "subjects",
    dimension: "academic",
    prompt: "Which subjects do you genuinely enjoy?",
    helper: "Pick up to four — the ones you'd choose, not the ones you're best at.",
    select: "multi",
    maxChoices: 4,
    options: [
      { id: "mathematics", label: "Mathematics", weights: { academic: { mathematics: 3 }, personality: { analytical: 2 } } },
      { id: "computing", label: "Computing", weights: { academic: { computing: 3 }, interests: { technology: 2 }, work: { withTechnology: 1 } } },
      { id: "physics", label: "Physics", weights: { academic: { physics: 3 }, interests: { engineering: 1, science: 1 } } },
      { id: "chemistry", label: "Chemistry", weights: { academic: { chemistry: 3 }, interests: { science: 2 } } },
      { id: "biology", label: "Biology", weights: { academic: { biology: 3 }, interests: { healthcare: 1, science: 1 } } },
      { id: "economics", label: "Economics", weights: { academic: { economics: 3 }, interests: { finance: 1, business: 1 } } },
      { id: "business", label: "Business studies", weights: { academic: { business: 3 }, interests: { business: 2 } } },
      { id: "psychology", label: "Psychology", weights: { academic: { psychology: 3 }, interests: { psychology: 2 } } },
      { id: "art", label: "Art & design", weights: { academic: { art: 3 }, interests: { design: 2 }, personality: { creative: 1 } } },
      { id: "english", label: "English", weights: { academic: { english: 3 }, work: { communication: 2 } } },
      { id: "geography", label: "Geography", weights: { academic: { geography: 3 }, values: { socialImpact: 1 } } },
    ],
  },
  {
    id: "values",
    dimension: "values",
    prompt: "What matters most in the career you end up with?",
    helper: "Pick up to three.",
    select: "multi",
    maxChoices: 3,
    options: [
      { id: "salary", label: "Earning well", weights: { values: { salary: 3 } } },
      { id: "security", label: "Stability and security", weights: { values: { jobSecurity: 3 }, personality: { organised: 1 } } },
      { id: "creativity", label: "Room to be creative", weights: { values: { creativity: 3 }, personality: { creative: 2 }, work: { creativeWork: 1 } } },
      { id: "flexibility", label: "Control over my own time", weights: { values: { flexibility: 3 }, personality: { independent: 1 } } },
      { id: "innovation", label: "Working on something new", weights: { values: { innovation: 3 }, personality: { curious: 2 } } },
      { id: "helping", label: "Helping people directly", weights: { values: { helpingOthers: 3 }, work: { helpingPeople: 2 }, personality: { empathetic: 1 } } },
      { id: "leading", label: "Leading and building teams", weights: { values: { leadership: 3 }, personality: { leadership: 2 }, work: { leading: 2 } } },
      { id: "impact", label: "Changing something that matters", weights: { values: { socialImpact: 3 }, personality: { empathetic: 1 } } },
    ],
  },
  {
    id: "approach",
    dimension: "personality",
    prompt: "You're given a big project and a very loose brief. What do you do first?",
    select: "single",
    options: [
      {
        id: "research",
        label: "Read everything you can find",
        description: "Understand the landscape before committing to anything.",
        weights: {
          personality: { curious: 3, analytical: 2 },
          work: { research: 3 },
        },
      },
      {
        id: "plan",
        label: "Break it into a plan",
        description: "Milestones, owners and dates before anyone starts.",
        weights: {
          personality: { organised: 3, leadership: 1 },
          work: { leading: 2 },
          values: { jobSecurity: 1 },
        },
      },
      {
        id: "prototype",
        label: "Make a rough version immediately",
        description: "You'd rather learn from something real than a document.",
        weights: {
          personality: { practical: 2, creative: 2 },
          work: { practicalWork: 2, creativeWork: 2 },
          values: { innovation: 2 },
        },
      },
      {
        id: "ask",
        label: "Get everyone in a room",
        description: "Find out what people actually need before deciding.",
        weights: {
          personality: { collaborative: 3, social: 2 },
          work: { withPeople: 2, communication: 2 },
        },
      },
    ],
  },
  {
    id: "worthIt",
    dimension: "values",
    prompt: "Ten years from now, what would make the work feel worth it?",
    helper: "Skip this if none of them quite fit.",
    select: "single",
    skippable: true,
    options: [
      {
        id: "expert",
        label: "Being genuinely excellent at something difficult",
        weights: {
          personality: { analytical: 2, independent: 1 },
          work: { complexProblems: 2, research: 1 },
          values: { jobSecurity: 1 },
        },
      },
      {
        id: "built",
        label: "Pointing at something and saying I built that",
        weights: {
          personality: { practical: 2, creative: 2 },
          work: { practicalWork: 2, creativeWork: 1 },
          values: { innovation: 2 },
        },
      },
      {
        id: "people",
        label: "Knowing specific people are better off",
        weights: {
          personality: { empathetic: 3 },
          work: { helpingPeople: 3 },
          values: { helpingOthers: 3, socialImpact: 1 },
        },
      },
      {
        id: "team",
        label: "Having built a team that outlasts you",
        weights: {
          personality: { leadership: 3, collaborative: 1 },
          work: { leading: 3 },
          values: { leadership: 3 },
        },
      },
    ],
  },
];
