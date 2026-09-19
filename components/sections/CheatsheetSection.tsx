"use client";

import { GlowCard } from "@/components/ui/GlowCard";
import { Badge } from "@/components/ui/Badge";
import { CopyButton } from "@/components/ui/CopyButton";
import { Plus, Pencil, Play, Upload } from "lucide-react";

const COMMANDS = [
  {
    cmd: "cli-x create",
    desc: "Scaffold a new project from a natural-language description. CLI-X recommends a stack, generates the codebase, installs deps, and launches a local dev server.",
    icon: Plus,
    color: "purple",
    iconColor: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    example: "cli-x create \"SaaS dashboard with Stripe billing\"",
  },
  {
    cmd: "cli-x edit",
    desc: "Make targeted, iterative changes to your existing codebase using natural language. CLI-X applies minimal diffs without touching working code.",
    icon: Pencil,
    color: "cyan",
    iconColor: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    example: "cli-x edit \"Add dark mode toggle to the navbar\"",
  },
  {
    cmd: "cli-x run",
    desc: "Start (or restart) the local development server. CLI-X handles port conflicts and auto-repairs build errors before launching.",
    icon: Play,
    color: "green",
    iconColor: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    example: "cli-x run",
  },
  {
    cmd: "cli-x deploy",
    desc: "Push your project to Vercel, Netlify, or Render with a single command. CLI-X handles build configuration, env var setup, and deployment pipeline.",
    icon: Upload,
    color: "amber",
    iconColor: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    example: "cli-x deploy --platform vercel",
  },
];

export function CheatsheetSection() {
  return (
    <section id="cheatsheet" className="relative py-28 px-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-600/8 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <Badge variant="purple" className="mb-4">Command Reference</Badge>
          <h2 className="text-4xl sm:text-5xl font-bold font-display text-white mb-4">
            Four commands.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              Complete development cycle.
            </span>
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            CLI-X&apos;s entire feature set is accessible through four clean, memorable commands.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {COMMANDS.map((cmd, i) => (
            <GlowCard
              key={i}
              delay={i * 0.1}
              glowColor={cmd.color as "purple" | "cyan" | "green" | "amber"}
              className="p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg ${cmd.bg} flex items-center justify-center`}>
                    <cmd.icon size={17} className={cmd.iconColor} />
                  </div>
                  <code className={`font-mono text-base font-bold ${cmd.iconColor}`}>
                    {cmd.cmd}
                  </code>
                </div>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                {cmd.desc}
              </p>
              {/* Example */}
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${cmd.border} ${cmd.bg}`}>
                <span className="text-emerald-400 font-mono text-xs shrink-0">$</span>
                <code className={`font-mono text-xs ${cmd.iconColor} flex-1 truncate`}>
                  {cmd.example}
                </code>
                <CopyButton text={cmd.example} iconSize={12} />
              </div>
            </GlowCard>
          ))}
        </div>

        {/* Install CTA */}
        <div className="mt-14 text-center">
          <p className="text-neutral-500 font-mono text-sm mb-4">Get started in seconds</p>
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-purple-500/40 bg-purple-500/10 backdrop-blur-md">
            <span className="text-emerald-400 font-mono text-sm">$</span>
            <code className="font-mono text-sm text-neutral-200">npm install -g @cli-x/agent</code>
            <CopyButton text="npm install -g @cli-x/agent" />
          </div>
        </div>
      </div>
    </section>
  );
}
