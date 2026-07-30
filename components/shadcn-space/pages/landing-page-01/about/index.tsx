const experience = [
  { role: "Senior Full Stack Developer", org: "Roboyo", period: "Apr 2025 — Present" },
  { role: "Full Stack Developer", org: "Roboyo", period: "Jul 2023 — Apr 2025" },
  { role: "Full Stack Developer (intern)", org: "Roboyo", period: "Apr 2023 — Jun 2023" },
  { role: "IT Technician Intern / Junior Developer", org: "Capgemini", period: "Jan 2018 — Jun 2018" },
];

const education = [
  {
    degree: "Master's, Computer Software Engineering",
    school: "Instituto Superior de Engenharia do Porto",
    period: "2023 — 2024",
    completed: false,
  },
  {
    degree: "Bachelor's, Systems Engineering",
    school: "Instituto Superior de Engenharia do Porto",
    period: "2020 — 2023",
    completed: true,
  },
  {
    degree: "CTeSP, Computer Networks and Systems",
    school: "ISLA — Instituto Politécnico de Gestão e Tecnologia",
    period: "2018 — 2020",
    completed: true,
  },
  {
    degree: "Vocational Secondary, IT Equipment Management",
    school: "Escola Profissional de Gaia",
    period: "2015 — 2018",
    completed: true,
  },
];

const certifications = [
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

const skills = [
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

export default function About() {
  return (
    <section id="about">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
        <div className="border-x border-border px-5 md:px-8 py-8 lg:py-16 flex flex-col gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground m-1.5" />
            <span className="text-base font-normal text-muted-foreground">About</span>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold text-foreground">
            Who I am.
          </h2>
        </div>
      </div>

      <div className="border-y border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
          <div className="border-x border-border p-6 lg:p-10 flex flex-col gap-6">
            <p className="text-lg text-muted-foreground">
              Software developer focused on building reliable, maintainable
              production web applications. I work mainly with Laravel, React and
              Inertia across backend development, APIs, frontend implementation,
              debugging, refactoring, deployment support and system maintenance.
              I&apos;m also deep into AI-powered development — agents, MCP, and
              building with the tooling around them.
            </p>
            <p className="text-lg text-muted-foreground">
              I&apos;m trusted with work that needs ownership: planning features,
              coordinating tasks, reviewing code, supporting other developers, solving
              production issues, and delivering clean, practical solutions without
              unnecessary technical debt. I care about software that works in the real
              world — secure, understandable, maintainable, and easy for teams to improve.
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-border px-3 py-1 text-sm text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
          <div className="border-x border-border grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 lg:p-10 flex flex-col gap-6 border-b md:border-b-0 md:border-r border-border">
              <p className="text-base text-muted-foreground">Experience</p>
              {experience.map((job) => (
                <div key={`${job.org}-${job.period}`} className="flex flex-col gap-0.5">
                  <p className="text-lg font-medium text-foreground">{job.role}</p>
                  <p className="text-sm text-muted-foreground">
                    {job.org} · {job.period}
                  </p>
                </div>
              ))}
            </div>
            <div className="p-6 lg:p-10 flex flex-col gap-6">
              <p className="text-base text-muted-foreground">Education</p>
              {education.map((edu) => (
                <div key={edu.degree} className="flex flex-col gap-0.5">
                  <p className="text-lg font-medium text-foreground">
                    {edu.degree}
                    {!edu.completed && (
                      <span className="ml-2 rounded-full border border-border px-2 py-0.5 text-xs font-normal text-muted-foreground align-middle">
                        not completed
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {edu.school} · {edu.period}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
        <div className="border-x border-border p-6 lg:p-10 flex flex-col gap-4">
          <p className="text-base text-muted-foreground">Certifications</p>
          {certifications.map((group) => (
            <details key={group.issuer} className="group border-b border-border pb-3 last:border-b-0">
              <summary className="flex cursor-pointer items-center justify-between text-lg font-medium text-foreground marker:content-['']">
                <span>
                  {group.issuer}
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    {group.items.length} certificates
                  </span>
                </span>
                <span className="text-muted-foreground transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <ul className="mt-3 flex flex-col gap-2">
                {group.items.map((cert) => (
                  <li
                    key={cert.name}
                    className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1"
                  >
                    <span className="text-base text-foreground">{cert.name}</span>
                    <span className="text-sm text-muted-foreground">{cert.date}</span>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
