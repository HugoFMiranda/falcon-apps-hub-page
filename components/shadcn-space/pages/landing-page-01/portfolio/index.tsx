"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { APPS, type EnvLink } from "@/lib/apps";
import AppMockup from "@/components/app-mockup";
import DemoModal from "@/components/demo-modal";

const FADE_UP_ANIMATION_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const STAGGER_ANIMATION_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const Projects = () => {
  const [isDark, setIsDark] = useState(false);
  const [demoModal, setDemoModal] = useState<{ env: EnvLink; appName: string } | null>(null);

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
        <div className="border-x border-border px-5 md:px-8 py-8 lg:py-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={STAGGER_ANIMATION_VARIANTS}
            className="flex flex-col gap-4"
          >
            <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground m-1.5" />
              <span className="text-base font-normal text-muted-foreground">Projects</span>
            </motion.div>
            <motion.h2
              variants={FADE_UP_ANIMATION_VARIANTS}
              className="text-5xl sm:text-6xl md:text-7xl font-semibold text-foreground"
            >
              My work.
            </motion.h2>
          </motion.div>
        </div>
      </div>

      <div className="border-y border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
          <div className="border-x border-border p-5 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {APPS.map((app) => (
                <AppCard
                  key={app.id}
                  app={app}
                  isDark={isDark}
                  onOpenDemo={(env) => setDemoModal({ env, appName: app.name })}
                />
              ))}
            </div>
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

export default Projects;

function AppCard({
  app,
  isDark,
  onOpenDemo,
}: {
  app: (typeof APPS)[number];
  isDark: boolean;
  onOpenDemo: (env: EnvLink) => void;
}) {
  return (
    <Card className="overflow-hidden flex flex-col p-0 gap-0">
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
                    onClick={() => onOpenDemo(env)}
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
  );
}
