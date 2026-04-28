"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { dataEngineeringProjects } from "@/data/projects";
import { ArrowUpRight, ArrowLeft, Database, Plus } from "lucide-react";

export default function DataEngineeringProjectsPage() {
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
            <Database className="w-6 h-6 text-cyan-400" />
            <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">Engineering</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-5 tracking-tight">
            Data Engineering
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            Production-grade data pipelines, cloud warehouses, and healthcare data standardization
            built on Databricks, AWS, and Snowflake.
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {dataEngineeringProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.12 }}
            >
              <Link
                href={`/projects/data-engineering/${project.slug}`}
                className={`block group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 ${project.accentBorder} hover:bg-white/10 h-full`}
              >
                {/* Hover gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
                />

                <div className="p-8 md:p-10 relative z-10 flex flex-col h-full min-h-[320px] justify-between">
                  <div>
                    <p className={`text-xs font-semibold tracking-widest uppercase mb-3 ${project.accentText}`}>
                      {project.category}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{project.title}</h2>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">{project.summary}</p>

                    {/* Stats */}
                    {project.stats && (
                      <div className="flex flex-wrap gap-4 mt-6">
                        {project.stats.map((s) => (
                          <div key={s.label} className="flex flex-col">
                            <span className={`text-xl font-bold ${project.accentText}`}>{s.value}</span>
                            <span className="text-xs text-gray-500 mt-0.5">{s.label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-6">
                      {project.tags.slice(0, 5).map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400"
                        >
                          {t}
                        </span>
                      ))}
                      {project.tags.length > 5 && (
                        <span className="text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-gray-500">
                          +{project.tags.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
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
            transition={{ duration: 0.6, delay: dataEngineeringProjects.length * 0.12 }}
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
