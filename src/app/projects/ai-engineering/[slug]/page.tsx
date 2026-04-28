"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { aiEngineeringProjects, type IconKey } from "@/data/projects";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  FileSearch,
  Cpu,
  GitBranch,
  Layers,
  Database,
  BarChart3,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ICON_MAP: Record<IconKey, LucideIcon> = {
  FileSearch,
  Cpu,
  GitBranch,
  Layers,
  Database,
  BarChart3,
  ShieldCheck,
  Workflow,
};

// ─── Graphify-specific sections ───────────────────────────────────────────────

function GraphifyDetail({ project }: { project: (typeof aiEngineeringProjects)[number] }) {
  return (
    <>
      {/* How to use */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
        className="mb-16"
      >
        <h2 className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-6">Quick Start</h2>
        <div className="rounded-xl border border-violet-500/20 bg-black/40 p-6">
          <p className="text-gray-300 text-sm mb-4">
            Install the package and run one command inside your AI coding assistant:
          </p>
          <div className="space-y-3">
            {[
              { label: "Install", code: "pip install graphifyy && graphify install" },
              { label: "Run", code: "/graphify ." },
              { label: "Query", code: '/graphify query "what connects X to Y?"' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <span className="text-xs text-violet-400 font-semibold w-14 pt-2.5 shrink-0">{item.label}</span>
                <code className="flex-1 block bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-gray-200 font-mono">
                  {item.code}
                </code>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-xs mt-4">
            Works in: Claude Code · Cursor · Codex · Gemini CLI · GitHub Copilot CLI · VS Code Copilot · Aider · and more.
          </p>
        </div>
      </motion.div>

      {/* Use cases */}
      {project.useCases && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-8">Use Cases</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {project.useCases.map((uc) => {
              const Icon = ICON_MAP[uc.iconKey];
              return (
                <div
                  key={uc.title}
                  className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="shrink-0 h-9 w-9 rounded-xl border border-violet-500/20 bg-violet-500/10 flex items-center justify-center mt-0.5">
                    <Icon className="w-4 h-4 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">{uc.title}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{uc.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Implementation */}
      {project.implementation && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-8">
            3-Pass Extraction Pipeline
          </h2>
          <div className="space-y-0">
            {project.implementation.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative flex gap-6 pb-10"
              >
                {i < (project.implementation?.length ?? 0) - 1 && (
                  <div className="absolute left-[18px] top-10 bottom-0 w-[1px] bg-violet-500/20" />
                )}
                <div className="shrink-0 h-9 w-9 rounded-full border border-violet-500/40 bg-violet-500/10 flex items-center justify-center text-xs font-bold mt-0.5 z-10">
                  <span className="text-violet-400">{step.step}</span>
                </div>
                <div className="pt-1">
                  <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Artifacts */}
      {project.artifacts && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-6">Output Artifacts</h2>
          <div className="rounded-xl border border-white/10 bg-black/30 divide-y divide-white/10">
            {project.artifacts.map((a) => (
              <div key={a.file} className="flex gap-4 p-5">
                <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                <div>
                  <code className="font-mono text-sm text-violet-300">{a.file}</code>
                  <p className="text-gray-500 text-sm mt-0.5 leading-relaxed">{a.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Limitation */}
      {project.limitation && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex gap-4 items-start p-6 rounded-xl border border-amber-500/20 bg-amber-500/5">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-300 font-semibold mb-2">{project.limitation.title}</p>
              <p className="text-amber-300/70 text-sm leading-relaxed">{project.limitation.body}</p>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

// ─── Generic AI project detail ────────────────────────────────────────────────

function GenericDetail({ project }: { project: (typeof aiEngineeringProjects)[number] }) {
  return (
    <>
      {/* Implementation */}
      {project.implementation && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-8">
            Technical Implementation
          </h2>
          <div className="space-y-0">
            {project.implementation.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative flex gap-6 pb-10"
              >
                {i < (project.implementation?.length ?? 0) - 1 && (
                  <div className="absolute left-[18px] top-10 bottom-0 w-[1px] bg-white/10" />
                )}
                <div className={`shrink-0 h-9 w-9 rounded-full border border-white/20 bg-black flex items-center justify-center text-xs font-bold mt-0.5 z-10`}>
                  <span className={project.accentText}>{step.step}</span>
                </div>
                <div className="pt-1">
                  <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AIEngineeringProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = aiEngineeringProjects.find((p) => p.slug === slug);

  if (!project) return notFound();

  const isGraphify = project.slug === "graphify";

  return (
    <main className="relative w-full min-h-screen bg-[#000000]">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 md:px-16 pt-16 pb-32">

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-12 mb-12"
        >
          <Link
            href="/projects/ai-engineering"
            className="inline-flex items-center gap-2 text-gray-500 text-sm hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> AI Engineering Projects
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-16 pb-16 border-b border-white/10"
        >
          <p className={`text-xs font-semibold tracking-widest uppercase mb-4 ${project.accentText}`}>
            {project.category}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight leading-tight">
            {project.title}
          </h1>

          {/* Stats row */}
          {project.stats && (
            <div className="flex flex-wrap gap-8 mb-8">
              {project.stats.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className={`text-3xl font-bold ${project.accentText}`}>{s.value}</span>
                  <span className="text-sm text-gray-500 mt-1">{s.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((t) => (
              <span
                key={t}
                className={`text-xs px-3 py-1.5 rounded-full border border-${project.accentText.replace("text-", "")}/20 bg-${project.accentText.replace("text-", "")}/5 text-gray-400`}
              >
                {t}
              </span>
            ))}
          </div>

          {project.externalUrl && (
            <Link
              href={project.externalUrl}
              target="_blank"
              className={`inline-flex items-center gap-2 border border-${project.accentText.replace("text-", "")}/30 rounded-full px-6 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors duration-300`}
            >
              View on GitHub <ArrowUpRight className="w-4 h-4" />
            </Link>
          )}
        </motion.div>

        {/* Full description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-6">Overview</h2>
          <div className="space-y-5">
            {project.fullDescription.split("\n\n").map((para, i) => (
              <p key={i} className="text-gray-300 text-base md:text-lg leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Graphify gets extra sections; others get generic layout */}
        {isGraphify ? (
          <GraphifyDetail project={project} />
        ) : (
          <GenericDetail project={project} />
        )}

        {/* Footer nav */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pt-8 border-t border-white/10 flex items-center justify-between"
        >
          <Link
            href="/projects/ai-engineering"
            className="inline-flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All AI Engineering Projects
          </Link>
          <Link href="/projects" className="text-gray-500 text-sm hover:text-white transition-colors">
            All Projects →
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
