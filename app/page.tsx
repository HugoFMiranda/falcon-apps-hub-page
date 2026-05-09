"use client";

import { useEffect, useRef, useState } from "react";
import { Moon, Sun, Copy, Check, Eye, EyeOff, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const THEME_KEY = "falcon-hub-theme";

interface EnvLink {
  label: string;
  href: string;
  url: string;
  demo?: { email: string; password: string };
}

interface AppDef {
  id: string;
  name: string;
  url: string;
  href: string;
  description: string;
  tags: string[];
  colors: { bgLight: string; bgDark: string; accent: string };
  environments?: EnvLink[];
}

const APPS: AppDef[] = [
  {
    id: "falcon-tools",
    name: "Falcon Tools",
    url: "tools.falcon-apps.duckdns.org",
    href: "https://tools.falcon-apps.duckdns.org",
    description:
      "Browser-based PDF utility suite. Reorder, merge, and compress PDFs — no data leaves your browser.",
    tags: ["PHP", "Vanilla JS", "QPDF", "Nginx"],
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
    description:
      "Interactive visualizer with step-by-step playback for sorting, graph traversal, and pathfinding algorithms.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Zustand", "Framer Motion"],
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
    description:
      "Find foods with identical nutritional profiles to swap ingredients without changing your macro targets.",
    tags: ["Next.js", "TypeScript", "SQLite", "Prisma", "tRPC", "Bun"],
    colors: {
      bgLight: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
      bgDark: "linear-gradient(135deg, #052e16 0%, #14532d 100%)",
      accent: "#16a34a",
    },
  },
  {
    id: "broke-but-optimistic",
    name: "Broke But Optimistic",
    url: "unbroke-finances.vercel.app",
    href: "https://unbroke-finances.vercel.app/",
    description:
      "Personal finance workspace for tracking activity, planning commitments, managing debt payoff, and monitoring cash flow — all in one authenticated app.",
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
        href: "https://demo-bbo.falcon-apps.duckdns.org",
        url: "demo-bbo.falcon-apps.duckdns.org",
        demo: { email: "demo@bbo.test", password: "DemoPass123!" },
      },
    ],
  },
];

