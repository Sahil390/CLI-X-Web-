"use client";

import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { Badge } from "@/components/ui/Badge";
import { Shield, AlertTriangle, Eye, FileKey, Ban } from "lucide-react";

const ENV_LINES = [
  { text: "# .env.example — safe to commit", color: "text-neutral-500" },
  { text: "DATABASE_URL=postgresql://user:password@host/db", color: "text-amber-300/70", strike: true },
  { text: "DATABASE_URL=          # Add your DB URL here", color: "text-emerald-300" },
  { text: "", color: "" },
  { text: "NEXTAUTH_SECRET=        # Generate with: openssl rand -base64 32", color: "text-cyan-300/80" },
  { text: "STRIPE_SECRET_KEY=      # Found in Stripe Dashboard", color: "text-cyan-300/80" },
];

const APPROVAL_PROMPT = [
  { text: "  ⚠  CLI-X wants to run a destructive command:", color: "text-amber-400" },
  { text: "", color: "" },
  { text: "    rm -rf ./node_modules/.cache", color: "text-red-300 font-bold" },
  { text: "", color: "" },
  { text: "  Approve? [y/N]: _", color: "text-neutral-300" },
];

export function SecuritySection() {
  return (
    <section id="security" className="relative py-24 px-4">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <Badge variant="green" className="mb-4">Built-In Security</Badge>
          <h2 className="text-4xl sm:text-5xl font-bold font-display text-white mb-4">
            Safe by design.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Zero secrets exposed.
            </span>
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            CLI-X never hardcodes secrets. Every credential goes into `.env.example` with a placeholder. Destructive commands require your explicit approval.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* .env.example card */}
          <GlowCard glowColor="green" className="p-5 lg:col-span-2" delay={0.1} hover={false}>
            <div className="flex items-center gap-2 mb-4">
              <FileKey size={16} className="text-emerald-400" />
              <span className="font-mono text-sm text-neutral-300 font-semibold">.env.example</span>
              <Badge variant="green" className="ml-auto">Safe to commit</Badge>
            </div>
            <div className="font-mono text-xs space-y-1 bg-black/30 rounded-lg p-4 border border-neutral-800/60">
              {ENV_LINES.map((line, i) => (
                <div key={i} className={`leading-5 ${line.color}`}>
                  {line.strike ? (
                    <>
                      <span className="text-red-400/50 line-through">{line.text}</span>
                      <span className="ml-2 text-xs text-red-400/60">← never generated</span>
                    </>
                  ) : (
                    line.text || <br />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-neutral-500 font-mono">
              ✓ Actual secrets are never written to any file by CLI-X
            </div>
          </GlowCard>

          {/* Features column */}
          <div className="space-y-4">
            {[
              { icon: Shield, title: "No hardcoded secrets", desc: "All credentials use placeholder patterns in .env.example", color: "text-emerald-400", bg: "bg-emerald-500/10" },
              { icon: Eye, title: ".env always gitignored", desc: "Real .env files are automatically added to .gitignore", color: "text-cyan-400", bg: "bg-cyan-500/10" },
              { icon: AlertTriangle, title: "Destructive command approval", desc: "rm, sudo, chmod always require explicit Y/n confirmation", color: "text-amber-400", bg: "bg-amber-500/10" },
              { icon: Ban, title: "No silent execution", desc: "Every CLI command is logged and surfaced in your terminal", color: "text-purple-400", bg: "bg-purple-500/10" },
            ].map((item, i) => (
              <GlowCard key={i} delay={0.1 + i * 0.08} glowColor="green" className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center shrink-0`}>
                    <item.icon size={15} className={item.color} />
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold mb-0.5">{item.title}</div>
                    <div className="text-neutral-500 text-xs leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>

        {/* Approval prompt preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={14} className="text-amber-400" />
            <span className="font-mono text-xs text-amber-300 font-semibold">Destructive Command Approval Gate</span>
          </div>
          <div className="font-mono text-sm space-y-1">
            {APPROVAL_PROMPT.map((line, i) => (
              <div key={i} className={line.color}>{line.text || <span>&nbsp;</span>}</div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
