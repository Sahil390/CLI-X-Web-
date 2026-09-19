"use client";

import { ReactNode } from "react";

interface TerminalWindowProps {
  children: ReactNode;
  title?: string;
  className?: string;
  showDots?: boolean;
  minHeight?: string;
}

export function TerminalWindow({
  children,
  title = "terminal",
  className = "",
  showDots = true,
  minHeight = "min-h-[200px]",
}: TerminalWindowProps) {
  return (
    <div
      className={`
        rounded-xl border border-neutral-800/80
        bg-[#0A0A0A]/95 backdrop-blur-md
        overflow-hidden shadow-2xl
        ${className}
      `}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800/80 bg-neutral-900/60">
        {showDots && (
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-[0_0_6px_#FF5F5780]" />
            <span className="w-3 h-3 rounded-full bg-[#FEBC2E] shadow-[0_0_6px_#FEBC2E80]" />
            <span className="w-3 h-3 rounded-full bg-[#28C840] shadow-[0_0_6px_#28C84080]" />
          </div>
        )}
        <span className="ml-2 text-xs font-mono text-neutral-500 select-none">{title}</span>
      </div>

      {/* Content */}
      <div className={`p-5 font-mono text-sm ${minHeight}`}>
        {children}
      </div>
    </div>
  );
}

/** Convenience component for a terminal prompt line */
export function TerminalLine({
  prompt = "$",
  command,
  output,
  type = "command",
}: {
  prompt?: string;
  command?: string;
  output?: string;
  type?: "command" | "success" | "error" | "info" | "warn";
}) {
  const outputColors = {
    command: "text-neutral-300",
    success: "text-emerald-400",
    error: "text-red-400",
    info: "text-cyan-400",
    warn: "text-amber-400",
  };

  if (output !== undefined) {
    return (
      <div className={`${outputColors[type]} leading-6`}>
        {output}
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2 leading-6">
      <span className="text-emerald-400 select-none shrink-0">{prompt}</span>
      <span className="text-neutral-200">{command}</span>
    </div>
  );
}

/** Blinking cursor */
export function Cursor({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block w-[2px] h-[1em] bg-emerald-400 ml-0.5 animate-[blink_1s_step-end_infinite] ${className}`}
    />
  );
}
