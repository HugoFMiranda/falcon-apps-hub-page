// Single source for profile facts. Rendered by the About/Contact sections and
// reused by the JSON-LD in app/page.tsx and the /llms.txt routes, so the
// machine-readable copies can't drift from what the page says.

export const SITE_URL = "https://hugofmiranda.com";
export const SITE_TITLE = "Hugo Miranda | Senior Full Stack Developer";
export const SITE_DESCRIPTION =
  "Senior full stack developer in Porto, Portugal, building production web apps with Laravel, React and Next.js. Projects, experience and contact.";

export const person = {
  name: "Hugo Miranda",
  jobTitle: "Senior Full Stack Developer",
  employer: "Roboyo",
  city: "Porto",
  country: "Portugal",
  countryCode: "PT",
  // Cloudflare Email Routing forwards this to the personal inbox; keep the
  // inbox address itself off the site.
  email: "hello@hugofmiranda.com",
  github: "https://github.com/HugoFMiranda",
  avatar: "https://avatars.githubusercontent.com/u/74903598?v=4",
};

export const about = [
  "Software developer focused on building reliable, maintainable production web applications. I work mainly with Laravel, React and Inertia across backend development, APIs, frontend implementation, debugging, refactoring, deployment support and system maintenance. I'm also deep into AI-powered development, including agents, MCP, and building with the tooling around them.",
  "I'm trusted with work that needs ownership: planning features, coordinating tasks, reviewing code, supporting other developers, solving production issues, and delivering clean, practical solutions without unnecessary technical debt. I care about software that works in the real world: secure, understandable, maintainable, and easy for teams to improve.",
];

export const experience = [
  { role: "Senior Full Stack Developer", org: "Roboyo", period: "Apr 2025 to Present" },
  { role: "Full Stack Developer", org: "Roboyo", period: "Jul 2023 to Apr 2025" },
  { role: "Full Stack Developer (intern)", org: "Roboyo", period: "Apr 2023 to Jun 2023" },
  { role: "IT Technician Intern / Junior Developer", org: "Capgemini", period: "Jan 2018 to Jun 2018" },
];

export const education = [
  {
    degree: "Master's, Computer Software Engineering",
    school: "Instituto Superior de Engenharia do Porto",
    period: "2023 to 2024",
    completed: false,
  },
  {
    degree: "Bachelor's, Systems Engineering",
    school: "Instituto Superior de Engenharia do Porto",
    period: "2020 to 2023",
    completed: true,
  },
  {
    degree: "CTeSP, Computer Networks and Systems",
    school: "ISLA, Instituto Politécnico de Gestão e Tecnologia",
    period: "2018 to 2020",
    completed: true,
  },
];

export const certifications = [
  {
    issuer: "Anthropic",
    items: [
      { name: "Model Context Protocol: Advanced Topics", date: "Jun 2026" },
      { name: "Introduction to Model Context Protocol", date: "Jun 2026" },
      { name: "Certificate of completion: Introduction to subagents", date: "Jun 2026" },
      { name: "Certificate of completion: Introduction to agent skills", date: "Apr 2026" },
      { name: "Certificate of completion: Claude Platform 101", date: "Jun 2026" },
      { name: "Claude Code in Action", date: "Jun 2026" },
      { name: "Certificate of completion: Claude Code 101", date: "Jun 2026" },
      { name: "Certificate of completion: Claude 101", date: "Jun 2026" },
      { name: "Building with the Claude API", date: "Jun 2026" },
    ],
  },
  {
    issuer: "Cisco Networking Academy",
    items: [
      { name: "CCNA Routing and Switching: Connecting Networks", date: "Feb 2020" },
      { name: "CCNA Routing and Switching: Routing and Switching Essentials", date: "Jul 2019" },
      { name: "CCNA Routing and Switching: Scaling Networks", date: "Jan 2019" },
      { name: "CCNA Routing and Switching: Introduction to Networks", date: "Jan 2019" },
    ],
  },
];

export const skills = [
  "Laravel",
  "React",
  "Inertia.js",
  "AureliaJS",
  "TypeScript",
  "PHP",
  "Next.js",
  "Network Security",
  "Project Management",
  "AI-Powered Development",
];