function AppMockup({ id, accent }: { id: string; accent: string }) {
  if (id === "falcon-tools") {
    return (
      <svg viewBox="0 0 200 120" className="w-full h-full" aria-hidden>
        <rect x="65" y="8" width="70" height="90" rx="4" fill="white" fillOpacity="0.9" />
        <polygon points="115,8 135,28 115,28" fill="#e5e7eb" />
        <rect x="75" y="35" width="45" height="3" rx="1.5" fill="#d1d5db" />
        <rect x="75" y="44" width="36" height="3" rx="1.5" fill="#d1d5db" />
        <rect x="75" y="53" width="42" height="3" rx="1.5" fill="#d1d5db" />
        <rect x="75" y="62" width="30" height="3" rx="1.5" fill="#d1d5db" />
        <rect x="75" y="74" width="28" height="14" rx="3" fill={accent} fillOpacity="0.9" />
        <text x="89" y="84" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">PDF</text>
      </svg>
    );
  }

  if (id === "algorithm-playground") {
    return (
      <svg viewBox="0 0 200 120" className="w-full h-full" aria-hidden>
        <line x1="50" y1="60" x2="100" y2="30" stroke={accent} strokeWidth="1.5" strokeOpacity="0.5" />
        <line x1="100" y1="30" x2="150" y2="60" stroke={accent} strokeWidth="1.5" strokeOpacity="0.5" />
        <line x1="50" y1="60" x2="100" y2="90" stroke={accent} strokeWidth="1.5" strokeOpacity="0.5" />
        <line x1="150" y1="60" x2="100" y2="90" stroke={accent} strokeWidth="1.5" strokeOpacity="0.5" />
        <line x1="100" y1="30" x2="100" y2="90" stroke={accent} strokeWidth="1" strokeOpacity="0.25" strokeDasharray="4 3" />
        <circle cx="50" cy="60" r="13" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.5" strokeOpacity="0.6" />
        <circle cx="150" cy="60" r="13" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.5" strokeOpacity="0.6" />
        <circle cx="100" cy="90" r="13" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.5" strokeOpacity="0.6" />
        <circle cx="100" cy="30" r="13" fill={accent} fillOpacity="0.9" />
        <text x="100" y="34" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">A*</text>
        <text x="50" y="64" textAnchor="middle" fill={accent} fontSize="9" fontWeight="600">B</text>
        <text x="150" y="64" textAnchor="middle" fill={accent} fontSize="9" fontWeight="600">C</text>
        <text x="100" y="94" textAnchor="middle" fill={accent} fontSize="9" fontWeight="600">D</text>
      </svg>
    );
  }

  if (id === "food-twin") {
    return (
      <svg viewBox="0 0 200 120" className="w-full h-full" aria-hidden>
        <rect x="18" y="12" width="164" height="20" rx="10" fill="white" fillOpacity="0.75" />
        <circle cx="32" cy="22" r="5.5" fill="none" stroke="#9ca3af" strokeWidth="1.5" />
        <line x1="36" y1="27" x2="40" y2="31" stroke="#9ca3af" strokeWidth="1.5" />
        <text x="50" y="26" fill="#9ca3af" fontSize="8.5">Search a food...</text>
        <text x="18" y="52" fill={accent} fontSize="8" fillOpacity="0.9">Protein</text>
        <rect x="58" y="44" width="90" height="7" rx="3.5" fill="white" fillOpacity="0.2" />
        <rect x="58" y="44" width="68" height="7" rx="3.5" fill={accent} fillOpacity="0.75" />
        <text x="18" y="70" fill={accent} fontSize="8" fillOpacity="0.9">Carbs</text>
        <rect x="58" y="62" width="90" height="7" rx="3.5" fill="white" fillOpacity="0.2" />
        <rect x="58" y="62" width="38" height="7" rx="3.5" fill={accent} fillOpacity="0.75" />
        <text x="18" y="88" fill={accent} fontSize="8" fillOpacity="0.9">Fat</text>
        <rect x="58" y="80" width="90" height="7" rx="3.5" fill="white" fillOpacity="0.2" />
        <rect x="58" y="80" width="52" height="7" rx="3.5" fill={accent} fillOpacity="0.75" />
      </svg>
    );
  }

  if (id === "broke-but-optimistic") {
    return (
      <svg viewBox="0 0 200 120" className="w-full h-full" aria-hidden>
        <rect x="18" y="10" width="164" height="100" rx="6" fill="white" fillOpacity="0.08" />
        <rect x="28" y="20" width="60" height="28" rx="4" fill={accent} fillOpacity="0.18" />
        <text x="58" y="31" textAnchor="middle" fill={accent} fontSize="7" fontWeight="600" fillOpacity="0.9">Balance</text>
        <text x="58" y="42" textAnchor="middle" fill={accent} fontSize="9" fontWeight="700">$4,200</text>
        <rect x="112" y="20" width="60" height="28" rx="4" fill={accent} fillOpacity="0.1" />
        <text x="142" y="31" textAnchor="middle" fill={accent} fontSize="7" fontWeight="600" fillOpacity="0.9">Debt</text>
        <text x="142" y="42" textAnchor="middle" fill={accent} fontSize="9" fontWeight="700">$1,850</text>
        <rect x="28" y="56" width="144" height="4" rx="2" fill="white" fillOpacity="0.12" />
        <rect x="28" y="56" width="90" height="4" rx="2" fill={accent} fillOpacity="0.7" />
        <text x="28" y="72" fill={accent} fontSize="7" fillOpacity="0.7">Transactions</text>
        <rect x="28" y="77" width="80" height="3" rx="1.5" fill="white" fillOpacity="0.2" />
        <rect x="28" y="84" width="110" height="3" rx="1.5" fill="white" fillOpacity="0.15" />
        <rect x="28" y="91" width="65" height="3" rx="1.5" fill="white" fillOpacity="0.2" />
        <rect x="28" y="98" width="95" height="3" rx="1.5" fill="white" fillOpacity="0.15" />
        <circle cx="160" cy="80" r="16" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
        <text x="160" y="78" textAnchor="middle" fill={accent} fontSize="7" fontWeight="600">+12%</text>
        <text x="160" y="87" textAnchor="middle" fill={accent} fontSize="6" fillOpacity="0.7">savings</text>
      </svg>
    );
  }

  return null;
}

