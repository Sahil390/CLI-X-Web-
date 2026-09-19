"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, Terminal, RefreshCw } from "lucide-react";

const AI_STACK = {
  framework: "Next.js 14",
  styling: "Tailwind CSS",
  auth: "Better Auth",
  database: "Prisma + PostgreSQL",
  deploy: "Vercel",
};

const USER_STACK = {
  framework: "React + Vite",
  styling: "CSS Modules",
  auth: "Passport.js",
  database: "Mongoose + MongoDB",
  deploy: "Render",
};

const stackColors: Record<string, string> = {
  framework: "text-purple-300",
  styling: "text-cyan-300",
  auth: "text-amber-300",
  database: "text-emerald-300",
  deploy: "text-blue-300",
};

export function StackFlexSection() {
  const [isOverride, setIsOverride] = useState(false);
  const stack = isOverride ? USER_STACK : AI_STACK;

  return (
    <section id="stack-flex" className="relative py-24 px-4 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <Badge variant="cyan" className="mb-4">Developer Control</Badge>
            <h2 className="text-4xl sm:text-5xl font-bold font-display text-white mb-5 leading-tight">
              AI recommends.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                You decide.
              </span>
            </h2>
            <p className="text-neutral-400 mb-6 leading-relaxed">
              CLI-X's stack suggestions are starting points, not constraints. Override any recommendation in natural language and the agent adapts immediately — no config files, no flags.
            </p>
            <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-4 font-mono text-sm mb-6">
              <div className="text-neutral-500 text-xs mb-2">// Override example</div>
              <div className="text-emerald-400">$ cli-x edit</div>
              <div className="text-neutral-300 mt-1">
                <span className="text-cyan-300">&gt;</span> Use React, MongoDB, and CSS Modules instead
              </div>
              <div className="text-emerald-400 mt-2">✓ Stack updated. Regenerating affected files...</div>
            </div>
            <button
              onClick={() => setIsOverride((v) => !v)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border font-mono text-sm font-medium
                transition-all duration-200
                ${isOverride
                  ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/15"
                  : "border-purple-500/50 bg-purple-500/10 text-purple-300 hover:bg-purple-500/15"
                }`}
            >
              <RefreshCw size={14} className={isOverride ? "" : "animate-spin"} />
              {isOverride ? "Show AI recommendation" : "Simulate user override"}
            </button>
          </div>

          {/* Right: Stack card */}
          <div>
            <GlowCard
              glowColor={isOverride ? "cyan" : "purple"}
              className="p-6"
              hover={false}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  {isOverride ? (
                    <Terminal size={16} className="text-cyan-400" />
                  ) : (
                    <Sparkles size={16} className="text-purple-400" />
                  )}
                  <span className="font-mono text-sm font-semibold text-white">
                    {isOverride ? "User-Defined Stack" : "AI-Recommended Stack"}
                  </span>
                </div>
                <AnimatePresence>
                  {isOverride ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Badge variant="cyan" dot>Active</Badge>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Badge variant="purple" dot>AI Pick</Badge>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-3">
                {Object.entries(stack).map(([key, value]) => (
                  <AnimatePresence key={key} mode="wait">
                    <motion.div
                      key={`${key}-${isOverride}`}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-neutral-800/40 border border-neutral-700/40"
                    >
                      <span className="text-neutral-500 font-mono text-xs uppercase tracking-wider">
                        {key}
                      </span>
                      <span className={`font-mono text-sm font-semibold ${stackColors[key]}`}>
                        {value}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                ))}
              </div>
            </GlowCard>
          </div>
        </div>
      </div>
    </section>
  );
}
