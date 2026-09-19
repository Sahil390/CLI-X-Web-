"use client";

import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "purple" | "cyan" | "green" | "amber" | "neutral";
  size?: "sm" | "md";
  dot?: boolean;
  className?: string;
}

const variantClasses = {
  purple: "bg-purple-500/10 border-purple-500/30 text-purple-300",
  cyan: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
  green: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
  amber: "bg-amber-500/10 border-amber-500/30 text-amber-300",
  neutral: "bg-neutral-800/60 border-neutral-700/60 text-neutral-400",
};

const dotColors = {
  purple: "bg-purple-400",
  cyan: "bg-cyan-400",
  green: "bg-emerald-400",
  amber: "bg-amber-400",
  neutral: "bg-neutral-500",
};

const sizeClasses = {
  sm: "px-2.5 py-0.5 text-xs",
  md: "px-3.5 py-1 text-sm",
};

export function Badge({
  children,
  variant = "purple",
  size = "sm",
  dot = false,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        rounded-full border font-mono font-medium
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${dotColors[variant]}`} />
      )}
      {children}
    </span>
  );
}
