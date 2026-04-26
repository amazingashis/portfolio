"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    id: 1,
    role: "Senior Software Engineer",
    company: "Abacus Insights",
    location: "Boston, USA (Remote)",
    date: "Jul 2025 - Present",
    details: [
      "Designed and maintained large-scale batch data pipelines in Databricks on AWS to standardize US healthcare datasets.",
      "Implemented medallion architecture (Bronze/Silver/Gold) with Delta Lake, including SCD handling.",
      "Orchestrated jobs using AWS Glue and Airflow; leveraged EventBridge and Lambda.",
      "Published curated tables to Snowflake for downstream analytics."
    ]
  },
  {
    id: 2,
    role: "Senior Data Engineer",
    company: "Cedar Gate Technologies",
    location: "Greenwich, CT, USA (Remote)",
    date: "Oct 2024 - Jun 2025",
    details: [
      "Developed an AWS Redshift data warehouse storing 10M+ healthcare records annually.",
      "Improved query performance by 30% and reduced reporting delays by 70%.",
      "Automated pipelines with AWS Glue, Airflow, and EventBridge-driven schedules."
    ]
  },
  {
    id: 3,
    role: "Data Engineer",
    company: "Cedar Gate Technologies",
    location: "Greenwich, CT, USA (Remote)",
    date: "Jan 2023 - Oct 2024",
    details: [
      "Engineered robust ETL pipelines processing 500K+ healthcare claims daily.",
      "Designed data validation frameworks, reducing data quality issues by 85%."
    ]
  },
  {
    id: 4,
    role: "Associate Data Engineer",
    company: "Cedar Gate Technologies",
    location: "Greenwich, CT, USA (Remote)",
    date: "Jan 2022 - Dec 2022",
    details: [
      "Assisted in developing data processing workflows for healthcare datasets.",
      "Contributed to SQL optimization efforts and database performance tuning."
    ]
  },
  {
    id: 5,
    role: "Remote AI/ML Specialist",
    company: "Clevero",
    location: "Melbourne",
    date: "Oct 2021 - Jan 2022",
    details: [
      "Assessed ML implementation for applications, reducing decision lead time by 40%."
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="relative w-full bg-[#000000] py-24 px-6 md:px-24 z-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Work Experience</h2>
          <div className="h-[1px] w-full bg-white/10" />
        </motion.div>

        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative border-l-2 border-white/10 pl-8 ml-4 md:ml-0"
            >
              <div className="absolute w-4 h-4 bg-cyan-500 rounded-full -left-[9px] top-2" />
              <div className="md:flex justify-between items-baseline mb-2">
                <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                <span className="text-gray-400 font-medium text-sm mt-2 md:mt-0 block md:inline">{exp.date}</span>
              </div>
              <p className="text-lg text-cyan-400 font-medium mb-4">{exp.company} <span className="text-gray-500 text-sm ml-2">{exp.location}</span></p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {exp.details.map((detail, idx) => (
                  <li key={idx} className="leading-relaxed">{detail}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
