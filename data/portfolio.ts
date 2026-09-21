export const profile = {
  name: "Mahmoud Wageeh",
  role: "Software Engineer",
  location: "Cairo, Egypt",
  email: "mahmooudwageeh@gmail.com",
  phone: "+20 110 010 1587",
  github: "https://github.com/mahmoudwageeh2002",
  linkedin: "https://www.linkedin.com/in/maahmooudwageh-32mahmoud23/",
  summary: "I build production mobile and web products with React Native and React—turning complex service flows into fast, resilient experiences across iOS, Android, and the web.",
};

export const stats = [
  { value: "100K+", label: "users served" },
  { value: "5", label: "countries reached" },
  { value: "40%", label: "faster app startup" },
  { value: "50%", label: "smaller bundle" },
];

export const experiences = [
  {
    period: "Mar 2026 — Present",
    role: "Software Engineer",
    company: "Tech Horizons Venture",
    project: "Premium Guest Services (PGS)",
    highlights: [
      "Designed a provider-agnostic Adapter architecture that normalizes multi-provider data, reduces UI coupling, and isolates provider failures.",
      "Cut processing overhead and improved service performance by 20% while making integrations easier to extend.",
      "Delivered cleaning, food, and tours flows across web, iOS, and Android and maintained reliable third-party communication.",
    ],
  },
  {
    period: "Jul 2025 — Feb 2026",
    role: "React Native Developer",
    company: "Codid",
    project: "BuildUp Egypt & StudBook",
    highlights: [
      "Led a React Native refactor that produced 37% faster startup and nearly 40% better overall performance across iOS and Android.",
      "Reduced bundle size by 30% in BuildUp and 50% in StudBook through profiling, dependency cleanup, and code optimization.",
      "Modernized both apps with React Native's new architecture, upgraded dependencies, accessible components, and user-led interface improvements.",
    ],
  },
  {
    period: "Oct 2024 — Aug 2025",
    role: "Front End Developer",
    company: "Almotahida Education Group",
    project: "Tebian LMS",
    highlights: [
      "Built production React features for an LMS serving more than 100,000 users across five countries.",
      "Reduced page load time by 30% and implemented role-based access for eight roles through a centralized admin experience.",
      "Delivered responsive, WCAG-conscious interfaces that improved usability across screen sizes and user needs.",
    ],
  },
];

export const skillGroups = [
  { title: "Mobile & Frontend", skills: ["React Native", "React", "Next.js", "Expo", "Tailwind CSS", "React Navigation"] },
  { title: "State & Data", skills: ["React Query", "Redux Toolkit", "REST APIs", "WebSockets", "JWT"] },
  { title: "Architecture", skills: ["Clean Architecture", "SOLID", "Adapter Pattern", "Performance", "Accessibility"] },
  { title: "Languages", skills: ["TypeScript", "JavaScript", "C++", "Java"] },
  { title: "Engineering", skills: ["Git", "OOP", "Data Structures", "Algorithms", "ECPC"] },
  { title: "Current Exploration", skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "AI Workflows"] },
];

export const projects = [
  {
    index: "01", title: "Premium Guest Services", type: "Hospitality platform", year: "2026",
    description: "A multi-provider hospitality platform for KSA, connecting guest-facing service flows with external hotel systems across mobile and web.",
    metric: "20%", metricLabel: "service performance gain",
    tags: ["React Native", "React", "TypeScript", "Adapter Pattern"], accent: "#2f5cff", links: [],
  },
  {
    index: "02", title: "BuildUp Egypt", type: "Construction marketplace", year: "2025",
    description: "A cross-platform product refactored around clearer boundaries, reusable UI, accessibility, and measurable runtime performance.",
    metric: "37%", metricLabel: "faster startup",
    tags: ["React Native", "iOS", "Android", "Profiling"], accent: "#ff6542",
    links: [
      { label: "App Store", href: "https://apps.apple.com/eg/app/build-up-egypt/id6741387343" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.xinity.circle" },
    ],
  },
  {
    index: "03", title: "StudBook", type: "Horse management", year: "2025",
    description: "A management app for horses, owners, and operations—modernized with the React Native new architecture and feedback-driven user flows.",
    metric: "50%", metricLabel: "smaller app bundle",
    tags: ["React Native", "New Architecture", "UX", "Performance"], accent: "#9a62ff",
    links: [
      { label: "App Store", href: "https://apps.apple.com/eg/app/studbook/id6670400746" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.codid.studbook&pcampaignid=web_share" },
    ],
  },
  {
    index: "04", title: "Tebian LMS", type: "Education platform", year: "2024–25",
    description: "A large-scale learning platform with responsive experiences, accessible interaction patterns, and centralized permissions for eight user roles.",
    metric: "100K+", metricLabel: "users across five countries",
    tags: ["React", "RBAC", "WCAG", "Performance"], accent: "#009b77",
    links: [{ label: "Visit platform", href: "https://tebian.app/school/login" }],
  },
];
