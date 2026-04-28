"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ArrowUpRight, ArrowLeft, Database, BrainCircuit } from "lucide-react";

const categories = [
  {
    href: "/projects/data-engineering",
    icon: Database,
    accent: "text-cyan-400",
    border: "border-cyan-500/30 hover:border-cyan-400/50",
    gradientHover: "from-cyan-500/15 to-blue-600/15",
    tagStyle: "border-cyan-500/20 text-cyan-400 bg-cyan-500/5",
    title: "Data Engineering",
    subtitle: "Engineering",
    description:
      "Large-scale batch pipelines, Medallion architecture, cloud data warehouses, and healthcare data standardization built on Databricks, Snowflake, and AWS.",
    count: "2 projects",
    tags: ["Databricks", "Snowflake", "AWS Redshift", "Delta Lake"],
  },
  {
    href: "/projects/ai-engineering",
    icon: BrainCircuit,
    accent: "text-violet-400",
    border: "border-violet-500/30 hover:border-violet-400/50",
    gradientHover: "from-violet-500/15 to-fuchsia-600/15",
    tagStyle: "border-violet-500/20 text-violet-400 bg-violet-500/5",
    title: "AI Engineering",
    subtitle: "Engineering",
    description:
      "Open-source tooling, agent skills, and competition projects at the intersection of AI, knowledge graphs, and intelligent systems.",
    count: "2 projects",
    tags: ["Knowledge Graphs", "LLM Tooling", "Open Source", "Agents"],
  },
];

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
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-5 tracking-tight">Projects</h1>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            A collection of engineering projects spanning large-scale data infrastructure and intelligent AI systems.
            Each project reflects real-world problems solved at scale.
          </p>
        </motion.div>

        {/* Category cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.href}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
              >
                <Link
                  href={cat.href}
                  className={`block group relative rounded-2xl overflow-hidden border bg-white/5 backdrop-blur-md transition-all duration-500 ${cat.border} hover:bg-white/10 h-full`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${cat.gradientHover} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
                  />

                  <div className="p-10 md:p-12 relative z-10 flex flex-col h-full min-h-[400px] justify-between">
                    <div>
                      {/* Icon + subtitle */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center">
                          <Icon className={`w-5 h-5 ${cat.accent}`} />
                        </div>
                        <span className={`text-xs font-semibold tracking-widest uppercase ${cat.accent}`}>
                          {cat.subtitle}
                        </span>
                      </div>

                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">{cat.title}</h2>
                      <p className="text-gray-400 text-base leading-relaxed mb-8">{cat.description}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {cat.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`text-xs px-3 py-1 rounded-full border ${cat.tagStyle}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-600 text-sm">{cat.count}</span>
                        <span className="text-white font-medium group-hover:underline underline-offset-4 decoration-white/40">
                          Explore Projects
                        </span>
                      </div>
                      <div className="h-11 w-11 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </main>
  );
}