function DemoModal({
  env,
  appName,
  onClose,
}: {
  env: EnvLink;
  appName: string;
  onClose: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState<"email" | "password" | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function copy(text: string, field: "email" | "password") {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  }

  const creds = env.demo!;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-sm mx-4 bg-background border border-border rounded-xl shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          aria-label="Close"
        >
          <X className="size-4" />
        </button>

        <h3 className="font-semibold text-base leading-snug pr-8">{appName}</h3>
        <p className="text-sm text-muted-foreground mt-0.5 mb-5">
          Use these credentials to explore the demo.
        </p>

        <div className="space-y-3">
          <div>
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-1">
              Email
            </p>
            <div className="flex items-center gap-2 bg-muted/60 rounded-lg px-3 py-2.5">
              <span className="flex-1 text-sm font-mono select-all">{creds.email}</span>
              <button
                onClick={() => copy(creds.email, "email")}
                className="shrink-0 p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Copy email"
              >
                {copied === "email" ? (
                  <Check className="size-3.5 text-green-500" />
                ) : (
                  <Copy className="size-3.5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-1">
              Password
            </p>
            <div className="flex items-center gap-2 bg-muted/60 rounded-lg px-3 py-2.5">
              <span className="flex-1 text-sm font-mono select-all tracking-wider">
                {showPassword ? creds.password : "•".repeat(creds.password.length)}
              </span>
              <button
                onClick={() => setShowPassword((v) => !v)}
                className="shrink-0 p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
              </button>
              <button
                onClick={() => copy(creds.password, "password")}
                className="shrink-0 p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Copy password"
              >
                {copied === "password" ? (
                  <Check className="size-3.5 text-green-500" />
                ) : (
                  <Copy className="size-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>

        <a
          href={env.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ size: "sm" }), "w-full justify-center mt-5")}
          onClick={onClose}
        >
          Open Demo →
        </a>
      </div>
    </div>
  );
}

export default function HubPage() {
  const [isDark, setIsDark] = useState(false);
  const [demoModal, setDemoModal] = useState<{ env: EnvLink; appName: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(saved ? saved === "dark" : prefersDark);
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.style.colorScheme = next ? "dark" : "light";
    localStorage.setItem(THEME_KEY, next ? "dark" : "light");
  }

  function openDemo(env: EnvLink, appName: string) {
    setDemoModal({ env, appName });
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border/60 bg-background/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <span className="font-semibold tracking-tight">Falcon Apps</span>
          <div className="flex items-center gap-1">
            <a
              href="https://github.com/HugoFMiranda"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>
              <span className="hidden sm:inline">HugoFMiranda</span>
            </a>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
          </div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-balance mb-3">
          A collection of personal apps
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto">
          Tools and experiments built for learning, productivity, and fun.
        </p>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {APPS.map((app) => (
            <Card key={app.id} className="overflow-hidden flex flex-col p-0 gap-0">
              <div className="border-b border-border/60">
                <div className="bg-muted/60 px-3 py-2 flex items-center gap-2 border-b border-border/40">
                  <div className="flex gap-1.5 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                  </div>
                  <div className="flex-1 min-w-0 bg-background/50 rounded px-2 py-0.5 text-[10px] text-muted-foreground font-mono truncate">
                    {app.url}
                  </div>
                </div>
                <div
                  className="h-36 p-3"
                  style={{ background: isDark ? app.colors.bgDark : app.colors.bgLight }}
                >
                  <AppMockup id={app.id} accent={app.colors.accent} />
                </div>
              </div>

              <div className="flex flex-col flex-1 p-5 gap-4">
                <div className="space-y-1.5">
                  <h2 className="font-semibold text-base leading-snug">{app.name}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">{app.description}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {app.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="rounded-full text-[11px] px-2.5 py-0.5 font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="px-5 pb-5">
                {app.environments ? (
                  <div className="flex gap-2">
                    {app.environments.map((env) =>
                      env.demo ? (
                        <button
                          key={env.label}
                          onClick={() => openDemo(env, app.name)}
                          className={cn(
                            buttonVariants({ size: "sm", variant: "outline" }),
                            "flex-1 justify-center"
                          )}
                        >
                          {env.label} →
                        </button>
                      ) : (
                        <a
                          key={env.label}
                          href={env.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(buttonVariants({ size: "sm" }), "flex-1 justify-center")}
                        >
                          {env.label} →
                        </a>
                      )
                    )}
                  </div>
                ) : (
                  <a
                    href={app.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ size: "sm" }), "w-full justify-center")}
                  >
                    Go to app →
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      </main>

      <footer className="border-t border-border/60 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <span>More apps coming soon.</span>
          <a
            href="https://github.com/HugoFMiranda"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            github.com/HugoFMiranda
          </a>
        </div>
      </footer>

      {demoModal && (
        <DemoModal
          env={demoModal.env}
          appName={demoModal.appName}
          onClose={() => setDemoModal(null)}
        />
      )}
    </div>
  );
}
