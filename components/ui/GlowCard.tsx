"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "purple" | "cyan" | "green" | "amber" | "none";
  hover?: boolean;
  delay?: number;
}

const glowMap = {
  purple: "hover:shadow-purple-500/20 hover:border-purple-500/40",
  cyan: "hover:shadow-cyan-500/20 hover:border-cyan-500/40",
  green: "hover:shadow-green-400/20 hover:border-green-400/40",
  amber: "hover:shadow-amber-400/20 hover:border-amber-400/40",
  none: "",
};

export function GlowCard({
  children,
  className = "",
  glowColor = "purple",
  hover = true,
  delay = 0,
}: GlowCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`
        relative rounded-xl border border-neutral-800/80
        bg-neutral-900/60 backdrop-blur-md
        ${hover ? `transition-all duration-300 hover:shadow-lg ${glowMap[glowColor]}` : ""}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
