"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  ArrowUpRight,
  ArrowLeft,
  Database,
  BrainCircuit,
  AlertTriangle,
  CheckCircle2,
  Layers,
  GitBranch,
  Cpu,
  FileSearch,
  Plus,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Tag {
  label: string;
}

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  color: string;
  accentBorder: string;
  url: string;
  tags: Tag[];
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const dataEngineeringProjects: Project[] = [
  {
    id: 1,
    title: "Healthcare Data Standardization",
    category: "Data Engineering · Abacus Insights",
    description:
      "Designed large-scale batch data pipelines in Databricks on AWS to standardize US healthcare datasets across multiple payers. Implemented Medallion architecture (Bronze / Silver / Gold) with Delta Lake, SCD Type-2 handling, and schema enforcement. Orchestrated jobs using AWS Glue and Airflow with EventBridge triggers, then published curated Gold tables to Snowflake for downstream analytics teams.",
    color: "from-cyan-500/15 to-blue-600/15",
    accentBorder: "hover:border-cyan-500/40",
    url: "#",
    tags: [
      { label: "Databricks" },
      { label: "AWS" },
      { label: "Delta Lake" },
      { label: "Medallion Architecture" },
      { label: "Snowflake" },
      { label: "Apache Airflow" },
    ],
  },
  {
    id: 2,
    title: "Enterprise Data Warehouse",
    category: "Data Warehouse · Cedar Gate Technologies",
    description:
      "Developed an AWS Redshift data warehouse storing 10M+ healthcare records annually for value-based care analytics. Improved query performance by 30% through distribution keys, sort keys, and materialised views. Reduced downstream reporting delays by 70% by automating ingestion pipelines with AWS Glue, Airflow, and EventBridge-driven schedules.",
    color: "from-blue-500/15 to-indigo-600/15",
    accentBorder: "hover:border-blue-500/40",
    url: "#",
    tags: [
      { label: "AWS Redshift" },
      { label: "AWS Glue" },
      { label: "Airflow" },
      { label: "EventBridge" },
      { label: "ETL" },
    ],
  },
  // ─── Add new Data Engineering projects above this line ───────────────────────
];

const aiEngineeringProjects: Project[] = [
  {
    id: 10,
    title: "Imagine Cup 2021",
    category: "World Finalist · Microsoft · Earth Category",
    description:
      "Developed an AI-driven environmental sustainability solution that reached the World Finals of the Microsoft Imagine Cup (Earth Category). The project combined computer vision with real-time sensor data to surface actionable insights for environmental monitoring.",
    color: "from-emerald-500/15 to-teal-600/15",
    accentBorder: "hover:border-emerald-500/40",
    url: "https://aka.ms/EarthCategory",
    tags: [
      { label: "Machine Learning" },
      { label: "Computer Vision" },
      { label: "Microsoft Azure" },
      { label: "Sustainability" },
    ],
  },
  // ─── Add new AI Engineering projects above this line ─────────────────────────
];

// ─── Graphify detailed data ───────────────────────────────────────────────────

const graphifyUseCases = [
  {
    icon: FileSearch,
    title: "Navigate large codebases",
    body: "Type /graphify . in your AI assistant and get a queryable knowledge graph instead of grepping through hundreds of files.",
  },
  {
    icon: Cpu,
    title: "71.5× fewer tokens per query",
    body: "On a 52-file corpus (Karpathy repos + papers + images) graphify reduced tokens per query from raw-file reading to graph-based retrieval — 71.5× savings that compound with every subsequent query.",
  },
  {
    icon: GitBranch,
    title: "Cross-file call graph & lineage",
    body: "AST extraction via tree-sitter builds cross-file call graphs, import chains, and class-hierarchy edges for 25 languages — all without sending code to an LLM.",
  },
  {
    icon: Layers,
    title: "Multi-modal corpus",
    body: "Drop in code, PDFs, markdown, screenshots, diagrams, and videos. Graphify extracts concepts from all of them and merges them into one unified graph.",
  },
];

