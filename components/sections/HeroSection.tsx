"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OrbitalGlow } from "@/components/ui/OrbitalGlow";
import { Badge } from "@/components/ui/Badge";
import { CopyButton } from "@/components/ui/CopyButton";
import { TerminalWindow, TerminalLine, Cursor } from "@/components/ui/TerminalWindow";
import { useSequentialTypewriter } from "@/hooks/useTypewriter";

const INSTALL_CMD = "npm install -g @cli-x/agent";

const TERMINAL_LINES = [
  "$ cli-x create \"Build me a SaaS dashboard with auth\"",
  "",
  "  ◆ CLI-X Agent Engine v1.0.0",
  "  ✦ Analyzing project requirements...",
  "  ✦ Recommending stack: Next.js + Tailwind + Better Auth",
  "  ✦ Generating design tokens & color palette...",
  "  ✦ Scaffolding project structure...",
  "  ✦ Installing dependencies (npm)...",
  "  ✦ Writing components & pages...",
  "  ✦ Configuring auth middleware...",
  "  ✦ Starting local dev server...",
  "",
  "  ● Dev server running at http://localhost:3000",
  "  ✓ Build passed — 0 errors, 0 warnings",
  "  ✓ Codebase saved to ./saas-dashboard/",
  "",
  "  Ready to iterate. Run: cli-x edit",
];

const ASCII_ART = [
  "   ██████╗██╗     ██╗    ██╗  ██╗",
  "  ██╔════╝██║     ██║   ██╔╝  ╚██╗",
  "  ██║     ██║     ██║  ██╔╝    ╚██╗",
  "  ██║     ██║     ██║  ██╗     ██╔╝",
  "  ╚██████╗███████╗██║  ╚██╗   ██╔╝",
  "   ╚═════╝╚══════╝╚═╝   ╚═╝  ╚═╝",
  "",
  "  AI-Native CLI Development Agent",
];

export function HeroSection() {
  const [showTerminal, setShowTerminal] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowTerminal(true), 600);
    return () => clearTimeout(t);
  }, []);

  const { completedLines, currentLine } = useSequentialTypewriter(
    showTerminal ? TERMINAL_LINES : [],
    28,
    300
  );

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden"
    >
      {/* Ambient background */}
      <OrbitalGlow />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-6"
      >
        <Badge variant="purple" size="md" dot>
          Powered by CLI-X Agent Engine v1.0.0
        </Badge>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="text-center text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold font-display leading-[1.05] tracking-tight mb-6 max-w-5xl"
      >
        <span className="text-white">Build </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-cyan-400">
          &gt; Debug
        </span>
        <br />
        <span className="text-white">&amp; Deploy with </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          AI
        </span>
      </motion.h1>

      {/* Sub-headline */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="text-center text-lg sm:text-xl text-neutral-400 max-w-2xl mb-10 leading-relaxed"
      >
        Turn natural-language ideas into customizable, locally runnable, and
        deployment-ready web apps directly from your terminal.
      </motion.p>

      {/* Install command bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        className="flex items-center gap-3 mb-14"
      >
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-neutral-700/80 bg-neutral-900/80 backdrop-blur-md shadow-lg">
          <span className="text-emerald-400 font-mono text-sm select-none">$</span>
          <code className="font-mono text-sm text-neutral-200 tracking-wide">
            {INSTALL_CMD}
          </code>
          <CopyButton text={INSTALL_CMD} />
        </div>
      </motion.div>

      {/* Terminal preview */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
        className="w-full max-w-3xl"
      >
        <TerminalWindow title="cli-x — bash" minHeight="min-h-[360px]">
          {/* ASCII art header */}
          <div className="mb-4">
            {ASCII_ART.map((line, i) => (
              <div key={i} className="text-purple-400/80 text-xs leading-5 whitespace-pre">
                {line}
              </div>
            ))}
          </div>
          <div className="border-t border-neutral-800/60 pt-4">
            {completedLines.map((line, i) => {
              if (line === "") return <div key={i} className="h-2" />;
              const isPrompt = line.startsWith("$");
              const isSuccess = line.includes("✓") || line.includes("●");
              const isProcessing = line.includes("✦");
              const isHeader = line.includes("CLI-X Agent");
              return (
                <div
                  key={i}
                  className={`leading-6 text-sm whitespace-pre ${
                    isPrompt
                      ? "text-neutral-200"
                      : isSuccess
                      ? "text-emerald-400"
                      : isProcessing
                      ? "text-cyan-300/90"
                      : isHeader
                      ? "text-purple-300"
                      : "text-neutral-400"
                  }`}
                >
                  {line}
                </div>
              );
            })}
            <AnimatePresence>
              {currentLine && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="leading-6 text-sm text-neutral-300 whitespace-pre"
                >
                  {currentLine}
                  <Cursor />
                </motion.div>
              )}
            </AnimatePresence>
            {completedLines.length === TERMINAL_LINES.length && !currentLine && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-emerald-400 text-sm">$</span>
                <Cursor />
              </div>
            )}
          </div>
        </TerminalWindow>

        {/* Subtle glow under terminal */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent mt-0.5" />
        <div className="h-8 bg-gradient-to-b from-purple-500/10 to-transparent blur-sm" />
      </motion.div>
    </section>
  );
}
