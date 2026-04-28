"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Database, BrainCircuit } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    id: "data-engineering",
    icon: Database,
    label: "Engineering",
    title: "Data Engineering",
    description:
      "Large-scale batch pipelines, Medallion architecture, cloud data warehouses, and healthcare data standardization across Databricks, Snowflake, and AWS.",
    stat: "2 projects",
    color: "from-cyan-500/20 to-blue-600/20",
    border: "hover:border-cyan-500/40",
    accent: "text-cyan-400",
    tagBorder: "border-cyan-500/20 text-cyan-400 bg-cyan-500/5",
    tags: ["Databricks", "Snowflake", "AWS Redshift", "Delta Lake"],
    href: "/projects#data-engineering",
  },
  {
    id: "ai-engineering",
    icon: BrainCircuit,
    label: "Engineering",
    title: "AI Engineering",
    description:
      "Knowledge graphs, agent tooling, open-source AI skills, and competition projects pushing the boundaries of intelligent systems.",
    stat: "2 projects",
    color: "from-violet-500/20 to-fuchsia-600/20",
    border: "hover:border-violet-500/40",
    accent: "text-violet-400",
    tagBorder: "border-violet-500/20 text-violet-400 bg-violet-500/5",
    tags: ["Knowledge Graphs", "LLM Tooling", "Open Source", "Agents"],
    href: "/projects#ai-engineering",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative w-full bg-[#000000] py-24 px-6 md:px-24 z-20">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Projects</h2>
          <div className="h-[1px] w-full bg-white/10" />
        </motion.div>

        {/* Category cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
              >
                <Link
                  href={cat.href}
                  className={`block group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 ${cat.border} hover:bg-white/10 h-full`}
                >
                  {/* Gradient bg */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
                  />

                  <div className="p-10 md:p-12 relative z-10 flex flex-col h-full min-h-[380px] justify-between">
                    <div>
                      {/* Icon + label */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center">
                          <Icon className={`w-5 h-5 ${cat.accent}`} />
                        </div>
                        <span className={`text-xs font-semibold tracking-widest uppercase ${cat.accent}`}>
                          {cat.label}
                        </span>
                      </div>

                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-5">{cat.title}</h3>
                      <p className="text-gray-400 text-base leading-relaxed mb-8">{cat.description}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {cat.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`text-xs px-3 py-1 rounded-full border ${cat.tagBorder}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 text-sm">{cat.stat}</span>
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 border border-white/10 rounded-full px-8 py-3.5 text-sm font-medium text-white hover:bg-white hover:text-black transition-colors duration-300"
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
