"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { Badge } from "@/components/ui/Badge";
import { GraduationCap, Cpu, Rocket } from "lucide-react";

const PERSONAS = [
  {
    id: "beginner",
    icon: GraduationCap,
    label: "Beginners & Students",
    tagline: "From idea to full-stack in minutes",
    color: "purple",
    iconColor: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/40",
    desc: "Stop fighting webpack configs and auth boilerplate. CLI-X gives you a production-quality full-stack scaffold with auth, database, and UI — so you can focus on learning what matters.",
    workflow: [
      "$ cli-x create \"Todo app with user accounts\"",
      "  ✦ Scaffolding: Next.js + Tailwind + Better Auth",
      "  ✦ Setting up PostgreSQL schema...",
      "  ✦ Generating Todo CRUD components...",
      "  ✓ Ready at http://localhost:3000",
      "  ✓ Login, register, and todos work out of the box",
    ],
    highlights: [
      "No complex boilerplate to manage",
      "Auth and DB preconfigured",
      "Learn from production-quality code",
      "Deployable to Vercel in one command",
    ],
  },
  {
    id: "programmer",
    icon: Cpu,
    label: "ML / Backend Devs",
    tagline: "Turn your scripts into web UIs instantly",
    color: "cyan",
    iconColor: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/40",
    desc: "You're great at Python, C++, or Go — but you hate building frontends. CLI-X wraps your backend logic or model inference in a sleek web dashboard automatically.",
    workflow: [
      "$ cli-x create \"Dashboard for my PyTorch model API\"",
      "  ✦ Detecting: REST API on :8000",
      "  ✦ Generating: React dashboard + Recharts",
      "  ✦ Wiring model input/output endpoints...",
      "  ✓ Web UI connected to your Python backend",
      "  ✓ Real-time inference display working",
    ],
    highlights: [
      "No React knowledge required",
      "Connects to existing APIs automatically",
      "Recharts & D3 data visualizations",
      "Python/FastAPI/Flask compatible",
    ],
  },
  {
    id: "prototyper",
    icon: Rocket,
    label: "Rapid Prototypers",
    tagline: "MVP in minutes, not weeks",
    color: "green",
    iconColor: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/40",
    desc: "Stop spending your first sprint on setup. CLI-X generates a production-ready MVP codebase so you can demo to stakeholders on day one.",
    workflow: [
      "$ cli-x create \"SaaS billing dashboard with Stripe\"",
      "  ✦ Stack: Next.js + Stripe + Prisma + Radix UI",
      "  ✦ Generating: plans, checkout, subscription pages...",
      "  ✦ Wiring Stripe webhook handlers...",
      "  ✓ Subscription flow complete",
      "  ✓ Deploy to Vercel: cli-x deploy",
    ],
    highlights: [
      "Stripe, Clerk, Resend pre-integrated",
      "Investor-demo ready UI",
      "Production build from day one",
      "Ship to Vercel in 60 seconds",
    ],
  },
];

const colorVariant: Record<string, "purple" | "cyan" | "green"> = {
  purple: "purple",
  cyan: "cyan",
  green: "green",
};

export function PersonaSection() {
  const [activeId, setActiveId] = useState("beginner");
  const persona = PERSONAS.find((p) => p.id === activeId)!;

  return (
    <section id="personas" className="relative py-24 px-4">
      <div className="absolute top-1/2 right-0 w-[500px] h-[400px] bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="cyan" className="mb-4">Built For Everyone</Badge>
          <h2 className="text-4xl sm:text-5xl font-bold font-display text-white mb-4">
            Your workflow.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400">
              Any background.
            </span>
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            CLI-X adapts to how you work — whether you&apos;re building your first app or prototyping your tenth product.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {PERSONAS.map((p) => {
            const isActive = activeId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActiveId(p.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-mono text-sm font-medium
                  transition-all duration-200
                  ${isActive
                    ? `${p.bg} ${p.border} ${p.iconColor}`
                    : "border-neutral-800 text-neutral-500 hover:border-neutral-700 hover:text-neutral-400"
                  }`}
              >
                <p.icon size={14} />
                {p.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left: Description + highlights */}
              <GlowCard glowColor={colorVariant[persona.color]} hover={false} className="p-6">
                <div className={`flex items-center gap-2 mb-4`}>
                  <div className={`w-9 h-9 rounded-lg ${persona.bg} flex items-center justify-center`}>
                    <persona.icon size={18} className={persona.iconColor} />
                  </div>
                  <div>
                    <div className="text-white font-semibold font-display text-sm">{persona.label}</div>
                    <div className={`text-xs font-mono ${persona.iconColor}`}>{persona.tagline}</div>
                  </div>
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed mb-5">{persona.desc}</p>
                <div className="space-y-2">
                  {persona.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        persona.color === "purple" ? "bg-purple-400" :
                        persona.color === "cyan" ? "bg-cyan-400" : "bg-emerald-400"
                      }`} />
                      <span className="text-neutral-300">{h}</span>
                    </div>
                  ))}
                </div>
              </GlowCard>

              {/* Right: Terminal workflow */}
              <div className="rounded-xl border border-neutral-800/80 bg-[#0A0A0A]/95 overflow-hidden">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-neutral-800/80">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                  <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                  <span className="ml-2 font-mono text-xs text-neutral-500">cli-x — {persona.id} workflow</span>
                </div>
                <div className="p-5 font-mono text-sm space-y-1">
                  {persona.workflow.map((line, i) => {
                    const isCmd = line.startsWith("$");
                    const isSuccess = line.includes("✓");
                    const isProcessing = line.includes("✦");
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`leading-6 ${
                          isCmd ? "text-neutral-200" :
                          isSuccess ? "text-emerald-400" :
                          isProcessing ? "text-cyan-300" :
                          "text-neutral-500"
                        }`}
                      >
                        {line}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
