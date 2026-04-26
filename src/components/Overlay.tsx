"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Overlay() {
  const { scrollYProgress } = useScroll();

  // Section 1 — Hero (visible 0→8%, fades out cleanly by 16%)
  const opacity1 = useTransform(scrollYProgress, [0, 0.08, 0.16], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.16], [0, -80]);

  // Section 2 — "Building scalable data pipelines"
  // Starts fading in AFTER section 1 is fully gone (0.20), peaks at 0.30, out by 0.40
  const opacity2 = useTransform(scrollYProgress, [0.20, 0.28, 0.38, 0.44], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.20, 0.44], [80, -80]);

  // Section 3 — "Architecting intelligent systems"
  // Starts after section 2 is fully gone (0.50), peaks at 0.60, out by 0.72
  const opacity3 = useTransform(scrollYProgress, [0.50, 0.58, 0.68, 0.74], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.50, 0.74], [80, -80]);

  // Canvas dimming overlay — darkens the background when sections 2 or 3 are active
  // so the text has clean contrast and doesn't visually clash with the image frames
  const canvasDimOpacity = useTransform(
    scrollYProgress,
    [0.18, 0.26, 0.40, 0.48, 0.56, 0.70, 0.76],
    [0,    0.55, 0.55, 0,    0.55, 0.55, 0   ]
  );

  return (
    <div className="absolute top-0 left-0 h-full w-full pointer-events-none z-10">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center px-6 md:px-24 overflow-hidden">

        {/* Canvas dimming layer — sits above the canvas, below all text */}
        <motion.div
          style={{ opacity: canvasDimOpacity }}
          className="absolute inset-0 bg-black"
        />

        {/* Section 1: Center — name + designation */}
        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-4 drop-shadow-lg">
            Ashish Adhikari.
          </h1>
          <p className="text-xl md:text-3xl text-gray-300 font-light tracking-wide drop-shadow-md max-w-2xl">
            Senior Data &amp; AI Engineer.
          </p>
        </motion.div>

        {/* Section 2: Left — pipelines */}
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

        {/* Section 3: Right — AI systems */}
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
