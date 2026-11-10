import { APPS, type AppDef } from "@/lib/apps";
import {
  SITE_DESCRIPTION,
  SITE_URL,
  about,
  certifications,
  education,
  experience,
  person,
  skills,
} from "@/lib/profile";

// /llms.txt follows the llmstxt.org layout: H1, blockquote summary, then H2
// sections of links. /llms-full.txt inlines everything an assistant would need
// to answer questions about Hugo without fetching the page.

function projectLine(app: AppDef, full: boolean): string {
  const link = app.href ?? app.repo ?? `https://${app.url}`;
  const extras: string[] = [];
  if (app.status) extras.push(app.status);
  // Demo credentials stay on the page; only the URLs go here.
  for (const env of app.environments ?? []) {
    if (env.href !== link) extras.push(`${env.label.toLowerCase()}: ${env.href}`);
  }
  if (full) {
    extras.push(`stack: ${app.tags.join(", ")}`);
    extras.push(app.repo ? `source: ${app.repo}` : "source: private");
  }
  const suffix = extras.length ? ` (${extras.join("; ")})` : "";
  return `- [${app.name}](${link}): ${app.description}${suffix}`;
}

export function buildLlmsTxt({ full }: { full: boolean }): string {
  const live = APPS.filter((app) => app.hosted);
  const other = APPS.filter((app) => !app.hosted);

  const lines = [
    `# ${person.name}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    `${person.name} is a ${person.jobTitle} at ${person.employer}, based in ${person.city}, ${person.country}. Skills: ${skills.join(", ")}.`,
    "",
  ];

  if (full) {
    lines.push("## About", "", ...about.flatMap((paragraph) => [paragraph, ""]));
    lines.push(
      "## Experience",
      "",
      ...experience.map((job) => `- ${job.role}, ${job.org} (${job.period})`),
      "",
      "## Education",
      "",
      ...education.map(
        (edu) => `- ${edu.degree}, ${edu.school} (${edu.period}${edu.completed ? "" : ", not completed"})`,
      ),
      "",
      "## Certifications",
      "",
      ...certifications.flatMap((group) =>
        group.items.map((item) => `- ${item.name}, ${group.issuer} (${item.date})`),
      ),
      "",
      "## Skills",
      "",
      skills.join(", "),
      "",
    );
  }

  lines.push(
    "## Profile",
    "",
    `- [Portfolio](${SITE_URL}/): about, experience, education, projects and contact`,
    ...(full ? [] : [`- [Full profile](${SITE_URL}/llms-full.txt): experience, education, certifications and project stacks in one file`]),
    `- [GitHub](${person.github}): public repositories`,
    "",
    "## Live projects",
    "",
    ...live.map((app) => projectLine(app, full)),
    "",
    "## Mobile and in-development projects",
    "",
    ...other.map((app) => projectLine(app, full)),
    "",
    "## Contact",
    "",
    `- [Email](mailto:${person.email}): ${person.email}`,
    `- [GitHub](${person.github})`,
    "",
  );

  return lines.join("\n");
}

export function llmsResponse(body: string): Response {
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
