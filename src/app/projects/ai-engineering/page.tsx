"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { aiEngineeringProjects } from "@/data/projects";
import { ArrowUpRight, ArrowLeft, BrainCircuit, Plus } from "lucide-react";

export default function AIEngineeringProjectsPage() {
  // Graphify is always shown first, prominently
  const featured = aiEngineeringProjects.find((p) => p.slug === "graphify");
  const rest = aiEngineeringProjects.filter((p) => p.slug !== "graphify");

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
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-500 text-sm hover:text-white transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <BrainCircuit className="w-6 h-6 text-violet-400" />
            <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase">Engineering</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-5 tracking-tight">
            AI Engineering
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            Open-source tooling, agent skills, and competition projects at the intersection of AI,
            knowledge graphs, and intelligent systems.
          </p>
        </motion.div>

        {/* ── Featured: Graphify ── */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="mb-10"
          >
            <p className="text-xs font-semibold tracking-widest text-gray-600 uppercase mb-5">Featured Project</p>
            <Link
              href={`/projects/ai-engineering/${featured.slug}`}
              className="block group relative rounded-2xl overflow-hidden border border-violet-500/30 bg-white/5 backdrop-blur-md hover:border-violet-400/50 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/15 to-fuchsia-600/15 opacity-50 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10 p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  {/* Left */}
                  <div className="flex-1">
                    <p className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-3">
                      {featured.category}
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{featured.title}</h2>
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl">
                      {featured.summary}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-6">
                      {featured.tags.slice(0, 6).map((t) => (
                        <span
                          key={t}
                          className="text-xs px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-300"
                        >
                          {t}
                        </span>
                      ))}
                      {featured.tags.length > 6 && (
                        <span className="text-xs px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-400">
                          +{featured.tags.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stat badge */}
                  {featured.stats?.[0] && (
                    <div className="shrink-0 flex flex-col items-center justify-center w-44 h-32 rounded-2xl border border-violet-500/30 bg-violet-500/10 text-center px-4">
                      <span className="text-5xl font-bold text-violet-300 leading-none">
                        {featured.stats[0].value}
                      </span>
                      <span className="text-xs text-gray-400 mt-2 leading-snug px-1">
                        {featured.stats[0].label}
                      </span>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="mt-10 flex items-center justify-between">
                  <span className="text-white font-medium group-hover:underline underline-offset-4 decoration-white/40">
                    View Full Project Details
                  </span>
                  <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* ── Rest of AI projects ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rest.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.12 }}
            >
              <Link
                href={`/projects/ai-engineering/${project.slug}`}
                className={`block group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 ${project.accentBorder} hover:bg-white/10 h-full`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
                />
                <div className="p-8 md:p-10 relative z-10 flex flex-col h-full min-h-[300px] justify-between">
                  <div>
                    <p className={`text-xs font-semibold tracking-widest uppercase mb-3 ${project.accentText}`}>
                      {project.category}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{project.title}</h2>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">{project.summary}</p>

                    <div className="flex flex-wrap gap-2 mt-6">
                      {project.tags.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-white text-sm font-medium group-hover:underline underline-offset-4 decoration-white/40">
                      View Project
                    </span>
                    <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Coming soon */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: rest.length * 0.12 }}
          >
            <div className="h-full min-h-[240px] rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-3 px-8 py-12 text-center">
              <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center">
                <Plus className="w-4 h-4 text-white/20" />
              </div>
              <p className="text-gray-700 text-sm">More projects coming soon</p>
            </div>
          </motion.div>
        </div>

      </div>
    </main>
  );
}
