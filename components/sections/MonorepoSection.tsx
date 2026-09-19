"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { Badge } from "@/components/ui/Badge";
import { Package, ChevronRight, ChevronDown, Folder, FileCode } from "lucide-react";

interface TreeNode {
  name: string;
  desc?: string;
  color: string;
  children?: TreeNode[];
  isFile?: boolean;
}

const TREE: TreeNode[] = [
  {
    name: "packages/",
    desc: "Monorepo workspace root",
    color: "text-purple-300",
    children: [
      {
        name: "cli/",
        desc: "CLI entry point & user commands",
        color: "text-cyan-300",
        children: [
          { name: "src/commands/create.ts", desc: "Project creation command", color: "text-neutral-400", isFile: true },
          { name: "src/commands/edit.ts", desc: "Iterative edit command", color: "text-neutral-400", isFile: true },
          { name: "src/commands/run.ts", desc: "Local dev server launcher", color: "text-neutral-400", isFile: true },
          { name: "src/commands/deploy.ts", desc: "Deployment pipeline", color: "text-neutral-400", isFile: true },
        ],
      },
      {
        name: "agent/",
        desc: "Core AI orchestration engine",
        color: "text-purple-300",
        children: [
          { name: "src/orchestrator.ts", desc: "20-step lifecycle manager", color: "text-neutral-400", isFile: true },
          { name: "src/planner.ts", desc: "Requirement analysis & spec planning", color: "text-neutral-400", isFile: true },
        ],
      },
      {
        name: "ai/",
        desc: "LLM provider abstraction layer",
        color: "text-emerald-300",
        children: [
          { name: "src/providers/gemini.ts", desc: "Google Gemini integration", color: "text-neutral-400", isFile: true },
          { name: "src/providers/openai.ts", desc: "OpenAI GPT integration", color: "text-neutral-400", isFile: true },
        ],
      },
      {
        name: "executor/",
        desc: "Safe shell command runner",
        color: "text-amber-300",
        children: [
          { name: "src/runner.ts", desc: "Command execution with approval gates", color: "text-neutral-400", isFile: true },
          { name: "src/safeguard.ts", desc: "Destructive command detection", color: "text-neutral-400", isFile: true },
        ],
      },
      {
        name: "filesystem/",
        desc: "File read/write/diff operations",
        color: "text-blue-300",
        children: [
          { name: "src/writer.ts", desc: "Atomic file writer with diff support", color: "text-neutral-400", isFile: true },
          { name: "src/differ.ts", desc: "Minimal patch generator", color: "text-neutral-400", isFile: true },
        ],
      },
      {
        name: "deployment/",
        desc: "Cloud deployment connectors",
        color: "text-pink-300",
        children: [
          { name: "src/providers/vercel.ts", desc: "Vercel deployment pipeline", color: "text-neutral-400", isFile: true },
          { name: "src/providers/netlify.ts", desc: "Netlify deployment pipeline", color: "text-neutral-400", isFile: true },
          { name: "src/providers/render.ts", desc: "Render deployment pipeline", color: "text-neutral-400", isFile: true },
        ],
      },
    ],
  },
];

function TreeNodeItem({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const [open, setOpen] = useState(depth === 0);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <button
        onClick={() => hasChildren && setOpen((v) => !v)}
        className={`flex items-center gap-1.5 w-full text-left py-1 px-2 rounded-md transition-colors duration-150
          ${hasChildren ? "hover:bg-neutral-800/50 cursor-pointer" : "cursor-default"}
          group`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {hasChildren ? (
          open ? <ChevronDown size={12} className="text-neutral-600 shrink-0" /> : <ChevronRight size={12} className="text-neutral-600 shrink-0" />
        ) : (
          <span className="w-3 shrink-0" />
        )}
        {node.isFile ? (
          <FileCode size={13} className="text-neutral-600 shrink-0" />
        ) : (
          <Folder size={13} className={`${node.color} shrink-0`} />
        )}
        <span className={`font-mono text-xs ${node.color}`}>{node.name}</span>
        {node.desc && (
          <span className="text-neutral-600 text-xs ml-2 font-sans truncate hidden sm:block">{node.desc}</span>
        )}
      </button>
      <AnimatePresence>
        {open && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {node.children!.map((child, i) => (
              <TreeNodeItem key={i} node={child} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MonorepoSection() {
  return (
    <section id="monorepo" className="relative py-24 px-4">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/6 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Text */}
          <div>
            <Badge variant="purple" className="mb-4">Monorepo Architecture</Badge>
            <h2 className="text-4xl sm:text-5xl font-bold font-display text-white mb-5 leading-tight">
              Six focused
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                packages. One agent.
              </span>
            </h2>
            <p className="text-neutral-400 mb-6 leading-relaxed">
              CLI-X is built as a monorepo with clean separation between the CLI interface, AI orchestration, LLM providers, command execution, filesystem operations, and cloud deployment.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { pkg: "cli", color: "text-cyan-300", bg: "bg-cyan-500/10", desc: "User-facing commands" },
                { pkg: "agent", color: "text-purple-300", bg: "bg-purple-500/10", desc: "AI orchestration" },
                { pkg: "ai", color: "text-emerald-300", bg: "bg-emerald-500/10", desc: "LLM abstraction" },
                { pkg: "executor", color: "text-amber-300", bg: "bg-amber-500/10", desc: "Safe shell runner" },
                { pkg: "filesystem", color: "text-blue-300", bg: "bg-blue-500/10", desc: "File operations" },
                { pkg: "deployment", color: "text-pink-300", bg: "bg-pink-500/10", desc: "Cloud connectors" },
              ].map((p, i) => (
                <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg ${p.bg} border border-neutral-800/60`}>
                  <Package size={13} className={p.color} />
                  <div>
                    <div className={`font-mono text-xs font-semibold ${p.color}`}>{p.pkg}</div>
                    <div className="text-neutral-600 text-xs">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Interactive tree */}
          <GlowCard glowColor="purple" hover={false} className="overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800/80">
              <Package size={14} className="text-purple-400" />
              <span className="font-mono text-xs text-neutral-400">cli-x monorepo structure</span>
            </div>
            <div className="p-3 max-h-[420px] overflow-y-auto scrollbar-thin scrollbar-track-neutral-900 scrollbar-thumb-neutral-700">
              {TREE.map((node, i) => (
                <TreeNodeItem key={i} node={node} depth={0} />
              ))}
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
