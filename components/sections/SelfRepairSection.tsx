"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { Badge } from "@/components/ui/Badge";
import { TerminalWindow, Cursor } from "@/components/ui/TerminalWindow";
import { Play, RefreshCw } from "lucide-react";

const SIMULATION_STEPS = [
  { text: "$ cli-x run", type: "cmd", delay: 0 },
  { text: "  ◆ Starting local dev server...", type: "info", delay: 600 },
  { text: "  ● Listening on http://localhost:3000", type: "success", delay: 1200 },
  { text: "", type: "blank", delay: 1600 },
  { text: "  ✗ Error: Port 3000 already in use", type: "error", delay: 2000 },
  { text: "  ◆ Detecting port conflict...", type: "info", delay: 2500 },
  { text: "  ◆ Scanning available ports...", type: "info", delay: 3000 },
  { text: "  ✦ Switching to port 3001", type: "warn", delay: 3500 },
  { text: "  ● Dev server restarted on http://localhost:3001", type: "success", delay: 4000 },
  { text: "", type: "blank", delay: 4400 },
  { text: "  ✗ Build error: Cannot find module './Button'", type: "error", delay: 4800 },
  { text: "  ◆ Inspecting error logs...", type: "info", delay: 5300 },
  { text: "  ◆ Analyzing import paths...", type: "info", delay: 5800 },
  { text: "  ◆ Applying targeted fix to components/ui/...", type: "info", delay: 6300 },
  { text: "  ✓ Import path corrected", type: "success", delay: 6800 },
  { text: "  ✓ Hot-reload triggered — build clean", type: "success", delay: 7300 },
  { text: "  ✓ 0 errors · 0 warnings · Ready", type: "success", delay: 7800 },
];

const typeStyles: Record<string, string> = {
  cmd: "text-neutral-200",
  info: "text-cyan-300/90",
  success: "text-emerald-400",
  error: "text-red-400",
  warn: "text-amber-400",
  blank: "",
};

export function SelfRepairSection() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [running, setRunning] = useState(false);

  const runSimulation = () => {
    setVisibleCount(0);
    setRunning(true);
  };

  useEffect(() => {
    if (!running) return;
    if (visibleCount >= SIMULATION_STEPS.length) {
      setRunning(false);
      return;
    }

    const step = SIMULATION_STEPS[visibleCount];
    const nextStep = SIMULATION_STEPS[visibleCount + 1];
    const delay = nextStep ? nextStep.delay - step.delay : 500;

    const t = setTimeout(() => {
      setVisibleCount((v) => v + 1);
    }, delay);

    return () => clearTimeout(t);
  }, [running, visibleCount]);

  return (
    <section id="self-repair" className="relative py-24 px-4 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Terminal */}
          <div>
            <TerminalWindow title="cli-x — self-repair" minHeight="min-h-[320px]">
              <div className="space-y-0.5 text-sm">
                <AnimatePresence>
                  {SIMULATION_STEPS.slice(0, visibleCount).map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`leading-6 whitespace-pre ${typeStyles[step.type]}`}
                    >
                      {step.text}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {running && visibleCount < SIMULATION_STEPS.length && (
                  <div className="flex items-center leading-6">
                    <Cursor />
                  </div>
                )}
                {!running && visibleCount === 0 && (
                  <div className="text-neutral-600 text-xs">
                    Click &quot;Run Simulation&quot; to see CLI-X self-repair in action
                  </div>
                )}
              </div>
            </TerminalWindow>

            <button
              onClick={runSimulation}
              disabled={running}
              className={`mt-4 flex items-center gap-2 px-5 py-2.5 rounded-lg border font-mono text-sm font-medium
                transition-all duration-200 w-full justify-center
                ${running
                  ? "border-neutral-700 text-neutral-500 cursor-not-allowed"
                  : "border-amber-500/50 bg-amber-500/10 text-amber-300 hover:bg-amber-500/15"
                }`}
            >
              {running ? (
                <><RefreshCw size={14} className="animate-spin" /> Running simulation...</>
              ) : (
                <><Play size={14} /> Run Simulation</>
              )}
            </button>
          </div>

          {/* Right: Text */}
          <div>
            <Badge variant="amber" className="mb-4">Self-Repair Engine</Badge>
            <h2 className="text-4xl sm:text-5xl font-bold font-display text-white mb-5 leading-tight">
              Errors detected.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400">
                Automatically fixed.
              </span>
            </h2>
            <p className="text-neutral-400 mb-6 leading-relaxed">
              CLI-X starts your local dev server, monitors for build errors and port conflicts, inspects runtime logs, applies targeted fixes, and hot-reloads — all without your intervention.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Port conflict resolution", color: "amber" },
                { label: "Build error analysis", color: "red" },
                { label: "Import path correction", color: "cyan" },
                { label: "Hot-reload on fix", color: "green" },
                { label: "Zero codebase rewrites", color: "purple" },
                { label: "Error log inspection", color: "amber" },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-2 text-sm text-neutral-400`}>
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    item.color === "amber" ? "bg-amber-400" :
                    item.color === "red" ? "bg-red-400" :
                    item.color === "cyan" ? "bg-cyan-400" :
                    item.color === "green" ? "bg-emerald-400" :
                    "bg-purple-400"
                  }`} />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
