"use client";

import { useRef } from "react";
import Navbar from "@/components/Navbar";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Certifications from "@/components/Certifications";
import Publications from "@/components/Publications";

export default function Home() {
  // Shared ref so ScrollyCanvas and Overlay both measure scroll
  // progress against the same 500vh container — not the full page.
  // This ensures all 120 frames are rendered and text timings are accurate.
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  return (
    <main className="relative w-full min-h-screen bg-[#000000]">
      <Navbar />

      {/* 500vh container for the scroll sequence */}
      <div ref={canvasContainerRef} className="relative h-[500vh] w-full">
        <ScrollyCanvas containerRef={canvasContainerRef} />
        <Overlay containerRef={canvasContainerRef} />
      </div>

      <Experience />
      <Projects />
      <Publications />
      <Achievements />
      <Certifications />
    </main>
  );
}
