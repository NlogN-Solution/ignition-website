import type { Subject } from "@/data/courses/types";
import { universities } from "@/data/universities";

export const studyLevels = ["Undergraduate", "Postgraduate"] as const;
export type StudyLevel = (typeof studyLevels)[number];

export const nationalityGroups = [
  "All international students",
  "Commonwealth countries",
  "South Asia",
  "Africa",
] as const;
export type NationalityGroup = (typeof nationalityGroups)[number];

export type Scholarship = {
  id: string;
  name: string;
  provider: string;
  kind: "university" | "external";
  levels: StudyLevel[];
  /** `null` means the award is open to any subject. */
  subjects: Subject[] | null;
  universityId?: string;
  /**
   * `null` on externally-run schemes. Ignition does not restate eligibility or
   * deadlines it cannot verify — those come from the provider's own page.
   */
  nationality: NationalityGroup | null;
  amount: string | null;
  deadline: string | null;
  eligibility: string;
  applyVia: string;
  source: { label: string; href: string };
  /** True where figures are placeholders from the fictional universities. */
  demo: boolean;
};

/**
 * Two kinds of entry, held to different standards.
 *
 * University awards come from the example universities, so their amounts,
 * deadlines and eligibility are placeholders and are labelled as such.
 *
 * External schemes are real, well-established UK programmes. Ignition names
 * them and links to the official source, but deliberately states no amount,
 * deadline or eligibility rule for them — those change every cycle and are
 * the provider's to publish, not ours to summarise.
 */
const universityAwards: Scholarship[] = universities.flatMap((university, index) =>
  university.scholarships.map((award, awardIndex) => ({
    id: `${university.id}-${awardIndex}`,
    name: award.name,
    provider: university.name,
    kind: "university" as const,
    levels: ["Undergraduate" as const],
    subjects: null,
    universityId: university.id,
    nationality: (
      [
        "All international students",
        "All international students",
        "Commonwealth countries",
        "South Asia",
      ] as const
    )[(index + awardIndex) % 4],
    amount: award.amount,
    deadline: ["31 May", "30 June", "15 July", "31 July"][(index + awardIndex) % 4],
    eligibility: award.detail,
    applyVia: "Assessed with your course application — no separate form",
    source: {
      label: `${university.name} funding pages`,
      href: `/universities/${university.id}`,
    },
    demo: true,
  })),
);

const externalSchemes: Scholarship[] = [
  {
    id: "chevening",
    name: "Chevening Scholarships",
    provider: "UK Government — Foreign, Commonwealth & Development Office",
    kind: "external",
    levels: ["Postgraduate"],
    subjects: null,
    nationality: null,
    amount: null,
    deadline: null,
    eligibility:
      "The UK government's international awards programme for one-year master's study. Eligible countries, work-experience requirements and selection criteria are set each cycle by the FCDO.",
    applyVia: "Direct application to Chevening, separate from your university application",
    source: { label: "chevening.org", href: "https://www.chevening.org/" },
    demo: false,
  },
  {
    id: "commonwealth",
    name: "Commonwealth Scholarships",
    provider: "Commonwealth Scholarship Commission in the UK",
    kind: "external",
    levels: ["Postgraduate"],
    subjects: null,
    nationality: "Commonwealth countries",
    amount: null,
    deadline: null,
    eligibility:
      "Awards for candidates from eligible Commonwealth countries, with several distinct schemes covering master's and doctoral study. Eligibility and nominating bodies differ by country and scheme.",
    applyVia: "Through a nominating body in your country, or a participating UK university",
    source: { label: "cscuk.fcdo.gov.uk", href: "https://cscuk.fcdo.gov.uk/" },
    demo: false,
  },
  {
    id: "great",
    name: "GREAT Scholarships",
    provider: "British Council and participating UK universities",
    kind: "external",
    levels: ["Postgraduate"],
    subjects: null,
    nationality: null,
    amount: null,
    deadline: null,
    eligibility:
      "A jointly funded programme offering one-year postgraduate awards at participating UK universities. The countries, universities and subjects included are set each year.",
    applyVia: "Direct to the participating university offering the award",
    source: {
      label: "study-uk.britishcouncil.org",
      href: "https://study-uk.britishcouncil.org/scholarships/great-scholarships",
    },
    demo: false,
  },
];

export const scholarships: Scholarship[] = [...universityAwards, ...externalSchemes];

export const scholarshipPolicy =
  "Ignition never lists a scholarship it cannot link to a source. University awards below come from the example universities, so their amounts and deadlines are placeholders. The externally-run schemes are real, and we deliberately state no amount, deadline or eligibility rule for them — those change every cycle and belong to the provider.";
