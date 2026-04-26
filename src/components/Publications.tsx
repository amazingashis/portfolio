"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";
import Link from "next/link";

const publications = [
  {
    id: 1,
    title: "Generative Adversarial Networks in Anomaly Detection and Malware Detection: A Comprehensive Survey",
    category: "Published at Advances in Artificial Intelligence Research (2024)",
    description: "A comprehensive survey exploring the applications of GANs in detecting anomalies and malware, analyzing current methodologies and future directions.",
    color: "from-blue-500/20 to-purple-500/20",
    url: "https://doi.org/10.54569/aair.1442665"
  },
  {
    id: 2,
    title: "Environmental Satellite to Monitor Real-Time Environmental Parameter Changes in Response to Increased Climate Action",
    category: "Published at 73rd International Astronautical Congress, Paris, France",
    description: "Research presented at the IAC detailing the use of environmental satellites for real-time monitoring of parameter changes driven by climate action.",
    color: "from-emerald-500/20 to-teal-500/20",
    url: "https://iafastro.directory/iac/paper/id/68130/summary/"
  }
];

export default function Publications() {
  return (
    <section id="publications" className="relative w-full bg-[#000000] py-24 px-6 md:px-24 z-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Research & Publications</h2>
          <div className="h-[1px] w-full bg-white/10" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {publications.map((pub, index) => {
            const isExternal = pub.url !== "#";
            const CardWrapper = isExternal ? Link : "div";
            
            return (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="h-full"
              >
                <CardWrapper 
                  href={isExternal ? pub.url : "#"}
                  target={isExternal ? "_blank" : undefined}
                  className="block group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10 h-full"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${pub.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
                  />
                  
                  <div className="p-8 md:p-12 relative z-10 flex flex-col h-full min-h-[350px] justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <BookOpen className="w-5 h-5 text-gray-400" />
                        <p className="text-sm font-medium tracking-widest text-gray-400 uppercase">
                          Research Paper
                        </p>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4 line-clamp-3">
                        {pub.title}
                      </h3>
                      <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 font-medium text-emerald-400/80">
                        {pub.category}
                      </p>
                      <p className="text-gray-400 text-base leading-relaxed line-clamp-3">
                        {pub.description}
                      </p>
                    </div>
                    
                    <div className="mt-8 flex items-center justify-between w-full">
                      <span className="text-white font-medium group-hover:underline underline-offset-4 decoration-white/50">
                        {isExternal ? "Read Publication" : "Publication Details"}
                      </span>
                      {isExternal && (
                        <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                          <ArrowUpRight className="w-5 h-5" />
                        </div>
                      )}
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
