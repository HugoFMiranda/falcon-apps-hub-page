export interface EnvLink {
  label: string;
  href: string;
  url: string;
  demo?: { email: string; password: string };
}

export interface AppDef {
  id: string;
  name: string;
  url: string;
  href?: string;
  hosted: boolean;
  /** Overrides the default hosted/local status label (e.g. "Android app"). */
  status?: string;
  description: string;
  tags: string[];
  /** Public GitHub repo URL. Absent means the source is private. */
  repo?: string;
  colors: { bgLight: string; bgDark: string; accent: string };
  environments?: EnvLink[];
}

export const APPS: AppDef[] = [
  {
    id: "agendex",
    name: "Agendex",
    url: "agendex.falcon-apps.duckdns.org",
    href: "https://agendex.falcon-apps.duckdns.org",
    hosted: true,
    description:
      "Appointment scheduling and clinic management SaaS. Multi-tenant, multi-location, with public booking pages and a live appointment queue.",
    tags: ["Laravel", "PHP 8.4", "React", "Inertia.js", "TypeScript", "SQLite", "Tailwind"],
    colors: {
      bgLight: "linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)",
      bgDark: "linear-gradient(135deg, #042f2e 0%, #134e4a 100%)",
      accent: "#0d9488",
    },
  },
  {
    id: "broke-but-optimistic",
    name: "Broke But Optimistic",
    url: "unbroke-finances.vercel.app",
    href: "https://unbroke-finances.vercel.app/",
    hosted: true,
    description:
      "Personal finance workspace for tracking activity, planning commitments, managing debt payoff, and monitoring cash flow, all in one authenticated app.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "NextAuth"],
    colors: {
      bgLight: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
      bgDark: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
      accent: "#2563eb",
    },
    environments: [
      {
        label: "Live",
        href: "https://unbroke-finances.vercel.app/",
        url: "unbroke-finances.vercel.app",
      },
      {
        label: "Demo",
        href: "https://bbo.falcon-apps.duckdns.org",
        url: "bbo.falcon-apps.duckdns.org",
        demo: { email: "demo@bbo.test", password: "DemoPass123!" },
      },
    ],
  },
  {
    id: "falcon-tools",
    name: "Falcon Tools",
    url: "tools.falcon-apps.duckdns.org",
    href: "https://tools.falcon-apps.duckdns.org",
    hosted: true,
    description:
      "Browser-based PDF utility suite. Reorder, merge, and compress PDFs. No data leaves your browser.",
    tags: ["PHP", "Vanilla JS", "QPDF", "Nginx"],
    repo: "https://github.com/HugoFMiranda/falcon-tools",
    colors: {
      bgLight: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
      bgDark: "linear-gradient(135deg, #431407 0%, #7c2d12 100%)",
      accent: "#ea580c",
    },
  },
  {
    id: "algorithm-playground",
    name: "Algorithm Playground",
    url: "playground.falcon-apps.duckdns.org",
    href: "https://playground.falcon-apps.duckdns.org",
    hosted: true,
    description:
      "Interactive visualizer with step-by-step playback for sorting, graph traversal, and pathfinding algorithms.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Zustand", "Framer Motion"],
    repo: "https://github.com/HugoFMiranda/algorithm-playground",
    colors: {
      bgLight: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)",
      bgDark: "linear-gradient(135deg, #1e1b4b 0%, #2e1065 100%)",
      accent: "#7c3aed",
    },
  },
  {
    id: "food-twin",
    name: "Food Twin",
    url: "food.falcon-apps.duckdns.org",
    href: "https://food.falcon-apps.duckdns.org",
    hosted: true,
    description:
      "Find foods with identical nutritional profiles to swap ingredients without changing your macro targets.",
    tags: ["Next.js", "TypeScript", "SQLite", "Prisma", "tRPC", "Bun"],
    repo: "https://github.com/HugoFMiranda/food-twin",
    colors: {
      bgLight: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
      bgDark: "linear-gradient(135deg, #052e16 0%, #14532d 100%)",
      accent: "#16a34a",
    },
  },
  {
    id: "casefile",
    name: "Casefile",
    url: "casefile.falcon-apps.duckdns.org",
    href: "https://casefile.falcon-apps.duckdns.org",
    hosted: true,
    description:
      "A daily mystery puzzle game. Read the clues, place eight suspects on a manor floor plan, and identify the killer. A new case every day.",
    tags: ["Laravel", "PHP 8.4", "React", "Inertia.js", "TypeScript", "SQLite", "Tailwind"],
    colors: {
      bgLight: "linear-gradient(135deg, #fafaf9 0%, #e7e5e4 100%)",
      bgDark: "linear-gradient(135deg, #1c1917 0%, #292524 100%)",
      accent: "#d97706",
    },
  },
  {
    id: "anime-calendar",
    name: "AniCal",
    url: "anime-calendar.falcon-apps.duckdns.org",
    href: "https://anime-calendar.falcon-apps.duckdns.org",
    hosted: true,
    description:
      "Track your seasonal anime lineup with a weekly calendar view. See airing schedules, mark episodes watched, and never lose track of the current season.",
    tags: ["Laravel", "PHP 8.4", "React", "Inertia.js", "TypeScript", "SQLite", "Tailwind"],
    colors: {
      bgLight: "linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%)",
      bgDark: "linear-gradient(135deg, #2e1065 0%, #4a044e 100%)",
      accent: "#a855f7",
    },
  },
  {
    id: "yomu",
    name: "Yomu",
    url: "github.com/HugoFMiranda/yomu",
    hosted: false,
    status: "Android app",
    description:
      "A manga reader for Android. It is compatible with Mihon extensions, so any source you already use keeps working once you install it.",
    tags: ["Kotlin", "Android", "Jetpack Compose", "Mihon extensions"],
    repo: "https://github.com/HugoFMiranda/yomu",
    colors: {
      bgLight: "linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)",
      bgDark: "linear-gradient(135deg, #4c0519 0%, #881337 100%)",
      accent: "#e11d48",
    },
  },
];
