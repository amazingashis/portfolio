"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Healthcare Data Standardization",
    category: "Data Engineering @ Abacus Insights",
    description: "Designed large-scale batch data pipelines in Databricks on AWS to standardize US healthcare datasets using Medallion architecture.",
    color: "from-blue-500/20 to-cyan-500/20",
    url: "#"
  },
  {
    id: 2,
    title: "Enterprise DW",
    category: "Data Warehouse @ Cedar Gate",
    description: "Developed AWS Redshift DW storing 10M+ records annually, improving queries by 30% and reducing reporting delays.",
    color: "from-purple-500/20 to-pink-500/20",
    url: "#"
  },
  {
    id: 3,
    title: "Imagine Cup 2021",
    category: "World Finalist - Earth Category",
    description: "Developed an innovative solution focused on environmental sustainability, reaching the world finals of the Microsoft Imagine Cup.",
    color: "from-emerald-500/20 to-teal-500/20",
    url: "https://aka.ms/EarthCategory"
  },
  {
    id: 4,
    title: "Hack-O-Lantern",
    category: "Hackathon Winner",
    description: "First place in a competitive programming event. Built a creative and engaging software solution under strict time constraints.",
    color: "from-orange-500/20 to-amber-500/20",
    url: "https://trick-or-treat-share.netlify.app"
  },
  {
    id: 5,
    title: "Cansat Aavishkar 19",
    category: "Space & Engineering Winner",
    description: "Developed a Cansat model. Featured and winner at Kathmandu University competition.",
    color: "from-blue-500/20 to-indigo-500/20",
    url: "https://ensatnepal.github.io"
  },
  {
    id: 6,
    title: "MongoDB Student Spotlight",
    category: "Featured Project",
    description: "Student project showcase selected by MongoDB for its innovative use of document databases.",
    color: "from-green-500/20 to-emerald-500/20",
    url: "https://learn.mongodb.com/courses/student-project-ensat"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="relative w-full bg-[#000000] py-24 px-6 md:px-24 z-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Selected Projects</h2>
          <div className="h-[1px] w-full bg-white/10" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => {
            const isExternal = project.url !== "#";
            const CardWrapper = isExternal ? Link : "div";
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <CardWrapper 
                  href={isExternal ? project.url : "#"}
                  target={isExternal ? "_blank" : undefined}
                  className="block group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10 h-full"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
                  />
                  
                  <div className="p-8 md:p-12 relative z-10 flex flex-col h-full min-h-[350px] justify-between">
                    <div>
                      <p className="text-sm font-medium tracking-widest text-gray-400 uppercase mb-4">
                        {project.category}
                      </p>
                      <h3 className="text-3xl md:text-4xl font-semibold text-white mb-6">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 text-lg leading-relaxed max-w-sm">
                        {project.description}
                      </p>
                    </div>
                    
                    <div className="mt-12 flex items-center justify-between w-full">
                      <span className="text-white font-medium group-hover:underline underline-offset-4 decoration-white/50">
                        {isExternal ? "View External Link" : "Case Study (Internal)"}
                      </span>
                      <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </CardWrapper>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
