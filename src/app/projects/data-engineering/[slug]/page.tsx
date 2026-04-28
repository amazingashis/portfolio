"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { dataEngineeringProjects } from "@/data/projects";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function DataEngineeringProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = dataEngineeringProjects.find((p) => p.slug === slug);

  if (!project) return notFound();

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
            href="/projects/data-engineering"
            className="inline-flex items-center gap-2 text-gray-500 text-sm hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Data Engineering Projects
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

          {/* Stats */}
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
                className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-400"
              >
                {t}
              </span>
            ))}
          </div>

          {project.externalUrl && (
            <Link
              href={project.externalUrl}
              target="_blank"
              className="inline-flex items-center gap-2 border border-white/20 rounded-full px-6 py-2.5 text-sm font-medium text-white hover:bg-white hover:text-black transition-colors duration-300"
            >
              View External Link <ArrowUpRight className="w-4 h-4" />
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
                  {/* Vertical line */}
                  {i < (project.implementation?.length ?? 0) - 1 && (
                    <div className="absolute left-[18px] top-10 bottom-0 w-[1px] bg-white/10" />
                  )}

                  {/* Step number dot */}
                  <div className={`shrink-0 h-9 w-9 rounded-full border flex items-center justify-center text-xs font-bold mt-0.5 z-10 bg-black border-${project.accentText.replace("text-", "")}`}>
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
              {project.useCases.map((uc) => (
                <div key={uc.title} className="rounded-xl border border-white/10 bg-white/5 p-6">
                  <p className="text-white font-semibold mb-2">{uc.title}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{uc.body}</p>
                </div>
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
                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${project.accentText}`} />
                  <div>
                    <code className={`font-mono text-sm ${project.accentText}`}>{a.file}</code>
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
              <span className="text-amber-400 text-lg shrink-0 mt-0.5">⚠</span>
              <div>
                <p className="text-amber-300 font-semibold mb-1">{project.limitation.title}</p>
                <p className="text-amber-300/70 text-sm leading-relaxed">{project.limitation.body}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Back nav */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pt-8 border-t border-white/10 flex items-center justify-between"
        >
          <Link
            href="/projects/data-engineering"
            className="inline-flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All Data Engineering Projects
          </Link>
          <Link
            href="/projects"
            className="text-gray-500 text-sm hover:text-white transition-colors"
          >
            All Projects →
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
