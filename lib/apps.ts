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
    url: "agendex.hugofmiranda.com",
    href: "https://agendex.hugofmiranda.com",
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
        href: "https://bbo.hugofmiranda.com",
        url: "bbo.hugofmiranda.com",
        demo: { email: "demo@bbo.test", password: "DemoPass123!" },
      },
    ],
  },
  {
    id: "falcon-tools",
    name: "Falcon Tools",
    url: "tools.hugofmiranda.com",
    href: "https://tools.hugofmiranda.com",
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
    url: "playground.hugofmiranda.com",
    href: "https://playground.hugofmiranda.com",
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
    url: "food.hugofmiranda.com",
    href: "https://food.hugofmiranda.com",
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
    url: "casefile.hugofmiranda.com",
    href: "https://casefile.hugofmiranda.com",
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
    name: "AniCal - anime calendar",
    url: "anime-calendar.net",
    href: "https://anime-calendar.net",
    hosted: true,
    description:
      "Track your seasonal anime lineup with a weekly calendar view. See airing schedules, mark episodes watched, and never lose track of the current season.",
    tags: ["Laravel", "PHP 8.4", "React", "Inertia.js", "TypeScript", "SQLite", "Tailwind"],
    colors: {
      bgLight: "linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%)",
      bgDark: "linear-gradient(135deg, #2e1065 0%, #4a044e 100%)",
      accent: "#a855f7",
    },
    environments: [
      {
        label: "Live",
        href: "https://anime-calendar.net",
        url: "anime-calendar.net",
      },
      {
        label: "Demo",
        href: "https://anime-calendar.hugofmiranda.com",
        url: "anime-calendar.hugofmiranda.com",
      },
    ],
  },
  {
    id: "gatherroll",
    name: "GatherRoll",
    url: "github.com/HugoFMiranda/gatherroll",
    hosted: false,
    status: "Mobile app — pre-launch",
    description:
      "Private shared camera roll for events. Guests join an album via link or QR code and every photo appears for everyone in near-real time.",
    tags: ["Expo", "React Native", "TypeScript", "Supabase", "Postgres"],
    repo: "https://github.com/HugoFMiranda/gatherroll",
    colors: {
      bgLight: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
      bgDark: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
      accent: "#4f46e5",
    },
  },
  {
    id: "pawtine",
    name: "Pawtine",
    url: "github.com/HugoFMiranda/pawtine",
    hosted: false,
    status: "Mobile app — pre-launch",
    description:
      "Local-first daily pet-care tracker for medicine, meals, water, walks, and mood. No backend, no account, no ads.",
    tags: ["Expo", "React Native", "TypeScript", "SQLite", "Drizzle"],
    repo: "https://github.com/HugoFMiranda/pawtine",
    colors: {
      bgLight: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
      bgDark: "linear-gradient(135deg, #451a03 0%, #78350f 100%)",
      accent: "#92400e",
    },
  },
  {
    id: "plura-post",
    name: "PluraPost",
    url: "github.com/HugoFMiranda/plura-post",
    hosted: false,
    status: "Not yet deployed",
    description:
      "Cross-platform content operations for creators and small brands. Write once, adapt per platform, and publish through a delivery pipeline that retries safely and never fails silently.",
    tags: ["Laravel", "PHP 8.4", "React", "Inertia.js", "TypeScript", "Postgres", "Redis"],
    repo: "https://github.com/HugoFMiranda/plura-post",
    colors: {
      bgLight: "linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)",
      bgDark: "linear-gradient(135deg, #083344 0%, #164e63 100%)",
      accent: "#0891b2",
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