const graphifyImplementation = [
  {
    step: "01",
    title: "AST Pass (no LLM)",
    description:
      "tree-sitter deterministically parses 25 languages. Extracts classes, functions, imports, call graphs, docstrings, and rationale comments (/# WHY:/, /# NOTE:/) without any model inference.",
  },
  {
    step: "02",
    title: "Media Transcription",
    description:
      "Video and audio files are transcribed locally with faster-whisper using a domain-aware prompt derived from corpus god nodes. Transcripts are SHA256-cached — re-runs are instant.",
  },
  {
    step: "03",
    title: "Parallel Semantic Extraction",
    description:
      "Claude subagents run in parallel over docs, papers, and images to extract concepts, relationships, and design rationale. Every edge is tagged EXTRACTED, INFERRED (with confidence 0–1), or AMBIGUOUS.",
  },
  {
    step: "04",
    title: "Graph Build & Clustering",
    description:
      "Results merge into a NetworkX graph. Leiden community detection clusters nodes by edge density — no embeddings or vector DB needed. Outputs: graph.html (interactive), graph.json (queryable), GRAPH_REPORT.md (audit).",
  },
];

// ─── Sub-components ─────────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isExternal = project.url !== "#";
  const Wrapper = isExternal ? Link : "div";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
    >
      <Wrapper
        href={isExternal ? project.url : "#"}
        target={isExternal ? "_blank" : undefined}
        className={`block group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 ${project.accentBorder} hover:bg-white/10 h-full`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
        />
        <div className="p-8 md:p-10 relative z-10 flex flex-col h-full min-h-[300px] justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-3">
              {project.category}
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{project.title}</h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-6">
              {project.tags.map((t) => (
                <span
                  key={t.label}
                  className="text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400"
                >
                  {t.label}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <span className="text-white text-sm font-medium group-hover:underline underline-offset-4 decoration-white/40">
              {isExternal ? "View Project" : "Internal Case Study"}
            </span>
            <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Wrapper>
    </motion.div>
  );
}

function ComingSoon({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="h-full min-h-[220px] rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-3 px-8 py-12 text-center">
        <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center">
          <Plus className="w-4 h-4 text-white/20" />
        </div>
        <p className="text-gray-700 text-sm">More projects coming soon</p>
      </div>
    </motion.div>
  );
}

function SectionHeader({
  id,
  icon: Icon,
  accent,
  title,
  subtitle,
  description,
  delay,
}: {
  id: string;
  icon: React.ElementType;
  accent: string;
  title: string;
  subtitle: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay }}
      className="mb-14 scroll-mt-24"
    >
      <div className="flex items-center gap-3 mb-3">
        <Icon className={`w-5 h-5 ${accent}`} />
        <p className={`text-xs font-semibold tracking-widest uppercase ${accent}`}>{subtitle}</p>
      </div>
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{title}</h2>
      <p className="text-gray-400 text-base max-w-2xl leading-relaxed mb-8">{description}</p>
      <div className="h-[1px] w-full bg-white/10" />
    </motion.div>
  );
}

// ─── Graphify Featured Card ───────────────────────────────────────────────────

function GraphifyCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9 }}
      className="mb-8"
    >
      <div className="group relative rounded-2xl overflow-hidden border border-violet-500/30 bg-white/5 backdrop-blur-md hover:border-violet-400/50 transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/15 to-fuchsia-600/15 opacity-50 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none" />

        {/* ── Header ── */}
        <div className="relative z-10 p-8 md:p-12 border-b border-white/10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase">
                  Open Source · AI Engineering
                </span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">Graphify</h3>
              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                An AI coding assistant skill that turns any folder of code, docs, papers, images, or videos
                into a queryable knowledge graph — giving your AI assistant structured context instead of raw files.
                Works inside Claude Code, Cursor, Codex, Gemini CLI, GitHub Copilot CLI, and more.
              </p>
            </div>

            {/* Stat */}
            <div className="shrink-0 flex flex-col items-center justify-center w-44 h-32 rounded-2xl border border-violet-500/30 bg-violet-500/10 text-center px-4">
              <span className="text-5xl font-bold text-violet-300 leading-none">71.5×</span>
              <span className="text-xs text-gray-400 mt-2 leading-snug">fewer tokens per query vs raw files</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {["Knowledge Graph", "AST / tree-sitter", "Leiden Clustering", "Multi-modal", "Token Reduction", "MCP Server", "Python"].map((t) => (
              <span key={t} className="text-xs px-3 py-1 rounded-full border border-violet-500/25 bg-violet-500/10 text-violet-300">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ── Use Cases ── */}
        <div className="relative z-10 p-8 md:p-12 border-b border-white/10">
          <h4 className="text-sm font-semibold tracking-widest text-gray-500 uppercase mb-8">Use Cases</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {graphifyUseCases.map((uc) => {
              const Icon = uc.icon;
              return (
                <div key={uc.title} className="flex gap-4">
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
        </div>

        {/* ── Implementation ── */}
        <div className="relative z-10 p-8 md:p-12 border-b border-white/10">
          <h4 className="text-sm font-semibold tracking-widest text-gray-500 uppercase mb-8">How It Works — 3-Pass Pipeline</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {graphifyImplementation.map((step) => (
              <div key={step.step} className="flex gap-5">
                <span className="shrink-0 text-2xl font-bold text-violet-500/40 leading-none mt-0.5 w-8 text-right">
                  {step.step}
                </span>
                <div>
                  <p className="text-white font-semibold mb-2">{step.title}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Output artifacts */}
          <div className="mt-8 rounded-xl border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-4">Output Artifacts</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              {[
                { file: "graph.html", desc: "Interactive vis.js graph — click nodes, filter by community, search" },
                { file: "GRAPH_REPORT.md", desc: "God nodes, surprising cross-file connections, suggested questions" },
                { file: "graph.json", desc: "Persistent graph — query weeks later via CLI or MCP server" },
              ].map((a) => (
                <div key={a.file} className="flex gap-3">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                  <div>
                    <code className="text-violet-300 font-mono text-xs">{a.file}</code>
                    <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Limitation ── */}
        <div className="relative z-10 p-8 md:p-12 border-b border-white/10">
          <div className="flex gap-4 items-start p-5 rounded-xl border border-amber-500/20 bg-amber-500/5">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-300 font-semibold text-sm mb-1">Limitation — Not suited for Data Engineering projects</p>
              <p className="text-amber-300/70 text-sm leading-relaxed">
                Graphify tracks <strong className="text-amber-300">code-level lineage</strong> — class hierarchies, function call chains, import graphs — using AST analysis.
                It does <em>not</em> model <strong className="text-amber-300">data pipeline lineage</strong> (sources → transformations → sinks).
                For DE projects you need dedicated data-lineage tools such as{" "}
                <span className="text-amber-200">OpenLineage</span>, <span className="text-amber-200">Marquez</span>, or{" "}
                <span className="text-amber-200">Unity Catalog Lineage</span> — which track how data flows through pipelines, not how code calls code.
              </p>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="relative z-10 p-8 md:p-12 flex items-center justify-between">
          <div>
            <p className="text-white font-semibold mb-1">View on GitHub</p>
            <p className="text-gray-500 text-sm">github.com/amazingashis/graphify</p>
          </div>
          <Link
            href="https://github.com/amazingashis/graphify"
            target="_blank"
            className="inline-flex items-center gap-2 border border-violet-500/30 rounded-full px-6 py-3 text-sm font-medium text-white hover:bg-violet-500/20 transition-colors duration-300"
          >
            Open Repository <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#000000]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 md:px-24 pt-16 pb-32">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pt-12 pb-16 border-b border-white/10 mb-20"
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-gray-500 text-sm hover:text-white transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">Projects</h1>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            A collection of engineering projects spanning large-scale data infrastructure and intelligent AI systems.
            Each project reflects real-world problems solved at scale.
          </p>
        </motion.div>

        {/* ── Data Engineering ── */}
        <div className="mb-28">
          <SectionHeader
            id="data-engineering"
            icon={Database}
            accent="text-cyan-400"
            subtitle="Engineering"
            title="Data Engineering"
            description="Production-grade data pipelines, cloud warehouses, and healthcare data standardization built on Databricks, AWS, and Snowflake."
            delay={0}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dataEngineeringProjects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
            <ComingSoon delay={dataEngineeringProjects.length * 0.1 + 0.1} />
          </div>
        </div>

        {/* ── AI Engineering ── */}
        <div>
          <SectionHeader
            id="ai-engineering"
            icon={BrainCircuit}
            accent="text-violet-400"
            subtitle="Engineering"
            title="AI Engineering"
            description="Open-source tooling, agent skills, and competition projects at the intersection of AI, knowledge graphs, and intelligent systems."
            delay={0}
          />

          {/* Graphify — full-width featured */}
          <GraphifyCard />

          {/* Other AI projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiEngineeringProjects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
            <ComingSoon delay={aiEngineeringProjects.length * 0.1 + 0.1} />
          </div>
        </div>

      </div>
    </main>
  );
}
