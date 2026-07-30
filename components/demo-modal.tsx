"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Check, Eye, EyeOff, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { EnvLink } from "@/lib/apps";

export default function DemoModal({
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
    // navigator.clipboard is undefined in non-secure contexts (plain http),
    // so guard the call and only flag "copied" once the write resolves.
    navigator.clipboard
      ?.writeText(text)
      .then(() => {
        setCopied(field);
        setTimeout(() => setCopied(null), 2000);
      })
      .catch(() => {});
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
