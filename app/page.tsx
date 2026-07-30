"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { APPS, type EnvLink } from "@/lib/apps";
import AppMockup from "@/components/app-mockup";
import DemoModal from "@/components/demo-modal";

const THEME_KEY = "falcon-hub-theme";

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
                  {app.hosted ? (
                    <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-medium text-green-600 dark:text-green-400">
                      <span className="relative flex size-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-green-500" />
                      </span>
                      Live
                    </span>
                  ) : (
                    <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground">
                      <span className="size-1.5 rounded-full bg-muted-foreground/50 inline-block" />
                      Local
                    </span>
                  )}
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

              {(app.environments || app.href) && (
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
              )}
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
