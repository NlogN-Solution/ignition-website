import type { University } from "./types";
import { courses } from "@/data/courses";

export type { University, Region } from "./types";
export { regions, rankingPolicy } from "./types";

/**
 * EXAMPLE DATA. These are fictional institutions, deliberately named so they
 * cannot be mistaken for real universities. Fees, living costs, accommodation
 * rates, scholarships and entry requirements are placeholders that exist to
 * demonstrate the interface. Nothing here should be used to make a decision.
 */
export const universities: University[] = [
  {
    id: "example-metropolitan",
    name: "Example Metropolitan University",
    city: "Manchester",
    region: "England — North",
    tagline: "A large city university with strong industry links in computing and design.",
    overview:
      "A post-1992 institution built around applied teaching and employer partnerships, spread across a compact city-centre campus. Strongest in computing, design and business, with a large international community and an emphasis on placements.",
    studentExperience:
      "Everything is walkable and the students' union runs a large society programme. Housing is plentiful in the surrounding neighbourhoods and cheaper than the south of England, though the city centre itself is competitive in September.",
    careers:
      "A dedicated placement team, an employer mentoring scheme and regular recruitment fairs. Many computing and design students take an industry year between the second and final year.",
    tuition: { min: 16500, max: 21000 },
    livingCostMonthly: 1050,
    accommodation: { guaranteed: true, weeklyFrom: 125, weeklyTo: 195, note: "Guaranteed for first-year international students who apply by the stated deadline." },
    entry: { typical: "BBB–BBC at A-level or an equivalent international qualification", english: "IELTS 6.0 overall with no component below 5.5", tariff: 112, ielts: 6.0 },
    scholarships: [
      { name: "International Merit Award", amount: "£3,000", detail: "Automatic for applicants exceeding the standard offer." },
      { name: "Placement Year Bursary", amount: "£1,000", detail: "For students taking an assessed industry placement." },
    ],
    placementYear: true,
    internationalSupport: ["Airport pickup in welcome week", "Dedicated visa and immigration advisers", "Free in-sessional English classes", "International student mentoring"],
    facilities: ["24-hour library", "Design studios and workshops", "High-performance computing lab", "On-campus sports centre"],
    subjects: ["Computing", "Arts & Design", "Business", "Engineering", "Social Sciences", "Humanities"],
    destination: "UK",
    monogram: "EM",
    founded: "1971",
    kind: "Post-1992 university",
    campus: "Single city-centre campus",
    studentPopulation: "24,500",
    internationalStudents: "6,200 from 90 countries",
    studentStaffRatio: "17:1",
    history: [
      "Founded in 1971 as a polytechnic serving the city's manufacturing and textile employers, teaching part-time alongside industry from the start.",
      "Granted university status in 1992 with the rest of the polytechnic sector, and spent the following decade consolidating six scattered sites into the single city-centre campus it occupies now.",
      "Today it is one of the larger applied universities in the north, built around placements, employer-designed curricula and a substantial international intake.",
    ],
    milestones: [
      { year: "1971", label: "Founded as a polytechnic" },
      { year: "1992", label: "Granted university status" },
      { year: "2004", label: "Six sites consolidated into one campus" },
      { year: "2018", label: "Faculty of Computing and Digital opened" },
    ],
    rankings: [
      { title: "Top 10 for graduate employability among modern universities", position: "8th", scope: "UK", category: "Employability", source: "Example University Guide", year: 2025 },
      { title: "Best in the North for student placements", position: "1st", scope: "England — North", category: "Placements", source: "Example Student Survey", year: 2025, note: "Among institutions with more than 1,000 responses." },
      { title: "Overall student satisfaction", position: "Top 25", scope: "UK", category: "Satisfaction", source: "Example National Survey", year: 2024 },
    ],
    awards: [
      { title: "Employer Partnership of the Year", organisation: "Example Education Awards", year: 2024, detail: "For the industry mentoring scheme running across computing and design." },
      { title: "International Student Support Award", organisation: "Example Sector Body", year: 2023 },
    ],
    employability: {
      employedRate: "94%",
      employedSource: "In work or further study 15 months after graduating — Example Graduate Outcomes, 2024",
      medianSalary: "£27,500",
      placementRate: "62% of computing students take an industry year",
      employers: [
        { name: "Example Digital Group", sector: "Technology" },
        { name: "Northern Health Trust", sector: "Healthcare" },
        { name: "Example Retail Systems", sector: "Retail" },
        { name: "Studio Example", sector: "Design" },
        { name: "Example Financial Services", sector: "Finance" },
      ],
      services: [
        "Dedicated placement team by faculty",
        "Employer mentoring across all three years",
        "Two recruitment fairs a year on campus",
        "CV and interview clinics open to alumni for life",
      ],
    },
    interview: {
      common: false,
      format: "Most courses admit on the application alone.",
      interviewingSubjects: ["Health", "Arts & Design"],
      note: "Design applicants are asked for a portfolio review rather than a standard interview.",
    },
  },
  {
    id: "example-riverside",
    name: "Example Riverside University",
    city: "Bristol",
    region: "England — South",
    tagline: "Research-intensive, with medicine, economics and the sciences at its centre.",
    overview:
      "A research-led university with a traditional collegiate feel and a large medical school. Teaching is lecture-and-tutorial based with substantial independent study expected, and entry is competitive across most subjects.",
    studentExperience:
      "A green campus on the edge of the city with a strong sporting and musical culture. Living costs are higher than the north of England, and private housing is typically arranged for the second year onwards.",
    careers:
      "An established careers service with sector-specific advisers, a spring internship programme and strong recruitment presence from finance, consultancy and the NHS.",
    tuition: { min: 22000, max: 38000 },
    livingCostMonthly: 1250,
    accommodation: { guaranteed: true, weeklyFrom: 155, weeklyTo: 240, note: "Guaranteed for all first-year students who firm the university as their choice." },
    entry: { typical: "AAA–ABB at A-level or an equivalent international qualification", english: "IELTS 6.5–7.0 depending on the course", tariff: 128, ielts: 6.5 },
    scholarships: [
      { name: "Global Excellence Scholarship", amount: "£5,000", detail: "Competitive, awarded on academic record and a written statement." },
      { name: "Science Bursary", amount: "£2,000", detail: "For students entering mathematics and the physical sciences." },
    ],
    placementYear: true,
    internationalSupport: ["Pre-arrival orientation online", "Immigration advice team", "Academic English support", "Faith and wellbeing services"],
    facilities: ["Teaching hospital partnership", "Research laboratories", "Language centre", "Boathouse and sports grounds"],
    subjects: ["Health", "Business", "Sciences", "Law", "Computing", "Engineering"],
    destination: "UK",
    monogram: "ER",
    founded: "1876",
    kind: "Research-intensive university",
    campus: "Green campus on the city edge, plus a teaching hospital",
    studentPopulation: "19,800",
    internationalStudents: "4,900 from 120 countries",
    studentStaffRatio: "13:1",
    history: [
      "Established in 1876 as a college of medicine and science, funded by a group of the city's merchants and physicians.",
      "Received its royal charter in 1909 and expanded through the twentieth century into law, economics and the humanities while keeping medicine at its centre.",
      "It remains research-led, with a collegiate structure and a teaching hospital partnership that shapes admission to its health courses.",
    ],
    milestones: [
      { year: "1876", label: "Founded as a college of medicine and science" },
      { year: "1909", label: "Royal charter granted" },
      { year: "1962", label: "Faculty of Economics established" },
      { year: "2011", label: "Teaching hospital partnership formalised" },
    ],
    rankings: [
      { title: "Top 20 UK university", position: "17th", scope: "UK", category: "Overall", source: "Example University Guide", year: 2025 },
      { title: "Top 5 for medicine", position: "4th", scope: "UK", category: "Medicine", source: "Example Subject Tables", year: 2025 },
      { title: "Research quality", position: "Top 15", scope: "UK", category: "Research", source: "Example Research Assessment", year: 2021 },
    ],
    awards: [
      { title: "Queen's Anniversary Prize for Higher Education", organisation: "Example Honours Committee", year: 2022, detail: "For work in infectious disease research." },
    ],
    employability: {
      employedRate: "96%",
      employedSource: "In work or further study 15 months after graduating — Example Graduate Outcomes, 2024",
      medianSalary: "£31,200",
      employers: [
        { name: "National Health Service", sector: "Healthcare" },
        { name: "Example Consulting Partners", sector: "Consultancy" },
        { name: "Example Investment Bank", sector: "Finance" },
        { name: "Example Research Institute", sector: "Research" },
      ],
      services: [
        "Sector-specific careers advisers",
        "Spring internship programme",
        "On-campus recruitment from finance and consultancy",
        "Alumni mentoring network",
      ],
    },
    interview: {
      common: true,
      format: "Panel interview, online or on campus",
      duration: "About 30 minutes",
      interviewingSubjects: ["Health", "Law"],
      note: "Medicine uses a multiple mini-interview format across several short stations.",
    },
  },
  {
    id: "example-northgate",
    name: "Example Northgate University",
    city: "Leeds",
    region: "England — North",
    tagline: "Engineering and architecture, taught through studio and project work.",
    overview:
      "A technical university with a design-and-build culture. Engineering, architecture and mathematics dominate, and most courses are assessed through projects and studio reviews rather than examinations alone.",
    studentExperience:
      "A single campus close to the city centre, with workshops and studios open late. A large proportion of students stay in the city after graduating, and the cost of living is among the more manageable in England.",
    careers:
      "Close relationships with engineering consultancies and construction firms, an accredited placement year and a design-show programme that brings employers on to campus.",
    tuition: { min: 17500, max: 24000 },
    livingCostMonthly: 1000,
    accommodation: { guaranteed: true, weeklyFrom: 120, weeklyTo: 180, note: "Guaranteed for first-year international students applying before the July deadline." },
    entry: { typical: "ABB–BBC at A-level or an equivalent international qualification", english: "IELTS 6.0–6.5 depending on the course", tariff: 112, ielts: 6.0 },
    scholarships: [
      { name: "Engineering Futures Award", amount: "£4,000", detail: "For international students entering accredited engineering programmes." },
      { name: "Design Portfolio Award", amount: "£2,500", detail: "Assessed on portfolio at the point of application." },
    ],
    placementYear: true,
    internationalSupport: ["Welcome week arrival programme", "Visa compliance support", "Peer mentoring by country", "Employability workshops for international students"],
    facilities: ["Structures and materials laboratories", "Architecture studios", "Fabrication workshop", "Student-run makerspace"],
    subjects: ["Engineering", "Arts & Design", "Computing", "Sciences", "Education"],
    destination: "UK",
    monogram: "EN",
    founded: "1904",
    kind: "Technical university",
    campus: "Single campus with workshops and studios",
    studentPopulation: "15,200",
    internationalStudents: "3,400 from 75 countries",
    studentStaffRatio: "15:1",
    history: [
      "Opened in 1904 as a municipal college of technology, training engineers and draughtsmen for the city's engineering works.",
      "Absorbed the regional school of architecture in 1965, creating the studio culture that still defines how the place teaches.",
      "Granted university status in 1992, and now built almost entirely around project and studio assessment rather than examinations.",
    ],
    milestones: [
      { year: "1904", label: "Founded as a college of technology" },
      { year: "1965", label: "School of architecture merged in" },
      { year: "1992", label: "Granted university status" },
    ],
    rankings: [
      { title: "Top 10 for architecture", position: "9th", scope: "UK", category: "Architecture", source: "Example Subject Tables", year: 2025 },
      { title: "Best university for engineering placements", position: "3rd", scope: "England — North", category: "Placements", source: "Example Student Survey", year: 2024 },
    ],
    employability: {
      employedRate: "93%",
      employedSource: "In work or further study 15 months after graduating — Example Graduate Outcomes, 2024",
      placementRate: "71% of engineering students take an accredited placement year",
      employers: [
        { name: "Example Structural Engineers", sector: "Engineering" },
        { name: "Example Construction Group", sector: "Construction" },
        { name: "Studio Northgate", sector: "Architecture" },
      ],
      services: [
        "Accredited placement year built into most degrees",
        "Annual design show attended by regional practices",
        "Chartership guidance for engineering and architecture",
      ],
    },
    interview: {
      common: true,
      format: "Portfolio review with a studio tutor",
      duration: "About 20 minutes",
      interviewingSubjects: ["Arts & Design", "Engineering"],
      note: "Architecture applicants must bring a portfolio; engineering interviews are conversational rather than technical.",
    },
  },
  {
    id: "example-kingsford",
    name: "Example Kingsford University",
    city: "Edinburgh",
    region: "Scotland",
    tagline: "Law, humanities and health sciences in a compact historic city.",
    overview:
      "An older institution with particular strength in law, English and the health professions. Teaching is discussion-led, with small tutorial groups and a heavy reading load in the humanities subjects.",
    studentExperience:
      "Buildings are spread through the old town, so the university and the city are hard to separate. Term-time housing is competitive and the winters are dark, but the cultural programme is unusually strong for a city of its size.",
    careers:
      "A law clinic offering supervised client work, extensive NHS placement partnerships, and a mentoring scheme pairing final-year students with alumni.",
    tuition: { min: 20000, max: 32000 },
    livingCostMonthly: 1150,
    accommodation: { guaranteed: true, weeklyFrom: 145, weeklyTo: 220, note: "Guaranteed for first-year international students; later years are largely private rented." },
    entry: { typical: "AAB–BBB at A-level or an equivalent international qualification", english: "IELTS 6.5–7.0 depending on the course", tariff: 120, ielts: 6.5 },
    scholarships: [
      { name: "Kingsford International Award", amount: "£4,500", detail: "Competitive award across all undergraduate programmes." },
      { name: "Access to Law Bursary", amount: "£3,000", detail: "For students who would be first in their family to study law." },
    ],
    placementYear: false,
    internationalSupport: ["Airport meet-and-greet service", "Immigration and CAS support team", "Academic writing centre", "Country-specific student societies"],
    facilities: ["Moot court", "Clinical skills suite", "Historic research library", "Student theatre"],
    subjects: ["Law", "Humanities", "Health", "Social Sciences", "Education", "Business"],
    destination: "UK",
    monogram: "EK",
    founded: "1965",
    kind: "Campus university",
    campus: "Self-contained parkland campus",
    studentPopulation: "13,600",
    internationalStudents: "2,800 from 60 countries",
  },
  {
    id: "example-harbourside",
    name: "Example Harbourside University",
    city: "Cardiff",
    region: "Wales",
    tagline: "Affordable, employment-focused, with strong health and education provision.",
    overview:
      "A modern university with a widening-participation mission and unusually low living costs. Health, education and business are the largest faculties, and courses are built around professional accreditation and placement.",
    studentExperience:
      "A friendly, comparatively small student body in a city that is easy to navigate and cheaper than most UK capitals. The coast and the Brecon Beacons are both within an hour.",
    careers:
      "Placement is embedded in most degrees rather than optional, with regional employer partnerships in healthcare, education and the public sector.",
    tuition: { min: 15000, max: 19500 },
    livingCostMonthly: 950,
    accommodation: { guaranteed: true, weeklyFrom: 110, weeklyTo: 165, note: "Guaranteed for all first-year students, including late applicants where space allows." },
    entry: { typical: "BBC–CCC at A-level or an equivalent international qualification", english: "IELTS 6.0 overall with no component below 5.5", tariff: 96, ielts: 6.0 },
    scholarships: [
      { name: "Harbourside International Bursary", amount: "£2,500", detail: "Automatic fee reduction for international undergraduates." },
      { name: "Healthcare Commitment Award", amount: "£2,000", detail: "For students entering nursing and allied health programmes." },
    ],
    placementYear: true,
    internationalSupport: ["Arrival and settling-in programme", "Visa and compliance advisers", "English language support all year", "Hardship and wellbeing funds"],
    facilities: ["Clinical simulation suite", "Teaching school partnership", "Modern library and study spaces", "Community sports village"],
    subjects: ["Health", "Education", "Business", "Social Sciences", "Computing"],
    destination: "UK",
    monogram: "EH",
    founded: "1992",
    kind: "Post-1992 university",
    campus: "Waterfront campus across two sites",
    studentPopulation: "11,900",
    internationalStudents: "2,100 from 55 countries",
    interview: {
      common: false,
      format: "Admission is on the application alone for almost all courses.",
    },
  },
  {
    id: "example-castleton",
    name: "Example Castleton University",
    city: "Birmingham",
    region: "England — Midlands",
    tagline: "A broad civic university with business, computing and law at scale.",
    overview:
      "A large civic institution serving a major city, with sizeable business, computing and law faculties and a substantial international intake. Teaching mixes lectures with seminar work and assessed group projects.",
    studentExperience:
      "Central, well connected by rail to most of England, and cheaper than the south. The scale means a wide society programme but a less intimate feel than a smaller campus.",
    careers:
      "A large employer network across the Midlands, an in-house consultancy project scheme, and one of the bigger graduate recruitment fairs outside London.",
    tuition: { min: 17000, max: 25000 },
    livingCostMonthly: 1020,
    accommodation: { guaranteed: true, weeklyFrom: 115, weeklyTo: 185, note: "Guaranteed for first-year international students who apply by the stated deadline." },
    entry: { typical: "ABB–BBC at A-level or an equivalent international qualification", english: "IELTS 6.0–6.5 depending on the course", tariff: 112, ielts: 6.0 },
    scholarships: [
      { name: "Castleton Global Scholarship", amount: "£3,500", detail: "Awarded on academic merit at the point of offer." },
      { name: "Business Leaders Award", amount: "£2,000", detail: "Competitive, for business and economics entrants." },
    ],
    placementYear: true,
    internationalSupport: ["Pre-departure briefings by region", "Dedicated immigration team", "Buddy scheme for new arrivals", "Careers support for post-study work"],
    facilities: ["Trading floor simulation", "Cyber security lab", "Moot court", "Large central library"],
    subjects: ["Business", "Computing", "Law", "Engineering", "Social Sciences", "Humanities"],
    destination: "UK",
    monogram: "EC",
    founded: "1889",
    kind: "Civic university",
    campus: "City-centre campus",
    studentPopulation: "21,300",
    internationalStudents: "5,500 from 100 countries",
    studentStaffRatio: "16:1",
    history: [
      "Founded in 1889 as a school of commerce, endowed by the city's chamber of trade to teach accounting and law to working clerks.",
      "Became a university college in 1948 and a full university in 1957, keeping business and law as its centre of gravity.",
    ],
    rankings: [
      { title: "Top 20 for business and management", position: "18th", scope: "UK", category: "Business", source: "Example Subject Tables", year: 2025 },
    ],
    employability: {
      employedRate: "92%",
      employedSource: "In work or further study 15 months after graduating — Example Graduate Outcomes, 2024",
      employers: [
        { name: "Example Accountancy Firm", sector: "Professional services" },
        { name: "Example Chambers", sector: "Law" },
        { name: "Example Bank", sector: "Finance" },
      ],
      services: [
        "Trading floor simulation used in teaching",
        "Moot court and mock tribunal programme",
        "Professional body exemptions on several degrees",
      ],
    },
  },
];

export function getUniversity(id: string) {
  return universities.find((university) => university.id === id);
}

/** Courses are the source of truth for who teaches what. */
export function coursesAt(universityId: string) {
  return courses.filter((course) => course.universities.includes(universityId));
}

export function universitiesFor(courseId: string) {
  const course = courses.find((c) => c.id === courseId);
  if (!course) return [];

  return course.universities
    .map((id) => getUniversity(id))
    .filter((u): u is University => Boolean(u));
}
