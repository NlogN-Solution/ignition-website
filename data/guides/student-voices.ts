/**
 * PLACEHOLDER TESTIMONIALS — NOT FOR PUBLICATION.
 *
 * No real student has said any of this. The names are marked as examples in
 * the same way the example universities are, and the component renders an
 * "Example data" badge above the carousel for as long as
 * `studentVoicesAreIllustrative` is true.
 *
 * To publish: replace each entry with a quote you hold written consent for,
 * add `image` pointing at a photograph you have the right to use, and set
 * `studentVoicesAreIllustrative` to false.
 */

export type StudentVoice = {
  id: string;
  quote: string;
  name: string;
  course: string;
  university: string;
  /** Path under /public. Falls back to initials when absent. */
  image?: string;
};

export const studentVoices: StudentVoice[] = [
  {
    id: "one",
    quote:
      "The thing nobody warned me about was how much of the week is yours to plan. Twelve contact hours sounds light until you realise the reading behind them is the actual degree. Once I built a routine around that, everything else got easier.",
    name: "Example student A",
    course: "MSc Data Science",
    university: "Example Metropolitan University",
  },
  {
    id: "two",
    quote:
      "I applied to a subject rather than to a university, which felt like a big commitment at seventeen. It turned out to be the best part — I was doing real engineering in the first term instead of waiting two years to specialise.",
    name: "Example student B",
    course: "MEng Civil Engineering",
    university: "Example Riverside University",
  },
  {
    id: "three",
    quote:
      "The foundation year is the reason I am here. My qualifications did not map onto the direct entry requirements, and that extra year covered the gap and got me used to how assessment works before it counted.",
    name: "Example student C",
    course: "BSc Computer Science",
    university: "Example Coastal University",
  },
];

export const studentVoicesAreIllustrative = true;
