"use client";

import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { Badge } from "@/components/ui/Badge";
import { FolderOpen, GitBranch, Code2, Globe, Lock } from "lucide-react";

const FEATURES = [
  {
    icon: FolderOpen,
    title: "Your machine. Your code.",
    desc: "Output is a clean, standard software repository written to your local filesystem — no cloud lock-in, no platform dependency.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: GitBranch,
    title: "Git-ready from day one",
    desc: "Every project is initialized with a proper .gitignore, README, and commit-ready structure.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: Code2,
    title: "Open in any editor",
    desc: "The generated codebase works seamlessly in VS Code, WebStorm, Neovim — any IDE you prefer.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Globe,
    title: "Deploy anywhere",
    desc: "Not tied to any single cloud. Deploy to Vercel, Netlify, Render, Railway, Fly.io, or your own VPS.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    icon: Lock,
    title: "Zero vendor lock-in",
    desc: "Delete CLI-X tomorrow. Your codebase still works perfectly — it's just regular code.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
];

export function LocalOwnershipSection() {
  return (
    <section id="local-ownership" className="relative py-24 px-4">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-purple-600/6 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <Badge variant="green" className="mb-4">Local & Developer-Owned</Badge>
          <h2 className="text-4xl sm:text-5xl font-bold font-display text-white mb-4">
            Zero platform lock-in.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Your code, forever.
            </span>
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            CLI-X generates a clean, standard codebase on your local machine. No subscriptions required to keep your app running.
          </p>
        </div>

        {/* File tree visual */}
        <div className="mb-12 max-w-sm mx-auto">
          <GlowCard glowColor="green" className="p-5" hover={false}>
            <div className="font-mono text-sm space-y-1">
              <div className="text-emerald-400 mb-2 flex items-center gap-2">
                <FolderOpen size={14} />
                <span>~/projects/my-saas-app/</span>
              </div>
              {[
                { indent: 0, name: "src/", color: "text-cyan-300" },
                { indent: 1, name: "components/", color: "text-neutral-300" },
                { indent: 1, name: "pages/", color: "text-neutral-300" },
                { indent: 1, name: "lib/", color: "text-neutral-300" },
                { indent: 0, name: "public/", color: "text-cyan-300" },
                { indent: 0, name: ".env.example", color: "text-amber-300" },
                { indent: 0, name: ".gitignore", color: "text-neutral-500" },
                { indent: 0, name: "package.json", color: "text-emerald-300" },
                { indent: 0, name: "README.md", color: "text-neutral-400" },
                { indent: 0, name: "tsconfig.json", color: "text-neutral-500" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center gap-1 ${item.color}`}
                  style={{ paddingLeft: `${item.indent * 20}px` }}
                >
                  <span className="text-neutral-600">
                    {item.indent > 0 ? "├─" : ""}
                  </span>
                  <span>{item.name}</span>
                </motion.div>
              ))}
            </div>
          </GlowCard>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature, i) => (
            <GlowCard key={i} delay={i * 0.08} glowColor="green" className="p-5">
              <div className={`w-9 h-9 rounded-lg ${feature.bg} flex items-center justify-center mb-3`}>
                <feature.icon size={18} className={feature.color} />
              </div>
              <h3 className="text-white font-semibold font-display mb-2">{feature.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{feature.desc}</p>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
