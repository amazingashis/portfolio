"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const images = [
  "20190914_114639.jpg", "20191129_111714.jpg", "20191208_185708.jpg", "20191210_123550.jpg",
  "20210924_121439.jpg", "20210924_125528.jpg", "476643434_9132374793519378_4367419827327559112_n.jpg",
  "477713615_9132374830186041_2385123143691741751_n.jpg", "FB_IMG_1582266953309.jpg", "IMG_20200215_144310.jpg"
];

export default function Gallery() {
  return (
    <section id="gallery" className="relative w-full bg-[#000000] py-24 px-6 md:px-24 z-20 pb-32">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Photo Gallery</h2>
          <div className="h-[1px] w-full bg-white/10" />
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
              className="group relative aspect-square rounded-xl overflow-hidden border border-white/10"
            >
              <Image 
                src={`/gallery/${src}`} 
                alt={`Gallery Photo ${i + 1}`} 
                fill
                className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
