"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const achievements = [
  { id: 1, title: "Abacus Hackathon Winner 2025", src: "/achievements/abacus hackathon winner 2025.PNG" },
  { id: 2, title: "ICT Meetup V6.0 Winner", src: "/achievements/ashish_ict winner 2019.jpg" },
  { id: 3, title: "Imagine Cup Winner 2021", src: "/achievements/imagine cup winner 2021.PNG" },
  { id: 4, title: "LOCUS 2020 Winner", src: "/achievements/locus 2020 winner.jpg" }
];

export default function Achievements() {
  return (
    <section id="achievements" className="relative w-full bg-[#000000] py-24 px-6 md:px-24 z-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Honors & Awards</h2>
          <div className="h-[1px] w-full bg-white/10" />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm aspect-video"
            >
              <Image 
                src={item.src} 
                alt={item.title} 
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <span className="text-white font-semibold text-xl text-center px-4">{item.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
