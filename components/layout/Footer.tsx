"use client";

import Link from "next/link";
import { Github, Terminal } from "lucide-react";

const NAV_LINKS = [
  { label: "Changelog", href: "#changelog" },
  { label: "Docs", href: "#docs" },
  { label: "Team", href: "#team" },
  { label: "Contact Us", href: "#contact" },
];

const LEGAL_LINKS = [
  { label: "Terms", href: "#terms" },
  { label: "Privacy", href: "#privacy" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-neutral-800/60 bg-[#050505] pt-16 pb-8 px-4 overflow-hidden">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-20 bg-purple-500/6 blur-[40px]" />

      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10">
                <Terminal size={14} className="text-purple-400" />
                <span className="font-mono text-sm font-bold text-white tracking-wider">CLI-X</span>
              </div>
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
              An AI-powered, CLI-first website development agent that turns natural-language ideas into deployment-ready web applications.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs text-emerald-400">Agent Engine v1.0.0 — Active</span>
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <div className="text-neutral-400 text-xs font-mono uppercase tracking-widest mb-4">Navigation</div>
            <div className="space-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-neutral-500 text-sm hover:text-neutral-300 transition-colors duration-150"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Commands column */}
          <div>
            <div className="text-neutral-400 text-xs font-mono uppercase tracking-widest mb-4">Commands</div>
            <div className="space-y-2">
              {["cli-x create", "cli-x edit", "cli-x run", "cli-x deploy"].map((cmd) => (
                <div key={cmd} className="font-mono text-sm text-neutral-500 hover:text-neutral-300 transition-colors duration-150 cursor-default">
                  <span className="text-emerald-600 mr-1">$</span>
                  {cmd}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-neutral-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-neutral-600 text-xs font-mono">
            © {new Date().getFullYear()} CLI-X. Built by developers, for developers.
          </div>
          <div className="flex items-center gap-4">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-neutral-600 text-xs hover:text-neutral-400 transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-neutral-300 transition-colors duration-150"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
