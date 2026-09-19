"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Github, Menu, X, Terminal } from "lucide-react";

const NAV_LINKS = [
  { label: "Changelog", href: "#changelog" },
  { label: "Docs", href: "#docs" },
  { label: "Team", href: "#team" },
  { label: "Contact Us", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050505]/80 backdrop-blur-xl border-b border-neutral-800/60 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10 backdrop-blur-md
            group-hover:border-purple-500/60 group-hover:bg-purple-500/15 transition-all duration-200">
            <Terminal size={14} className="text-purple-400" />
            <span className="font-mono text-sm font-bold text-white tracking-wider">CLI-X</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-4 py-2 rounded-lg text-sm text-neutral-400 font-medium
                hover:text-white hover:bg-white/5 transition-all duration-150"
            >
              {link.label}
            </Link>
          ))}
          {/* GitHub */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-700/80
              text-sm text-neutral-300 font-medium bg-neutral-900/60
              hover:border-purple-500/50 hover:text-white hover:bg-purple-500/10
              transition-all duration-200"
            id="github-nav-link"
          >
            <Github size={15} />
            <span>GitHub</span>
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          id="mobile-menu-button"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-neutral-800/60 bg-[#050505]/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center px-4 py-3 rounded-lg text-neutral-300
                    hover:text-white hover:bg-white/5 transition-all duration-150 font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-neutral-300
                  hover:text-white hover:bg-white/5 transition-all duration-150 font-medium"
              >
                <Github size={16} />
                GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
