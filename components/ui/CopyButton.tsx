"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

interface CopyButtonProps {
  text: string;
  className?: string;
  iconSize?: number;
}

export function CopyButton({ text, className = "", iconSize = 14 }: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <button
      onClick={() => copy(text)}
      className={`relative flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200 ${
        copied
          ? "bg-terminal-green/20 border border-terminal-green/40 text-terminal-green"
          : "bg-neutral-800/80 border border-neutral-700/60 text-neutral-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10"
      } ${className}`}
      aria-label={copied ? "Copied!" : "Copy to clipboard"}
      title={copied ? "Copied!" : "Copy"}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Check size={iconSize} />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Copy size={iconSize} />
          </motion.span>
        )}
      </AnimatePresence>
      {/* Glow ring on copy */}
      <AnimatePresence>
        {copied && (
          <motion.span
            className="absolute inset-0 rounded-md border border-terminal-green/60"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </button>
  );
}
