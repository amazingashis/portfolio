"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BadgeCheck, ExternalLink } from "lucide-react";

const cert = {
  title: "Databricks Certified Data Engineer Associate",
  issuer: "Databricks",
  year: "2024",
  description:
    "Validates proficiency in building, managing, and optimizing data pipelines on the Databricks Lakehouse Platform. Covers Apache Spark, Delta Lake, Delta Live Tables, Databricks Workflows, and Unity Catalog governance.",
  skills: ["Apache Spark", "Delta Lake", "Delta Live Tables", "Databricks Workflows", "Unity Catalog", "Python / SQL"],
  src: "/certified engineer/databricks certification.PNG",
  verifyUrl: "https://credentials.databricks.com/689dd448-460f-4e9e-adbb-afb97f725fc8",
};

export default function CertifiedEngineer() {
  return (
    <section id="certified-engineer" className="relative w-full bg-[#000000] py-24 px-6 md:px-24 z-20">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">Certified Engineer</h2>
          <p className="text-gray-400 mb-6">Industry-recognised professional certification</p>
          <div className="h-[1px] w-full bg-white/10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md hover:border-orange-500/40 transition-all duration-700"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="flex flex-col md:flex-row relative z-10">
            {/* Image panel */}
            <div className="relative w-full md:w-[420px] shrink-0 aspect-[4/3] md:aspect-auto md:min-h-[380px] bg-black/30 border-b md:border-b-0 md:border-r border-white/10">
              <Image
                src={encodeURI(cert.src)}
                alt={cert.title}
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
                  {cert.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  {cert.issuer} &nbsp;·&nbsp; {cert.year}
                </p>
                <p className="text-gray-300 text-base leading-relaxed mb-8">
                  {cert.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {cert.skills.map((skill) => (
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
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white font-medium border border-white/20 rounded-full px-6 py-2.5 w-fit hover:bg-white hover:text-black transition-colors duration-300 text-sm"
              >
                Verify Credential <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
