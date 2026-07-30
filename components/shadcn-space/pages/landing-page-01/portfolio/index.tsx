"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { APPS, type AppDef, type EnvLink } from "@/lib/apps";
import AppMockup from "@/components/app-mockup";
import DemoModal from "@/components/demo-modal";
import GithubIcon from "@/components/github-icon";

const Projects = () => {
  const [isDark, setIsDark] = useState(false);
  const [demoModal, setDemoModal] = useState<{ env: EnvLink; appName: string } | null>(null);

  // The navbar toggle writes the `dark` class straight onto <html>; the two
  // components share no state, so observe the class instead of prop-drilling.
  useEffect(() => {
    const sync = () => setIsDark(document.documentElement.classList.contains("dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
        <div className="border-x border-border px-5 md:px-8 py-8 lg:py-16 flex flex-col gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground m-1.5" />
            <span className="text-base font-normal text-muted-foreground">Projects</span>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold text-foreground">
            What I&apos;ve shipped lately.
          </h2>
        </div>
      </div>

      <div className="border-y border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
          <div className="border-x border-border flex flex-col">
            {APPS.map((app, index) => (
              <ProjectRow
                key={app.id}
                app={app}
                index={index}
                isDark={isDark}
                onOpenDemo={(env) => setDemoModal({ env, appName: app.name })}
              />
            ))}
          </div>
        </div>
      </div>

      {demoModal && (
        <DemoModal
          env={demoModal.env}
          appName={demoModal.appName}
          onClose={() => setDemoModal(null)}
        />
      )}
    </section>
  );
};

function ProjectRow({
  app,
  index,
  isDark,
  onOpenDemo,
}: {
  app: AppDef;
  index: number;
  isDark: boolean;
  onOpenDemo: (env: EnvLink) => void;
}) {
  return (
    <div className="group flex flex-col lg:flex-row border-b border-border last:border-b-0">
      {/* Index, name, status */}
      <div className="lg:w-64 xl:w-80 shrink-0 flex flex-row lg:flex-col items-center lg:items-start justify-between lg:justify-start gap-4 px-5 py-6 xl:px-10 xl:py-10">
        <div className="flex items-center gap-4">
          <span className="text-base font-normal text-muted-foreground tabular-nums">
            ({String(index + 1).padStart(2, "0")})
          </span>
          <h3 className="text-2xl xl:text-3xl font-medium text-foreground">{app.name}</h3>
        </div>
        {app.hosted ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400">
            <span className="relative flex size-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-green-500" />
            </span>
            Live
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-muted-foreground/50 inline-block" />
            {app.status ?? "Local"}
          </span>
        )}
      </div>

      {/* Mockup */}
      <div
        className="lg:w-64 xl:w-80 shrink-0 h-40 lg:h-auto border-y lg:border-y-0 lg:border-x border-border p-4 overflow-hidden"
        style={{ background: isDark ? app.colors.bgDark : app.colors.bgLight }}
      >
        <div className="h-full w-full transition-transform duration-300 ease-out group-hover:scale-105">
          <AppMockup id={app.id} accent={app.colors.accent} />
        </div>
      </div>

      {/* Description, tags, actions */}
      <div className="flex-1 min-w-0 flex flex-col gap-5 justify-between px-5 py-6 xl:px-10 xl:py-10">
        <div className="flex flex-col gap-4">
          <p className="text-base text-muted-foreground">{app.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {app.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="rounded-full text-[11px] px-2.5 py-0.5 font-normal"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {app.environments
            ? app.environments.map((env) =>
                env.demo ? (
                  <button
                    key={env.label}
                    onClick={() => onOpenDemo(env)}
                    className={cn(
                      buttonVariants({ size: "sm", variant: "outline" }),
                      "rounded-full"
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
                    className={cn(buttonVariants({ size: "sm" }), "rounded-full")}
                  >
                    {env.label} →
                  </a>
                )
              )
            : app.href && (
                <a
                  href={app.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ size: "sm" }), "group/cta rounded-full gap-2")}
                >
                  Visit
                  <ArrowRight className="size-3.5 transition-transform duration-300 ease-out group-hover/cta:-rotate-45" />
                </a>
              )}

          {/* Public source vs private */}
          {app.repo ? (
            <a
              href={app.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm text-foreground hover:bg-muted transition-colors"
            >
              <GithubIcon size={14} />
              Source
            </a>
          ) : (
            <span
              className="inline-flex items-center gap-2 rounded-full border border-dashed border-border px-3 py-1.5 text-sm text-muted-foreground"
              title="The source for this project is not public."
            >
              <Lock className="size-3.5" />
              Private source
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Projects;
