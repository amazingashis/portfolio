"use client";

import { useRef } from "react";
import Navbar from "@/components/Navbar";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Experience from "@/components/Experience";
import CertifiedEngineer from "@/components/CertifiedEngineer";
import Projects from "@/components/Projects";
import Publications from "@/components/Publications";
import Achievements from "@/components/Achievements";
import Certifications from "@/components/Certifications";

export default function Home() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  return (
    <main className="relative w-full min-h-screen bg-[#000000]">
      <Navbar />

      {/* 300vh container for the scroll sequence */}
      <div ref={canvasContainerRef} className="relative h-[300vh] w-full">
        <ScrollyCanvas containerRef={canvasContainerRef} />
        <Overlay containerRef={canvasContainerRef} />
      </div>

      <Experience />
      <CertifiedEngineer />
      <Projects />
      <Publications />
      <Achievements />
      <Certifications />
    </main>
  );
}
