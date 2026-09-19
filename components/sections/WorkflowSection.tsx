"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";

const STEPS = [
  { id: 1, label: "Receive Prompt", desc: "Natural-language requirement captured from your terminal.", color: "purple" },
  { id: 2, label: "Parse Intent", desc: "CLI-X extracts app type, features, constraints, and target audience.", color: "purple" },
  { id: 3, label: "Analyze Specs", desc: "Requirements broken into functional modules and user stories.", color: "cyan" },
  { id: 4, label: "Recommend Stack", desc: "AI selects the best framework, DB, auth, and styling libraries.", color: "cyan" },
  { id: 5, label: "Await Approval", desc: "You review and override any recommendation before generation.", color: "amber" },
  { id: 6, label: "Design Tokens", desc: "Color palette, typography, spacing system auto-generated.", color: "purple" },
  { id: 7, label: "Scaffold Structure", desc: "Directories, config files, and entrypoints created.", color: "purple" },
  { id: 8, label: "Install Dependencies", desc: "Package manager installs all selected libraries.", color: "cyan" },
  { id: 9, label: "Generate Components", desc: "AI writes reusable UI components from design tokens.", color: "purple" },
  { id: 10, label: "Generate Pages", desc: "All app routes and layouts assembled.", color: "purple" },
  { id: 11, label: "Configure Auth", desc: "Authentication middleware and session handling wired up.", color: "cyan" },
  { id: 12, label: "Configure DB", desc: "ORM schema, migrations, and seed data prepared.", color: "cyan" },
  { id: 13, label: "Start Dev Server", desc: "Local server launched at http://localhost:3000.", color: "green" },
  { id: 14, label: "Run Validation", desc: "Build checks, lint, and type-check executed.", color: "green" },
  { id: 15, label: "Detect Errors", desc: "Server logs and console output analyzed for issues.", color: "amber" },
  { id: 16, label: "Self-Repair", desc: "Targeted diffs applied to broken files — no full rewrites.", color: "amber" },
  { id: 17, label: "Hot Reload", desc: "Dev server refreshes after each targeted fix.", color: "green" },
  { id: 18, label: "Codebase Review", desc: "Final pass: dead code removed, imports cleaned, types checked.", color: "purple" },
  { id: 19, label: "Iteration Mode", desc: "You run `cli-x edit` to make targeted changes in natural language.", color: "cyan" },
  { id: 20, label: "Deploy", desc: "Vercel / Netlify / Render pipeline triggered with one command.", color: "green" },
];

const colorMap = {
  purple: { bg: "bg-purple-500/20", border: "border-purple-500/50", text: "text-purple-300", glow: "shadow-purple-500/20" },
  cyan: { bg: "bg-cyan-500/20", border: "border-cyan-500/50", text: "text-cyan-300", glow: "shadow-cyan-500/20" },
  green: { bg: "bg-emerald-500/20", border: "border-emerald-500/50", text: "text-emerald-300", glow: "shadow-emerald-500/20" },
  amber: { bg: "bg-amber-500/20", border: "border-amber-500/50", text: "text-amber-300", glow: "shadow-amber-500/20" },
};

export function WorkflowSection() {
  const [activeStep, setActiveStep] = useState(0);
  const step = STEPS[activeStep];
  const colors = colorMap[step.color as keyof typeof colorMap];

  return (
    <section id="workflow" className="relative py-28 px-4">
      {/* Section glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600/8 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="purple" className="mb-4">20-Step Agent Lifecycle</Badge>
          <h2 className="text-4xl sm:text-5xl font-bold font-display text-white mb-4">
            Not a one-shot generator.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              A structured AI agent.
            </span>
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            CLI-X guides every project through a systematic 20-step lifecycle — from raw idea to deployed application.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-8">
          {/* Steps grid */}
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {STEPS.map((s, i) => {
              const c = colorMap[s.color as keyof typeof colorMap];
              const isActive = i === activeStep;
              const isDone = i < activeStep;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveStep(i)}
                  className={`
                    relative flex flex-col items-center gap-1 p-2 rounded-lg border text-center
                    transition-all duration-200 cursor-pointer
                    ${isActive
                      ? `${c.bg} ${c.border} shadow-md ${c.glow}`
                      : isDone
                      ? "bg-neutral-800/40 border-neutral-700/40"
                      : "bg-neutral-900/40 border-neutral-800/60 hover:border-neutral-700"
                    }
                  `}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono
                    ${isActive ? c.text : isDone ? "text-emerald-400" : "text-neutral-500"}`}>
                    {isDone ? <CheckCircle2 size={14} /> : isActive ? <Loader2 size={14} className="animate-spin" /> : <span>{s.id}</span>}
                  </div>
                  <span className={`text-[9px] font-mono leading-tight hidden sm:block
                    ${isActive ? c.text : isDone ? "text-neutral-400" : "text-neutral-600"}`}>
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active step detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
            >
              <GlowCard
                glowColor={step.color as "purple" | "cyan" | "green" | "amber"}
                className="p-6 h-full"
                hover={false}
              >
                <div className={`text-xs font-mono mb-2 ${colors.text}`}>
                  STEP {step.id} / 20
                </div>
                <h3 className="text-xl font-bold font-display text-white mb-3">{step.label}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">{step.desc}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                    disabled={activeStep === 0}
                    className="flex-1 py-2 rounded-lg border border-neutral-700 text-neutral-400 text-sm font-mono
                      hover:border-neutral-600 hover:text-neutral-300 disabled:opacity-30 disabled:cursor-not-allowed
                      transition-all duration-150"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={() => setActiveStep(Math.min(STEPS.length - 1, activeStep + 1))}
                    disabled={activeStep === STEPS.length - 1}
                    className={`flex-1 py-2 rounded-lg border text-sm font-mono
                      ${colors.border} ${colors.text} ${colors.bg}
                      hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed
                      transition-all duration-150`}
                  >
                    Next →
                  </button>
                </div>
                {/* Progress bar */}
                <div className="mt-4 h-1 rounded-full bg-neutral-800 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${colors.bg.replace('/20', '/80')}`}
                    animate={{ width: `${((activeStep + 1) / STEPS.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </GlowCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
