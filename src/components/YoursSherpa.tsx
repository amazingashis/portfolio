"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 * Featured section for YoursSherpa (https://yourssherpa.com), Ashish's
 * forward-deployed engineering practice for data and AI. Copy mirrors the
 * YoursSherpa site; update both together.
 */

const SITE_URL = "https://yourssherpa.com";

const systems = [
  { no: "01", name: "RAG and agentic RAG", line: "Answers from your documents with citations, access control and evaluation." },
  { no: "02", name: "Data engineering automation", line: "Ingestion, Silver mappings and validation, assisted by an LLM hosted inside your network." },
  { no: "03", name: "Workflow automation and AI agents", line: "Manual processes automated in code, with agents only where judgment is needed." },
  { no: "04", name: "MCP servers and skills", line: "Skills, data and content served to any MCP-compatible AI tool from one governed endpoint." },
  { no: "05", name: "Data warehousing", line: "Star-schema warehouses tuned for the reports teams run every day." },
  { no: "06", name: "Data lake and lakehouse", line: "Medallion lakehouses in open formats, with quality gates and history." },
  { no: "07", name: "AI harness and fine-tuning", line: "Instructions, tools, guardrails and evaluations first. Fine-tuning when evaluations call for it." },
  { no: "08", name: "Analytical dashboards", line: "Metrics defined once, reconciled against source, in the BI tool you already use." },
];

const approach = [
  { title: "Assess", body: "Map the process as it really runs, workarounds included." },
  { title: "Feasibility", body: "Code, agent or person for each step, with a written go or no-go." },
  { title: "Build", body: "In the client's environment, starting with the smallest piece that proves it." },
  { title: "Run and hand over", body: "Monitoring, evaluation, runbooks and training." },
];

const platforms = ["Databricks", "AWS", "Azure", "Google Cloud", "Snowflake", "Private cloud"];

function SherpaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="ys-mark-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#7DD3FC" />
          <stop offset="1" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
      <path d="M8 86 L38 24 L53 50 L67 28 L92 86 Z" fill="url(#ys-mark-gradient)" />
      <circle cx="53" cy="14" r="5" fill="#F5B04A" />
    </svg>
  );
}

export default function YoursSherpa() {
  return (
    <section id="yourssherpa" className="relative w-full bg-[#000000] py-24 px-6 md:px-24 z-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">YoursSherpa</h2>
          <p className="text-gray-400 mb-6">My forward-deployed engineering practice for data and AI</p>
          <div className="h-[1px] w-full bg-white/10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md hover:border-violet-400/40 transition-all duration-700"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row">
            {/* Brand panel */}
            <div className="flex flex-col justify-between gap-10 p-8 md:p-12 lg:w-[400px] shrink-0 border-b lg:border-b-0 lg:border-r border-white/10 bg-black/30">
              <div>
                <SherpaMark className="w-20 h-20 mb-6" />
                <p className="text-3xl font-bold tracking-tight text-white">
                  Yours<span className="bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text text-transparent">Sherpa</span>
                </p>
                <p className="text-sm text-gray-300 mt-2">Founder &amp; Engineering Lead</p>
                <p className="text-sm text-gray-500">2026 – Present</p>
              </div>

              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-3">Runs on</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {platforms.map((p) => (
                    <span
                      key={p}
                      className="px-3 py-1 rounded-full text-xs font-medium border border-sky-400/30 text-sky-200 bg-sky-400/10"
                    >
                      {p}
                    </span>
                  ))}
                </div>
                <a
                  href={SITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white font-medium border border-white/20 rounded-full px-6 py-2.5 w-fit hover:bg-white hover:text-black transition-colors duration-300 text-sm"
                >
                  Visit yourssherpa.com <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Details panel */}
            <div className="flex-1 p-8 md:p-12">
              <p className="text-violet-300 text-sm font-semibold tracking-widest uppercase mb-4">
                Data platforms and AI agents
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-snug">
                Code where the rules are clear. Agents where they aren&apos;t.
              </h3>
              <p className="text-gray-300 text-base leading-relaxed mb-10 max-w-3xl">
                YoursSherpa works inside client teams to map the manual work and build pipelines, retrieval
                systems and AI agents in the client&apos;s own cloud. Each step is automated with deterministic
                code where it can be, given to an AI agent only where the work needs reading or judgment, and
                approved by a person when it sends, pays or commits.
              </p>

              <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">Eight reference systems</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 mb-10">
                {systems.map((s) => (
                  <li key={s.no} className="flex gap-3">
                    <span className="font-mono text-xs text-sky-300/80 pt-1 shrink-0">{s.no}</span>
                    <span>
                      <span className="block text-white font-medium">{s.name}</span>
                      <span className="block text-gray-400 text-sm leading-relaxed">{s.line}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">How an engagement runs</p>
              <ol className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {approach.map((a, i) => (
                  <li key={a.title} className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <span className="font-mono text-xs text-violet-300/80">{String(i + 1).padStart(2, "0")}</span>
                    <span className="block text-white font-medium mt-1">{a.title}</span>
                    <span className="block text-gray-400 text-sm leading-relaxed mt-1">{a.body}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
