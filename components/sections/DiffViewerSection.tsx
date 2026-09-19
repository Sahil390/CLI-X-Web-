"use client";

import { GlowCard } from "@/components/ui/GlowCard";
import { Badge } from "@/components/ui/Badge";
import { FileCode } from "lucide-react";

const DIFF_LINES = [
  { type: "file", content: "--- a/components/Dashboard.tsx" },
  { type: "file", content: "+++ b/components/Dashboard.tsx" },
  { type: "hunk", content: "@@ -42,8 +42,12 @@ export function Dashboard() {" },
  { type: "ctx", content: "  const [data, setData] = useState(null);" },
  { type: "ctx", content: "  const [loading, setLoading] = useState(false);" },
  { type: "ctx", content: "" },
  { type: "del", content: "-  const fetchData = async () => {" },
  { type: "del", content: "-    const res = await fetch('/api/data');" },
  { type: "del", content: "-    setData(res.json());" },
  { type: "del", content: "-  };" },
  { type: "add", content: "+  const fetchData = async () => {" },
  { type: "add", content: "+    setLoading(true);" },
  { type: "add", content: "+    try {" },
  { type: "add", content: "+      const res = await fetch('/api/data');" },
  { type: "add", content: "+      setData(await res.json());" },
  { type: "add", content: "+    } finally {" },
  { type: "add", content: "+      setLoading(false);" },
  { type: "add", content: "+    }" },
  { type: "add", content: "+  };" },
  { type: "ctx", content: "" },
  { type: "ctx", content: "  useEffect(() => { fetchData(); }, []);" },
];

const lineStyles: Record<string, string> = {
  file: "text-neutral-400 font-bold",
  hunk: "text-cyan-400/80",
  ctx: "text-neutral-500",
  del: "text-red-400 bg-red-500/8",
  add: "text-emerald-400 bg-emerald-500/8",
};

export function DiffViewerSection() {
  return (
    <section id="diff-viewer" className="relative py-24 px-4 overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[500px] h-[400px] bg-cyan-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <Badge variant="cyan" className="mb-4">Iterative 2-Way Edits</Badge>
            <h2 className="text-4xl sm:text-5xl font-bold font-display text-white mb-5 leading-tight">
              Surgical edits.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                Zero destruction.
              </span>
            </h2>
            <p className="text-neutral-400 mb-6 leading-relaxed">
              CLI-X performs minimal, targeted file diffs. It never rewrites entire codebases — it finds exactly what needs to change and applies a precise, isolated patch.
            </p>
            <div className="space-y-3">
              {[
                { label: "Targeted diffs", desc: "Only changed lines are touched", color: "emerald" },
                { label: "Context-aware", desc: "Understands surrounding code before editing", color: "cyan" },
                { label: "Rollback-safe", desc: "Git history preserved; every edit is reversible", color: "purple" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${
                    item.color === "emerald" ? "bg-emerald-400" : item.color === "cyan" ? "bg-cyan-400" : "bg-purple-400"
                  }`} />
                  <div>
                    <span className="text-white text-sm font-medium">{item.label}</span>
                    <span className="text-neutral-500 text-sm"> — {item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Diff viewer */}
          <GlowCard glowColor="cyan" hover={false}>
            <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800/80">
              <FileCode size={14} className="text-cyan-400" />
              <span className="font-mono text-xs text-neutral-400">cli-x edit → Dashboard.tsx</span>
              <div className="ml-auto flex gap-3 font-mono text-xs">
                <span className="text-red-400">−4</span>
                <span className="text-emerald-400">+9</span>
              </div>
            </div>
            <div className="overflow-x-auto p-4">
              <div className="font-mono text-xs space-y-0.5 min-w-[400px]">
                {DIFF_LINES.map((line, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2 px-2 py-0.5 rounded-sm leading-5 ${lineStyles[line.type]}`}
                  >
                    <span className="select-none text-neutral-700 w-6 text-right shrink-0">{i + 1}</span>
                    <span className="whitespace-pre">{line.content}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
