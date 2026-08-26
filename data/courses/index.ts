import type { Course, StudyRouteId } from "./types";
import { studyRoute } from "./types";

export type { Course, Subject, CourseLevel, StudyRoute, StudyRouteId } from "./types";
export { subjects, courseLevels, studyRoutes, studyRoute } from "./types";

/**
 * EXAMPLE DATA. Course structures and module lists are illustrative of how UK
 * degrees in these subjects are commonly organised; they do not describe any
 * real course. Entry requirements in particular are placeholders — they are
 * set per course, per intake, by each university, and every page rendering
 * them carries the example-data marker and a link to verify officially.
 */
export const courses: Course[] = [
  {
    id: "computer-science",
    title: "Computer Science",
    qualification: "BSc (Hons)",
    subject: "Computing",
    level: "Undergraduate",
    durationYears: 3,
    placement: true,
    overview:
      "The foundations of computing — how machines represent and process information, how to design algorithms that scale, and how to build software other people can rely on. Broader and more theoretical than a software engineering degree.",
    whatYouStudy:
      "You start with programming, discrete mathematics and how computers actually work, then specialise across areas such as algorithms, systems, networks, machine learning and security. Most courses end with a substantial individual project.",
    modules: [
      { year: "Year 1", items: ["Programming fundamentals", "Discrete mathematics", "Computer systems", "Web technologies"] },
      { year: "Year 2", items: ["Algorithms and data structures", "Databases", "Operating systems", "Software engineering"] },
      { year: "Year 3", items: ["Machine learning", "Distributed systems", "Security", "Individual project"] },
    ],
    skills: ["Programming", "Algorithmic thinking", "System design", "Mathematical reasoning", "Technical writing"],
    entry: {
      academic: "AAB–BBB at A-level, or an equivalent international qualification",
      subjects: "Mathematics usually required; computing helpful but rarely essential",
      english: "IELTS 6.0–6.5 overall with no component below 5.5, or an accepted equivalent",
    },
    careerOutcomes: ["Software engineering", "Data science", "Cybersecurity", "Research and postgraduate study"],
    relatedCareers: ["software-engineer", "data-scientist", "ux-designer"],
    universities: ["example-metropolitan", "example-riverside", "example-northgate", "example-castleton"],
    destination: "UK",
  },
  {
    id: "software-engineering",
    title: "Software Engineering",
    qualification: "BEng (Hons)",
    subject: "Computing",
    level: "Undergraduate",
    durationYears: 3,
    placement: true,
    overview:
      "A more applied sibling of computer science, focused on building and maintaining large software systems as part of a team — requirements, architecture, testing and delivery as much as code itself.",
    whatYouStudy:
      "Programming and design run through every year, alongside the practices that make software survive contact with real users: version control, testing, code review, agile delivery and working to a client brief.",
    modules: [
      { year: "Year 1", items: ["Programming", "Software design", "Computer systems", "Professional practice"] },
      { year: "Year 2", items: ["Software architecture", "Testing and quality", "Databases", "Team project"] },
      { year: "Year 3", items: ["Distributed systems", "DevOps and delivery", "Advanced project", "Ethics in computing"] },
    ],
    skills: ["Programming", "System architecture", "Testing", "Version control", "Working to a client brief"],
    entry: {
      academic: "AAB–BBC at A-level, or an equivalent international qualification",
      subjects: "Mathematics usually required",
      english: "IELTS 6.0–6.5 overall with no component below 5.5, or an accepted equivalent",
    },
    careerOutcomes: ["Software engineering", "Platform and DevOps roles", "Technical consultancy"],
    relatedCareers: ["software-engineer", "ux-designer"],
    universities: ["example-metropolitan", "example-northgate"],
    destination: "UK",
  },
  {
    id: "artificial-intelligence",
    title: "Artificial Intelligence",
    qualification: "BSc (Hons)",
    subject: "Computing",
    level: "Undergraduate",
    durationYears: 3,
    placement: true,
    overview:
      "How machines learn from data and make decisions — the mathematics underneath modern AI, and the practical business of training, evaluating and deploying models responsibly.",
    whatYouStudy:
      "A heavier mathematical core than a general computing degree: linear algebra, probability and optimisation alongside programming, then machine learning, neural networks, natural language and computer vision.",
    modules: [
      { year: "Year 1", items: ["Programming", "Linear algebra and calculus", "Probability", "Introduction to AI"] },
      { year: "Year 2", items: ["Machine learning", "Neural networks", "Data engineering", "AI ethics"] },
      { year: "Year 3", items: ["Deep learning", "Natural language processing", "Computer vision", "Individual project"] },
    ],
    skills: ["Machine learning", "Mathematical modelling", "Programming", "Experiment design", "Evaluating model behaviour"],
    entry: {
      academic: "AAA–ABB at A-level, or an equivalent international qualification",
      subjects: "Mathematics required; further mathematics or physics often preferred",
      english: "IELTS 6.5 overall with no component below 6.0, or an accepted equivalent",
    },
    careerOutcomes: ["Machine learning engineering", "Data science", "Research and postgraduate study"],
    relatedCareers: ["data-scientist", "software-engineer"],
    universities: ["example-metropolitan", "example-riverside"],
    destination: "UK",
  },
  {
    id: "data-science",
    title: "Data Science",
    qualification: "BSc (Hons)",
    subject: "Computing",
    level: "Undergraduate",
    durationYears: 3,
    placement: true,
    overview:
      "Statistics, programming and communication combined — turning messy real-world data into findings an organisation can act on, and being able to explain them to people who are not statisticians.",
    whatYouStudy:
      "Statistical inference and programming from the first year, then data engineering, machine learning and visualisation, usually applied to real datasets from healthcare, finance or government.",
    modules: [
      { year: "Year 1", items: ["Statistics", "Programming for data", "Data handling", "Mathematics for data science"] },
      { year: "Year 2", items: ["Statistical modelling", "Machine learning", "Databases and pipelines", "Data visualisation"] },
      { year: "Year 3", items: ["Advanced analytics", "Big data systems", "Communicating findings", "Capstone project"] },
    ],
    skills: ["Statistics", "Programming", "Data visualisation", "Machine learning", "Communicating findings"],
    entry: {
      academic: "AAB–BBB at A-level, or an equivalent international qualification",
      subjects: "Mathematics required",
      english: "IELTS 6.0–6.5 overall with no component below 5.5, or an accepted equivalent",
    },
    careerOutcomes: ["Data science", "Analytics", "Quantitative research", "Machine learning engineering"],
    relatedCareers: ["data-scientist", "financial-analyst", "software-engineer"],
    universities: ["example-metropolitan", "example-riverside", "example-castleton"],
    destination: "UK",
  },
  {
    id: "civil-engineering",
    title: "Civil Engineering",
    qualification: "BEng (Hons)",
    subject: "Engineering",
    level: "Undergraduate",
    durationYears: 3,
    placement: true,
    overview:
      "Designing and delivering the built environment — structures, transport, water and geotechnics — with the regulation, sustainability and project management that surround them.",
    whatYouStudy:
      "Engineering mathematics and mechanics underpin everything, followed by structural analysis, materials, fluids and soil mechanics, usually taught through design projects rather than problem sheets alone.",
    modules: [
      { year: "Year 1", items: ["Engineering mathematics", "Mechanics", "Materials", "Design and drawing"] },
      { year: "Year 2", items: ["Structural analysis", "Geotechnics", "Fluid mechanics", "Surveying"] },
      { year: "Year 3", items: ["Structural design", "Transport engineering", "Sustainability", "Design project"] },
    ],
    skills: ["Structural analysis", "Technical drawing", "Project management", "Site awareness", "Sustainable design"],
    entry: {
      academic: "AAB–BBC at A-level, or an equivalent international qualification",
      subjects: "Mathematics required; physics usually required",
      english: "IELTS 6.0–6.5 overall with no component below 5.5, or an accepted equivalent",
    },
    careerOutcomes: ["Civil and structural engineering", "Infrastructure consultancy", "Project management"],
    relatedCareers: ["civil-engineer", "mechanical-engineer", "architect"],
    universities: ["example-northgate", "example-riverside"],
    destination: "UK",
  },
  {
    id: "mechanical-engineering",
    title: "Mechanical Engineering",
    qualification: "BEng (Hons)",
    subject: "Engineering",
    level: "Undergraduate",
    durationYears: 3,
    placement: true,
    overview:
      "Anything with moving parts — engines, machines, energy systems and manufacturing processes — from first principles through modelling and testing to production.",
    whatYouStudy:
      "Thermodynamics, mechanics and materials form the core, with computer-aided design and laboratory work throughout, and a substantial design-and-build project in the final year.",
    modules: [
      { year: "Year 1", items: ["Engineering mathematics", "Statics and dynamics", "Thermodynamics", "CAD"] },
      { year: "Year 2", items: ["Fluid mechanics", "Materials and manufacturing", "Control systems", "Design project"] },
      { year: "Year 3", items: ["Advanced thermofluids", "Finite element analysis", "Energy systems", "Major project"] },
    ],
    skills: ["CAD modelling", "Thermofluid analysis", "Materials selection", "Testing", "Design for manufacture"],
    entry: {
      academic: "AAB–BBC at A-level, or an equivalent international qualification",
      subjects: "Mathematics and physics usually required",
      english: "IELTS 6.0–6.5 overall with no component below 5.5, or an accepted equivalent",
    },
    careerOutcomes: ["Mechanical design", "Energy and renewables", "Automotive and aerospace", "Manufacturing"],
    relatedCareers: ["mechanical-engineer", "civil-engineer"],
    universities: ["example-northgate", "example-metropolitan"],
    destination: "UK",
  },
  {
    id: "medicine",
    title: "Medicine",
    qualification: "MBBS / MBChB",
    subject: "Health",
    level: "Integrated Masters",
    durationYears: 5,
    placement: false,
    overview:
      "The primary medical qualification. Five or six years combining biomedical science with clinical placements, followed by foundation training before independent practice.",
    whatYouStudy:
      "Early years cover anatomy, physiology, pharmacology and pathology, usually taught around body systems and alongside early patient contact. Later years are largely clinical placements across specialties.",
    modules: [
      { year: "Years 1–2", items: ["Anatomy and physiology", "Biochemistry", "Pharmacology", "Clinical communication"] },
      { year: "Years 3–4", items: ["Medicine and surgery placements", "Paediatrics", "Obstetrics and gynaecology", "Psychiatry"] },
      { year: "Year 5", items: ["Assistantship placements", "Acute care", "Preparation for practice", "Elective"] },
    ],
    skills: ["Clinical reasoning", "Patient communication", "Teamwork", "Resilience", "Evidence appraisal"],
    entry: {
      academic: "AAA at A-level is typical, alongside an admissions test and interview",
      subjects: "Chemistry and biology usually required; work experience expected",
      english: "IELTS 7.0 overall with no component below 6.5, or an accepted equivalent",
    },
    careerOutcomes: ["Foundation training and specialty practice", "Academic medicine", "Public health"],
    relatedCareers: ["doctor", "nurse", "psychologist"],
    universities: ["example-riverside", "example-kingsford"],
    destination: "UK",
  },
  {
    id: "nursing",
    title: "Nursing",
    qualification: "BSc (Hons)",
    subject: "Health",
    level: "Undergraduate",
    durationYears: 3,
    placement: false,
    overview:
      "A professional degree leading to registration. Roughly half the course is clinical placement, and you choose a field — adult, children's, mental health or learning disability nursing.",
    whatYouStudy:
      "Anatomy, physiology and pharmacology alongside assessment, care planning and communication, taught in alternating blocks of university teaching and supervised placement.",
    modules: [
      { year: "Year 1", items: ["Anatomy and physiology", "Foundations of nursing", "Communication and ethics", "Placement"] },
      { year: "Year 2", items: ["Pharmacology", "Long-term conditions", "Evidence-based practice", "Placement"] },
      { year: "Year 3", items: ["Complex care", "Leadership in nursing", "Dissertation", "Management placement"] },
    ],
    skills: ["Patient assessment", "Clinical procedures", "Care planning", "Prioritisation", "Compassionate communication"],
    entry: {
      academic: "BBC–CCC at A-level or an equivalent international qualification, plus interview",
      subjects: "A science subject, usually biology, is commonly required",
      english: "IELTS 7.0 overall with no component below 6.5, or an accepted equivalent",
    },
    careerOutcomes: ["Registered nursing across NHS and private settings", "Specialist and advanced practice", "Community and public health nursing"],
    relatedCareers: ["nurse", "doctor", "psychologist"],
    universities: ["example-kingsford", "example-riverside", "example-harbourside"],
    destination: "UK",
  },
  {
    id: "biomedical-science",
    title: "Biomedical Science",
    qualification: "BSc (Hons)",
    subject: "Health",
    level: "Undergraduate",
    durationYears: 3,
    placement: true,
    overview:
      "The science behind diagnosis and treatment — how disease works at cellular and molecular level, and how laboratories investigate it. A common route into laboratory practice or postgraduate medicine.",
    whatYouStudy:
      "Cell biology, biochemistry, physiology and microbiology, with substantial laboratory work throughout and specialisation in areas such as immunology, haematology or medical genetics.",
    modules: [
      { year: "Year 1", items: ["Cell biology", "Biochemistry", "Human physiology", "Laboratory skills"] },
      { year: "Year 2", items: ["Microbiology", "Immunology", "Medical genetics", "Research methods"] },
      { year: "Year 3", items: ["Haematology", "Clinical biochemistry", "Molecular pathology", "Research project"] },
    ],
    skills: ["Laboratory technique", "Data analysis", "Scientific writing", "Experimental design", "Attention to detail"],
    entry: {
      academic: "ABB–BCC at A-level, or an equivalent international qualification",
      subjects: "Biology required; chemistry usually required",
      english: "IELTS 6.0–6.5 overall with no component below 5.5, or an accepted equivalent",
    },
    careerOutcomes: ["Laboratory and healthcare science roles", "Pharmaceutical research", "Postgraduate medicine or research"],
    relatedCareers: ["doctor", "psychologist", "nurse"],
    universities: ["example-kingsford", "example-riverside", "example-harbourside"],
    destination: "UK",
  },
  {
    id: "psychology",
    title: "Psychology",
    qualification: "BSc (Hons)",
    subject: "Social Sciences",
    level: "Undergraduate",
    durationYears: 3,
    placement: true,
    overview:
      "The scientific study of mind and behaviour. A broad degree covering cognition, development, social behaviour and mental health, with a strong emphasis on research methods and statistics.",
    whatYouStudy:
      "Every core area of the discipline plus the methods that underpin it — experimental design, statistics and critical appraisal — leading to an independent empirical project.",
    modules: [
      { year: "Year 1", items: ["Introduction to psychology", "Research methods", "Biological psychology", "Developmental psychology"] },
      { year: "Year 2", items: ["Cognitive psychology", "Social psychology", "Statistics", "Individual differences"] },
      { year: "Year 3", items: ["Clinical psychology", "Forensic or health options", "Advanced methods", "Empirical project"] },
    ],
    skills: ["Research methods", "Statistics", "Critical appraisal", "Report writing", "Ethical reasoning"],
    entry: {
      academic: "AAB–BBC at A-level, or an equivalent international qualification",
      subjects: "A science or mathematics subject is often preferred",
      english: "IELTS 6.5 overall with no component below 6.0, or an accepted equivalent",
    },
    careerOutcomes: ["Postgraduate clinical, educational or forensic training", "Research", "People-focused roles across sectors"],
    relatedCareers: ["psychologist", "nurse", "teacher", "ux-designer"],
    universities: ["example-kingsford", "example-metropolitan", "example-harbourside"],
    destination: "UK",
  },
  {
    id: "architecture",
    title: "Architecture",
    qualification: "BA (Hons)",
    subject: "Arts & Design",
    level: "Undergraduate",
    durationYears: 3,
    placement: false,
    overview:
      "The first stage of the UK route to qualifying as an architect. Studio-based design work supported by history, theory, technology and environmental design.",
    whatYouStudy:
      "The design studio is the centre of the course: you work on projects of increasing complexity, presented and critiqued in reviews, with technology and history modules feeding into them.",
    modules: [
      { year: "Year 1", items: ["Design studio", "History of architecture", "Construction technology", "Representation and drawing"] },
      { year: "Year 2", items: ["Design studio", "Environmental design", "Structures", "Theory and criticism"] },
      { year: "Year 3", items: ["Advanced design studio", "Professional practice", "Dissertation", "Technical resolution"] },
    ],
    skills: ["Design thinking", "Technical drawing", "3D modelling", "Model making", "Presenting and defending work"],
    entry: {
      academic: "AAB–BBB at A-level plus a portfolio, or an equivalent international qualification",
      subjects: "No fixed subjects; art, mathematics or physics all commonly held",
      english: "IELTS 6.5 overall with no component below 6.0, or an accepted equivalent",
    },
    careerOutcomes: ["Architectural practice via further qualification", "Urban design", "Interior and exhibition design"],
    relatedCareers: ["architect", "civil-engineer", "ux-designer"],
    universities: ["example-northgate", "example-metropolitan"],
    destination: "UK",
  },
  {
    id: "graphic-design",
    title: "Graphic & Digital Design",
    qualification: "BA (Hons)",
    subject: "Arts & Design",
    level: "Undergraduate",
    durationYears: 3,
    placement: true,
    overview:
      "Visual communication across print and screen — typography, identity, motion and interface design — taught through briefs and built into a portfolio that matters more than grades when you graduate.",
    whatYouStudy:
      "Studio briefs from the first week, supported by typography, image-making, research and professional practice, moving from set exercises towards self-directed work.",
    modules: [
      { year: "Year 1", items: ["Typography", "Image and composition", "Design history", "Digital tools"] },
      { year: "Year 2", items: ["Brand and identity", "Interaction design", "Motion graphics", "Live client brief"] },
      { year: "Year 3", items: ["Self-directed major project", "Portfolio and professional practice", "Dissertation", "Degree show"] },
    ],
    skills: ["Typography", "Visual systems", "Prototyping", "Art direction", "Presenting work"],
    entry: {
      academic: "BBB–CCC at A-level plus a portfolio, or an equivalent international qualification",
      subjects: "No fixed subjects; a portfolio carries most of the weight",
      english: "IELTS 6.0 overall with no component below 5.5, or an accepted equivalent",
    },
    careerOutcomes: ["Graphic and brand design", "Product and UX design", "Motion and editorial design"],
    relatedCareers: ["ux-designer", "architect", "journalist"],
    universities: ["example-metropolitan", "example-northgate"],
    destination: "UK",
  },
  {
    id: "law",
    title: "Law",
    qualification: "LLB (Hons)",
    subject: "Law",
    level: "Undergraduate",
    durationYears: 3,
    placement: false,
    overview:
      "The qualifying law degree. Covers the foundations of legal knowledge and, more importantly, teaches you to read authority closely and build an argument that survives challenge.",
    whatYouStudy:
      "Contract, tort, criminal, public, land, equity and EU or international law, taught through cases and statute, with mooting and legal research running alongside.",
    modules: [
      { year: "Year 1", items: ["Contract law", "Criminal law", "Public law", "Legal method and research"] },
      { year: "Year 2", items: ["Tort", "Land law", "Equity and trusts", "Mooting"] },
      { year: "Year 3", items: ["Optional specialisms", "Jurisprudence", "Dissertation", "Clinical legal education"] },
    ],
    skills: ["Legal research", "Case analysis", "Written advocacy", "Structured argument", "Attention to detail"],
    entry: {
      academic: "AAA–BBB at A-level, or an equivalent international qualification",
      subjects: "No fixed subjects; essay-based subjects are common",
      english: "IELTS 7.0 overall with no component below 6.5, or an accepted equivalent",
    },
    careerOutcomes: ["Solicitor or barrister via further qualification", "Compliance and regulation", "Policy and government"],
    relatedCareers: ["solicitor", "journalist", "management-consultant"],
    universities: ["example-kingsford", "example-riverside", "example-castleton"],
    destination: "UK",
  },
  {
    id: "business-management",
    title: "Business Management",
    qualification: "BSc (Hons)",
    subject: "Business",
    level: "Undergraduate",
    durationYears: 3,
    placement: true,
    overview:
      "How organisations are run — strategy, marketing, operations, finance and people — usually taught through case studies, group work and a placement year with a real employer.",
    whatYouStudy:
      "A broad first year across the business functions, then specialisation in areas such as strategy, marketing, entrepreneurship or international business.",
    modules: [
      { year: "Year 1", items: ["Principles of management", "Marketing", "Accounting and finance", "Organisational behaviour"] },
      { year: "Year 2", items: ["Strategy", "Operations management", "Human resource management", "Business analytics"] },
      { year: "Year 3", items: ["Strategic management", "Entrepreneurship", "International business", "Consultancy project"] },
    ],
    skills: ["Strategic analysis", "Financial literacy", "Presenting", "Teamwork", "Project management"],
    entry: {
      academic: "ABB–BCC at A-level, or an equivalent international qualification",
      subjects: "No fixed subjects; mathematics helpful for analytics pathways",
      english: "IELTS 6.0–6.5 overall with no component below 5.5, or an accepted equivalent",
    },
    careerOutcomes: ["Graduate management schemes", "Consultancy", "Marketing and operations", "Founding a business"],
    relatedCareers: ["management-consultant", "financial-analyst", "solicitor"],
    universities: ["example-riverside", "example-metropolitan", "example-castleton"],
    destination: "UK",
  },
  {
    id: "economics",
    title: "Economics",
    qualification: "BSc (Hons)",
    subject: "Business",
    level: "Undergraduate",
    durationYears: 3,
    placement: true,
    overview:
      "How resources are allocated and why markets behave as they do — a quantitative social science that sits behind policy, finance and much of modern data work.",
    whatYouStudy:
      "Micro and macroeconomics alongside mathematics and econometrics from the first year, then applied fields such as development, labour, behavioural or financial economics.",
    modules: [
      { year: "Year 1", items: ["Microeconomics", "Macroeconomics", "Mathematics for economists", "Statistics"] },
      { year: "Year 2", items: ["Intermediate micro and macro", "Econometrics", "Economic history", "Applied options"] },
      { year: "Year 3", items: ["Advanced econometrics", "Behavioural economics", "Public policy", "Dissertation"] },
    ],
    skills: ["Econometrics", "Quantitative modelling", "Data analysis", "Policy reasoning", "Structured writing"],
    entry: {
      academic: "AAA–ABB at A-level, or an equivalent international qualification",
      subjects: "Mathematics required at most universities",
      english: "IELTS 6.5 overall with no component below 6.0, or an accepted equivalent",
    },
    careerOutcomes: ["Financial analysis", "Consultancy", "Government economic service", "Data and research roles"],
    relatedCareers: ["financial-analyst", "management-consultant", "data-scientist"],
    universities: ["example-riverside", "example-kingsford", "example-castleton"],
    destination: "UK",
  },
  {
    id: "mathematics",
    title: "Mathematics",
    qualification: "BSc (Hons)",
    subject: "Sciences",
    level: "Undergraduate",
    durationYears: 3,
    placement: true,
    overview:
      "Pure and applied mathematics at depth — proof, structure and abstraction alongside the modelling and statistics that make it applicable almost anywhere.",
    whatYouStudy:
      "A rigorous core of analysis, algebra and calculus, then choices across statistics, applied mathematics, operational research and mathematical computing.",
    modules: [
      { year: "Year 1", items: ["Analysis", "Linear algebra", "Calculus", "Probability"] },
      { year: "Year 2", items: ["Abstract algebra", "Differential equations", "Statistical inference", "Numerical methods"] },
      { year: "Year 3", items: ["Advanced options", "Optimisation", "Mathematical modelling", "Project"] },
    ],
    skills: ["Formal proof", "Abstraction", "Statistical modelling", "Numerical computing", "Precise reasoning"],
    entry: {
      academic: "A*AA–ABB at A-level, or an equivalent international qualification",
      subjects: "Mathematics required; further mathematics often preferred",
      english: "IELTS 6.0–6.5 overall with no component below 5.5, or an accepted equivalent",
    },
    careerOutcomes: ["Data science and analytics", "Finance and actuarial work", "Research and academia", "Teaching"],
    relatedCareers: ["data-scientist", "financial-analyst", "teacher", "software-engineer"],
    universities: ["example-riverside", "example-northgate"],
    destination: "UK",
  },
  {
    id: "education",
    title: "Education",
    qualification: "BA (Hons)",
    subject: "Education",
    level: "Undergraduate",
    durationYears: 3,
    placement: true,
    overview:
      "How people learn and how education systems work — policy, psychology, inclusion and pedagogy. Some routes lead directly to qualified teacher status; others require separate teacher training afterwards.",
    whatYouStudy:
      "Learning theory, child development, curriculum and educational policy, usually with school-based placements and a research project in the final year.",
    modules: [
      { year: "Year 1", items: ["Learning and development", "Education and society", "Curriculum studies", "School placement"] },
      { year: "Year 2", items: ["Inclusive education", "Educational psychology", "Policy and reform", "Placement"] },
      { year: "Year 3", items: ["Subject pedagogy", "Assessment", "Research methods", "Dissertation"] },
    ],
    skills: ["Explaining clearly", "Planning and assessment", "Classroom management", "Research", "Working with families"],
    entry: {
      academic: "BBB–CCC at A-level, or an equivalent international qualification, plus interview",
      subjects: "No fixed subjects; GCSE mathematics and English usually required",
      english: "IELTS 6.5 overall with no component below 6.0, or an accepted equivalent",
    },
    careerOutcomes: ["Teaching via QTS routes", "Education policy and administration", "Youth and community work"],
    relatedCareers: ["teacher", "psychologist"],
    universities: ["example-kingsford", "example-northgate", "example-harbourside"],
    destination: "UK",
  },
  {
    id: "english-literature",
    title: "English Literature",
    qualification: "BA (Hons)",
    subject: "Humanities",
    level: "Undergraduate",
    durationYears: 3,
    placement: false,
    overview:
      "Close reading across periods and forms, and the critical and historical frameworks used to interpret them. A degree that trains you to build an argument in prose and defend it.",
    whatYouStudy:
      "Survey modules across medieval to contemporary literature in the early years, then specialised options and an extended dissertation on a topic of your own.",
    modules: [
      { year: "Year 1", items: ["Approaches to literature", "Poetry and poetics", "Renaissance literature", "The novel"] },
      { year: "Year 2", items: ["Romanticism", "Victorian literature", "Critical theory", "Modernism"] },
      { year: "Year 3", items: ["Contemporary writing", "Specialist options", "Creative writing", "Dissertation"] },
    ],
    skills: ["Close reading", "Critical argument", "Research", "Essay writing", "Editing"],
    entry: {
      academic: "AAB–BBC at A-level, or an equivalent international qualification",
      subjects: "English literature usually required",
      english: "IELTS 7.0 overall with no component below 6.5, or an accepted equivalent",
    },
    careerOutcomes: ["Journalism and publishing", "Communications and marketing", "Teaching", "Law via conversion"],
    relatedCareers: ["journalist", "teacher", "solicitor"],
    universities: ["example-kingsford", "example-metropolitan"],
    destination: "UK",
  },
  {
    id: "foundation-year-business",
    title: "Business with Foundation Year",
    qualification: "BA (Hons) with Foundation",
    subject: "Business",
    level: "Foundation",
    durationYears: 4,
    placement: false,
    overview:
      "A four-year route into a business degree for students whose qualifications do not yet meet direct entry. The foundation year sits at the front and leads straight into year one of the degree with no second application.",
    whatYouStudy:
      "The foundation year covers academic English, study skills, quantitative methods and an introduction to the business disciplines. Passing it progresses you into the full degree alongside direct-entry students.",
    modules: [
      { year: "Foundation year", items: ["Academic English and study skills", "Introduction to business", "Quantitative methods", "Research and referencing"] },
      { year: "Year 1", items: ["Principles of management", "Marketing", "Financial accounting", "Business economics"] },
      { year: "Year 2", items: ["Operations management", "Human resource management", "Business analytics", "Strategy"] },
      { year: "Year 3", items: ["Strategic management", "Entrepreneurship", "Specialist options", "Dissertation"] },
    ],
    skills: ["Academic writing", "Quantitative reasoning", "Commercial awareness", "Presenting", "Teamwork"],
    entry: {
      academic: "Below standard entry for the degree — typically CCC–DDD at A-level or an equivalent international qualification",
      subjects: "No specific subjects required",
      english: "IELTS 5.5 overall with no component below 5.0, or an accepted equivalent",
    },
    careerOutcomes: ["Progression to the full business degree", "Management trainee schemes", "Marketing and operations roles"],
    relatedCareers: ["management-consultant", "financial-analyst"],
    universities: ["example-metropolitan", "example-castleton"],
    destination: "UK",
  },
  {
    id: "foundation-year-engineering",
    title: "Engineering with Foundation Year",
    qualification: "BEng (Hons) with Foundation",
    subject: "Engineering",
    level: "Foundation",
    durationYears: 4,
    placement: true,
    overview:
      "A four-year engineering route for students who have the aptitude but not yet the mathematics or physics for direct entry. The foundation year builds the technical base the degree then assumes.",
    whatYouStudy:
      "Mathematics and physics dominate the foundation year, taught in an engineering context alongside laboratory practice and design. You then join year one of civil, mechanical or electrical engineering.",
    modules: [
      { year: "Foundation year", items: ["Engineering mathematics", "Mechanics and materials", "Electrical principles", "Design and laboratory skills"] },
      { year: "Year 1", items: ["Engineering mathematics", "Statics and dynamics", "Thermofluids", "Design project"] },
      { year: "Year 2", items: ["Structures or systems", "Materials", "Control", "Group design project"] },
      { year: "Year 3", items: ["Specialist options", "Engineering management", "Individual project"] },
    ],
    skills: ["Mathematics", "Technical drawing", "Laboratory practice", "Problem solving", "Design"],
    entry: {
      academic: "Below standard entry for the degree — typically CCC–DDD at A-level or an equivalent international qualification",
      subjects: "Mathematics or a science at a pass grade is normally expected",
      english: "IELTS 5.5 overall with no component below 5.0, or an accepted equivalent",
    },
    careerOutcomes: ["Progression to the full engineering degree", "Engineering technician roles"],
    relatedCareers: ["civil-engineer", "mechanical-engineer"],
    universities: ["example-northgate", "example-metropolitan"],
    destination: "UK",
  },
  {
    id: "business-management-top-up",
    title: "Business Management (Top-Up)",
    qualification: "BA (Hons) Top-Up",
    subject: "Business",
    level: "Top-Up",
    durationYears: 1,
    placement: false,
    overview:
      "The final year of a business degree, for students who already hold an HND, HNC, foundation degree or an equivalent two-year diploma. One year of study converts that qualification into a full honours degree.",
    whatYouStudy:
      "You enter at final-year level, so the work is immediately strategic rather than introductory: strategy, leadership, and a substantial independent research project on a business problem of your choosing.",
    modules: [
      { year: "Final year", items: ["Strategic management", "Leadership and change", "Contemporary issues in business", "Research methods", "Dissertation or consultancy project"] },
    ],
    skills: ["Strategic analysis", "Independent research", "Report writing", "Presenting to a brief", "Critical evaluation"],
    entry: {
      academic: "HND, HNC, foundation degree or equivalent in a business subject, normally at merit or above",
      subjects: "Prior study must be in a related discipline for direct final-year entry",
      english: "IELTS 6.0 overall with no component below 5.5, or an accepted equivalent",
    },
    careerOutcomes: ["Management trainee schemes", "Operations and project roles", "Progression to a masters"],
    relatedCareers: ["management-consultant", "financial-analyst"],
    universities: ["example-metropolitan", "example-castleton", "example-harbourside"],
    destination: "UK",
  },
  {
    id: "computing-top-up",
    title: "Computing (Top-Up)",
    qualification: "BSc (Hons) Top-Up",
    subject: "Computing",
    level: "Top-Up",
    durationYears: 1,
    placement: false,
    overview:
      "A one-year final year that turns an HND or foundation degree in computing into a full honours degree. Built around a major individual project, which is what employers and masters admissions actually look at.",
    whatYouStudy:
      "Advanced software development and systems work alongside professional practice, culminating in an individual project taken from specification through to a working, tested artefact.",
    modules: [
      { year: "Final year", items: ["Advanced software development", "Emerging technologies", "Professional and ethical practice", "Research methods", "Individual project"] },
    ],
    skills: ["Software development", "Project management", "Technical writing", "Testing", "Independent research"],
    entry: {
      academic: "HND, foundation degree or equivalent in computing or IT, normally at merit or above",
      subjects: "Prior study must include programming",
      english: "IELTS 6.0 overall with no component below 5.5, or an accepted equivalent",
    },
    careerOutcomes: ["Software development", "IT support and infrastructure", "Progression to a computing masters"],
    relatedCareers: ["software-engineer", "data-scientist"],
    universities: ["example-metropolitan", "example-northgate"],
    destination: "UK",
  },
  {
    id: "health-social-care-top-up",
    title: "Health and Social Care (Top-Up)",
    qualification: "BSc (Hons) Top-Up",
    subject: "Health",
    level: "Top-Up",
    durationYears: 1,
    placement: false,
    overview:
      "The final year of a health and social care degree for holders of a relevant HND or foundation degree. An academic rather than a clinical qualification — it does not on its own register you with a professional body.",
    whatYouStudy:
      "Policy, safeguarding and evidence-based practice at final-year level, with a dissertation on a question drawn from your own area of work or interest.",
    modules: [
      { year: "Final year", items: ["Health and social policy", "Safeguarding and ethics", "Evidence-based practice", "Research methods", "Dissertation"] },
    ],
    skills: ["Policy analysis", "Evidence appraisal", "Reflective practice", "Academic writing", "Research design"],
    entry: {
      academic: "HND, foundation degree or equivalent in health, social care or a related subject",
      subjects: "Prior study must be in a related discipline",
      english: "IELTS 6.0 overall with no component below 5.5, or an accepted equivalent",
    },
    careerOutcomes: ["Care management", "Health administration and commissioning", "Progression to a masters or professional training"],
    relatedCareers: ["nurse", "psychologist"],
    universities: ["example-harbourside", "example-riverside"],
    destination: "UK",
  },
  {
    id: "msc-computer-science",
    title: "Computer Science",
    qualification: "MSc",
    subject: "Computing",
    level: "Postgraduate",
    durationYears: 1,
    placement: true,
    overview:
      "A one-year masters in computing. Conversion routes take graduates of any discipline and teach them to program from the beginning; advanced routes take computing graduates deeper into systems, algorithms and machine learning.",
    whatYouStudy:
      "Two taught semesters followed by a summer dissertation. Which modules you take depends on the route: conversion students spend the first semester on programming and data structures, advanced students go straight to specialist material.",
    modules: [
      { year: "Semester 1", items: ["Programming and data structures", "Databases and data engineering", "Computer systems", "Research methods"] },
      { year: "Semester 2", items: ["Machine learning", "Distributed and cloud systems", "Security", "Specialist option"] },
      { year: "Summer", items: ["Individual dissertation or industry project"] },
    ],
    skills: ["Programming", "System design", "Machine learning", "Research design", "Technical communication"],
    entry: {
      academic: "A 2:2 or 2:1 bachelors degree depending on the university; conversion routes accept any discipline",
      subjects: "Advanced routes require a computing degree; conversion routes do not",
      english: "IELTS 6.5 overall with no component below 6.0, or an accepted equivalent",
    },
    careerOutcomes: ["Software engineering", "Data engineering", "Machine learning roles", "Doctoral research"],
    relatedCareers: ["software-engineer", "data-scientist"],
    universities: ["example-metropolitan", "example-riverside", "example-northgate"],
    destination: "UK",
  },
  {
    id: "msc-data-science",
    title: "Data Science and Artificial Intelligence",
    qualification: "MSc",
    subject: "Computing",
    level: "Postgraduate",
    durationYears: 1,
    placement: true,
    overview:
      "The statistics, machine learning and engineering practice needed to take a question, find the data that answers it, and put a model into production. One of the most common masters routes for international students in the UK.",
    whatYouStudy:
      "Statistical modelling and machine learning taught alongside the engineering that surrounds them — pipelines, cloud infrastructure, evaluation and the ethics of automated decisions — then a substantial dissertation.",
    modules: [
      { year: "Semester 1", items: ["Statistical modelling", "Machine learning", "Data engineering", "Programming for data science"] },
      { year: "Semester 2", items: ["Deep learning", "Natural language processing", "Visualisation and communication", "AI ethics and governance"] },
      { year: "Summer", items: ["Dissertation or industry placement project"] },
    ],
    skills: ["Statistics", "Machine learning", "Python and SQL", "Data visualisation", "Model evaluation"],
    entry: {
      academic: "A 2:2 or 2:1 bachelors degree in a quantitative or computing subject",
      subjects: "Evidence of mathematics or programming is normally required",
      english: "IELTS 6.5 overall with no component below 6.0, or an accepted equivalent",
    },
    careerOutcomes: ["Data science", "Machine learning engineering", "Analytics and business intelligence", "Doctoral research"],
    relatedCareers: ["data-scientist", "software-engineer", "financial-analyst"],
    universities: ["example-metropolitan", "example-riverside", "example-castleton"],
    destination: "UK",
  },
  {
    id: "msc-cyber-security",
    title: "Cyber Security",
    qualification: "MSc",
    subject: "Computing",
    level: "Postgraduate",
    durationYears: 1,
    placement: false,
    overview:
      "How systems are attacked and how they are defended, taught with enough cryptography and network theory underneath to reason about threats that have not been seen yet rather than only the ones that have.",
    whatYouStudy:
      "Network and system security, applied cryptography, digital forensics and incident response, with substantial laboratory work in an isolated environment and a research or practical dissertation.",
    modules: [
      { year: "Semester 1", items: ["Network security", "Applied cryptography", "Secure systems architecture", "Research methods"] },
      { year: "Semester 2", items: ["Penetration testing", "Digital forensics", "Incident response and governance", "Specialist option"] },
      { year: "Summer", items: ["Dissertation"] },
    ],
    skills: ["Threat modelling", "Penetration testing", "Cryptography", "Incident response", "Security governance"],
    entry: {
      academic: "A 2:2 or 2:1 bachelors degree in computing, engineering or a related subject",
      subjects: "Networking or programming background normally expected",
      english: "IELTS 6.5 overall with no component below 6.0, or an accepted equivalent",
    },
    careerOutcomes: ["Security engineering", "Penetration testing", "Security operations", "Governance, risk and compliance"],
    relatedCareers: ["software-engineer", "data-scientist"],
    universities: ["example-metropolitan", "example-castleton"],
    destination: "UK",
  },
  {
    id: "mba",
    title: "Master of Business Administration",
    qualification: "MBA",
    subject: "Business",
    level: "Postgraduate",
    durationYears: 1,
    placement: false,
    overview:
      "A general management degree built for people who already have work experience. The teaching is case-based and the cohort is the curriculum as much as the modules are — most UK MBAs ask for two or three years in a role.",
    whatYouStudy:
      "Every function of a business in turn — finance, marketing, operations, strategy, people — then a consultancy project in which teams take a live brief from a real organisation.",
    modules: [
      { year: "Semester 1", items: ["Financial management", "Marketing management", "Organisational behaviour", "Operations and supply chain"] },
      { year: "Semester 2", items: ["Corporate strategy", "Leadership and change", "Entrepreneurship and innovation", "Global business environment"] },
      { year: "Summer", items: ["Consultancy project or dissertation"] },
    ],
    skills: ["Strategic analysis", "Financial literacy", "Leadership", "Negotiation", "Working across functions"],
    entry: {
      academic: "A bachelors degree plus, at most universities, two to three years of professional work experience",
      subjects: "Any discipline",
      english: "IELTS 6.5 overall with no component below 6.0, or an accepted equivalent",
    },
    careerOutcomes: ["General management", "Consultancy", "Founding or scaling a business", "Sector or function change"],
    relatedCareers: ["management-consultant", "financial-analyst"],
    universities: ["example-castleton", "example-riverside", "example-harbourside"],
    destination: "UK",
  },
  {
    id: "msc-international-business",
    title: "International Business Management",
    qualification: "MSc",
    subject: "Business",
    level: "Postgraduate",
    durationYears: 1,
    placement: true,
    overview:
      "How organisations operate across borders — the strategy, the supply chains, the regulation and the cultural difference. Unlike an MBA it is designed for recent graduates rather than experienced managers.",
    whatYouStudy:
      "International strategy, cross-cultural management, global marketing and trade, with a dissertation that usually examines a market or a company you already know something about.",
    modules: [
      { year: "Semester 1", items: ["International business strategy", "Cross-cultural management", "Global marketing", "Research methods"] },
      { year: "Semester 2", items: ["International trade and finance", "Global supply chains", "Sustainability and business ethics", "Specialist option"] },
      { year: "Summer", items: ["Dissertation or placement project"] },
    ],
    skills: ["Market analysis", "Cross-cultural communication", "Strategy", "Research", "Presenting"],
    entry: {
      academic: "A 2:2 or 2:1 bachelors degree; work experience is welcomed but not usually required",
      subjects: "Any discipline, though business or economics helps",
      english: "IELTS 6.5 overall with no component below 6.0, or an accepted equivalent",
    },
    careerOutcomes: ["International sales and marketing", "Supply chain and operations", "Graduate management schemes", "Trade and export roles"],
    relatedCareers: ["management-consultant", "financial-analyst"],
    universities: ["example-castleton", "example-metropolitan", "example-harbourside"],
    destination: "UK",
  },
  {
    id: "llm-international-law",
    title: "International Business Law",
    qualification: "LLM",
    subject: "Law",
    level: "Postgraduate",
    durationYears: 1,
    placement: false,
    overview:
      "A specialist masters in law for students who already hold a law degree, covering the legal frameworks that govern trade, investment and dispute resolution between jurisdictions.",
    whatYouStudy:
      "International commercial contracts, corporate governance, arbitration and competition law, taught through case analysis and assessed largely by extended written work and a dissertation.",
    modules: [
      { year: "Semester 1", items: ["International commercial contracts", "Corporate governance", "Legal research methods", "International trade law"] },
      { year: "Semester 2", items: ["International arbitration", "Competition law", "Intellectual property", "Specialist option"] },
      { year: "Summer", items: ["Dissertation"] },
    ],
    skills: ["Legal research", "Case analysis", "Drafting", "Written argument", "Comparative reasoning"],
    entry: {
      academic: "A 2:2 or 2:1 law degree, or a degree with substantial legal content",
      subjects: "A law background is normally required for an LLM",
      english: "IELTS 7.0 overall with no component below 6.5, or an accepted equivalent",
    },
    careerOutcomes: ["In-house legal roles", "International firms and chambers", "Compliance", "Doctoral research"],
    relatedCareers: ["solicitor"],
    universities: ["example-riverside", "example-kingsford", "example-castleton"],
    destination: "UK",
  },
  {
    id: "msc-public-health",
    title: "Public Health",
    qualification: "MSc",
    subject: "Health",
    level: "Postgraduate",
    durationYears: 1,
    placement: false,
    overview:
      "Health at the level of populations rather than patients — how disease is measured across a community, what changes its distribution, and how policy and programmes are designed and evaluated.",
    whatYouStudy:
      "Epidemiology and biostatistics form the technical core, alongside health policy, health promotion and global health, followed by a dissertation using real or published datasets.",
    modules: [
      { year: "Semester 1", items: ["Epidemiology", "Biostatistics", "Health policy and systems", "Research methods"] },
      { year: "Semester 2", items: ["Health promotion", "Global health", "Health economics", "Specialist option"] },
      { year: "Summer", items: ["Dissertation"] },
    ],
    skills: ["Epidemiology", "Statistical analysis", "Policy analysis", "Programme evaluation", "Scientific writing"],
    entry: {
      academic: "A 2:2 or 2:1 bachelors degree in health, life sciences, social sciences or a related subject",
      subjects: "Health or quantitative background preferred; clinical qualifications welcomed",
      english: "IELTS 6.5 overall with no component below 6.0, or an accepted equivalent",
    },
    careerOutcomes: ["Public health analysis", "Health policy and commissioning", "NGO and global health roles", "Doctoral research"],
    relatedCareers: ["doctor", "nurse", "psychologist"],
    universities: ["example-riverside", "example-harbourside"],
    destination: "UK",
  },
  {
    id: "msc-engineering-management",
    title: "Engineering Management",
    qualification: "MSc",
    subject: "Engineering",
    level: "Postgraduate",
    durationYears: 1,
    placement: true,
    overview:
      "The bridge between an engineering degree and running the projects, budgets and teams that deliver engineering work. Aimed at engineers who want to lead rather than specialise further technically.",
    whatYouStudy:
      "Project and operations management, engineering economics, quality and risk, taught with the assumption that you already understand the technical work being managed.",
    modules: [
      { year: "Semester 1", items: ["Project management", "Engineering economics", "Operations and quality", "Research methods"] },
      { year: "Semester 2", items: ["Risk and safety management", "Supply chain and procurement", "Leading technical teams", "Specialist option"] },
      { year: "Summer", items: ["Dissertation or industry project"] },
    ],
    skills: ["Project planning", "Budgeting", "Risk management", "Stakeholder communication", "Process improvement"],
    entry: {
      academic: "A 2:2 or 2:1 bachelors degree in engineering, technology or a related subject",
      subjects: "An engineering or technical background is required",
      english: "IELTS 6.5 overall with no component below 6.0, or an accepted equivalent",
    },
    careerOutcomes: ["Project and programme management", "Operations management", "Technical consultancy", "Site and contract management"],
    relatedCareers: ["civil-engineer", "mechanical-engineer", "management-consultant"],
    universities: ["example-northgate", "example-metropolitan"],
    destination: "UK",
  },
];

export function getCourse(id: string) {
  return courses.find((course) => course.id === id);
}

/** "3 years", "1 year" — the catalogue now holds one-year masters and top-ups. */
export function durationLabel(years: number) {
  return `${years} ${years === 1 ? "year" : "years"}`;
}

/** The levels that belong to a study route, or every level when none is set. */
export function coursesInRoute(id: StudyRouteId | null | undefined) {
  const route = studyRoute(id);
  if (!route) return courses;

  return courses.filter((course) => route.levels.includes(course.level));
}
