"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const certs = [
  { id: 1, title: "Databricks Data Engineer", src: "/certiications/databricks certification.PNG" },
  { id: 2, title: "Google Foundation Data", src: "/certiications/google foundation data certificate.PNG" },
  { id: 3, title: "LinkedIn Agentic AI", src: "/certiications/linked in agentic ai certification.PNG" },
  { id: 4, title: "IBM Python for Data Science", src: "/certiications/IBM Python for Data Science certification.PNG" },
  { id: 5, title: "Ask Questions to Make Data-Driven Decisions", src: "/certiications/ask data driven certification.PNG" },
  { id: 6, title: "HackerRank SQL", src: "/certiications/hacker rank sql certification.PNG" },
  { id: 7, title: "Neural Networks & DL", src: "/certiications/deeplearning certification.jpg" },
  { id: 8, title: "Structuring ML Projects", src: "/certiications/structuring machine learning projects certification.jpg" },
];

export default function Certifications() {
  return (
    <section id="certifications" className="relative w-full bg-[#000000] py-24 px-6 md:px-24 z-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Certifications</h2>
          <div className="h-[1px] w-full bg-white/10" />
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certs.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm aspect-[4/3]"
            >
              <Image 
                src={encodeURI(item.src)} 
                alt={item.title} 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none p-4">
                <span className="text-white font-medium text-center">{item.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
