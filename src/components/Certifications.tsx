"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BadgeCheck, ExternalLink } from "lucide-react";

const certifiedEngineer = {
  title: "Databricks Certified Data Engineer Associate",
  issuer: "Databricks",
  year: "2024",
  description:
    "Validates proficiency in building, managing, and optimizing data pipelines on the Databricks Lakehouse Platform. Covers Apache Spark, Delta Lake, Delta Live Tables, Databricks Workflows, and Unity Catalog governance.",
  skills: ["Apache Spark", "Delta Lake", "Delta Live Tables", "Databricks Workflows", "Unity Catalog", "Python / SQL"],
  src: "/certified engineer/databricks certification.PNG",
  verifyUrl: "https://credentials.databricks.com/689dd448-460f-4e9e-adbb-afb97f725fc8",
};

const otherCerts = [
  { id: 1,  title: "Google Foundations: Data, Data, Everywhere",          src: "/certiications/Foundations - Data, Data, Everywhere.PNG" },
  { id: 2,  title: "Ask Questions to Make Data-Driven Decisions",         src: "/certiications/ask data driven certification.PNG" },
  { id: 3,  title: "LinkedIn: Agentic AI for Developers",                 src: "/certiications/linked in agentic ai certification.PNG" },
  { id: 4,  title: "Agentic AI for Developers – Concepts & Application",   src: "/certiications/Agentic AI for Developers - Concepts and Application for Enterprises.PNG" },
  { id: 5,  title: "IBM Python for Data Science",                          src: "/certiications/IBM Python for Data Science certification.PNG" },
  { id: 6,  title: "Neural Networks & Deep Learning",                      src: "/certiications/deeplearning certification.jpg" },
  { id: 7,  title: "Improving Deep Neural Networks: Hyperparameter Tuning", src: "/certiications/Improving Deep Neural Networks - Hyperparameter.PNG" },
  { id: 8,  title: "Structuring Machine Learning Projects",                src: "/certiications/structuring machine learning projects certification.jpg" },
  { id: 9,  title: "Machine Learning – Zero to Hero",                      src: "/certiications/Machine Learning - Zero to Hero.PNG" },
  { id: 10, title: "Introduction to Large Language Models",                src: "/certiications/Introduction to Large Language Models.PNG" },
  { id: 11, title: "What Is Generative AI?",                               src: "/certiications/What Is Generative AI.PNG" },
  { id: 12, title: "Transfer Learning for NLP with TensorFlow Hub",        src: "/certiications/Transfer Learning for NLP with TensorFlow Hub.PNG" },
  { id: 13, title: "Apache Spark – Beyond Basics",                         src: "/certiications/Apache Spark - Beyond Basics.PNG" },
  { id: 14, title: "HackerRank SQL",                                       src: "/certiications/hacker rank sql certification.PNG" },
  { id: 15, title: "Google Foundation Data Certificate",                   src: "/certiications/google foundation data certificate.PNG" },
];

export default function Certifications() {
  return (
    <section id="certifications" className="relative w-full bg-[#000000] py-24 px-6 md:px-24 z-20">
      <div className="max-w-7xl mx-auto">

        {/* ───────────────── CERTIFIED ENGINEER ───────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">Certified Engineer</h2>
          <p className="text-gray-400 mb-6">Industry-recognised professional certifications</p>
          <div className="h-[1px] w-full bg-white/10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="mb-32 group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md hover:border-orange-500/40 hover:bg-white/8 transition-all duration-700"
        >
          {/* Gradient accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="flex flex-col md:flex-row gap-0 relative z-10">
            {/* Image panel */}
            <div className="relative w-full md:w-[420px] shrink-0 aspect-[4/3] md:aspect-auto md:min-h-[380px] bg-black/30 border-b md:border-b-0 md:border-r border-white/10">
              <Image
                src={encodeURI(certifiedEngineer.src)}
                alt={certifiedEngineer.title}
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-contain p-6 group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Details panel */}
            <div className="flex flex-col justify-between p-8 md:p-12 flex-1">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <BadgeCheck className="w-5 h-5 text-orange-400" />
                  <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase">
                    Professional Certification
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-snug">
                  {certifiedEngineer.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  {certifiedEngineer.issuer} &nbsp;·&nbsp; {certifiedEngineer.year}
                </p>

                <p className="text-gray-300 text-base leading-relaxed mb-8">
                  {certifiedEngineer.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {certifiedEngineer.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full text-xs font-medium border border-orange-500/30 text-orange-300 bg-orange-500/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={certifiedEngineer.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white font-medium border border-white/20 rounded-full px-6 py-2.5 w-fit hover:bg-white hover:text-black transition-colors duration-300 text-sm"
              >
                Verify Credential <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* ───────────────── OTHER CERTIFICATIONS ───────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">Other Certifications</h2>
          <p className="text-gray-400 mb-6">Continuous learning across AI, data, and cloud technologies</p>
          <div className="h-[1px] w-full bg-white/10" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {otherCerts.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="group relative rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm aspect-[4/3] hover:border-white/25 transition-all duration-300"
            >
              <Image
                src={encodeURI(item.src)}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none p-4">
                <span className="text-white font-medium text-center text-sm">{item.title}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
