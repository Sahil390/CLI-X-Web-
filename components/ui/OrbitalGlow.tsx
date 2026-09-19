"use client";

import { motion } from "framer-motion";

interface OrbitalGlowProps {
  className?: string;
}

export function OrbitalGlow({ className = "" }: OrbitalGlowProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Central radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-purple-600/10 blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/8 blur-[80px]" />

      {/* SVG Orbital Arcs */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px]"
        viewBox="0 0 900 900"
        fill="none"
      >
        {/* Outer ring */}
        <motion.ellipse
          cx="450" cy="450"
          rx="420" ry="160"
          stroke="url(#ring1)"
          strokeWidth="1"
          strokeDasharray="8 12"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "450px 450px" }}
        />
        {/* Middle ring */}
        <motion.ellipse
          cx="450" cy="450"
          rx="300" ry="110"
          stroke="url(#ring2)"
          strokeWidth="1"
          strokeDasharray="6 10"
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "450px 450px" }}
        />
        {/* Inner ring */}
        <motion.ellipse
          cx="450" cy="450"
          rx="180" ry="65"
          stroke="url(#ring3)"
          strokeWidth="1"
          strokeDasharray="4 8"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "450px 450px" }}
        />
        <defs>
          <linearGradient id="ring1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
            <stop offset="40%" stopColor="#8B5CF6" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#06B6D4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ring2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0" />
            <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ring3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
            <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating node points */}
      {[
        { x: "20%", y: "30%", color: "#8B5CF6", delay: 0 },
        { x: "75%", y: "20%", color: "#06B6D4", delay: 0.8 },
        { x: "82%", y: "65%", color: "#8B5CF6", delay: 1.6 },
        { x: "15%", y: "70%", color: "#06B6D4", delay: 2.4 },
        { x: "50%", y: "15%", color: "#A78BFA", delay: 1.2 },
      ].map((node, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: node.x,
            top: node.y,
            backgroundColor: node.color,
            boxShadow: `0 0 12px 4px ${node.color}80`,
          }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: node.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
