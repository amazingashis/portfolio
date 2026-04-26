"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Overlay() {
  const { scrollYProgress } = useScroll();

  // Section 1 (Visible at 0%, fades out by 15%)
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.15], [0, -100]);

  // Section 2 (Fades in around 25%, peaks at 30%, fades out by 45%)
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [0, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.4], [100, -100]);

  // Section 3 (Fades in around 55%, peaks at 60%, fades out by 75%)
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.7], [100, -100]);

  return (
    <div className="absolute top-0 left-0 h-full w-full pointer-events-none z-10">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center px-6 md:px-24 overflow-hidden">
        
        {/* Section 1: Center */}
        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-4 drop-shadow-lg">
            Ashish Adhikari.
          </h1>
          <p className="text-xl md:text-3xl text-gray-300 font-light tracking-wide drop-shadow-md max-w-2xl">
            Senior Software & Data Engineer.
          </p>
        </motion.div>

        {/* Section 2: Left */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex flex-col items-start justify-center text-left px-6 md:pl-24"
        >
          <h2 className="text-4xl md:text-7xl font-semibold text-white max-w-3xl leading-tight drop-shadow-lg">
            Building scalable <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              data pipelines.
            </span>
          </h2>
          <p className="mt-4 text-lg md:text-2xl text-gray-400 max-w-xl">
            Specializing in AWS, Databricks, and Snowflake ecosystems.
          </p>
        </motion.div>

        {/* Section 3: Right */}
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex flex-col items-end justify-center text-right px-6 md:pr-24"
        >
          <h2 className="text-4xl md:text-7xl font-semibold text-white max-w-3xl leading-tight drop-shadow-lg">
            Architecting <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-purple-400 to-pink-500">
              intelligent systems.
            </span>
          </h2>
          <p className="mt-4 text-lg md:text-2xl text-gray-400 max-w-xl">
            Bridging Medallion Data Lakes with Agentic AI and LLMs.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
